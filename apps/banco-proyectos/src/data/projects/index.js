import { mockProjects } from '../mockProjects.js';
import desarrolloVideojuegos from './desarrollo-videojuegos.js';
import ciberseguridad from './ciberseguridad.js';
import desarrolloSoftware from './desarrollo-software.js';
import arquitecturaSoftware from './arquitectura-software.js';
import redes from './redes.js';
import medicinaAiot from './medicina-aiot.js';
import bioingenieria from './bioingenieria.js';
import inteligenciaArtificial from './inteligencia-artificial.js';
import sistemasCiberfisicos from './sistemas-ciberfisicos.js';
import machineLearning from './machine-learning.js';
import robotica from './robotica.js';

// The UI reads `hardware`/`software` as display strings; new projects only declare the tables.
export const withDerivedLists = (project) => ({
    ...project,
    hardware: project.hardware_tabla.map((h) => `${h.componente} (${h.categoria} | ${h.funcion})`),
    software: project.software_tabla.map((s) => `${s.herramienta}: ${s.tipo} - ${s.descripcion}`),
});

export const newAreaProjects = [
    ...desarrolloVideojuegos,
    ...ciberseguridad,
    ...desarrolloSoftware,
    ...arquitecturaSoftware,
    ...redes,
    ...medicinaAiot,
    ...bioingenieria,
    ...inteligenciaArtificial,
    ...sistemasCiberfisicos,
    ...machineLearning,
    ...robotica,
].map(withDerivedLists);

export const projects = [...mockProjects, ...newAreaProjects];
