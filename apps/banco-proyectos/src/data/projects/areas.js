// Research areas added after the original 100 IoT projects.
// `name` is the exact value of the project's `area` field; `firstId`/`lastId` (or an explicit `ids` list) reserve its
// project numbers.
export const NEW_AREAS = [
    { name: 'Desarrollo de Videojuegos', module: 'desarrollo-videojuegos.js', firstId: 101, lastId: 110 },
    { name: 'Ciberseguridad', module: 'ciberseguridad.js', firstId: 111, lastId: 120 },
    { name: 'Desarrollo de Software', module: 'desarrollo-software.js', firstId: 121, lastId: 130 },
    { name: 'Arquitectura de Software', module: 'arquitectura-software.js', firstId: 131, lastId: 140 },
    { name: 'Redes', module: 'redes.js', firstId: 141, lastId: 150 },
    { name: 'Medicina con AIoT', module: 'medicina-aiot.js', firstId: 151, lastId: 160 },
    // 161, 162, 164, 166, 169 and 170 used IoT and moved to "IoT Médico y Salud Digital" (odd/tasks/neuro-discapacidad.md).
    { name: 'Bioingeniería', module: 'bioingenieria.js', ids: [163, 165, 167, 168, 211, 212, 213, 214, 215, 216] },
    { name: 'Inteligencia Artificial', module: 'inteligencia-artificial.js', firstId: 171, lastId: 180 },
    { name: 'Sistemas Ciberfísicos', module: 'sistemas-ciberfisicos.js', firstId: 181, lastId: 190 },
    { name: 'Machine Learning', module: 'machine-learning.js', firstId: 191, lastId: 200 },
    { name: 'Robótica', module: 'robotica.js', firstId: 201, lastId: 210 },
    { name: 'Neurociencia con AIoT', module: 'neurociencia-aiot.js', firstId: 217, lastId: 226 },
    { name: 'AIoT para Discapacidad y Enfermedad', module: 'aiot-discapacidad-enfermedad.js', firstId: 227, lastId: 236 },
];

// Every authored module: the new areas plus new-numbered projects filed under an original area.
export const AREA_MODULES = [
    ...NEW_AREAS,
    { name: 'IoT Médico y Salud Digital', module: 'iot-medico-salud-digital.js', ids: [161, 162, 164, 166, 169, 170], minimum: 6 },
];

export const MIN_PROJECTS_PER_NEW_AREA = 10;
