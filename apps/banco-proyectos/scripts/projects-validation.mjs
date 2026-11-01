// Validation rules for projects in src/data/projects/*.js (new areas).
// Used by tests/projects-data.test.mjs and scripts/check-area.mjs.

export const LEVELS = ['Intermedio', 'Intermedio-Avanzado', 'Avanzado'];
export const DURATION = 'Un semestre';
export const BUDGET = 'Bajo costo';
export const STEPS = ['Análisis de requisitos', 'Diseño de la solución', 'Implementación y pruebas', 'Validación y sustentación'];

const REQUIRED_FIELDS = ['id', 'titulo', 'descripcion', 'area', 'sector', 'nivel', 'duracion', 'presupuesto',
    'habilidades', 'objetivos', 'pasos', 'aplicaciones', 'referencias', 'hardware_tabla', 'software_tabla'];
const TITLE_RE = /^(\S+) Proyecto (\d+): (\S.*\S)$/;
const DESCRIPTION_RE = /^Problema: (\S[\s\S]*\S)\n\nDescripción: (\S[\s\S]*\S)$/;

const isText = (value) => typeof value === 'string' && value.trim().length > 0 && value === value.trim();

/** Number in a project id such as "proj_101" → 101, or null. */
export function idNumber(id) {
    const match = /^proj_(\d{3})$/.exec(id ?? '');
    return match ? Number(match[1]) : null;
}

/** Title without the emoji and "Proyecto N:" prefix, normalized for duplicate detection. */
export function titleKey(titulo) {
    const match = TITLE_RE.exec(titulo ?? '');
    const text = match ? match[3] : String(titulo ?? '');
    return text.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/\s+/g, ' ').trim();
}

/** Returns a list of human-readable errors for one new-area project (empty when valid). */
export function validateProject(project, area) {
    const errors = [];
    const fail = (message) => errors.push(`${project?.id ?? '(sin id)'}: ${message}`);

    for (const field of REQUIRED_FIELDS) {
        if (!(field in (project ?? {}))) fail(`falta el campo "${field}"`);
    }
    const extra = Object.keys(project ?? {}).filter((k) => !REQUIRED_FIELDS.includes(k));
    if (extra.length) fail(`campos no permitidos: ${extra.join(', ')} (hardware/software se derivan de las tablas)`);
    if (errors.length) return errors;

    const number = idNumber(project.id);
    if (number === null) fail('id debe tener la forma proj_NNN');
    else if (area.ids) {
        if (!area.ids.includes(number)) fail(`id fuera de los ids del área (${area.ids.join(', ')})`);
    } else if (number < area.firstId || number > area.lastId) fail(`id fuera del rango del área (${area.firstId}-${area.lastId})`);

    const title = TITLE_RE.exec(project.titulo);
    if (!title) fail('titulo debe ser "<emoji> Proyecto N: <título>"');
    else {
        const [, emoji, titleNumber] = title;
        if (Number(titleNumber) !== number) fail(`el número del título (${titleNumber}) no coincide con el id`);
        if (emoji.length > 4 || /[A-Za-z0-9]/.test(emoji)) fail(`el emoji "${emoji}" debe ser un único emoji simple (máximo 4 unidades UTF-16)`);
    }

    if (!DESCRIPTION_RE.test(project.descripcion)) fail('descripcion debe ser "Problema: …\\n\\nDescripción: …"');
    if (project.area !== area.name) fail(`area debe ser exactamente "${area.name}"`);
    if (!isText(project.sector) || project.sector.includes('+')) fail('sector debe ser texto sin "+"');
    if (!LEVELS.includes(project.nivel)) fail(`nivel debe ser uno de: ${LEVELS.join(', ')}`);
    if (project.duracion !== DURATION) fail(`duracion debe ser "${DURATION}"`);
    if (project.presupuesto !== BUDGET) fail(`presupuesto debe ser "${BUDGET}"`);

    if (!Array.isArray(project.habilidades) || project.habilidades.length < 4 || !project.habilidades.every(isText)) {
        fail('habilidades debe tener al menos 4 textos');
    }

    const objetivos = project.objetivos;
    if (!Array.isArray(objetivos) || objetivos.length < 5) fail('objetivos debe tener el general, el encabezado y al menos 3 específicos');
    else {
        if (!/^🎯 Objetivo General: \S/.test(objetivos[0])) fail('objetivos[0] debe empezar con "🎯 Objetivo General: "');
        if (objetivos[1] !== '📌 Objetivos Específicos:') fail('objetivos[1] debe ser "📌 Objetivos Específicos:"');
        if (!objetivos.slice(2).every((o) => /^• \S/.test(o))) fail('los objetivos específicos deben empezar con "• "');
    }

    if (JSON.stringify(project.pasos) !== JSON.stringify(STEPS)) fail(`pasos debe ser exactamente ${JSON.stringify(STEPS)}`);
    if (JSON.stringify(project.aplicaciones) !== JSON.stringify([project.sector])) fail('aplicaciones debe ser [sector]');
    if (!Array.isArray(project.referencias) || !project.referencias.every(isText)) fail('referencias debe ser una lista de textos (puede estar vacía)');

    const hw = project.hardware_tabla;
    if (!Array.isArray(hw) || hw.length < 1 || !hw.every((h) => h && isText(h.componente) && isText(h.categoria) && isText(h.funcion) && Object.keys(h).length === 3)) {
        fail('hardware_tabla debe tener al menos 1 fila {componente, categoria, funcion}');
    }
    const sw = project.software_tabla;
    if (!Array.isArray(sw) || sw.length < 3 || !sw.every((s) => s && isText(s.herramienta) && isText(s.tipo) && isText(s.descripcion) && Object.keys(s).length === 3)) {
        fail('software_tabla debe tener al menos 3 filas {herramienta, tipo, descripcion}');
    }
    return errors;
}

/** Validates one area module: every project, id uniqueness, title uniqueness and the minimum count. */
export function validateArea(projects, area, minimum) {
    const errors = [];
    if (!Array.isArray(projects)) return [`${area.name}: el módulo debe exportar por defecto una lista`];
    for (const project of projects) errors.push(...validateProject(project, area));
    if (projects.length < minimum) errors.push(`${area.name}: tiene ${projects.length} proyectos, mínimo ${minimum}`);
    errors.push(...duplicates(projects));
    return errors;
}

/** Duplicate ids or duplicate titles inside a list of projects. */
export function duplicates(projects) {
    const errors = [];
    const seenIds = new Set();
    const seenTitles = new Map();
    for (const project of projects) {
        if (seenIds.has(project.id)) errors.push(`${project.id}: id duplicado`);
        seenIds.add(project.id);
        const key = titleKey(project.titulo);
        if (seenTitles.has(key)) errors.push(`${project.id}: título repetido con ${seenTitles.get(key)}`);
        else seenTitles.set(key, project.id);
    }
    return errors;
}
