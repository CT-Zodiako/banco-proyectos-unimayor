import { useState, useEffect } from 'react';
import { collection, query, getDocs } from 'firebase/firestore';
import { db } from '../firebase/config';
import { projects as allProjects } from '../data/projects/index.js';

export const useProjects = () => {
    const [projects, setProjects] = useState(allProjects);
    const [loading, setLoading] = useState(false); // Change to true for real firebase
    const [error, setError] = useState(null);

    useEffect(() => {
        // DESCOMENTAR PARA USAR FIREBASE REAL
        /*
        const fetchProjects = async () => {
          setLoading(true);
          try {
            const q = query(collection(db, "proyectos"));
            const querySnapshot = await getDocs(q);
            const data = querySnapshot.docs.map(doc => ({
              id: doc.id,
              ...doc.data()
            }));
            setProjects(data);
          } catch (err) {
            console.error("Error fetching projects:", err);
            setError(err);
          } finally {
            setLoading(false);
          }
        };
    
        fetchProjects();
        */
    }, []);

    return { projects, loading, error };
};
