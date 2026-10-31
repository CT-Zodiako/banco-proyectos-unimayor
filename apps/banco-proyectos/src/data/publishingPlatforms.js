// Added fixed default platforms for Section 3 (Directorios Alternativos)
export const DEFAULT_PLATFORMS = [
    // --- SBC y IoT ---
    {
        id: "plat_001",
        subjectArea: "SBC-IoT",
        section: "Acceso Abierto",
        platform: "DOAJ (Directory of Open Access Journals)",
        url: "https://doaj.org/search/articles?ref=homepage-box&q={query}",
        logo: "🔓",
        description: "Directorio global de revistas científicas de acceso abierto de alta calidad y revisadas por pares.",
        priority: 1,
        order: 1,
        status: "activo"
    },
    {
        id: "plat_002",
        subjectArea: "SBC-IoT",
        section: "Acceso Abierto",
        platform: "OpenAlex",
        url: "https://openalex.org/works?page=1&filter=default.search%3A{query}",
        logo: "🌐",
        description: "Catálogo abierto y masivo de artículos científicos, autores e instituciones de investigación.",
        priority: 2,
        order: 2,
        status: "activo"
    },
    {
        id: "plat_003",
        subjectArea: "SBC-IoT",
        section: "Acceso Abierto",
        platform: "SciELO",
        url: "https://search.scielo.org/?q={query}",
        logo: "📚",
        description: "Biblioteca científica electrónica con cobertura integral en América Latina, España y Portugal.",
        priority: 3,
        order: 3,
        status: "activo"
    },
    {
        id: "plat_004",
        subjectArea: "SBC-IoT",
        section: "Acceso Abierto",
        platform: "Redalyc",
        url: "https://www.redalyc.org/busquedaArticulo.oa?q={query}",
        logo: "📖",
        description: "Red de revistas científicas de América Latina y el Caribe, España y Portugal.",
        priority: 4,
        order: 4,
        status: "activo"
    },
    {
        id: "plat_005",
        subjectArea: "SBC-IoT",
        section: "Buscadores Especializados",
        platform: "IEEE Xplore",
        url: "https://ieeexplore.ieee.org/search/searchresult.jsp?newsearch=true&queryText={query}",
        logo: "⚡",
        description: "Líder mundial en literatura de ingeniería eléctrica, electrónica, ciencias de la computación e IoT.",
        priority: 1,
        order: 5,
        status: "activo"
    },

    // --- AIoT (IoT e Inteligencia Artificial) ---
    {
        id: "plat_006",
        subjectArea: "AIoT",
        section: "Acceso Abierto",
        platform: "DOAJ",
        url: "https://doaj.org/search/articles?ref=homepage-box&q={query}",
        logo: "🔓",
        description: "Directorio abierto de revistas en Inteligencia Artificial y Sistemas Embebidos.",
        priority: 1,
        order: 1,
        status: "activo"
    },
    {
        id: "plat_007",
        subjectArea: "AIoT",
        section: "Acceso Abierto",
        platform: "OpenAlex",
        url: "https://openalex.org/works?page=1&filter=default.search%3A{query}",
        logo: "🌐",
        description: "Índice de descubrimientos científicos abiertos en Machine Learning y sensores inteligentes.",
        priority: 2,
        order: 2,
        status: "activo"
    },
    {
        id: "plat_008",
        subjectArea: "AIoT",
        section: "Buscadores Especializados",
        platform: "IEEE Xplore",
        url: "https://ieeexplore.ieee.org/search/searchresult.jsp?newsearch=true&queryText={query}",
        logo: "⚡",
        description: "Revistas y conferencias IEEE sobre Inteligencia Artificial aplicada a IoT.",
        priority: 1,
        order: 3,
        status: "activo"
    },
    {
        id: "plat_009",
        subjectArea: "AIoT",
        section: "Buscadores Especializados",
        platform: "Springer Journal Suggester",
        url: "https://journalsuggester.springer.com/",
        logo: "🍃",
        description: "Recomendador inteligente de revistas del grupo Springer Nature para publicaciones de IA e IoT.",
        priority: 2,
        order: 4,
        status: "activo"
    },
    {
        id: "plat_010",
        subjectArea: "AIoT",
        section: "Buscadores Especializados",
        platform: "Elsevier Journal Finder",
        url: "https://journalfinder.elsevier.com/",
        logo: "🔬",
        description: "Buscador automatizado de revistas Elsevier emparejadas con el tema de investigación.",
        priority: 3,
        order: 5,
        status: "activo"
    },

    // --- IoT con Visión Artificial ---
    {
        id: "plat_011",
        subjectArea: "IoT con Visión Artificial",
        section: "Acceso Abierto",
        platform: "DOAJ",
        url: "https://doaj.org/search/articles?ref=homepage-box&q={query}",
        logo: "🔓",
        description: "Revistas de acceso abierto especializadas en procesamiento de imágenes y visión por computador.",
        priority: 1,
        order: 1,
        status: "activo"
    },
    {
        id: "plat_012",
        subjectArea: "IoT con Visión Artificial",
        section: "Buscadores Especializados",
        platform: "IEEE Xplore",
        url: "https://ieeexplore.ieee.org/search/searchresult.jsp?newsearch=true&queryText={query}",
        logo: "⚡",
        description: "Publicaciones líderes en Computer Vision, Pattern Analysis e IoT.",
        priority: 1,
        order: 2,
        status: "activo"
    },
    {
        id: "plat_013",
        subjectArea: "IoT con Visión Artificial",
        section: "Buscadores Especializados",
        platform: "Springer Journal Suggester",
        url: "https://journalsuggester.springer.com/",
        logo: "🍃",
        description: "Encuentra revistas de Springer enfocadas en visión computacional y robótica.",
        priority: 2,
        order: 3,
        status: "activo"
    },
    {
        id: "plat_014",
        subjectArea: "IoT con Visión Artificial",
        section: "Buscadores Especializados",
        platform: "Elsevier Journal Finder",
        url: "https://journalfinder.elsevier.com/",
        logo: "🔬",
        description: "Herramienta de Elsevier para sugerir revistas en visión artificial y procesamiento digital.",
        priority: 3,
        order: 4,
        status: "activo"
    },

    // --- IoT con Big Data y Analítica ---
    {
        id: "plat_015",
        subjectArea: "IoT con Big Data y Analítica",
        section: "Acceso Abierto",
        platform: "DOAJ",
        url: "https://doaj.org/search/articles?ref=homepage-box&q={query}",
        logo: "🔓",
        description: "Revistas de ciencia de datos y procesamiento de grandes volúmenes de telemetría IoT.",
        priority: 1,
        order: 1,
        status: "activo"
    },
    {
        id: "plat_016",
        subjectArea: "IoT con Big Data y Analítica",
        section: "Acceso Abierto",
        platform: "OpenAlex",
        url: "https://openalex.org/works?page=1&filter=default.search%3A{query}",
        logo: "🌐",
        description: "Buscador universal de literatura en analítica predictiva y series temporales IoT.",
        priority: 2,
        order: 2,
        status: "activo"
    },
    {
        id: "plat_017",
        subjectArea: "IoT con Big Data y Analítica",
        section: "Buscadores Especializados",
        platform: "IEEE Xplore",
        url: "https://ieeexplore.ieee.org/search/searchresult.jsp?newsearch=true&queryText={query}",
        logo: "⚡",
        description: "Transactions on Big Data y revistas IEEE en arquitectura de analítica distribuida.",
        priority: 1,
        order: 3,
        status: "activo"
    },
    {
        id: "plat_018",
        subjectArea: "IoT con Big Data y Analítica",
        section: "Buscadores Especializados",
        platform: "Springer Journal Suggester",
        url: "https://journalsuggester.springer.com/",
        logo: "🍃",
        description: "Catálogo Springer para analítica de datos, almacenamiento masivo y cloud-edge.",
        priority: 2,
        order: 4,
        status: "activo"
    },

    // --- IoT Hacking y Ciberseguridad ---
    {
        id: "plat_019",
        subjectArea: "IoT Hacking y Ciberseguridad",
        section: "Acceso Abierto",
        platform: "DOAJ",
        url: "https://doaj.org/search/articles?ref=homepage-box&q={query}",
        logo: "🔓",
        description: "Publicaciones abiertas sobre ciberseguridad, criptografía y protección de dispositivos embebidos.",
        priority: 1,
        order: 1,
        status: "activo"
    },
    {
        id: "plat_020",
        subjectArea: "IoT Hacking y Ciberseguridad",
        section: "Acceso Abierto",
        platform: "OpenAlex",
        url: "https://openalex.org/works?page=1&filter=default.search%3A{query}",
        logo: "🌐",
        description: "Recursos académicos abiertos sobre análisis de malware, pentesting y Zero Trust.",
        priority: 2,
        order: 2,
        status: "activo"
    },
    {
        id: "plat_021",
        subjectArea: "IoT Hacking y Ciberseguridad",
        section: "Buscadores Especializados",
        platform: "IEEE Xplore",
        url: "https://ieeexplore.ieee.org/search/searchresult.jsp?newsearch=true&queryText={query}",
        logo: "⚡",
        description: "Revistas y actas de congresos IEEE Security & Privacy, IoT Security y Criptografía.",
        priority: 1,
        order: 3,
        status: "activo"
    },
    {
        id: "plat_022",
        subjectArea: "IoT Hacking y Ciberseguridad",
        section: "Buscadores Especializados",
        platform: "MDPI (Sensors & Cybersecurity)",
        url: "https://www.mdpi.com/search?q={query}",
        logo: "🛡️",
        description: "Editorial de revistas indexadas como Sensors y Cryptography con revisión rápida por pares.",
        priority: 2,
        order: 4,
        status: "activo"
    },

    // --- IoT Médico y Salud Digital ---
    {
        id: "plat_023",
        subjectArea: "IoT Médico y Salud Digital",
        section: "Acceso Abierto",
        platform: "DOAJ",
        url: "https://doaj.org/search/articles?ref=homepage-box&q={query}",
        logo: "🔓",
        description: "Directorio de revistas en telemedicina, dispositivos biomédicos y e-Health.",
        priority: 1,
        order: 1,
        status: "activo"
    },
    {
        id: "plat_024",
        subjectArea: "IoT Médico y Salud Digital",
        section: "Acceso Abierto",
        platform: "OpenAlex",
        url: "https://openalex.org/works?page=1&filter=default.search%3A{query}",
        logo: "🌐",
        description: "Colección abierta global de artículos en informática médica y wearables de salud.",
        priority: 2,
        order: 2,
        status: "activo"
    },
    {
        id: "plat_025",
        subjectArea: "IoT Médico y Salud Digital",
        section: "Buscadores Especializados",
        platform: "PubMed / MEDLINE",
        url: "https://pubmed.ncbi.nlm.nih.gov/?term={query}",
        logo: "🏥",
        description: "La mayor base de datos biomédica mundial mantenida por la Biblioteca Nacional de Medicina de EE. UU.",
        priority: 1,
        order: 3,
        status: "activo"
    },
    {
        id: "plat_026",
        subjectArea: "IoT Médico y Salud Digital",
        section: "Buscadores Especializados",
        platform: "IEEE Xplore (EMBS)",
        url: "https://ieeexplore.ieee.org/search/searchresult.jsp?newsearch=true&queryText={query}",
        logo: "⚡",
        description: "Publicaciones de la IEEE Engineering in Medicine and Biology Society (EMBS).",
        priority: 2,
        order: 4,
        status: "activo"
    },

    // --- IoT Industrial 4.0 y Manufactura Inteligente ---
    {
        id: "plat_027",
        subjectArea: "IoT Industrial 4.0 y Manufactura Inteligente",
        section: "Acceso Abierto",
        platform: "DOAJ",
        url: "https://doaj.org/search/articles?ref=homepage-box&q={query}",
        logo: "🔓",
        description: "Revistas de acceso abierto sobre Smart Factory, IIoT y Gemelos Digitales.",
        priority: 1,
        order: 1,
        status: "activo"
    },
    {
        id: "plat_028",
        subjectArea: "IoT Industrial 4.0 y Manufactura Inteligente",
        section: "Acceso Abierto",
        platform: "OpenAlex",
        url: "https://openalex.org/works?page=1&filter=default.search%3A{query}",
        logo: "🌐",
        description: "Publicaciones abiertas sobre mantenimiento predictivo, RFID e automatización industrial.",
        priority: 2,
        order: 2,
        status: "activo"
    },
    {
        id: "plat_029",
        subjectArea: "IoT Industrial 4.0 y Manufactura Inteligente",
        section: "Buscadores Especializados",
        platform: "IEEE Xplore (Industrial Electronics)",
        url: "https://ieeexplore.ieee.org/search/searchresult.jsp?newsearch=true&queryText={query}",
        logo: "⚡",
        description: "IEEE Transactions on Industrial Informatics e IEEE Transactions on Industrial Electronics.",
        priority: 1,
        order: 3,
        status: "activo"
    },
    {
        id: "plat_030",
        subjectArea: "IoT Industrial 4.0 y Manufactura Inteligente",
        section: "Buscadores Especializados",
        platform: "Springer Journal Suggester",
        url: "https://journalsuggester.springer.com/",
        logo: "🍃",
        description: "Recomendador de revistas Springer en ingeniería de manufactura y robótica industrial.",
        priority: 2,
        order: 4,
        status: "activo"
    },

    // --- IoT Aeroespacial y Aeronáutico ---
    {
        id: "plat_031",
        subjectArea: "IoT Aeroespacial y Aeronáutico",
        section: "Acceso Abierto",
        platform: "DOAJ",
        url: "https://doaj.org/search/articles?ref=homepage-box&q={query}",
        logo: "🔓",
        description: "Revistas de acceso abierto en ciencias aeroespaciales, avionica y sistemas autónomos.",
        priority: 1,
        order: 1,
        status: "activo"
    },
    {
        id: "plat_032",
        subjectArea: "IoT Aeroespacial y Aeronáutico",
        section: "Buscadores Especializados",
        platform: "IEEE Xplore (AESS)",
        url: "https://ieeexplore.ieee.org/search/searchresult.jsp?newsearch=true&queryText={query}",
        logo: "⚡",
        description: "IEEE Aerospace & Electronic Systems Society, CubeSats y sistemas UAV/UTM.",
        priority: 1,
        order: 2,
        status: "activo"
    },
    {
        id: "plat_033",
        subjectArea: "IoT Aeroespacial y Aeronáutico",
        section: "Buscadores Especializados",
        platform: "NASA Technical Reports Server (NTRS)",
        url: "https://ntrs.nasa.gov/search?q={query}",
        logo: "🚀",
        description: "Repositorio oficial de la NASA para investigaciones técnicas, informes de prueba e ingeniería de vuelo.",
        priority: 2,
        order: 3,
        status: "activo"
    },

    // --- SECTION 3: Directorios Alternativos para Búsqueda de Publicación (Fixed Links) ---
    {
        id: "plat_alt_001",
        subjectArea: "*",
        section: "Directorios Alternativos",
        platform: "Springer Open Collections",
        url: "https://link.springer.com/journal/43926/collections?filter=Open",
        logo: "🍃",
        description: "Colección oficial de artículos y publicaciones de acceso abierto del sello editorial Springer Nature.",
        priority: 1,
        order: 1,
        status: "activo"
    },
    {
        id: "plat_alt_002",
        subjectArea: "*",
        section: "Directorios Alternativos",
        platform: "Journals Insights Database",
        url: "https://journalsinsights.com/database",
        logo: "📊",
        description: "Base de datos analítica y directorio interactivo para encontrar revistas indexadas con métricas de impacto.",
        priority: 2,
        order: 2,
        status: "activo"
    },
    {
        id: "plat_alt_003",
        subjectArea: "*",
        section: "Directorios Alternativos",
        platform: "Slogix IoT Leading Journals",
        url: "https://slogix.in/internet-of-things/leading-journals/",
        logo: "🌐",
        description: "Compendio y directorio clasificado de las revistas científicas líderes a nivel internacional en Internet de las Cosas.",
        priority: 3,
        order: 3,
        status: "activo"
    },
    {
        id: "plat_alt_004",
        subjectArea: "*",
        section: "Directorios Alternativos",
        platform: "No APC Open Access Journals",
        url: "https://noapc.com/",
        logo: "🆓",
        description: "Directorio especializado en revistas de acceso abierto sin cobro de cargos por procesamiento de artículos (No APC).",
        priority: 4,
        order: 4,
        status: "activo"
    },
    {
        id: "plat_alt_005",
        subjectArea: "*",
        section: "Directorios Alternativos",
        platform: "DOAJ Direct Directory",
        url: "https://doaj.org/",
        logo: "🔓",
        description: "Portal principal y buscador directo del Directory of Open Access Journals para explorar revistas por disciplina.",
        priority: 5,
        order: 5,
        status: "activo"
    },
    {
        id: "plat_alt_006",
        subjectArea: "*",
        section: "Directorios Alternativos",
        platform: "PhD Talks Free Open Access Guide",
        url: "https://phdtalks.org/2021/06/free-open-access-journals.html#google_vignette",
        logo: "🎓",
        description: "Guía académica estructurada y catálogo de revistas internacionales de alta calidad con publicación gratuita.",
        priority: 6,
        order: 6,
        status: "activo"
    },
    {
        id: "plat_alt_007",
        subjectArea: "*",
        section: "Directorios Alternativos",
        platform: "Journal Searches Free Publishing",
        url: "https://journalsearches.com/free-publishing-journals.php",
        logo: "🔍",
        description: "Buscador y catálogo de revistas científicas libres de costo de edición y publicación académica.",
        priority: 7,
        order: 7,
        status: "activo"
    }
];

/**
 * Normalizes subject areas to map combined topics (e.g. "SBC-IoT + AIoT")
 * to matching configuration keys.
 */
export const normalizeAreaName = (areaString) => {
    if (!areaString) return ["SBC-IoT"];
    const parts = areaString.split('+').map(p => p.trim());
    return parts;
};
