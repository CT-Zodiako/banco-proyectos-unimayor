import { useState, useEffect, useCallback } from 'react';
import { DEFAULT_PLATFORMS } from '../data/publishingPlatforms';

const STORAGE_KEY = 'unimayor_publishing_platforms_v3';

export const usePublishingPlatforms = () => {
    const [platforms, setPlatforms] = useState(() => {
        try {
            const saved = localStorage.getItem(STORAGE_KEY);
            if (saved) {
                const parsed = JSON.parse(saved);
                if (Array.isArray(parsed) && parsed.length > 0) {
                    return parsed;
                }
            }
        } catch (e) {
            console.error("Error loading publishing platforms from localStorage:", e);
        }
        return DEFAULT_PLATFORMS;
    });

    useEffect(() => {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(platforms));
        } catch (e) {
            console.error("Error saving publishing platforms to localStorage:", e);
        }
    }, [platforms]);

    const addPlatform = useCallback((newPlatformData) => {
        const newEntry = {
            id: `plat_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
            status: 'activo',
            priority: 1,
            order: 1,
            logo: '🌐',
            ...newPlatformData
        };
        setPlatforms(prev => [...prev, newEntry]);
        return newEntry;
    }, []);

    const updatePlatform = useCallback((id, updatedFields) => {
        setPlatforms(prev => prev.map(p => p.id === id ? { ...p, ...updatedFields } : p));
    }, []);

    const togglePlatformStatus = useCallback((id) => {
        setPlatforms(prev => prev.map(p => {
            if (p.id === id) {
                return { ...p, status: p.status === 'activo' ? 'inactivo' : 'activo' };
            }
            return p;
        }));
    }, []);

    const deletePlatform = useCallback((id) => {
        setPlatforms(prev => prev.filter(p => p.id !== id));
    }, []);

    const resetToDefaults = useCallback(() => {
        setPlatforms(DEFAULT_PLATFORMS);
        localStorage.removeItem(STORAGE_KEY);
    }, []);

    /**
     * Resolves matching active platforms for a project area string (handles combined areas like "SBC-IoT + AIoT")
     * Returns an object split into { openAccess: [...], specialized: [...], alternativeDirectories: [...] }
     */
    const getPlatformsForTopic = useCallback((topicString) => {
        if (!topicString) return { openAccess: [], specialized: [], alternativeDirectories: [] };

        // Break topic string into individual area tags
        const areaTags = topicString.split('+').map(t => t.trim().toLowerCase());

        // Find matching active configuration rows (wildcard "*" always matches)
        const matched = platforms.filter(p => {
            if (p.status !== 'activo') return false;
            if (p.subjectArea === '*') return true;
            const pArea = p.subjectArea.toLowerCase();
            return areaTags.some(tag => pArea.includes(tag) || tag.includes(pArea));
        });

        // Fallback: If no direct tag match found, use all active platforms
        const itemsToUse = matched.length > 0 ? matched : platforms.filter(p => p.status === 'activo');

        // Deduplicate by platform name + section
        const uniqueMap = new Map();
        itemsToUse.forEach(item => {
            const key = `${item.section}_${item.platform}`;
            if (!uniqueMap.has(key)) {
                uniqueMap.set(key, item);
            }
        });

        const uniqueItems = Array.from(uniqueMap.values());

        // Sort items by order / priority
        uniqueItems.sort((a, b) => (a.order || a.priority || 0) - (b.order || b.priority || 0));

        const openAccess = uniqueItems.filter(item => item.section === 'Acceso Abierto' || item.section === 'Open Access');
        const specialized = uniqueItems.filter(item => item.section === 'Buscadores Especializados' || item.section === 'Specialized Search Engines');
        const alternativeDirectories = uniqueItems.filter(item => item.section === 'Directorios Alternativos' || item.section === 'Alternative Directories');

        return { openAccess, specialized, alternativeDirectories };
    }, [platforms]);

    return {
        platforms,
        addPlatform,
        updatePlatform,
        togglePlatformStatus,
        deletePlatform,
        resetToDefaults,
        getPlatformsForTopic
    };
};
