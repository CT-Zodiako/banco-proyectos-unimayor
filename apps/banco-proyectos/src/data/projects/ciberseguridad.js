// Projects for this area. Each entry follows the schema checked by scripts/projects-validation.mjs.
export default [
    {
        "id": "proj_111",
        "titulo": "🔐 Proyecto 111: Laboratorio de Pentesting Web Basado en OWASP Top 10 para Formación Universitaria",
        "descripcion": "Problema: Los estudiantes de ingeniería de sistemas de las universidades del Cauca aprenden seguridad web casi solo en teoría, porque no cuentan con un entorno legal y aislado donde practicar ataques reales; al egresar, las empresas regionales reciben profesionales que no saben reconocer ni corregir vulnerabilidades comunes como inyección SQL o control de acceso roto.\n\nDescripción: Laboratorio virtualizado y aislado, desplegado en un servidor del Laboratorio de Física y Sistemas Embebidos, con aplicaciones vulnerables intencionalmente (OWASP Juice Shop, DVWA y una aplicación propia con contexto regional), guías de práctica alineadas con el OWASP Top 10 y un tablero que registra el progreso de cada estudiante, permitiendo medir la mejora en la detección y corrección de vulnerabilidades.",
        "area": "Ciberseguridad",
        "sector": "Educación superior",
        "nivel": "Intermedio",
        "duracion": "Un semestre",
        "presupuesto": "Bajo costo",
        "habilidades": [
            "Pruebas de penetración en aplicaciones web",
            "Conocimiento del OWASP Top 10",
            "Virtualización y contenedores",
            "Desarrollo seguro y corrección de vulnerabilidades",
            "Diseño de material didáctico en seguridad"
        ],
        "objetivos": [
            "🎯 Objetivo General: Implementar un laboratorio aislado de pruebas de penetración web basado en el OWASP Top 10 que permita a los estudiantes practicar la detección, explotación controlada y corrección de vulnerabilidades.",
            "📌 Objetivos Específicos:",
            "• Desplegar en contenedores al menos tres aplicaciones vulnerables que cubran como mínimo 8 de las 10 categorías del OWASP Top 10.",
            "• Elaborar 10 guías de práctica con criterios de evaluación y su correspondiente procedimiento de corrección del código.",
            "• Medir con un grupo piloto de al menos 20 estudiantes la mejora entre una prueba diagnóstica y una prueba final de detección de vulnerabilidades."
        ],
        "pasos": [
            "Análisis de requisitos",
            "Diseño de la solución",
            "Implementación y pruebas",
            "Validación y sustentación"
        ],
        "aplicaciones": [
            "Educación superior"
        ],
        "referencias": [],
        "hardware_tabla": [
            {
                "componente": "Servidor o computador de escritorio con 16 GB de RAM",
                "categoria": "Servidor",
                "funcion": "Aloja los contenedores con las aplicaciones vulnerables del laboratorio."
            },
            {
                "componente": "Router o switch administrable aislado",
                "categoria": "Red",
                "funcion": "Mantiene el laboratorio en una red separada de la red institucional."
            },
            {
                "componente": "Computadores de los estudiantes",
                "categoria": "Estación de Trabajo",
                "funcion": "Ejecutan las herramientas de auditoría durante las prácticas."
            }
        ],
        "software_tabla": [
            {
                "herramienta": "OWASP Juice Shop y DVWA",
                "tipo": "Aplicación Vulnerable de Práctica",
                "descripcion": "Objetivos de ataque controlados para las prácticas."
            },
            {
                "herramienta": "Docker y Docker Compose",
                "tipo": "Contenedores",
                "descripcion": "Despliegue reproducible y reinicio rápido del laboratorio."
            },
            {
                "herramienta": "Burp Suite Community y OWASP ZAP",
                "tipo": "Herramienta de Auditoría Web",
                "descripcion": "Interceptación y análisis de peticiones HTTP."
            },
            {
                "herramienta": "Kali Linux",
                "tipo": "Sistema Operativo",
                "descripcion": "Distribución con herramientas de pentesting para los estudiantes."
            },
            {
                "herramienta": "CTFd",
                "tipo": "Plataforma de Seguimiento",
                "descripcion": "Registro del progreso y puntaje de cada estudiante."
            }
        ]
    },
    {
        "id": "proj_112",
        "titulo": "🛡️ Proyecto 112: Centro de Operaciones de Seguridad (SOC) de Bajo Costo con Wazuh para Pymes del Cauca",
        "descripcion": "Problema: Las pequeñas y medianas empresas de Popayán (almacenes, cooperativas, consultorios) no pueden pagar un servicio de monitoreo de seguridad, por lo que un ransomware o un acceso no autorizado suele detectarse días después, cuando ya se han perdido datos de clientes y facturación.\n\nDescripción: SOC compacto basado en Wazuh y OpenSearch que recolecta registros de los equipos de una pyme, aplica reglas de detección mapeadas a MITRE ATT&CK, genera alertas por Telegram y ofrece un tablero de incidentes; se valida con ataques simulados en un entorno controlado para medir tiempos de detección y tasa de falsos positivos.",
        "area": "Ciberseguridad",
        "sector": "Comercio - Pequeñas y medianas empresas",
        "nivel": "Intermedio-Avanzado",
        "duracion": "Un semestre",
        "presupuesto": "Bajo costo",
        "habilidades": [
            "Administración de SIEM y XDR",
            "Análisis de registros y correlación de eventos",
            "Uso del marco MITRE ATT&CK",
            "Respuesta a incidentes de seguridad",
            "Emulación de adversarios"
        ],
        "objetivos": [
            "🎯 Objetivo General: Diseñar e implementar un centro de operaciones de seguridad de bajo costo basado en software libre que permita a una pyme detectar y responder oportunamente a incidentes.",
            "📌 Objetivos Específicos:",
            "• Integrar al SIEM al menos 10 equipos Windows y Linux con recolección de registros, monitoreo de integridad de archivos y detección de vulnerabilidades.",
            "• Configurar reglas de detección para al menos 15 técnicas de MITRE ATT&CK y validarlas con Atomic Red Team.",
            "• Medir el tiempo medio de detección y la tasa de falsos positivos durante cuatro semanas de operación piloto."
        ],
        "pasos": [
            "Análisis de requisitos",
            "Diseño de la solución",
            "Implementación y pruebas",
            "Validación y sustentación"
        ],
        "aplicaciones": [
            "Comercio - Pequeñas y medianas empresas"
        ],
        "referencias": [],
        "hardware_tabla": [
            {
                "componente": "Mini PC o servidor con 16 GB de RAM y disco SSD de 512 GB",
                "categoria": "Servidor",
                "funcion": "Ejecuta el gestor de Wazuh, el indexador y el tablero."
            },
            {
                "componente": "Equipos de escritorio de prueba (Windows y Linux)",
                "categoria": "Estación de Trabajo",
                "funcion": "Simulan los puestos de trabajo de la pyme con agentes instalados."
            },
            {
                "componente": "Switch administrable con puerto espejo",
                "categoria": "Red",
                "funcion": "Copia el tráfico de red hacia el sensor de detección."
            }
        ],
        "software_tabla": [
            {
                "herramienta": "Wazuh",
                "tipo": "SIEM / XDR",
                "descripcion": "Recolección de registros, reglas de detección y respuesta activa."
            },
            {
                "herramienta": "Suricata",
                "tipo": "Sistema de Detección de Intrusiones de Red",
                "descripcion": "Análisis del tráfico copiado desde el switch."
            },
            {
                "herramienta": "Atomic Red Team",
                "tipo": "Emulación de Adversarios",
                "descripcion": "Ejecución de técnicas ATT&CK para validar las reglas."
            },
            {
                "herramienta": "Telegram Bot API",
                "tipo": "Notificaciones",
                "descripcion": "Envío de alertas críticas al responsable de la empresa."
            }
        ]
    },
    {
        "id": "proj_113",
        "titulo": "🔍 Proyecto 113: Kit de Informática Forense para Adquisición y Análisis de Evidencia Digital en Equipos de Cómputo",
        "descripcion": "Problema: En procesos judiciales y disciplinarios de la región, la evidencia digital de computadores y memorias USB se pierde o es impugnada porque se recolecta sin bloqueo de escritura, sin verificación de integridad y sin cadena de custodia documentada, y los laboratorios forenses comerciales tienen costos inalcanzables para universidades y entidades pequeñas.\n\nDescripción: Kit forense portátil compuesto por un bloqueador de escritura construido con Raspberry Pi, procedimientos estandarizados según ISO/IEC 27037 y un flujo de análisis con herramientas libres que genera automáticamente el informe y el registro de cadena de custodia con hashes verificables, evaluado frente a imágenes de prueba de referencia del NIST.",
        "area": "Ciberseguridad",
        "sector": "Justicia - Investigación judicial",
        "nivel": "Avanzado",
        "duracion": "Un semestre",
        "presupuesto": "Bajo costo",
        "habilidades": [
            "Adquisición forense de evidencia digital",
            "Análisis de sistemas de archivos",
            "Cadena de custodia e ISO/IEC 27037",
            "Análisis de memoria RAM",
            "Redacción de informes periciales"
        ],
        "objetivos": [
            "🎯 Objetivo General: Desarrollar un kit forense portátil de bajo costo que permita adquirir y analizar evidencia digital preservando su integridad y documentando la cadena de custodia.",
            "📌 Objetivos Específicos:",
            "• Construir un bloqueador de escritura USB basado en Raspberry Pi y verificar con hashes SHA-256 que no altera ningún bit del medio original.",
            "• Automatizar el análisis de imágenes de disco y memoria para extraer línea de tiempo, archivos eliminados y artefactos de navegación.",
            "• Comparar los resultados del kit con los resultados esperados de al menos tres imágenes de referencia del proyecto CFReDS del NIST."
        ],
        "pasos": [
            "Análisis de requisitos",
            "Diseño de la solución",
            "Implementación y pruebas",
            "Validación y sustentación"
        ],
        "aplicaciones": [
            "Justicia - Investigación judicial"
        ],
        "referencias": [],
        "hardware_tabla": [
            {
                "componente": "Raspberry Pi 4 Model B (4 GB)",
                "categoria": "Computador de Placa Única",
                "funcion": "Funciona como bloqueador de escritura y estación de adquisición."
            },
            {
                "componente": "Adaptadores USB a SATA y lector de tarjetas",
                "categoria": "Interfaz de Almacenamiento",
                "funcion": "Conectan los discos y memorias que contienen la evidencia."
            },
            {
                "componente": "Disco externo de 2 TB",
                "categoria": "Almacenamiento",
                "funcion": "Guarda las imágenes forenses adquiridas."
            },
            {
                "componente": "Computador portátil de análisis",
                "categoria": "Estación de Trabajo",
                "funcion": "Ejecuta las herramientas de análisis y genera el informe."
            }
        ],
        "software_tabla": [
            {
                "herramienta": "Autopsy y The Sleuth Kit",
                "tipo": "Análisis Forense",
                "descripcion": "Análisis de sistemas de archivos y recuperación de archivos eliminados."
            },
            {
                "herramienta": "Guymager y dc3dd",
                "tipo": "Adquisición Forense",
                "descripcion": "Creación de imágenes de disco con verificación de hash."
            },
            {
                "herramienta": "Volatility 3",
                "tipo": "Análisis de Memoria",
                "descripcion": "Extracción de procesos y conexiones desde volcados de RAM."
            },
            {
                "herramienta": "Python",
                "tipo": "Lenguaje de Programación",
                "descripcion": "Automatización del informe y del registro de cadena de custodia."
            }
        ]
    },
    {
        "id": "proj_114",
        "titulo": "🦠 Proyecto 114: Sandbox de Análisis de Malware de Escritorio con Reglas YARA y Clasificación Automatizada",
        "descripcion": "Problema: Las áreas de sistemas de alcaldías, colegios y empresas de la región reciben a diario adjuntos sospechosos, pero no tienen capacidad para analizarlos; terminan ejecutándolos o eliminándolos sin saber si se trataba de un troyano bancario o de un ransomware que ya circula en Colombia.\n\nDescripción: Sandbox aislado con máquinas virtuales Windows instrumentadas que ejecuta muestras sospechosas, registra su comportamiento (procesos, archivos, red y registro de Windows), las clasifica mediante reglas YARA propias y públicas y genera un informe con indicadores de compromiso, evaluado con un conjunto etiquetado de muestras obtenidas de MalwareBazaar.",
        "area": "Ciberseguridad",
        "sector": "Servicios - Respuesta a incidentes",
        "nivel": "Avanzado",
        "duracion": "Un semestre",
        "presupuesto": "Bajo costo",
        "habilidades": [
            "Análisis estático y dinámico de malware",
            "Escritura de reglas YARA",
            "Virtualización y aislamiento de red",
            "Extracción de indicadores de compromiso",
            "Manejo seguro de muestras maliciosas"
        ],
        "objetivos": [
            "🎯 Objetivo General: Implementar un sandbox aislado que analice automáticamente muestras de malware de escritorio y las clasifique por familia mediante reglas YARA y comportamiento observado.",
            "📌 Objetivos Específicos:",
            "• Configurar un entorno de análisis aislado con al menos dos máquinas virtuales Windows instrumentadas y red simulada.",
            "• Escribir y ajustar reglas YARA para al menos 8 familias de malware y medir su precisión y exhaustividad sobre 200 muestras etiquetadas.",
            "• Generar informes automáticos con indicadores de compromiso en formato STIX listos para compartir con otras entidades."
        ],
        "pasos": [
            "Análisis de requisitos",
            "Diseño de la solución",
            "Implementación y pruebas",
            "Validación y sustentación"
        ],
        "aplicaciones": [
            "Servicios - Respuesta a incidentes"
        ],
        "referencias": [],
        "hardware_tabla": [
            {
                "componente": "Computador con 32 GB de RAM y soporte de virtualización",
                "categoria": "Servidor",
                "funcion": "Ejecuta las máquinas virtuales de análisis."
            },
            {
                "componente": "Router dedicado sin conexión a la red institucional",
                "categoria": "Red",
                "funcion": "Aísla físicamente el sandbox para evitar propagación."
            }
        ],
        "software_tabla": [
            {
                "herramienta": "CAPEv2",
                "tipo": "Sandbox de Malware",
                "descripcion": "Ejecución instrumentada y registro de comportamiento."
            },
            {
                "herramienta": "YARA",
                "tipo": "Motor de Firmas",
                "descripcion": "Clasificación de muestras por patrones y familias."
            },
            {
                "herramienta": "INetSim",
                "tipo": "Simulador de Servicios de Red",
                "descripcion": "Simula Internet para observar el tráfico malicioso sin riesgo."
            },
            {
                "herramienta": "VirtualBox o KVM",
                "tipo": "Virtualización",
                "descripcion": "Máquinas virtuales Windows con instantáneas restaurables."
            },
            {
                "herramienta": "Ghidra",
                "tipo": "Ingeniería Inversa",
                "descripcion": "Análisis estático complementario de muestras seleccionadas."
            }
        ]
    },
    {
        "id": "proj_115",
        "titulo": "🧮 Proyecto 115: Banco de Pruebas de Criptografía Poscuántica (ML-KEM y ML-DSA) en Hardware de Bajo Costo",
        "descripcion": "Problema: Las entidades que guardan información de larga vida (historias clínicas, registros notariales, datos académicos) deberán migrar a criptografía poscuántica, pero no existen mediciones locales de cuánto afectan los nuevos estándares del NIST al rendimiento de los equipos modestos que realmente usan estas instituciones.\n\nDescripción: Banco de pruebas que implementa y compara ML-KEM (FIPS 203) y ML-DSA (FIPS 204) frente a RSA y ECDH/ECDSA en computadores de escritorio, Raspberry Pi y servidores web TLS híbridos, midiendo tiempos, consumo de memoria, tamaño de claves y latencia de conexión, y publicando una guía de migración con los resultados.",
        "area": "Ciberseguridad",
        "sector": "Telecomunicaciones - Comunicaciones seguras",
        "nivel": "Avanzado",
        "duracion": "Un semestre",
        "presupuesto": "Bajo costo",
        "habilidades": [
            "Fundamentos de criptografía de clave pública",
            "Criptografía poscuántica basada en retículos",
            "Configuración de TLS 1.3 híbrido",
            "Medición y análisis de rendimiento",
            "Programación en C y Python"
        ],
        "objetivos": [
            "🎯 Objetivo General: Evaluar experimentalmente el impacto de los algoritmos poscuánticos estandarizados por el NIST en el rendimiento de equipos de bajo costo y conexiones TLS.",
            "📌 Objetivos Específicos:",
            "• Medir tiempos de generación de claves, encapsulamiento y firma de ML-KEM y ML-DSA frente a RSA-2048 y ECDSA P-256 en al menos tres plataformas.",
            "• Desplegar un servidor web con intercambio de claves híbrido X25519MLKEM768 y comparar su latencia de establecimiento de conexión con TLS clásico.",
            "• Publicar una guía de migración con recomendaciones basadas en los datos obtenidos para instituciones de la región."
        ],
        "pasos": [
            "Análisis de requisitos",
            "Diseño de la solución",
            "Implementación y pruebas",
            "Validación y sustentación"
        ],
        "aplicaciones": [
            "Telecomunicaciones - Comunicaciones seguras"
        ],
        "referencias": [],
        "hardware_tabla": [
            {
                "componente": "Raspberry Pi 5 (4 GB)",
                "categoria": "Computador de Placa Única",
                "funcion": "Plataforma de bajo costo para medir el rendimiento de los algoritmos."
            },
            {
                "componente": "Computador de escritorio de desarrollo",
                "categoria": "Estación de Trabajo",
                "funcion": "Plataforma de referencia y cliente TLS en las pruebas."
            },
            {
                "componente": "Medidor de consumo USB",
                "categoria": "Instrumento de Medición",
                "funcion": "Registra la energía consumida durante las operaciones criptográficas."
            }
        ],
        "software_tabla": [
            {
                "herramienta": "liboqs (Open Quantum Safe)",
                "tipo": "Librería Criptográfica",
                "descripcion": "Implementaciones de ML-KEM y ML-DSA."
            },
            {
                "herramienta": "OpenSSL 3.5",
                "tipo": "Librería Criptográfica / TLS",
                "descripcion": "Soporte de algoritmos poscuánticos e intercambio híbrido en TLS 1.3."
            },
            {
                "herramienta": "Nginx",
                "tipo": "Servidor Web",
                "descripcion": "Servidor TLS para las pruebas de latencia."
            },
            {
                "herramienta": "Python con pandas y Matplotlib",
                "tipo": "Análisis de Datos",
                "descripcion": "Procesamiento estadístico y gráficas de los resultados."
            }
        ]
    },
    {
        "id": "proj_116",
        "titulo": "🎣 Proyecto 116: Plataforma de Simulación de Phishing y Concientización para Personal Administrativo Universitario",
        "descripcion": "Problema: La mayoría de incidentes en universidades públicas comienza con un correo de phishing que suplanta a bancos, a la DIAN o a la propia institución; el personal administrativo entrega credenciales sin saberlo y la entidad no tiene datos sobre qué tan vulnerable es ni si las capacitaciones funcionan.\n\nDescripción: Plataforma que ejecuta campañas de phishing simulado, éticas y autorizadas, con plantillas adaptadas al contexto colombiano, y que redirige a quien cae en ellas a microlecciones interactivas; un tablero mide la tasa de clics, de entrega de datos y de reporte antes y después de la intervención, con datos anonimizados.",
        "area": "Ciberseguridad",
        "sector": "Educación superior - Gestión administrativa",
        "nivel": "Intermedio",
        "duracion": "Un semestre",
        "presupuesto": "Bajo costo",
        "habilidades": [
            "Ingeniería social y concientización en seguridad",
            "Configuración de servidores de correo",
            "Diseño de contenidos educativos",
            "Análisis estadístico de campañas",
            "Ética y protección de datos personales"
        ],
        "objetivos": [
            "🎯 Objetivo General: Implementar una plataforma de simulación de phishing con formación integrada que reduzca de forma medible la susceptibilidad del personal administrativo a ataques de ingeniería social.",
            "📌 Objetivos Específicos:",
            "• Diseñar al menos 6 plantillas de phishing contextualizadas y 4 microlecciones interactivas de menos de cinco minutos.",
            "• Ejecutar una campaña de línea base y una campaña posterior a la formación con un grupo voluntario de al menos 40 funcionarios.",
            "• Comparar la tasa de clics y la tasa de reporte entre ambas campañas con una prueba estadística de proporciones."
        ],
        "pasos": [
            "Análisis de requisitos",
            "Diseño de la solución",
            "Implementación y pruebas",
            "Validación y sustentación"
        ],
        "aplicaciones": [
            "Educación superior - Gestión administrativa"
        ],
        "referencias": [],
        "hardware_tabla": [
            {
                "componente": "Raspberry Pi 4 o mini PC",
                "categoria": "Servidor",
                "funcion": "Aloja la plataforma de campañas y el servidor de microlecciones."
            },
            {
                "componente": "Computador de desarrollo",
                "categoria": "Estación de Trabajo",
                "funcion": "Diseño de plantillas, contenidos y análisis de resultados."
            }
        ],
        "software_tabla": [
            {
                "herramienta": "GoPhish",
                "tipo": "Plataforma de Simulación de Phishing",
                "descripcion": "Gestión de campañas, plantillas y métricas de interacción."
            },
            {
                "herramienta": "Moodle o H5P",
                "tipo": "Plataforma Educativa",
                "descripcion": "Microlecciones interactivas de concientización."
            },
            {
                "herramienta": "Postfix",
                "tipo": "Servidor de Correo",
                "descripcion": "Envío controlado de los correos de la simulación."
            },
            {
                "herramienta": "Grafana",
                "tipo": "Visualización / Dashboard",
                "descripcion": "Tablero de indicadores anonimizados por campaña."
            }
        ]
    },
    {
        "id": "proj_117",
        "titulo": "🧱 Proyecto 117: Endurecimiento Automatizado de Servidores Linux y Active Directory con Benchmarks CIS",
        "descripcion": "Problema: Las entidades públicas municipales del Cauca operan servidores Linux y controladores de dominio con configuraciones por defecto, contraseñas débiles y servicios innecesarios; un solo equipo mal configurado permite a un atacante tomar el dominio completo y paralizar trámites a la ciudadanía.\n\nDescripción: Conjunto de playbooks de Ansible y scripts de PowerShell que auditan y aplican automáticamente los benchmarks CIS en servidores Linux y en un dominio Active Directory de laboratorio, complementados con un análisis de rutas de ataque con BloodHound que mide la reducción de la superficie de ataque antes y después del endurecimiento.",
        "area": "Ciberseguridad",
        "sector": "Gobierno - Entidades públicas territoriales",
        "nivel": "Intermedio-Avanzado",
        "duracion": "Un semestre",
        "presupuesto": "Bajo costo",
        "habilidades": [
            "Administración de servidores Linux",
            "Administración y seguridad de Active Directory",
            "Automatización con Ansible y PowerShell",
            "Auditoría de cumplimiento con benchmarks CIS",
            "Análisis de rutas de ataque"
        ],
        "objetivos": [
            "🎯 Objetivo General: Desarrollar una solución automatizada de endurecimiento para servidores Linux y Active Directory que reduzca de forma medible la superficie de ataque de una entidad pública.",
            "📌 Objetivos Específicos:",
            "• Implementar playbooks que apliquen al menos 80 controles del benchmark CIS en Ubuntu Server y Windows Server.",
            "• Elevar el puntaje de cumplimiento de Lynis y de la auditoría CIS por encima del 85 % en los servidores de laboratorio.",
            "• Cuantificar con BloodHound la reducción de rutas de ataque hacia administradores del dominio antes y después del endurecimiento."
        ],
        "pasos": [
            "Análisis de requisitos",
            "Diseño de la solución",
            "Implementación y pruebas",
            "Validación y sustentación"
        ],
        "aplicaciones": [
            "Gobierno - Entidades públicas territoriales"
        ],
        "referencias": [],
        "hardware_tabla": [
            {
                "componente": "Servidor o computador con 32 GB de RAM",
                "categoria": "Servidor",
                "funcion": "Virtualiza el dominio de laboratorio y los servidores Linux."
            },
            {
                "componente": "Computador de administración",
                "categoria": "Estación de Trabajo",
                "funcion": "Ejecuta Ansible y las herramientas de auditoría."
            }
        ],
        "software_tabla": [
            {
                "herramienta": "Ansible",
                "tipo": "Automatización de Configuración",
                "descripcion": "Aplicación repetible de controles de endurecimiento."
            },
            {
                "herramienta": "Lynis y OpenSCAP",
                "tipo": "Auditoría de Cumplimiento",
                "descripcion": "Medición del nivel de endurecimiento de los servidores Linux."
            },
            {
                "herramienta": "BloodHound Community Edition",
                "tipo": "Análisis de Active Directory",
                "descripcion": "Identificación de rutas de escalamiento de privilegios."
            },
            {
                "herramienta": "PowerShell y PingCastle",
                "tipo": "Auditoría de Active Directory",
                "descripcion": "Evaluación y corrección de configuraciones del dominio."
            },
            {
                "herramienta": "Proxmox VE",
                "tipo": "Virtualización",
                "descripcion": "Infraestructura de laboratorio con instantáneas."
            }
        ]
    },
    {
        "id": "proj_118",
        "titulo": "📋 Proyecto 118: Sistema de Gestión de Vulnerabilidades con Priorización por Riesgo (CVSS y EPSS) para Instituciones de Salud",
        "descripcion": "Problema: Las IPS y hospitales de la región reciben de los escáneres cientos de vulnerabilidades por mes y, con uno o dos ingenieros de sistemas, no saben cuáles corregir primero; mientras atienden fallas menores, las vulnerabilidades realmente explotadas exponen historias clínicas y sistemas de facturación.\n\nDescripción: Plataforma que integra escaneos periódicos de la red, enriquece cada hallazgo con CVSS, la probabilidad de explotación EPSS, el catálogo KEV de CISA y la criticidad del activo, y genera una cola priorizada de remediación con seguimiento de cumplimiento; se compara su desempeño frente a la priorización únicamente por CVSS.",
        "area": "Ciberseguridad",
        "sector": "Salud - Instituciones prestadoras de servicios",
        "nivel": "Intermedio-Avanzado",
        "duracion": "Un semestre",
        "presupuesto": "Bajo costo",
        "habilidades": [
            "Escaneo y gestión de vulnerabilidades",
            "Modelos de puntuación CVSS y EPSS",
            "Inventario y clasificación de activos",
            "Desarrollo de APIs e integración de fuentes de datos",
            "Indicadores de riesgo y remediación"
        ],
        "objetivos": [
            "🎯 Objetivo General: Desarrollar un sistema de gestión de vulnerabilidades que priorice la remediación según el riesgo real de explotación y la criticidad de los activos de una institución de salud.",
            "📌 Objetivos Específicos:",
            "• Automatizar escaneos semanales de una red de laboratorio con al menos 25 activos clasificados por criticidad.",
            "• Implementar un modelo de priorización que combine CVSS, EPSS, KEV y criticidad del activo en un puntaje único.",
            "• Demostrar que la priorización propuesta reduce el esfuerzo necesario para cubrir las vulnerabilidades explotadas conocidas frente a ordenar solo por CVSS."
        ],
        "pasos": [
            "Análisis de requisitos",
            "Diseño de la solución",
            "Implementación y pruebas",
            "Validación y sustentación"
        ],
        "aplicaciones": [
            "Salud - Instituciones prestadoras de servicios"
        ],
        "referencias": [],
        "hardware_tabla": [
            {
                "componente": "Mini PC con 16 GB de RAM",
                "categoria": "Servidor",
                "funcion": "Ejecuta el escáner y la plataforma de gestión."
            },
            {
                "componente": "Equipos y máquinas virtuales de prueba",
                "categoria": "Red de Laboratorio",
                "funcion": "Representan los activos de una institución de salud."
            }
        ],
        "software_tabla": [
            {
                "herramienta": "OpenVAS (Greenbone Community Edition)",
                "tipo": "Escáner de Vulnerabilidades",
                "descripcion": "Escaneo periódico de la red de laboratorio."
            },
            {
                "herramienta": "DefectDojo",
                "tipo": "Gestión de Vulnerabilidades",
                "descripcion": "Consolidación de hallazgos y seguimiento de remediación."
            },
            {
                "herramienta": "API de EPSS (FIRST) y catálogo KEV de CISA",
                "tipo": "Fuente de Inteligencia de Amenazas",
                "descripcion": "Probabilidad de explotación y vulnerabilidades explotadas activamente."
            },
            {
                "herramienta": "Python con FastAPI",
                "tipo": "Framework Web / Aplicación",
                "descripcion": "Servicio de enriquecimiento y cálculo del puntaje de riesgo."
            }
        ]
    },
    {
        "id": "proj_119",
        "titulo": "🚩 Proyecto 119: Plataforma CTF Regional con Retos Autogenerados para Semilleros de Investigación",
        "descripcion": "Problema: Los semilleros de investigación en seguridad de las universidades del suroccidente colombiano tienen pocas oportunidades de competir, porque los CTF internacionales son difíciles para principiantes y los retos estáticos se resuelven una vez y se comparten, lo que impide evaluar de forma justa a cada participante.\n\nDescripción: Plataforma de competencias tipo Capture The Flag con retos de web, criptografía, forense y reversing que se despliegan en contenedores individuales y generan banderas y parámetros distintos por equipo, evitando la copia; incluye niveles de dificultad progresivos y analítica de desempeño para organizar competencias interuniversitarias en Popayán.",
        "area": "Ciberseguridad",
        "sector": "Educación superior - Semilleros de investigación",
        "nivel": "Intermedio",
        "duracion": "Un semestre",
        "presupuesto": "Bajo costo",
        "habilidades": [
            "Diseño de retos de seguridad informática",
            "Orquestación de contenedores",
            "Criptografía aplicada y forense básica",
            "Desarrollo web",
            "Organización de competencias técnicas"
        ],
        "objetivos": [
            "🎯 Objetivo General: Desarrollar una plataforma CTF con retos dinámicos por equipo que fortalezca la formación práctica en ciberseguridad de los semilleros de investigación de la región.",
            "📌 Objetivos Específicos:",
            "• Diseñar al menos 20 retos en cinco categorías con tres niveles de dificultad y banderas generadas por equipo.",
            "• Desplegar instancias aisladas por equipo que soporten al menos 15 equipos simultáneos en el servidor del laboratorio.",
            "• Realizar una competencia piloto y analizar la tasa de resolución por reto para calibrar su dificultad."
        ],
        "pasos": [
            "Análisis de requisitos",
            "Diseño de la solución",
            "Implementación y pruebas",
            "Validación y sustentación"
        ],
        "aplicaciones": [
            "Educación superior - Semilleros de investigación"
        ],
        "referencias": [],
        "hardware_tabla": [
            {
                "componente": "Servidor o computador con 32 GB de RAM",
                "categoria": "Servidor",
                "funcion": "Ejecuta la plataforma y las instancias de los retos."
            },
            {
                "componente": "Router y punto de acceso Wi-Fi",
                "categoria": "Red",
                "funcion": "Red local para las competencias presenciales."
            }
        ],
        "software_tabla": [
            {
                "herramienta": "CTFd",
                "tipo": "Plataforma CTF",
                "descripcion": "Gestión de equipos, retos y tabla de posiciones."
            },
            {
                "herramienta": "Docker",
                "tipo": "Contenedores",
                "descripcion": "Instancias aisladas de cada reto por equipo."
            },
            {
                "herramienta": "Python",
                "tipo": "Lenguaje de Programación",
                "descripcion": "Generación de banderas y parámetros únicos por equipo."
            },
            {
                "herramienta": "Ghidra y CyberChef",
                "tipo": "Herramientas de Análisis",
                "descripcion": "Validación de la resolubilidad de los retos de reversing y criptografía."
            }
        ]
    },
    {
        "id": "proj_120",
        "titulo": "☁️ Proyecto 120: Pipeline DevSecOps con Auditoría Continua de Configuraciones en la Nube para Startups de Software",
        "descripcion": "Problema: Las startups de software de Popayán y Cali publican aplicaciones en la nube sin revisiones de seguridad: credenciales expuestas en repositorios, dependencias vulnerables y buckets públicos se descubren cuando ya se filtraron datos de usuarios o se generaron cobros inesperados por uso indebido de la cuenta.\n\nDescripción: Pipeline de integración continua que incorpora análisis estático de código, detección de secretos, análisis de dependencias e imágenes de contenedor, y verificación de infraestructura como código, junto con una auditoría periódica de la cuenta en la nube con Prowler; se mide cuántas vulnerabilidades se detectan antes de producción y el impacto en el tiempo de entrega.",
        "area": "Ciberseguridad",
        "sector": "Tecnología - Empresas de desarrollo de software",
        "nivel": "Intermedio-Avanzado",
        "duracion": "Un semestre",
        "presupuesto": "Bajo costo",
        "habilidades": [
            "Seguridad en el ciclo de vida del desarrollo (Secure SDLC)",
            "Integración y entrega continua",
            "Seguridad en la nube",
            "Análisis estático y de dependencias",
            "Infraestructura como código"
        ],
        "objetivos": [
            "🎯 Objetivo General: Implementar un pipeline DevSecOps con auditoría continua de la nube que detecte vulnerabilidades y malas configuraciones antes de que lleguen a producción.",
            "📌 Objetivos Específicos:",
            "• Integrar al menos cinco controles automáticos de seguridad en el pipeline de una aplicación de referencia con vulnerabilidades sembradas.",
            "• Auditar semanalmente una cuenta de nube de capa gratuita y reducir en al menos 70 % los hallazgos críticos de configuración.",
            "• Medir la tasa de detección de las vulnerabilidades sembradas y el aumento del tiempo de ejecución del pipeline."
        ],
        "pasos": [
            "Análisis de requisitos",
            "Diseño de la solución",
            "Implementación y pruebas",
            "Validación y sustentación"
        ],
        "aplicaciones": [
            "Tecnología - Empresas de desarrollo de software"
        ],
        "referencias": [],
        "hardware_tabla": [
            {
                "componente": "Computador de desarrollo",
                "categoria": "Estación de Trabajo",
                "funcion": "Desarrollo de la aplicación de referencia y configuración del pipeline."
            },
            {
                "componente": "Mini PC como ejecutor autoalojado",
                "categoria": "Servidor",
                "funcion": "Ejecuta los trabajos del pipeline sin consumir minutos pagos."
            }
        ],
        "software_tabla": [
            {
                "herramienta": "GitHub Actions o GitLab CI",
                "tipo": "Integración Continua",
                "descripcion": "Orquestación de los controles de seguridad en cada cambio."
            },
            {
                "herramienta": "Semgrep y Gitleaks",
                "tipo": "Análisis Estático / Detección de Secretos",
                "descripcion": "Detección de patrones inseguros y credenciales expuestas."
            },
            {
                "herramienta": "Trivy",
                "tipo": "Análisis de Dependencias y Contenedores",
                "descripcion": "Vulnerabilidades en librerías, imágenes e infraestructura como código."
            },
            {
                "herramienta": "Prowler",
                "tipo": "Auditoría de Seguridad en la Nube",
                "descripcion": "Revisión de configuraciones de la cuenta en la nube."
            },
            {
                "herramienta": "Terraform",
                "tipo": "Infraestructura como Código",
                "descripcion": "Definición versionada y auditable de los recursos en la nube."
            }
        ]
    }
];
