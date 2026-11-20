// Small stand-ins for public/data/*.json (the real files weigh megabytes). Same shape as the pipelines write it.
// Event dates are far in the future so the "expired" filter never drops them whatever day the tests run.

export const PROJECT_ID = 'proj_001'; // a real project of src/data: the project page reads it from there

export const eventosFixture = {
    generated: '2026-11-10',
    sources: { wikicfp: 2, devpost: 2 },
    topics: ['IoT', 'Robótica', 'Ciberseguridad'],
    events: [
        { id: 'ev-iot-cfp', title: 'Congreso IoT Cauca 2099', name: 'Congreso IoT Cauca 2099', kind: 'cfp', start: '2099-05-10', end: '2099-05-12', deadline: '2099-03-01', location: 'Popayán, Colombia', country: 'Colombia', online: false, url: 'https://example.org/iot-cauca', source: 'wikicfp', topics: ['IoT'] },
        { id: 'ev-robotica-attend', title: 'Taller de Robótica Abierta', name: 'Taller de Robótica Abierta', kind: 'attend', start: '2099-06-01', end: '2099-06-02', deadline: null, location: 'En línea', country: '', online: true, url: 'https://example.org/robotica', source: 'devpost', topics: ['Robótica'] },
        { id: 'ev-ciber-cfp', title: 'Simposio de Ciberseguridad 2099', name: 'Simposio de Ciberseguridad 2099', kind: 'cfp', start: '2099-07-15', end: '2099-07-16', deadline: '2099-04-01', location: 'Lima, Perú', country: 'Peru', online: false, url: 'https://example.org/ciber', source: 'wikicfp', topics: ['Ciberseguridad'] },
        { id: 'ev-feria-attend', title: 'Feria IoT y Robótica 2099', name: 'Feria IoT y Robótica 2099', kind: 'attend', start: '2099-08-20', end: '2099-08-21', deadline: null, location: 'Bogotá, Colombia', country: 'Colombia', online: false, url: 'https://example.org/feria', source: 'devpost', topics: ['IoT', 'Robótica'] },
    ],
    projects: [
        { id: PROJECT_ID, title: 'Monitoreo agrícola con MQTT', emoji: '🌾', area: 'SBC-IoT', level: 'Intermedio', topics: ['IoT'], keywords: ['mqtt', 'sensors'] },
    ],
};

const journal = (id, title, extra) => ({
    id, title, issns: ['12345678'], url: `https://example.org/${id}`, doaj_url: `https://doaj.org/toc/${id}`,
    author_instructions_url: `https://example.org/${id}/autores`, aims_scope_url: `https://example.org/${id}/alcance`,
    templates: [], scimago_url: `https://www.scimagojr.com/journalsearch.php?q=${id}`, publisher: 'Editorial Demo',
    country: 'Colombia', languages: ['Spanish'], license: 'CC BY', review: 'Double anonymous peer review',
    weeks_to_publication: 10, quartile: 'Q3', sjr: 0.4, h_index: 12, categories: [{ name: 'Computer Science', quartile: 'Q3' }],
    publindex: 'B', themes: { iot_redes: 1 }, ...extra,
});

export const publicarFixture = {
    generated: '2026-11-10',
    sources: { doaj_free_journals: 3, scimago_ranked_issns: 3, diamond_ranked_journals: 3, doaj_downloaded: '2026-11-10', scimago_edition: 2025 },
    themes: { iot_redes: 'IoT y redes', agricultura: 'Agricultura', electronica: 'Electrónica y control' },
    journals: [
        journal('j-farming', 'Journal of Smart Farming', { country: 'United Kingdom', languages: ['English'], quartile: 'Q1', sjr: 3.2, h_index: 60 }),
        journal('j-sensores', 'Revista Colombiana de Sensores', { quartile: 'Q3' }),
        journal('j-electronica', 'Revista de Electrónica Aplicada', { country: 'Mexico', quartile: 'Q4', weeks_to_publication: 20 }),
    ],
    projects: [
        {
            id: PROJECT_ID, number: 1, emoji: '🌾', title: 'Monitoreo agrícola con MQTT', area: 'SBC-IoT', sector: 'Agricultura', level: 'Intermedio',
            themes: { tech: ['iot_redes', 'electronica'], domain: ['agricultura'] },
            matches: [
                { journal_id: 'j-farming', fit: 'fuerte', score: 6, themes: ['agricultura', 'iot_redes'] },
                { journal_id: 'j-sensores', fit: 'fuerte', score: 5, themes: ['agricultura', 'iot_redes'] },
                { journal_id: 'j-electronica', fit: 'tecnologia', score: 4, themes: ['electronica'] },
            ],
        },
    ],
};
