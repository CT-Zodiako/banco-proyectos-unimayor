// Pure helpers for the project catalog page: area families, facets, filters, sorting and pagination.
import { NEW_AREAS } from '../data/projects/areas.js';

// Families group the area tags shown in the sidebar. Unknown tags fall into "Otras áreas".
export const AREA_FAMILIES = [
    {
        name: 'IoT y sistemas embebidos',
        areas: ['SBC-IoT', 'AIoT', 'IoT con Visión Artificial', 'Visión Artificial', 'IoT con Big Data y Analítica',
            'IoT con Analítica', 'IoT Industrial 4.0 y Manufactura Inteligente', 'IoT Aeroespacial y Aeronáutico'],
    },
    {
        name: 'Salud y bioingeniería',
        areas: ['IoT Médico y Salud Digital', 'Medicina con AIoT', 'Bioingeniería', 'Neurociencia con AIoT',
            'AIoT para Discapacidad y Enfermedad'],
    },
    { name: 'Seguridad y redes', areas: ['IoT Hacking y Ciberseguridad', 'Ciberseguridad', 'Redes'] },
    { name: 'Software y videojuegos', areas: ['Desarrollo de Software', 'Arquitectura de Software', 'Desarrollo de Videojuegos'] },
    { name: 'IA y datos', areas: ['Inteligencia Artificial', 'Machine Learning'] },
    { name: 'Robótica y ciberfísicos', areas: ['Robótica', 'Sistemas Ciberfísicos'] },
];
const OTHER_FAMILY = 'Otras áreas';

export const LEVELS = ['Intermedio', 'Intermedio-Avanzado', 'Avanzado'];

export const normalizeText = (text) =>
    String(text ?? '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim();

export const areaTags = (project) =>
    String(project.area ?? '').split('+').map((tag) => tag.trim()).filter(Boolean);

const NEW_AREA_NAMES = new Set(NEW_AREAS.map((a) => a.name));

const projectNumber = (project) => Number(String(project.id).replace(/\D/g, '')) || 0;

// Projects 101 and up were added after the original 100 (some later moved to an original area, e.g. proj_161).
export const isNewProject = (project) => projectNumber(project) > 100;

/** Families with unique project counts and, inside each, area tags with their project counts. Empty ones are omitted. */
export function buildAreaFacets(projects) {
    const families = [...AREA_FAMILIES.map((f) => ({ ...f })), { name: OTHER_FAMILY, areas: [] }];
    const familyOf = new Map(AREA_FAMILIES.flatMap((f) => f.areas.map((a) => [a, f.name])));
    const tagCounts = new Map();
    const familyProjects = new Map(families.map((f) => [f.name, new Set()]));

    for (const project of projects) {
        for (const tag of areaTags(project)) {
            tagCounts.set(tag, (tagCounts.get(tag) ?? 0) + 1);
            const family = familyOf.get(tag) ?? OTHER_FAMILY;
            if (family === OTHER_FAMILY && !families.at(-1).areas.includes(tag)) families.at(-1).areas.push(tag);
            familyProjects.get(family).add(project.id);
        }
    }

    return families
        .map((family) => ({
            name: family.name,
            count: familyProjects.get(family.name).size,
            areas: family.areas
                .filter((tag) => tagCounts.has(tag))
                .map((tag) => ({ name: tag, count: tagCounts.get(tag), isNew: NEW_AREA_NAMES.has(tag) })),
        }))
        .filter((family) => family.count > 0);
}

/** Areas: OR over exact tags. Levels: OR. Sector: substring. Search: every word in title, description, sector or area. All combined with AND. */
export function filterProjects(projects, { query = '', areas = [], levels = [], sector = '' } = {}) {
    const words = normalizeText(query).split(/\s+/).filter(Boolean);
    const sectorText = normalizeText(sector);
    return projects.filter((project) => {
        if (areas.length && !areaTags(project).some((tag) => areas.includes(tag))) return false;
        if (levels.length && !levels.includes(project.nivel)) return false;
        if (sectorText && !normalizeText(project.sector).includes(sectorText)) return false;
        if (words.length) {
            const haystack = normalizeText([project.titulo, project.descripcion, project.sector, project.area].join(' '));
            if (!words.every((word) => haystack.includes(word))) return false;
        }
        return true;
    });
}

export const SORTS = [
    { value: 'numero', label: 'Número de proyecto' },
    { value: 'recientes', label: 'Más recientes' },
];

export const DEFAULT_SORT = 'numero';

/** Returns a new sorted list: "numero" (project 1 first, the default) or "recientes" (highest number first). */
export function sortProjects(projects, sort = DEFAULT_SORT) {
    const direction = sort === 'recientes' ? -1 : 1;
    return [...projects].sort((a, b) => direction * (projectNumber(a) - projectNumber(b)));
}

/** Page of a list; the page number is clamped into 1..pages. */
export function paginate(list, page, size) {
    const pages = Math.max(1, Math.ceil(list.length / size));
    const current = Math.min(Math.max(1, Number(page) || 1), pages);
    return { items: list.slice((current - 1) * size, current * size), page: current, pages };
}

/** Most frequent sector groups (text before " - "), for quick suggestions. */
export function topSectorGroups(projects, limit = 3) {
    const counts = new Map();
    for (const project of projects) {
        const group = String(project.sector ?? '').split(' - ')[0].trim();
        if (group) counts.set(group, (counts.get(group) ?? 0) + 1);
    }
    return [...counts.entries()].sort((a, b) => b[1] - a[1]).slice(0, limit).map(([group]) => group);
}
