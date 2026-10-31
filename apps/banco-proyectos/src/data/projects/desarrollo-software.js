// Projects for the "Desarrollo de Software" area (proj_121–proj_130). Schema checked by scripts/projects-validation.mjs.
export default [
    {
        "id": "proj_121",
        "titulo": "📱 Proyecto 121: Aplicación Web Progresiva Offline-First para Registro de Visitas de Extensionistas Agropecuarios",
        "descripcion": "Problema: Los extensionistas agropecuarios que visitan fincas en zonas rurales del Cauca registran sus visitas en papel porque no hay cobertura móvil en las veredas; al transcribirlas días después se pierden datos, fotografías y coordenadas, y las entidades no pueden hacer seguimiento oportuno a los productores.\n\nDescripción: Aplicación web progresiva (PWA) que funciona sin conexión, almacena formularios, fotografías y ubicación GPS en el dispositivo mediante IndexedDB y sincroniza automáticamente con un servidor central cuando el técnico recupera señal, resolviendo conflictos de edición y mostrando el estado de sincronización de cada registro.",
        "area": "Desarrollo de Software",
        "sector": "Agricultura - Extensión rural",
        "nivel": "Intermedio",
        "duracion": "Un semestre",
        "presupuesto": "Bajo costo",
        "habilidades": [
            "Desarrollo de aplicaciones web progresivas",
            "Almacenamiento local con IndexedDB y Service Workers",
            "Estrategias de sincronización offline-first",
            "Diseño de formularios para trabajo de campo",
            "Pruebas en condiciones de conectividad intermitente"
        ],
        "objetivos": [
            "🎯 Objetivo General: Desarrollar una aplicación web progresiva que permita a los extensionistas agropecuarios registrar visitas a fincas sin conexión a internet y sincronizarlas de forma confiable con un servidor central.",
            "📌 Objetivos Específicos:",
            "• Implementar el registro offline de formularios, fotografías y coordenadas GPS con persistencia local que sobreviva al cierre del navegador.",
            "• Diseñar un mecanismo de sincronización con detección de conflictos que logre al menos un 99 % de registros sincronizados sin pérdida en pruebas de conectividad intermitente.",
            "• Comparar con un grupo piloto de extensionistas el tiempo de registro y la tasa de datos incompletos frente al formato en papel."
        ],
        "pasos": [
            "Análisis de requisitos",
            "Diseño de la solución",
            "Implementación y pruebas",
            "Validación y sustentación"
        ],
        "aplicaciones": [
            "Agricultura - Extensión rural"
        ],
        "referencias": [],
        "hardware_tabla": [
            {
                "componente": "Teléfono Android de gama media",
                "categoria": "Dispositivo Móvil",
                "funcion": "Ejecuta la PWA en campo y captura fotografías y coordenadas GPS."
            },
            {
                "componente": "Raspberry Pi 4 (4 GB)",
                "categoria": "Servidor de Pruebas",
                "funcion": "Aloja el backend de sincronización durante las pruebas del laboratorio."
            },
            {
                "componente": "Computador de desarrollo",
                "categoria": "Estación de Trabajo",
                "funcion": "Desarrollo, depuración y simulación de redes lentas con las herramientas del navegador."
            }
        ],
        "software_tabla": [
            {
                "herramienta": "React con Vite y vite-plugin-pwa",
                "tipo": "Framework Web / Aplicación",
                "descripcion": "Interfaz de la PWA y generación del Service Worker."
            },
            {
                "herramienta": "Dexie.js (IndexedDB)",
                "tipo": "Base de Datos Local",
                "descripcion": "Persistencia offline de formularios y fotografías."
            },
            {
                "herramienta": "Node.js con Express",
                "tipo": "Backend / API",
                "descripcion": "API de sincronización y resolución de conflictos."
            },
            {
                "herramienta": "PostgreSQL con PostGIS",
                "tipo": "Base de Datos",
                "descripcion": "Almacenamiento central de visitas georreferenciadas."
            },
            {
                "herramienta": "Lighthouse",
                "tipo": "Herramienta de Auditoría",
                "descripcion": "Verificación de criterios PWA y rendimiento."
            }
        ]
    },
    {
        "id": "proj_122",
        "titulo": "🧪 Proyecto 122: Suite de Pruebas Automatizadas End-to-End para Sistemas de Información Académica Universitarios",
        "descripcion": "Problema: Los sistemas de información académica de las instituciones de educación superior de la región se actualizan con pruebas manuales; cada nueva versión introduce fallos en procesos críticos como matrícula, registro de notas o generación de certificados, que afectan a cientos de estudiantes en temporadas de alta demanda.\n\nDescripción: Suite de pruebas automatizadas end-to-end, de API y de regresión visual sobre un entorno espejo del sistema académico, ejecutada de forma programada y ante cada cambio, con datos de prueba sintéticos, reportes de cobertura por flujo de negocio y medición del tiempo ahorrado frente a la verificación manual.",
        "area": "Desarrollo de Software",
        "sector": "Educación superior - Gestión académica",
        "nivel": "Intermedio-Avanzado",
        "duracion": "Un semestre",
        "presupuesto": "Bajo costo",
        "habilidades": [
            "Automatización de pruebas end-to-end",
            "Diseño de casos de prueba basados en flujos de negocio",
            "Pruebas de API y regresión visual",
            "Generación de datos de prueba sintéticos",
            "Métricas de calidad de software"
        ],
        "objetivos": [
            "🎯 Objetivo General: Construir una suite de pruebas automatizadas que verifique los flujos críticos de un sistema de información académica y reduzca los fallos que llegan a producción.",
            "📌 Objetivos Específicos:",
            "• Automatizar al menos 40 casos de prueba que cubran matrícula, registro de calificaciones y expedición de certificados.",
            "• Generar datos sintéticos de estudiantes y cursos que permitan ejecutar la suite sin usar información personal real.",
            "• Medir la reducción del tiempo de verificación de una versión y el número de defectos detectados frente al proceso manual."
        ],
        "pasos": [
            "Análisis de requisitos",
            "Diseño de la solución",
            "Implementación y pruebas",
            "Validación y sustentación"
        ],
        "aplicaciones": [
            "Educación superior - Gestión académica"
        ],
        "referencias": [],
        "hardware_tabla": [
            {
                "componente": "Computador de desarrollo",
                "categoria": "Estación de Trabajo",
                "funcion": "Escritura y depuración de los casos de prueba."
            },
            {
                "componente": "Mini PC o servidor del laboratorio",
                "categoria": "Servidor de Pruebas",
                "funcion": "Aloja el entorno espejo del sistema académico y ejecuta la suite programada."
            }
        ],
        "software_tabla": [
            {
                "herramienta": "Playwright",
                "tipo": "Framework de Pruebas",
                "descripcion": "Pruebas end-to-end multinavegador y regresión visual."
            },
            {
                "herramienta": "Postman / Newman",
                "tipo": "Herramienta de Pruebas de API",
                "descripcion": "Verificación de los servicios del sistema académico."
            },
            {
                "herramienta": "Faker.js",
                "tipo": "Biblioteca de Datos de Prueba",
                "descripcion": "Generación de estudiantes, cursos y notas sintéticos."
            },
            {
                "herramienta": "Docker Compose",
                "tipo": "Contenedores",
                "descripcion": "Levantamiento reproducible del entorno espejo."
            },
            {
                "herramienta": "Allure Report",
                "tipo": "Visualización / Reportes",
                "descripcion": "Reportes de resultados y cobertura por flujo de negocio."
            }
        ]
    },
    {
        "id": "proj_123",
        "titulo": "🚀 Proyecto 123: Plataforma CI/CD Autohospedada de Bajo Costo para Proyectos de Software y Firmware del Laboratorio",
        "descripcion": "Problema: Los semilleros de investigación del laboratorio desarrollan software y firmware sin integración continua; el código se comparte por memorias USB o correo, los errores de compilación se descubren tarde y es difícil reproducir versiones anteriores para una sustentación o publicación.\n\nDescripción: Plataforma de integración y despliegue continuo autohospedada en hardware de bajo costo, con repositorios Git, ejecutores que compilan y prueban aplicaciones web y firmware para ESP32, publicación automática de artefactos versionados y una guía de adopción para los semilleros.",
        "area": "Desarrollo de Software",
        "sector": "Educación superior - Laboratorios de investigación",
        "nivel": "Intermedio",
        "duracion": "Un semestre",
        "presupuesto": "Bajo costo",
        "habilidades": [
            "Integración y despliegue continuo",
            "Control de versiones con Git",
            "Administración de servidores Linux",
            "Contenedores y ejecutores de CI",
            "Compilación automatizada de firmware embebido"
        ],
        "objetivos": [
            "🎯 Objetivo General: Implementar una plataforma CI/CD autohospedada que automatice la compilación, prueba y publicación de los proyectos de software y firmware del laboratorio.",
            "📌 Objetivos Específicos:",
            "• Desplegar un servidor de repositorios Git con ejecutores de CI sobre hardware de menos de dos millones de pesos.",
            "• Configurar pipelines de referencia para una aplicación web y un firmware ESP32 que compilen y ejecuten pruebas en menos de 10 minutos.",
            "• Medir con al menos tres semilleros la frecuencia de integración y el tiempo para detectar errores antes y después de la adopción."
        ],
        "pasos": [
            "Análisis de requisitos",
            "Diseño de la solución",
            "Implementación y pruebas",
            "Validación y sustentación"
        ],
        "aplicaciones": [
            "Educación superior - Laboratorios de investigación"
        ],
        "referencias": [],
        "hardware_tabla": [
            {
                "componente": "Raspberry Pi 5 (8 GB) con SSD NVMe",
                "categoria": "Servidor",
                "funcion": "Aloja el servidor Git y el ejecutor principal de CI."
            },
            {
                "componente": "Placa ESP32 DevKit",
                "categoria": "Microcontrolador",
                "funcion": "Dispositivo de prueba para validar el firmware compilado por el pipeline."
            },
            {
                "componente": "Switch Ethernet gigabit de 8 puertos",
                "categoria": "Red",
                "funcion": "Conecta el servidor y los equipos de los semilleros en la red del laboratorio."
            }
        ],
        "software_tabla": [
            {
                "herramienta": "Forgejo",
                "tipo": "Servidor de Repositorios Git",
                "descripcion": "Alojamiento de repositorios, incidencias y revisiones de código."
            },
            {
                "herramienta": "Forgejo Actions Runner",
                "tipo": "Ejecutor de CI/CD",
                "descripcion": "Ejecución de pipelines compatibles con la sintaxis de GitHub Actions."
            },
            {
                "herramienta": "PlatformIO CLI",
                "tipo": "Herramienta de Compilación Embebida",
                "descripcion": "Compilación y pruebas unitarias del firmware ESP32."
            },
            {
                "herramienta": "Docker",
                "tipo": "Contenedores",
                "descripcion": "Entornos de compilación aislados y reproducibles."
            }
        ]
    },
    {
        "id": "proj_124",
        "titulo": "♿ Proyecto 124: Herramienta de Auditoría Automatizada de Accesibilidad Web para Portales de Alcaldías del Cauca",
        "descripcion": "Problema: Muchos portales web de alcaldías municipales del Cauca no cumplen las pautas de accesibilidad WCAG exigidas en Colombia; las personas con discapacidad visual o motora no pueden consultar trámites, convocatorias ni información pública, y las entidades desconocen qué corregir.\n\nDescripción: Herramienta de código abierto que rastrea periódicamente los portales municipales, evalúa criterios WCAG 2.2 con motores automáticos y verificaciones semiautomáticas, y genera un tablero público con el nivel de cumplimiento, los errores priorizados y recomendaciones de corrección comprensibles para los equipos web de cada alcaldía.",
        "area": "Desarrollo de Software",
        "sector": "Gobierno - Servicios digitales",
        "nivel": "Intermedio",
        "duracion": "Un semestre",
        "presupuesto": "Bajo costo",
        "habilidades": [
            "Pautas de accesibilidad WCAG 2.2",
            "Rastreo web automatizado",
            "Pruebas automáticas de accesibilidad",
            "Desarrollo de tableros web",
            "Comunicación de hallazgos técnicos a entidades públicas"
        ],
        "objetivos": [
            "🎯 Objetivo General: Desarrollar una herramienta de código abierto que audite de forma periódica la accesibilidad de los portales web municipales del Cauca y oriente su corrección.",
            "📌 Objetivos Específicos:",
            "• Auditar automáticamente al menos 30 portales municipales con un motor de reglas WCAG 2.2 y registrar el histórico de resultados.",
            "• Validar la herramienta comparando sus hallazgos con una evaluación manual experta sobre una muestra de 10 páginas.",
            "• Publicar un tablero con indicadores de cumplimiento y recomendaciones priorizadas por impacto para cada portal."
        ],
        "pasos": [
            "Análisis de requisitos",
            "Diseño de la solución",
            "Implementación y pruebas",
            "Validación y sustentación"
        ],
        "aplicaciones": [
            "Gobierno - Servicios digitales"
        ],
        "referencias": [],
        "hardware_tabla": [
            {
                "componente": "Computador de desarrollo",
                "categoria": "Estación de Trabajo",
                "funcion": "Desarrollo de la herramienta y evaluaciones manuales con lector de pantalla."
            },
            {
                "componente": "Raspberry Pi 4 (4 GB)",
                "categoria": "Servidor",
                "funcion": "Ejecuta los rastreos programados y aloja el tablero público."
            }
        ],
        "software_tabla": [
            {
                "herramienta": "axe-core",
                "tipo": "Motor de Pruebas de Accesibilidad",
                "descripcion": "Evaluación automática de reglas WCAG."
            },
            {
                "herramienta": "Playwright",
                "tipo": "Automatización de Navegador",
                "descripcion": "Rastreo y renderizado de páginas con JavaScript."
            },
            {
                "herramienta": "NVDA",
                "tipo": "Lector de Pantalla",
                "descripcion": "Verificación manual de la experiencia de usuarios con discapacidad visual."
            },
            {
                "herramienta": "SQLite",
                "tipo": "Base de Datos",
                "descripcion": "Histórico de auditorías por portal."
            },
            {
                "herramienta": "Astro",
                "tipo": "Framework Web / Aplicación",
                "descripcion": "Tablero público estático y accesible con los resultados."
            }
        ]
    },
    {
        "id": "proj_125",
        "titulo": "🔧 Proyecto 125: Modernización Incremental de un Sistema Legado de Gestión de Inventario de Laboratorio",
        "descripcion": "Problema: El inventario de equipos y préstamos de los laboratorios universitarios suele depender de aplicaciones legadas en PHP sin pruebas ni documentación; cada cambio rompe funcionalidades, solo una persona entiende el código y la institución corre el riesgo de perder el control de equipos costosos.\n\nDescripción: Proyecto de modernización que caracteriza la deuda técnica del sistema legado, lo protege con pruebas de caracterización y aplica refactorizaciones incrementales siguiendo el patrón Strangler Fig, migrando módulo por módulo a una base de código mantenible sin interrumpir el servicio de préstamos.",
        "area": "Desarrollo de Software",
        "sector": "Educación superior - Gestión de laboratorios",
        "nivel": "Avanzado",
        "duracion": "Un semestre",
        "presupuesto": "Bajo costo",
        "habilidades": [
            "Refactorización de código legado",
            "Pruebas de caracterización",
            "Medición de deuda técnica",
            "Migración incremental de sistemas",
            "Documentación técnica de software"
        ],
        "objetivos": [
            "🎯 Objetivo General: Modernizar de forma incremental un sistema legado de inventario de laboratorio, mejorando su mantenibilidad sin interrumpir su operación.",
            "📌 Objetivos Específicos:",
            "• Caracterizar la deuda técnica inicial con métricas de complejidad ciclomática, duplicación y cobertura de pruebas.",
            "• Cubrir los flujos de préstamo y devolución con pruebas de caracterización que alcancen al menos un 70 % de cobertura antes de refactorizar.",
            "• Migrar al menos dos módulos y reportar la variación de las métricas de mantenibilidad y de los incidentes reportados frente a la línea base."
        ],
        "pasos": [
            "Análisis de requisitos",
            "Diseño de la solución",
            "Implementación y pruebas",
            "Validación y sustentación"
        ],
        "aplicaciones": [
            "Educación superior - Gestión de laboratorios"
        ],
        "referencias": [],
        "hardware_tabla": [
            {
                "componente": "Computador de desarrollo",
                "categoria": "Estación de Trabajo",
                "funcion": "Análisis, refactorización y ejecución local de pruebas."
            },
            {
                "componente": "Servidor del laboratorio con Linux",
                "categoria": "Servidor",
                "funcion": "Aloja en paralelo el sistema legado y los módulos migrados."
            },
            {
                "componente": "Lector de códigos de barras USB",
                "categoria": "Periférico de Entrada",
                "funcion": "Registra préstamos y devoluciones de equipos etiquetados."
            }
        ],
        "software_tabla": [
            {
                "herramienta": "SonarQube Community",
                "tipo": "Análisis Estático de Código",
                "descripcion": "Medición de deuda técnica, duplicación y complejidad."
            },
            {
                "herramienta": "PHPUnit",
                "tipo": "Framework de Pruebas",
                "descripcion": "Pruebas de caracterización sobre el código legado."
            },
            {
                "herramienta": "Laravel",
                "tipo": "Framework Web / Aplicación",
                "descripcion": "Base de código destino para los módulos migrados."
            },
            {
                "herramienta": "Nginx",
                "tipo": "Servidor Web / Proxy",
                "descripcion": "Enrutamiento gradual entre el sistema legado y el nuevo."
            },
            {
                "herramienta": "MariaDB",
                "tipo": "Base de Datos",
                "descripcion": "Base de datos compartida durante la transición."
            }
        ]
    },
    {
        "id": "proj_126",
        "titulo": "🧩 Proyecto 126: API Abierta y Documentada para Datos de Experimentos del Laboratorio de Física",
        "descripcion": "Problema: Los datos que producen las prácticas y experimentos del laboratorio de física quedan dispersos en hojas de cálculo y memorias USB; otros grupos no pueden reutilizarlos, los estudiantes repiten mediciones y los artículos no pueden enlazar los datos que los respaldan.\n\nDescripción: API REST abierta con especificación OpenAPI que recibe mediciones de los montajes del laboratorio, almacena metadatos del experimento según principios FAIR, expone consultas y descargas en formatos estándar y ofrece bibliotecas cliente en Python para análisis reproducible en cuadernos Jupyter.",
        "area": "Desarrollo de Software",
        "sector": "Investigación - Datos abiertos científicos",
        "nivel": "Intermedio-Avanzado",
        "duracion": "Un semestre",
        "presupuesto": "Bajo costo",
        "habilidades": [
            "Diseño de API REST",
            "Especificación OpenAPI",
            "Gestión de datos según principios FAIR",
            "Desarrollo de bibliotecas cliente",
            "Pruebas de contrato de API"
        ],
        "objetivos": [
            "🎯 Objetivo General: Desarrollar una API abierta y documentada que centralice y publique los datos de los experimentos del laboratorio de física para su reutilización.",
            "📌 Objetivos Específicos:",
            "• Definir un esquema de metadatos para experimentos y documentarlo en una especificación OpenAPI validada con pruebas de contrato.",
            "• Integrar al menos tres montajes del laboratorio que envíen mediciones a la API desde un microcontrolador o un computador.",
            "• Evaluar el cumplimiento FAIR de los conjuntos publicados y el tiempo de respuesta de la API bajo carga simulada."
        ],
        "pasos": [
            "Análisis de requisitos",
            "Diseño de la solución",
            "Implementación y pruebas",
            "Validación y sustentación"
        ],
        "aplicaciones": [
            "Investigación - Datos abiertos científicos"
        ],
        "referencias": [],
        "hardware_tabla": [
            {
                "componente": "ESP32 con sensores de los montajes (temperatura, distancia, fotocompuerta)",
                "categoria": "Microcontrolador",
                "funcion": "Envía las mediciones de los experimentos a la API."
            },
            {
                "componente": "Raspberry Pi 4 (4 GB) con SSD",
                "categoria": "Servidor",
                "funcion": "Aloja la API y la base de datos en la red del laboratorio."
            },
            {
                "componente": "Computador de desarrollo",
                "categoria": "Estación de Trabajo",
                "funcion": "Desarrollo de la API y de la biblioteca cliente."
            }
        ],
        "software_tabla": [
            {
                "herramienta": "FastAPI",
                "tipo": "Framework Web / API",
                "descripcion": "API REST con generación automática de OpenAPI."
            },
            {
                "herramienta": "PostgreSQL",
                "tipo": "Base de Datos",
                "descripcion": "Almacenamiento de mediciones y metadatos de experimentos."
            },
            {
                "herramienta": "Schemathesis",
                "tipo": "Pruebas de Contrato",
                "descripcion": "Pruebas basadas en propiedades a partir de la especificación OpenAPI."
            },
            {
                "herramienta": "JupyterLab",
                "tipo": "Entorno de Análisis",
                "descripcion": "Ejemplos de análisis reproducible con la biblioteca cliente."
            },
            {
                "herramienta": "Locust",
                "tipo": "Pruebas de Carga",
                "descripcion": "Medición del rendimiento de la API bajo concurrencia."
            }
        ]
    },
    {
        "id": "proj_127",
        "titulo": "☕ Proyecto 127: Aplicación Móvil de Trazabilidad y Venta Directa para Pequeños Productores de Café Especial",
        "descripcion": "Problema: Los pequeños caficultores del Cauca producen cafés especiales reconocidos, pero venden a intermediarios a precios bajos porque no pueden demostrar el origen, el proceso y la calidad de cada lote ante compradores y tostadores que pagan más por esa información.\n\nDescripción: Aplicación móvil multiplataforma con la que el productor registra cada lote (finca, variedad, beneficio, secado y puntaje de catación), genera un código QR con la historia del lote y publica una ficha de venta directa; los compradores consultan la trazabilidad desde el código y contactan al productor sin intermediarios.",
        "area": "Desarrollo de Software",
        "sector": "Agroindustria - Café especial",
        "nivel": "Intermedio",
        "duracion": "Un semestre",
        "presupuesto": "Bajo costo",
        "habilidades": [
            "Desarrollo móvil multiplataforma",
            "Diseño centrado en el usuario rural",
            "Backend como servicio y autenticación",
            "Generación y lectura de códigos QR",
            "Pruebas de usabilidad en campo"
        ],
        "objetivos": [
            "🎯 Objetivo General: Desarrollar una aplicación móvil que permita a pequeños productores de café especial registrar la trazabilidad de sus lotes y ofrecerlos directamente a compradores.",
            "📌 Objetivos Específicos:",
            "• Implementar el registro de lotes con fotografías y datos de beneficio, funcional sin conexión y sincronizable al recuperar señal.",
            "• Generar fichas públicas de trazabilidad accesibles mediante código QR desde cualquier teléfono.",
            "• Evaluar la usabilidad con al menos 10 productores mediante la escala SUS y el tiempo para registrar un lote completo."
        ],
        "pasos": [
            "Análisis de requisitos",
            "Diseño de la solución",
            "Implementación y pruebas",
            "Validación y sustentación"
        ],
        "aplicaciones": [
            "Agroindustria - Café especial"
        ],
        "referencias": [],
        "hardware_tabla": [
            {
                "componente": "Teléfono Android de gama baja",
                "categoria": "Dispositivo Móvil",
                "funcion": "Dispositivo de referencia para pruebas con los productores."
            },
            {
                "componente": "Impresora térmica de etiquetas Bluetooth",
                "categoria": "Periférico de Salida",
                "funcion": "Imprime las etiquetas QR que se adhieren a los empaques de café."
            },
            {
                "componente": "Computador de desarrollo",
                "categoria": "Estación de Trabajo",
                "funcion": "Desarrollo y compilación de la aplicación."
            }
        ],
        "software_tabla": [
            {
                "herramienta": "Flutter",
                "tipo": "Framework Móvil",
                "descripcion": "Aplicación multiplataforma para Android e iOS."
            },
            {
                "herramienta": "Supabase",
                "tipo": "Backend como Servicio",
                "descripcion": "Autenticación, base de datos PostgreSQL y almacenamiento de fotografías."
            },
            {
                "herramienta": "Drift (SQLite)",
                "tipo": "Base de Datos Local",
                "descripcion": "Persistencia offline de lotes en el teléfono."
            },
            {
                "herramienta": "Figma",
                "tipo": "Diseño de Interfaces",
                "descripcion": "Prototipos validados con los productores antes de implementar."
            }
        ]
    },
    {
        "id": "proj_128",
        "titulo": "🧰 Proyecto 128: Plataforma Low-Code para Formularios y Trámites de Juntas de Acción Comunal",
        "descripcion": "Problema: Las juntas de acción comunal de Popayán y sus veredas gestionan afiliaciones, actas, censos y solicitudes de la comunidad en cuadernos y hojas sueltas; sus dignatarios no tienen formación en programación y las herramientas comerciales son costosas o no se ajustan a sus procesos.\n\nDescripción: Plataforma low-code autohospedada con un editor visual de formularios y flujos de aprobación, plantillas listas para los trámites comunales más frecuentes, exportación de reportes y control de acceso por rol, de modo que los propios dignatarios adapten y publiquen sus formularios sin escribir código.",
        "area": "Desarrollo de Software",
        "sector": "Comunidad - Organizaciones sociales",
        "nivel": "Intermedio-Avanzado",
        "duracion": "Un semestre",
        "presupuesto": "Bajo costo",
        "habilidades": [
            "Desarrollo de editores visuales low-code",
            "Modelado de formularios con JSON Schema",
            "Motores de flujos de aprobación",
            "Control de acceso basado en roles",
            "Diseño participativo con comunidades"
        ],
        "objetivos": [
            "🎯 Objetivo General: Desarrollar una plataforma low-code que permita a las juntas de acción comunal crear y administrar sus formularios y trámites sin conocimientos de programación.",
            "📌 Objetivos Específicos:",
            "• Implementar un editor visual de formularios y flujos de aprobación basado en esquemas declarativos.",
            "• Construir al menos cinco plantillas de trámites comunales validadas con dignatarios de juntas reales.",
            "• Medir el tiempo que tarda un dignatario sin formación técnica en crear y publicar un formulario nuevo, con meta inferior a 20 minutos."
        ],
        "pasos": [
            "Análisis de requisitos",
            "Diseño de la solución",
            "Implementación y pruebas",
            "Validación y sustentación"
        ],
        "aplicaciones": [
            "Comunidad - Organizaciones sociales"
        ],
        "referencias": [],
        "hardware_tabla": [
            {
                "componente": "Raspberry Pi 4 (4 GB)",
                "categoria": "Servidor",
                "funcion": "Aloja la plataforma para una o varias juntas a bajo costo."
            },
            {
                "componente": "Tableta Android",
                "categoria": "Dispositivo Móvil",
                "funcion": "Diligenciamiento de formularios en asambleas y visitas casa a casa."
            },
            {
                "componente": "Computador de desarrollo",
                "categoria": "Estación de Trabajo",
                "funcion": "Desarrollo del editor y del motor de formularios."
            }
        ],
        "software_tabla": [
            {
                "herramienta": "Vue.js",
                "tipo": "Framework Web / Aplicación",
                "descripcion": "Editor visual de arrastrar y soltar."
            },
            {
                "herramienta": "JSON Schema y JSON Forms",
                "tipo": "Especificación de Formularios",
                "descripcion": "Definición declarativa y renderizado de formularios."
            },
            {
                "herramienta": "NestJS",
                "tipo": "Backend / API",
                "descripcion": "API, flujos de aprobación y control de acceso por rol."
            },
            {
                "herramienta": "PostgreSQL",
                "tipo": "Base de Datos",
                "descripcion": "Almacenamiento de formularios, respuestas y actas."
            }
        ]
    },
    {
        "id": "proj_129",
        "titulo": "🌄 Proyecto 129: Aplicación Educativa Bilingüe Español–Nasa Yuwe con Contenidos Descargables para Escuelas Rurales",
        "descripcion": "Problema: Los docentes de escuelas rurales de los resguardos indígenas del Cauca disponen de pocos materiales digitales en nasa yuwe; las aplicaciones educativas existentes están solo en español y dependen de internet, lo que debilita la enseñanza de la lengua propia en sedes sin conectividad.\n\nDescripción: Aplicación móvil educativa bilingüe que funciona completamente sin conexión, con lecciones, audios grabados por hablantes de la comunidad y actividades interactivas organizadas en paquetes descargables, más un panel web sencillo para que los docentes creen y actualicen contenidos que se distribuyen por red local o memoria USB.",
        "area": "Desarrollo de Software",
        "sector": "Educación básica - Comunidades indígenas",
        "nivel": "Intermedio",
        "duracion": "Un semestre",
        "presupuesto": "Bajo costo",
        "habilidades": [
            "Desarrollo móvil offline",
            "Internacionalización y localización de software",
            "Gestión de contenidos multimedia",
            "Diseño de software con enfoque intercultural",
            "Evaluación de software educativo"
        ],
        "objetivos": [
            "🎯 Objetivo General: Desarrollar una aplicación educativa bilingüe español–nasa yuwe que funcione sin internet y permita a los docentes crear y distribuir sus propios contenidos.",
            "📌 Objetivos Específicos:",
            "• Implementar paquetes de lecciones con audio y actividades interactivas que se instalen y ejecuten sin conexión en teléfonos de gama baja.",
            "• Construir un panel web para que los docentes publiquen contenidos y los distribuyan por red local sin necesidad de internet.",
            "• Evaluar con docentes y estudiantes de al menos una sede rural la usabilidad de la aplicación y la frecuencia de uso durante cuatro semanas."
        ],
        "pasos": [
            "Análisis de requisitos",
            "Diseño de la solución",
            "Implementación y pruebas",
            "Validación y sustentación"
        ],
        "aplicaciones": [
            "Educación básica - Comunidades indígenas"
        ],
        "referencias": [],
        "hardware_tabla": [
            {
                "componente": "Raspberry Pi 4 con punto de acceso Wi-Fi",
                "categoria": "Servidor Local",
                "funcion": "Distribuye paquetes de contenido a los dispositivos de la sede sin internet."
            },
            {
                "componente": "Micrófono USB de condensador",
                "categoria": "Captura de Audio",
                "funcion": "Grabación de audios de hablantes de nasa yuwe."
            },
            {
                "componente": "Teléfono o tableta Android de gama baja",
                "categoria": "Dispositivo Móvil",
                "funcion": "Dispositivo de referencia para las pruebas en el aula."
            }
        ],
        "software_tabla": [
            {
                "herramienta": "React Native con Expo",
                "tipo": "Framework Móvil",
                "descripcion": "Aplicación móvil bilingüe con funcionamiento offline."
            },
            {
                "herramienta": "SQLite",
                "tipo": "Base de Datos Local",
                "descripcion": "Almacenamiento de lecciones y progreso del estudiante."
            },
            {
                "herramienta": "Audacity",
                "tipo": "Edición de Audio",
                "descripcion": "Limpieza y normalización de las grabaciones."
            },
            {
                "herramienta": "Django",
                "tipo": "Framework Web / Aplicación",
                "descripcion": "Panel docente para crear y empaquetar contenidos."
            }
        ]
    },
    {
        "id": "proj_130",
        "titulo": "📊 Proyecto 130: Sistema de Retroalimentación Automática de Calidad de Código para Cursos de Programación",
        "descripcion": "Problema: En los cursos de programación de la universidad, los docentes revisan decenas de entregas por semana y solo alcanzan a verificar si el programa funciona; los estudiantes reciben poca retroalimentación sobre legibilidad, pruebas y buenas prácticas, y llegan a semestres avanzados con hábitos difíciles de corregir.\n\nDescripción: Sistema de código abierto integrado a los repositorios de los estudiantes que, en cada entrega, ejecuta pruebas, análisis estático, pruebas de mutación y métricas de complejidad, y devuelve retroalimentación formativa en lenguaje claro con ejemplos de mejora, junto con un tablero docente que muestra la evolución de la calidad por estudiante y por grupo.",
        "area": "Desarrollo de Software",
        "sector": "Educación superior - Enseñanza de la programación",
        "nivel": "Avanzado",
        "duracion": "Un semestre",
        "presupuesto": "Bajo costo",
        "habilidades": [
            "Análisis estático de código",
            "Pruebas de mutación",
            "Integración con plataformas Git",
            "Diseño de retroalimentación formativa",
            "Análisis estadístico de datos educativos"
        ],
        "objetivos": [
            "🎯 Objetivo General: Desarrollar un sistema que entregue retroalimentación automática sobre la calidad del código de los estudiantes de programación y permita medir su evolución.",
            "📌 Objetivos Específicos:",
            "• Integrar pruebas, linters, pruebas de mutación y métricas de complejidad en un pipeline que responda cada entrega en menos de cinco minutos.",
            "• Traducir los hallazgos técnicos en retroalimentación formativa priorizada y validada por docentes del programa.",
            "• Comparar entre un grupo con el sistema y un grupo de control la evolución de métricas de calidad del código a lo largo del semestre."
        ],
        "pasos": [
            "Análisis de requisitos",
            "Diseño de la solución",
            "Implementación y pruebas",
            "Validación y sustentación"
        ],
        "aplicaciones": [
            "Educación superior - Enseñanza de la programación"
        ],
        "referencias": [],
        "hardware_tabla": [
            {
                "componente": "Servidor o mini PC del laboratorio",
                "categoria": "Servidor",
                "funcion": "Ejecuta los análisis de cada entrega en contenedores aislados."
            },
            {
                "componente": "Computador de desarrollo",
                "categoria": "Estación de Trabajo",
                "funcion": "Desarrollo del sistema y del tablero docente."
            }
        ],
        "software_tabla": [
            {
                "herramienta": "Pylint y Ruff",
                "tipo": "Análisis Estático de Código",
                "descripcion": "Detección de errores de estilo, legibilidad y malas prácticas en Python."
            },
            {
                "herramienta": "mutmut",
                "tipo": "Pruebas de Mutación",
                "descripcion": "Evaluación de la calidad de las pruebas escritas por los estudiantes."
            },
            {
                "herramienta": "Radon",
                "tipo": "Métricas de Código",
                "descripcion": "Complejidad ciclomática e índice de mantenibilidad."
            },
            {
                "herramienta": "GitHub Classroom / Gitea",
                "tipo": "Plataforma Git",
                "descripcion": "Gestión de repositorios y entregas de los estudiantes."
            },
            {
                "herramienta": "Grafana",
                "tipo": "Visualización / Dashboard",
                "descripcion": "Tablero docente con la evolución de la calidad por grupo."
            }
        ]
    }
];
