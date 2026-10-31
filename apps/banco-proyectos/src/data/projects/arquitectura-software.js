// Projects for this area. Each entry follows the schema checked by scripts/projects-validation.mjs.
export default [
    {
        "id": "proj_131",
        "titulo": "🧩 Proyecto 131: Migración Incremental de un Sistema Académico Monolítico a Microservicios con el Patrón Strangler Fig",
        "descripcion": "Problema: Muchas instituciones de educación superior de la región operan sistemas académicos monolíticos heredados donde cualquier cambio en matrículas o notas obliga a desplegar toda la aplicación, generando caídas en temporada de inscripciones y frenando la incorporación de nuevas funcionalidades.\n\nDescripción: Migración incremental de un monolito académico de referencia hacia microservicios aplicando el patrón Strangler Fig: un proxy inverso enruta progresivamente las funcionalidades extraídas (inscripción, notas, horarios) hacia servicios independientes, mientras se mide el impacto en tiempo de despliegue, disponibilidad y latencia en cada etapa de la migración.",
        "area": "Arquitectura de Software",
        "sector": "Educación superior - Sistemas académicos",
        "nivel": "Intermedio-Avanzado",
        "duracion": "Un semestre",
        "presupuesto": "Bajo costo",
        "habilidades": [
            "Descomposición de dominios con Domain-Driven Design",
            "Aplicación del patrón Strangler Fig",
            "Diseño de microservicios y contratos de API",
            "Contenerización y orquestación de servicios",
            "Medición de métricas de despliegue y disponibilidad"
        ],
        "objetivos": [
            "🎯 Objetivo General: Migrar de forma incremental un sistema académico monolítico a una arquitectura de microservicios mediante el patrón Strangler Fig, sin interrumpir el servicio a los usuarios.",
            "📌 Objetivos Específicos:",
            "• Identificar al menos tres contextos delimitados del monolito mediante un mapa de contexto basado en Domain-Driven Design.",
            "• Extraer como mínimo dos funcionalidades a microservicios independientes enrutados por un proxy inverso, manteniendo el 100 % de las pruebas funcionales del sistema original en verde.",
            "• Comparar el tiempo de despliegue y la disponibilidad antes y después de la migración durante una simulación de temporada de inscripciones."
        ],
        "pasos": [
            "Análisis de requisitos",
            "Diseño de la solución",
            "Implementación y pruebas",
            "Validación y sustentación"
        ],
        "aplicaciones": [
            "Educación superior - Sistemas académicos"
        ],
        "referencias": [],
        "hardware_tabla": [
            {
                "componente": "Computador de desarrollo (16 GB RAM)",
                "categoria": "Equipo de Cómputo",
                "funcion": "Ejecuta el monolito, los microservicios y el entorno de pruebas en contenedores."
            },
            {
                "componente": "Raspberry Pi 5 (8 GB)",
                "categoria": "Servidor de Pruebas",
                "funcion": "Aloja el proxy inverso y un entorno de preproducción de bajo costo."
            },
            {
                "componente": "Switch Gigabit Ethernet de 8 puertos",
                "categoria": "Red",
                "funcion": "Interconecta los equipos del entorno de pruebas del laboratorio."
            }
        ],
        "software_tabla": [
            {
                "herramienta": "Spring Boot / Django",
                "tipo": "Framework Web / Aplicación",
                "descripcion": "Para el monolito de referencia y los microservicios extraídos"
            },
            {
                "herramienta": "Traefik",
                "tipo": "Proxy Inverso",
                "descripcion": "Para enrutar progresivamente las rutas hacia los nuevos servicios"
            },
            {
                "herramienta": "Docker Compose",
                "tipo": "Contenerización",
                "descripcion": "Para orquestar el monolito y los microservicios en el entorno local"
            },
            {
                "herramienta": "PostgreSQL",
                "tipo": "Base de Datos",
                "descripcion": "Para las bases de datos separadas por servicio"
            },
            {
                "herramienta": "GitHub Actions",
                "tipo": "Integración y Despliegue Continuo",
                "descripcion": "Para medir y automatizar los tiempos de despliegue"
            }
        ]
    },
    {
        "id": "proj_132",
        "titulo": "🧺 Proyecto 132: Arquitectura Orientada a Eventos con Apache Kafka y Sagas Coreografiadas para Pedidos de Mercados Campesinos",
        "descripcion": "Problema: Las redes de mercados campesinos de Popayán coordinan pedidos, disponibilidad de productos, pagos y rutas de entrega entre decenas de productores mediante llamadas telefónicas y sistemas aislados; cuando un paso falla (un productor sin existencias o un pago rechazado) el pedido queda inconsistente, se pierden ventas y se desperdician alimentos perecederos.\n\nDescripción: Plataforma de pedidos basada en arquitectura orientada a eventos donde los servicios de pedidos, inventario de productores, pagos y logística se comunican exclusivamente mediante eventos de dominio en Apache Kafka, coordinando cada transacción con una saga coreografiada y acciones compensatorias; se evalúa la consistencia de los pedidos, la latencia extremo a extremo y la facilidad de incorporar nuevos servicios sin modificar los existentes.",
        "area": "Arquitectura de Software",
        "sector": "Comercio - Mercados campesinos",
        "nivel": "Avanzado",
        "duracion": "Un semestre",
        "presupuesto": "Bajo costo",
        "habilidades": [
            "Diseño de arquitecturas orientadas a eventos",
            "Modelado de eventos de dominio y esquemas versionados",
            "Administración de Apache Kafka",
            "Garantías de entrega e idempotencia en consumidores",
            "Transacciones distribuidas con el patrón Saga"
        ],
        "objetivos": [
            "🎯 Objetivo General: Diseñar e implementar una arquitectura orientada a eventos que coordine de forma consistente los pedidos de una red de mercados campesinos entre productores, pagos y entregas.",
            "📌 Objetivos Específicos:",
            "• Modelar al menos ocho eventos de dominio del ciclo de un pedido con esquemas versionados en un registro de esquemas.",
            "• Implementar una saga coreografiada con acciones compensatorias que deje el 100 % de los pedidos en un estado final consistente ante fallas inyectadas en pagos, inventario y reinicios del broker.",
            "• Medir el rendimiento (eventos por segundo) y la latencia extremo a extremo de la plataforma con 1 000 pedidos simulados de una jornada de mercado."
        ],
        "pasos": [
            "Análisis de requisitos",
            "Diseño de la solución",
            "Implementación y pruebas",
            "Validación y sustentación"
        ],
        "aplicaciones": [
            "Comercio - Mercados campesinos"
        ],
        "referencias": [],
        "hardware_tabla": [
            {
                "componente": "Clúster de 3 Raspberry Pi 5 (8 GB)",
                "categoria": "Servidor de Pruebas",
                "funcion": "Ejecuta los brokers de Kafka y los servicios consumidores de forma distribuida."
            },
            {
                "componente": "Unidades SSD por USB 3.0",
                "categoria": "Almacenamiento",
                "funcion": "Almacenan los registros de eventos de Kafka con mejor rendimiento que la microSD."
            },
            {
                "componente": "Teléfono inteligente Android",
                "categoria": "Interfaz de Usuario",
                "funcion": "Permite a productores y compradores registrar y consultar pedidos durante las pruebas piloto."
            },
            {
                "componente": "Switch Gigabit Ethernet",
                "categoria": "Red",
                "funcion": "Interconecta los nodos del clúster."
            }
        ],
        "software_tabla": [
            {
                "herramienta": "Apache Kafka (modo KRaft)",
                "tipo": "Plataforma de Mensajería / Streaming",
                "descripcion": "Para la publicación y retención de eventos de dominio"
            },
            {
                "herramienta": "Apicurio Registry",
                "tipo": "Registro de Esquemas",
                "descripcion": "Para versionar los esquemas Avro de los eventos"
            },
            {
                "herramienta": "Spring Boot con Spring Kafka",
                "tipo": "Framework Web / Aplicación",
                "descripcion": "Para los servicios productores y consumidores"
            },
            {
                "herramienta": "PostgreSQL",
                "tipo": "Base de Datos",
                "descripcion": "Para la base de datos propia de cada servicio"
            },
            {
                "herramienta": "Flutter",
                "tipo": "Aplicación Móvil",
                "descripcion": "Para la aplicación de pedidos de productores y compradores"
            }
        ]
    },
    {
        "id": "proj_133",
        "titulo": "🔭 Proyecto 133: Plataforma de Observabilidad con OpenTelemetry, Prometheus y Grafana para Servicios Web Institucionales",
        "descripcion": "Problema: Los equipos de TI de universidades y entidades públicas pequeñas se enteran de las fallas de sus servicios web por las quejas de los usuarios, porque carecen de métricas, trazas y registros centralizados que permitan detectar y diagnosticar incidentes a tiempo.\n\nDescripción: Plataforma de observabilidad de bajo costo que instrumenta servicios web con OpenTelemetry y centraliza métricas en Prometheus, trazas distribuidas en Grafana Tempo y registros en Grafana Loki, con tableros y alertas basadas en objetivos de nivel de servicio (SLO), evaluando la reducción del tiempo de detección y diagnóstico de fallas inyectadas.",
        "area": "Arquitectura de Software",
        "sector": "Tecnología - Operaciones de TI",
        "nivel": "Intermedio",
        "duracion": "Un semestre",
        "presupuesto": "Bajo costo",
        "habilidades": [
            "Instrumentación de aplicaciones con OpenTelemetry",
            "Monitoreo de métricas con Prometheus",
            "Trazabilidad distribuida y gestión de registros",
            "Definición de indicadores y objetivos de nivel de servicio (SLI/SLO)",
            "Diseño de tableros y alertas en Grafana"
        ],
        "objetivos": [
            "🎯 Objetivo General: Implementar una plataforma de observabilidad que integre métricas, trazas y registros de servicios web institucionales para detectar y diagnosticar incidentes de forma oportuna.",
            "📌 Objetivos Específicos:",
            "• Instrumentar al menos tres servicios web con OpenTelemetry y correlacionar sus métricas, trazas y registros en un único tablero.",
            "• Definir objetivos de nivel de servicio de disponibilidad y latencia con alertas automáticas por presupuesto de error.",
            "• Medir el tiempo medio de detección y de diagnóstico de diez fallas inyectadas, comparándolo con un escenario sin la plataforma."
        ],
        "pasos": [
            "Análisis de requisitos",
            "Diseño de la solución",
            "Implementación y pruebas",
            "Validación y sustentación"
        ],
        "aplicaciones": [
            "Tecnología - Operaciones de TI"
        ],
        "referencias": [],
        "hardware_tabla": [
            {
                "componente": "Mini PC con procesador de 4 núcleos y 16 GB RAM",
                "categoria": "Servidor de Pruebas",
                "funcion": "Aloja la pila de observabilidad (Prometheus, Tempo, Loki y Grafana)."
            },
            {
                "componente": "Raspberry Pi 4 (4 GB)",
                "categoria": "Servidor de Pruebas",
                "funcion": "Ejecuta los servicios web instrumentados que se monitorean."
            },
            {
                "componente": "Computador de desarrollo",
                "categoria": "Equipo de Cómputo",
                "funcion": "Desarrollo de la instrumentación y generación de tráfico de prueba."
            }
        ],
        "software_tabla": [
            {
                "herramienta": "OpenTelemetry SDK y Collector",
                "tipo": "Instrumentación / Telemetría",
                "descripcion": "Para generar y exportar métricas, trazas y registros"
            },
            {
                "herramienta": "Prometheus y Alertmanager",
                "tipo": "Monitoreo de Métricas",
                "descripcion": "Para almacenar métricas y gestionar alertas por SLO"
            },
            {
                "herramienta": "Grafana, Tempo y Loki",
                "tipo": "Visualización / Dashboard",
                "descripcion": "Para tableros, trazas distribuidas y registros centralizados"
            },
            {
                "herramienta": "Docker Compose",
                "tipo": "Contenerización",
                "descripcion": "Para desplegar la pila de observabilidad de forma reproducible"
            }
        ]
    },
    {
        "id": "proj_134",
        "titulo": "🏛️ Proyecto 134: Arquitectura Hexagonal para un Sistema de Agendamiento de Citas Médicas Desacoplado de Proveedores Externos",
        "descripcion": "Problema: Las IPS pequeñas del Cauca dependen de sistemas de agendamiento acoplados a un proveedor de mensajería, pagos o historia clínica específico; cuando cambian de proveedor deben reescribir buena parte del sistema, con costos elevados y semanas de servicio degradado para los pacientes.\n\nDescripción: Sistema de agendamiento de citas diseñado con arquitectura hexagonal (puertos y adaptadores), donde la lógica de negocio queda aislada de la base de datos, la mensajería (WhatsApp, SMS, correo) y la pasarela de pagos; se evalúa empíricamente el costo de sustituir adaptadores y la cobertura de pruebas del núcleo frente a una versión en capas tradicional.",
        "area": "Arquitectura de Software",
        "sector": "Salud - Gestión de citas médicas",
        "nivel": "Intermedio",
        "duracion": "Un semestre",
        "presupuesto": "Bajo costo",
        "habilidades": [
            "Arquitectura hexagonal y Clean Architecture",
            "Diseño de puertos, adaptadores e inversión de dependencias",
            "Pruebas unitarias del dominio con dobles de prueba",
            "Integración con servicios externos de mensajería",
            "Medición de mantenibilidad y acoplamiento"
        ],
        "objetivos": [
            "🎯 Objetivo General: Desarrollar un sistema de agendamiento de citas médicas con arquitectura hexagonal que permita sustituir proveedores externos sin modificar la lógica de negocio.",
            "📌 Objetivos Específicos:",
            "• Implementar el núcleo de dominio de agendamiento con una cobertura de pruebas unitarias superior al 85 % sin dependencias de infraestructura.",
            "• Construir al menos dos adaptadores intercambiables para persistencia y dos para notificaciones, verificando que su sustitución no altera el núcleo.",
            "• Comparar con una versión en capas tradicional las líneas modificadas y el tiempo requerido para cambiar de proveedor de notificaciones."
        ],
        "pasos": [
            "Análisis de requisitos",
            "Diseño de la solución",
            "Implementación y pruebas",
            "Validación y sustentación"
        ],
        "aplicaciones": [
            "Salud - Gestión de citas médicas"
        ],
        "referencias": [],
        "hardware_tabla": [
            {
                "componente": "Computador de desarrollo",
                "categoria": "Equipo de Cómputo",
                "funcion": "Desarrollo, pruebas y ejecución local del sistema."
            },
            {
                "componente": "Raspberry Pi 4 (4 GB)",
                "categoria": "Servidor de Pruebas",
                "funcion": "Despliegue del sistema en un entorno similar al de una IPS pequeña."
            }
        ],
        "software_tabla": [
            {
                "herramienta": "TypeScript con NestJS",
                "tipo": "Framework Web / Aplicación",
                "descripcion": "Para el núcleo de dominio y los adaptadores de entrada"
            },
            {
                "herramienta": "PostgreSQL y SQLite",
                "tipo": "Base de Datos",
                "descripcion": "Para los adaptadores de persistencia intercambiables"
            },
            {
                "herramienta": "Jest",
                "tipo": "Pruebas Automatizadas",
                "descripcion": "Para pruebas unitarias del dominio y de contrato de los adaptadores"
            },
            {
                "herramienta": "WhatsApp Business Cloud API / Telegram Bot API",
                "tipo": "Herramienta / Tecnología de Software",
                "descripcion": "Para los adaptadores de notificación a pacientes"
            },
            {
                "herramienta": "dependency-cruiser",
                "tipo": "Análisis Estático",
                "descripcion": "Para verificar las reglas de dependencia entre capas"
            }
        ]
    },
    {
        "id": "proj_135",
        "titulo": "🧾 Proyecto 135: Sistema de Ahorro y Crédito Cooperativo con CQRS y Event Sourcing para Auditoría Completa de Transacciones",
        "descripcion": "Problema: Las cooperativas y fondos de ahorro rurales manejan saldos que se sobrescriben en la base de datos, por lo que ante un reclamo de un asociado o una revisión del ente de control no pueden reconstruir con certeza cómo se llegó a un saldo, lo que genera desconfianza y sanciones.\n\nDescripción: Sistema de gestión de aportes, ahorros y créditos construido con CQRS y Event Sourcing, donde cada operación se almacena como un evento inmutable y los saldos se derivan por proyección; permite reconstruir el estado de cualquier cuenta en cualquier fecha y se evalúa el costo de rendimiento de las proyecciones y de las instantáneas frente a un modelo CRUD tradicional.",
        "area": "Arquitectura de Software",
        "sector": "Finanzas - Cooperativas de ahorro y crédito",
        "nivel": "Avanzado",
        "duracion": "Un semestre",
        "presupuesto": "Bajo costo",
        "habilidades": [
            "Separación de comandos y consultas (CQRS)",
            "Persistencia basada en eventos (Event Sourcing)",
            "Diseño de proyecciones e instantáneas",
            "Consistencia eventual y manejo de concurrencia optimista",
            "Auditoría de sistemas financieros"
        ],
        "objetivos": [
            "🎯 Objetivo General: Implementar un sistema de ahorro y crédito cooperativo basado en CQRS y Event Sourcing que garantice la auditoría completa y la reconstrucción histórica de cada cuenta.",
            "📌 Objetivos Específicos:",
            "• Modelar los agregados de cuenta de ahorro y crédito con al menos ocho tipos de eventos inmutables y control de concurrencia optimista.",
            "• Reconstruir el saldo de cualquier cuenta en una fecha arbitraria con un error de cero frente a un conjunto de 10 000 transacciones de prueba.",
            "• Medir la latencia de lectura y escritura con y sin instantáneas, comparándola con una implementación CRUD equivalente."
        ],
        "pasos": [
            "Análisis de requisitos",
            "Diseño de la solución",
            "Implementación y pruebas",
            "Validación y sustentación"
        ],
        "aplicaciones": [
            "Finanzas - Cooperativas de ahorro y crédito"
        ],
        "referencias": [],
        "hardware_tabla": [
            {
                "componente": "Computador de desarrollo",
                "categoria": "Equipo de Cómputo",
                "funcion": "Desarrollo y ejecución de las pruebas de rendimiento."
            },
            {
                "componente": "Mini PC con 16 GB RAM",
                "categoria": "Servidor de Pruebas",
                "funcion": "Aloja el almacén de eventos y las bases de datos de lectura."
            }
        ],
        "software_tabla": [
            {
                "herramienta": "EventStoreDB (KurrentDB)",
                "tipo": "Base de Datos de Eventos",
                "descripcion": "Para almacenar los eventos inmutables de cada cuenta"
            },
            {
                "herramienta": ".NET con ASP.NET Core",
                "tipo": "Framework Web / Aplicación",
                "descripcion": "Para los manejadores de comandos y la API de consultas"
            },
            {
                "herramienta": "PostgreSQL",
                "tipo": "Base de Datos",
                "descripcion": "Para los modelos de lectura proyectados"
            },
            {
                "herramienta": "xUnit",
                "tipo": "Pruebas Automatizadas",
                "descripcion": "Para pruebas de agregados en formato dado-cuando-entonces"
            },
            {
                "herramienta": "BenchmarkDotNet",
                "tipo": "Medición de Rendimiento",
                "descripcion": "Para comparar el rendimiento frente al modelo CRUD"
            }
        ]
    },
    {
        "id": "proj_136",
        "titulo": "🏢 Proyecto 136: Plataforma SaaS Multi-Tenant para la Gestión de Inventario y Ventas de Talleres Artesanales",
        "descripcion": "Problema: Los talleres artesanales de Popayán y el Cauca (tejeduría, cerámica, marroquinería) no pueden pagar un software de inventario individual, y las soluciones compartidas sin un buen aislamiento ponen en riesgo que los datos de un negocio queden expuestos a otro.\n\nDescripción: Plataforma SaaS multi-tenant que ofrece inventario, ventas y reportes a múltiples talleres desde una única instalación; se implementan y comparan tres estrategias de aislamiento de datos (base de datos compartida con seguridad a nivel de fila, esquema por tenant y base de datos por tenant) en términos de costo, rendimiento y riesgo de fuga de información.",
        "area": "Arquitectura de Software",
        "sector": "Comercio - Microempresas artesanales",
        "nivel": "Intermedio-Avanzado",
        "duracion": "Un semestre",
        "presupuesto": "Bajo costo",
        "habilidades": [
            "Diseño de arquitecturas SaaS multi-tenant",
            "Estrategias de aislamiento de datos por tenant",
            "Seguridad a nivel de fila en PostgreSQL",
            "Gestión de identidades y autenticación por organización",
            "Evaluación de costo y rendimiento de arquitecturas"
        ],
        "objetivos": [
            "🎯 Objetivo General: Desarrollar una plataforma SaaS multi-tenant de inventario y ventas para talleres artesanales que garantice el aislamiento de los datos de cada negocio.",
            "📌 Objetivos Específicos:",
            "• Implementar las tres estrategias de aislamiento de datos sobre el mismo código de aplicación, seleccionables por configuración.",
            "• Verificar mediante pruebas automatizadas de acceso cruzado que ningún tenant puede leer ni modificar datos de otro en ninguna de las estrategias.",
            "• Comparar el consumo de recursos y la latencia de cada estrategia con 50 tenants simulados y publicar una guía de selección."
        ],
        "pasos": [
            "Análisis de requisitos",
            "Diseño de la solución",
            "Implementación y pruebas",
            "Validación y sustentación"
        ],
        "aplicaciones": [
            "Comercio - Microempresas artesanales"
        ],
        "referencias": [],
        "hardware_tabla": [
            {
                "componente": "Mini PC con 16 GB RAM",
                "categoria": "Servidor de Pruebas",
                "funcion": "Aloja la plataforma SaaS y las bases de datos de los tenants."
            },
            {
                "componente": "Computador de desarrollo",
                "categoria": "Equipo de Cómputo",
                "funcion": "Desarrollo y generación de carga con tenants simulados."
            },
            {
                "componente": "Lector de código de barras USB",
                "categoria": "Periférico de Entrada",
                "funcion": "Registra productos en el inventario de los talleres durante las pruebas piloto."
            }
        ],
        "software_tabla": [
            {
                "herramienta": "Django con django-tenants",
                "tipo": "Framework Web / Aplicación",
                "descripcion": "Para la aplicación y la estrategia de esquema por tenant"
            },
            {
                "herramienta": "PostgreSQL con Row Level Security",
                "tipo": "Base de Datos",
                "descripcion": "Para la estrategia de base de datos compartida con aislamiento por fila"
            },
            {
                "herramienta": "Keycloak",
                "tipo": "Gestión de Identidades",
                "descripcion": "Para la autenticación por organización y roles por tenant"
            },
            {
                "herramienta": "Locust",
                "tipo": "Pruebas de Carga",
                "descripcion": "Para simular el uso concurrente de múltiples tenants"
            }
        ]
    },
    {
        "id": "proj_137",
        "titulo": "🚪 Proyecto 137: API Gateway con Autenticación Centralizada y Limitación de Tasa para Servicios Digitales de Alcaldías Municipales",
        "descripcion": "Problema: Las alcaldías de municipios pequeños exponen trámites en línea (certificados, impuestos, PQRS) mediante servicios independientes, cada uno con su propia autenticación y sin control de tráfico, lo que genera inconsistencias de seguridad y caídas cuando se concentran las solicitudes en fechas de vencimiento de impuestos.\n\nDescripción: Implementación de un API Gateway que centraliza la autenticación con OpenID Connect, la limitación de tasa, el registro de auditoría y el enrutamiento de los servicios de trámites municipales, evaluando su efecto sobre la disponibilidad y la latencia ante picos de tráfico simulados.",
        "area": "Arquitectura de Software",
        "sector": "Gobierno - Servicios ciudadanos digitales",
        "nivel": "Intermedio",
        "duracion": "Un semestre",
        "presupuesto": "Bajo costo",
        "habilidades": [
            "Diseño e implementación de API Gateways",
            "Autenticación y autorización con OAuth 2.0 y OpenID Connect",
            "Políticas de limitación de tasa y cuotas",
            "Documentación de APIs con OpenAPI",
            "Pruebas de carga y análisis de latencia"
        ],
        "objetivos": [
            "🎯 Objetivo General: Implementar un API Gateway que unifique la seguridad, el control de tráfico y el enrutamiento de los servicios digitales de una alcaldía municipal.",
            "📌 Objetivos Específicos:",
            "• Integrar al menos tres servicios de trámites detrás del gateway con autenticación centralizada mediante OpenID Connect.",
            "• Configurar políticas de limitación de tasa que mantengan la disponibilidad por encima del 99 % ante un pico simulado de diez veces el tráfico normal.",
            "• Cuantificar la latencia adicional introducida por el gateway y documentar las APIs expuestas con OpenAPI."
        ],
        "pasos": [
            "Análisis de requisitos",
            "Diseño de la solución",
            "Implementación y pruebas",
            "Validación y sustentación"
        ],
        "aplicaciones": [
            "Gobierno - Servicios ciudadanos digitales"
        ],
        "referencias": [],
        "hardware_tabla": [
            {
                "componente": "Raspberry Pi 5 (8 GB)",
                "categoria": "Servidor de Pruebas",
                "funcion": "Ejecuta el API Gateway y el proveedor de identidad."
            },
            {
                "componente": "Computador de desarrollo",
                "categoria": "Equipo de Cómputo",
                "funcion": "Aloja los servicios de trámites simulados y genera la carga de pruebas."
            },
            {
                "componente": "Router con soporte VLAN",
                "categoria": "Red",
                "funcion": "Separa la red pública del gateway de la red interna de servicios."
            }
        ],
        "software_tabla": [
            {
                "herramienta": "Kong Gateway (OSS) / Apache APISIX",
                "tipo": "API Gateway",
                "descripcion": "Para enrutamiento, limitación de tasa y registro de auditoría"
            },
            {
                "herramienta": "Keycloak",
                "tipo": "Gestión de Identidades",
                "descripcion": "Para la autenticación centralizada con OpenID Connect"
            },
            {
                "herramienta": "FastAPI",
                "tipo": "Framework Web / Aplicación",
                "descripcion": "Para los servicios de trámites municipales simulados"
            },
            {
                "herramienta": "Grafana k6",
                "tipo": "Pruebas de Carga",
                "descripcion": "Para simular picos de tráfico en fechas de vencimiento"
            },
            {
                "herramienta": "Swagger UI / OpenAPI 3",
                "tipo": "Documentación de APIs",
                "descripcion": "Para documentar y probar las APIs expuestas"
            }
        ]
    },
    {
        "id": "proj_138",
        "titulo": "📈 Proyecto 138: Banco de Pruebas de Carga para Comparar Monolito, Microservicios y Serverless en la Venta de Boletería de Semana Santa",
        "descripcion": "Problema: Durante la Semana Santa de Popayán y otros eventos culturales, los sistemas de reserva y boletería reciben picos de demanda que provocan caídas y ventas perdidas, y los equipos de desarrollo locales eligen el estilo arquitectónico sin evidencia sobre cuál se comporta mejor con recursos limitados.\n\nDescripción: Banco de pruebas reproducible que implementa la misma aplicación de boletería en tres estilos arquitectónicos (monolito modular, microservicios y funciones serverless sobre OpenFaaS) desplegados en el mismo hardware, y los somete a escenarios de carga, pico y resistencia para comparar rendimiento, consumo de recursos y costo por transacción.",
        "area": "Arquitectura de Software",
        "sector": "Turismo - Eventos culturales",
        "nivel": "Intermedio-Avanzado",
        "duracion": "Un semestre",
        "presupuesto": "Bajo costo",
        "habilidades": [
            "Diseño de experimentos de rendimiento de software",
            "Pruebas de carga, pico y resistencia",
            "Despliegue de funciones serverless autohospedadas",
            "Orquestación de contenedores con Kubernetes ligero",
            "Análisis estadístico de resultados de rendimiento"
        ],
        "objetivos": [
            "🎯 Objetivo General: Comparar experimentalmente el desempeño de los estilos monolítico, de microservicios y serverless ante picos de demanda en una aplicación de boletería para eventos culturales.",
            "📌 Objetivos Específicos:",
            "• Implementar la misma funcionalidad de reserva y pago simulado en los tres estilos arquitectónicos con pruebas funcionales comunes.",
            "• Ejecutar al menos tres escenarios de carga (carga sostenida, pico súbito y resistencia de una hora) con cinco repeticiones por estilo.",
            "• Comparar con pruebas estadísticas el percentil 95 de latencia, la tasa de errores y el consumo de CPU y memoria de cada estilo."
        ],
        "pasos": [
            "Análisis de requisitos",
            "Diseño de la solución",
            "Implementación y pruebas",
            "Validación y sustentación"
        ],
        "aplicaciones": [
            "Turismo - Eventos culturales"
        ],
        "referencias": [],
        "hardware_tabla": [
            {
                "componente": "Clúster de 3 Raspberry Pi 5 (8 GB)",
                "categoria": "Servidor de Pruebas",
                "funcion": "Despliega los tres estilos arquitectónicos con recursos idénticos."
            },
            {
                "componente": "Computador de desarrollo",
                "categoria": "Equipo de Cómputo",
                "funcion": "Genera la carga de pruebas y recolecta los resultados."
            },
            {
                "componente": "Switch Gigabit Ethernet",
                "categoria": "Red",
                "funcion": "Interconecta el generador de carga con el clúster."
            },
            {
                "componente": "Medidor de consumo eléctrico USB",
                "categoria": "Instrumento de Medición",
                "funcion": "Registra el consumo energético de cada estilo durante las pruebas."
            }
        ],
        "software_tabla": [
            {
                "herramienta": "K3s",
                "tipo": "Orquestación de Contenedores",
                "descripcion": "Para desplegar microservicios y funciones en el clúster"
            },
            {
                "herramienta": "OpenFaaS",
                "tipo": "Plataforma Serverless",
                "descripcion": "Para la implementación basada en funciones"
            },
            {
                "herramienta": "Grafana k6",
                "tipo": "Pruebas de Carga",
                "descripcion": "Para los escenarios de carga sostenida, pico y resistencia"
            },
            {
                "herramienta": "Prometheus y Grafana",
                "tipo": "Monitoreo de Métricas",
                "descripcion": "Para registrar el consumo de recursos de cada estilo"
            },
            {
                "herramienta": "Python con pandas y SciPy",
                "tipo": "Análisis de Datos",
                "descripcion": "Para el análisis estadístico de los resultados"
            }
        ]
    },
    {
        "id": "proj_139",
        "titulo": "🛡️ Proyecto 139: Patrones de Resiliencia con Inyección de Fallos para una Plataforma de Reservas de Transporte Intermunicipal",
        "descripcion": "Problema: Las plataformas de reserva de pasajes intermunicipales del suroccidente colombiano dependen de servicios externos de pago, disponibilidad de cupos y mensajería; cuando uno de ellos falla o se vuelve lento, la falla se propaga en cascada y deja a los viajeros sin poder comprar tiquetes.\n\nDescripción: Plataforma de reservas basada en microservicios en la que se aplican patrones de resiliencia (circuit breaker, reintentos con espera exponencial, timeouts, bulkhead y respuestas de respaldo) y se evalúa su efectividad mediante experimentos de ingeniería del caos que inyectan latencia, errores y caídas de servicios dependientes.",
        "area": "Arquitectura de Software",
        "sector": "Transporte - Pasajeros intermunicipales",
        "nivel": "Avanzado",
        "duracion": "Un semestre",
        "presupuesto": "Bajo costo",
        "habilidades": [
            "Patrones de resiliencia en sistemas distribuidos",
            "Ingeniería del caos e inyección de fallos",
            "Diseño de experimentos con hipótesis de estado estable",
            "Monitoreo del comportamiento ante fallas",
            "Microservicios con Java y Spring Boot"
        ],
        "objetivos": [
            "🎯 Objetivo General: Evaluar la efectividad de los patrones de resiliencia para evitar fallas en cascada en una plataforma de reservas de transporte intermunicipal basada en microservicios.",
            "📌 Objetivos Específicos:",
            "• Implementar al menos cuatro patrones de resiliencia en las llamadas entre microservicios con configuración externalizada.",
            "• Diseñar y ejecutar como mínimo seis experimentos de caos (latencia, errores y caída total de dependencias) con hipótesis de estado estable definidas.",
            "• Comparar la tasa de reservas exitosas y el tiempo de recuperación con y sin patrones de resiliencia en cada experimento."
        ],
        "pasos": [
            "Análisis de requisitos",
            "Diseño de la solución",
            "Implementación y pruebas",
            "Validación y sustentación"
        ],
        "aplicaciones": [
            "Transporte - Pasajeros intermunicipales"
        ],
        "referencias": [],
        "hardware_tabla": [
            {
                "componente": "Mini PC con 16 GB RAM",
                "categoria": "Servidor de Pruebas",
                "funcion": "Ejecuta los microservicios y las herramientas de inyección de fallos."
            },
            {
                "componente": "Computador de desarrollo",
                "categoria": "Equipo de Cómputo",
                "funcion": "Desarrollo de los servicios y generación de tráfico de reservas."
            }
        ],
        "software_tabla": [
            {
                "herramienta": "Spring Boot con Resilience4j",
                "tipo": "Framework Web / Aplicación",
                "descripcion": "Para los microservicios y los patrones de resiliencia"
            },
            {
                "herramienta": "Toxiproxy",
                "tipo": "Inyección de Fallos",
                "descripcion": "Para simular latencia, errores y cortes en las dependencias"
            },
            {
                "herramienta": "WireMock",
                "tipo": "Simulación de Servicios",
                "descripcion": "Para simular las pasarelas de pago y servicios externos"
            },
            {
                "herramienta": "Prometheus y Grafana",
                "tipo": "Monitoreo de Métricas",
                "descripcion": "Para observar el estado de los circuit breakers y la tasa de éxito"
            },
            {
                "herramienta": "Grafana k6",
                "tipo": "Pruebas de Carga",
                "descripcion": "Para mantener tráfico de reservas durante los experimentos"
            }
        ]
    },
    {
        "id": "proj_140",
        "titulo": "⚖️ Proyecto 140: Evaluación Arquitectónica con ATAM y Registros de Decisiones (ADR) de los Sistemas de Información de una Universidad Pública",
        "descripcion": "Problema: Las universidades públicas regionales toman decisiones de arquitectura de sus sistemas de información sin documentarlas ni evaluar los atributos de calidad, por lo que los riesgos de desempeño, seguridad y mantenibilidad se descubren tarde y el conocimiento se pierde cuando rota el personal de TI.\n\nDescripción: Aplicación del método ATAM (Architecture Tradeoff Analysis Method) a los sistemas de información de una universidad pública como caso de estudio, complementada con un repositorio de registros de decisiones arquitectónicas (ADR) y un modelo C4 documentado como código, para identificar riesgos, puntos de sensibilidad y compromisos, y proponer una hoja de ruta priorizada.",
        "area": "Arquitectura de Software",
        "sector": "Educación superior - Gobierno de TI",
        "nivel": "Intermedio",
        "duracion": "Un semestre",
        "presupuesto": "Bajo costo",
        "habilidades": [
            "Evaluación de arquitecturas con ATAM",
            "Especificación de escenarios de atributos de calidad",
            "Documentación de decisiones con ADR",
            "Modelado de arquitectura con el modelo C4",
            "Facilitación de talleres con partes interesadas"
        ],
        "objetivos": [
            "🎯 Objetivo General: Evaluar la arquitectura de los sistemas de información de una universidad pública mediante ATAM y establecer una práctica sostenible de documentación de decisiones arquitectónicas.",
            "📌 Objetivos Específicos:",
            "• Construir un árbol de utilidad con al menos quince escenarios de atributos de calidad priorizados con las partes interesadas.",
            "• Identificar y clasificar los riesgos, puntos de sensibilidad y compromisos de la arquitectura en un informe de evaluación ATAM.",
            "• Documentar al menos diez decisiones arquitectónicas como ADR y un modelo C4 versionado, y medir su utilidad mediante una encuesta al equipo de TI."
        ],
        "pasos": [
            "Análisis de requisitos",
            "Diseño de la solución",
            "Implementación y pruebas",
            "Validación y sustentación"
        ],
        "aplicaciones": [
            "Educación superior - Gobierno de TI"
        ],
        "referencias": [],
        "hardware_tabla": [
            {
                "componente": "Computador de desarrollo",
                "categoria": "Equipo de Cómputo",
                "funcion": "Modelado de la arquitectura y redacción de la documentación."
            },
            {
                "componente": "Proyector o pantalla del laboratorio",
                "categoria": "Interfaz de Usuario",
                "funcion": "Apoya los talleres de evaluación con las partes interesadas."
            }
        ],
        "software_tabla": [
            {
                "herramienta": "Structurizr DSL",
                "tipo": "Modelado de Arquitectura",
                "descripcion": "Para el modelo C4 documentado como código"
            },
            {
                "herramienta": "adr-tools / Log4brains",
                "tipo": "Documentación de Arquitectura",
                "descripcion": "Para crear y publicar los registros de decisiones arquitectónicas"
            },
            {
                "herramienta": "Git y GitHub",
                "tipo": "Control de Versiones",
                "descripcion": "Para versionar los ADR y el modelo de arquitectura"
            },
            {
                "herramienta": "Miro / Excalidraw",
                "tipo": "Colaboración Visual",
                "descripcion": "Para el árbol de utilidad y los talleres ATAM"
            }
        ]
    }
];
