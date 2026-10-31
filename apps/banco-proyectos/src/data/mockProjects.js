export const mockProjects = [
    {
        "id": "proj_001",
        "titulo": "🌾 Proyecto 1: Sistema de Monitoreo Agrícola Distribuido con MQTT",
        "descripcion": "Problema: Los agricultores carecen de información en tiempo real sobre condiciones del suelo y clima, lo que genera desperdicio de agua, bajo rendimiento de cultivos y pérdidas económicas por decisiones basadas en intuición en lugar de datos precisos.\n\nDescripción: Red de sensores distribuidos en cultivo que monitorean humedad del suelo, temperatura y luz, centralizando datos en Raspberry Pi que actúa como gateway MQTT para visualización en dashboard web.",
        "area": "SBC-IoT",
        "sector": "Agricultura de precisión y agricultura inteligente",
        "nivel": "Intermedio",
        "duracion": "Un semestre",
        "presupuesto": "Bajo costo",
        "hardware": [
            "Raspberry Pi 3 B+ (Computadora de Placa Reducida (SBC) | Nodo central (1 unidad))",
            "ESP32 (Microcontrolador | 3-4 unidades; nodos sensores)",
            "Sensores DHT22 (Sensor Ambiental | Temperatura/humedad ambiente)",
            "Sensores de humedad de suelo capacitivos (Sensor Ambiental | Mide variables ambientales relevantes para el sistema (4 unidades).)",
            "Sensores LDR (Sensor Ambiental | Luminosidad)",
            "Fuentes de alimentación (Fuente de Alimentación / Energía | Suministra energía eléctrica a los componentes del sistema.)",
            "Cableado y protoboards (Componente Electrónico / Accesorio | Complementa el circuito electrónico del prototipo.)"
        ],
        "software": [
            "Raspberry Pi OS: Sistema Operativo - Sistema operativo",
            "Mosquitto: Broker / Middleware de Mensajería - Broker MQTT",
            "Node-RED: Automatización / Orquestación - Para flujos de datos",
            "InfluxDB: Base de Datos - Base de datos de series temporales",
            "Grafana: Visualización / Dashboard - Para dashboards",
            "Python: Lenguaje de Programación - Para scripts en Raspberry Pi",
            "Arduino IDE/PlatformIO: IDE / Entorno de Desarrollo - Para ESP32"
        ],
        "habilidades": [
            "Arquitecturas IoT distribuidas",
            "Protocolos de comunicación (MQTT)",
            "Integración SBC-microcontroladores",
            "Visualización de datos en tiempo real",
            "Gestión de bases de datos de series temporales"
        ],
        "objetivos": [
            "🎯 Objetivo General: Desarrollar un sistema de monitoreo agrícola distribuido basado en SBC-IoT que permita la recolección, análisis y visualización de datos ambientales en tiempo real para optimizar el uso de recursos y mejorar la productividad agrícola.",
            "📌 Objetivos Específicos:",
            "• Implementar una red de sensores ESP32 que monitoreen humedad del suelo, temperatura y luminosidad en múltiples puntos del cultivo.",
            "• Configurar un gateway MQTT en Raspberry Pi que centralice datos y permita visualización en dashboards web mediante Grafana.",
            "• Desarrollar algoritmos de análisis de series temporales que generen alertas predictivas sobre necesidades de riego y condiciones adversas."
        ],
        "pasos": [
            "Análisis de requisitos",
            "Diseño de la solución",
            "Implementación y pruebas",
            "Validación y sustentación"
        ],
        "aplicaciones": [
            "Agricultura de precisión y agricultura inteligente"
        ],
        "referencias": [],
        "hardware_tabla": [
            {
                "componente": "Raspberry Pi 3 B+",
                "categoria": "Computadora de Placa Reducida (SBC)",
                "funcion": "Nodo central (1 unidad)"
            },
            {
                "componente": "ESP32",
                "categoria": "Microcontrolador",
                "funcion": "3-4 unidades; nodos sensores"
            },
            {
                "componente": "Sensores DHT22",
                "categoria": "Sensor Ambiental",
                "funcion": "Temperatura/humedad ambiente"
            },
            {
                "componente": "Sensores de humedad de suelo capacitivos",
                "categoria": "Sensor Ambiental",
                "funcion": "Mide variables ambientales relevantes para el sistema (4 unidades)."
            },
            {
                "componente": "Sensores LDR",
                "categoria": "Sensor Ambiental",
                "funcion": "Luminosidad"
            },
            {
                "componente": "Fuentes de alimentación",
                "categoria": "Fuente de Alimentación / Energía",
                "funcion": "Suministra energía eléctrica a los componentes del sistema."
            },
            {
                "componente": "Cableado y protoboards",
                "categoria": "Componente Electrónico / Accesorio",
                "funcion": "Complementa el circuito electrónico del prototipo."
            }
        ],
        "software_tabla": [
            {
                "herramienta": "Raspberry Pi OS",
                "tipo": "Sistema Operativo",
                "descripcion": "Sistema operativo"
            },
            {
                "herramienta": "Mosquitto",
                "tipo": "Broker / Middleware de Mensajería",
                "descripcion": "Broker MQTT"
            },
            {
                "herramienta": "Node-RED",
                "tipo": "Automatización / Orquestación",
                "descripcion": "Para flujos de datos"
            },
            {
                "herramienta": "InfluxDB",
                "tipo": "Base de Datos",
                "descripcion": "Base de datos de series temporales"
            },
            {
                "herramienta": "Grafana",
                "tipo": "Visualización / Dashboard",
                "descripcion": "Para dashboards"
            },
            {
                "herramienta": "Python",
                "tipo": "Lenguaje de Programación",
                "descripcion": "Para scripts en Raspberry Pi"
            },
            {
                "herramienta": "Arduino IDE/PlatformIO",
                "tipo": "IDE / Entorno de Desarrollo",
                "descripcion": "Para ESP32"
            }
        ]
    },
    {
        "id": "proj_002",
        "titulo": "🏢 Proyecto 2: Gateway IoT Multi-Protocolo para Edificio Inteligente",
        "descripcion": "Problema: Los edificios inteligentes utilizan dispositivos de diferentes fabricantes con protocolos incompatibles, generando silos de información, dificultad de gestión centralizada y costos elevados de integración.\n\nDescripción: Raspberry Pi actuando como gateway que integra múltiples protocolos (MQTT, HTTP, ModBus) para controlar iluminación, climatización y accesos en un edificio, con interfaz web de administración.",
        "area": "SBC-IoT",
        "sector": "Domótica e Inmótica (edificios inteligentes)",
        "nivel": "Avanzado",
        "duracion": "Un semestre",
        "presupuesto": "Bajo costo",
        "hardware": [
            "Raspberry Pi 4 (Computadora de Placa Reducida (SBC) | Actúa como unidad de procesamiento central o gateway del sistema (1 unidad).)",
            "ESP32 (Microcontrolador | Controla y coordina los sensores/actuadores conectados a él (3 unidades para diferentes zonas).)",
            "Relés de 4 canales (Actuador | Ejecuta una acción física en respuesta a las decisiones del sistema (2 unidades).)",
            "Sensores PIR (Sensor de Movimiento / Posición | Movimiento (4 unidades))",
            "DHT22 (Sensor Ambiental | Mide variables ambientales relevantes para el sistema (3 unidades).)",
            "LEDs y módulos de iluminación (Interfaz de Usuario / Iluminación | Permite la interacción, iluminación o notificación visual/sonora del sistema.)",
            "Sensor magnético de puertas (Otro Componente de Hardware | Forma parte del hardware de soporte del proyecto (2 unidades).)"
        ],
        "software": [
            "Node-RED: Automatización / Orquestación - Usado como orquestador principal",
            "Mosquitto MQTT broker: Broker / Middleware de Mensajería - Gestiona el intercambio de mensajes entre los componentes del sistema.",
            "Node.js: Framework Web / Aplicación - Para servidor web",
            "SQLite: Base de Datos - Para almacenamiento local",
            "React.js para interfaz web: Framework Web / Aplicación - Opcional: HTML/CSS/JS vanilla",
            "Python: Lenguaje de Programación - Para automatizaciones"
        ],
        "habilidades": [
            "Integración de múltiples protocolos IoT",
            "Desarrollo de interfaces web responsivas",
            "Arquitectura de microservicios",
            "Automatización basada en reglas",
            "Gestión de dispositivos heterogéneos"
        ],
        "objetivos": [
            "🎯 Objetivo General: Diseñar e implementar un gateway IoT multi-protocolo basado en Raspberry Pi que unifique la gestión de sistemas de iluminación, climatización y control de accesos en edificios inteligentes.",
            "📌 Objetivos Específicos:",
            "• Integrar comunicación MQTT, HTTP y Modbus en un único gateway para interoperabilidad entre dispositivos heterogéneos.",
            "• Desarrollar una interfaz web responsiva que permita monitoreo y control centralizado de todos los subsistemas del edificio.",
            "• Implementar reglas de automatización basadas en eventos que optimicen el consumo energético según ocupación y horarios."
        ],
        "pasos": [
            "Análisis de requisitos",
            "Diseño de la solución",
            "Implementación y pruebas",
            "Validación y sustentación"
        ],
        "aplicaciones": [
            "Domótica e Inmótica (edificios inteligentes)"
        ],
        "referencias": [],
        "hardware_tabla": [
            {
                "componente": "Raspberry Pi 4",
                "categoria": "Computadora de Placa Reducida (SBC)",
                "funcion": "Actúa como unidad de procesamiento central o gateway del sistema (1 unidad)."
            },
            {
                "componente": "ESP32",
                "categoria": "Microcontrolador",
                "funcion": "Controla y coordina los sensores/actuadores conectados a él (3 unidades para diferentes zonas)."
            },
            {
                "componente": "Relés de 4 canales",
                "categoria": "Actuador",
                "funcion": "Ejecuta una acción física en respuesta a las decisiones del sistema (2 unidades)."
            },
            {
                "componente": "Sensores PIR",
                "categoria": "Sensor de Movimiento / Posición",
                "funcion": "Movimiento (4 unidades)"
            },
            {
                "componente": "DHT22",
                "categoria": "Sensor Ambiental",
                "funcion": "Mide variables ambientales relevantes para el sistema (3 unidades)."
            },
            {
                "componente": "LEDs y módulos de iluminación",
                "categoria": "Interfaz de Usuario / Iluminación",
                "funcion": "Permite la interacción, iluminación o notificación visual/sonora del sistema."
            },
            {
                "componente": "Sensor magnético de puertas",
                "categoria": "Otro Componente de Hardware",
                "funcion": "Forma parte del hardware de soporte del proyecto (2 unidades)."
            }
        ],
        "software_tabla": [
            {
                "herramienta": "Node-RED",
                "tipo": "Automatización / Orquestación",
                "descripcion": "Usado como orquestador principal"
            },
            {
                "herramienta": "Mosquitto MQTT broker",
                "tipo": "Broker / Middleware de Mensajería",
                "descripcion": "Gestiona el intercambio de mensajes entre los componentes del sistema."
            },
            {
                "herramienta": "Node.js",
                "tipo": "Framework Web / Aplicación",
                "descripcion": "Para servidor web"
            },
            {
                "herramienta": "SQLite",
                "tipo": "Base de Datos",
                "descripcion": "Para almacenamiento local"
            },
            {
                "herramienta": "React.js para interfaz web",
                "tipo": "Framework Web / Aplicación",
                "descripcion": "Opcional: HTML/CSS/JS vanilla"
            },
            {
                "herramienta": "Python",
                "tipo": "Lenguaje de Programación",
                "descripcion": "Para automatizaciones"
            }
        ]
    },
    {
        "id": "proj_003",
        "titulo": "☁️ Proyecto 3: Sistema de Monitoreo Meteorológico Local con Predicción",
        "descripcion": "Problema: Las predicciones meteorológicas generales no consideran microclimas locales, lo que genera inexactitudes críticas para agricultura, eventos al aire libre y planificación de actividades sensibles al clima.\n\nDescripción: Estación meteorológica completa que captura datos locales (temperatura, humedad, presión, viento) y los compara con APIs meteorológicas públicas para generar predicciones locales mejoradas.",
        "area": "SBC-IoT",
        "sector": "Meteorología y monitoreo ambiental",
        "nivel": "Intermedio",
        "duracion": "Un semestre",
        "presupuesto": "Bajo costo",
        "hardware": [
            "Raspberry Pi 3 B+ (Computadora de Placa Reducida (SBC) | Actúa como unidad de procesamiento central o gateway del sistema.)",
            "ESP32 (Microcontrolador | Para sensores exteriores)",
            "DHT22 (Sensor Ambiental | Mide variables ambientales relevantes para el sistema.)",
            "Sensor BMP280 (Sensor Ambiental | Presión atmosférica)",
            "Anemómetro (Otro Componente de Hardware | Puede construirse con sensor Hall y imanes)",
            "Pluviómetro DIY (Otro Componente de Hardware | Forma parte del hardware de soporte del proyecto.)",
            "GPS NEO-6M (Módulo de Comunicación / Conectividad | Geolocalización)"
        ],
        "software": [
            "Python: Lenguaje de Programación - Para captura y procesamiento",
            "ThingSpeak: Plataforma / Servicio Cloud IoT - Para almacenamiento en la nube",
            "OpenWeatherMap: Herramienta / Tecnología de Software - APIs públicas",
            "Pandas: Librería / Herramienta de Análisis de Datos - Para análisis de datos",
            "Matplotlib: Librería / Herramienta de Análisis de Datos - Para gráficos",
            "Cron: Herramienta / Tecnología de Software - Para tareas programadas"
        ],
        "habilidades": [
            "Integración con APIs REST",
            "Procesamiento de datos meteorológicos",
            "Análisis comparativo de datos",
            "Calibración de sensores",
            "Visualización científica de datos"
        ],
        "objetivos": [
            "🎯 Objetivo General: Construir una estación meteorológica inteligente que capture datos climáticos locales y los correlacione con APIs meteorológicas públicas para generar predicciones híbridas más precisas.",
            "📌 Objetivos Específicos:",
            "• Implementar un sistema de sensores meteorológicos (temperatura, humedad, presión, viento, lluvia) con registro continuo de datos.",
            "• Integrar datos locales con APIs de OpenWeatherMap para análisis comparativo y calibración de modelos.",
            "• Desarrollar algoritmos de machine learning que mejoren la precisión de predicciones considerando patrones históricos locales."
        ],
        "pasos": [
            "Análisis de requisitos",
            "Diseño de la solución",
            "Implementación y pruebas",
            "Validación y sustentación"
        ],
        "aplicaciones": [
            "Meteorología y monitoreo ambiental"
        ],
        "referencias": [],
        "hardware_tabla": [
            {
                "componente": "Raspberry Pi 3 B+",
                "categoria": "Computadora de Placa Reducida (SBC)",
                "funcion": "Actúa como unidad de procesamiento central o gateway del sistema."
            },
            {
                "componente": "ESP32",
                "categoria": "Microcontrolador",
                "funcion": "Para sensores exteriores"
            },
            {
                "componente": "DHT22",
                "categoria": "Sensor Ambiental",
                "funcion": "Mide variables ambientales relevantes para el sistema."
            },
            {
                "componente": "Sensor BMP280",
                "categoria": "Sensor Ambiental",
                "funcion": "Presión atmosférica"
            },
            {
                "componente": "Anemómetro",
                "categoria": "Otro Componente de Hardware",
                "funcion": "Puede construirse con sensor Hall y imanes"
            },
            {
                "componente": "Pluviómetro DIY",
                "categoria": "Otro Componente de Hardware",
                "funcion": "Forma parte del hardware de soporte del proyecto."
            },
            {
                "componente": "GPS NEO-6M",
                "categoria": "Módulo de Comunicación / Conectividad",
                "funcion": "Geolocalización"
            }
        ],
        "software_tabla": [
            {
                "herramienta": "Python",
                "tipo": "Lenguaje de Programación",
                "descripcion": "Para captura y procesamiento"
            },
            {
                "herramienta": "ThingSpeak",
                "tipo": "Plataforma / Servicio Cloud IoT",
                "descripcion": "Para almacenamiento en la nube"
            },
            {
                "herramienta": "OpenWeatherMap",
                "tipo": "Herramienta / Tecnología de Software",
                "descripcion": "APIs públicas"
            },
            {
                "herramienta": "Pandas",
                "tipo": "Librería / Herramienta de Análisis de Datos",
                "descripcion": "Para análisis de datos"
            },
            {
                "herramienta": "Matplotlib",
                "tipo": "Librería / Herramienta de Análisis de Datos",
                "descripcion": "Para gráficos"
            },
            {
                "herramienta": "Cron",
                "tipo": "Herramienta / Tecnología de Software",
                "descripcion": "Para tareas programadas"
            }
        ]
    },
    {
        "id": "proj_004",
        "titulo": "🌿 Proyecto 4: Control de Invernadero Automatizado con Retroalimentación",
        "descripcion": "Problema: El control manual de invernaderos genera desperdicio de recursos, condiciones subóptimas para cultivos y requiere supervisión constante, limitando la escalabilidad y rentabilidad de la producción agrícola protegida.\n\nDescripción: Sistema de control climático para invernadero que ajusta automáticamente riego, ventilación e iluminación según parámetros ambientales, con control remoto vía aplicación web.",
        "area": "SBC-IoT",
        "sector": "Agricultura de precisión y agricultura inteligente",
        "nivel": "Avanzado",
        "duracion": "Un semestre",
        "presupuesto": "Bajo costo",
        "hardware": [
            "Raspberry Pi 4 (Computadora de Placa Reducida (SBC) | Actúa como unidad de procesamiento central o gateway del sistema.)",
            "Arduino Nano (Microcontrolador | Controla y coordina los sensores/actuadores conectados a él (2 unidades para control de actuadores).)",
            "DHT22 (Sensor Ambiental | Mide variables ambientales relevantes para el sistema (2 unidades).)",
            "Sensores de humedad de suelo (Sensor Ambiental | Mide variables ambientales relevantes para el sistema (4 unidades).)",
            "Relés (Actuador | Ejecuta una acción física en respuesta a las decisiones del sistema (6 canales).)",
            "Electroválvulas para riego (Actuador | Ejecuta una acción física en respuesta a las decisiones del sistema (2 unidades).)",
            "Ventiladores DC 12V (Actuador | Ejecuta una acción física en respuesta a las decisiones del sistema (2 unidades).)",
            "Tiras LED (Interfaz de Usuario / Iluminación | Para iluminación suplementaria)",
            "LDR (Sensor Ambiental | Sensor de luz)"
        ],
        "software": [
            "Python con GPIO: Lenguaje de Programación - Para Raspberry Pi",
            "Blynk: Plataforma / Servicio Cloud IoT - Versión gratuita; para interfaz móvil",
            "MQTT: Protocolo de Comunicación IoT - Para comunicación",
            "Node-RED: Automatización / Orquestación - Para lógica de control",
            "InfluxDB y Grafana: Base de Datos - Para históricos"
        ],
        "habilidades": [
            "Sistemas de control realimentados • Automatización agrícola • Lógica de control PID básica • Interfaces móviles IoT",
            "Gestión energética PROYECTOS DE AIoT (INTELIGENCIA ARTIFICIAL + IoT) PROYECTOS DE AIoT (INTELIGENCIA ARTIFICIAL + IoT)"
        ],
        "objetivos": [
            "🎯 Objetivo General: Desarrollar un sistema de automatización integral para invernaderos que controle dinámicamente riego, ventilación e iluminación mediante retroalimentación de sensores ambientales y control remoto.",
            "📌 Objetivos Específicos:",
            "• Implementar sensores de temperatura, humedad y humedad de suelo con actuadores controlados vía Raspberry Pi y Arduino.",
            "• Desarrollar algoritmos de control PID que mantengan parámetros ambientales en rangos óptimos de forma autónoma.",
            "• Crear una aplicación móvil con Blynk que permita monitoreo remoto y ajuste manual de parámetros de cultivo."
        ],
        "pasos": [
            "Análisis de requisitos",
            "Diseño de la solución",
            "Implementación y pruebas",
            "Validación y sustentación"
        ],
        "aplicaciones": [
            "Agricultura de precisión y agricultura inteligente"
        ],
        "referencias": [],
        "hardware_tabla": [
            {
                "componente": "Raspberry Pi 4",
                "categoria": "Computadora de Placa Reducida (SBC)",
                "funcion": "Actúa como unidad de procesamiento central o gateway del sistema."
            },
            {
                "componente": "Arduino Nano",
                "categoria": "Microcontrolador",
                "funcion": "Controla y coordina los sensores/actuadores conectados a él (2 unidades para control de actuadores)."
            },
            {
                "componente": "DHT22",
                "categoria": "Sensor Ambiental",
                "funcion": "Mide variables ambientales relevantes para el sistema (2 unidades)."
            },
            {
                "componente": "Sensores de humedad de suelo",
                "categoria": "Sensor Ambiental",
                "funcion": "Mide variables ambientales relevantes para el sistema (4 unidades)."
            },
            {
                "componente": "Relés",
                "categoria": "Actuador",
                "funcion": "Ejecuta una acción física en respuesta a las decisiones del sistema (6 canales)."
            },
            {
                "componente": "Electroválvulas para riego",
                "categoria": "Actuador",
                "funcion": "Ejecuta una acción física en respuesta a las decisiones del sistema (2 unidades)."
            },
            {
                "componente": "Ventiladores DC 12V",
                "categoria": "Actuador",
                "funcion": "Ejecuta una acción física en respuesta a las decisiones del sistema (2 unidades)."
            },
            {
                "componente": "Tiras LED",
                "categoria": "Interfaz de Usuario / Iluminación",
                "funcion": "Para iluminación suplementaria"
            },
            {
                "componente": "LDR",
                "categoria": "Sensor Ambiental",
                "funcion": "Sensor de luz"
            }
        ],
        "software_tabla": [
            {
                "herramienta": "Python con GPIO",
                "tipo": "Lenguaje de Programación",
                "descripcion": "Para Raspberry Pi"
            },
            {
                "herramienta": "Blynk",
                "tipo": "Plataforma / Servicio Cloud IoT",
                "descripcion": "Versión gratuita; para interfaz móvil"
            },
            {
                "herramienta": "MQTT",
                "tipo": "Protocolo de Comunicación IoT",
                "descripcion": "Para comunicación"
            },
            {
                "herramienta": "Node-RED",
                "tipo": "Automatización / Orquestación",
                "descripcion": "Para lógica de control"
            },
            {
                "herramienta": "InfluxDB y Grafana",
                "tipo": "Base de Datos",
                "descripcion": "Para históricos"
            }
        ]
    },
    {
        "id": "proj_005",
        "titulo": "♻️ Proyecto 5: Clasificación Inteligente de Residuos con Visión Artificial",
        "descripcion": "Problema: La clasificación manual de residuos es ineficiente, costosa y propensa a errores humanos, generando contaminación cruzada que reduce las tasas de reciclaje efectivo y aumenta la contaminación ambiental.\n\nDescripción: Sistema de clasificación automática de residuos (plástico, vidrio, papel, orgánico) usando cámara y red neuronal en Raspberry Pi, con mecanismo de separación automatizado.",
        "area": "AIoT + IoT con Visión Artificial",
        "sector": "Gestión medioambiental y sostenibilidad",
        "nivel": "Avanzado",
        "duracion": "Un semestre",
        "presupuesto": "Bajo costo",
        "hardware": [
            "Raspberry Pi 4 (Computadora de Placa Reducida (SBC) | Actúa como unidad de procesamiento central o gateway del sistema (4GB RAM mínimo).)",
            "Cámara Raspberry Pi v2 o USB (Cámara / Sensor de Visión | Captura imágenes o video para el módulo de visión artificial.)",
            "Servomotores (Actuador | Ejecuta una acción física en respuesta a las decisiones del sistema (3 unidades para compuertas).)",
            "Sensores ultrasónicos HC-SR04 (Sensor de Movimiento / Posición | Detección de objeto)",
            "Arduino Nano (Microcontrolador | Control de servos)",
            "Iluminación LED (Interfaz de Usuario / Iluminación | Para fotografía)",
            "Estructura mecánica simple (Estructura / Componente Mecánico | Cartón/madera)"
        ],
        "software": [
            "TensorFlow Lite: Inteligencia Artificial / Machine Learning - Para inferencia",
            "OpenCV: Inteligencia Artificial / Machine Learning - Para procesamiento de imágenes",
            "Python con picamera: Lenguaje de Programación - Lenguaje utilizado para desarrollar la lógica del sistema.",
            "Modelo pre-entrenado MobileNet: Herramienta / Tecnología de Software - Transfer learning",
            "MQTT: Protocolo de Comunicación IoT - Para comunicación con Arduino"
        ],
        "habilidades": [
            "Implementación de redes neuronales en edge",
            "Transfer learning",
            "Visión por computadora aplicada",
            "Integración AI-hardware",
            "Optimización de modelos para dispositivos limitados"
        ],
        "objetivos": [
            "🎯 Objetivo General: Diseñar un sistema de clasificación automática de residuos basado en visión artificial y deep learning que identifique y separe materiales (plástico, vidrio, papel, orgánico) en tiempo real.",
            "📌 Objetivos Específicos:",
            "• Entrenar y optimizar un modelo MobileNet mediante transfer learning para clasificación de residuos con precisión >85%.",
            "• Implementar un sistema mecatrónico con servomotores que dirija residuos a contenedores específicos según clasificación.",
            "• Desarrollar interfaz de monitoreo que registre estadísticas de volumen y tipos de residuos procesados diariamente."
        ],
        "pasos": [
            "Análisis de requisitos",
            "Diseño de la solución",
            "Implementación y pruebas",
            "Validación y sustentación"
        ],
        "aplicaciones": [
            "Gestión medioambiental y sostenibilidad"
        ],
        "referencias": [],
        "hardware_tabla": [
            {
                "componente": "Raspberry Pi 4",
                "categoria": "Computadora de Placa Reducida (SBC)",
                "funcion": "Actúa como unidad de procesamiento central o gateway del sistema (4GB RAM mínimo)."
            },
            {
                "componente": "Cámara Raspberry Pi v2 o USB",
                "categoria": "Cámara / Sensor de Visión",
                "funcion": "Captura imágenes o video para el módulo de visión artificial."
            },
            {
                "componente": "Servomotores",
                "categoria": "Actuador",
                "funcion": "Ejecuta una acción física en respuesta a las decisiones del sistema (3 unidades para compuertas)."
            },
            {
                "componente": "Sensores ultrasónicos HC-SR04",
                "categoria": "Sensor de Movimiento / Posición",
                "funcion": "Detección de objeto"
            },
            {
                "componente": "Arduino Nano",
                "categoria": "Microcontrolador",
                "funcion": "Control de servos"
            },
            {
                "componente": "Iluminación LED",
                "categoria": "Interfaz de Usuario / Iluminación",
                "funcion": "Para fotografía"
            },
            {
                "componente": "Estructura mecánica simple",
                "categoria": "Estructura / Componente Mecánico",
                "funcion": "Cartón/madera"
            }
        ],
        "software_tabla": [
            {
                "herramienta": "TensorFlow Lite",
                "tipo": "Inteligencia Artificial / Machine Learning",
                "descripcion": "Para inferencia"
            },
            {
                "herramienta": "OpenCV",
                "tipo": "Inteligencia Artificial / Machine Learning",
                "descripcion": "Para procesamiento de imágenes"
            },
            {
                "herramienta": "Python con picamera",
                "tipo": "Lenguaje de Programación",
                "descripcion": "Lenguaje utilizado para desarrollar la lógica del sistema."
            },
            {
                "herramienta": "Modelo pre-entrenado MobileNet",
                "tipo": "Herramienta / Tecnología de Software",
                "descripcion": "Transfer learning"
            },
            {
                "herramienta": "MQTT",
                "tipo": "Protocolo de Comunicación IoT",
                "descripcion": "Para comunicación con Arduino"
            }
        ]
    },
    {
        "id": "proj_006",
        "titulo": "🏭 Proyecto 6: Detector de Anomalías en Línea de Producción",
        "descripcion": "Problema: Los defectos de fabricación detectados tardíamente generan costos por reproceso, pérdida de materiales y afectación de calidad, mientras que inspecciones manuales son lentas y subjetivas.\n\nDescripción: Sistema de detección de productos defectuosos en línea de ensamblaje usando sensores (vibración, sonido, temperatura) y algoritmos de machine learning para identificar patrones anómalos.",
        "area": "AIoT",
        "sector": "Automatización industrial (Industria 4.0)",
        "nivel": "Avanzado",
        "duracion": "Un semestre",
        "presupuesto": "Bajo costo",
        "hardware": [
            "Raspberry Pi 4 (Computadora de Placa Reducida (SBC) | Actúa como unidad de procesamiento central o gateway del sistema.)",
            "ESP32 con sensor MPU6050 (Microcontrolador | Acelerómetro/giroscopio)",
            "Módulo de micrófono MAX4466 (Otro Componente de Hardware | Forma parte del hardware de soporte del proyecto.)",
            "Sensor de temperatura DS18B20 (Sensor Ambiental | Mide variables ambientales relevantes para el sistema.)",
            "Arduino UNO (Microcontrolador | Para control de banda transportadora simulada)",
            "Motor DC con encoder (Actuador | Ejecuta una acción física en respuesta a las decisiones del sistema.)",
            "Buzzer y LEDs indicadores (Interfaz de Usuario / Iluminación | Permite la interacción, iluminación o notificación visual/sonora del sistema.)"
        ],
        "software": [
            "Python con scikit-learn: Inteligencia Artificial / Machine Learning - Procesa datos mediante modelos de IA/ML para generar predicciones o clasificaciones.",
            "Isolation Forest, One-Class SVM: Inteligencia Artificial / Machine Learning - Algoritmos",
            "Pandas y NumPy: Librería / Herramienta de Análisis de Datos - Para procesamiento",
            "MQTT: Protocolo de Comunicación IoT - Para comunicación",
            "Jupyter Notebook: IDE / Entorno de Desarrollo - Para entrenamiento",
            "Node-RED: Automatización / Orquestación - Para alertas"
        ],
        "habilidades": [
            "Machine learning no supervisado",
            "Detección de anomalías",
            "Procesamiento de señales",
            "Mantenimiento predictivo",
            "Integración de múltiples sensores"
        ],
        "objetivos": [
            "🎯 Objetivo General: Desarrollar un sistema de detección automática de anomalías en líneas de producción industrial mediante análisis multimodal de sensores y algoritmos de machine learning no supervisado.",
            "📌 Objetivos Específicos:",
            "• Implementar sensores de vibración, sonido y temperatura en puntos críticos de la línea de ensamblaje con ESP32.",
            "• Entrenar modelos de detección de anomalías (Isolation Forest, One-Class SVM) con datos de operación normal y defectuosa.",
            "• Desarrollar sistema de alertas en tiempo real que notifique operarios y detenga producción ante anomalías críticas."
        ],
        "pasos": [
            "Análisis de requisitos",
            "Diseño de la solución",
            "Implementación y pruebas",
            "Validación y sustentación"
        ],
        "aplicaciones": [
            "Automatización industrial (Industria 4.0)"
        ],
        "referencias": [],
        "hardware_tabla": [
            {
                "componente": "Raspberry Pi 4",
                "categoria": "Computadora de Placa Reducida (SBC)",
                "funcion": "Actúa como unidad de procesamiento central o gateway del sistema."
            },
            {
                "componente": "ESP32 con sensor MPU6050",
                "categoria": "Microcontrolador",
                "funcion": "Acelerómetro/giroscopio"
            },
            {
                "componente": "Módulo de micrófono MAX4466",
                "categoria": "Otro Componente de Hardware",
                "funcion": "Forma parte del hardware de soporte del proyecto."
            },
            {
                "componente": "Sensor de temperatura DS18B20",
                "categoria": "Sensor Ambiental",
                "funcion": "Mide variables ambientales relevantes para el sistema."
            },
            {
                "componente": "Arduino UNO",
                "categoria": "Microcontrolador",
                "funcion": "Para control de banda transportadora simulada"
            },
            {
                "componente": "Motor DC con encoder",
                "categoria": "Actuador",
                "funcion": "Ejecuta una acción física en respuesta a las decisiones del sistema."
            },
            {
                "componente": "Buzzer y LEDs indicadores",
                "categoria": "Interfaz de Usuario / Iluminación",
                "funcion": "Permite la interacción, iluminación o notificación visual/sonora del sistema."
            }
        ],
        "software_tabla": [
            {
                "herramienta": "Python con scikit-learn",
                "tipo": "Inteligencia Artificial / Machine Learning",
                "descripcion": "Procesa datos mediante modelos de IA/ML para generar predicciones o clasificaciones."
            },
            {
                "herramienta": "Isolation Forest, One-Class SVM",
                "tipo": "Inteligencia Artificial / Machine Learning",
                "descripcion": "Algoritmos"
            },
            {
                "herramienta": "Pandas y NumPy",
                "tipo": "Librería / Herramienta de Análisis de Datos",
                "descripcion": "Para procesamiento"
            },
            {
                "herramienta": "MQTT",
                "tipo": "Protocolo de Comunicación IoT",
                "descripcion": "Para comunicación"
            },
            {
                "herramienta": "Jupyter Notebook",
                "tipo": "IDE / Entorno de Desarrollo",
                "descripcion": "Para entrenamiento"
            },
            {
                "herramienta": "Node-RED",
                "tipo": "Automatización / Orquestación",
                "descripcion": "Para alertas"
            }
        ]
    },
    {
        "id": "proj_007",
        "titulo": "🏙️ Proyecto 7: Sistema de Conteo y Clasificación de Personas en Espacios Públicos",
        "descripcion": "Problema: La gestión de aforos y análisis de flujos en espacios públicos carece de datos precisos en tiempo real, generando aglomeraciones, riesgos de seguridad y dificultades en planificación urbana.\n\nDescripción: Contador inteligente que detecta y clasifica personas (adultos, niños) en espacios públicos usando ESP32-CAM o Raspberry Pi, útil para gestión de aforos y análisis de flujos urbanos.",
        "area": "AIoT + IoT con Visión Artificial",
        "sector": "Ciudades inteligentes (Smart Cities)",
        "nivel": "Avanzado",
        "duracion": "Un semestre",
        "presupuesto": "Bajo costo",
        "hardware": [
            "Raspberry Pi 3 B+ o Pi 4 (Computadora de Placa Reducida (SBC) | Actúa como unidad de procesamiento central o gateway del sistema.)",
            "Cámara Raspberry Pi v2 (Cámara / Sensor de Visión | O ESP32-CAM como alternativa económica)",
            "Sensor PIR (Sensor de Movimiento / Posición | Usado como trigger)",
            "microSD de 32GB (Almacenamiento | Almacenamiento)",
            "LED indicador de estado (Interfaz de Usuario / Iluminación | Permite la interacción, iluminación o notificación visual/sonora del sistema.)"
        ],
        "software": [
            "OpenCV con algoritmos de detección: Inteligencia Artificial / Machine Learning - HOG, Haar Cascades",
            "TensorFlow Lite con MobileNet-SSD: Inteligencia Artificial / Machine Learning - Procesa datos mediante modelos de IA/ML para generar predicciones o clasificaciones.",
            "Python: Lenguaje de Programación - Lenguaje utilizado para desarrollar la lógica del sistema.",
            "SQLite: Base de Datos - Para conteos locales",
            "ThingSpeak: Plataforma / Servicio Cloud IoT - Para estadísticas en la nube",
            "MQTT: Protocolo de Comunicación IoT - Para envío de eventos"
        ],
        "habilidades": [
            "Detección de objetos en tiempo real",
            "Optimización de procesamiento de video",
            "Preservación de privacidad (anonymización)",
            "Análisis estadístico de flujos",
            "Procesamiento edge computing"
        ],
        "objetivos": [
            "🎯 Objetivo General: Implementar un sistema de conteo y clasificación de personas en espacios públicos mediante visión artificial que genere métricas de ocupación respetando la privacidad de los individuos.",
            "📌 Objetivos Específicos:",
            "• Desarrollar algoritmo de detección de personas usando MobileNet-SSD optimizado para ejecución en Raspberry Pi.",
            "• Implementar técnicas de anonimización que eviten identificación facial y cumplan con regulaciones de privacidad.",
            "• Crear dashboard de visualización que muestre métricas de ocupación, flujos y patrones temporales para gestión urbana."
        ],
        "pasos": [
            "Análisis de requisitos",
            "Diseño de la solución",
            "Implementación y pruebas",
            "Validación y sustentación"
        ],
        "aplicaciones": [
            "Ciudades inteligentes (Smart Cities)"
        ],
        "referencias": [],
        "hardware_tabla": [
            {
                "componente": "Raspberry Pi 3 B+ o Pi 4",
                "categoria": "Computadora de Placa Reducida (SBC)",
                "funcion": "Actúa como unidad de procesamiento central o gateway del sistema."
            },
            {
                "componente": "Cámara Raspberry Pi v2",
                "categoria": "Cámara / Sensor de Visión",
                "funcion": "O ESP32-CAM como alternativa económica"
            },
            {
                "componente": "Sensor PIR",
                "categoria": "Sensor de Movimiento / Posición",
                "funcion": "Usado como trigger"
            },
            {
                "componente": "microSD de 32GB",
                "categoria": "Almacenamiento",
                "funcion": "Almacenamiento"
            },
            {
                "componente": "LED indicador de estado",
                "categoria": "Interfaz de Usuario / Iluminación",
                "funcion": "Permite la interacción, iluminación o notificación visual/sonora del sistema."
            }
        ],
        "software_tabla": [
            {
                "herramienta": "OpenCV con algoritmos de detección",
                "tipo": "Inteligencia Artificial / Machine Learning",
                "descripcion": "HOG, Haar Cascades"
            },
            {
                "herramienta": "TensorFlow Lite con MobileNet-SSD",
                "tipo": "Inteligencia Artificial / Machine Learning",
                "descripcion": "Procesa datos mediante modelos de IA/ML para generar predicciones o clasificaciones."
            },
            {
                "herramienta": "Python",
                "tipo": "Lenguaje de Programación",
                "descripcion": "Lenguaje utilizado para desarrollar la lógica del sistema."
            },
            {
                "herramienta": "SQLite",
                "tipo": "Base de Datos",
                "descripcion": "Para conteos locales"
            },
            {
                "herramienta": "ThingSpeak",
                "tipo": "Plataforma / Servicio Cloud IoT",
                "descripcion": "Para estadísticas en la nube"
            },
            {
                "herramienta": "MQTT",
                "tipo": "Protocolo de Comunicación IoT",
                "descripcion": "Para envío de eventos"
            }
        ]
    },
    {
        "id": "proj_008",
        "titulo": "🏥 Proyecto 8: Asistente de Monitoreo de Pacientes con Predicción de Deterioro",
        "descripcion": "Problema: El deterioro de pacientes hospitalizados frecuentemente no se detecta a tiempo, generando desenlaces adversos prevenibles por falta de monitoreo continuo y análisis predictivo de signos vitales.\n\nDescripción: Sistema de monitoreo continuo de signos vitales (frecuencia cardíaca, temperatura, movimiento) con algoritmo predictivo que alerta sobre posible deterioro del paciente antes de que se vuelva crítico.",
        "area": "AIoT",
        "sector": "Salud médica y hospitalaria",
        "nivel": "Avanzado",
        "duracion": "Un semestre",
        "presupuesto": "Bajo costo",
        "hardware": [
            "Raspberry Pi 4 (Computadora de Placa Reducida (SBC) | Actúa como unidad de procesamiento central o gateway del sistema.)",
            "Sensor de pulso MAX30102 (Sensor Biomédico | Oxímetro/frecuencia cardíaca)",
            "Sensor de temperatura MLX90614 (Sensor Ambiental | Sin contacto)",
            "Acelerómetro MPU6050 (Sensor de Movimiento / Posición | Detección de caídas)",
            "ESP32 (Microcontrolador | Usado como dispositivo wearable)",
            "Buzzer y LEDs (Interfaz de Usuario / Iluminación | Para alertas)",
            "Batería portátil (Fuente de Alimentación / Energía | Suministra energía eléctrica a los componentes del sistema.)"
        ],
        "software": [
            "Python con scikit-learn: Inteligencia Artificial / Machine Learning - Procesa datos mediante modelos de IA/ML para generar predicciones o clasificaciones.",
            "Random Forest, Regresión Logística: Inteligencia Artificial / Machine Learning - Algoritmos",
            "Pandas: Librería / Herramienta de Análisis de Datos - Para manejo de datos",
            "MQTT: Protocolo de Comunicación IoT - Para transmisión de vitales",
            "Node-RED: Automatización / Orquestación - Para flujos de alertas",
            "Dashboard web con Chart.js: Visualización / Dashboard - Presenta los datos del sistema en paneles visuales."
        ],
        "habilidades": [
            "Machine learning supervisado • Procesamiento de datos biomédicos • Sistemas de alertas tempranas • Manejo de datos sensibles • Diseño de sistemas críticos PROYECTOS DE IoT HACKING Y CIBERSEGURIDAD PROYECTOS DE IoT HACKING Y CIBERSEGURIDAD"
        ],
        "objetivos": [
            "🎯 Objetivo General: Desarrollar un sistema de monitoreo continuo de signos vitales que utilice machine learning para predecir deterioro clínico temprano y generar alertas preventivas al personal médico.",
            "📌 Objetivos Específicos:",
            "• Implementar sensores de frecuencia cardíaca, temperatura y movimiento en dispositivo wearable basado en ESP32.",
            "• Entrenar modelos predictivos (Random Forest, Regresión Logística) con datasets médicos de deterioro clínico.",
            "• Desarrollar sistema de alertas graduales que notifique al personal médico según nivel de riesgo calculado."
        ],
        "pasos": [
            "Análisis de requisitos",
            "Diseño de la solución",
            "Implementación y pruebas",
            "Validación y sustentación"
        ],
        "aplicaciones": [
            "Salud médica y hospitalaria"
        ],
        "referencias": [],
        "hardware_tabla": [
            {
                "componente": "Raspberry Pi 4",
                "categoria": "Computadora de Placa Reducida (SBC)",
                "funcion": "Actúa como unidad de procesamiento central o gateway del sistema."
            },
            {
                "componente": "Sensor de pulso MAX30102",
                "categoria": "Sensor Biomédico",
                "funcion": "Oxímetro/frecuencia cardíaca"
            },
            {
                "componente": "Sensor de temperatura MLX90614",
                "categoria": "Sensor Ambiental",
                "funcion": "Sin contacto"
            },
            {
                "componente": "Acelerómetro MPU6050",
                "categoria": "Sensor de Movimiento / Posición",
                "funcion": "Detección de caídas"
            },
            {
                "componente": "ESP32",
                "categoria": "Microcontrolador",
                "funcion": "Usado como dispositivo wearable"
            },
            {
                "componente": "Buzzer y LEDs",
                "categoria": "Interfaz de Usuario / Iluminación",
                "funcion": "Para alertas"
            },
            {
                "componente": "Batería portátil",
                "categoria": "Fuente de Alimentación / Energía",
                "funcion": "Suministra energía eléctrica a los componentes del sistema."
            }
        ],
        "software_tabla": [
            {
                "herramienta": "Python con scikit-learn",
                "tipo": "Inteligencia Artificial / Machine Learning",
                "descripcion": "Procesa datos mediante modelos de IA/ML para generar predicciones o clasificaciones."
            },
            {
                "herramienta": "Random Forest, Regresión Logística",
                "tipo": "Inteligencia Artificial / Machine Learning",
                "descripcion": "Algoritmos"
            },
            {
                "herramienta": "Pandas",
                "tipo": "Librería / Herramienta de Análisis de Datos",
                "descripcion": "Para manejo de datos"
            },
            {
                "herramienta": "MQTT",
                "tipo": "Protocolo de Comunicación IoT",
                "descripcion": "Para transmisión de vitales"
            },
            {
                "herramienta": "Node-RED",
                "tipo": "Automatización / Orquestación",
                "descripcion": "Para flujos de alertas"
            },
            {
                "herramienta": "Dashboard web con Chart.js",
                "tipo": "Visualización / Dashboard",
                "descripcion": "Presenta los datos del sistema en paneles visuales."
            }
        ]
    },
    {
        "id": "proj_009",
        "titulo": "🛡️ Proyecto 9: Laboratorio de Análisis de Vulnerabilidades en Redes IoT",
        "descripcion": "Problema: Los dispositivos IoT presentan vulnerabilidades críticas de seguridad (credenciales débiles, puertos abiertos, tráfico sin cifrar) que son explotadas por atacantes, pero los desarrolladores carecen de entornos seguros para aprenderlas.\n\nDescripción: Entorno controlado para identificar vulnerabilidades comunes en dispositivos IoT (credenciales débiles, puertos abiertos, tráfico sin cifrar) usando Raspberry Pi como plataforma de pentesting.",
        "area": "IoT Hacking y Ciberseguridad",
        "sector": "Control inteligente y sistemas embebidos",
        "nivel": "Avanzado",
        "duracion": "Un semestre",
        "presupuesto": "Bajo costo",
        "hardware": [
            "Raspberry Pi 4 (Computadora de Placa Reducida (SBC) | Atacante)",
            "Raspberry Pi 3 B+ (Computadora de Placa Reducida (SBC) | Víctima; servidor IoT vulnerable)",
            "ESP32 (Microcontrolador | 2-3 unidades; dispositivos IoT vulnerables)",
            "NodeMCU (Microcontrolador | Dispositivo con configuración insegura)",
            "Switch de red o router (Otro Componente de Hardware | Forma parte del hardware de soporte del proyecto.)",
            "Cables Ethernet (Componente Electrónico / Accesorio | Complementa el circuito electrónico del prototipo.)"
        ],
        "software": [
            "Kali Linux ARM: Sistema Operativo - Para Raspberry Pi",
            "Wireshark: Ciberseguridad - Para análisis de tráfico",
            "Nmap: Ciberseguridad - Para escaneo de puertos",
            "MQTT broker sin autenticación: Protocolo de Comunicación IoT - Intencional",
            "Servidor web vulnerable: Protocolo de Comunicación IoT - HTTP sin HTTPS",
            "Aircrack-ng: Ciberseguridad - Para análisis WiFi",
            "Python: Lenguaje de Programación - Para scripts de explotación"
        ],
        "habilidades": [
            "Ethical hacking en IoT",
            "Análisis de protocolos de red",
            "Identificación de vulnerabilidades",
            "Hardening de dispositivos IoT",
            "Conciencia de seguridad"
        ],
        "objetivos": [
            "🎯 Objetivo General: Crear un laboratorio de ciberseguridad IoT que permita identificar, analizar y documentar vulnerabilidades comunes en dispositivos conectados mediante técnicas de ethical hacking.",
            "📌 Objetivos Específicos:",
            "• Configurar entorno controlado con dispositivos IoT vulnerables intencionalmente para análisis de seguridad.",
            "• Utilizar herramientas de pentesting (Nmap, Wireshark, Aircrack-ng) para identificar vectores de ataque comunes.",
            "• Documentar vulnerabilidades encontradas y desarrollar guías de hardening para asegurar dispositivos IoT."
        ],
        "pasos": [
            "Análisis de requisitos",
            "Diseño de la solución",
            "Implementación y pruebas",
            "Validación y sustentación"
        ],
        "aplicaciones": [
            "Control inteligente y sistemas embebidos"
        ],
        "referencias": [],
        "hardware_tabla": [
            {
                "componente": "Raspberry Pi 4",
                "categoria": "Computadora de Placa Reducida (SBC)",
                "funcion": "Atacante"
            },
            {
                "componente": "Raspberry Pi 3 B+",
                "categoria": "Computadora de Placa Reducida (SBC)",
                "funcion": "Víctima; servidor IoT vulnerable"
            },
            {
                "componente": "ESP32",
                "categoria": "Microcontrolador",
                "funcion": "2-3 unidades; dispositivos IoT vulnerables"
            },
            {
                "componente": "NodeMCU",
                "categoria": "Microcontrolador",
                "funcion": "Dispositivo con configuración insegura"
            },
            {
                "componente": "Switch de red o router",
                "categoria": "Otro Componente de Hardware",
                "funcion": "Forma parte del hardware de soporte del proyecto."
            },
            {
                "componente": "Cables Ethernet",
                "categoria": "Componente Electrónico / Accesorio",
                "funcion": "Complementa el circuito electrónico del prototipo."
            }
        ],
        "software_tabla": [
            {
                "herramienta": "Kali Linux ARM",
                "tipo": "Sistema Operativo",
                "descripcion": "Para Raspberry Pi"
            },
            {
                "herramienta": "Wireshark",
                "tipo": "Ciberseguridad",
                "descripcion": "Para análisis de tráfico"
            },
            {
                "herramienta": "Nmap",
                "tipo": "Ciberseguridad",
                "descripcion": "Para escaneo de puertos"
            },
            {
                "herramienta": "MQTT broker sin autenticación",
                "tipo": "Protocolo de Comunicación IoT",
                "descripcion": "Intencional"
            },
            {
                "herramienta": "Servidor web vulnerable",
                "tipo": "Protocolo de Comunicación IoT",
                "descripcion": "HTTP sin HTTPS"
            },
            {
                "herramienta": "Aircrack-ng",
                "tipo": "Ciberseguridad",
                "descripcion": "Para análisis WiFi"
            },
            {
                "herramienta": "Python",
                "tipo": "Lenguaje de Programación",
                "descripcion": "Para scripts de explotación"
            }
        ]
    },
    {
        "id": "proj_010",
        "titulo": "🚨 Proyecto 10: Sistema de Detección de Intrusiones en Red IoT",
        "descripcion": "Problema: Las redes IoT son vulnerables a ataques específicos (MITM, flood, escaneos) que los IDS tradicionales no detectan efectivamente, dejando infraestructuras críticas expuestas a compromisos de seguridad.\n\nDescripción: IDS (Intrusion Detection System) basado en Raspberry Pi que monitorea tráfico de red IoT, detecta patrones anómalos, escaneos de puertos y ataques comunes como MITM o flood attacks.",
        "area": "IoT Hacking y Ciberseguridad",
        "sector": "Ciudades inteligentes (Smart Cities)",
        "nivel": "Avanzado",
        "duracion": "Un semestre",
        "presupuesto": "Bajo costo",
        "hardware": [
            "Raspberry Pi 4 (Computadora de Placa Reducida (SBC) | Actúa como unidad de procesamiento central o gateway del sistema (4GB RAM).)",
            "Adaptador WiFi USB adicional (Otro Componente de Hardware | Modo monitor)",
            "Switch con port mirroring (Otro Componente de Hardware | O hub pasivo)",
            "ESP32 (Microcontrolador | Dispositivos IoT legítimos (3 unidades))",
            "Arduino UNO (Microcontrolador | Dispositivo atacante simulado)",
            "LEDs indicadores de alertas (Interfaz de Usuario / Iluminación | Permite la interacción, iluminación o notificación visual/sonora del sistema.)"
        ],
        "software": [
            "Suricata o Snort: Herramienta / Tecnología de Software - IDS open source",
            "Zeek: Librería / Herramienta de Análisis de Datos - Análisis de tráfico",
            "Python: Lenguaje de Programación - Para scripts personalizados",
            "Elasticsearch + Kibana para logs: Base de Datos - Opcional: Grafana",
            "MQTT broker: Protocolo de Comunicación IoT - Define el estándar de comunicación de datos entre dispositivos.",
            "Reglas personalizadas Snort: Herramienta / Tecnología de Software - Tecnología de software empleada en el desarrollo del proyecto."
        ],
        "habilidades": [
            "Implementación de IDS",
            "Análisis forense de red",
            "Creación de reglas de detección",
            "Gestión de logs de seguridad",
            "Respuesta a incidentes"
        ],
        "objetivos": [
            "🎯 Objetivo General: Implementar un sistema de detección de intrusiones (IDS) especializado para redes IoT que identifique patrones de ataque mediante análisis de tráfico en tiempo real.",
            "📌 Objetivos Específicos:",
            "• Configurar Suricata/Snort en Raspberry Pi con reglas personalizadas para ataques específicos de IoT.",
            "• Implementar análisis de tráfico con Zeek para identificar comportamientos anómalos en protocolos IoT.",
            "• Desarrollar dashboard de seguridad que visualice eventos, alertas y métricas de amenazas detectadas."
        ],
        "pasos": [
            "Análisis de requisitos",
            "Diseño de la solución",
            "Implementación y pruebas",
            "Validación y sustentación"
        ],
        "aplicaciones": [
            "Ciudades inteligentes (Smart Cities)"
        ],
        "referencias": [],
        "hardware_tabla": [
            {
                "componente": "Raspberry Pi 4",
                "categoria": "Computadora de Placa Reducida (SBC)",
                "funcion": "Actúa como unidad de procesamiento central o gateway del sistema (4GB RAM)."
            },
            {
                "componente": "Adaptador WiFi USB adicional",
                "categoria": "Otro Componente de Hardware",
                "funcion": "Modo monitor"
            },
            {
                "componente": "Switch con port mirroring",
                "categoria": "Otro Componente de Hardware",
                "funcion": "O hub pasivo"
            },
            {
                "componente": "ESP32",
                "categoria": "Microcontrolador",
                "funcion": "Dispositivos IoT legítimos (3 unidades)"
            },
            {
                "componente": "Arduino UNO",
                "categoria": "Microcontrolador",
                "funcion": "Dispositivo atacante simulado"
            },
            {
                "componente": "LEDs indicadores de alertas",
                "categoria": "Interfaz de Usuario / Iluminación",
                "funcion": "Permite la interacción, iluminación o notificación visual/sonora del sistema."
            }
        ],
        "software_tabla": [
            {
                "herramienta": "Suricata o Snort",
                "tipo": "Herramienta / Tecnología de Software",
                "descripcion": "IDS open source"
            },
            {
                "herramienta": "Zeek",
                "tipo": "Librería / Herramienta de Análisis de Datos",
                "descripcion": "Análisis de tráfico"
            },
            {
                "herramienta": "Python",
                "tipo": "Lenguaje de Programación",
                "descripcion": "Para scripts personalizados"
            },
            {
                "herramienta": "Elasticsearch + Kibana para logs",
                "tipo": "Base de Datos",
                "descripcion": "Opcional: Grafana"
            },
            {
                "herramienta": "MQTT broker",
                "tipo": "Protocolo de Comunicación IoT",
                "descripcion": "Define el estándar de comunicación de datos entre dispositivos."
            },
            {
                "herramienta": "Reglas personalizadas Snort",
                "tipo": "Herramienta / Tecnología de Software",
                "descripcion": "Tecnología de software empleada en el desarrollo del proyecto."
            }
        ]
    },
    {
        "id": "proj_011",
        "titulo": "🔑 Proyecto 11: Sistema de Autenticación Multi-Factor para Acceso IoT",
        "descripcion": "Problema: Los sistemas de acceso tradicionales con un solo factor son vulnerables a clonación de tarjetas, robo de credenciales y accesos no autorizados, poniendo en riesgo la seguridad de edificios y áreas restringidas.\n\nDescripción: Control de acceso a edificio inteligente con autenticación de múltiples factores (RFID + PIN + biometría facial opcional), con cifrado end-to-end y logging de intentos de acceso.",
        "area": "IoT Hacking y Ciberseguridad",
        "sector": "Domótica e Inmótica (edificios inteligentes)",
        "nivel": "Avanzado",
        "duracion": "Un semestre",
        "presupuesto": "Bajo costo",
        "hardware": [
            "Raspberry Pi 4 (Computadora de Placa Reducida (SBC) | Actúa como unidad de procesamiento central o gateway del sistema.)",
            "Módulo RFID RC522 (Módulo de Comunicación / Conectividad | Permite la transmisión inalámbrica de datos entre dispositivos.)",
            "Teclado matricial 4x4 (Interfaz de Usuario / Iluminación | Permite la interacción, iluminación o notificación visual/sonora del sistema.)",
            "Cámara Raspberry Pi (Cámara / Sensor de Visión | Para facial opcional)",
            "Relé (Actuador | Para cerradura electrónica)",
            "ESP32 (Microcontrolador | Nodo de puerta)",
            "Display LCD 16x2 (Interfaz de Usuario / Iluminación | Permite la interacción, iluminación o notificación visual/sonora del sistema.)",
            "Buzzer (Interfaz de Usuario / Iluminación | Para alertas)"
        ],
        "software": [
            "Python: Lenguaje de Programación - Para lógica de autenticación",
            "OpenCV + Face Recognition: Inteligencia Artificial / Machine Learning - Opcional",
            "Cifrado AES: Ciberseguridad - Para comunicaciones",
            "MQTT con TLS/SSL: Protocolo de Comunicación IoT - Define el estándar de comunicación de datos entre dispositivos.",
            "PostgreSQL: Base de Datos - Para logs de acceso",
            "Hashing bcrypt: Herramienta / Tecnología de Software - Para PINs",
            "Tokens JWT: Herramienta / Tecnología de Software - Para sesiones"
        ],
        "habilidades": [
            "Implementación de MFA",
            "Criptografía aplicada",
            "Gestión segura de credenciales",
            "Auditoría de accesos",
            "Diseño de sistemas seguros"
        ],
        "objetivos": [
            "🎯 Objetivo General: Diseñar un sistema de control de acceso multi-factor que combine RFID, PIN y opcionalmente biometría facial con cifrado de comunicaciones para edificios inteligentes.",
            "📌 Objetivos Específicos:",
            "• Implementar autenticación de múltiples factores integrando RFID, teclado matricial y cámara para reconocimiento facial.",
            "• Desarrollar sistema de cifrado end-to-end usando AES y TLS/SSL para todas las comunicaciones del sistema.",
            "• Crear base de datos de auditoría que registre todos los intentos de acceso con timestamps y evidencia fotográfica."
        ],
        "pasos": [
            "Análisis de requisitos",
            "Diseño de la solución",
            "Implementación y pruebas",
            "Validación y sustentación"
        ],
        "aplicaciones": [
            "Domótica e Inmótica (edificios inteligentes)"
        ],
        "referencias": [],
        "hardware_tabla": [
            {
                "componente": "Raspberry Pi 4",
                "categoria": "Computadora de Placa Reducida (SBC)",
                "funcion": "Actúa como unidad de procesamiento central o gateway del sistema."
            },
            {
                "componente": "Módulo RFID RC522",
                "categoria": "Módulo de Comunicación / Conectividad",
                "funcion": "Permite la transmisión inalámbrica de datos entre dispositivos."
            },
            {
                "componente": "Teclado matricial 4x4",
                "categoria": "Interfaz de Usuario / Iluminación",
                "funcion": "Permite la interacción, iluminación o notificación visual/sonora del sistema."
            },
            {
                "componente": "Cámara Raspberry Pi",
                "categoria": "Cámara / Sensor de Visión",
                "funcion": "Para facial opcional"
            },
            {
                "componente": "Relé",
                "categoria": "Actuador",
                "funcion": "Para cerradura electrónica"
            },
            {
                "componente": "ESP32",
                "categoria": "Microcontrolador",
                "funcion": "Nodo de puerta"
            },
            {
                "componente": "Display LCD 16x2",
                "categoria": "Interfaz de Usuario / Iluminación",
                "funcion": "Permite la interacción, iluminación o notificación visual/sonora del sistema."
            },
            {
                "componente": "Buzzer",
                "categoria": "Interfaz de Usuario / Iluminación",
                "funcion": "Para alertas"
            }
        ],
        "software_tabla": [
            {
                "herramienta": "Python",
                "tipo": "Lenguaje de Programación",
                "descripcion": "Para lógica de autenticación"
            },
            {
                "herramienta": "OpenCV + Face Recognition",
                "tipo": "Inteligencia Artificial / Machine Learning",
                "descripcion": "Opcional"
            },
            {
                "herramienta": "Cifrado AES",
                "tipo": "Ciberseguridad",
                "descripcion": "Para comunicaciones"
            },
            {
                "herramienta": "MQTT con TLS/SSL",
                "tipo": "Protocolo de Comunicación IoT",
                "descripcion": "Define el estándar de comunicación de datos entre dispositivos."
            },
            {
                "herramienta": "PostgreSQL",
                "tipo": "Base de Datos",
                "descripcion": "Para logs de acceso"
            },
            {
                "herramienta": "Hashing bcrypt",
                "tipo": "Herramienta / Tecnología de Software",
                "descripcion": "Para PINs"
            },
            {
                "herramienta": "Tokens JWT",
                "tipo": "Herramienta / Tecnología de Software",
                "descripcion": "Para sesiones"
            }
        ]
    },
    {
        "id": "proj_012",
        "titulo": "🍯 Proyecto 12: Honeypot IoT para Detección de Amenazas",
        "descripcion": "Problema: Las organizaciones carecen de inteligencia sobre amenazas emergentes y técnicas de ataque específicas contra infraestructuras IoT críticas, limitando su capacidad de defensa proactiva.\n\nDescripción: Dispositivo señuelo que simula ser un medidor inteligente vulnerable para atraer atacantes, registrar sus técnicas y generar inteligencia sobre amenazas emergentes en infraestructuras críticas.",
        "area": "IoT Hacking y Ciberseguridad",
        "sector": "Infraestructuras energéticas y redes eléctricas inteligentes",
        "nivel": "Intermedio-Avanzado",
        "duracion": "Un semestre",
        "presupuesto": "Bajo costo",
        "hardware": [
            "Raspberry Pi 4 (Computadora de Placa Reducida (SBC) | Actúa como unidad de procesamiento central o gateway del sistema.)",
            "ESP32 (Microcontrolador | Honeypot de bajo nivel)",
            "Arduino UNO (Microcontrolador | Simulador de medidor)",
            "Adaptador WiFi USB (Otro Componente de Hardware | Forma parte del hardware de soporte del proyecto.)",
            "Almacenamiento USB adicional (Otro Componente de Hardware | Para logs)"
        ],
        "software": [
            "Cowrie: Broker / Middleware de Mensajería - Honeypot SSH/Telnet",
            "Dionaea: Broker / Middleware de Mensajería - Honeypot multi-protocolo",
            "Python: Lenguaje de Programación - Para servicios falsos personalizados",
            "MQTT broker abierto: Protocolo de Comunicación IoT - Intencional",
            "Elasticsearch: Base de Datos - Para almacenamiento de logs",
            "Fail2ban: Librería / Herramienta de Análisis de Datos - Para análisis de patrones",
            "Scripts de notificación: Herramienta / Tecnología de Software - Telegram API"
        ],
        "habilidades": [
            "Implementación de honeypots • Análisis de amenazas • Threat intelligence • Configuración de servicios señuelo • Análisis de comportamiento de atacantes PROYECTOS DE IoT CON BIG DATA Y ANALÍTICA PROYECTOS DE IoT CON BIG DATA Y ANALÍTICA"
        ],
        "objetivos": [
            "🎯 Objetivo General: Implementar un honeypot IoT que simule dispositivos vulnerables para atraer atacantes, registrar sus técnicas y generar inteligencia de amenazas para infraestructuras críticas.",
            "📌 Objetivos Específicos:",
            "• Configurar múltiples servicios señuelo (SSH, Telnet, MQTT) con vulnerabilidades conocidas intencionalmente.",
            "• Implementar sistema de logging exhaustivo que capture comandos, payloads y comportamiento de atacantes.",
            "• Desarrollar análisis automatizado de logs que identifique patrones de ataque y genere indicadores de compromiso (IoCs)."
        ],
        "pasos": [
            "Análisis de requisitos",
            "Diseño de la solución",
            "Implementación y pruebas",
            "Validación y sustentación"
        ],
        "aplicaciones": [
            "Infraestructuras energéticas y redes eléctricas inteligentes"
        ],
        "referencias": [],
        "hardware_tabla": [
            {
                "componente": "Raspberry Pi 4",
                "categoria": "Computadora de Placa Reducida (SBC)",
                "funcion": "Actúa como unidad de procesamiento central o gateway del sistema."
            },
            {
                "componente": "ESP32",
                "categoria": "Microcontrolador",
                "funcion": "Honeypot de bajo nivel"
            },
            {
                "componente": "Arduino UNO",
                "categoria": "Microcontrolador",
                "funcion": "Simulador de medidor"
            },
            {
                "componente": "Adaptador WiFi USB",
                "categoria": "Otro Componente de Hardware",
                "funcion": "Forma parte del hardware de soporte del proyecto."
            },
            {
                "componente": "Almacenamiento USB adicional",
                "categoria": "Otro Componente de Hardware",
                "funcion": "Para logs"
            }
        ],
        "software_tabla": [
            {
                "herramienta": "Cowrie",
                "tipo": "Broker / Middleware de Mensajería",
                "descripcion": "Honeypot SSH/Telnet"
            },
            {
                "herramienta": "Dionaea",
                "tipo": "Broker / Middleware de Mensajería",
                "descripcion": "Honeypot multi-protocolo"
            },
            {
                "herramienta": "Python",
                "tipo": "Lenguaje de Programación",
                "descripcion": "Para servicios falsos personalizados"
            },
            {
                "herramienta": "MQTT broker abierto",
                "tipo": "Protocolo de Comunicación IoT",
                "descripcion": "Intencional"
            },
            {
                "herramienta": "Elasticsearch",
                "tipo": "Base de Datos",
                "descripcion": "Para almacenamiento de logs"
            },
            {
                "herramienta": "Fail2ban",
                "tipo": "Librería / Herramienta de Análisis de Datos",
                "descripcion": "Para análisis de patrones"
            },
            {
                "herramienta": "Scripts de notificación",
                "tipo": "Herramienta / Tecnología de Software",
                "descripcion": "Telegram API"
            }
        ]
    },
    {
        "id": "proj_013",
        "titulo": "⚡ Proyecto 13: Plataforma de Análisis Predictivo para Consumo Energético",
        "descripcion": "Problema: El consumo energético ineficiente en edificios genera costos elevados y desperdicio, mientras que la falta de predicción impide optimización proactiva y planificación de demanda.\n\nDescripción: Sistema que recopila datos de múltiples sensores de consumo eléctrico en edificio/campus, los almacena en base de datos de series temporales y genera predicciones de consumo futuro para optimización energética.",
        "area": "IoT con Big Data y Analítica",
        "sector": "Infraestructuras energéticas y redes eléctricas inteligentes",
        "nivel": "Avanzado",
        "duracion": "Un semestre",
        "presupuesto": "Bajo costo",
        "hardware": [
            "Raspberry Pi 4 (Computadora de Placa Reducida (SBC) | Servidor central)",
            "ESP32 (Microcontrolador | 4-6 unidades; nodos de medición)",
            "Sensores de corriente ACS712 (Otro Componente de Hardware | Forma parte del hardware de soporte del proyecto (6 unidades).)",
            "Sensores de voltaje ZMPT101B (Otro Componente de Hardware | Forma parte del hardware de soporte del proyecto (3 unidades).)",
            "Relés para control de cargas (Actuador | Ejecuta una acción física en respuesta a las decisiones del sistema (4 canales).)",
            "Display OLED (Interfaz de Usuario / Iluminación | Para visualización local)"
        ],
        "software": [
            "InfluxDB: Base de Datos - Base de datos de series temporales",
            "Grafana: Visualización / Dashboard - Para dashboards",
            "Python con Prophet: Lenguaje de Programación - Forecasting de Facebook",
            "Pandas y NumPy: Librería / Herramienta de Análisis de Datos - Se utiliza para el procesamiento y análisis de los datos recolectados.",
            "Apache Airflow: Automatización / Orquestación - Para orquestación de tareas",
            "MQTT: Protocolo de Comunicación IoT - Para recolección",
            "Jupyter Notebook: IDE / Entorno de Desarrollo - Para análisis"
        ],
        "habilidades": [
            "Forecasting con series temporales",
            "Big Data en edge computing",
            "ETL (Extract, Transform, Load)",
            "Análisis de patrones de consumo",
            "Optimización energética"
        ],
        "objetivos": [
            "🎯 Objetivo General: Desarrollar una plataforma de análisis predictivo de consumo energético que utilice series temporales y machine learning para optimizar el uso de energía en edificios.",
            "📌 Objetivos Específicos:",
            "• Implementar red de sensores de corriente y voltaje que monitoreen consumo eléctrico en circuitos críticos.",
            "• Desarrollar modelos de forecasting con Prophet que predigan consumo futuro basado en patrones históricos.",
            "• Crear sistema de recomendaciones que sugiera acciones de optimización energética según predicciones y costos."
        ],
        "pasos": [
            "Análisis de requisitos",
            "Diseño de la solución",
            "Implementación y pruebas",
            "Validación y sustentación"
        ],
        "aplicaciones": [
            "Infraestructuras energéticas y redes eléctricas inteligentes"
        ],
        "referencias": [],
        "hardware_tabla": [
            {
                "componente": "Raspberry Pi 4",
                "categoria": "Computadora de Placa Reducida (SBC)",
                "funcion": "Servidor central"
            },
            {
                "componente": "ESP32",
                "categoria": "Microcontrolador",
                "funcion": "4-6 unidades; nodos de medición"
            },
            {
                "componente": "Sensores de corriente ACS712",
                "categoria": "Otro Componente de Hardware",
                "funcion": "Forma parte del hardware de soporte del proyecto (6 unidades)."
            },
            {
                "componente": "Sensores de voltaje ZMPT101B",
                "categoria": "Otro Componente de Hardware",
                "funcion": "Forma parte del hardware de soporte del proyecto (3 unidades)."
            },
            {
                "componente": "Relés para control de cargas",
                "categoria": "Actuador",
                "funcion": "Ejecuta una acción física en respuesta a las decisiones del sistema (4 canales)."
            },
            {
                "componente": "Display OLED",
                "categoria": "Interfaz de Usuario / Iluminación",
                "funcion": "Para visualización local"
            }
        ],
        "software_tabla": [
            {
                "herramienta": "InfluxDB",
                "tipo": "Base de Datos",
                "descripcion": "Base de datos de series temporales"
            },
            {
                "herramienta": "Grafana",
                "tipo": "Visualización / Dashboard",
                "descripcion": "Para dashboards"
            },
            {
                "herramienta": "Python con Prophet",
                "tipo": "Lenguaje de Programación",
                "descripcion": "Forecasting de Facebook"
            },
            {
                "herramienta": "Pandas y NumPy",
                "tipo": "Librería / Herramienta de Análisis de Datos",
                "descripcion": "Se utiliza para el procesamiento y análisis de los datos recolectados."
            },
            {
                "herramienta": "Apache Airflow",
                "tipo": "Automatización / Orquestación",
                "descripcion": "Para orquestación de tareas"
            },
            {
                "herramienta": "MQTT",
                "tipo": "Protocolo de Comunicación IoT",
                "descripcion": "Para recolección"
            },
            {
                "herramienta": "Jupyter Notebook",
                "tipo": "IDE / Entorno de Desarrollo",
                "descripcion": "Para análisis"
            }
        ]
    },
    {
        "id": "proj_014",
        "titulo": "🚗 Proyecto 14: Sistema de Análisis de Tráfico Vehicular Urbano",
        "descripcion": "Problema: La congestión vehicular urbana genera pérdidas económicas, contaminación y baja calidad de vida, mientras que la gestión de tráfico carece de datos en tiempo real para optimización dinámica.\n\nDescripción: Red de sensores que capturan datos de flujo vehicular en intersecciones, los agregan y analizan para identificar patrones de congestión, optimizar semáforos y generar reportes de movilidad urbana.",
        "area": "IoT con Big Data y Analítica + Visión Artificial",
        "sector": "Ciudades inteligentes (Smart Cities)",
        "nivel": "Avanzado",
        "duracion": "Un semestre",
        "presupuesto": "Bajo costo",
        "hardware": [
            "Raspberry Pi 4 (Computadora de Placa Reducida (SBC) | Nodo central de procesamiento)",
            "ESP32-CAM (Microcontrolador con Cámara Integrada | 3-4 unidades en intersecciones)",
            "Sensores ultrasónicos HC-SR04 (Sensor de Movimiento / Posición | Conteo vehicular)",
            "Arduino Nano (Microcontrolador | Control de sensores (2 unidades))",
            "SSD USB o microSD de alta capacidad (Almacenamiento | Almacenamiento)"
        ],
        "software": [
            "OpenCV: Inteligencia Artificial / Machine Learning - Para procesamiento de video",
            "MongoDB: Base de Datos - Para almacenamiento de datos",
            "Apache Spark: Herramienta / Tecnología de Software - Versión standalone; para procesamiento",
            "Python con PySpark: Lenguaje de Programación - Lenguaje utilizado para desarrollar la lógica del sistema.",
            "Pandas: Librería / Herramienta de Análisis de Datos - Para agregaciones",
            "Matplotlib/Seaborn: Librería / Herramienta de Análisis de Datos - Para visualizaciones",
            "Node-RED: Automatización / Orquestación - Para ingesta de datos"
        ],
        "habilidades": [
            "Procesamiento distribuido de datos",
            "Computer vision aplicada",
            "Análisis espacial y temporal",
            "Visualización de datos urbanos",
            "Big Data en IoT"
        ],
        "objetivos": [
            "🎯 Objetivo General: Implementar un sistema de análisis de tráfico vehicular urbano que capture datos de flujo en intersecciones y utilice big data para optimizar sincronización semafórica.",
            "📌 Objetivos Específicos:",
            "• Desplegar red de ESP32-CAM y sensores ultrasónicos en intersecciones críticas para captura de datos vehiculares.",
            "• Desarrollar pipeline de procesamiento con Apache Spark para análisis de patrones de congestión en tiempo real.",
            "• Crear algoritmos de optimización semafórica que ajusten tiempos según densidad vehicular detectada."
        ],
        "pasos": [
            "Análisis de requisitos",
            "Diseño de la solución",
            "Implementación y pruebas",
            "Validación y sustentación"
        ],
        "aplicaciones": [
            "Ciudades inteligentes (Smart Cities)"
        ],
        "referencias": [],
        "hardware_tabla": [
            {
                "componente": "Raspberry Pi 4",
                "categoria": "Computadora de Placa Reducida (SBC)",
                "funcion": "Nodo central de procesamiento"
            },
            {
                "componente": "ESP32-CAM",
                "categoria": "Microcontrolador con Cámara Integrada",
                "funcion": "3-4 unidades en intersecciones"
            },
            {
                "componente": "Sensores ultrasónicos HC-SR04",
                "categoria": "Sensor de Movimiento / Posición",
                "funcion": "Conteo vehicular"
            },
            {
                "componente": "Arduino Nano",
                "categoria": "Microcontrolador",
                "funcion": "Control de sensores (2 unidades)"
            },
            {
                "componente": "SSD USB o microSD de alta capacidad",
                "categoria": "Almacenamiento",
                "funcion": "Almacenamiento"
            }
        ],
        "software_tabla": [
            {
                "herramienta": "OpenCV",
                "tipo": "Inteligencia Artificial / Machine Learning",
                "descripcion": "Para procesamiento de video"
            },
            {
                "herramienta": "MongoDB",
                "tipo": "Base de Datos",
                "descripcion": "Para almacenamiento de datos"
            },
            {
                "herramienta": "Apache Spark",
                "tipo": "Herramienta / Tecnología de Software",
                "descripcion": "Versión standalone; para procesamiento"
            },
            {
                "herramienta": "Python con PySpark",
                "tipo": "Lenguaje de Programación",
                "descripcion": "Lenguaje utilizado para desarrollar la lógica del sistema."
            },
            {
                "herramienta": "Pandas",
                "tipo": "Librería / Herramienta de Análisis de Datos",
                "descripcion": "Para agregaciones"
            },
            {
                "herramienta": "Matplotlib/Seaborn",
                "tipo": "Librería / Herramienta de Análisis de Datos",
                "descripcion": "Para visualizaciones"
            },
            {
                "herramienta": "Node-RED",
                "tipo": "Automatización / Orquestación",
                "descripcion": "Para ingesta de datos"
            }
        ]
    },
    {
        "id": "proj_015",
        "titulo": "🌬️ Proyecto 15: Plataforma de Monitoreo de Calidad del Aire con Analítica",
        "descripcion": "Problema: La contaminación atmosférica afecta la salud pública, pero el monitoreo limitado impide identificar fuentes de emisión y zonas críticas para intervención efectiva.\n\nDescripción: Red de estaciones de monitoreo de calidad del aire (PM2.5, PM10, CO2, NO2) distribuidas en ciudad/campus que recopilan datos continuos, los analizan para identificar fuentes de contaminación y generan mapas de calor.",
        "area": "IoT con Big Data y Analítica",
        "sector": "Gestión medioambiental y sostenibilidad",
        "nivel": "Intermedio-Avanzado",
        "duracion": "Un semestre",
        "presupuesto": "Bajo costo",
        "hardware": [
            "Raspberry Pi 4 (Computadora de Placa Reducida (SBC) | Servidor)",
            "ESP32 (Microcontrolador | 5-6 nodos de sensores)",
            "Sensor PMS5003 (Sensor Ambiental | Material particulado)",
            "Sensor MQ-135 (Sensor Ambiental | Calidad del aire general)",
            "Sensor MH-Z19B (Sensor Ambiental | CO2)",
            "GPS NEO-6M (Módulo de Comunicación / Conectividad | Geolocalización de nodos)",
            "DHT22 (Sensor Ambiental | Datos meteorológicos)"
        ],
        "software": [
            "PostgreSQL con PostGIS: Base de Datos - Datos geoespaciales",
            "TimescaleDB: Base de Datos - Extensión para series temporales",
            "Python con Pandas y GeoPandas: Lenguaje de Programación - Lenguaje utilizado para desarrollar la lógica del sistema.",
            "Matplotlib y Folium: Librería / Herramienta de Análisis de Datos - Mapas interactivos",
            "ThingSpeak: Plataforma / Servicio Cloud IoT - Para respaldo en nube",
            "MQTT broker: Protocolo de Comunicación IoT - Define el estándar de comunicación de datos entre dispositivos.",
            "Algoritmos de clustering: Inteligencia Artificial / Machine Learning - K-means"
        ],
        "habilidades": [
            "Análisis geoespacial",
            "Visualización de mapas de calor",
            "Manejo de datos ambientales",
            "Clustering y segmentación",
            "Bases de datos geográficas"
        ],
        "objetivos": [
            "🎯 Objetivo General: Desarrollar una plataforma de monitoreo de calidad del aire con análisis geoespacial que identifique fuentes de contaminación y genere mapas de calor de polución atmosférica.",
            "📌 Objetivos Específicos:",
            "• Implementar red de estaciones de monitoreo con sensores de PM2.5, PM10, CO2 y NO2 con GPS.",
            "• Desarrollar análisis geoespacial con clustering (K-means) para identificar zonas de alta contaminación.",
            "• Crear mapas interactivos de calidad del aire que visualicen tendencias temporales y alertas de salud pública."
        ],
        "pasos": [
            "Análisis de requisitos",
            "Diseño de la solución",
            "Implementación y pruebas",
            "Validación y sustentación"
        ],
        "aplicaciones": [
            "Gestión medioambiental y sostenibilidad"
        ],
        "referencias": [],
        "hardware_tabla": [
            {
                "componente": "Raspberry Pi 4",
                "categoria": "Computadora de Placa Reducida (SBC)",
                "funcion": "Servidor"
            },
            {
                "componente": "ESP32",
                "categoria": "Microcontrolador",
                "funcion": "5-6 nodos de sensores"
            },
            {
                "componente": "Sensor PMS5003",
                "categoria": "Sensor Ambiental",
                "funcion": "Material particulado"
            },
            {
                "componente": "Sensor MQ-135",
                "categoria": "Sensor Ambiental",
                "funcion": "Calidad del aire general"
            },
            {
                "componente": "Sensor MH-Z19B",
                "categoria": "Sensor Ambiental",
                "funcion": "CO2"
            },
            {
                "componente": "GPS NEO-6M",
                "categoria": "Módulo de Comunicación / Conectividad",
                "funcion": "Geolocalización de nodos"
            },
            {
                "componente": "DHT22",
                "categoria": "Sensor Ambiental",
                "funcion": "Datos meteorológicos"
            }
        ],
        "software_tabla": [
            {
                "herramienta": "PostgreSQL con PostGIS",
                "tipo": "Base de Datos",
                "descripcion": "Datos geoespaciales"
            },
            {
                "herramienta": "TimescaleDB",
                "tipo": "Base de Datos",
                "descripcion": "Extensión para series temporales"
            },
            {
                "herramienta": "Python con Pandas y GeoPandas",
                "tipo": "Lenguaje de Programación",
                "descripcion": "Lenguaje utilizado para desarrollar la lógica del sistema."
            },
            {
                "herramienta": "Matplotlib y Folium",
                "tipo": "Librería / Herramienta de Análisis de Datos",
                "descripcion": "Mapas interactivos"
            },
            {
                "herramienta": "ThingSpeak",
                "tipo": "Plataforma / Servicio Cloud IoT",
                "descripcion": "Para respaldo en nube"
            },
            {
                "herramienta": "MQTT broker",
                "tipo": "Protocolo de Comunicación IoT",
                "descripcion": "Define el estándar de comunicación de datos entre dispositivos."
            },
            {
                "herramienta": "Algoritmos de clustering",
                "tipo": "Inteligencia Artificial / Machine Learning",
                "descripcion": "K-means"
            }
        ]
    },
    {
        "id": "proj_016",
        "titulo": "💊 Proyecto 16: Sistema de Análisis de Producción Farmacéutica en Tiempo Real",
        "descripcion": "Problema: La industria farmacéutica requiere control riguroso de variables de proceso y documentación exhaustiva para cumplimiento regulatorio, procesos actualmente manuales y propensos a errores.\n\nDescripción: Plataforma que monitorea variables críticas en proceso de manufactura farmacéutica (temperatura, humedad, presión, vibración), almacena históricos y genera análisis de tendencias para control de calidad y compliance regulatorio.",
        "area": "IoT con Big Data y Analítica",
        "sector": "Industria farmacéutica",
        "nivel": "Avanzado",
        "duracion": "Un semestre",
        "presupuesto": "Bajo costo",
        "hardware": [
            "Raspberry Pi 4 (Computadora de Placa Reducida (SBC) | Redundancia (2 unidades))",
            "ESP32 (Microcontrolador | Diferentes puntos de proceso (4 unidades))",
            "DHT22 (Sensor Ambiental | Temperatura/humedad)",
            "BMP280 (Sensor Ambiental | Presión)",
            "MPU6050 (Sensor de Movimiento / Posición | Vibración de equipos)",
            "Sensores de flujo (Otro Componente de Hardware | Forma parte del hardware de soporte del proyecto.)",
            "Display TFT (Interfaz de Usuario / Iluminación | Para HMI local)"
        ],
        "software": [
            "InfluxDB: Base de Datos - Para almacenamiento",
            "Grafana con alertas configurables: Visualización / Dashboard - Presenta los datos del sistema en paneles visuales.",
            "Python para cálculos estadísticos: Lenguaje de Programación - SPC; Statistical Process Control",
            "Pandas y SciPy: Librería / Herramienta de Análisis de Datos - Se utiliza para el procesamiento y análisis de los datos recolectados.",
            "MQTT con QoS 2: Protocolo de Comunicación IoT - Garantía de entrega",
            "Node-RED: Automatización / Orquestación - Para workflows",
            "Generación de reportes PDF automáticos: Herramienta / Tecnología de Software - Tecnología de software empleada en el desarrollo del proyecto."
        ],
        "habilidades": [
            "Control estadístico de procesos • Sistemas críticos de calidad • Análisis de tendencias • Generación de reportes regulatorios • Alta disponibilidad de datos PROYECTOS DE IoT CON VISIÓN ARTIFICIAL PROYECTOS DE IoT CON VISIÓN ARTIFICIAL"
        ],
        "objetivos": [
            "🎯 Objetivo General: Desarrollar una plataforma de monitoreo y análisis de procesos farmacéuticos que implemente control estadístico de calidad y genere reportes de cumplimiento regulatorio automáticamente.",
            "📌 Objetivos Específicos:",
            "• Implementar sensores de temperatura, humedad, presión y vibración en equipos críticos de manufactura farmacéutica.",
            "• Desarrollar algoritmos de Control Estadístico de Procesos (SPC) que detecten desviaciones de especificaciones.",
            "• Automatizar generación de reportes de validación y batch records conforme a normativas FDA/GMP."
        ],
        "pasos": [
            "Análisis de requisitos",
            "Diseño de la solución",
            "Implementación y pruebas",
            "Validación y sustentación"
        ],
        "aplicaciones": [
            "Industria farmacéutica"
        ],
        "referencias": [],
        "hardware_tabla": [
            {
                "componente": "Raspberry Pi 4",
                "categoria": "Computadora de Placa Reducida (SBC)",
                "funcion": "Redundancia (2 unidades)"
            },
            {
                "componente": "ESP32",
                "categoria": "Microcontrolador",
                "funcion": "Diferentes puntos de proceso (4 unidades)"
            },
            {
                "componente": "DHT22",
                "categoria": "Sensor Ambiental",
                "funcion": "Temperatura/humedad"
            },
            {
                "componente": "BMP280",
                "categoria": "Sensor Ambiental",
                "funcion": "Presión"
            },
            {
                "componente": "MPU6050",
                "categoria": "Sensor de Movimiento / Posición",
                "funcion": "Vibración de equipos"
            },
            {
                "componente": "Sensores de flujo",
                "categoria": "Otro Componente de Hardware",
                "funcion": "Forma parte del hardware de soporte del proyecto."
            },
            {
                "componente": "Display TFT",
                "categoria": "Interfaz de Usuario / Iluminación",
                "funcion": "Para HMI local"
            }
        ],
        "software_tabla": [
            {
                "herramienta": "InfluxDB",
                "tipo": "Base de Datos",
                "descripcion": "Para almacenamiento"
            },
            {
                "herramienta": "Grafana con alertas configurables",
                "tipo": "Visualización / Dashboard",
                "descripcion": "Presenta los datos del sistema en paneles visuales."
            },
            {
                "herramienta": "Python para cálculos estadísticos",
                "tipo": "Lenguaje de Programación",
                "descripcion": "SPC; Statistical Process Control"
            },
            {
                "herramienta": "Pandas y SciPy",
                "tipo": "Librería / Herramienta de Análisis de Datos",
                "descripcion": "Se utiliza para el procesamiento y análisis de los datos recolectados."
            },
            {
                "herramienta": "MQTT con QoS 2",
                "tipo": "Protocolo de Comunicación IoT",
                "descripcion": "Garantía de entrega"
            },
            {
                "herramienta": "Node-RED",
                "tipo": "Automatización / Orquestación",
                "descripcion": "Para workflows"
            },
            {
                "herramienta": "Generación de reportes PDF automáticos",
                "tipo": "Herramienta / Tecnología de Software",
                "descripcion": "Tecnología de software empleada en el desarrollo del proyecto."
            }
        ]
    },
    {
        "id": "proj_017",
        "titulo": "🌱 Proyecto 17: Sistema de Monitoreo de Crecimiento de Cultivos",
        "descripcion": "Problema: La detección tardía de enfermedades y plagas en cultivos genera pérdidas significativas, mientras que inspecciones manuales son intensivas en tiempo y requieren expertise especializado.\n\nDescripción: Cámara time-lapse inteligente que captura imágenes periódicas de cultivos, detecta fases de crecimiento, identifica plagas o enfermedades mediante análisis de color y textura, y genera alertas tempranas.",
        "area": "IoT con Visión Artificial + AIoT",
        "sector": "Agricultura de precisión y agricultura inteligente",
        "nivel": "Avanzado",
        "duracion": "Un semestre",
        "presupuesto": "Bajo costo",
        "hardware": [
            "Raspberry Pi 4 (Computadora de Placa Reducida (SBC) | Actúa como unidad de procesamiento central o gateway del sistema.)",
            "Cámara Raspberry Pi HQ o v2 (Cámara / Sensor de Visión | Captura imágenes o video para el módulo de visión artificial.)",
            "Iluminación LED controlada (Interfaz de Usuario / Iluminación | Espectro completo)",
            "DHT22 (Sensor Ambiental | Contexto ambiental)",
            "Relé (Actuador | Para control de iluminación)",
            "Panel solar pequeño + batería (Fuente de Alimentación / Energía | Opcional para campo)",
            "Carcasa impermeable (Estructura / Componente Mecánico | Brinda soporte físico o estructural al prototipo.)"
        ],
        "software": [
            "OpenCV: Inteligencia Artificial / Machine Learning - Para procesamiento",
            "Python con PIL/Pillow: Lenguaje de Programación - Lenguaje utilizado para desarrollar la lógica del sistema.",
            "Scikit-image: Librería / Herramienta de Análisis de Datos - Para análisis de texturas",
            "TensorFlow Lite: Inteligencia Artificial / Machine Learning - Modelo de clasificación de enfermedades",
            "MQTT: Protocolo de Comunicación IoT - Para alertas",
            "FFmpeg: Herramienta / Tecnología de Software - Para generar videos time-lapse",
            "ThingSpeak: Plataforma / Servicio Cloud IoT - Para almacenar métricas"
        ],
        "habilidades": [
            "Análisis de imágenes agrícolas",
            "Detección de patrones visuales",
            "Transfer learning aplicado",
            "Sistemas autónomos de campo",
            "Procesamiento de imágenes en lote"
        ],
        "objetivos": [
            "🎯 Objetivo General: Implementar un sistema de monitoreo de cultivos basado en visión artificial que detecte fases de crecimiento, enfermedades y plagas mediante análisis automatizado de imágenes.",
            "📌 Objetivos Específicos:",
            "• Desarrollar sistema de captura time-lapse con iluminación controlada y almacenamiento de imágenes periódicas.",
            "• Entrenar modelos de clasificación de enfermedades vegetales usando transfer learning con dataset PlantVillage.",
            "• Implementar sistema de alertas tempranas que notifique agricultores ante detección de patologías en cultivos."
        ],
        "pasos": [
            "Análisis de requisitos",
            "Diseño de la solución",
            "Implementación y pruebas",
            "Validación y sustentación"
        ],
        "aplicaciones": [
            "Agricultura de precisión y agricultura inteligente"
        ],
        "referencias": [],
        "hardware_tabla": [
            {
                "componente": "Raspberry Pi 4",
                "categoria": "Computadora de Placa Reducida (SBC)",
                "funcion": "Actúa como unidad de procesamiento central o gateway del sistema."
            },
            {
                "componente": "Cámara Raspberry Pi HQ o v2",
                "categoria": "Cámara / Sensor de Visión",
                "funcion": "Captura imágenes o video para el módulo de visión artificial."
            },
            {
                "componente": "Iluminación LED controlada",
                "categoria": "Interfaz de Usuario / Iluminación",
                "funcion": "Espectro completo"
            },
            {
                "componente": "DHT22",
                "categoria": "Sensor Ambiental",
                "funcion": "Contexto ambiental"
            },
            {
                "componente": "Relé",
                "categoria": "Actuador",
                "funcion": "Para control de iluminación"
            },
            {
                "componente": "Panel solar pequeño + batería",
                "categoria": "Fuente de Alimentación / Energía",
                "funcion": "Opcional para campo"
            },
            {
                "componente": "Carcasa impermeable",
                "categoria": "Estructura / Componente Mecánico",
                "funcion": "Brinda soporte físico o estructural al prototipo."
            }
        ],
        "software_tabla": [
            {
                "herramienta": "OpenCV",
                "tipo": "Inteligencia Artificial / Machine Learning",
                "descripcion": "Para procesamiento"
            },
            {
                "herramienta": "Python con PIL/Pillow",
                "tipo": "Lenguaje de Programación",
                "descripcion": "Lenguaje utilizado para desarrollar la lógica del sistema."
            },
            {
                "herramienta": "Scikit-image",
                "tipo": "Librería / Herramienta de Análisis de Datos",
                "descripcion": "Para análisis de texturas"
            },
            {
                "herramienta": "TensorFlow Lite",
                "tipo": "Inteligencia Artificial / Machine Learning",
                "descripcion": "Modelo de clasificación de enfermedades"
            },
            {
                "herramienta": "MQTT",
                "tipo": "Protocolo de Comunicación IoT",
                "descripcion": "Para alertas"
            },
            {
                "herramienta": "FFmpeg",
                "tipo": "Herramienta / Tecnología de Software",
                "descripcion": "Para generar videos time-lapse"
            },
            {
                "herramienta": "ThingSpeak",
                "tipo": "Plataforma / Servicio Cloud IoT",
                "descripcion": "Para almacenar métricas"
            }
        ]
    },
    {
        "id": "proj_018",
        "titulo": "🅿️ Proyecto 18: Control de Ocupación de Estacionamiento con Visión",
        "descripcion": "Problema: Los conductores pierden tiempo buscando espacios de estacionamiento disponibles, generando congestión, frustración y emisiones innecesarias en áreas urbanas.\n\nDescripción: Sistema de visión que detecta espacios de estacionamiento ocupados/libres mediante análisis de imágenes, actualiza en tiempo real disponibilidad en app/pantalla y genera estadísticas de uso.",
        "area": "IoT con Visión Artificial",
        "sector": "Parqueaderos y estacionamientos inteligentes",
        "nivel": "Intermedio",
        "duracion": "Un semestre",
        "presupuesto": "Bajo costo",
        "hardware": [
            "Raspberry Pi 4 (Computadora de Placa Reducida (SBC) | Actúa como unidad de procesamiento central o gateway del sistema.)",
            "Cámara Raspberry Pi Wide Angle o USB (Cámara / Sensor de Visión | Captura imágenes o video para el módulo de visión artificial.)",
            "ESP32 con display OLED (Microcontrolador | Señalización de espacios)",
            "LEDs RGB (Interfaz de Usuario / Iluminación | Indicadores por espacio)",
            "Arduino Nano (Microcontrolador | Para control de LEDs)",
            "Sensor ultrasónico HC-SR04 (Sensor de Movimiento / Posición | Validación)"
        ],
        "software": [
            "OpenCV con background subtraction: Inteligencia Artificial / Machine Learning - Procesa datos mediante modelos de IA/ML para generar predicciones o clasificaciones.",
            "Python: Lenguaje de Programación - Lenguaje utilizado para desarrollar la lógica del sistema.",
            "Algoritmos de detección de contornos: Inteligencia Artificial / Machine Learning - Procesa datos mediante modelos de IA/ML para generar predicciones o clasificaciones.",
            "MQTT: Protocolo de Comunicación IoT - Para comunicación",
            "Node-RED: Automatización / Orquestación - Para lógica",
            "SQLite: Base de Datos - Para históricos",
            "API REST con Flask: Framework Web / Aplicación - Para consultas",
            "Dashboard web simple: Visualización / Dashboard - HTML/CSS/JS"
        ],
        "habilidades": [
            "Detección de objetos estáticos",
            "Segmentación de imágenes",
            "Sistemas de notificación en tiempo real",
            "Desarrollo de APIs REST",
            "Integración hardware-software"
        ],
        "objetivos": [
            "🎯 Objetivo General: Desarrollar un sistema de gestión de estacionamientos que detecte espacios ocupados/libres mediante visión artificial y proporcione información en tiempo real a usuarios.",
            "📌 Objetivos Específicos:",
            "• Implementar algoritmos de detección de objetos estáticos con background subtraction para identificación de vehículos.",
            "• Desarrollar API REST que proporcione disponibilidad en tiempo real para integración con apps móviles.",
            "• Crear dashboard de estadísticas de uso que analice patrones de ocupación para optimización tarifaria."
        ],
        "pasos": [
            "Análisis de requisitos",
            "Diseño de la solución",
            "Implementación y pruebas",
            "Validación y sustentación"
        ],
        "aplicaciones": [
            "Parqueaderos y estacionamientos inteligentes"
        ],
        "referencias": [],
        "hardware_tabla": [
            {
                "componente": "Raspberry Pi 4",
                "categoria": "Computadora de Placa Reducida (SBC)",
                "funcion": "Actúa como unidad de procesamiento central o gateway del sistema."
            },
            {
                "componente": "Cámara Raspberry Pi Wide Angle o USB",
                "categoria": "Cámara / Sensor de Visión",
                "funcion": "Captura imágenes o video para el módulo de visión artificial."
            },
            {
                "componente": "ESP32 con display OLED",
                "categoria": "Microcontrolador",
                "funcion": "Señalización de espacios"
            },
            {
                "componente": "LEDs RGB",
                "categoria": "Interfaz de Usuario / Iluminación",
                "funcion": "Indicadores por espacio"
            },
            {
                "componente": "Arduino Nano",
                "categoria": "Microcontrolador",
                "funcion": "Para control de LEDs"
            },
            {
                "componente": "Sensor ultrasónico HC-SR04",
                "categoria": "Sensor de Movimiento / Posición",
                "funcion": "Validación"
            }
        ],
        "software_tabla": [
            {
                "herramienta": "OpenCV con background subtraction",
                "tipo": "Inteligencia Artificial / Machine Learning",
                "descripcion": "Procesa datos mediante modelos de IA/ML para generar predicciones o clasificaciones."
            },
            {
                "herramienta": "Python",
                "tipo": "Lenguaje de Programación",
                "descripcion": "Lenguaje utilizado para desarrollar la lógica del sistema."
            },
            {
                "herramienta": "Algoritmos de detección de contornos",
                "tipo": "Inteligencia Artificial / Machine Learning",
                "descripcion": "Procesa datos mediante modelos de IA/ML para generar predicciones o clasificaciones."
            },
            {
                "herramienta": "MQTT",
                "tipo": "Protocolo de Comunicación IoT",
                "descripcion": "Para comunicación"
            },
            {
                "herramienta": "Node-RED",
                "tipo": "Automatización / Orquestación",
                "descripcion": "Para lógica"
            },
            {
                "herramienta": "SQLite",
                "tipo": "Base de Datos",
                "descripcion": "Para históricos"
            },
            {
                "herramienta": "API REST con Flask",
                "tipo": "Framework Web / Aplicación",
                "descripcion": "Para consultas"
            },
            {
                "herramienta": "Dashboard web simple",
                "tipo": "Visualización / Dashboard",
                "descripcion": "HTML/CSS/JS"
            }
        ]
    },
    {
        "id": "proj_019",
        "titulo": "⛑️ Proyecto 19: Monitor de Uso de EPP en Zona Industrial",
        "descripcion": "Problema: El incumplimiento de normas de seguridad industrial por no uso de EPP causa accidentes laborales graves, pero la supervisión manual es inconsistente e insuficiente.\n\nDescripción: Sistema de vigilancia que verifica uso correcto de equipo de protección personal (casco, gafas, guantes) en zonas industriales, genera alertas de incumplimiento y registra estadísticas de seguridad.",
        "area": "IoT con Visión Artificial + AIoT",
        "sector": "Automatización industrial (Industria 4.0)",
        "nivel": "Avanzado",
        "duracion": "Un semestre",
        "presupuesto": "Bajo costo",
        "hardware": [
            "Raspberry Pi 4 (Computadora de Placa Reducida (SBC) | Actúa como unidad de procesamiento central o gateway del sistema (4GB RAM mínimo).)",
            "Cámara Raspberry Pi v2 o USB HD (Cámara / Sensor de Visión | Captura imágenes o video para el módulo de visión artificial.)",
            "Sensor PIR (Sensor de Movimiento / Posición | Para activación)",
            "Buzzer (Interfaz de Usuario / Iluminación | Para alertas sonoras)",
            "Display LCD (Interfaz de Usuario / Iluminación | Para mensajes)",
            "ESP32 (Microcontrolador | Módulo de alertas remotas)",
            "Luces LED indicadoras (Interfaz de Usuario / Iluminación | Permite la interacción, iluminación o notificación visual/sonora del sistema.)"
        ],
        "software": [
            "TensorFlow Lite: Inteligencia Artificial / Machine Learning - Procesa datos mediante modelos de IA/ML para generar predicciones o clasificaciones.",
            "Modelo YOLO: Inteligencia Artificial / Machine Learning - Versión lite; o MobileNet-SSD",
            "OpenCV: Inteligencia Artificial / Machine Learning - Procesa datos mediante modelos de IA/ML para generar predicciones o clasificaciones.",
            "Python: Lenguaje de Programación - Lenguaje utilizado para desarrollar la lógica del sistema.",
            "COCO o personalizado: Herramienta / Tecnología de Software - Dataset pre-entrenado",
            "MQTT: Protocolo de Comunicación IoT - Para alertas",
            "SQLite: Base de Datos - Para registro de eventos",
            "Grafana: Visualización / Dashboard - Para dashboard de seguridad"
        ],
        "habilidades": [
            "Object detection en tiempo real",
            "Implementación de YOLO/SSD",
            "Sistemas de seguridad industrial",
            "Fine-tuning de modelos",
            "Procesamiento de video en streaming"
        ],
        "objetivos": [
            "🎯 Objetivo General: Implementar un sistema de vigilancia inteligente que verifique automáticamente el uso correcto de equipo de protección personal en zonas industriales de alto riesgo.",
            "📌 Objetivos Específicos:",
            "• Entrenar modelo YOLO para detección de EPP (cascos, gafas, guantes, chalecos) con dataset industrial.",
            "• Desarrollar sistema de alertas graduales que notifique a supervisores ante detección de incumplimientos.",
            "• Generar reportes estadísticos de cumplimiento de seguridad por área, turno y trabajador para auditorías."
        ],
        "pasos": [
            "Análisis de requisitos",
            "Diseño de la solución",
            "Implementación y pruebas",
            "Validación y sustentación"
        ],
        "aplicaciones": [
            "Automatización industrial (Industria 4.0)"
        ],
        "referencias": [],
        "hardware_tabla": [
            {
                "componente": "Raspberry Pi 4",
                "categoria": "Computadora de Placa Reducida (SBC)",
                "funcion": "Actúa como unidad de procesamiento central o gateway del sistema (4GB RAM mínimo)."
            },
            {
                "componente": "Cámara Raspberry Pi v2 o USB HD",
                "categoria": "Cámara / Sensor de Visión",
                "funcion": "Captura imágenes o video para el módulo de visión artificial."
            },
            {
                "componente": "Sensor PIR",
                "categoria": "Sensor de Movimiento / Posición",
                "funcion": "Para activación"
            },
            {
                "componente": "Buzzer",
                "categoria": "Interfaz de Usuario / Iluminación",
                "funcion": "Para alertas sonoras"
            },
            {
                "componente": "Display LCD",
                "categoria": "Interfaz de Usuario / Iluminación",
                "funcion": "Para mensajes"
            },
            {
                "componente": "ESP32",
                "categoria": "Microcontrolador",
                "funcion": "Módulo de alertas remotas"
            },
            {
                "componente": "Luces LED indicadoras",
                "categoria": "Interfaz de Usuario / Iluminación",
                "funcion": "Permite la interacción, iluminación o notificación visual/sonora del sistema."
            }
        ],
        "software_tabla": [
            {
                "herramienta": "TensorFlow Lite",
                "tipo": "Inteligencia Artificial / Machine Learning",
                "descripcion": "Procesa datos mediante modelos de IA/ML para generar predicciones o clasificaciones."
            },
            {
                "herramienta": "Modelo YOLO",
                "tipo": "Inteligencia Artificial / Machine Learning",
                "descripcion": "Versión lite; o MobileNet-SSD"
            },
            {
                "herramienta": "OpenCV",
                "tipo": "Inteligencia Artificial / Machine Learning",
                "descripcion": "Procesa datos mediante modelos de IA/ML para generar predicciones o clasificaciones."
            },
            {
                "herramienta": "Python",
                "tipo": "Lenguaje de Programación",
                "descripcion": "Lenguaje utilizado para desarrollar la lógica del sistema."
            },
            {
                "herramienta": "COCO o personalizado",
                "tipo": "Herramienta / Tecnología de Software",
                "descripcion": "Dataset pre-entrenado"
            },
            {
                "herramienta": "MQTT",
                "tipo": "Protocolo de Comunicación IoT",
                "descripcion": "Para alertas"
            },
            {
                "herramienta": "SQLite",
                "tipo": "Base de Datos",
                "descripcion": "Para registro de eventos"
            },
            {
                "herramienta": "Grafana",
                "tipo": "Visualización / Dashboard",
                "descripcion": "Para dashboard de seguridad"
            }
        ]
    },
    {
        "id": "proj_020",
        "titulo": "📊 Proyecto 20: Sistema de Lectura Automática de Medidores",
        "descripcion": "Problema: La lectura manual de medidores es costosa, propensa a errores de transcripción y requiere acceso físico, limitando frecuencia de facturación y detección de fugas o consumos anormales.\n\nDescripción: Lector automático de medidores analógicos (agua, gas, electricidad) usando OCR y visión artificial, que captura lecturas periódicamente, las digitaliza y envía a plataforma central para facturación y detección de anomalías.",
        "area": "IoT con Visión Artificial + AIoT",
        "sector": "Infraestructuras energéticas y redes eléctricas inteligentes",
        "nivel": "Avanzado",
        "duracion": "Un semestre",
        "presupuesto": "Bajo costo",
        "hardware": [
            "Raspberry Pi 4 (Computadora de Placa Reducida (SBC) | Actúa como unidad de procesamiento central o gateway del sistema.)",
            "Cámara Raspberry Pi con lente macro o ajustable (Cámara / Sensor de Visión | Captura imágenes o video para el módulo de visión artificial.)",
            "Iluminación LED (Interfaz de Usuario / Iluminación | Para lectura nocturna)",
            "ESP32 (Microcontrolador | Nodo de comunicación)",
            "Sensor de proximidad (Sensor de Movimiento / Posición | Activación al acercarse)",
            "Carcasa protectora (Estructura / Componente Mecánico | Brinda soporte físico o estructural al prototipo.)",
            "Batería de respaldo (Fuente de Alimentación / Energía | Suministra energía eléctrica a los componentes del sistema.)"
        ],
        "software": [
            "OpenCV: Inteligencia Artificial / Machine Learning - Para pre-procesamiento",
            "Tesseract OCR: Herramienta / Tecnología de Software - Tecnología de software empleada en el desarrollo del proyecto.",
            "Python con pytesseract: Lenguaje de Programación - Lenguaje utilizado para desarrollar la lógica del sistema.",
            "PIL/Pillow: Herramienta / Tecnología de Software - Para manipulación de imágenes",
            "Algoritmos de detección de dígitos: Inteligencia Artificial / Machine Learning - Template matching",
            "MQTT: Protocolo de Comunicación IoT - Para transmisión de lecturas",
            "PostgreSQL: Base de Datos - Para almacenamiento",
            "Grafana: Visualización / Dashboard - Para visualización de consumos"
        ],
        "habilidades": [
            "OCR aplicado • Pre-procesamiento de imágenes • Reconocimiento de patrones numéricos • Digitalización de sistemas legacy • Validación y corrección de errores de lectura NOTAS FINALES Consideraciones Importantes • Todos los proyectos utilizan exclusivamente software libre y de código abierto • El hardware recomendado está optimizado para bajo costo y disponibilidad • Los proyectos pueden adaptarse según disponibilidad de componentes locales • Se recomienda formar equipos de 2-3 estudiantes por proyecto • Cada proyecto debe incluir documentación técnica completa • Los estudiantes deben considerar aspectos de seguridad en todos los proyectos • Es importante realizar pruebas exhaustivas antes de implementación final Evaluación Sugerida Se sugiere evaluar los proyectos considerando: • Funcionalidad del sistema (40%) • Calidad del código y documentación (25%) • Innovación y creatividad en la solución (15%) • Presentación y demostración final (20%) Recursos Adicionales Para tutoriales, códigos de ejemplo y recursos adicionales, se recomienda consultar: • Documentación oficial de Raspberry Pi Foundation • Comunidades de Arduino y ESP32 • Repositorios GitHub con proyectos IoT open source • Foros especializados como Stack Overflow y Reddit (r/IoT) • Cursos gratuitos en plataformas como Coursera y edX PROYECTOS DE NEUROLOGÍA Y NEUROTECNOLOGÍA PROYECTOS DE NEUROLOGÍA Y NEUROTECNOLOGÍA"
        ],
        "objetivos": [
            "🎯 Objetivo General: Desarrollar un sistema de lectura automática de medidores analógicos mediante OCR y visión artificial que digitalice lecturas para facturación y detección de anomalías.",
            "📌 Objetivos Específicos:",
            "• Implementar pre-procesamiento de imágenes (binarización, corrección perspectiva) para optimizar reconocimiento OCR.",
            "• Desarrollar algoritmo de validación que compare lecturas consecutivas y detecte inconsistencias o errores de OCR.",
            "• Crear sistema de alertas de consumo anormal que identifique posibles fugas o fraudes mediante análisis de patrones."
        ],
        "pasos": [
            "Análisis de requisitos",
            "Diseño de la solución",
            "Implementación y pruebas",
            "Validación y sustentación"
        ],
        "aplicaciones": [
            "Infraestructuras energéticas y redes eléctricas inteligentes"
        ],
        "referencias": [],
        "hardware_tabla": [
            {
                "componente": "Raspberry Pi 4",
                "categoria": "Computadora de Placa Reducida (SBC)",
                "funcion": "Actúa como unidad de procesamiento central o gateway del sistema."
            },
            {
                "componente": "Cámara Raspberry Pi con lente macro o ajustable",
                "categoria": "Cámara / Sensor de Visión",
                "funcion": "Captura imágenes o video para el módulo de visión artificial."
            },
            {
                "componente": "Iluminación LED",
                "categoria": "Interfaz de Usuario / Iluminación",
                "funcion": "Para lectura nocturna"
            },
            {
                "componente": "ESP32",
                "categoria": "Microcontrolador",
                "funcion": "Nodo de comunicación"
            },
            {
                "componente": "Sensor de proximidad",
                "categoria": "Sensor de Movimiento / Posición",
                "funcion": "Activación al acercarse"
            },
            {
                "componente": "Carcasa protectora",
                "categoria": "Estructura / Componente Mecánico",
                "funcion": "Brinda soporte físico o estructural al prototipo."
            },
            {
                "componente": "Batería de respaldo",
                "categoria": "Fuente de Alimentación / Energía",
                "funcion": "Suministra energía eléctrica a los componentes del sistema."
            }
        ],
        "software_tabla": [
            {
                "herramienta": "OpenCV",
                "tipo": "Inteligencia Artificial / Machine Learning",
                "descripcion": "Para pre-procesamiento"
            },
            {
                "herramienta": "Tesseract OCR",
                "tipo": "Herramienta / Tecnología de Software",
                "descripcion": "Tecnología de software empleada en el desarrollo del proyecto."
            },
            {
                "herramienta": "Python con pytesseract",
                "tipo": "Lenguaje de Programación",
                "descripcion": "Lenguaje utilizado para desarrollar la lógica del sistema."
            },
            {
                "herramienta": "PIL/Pillow",
                "tipo": "Herramienta / Tecnología de Software",
                "descripcion": "Para manipulación de imágenes"
            },
            {
                "herramienta": "Algoritmos de detección de dígitos",
                "tipo": "Inteligencia Artificial / Machine Learning",
                "descripcion": "Template matching"
            },
            {
                "herramienta": "MQTT",
                "tipo": "Protocolo de Comunicación IoT",
                "descripcion": "Para transmisión de lecturas"
            },
            {
                "herramienta": "PostgreSQL",
                "tipo": "Base de Datos",
                "descripcion": "Para almacenamiento"
            },
            {
                "herramienta": "Grafana",
                "tipo": "Visualización / Dashboard",
                "descripcion": "Para visualización de consumos"
            }
        ]
    },
    {
        "id": "proj_021",
        "titulo": "🧠 Proyecto 21: Prototipo SBC-IoT para Detección Temprana de Parkinson",
        "descripcion": "Problema: El diagnóstico de Parkinson ocurre en etapas avanzadas cuando síntomas son evidentes, perdiendo ventana crítica para tratamiento temprano que ralentice la progresión de la enfermedad.\n\nDescripción: Sistema de detección temprana de Parkinson y temblores neuromotores mediante análisis de vibración y patrones motores. Detecta temblores involuntarios, rigidez y alteraciones en el movimiento usando sensores de aceleración y actividad muscular. Objetivo Detectar temblores involuntarios, rigidez y alteraciones en el movimiento mediante análisis de vibración y patrones motores en tiempo real. Condiciones Neurológicas Detectables • Enfermedad de Parkinson • Temblor esencial • Trastornos motores iniciales • Discinesias",
        "area": "SBC-IoT + AIoT",
        "sector": "Salud médica y hospitalaria - Neurología",
        "nivel": "Avanzado",
        "duracion": "Un semestre",
        "presupuesto": "Bajo costo",
        "hardware": [
            "Raspberry Pi 4 (Computadora de Placa Reducida (SBC) | Nodo central de procesamiento)",
            "ESP32 (Microcontrolador | Dispositivo wearable)",
            "Acelerómetro + giroscopio MPU6050 o MPU9250 (Sensor de Movimiento / Posición | Detecta movimiento, orientación o posición dentro del sistema.)",
            "Sensor EMG MyoWare (Sensor Biomédico | Actividad muscular)",
            "Módulo WiFi/LoRa (Módulo de Comunicación / Conectividad | Para monitoreo remoto)",
            "Batería LiPo 3.7V (Fuente de Alimentación / Energía | Para wearable)",
            "Carcasa ergonómica (Estructura / Componente Mecánico | Para muñeca/mano)",
            "LEDs indicadores de estado (Interfaz de Usuario / Iluminación | Permite la interacción, iluminación o notificación visual/sonora del sistema.)"
        ],
        "software": [
            "Python con scikit-learn: Inteligencia Artificial / Machine Learning - Para ML",
            "SVM, Random Forest: Inteligencia Artificial / Machine Learning - Algoritmos",
            "ThingsBoard o Node-RED: Automatización / Orquestación - Para plataforma IoT",
            "InfluxDB: Base de Datos - Para series temporales",
            "Scipy: Librería / Herramienta de Análisis de Datos - Para análisis de señales",
            "MQTT: Protocolo de Comunicación IoT - Para transmisión de datos",
            "Grafana: Visualización / Dashboard - Para visualización médica",
            "TensorFlow Lite: Inteligencia Artificial / Machine Learning - Para clasificación en edge"
        ],
        "habilidades": [
            "Procesamiento de señales biomédicas",
            "Machine Learning aplicado a salud",
            "Diseño de dispositivos wearables",
            "Análisis de patrones de movimiento",
            "Clasificación de estados neuromotores",
            "Desarrollo de sistemas de alerta médica"
        ],
        "objetivos": [
            "🎯 Objetivo General: Desarrollar un dispositivo wearable que detecte tempranamente signos de Parkinson y trastornos motores mediante análisis de movimiento y actividad muscular con machine learning.",
            "📌 Objetivos Específicos:",
            "• Implementar sensores de aceleración (MPU6050) y EMG (MyoWare) en wearable ergonómico para muñeca/mano.",
            "• Desarrollar algoritmos de clasificación (SVM, Random Forest) que distingan temblor de reposo, acción y postural.",
            "• Crear aplicación médica que genere reportes cuantitativos de severidad de síntomas para seguimiento clínico."
        ],
        "pasos": [
            "Análisis de requisitos",
            "Diseño de la solución",
            "Implementación y pruebas",
            "Validación y sustentación"
        ],
        "aplicaciones": [
            "Salud médica y hospitalaria - Neurología"
        ],
        "referencias": [],
        "hardware_tabla": [
            {
                "componente": "Raspberry Pi 4",
                "categoria": "Computadora de Placa Reducida (SBC)",
                "funcion": "Nodo central de procesamiento"
            },
            {
                "componente": "ESP32",
                "categoria": "Microcontrolador",
                "funcion": "Dispositivo wearable"
            },
            {
                "componente": "Acelerómetro + giroscopio MPU6050 o MPU9250",
                "categoria": "Sensor de Movimiento / Posición",
                "funcion": "Detecta movimiento, orientación o posición dentro del sistema."
            },
            {
                "componente": "Sensor EMG MyoWare",
                "categoria": "Sensor Biomédico",
                "funcion": "Actividad muscular"
            },
            {
                "componente": "Módulo WiFi/LoRa",
                "categoria": "Módulo de Comunicación / Conectividad",
                "funcion": "Para monitoreo remoto"
            },
            {
                "componente": "Batería LiPo 3.7V",
                "categoria": "Fuente de Alimentación / Energía",
                "funcion": "Para wearable"
            },
            {
                "componente": "Carcasa ergonómica",
                "categoria": "Estructura / Componente Mecánico",
                "funcion": "Para muñeca/mano"
            },
            {
                "componente": "LEDs indicadores de estado",
                "categoria": "Interfaz de Usuario / Iluminación",
                "funcion": "Permite la interacción, iluminación o notificación visual/sonora del sistema."
            }
        ],
        "software_tabla": [
            {
                "herramienta": "Python con scikit-learn",
                "tipo": "Inteligencia Artificial / Machine Learning",
                "descripcion": "Para ML"
            },
            {
                "herramienta": "SVM, Random Forest",
                "tipo": "Inteligencia Artificial / Machine Learning",
                "descripcion": "Algoritmos"
            },
            {
                "herramienta": "ThingsBoard o Node-RED",
                "tipo": "Automatización / Orquestación",
                "descripcion": "Para plataforma IoT"
            },
            {
                "herramienta": "InfluxDB",
                "tipo": "Base de Datos",
                "descripcion": "Para series temporales"
            },
            {
                "herramienta": "Scipy",
                "tipo": "Librería / Herramienta de Análisis de Datos",
                "descripcion": "Para análisis de señales"
            },
            {
                "herramienta": "MQTT",
                "tipo": "Protocolo de Comunicación IoT",
                "descripcion": "Para transmisión de datos"
            },
            {
                "herramienta": "Grafana",
                "tipo": "Visualización / Dashboard",
                "descripcion": "Para visualización médica"
            },
            {
                "herramienta": "TensorFlow Lite",
                "tipo": "Inteligencia Artificial / Machine Learning",
                "descripcion": "Para clasificación en edge"
            }
        ]
    },
    {
        "id": "proj_022",
        "titulo": "🧠 Proyecto 22: Sistema IoT para Detección de Deterioro Cognitivo Leve y Prevención de Alzheimer",
        "descripcion": "Problema: El deterioro cognitivo leve progresa a demencia sin detección temprana por falta de evaluaciones frecuentes, mientras que pruebas cognitivas formales son costosas y se realizan raramente.\n\nDescripción: Sistema de monitoreo no invasivo que detecta cambios en comportamiento, memoria y patrones de rutina mediante análisis de actividad diaria y patrones conductuales, orientado a detección temprana de deterioro cognitivo. Objetivo Identificar cambios sutiles en rutinas diarias, comportamiento y patrones de actividad que puedan indicar deterioro cognitivo en etapas tempranas. Condiciones Neurológicas Detectables • Alzheimer en etapa temprana • Deterioro Cognitivo Leve (DCL) • Demencia vascular inicial • Desorientación temporal y espacial",
        "area": "SBC-IoT + AIoT",
        "sector": "Salud médica y hospitalaria - Neurología",
        "nivel": "Avanzado",
        "duracion": "Un semestre",
        "presupuesto": "Bajo costo",
        "hardware": [
            "Raspberry Pi 4 (Computadora de Placa Reducida (SBC) | Hub central)",
            "Sensores PIR de movimiento (Sensor de Movimiento / Posición | 4-6 unidades)",
            "Sensores magnéticos de apertura de puertas (Otro Componente de Hardware | 3-4 unidades)",
            "Módulo RTC (Otro Componente de Hardware | Real Time Clock)",
            "Micrófono MEMS (Otro Componente de Hardware | Análisis de patrones de habla)",
            "ESP32 (Microcontrolador | Nodos distribuidos en hogar)",
            "Pulsera wearable opcional (Sensor de Movimiento / Posición | Acelerómetro + pulso)",
            "Display OLED (Interfaz de Usuario / Iluminación | Para recordatorios)"
        ],
        "software": [
            "Python con Pandas: Lenguaje de Programación - Para análisis de patrones",
            "Algoritmo Isolation Forest: Inteligencia Artificial / Machine Learning - Detección de anomalías",
            "MQTT: Protocolo de Comunicación IoT - Para comunicación entre sensores",
            "PostgreSQL: Base de Datos - Para almacenamiento de rutinas",
            "Librería schedule: Librería / Herramienta de Análisis de Datos - Para análisis temporal",
            "Node-RED: Automatización / Orquestación - Para lógica de eventos",
            "API de notificaciones: Herramienta / Tecnología de Software - Telegram/WhatsApp",
            "Dashboard web con React o Vue.js: Visualización / Dashboard - Presenta los datos del sistema en paneles visuales."
        ],
        "habilidades": [
            "Análisis de patrones conductuales",
            "Detección de anomalías temporales",
            "Diseño de sistemas no invasivos",
            "Procesamiento de datos de hábitos",
            "Machine learning para salud mental",
            "Interfaces de cuidado asistido"
        ],
        "objetivos": [
            "🎯 Objetivo General: Implementar un sistema de monitoreo no invasivo que detecte cambios en patrones de comportamiento y rutinas diarias indicativos de deterioro cognitivo temprano.",
            "📌 Objetivos Específicos:",
            "• Desplegar red de sensores PIR, magnéticos y temporales que capturen rutinas de actividad sin cámaras.",
            "• Desarrollar algoritmos de detección de anomalías que identifiquen desviaciones de patrones de comportamiento establecidos.",
            "• Crear dashboard para familiares/cuidadores con alertas de cambios significativos en comportamiento del paciente."
        ],
        "pasos": [
            "Análisis de requisitos",
            "Diseño de la solución",
            "Implementación y pruebas",
            "Validación y sustentación"
        ],
        "aplicaciones": [
            "Salud médica y hospitalaria - Neurología"
        ],
        "referencias": [],
        "hardware_tabla": [
            {
                "componente": "Raspberry Pi 4",
                "categoria": "Computadora de Placa Reducida (SBC)",
                "funcion": "Hub central"
            },
            {
                "componente": "Sensores PIR de movimiento",
                "categoria": "Sensor de Movimiento / Posición",
                "funcion": "4-6 unidades"
            },
            {
                "componente": "Sensores magnéticos de apertura de puertas",
                "categoria": "Otro Componente de Hardware",
                "funcion": "3-4 unidades"
            },
            {
                "componente": "Módulo RTC",
                "categoria": "Otro Componente de Hardware",
                "funcion": "Real Time Clock"
            },
            {
                "componente": "Micrófono MEMS",
                "categoria": "Otro Componente de Hardware",
                "funcion": "Análisis de patrones de habla"
            },
            {
                "componente": "ESP32",
                "categoria": "Microcontrolador",
                "funcion": "Nodos distribuidos en hogar"
            },
            {
                "componente": "Pulsera wearable opcional",
                "categoria": "Sensor de Movimiento / Posición",
                "funcion": "Acelerómetro + pulso"
            },
            {
                "componente": "Display OLED",
                "categoria": "Interfaz de Usuario / Iluminación",
                "funcion": "Para recordatorios"
            }
        ],
        "software_tabla": [
            {
                "herramienta": "Python con Pandas",
                "tipo": "Lenguaje de Programación",
                "descripcion": "Para análisis de patrones"
            },
            {
                "herramienta": "Algoritmo Isolation Forest",
                "tipo": "Inteligencia Artificial / Machine Learning",
                "descripcion": "Detección de anomalías"
            },
            {
                "herramienta": "MQTT",
                "tipo": "Protocolo de Comunicación IoT",
                "descripcion": "Para comunicación entre sensores"
            },
            {
                "herramienta": "PostgreSQL",
                "tipo": "Base de Datos",
                "descripcion": "Para almacenamiento de rutinas"
            },
            {
                "herramienta": "Librería schedule",
                "tipo": "Librería / Herramienta de Análisis de Datos",
                "descripcion": "Para análisis temporal"
            },
            {
                "herramienta": "Node-RED",
                "tipo": "Automatización / Orquestación",
                "descripcion": "Para lógica de eventos"
            },
            {
                "herramienta": "API de notificaciones",
                "tipo": "Herramienta / Tecnología de Software",
                "descripcion": "Telegram/WhatsApp"
            },
            {
                "herramienta": "Dashboard web con React o Vue.js",
                "tipo": "Visualización / Dashboard",
                "descripcion": "Presenta los datos del sistema en paneles visuales."
            }
        ]
    },
    {
        "id": "proj_023",
        "titulo": "🧘 Proyecto 23: Monitor IoT de Estrés Neurológico, Ansiedad y TDAH",
        "descripcion": "Problema: Los trastornos de atención y ansiedad se diagnostican subjetivamente mediante cuestionarios, careciendo de métricas objetivas fisiológicas para diagnóstico preciso y seguimiento de tratamiento.\n\nDescripción: Sistema de monitoreo neurofisiológico que identifica alteraciones relacionadas con atención, estrés y ansiedad mediante sensores de respuesta galvánica, variabilidad cardíaca y opcionalmente señales EEG básicas. Objetivo Identificar alteraciones neurofisiológicas relacionadas con atención, estrés crónico y estados de ansiedad para intervención temprana. Condiciones Neurológicas Detectables • Trastorno por Déficit de Atención e Hiperactividad (TDAH) • Estrés crónico • Trastornos de ansiedad generalizada • Estados de hiperactivación neurológica",
        "area": "SBC-IoT + AIoT",
        "sector": "Salud médica y hospitalaria - Neurología",
        "nivel": "Avanzado",
        "duracion": "Un semestre",
        "presupuesto": "Bajo costo",
        "hardware": [
            "Raspberry Pi 4 (Computadora de Placa Reducida (SBC) | Actúa como unidad de procesamiento central o gateway del sistema.)",
            "Sensor GSR (Sensor Biomédico | Galvanic Skin Response)",
            "Pulsioxímetro MAX30102 (Sensor Biomédico | Frecuencia cardíaca y SpO2)",
            "ESP32 (Microcontrolador | Usado como módulo wearable)",
            "EEG básico OpenBCI o Muse (Sensor Biomédico | Opcional)",
            "Sensor de temperatura corporal (Sensor Ambiental | Mide variables ambientales relevantes para el sistema.)",
            "Electrodos reutilizables (Sensor Biomédico | Registra señales fisiológicas del usuario para su monitoreo.)",
            "Batería recargable (Fuente de Alimentación / Energía | Suministra energía eléctrica a los componentes del sistema.)",
            "Carcasa wearable tipo pulsera (Estructura / Componente Mecánico | Brinda soporte físico o estructural al prototipo.)"
        ],
        "software": [
            "Python con SciPy: Lenguaje de Programación - Para procesamiento de señales",
            "TensorFlow Lite: Inteligencia Artificial / Machine Learning - Para clasificación de estados",
            "Redes neuronales ligeras: Herramienta / Tecnología de Software - LSTM",
            "HeartPy: Librería / Herramienta de Análisis de Datos - Para análisis HRV",
            "MQTT: Protocolo de Comunicación IoT - Para transmisión continua",
            "InfluxDB: Base de Datos - Para series temporales",
            "Grafana: Visualización / Dashboard - Para visualización de estados",
            "API REST con Flask: Framework Web / Aplicación - Provee la interfaz web o móvil del sistema."
        ],
        "habilidades": [
            "Procesamiento de señales fisiológicas",
            "Análisis de variabilidad cardíaca",
            "Clasificación de estados mentales",
            "Deep learning para biosseñales",
            "Diseño de wearables médicos",
            "Sistemas de biofeedback"
        ],
        "objetivos": [
            "🎯 Objetivo General: Desarrollar un sistema de monitoreo neurofisiológico que cuantifique objetivamente niveles de estrés, ansiedad y atención mediante análisis de señales biológicas.",
            "📌 Objetivos Específicos:",
            "• Implementar sensores de respuesta galvánica, variabilidad cardíaca y opcionalmente EEG en dispositivo wearable.",
            "• Desarrollar algoritmos de clasificación de estados mentales (atención, distracción, estrés, calma) con redes neuronales.",
            "• Crear aplicación de biofeedback que entrene usuarios a autorregular estados de atención y ansiedad."
        ],
        "pasos": [
            "Análisis de requisitos",
            "Diseño de la solución",
            "Implementación y pruebas",
            "Validación y sustentación"
        ],
        "aplicaciones": [
            "Salud médica y hospitalaria - Neurología"
        ],
        "referencias": [],
        "hardware_tabla": [
            {
                "componente": "Raspberry Pi 4",
                "categoria": "Computadora de Placa Reducida (SBC)",
                "funcion": "Actúa como unidad de procesamiento central o gateway del sistema."
            },
            {
                "componente": "Sensor GSR",
                "categoria": "Sensor Biomédico",
                "funcion": "Galvanic Skin Response"
            },
            {
                "componente": "Pulsioxímetro MAX30102",
                "categoria": "Sensor Biomédico",
                "funcion": "Frecuencia cardíaca y SpO2"
            },
            {
                "componente": "ESP32",
                "categoria": "Microcontrolador",
                "funcion": "Usado como módulo wearable"
            },
            {
                "componente": "EEG básico OpenBCI o Muse",
                "categoria": "Sensor Biomédico",
                "funcion": "Opcional"
            },
            {
                "componente": "Sensor de temperatura corporal",
                "categoria": "Sensor Ambiental",
                "funcion": "Mide variables ambientales relevantes para el sistema."
            },
            {
                "componente": "Electrodos reutilizables",
                "categoria": "Sensor Biomédico",
                "funcion": "Registra señales fisiológicas del usuario para su monitoreo."
            },
            {
                "componente": "Batería recargable",
                "categoria": "Fuente de Alimentación / Energía",
                "funcion": "Suministra energía eléctrica a los componentes del sistema."
            },
            {
                "componente": "Carcasa wearable tipo pulsera",
                "categoria": "Estructura / Componente Mecánico",
                "funcion": "Brinda soporte físico o estructural al prototipo."
            }
        ],
        "software_tabla": [
            {
                "herramienta": "Python con SciPy",
                "tipo": "Lenguaje de Programación",
                "descripcion": "Para procesamiento de señales"
            },
            {
                "herramienta": "TensorFlow Lite",
                "tipo": "Inteligencia Artificial / Machine Learning",
                "descripcion": "Para clasificación de estados"
            },
            {
                "herramienta": "Redes neuronales ligeras",
                "tipo": "Herramienta / Tecnología de Software",
                "descripcion": "LSTM"
            },
            {
                "herramienta": "HeartPy",
                "tipo": "Librería / Herramienta de Análisis de Datos",
                "descripcion": "Para análisis HRV"
            },
            {
                "herramienta": "MQTT",
                "tipo": "Protocolo de Comunicación IoT",
                "descripcion": "Para transmisión continua"
            },
            {
                "herramienta": "InfluxDB",
                "tipo": "Base de Datos",
                "descripcion": "Para series temporales"
            },
            {
                "herramienta": "Grafana",
                "tipo": "Visualización / Dashboard",
                "descripcion": "Para visualización de estados"
            },
            {
                "herramienta": "API REST con Flask",
                "tipo": "Framework Web / Aplicación",
                "descripcion": "Provee la interfaz web o móvil del sistema."
            }
        ]
    },
    {
        "id": "proj_024",
        "titulo": "⚡ Proyecto 24: Sistema de Detección y Alerta de Crisis Epilépticas",
        "descripcion": "Problema: Las crisis epilépticas pueden causar lesiones graves o muerte si el paciente está solo, pero familiares/cuidadores no reciben alertas inmediatas para proporcionar asistencia urgente.\n\nDescripción: Sistema wearable de detección temprana de crisis epilépticas mediante análisis de movimientos anormales, cambios fisiológicos y patrones previos a una crisis, con sistema de alerta automática a contactos de emergencia. Objetivo Detectar movimientos anormales, convulsiones y cambios fisiológicos que preceden o acompañan una crisis epiléptica, generando alertas inmediatas. Condiciones Neurológicas Detectables • Epilepsia (diversos tipos de crisis) • Convulsiones tónico-clónicas • Crisis parciales complejas • Auras pre-ictales",
        "area": "SBC-IoT + AIoT",
        "sector": "Salud médica y hospitalaria - Neurología",
        "nivel": "Avanzado",
        "duracion": "Un semestre",
        "presupuesto": "Bajo costo",
        "hardware": [
            "Raspberry Pi 4 (Computadora de Placa Reducida (SBC) | Estación base)",
            "ESP32 (Microcontrolador | Wearable principal)",
            "Acelerómetro + giroscopio MPU6050 (Sensor de Movimiento / Posición | Detecta movimiento, orientación o posición dentro del sistema.)",
            "Pulsioxímetro MAX30102 (Sensor Biomédico | Registra señales fisiológicas del usuario para su monitoreo.)",
            "Sensor de temperatura MLX90614 (Sensor Ambiental | Mide variables ambientales relevantes para el sistema.)",
            "Módulo GSM SIM800L (Módulo de Comunicación / Conectividad | Alertas SMS)",
            "GPS NEO-6M (Módulo de Comunicación / Conectividad | Localización de emergencia)",
            "Buzzer de alta potencia (Interfaz de Usuario / Iluminación | Permite la interacción, iluminación o notificación visual/sonora del sistema.)",
            "Vibrador motor (Actuador | Ejecuta una acción física en respuesta a las decisiones del sistema.)",
            "Batería LiPo con autonomía extendida (Fuente de Alimentación / Energía | Suministra energía eléctrica a los componentes del sistema.)"
        ],
        "software": [
            "Python con scikit-learn: Inteligencia Artificial / Machine Learning - Procesa datos mediante modelos de IA/ML para generar predicciones o clasificaciones.",
            "Algoritmos de detección de anomalías: Inteligencia Artificial / Machine Learning - Procesa datos mediante modelos de IA/ML para generar predicciones o clasificaciones.",
            "Random Forest: Inteligencia Artificial / Machine Learning - Para clasificación de crisis",
            "MQTT con QoS 2: Protocolo de Comunicación IoT - Entrega garantizada",
            "Twilio API: Herramienta / Tecnología de Software - Para SMS",
            "WhatsApp Business API: Herramienta / Tecnología de Software - Tecnología de software empleada en el desarrollo del proyecto.",
            "Node-RED: Automatización / Orquestación - Para lógica de alertas",
            "Geolocalización con Google Maps API: Herramienta / Tecnología de Software - Tecnología de software empleada en el desarrollo del proyecto.",
            "SQLite: Base de Datos - Para registro de eventos"
        ],
        "habilidades": [
            "Desarrollo de sistemas críticos de salud • Detección de eventos neurológicos • Integración de alertas multi-canal • Procesamiento en tiempo real • Sistemas de emergencia IoT • Geolocalización y tracking • Diseño de wearables de alta disponibilidad PROYECTOS DE NEUROCIENCIA E INTERFACES CEREBRO-COMPUTADORA PROYECTOS DE NEUROCIENCIA E INTERFACES CEREBRO-COMPUTADORA"
        ],
        "objetivos": [
            "🎯 Objetivo General: Desarrollar un sistema wearable de detección de crisis epilépticas que genere alertas automáticas con geolocalización a contactos de emergencia en tiempo real.",
            "📌 Objetivos Específicos:",
            "• Implementar detección de movimientos convulsivos y cambios fisiológicos mediante acelerómetro y pulsioxímetro.",
            "• Desarrollar algoritmo de clasificación que diferencie crisis epilépticas de movimientos normales con alta especificidad.",
            "• Crear sistema multi-canal de alertas (SMS, WhatsApp, llamadas) con ubicación GPS para respuesta de emergencia."
        ],
        "pasos": [
            "Análisis de requisitos",
            "Diseño de la solución",
            "Implementación y pruebas",
            "Validación y sustentación"
        ],
        "aplicaciones": [
            "Salud médica y hospitalaria - Neurología"
        ],
        "referencias": [],
        "hardware_tabla": [
            {
                "componente": "Raspberry Pi 4",
                "categoria": "Computadora de Placa Reducida (SBC)",
                "funcion": "Estación base"
            },
            {
                "componente": "ESP32",
                "categoria": "Microcontrolador",
                "funcion": "Wearable principal"
            },
            {
                "componente": "Acelerómetro + giroscopio MPU6050",
                "categoria": "Sensor de Movimiento / Posición",
                "funcion": "Detecta movimiento, orientación o posición dentro del sistema."
            },
            {
                "componente": "Pulsioxímetro MAX30102",
                "categoria": "Sensor Biomédico",
                "funcion": "Registra señales fisiológicas del usuario para su monitoreo."
            },
            {
                "componente": "Sensor de temperatura MLX90614",
                "categoria": "Sensor Ambiental",
                "funcion": "Mide variables ambientales relevantes para el sistema."
            },
            {
                "componente": "Módulo GSM SIM800L",
                "categoria": "Módulo de Comunicación / Conectividad",
                "funcion": "Alertas SMS"
            },
            {
                "componente": "GPS NEO-6M",
                "categoria": "Módulo de Comunicación / Conectividad",
                "funcion": "Localización de emergencia"
            },
            {
                "componente": "Buzzer de alta potencia",
                "categoria": "Interfaz de Usuario / Iluminación",
                "funcion": "Permite la interacción, iluminación o notificación visual/sonora del sistema."
            },
            {
                "componente": "Vibrador motor",
                "categoria": "Actuador",
                "funcion": "Ejecuta una acción física en respuesta a las decisiones del sistema."
            },
            {
                "componente": "Batería LiPo con autonomía extendida",
                "categoria": "Fuente de Alimentación / Energía",
                "funcion": "Suministra energía eléctrica a los componentes del sistema."
            }
        ],
        "software_tabla": [
            {
                "herramienta": "Python con scikit-learn",
                "tipo": "Inteligencia Artificial / Machine Learning",
                "descripcion": "Procesa datos mediante modelos de IA/ML para generar predicciones o clasificaciones."
            },
            {
                "herramienta": "Algoritmos de detección de anomalías",
                "tipo": "Inteligencia Artificial / Machine Learning",
                "descripcion": "Procesa datos mediante modelos de IA/ML para generar predicciones o clasificaciones."
            },
            {
                "herramienta": "Random Forest",
                "tipo": "Inteligencia Artificial / Machine Learning",
                "descripcion": "Para clasificación de crisis"
            },
            {
                "herramienta": "MQTT con QoS 2",
                "tipo": "Protocolo de Comunicación IoT",
                "descripcion": "Entrega garantizada"
            },
            {
                "herramienta": "Twilio API",
                "tipo": "Herramienta / Tecnología de Software",
                "descripcion": "Para SMS"
            },
            {
                "herramienta": "WhatsApp Business API",
                "tipo": "Herramienta / Tecnología de Software",
                "descripcion": "Tecnología de software empleada en el desarrollo del proyecto."
            },
            {
                "herramienta": "Node-RED",
                "tipo": "Automatización / Orquestación",
                "descripcion": "Para lógica de alertas"
            },
            {
                "herramienta": "Geolocalización con Google Maps API",
                "tipo": "Herramienta / Tecnología de Software",
                "descripcion": "Tecnología de software empleada en el desarrollo del proyecto."
            },
            {
                "herramienta": "SQLite",
                "tipo": "Base de Datos",
                "descripcion": "Para registro de eventos"
            }
        ]
    },
    {
        "id": "proj_025",
        "titulo": "💻 Proyecto 25: Interfaz Cerebro-Computadora (BCI) con EEG para Control IoT",
        "descripcion": "Problema: Las personas con discapacidad motora severa carecen de métodos de control ambiental, limitando su autonomía e independencia en actividades cotidianas del hogar.\n\nDescripción: Sistema de interfaz cerebro-computadora que permite controlar dispositivos IoT mediante señales EEG, detectando estados mentales (concentración, relajación) y comandos mentales simples para activar relés, luces o actuadores. Objetivo Crear una interfaz no invasiva que permita a usuarios controlar dispositivos del hogar u otros sistemas IoT mediante actividad cerebral, útil para personas con movilidad reducida. Aplicaciones Neurocientíficas • Control de domótica para personas con discapacidad motora • Neurofeedback para entrenamiento cognitivo • Comunicación aumentativa alternativa • Terapia de rehabilitación neurológica",
        "area": "AIoT + IoT con Visión Artificial",
        "sector": "Neurociencia - Interfaces cerebro- computadora",
        "nivel": "Avanzado",
        "duracion": "Un semestre",
        "presupuesto": "Bajo costo",
        "hardware": [
            "Raspberry Pi 4 (Computadora de Placa Reducida (SBC) | Procesamiento central)",
            "OpenBCI Cyton (Sensor Biomédico | O alternativa económica (8 canales EEG))",
            "Electrodos secos reutilizables (Sensor Biomédico | 4-8 unidades)",
            "ESP32 (Microcontrolador | Actuadores IoT)",
            "Relés de 4 canales (Actuador | Ejecuta una acción física en respuesta a las decisiones del sistema.)",
            "Arduino Nano (Microcontrolador | Para control de dispositivos)",
            "LEDs RGB (Interfaz de Usuario / Iluminación | Para feedback visual)",
            "Display OLED (Interfaz de Usuario / Iluminación | Para estados)",
            "Módulo Bluetooth (Módulo de Comunicación / Conectividad | Para comunicación inalámbrica)"
        ],
        "software": [
            "Python con MNE-Python: Lenguaje de Programación - Análisis EEG",
            "PyOpenBCI: Herramienta / Tecnología de Software - Para captura de señales",
            "SciPy: Librería / Herramienta de Análisis de Datos - Para filtrado de señales",
            "TensorFlow: Inteligencia Artificial / Machine Learning - Para clasificación de estados",
            "LSTM: Herramienta / Tecnología de Software - Para reconocimiento de patrones",
            "MQTT: Protocolo de Comunicación IoT - Para comandos IoT",
            "Node-RED: Automatización / Orquestación - Para automatización",
            "Pygame: Herramienta / Tecnología de Software - Para interfaz de entrenamiento",
            "WebSockets: Protocolo de Comunicación IoT - Para control en tiempo real Señales EEG Analizadas",
            "Ondas Alpha: Herramienta / Tecnología de Software - 8-13 Hz; relajación",
            "Ondas Beta: Herramienta / Tecnología de Software - 13-30 Hz; concentración activa",
            "Ondas Theta: Herramienta / Tecnología de Software - 4-8 Hz; meditación",
            "Potenciales P300: Herramienta / Tecnología de Software - Respuesta a estímulos",
            "Motor Imagery: Herramienta / Tecnología de Software - Imaginación de movimiento",
            "SSVEP: Herramienta / Tecnología de Software - Respuesta a estímulos visuales"
        ],
        "habilidades": [
            "Procesamiento de señales EEG",
            "Machine learning para BCI",
            "Diseño de interfaces cerebro-computadora",
            "Filtrado digital de señales biológicas",
            "Clasificación de estados mentales",
            "Integración neurotecnología-IoT",
            "Desarrollo de sistemas de asistencia"
        ],
        "objetivos": [
            "🎯 Objetivo General: Implementar una interfaz cerebro-computadora basada en EEG que permita a usuarios con movilidad reducida controlar dispositivos IoT mediante actividad cerebral voluntaria.",
            "📌 Objetivos Específicos:",
            "• Configurar sistema de captura EEG con OpenBCI y entrenar clasificadores de estados mentales (concentración, relajación, comandos).",
            "• Desarrollar protocolo de entrenamiento de usuarios para generar señales cerebrales distinguibles y controlables.",
            "• Integrar BCI con dispositivos domóticos mediante MQTT para control de luces, puertas, electrodomésticos."
        ],
        "pasos": [
            "Análisis de requisitos",
            "Diseño de la solución",
            "Implementación y pruebas",
            "Validación y sustentación"
        ],
        "aplicaciones": [
            "Neurociencia - Interfaces cerebro- computadora"
        ],
        "referencias": [],
        "hardware_tabla": [
            {
                "componente": "Raspberry Pi 4",
                "categoria": "Computadora de Placa Reducida (SBC)",
                "funcion": "Procesamiento central"
            },
            {
                "componente": "OpenBCI Cyton",
                "categoria": "Sensor Biomédico",
                "funcion": "O alternativa económica (8 canales EEG)"
            },
            {
                "componente": "Electrodos secos reutilizables",
                "categoria": "Sensor Biomédico",
                "funcion": "4-8 unidades"
            },
            {
                "componente": "ESP32",
                "categoria": "Microcontrolador",
                "funcion": "Actuadores IoT"
            },
            {
                "componente": "Relés de 4 canales",
                "categoria": "Actuador",
                "funcion": "Ejecuta una acción física en respuesta a las decisiones del sistema."
            },
            {
                "componente": "Arduino Nano",
                "categoria": "Microcontrolador",
                "funcion": "Para control de dispositivos"
            },
            {
                "componente": "LEDs RGB",
                "categoria": "Interfaz de Usuario / Iluminación",
                "funcion": "Para feedback visual"
            },
            {
                "componente": "Display OLED",
                "categoria": "Interfaz de Usuario / Iluminación",
                "funcion": "Para estados"
            },
            {
                "componente": "Módulo Bluetooth",
                "categoria": "Módulo de Comunicación / Conectividad",
                "funcion": "Para comunicación inalámbrica"
            }
        ],
        "software_tabla": [
            {
                "herramienta": "Python con MNE-Python",
                "tipo": "Lenguaje de Programación",
                "descripcion": "Análisis EEG"
            },
            {
                "herramienta": "PyOpenBCI",
                "tipo": "Herramienta / Tecnología de Software",
                "descripcion": "Para captura de señales"
            },
            {
                "herramienta": "SciPy",
                "tipo": "Librería / Herramienta de Análisis de Datos",
                "descripcion": "Para filtrado de señales"
            },
            {
                "herramienta": "TensorFlow",
                "tipo": "Inteligencia Artificial / Machine Learning",
                "descripcion": "Para clasificación de estados"
            },
            {
                "herramienta": "LSTM",
                "tipo": "Herramienta / Tecnología de Software",
                "descripcion": "Para reconocimiento de patrones"
            },
            {
                "herramienta": "MQTT",
                "tipo": "Protocolo de Comunicación IoT",
                "descripcion": "Para comandos IoT"
            },
            {
                "herramienta": "Node-RED",
                "tipo": "Automatización / Orquestación",
                "descripcion": "Para automatización"
            },
            {
                "herramienta": "Pygame",
                "tipo": "Herramienta / Tecnología de Software",
                "descripcion": "Para interfaz de entrenamiento"
            },
            {
                "herramienta": "WebSockets",
                "tipo": "Protocolo de Comunicación IoT",
                "descripcion": "Para control en tiempo real Señales EEG Analizadas"
            },
            {
                "herramienta": "Ondas Alpha",
                "tipo": "Herramienta / Tecnología de Software",
                "descripcion": "8-13 Hz; relajación"
            },
            {
                "herramienta": "Ondas Beta",
                "tipo": "Herramienta / Tecnología de Software",
                "descripcion": "13-30 Hz; concentración activa"
            },
            {
                "herramienta": "Ondas Theta",
                "tipo": "Herramienta / Tecnología de Software",
                "descripcion": "4-8 Hz; meditación"
            },
            {
                "herramienta": "Potenciales P300",
                "tipo": "Herramienta / Tecnología de Software",
                "descripcion": "Respuesta a estímulos"
            },
            {
                "herramienta": "Motor Imagery",
                "tipo": "Herramienta / Tecnología de Software",
                "descripcion": "Imaginación de movimiento"
            },
            {
                "herramienta": "SSVEP",
                "tipo": "Herramienta / Tecnología de Software",
                "descripcion": "Respuesta a estímulos visuales"
            }
        ]
    },
    {
        "id": "proj_026",
        "titulo": "🧠 Proyecto 26: Sistema de Neurofeedback para Mejora de Atención y Concentración",
        "descripcion": "Problema: Los tratamientos de TDAH y problemas de concentración dependen principalmente de medicación, careciendo de alternativas no farmacológicas basadas en evidencia para autorregulación cerebral.\n\nDescripción: Plataforma de neurofeedback que analiza ondas cerebrales en tiempo real y proporciona retroalimentación visual/auditiva para entrenar estados de concentración, atención sostenida y relajación consciente. Objetivo Desarrollar capacidades de autorregulación cerebral mediante entrenamiento con neurofeedback, mejorando concentración, reduciendo estrés y optimizando rendimiento cognitivo. Aplicaciones Neurocientíficas • Tratamiento complementario de TDAH • Reducción de ansiedad y estrés • Mejora de concentración en estudiantes • Entrenamiento de atletas de alto rendimiento • Terapia de relajación • Optimización de estados de flow",
        "area": "AIoT + SBC-IoT",
        "sector": "Neurociencia - Entrenamiento cognitivo",
        "nivel": "Avanzado",
        "duracion": "Un semestre",
        "presupuesto": "Bajo costo",
        "hardware": [
            "Raspberry Pi 4 (Computadora de Placa Reducida (SBC) | Actúa como unidad de procesamiento central o gateway del sistema.)",
            "NeuroSky MindWave o Muse 2 (Sensor Biomédico | EEG económico)",
            "OpenBCI con 4-8 canales (Otro Componente de Hardware | Alternativamente)",
            "Auriculares o parlantes (Otro Componente de Hardware | Para feedback auditivo)",
            "Monitor HDMI (Otro Componente de Hardware | Para feedback visual)",
            "Electrodos secos (Sensor Biomédico | Registra señales fisiológicas del usuario para su monitoreo.)",
            "Arduino UNO (Microcontrolador | Para actuadores opcionales)",
            "LEDs RGB progresivos (Interfaz de Usuario / Iluminación | Permite la interacción, iluminación o notificación visual/sonora del sistema.)",
            "Pulsioxímetro MAX30102 (Sensor Biomédico | Datos complementarios)"
        ],
        "software": [
            "Python con MNE: Lenguaje de Programación - Para EEG",
            "OpenVibe: Herramienta / Tecnología de Software - Plataforma neurofeedback open source",
            "Pygame: Herramienta / Tecnología de Software - Para interfaces de entrenamiento",
            "NumPy y SciPy: Librería / Herramienta de Análisis de Datos - Para DSP",
            "PyAudio: Herramienta / Tecnología de Software - Para feedback sonoro",
            "Matplotlib: Librería / Herramienta de Análisis de Datos - Para visualización en vivo",
            "SQLite: Base de Datos - Para progreso histórico",
            "Algoritmos de umbral dinámico: Inteligencia Artificial / Machine Learning - Procesa datos mediante modelos de IA/ML para generar predicciones o clasificaciones.",
            "Generación de reportes PDF Protocolos de Entrenamiento: Protocolo de Comunicación IoT - Define el estándar de comunicación de datos entre dispositivos.",
            "Entrenamiento Alpha: Herramienta / Tecnología de Software - Relajación consciente",
            "Entrenamiento Beta: Herramienta / Tecnología de Software - Concentración sostenida",
            "Reducción Theta/Alpha ratio: Herramienta / Tecnología de Software - Control de TDAH",
            "Coherencia inter-hemisférica: Herramienta / Tecnología de Software - Tecnología de software empleada en el desarrollo del proyecto.",
            "SMR training: Herramienta / Tecnología de Software - Ritmo sensoriomotor",
            "Protocolos personalizados según baseline: Protocolo de Comunicación IoT - Define el estándar de comunicación de datos entre dispositivos."
        ],
        "habilidades": [
            "Diseño de protocolos de neurofeedback",
            "Análisis espectral de EEG",
            "Desarrollo de interfaces de entrenamiento",
            "Gamificación de neuroterapia",
            "Procesamiento en tiempo real",
            "Evaluación de progreso cognitivo",
            "Sistemas de biofeedback multimodal"
        ],
        "objetivos": [
            "🎯 Objetivo General: Desarrollar una plataforma de neurofeedback que entrene a usuarios a autorregular actividad cerebral para mejorar concentración, reducir ansiedad y optimizar rendimiento cognitivo.",
            "📌 Objetivos Específicos:",
            "• Implementar captura de ondas cerebrales (Alpha, Beta, Theta) con EEG económico y análisis espectral en tiempo real.",
            "• Desarrollar protocolos de entrenamiento personalizados según baseline de cada usuario y objetivos terapéuticos.",
            "• Crear interfaz gamificada de entrenamiento que proporcione feedback visual/auditivo inmediato de estados cerebrales."
        ],
        "pasos": [
            "Análisis de requisitos",
            "Diseño de la solución",
            "Implementación y pruebas",
            "Validación y sustentación"
        ],
        "aplicaciones": [
            "Neurociencia - Entrenamiento cognitivo"
        ],
        "referencias": [],
        "hardware_tabla": [
            {
                "componente": "Raspberry Pi 4",
                "categoria": "Computadora de Placa Reducida (SBC)",
                "funcion": "Actúa como unidad de procesamiento central o gateway del sistema."
            },
            {
                "componente": "NeuroSky MindWave o Muse 2",
                "categoria": "Sensor Biomédico",
                "funcion": "EEG económico"
            },
            {
                "componente": "OpenBCI con 4-8 canales",
                "categoria": "Otro Componente de Hardware",
                "funcion": "Alternativamente"
            },
            {
                "componente": "Auriculares o parlantes",
                "categoria": "Otro Componente de Hardware",
                "funcion": "Para feedback auditivo"
            },
            {
                "componente": "Monitor HDMI",
                "categoria": "Otro Componente de Hardware",
                "funcion": "Para feedback visual"
            },
            {
                "componente": "Electrodos secos",
                "categoria": "Sensor Biomédico",
                "funcion": "Registra señales fisiológicas del usuario para su monitoreo."
            },
            {
                "componente": "Arduino UNO",
                "categoria": "Microcontrolador",
                "funcion": "Para actuadores opcionales"
            },
            {
                "componente": "LEDs RGB progresivos",
                "categoria": "Interfaz de Usuario / Iluminación",
                "funcion": "Permite la interacción, iluminación o notificación visual/sonora del sistema."
            },
            {
                "componente": "Pulsioxímetro MAX30102",
                "categoria": "Sensor Biomédico",
                "funcion": "Datos complementarios"
            }
        ],
        "software_tabla": [
            {
                "herramienta": "Python con MNE",
                "tipo": "Lenguaje de Programación",
                "descripcion": "Para EEG"
            },
            {
                "herramienta": "OpenVibe",
                "tipo": "Herramienta / Tecnología de Software",
                "descripcion": "Plataforma neurofeedback open source"
            },
            {
                "herramienta": "Pygame",
                "tipo": "Herramienta / Tecnología de Software",
                "descripcion": "Para interfaces de entrenamiento"
            },
            {
                "herramienta": "NumPy y SciPy",
                "tipo": "Librería / Herramienta de Análisis de Datos",
                "descripcion": "Para DSP"
            },
            {
                "herramienta": "PyAudio",
                "tipo": "Herramienta / Tecnología de Software",
                "descripcion": "Para feedback sonoro"
            },
            {
                "herramienta": "Matplotlib",
                "tipo": "Librería / Herramienta de Análisis de Datos",
                "descripcion": "Para visualización en vivo"
            },
            {
                "herramienta": "SQLite",
                "tipo": "Base de Datos",
                "descripcion": "Para progreso histórico"
            },
            {
                "herramienta": "Algoritmos de umbral dinámico",
                "tipo": "Inteligencia Artificial / Machine Learning",
                "descripcion": "Procesa datos mediante modelos de IA/ML para generar predicciones o clasificaciones."
            },
            {
                "herramienta": "Generación de reportes PDF Protocolos de Entrenamiento",
                "tipo": "Protocolo de Comunicación IoT",
                "descripcion": "Define el estándar de comunicación de datos entre dispositivos."
            },
            {
                "herramienta": "Entrenamiento Alpha",
                "tipo": "Herramienta / Tecnología de Software",
                "descripcion": "Relajación consciente"
            },
            {
                "herramienta": "Entrenamiento Beta",
                "tipo": "Herramienta / Tecnología de Software",
                "descripcion": "Concentración sostenida"
            },
            {
                "herramienta": "Reducción Theta/Alpha ratio",
                "tipo": "Herramienta / Tecnología de Software",
                "descripcion": "Control de TDAH"
            },
            {
                "herramienta": "Coherencia inter-hemisférica",
                "tipo": "Herramienta / Tecnología de Software",
                "descripcion": "Tecnología de software empleada en el desarrollo del proyecto."
            },
            {
                "herramienta": "SMR training",
                "tipo": "Herramienta / Tecnología de Software",
                "descripcion": "Ritmo sensoriomotor"
            },
            {
                "herramienta": "Protocolos personalizados según baseline",
                "tipo": "Protocolo de Comunicación IoT",
                "descripcion": "Define el estándar de comunicación de datos entre dispositivos."
            }
        ]
    },
    {
        "id": "proj_027",
        "titulo": "😴 Proyecto 27: Detector de Fatiga Mental y Somnolencia con EEG",
        "descripcion": "Problema: La fatiga es causa importante de accidentes de tránsito y laborales, pero no existen sistemas confiables de detección temprana que permitan intervención preventiva antes del incidente.\n\nDescripción: Sistema de detección de fatiga mental y somnolencia mediante análisis de señales EEG, frecuencia de parpadeo y micro-sueños, diseñado para prevenir accidentes en conductores o trabajadores en tareas críticas. Objetivo Identificar estados de fatiga mental, somnolencia y micro-sueños en tiempo real para generar alertas preventivas en entornos de alto riesgo (conducción, operación de maquinaria). Aplicaciones Neurocientíficas • Prevención de accidentes de tránsito • Seguridad en operadores de maquinaria pesada • Control de fatiga en pilotos y conductores profesionales • Monitoreo de trabajadores en turnos nocturnos • Sistemas de asistencia vehicular",
        "area": "AIoT + SBC-IoT",
        "sector": "Neurociencia - Seguridad y transporte",
        "nivel": "Avanzado",
        "duracion": "Un semestre",
        "presupuesto": "Bajo costo",
        "hardware": [
            "Raspberry Pi 4 (Computadora de Placa Reducida (SBC) | Actúa como unidad de procesamiento central o gateway del sistema.)",
            "OpenBCI o alternativa económica (Sensor Biomédico | EEG portátil)",
            "Electrodos frontales (Sensor Biomédico | Fp1, Fp2; y occipitales)",
            "ESP32-CAM (Microcontrolador con Cámara Integrada | Detección de parpadeo ocular)",
            "Sensor de movimiento MPU6050 (Sensor de Movimiento / Posición | Cabeceos)",
            "Buzzer de alta potencia (Interfaz de Usuario / Iluminación | Permite la interacción, iluminación o notificación visual/sonora del sistema.)",
            "Vibrador motor (Actuador | Alerta háptica)",
            "LEDs de advertencia (Interfaz de Usuario / Iluminación | Permite la interacción, iluminación o notificación visual/sonora del sistema.)",
            "Módulo Bluetooth (Módulo de Comunicación / Conectividad | Permite la transmisión inalámbrica de datos entre dispositivos.)",
            "Batería portable (Fuente de Alimentación / Energía | Suministra energía eléctrica a los componentes del sistema.)"
        ],
        "software": [
            "Python con MNE-Python: Lenguaje de Programación - Lenguaje utilizado para desarrollar la lógica del sistema.",
            "OpenCV: Inteligencia Artificial / Machine Learning - Para detección de parpadeo",
            "Dlib: Herramienta / Tecnología de Software - Para facial landmarks",
            "SciPy: Librería / Herramienta de Análisis de Datos - Para análisis de frecuencias",
            "SVM, Random Forest: Inteligencia Artificial / Machine Learning - Machine Learning",
            "Análisis de Eye Aspect Ratio: Librería / Herramienta de Análisis de Datos - EAR",
            "PERCLOS: Herramienta / Tecnología de Software - Percentage of Eye Closure",
            "MQTT: Protocolo de Comunicación IoT - Para alertas",
            "TensorFlow Lite: Inteligencia Artificial / Machine Learning - Para clasificación Indicadores de Fatiga Monitoreados",
            "Aumento de ondas Theta: Herramienta / Tecnología de Software - 4-8 Hz",
            "Disminución de ondas Alpha posteriores: Herramienta / Tecnología de Software - Tecnología de software empleada en el desarrollo del proyecto.",
            "Slow eye movements: Herramienta / Tecnología de Software - Tecnología de software empleada en el desarrollo del proyecto.",
            "Frecuencia de parpadeo reducida: Herramienta / Tecnología de Software - Tecnología de software empleada en el desarrollo del proyecto.",
            "Micro-sueños: Herramienta / Tecnología de Software - Bursts de ondas lentas",
            "Cabeceos y movimientos de cabeza: Herramienta / Tecnología de Software - Tecnología de software empleada en el desarrollo del proyecto.",
            "Tiempo de reacción enlentecido: Herramienta / Tecnología de Software - Tecnología de software empleada en el desarrollo del proyecto.",
            "Variabilidad de frecuencia cardíaca reducida Sistema de Alertas Multi-nivel: Herramienta / Tecnología de Software - Tecnología de software empleada en el desarrollo del proyecto.",
            "Nivel 1: Visualización / Dashboard - Fatiga Leve; Alerta visual en dashboard",
            "Nivel 2: Herramienta / Tecnología de Software - Fatiga Moderada; Sonido de advertencia + vibración",
            "Nivel 3: Herramienta / Tecnología de Software - Fatiga Severa; Alarma fuerte + recomendación de pausa",
            "Nivel 4: Herramienta / Tecnología de Software - Micro-sueño; Alerta máxima + notificación a supervisor"
        ],
        "habilidades": [
            "Detección de estados de vigilancia",
            "Análisis multimodal (EEG + visión)",
            "Computer vision para detección facial",
            "Sistemas de alerta progresiva",
            "Machine learning para clasificación de fatiga",
            "Integración de biosensores",
            "Diseño de sistemas de seguridad crítica"
        ],
        "objetivos": [
            "🎯 Objetivo General: Implementar un sistema de detección de fatiga mental y somnolencia mediante análisis multimodal (EEG, video) que genere alertas progresivas para prevención de accidentes.",
            "📌 Objetivos Específicos:",
            "• Desarrollar algoritmo de detección de fatiga basado en aumento de ondas Theta y reducción de Alpha en EEG.",
            "• Implementar análisis de video para detección de frecuencia de parpadeo, PERCLOS y micro-sueños con OpenCV.",
            "• Crear sistema de alertas graduales (visual, sonora, háptica) proporcional al nivel de fatiga detectado."
        ],
        "pasos": [
            "Análisis de requisitos",
            "Diseño de la solución",
            "Implementación y pruebas",
            "Validación y sustentación"
        ],
        "aplicaciones": [
            "Neurociencia - Seguridad y transporte"
        ],
        "referencias": [],
        "hardware_tabla": [
            {
                "componente": "Raspberry Pi 4",
                "categoria": "Computadora de Placa Reducida (SBC)",
                "funcion": "Actúa como unidad de procesamiento central o gateway del sistema."
            },
            {
                "componente": "OpenBCI o alternativa económica",
                "categoria": "Sensor Biomédico",
                "funcion": "EEG portátil"
            },
            {
                "componente": "Electrodos frontales",
                "categoria": "Sensor Biomédico",
                "funcion": "Fp1, Fp2; y occipitales"
            },
            {
                "componente": "ESP32-CAM",
                "categoria": "Microcontrolador con Cámara Integrada",
                "funcion": "Detección de parpadeo ocular"
            },
            {
                "componente": "Sensor de movimiento MPU6050",
                "categoria": "Sensor de Movimiento / Posición",
                "funcion": "Cabeceos"
            },
            {
                "componente": "Buzzer de alta potencia",
                "categoria": "Interfaz de Usuario / Iluminación",
                "funcion": "Permite la interacción, iluminación o notificación visual/sonora del sistema."
            },
            {
                "componente": "Vibrador motor",
                "categoria": "Actuador",
                "funcion": "Alerta háptica"
            },
            {
                "componente": "LEDs de advertencia",
                "categoria": "Interfaz de Usuario / Iluminación",
                "funcion": "Permite la interacción, iluminación o notificación visual/sonora del sistema."
            },
            {
                "componente": "Módulo Bluetooth",
                "categoria": "Módulo de Comunicación / Conectividad",
                "funcion": "Permite la transmisión inalámbrica de datos entre dispositivos."
            },
            {
                "componente": "Batería portable",
                "categoria": "Fuente de Alimentación / Energía",
                "funcion": "Suministra energía eléctrica a los componentes del sistema."
            }
        ],
        "software_tabla": [
            {
                "herramienta": "Python con MNE-Python",
                "tipo": "Lenguaje de Programación",
                "descripcion": "Lenguaje utilizado para desarrollar la lógica del sistema."
            },
            {
                "herramienta": "OpenCV",
                "tipo": "Inteligencia Artificial / Machine Learning",
                "descripcion": "Para detección de parpadeo"
            },
            {
                "herramienta": "Dlib",
                "tipo": "Herramienta / Tecnología de Software",
                "descripcion": "Para facial landmarks"
            },
            {
                "herramienta": "SciPy",
                "tipo": "Librería / Herramienta de Análisis de Datos",
                "descripcion": "Para análisis de frecuencias"
            },
            {
                "herramienta": "SVM, Random Forest",
                "tipo": "Inteligencia Artificial / Machine Learning",
                "descripcion": "Machine Learning"
            },
            {
                "herramienta": "Análisis de Eye Aspect Ratio",
                "tipo": "Librería / Herramienta de Análisis de Datos",
                "descripcion": "EAR"
            },
            {
                "herramienta": "PERCLOS",
                "tipo": "Herramienta / Tecnología de Software",
                "descripcion": "Percentage of Eye Closure"
            },
            {
                "herramienta": "MQTT",
                "tipo": "Protocolo de Comunicación IoT",
                "descripcion": "Para alertas"
            },
            {
                "herramienta": "TensorFlow Lite",
                "tipo": "Inteligencia Artificial / Machine Learning",
                "descripcion": "Para clasificación Indicadores de Fatiga Monitoreados"
            },
            {
                "herramienta": "Aumento de ondas Theta",
                "tipo": "Herramienta / Tecnología de Software",
                "descripcion": "4-8 Hz"
            },
            {
                "herramienta": "Disminución de ondas Alpha posteriores",
                "tipo": "Herramienta / Tecnología de Software",
                "descripcion": "Tecnología de software empleada en el desarrollo del proyecto."
            },
            {
                "herramienta": "Slow eye movements",
                "tipo": "Herramienta / Tecnología de Software",
                "descripcion": "Tecnología de software empleada en el desarrollo del proyecto."
            },
            {
                "herramienta": "Frecuencia de parpadeo reducida",
                "tipo": "Herramienta / Tecnología de Software",
                "descripcion": "Tecnología de software empleada en el desarrollo del proyecto."
            },
            {
                "herramienta": "Micro-sueños",
                "tipo": "Herramienta / Tecnología de Software",
                "descripcion": "Bursts de ondas lentas"
            },
            {
                "herramienta": "Cabeceos y movimientos de cabeza",
                "tipo": "Herramienta / Tecnología de Software",
                "descripcion": "Tecnología de software empleada en el desarrollo del proyecto."
            },
            {
                "herramienta": "Tiempo de reacción enlentecido",
                "tipo": "Herramienta / Tecnología de Software",
                "descripcion": "Tecnología de software empleada en el desarrollo del proyecto."
            },
            {
                "herramienta": "Variabilidad de frecuencia cardíaca reducida Sistema de Alertas Multi-nivel",
                "tipo": "Herramienta / Tecnología de Software",
                "descripcion": "Tecnología de software empleada en el desarrollo del proyecto."
            },
            {
                "herramienta": "Nivel 1",
                "tipo": "Visualización / Dashboard",
                "descripcion": "Fatiga Leve; Alerta visual en dashboard"
            },
            {
                "herramienta": "Nivel 2",
                "tipo": "Herramienta / Tecnología de Software",
                "descripcion": "Fatiga Moderada; Sonido de advertencia + vibración"
            },
            {
                "herramienta": "Nivel 3",
                "tipo": "Herramienta / Tecnología de Software",
                "descripcion": "Fatiga Severa; Alarma fuerte + recomendación de pausa"
            },
            {
                "herramienta": "Nivel 4",
                "tipo": "Herramienta / Tecnología de Software",
                "descripcion": "Micro-sueño; Alerta máxima + notificación a supervisor"
            }
        ]
    },
    {
        "id": "proj_028",
        "titulo": "📚 Proyecto 28: Plataforma de Neurociencia Cognitiva para Análisis de Memoria y Aprendizaje",
        "descripcion": "Problema: La investigación en neurociencia cognitiva requiere equipamiento costoso y software propietario, limitando el acceso de investigadores y estudiantes a experimentación neurocientífica.\n\nDescripción: Sistema experimental de neurociencia cognitiva que analiza correlatos neuronales de memoria de trabajo, consolidación de memoria y procesos de aprendizaje mediante paradigmas experimentales con EEG y análisis de rendimiento conductual. Objetivo Crear una plataforma experimental para investigar procesos cognitivos (memoria, atención, aprendizaje) mediante la correlación de señales cerebrales con desempeño en tareas cognitivas. Aplicaciones Neurocientíficas • Investigación en neurociencia cognitiva • Estudio de procesos de memoria • Evaluación de capacidad de aprendizaje • Detección de deterioro cognitivo temprano • Optimización de métodos de enseñanza • Desarrollo de terapias cognitivas",
        "area": "AIoT + SBC-IoT",
        "sector": "Neurociencia - Investigación cognitiva",
        "nivel": "Avanzado",
        "duracion": "Un semestre",
        "presupuesto": "Bajo costo",
        "hardware": [
            "Raspberry Pi 4 (Computadora de Placa Reducida (SBC) | Actúa como unidad de procesamiento central o gateway del sistema (8GB RAM recomendado).)",
            "OpenBCI Cyton 8 canales (Otro Componente de Hardware | Forma parte del hardware de soporte del proyecto.)",
            "Electrodos de gorro EEG (Sensor Biomédico | Sistema 10-20)",
            "Monitor táctil HDMI 7\" (Otro Componente de Hardware | Forma parte del hardware de soporte del proyecto.)",
            "Teclado y mouse USB (Interfaz de Usuario / Iluminación | Permite la interacción, iluminación o notificación visual/sonora del sistema.)",
            "Parlantes (Otro Componente de Hardware | Para estímulos auditivos)",
            "Cámara web (Cámara / Sensor de Visión | Registro de expresiones; opcional)",
            "Arduino Nano (Microcontrolador | Registro de tiempos de reacción)",
            "Pulsador de respuesta ergonómico (Otro Componente de Hardware | Forma parte del hardware de soporte del proyecto.)"
        ],
        "software": [
            "Python con MNE-Python: Lenguaje de Programación - Lenguaje utilizado para desarrollar la lógica del sistema.",
            "PsychoPy: Herramienta / Tecnología de Software - Paradigmas experimentales",
            "NumPy y Pandas: Librería / Herramienta de Análisis de Datos - Para análisis",
            "SciPy: Librería / Herramienta de Análisis de Datos - Para estadística",
            "Matplotlib y Seaborn: Librería / Herramienta de Análisis de Datos - Para visualización",
            "Jupyter Notebook: IDE / Entorno de Desarrollo - Para análisis exploratorio",
            "SQLite: Base de Datos - Para almacenar datos experimentales",
            "R para análisis estadístico avanzado: Librería / Herramienta de Análisis de Datos - Opcional",
            "Librerías de Event-Related Potentials: Herramienta / Tecnología de Software - ERPs; Paradigmas Experimentales Implementables",
            "N-back task: Herramienta / Tecnología de Software - Memoria de trabajo",
            "Oddball paradigm: Herramienta / Tecnología de Software - P300, atención",
            "Stroop task: Herramienta / Tecnología de Software - Control inhibitorio",
            "Memory encoding/retrieval tasks: Herramienta / Tecnología de Software - Tecnología de software empleada en el desarrollo del proyecto.",
            "Continuous Performance Task: Herramienta / Tecnología de Software - CPT",
            "Go/No-Go: Herramienta / Tecnología de Software - Funciones ejecutivas",
            "Serial Reaction Time Task: Herramienta / Tecnología de Software - Aprendizaje implícito; Marcadores Neuronales Analizados",
            "P300: Herramienta / Tecnología de Software - Procesamiento de información",
            "N400: Herramienta / Tecnología de Software - Procesamiento semántico",
            "N170: Herramienta / Tecnología de Software - Reconocimiento facial",
            "Error-Related Negativity: Herramienta / Tecnología de Software - ERN",
            "Lateralized Readiness Potential: Herramienta / Tecnología de Software - LRP",
            "Potenciales relacionados a memoria: Herramienta / Tecnología de Software - Tecnología de software empleada en el desarrollo del proyecto.",
            "Sincronización/desincronización en bandas de frecuencia: Herramienta / Tecnología de Software - Tecnología de software empleada en el desarrollo del proyecto."
        ],
        "habilidades": [
            "Diseño experimental en neurociencia • Análisis de Event-Related Potentials (ERPs) • Programación de paradigmas cognitivos • Estadística aplicada a neurociencia • Interpretación de correlatos neuronales • Métodos de investigación científica • Procesamiento avanzado de señales EEG • Visualización de datos neurocientíficos RESUMEN DE PROYECTOS AÑADIDOS Se han agregado 8 proyectos adicionales especializados en neurología y neurociencia, elevando el total a 28 proyectos de IoT: Proyectos de Neurología (21-24) • Proyecto 21: Detección Temprana de Parkinson • Proyecto 22: Detección de Deterioro Cognitivo y Alzheimer • Proyecto 23: Monitor de Estrés Neurológico, Ansiedad y TDAH • Proyecto 24: Detección y Alerta de Crisis Epilépticas Proyectos de Neurociencia (25-28) • Proyecto 25: Interfaz Cerebro-Computadora (BCI) con EEG • Proyecto 26: Sistema de Neurofeedback • Proyecto 27: Detector de Fatiga Mental y Somnolencia • Proyecto 28: Plataforma de Neurociencia Cognitiva Estos proyectos representan aplicaciones de vanguardia en la intersección de IoT, inteligencia artificial y neurociencia, con alto potencial de impacto en salud, investigación y calidad de vida. PROYECTOS DE ACUICULTURA Y PISCICULTURA INTELIGENTE PROYECTOS DE ACUICULTURA Y PISCICULTURA INTELIGENTE"
        ],
        "objetivos": [
            "🎯 Objetivo General: Desarrollar una plataforma open-source de neurociencia cognitiva que permita investigar procesos de memoria y aprendizaje mediante paradigmas experimentales con EEG.",
            "📌 Objetivos Específicos:",
            "• Implementar paradigmas experimentales clásicos (N-back, Oddball, Stroop) usando PsychoPy con sincronización EEG.",
            "• Desarrollar pipeline de análisis de Event-Related Potentials (ERPs) con detección de P300, N400 y otros componentes.",
            "• Crear base de datos de experimentos que facilite replicación y comparación de resultados entre investigadores."
        ],
        "pasos": [
            "Análisis de requisitos",
            "Diseño de la solución",
            "Implementación y pruebas",
            "Validación y sustentación"
        ],
        "aplicaciones": [
            "Neurociencia - Investigación cognitiva"
        ],
        "referencias": [],
        "hardware_tabla": [
            {
                "componente": "Raspberry Pi 4",
                "categoria": "Computadora de Placa Reducida (SBC)",
                "funcion": "Actúa como unidad de procesamiento central o gateway del sistema (8GB RAM recomendado)."
            },
            {
                "componente": "OpenBCI Cyton 8 canales",
                "categoria": "Otro Componente de Hardware",
                "funcion": "Forma parte del hardware de soporte del proyecto."
            },
            {
                "componente": "Electrodos de gorro EEG",
                "categoria": "Sensor Biomédico",
                "funcion": "Sistema 10-20"
            },
            {
                "componente": "Monitor táctil HDMI 7\"",
                "categoria": "Otro Componente de Hardware",
                "funcion": "Forma parte del hardware de soporte del proyecto."
            },
            {
                "componente": "Teclado y mouse USB",
                "categoria": "Interfaz de Usuario / Iluminación",
                "funcion": "Permite la interacción, iluminación o notificación visual/sonora del sistema."
            },
            {
                "componente": "Parlantes",
                "categoria": "Otro Componente de Hardware",
                "funcion": "Para estímulos auditivos"
            },
            {
                "componente": "Cámara web",
                "categoria": "Cámara / Sensor de Visión",
                "funcion": "Registro de expresiones; opcional"
            },
            {
                "componente": "Arduino Nano",
                "categoria": "Microcontrolador",
                "funcion": "Registro de tiempos de reacción"
            },
            {
                "componente": "Pulsador de respuesta ergonómico",
                "categoria": "Otro Componente de Hardware",
                "funcion": "Forma parte del hardware de soporte del proyecto."
            }
        ],
        "software_tabla": [
            {
                "herramienta": "Python con MNE-Python",
                "tipo": "Lenguaje de Programación",
                "descripcion": "Lenguaje utilizado para desarrollar la lógica del sistema."
            },
            {
                "herramienta": "PsychoPy",
                "tipo": "Herramienta / Tecnología de Software",
                "descripcion": "Paradigmas experimentales"
            },
            {
                "herramienta": "NumPy y Pandas",
                "tipo": "Librería / Herramienta de Análisis de Datos",
                "descripcion": "Para análisis"
            },
            {
                "herramienta": "SciPy",
                "tipo": "Librería / Herramienta de Análisis de Datos",
                "descripcion": "Para estadística"
            },
            {
                "herramienta": "Matplotlib y Seaborn",
                "tipo": "Librería / Herramienta de Análisis de Datos",
                "descripcion": "Para visualización"
            },
            {
                "herramienta": "Jupyter Notebook",
                "tipo": "IDE / Entorno de Desarrollo",
                "descripcion": "Para análisis exploratorio"
            },
            {
                "herramienta": "SQLite",
                "tipo": "Base de Datos",
                "descripcion": "Para almacenar datos experimentales"
            },
            {
                "herramienta": "R para análisis estadístico avanzado",
                "tipo": "Librería / Herramienta de Análisis de Datos",
                "descripcion": "Opcional"
            },
            {
                "herramienta": "Librerías de Event-Related Potentials",
                "tipo": "Herramienta / Tecnología de Software",
                "descripcion": "ERPs; Paradigmas Experimentales Implementables"
            },
            {
                "herramienta": "N-back task",
                "tipo": "Herramienta / Tecnología de Software",
                "descripcion": "Memoria de trabajo"
            },
            {
                "herramienta": "Oddball paradigm",
                "tipo": "Herramienta / Tecnología de Software",
                "descripcion": "P300, atención"
            },
            {
                "herramienta": "Stroop task",
                "tipo": "Herramienta / Tecnología de Software",
                "descripcion": "Control inhibitorio"
            },
            {
                "herramienta": "Memory encoding/retrieval tasks",
                "tipo": "Herramienta / Tecnología de Software",
                "descripcion": "Tecnología de software empleada en el desarrollo del proyecto."
            },
            {
                "herramienta": "Continuous Performance Task",
                "tipo": "Herramienta / Tecnología de Software",
                "descripcion": "CPT"
            },
            {
                "herramienta": "Go/No-Go",
                "tipo": "Herramienta / Tecnología de Software",
                "descripcion": "Funciones ejecutivas"
            },
            {
                "herramienta": "Serial Reaction Time Task",
                "tipo": "Herramienta / Tecnología de Software",
                "descripcion": "Aprendizaje implícito; Marcadores Neuronales Analizados"
            },
            {
                "herramienta": "P300",
                "tipo": "Herramienta / Tecnología de Software",
                "descripcion": "Procesamiento de información"
            },
            {
                "herramienta": "N400",
                "tipo": "Herramienta / Tecnología de Software",
                "descripcion": "Procesamiento semántico"
            },
            {
                "herramienta": "N170",
                "tipo": "Herramienta / Tecnología de Software",
                "descripcion": "Reconocimiento facial"
            },
            {
                "herramienta": "Error-Related Negativity",
                "tipo": "Herramienta / Tecnología de Software",
                "descripcion": "ERN"
            },
            {
                "herramienta": "Lateralized Readiness Potential",
                "tipo": "Herramienta / Tecnología de Software",
                "descripcion": "LRP"
            },
            {
                "herramienta": "Potenciales relacionados a memoria",
                "tipo": "Herramienta / Tecnología de Software",
                "descripcion": "Tecnología de software empleada en el desarrollo del proyecto."
            },
            {
                "herramienta": "Sincronización/desincronización en bandas de frecuencia",
                "tipo": "Herramienta / Tecnología de Software",
                "descripcion": "Tecnología de software empleada en el desarrollo del proyecto."
            }
        ]
    },
    {
        "id": "proj_029",
        "titulo": "🐟 Proyecto 29: Sistema de Monitoreo de Calidad de Agua en Estanques Acuícolas",
        "descripcion": "Problema: La mortalidad de peces por condiciones inadecuadas de agua (bajo oxígeno, pH incorrecto, temperatura extrema) genera pérdidas económicas significativas en piscicultura por monitoreo insuficiente.\n\nDescripción: Sistema de monitoreo continuo de parámetros críticos de calidad del agua en estanques de piscicultura (pH, temperatura, oxígeno disuelto, turbidez) con alertas automáticas y control de aireadores para optimizar condiciones de cría. Objetivo Mantener parámetros óptimos de calidad del agua en tiempo real, prevenir mortalidad de peces por condiciones adversas y optimizar producción acuícola mediante automatización.",
        "area": "SBC-IoT + IoT con Analítica",
        "sector": "Acuicultura y piscicultura inteligente",
        "nivel": "Intermedio",
        "duracion": "Un semestre",
        "presupuesto": "Bajo costo",
        "hardware": [
            "Raspberry Pi 3 B+ (Computadora de Placa Reducida (SBC) | Controlador central)",
            "ESP32 (Microcontrolador | Nodo sensor sumergible)",
            "Sensor de pH (Otro Componente de Hardware | Módulo analógico)",
            "Sensor de temperatura DS18B20 (Sensor Ambiental | Waterproof)",
            "Sensor de oxígeno disuelto (Otro Componente de Hardware | Electroquímico o óptico económico)",
            "Sensor de turbidez analógico (Otro Componente de Hardware | Forma parte del hardware de soporte del proyecto.)",
            "Sensor ultrasónico JSN-SR04T (Sensor de Movimiento / Posición | Nivel de agua)",
            "Relés de 4 canales (Actuador | Control de aireadores)",
            "Bomba de aire/aireador 12V (Actuador | Ejecuta una acción física en respuesta a las decisiones del sistema.)",
            "Panel solar 10W + batería (Fuente de Alimentación / Energía | Alimentación autónoma)",
            "Carcasa impermeable IP67 (Estructura / Componente Mecánico | Brinda soporte físico o estructural al prototipo.)"
        ],
        "software": [
            "Python con GPIO: Lenguaje de Programación - Lenguaje utilizado para desarrollar la lógica del sistema.",
            "InfluxDB: Base de Datos - Para series temporales",
            "Grafana: Visualización / Dashboard - Para dashboards",
            "MQTT: Protocolo de Comunicación IoT - Para comunicación",
            "Node- RED: Herramienta / Tecnología de Software - Para automatización",
            "Algoritmos de umbral dinámico: Inteligencia Artificial / Machine Learning - Procesa datos mediante modelos de IA/ML para generar predicciones o clasificaciones.",
            "Telegram Bot API: Herramienta / Tecnología de Software - Para alertas",
            "SQLite: Base de Datos - Para logs locales"
        ],
        "habilidades": [
            "Monitoreo de parámetros acuáticos",
            "Calibración de sensores químicos",
            "Sistemas de control automatizado",
            "Energía renovable en IoT",
            "Análisis de series temporales ambientales",
            "Diseño de sistemas impermeables"
        ],
        "objetivos": [
            "🎯 Objetivo General: Desarrollar un sistema IoT de monitoreo y control de calidad del agua en estanques acuícolas que mantenga parámetros óptimos automáticamente.",
            "📌 Objetivos Específicos:",
            "• Implementar sensores de pH, temperatura, oxígeno disuelto y turbidez con transmisión inalámbrica a estación central.",
            "• Desarrollar algoritmos de control que activen aireadores automáticamente cuando oxígeno disuelto caiga bajo umbral crítico.",
            "• Crear sistema de alertas que notifique acuicultores ante condiciones adversas con registros históricos para análisis."
        ],
        "pasos": [
            "Análisis de requisitos",
            "Diseño de la solución",
            "Implementación y pruebas",
            "Validación y sustentación"
        ],
        "aplicaciones": [
            "Acuicultura y piscicultura inteligente"
        ],
        "referencias": [],
        "hardware_tabla": [
            {
                "componente": "Raspberry Pi 3 B+",
                "categoria": "Computadora de Placa Reducida (SBC)",
                "funcion": "Controlador central"
            },
            {
                "componente": "ESP32",
                "categoria": "Microcontrolador",
                "funcion": "Nodo sensor sumergible"
            },
            {
                "componente": "Sensor de pH",
                "categoria": "Otro Componente de Hardware",
                "funcion": "Módulo analógico"
            },
            {
                "componente": "Sensor de temperatura DS18B20",
                "categoria": "Sensor Ambiental",
                "funcion": "Waterproof"
            },
            {
                "componente": "Sensor de oxígeno disuelto",
                "categoria": "Otro Componente de Hardware",
                "funcion": "Electroquímico o óptico económico"
            },
            {
                "componente": "Sensor de turbidez analógico",
                "categoria": "Otro Componente de Hardware",
                "funcion": "Forma parte del hardware de soporte del proyecto."
            },
            {
                "componente": "Sensor ultrasónico JSN-SR04T",
                "categoria": "Sensor de Movimiento / Posición",
                "funcion": "Nivel de agua"
            },
            {
                "componente": "Relés de 4 canales",
                "categoria": "Actuador",
                "funcion": "Control de aireadores"
            },
            {
                "componente": "Bomba de aire/aireador 12V",
                "categoria": "Actuador",
                "funcion": "Ejecuta una acción física en respuesta a las decisiones del sistema."
            },
            {
                "componente": "Panel solar 10W + batería",
                "categoria": "Fuente de Alimentación / Energía",
                "funcion": "Alimentación autónoma"
            },
            {
                "componente": "Carcasa impermeable IP67",
                "categoria": "Estructura / Componente Mecánico",
                "funcion": "Brinda soporte físico o estructural al prototipo."
            }
        ],
        "software_tabla": [
            {
                "herramienta": "Python con GPIO",
                "tipo": "Lenguaje de Programación",
                "descripcion": "Lenguaje utilizado para desarrollar la lógica del sistema."
            },
            {
                "herramienta": "InfluxDB",
                "tipo": "Base de Datos",
                "descripcion": "Para series temporales"
            },
            {
                "herramienta": "Grafana",
                "tipo": "Visualización / Dashboard",
                "descripcion": "Para dashboards"
            },
            {
                "herramienta": "MQTT",
                "tipo": "Protocolo de Comunicación IoT",
                "descripcion": "Para comunicación"
            },
            {
                "herramienta": "Node- RED",
                "tipo": "Herramienta / Tecnología de Software",
                "descripcion": "Para automatización"
            },
            {
                "herramienta": "Algoritmos de umbral dinámico",
                "tipo": "Inteligencia Artificial / Machine Learning",
                "descripcion": "Procesa datos mediante modelos de IA/ML para generar predicciones o clasificaciones."
            },
            {
                "herramienta": "Telegram Bot API",
                "tipo": "Herramienta / Tecnología de Software",
                "descripcion": "Para alertas"
            },
            {
                "herramienta": "SQLite",
                "tipo": "Base de Datos",
                "descripcion": "Para logs locales"
            }
        ]
    },
    {
        "id": "proj_030",
        "titulo": "🐠 Proyecto 30: Alimentador Automático Inteligente para Peces con Visión por Computador",
        "descripcion": "Problema: La sobrealimentación contamina agua y aumenta costos, mientras que la subalimentación reduce crecimiento, pero dosificación manual carece de precisión basada en comportamiento real de peces.\n\nDescripción: Sistema de alimentación automatizado que utiliza visión por computadora para contar peces, analizar comportamiento alimentario y dispensar cantidad óptima de alimento, evitando desperdicio y contaminación del agua. Objetivo Optimizar alimentación mediante visión artificial que detecta presencia, cantidad y comportamiento de peces, ajustando dosis de alimento y reduciendo costos operativos.",
        "area": "AIoT + IoT con Visión Artificial",
        "sector": "Acuicultura y piscicultura inteligente",
        "nivel": "Avanzado",
        "duracion": "Un semestre",
        "presupuesto": "Bajo costo",
        "hardware": [
            "Raspberry Pi 4 (Computadora de Placa Reducida (SBC) | Procesamiento de imagen)",
            "ESP32-CAM (Cámara / Sensor de Visión | Cámara sumergible con iluminación LED)",
            "Arduino Nano (Microcontrolador | Control de dispensador)",
            "Servomotor MG996R (Actuador | Apertura de tolva)",
            "Motor paso a paso 28BYJ-48 (Actuador | Dosificación)",
            "Sensor de carga HX711 con celda (Componente Electrónico / Accesorio | Peso de alimento)",
            "LEDs blancos de alta potencia (Interfaz de Usuario / Iluminación | Iluminación subacuática)",
            "Relé (Actuador | Para control de iluminación)",
            "RTC DS3231 (Otro Componente de Hardware | Horarios de alimentación)",
            "Buzzer (Interfaz de Usuario / Iluminación | Confirmación de dispensado)",
            "Carcasa hermética (Estructura / Componente Mecánico | Brinda soporte físico o estructural al prototipo.)"
        ],
        "software": [
            "OpenCV: Inteligencia Artificial / Machine Learning - Para detección de peces",
            "TensorFlow Lite: Inteligencia Artificial / Machine Learning - Clasificación de especies",
            "Python con picamera: Lenguaje de Programación - Lenguaje utilizado para desarrollar la lógica del sistema.",
            "Background subtraction: Herramienta / Tecnología de Software - Para conteo",
            "YOLO tiny: Inteligencia Artificial / Machine Learning - Object detection",
            "MQTT: Protocolo de Comunicación IoT - Para coordinación",
            "Node-RED: Automatización / Orquestación - Para automatización",
            "SQLite: Base de Datos - Para historial de alimentación",
            "Pandas: Librería / Herramienta de Análisis de Datos - Para análisis de consumo Funcionalidades Inteligentes",
            "Conteo automático de peces en superficie: Herramienta / Tecnología de Software - Tecnología de software empleada en el desarrollo del proyecto.",
            "Detección de actividad alimentaria: Herramienta / Tecnología de Software - Tecnología de software empleada en el desarrollo del proyecto.",
            "Ajuste de dosis según comportamiento: Herramienta / Tecnología de Software - Tecnología de software empleada en el desarrollo del proyecto.",
            "Identificación de especies: Herramienta / Tecnología de Software - Si multiespecie",
            "Detección de alimento no consumido: Herramienta / Tecnología de Software - Tecnología de software empleada en el desarrollo del proyecto.",
            "Horarios adaptativos según clima: Herramienta / Tecnología de Software - Tecnología de software empleada en el desarrollo del proyecto.",
            "Registro fotográfico de crecimiento: Herramienta / Tecnología de Software - Tecnología de software empleada en el desarrollo del proyecto.",
            "Estimación de biomasa por visión: Herramienta / Tecnología de Software - Tecnología de software empleada en el desarrollo del proyecto."
        ],
        "habilidades": [
            "Computer vision subacuática • Object detection y tracking • Automatización de procesos acuícolas • Optimización de recursos alimenticios • Sistemas mecatrónicos • Integración hardware-software en ambientes hostiles PROYECTOS DE EDUCACIÓN INTELIGENTE Y E-LEARNING PROYECTOS DE EDUCACIÓN INTELIGENTE Y E-LEARNING"
        ],
        "objetivos": [
            "🎯 Objetivo General: Implementar un sistema de alimentación inteligente que utilice visión artificial para optimizar dosificación de alimento según presencia, cantidad y comportamiento de peces.",
            "📌 Objetivos Específicos:",
            "• Desarrollar algoritmo de detección y conteo de peces en superficie usando OpenCV y YOLO para estimación de biomasa.",
            "• Implementar análisis de comportamiento alimentario que detecte si peces consumen activamente o rechazan alimento.",
            "• Crear sistema de dosificación adaptativo que ajuste cantidad dispensada según actividad de alimentación observada."
        ],
        "pasos": [
            "Análisis de requisitos",
            "Diseño de la solución",
            "Implementación y pruebas",
            "Validación y sustentación"
        ],
        "aplicaciones": [
            "Acuicultura y piscicultura inteligente"
        ],
        "referencias": [],
        "hardware_tabla": [
            {
                "componente": "Raspberry Pi 4",
                "categoria": "Computadora de Placa Reducida (SBC)",
                "funcion": "Procesamiento de imagen"
            },
            {
                "componente": "ESP32-CAM",
                "categoria": "Cámara / Sensor de Visión",
                "funcion": "Cámara sumergible con iluminación LED"
            },
            {
                "componente": "Arduino Nano",
                "categoria": "Microcontrolador",
                "funcion": "Control de dispensador"
            },
            {
                "componente": "Servomotor MG996R",
                "categoria": "Actuador",
                "funcion": "Apertura de tolva"
            },
            {
                "componente": "Motor paso a paso 28BYJ-48",
                "categoria": "Actuador",
                "funcion": "Dosificación"
            },
            {
                "componente": "Sensor de carga HX711 con celda",
                "categoria": "Componente Electrónico / Accesorio",
                "funcion": "Peso de alimento"
            },
            {
                "componente": "LEDs blancos de alta potencia",
                "categoria": "Interfaz de Usuario / Iluminación",
                "funcion": "Iluminación subacuática"
            },
            {
                "componente": "Relé",
                "categoria": "Actuador",
                "funcion": "Para control de iluminación"
            },
            {
                "componente": "RTC DS3231",
                "categoria": "Otro Componente de Hardware",
                "funcion": "Horarios de alimentación"
            },
            {
                "componente": "Buzzer",
                "categoria": "Interfaz de Usuario / Iluminación",
                "funcion": "Confirmación de dispensado"
            },
            {
                "componente": "Carcasa hermética",
                "categoria": "Estructura / Componente Mecánico",
                "funcion": "Brinda soporte físico o estructural al prototipo."
            }
        ],
        "software_tabla": [
            {
                "herramienta": "OpenCV",
                "tipo": "Inteligencia Artificial / Machine Learning",
                "descripcion": "Para detección de peces"
            },
            {
                "herramienta": "TensorFlow Lite",
                "tipo": "Inteligencia Artificial / Machine Learning",
                "descripcion": "Clasificación de especies"
            },
            {
                "herramienta": "Python con picamera",
                "tipo": "Lenguaje de Programación",
                "descripcion": "Lenguaje utilizado para desarrollar la lógica del sistema."
            },
            {
                "herramienta": "Background subtraction",
                "tipo": "Herramienta / Tecnología de Software",
                "descripcion": "Para conteo"
            },
            {
                "herramienta": "YOLO tiny",
                "tipo": "Inteligencia Artificial / Machine Learning",
                "descripcion": "Object detection"
            },
            {
                "herramienta": "MQTT",
                "tipo": "Protocolo de Comunicación IoT",
                "descripcion": "Para coordinación"
            },
            {
                "herramienta": "Node-RED",
                "tipo": "Automatización / Orquestación",
                "descripcion": "Para automatización"
            },
            {
                "herramienta": "SQLite",
                "tipo": "Base de Datos",
                "descripcion": "Para historial de alimentación"
            },
            {
                "herramienta": "Pandas",
                "tipo": "Librería / Herramienta de Análisis de Datos",
                "descripcion": "Para análisis de consumo Funcionalidades Inteligentes"
            },
            {
                "herramienta": "Conteo automático de peces en superficie",
                "tipo": "Herramienta / Tecnología de Software",
                "descripcion": "Tecnología de software empleada en el desarrollo del proyecto."
            },
            {
                "herramienta": "Detección de actividad alimentaria",
                "tipo": "Herramienta / Tecnología de Software",
                "descripcion": "Tecnología de software empleada en el desarrollo del proyecto."
            },
            {
                "herramienta": "Ajuste de dosis según comportamiento",
                "tipo": "Herramienta / Tecnología de Software",
                "descripcion": "Tecnología de software empleada en el desarrollo del proyecto."
            },
            {
                "herramienta": "Identificación de especies",
                "tipo": "Herramienta / Tecnología de Software",
                "descripcion": "Si multiespecie"
            },
            {
                "herramienta": "Detección de alimento no consumido",
                "tipo": "Herramienta / Tecnología de Software",
                "descripcion": "Tecnología de software empleada en el desarrollo del proyecto."
            },
            {
                "herramienta": "Horarios adaptativos según clima",
                "tipo": "Herramienta / Tecnología de Software",
                "descripcion": "Tecnología de software empleada en el desarrollo del proyecto."
            },
            {
                "herramienta": "Registro fotográfico de crecimiento",
                "tipo": "Herramienta / Tecnología de Software",
                "descripcion": "Tecnología de software empleada en el desarrollo del proyecto."
            },
            {
                "herramienta": "Estimación de biomasa por visión",
                "tipo": "Herramienta / Tecnología de Software",
                "descripcion": "Tecnología de software empleada en el desarrollo del proyecto."
            }
        ]
    },
    {
        "id": "proj_031",
        "titulo": "🎓 Proyecto 31: Aula Inteligente con Análisis de Atención y Participación",
        "descripcion": "Problema: Los docentes carecen de datos objetivos sobre niveles de atención y comprensión de estudiantes durante clases, basando ajustes pedagógicos en percepciones subjetivas e incompletas.\n\nDescripción: Sistema IoT para aulas que analiza niveles de atención, participación y engagement de estudiantes mediante sensores ambientales, análisis de expresiones faciales y métricas de interacción, generando reportes para docentes. Objetivo Proporcionar a docentes datos objetivos sobre atención y participación estudiantil para mejorar metodologías de enseñanza y detectar estudiantes que requieren apoyo adicional.",
        "area": "AIoT + IoT con Visión Artificial",
        "sector": "Educación inteligente y e-learning",
        "nivel": "Avanzado",
        "duracion": "Un semestre",
        "presupuesto": "Bajo costo",
        "hardware": [
            "Raspberry Pi 4 (Computadora de Placa Reducida (SBC) | Procesamiento central)",
            "ESP32-CAM (Microcontrolador con Cámara Integrada | 2-3 unidades para cobertura de aula)",
            "Sensores de ruido (Otro Componente de Hardware | MAX4466)",
            "Sensor de CO2 MH-Z19B (Sensor Ambiental | Calidad del aire)",
            "Sensores PIR (Sensor de Movimiento / Posición | Detección de movimiento)",
            "Arduino Nano (Microcontrolador | Botones de participación)",
            "Pulsadores inalámbricos RF 433MHz (Otro Componente de Hardware | Respuestas estudiantes)",
            "Display OLED (Interfaz de Usuario / Iluminación | Para métricas en vivo)",
            "LEDs indicadores de niveles (Interfaz de Usuario / Iluminación | Permite la interacción, iluminación o notificación visual/sonora del sistema.)"
        ],
        "software": [
            "OpenCV con Dlib: Inteligencia Artificial / Machine Learning - Detección facial",
            "FER: Herramienta / Tecnología de Software - Facial Expression Recognition",
            "TensorFlow: Inteligencia Artificial / Machine Learning - Para análisis de engagement",
            "Python con análisis de audio: Lenguaje de Programación - Lenguaje utilizado para desarrollar la lógica del sistema.",
            "MQTT: Protocolo de Comunicación IoT - Para datos en tiempo real",
            "PostgreSQL: Base de Datos - Para datos históricos",
            "Grafana: Visualización / Dashboard - Para dashboards de docentes",
            "Power BI / Metabase: Visualización / Dashboard - Para reportes",
            "Algoritmos de clustering: Inteligencia Artificial / Machine Learning - Agrupación de estudiantes"
        ],
        "habilidades": [
            "Computer vision en ambientes educativos",
            "Análisis de expresiones faciales",
            "Learning analytics",
            "Sistemas multimodales de sensado",
            "Visualización de datos educativos",
            "Privacidad y anonimización de datos",
            "Diseño centrado en educadores"
        ],
        "objetivos": [
            "🎯 Objetivo General: Desarrollar un sistema de análisis de aulas inteligentes que proporcione métricas objetivas de atención, participación y engagement estudiantil para mejora de metodologías de enseñanza.",
            "📌 Objetivos Específicos:",
            "• Implementar análisis de expresiones faciales con FER para detectar confusión, aburrimiento, interés en estudiantes.",
            "• Desarrollar sistema de tracking de atención visual que determine si estudiantes miran hacia pizarra/docente.",
            "• Crear dashboards para docentes con métricas de engagement por sesión, identificación de momentos de baja atención."
        ],
        "pasos": [
            "Análisis de requisitos",
            "Diseño de la solución",
            "Implementación y pruebas",
            "Validación y sustentación"
        ],
        "aplicaciones": [
            "Educación inteligente y e-learning"
        ],
        "referencias": [],
        "hardware_tabla": [
            {
                "componente": "Raspberry Pi 4",
                "categoria": "Computadora de Placa Reducida (SBC)",
                "funcion": "Procesamiento central"
            },
            {
                "componente": "ESP32-CAM",
                "categoria": "Microcontrolador con Cámara Integrada",
                "funcion": "2-3 unidades para cobertura de aula"
            },
            {
                "componente": "Sensores de ruido",
                "categoria": "Otro Componente de Hardware",
                "funcion": "MAX4466"
            },
            {
                "componente": "Sensor de CO2 MH-Z19B",
                "categoria": "Sensor Ambiental",
                "funcion": "Calidad del aire"
            },
            {
                "componente": "Sensores PIR",
                "categoria": "Sensor de Movimiento / Posición",
                "funcion": "Detección de movimiento"
            },
            {
                "componente": "Arduino Nano",
                "categoria": "Microcontrolador",
                "funcion": "Botones de participación"
            },
            {
                "componente": "Pulsadores inalámbricos RF 433MHz",
                "categoria": "Otro Componente de Hardware",
                "funcion": "Respuestas estudiantes"
            },
            {
                "componente": "Display OLED",
                "categoria": "Interfaz de Usuario / Iluminación",
                "funcion": "Para métricas en vivo"
            },
            {
                "componente": "LEDs indicadores de niveles",
                "categoria": "Interfaz de Usuario / Iluminación",
                "funcion": "Permite la interacción, iluminación o notificación visual/sonora del sistema."
            }
        ],
        "software_tabla": [
            {
                "herramienta": "OpenCV con Dlib",
                "tipo": "Inteligencia Artificial / Machine Learning",
                "descripcion": "Detección facial"
            },
            {
                "herramienta": "FER",
                "tipo": "Herramienta / Tecnología de Software",
                "descripcion": "Facial Expression Recognition"
            },
            {
                "herramienta": "TensorFlow",
                "tipo": "Inteligencia Artificial / Machine Learning",
                "descripcion": "Para análisis de engagement"
            },
            {
                "herramienta": "Python con análisis de audio",
                "tipo": "Lenguaje de Programación",
                "descripcion": "Lenguaje utilizado para desarrollar la lógica del sistema."
            },
            {
                "herramienta": "MQTT",
                "tipo": "Protocolo de Comunicación IoT",
                "descripcion": "Para datos en tiempo real"
            },
            {
                "herramienta": "PostgreSQL",
                "tipo": "Base de Datos",
                "descripcion": "Para datos históricos"
            },
            {
                "herramienta": "Grafana",
                "tipo": "Visualización / Dashboard",
                "descripcion": "Para dashboards de docentes"
            },
            {
                "herramienta": "Power BI / Metabase",
                "tipo": "Visualización / Dashboard",
                "descripcion": "Para reportes"
            },
            {
                "herramienta": "Algoritmos de clustering",
                "tipo": "Inteligencia Artificial / Machine Learning",
                "descripcion": "Agrupación de estudiantes"
            }
        ]
    },
    {
        "id": "proj_032",
        "titulo": "📋 Proyecto 32: Sistema de Asistencia y Control de Acceso Inteligente para Aulas",
        "descripcion": "Problema: El control de asistencia manual consume tiempo administrativo valioso, genera errores de registro y retrasa comunicación con familias sobre ausentismo estudiantil.\n\nDescripción: Plataforma de control de asistencia automatizada mediante reconocimiento facial o RFID, registro de horarios, generación de reportes y alertas a padres/tutores, integrada con sistema de gestión académica. Objetivo Automatizar completamente el proceso de asistencia, reducir tiempo administrativo, generar métricas de ausentismo y facilitar comunicación con familias.",
        "area": "SBC-IoT + IoT con Visión Artificial",
        "sector": "Educación inteligente y e-learning",
        "nivel": "Intermedio",
        "duracion": "Un semestre",
        "presupuesto": "Bajo costo",
        "hardware": [
            "Raspberry Pi 3 B+ (Computadora de Placa Reducida (SBC) | Por cada punto de acceso)",
            "ESP32-CAM o Raspberry Pi Camera v2 (Cámara / Sensor de Visión | Captura imágenes o video para el módulo de visión artificial.)",
            "Módulo RFID RC522 (Módulo de Comunicación / Conectividad | Alternativa o complemento)",
            "Tarjetas RFID (Módulo de Comunicación / Conectividad | Para estudiantes)",
            "Display LCD 16x2 o 20x4 (Interfaz de Usuario / Iluminación | Permite la interacción, iluminación o notificación visual/sonora del sistema.)",
            "LEDs RGB (Interfaz de Usuario / Iluminación | Verde: acceso, rojo: denegado)",
            "Buzzer (Interfaz de Usuario / Iluminación | Para feedback sonoro)",
            "Botón de emergencia (Interfaz de Usuario / Iluminación | Permite la interacción, iluminación o notificación visual/sonora del sistema.)",
            "Relé para cerradura electrónica (Actuador | Opcional)"
        ],
        "software": [
            "OpenCV + Face Recognition library: Inteligencia Artificial / Machine Learning - Procesa datos mediante modelos de IA/ML para generar predicciones o clasificaciones.",
            "Dlib: Herramienta / Tecnología de Software - Para facial landmarks",
            "Python con SQLite/PostgreSQL: Base de Datos - Almacena los datos generados por el sistema.",
            "API REST con Flask: Framework Web / Aplicación - Provee la interfaz web o móvil del sistema.",
            "Frontend web con React o Vue.js: Framework Web / Aplicación - Provee la interfaz web o móvil del sistema.",
            "Twilio API: Herramienta / Tecnología de Software - Para SMS a padres",
            "MQTT: Protocolo de Comunicación IoT - Para sincronización",
            "Reportes con Pandas y Matplotlib: Librería / Herramienta de Análisis de Datos - Se utiliza para el procesamiento y análisis de los datos recolectados.",
            "Integración con Google Sheets: Herramienta / Tecnología de Software - Opcional; Funcionalidades del Sistema",
            "Registro de entrada y salida automatizado: Herramienta / Tecnología de Software - Tecnología de software empleada en el desarrollo del proyecto.",
            "Reconocimiento facial multi-usuario: Herramienta / Tecnología de Software - Tecnología de software empleada en el desarrollo del proyecto.",
            "RFID: Herramienta / Tecnología de Software - Usado como método alternativo",
            "Notificación inmediata a padres: Herramienta / Tecnología de Software - SMS/WhatsApp",
            "Dashboard web: Visualización / Dashboard - Para administradores",
            "Reportes de ausentismo por período: Herramienta / Tecnología de Software - Tecnología de software empleada en el desarrollo del proyecto.",
            "Alertas de llegadas tardías: Herramienta / Tecnología de Software - Tecnología de software empleada en el desarrollo del proyecto.",
            "Exportación a Excel/PDF: Herramienta / Tecnología de Software - Tecnología de software empleada en el desarrollo del proyecto.",
            "Integración con sistema académico existente: Herramienta / Tecnología de Software - Tecnología de software empleada en el desarrollo del proyecto.",
            "Modo foto: Herramienta / Tecnología de Software - Para identificación manual"
        ],
        "habilidades": [
            "Reconocimiento facial aplicado • Desarrollo de sistemas administrativos • Integración con APIs de comunicación • Diseño de bases de datos educativas • Desarrollo full-stack • Generación de reportes automáticos PROYECTOS DE GANADERÍA INTELIGENTE Y SALUD ANIMAL PROYECTOS DE GANADERÍA INTELIGENTE Y SALUD ANIMAL"
        ],
        "objetivos": [
            "🎯 Objetivo General: Implementar un sistema de control de asistencia automatizado que utilice reconocimiento facial o RFID para registro automático con notificaciones en tiempo real.",
            "📌 Objetivos Específicos:",
            "• Desarrollar sistema de reconocimiento facial con Face Recognition library que identifique estudiantes en puntos de acceso.",
            "• Implementar alternativa RFID para redundancia y casos donde reconocimiento facial falle o sea rechazado.",
            "• Crear sistema de notificaciones automáticas vía SMS/WhatsApp que alerte padres inmediatamente tras registro de entrada/salida."
        ],
        "pasos": [
            "Análisis de requisitos",
            "Diseño de la solución",
            "Implementación y pruebas",
            "Validación y sustentación"
        ],
        "aplicaciones": [
            "Educación inteligente y e-learning"
        ],
        "referencias": [],
        "hardware_tabla": [
            {
                "componente": "Raspberry Pi 3 B+",
                "categoria": "Computadora de Placa Reducida (SBC)",
                "funcion": "Por cada punto de acceso"
            },
            {
                "componente": "ESP32-CAM o Raspberry Pi Camera v2",
                "categoria": "Cámara / Sensor de Visión",
                "funcion": "Captura imágenes o video para el módulo de visión artificial."
            },
            {
                "componente": "Módulo RFID RC522",
                "categoria": "Módulo de Comunicación / Conectividad",
                "funcion": "Alternativa o complemento"
            },
            {
                "componente": "Tarjetas RFID",
                "categoria": "Módulo de Comunicación / Conectividad",
                "funcion": "Para estudiantes"
            },
            {
                "componente": "Display LCD 16x2 o 20x4",
                "categoria": "Interfaz de Usuario / Iluminación",
                "funcion": "Permite la interacción, iluminación o notificación visual/sonora del sistema."
            },
            {
                "componente": "LEDs RGB",
                "categoria": "Interfaz de Usuario / Iluminación",
                "funcion": "Verde: acceso, rojo: denegado"
            },
            {
                "componente": "Buzzer",
                "categoria": "Interfaz de Usuario / Iluminación",
                "funcion": "Para feedback sonoro"
            },
            {
                "componente": "Botón de emergencia",
                "categoria": "Interfaz de Usuario / Iluminación",
                "funcion": "Permite la interacción, iluminación o notificación visual/sonora del sistema."
            },
            {
                "componente": "Relé para cerradura electrónica",
                "categoria": "Actuador",
                "funcion": "Opcional"
            }
        ],
        "software_tabla": [
            {
                "herramienta": "OpenCV + Face Recognition library",
                "tipo": "Inteligencia Artificial / Machine Learning",
                "descripcion": "Procesa datos mediante modelos de IA/ML para generar predicciones o clasificaciones."
            },
            {
                "herramienta": "Dlib",
                "tipo": "Herramienta / Tecnología de Software",
                "descripcion": "Para facial landmarks"
            },
            {
                "herramienta": "Python con SQLite/PostgreSQL",
                "tipo": "Base de Datos",
                "descripcion": "Almacena los datos generados por el sistema."
            },
            {
                "herramienta": "API REST con Flask",
                "tipo": "Framework Web / Aplicación",
                "descripcion": "Provee la interfaz web o móvil del sistema."
            },
            {
                "herramienta": "Frontend web con React o Vue.js",
                "tipo": "Framework Web / Aplicación",
                "descripcion": "Provee la interfaz web o móvil del sistema."
            },
            {
                "herramienta": "Twilio API",
                "tipo": "Herramienta / Tecnología de Software",
                "descripcion": "Para SMS a padres"
            },
            {
                "herramienta": "MQTT",
                "tipo": "Protocolo de Comunicación IoT",
                "descripcion": "Para sincronización"
            },
            {
                "herramienta": "Reportes con Pandas y Matplotlib",
                "tipo": "Librería / Herramienta de Análisis de Datos",
                "descripcion": "Se utiliza para el procesamiento y análisis de los datos recolectados."
            },
            {
                "herramienta": "Integración con Google Sheets",
                "tipo": "Herramienta / Tecnología de Software",
                "descripcion": "Opcional; Funcionalidades del Sistema"
            },
            {
                "herramienta": "Registro de entrada y salida automatizado",
                "tipo": "Herramienta / Tecnología de Software",
                "descripcion": "Tecnología de software empleada en el desarrollo del proyecto."
            },
            {
                "herramienta": "Reconocimiento facial multi-usuario",
                "tipo": "Herramienta / Tecnología de Software",
                "descripcion": "Tecnología de software empleada en el desarrollo del proyecto."
            },
            {
                "herramienta": "RFID",
                "tipo": "Herramienta / Tecnología de Software",
                "descripcion": "Usado como método alternativo"
            },
            {
                "herramienta": "Notificación inmediata a padres",
                "tipo": "Herramienta / Tecnología de Software",
                "descripcion": "SMS/WhatsApp"
            },
            {
                "herramienta": "Dashboard web",
                "tipo": "Visualización / Dashboard",
                "descripcion": "Para administradores"
            },
            {
                "herramienta": "Reportes de ausentismo por período",
                "tipo": "Herramienta / Tecnología de Software",
                "descripcion": "Tecnología de software empleada en el desarrollo del proyecto."
            },
            {
                "herramienta": "Alertas de llegadas tardías",
                "tipo": "Herramienta / Tecnología de Software",
                "descripcion": "Tecnología de software empleada en el desarrollo del proyecto."
            },
            {
                "herramienta": "Exportación a Excel/PDF",
                "tipo": "Herramienta / Tecnología de Software",
                "descripcion": "Tecnología de software empleada en el desarrollo del proyecto."
            },
            {
                "herramienta": "Integración con sistema académico existente",
                "tipo": "Herramienta / Tecnología de Software",
                "descripcion": "Tecnología de software empleada en el desarrollo del proyecto."
            },
            {
                "herramienta": "Modo foto",
                "tipo": "Herramienta / Tecnología de Software",
                "descripcion": "Para identificación manual"
            }
        ]
    },
    {
        "id": "proj_033",
        "titulo": "🐄 Proyecto 33: Monitor de Salud Animal con Collar IoT para Ganadería",
        "descripcion": "Problema: Las enfermedades en ganado se detectan tardíamente cuando síntomas son evidentes, generando pérdidas económicas por mortalidad, costos veterinarios y pérdida de productividad.\n\nDescripción: Collar inteligente para ganado bovino que monitorea temperatura corporal, actividad, rumia y ubicación GPS, detectando tempranamente enfermedades, celos y comportamientos anormales mediante machine learning. Objetivo Detección temprana de enfermedades, optimización de reproducción mediante detección de celos, prevención de pérdidas y mejora del bienestar animal con monitoreo continuo.",
        "area": "SBC-IoT + AIoT",
        "sector": "Ganadería inteligente y salud animal",
        "nivel": "Intermedio-Avanzado",
        "duracion": "Un semestre",
        "presupuesto": "Bajo costo",
        "hardware": [
            "ESP32 (Microcontrolador | Módulo principal del collar)",
            "Acelerómetro MPU6050 (Sensor de Movimiento / Posición | Actividad y rumia)",
            "Sensor de temperatura MLX90614 (Sensor Ambiental | Sin contacto corporal)",
            "GPS NEO-6M (Módulo de Comunicación / Conectividad | Geolocalización)",
            "Módulo LoRa SX1278 (Módulo de Comunicación / Conectividad | Comunicación larga distancia)",
            "Batería LiPo 3.7V 5000mAh (Fuente de Alimentación / Energía | Suministra energía eléctrica a los componentes del sistema.)",
            "Panel solar flexible 5V (Fuente de Alimentación / Energía | Recarga)",
            "Carcasa resistente a golpes e impermeable (Estructura / Componente Mecánico | Brinda soporte físico o estructural al prototipo.)",
            "Raspberry Pi 3 B+ (Computadora de Placa Reducida (SBC) | Estación base)",
            "Antena LoRa (Módulo de Comunicación / Conectividad | Para mayor alcance)"
        ],
        "software": [
            "Python con scikit-learn: Inteligencia Artificial / Machine Learning - Procesa datos mediante modelos de IA/ML para generar predicciones o clasificaciones.",
            "Isolation Forest, Random Forest: Inteligencia Artificial / Machine Learning - Algoritmos",
            "LoRaWAN protocol stack: Protocolo de Comunicación IoT - Define el estándar de comunicación de datos entre dispositivos.",
            "InfluxDB: Base de Datos - Para series temporales",
            "Grafana: Visualización / Dashboard - Para monitoreo",
            "Node-RED: Automatización / Orquestación - Para alertas",
            "Análisis de patrones de rumia: Librería / Herramienta de Análisis de Datos - Se utiliza para el procesamiento y análisis de los datos recolectados.",
            "Algoritmo de detección de celos: Inteligencia Artificial / Machine Learning - Procesa datos mediante modelos de IA/ML para generar predicciones o clasificaciones.",
            "Geofencing con alertas: Herramienta / Tecnología de Software - Tecnología de software empleada en el desarrollo del proyecto."
        ],
        "habilidades": [
            "IoT para aplicaciones pecuarias",
            "Comunicación LoRa de largo alcance",
            "Machine learning para salud animal",
            "Diseño de wearables resistentes",
            "Energía solar en dispositivos IoT",
            "Análisis de comportamiento animal",
            "Sistemas de geolocalización"
        ],
        "objetivos": [
            "🎯 Objetivo General: Desarrollar un collar inteligente para ganado bovino que monitoree continuamente salud, comportamiento y ubicación para detección temprana de problemas y optimización reproductiva.",
            "📌 Objetivos Específicos:",
            "• Implementar sensores de temperatura, acelerómetro y GPS en collar resistente con comunicación LoRa de largo alcance.",
            "• Desarrollar algoritmos de detección de celo (hiperactividad) y enfermedad (fiebre, reducción de rumia) con machine learning.",
            "• Crear plataforma de gestión ganadera que registre historiales individuales y genere alertas veterinarias automáticas."
        ],
        "pasos": [
            "Análisis de requisitos",
            "Diseño de la solución",
            "Implementación y pruebas",
            "Validación y sustentación"
        ],
        "aplicaciones": [
            "Ganadería inteligente y salud animal"
        ],
        "referencias": [],
        "hardware_tabla": [
            {
                "componente": "ESP32",
                "categoria": "Microcontrolador",
                "funcion": "Módulo principal del collar"
            },
            {
                "componente": "Acelerómetro MPU6050",
                "categoria": "Sensor de Movimiento / Posición",
                "funcion": "Actividad y rumia"
            },
            {
                "componente": "Sensor de temperatura MLX90614",
                "categoria": "Sensor Ambiental",
                "funcion": "Sin contacto corporal"
            },
            {
                "componente": "GPS NEO-6M",
                "categoria": "Módulo de Comunicación / Conectividad",
                "funcion": "Geolocalización"
            },
            {
                "componente": "Módulo LoRa SX1278",
                "categoria": "Módulo de Comunicación / Conectividad",
                "funcion": "Comunicación larga distancia"
            },
            {
                "componente": "Batería LiPo 3.7V 5000mAh",
                "categoria": "Fuente de Alimentación / Energía",
                "funcion": "Suministra energía eléctrica a los componentes del sistema."
            },
            {
                "componente": "Panel solar flexible 5V",
                "categoria": "Fuente de Alimentación / Energía",
                "funcion": "Recarga"
            },
            {
                "componente": "Carcasa resistente a golpes e impermeable",
                "categoria": "Estructura / Componente Mecánico",
                "funcion": "Brinda soporte físico o estructural al prototipo."
            },
            {
                "componente": "Raspberry Pi 3 B+",
                "categoria": "Computadora de Placa Reducida (SBC)",
                "funcion": "Estación base"
            },
            {
                "componente": "Antena LoRa",
                "categoria": "Módulo de Comunicación / Conectividad",
                "funcion": "Para mayor alcance"
            }
        ],
        "software_tabla": [
            {
                "herramienta": "Python con scikit-learn",
                "tipo": "Inteligencia Artificial / Machine Learning",
                "descripcion": "Procesa datos mediante modelos de IA/ML para generar predicciones o clasificaciones."
            },
            {
                "herramienta": "Isolation Forest, Random Forest",
                "tipo": "Inteligencia Artificial / Machine Learning",
                "descripcion": "Algoritmos"
            },
            {
                "herramienta": "LoRaWAN protocol stack",
                "tipo": "Protocolo de Comunicación IoT",
                "descripcion": "Define el estándar de comunicación de datos entre dispositivos."
            },
            {
                "herramienta": "InfluxDB",
                "tipo": "Base de Datos",
                "descripcion": "Para series temporales"
            },
            {
                "herramienta": "Grafana",
                "tipo": "Visualización / Dashboard",
                "descripcion": "Para monitoreo"
            },
            {
                "herramienta": "Node-RED",
                "tipo": "Automatización / Orquestación",
                "descripcion": "Para alertas"
            },
            {
                "herramienta": "Análisis de patrones de rumia",
                "tipo": "Librería / Herramienta de Análisis de Datos",
                "descripcion": "Se utiliza para el procesamiento y análisis de los datos recolectados."
            },
            {
                "herramienta": "Algoritmo de detección de celos",
                "tipo": "Inteligencia Artificial / Machine Learning",
                "descripcion": "Procesa datos mediante modelos de IA/ML para generar predicciones o clasificaciones."
            },
            {
                "herramienta": "Geofencing con alertas",
                "tipo": "Herramienta / Tecnología de Software",
                "descripcion": "Tecnología de software empleada en el desarrollo del proyecto."
            }
        ]
    },
    {
        "id": "proj_034",
        "titulo": "🥛 Proyecto 34: Sistema de Ordeño Inteligente con Monitoreo de Calidad de Leche",
        "descripcion": "Problema: La mastitis es la enfermedad más costosa en lecherías, afectando calidad de leche y producción, pero su detección clínica es tardía cuando infección ya está avanzada.\n\nDescripción: Sistema automatizado que monitorea producción de leche por animal, detecta mastitis mediante análisis de conductividad eléctrica, registra temperatura y genera reportes de producción y calidad. Objetivo Optimizar producción lechera, detectar tempranamente mastitis (principal enfermedad en lecherías), llevar registro individual de producción y mejorar calidad del producto.",
        "area": "SBC-IoT + IoT con Analítica",
        "sector": "Ganadería inteligente y salud animal",
        "nivel": "Avanzado",
        "duracion": "Un semestre",
        "presupuesto": "Bajo costo",
        "hardware": [
            "Raspberry Pi 3 B+ (Computadora de Placa Reducida (SBC) | Actúa como unidad de procesamiento central o gateway del sistema.)",
            "ESP32 (Microcontrolador | Por cada punto de ordeño)",
            "Sensor de flujo YF-S201 (Otro Componente de Hardware | Medición de volumen)",
            "Sensor de conductividad eléctrica (Otro Componente de Hardware | TDS/EC)",
            "Sensor de temperatura DS18B20 waterproof (Sensor Ambiental | Mide variables ambientales relevantes para el sistema.)",
            "Módulo RFID RC522 (Módulo de Comunicación / Conectividad | Identificación de vacas)",
            "Tags RFID (Módulo de Comunicación / Conectividad | Para collares)",
            "Display LCD 20x4 con I2C (Interfaz de Usuario / Iluminación | Permite la interacción, iluminación o notificación visual/sonora del sistema.)",
            "Relés (Actuador | Para automatización de válvulas)",
            "Celdas de carga (Otro Componente de Hardware | Peso opcional)",
            "Electroválvulas 12V (Actuador | Ejecuta una acción física en respuesta a las decisiones del sistema.)"
        ],
        "software": [
            "Python con GPIO: Lenguaje de Programación - Lenguaje utilizado para desarrollar la lógica del sistema.",
            "PostgreSQL: Base de Datos - Para registro de producción",
            "Grafana: Visualización / Dashboard - Para dashboards de producción",
            "MQTT: Protocolo de Comunicación IoT - Para datos en tiempo real",
            "Node-RED: Automatización / Orquestación - Para automatización",
            "Algoritmos de detección de anomalías: Inteligencia Artificial / Machine Learning - Procesa datos mediante modelos de IA/ML para generar predicciones o clasificaciones.",
            "Pandas: Librería / Herramienta de Análisis de Datos - Para análisis de tendencias",
            "Reportes automáticos en PDF: Herramienta / Tecnología de Software - Tecnología de software empleada en el desarrollo del proyecto.",
            "API REST: Framework Web / Aplicación - Para app móvil Parámetros de Calidad Monitoreados",
            "Volumen de leche por ordeño: Herramienta / Tecnología de Software - Litros",
            "Conductividad eléctrica: Herramienta / Tecnología de Software - Detección de mastitis",
            "Temperatura de la leche: Herramienta / Tecnología de Software - Tecnología de software empleada en el desarrollo del proyecto.",
            "Tiempo de ordeño por animal: Herramienta / Tecnología de Software - Tecnología de software empleada en el desarrollo del proyecto.",
            "Producción total diaria/semanal/mensual: Herramienta / Tecnología de Software - Tecnología de software empleada en el desarrollo del proyecto.",
            "Comparativa entre animales: Herramienta / Tecnología de Software - Tecnología de software empleada en el desarrollo del proyecto.",
            "Tendencias de producción individual: Herramienta / Tecnología de Software - Tecnología de software empleada en el desarrollo del proyecto.",
            "Detección de cuartos afectados: Herramienta / Tecnología de Software - Tecnología de software empleada en el desarrollo del proyecto."
        ],
        "habilidades": [
            "Automatización de procesos agroindustriales • Sensores de calidad de alimentos • Identificación RFID en ganadería",
            "Análisis de producción agropecuaria • Sistemas de control de calidad • Trazabilidad en cadena láctea PROYECTOS DE LOGÍSTICA INTELIGENTE Y CADENA DE FRÍO PROYECTOS DE LOGÍSTICA INTELIGENTE Y CADENA DE FRÍO"
        ],
        "objetivos": [
            "🎯 Objetivo General: Desarrollar un sistema de ordeño inteligente que monitoree producción individual, detecte mastitis tempranamente mediante conductividad eléctrica y registre calidad de leche.",
            "📌 Objetivos Específicos:",
            "• Implementar sensores de flujo, conductividad y temperatura que monitoreen cada ordeño con identificación RFID de animales.",
            "• Desarrollar algoritmo de detección de mastitis basado en aumento de conductividad eléctrica en leche infectada.",
            "• Crear reportes de producción individual que identifiquen animales de bajo rendimiento y tendencias de calidad láctea."
        ],
        "pasos": [
            "Análisis de requisitos",
            "Diseño de la solución",
            "Implementación y pruebas",
            "Validación y sustentación"
        ],
        "aplicaciones": [
            "Ganadería inteligente y salud animal"
        ],
        "referencias": [],
        "hardware_tabla": [
            {
                "componente": "Raspberry Pi 3 B+",
                "categoria": "Computadora de Placa Reducida (SBC)",
                "funcion": "Actúa como unidad de procesamiento central o gateway del sistema."
            },
            {
                "componente": "ESP32",
                "categoria": "Microcontrolador",
                "funcion": "Por cada punto de ordeño"
            },
            {
                "componente": "Sensor de flujo YF-S201",
                "categoria": "Otro Componente de Hardware",
                "funcion": "Medición de volumen"
            },
            {
                "componente": "Sensor de conductividad eléctrica",
                "categoria": "Otro Componente de Hardware",
                "funcion": "TDS/EC"
            },
            {
                "componente": "Sensor de temperatura DS18B20 waterproof",
                "categoria": "Sensor Ambiental",
                "funcion": "Mide variables ambientales relevantes para el sistema."
            },
            {
                "componente": "Módulo RFID RC522",
                "categoria": "Módulo de Comunicación / Conectividad",
                "funcion": "Identificación de vacas"
            },
            {
                "componente": "Tags RFID",
                "categoria": "Módulo de Comunicación / Conectividad",
                "funcion": "Para collares"
            },
            {
                "componente": "Display LCD 20x4 con I2C",
                "categoria": "Interfaz de Usuario / Iluminación",
                "funcion": "Permite la interacción, iluminación o notificación visual/sonora del sistema."
            },
            {
                "componente": "Relés",
                "categoria": "Actuador",
                "funcion": "Para automatización de válvulas"
            },
            {
                "componente": "Celdas de carga",
                "categoria": "Otro Componente de Hardware",
                "funcion": "Peso opcional"
            },
            {
                "componente": "Electroválvulas 12V",
                "categoria": "Actuador",
                "funcion": "Ejecuta una acción física en respuesta a las decisiones del sistema."
            }
        ],
        "software_tabla": [
            {
                "herramienta": "Python con GPIO",
                "tipo": "Lenguaje de Programación",
                "descripcion": "Lenguaje utilizado para desarrollar la lógica del sistema."
            },
            {
                "herramienta": "PostgreSQL",
                "tipo": "Base de Datos",
                "descripcion": "Para registro de producción"
            },
            {
                "herramienta": "Grafana",
                "tipo": "Visualización / Dashboard",
                "descripcion": "Para dashboards de producción"
            },
            {
                "herramienta": "MQTT",
                "tipo": "Protocolo de Comunicación IoT",
                "descripcion": "Para datos en tiempo real"
            },
            {
                "herramienta": "Node-RED",
                "tipo": "Automatización / Orquestación",
                "descripcion": "Para automatización"
            },
            {
                "herramienta": "Algoritmos de detección de anomalías",
                "tipo": "Inteligencia Artificial / Machine Learning",
                "descripcion": "Procesa datos mediante modelos de IA/ML para generar predicciones o clasificaciones."
            },
            {
                "herramienta": "Pandas",
                "tipo": "Librería / Herramienta de Análisis de Datos",
                "descripcion": "Para análisis de tendencias"
            },
            {
                "herramienta": "Reportes automáticos en PDF",
                "tipo": "Herramienta / Tecnología de Software",
                "descripcion": "Tecnología de software empleada en el desarrollo del proyecto."
            },
            {
                "herramienta": "API REST",
                "tipo": "Framework Web / Aplicación",
                "descripcion": "Para app móvil Parámetros de Calidad Monitoreados"
            },
            {
                "herramienta": "Volumen de leche por ordeño",
                "tipo": "Herramienta / Tecnología de Software",
                "descripcion": "Litros"
            },
            {
                "herramienta": "Conductividad eléctrica",
                "tipo": "Herramienta / Tecnología de Software",
                "descripcion": "Detección de mastitis"
            },
            {
                "herramienta": "Temperatura de la leche",
                "tipo": "Herramienta / Tecnología de Software",
                "descripcion": "Tecnología de software empleada en el desarrollo del proyecto."
            },
            {
                "herramienta": "Tiempo de ordeño por animal",
                "tipo": "Herramienta / Tecnología de Software",
                "descripcion": "Tecnología de software empleada en el desarrollo del proyecto."
            },
            {
                "herramienta": "Producción total diaria/semanal/mensual",
                "tipo": "Herramienta / Tecnología de Software",
                "descripcion": "Tecnología de software empleada en el desarrollo del proyecto."
            },
            {
                "herramienta": "Comparativa entre animales",
                "tipo": "Herramienta / Tecnología de Software",
                "descripcion": "Tecnología de software empleada en el desarrollo del proyecto."
            },
            {
                "herramienta": "Tendencias de producción individual",
                "tipo": "Herramienta / Tecnología de Software",
                "descripcion": "Tecnología de software empleada en el desarrollo del proyecto."
            },
            {
                "herramienta": "Detección de cuartos afectados",
                "tipo": "Herramienta / Tecnología de Software",
                "descripcion": "Tecnología de software empleada en el desarrollo del proyecto."
            }
        ]
    },
    {
        "id": "proj_035",
        "titulo": "❄️ Proyecto 35: Sistema de Monitoreo de Cadena de Frío para Transporte de Alimentos",
        "descripcion": "Problema: La ruptura de cadena de frío en transporte de alimentos perecederos genera pérdidas económicas y riesgos de salud pública, pero falta evidencia documentada de cumplimiento.\n\nDescripción: Sistema de monitoreo continuo de temperatura y humedad en vehículos de transporte refrigerado, con GPS, alertas en tiempo real y generación de reportes de cumplimiento para cadena de frío. Objetivo Garantizar integridad de productos perecederos durante transporte, generar evidencia de cumplimiento de normativas de cadena de frío y prevenir pérdidas por ruptura de temperatura.",
        "area": "SBC-IoT + IoT con Analítica",
        "sector": "Logística inteligente y cadena de frío",
        "nivel": "Intermedio",
        "duracion": "Un semestre",
        "presupuesto": "Bajo costo",
        "hardware": [
            "ESP32 (Microcontrolador | Módulo principal del vehículo)",
            "Sensores DHT22 (Sensor Ambiental | Mide variables ambientales relevantes para el sistema (3 unidades en diferentes puntos).)",
            "GPS NEO-6M (Módulo de Comunicación / Conectividad | Permite la transmisión inalámbrica de datos entre dispositivos.)",
            "Módulo GSM SIM800L (Módulo de Comunicación / Conectividad | Transmisión remota)",
            "Acelerómetro (Sensor de Movimiento / Posición | Detección de golpes)",
            "Sensor de puerta (Otro Componente de Hardware | Apertura de caja)",
            "Display OLED (Interfaz de Usuario / Iluminación | Para conductor)",
            "Batería backup con sensor de corte de energía (Fuente de Alimentación / Energía | Suministra energía eléctrica a los componentes del sistema.)",
            "Buzzer de alerta (Interfaz de Usuario / Iluminación | Permite la interacción, iluminación o notificación visual/sonora del sistema.)",
            "Raspberry Pi 3 B+ (Computadora de Placa Reducida (SBC) | Centro de control en bodega)",
            "SD card (Otro Componente de Hardware | Para logs offline)"
        ],
        "software": [
            "Python con MQTT: Protocolo de Comunicación IoT - Define el estándar de comunicación de datos entre dispositivos.",
            "InfluxDB: Base de Datos - Para datos de rutas",
            "Grafana: Visualización / Dashboard - Para visualización",
            "API REST: Framework Web / Aplicación - Para consultas",
            "Geolocalización en tiempo real: Herramienta / Tecnología de Software - Tecnología de software empleada en el desarrollo del proyecto.",
            "ThingSpeak o similar: Plataforma / Servicio Cloud IoT - Ofrece servicios en la nube para la gestión de los dispositivos IoT.",
            "Generación automática de certificados: Herramienta / Tecnología de Software - Tecnología de software empleada en el desarrollo del proyecto.",
            "Alertas por SMS/Email: Herramienta / Tecnología de Software - Tecnología de software empleada en el desarrollo del proyecto.",
            "Mapas interactivos con Folium: Herramienta / Tecnología de Software - Tecnología de software empleada en el desarrollo del proyecto."
        ],
        "habilidades": [
            "Monitoreo de cadena de frío",
            "Telemetría vehicular",
            "Cumplimiento de normativas alimentarias",
            "Sistemas de trazabilidad",
            "Comunicación GSM/GPRS",
            "Generación de certificados de temperatura"
        ],
        "objetivos": [
            "🎯 Objetivo General: Implementar un sistema de monitoreo de cadena de frío en vehículos de transporte que garantice integridad de productos perecederos con trazabilidad completa.",
            "📌 Objetivos Específicos:",
            "• Desplegar sensores de temperatura/humedad con GPS en vehículos refrigerados con transmisión GSM en tiempo real.",
            "• Desarrollar sistema de alertas que notifique inmediatamente ante excursiones de temperatura fuera de rango permitido.",
            "• Automatizar generación de certificados de temperatura con gráficos de ruta y evidencia de cumplimiento normativo."
        ],
        "pasos": [
            "Análisis de requisitos",
            "Diseño de la solución",
            "Implementación y pruebas",
            "Validación y sustentación"
        ],
        "aplicaciones": [
            "Logística inteligente y cadena de frío"
        ],
        "referencias": [],
        "hardware_tabla": [
            {
                "componente": "ESP32",
                "categoria": "Microcontrolador",
                "funcion": "Módulo principal del vehículo"
            },
            {
                "componente": "Sensores DHT22",
                "categoria": "Sensor Ambiental",
                "funcion": "Mide variables ambientales relevantes para el sistema (3 unidades en diferentes puntos)."
            },
            {
                "componente": "GPS NEO-6M",
                "categoria": "Módulo de Comunicación / Conectividad",
                "funcion": "Permite la transmisión inalámbrica de datos entre dispositivos."
            },
            {
                "componente": "Módulo GSM SIM800L",
                "categoria": "Módulo de Comunicación / Conectividad",
                "funcion": "Transmisión remota"
            },
            {
                "componente": "Acelerómetro",
                "categoria": "Sensor de Movimiento / Posición",
                "funcion": "Detección de golpes"
            },
            {
                "componente": "Sensor de puerta",
                "categoria": "Otro Componente de Hardware",
                "funcion": "Apertura de caja"
            },
            {
                "componente": "Display OLED",
                "categoria": "Interfaz de Usuario / Iluminación",
                "funcion": "Para conductor"
            },
            {
                "componente": "Batería backup con sensor de corte de energía",
                "categoria": "Fuente de Alimentación / Energía",
                "funcion": "Suministra energía eléctrica a los componentes del sistema."
            },
            {
                "componente": "Buzzer de alerta",
                "categoria": "Interfaz de Usuario / Iluminación",
                "funcion": "Permite la interacción, iluminación o notificación visual/sonora del sistema."
            },
            {
                "componente": "Raspberry Pi 3 B+",
                "categoria": "Computadora de Placa Reducida (SBC)",
                "funcion": "Centro de control en bodega"
            },
            {
                "componente": "SD card",
                "categoria": "Otro Componente de Hardware",
                "funcion": "Para logs offline"
            }
        ],
        "software_tabla": [
            {
                "herramienta": "Python con MQTT",
                "tipo": "Protocolo de Comunicación IoT",
                "descripcion": "Define el estándar de comunicación de datos entre dispositivos."
            },
            {
                "herramienta": "InfluxDB",
                "tipo": "Base de Datos",
                "descripcion": "Para datos de rutas"
            },
            {
                "herramienta": "Grafana",
                "tipo": "Visualización / Dashboard",
                "descripcion": "Para visualización"
            },
            {
                "herramienta": "API REST",
                "tipo": "Framework Web / Aplicación",
                "descripcion": "Para consultas"
            },
            {
                "herramienta": "Geolocalización en tiempo real",
                "tipo": "Herramienta / Tecnología de Software",
                "descripcion": "Tecnología de software empleada en el desarrollo del proyecto."
            },
            {
                "herramienta": "ThingSpeak o similar",
                "tipo": "Plataforma / Servicio Cloud IoT",
                "descripcion": "Ofrece servicios en la nube para la gestión de los dispositivos IoT."
            },
            {
                "herramienta": "Generación automática de certificados",
                "tipo": "Herramienta / Tecnología de Software",
                "descripcion": "Tecnología de software empleada en el desarrollo del proyecto."
            },
            {
                "herramienta": "Alertas por SMS/Email",
                "tipo": "Herramienta / Tecnología de Software",
                "descripcion": "Tecnología de software empleada en el desarrollo del proyecto."
            },
            {
                "herramienta": "Mapas interactivos con Folium",
                "tipo": "Herramienta / Tecnología de Software",
                "descripcion": "Tecnología de software empleada en el desarrollo del proyecto."
            }
        ]
    },
    {
        "id": "proj_036",
        "titulo": "📦 Proyecto 36: Sistema de Inventario Inteligente con RFID y Visión Artificial",
        "descripcion": "Problema: La gestión manual de inventarios genera errores de conteo, pérdidas por falta de trazabilidad y procesos lentos de recepción/despacho que afectan eficiencia logística.\n\nDescripción: Plataforma de gestión de inventario que combina lectores RFID para rastreo de productos y visión artificial para verificación visual, conteo automatizado y detección de productos dañados o mal ubicados. Objetivo Automatizar gestión de inventarios, reducir errores humanos, acelerar procesos de recepción/despacho y mantener trazabilidad completa de productos en almacén.",
        "area": "SBC-IoT + IoT con Visión Artificial",
        "sector": "Logística inteligente y cadena de suministro",
        "nivel": "Avanzado",
        "duracion": "Un semestre",
        "presupuesto": "Bajo costo",
        "hardware": [
            "Raspberry Pi 4 (Computadora de Placa Reducida (SBC) | Actúa como unidad de procesamiento central o gateway del sistema.)",
            "Módulo RFID RC522 o PN532 (Módulo de Comunicación / Conectividad | Lectura NFC)",
            "Antena RFID de largo alcance (Módulo de Comunicación / Conectividad | Opcional)",
            "Tags RFID pasivos (Módulo de Comunicación / Conectividad | Por producto)",
            "ESP32-CAM (Microcontrolador con Cámara Integrada | Múltiples puntos del almacén)",
            "Raspberry Pi Camera v2 (Cámara / Sensor de Visión | Captura imágenes o video para el módulo de visión artificial.)",
            "Arduino Nano (Microcontrolador | Control de barriers/puertas)",
            "Servomotores (Actuador | Puertas automáticas)",
            "LEDs indicadores de estado (Interfaz de Usuario / Iluminación | Permite la interacción, iluminación o notificación visual/sonora del sistema.)",
            "Scanner de código de barras USB (Otro Componente de Hardware | Complemento)",
            "Display táctil 7\" (Interfaz de Usuario / Iluminación | Para interfaz)"
        ],
        "software": [
            "Python con nfcpy o SPI-Py: Lenguaje de Programación - Lenguaje utilizado para desarrollar la lógica del sistema.",
            "OpenCV: Inteligencia Artificial / Machine Learning - Para inspección visual",
            "TensorFlow Lite: Inteligencia Artificial / Machine Learning - Para clasificación",
            "OCR con Tesseract: Herramienta / Tecnología de Software - Lectura de etiquetas",
            "PostgreSQL: Base de Datos - Para base de datos",
            "API REST con FastAPI: Framework Web / Aplicación - Provee la interfaz web o móvil del sistema.",
            "Frontend con React.js: Framework Web / Aplicación - Provee la interfaz web o móvil del sistema.",
            "MQTT: Protocolo de Comunicación IoT - Para sincronización",
            "ZBar: Herramienta / Tecnología de Software - Para códigos de barras",
            "Sistema de notificaciones push Funcionalidades del Sistema: Herramienta / Tecnología de Software - Tecnología de software empleada en el desarrollo del proyecto.",
            "Lectura masiva de tags RFID: Herramienta / Tecnología de Software - Entrada/salida",
            "Verificación visual de productos: Herramienta / Tecnología de Software - Tecnología de software empleada en el desarrollo del proyecto.",
            "Conteo automatizado con visión artificial: Herramienta / Tecnología de Software - Tecnología de software empleada en el desarrollo del proyecto.",
            "Detección de productos dañados: Herramienta / Tecnología de Software - Tecnología de software empleada en el desarrollo del proyecto.",
            "Localización en tiempo real de items: Herramienta / Tecnología de Software - Tecnología de software empleada en el desarrollo del proyecto.",
            "Alertas de stock bajo: Herramienta / Tecnología de Software - Tecnología de software empleada en el desarrollo del proyecto.",
            "Auditorías automáticas de inventario: Herramienta / Tecnología de Software - Tecnología de software empleada en el desarrollo del proyecto.",
            "Integración con ERP/WMS: Herramienta / Tecnología de Software - Tecnología de software empleada en el desarrollo del proyecto.",
            "Reportes de rotación de productos: Herramienta / Tecnología de Software - Tecnología de software empleada en el desarrollo del proyecto.",
            "Trazabilidad de lote completa: Herramienta / Tecnología de Software - Tecnología de software empleada en el desarrollo del proyecto."
        ],
        "habilidades": [
            "Tecnología RFID aplicada • Sistemas de gestión de almacenes • Computer vision para logística • Desarrollo de sistemas ERP • Automatización de procesos logísticos • Integración de múltiples tecnologías PROYECTOS DE APICULTURA INTELIGENTE Y CONSERVACIÓN PROYECTOS DE APICULTURA INTELIGENTE Y CONSERVACIÓN"
        ],
        "objetivos": [
            "🎯 Objetivo General: Desarrollar una plataforma de gestión de inventarios que integre tecnología RFID y visión artificial para automatización completa de control de stock.",
            "📌 Objetivos Específicos:",
            "• Implementar lectores RFID en puntos de entrada/salida con tags en productos para rastreo automatizado de movimientos.",
            "• Desarrollar sistema de visión artificial que verifique condición de productos y detecte daños o mal ubicación.",
            "• Crear integración con sistemas ERP mediante API REST para sincronización automática de inventarios."
        ],
        "pasos": [
            "Análisis de requisitos",
            "Diseño de la solución",
            "Implementación y pruebas",
            "Validación y sustentación"
        ],
        "aplicaciones": [
            "Logística inteligente y cadena de suministro"
        ],
        "referencias": [],
        "hardware_tabla": [
            {
                "componente": "Raspberry Pi 4",
                "categoria": "Computadora de Placa Reducida (SBC)",
                "funcion": "Actúa como unidad de procesamiento central o gateway del sistema."
            },
            {
                "componente": "Módulo RFID RC522 o PN532",
                "categoria": "Módulo de Comunicación / Conectividad",
                "funcion": "Lectura NFC"
            },
            {
                "componente": "Antena RFID de largo alcance",
                "categoria": "Módulo de Comunicación / Conectividad",
                "funcion": "Opcional"
            },
            {
                "componente": "Tags RFID pasivos",
                "categoria": "Módulo de Comunicación / Conectividad",
                "funcion": "Por producto"
            },
            {
                "componente": "ESP32-CAM",
                "categoria": "Microcontrolador con Cámara Integrada",
                "funcion": "Múltiples puntos del almacén"
            },
            {
                "componente": "Raspberry Pi Camera v2",
                "categoria": "Cámara / Sensor de Visión",
                "funcion": "Captura imágenes o video para el módulo de visión artificial."
            },
            {
                "componente": "Arduino Nano",
                "categoria": "Microcontrolador",
                "funcion": "Control de barriers/puertas"
            },
            {
                "componente": "Servomotores",
                "categoria": "Actuador",
                "funcion": "Puertas automáticas"
            },
            {
                "componente": "LEDs indicadores de estado",
                "categoria": "Interfaz de Usuario / Iluminación",
                "funcion": "Permite la interacción, iluminación o notificación visual/sonora del sistema."
            },
            {
                "componente": "Scanner de código de barras USB",
                "categoria": "Otro Componente de Hardware",
                "funcion": "Complemento"
            },
            {
                "componente": "Display táctil 7\"",
                "categoria": "Interfaz de Usuario / Iluminación",
                "funcion": "Para interfaz"
            }
        ],
        "software_tabla": [
            {
                "herramienta": "Python con nfcpy o SPI-Py",
                "tipo": "Lenguaje de Programación",
                "descripcion": "Lenguaje utilizado para desarrollar la lógica del sistema."
            },
            {
                "herramienta": "OpenCV",
                "tipo": "Inteligencia Artificial / Machine Learning",
                "descripcion": "Para inspección visual"
            },
            {
                "herramienta": "TensorFlow Lite",
                "tipo": "Inteligencia Artificial / Machine Learning",
                "descripcion": "Para clasificación"
            },
            {
                "herramienta": "OCR con Tesseract",
                "tipo": "Herramienta / Tecnología de Software",
                "descripcion": "Lectura de etiquetas"
            },
            {
                "herramienta": "PostgreSQL",
                "tipo": "Base de Datos",
                "descripcion": "Para base de datos"
            },
            {
                "herramienta": "API REST con FastAPI",
                "tipo": "Framework Web / Aplicación",
                "descripcion": "Provee la interfaz web o móvil del sistema."
            },
            {
                "herramienta": "Frontend con React.js",
                "tipo": "Framework Web / Aplicación",
                "descripcion": "Provee la interfaz web o móvil del sistema."
            },
            {
                "herramienta": "MQTT",
                "tipo": "Protocolo de Comunicación IoT",
                "descripcion": "Para sincronización"
            },
            {
                "herramienta": "ZBar",
                "tipo": "Herramienta / Tecnología de Software",
                "descripcion": "Para códigos de barras"
            },
            {
                "herramienta": "Sistema de notificaciones push Funcionalidades del Sistema",
                "tipo": "Herramienta / Tecnología de Software",
                "descripcion": "Tecnología de software empleada en el desarrollo del proyecto."
            },
            {
                "herramienta": "Lectura masiva de tags RFID",
                "tipo": "Herramienta / Tecnología de Software",
                "descripcion": "Entrada/salida"
            },
            {
                "herramienta": "Verificación visual de productos",
                "tipo": "Herramienta / Tecnología de Software",
                "descripcion": "Tecnología de software empleada en el desarrollo del proyecto."
            },
            {
                "herramienta": "Conteo automatizado con visión artificial",
                "tipo": "Herramienta / Tecnología de Software",
                "descripcion": "Tecnología de software empleada en el desarrollo del proyecto."
            },
            {
                "herramienta": "Detección de productos dañados",
                "tipo": "Herramienta / Tecnología de Software",
                "descripcion": "Tecnología de software empleada en el desarrollo del proyecto."
            },
            {
                "herramienta": "Localización en tiempo real de items",
                "tipo": "Herramienta / Tecnología de Software",
                "descripcion": "Tecnología de software empleada en el desarrollo del proyecto."
            },
            {
                "herramienta": "Alertas de stock bajo",
                "tipo": "Herramienta / Tecnología de Software",
                "descripcion": "Tecnología de software empleada en el desarrollo del proyecto."
            },
            {
                "herramienta": "Auditorías automáticas de inventario",
                "tipo": "Herramienta / Tecnología de Software",
                "descripcion": "Tecnología de software empleada en el desarrollo del proyecto."
            },
            {
                "herramienta": "Integración con ERP/WMS",
                "tipo": "Herramienta / Tecnología de Software",
                "descripcion": "Tecnología de software empleada en el desarrollo del proyecto."
            },
            {
                "herramienta": "Reportes de rotación de productos",
                "tipo": "Herramienta / Tecnología de Software",
                "descripcion": "Tecnología de software empleada en el desarrollo del proyecto."
            },
            {
                "herramienta": "Trazabilidad de lote completa",
                "tipo": "Herramienta / Tecnología de Software",
                "descripcion": "Tecnología de software empleada en el desarrollo del proyecto."
            }
        ]
    },
    {
        "id": "proj_037",
        "titulo": "🐝 Proyecto 37: Colmena Inteligente con Monitoreo de Salud y Producción",
        "descripcion": "Problema: Los apicultores pierden colmenas por enjambrazón, enfermedades (varroa) y hambre por falta de monitoreo frecuente, mientras que inspecciones físicas estresan abejas.\n\nDescripción: Sistema de monitoreo no invasivo de colmenas que registra temperatura interna, humedad, peso, sonido de abejas y actividad de entrada/salida, detectando enjambrazón, enfermedades y optimizando cosecha de miel. Objetivo Mejorar salud y productividad de colmenas mediante monitoreo continuo, detección temprana de problemas (varroa, enjambrazón, hambre) y optimización de intervenciones del apicultor.",
        "area": "SBC-IoT + AIoT",
        "sector": "Apicultura inteligente y biodiversidad",
        "nivel": "Intermedio-Avanzado",
        "duracion": "Un semestre",
        "presupuesto": "Bajo costo",
        "hardware": [
            "ESP32 (Microcontrolador | Por colmena)",
            "DHT22 (Sensor Ambiental | Temperatura y humedad interna)",
            "Celda de carga HX711 (Componente Electrónico / Accesorio | Peso total de colmena)",
            "Micrófono electret (Otro Componente de Hardware | Análisis de sonido)",
            "Sensor de entrada/salida (Otro Componente de Hardware | Barrera infrarroja)",
            "Sensor de temperatura externa DS18B20 (Sensor Ambiental | Mide variables ambientales relevantes para el sistema.)",
            "Panel solar 5W (Fuente de Alimentación / Energía | Suministra energía eléctrica a los componentes del sistema.)",
            "Batería LiPo 3.7V 3000mAh (Fuente de Alimentación / Energía | Suministra energía eléctrica a los componentes del sistema.)",
            "Carcasa impermeable (Estructura / Componente Mecánico | Brinda soporte físico o estructural al prototipo.)",
            "Raspberry Pi 3 B+ (Computadora de Placa Reducida (SBC) | Estación base apiario)",
            "Módulo LoRa (Módulo de Comunicación / Conectividad | Si apiario remoto)"
        ],
        "software": [
            "Python con análisis de audio: Lenguaje de Programación - Librosa",
            "FFT: Librería / Herramienta de Análisis de Datos - Para análisis espectral del zumbido",
            "Machine Learning: Inteligencia Artificial / Machine Learning - Para detección de anomalías",
            "InfluxDB: Base de Datos - Para series temporales",
            "Grafana: Visualización / Dashboard - Para dashboards",
            "MQTT o LoRaWAN: Protocolo de Comunicación IoT - Define el estándar de comunicación de datos entre dispositivos.",
            "Node-RED: Automatización / Orquestación - Para alertas",
            "Algoritmo de detección de enjambrazón: Inteligencia Artificial / Machine Learning - Procesa datos mediante modelos de IA/ML para generar predicciones o clasificaciones.",
            "Análisis de patrones estacionales: Librería / Herramienta de Análisis de Datos - Se utiliza para el procesamiento y análisis de los datos recolectados."
        ],
        "habilidades": [
            "Análisis de señales de audio",
            "Monitoreo de ecosistemas",
            "Sensores de peso de precisión",
            "Machine learning para apicultura",
            "IoT en ambientes naturales",
            "Energía autónoma con paneles solares",
            "Conservación de polinizadores"
        ],
        "objetivos": [
            "🎯 Objetivo General: Implementar un sistema de monitoreo no invasivo de colmenas que detecte enjambrazón, enfermedades y optimice manejo apícola mediante análisis de múltiples variables.",
            "📌 Objetivos Específicos:",
            "• Instalar sensores de peso, temperatura, humedad y micrófonos en colmenas con energía solar autónoma.",
            "• Desarrollar algoritmo de análisis espectral de zumbido que detecte cambios indicativos de enjambrazón o varroa.",
            "• Crear aplicación para apicultores con alertas predictivas de enjambrazón y determinación de momento óptimo de cosecha."
        ],
        "pasos": [
            "Análisis de requisitos",
            "Diseño de la solución",
            "Implementación y pruebas",
            "Validación y sustentación"
        ],
        "aplicaciones": [
            "Apicultura inteligente y biodiversidad"
        ],
        "referencias": [],
        "hardware_tabla": [
            {
                "componente": "ESP32",
                "categoria": "Microcontrolador",
                "funcion": "Por colmena"
            },
            {
                "componente": "DHT22",
                "categoria": "Sensor Ambiental",
                "funcion": "Temperatura y humedad interna"
            },
            {
                "componente": "Celda de carga HX711",
                "categoria": "Componente Electrónico / Accesorio",
                "funcion": "Peso total de colmena"
            },
            {
                "componente": "Micrófono electret",
                "categoria": "Otro Componente de Hardware",
                "funcion": "Análisis de sonido"
            },
            {
                "componente": "Sensor de entrada/salida",
                "categoria": "Otro Componente de Hardware",
                "funcion": "Barrera infrarroja"
            },
            {
                "componente": "Sensor de temperatura externa DS18B20",
                "categoria": "Sensor Ambiental",
                "funcion": "Mide variables ambientales relevantes para el sistema."
            },
            {
                "componente": "Panel solar 5W",
                "categoria": "Fuente de Alimentación / Energía",
                "funcion": "Suministra energía eléctrica a los componentes del sistema."
            },
            {
                "componente": "Batería LiPo 3.7V 3000mAh",
                "categoria": "Fuente de Alimentación / Energía",
                "funcion": "Suministra energía eléctrica a los componentes del sistema."
            },
            {
                "componente": "Carcasa impermeable",
                "categoria": "Estructura / Componente Mecánico",
                "funcion": "Brinda soporte físico o estructural al prototipo."
            },
            {
                "componente": "Raspberry Pi 3 B+",
                "categoria": "Computadora de Placa Reducida (SBC)",
                "funcion": "Estación base apiario"
            },
            {
                "componente": "Módulo LoRa",
                "categoria": "Módulo de Comunicación / Conectividad",
                "funcion": "Si apiario remoto"
            }
        ],
        "software_tabla": [
            {
                "herramienta": "Python con análisis de audio",
                "tipo": "Lenguaje de Programación",
                "descripcion": "Librosa"
            },
            {
                "herramienta": "FFT",
                "tipo": "Librería / Herramienta de Análisis de Datos",
                "descripcion": "Para análisis espectral del zumbido"
            },
            {
                "herramienta": "Machine Learning",
                "tipo": "Inteligencia Artificial / Machine Learning",
                "descripcion": "Para detección de anomalías"
            },
            {
                "herramienta": "InfluxDB",
                "tipo": "Base de Datos",
                "descripcion": "Para series temporales"
            },
            {
                "herramienta": "Grafana",
                "tipo": "Visualización / Dashboard",
                "descripcion": "Para dashboards"
            },
            {
                "herramienta": "MQTT o LoRaWAN",
                "tipo": "Protocolo de Comunicación IoT",
                "descripcion": "Define el estándar de comunicación de datos entre dispositivos."
            },
            {
                "herramienta": "Node-RED",
                "tipo": "Automatización / Orquestación",
                "descripcion": "Para alertas"
            },
            {
                "herramienta": "Algoritmo de detección de enjambrazón",
                "tipo": "Inteligencia Artificial / Machine Learning",
                "descripcion": "Procesa datos mediante modelos de IA/ML para generar predicciones o clasificaciones."
            },
            {
                "herramienta": "Análisis de patrones estacionales",
                "tipo": "Librería / Herramienta de Análisis de Datos",
                "descripcion": "Se utiliza para el procesamiento y análisis de los datos recolectados."
            }
        ]
    },
    {
        "id": "proj_038",
        "titulo": "🐾 Proyecto 38: Monitor de Biodiversidad con Identificación de Especies por Audio",
        "descripcion": "Problema: El monitoreo de biodiversidad mediante métodos tradicionales (transectos, capturas) es intensivo en tiempo, invasivo y limitado espacialmente, generando datos insuficientes para conservación.\n\nDescripción: Sistema de monitoreo acústico de biodiversidad que captura, analiza y clasifica sonidos de fauna silvestre (aves, anfibios, mamíferos) usando machine learning para generar índices de biodiversidad y detectar especies en peligro. Objetivo Monitoreo no invasivo de biodiversidad en ecosistemas naturales, identificación automática de especies por vocalización, generación de métricas de salud ecosistémica y apoyo a investigación biológica.",
        "area": "AIoT + SBC-IoT",
        "sector": "Biodiversidad y conservación ambiental",
        "nivel": "Avanzado",
        "duracion": "Un semestre",
        "presupuesto": "Bajo costo",
        "hardware": [
            "Raspberry Pi 3 B+ o 4 (Computadora de Placa Reducida (SBC) | Actúa como unidad de procesamiento central o gateway del sistema.)",
            "Micrófono omnidireccional de alta calidad (Otro Componente de Hardware | Forma parte del hardware de soporte del proyecto.)",
            "Tarjeta de sonido USB (Otro Componente de Hardware | Forma parte del hardware de soporte del proyecto.)",
            "ESP32 con I2S microphone (Microcontrolador | INMP441)",
            "RTC DS3231 (Otro Componente de Hardware | Timestamps precisos)",
            "SD card de alta capacidad (Otro Componente de Hardware | 128GB+)",
            "Panel solar 10W (Fuente de Alimentación / Energía | Suministra energía eléctrica a los componentes del sistema.)",
            "Batería LiPo 3.7V 10000mAh (Fuente de Alimentación / Energía | Suministra energía eléctrica a los componentes del sistema.)",
            "Carcasa impermeable IP67 (Estructura / Componente Mecánico | Brinda soporte físico o estructural al prototipo.)",
            "Sensor de temperatura y humedad (Sensor Ambiental | Mide variables ambientales relevantes para el sistema.)",
            "Módulo 4G (Otro Componente de Hardware | Transmisión remota opcional)"
        ],
        "software": [
            "Python con Librosa: Lenguaje de Programación - Análisis de audio",
            "TensorFlow: Inteligencia Artificial / Machine Learning - Para clasificación de especies",
            "AudioSet pre-trained models: Herramienta / Tecnología de Software - Tecnología de software empleada en el desarrollo del proyecto.",
            "BirdNET: Inteligencia Artificial / Machine Learning - Red neuronal para aves",
            "Raven Lite: Librería / Herramienta de Análisis de Datos - Análisis de espectrogramas",
            "Pandas: Librería / Herramienta de Análisis de Datos - Para análisis temporal",
            "MQTT: Protocolo de Comunicación IoT - Para transmisión",
            "PostgreSQL con PostGIS: Base de Datos - Almacena los datos generados por el sistema.",
            "Xeno-canto database integration: Herramienta / Tecnología de Software - Tecnología de software empleada en el desarrollo del proyecto.",
            "Mapas de biodiversidad con Folium: Herramienta / Tecnología de Software - Tecnología de software empleada en el desarrollo del proyecto."
        ],
        "habilidades": [
            "Bioacústica y análisis de audio • Deep learning para clasificación de especies • Ecología cuantitativa • Monitoreo de fauna silvestre • Procesamiento de grandes volúmenes de audio • Sistemas autónomos de campo • Contribución a ciencia ciudadana PROYECTOS DE MINERÍA Y SEGURIDAD INDUSTRIAL PROYECTOS DE MINERÍA Y SEGURIDAD INDUSTRIAL"
        ],
        "objetivos": [
            "🎯 Objetivo General: Desarrollar una plataforma de monitoreo acústico de biodiversidad que identifique automáticamente especies de fauna silvestre mediante deep learning.",
            "📌 Objetivos Específicos:",
            "• Implementar estaciones de grabación autónomas con energía solar que capturen audio ambiental 24/7.",
            "• Entrenar modelos de clasificación de especies (BirdNET, AudioSet) con bases de datos de vocalizaciones de referencia.",
            "• Generar índices de biodiversidad (ADI, BIO) y mapas de presencia de especies para apoyo a conservación."
        ],
        "pasos": [
            "Análisis de requisitos",
            "Diseño de la solución",
            "Implementación y pruebas",
            "Validación y sustentación"
        ],
        "aplicaciones": [
            "Biodiversidad y conservación ambiental"
        ],
        "referencias": [],
        "hardware_tabla": [
            {
                "componente": "Raspberry Pi 3 B+ o 4",
                "categoria": "Computadora de Placa Reducida (SBC)",
                "funcion": "Actúa como unidad de procesamiento central o gateway del sistema."
            },
            {
                "componente": "Micrófono omnidireccional de alta calidad",
                "categoria": "Otro Componente de Hardware",
                "funcion": "Forma parte del hardware de soporte del proyecto."
            },
            {
                "componente": "Tarjeta de sonido USB",
                "categoria": "Otro Componente de Hardware",
                "funcion": "Forma parte del hardware de soporte del proyecto."
            },
            {
                "componente": "ESP32 con I2S microphone",
                "categoria": "Microcontrolador",
                "funcion": "INMP441"
            },
            {
                "componente": "RTC DS3231",
                "categoria": "Otro Componente de Hardware",
                "funcion": "Timestamps precisos"
            },
            {
                "componente": "SD card de alta capacidad",
                "categoria": "Otro Componente de Hardware",
                "funcion": "128GB+"
            },
            {
                "componente": "Panel solar 10W",
                "categoria": "Fuente de Alimentación / Energía",
                "funcion": "Suministra energía eléctrica a los componentes del sistema."
            },
            {
                "componente": "Batería LiPo 3.7V 10000mAh",
                "categoria": "Fuente de Alimentación / Energía",
                "funcion": "Suministra energía eléctrica a los componentes del sistema."
            },
            {
                "componente": "Carcasa impermeable IP67",
                "categoria": "Estructura / Componente Mecánico",
                "funcion": "Brinda soporte físico o estructural al prototipo."
            },
            {
                "componente": "Sensor de temperatura y humedad",
                "categoria": "Sensor Ambiental",
                "funcion": "Mide variables ambientales relevantes para el sistema."
            },
            {
                "componente": "Módulo 4G",
                "categoria": "Otro Componente de Hardware",
                "funcion": "Transmisión remota opcional"
            }
        ],
        "software_tabla": [
            {
                "herramienta": "Python con Librosa",
                "tipo": "Lenguaje de Programación",
                "descripcion": "Análisis de audio"
            },
            {
                "herramienta": "TensorFlow",
                "tipo": "Inteligencia Artificial / Machine Learning",
                "descripcion": "Para clasificación de especies"
            },
            {
                "herramienta": "AudioSet pre-trained models",
                "tipo": "Herramienta / Tecnología de Software",
                "descripcion": "Tecnología de software empleada en el desarrollo del proyecto."
            },
            {
                "herramienta": "BirdNET",
                "tipo": "Inteligencia Artificial / Machine Learning",
                "descripcion": "Red neuronal para aves"
            },
            {
                "herramienta": "Raven Lite",
                "tipo": "Librería / Herramienta de Análisis de Datos",
                "descripcion": "Análisis de espectrogramas"
            },
            {
                "herramienta": "Pandas",
                "tipo": "Librería / Herramienta de Análisis de Datos",
                "descripcion": "Para análisis temporal"
            },
            {
                "herramienta": "MQTT",
                "tipo": "Protocolo de Comunicación IoT",
                "descripcion": "Para transmisión"
            },
            {
                "herramienta": "PostgreSQL con PostGIS",
                "tipo": "Base de Datos",
                "descripcion": "Almacena los datos generados por el sistema."
            },
            {
                "herramienta": "Xeno-canto database integration",
                "tipo": "Herramienta / Tecnología de Software",
                "descripcion": "Tecnología de software empleada en el desarrollo del proyecto."
            },
            {
                "herramienta": "Mapas de biodiversidad con Folium",
                "tipo": "Herramienta / Tecnología de Software",
                "descripcion": "Tecnología de software empleada en el desarrollo del proyecto."
            }
        ]
    },
    {
        "id": "proj_039",
        "titulo": "⛏️ Proyecto 39: Sistema de Detección de Gases Peligrosos en Minería y Túneles",
        "descripcion": "Problema: Los accidentes en minería subterránea por acumulación de gases tóxicos o explosivos (metano, monóxido de carbono) causan muertes evitables por falta de monitoreo continuo.\n\nDescripción: Red de sensores distribuidos en minas o túneles que monitorea continuamente gases tóxicos (CO, CO2, CH4, H2S), temperatura y humedad, generando alertas tempranas y activando sistemas de ventilación automática. Objetivo Prevenir accidentes por acumulación de gases tóxicos o explosivos, garantizar seguridad de trabajadores, cumplir normativas de seguridad minera y automatizar respuesta ante emergencias.",
        "area": "SBC-IoT + IoT con Analítica",
        "sector": "Minería y seguridad industrial",
        "nivel": "Avanzado",
        "duracion": "Un semestre",
        "presupuesto": "Bajo costo",
        "hardware": [
            "Raspberry Pi 3 B+ (Computadora de Placa Reducida (SBC) | Controlador maestro)",
            "ESP32 (Microcontrolador | Nodos sensores distribuidos; 10+ unidades)",
            "Sensor MQ-7 (Sensor Ambiental | Monóxido de carbono)",
            "Sensor MQ-4 (Sensor Ambiental | Metano)",
            "Sensor MQ-135 (Sensor Ambiental | Calidad del aire general)",
            "Sensor MH-Z19B (Sensor Ambiental | CO2)",
            "DHT22 (Sensor Ambiental | Temperatura y humedad)",
            "Buzzer de alta potencia (Interfaz de Usuario / Iluminación | Permite la interacción, iluminación o notificación visual/sonora del sistema.)",
            "Luces estroboscópicas de emergencia (Otro Componente de Hardware | Forma parte del hardware de soporte del proyecto.)",
            "Relés (Actuador | Para control de ventiladores industriales)",
            "Batería de respaldo UPS (Fuente de Alimentación / Energía | Suministra energía eléctrica a los componentes del sistema.)",
            "Cableado resistente a ambientes hostiles (Otro Componente de Hardware | Forma parte del hardware de soporte del proyecto.)"
        ],
        "software": [
            "Python con GPIO: Lenguaje de Programación - Lenguaje utilizado para desarrollar la lógica del sistema.",
            "InfluxDB: Base de Datos - Para datos críticos",
            "Grafana con alertas: Visualización / Dashboard - Presenta los datos del sistema en paneles visuales.",
            "MQTT con QoS 2: Protocolo de Comunicación IoT - Define el estándar de comunicación de datos entre dispositivos.",
            "Node-RED: Automatización / Orquestación - Para automatización",
            "Algoritmos de detección de tendencias: Inteligencia Artificial / Machine Learning - Procesa datos mediante modelos de IA/ML para generar predicciones o clasificaciones.",
            "Sistema de alarmas escalonadas: Herramienta / Tecnología de Software - Tecnología de software empleada en el desarrollo del proyecto.",
            "Registro de eventos en SQLite: Base de Datos - Almacena los datos generados por el sistema.",
            "Dashboard web de seguridad: Visualización / Dashboard - Presenta los datos del sistema en paneles visuales.",
            "Integración con sistemas SCADA Gases Monitoreados y Niveles Críticos: Herramienta / Tecnología de Software - Tecnología de software empleada en el desarrollo del proyecto.",
            "Monóxido de carbono: Herramienta / Tecnología de Software - CO; >50 ppm alerta, >100 ppm peligro",
            "Metano: Herramienta / Tecnología de Software - CH4; >1% alerta, >5% explosivo",
            "Dióxido de carbono: Herramienta / Tecnología de Software - CO2; >5000 ppm alerta",
            "Sulfuro de hidrógeno: Herramienta / Tecnología de Software - H2S; >10 ppm alerta",
            "Oxígeno: Herramienta / Tecnología de Software - O2; <19.5% deficiencia",
            ">40°C alerta de incendio Sistema de Respuesta Automatizada: Herramienta / Tecnología de Software - Temperatura",
            "Alerta visual en dashboard: Visualización / Dashboard - Nivel 1",
            "Activación de ventiladores: Herramienta / Tecnología de Software - Nivel 2",
            "Alarmas sonoras y visuales: Herramienta / Tecnología de Software - Nivel 3",
            "Evacuación automática: Herramienta / Tecnología de Software - Nivel 4",
            "Envío de SMS a equipo de seguridad: Ciberseguridad - Herramienta empleada para pruebas o protección de seguridad del sistema.",
            "Activación de protocolos de emergencia: Protocolo de Comunicación IoT - Define el estándar de comunicación de datos entre dispositivos.",
            "Cierre automático de zonas afectadas: Herramienta / Tecnología de Software - Tecnología de software empleada en el desarrollo del proyecto.",
            "Notificación a autoridades mineras: Herramienta / Tecnología de Software - Tecnología de software empleada en el desarrollo del proyecto."
        ],
        "habilidades": [
            "Sistemas de seguridad crítica",
            "Calibración de sensores de gases",
            "Automatización industrial",
            "Protocolos de emergencia",
            "Cumplimiento normativo en minería",
            "Diseño de sistemas redundantes",
            "Integración con SCADA"
        ],
        "objetivos": [
            "🎯 Objetivo General: Implementar un sistema de detección de gases peligrosos en ambientes mineros que active automáticamente ventilación y protocolos de evacuación ante niveles críticos.",
            "📌 Objetivos Específicos:",
            "• Desplegar red distribuida de sensores de CO, CO2, CH4, H2S en túneles con transmisión inalámbrica redundante.",
            "• Desarrollar sistema de respuesta automatizada que active ventiladores y alarmas según niveles de gases detectados.",
            "• Crear protocolos de evacuación escalonados que guíen trabajadores a salidas seguras mediante señalización automática."
        ],
        "pasos": [
            "Análisis de requisitos",
            "Diseño de la solución",
            "Implementación y pruebas",
            "Validación y sustentación"
        ],
        "aplicaciones": [
            "Minería y seguridad industrial"
        ],
        "referencias": [],
        "hardware_tabla": [
            {
                "componente": "Raspberry Pi 3 B+",
                "categoria": "Computadora de Placa Reducida (SBC)",
                "funcion": "Controlador maestro"
            },
            {
                "componente": "ESP32",
                "categoria": "Microcontrolador",
                "funcion": "Nodos sensores distribuidos; 10+ unidades"
            },
            {
                "componente": "Sensor MQ-7",
                "categoria": "Sensor Ambiental",
                "funcion": "Monóxido de carbono"
            },
            {
                "componente": "Sensor MQ-4",
                "categoria": "Sensor Ambiental",
                "funcion": "Metano"
            },
            {
                "componente": "Sensor MQ-135",
                "categoria": "Sensor Ambiental",
                "funcion": "Calidad del aire general"
            },
            {
                "componente": "Sensor MH-Z19B",
                "categoria": "Sensor Ambiental",
                "funcion": "CO2"
            },
            {
                "componente": "DHT22",
                "categoria": "Sensor Ambiental",
                "funcion": "Temperatura y humedad"
            },
            {
                "componente": "Buzzer de alta potencia",
                "categoria": "Interfaz de Usuario / Iluminación",
                "funcion": "Permite la interacción, iluminación o notificación visual/sonora del sistema."
            },
            {
                "componente": "Luces estroboscópicas de emergencia",
                "categoria": "Otro Componente de Hardware",
                "funcion": "Forma parte del hardware de soporte del proyecto."
            },
            {
                "componente": "Relés",
                "categoria": "Actuador",
                "funcion": "Para control de ventiladores industriales"
            },
            {
                "componente": "Batería de respaldo UPS",
                "categoria": "Fuente de Alimentación / Energía",
                "funcion": "Suministra energía eléctrica a los componentes del sistema."
            },
            {
                "componente": "Cableado resistente a ambientes hostiles",
                "categoria": "Otro Componente de Hardware",
                "funcion": "Forma parte del hardware de soporte del proyecto."
            }
        ],
        "software_tabla": [
            {
                "herramienta": "Python con GPIO",
                "tipo": "Lenguaje de Programación",
                "descripcion": "Lenguaje utilizado para desarrollar la lógica del sistema."
            },
            {
                "herramienta": "InfluxDB",
                "tipo": "Base de Datos",
                "descripcion": "Para datos críticos"
            },
            {
                "herramienta": "Grafana con alertas",
                "tipo": "Visualización / Dashboard",
                "descripcion": "Presenta los datos del sistema en paneles visuales."
            },
            {
                "herramienta": "MQTT con QoS 2",
                "tipo": "Protocolo de Comunicación IoT",
                "descripcion": "Define el estándar de comunicación de datos entre dispositivos."
            },
            {
                "herramienta": "Node-RED",
                "tipo": "Automatización / Orquestación",
                "descripcion": "Para automatización"
            },
            {
                "herramienta": "Algoritmos de detección de tendencias",
                "tipo": "Inteligencia Artificial / Machine Learning",
                "descripcion": "Procesa datos mediante modelos de IA/ML para generar predicciones o clasificaciones."
            },
            {
                "herramienta": "Sistema de alarmas escalonadas",
                "tipo": "Herramienta / Tecnología de Software",
                "descripcion": "Tecnología de software empleada en el desarrollo del proyecto."
            },
            {
                "herramienta": "Registro de eventos en SQLite",
                "tipo": "Base de Datos",
                "descripcion": "Almacena los datos generados por el sistema."
            },
            {
                "herramienta": "Dashboard web de seguridad",
                "tipo": "Visualización / Dashboard",
                "descripcion": "Presenta los datos del sistema en paneles visuales."
            },
            {
                "herramienta": "Integración con sistemas SCADA Gases Monitoreados y Niveles Críticos",
                "tipo": "Herramienta / Tecnología de Software",
                "descripcion": "Tecnología de software empleada en el desarrollo del proyecto."
            },
            {
                "herramienta": "Monóxido de carbono",
                "tipo": "Herramienta / Tecnología de Software",
                "descripcion": "CO; >50 ppm alerta, >100 ppm peligro"
            },
            {
                "herramienta": "Metano",
                "tipo": "Herramienta / Tecnología de Software",
                "descripcion": "CH4; >1% alerta, >5% explosivo"
            },
            {
                "herramienta": "Dióxido de carbono",
                "tipo": "Herramienta / Tecnología de Software",
                "descripcion": "CO2; >5000 ppm alerta"
            },
            {
                "herramienta": "Sulfuro de hidrógeno",
                "tipo": "Herramienta / Tecnología de Software",
                "descripcion": "H2S; >10 ppm alerta"
            },
            {
                "herramienta": "Oxígeno",
                "tipo": "Herramienta / Tecnología de Software",
                "descripcion": "O2; <19.5% deficiencia"
            },
            {
                "herramienta": ">40°C alerta de incendio Sistema de Respuesta Automatizada",
                "tipo": "Herramienta / Tecnología de Software",
                "descripcion": "Temperatura"
            },
            {
                "herramienta": "Alerta visual en dashboard",
                "tipo": "Visualización / Dashboard",
                "descripcion": "Nivel 1"
            },
            {
                "herramienta": "Activación de ventiladores",
                "tipo": "Herramienta / Tecnología de Software",
                "descripcion": "Nivel 2"
            },
            {
                "herramienta": "Alarmas sonoras y visuales",
                "tipo": "Herramienta / Tecnología de Software",
                "descripcion": "Nivel 3"
            },
            {
                "herramienta": "Evacuación automática",
                "tipo": "Herramienta / Tecnología de Software",
                "descripcion": "Nivel 4"
            },
            {
                "herramienta": "Envío de SMS a equipo de seguridad",
                "tipo": "Ciberseguridad",
                "descripcion": "Herramienta empleada para pruebas o protección de seguridad del sistema."
            },
            {
                "herramienta": "Activación de protocolos de emergencia",
                "tipo": "Protocolo de Comunicación IoT",
                "descripcion": "Define el estándar de comunicación de datos entre dispositivos."
            },
            {
                "herramienta": "Cierre automático de zonas afectadas",
                "tipo": "Herramienta / Tecnología de Software",
                "descripcion": "Tecnología de software empleada en el desarrollo del proyecto."
            },
            {
                "herramienta": "Notificación a autoridades mineras",
                "tipo": "Herramienta / Tecnología de Software",
                "descripcion": "Tecnología de software empleada en el desarrollo del proyecto."
            }
        ]
    },
    {
        "id": "proj_040",
        "titulo": "📳 Proyecto 40: Detector de Fatiga de Materiales con Análisis de Vibraciones",
        "descripcion": "Problema: Las fallas catastróficas en maquinaria industrial generan paradas no planificadas costosas y riesgos de seguridad, mientras que mantenimiento preventivo tradicional es ineficiente.\n\nDescripción: Sistema de monitoreo de vibraciones en maquinaria pesada, estructuras metálicas y equipos críticos que detecta patrones anormales indicativos de fatiga de material, grietas o fallos inminentes mediante análisis FFT y machine learning. Objetivo Implementar mantenimiento predictivo basado en condición, prevenir fallas catastróficas, reducir tiempos muertos y extender vida útil de equipos mediante detección temprana de anomalías.",
        "area": "AIoT + SBC-IoT",
        "sector": "Minería y seguridad industrial - Mantenimiento predictivo",
        "nivel": "Avanzado",
        "duracion": "Un semestre",
        "presupuesto": "Bajo costo",
        "hardware": [
            "Raspberry Pi 4 (Computadora de Placa Reducida (SBC) | Actúa como unidad de procesamiento central o gateway del sistema.)",
            "ESP32 (Microcontrolador | Múltiples puntos de monitoreo)",
            "Acelerómetro de alta precisión ADXL345 (Sensor de Movimiento / Posición | Detecta movimiento, orientación o posición dentro del sistema.)",
            "Giroscopio MPU6050 (Sensor de Movimiento / Posición | Detecta movimiento, orientación o posición dentro del sistema.)",
            "Sensor de vibración piezoléctrico (Otro Componente de Hardware | Forma parte del hardware de soporte del proyecto.)",
            "Sensor de temperatura PT100 (Sensor Ambiental | Puntos calientes)",
            "Micrófono (Otro Componente de Hardware | Para análisis acústico)",
            "Tacómetro óptico (Otro Componente de Hardware | RPM de motores)",
            "Arduino Nano (Microcontrolador | Adquisición de datos local)",
            "SD card (Otro Componente de Hardware | Para logs)"
        ],
        "software": [
            "Python con SciPy: Lenguaje de Programación - Análisis FFT",
            "NumPy: Librería / Herramienta de Análisis de Datos - Para procesamiento de señales",
            "Isolation Forest, SVM: Inteligencia Artificial / Machine Learning - Machine Learning",
            "TensorFlow: Inteligencia Artificial / Machine Learning - Para clasificación de fallos",
            "Librosa: Librería / Herramienta de Análisis de Datos - Para análisis acústico",
            "Matplotlib: Librería / Herramienta de Análisis de Datos - Para espectrogramas",
            "InfluxDB: Base de Datos - Para históricos",
            "Grafana con umbrales dinámicos: Visualización / Dashboard - Presenta los datos del sistema en paneles visuales.",
            "Algoritmos de detección de envolvente: Inteligencia Artificial / Machine Learning - Procesa datos mediante modelos de IA/ML para generar predicciones o clasificaciones.",
            "Análisis de orden de armónicos: Librería / Herramienta de Análisis de Datos - Se utiliza para el procesamiento y análisis de los datos recolectados."
        ],
        "habilidades": [
            "Análisis de vibraciones mecánicas • Mantenimiento predictivo • Procesamiento digital de señales (DSP) • Machine learning para diagnóstico • Análisis espectral FFT • Detección de patrones de fallo • Instrumentación industrial RESUMEN COMPLETO DEL DOCUMENTO El documento ahora contiene un total de 40 proyectos prácticos de IoT distribuidos en 10 áreas tecnológicas y 15 sectores de aplicación diferentes: Distribución por Áreas Tecnológicas • SBC-IoT: 12 proyectos • AIoT (Inteligencia Artificial + IoT): 12 proyectos • IoT Hacking y Ciberseguridad: 4 proyectos • IoT con Big Data y Analítica: 6 proyectos • IoT con Visión Artificial: 6 proyectos Nuevos Sectores Incorporados • Acuicultura y piscicultura inteligente (2 proyectos) • Educación inteligente y e-learning (2 proyectos) • Ganadería inteligente y salud animal (2 proyectos) • Logística inteligente y cadena de frío (2 proyectos) • Apicultura y biodiversidad (2 proyectos) • Minería y seguridad industrial (2 proyectos) Índice Temático de Proyectos Proyectos 1- 20: Base Original SBC-IoT (1-4), AIoT (5-8), Ciberseguridad (9-12), Big Data (13-16), Visión Artificial (17- 20) Proyectos 21-28: Neurología y Neurociencia Parkinson, Alzheimer, TDAH, Epilepsia, BCI, Neurofeedback, Fatiga mental, Neurociencia cognitiva Proyectos 29-40: Nuevos Sectores • 29-30: Acuicultura (calidad de agua, alimentación inteligente) • 31-32: Educación (aula inteligente, control de asistencia) • 33-34: Ganadería (collar IoT, ordeño inteligente) • 35-36: Logística (cadena de frío, inventario RFID) • 37-38: Biodiversidad (colmena inteligente, monitoreo acústico) • 39-40: Minería (detección de gases, análisis de vibraciones) Todos los proyectos están diseñados con hardware económico (Arduino, ESP32, Raspberry Pi), sensores accesibles y software 100% libre y de código abierto, garantizando viabilidad técnica y económica para estudiantes de noveno semestre. Resumen Breve Red distribuida de sensores agrícolas conectados mediante MQTT que centralizan datos en Raspberry Pi para toma de decisiones en tiempo real. Resumen Breve Gateway centralizado que integra múltiples protocolos IoT para gestionar iluminación, climatización y accesos en edificios de forma unificada. Resumen Breve Estación meteorológica local que combina sensores físicos con datos de APIs públicas para generar predicciones meteorológicas personalizadas. Resumen Breve Sistema de control climático automatizado para invernaderos que ajusta riego, ventilación e iluminación según parámetros ambientales medidos. Resumen Breve Sistema automatizado que clasifica residuos en tiempo real usando visión artificial y redes neuronales ejecutadas en Raspberry Pi. Resumen Breve Detector de productos defectuosos en líneas de producción mediante análisis de vibraciones, sonido y temperatura con machine learning. Resumen Breve Contador inteligente de personas en espacios públicos usando detección por visión artificial con preservación de privacidad. Resumen Breve Monitor continuo de signos vitales con predicción de deterioro de salud usando machine learning supervisado. Resumen Breve Laboratorio controlado de pentesting para identificar vulnerabilidades comunes en dispositivos IoT mediante herramientas de seguridad. Resumen Breve Sistema de detección de intrusiones especializado para redes IoT que identifica patrones de ataque mediante análisis de tráfico. Resumen Breve Control de acceso con múltiples factores de autenticación (RFID, PIN, facial) y cifrado end-to-end de comunicaciones. Resumen Breve Dispositivo señuelo que simula ser vulnerable para atraer atacantes y generar inteligencia sobre técnicas de ataque emergentes. Resumen Breve Plataforma que predice consumo energético futuro mediante análisis de series temporales y machine learning para optimización. Resumen Breve Red de sensores vehiculares que analiza flujos de tráfico para identificar congestión y optimizar semáforos. Resumen Breve Red distribuida de estaciones que monitorean contaminación atmosférica y generan mapas de calor de calidad del aire. Resumen Breve Sistema de control de procesos farmacéuticos con análisis estadístico de calidad y generación automática de reportes regulatorios. Resumen Breve Cámara time-lapse inteligente que detecta fases de crecimiento y enfermedades de cultivos mediante análisis de imágenes. Resumen Breve Sistema de detección de espacios libres en estacionamientos mediante procesamiento de video con actualización en tiempo real. Resumen Breve Vigilancia automatizada que verifica uso correcto de equipo de protección personal mediante detección de objetos en tiempo real. Resumen Breve Lector automático de medidores analógicos usando OCR y visión artificial para digitalización de lecturas de servicios públicos. Resumen Breve Wearable que detecta temblores, rigidez y alteraciones motoras mediante acelerometría y EMG para diagnóstico temprano de Parkinson. Resumen Breve Sistema de monitoreo de rutinas diarias que detecta cambios conductuales indicativos de deterioro cognitivo mediante sensores ambientales. Resumen Breve Monitor neurofisiológico que mide estrés, ansiedad y atención mediante GSR, HRV y opcionalmente EEG para detección de TDAH. Resumen Breve Wearable de detección de crisis epilépticas con alertas automáticas a contactos de emergencia y geolocalización. Resumen Breve Interfaz cerebro-computadora que permite controlar dispositivos IoT mediante señales EEG para personas con movilidad reducida. Resumen Breve Plataforma de entrenamiento cognitivo con neurofeedback que mejora concentración mediante retroalimentación en tiempo real de ondas cerebrales. Resumen Breve Detector multimodal de fatiga mediante EEG y análisis de parpadeo ocular para prevención de accidentes vehiculares e industriales. Resumen Breve Plataforma experimental de neurociencia que correlaciona actividad cerebral con desempeño en tareas cognitivas de memoria y aprendizaje. Resumen Breve Sistema de monitoreo continuo de parámetros acuáticos con control automatizado de aireadores para optimización de condiciones de cría. Resumen Breve Alimentador automatizado con visión artificial que ajusta cantidad de alimento según conteo y comportamiento de peces observado. Resumen Breve Sistema multimodal que analiza atención, participación y expresiones faciales de estudiantes para retroalimentación a docentes. Resumen Breve Control de asistencia automatizado mediante reconocimiento facial o RFID con notificaciones automáticas a padres/tutores. Resumen Breve Collar wearable para ganado que monitorea salud, ubicación y actividad para detección temprana de enfermedades y celos. Resumen Breve Sistema de ordeño automatizado con monitoreo de calidad de leche y detección temprana de mastitis por conductividad eléctrica. Resumen Breve Monitor de temperatura y GPS en vehículos refrigerados con generación automática de certificados de cumplimiento de cadena de frío. Resumen Breve Sistema de inventario que combina RFID para rastreo y visión artificial para verificación visual de productos en almacén. Resumen Breve Monitor no invasivo de colmenas que registra peso, temperatura, sonido y actividad para detección de enjambrazón y enfermedades. Resumen Breve Sistema acústico de monitoreo de biodiversidad que identifica especies de fauna mediante análisis de vocalizaciones con machine learning. Resumen Breve Red de sensores de gases tóxicos en minas con activación automática de ventilación y protocolos de evacuación ante niveles críticos. Resumen Breve Monitor de vibraciones en maquinaria pesada que detecta fallos mecánicos mediante análisis FFT y machine learning para mantenimiento predictivo. Problemática PROYECTOS DE TURISMO Y HOTELERÍA INTELIGENTE PROYECTOS DE TURISMO Y HOTELERÍA INTELIGENTE"
        ],
        "objetivos": [
            "🎯 Objetivo General: Desarrollar un sistema de mantenimiento predictivo basado en análisis de vibraciones que detecte patrones anormales indicativos de fallos mecánicos inminentes.",
            "📌 Objetivos Específicos:",
            "• Implementar acelerómetros de alta precisión en puntos críticos de maquinaria con adquisición continua de datos.",
            "• Desarrollar análisis FFT para identificar frecuencias características de fallos (desbalanceo, desalineación, rodamientos).",
            "• Entrenar modelos de clasificación de fallos con machine learning para diagnóstico automatizado y priorización de intervenciones."
        ],
        "pasos": [
            "Análisis de requisitos",
            "Diseño de la solución",
            "Implementación y pruebas",
            "Validación y sustentación"
        ],
        "aplicaciones": [
            "Minería y seguridad industrial - Mantenimiento predictivo"
        ],
        "referencias": [],
        "hardware_tabla": [
            {
                "componente": "Raspberry Pi 4",
                "categoria": "Computadora de Placa Reducida (SBC)",
                "funcion": "Actúa como unidad de procesamiento central o gateway del sistema."
            },
            {
                "componente": "ESP32",
                "categoria": "Microcontrolador",
                "funcion": "Múltiples puntos de monitoreo"
            },
            {
                "componente": "Acelerómetro de alta precisión ADXL345",
                "categoria": "Sensor de Movimiento / Posición",
                "funcion": "Detecta movimiento, orientación o posición dentro del sistema."
            },
            {
                "componente": "Giroscopio MPU6050",
                "categoria": "Sensor de Movimiento / Posición",
                "funcion": "Detecta movimiento, orientación o posición dentro del sistema."
            },
            {
                "componente": "Sensor de vibración piezoléctrico",
                "categoria": "Otro Componente de Hardware",
                "funcion": "Forma parte del hardware de soporte del proyecto."
            },
            {
                "componente": "Sensor de temperatura PT100",
                "categoria": "Sensor Ambiental",
                "funcion": "Puntos calientes"
            },
            {
                "componente": "Micrófono",
                "categoria": "Otro Componente de Hardware",
                "funcion": "Para análisis acústico"
            },
            {
                "componente": "Tacómetro óptico",
                "categoria": "Otro Componente de Hardware",
                "funcion": "RPM de motores"
            },
            {
                "componente": "Arduino Nano",
                "categoria": "Microcontrolador",
                "funcion": "Adquisición de datos local"
            },
            {
                "componente": "SD card",
                "categoria": "Otro Componente de Hardware",
                "funcion": "Para logs"
            }
        ],
        "software_tabla": [
            {
                "herramienta": "Python con SciPy",
                "tipo": "Lenguaje de Programación",
                "descripcion": "Análisis FFT"
            },
            {
                "herramienta": "NumPy",
                "tipo": "Librería / Herramienta de Análisis de Datos",
                "descripcion": "Para procesamiento de señales"
            },
            {
                "herramienta": "Isolation Forest, SVM",
                "tipo": "Inteligencia Artificial / Machine Learning",
                "descripcion": "Machine Learning"
            },
            {
                "herramienta": "TensorFlow",
                "tipo": "Inteligencia Artificial / Machine Learning",
                "descripcion": "Para clasificación de fallos"
            },
            {
                "herramienta": "Librosa",
                "tipo": "Librería / Herramienta de Análisis de Datos",
                "descripcion": "Para análisis acústico"
            },
            {
                "herramienta": "Matplotlib",
                "tipo": "Librería / Herramienta de Análisis de Datos",
                "descripcion": "Para espectrogramas"
            },
            {
                "herramienta": "InfluxDB",
                "tipo": "Base de Datos",
                "descripcion": "Para históricos"
            },
            {
                "herramienta": "Grafana con umbrales dinámicos",
                "tipo": "Visualización / Dashboard",
                "descripcion": "Presenta los datos del sistema en paneles visuales."
            },
            {
                "herramienta": "Algoritmos de detección de envolvente",
                "tipo": "Inteligencia Artificial / Machine Learning",
                "descripcion": "Procesa datos mediante modelos de IA/ML para generar predicciones o clasificaciones."
            },
            {
                "herramienta": "Análisis de orden de armónicos",
                "tipo": "Librería / Herramienta de Análisis de Datos",
                "descripcion": "Se utiliza para el procesamiento y análisis de los datos recolectados."
            }
        ]
    },
    {
        "id": "proj_041",
        "titulo": "🔬 Proyecto 41: Sistema de Gestión Inteligente de Habitaciones de Hotel",
        "descripcion": "Problema: Resumen Breve Sistema IoT integral para hoteles que automatiza climatización, iluminación y entretenimiento según preferencias de huéspedes, optimiza limpieza y mantenimiento mediante sensores de ocupación, y mejora experiencia del cliente. Problemática Los hoteles enfrentan altos costos energéticos por climatización e iluminación de habitaciones vacías, ineficiencias en programación de limpieza, y dificultades para personalizar experiencia del huésped, afectando rentabilidad y satisfacción del cliente.",
        "area": "SBC-IoT + AIoT",
        "sector": "Turismo y hotelería inteligente",
        "nivel": "Intermedio-Avanzado",
        "duracion": "Un semestre",
        "presupuesto": "Bajo costo",
        "hardware": [
            "Raspberry Pi 4 (Computadora de Placa Reducida (SBC) | Servidor central del hotel)",
            "ESP32 (Microcontrolador | Por habitación; 20-50 unidades)",
            "Sensores PIR de ocupación (Sensor de Movimiento / Posición | Detecta movimiento, orientación o posición dentro del sistema.)",
            "DHT22 (Sensor Ambiental | Temperatura y humedad)",
            "Sensores de calidad del aire MQ-135 (Sensor Ambiental | Mide variables ambientales relevantes para el sistema.)",
            "Relés de 4 canales (Actuador | Control HVAC e iluminación)",
            "Módulo RFID RC522 (Módulo de Comunicación / Conectividad | Cerraduras inteligentes)",
            "Display táctil 7\" (Interfaz de Usuario / Iluminación | Panel de control en habitación)",
            "Arduino Nano (Microcontrolador | Control de actuadores)",
            "Controlador IR (Otro Componente de Hardware | Para TV/AC)"
        ],
        "software": [
            "Node-RED: Automatización / Orquestación - Para automatización hotelera",
            "MQTT: Protocolo de Comunicación IoT - Para comunicación entre habitaciones",
            "PostgreSQL: Base de Datos - Para perfiles de huéspedes",
            "Python con Flask: Framework Web / Aplicación - Para API REST",
            "Dashboard web con Vue.js: Visualización / Dashboard - Presenta los datos del sistema en paneles visuales.",
            "Sistema de reservas: Herramienta / Tecnología de Software - Integración",
            "Machine learning: Inteligencia Artificial / Machine Learning - Para predicción de preferencias",
            "Grafana: Visualización / Dashboard - Para métricas de ocupación y energía Funcionalidades Clave",
            "Check-in automático con apertura de habitación vía smartphone: Herramienta / Tecnología de Software - Tecnología de software empleada en el desarrollo del proyecto.",
            "Ajuste automático de temperatura al detectar llegada del huésped: Herramienta / Tecnología de Software - Tecnología de software empleada en el desarrollo del proyecto.",
            "Apagado de sistemas al detectar habitación vacía: Herramienta / Tecnología de Software - Ahorro energético",
            "Alertas de limpieza basadas en tiempo real de ocupación: Herramienta / Tecnología de Software - Tecnología de software empleada en el desarrollo del proyecto.",
            "Integración con control de voz: Herramienta / Tecnología de Software - Alexa/Google Assistant",
            "Reportes de consumo energético por habitación: Herramienta / Tecnología de Software - Tecnología de software empleada en el desarrollo del proyecto.",
            "Sistema de peticiones del huésped vía app móvil: Framework Web / Aplicación - Provee la interfaz web o móvil del sistema."
        ],
        "habilidades": [
            "Automatización de servicios hoteleros",
            "Sistemas de gestión energética",
            "Desarrollo de perfiles de usuario",
            "Integración con sistemas de reservas",
            "Domótica a escala comercial",
            "Optimización de operaciones hoteleras"
        ],
        "objetivos": [
            "🎯 Objetivo General: Desarrollar un sistema de gestión inteligente de habitaciones hoteleras que automatice servicios, optimice consumo energético y personalice la experiencia del huésped mediante IoT y análisis de preferencias.",
            "📌 Objetivos Específicos:",
            "• Implementar sensores de ocupación, temperatura y calidad del aire con control automatizado de HVAC e iluminación por habitación.",
            "• Desarrollar sistema de perfiles de huéspedes que recuerde y aplique automáticamente preferencias de temperatura, iluminación y entretenimiento.",
            "• Crear dashboard de gestión hotelera que optimice programación de limpieza y mantenimiento según ocupación real detectada."
        ],
        "pasos": [
            "Análisis de requisitos",
            "Diseño de la solución",
            "Implementación y pruebas",
            "Validación y sustentación"
        ],
        "aplicaciones": [
            "Turismo y hotelería inteligente"
        ],
        "referencias": [],
        "hardware_tabla": [
            {
                "componente": "Raspberry Pi 4",
                "categoria": "Computadora de Placa Reducida (SBC)",
                "funcion": "Servidor central del hotel"
            },
            {
                "componente": "ESP32",
                "categoria": "Microcontrolador",
                "funcion": "Por habitación; 20-50 unidades"
            },
            {
                "componente": "Sensores PIR de ocupación",
                "categoria": "Sensor de Movimiento / Posición",
                "funcion": "Detecta movimiento, orientación o posición dentro del sistema."
            },
            {
                "componente": "DHT22",
                "categoria": "Sensor Ambiental",
                "funcion": "Temperatura y humedad"
            },
            {
                "componente": "Sensores de calidad del aire MQ-135",
                "categoria": "Sensor Ambiental",
                "funcion": "Mide variables ambientales relevantes para el sistema."
            },
            {
                "componente": "Relés de 4 canales",
                "categoria": "Actuador",
                "funcion": "Control HVAC e iluminación"
            },
            {
                "componente": "Módulo RFID RC522",
                "categoria": "Módulo de Comunicación / Conectividad",
                "funcion": "Cerraduras inteligentes"
            },
            {
                "componente": "Display táctil 7\"",
                "categoria": "Interfaz de Usuario / Iluminación",
                "funcion": "Panel de control en habitación"
            },
            {
                "componente": "Arduino Nano",
                "categoria": "Microcontrolador",
                "funcion": "Control de actuadores"
            },
            {
                "componente": "Controlador IR",
                "categoria": "Otro Componente de Hardware",
                "funcion": "Para TV/AC"
            }
        ],
        "software_tabla": [
            {
                "herramienta": "Node-RED",
                "tipo": "Automatización / Orquestación",
                "descripcion": "Para automatización hotelera"
            },
            {
                "herramienta": "MQTT",
                "tipo": "Protocolo de Comunicación IoT",
                "descripcion": "Para comunicación entre habitaciones"
            },
            {
                "herramienta": "PostgreSQL",
                "tipo": "Base de Datos",
                "descripcion": "Para perfiles de huéspedes"
            },
            {
                "herramienta": "Python con Flask",
                "tipo": "Framework Web / Aplicación",
                "descripcion": "Para API REST"
            },
            {
                "herramienta": "Dashboard web con Vue.js",
                "tipo": "Visualización / Dashboard",
                "descripcion": "Presenta los datos del sistema en paneles visuales."
            },
            {
                "herramienta": "Sistema de reservas",
                "tipo": "Herramienta / Tecnología de Software",
                "descripcion": "Integración"
            },
            {
                "herramienta": "Machine learning",
                "tipo": "Inteligencia Artificial / Machine Learning",
                "descripcion": "Para predicción de preferencias"
            },
            {
                "herramienta": "Grafana",
                "tipo": "Visualización / Dashboard",
                "descripcion": "Para métricas de ocupación y energía Funcionalidades Clave"
            },
            {
                "herramienta": "Check-in automático con apertura de habitación vía smartphone",
                "tipo": "Herramienta / Tecnología de Software",
                "descripcion": "Tecnología de software empleada en el desarrollo del proyecto."
            },
            {
                "herramienta": "Ajuste automático de temperatura al detectar llegada del huésped",
                "tipo": "Herramienta / Tecnología de Software",
                "descripcion": "Tecnología de software empleada en el desarrollo del proyecto."
            },
            {
                "herramienta": "Apagado de sistemas al detectar habitación vacía",
                "tipo": "Herramienta / Tecnología de Software",
                "descripcion": "Ahorro energético"
            },
            {
                "herramienta": "Alertas de limpieza basadas en tiempo real de ocupación",
                "tipo": "Herramienta / Tecnología de Software",
                "descripcion": "Tecnología de software empleada en el desarrollo del proyecto."
            },
            {
                "herramienta": "Integración con control de voz",
                "tipo": "Herramienta / Tecnología de Software",
                "descripcion": "Alexa/Google Assistant"
            },
            {
                "herramienta": "Reportes de consumo energético por habitación",
                "tipo": "Herramienta / Tecnología de Software",
                "descripcion": "Tecnología de software empleada en el desarrollo del proyecto."
            },
            {
                "herramienta": "Sistema de peticiones del huésped vía app móvil",
                "tipo": "Framework Web / Aplicación",
                "descripcion": "Provee la interfaz web o móvil del sistema."
            }
        ]
    },
    {
        "id": "proj_042",
        "titulo": "🔭 Proyecto 42: Guía Turística Inteligente con Realidad Aumentada y Geolocalización",
        "descripcion": "Problema: Resumen Breve Sistema de guía turística interactiva que utiliza beacons Bluetooth, GPS y realidad aumentada para proporcionar información contextual de sitios históricos, rutas personalizadas y estadísticas de flujo turístico en tiempo real. Problemática Los turistas carecen de información contextual enriquecida en sitios históricos, las audioguías tradicionales son costosas y genéricas, y los gestores turísticos no tienen datos en tiempo real sobre flujos y preferencias de visitantes.",
        "area": "SBC-IoT + IoT con Visión Artificial",
        "sector": "Turismo y hotelería inteligente",
        "nivel": "Avanzado",
        "duracion": "Un semestre",
        "presupuesto": "Bajo costo",
        "hardware": [
            "Raspberry Pi 4 (Computadora de Placa Reducida (SBC) | Servidor central)",
            "ESP32 con BLE (Microcontrolador | Beacons; 20-30 unidades)",
            "GPS NEO-6M (Módulo de Comunicación / Conectividad | Wearable para tracking)",
            "Panel solar pequeño (Fuente de Alimentación / Energía | Energía para beacons remotos)",
            "Baterías LiPo 3.7V (Fuente de Alimentación / Energía | Suministra energía eléctrica a los componentes del sistema.)",
            "Carcasas impermeables (Estructura / Componente Mecánico | Para exteriores)",
            "Smartphone del usuario (Otro Componente de Hardware | App móvil)"
        ],
        "software": [
            "Aplicación móvil con React Native: Framework Web / Aplicación - Provee la interfaz web o móvil del sistema.",
            "ARCore/ARKit: Herramienta / Tecnología de Software - Para realidad aumentada",
            "Algoritmos de ruteo: Inteligencia Artificial / Machine Learning - Dijkstra, A*",
            "PostgreSQL con PostGIS: Base de Datos - Datos geográficos",
            "Python con Flask: Framework Web / Aplicación - Para backend",
            "Sistema de recomendaciones con ML: Herramienta / Tecnología de Software - Tecnología de software empleada en el desarrollo del proyecto.",
            "Mapas con Mapbox/Google Maps API: Herramienta / Tecnología de Software - Tecnología de software empleada en el desarrollo del proyecto.",
            "Análisis de heatmaps con Folium: Librería / Herramienta de Análisis de Datos - Se utiliza para el procesamiento y análisis de los datos recolectados."
        ],
        "habilidades": [
            "Desarrollo de aplicaciones móviles • Tecnología beacon BLE • Realidad aumentada aplicada • Algoritmos de optimización de rutas • Análisis geoespacial • Sistemas de recomendación PROYECTOS DE DEPORTES Y FITNESS INTELIGENTE PROYECTOS DE DEPORTES Y FITNESS INTELIGENTE"
        ],
        "objetivos": [
            "🎯 Objetivo General: Desarrollar una plataforma de guía turística inteligente que proporcione información contextual mediante geolocalización, genere rutas personalizadas y analice patrones de visitantes para optimización de sitios turísticos.",
            "📌 Objetivos Específicos:",
            "• Implementar red de beacons BLE en puntos de interés turístico que transmitan información contextual a aplicación móvil.",
            "• Desarrollar algoritmo de rutas turísticas personalizadas según intereses, tiempo disponible y condición física del visitante.",
            "• Crear sistema de análisis de flujos turísticos que genere mapas de calor y métricas de puntos de mayor interés."
        ],
        "pasos": [
            "Análisis de requisitos",
            "Diseño de la solución",
            "Implementación y pruebas",
            "Validación y sustentación"
        ],
        "aplicaciones": [
            "Turismo y hotelería inteligente"
        ],
        "referencias": [],
        "hardware_tabla": [
            {
                "componente": "Raspberry Pi 4",
                "categoria": "Computadora de Placa Reducida (SBC)",
                "funcion": "Servidor central"
            },
            {
                "componente": "ESP32 con BLE",
                "categoria": "Microcontrolador",
                "funcion": "Beacons; 20-30 unidades"
            },
            {
                "componente": "GPS NEO-6M",
                "categoria": "Módulo de Comunicación / Conectividad",
                "funcion": "Wearable para tracking"
            },
            {
                "componente": "Panel solar pequeño",
                "categoria": "Fuente de Alimentación / Energía",
                "funcion": "Energía para beacons remotos"
            },
            {
                "componente": "Baterías LiPo 3.7V",
                "categoria": "Fuente de Alimentación / Energía",
                "funcion": "Suministra energía eléctrica a los componentes del sistema."
            },
            {
                "componente": "Carcasas impermeables",
                "categoria": "Estructura / Componente Mecánico",
                "funcion": "Para exteriores"
            },
            {
                "componente": "Smartphone del usuario",
                "categoria": "Otro Componente de Hardware",
                "funcion": "App móvil"
            }
        ],
        "software_tabla": [
            {
                "herramienta": "Aplicación móvil con React Native",
                "tipo": "Framework Web / Aplicación",
                "descripcion": "Provee la interfaz web o móvil del sistema."
            },
            {
                "herramienta": "ARCore/ARKit",
                "tipo": "Herramienta / Tecnología de Software",
                "descripcion": "Para realidad aumentada"
            },
            {
                "herramienta": "Algoritmos de ruteo",
                "tipo": "Inteligencia Artificial / Machine Learning",
                "descripcion": "Dijkstra, A*"
            },
            {
                "herramienta": "PostgreSQL con PostGIS",
                "tipo": "Base de Datos",
                "descripcion": "Datos geográficos"
            },
            {
                "herramienta": "Python con Flask",
                "tipo": "Framework Web / Aplicación",
                "descripcion": "Para backend"
            },
            {
                "herramienta": "Sistema de recomendaciones con ML",
                "tipo": "Herramienta / Tecnología de Software",
                "descripcion": "Tecnología de software empleada en el desarrollo del proyecto."
            },
            {
                "herramienta": "Mapas con Mapbox/Google Maps API",
                "tipo": "Herramienta / Tecnología de Software",
                "descripcion": "Tecnología de software empleada en el desarrollo del proyecto."
            },
            {
                "herramienta": "Análisis de heatmaps con Folium",
                "tipo": "Librería / Herramienta de Análisis de Datos",
                "descripcion": "Se utiliza para el procesamiento y análisis de los datos recolectados."
            }
        ]
    },
    {
        "id": "proj_043",
        "titulo": "🧬 Proyecto 43: Monitor de Rendimiento Deportivo con Análisis Biomecánico",
        "descripcion": "Problema: Resumen Breve Sistema wearable que analiza biomecánica de movimientos deportivos (carrera, ciclismo, natación) mediante sensores IMU, genera métricas de rendimiento y detecta patrones de movimiento que predispongan a lesiones. Problemática Los deportistas amateur carecen de retroalimentación objetiva sobre técnica y biomecánica, entrenando con patrones incorrectos que limitan rendimiento y aumentan riesgo de lesiones por sobrecarga o mala técnica.",
        "area": "SBC-IoT + AIoT",
        "sector": "Deportes y fitness inteligente",
        "nivel": "Avanzado",
        "duracion": "Un semestre",
        "presupuesto": "Bajo costo",
        "hardware": [
            "ESP32 (Microcontrolador | Procesador principal wearable)",
            "MPU9250 (Sensor de Movimiento / Posición | Acelerómetro + giroscopio + magnetómetro)",
            "Sensor de frecuencia cardíaca MAX30102 (Sensor Biomédico | Registra señales fisiológicas del usuario para su monitoreo.)",
            "GPS NEO-6M (Módulo de Comunicación / Conectividad | Velocidad y distancia)",
            "Batería LiPo 3.7V 2000mAh (Fuente de Alimentación / Energía | Suministra energía eléctrica a los componentes del sistema.)",
            "Módulo Bluetooth BLE (Módulo de Comunicación / Conectividad | Permite la transmisión inalámbrica de datos entre dispositivos.)",
            "Carcasa deportiva resistente al agua (Estructura / Componente Mecánico | Brinda soporte físico o estructural al prototipo.)",
            "Raspberry Pi 4 (Computadora de Placa Reducida (SBC) | Análisis offline)",
            "Bandas elásticas (Otro Componente de Hardware | Para fijación)"
        ],
        "software": [
            "Python con SciPy: Lenguaje de Programación - Para análisis de señales",
            "Filtros Kalman: Herramienta / Tecnología de Software - Para fusión sensorial",
            "TensorFlow: Inteligencia Artificial / Machine Learning - Para clasificación de movimientos",
            "Aplicación móvil con Flutter: Framework Web / Aplicación - Provee la interfaz web o móvil del sistema.",
            "Algoritmos de detección de ciclos: Inteligencia Artificial / Machine Learning - Pasos, pedaladas",
            "Cálculo de ángulos articulares: Herramienta / Tecnología de Software - Tecnología de software empleada en el desarrollo del proyecto.",
            "Visualización 3D de movimientos: Herramienta / Tecnología de Software - Tecnología de software empleada en el desarrollo del proyecto.",
            "SQLite: Base de Datos - Para registro de entrenamientos"
        ],
        "habilidades": [
            "Análisis biomecánico deportivo",
            "Fusión de sensores IMU",
            "Machine learning para detección de patrones",
            "Desarrollo de wearables deportivos",
            "Procesamiento de señales inerciales",
            "Prevención de lesiones deportivas"
        ],
        "objetivos": [
            "🎯 Objetivo General: Desarrollar un sistema de monitoreo deportivo que analice biomecánica de movimientos, genere métricas de rendimiento y detecte patrones de riesgo de lesión mediante sensores inerciales y machine learning.",
            "📌 Objetivos Específicos:",
            "• Implementar sensores IMU (acelerómetro, giroscopio, magnetómetro) en wearable que capture cinemática de movimientos deportivos.",
            "• Desarrollar algoritmos de análisis biomecánico que calculen cadencia, simetría, impacto y eficiencia de movimiento.",
            "• Entrenar modelos de clasificación que identifiquen patrones de movimiento asociados a alto riesgo de lesión."
        ],
        "pasos": [
            "Análisis de requisitos",
            "Diseño de la solución",
            "Implementación y pruebas",
            "Validación y sustentación"
        ],
        "aplicaciones": [
            "Deportes y fitness inteligente"
        ],
        "referencias": [],
        "hardware_tabla": [
            {
                "componente": "ESP32",
                "categoria": "Microcontrolador",
                "funcion": "Procesador principal wearable"
            },
            {
                "componente": "MPU9250",
                "categoria": "Sensor de Movimiento / Posición",
                "funcion": "Acelerómetro + giroscopio + magnetómetro"
            },
            {
                "componente": "Sensor de frecuencia cardíaca MAX30102",
                "categoria": "Sensor Biomédico",
                "funcion": "Registra señales fisiológicas del usuario para su monitoreo."
            },
            {
                "componente": "GPS NEO-6M",
                "categoria": "Módulo de Comunicación / Conectividad",
                "funcion": "Velocidad y distancia"
            },
            {
                "componente": "Batería LiPo 3.7V 2000mAh",
                "categoria": "Fuente de Alimentación / Energía",
                "funcion": "Suministra energía eléctrica a los componentes del sistema."
            },
            {
                "componente": "Módulo Bluetooth BLE",
                "categoria": "Módulo de Comunicación / Conectividad",
                "funcion": "Permite la transmisión inalámbrica de datos entre dispositivos."
            },
            {
                "componente": "Carcasa deportiva resistente al agua",
                "categoria": "Estructura / Componente Mecánico",
                "funcion": "Brinda soporte físico o estructural al prototipo."
            },
            {
                "componente": "Raspberry Pi 4",
                "categoria": "Computadora de Placa Reducida (SBC)",
                "funcion": "Análisis offline"
            },
            {
                "componente": "Bandas elásticas",
                "categoria": "Otro Componente de Hardware",
                "funcion": "Para fijación"
            }
        ],
        "software_tabla": [
            {
                "herramienta": "Python con SciPy",
                "tipo": "Lenguaje de Programación",
                "descripcion": "Para análisis de señales"
            },
            {
                "herramienta": "Filtros Kalman",
                "tipo": "Herramienta / Tecnología de Software",
                "descripcion": "Para fusión sensorial"
            },
            {
                "herramienta": "TensorFlow",
                "tipo": "Inteligencia Artificial / Machine Learning",
                "descripcion": "Para clasificación de movimientos"
            },
            {
                "herramienta": "Aplicación móvil con Flutter",
                "tipo": "Framework Web / Aplicación",
                "descripcion": "Provee la interfaz web o móvil del sistema."
            },
            {
                "herramienta": "Algoritmos de detección de ciclos",
                "tipo": "Inteligencia Artificial / Machine Learning",
                "descripcion": "Pasos, pedaladas"
            },
            {
                "herramienta": "Cálculo de ángulos articulares",
                "tipo": "Herramienta / Tecnología de Software",
                "descripcion": "Tecnología de software empleada en el desarrollo del proyecto."
            },
            {
                "herramienta": "Visualización 3D de movimientos",
                "tipo": "Herramienta / Tecnología de Software",
                "descripcion": "Tecnología de software empleada en el desarrollo del proyecto."
            },
            {
                "herramienta": "SQLite",
                "tipo": "Base de Datos",
                "descripcion": "Para registro de entrenamientos"
            }
        ]
    },
    {
        "id": "proj_044",
        "titulo": "🤖 Proyecto 44: Sistema Inteligente de Gestión de Gimnasios con Control de Aforo",
        "descripcion": "Problema: Resumen Breve Plataforma de gestión para gimnasios que controla aforo en tiempo real mediante visión artificial, gestiona turnos de equipos compartidos, monitorea uso de máquinas y genera métricas de ocupación para optimización operativa. Problemática Los gimnasios enfrentan problemas de sobrecupo en horas pico, tiempos de espera para usar equipos, falta de higienización entre usuarios y dificultades para planificar mantenimiento por desconocimiento de patrones de uso real.",
        "area": "SBC-IoT + IoT con Visión Artificial",
        "sector": "Deportes y fitness inteligente",
        "nivel": "Intermedio",
        "duracion": "Un semestre",
        "presupuesto": "Bajo costo",
        "hardware": [
            "Raspberry Pi 4 (Computadora de Placa Reducida (SBC) | Servidor central)",
            "ESP32-CAM (Microcontrolador con Cámara Integrada | 2-3 unidades en entradas)",
            "Sensores de presión FSR (Otro Componente de Hardware | En máquinas)",
            "Sensores PIR (Sensor de Movimiento / Posición | Zonas del gimnasio)",
            "Display LED (Interfaz de Usuario / Iluminación | Para aforo actual)",
            "RFID RC522 (Módulo de Comunicación / Conectividad | Control de acceso miembros)",
            "Arduino Nano (Microcontrolador | Nodos de sensores)",
            "Buzzer (Interfaz de Usuario / Iluminación | Para notificaciones)",
            "Relé (Actuador | Para control de torniquete)"
        ],
        "software": [
            "OpenCV: Inteligencia Artificial / Machine Learning - Para conteo de personas",
            "Python con Flask: Framework Web / Aplicación - Para backend",
            "PostgreSQL: Base de Datos - Para base de datos",
            "Dashboard web con React: Visualización / Dashboard - Presenta los datos del sistema en paneles visuales.",
            "MQTT: Protocolo de Comunicación IoT - Para comunicación sensores",
            "Sistema de reservas de turnos: Herramienta / Tecnología de Software - Tecnología de software empleada en el desarrollo del proyecto.",
            "Notificaciones push: Herramienta / Tecnología de Software - Tecnología de software empleada en el desarrollo del proyecto.",
            "Generación de reportes con Pandas: Librería / Herramienta de Análisis de Datos - Se utiliza para el procesamiento y análisis de los datos recolectados."
        ],
        "habilidades": [
            "Control de aforo automatizado • Sistemas de gestión deportiva • Optimización de recursos compartidos • Computer vision para conteo • Desarrollo de aplicaciones web • Análisis de métricas operativas PROYECTOS DE TRANSPORTE Y MOVILIDAD URBANA INTELIGENTE PROYECTOS DE TRANSPORTE Y MOVILIDAD URBANA INTELIGENTE"
        ],
        "objetivos": [
            "🎯 Objetivo General: Desarrollar un sistema de gestión inteligente de gimnasios que controle aforo, optimice uso de equipos y genere métricas operativas mediante sensores de ocupación y visión artificial.",
            "📌 Objetivos Específicos:",
            "• Implementar sistema de conteo de personas con ESP32-CAM en entradas que monitoree aforo en tiempo real y controle acceso.",
            "• Desarrollar sensores de ocupación en máquinas de ejercicio que registren tiempos de uso y generen turnos automáticos.",
            "• Crear dashboard de gestión que visualice métricas de ocupación, uso de equipos y programe mantenimiento predictivo."
        ],
        "pasos": [
            "Análisis de requisitos",
            "Diseño de la solución",
            "Implementación y pruebas",
            "Validación y sustentación"
        ],
        "aplicaciones": [
            "Deportes y fitness inteligente"
        ],
        "referencias": [],
        "hardware_tabla": [
            {
                "componente": "Raspberry Pi 4",
                "categoria": "Computadora de Placa Reducida (SBC)",
                "funcion": "Servidor central"
            },
            {
                "componente": "ESP32-CAM",
                "categoria": "Microcontrolador con Cámara Integrada",
                "funcion": "2-3 unidades en entradas"
            },
            {
                "componente": "Sensores de presión FSR",
                "categoria": "Otro Componente de Hardware",
                "funcion": "En máquinas"
            },
            {
                "componente": "Sensores PIR",
                "categoria": "Sensor de Movimiento / Posición",
                "funcion": "Zonas del gimnasio"
            },
            {
                "componente": "Display LED",
                "categoria": "Interfaz de Usuario / Iluminación",
                "funcion": "Para aforo actual"
            },
            {
                "componente": "RFID RC522",
                "categoria": "Módulo de Comunicación / Conectividad",
                "funcion": "Control de acceso miembros"
            },
            {
                "componente": "Arduino Nano",
                "categoria": "Microcontrolador",
                "funcion": "Nodos de sensores"
            },
            {
                "componente": "Buzzer",
                "categoria": "Interfaz de Usuario / Iluminación",
                "funcion": "Para notificaciones"
            },
            {
                "componente": "Relé",
                "categoria": "Actuador",
                "funcion": "Para control de torniquete"
            }
        ],
        "software_tabla": [
            {
                "herramienta": "OpenCV",
                "tipo": "Inteligencia Artificial / Machine Learning",
                "descripcion": "Para conteo de personas"
            },
            {
                "herramienta": "Python con Flask",
                "tipo": "Framework Web / Aplicación",
                "descripcion": "Para backend"
            },
            {
                "herramienta": "PostgreSQL",
                "tipo": "Base de Datos",
                "descripcion": "Para base de datos"
            },
            {
                "herramienta": "Dashboard web con React",
                "tipo": "Visualización / Dashboard",
                "descripcion": "Presenta los datos del sistema en paneles visuales."
            },
            {
                "herramienta": "MQTT",
                "tipo": "Protocolo de Comunicación IoT",
                "descripcion": "Para comunicación sensores"
            },
            {
                "herramienta": "Sistema de reservas de turnos",
                "tipo": "Herramienta / Tecnología de Software",
                "descripcion": "Tecnología de software empleada en el desarrollo del proyecto."
            },
            {
                "herramienta": "Notificaciones push",
                "tipo": "Herramienta / Tecnología de Software",
                "descripcion": "Tecnología de software empleada en el desarrollo del proyecto."
            },
            {
                "herramienta": "Generación de reportes con Pandas",
                "tipo": "Librería / Herramienta de Análisis de Datos",
                "descripcion": "Se utiliza para el procesamiento y análisis de los datos recolectados."
            }
        ]
    },
    {
        "id": "proj_045",
        "titulo": "📡 Proyecto 45: Sistema de Bicicletas Compartidas con Estaciones Inteligentes",
        "descripcion": "Problema: Resumen Breve Plataforma de bicicletas compartidas con estaciones inteligentes que gestionan préstamo/devolución automático, rastrean ubicación de bicicletas, detectan mantenimiento necesario y optimizan redistribución entre estaciones mediante análisis predictivo. Problemática Los sistemas de bicicletas compartidas enfrentan desbalances de distribución (estaciones vacías/llenas), vandalismo, falta de mantenimiento oportuno y dificultades para rastrear bicicletas, afectando disponibilidad y experiencia del usuario.",
        "area": "SBC-IoT + IoT con Analítica",
        "sector": "Transporte y movilidad urbana inteligente",
        "nivel": "Intermedio-Avanzado",
        "duracion": "Un semestre",
        "presupuesto": "Bajo costo",
        "hardware": [
            "Raspberry Pi 4 (Computadora de Placa Reducida (SBC) | Por estación; 5-10 unidades)",
            "ESP32 con GPS (Microcontrolador | Por bicicleta)",
            "Cerradura electrónica solenoide (Actuador | Ejecuta una acción física en respuesta a las decisiones del sistema.)",
            "Sensor magnético de anclaje (Otro Componente de Hardware | Forma parte del hardware de soporte del proyecto.)",
            "Acelerómetro MPU6050 (Sensor de Movimiento / Posición | Detección de caídas)",
            "RFID RC522 en estaciones (Módulo de Comunicación / Conectividad | Permite la transmisión inalámbrica de datos entre dispositivos.)",
            "Panel solar 20W por estación (Fuente de Alimentación / Energía | Suministra energía eléctrica a los componentes del sistema.)",
            "Batería 12V (Fuente de Alimentación / Energía | Para respaldo)",
            "Display LCD (Interfaz de Usuario / Iluminación | Para información)"
        ],
        "software": [
            "Python con Django: Framework Web / Aplicación - Para backend",
            "PostgreSQL con PostGIS: Base de Datos - Almacena los datos generados por el sistema.",
            "Aplicación móvil con React Native: Framework Web / Aplicación - Provee la interfaz web o móvil del sistema.",
            "Algoritmos de predicción de demanda: Inteligencia Artificial / Machine Learning - LSTM",
            "Mapas en tiempo real con Mapbox: Herramienta / Tecnología de Software - Tecnología de software empleada en el desarrollo del proyecto.",
            "Sistema de pagos: Herramienta / Tecnología de Software - Integración",
            "Node-RED: Automatización / Orquestación - Para gestión de estaciones",
            "Dashboard con Grafana Funcionalidades del Sistema: Visualización / Dashboard - Presenta los datos del sistema en paneles visuales.",
            "Desbloqueo de bicicletas vía app móvil o tarjeta RFID: Framework Web / Aplicación - Provee la interfaz web o móvil del sistema.",
            "Rastreo GPS en tiempo real de todas las bicicletas: Herramienta / Tecnología de Software - Tecnología de software empleada en el desarrollo del proyecto.",
            "Detección de uso no autorizado: Herramienta / Tecnología de Software - Sin desbloqueo",
            "Alertas de mantenimiento: Herramienta / Tecnología de Software - Kilometraje, caídas",
            "Mapa de disponibilidad en estaciones: Herramienta / Tecnología de Software - Tecnología de software empleada en el desarrollo del proyecto.",
            "Predicción de demanda por franja horaria: Herramienta / Tecnología de Software - Tecnología de software empleada en el desarrollo del proyecto.",
            "Rutas sugeridas: Herramienta / Tecnología de Software - Para redistribución",
            "Sistema de reportes de daños por usuarios: Herramienta / Tecnología de Software - Tecnología de software empleada en el desarrollo del proyecto."
        ],
        "habilidades": [
            "Sistemas de movilidad compartida",
            "Optimización logística",
            "Forecasting de demanda",
            "Desarrollo de apps móviles",
            "Gestión de flotas IoT",
            "Análisis geoespacial"
        ],
        "objetivos": [
            "🎯 Objetivo General: Desarrollar un sistema de gestión de bicicletas compartidas que automatice préstamo/devolución, rastree ubicación en tiempo real y optimice redistribución mediante análisis predictivo de demanda.",
            "📌 Objetivos Específicos:",
            "• Implementar cerraduras inteligentes IoT en bicicletas con GPS y sensores de movimiento para rastreo y detección de uso no autorizado.",
            "• Desarrollar estaciones de anclaje con sensores de disponibilidad y sistema de autenticación RFID/NFC para usuarios.",
            "• Crear algoritmo predictivo que anticipe demanda por estación y horario para optimizar redistribución de bicicletas."
        ],
        "pasos": [
            "Análisis de requisitos",
            "Diseño de la solución",
            "Implementación y pruebas",
            "Validación y sustentación"
        ],
        "aplicaciones": [
            "Transporte y movilidad urbana inteligente"
        ],
        "referencias": [],
        "hardware_tabla": [
            {
                "componente": "Raspberry Pi 4",
                "categoria": "Computadora de Placa Reducida (SBC)",
                "funcion": "Por estación; 5-10 unidades"
            },
            {
                "componente": "ESP32 con GPS",
                "categoria": "Microcontrolador",
                "funcion": "Por bicicleta"
            },
            {
                "componente": "Cerradura electrónica solenoide",
                "categoria": "Actuador",
                "funcion": "Ejecuta una acción física en respuesta a las decisiones del sistema."
            },
            {
                "componente": "Sensor magnético de anclaje",
                "categoria": "Otro Componente de Hardware",
                "funcion": "Forma parte del hardware de soporte del proyecto."
            },
            {
                "componente": "Acelerómetro MPU6050",
                "categoria": "Sensor de Movimiento / Posición",
                "funcion": "Detección de caídas"
            },
            {
                "componente": "RFID RC522 en estaciones",
                "categoria": "Módulo de Comunicación / Conectividad",
                "funcion": "Permite la transmisión inalámbrica de datos entre dispositivos."
            },
            {
                "componente": "Panel solar 20W por estación",
                "categoria": "Fuente de Alimentación / Energía",
                "funcion": "Suministra energía eléctrica a los componentes del sistema."
            },
            {
                "componente": "Batería 12V",
                "categoria": "Fuente de Alimentación / Energía",
                "funcion": "Para respaldo"
            },
            {
                "componente": "Display LCD",
                "categoria": "Interfaz de Usuario / Iluminación",
                "funcion": "Para información"
            }
        ],
        "software_tabla": [
            {
                "herramienta": "Python con Django",
                "tipo": "Framework Web / Aplicación",
                "descripcion": "Para backend"
            },
            {
                "herramienta": "PostgreSQL con PostGIS",
                "tipo": "Base de Datos",
                "descripcion": "Almacena los datos generados por el sistema."
            },
            {
                "herramienta": "Aplicación móvil con React Native",
                "tipo": "Framework Web / Aplicación",
                "descripcion": "Provee la interfaz web o móvil del sistema."
            },
            {
                "herramienta": "Algoritmos de predicción de demanda",
                "tipo": "Inteligencia Artificial / Machine Learning",
                "descripcion": "LSTM"
            },
            {
                "herramienta": "Mapas en tiempo real con Mapbox",
                "tipo": "Herramienta / Tecnología de Software",
                "descripcion": "Tecnología de software empleada en el desarrollo del proyecto."
            },
            {
                "herramienta": "Sistema de pagos",
                "tipo": "Herramienta / Tecnología de Software",
                "descripcion": "Integración"
            },
            {
                "herramienta": "Node-RED",
                "tipo": "Automatización / Orquestación",
                "descripcion": "Para gestión de estaciones"
            },
            {
                "herramienta": "Dashboard con Grafana Funcionalidades del Sistema",
                "tipo": "Visualización / Dashboard",
                "descripcion": "Presenta los datos del sistema en paneles visuales."
            },
            {
                "herramienta": "Desbloqueo de bicicletas vía app móvil o tarjeta RFID",
                "tipo": "Framework Web / Aplicación",
                "descripcion": "Provee la interfaz web o móvil del sistema."
            },
            {
                "herramienta": "Rastreo GPS en tiempo real de todas las bicicletas",
                "tipo": "Herramienta / Tecnología de Software",
                "descripcion": "Tecnología de software empleada en el desarrollo del proyecto."
            },
            {
                "herramienta": "Detección de uso no autorizado",
                "tipo": "Herramienta / Tecnología de Software",
                "descripcion": "Sin desbloqueo"
            },
            {
                "herramienta": "Alertas de mantenimiento",
                "tipo": "Herramienta / Tecnología de Software",
                "descripcion": "Kilometraje, caídas"
            },
            {
                "herramienta": "Mapa de disponibilidad en estaciones",
                "tipo": "Herramienta / Tecnología de Software",
                "descripcion": "Tecnología de software empleada en el desarrollo del proyecto."
            },
            {
                "herramienta": "Predicción de demanda por franja horaria",
                "tipo": "Herramienta / Tecnología de Software",
                "descripcion": "Tecnología de software empleada en el desarrollo del proyecto."
            },
            {
                "herramienta": "Rutas sugeridas",
                "tipo": "Herramienta / Tecnología de Software",
                "descripcion": "Para redistribución"
            },
            {
                "herramienta": "Sistema de reportes de daños por usuarios",
                "tipo": "Herramienta / Tecnología de Software",
                "descripcion": "Tecnología de software empleada en el desarrollo del proyecto."
            }
        ]
    },
    {
        "id": "proj_046",
        "titulo": "🕹️ Proyecto 46: Monitor de Condiciones de Vías con Detección de Baches y Alertas",
        "descripcion": "Problema: Resumen Breve Sistema vehicular que detecta baches, grietas y deterioro del pavimento mediante acelerómetros y GPS, genera mapas de condición de vías y prioriza mantenimiento vial basado en severidad de daños detectados. Problemática El deterioro de vías urbanas causa daños vehiculares, accidentes y molestias, pero municipalidades carecen de datos precisos sobre ubicación y severidad de baches para priorizar reparaciones de forma eficiente.",
        "area": "SBC-IoT + AIoT",
        "sector": "Transporte y movilidad urbana inteligente",
        "nivel": "Intermedio",
        "duracion": "Un semestre",
        "presupuesto": "Bajo costo",
        "hardware": [
            "ESP32 (Microcontrolador | Dispositivo vehicular)",
            "Acelerómetro ADXL345 (Sensor de Movimiento / Posición | Alta sensibilidad)",
            "GPS NEO-6M (Módulo de Comunicación / Conectividad | Permite la transmisión inalámbrica de datos entre dispositivos.)",
            "Módulo GSM SIM800L (Módulo de Comunicación / Conectividad | Transmisión datos)",
            "SD card (Otro Componente de Hardware | Para logs offline)",
            "Batería portable o conector 12V (Fuente de Alimentación / Energía | Suministra energía eléctrica a los componentes del sistema.)",
            "Carcasa (Estructura / Componente Mecánico | Para tablero del vehículo)",
            "Raspberry Pi 4 (Computadora de Placa Reducida (SBC) | Servidor central)"
        ],
        "software": [
            "Python con SciPy: Lenguaje de Programación - Análisis de vibraciones",
            "Random Forest, SVM: Inteligencia Artificial / Machine Learning - Machine learning",
            "PostgreSQL con PostGIS: Base de Datos - Almacena los datos generados por el sistema.",
            "Mapas con Leaflet/Mapbox: Herramienta / Tecnología de Software - Tecnología de software empleada en el desarrollo del proyecto.",
            "Node-RED: Automatización / Orquestación - Para ingesta de datos",
            "Algoritmos de clustering: Inteligencia Artificial / Machine Learning - DBSCAN",
            "Dashboard web: Visualización / Dashboard - Para municipalidades",
            "API REST: Framework Web / Aplicación - Para apps de reporte ciudadano"
        ],
        "habilidades": [
            "Detección de anomalías viales • Crowdsourcing de datos urbanos • Análisis de vibraciones vehiculares • Machine learning para clasificación • Sistemas de información geográfica • Priorización de mantenimiento vial PROYECTOS DE RETAIL Y COMERCIO INTELIGENTE PROYECTOS DE RETAIL Y COMERCIO INTELIGENTE"
        ],
        "objetivos": [
            "🎯 Objetivo General: Desarrollar un sistema de monitoreo de condiciones de vías urbanas que detecte automáticamente baches y deterioro mediante sensores vehiculares, generando mapas para priorización de mantenimiento.",
            "📌 Objetivos Específicos:",
            "• Implementar sensores de vibración (acelerómetros) y GPS en vehículos que detecten anomalías del pavimento durante conducción normal.",
            "• Desarrollar algoritmo de clasificación de severidad de baches usando machine learning con datos de aceleración vertical.",
            "• Crear plataforma de mapeo colaborativo que agregue datos de múltiples vehículos y genere mapas de prioridad de reparación."
        ],
        "pasos": [
            "Análisis de requisitos",
            "Diseño de la solución",
            "Implementación y pruebas",
            "Validación y sustentación"
        ],
        "aplicaciones": [
            "Transporte y movilidad urbana inteligente"
        ],
        "referencias": [],
        "hardware_tabla": [
            {
                "componente": "ESP32",
                "categoria": "Microcontrolador",
                "funcion": "Dispositivo vehicular"
            },
            {
                "componente": "Acelerómetro ADXL345",
                "categoria": "Sensor de Movimiento / Posición",
                "funcion": "Alta sensibilidad"
            },
            {
                "componente": "GPS NEO-6M",
                "categoria": "Módulo de Comunicación / Conectividad",
                "funcion": "Permite la transmisión inalámbrica de datos entre dispositivos."
            },
            {
                "componente": "Módulo GSM SIM800L",
                "categoria": "Módulo de Comunicación / Conectividad",
                "funcion": "Transmisión datos"
            },
            {
                "componente": "SD card",
                "categoria": "Otro Componente de Hardware",
                "funcion": "Para logs offline"
            },
            {
                "componente": "Batería portable o conector 12V",
                "categoria": "Fuente de Alimentación / Energía",
                "funcion": "Suministra energía eléctrica a los componentes del sistema."
            },
            {
                "componente": "Carcasa",
                "categoria": "Estructura / Componente Mecánico",
                "funcion": "Para tablero del vehículo"
            },
            {
                "componente": "Raspberry Pi 4",
                "categoria": "Computadora de Placa Reducida (SBC)",
                "funcion": "Servidor central"
            }
        ],
        "software_tabla": [
            {
                "herramienta": "Python con SciPy",
                "tipo": "Lenguaje de Programación",
                "descripcion": "Análisis de vibraciones"
            },
            {
                "herramienta": "Random Forest, SVM",
                "tipo": "Inteligencia Artificial / Machine Learning",
                "descripcion": "Machine learning"
            },
            {
                "herramienta": "PostgreSQL con PostGIS",
                "tipo": "Base de Datos",
                "descripcion": "Almacena los datos generados por el sistema."
            },
            {
                "herramienta": "Mapas con Leaflet/Mapbox",
                "tipo": "Herramienta / Tecnología de Software",
                "descripcion": "Tecnología de software empleada en el desarrollo del proyecto."
            },
            {
                "herramienta": "Node-RED",
                "tipo": "Automatización / Orquestación",
                "descripcion": "Para ingesta de datos"
            },
            {
                "herramienta": "Algoritmos de clustering",
                "tipo": "Inteligencia Artificial / Machine Learning",
                "descripcion": "DBSCAN"
            },
            {
                "herramienta": "Dashboard web",
                "tipo": "Visualización / Dashboard",
                "descripcion": "Para municipalidades"
            },
            {
                "herramienta": "API REST",
                "tipo": "Framework Web / Aplicación",
                "descripcion": "Para apps de reporte ciudadano"
            }
        ]
    },
    {
        "id": "proj_047",
        "titulo": "🎮 Proyecto 47: Análisis de Comportamiento de Clientes en Tiendas con Mapas de Calor",
        "descripcion": "Problema: Resumen Breve Sistema de análisis de comportamiento en punto de venta que rastrea movimientos de clientes mediante visión artificial, genera mapas de calor de zonas más visitadas, mide tiempos de permanencia y optimiza disposición de productos. Problemática Los comerciantes desconocen patrones reales de comportamiento de clientes en tienda (zonas visitadas, productos observados, rutas), basando decisiones de merchandising en intuición en lugar de datos objetivos.",
        "area": "SBC-IoT + IoT con Visión Artificial",
        "sector": "Retail y comercio inteligente",
        "nivel": "Avanzado",
        "duracion": "Un semestre",
        "presupuesto": "Bajo costo",
        "hardware": [
            "Raspberry Pi 4 (Computadora de Placa Reducida (SBC) | Procesamiento central)",
            "ESP32-CAM (Microcontrolador con Cámara Integrada | 6-10 unidades según tamaño tienda)",
            "Sensores ultrasónicos HC-SR04 (Sensor de Movimiento / Posición | Estanterías)",
            "Sensores de peso HX711 (Componente Electrónico / Accesorio | Productos tomados)",
            "Beacons BLE (Sensor de Movimiento / Posición | Análisis de proximidad)",
            "Arduino Nano (Microcontrolador | Control de sensores)",
            "Display (Interfaz de Usuario / Iluminación | Para métricas en tiempo real)"
        ],
        "software": [
            "OpenCV: Inteligencia Artificial / Machine Learning - Para detección y tracking",
            "YOLO: Inteligencia Artificial / Machine Learning - Para detección de personas",
            "Algoritmos de tracking: Inteligencia Artificial / Machine Learning - SORT, DeepSORT",
            "Python con análisis espacial: Lenguaje de Programación - Lenguaje utilizado para desarrollar la lógica del sistema.",
            "PostgreSQL: Base de Datos - Para datos históricos",
            "Generación de heatmaps con Seaborn: Herramienta / Tecnología de Software - Tecnología de software empleada en el desarrollo del proyecto.",
            "Dashboard con D3.js: Visualización / Dashboard - Para visualizaciones",
            "Algoritmos de funnel analysis: Inteligencia Artificial / Machine Learning - Procesa datos mediante modelos de IA/ML para generar predicciones o clasificaciones."
        ],
        "habilidades": [
            "Computer vision para retail",
            "Multi-object tracking",
            "Análisis de comportamiento del consumidor",
            "Visualización de datos espaciales",
            "Optimización de merchandising",
            "Preservación de privacidad en análisis"
        ],
        "objetivos": [
            "🎯 Objetivo General: Desarrollar un sistema de análisis de comportamiento de clientes en retail que genere mapas de calor, analice rutas y mida interacción con productos mediante visión artificial y sensores de proximidad.",
            "📌 Objetivos Específicos:",
            "• Implementar red de cámaras ESP32-CAM y sensores de proximidad que rastreen movimientos de clientes preservando privacidad.",
            "• Desarrollar algoritmos de tracking multi-persona que generen trayectorias anónimas y tiempos de permanencia por zona.",
            "• Crear visualizaciones de mapas de calor y análisis de conversión (personas que miran vs compran) para optimización de layout."
        ],
        "pasos": [
            "Análisis de requisitos",
            "Diseño de la solución",
            "Implementación y pruebas",
            "Validación y sustentación"
        ],
        "aplicaciones": [
            "Retail y comercio inteligente"
        ],
        "referencias": [],
        "hardware_tabla": [
            {
                "componente": "Raspberry Pi 4",
                "categoria": "Computadora de Placa Reducida (SBC)",
                "funcion": "Procesamiento central"
            },
            {
                "componente": "ESP32-CAM",
                "categoria": "Microcontrolador con Cámara Integrada",
                "funcion": "6-10 unidades según tamaño tienda"
            },
            {
                "componente": "Sensores ultrasónicos HC-SR04",
                "categoria": "Sensor de Movimiento / Posición",
                "funcion": "Estanterías"
            },
            {
                "componente": "Sensores de peso HX711",
                "categoria": "Componente Electrónico / Accesorio",
                "funcion": "Productos tomados"
            },
            {
                "componente": "Beacons BLE",
                "categoria": "Sensor de Movimiento / Posición",
                "funcion": "Análisis de proximidad"
            },
            {
                "componente": "Arduino Nano",
                "categoria": "Microcontrolador",
                "funcion": "Control de sensores"
            },
            {
                "componente": "Display",
                "categoria": "Interfaz de Usuario / Iluminación",
                "funcion": "Para métricas en tiempo real"
            }
        ],
        "software_tabla": [
            {
                "herramienta": "OpenCV",
                "tipo": "Inteligencia Artificial / Machine Learning",
                "descripcion": "Para detección y tracking"
            },
            {
                "herramienta": "YOLO",
                "tipo": "Inteligencia Artificial / Machine Learning",
                "descripcion": "Para detección de personas"
            },
            {
                "herramienta": "Algoritmos de tracking",
                "tipo": "Inteligencia Artificial / Machine Learning",
                "descripcion": "SORT, DeepSORT"
            },
            {
                "herramienta": "Python con análisis espacial",
                "tipo": "Lenguaje de Programación",
                "descripcion": "Lenguaje utilizado para desarrollar la lógica del sistema."
            },
            {
                "herramienta": "PostgreSQL",
                "tipo": "Base de Datos",
                "descripcion": "Para datos históricos"
            },
            {
                "herramienta": "Generación de heatmaps con Seaborn",
                "tipo": "Herramienta / Tecnología de Software",
                "descripcion": "Tecnología de software empleada en el desarrollo del proyecto."
            },
            {
                "herramienta": "Dashboard con D3.js",
                "tipo": "Visualización / Dashboard",
                "descripcion": "Para visualizaciones"
            },
            {
                "herramienta": "Algoritmos de funnel analysis",
                "tipo": "Inteligencia Artificial / Machine Learning",
                "descripcion": "Procesa datos mediante modelos de IA/ML para generar predicciones o clasificaciones."
            }
        ]
    },
    {
        "id": "proj_048",
        "titulo": "🚀 Proyecto 48: Caja Automática con Reconocimiento de Productos por Visión",
        "descripcion": "Problema: Resumen Breve Sistema de checkout automatizado que identifica productos mediante visión artificial, calcula total de compra sin escaneo manual, detecta intentos de fraude y acelera proceso de pago en tiendas de conveniencia. Problemática Las filas en cajas de supermercados generan frustración y pérdida de ventas, el escaneo manual es lento y propenso a errores, y los sistemas de auto-checkout tradicionales requieren escaneo individual de productos.",
        "area": "AIoT + IoT con Visión Artificial",
        "sector": "Retail y comercio inteligente",
        "nivel": "Avanzado",
        "duracion": "Un semestre",
        "presupuesto": "Bajo costo",
        "hardware": [
            "Raspberry Pi 4 (Computadora de Placa Reducida (SBC) | Actúa como unidad de procesamiento central o gateway del sistema (4GB RAM mínimo).)",
            "Cámara Raspberry Pi v2 o USB HD (Cámara / Sensor de Visión | Captura imágenes o video para el módulo de visión artificial.)",
            "Iluminación LED controlada (Interfaz de Usuario / Iluminación | Permite la interacción, iluminación o notificación visual/sonora del sistema.)",
            "Celda de carga 20kg con HX711 (Componente Electrónico / Accesorio | Complementa el circuito electrónico del prototipo.)",
            "Display táctil 7\" (Interfaz de Usuario / Iluminación | Interfaz usuario)",
            "Lector RFID/NFC (Módulo de Comunicación / Conectividad | Pagos sin contacto)",
            "Arduino Nano (Microcontrolador | Control báscula)",
            "Impresora térmica de tickets (Interfaz de Usuario / Iluminación | Permite la interacción, iluminación o notificación visual/sonora del sistema.)",
            "Buzzer (Interfaz de Usuario / Iluminación | Para confirmaciones)"
        ],
        "software": [
            "TensorFlow Lite con MobileNet: Inteligencia Artificial / Machine Learning - Procesa datos mediante modelos de IA/ML para generar predicciones o clasificaciones.",
            "OpenCV: Inteligencia Artificial / Machine Learning - Para pre-procesamiento",
            "Python con picamera: Lenguaje de Programación - Lenguaje utilizado para desarrollar la lógica del sistema.",
            "Dataset personalizado de productos: Herramienta / Tecnología de Software - Tecnología de software empleada en el desarrollo del proyecto.",
            "Transfer learning: Herramienta / Tecnología de Software - Tecnología de software empleada en el desarrollo del proyecto.",
            "SQLite: Base de Datos - Para catálogo de productos",
            "Sistema de pagos: Herramienta / Tecnología de Software - Integración",
            "Dashboard administrativo web: Visualización / Dashboard - Presenta los datos del sistema en paneles visuales.",
            "Algoritmos de detección de fraude: Inteligencia Artificial / Machine Learning - Procesa datos mediante modelos de IA/ML para generar predicciones o clasificaciones."
        ],
        "habilidades": [
            "Object recognition en retail • Transfer learning aplicado • Sistemas de punto de venta • Detección de fraude por IA",
            "Integración de sistemas de pago • Computer vision para comercio PROYECTOS DE AGRICULTURA VERTICAL Y URBANA PROYECTOS DE AGRICULTURA VERTICAL Y URBANA"
        ],
        "objetivos": [
            "🎯 Objetivo General: Desarrollar un sistema de caja automática basado en visión artificial que identifique productos automáticamente, calcule totales sin escaneo manual y reduzca tiempos de checkout significativamente.",
            "📌 Objetivos Específicos:",
            "• Entrenar modelo de deep learning que identifique productos comunes de tienda con precisión >95% usando dataset personalizado.",
            "• Implementar sistema de peso que valide correspondencia entre productos detectados visualmente y peso total.",
            "• Desarrollar detección de anomalías que identifique intentos de fraude (productos ocultos, sustitución) con alertas al personal."
        ],
        "pasos": [
            "Análisis de requisitos",
            "Diseño de la solución",
            "Implementación y pruebas",
            "Validación y sustentación"
        ],
        "aplicaciones": [
            "Retail y comercio inteligente"
        ],
        "referencias": [],
        "hardware_tabla": [
            {
                "componente": "Raspberry Pi 4",
                "categoria": "Computadora de Placa Reducida (SBC)",
                "funcion": "Actúa como unidad de procesamiento central o gateway del sistema (4GB RAM mínimo)."
            },
            {
                "componente": "Cámara Raspberry Pi v2 o USB HD",
                "categoria": "Cámara / Sensor de Visión",
                "funcion": "Captura imágenes o video para el módulo de visión artificial."
            },
            {
                "componente": "Iluminación LED controlada",
                "categoria": "Interfaz de Usuario / Iluminación",
                "funcion": "Permite la interacción, iluminación o notificación visual/sonora del sistema."
            },
            {
                "componente": "Celda de carga 20kg con HX711",
                "categoria": "Componente Electrónico / Accesorio",
                "funcion": "Complementa el circuito electrónico del prototipo."
            },
            {
                "componente": "Display táctil 7\"",
                "categoria": "Interfaz de Usuario / Iluminación",
                "funcion": "Interfaz usuario"
            },
            {
                "componente": "Lector RFID/NFC",
                "categoria": "Módulo de Comunicación / Conectividad",
                "funcion": "Pagos sin contacto"
            },
            {
                "componente": "Arduino Nano",
                "categoria": "Microcontrolador",
                "funcion": "Control báscula"
            },
            {
                "componente": "Impresora térmica de tickets",
                "categoria": "Interfaz de Usuario / Iluminación",
                "funcion": "Permite la interacción, iluminación o notificación visual/sonora del sistema."
            },
            {
                "componente": "Buzzer",
                "categoria": "Interfaz de Usuario / Iluminación",
                "funcion": "Para confirmaciones"
            }
        ],
        "software_tabla": [
            {
                "herramienta": "TensorFlow Lite con MobileNet",
                "tipo": "Inteligencia Artificial / Machine Learning",
                "descripcion": "Procesa datos mediante modelos de IA/ML para generar predicciones o clasificaciones."
            },
            {
                "herramienta": "OpenCV",
                "tipo": "Inteligencia Artificial / Machine Learning",
                "descripcion": "Para pre-procesamiento"
            },
            {
                "herramienta": "Python con picamera",
                "tipo": "Lenguaje de Programación",
                "descripcion": "Lenguaje utilizado para desarrollar la lógica del sistema."
            },
            {
                "herramienta": "Dataset personalizado de productos",
                "tipo": "Herramienta / Tecnología de Software",
                "descripcion": "Tecnología de software empleada en el desarrollo del proyecto."
            },
            {
                "herramienta": "Transfer learning",
                "tipo": "Herramienta / Tecnología de Software",
                "descripcion": "Tecnología de software empleada en el desarrollo del proyecto."
            },
            {
                "herramienta": "SQLite",
                "tipo": "Base de Datos",
                "descripcion": "Para catálogo de productos"
            },
            {
                "herramienta": "Sistema de pagos",
                "tipo": "Herramienta / Tecnología de Software",
                "descripcion": "Integración"
            },
            {
                "herramienta": "Dashboard administrativo web",
                "tipo": "Visualización / Dashboard",
                "descripcion": "Presenta los datos del sistema en paneles visuales."
            },
            {
                "herramienta": "Algoritmos de detección de fraude",
                "tipo": "Inteligencia Artificial / Machine Learning",
                "descripcion": "Procesa datos mediante modelos de IA/ML para generar predicciones o clasificaciones."
            }
        ]
    },
    {
        "id": "proj_049",
        "titulo": "🌱 Proyecto 49: Sistema Hidropónico Inteligente con Control Automatizado de Nutrientes",
        "descripcion": "Problema: Resumen Breve Sistema automatizado para cultivos hidropónicos que monitorea y controla pH, conductividad eléctrica (EC), temperatura de solución nutritiva, oxigenación y dosifica fertilizantes automáticamente para optimizar crecimiento de plantas. Problemática La hidroponía requiere control preciso y constante de parámetros químicos de solución nutritiva, proceso manual tedioso y propenso a errores que afecta rendimiento de cultivos y puede causar pérdidas totales por desbalances nutricionales.",
        "area": "SBC-IoT + AIoT",
        "sector": "Agricultura vertical y urbana",
        "nivel": "Avanzado",
        "duracion": "Un semestre",
        "presupuesto": "Bajo costo",
        "hardware": [
            "Raspberry Pi 4 (Computadora de Placa Reducida (SBC) | Actúa como unidad de procesamiento central o gateway del sistema.)",
            "Arduino Mega (Microcontrolador | Control de actuadores)",
            "Sensor de pH analógico (Otro Componente de Hardware | Forma parte del hardware de soporte del proyecto.)",
            "Sensor de EC/TDS (Otro Componente de Hardware | Forma parte del hardware de soporte del proyecto.)",
            "Sensor de temperatura DS18B20 waterproof (Sensor Ambiental | Mide variables ambientales relevantes para el sistema.)",
            "Sensor de nivel ultrasónico (Sensor de Movimiento / Posición | Detecta movimiento, orientación o posición dentro del sistema.)",
            "Bombas peristálticas (Actuador | Ejecuta una acción física en respuesta a las decisiones del sistema (4 unidades).)",
            "Bomba de aire (Actuador | Para oxigenación)",
            "Relés de 8 canales (Actuador | Ejecuta una acción física en respuesta a las decisiones del sistema.)",
            "Electroválvulas (Actuador | Ejecuta una acción física en respuesta a las decisiones del sistema.)",
            "Display LCD 20x4 (Interfaz de Usuario / Iluminación | Permite la interacción, iluminación o notificación visual/sonora del sistema.)"
        ],
        "software": [
            "Python con GPIO: Lenguaje de Programación - Lenguaje utilizado para desarrollar la lógica del sistema.",
            "Algoritmos de control PID: Inteligencia Artificial / Machine Learning - Procesa datos mediante modelos de IA/ML para generar predicciones o clasificaciones.",
            "Node-RED: Automatización / Orquestación - Para automatización",
            "InfluxDB: Base de Datos - Para series temporales",
            "Grafana: Visualización / Dashboard - Para monitoreo",
            "MQTT: Protocolo de Comunicación IoT - Para comunicación",
            "Librería de recetas de cultivo: Herramienta / Tecnología de Software - Tecnología de software empleada en el desarrollo del proyecto.",
            "Alertas por Telegram: Herramienta / Tecnología de Software - Tecnología de software empleada en el desarrollo del proyecto.",
            "Calibración automática de sensores: Herramienta / Tecnología de Software - Tecnología de software empleada en el desarrollo del proyecto."
        ],
        "habilidades": [
            "Hidroponía automatizada",
            "Control PID aplicado",
            "Química de soluciones nutritivas",
            "Calibración de sensores químicos",
            "Sistemas de dosificación automática",
            "Agricultura de precisión"
        ],
        "objetivos": [
            "🎯 Objetivo General: Desarrollar un sistema de control automatizado para cultivos hidropónicos que mantenga parámetros óptimos de solución nutritiva mediante monitoreo continuo y dosificación automática de correctores.",
            "📌 Objetivos Específicos:",
            "• Implementar sensores de pH, EC, temperatura y nivel de solución con bombas dosificadoras peristálticas para ajustes automáticos.",
            "• Desarrollar algoritmos de control PID que mantengan pH y EC en rangos óptimos específicos por tipo de cultivo.",
            "• Crear recetas de cultivo personalizables que ajusten parámetros según fase de crecimiento (vegetativa, floración, fructificación)."
        ],
        "pasos": [
            "Análisis de requisitos",
            "Diseño de la solución",
            "Implementación y pruebas",
            "Validación y sustentación"
        ],
        "aplicaciones": [
            "Agricultura vertical y urbana"
        ],
        "referencias": [],
        "hardware_tabla": [
            {
                "componente": "Raspberry Pi 4",
                "categoria": "Computadora de Placa Reducida (SBC)",
                "funcion": "Actúa como unidad de procesamiento central o gateway del sistema."
            },
            {
                "componente": "Arduino Mega",
                "categoria": "Microcontrolador",
                "funcion": "Control de actuadores"
            },
            {
                "componente": "Sensor de pH analógico",
                "categoria": "Otro Componente de Hardware",
                "funcion": "Forma parte del hardware de soporte del proyecto."
            },
            {
                "componente": "Sensor de EC/TDS",
                "categoria": "Otro Componente de Hardware",
                "funcion": "Forma parte del hardware de soporte del proyecto."
            },
            {
                "componente": "Sensor de temperatura DS18B20 waterproof",
                "categoria": "Sensor Ambiental",
                "funcion": "Mide variables ambientales relevantes para el sistema."
            },
            {
                "componente": "Sensor de nivel ultrasónico",
                "categoria": "Sensor de Movimiento / Posición",
                "funcion": "Detecta movimiento, orientación o posición dentro del sistema."
            },
            {
                "componente": "Bombas peristálticas",
                "categoria": "Actuador",
                "funcion": "Ejecuta una acción física en respuesta a las decisiones del sistema (4 unidades)."
            },
            {
                "componente": "Bomba de aire",
                "categoria": "Actuador",
                "funcion": "Para oxigenación"
            },
            {
                "componente": "Relés de 8 canales",
                "categoria": "Actuador",
                "funcion": "Ejecuta una acción física en respuesta a las decisiones del sistema."
            },
            {
                "componente": "Electroválvulas",
                "categoria": "Actuador",
                "funcion": "Ejecuta una acción física en respuesta a las decisiones del sistema."
            },
            {
                "componente": "Display LCD 20x4",
                "categoria": "Interfaz de Usuario / Iluminación",
                "funcion": "Permite la interacción, iluminación o notificación visual/sonora del sistema."
            }
        ],
        "software_tabla": [
            {
                "herramienta": "Python con GPIO",
                "tipo": "Lenguaje de Programación",
                "descripcion": "Lenguaje utilizado para desarrollar la lógica del sistema."
            },
            {
                "herramienta": "Algoritmos de control PID",
                "tipo": "Inteligencia Artificial / Machine Learning",
                "descripcion": "Procesa datos mediante modelos de IA/ML para generar predicciones o clasificaciones."
            },
            {
                "herramienta": "Node-RED",
                "tipo": "Automatización / Orquestación",
                "descripcion": "Para automatización"
            },
            {
                "herramienta": "InfluxDB",
                "tipo": "Base de Datos",
                "descripcion": "Para series temporales"
            },
            {
                "herramienta": "Grafana",
                "tipo": "Visualización / Dashboard",
                "descripcion": "Para monitoreo"
            },
            {
                "herramienta": "MQTT",
                "tipo": "Protocolo de Comunicación IoT",
                "descripcion": "Para comunicación"
            },
            {
                "herramienta": "Librería de recetas de cultivo",
                "tipo": "Herramienta / Tecnología de Software",
                "descripcion": "Tecnología de software empleada en el desarrollo del proyecto."
            },
            {
                "herramienta": "Alertas por Telegram",
                "tipo": "Herramienta / Tecnología de Software",
                "descripcion": "Tecnología de software empleada en el desarrollo del proyecto."
            },
            {
                "herramienta": "Calibración automática de sensores",
                "tipo": "Herramienta / Tecnología de Software",
                "descripcion": "Tecnología de software empleada en el desarrollo del proyecto."
            }
        ]
    },
    {
        "id": "proj_050",
        "titulo": "🏙️ Proyecto 50: Granja Vertical Inteligente con Iluminación LED Optimizada",
        "descripcion": "Problema: Resumen Breve Sistema de agricultura vertical que controla iluminación LED multiespectral, clima, riego y CO2 según fase de crecimiento, optimiza consumo energético con machine learning y maximiza rendimiento por metro cuadrado en espacios urbanos. Problemática La agricultura urbana enfrenta limitaciones de espacio y altos costos energéticos por iluminación artificial, requiriendo optimización precisa de espectro lumínico, intensidad y fotoperiodo para maximizar rendimiento con mínimo consumo.",
        "area": "SBC-IoT + AIoT",
        "sector": "Agricultura vertical y urbana",
        "nivel": "Avanzado",
        "duracion": "Un semestre",
        "presupuesto": "Bajo costo",
        "hardware": [
            "Raspberry Pi 4 (Computadora de Placa Reducida (SBC) | Controlador maestro)",
            "Arduino Mega (Microcontrolador | Por nivel de cultivo)",
            "Tiras LED RGB ajustables (Interfaz de Usuario / Iluminación | Espectro completo)",
            "LEDs UV-A (Interfaz de Usuario / Iluminación | Floración)",
            "LEDs IR (Interfaz de Usuario / Iluminación | Fotomorfogénesis)",
            "Drivers PWM (Interfaz de Usuario / Iluminación | Para LEDs)",
            "DHT22 (Sensor Ambiental | Por nivel)",
            "Sensor de CO2 MH-Z19B (Sensor Ambiental | Mide variables ambientales relevantes para el sistema.)",
            "Cámara Raspberry Pi (Cámara / Sensor de Visión | Crecimiento)",
            "Bombas peristálticas (Actuador | Ejecuta una acción física en respuesta a las decisiones del sistema.)",
            "Ventiladores DC (Actuador | Ejecuta una acción física en respuesta a las decisiones del sistema.)",
            "Humidificador ultrasónico (Actuador | Ejecuta una acción física en respuesta a las decisiones del sistema.)"
        ],
        "software": [
            "Python con TensorFlow: Inteligencia Artificial / Machine Learning - Procesa datos mediante modelos de IA/ML para generar predicciones o clasificaciones.",
            "Reinforcement learning: Inteligencia Artificial / Machine Learning - Q-learning",
            "Computer vision: Librería / Herramienta de Análisis de Datos - Para análisis de crecimiento",
            "Control PWM de iluminación: Herramienta / Tecnología de Software - Tecnología de software empleada en el desarrollo del proyecto.",
            "Node-RED: Automatización / Orquestación - Para orquestación",
            "InfluxDB y Grafana: Base de Datos - Almacena los datos generados por el sistema.",
            "Recetas lumínicas por cultivo: Herramienta / Tecnología de Software - Tecnología de software empleada en el desarrollo del proyecto.",
            "Optimización energética: Herramienta / Tecnología de Software - Tecnología de software empleada en el desarrollo del proyecto.",
            "Análisis de imágenes time-lapse: Librería / Herramienta de Análisis de Datos - Se utiliza para el procesamiento y análisis de los datos recolectados."
        ],
        "habilidades": [
            "Agricultura vertical",
            "Fotobiología de plantas",
            "Reinforcement learning aplicado",
            "Optimización multiobjetivo",
            "Eficiencia energética",
            "Sistemas de producción urbana PARTE II — PROYECTOS 51 A 100 (AMPLIACIÓN) PROYECTOS DE IoT HACKING Y CIBERSEGURIDAD AVANZADA"
        ],
        "objetivos": [
            "🎯 Objetivo General: Desarrollar un sistema integral de granja vertical que optimice iluminación LED, clima y nutrición para maximizar rendimiento de cultivos en espacios urbanos reducidos con eficiencia energética.",
            "📌 Objetivos Específicos:",
            "• Implementar control de iluminación LED RGB+UV ajustable por espectro, intensidad y fotoperiodo según necesidades del cultivo.",
            "• Desarrollar algoritmo de optimización que ajuste parámetros ambientales usando reinforcement learning basado en tasa de crecimiento.",
            "• Integrar control de clima (temperatura, humedad, CO2), riego y nutrición en sistema centralizado con múltiples niveles."
        ],
        "pasos": [
            "Análisis de requisitos",
            "Diseño de la solución",
            "Implementación y pruebas",
            "Validación y sustentación"
        ],
        "aplicaciones": [
            "Agricultura vertical y urbana"
        ],
        "referencias": [],
        "hardware_tabla": [
            {
                "componente": "Raspberry Pi 4",
                "categoria": "Computadora de Placa Reducida (SBC)",
                "funcion": "Controlador maestro"
            },
            {
                "componente": "Arduino Mega",
                "categoria": "Microcontrolador",
                "funcion": "Por nivel de cultivo"
            },
            {
                "componente": "Tiras LED RGB ajustables",
                "categoria": "Interfaz de Usuario / Iluminación",
                "funcion": "Espectro completo"
            },
            {
                "componente": "LEDs UV-A",
                "categoria": "Interfaz de Usuario / Iluminación",
                "funcion": "Floración"
            },
            {
                "componente": "LEDs IR",
                "categoria": "Interfaz de Usuario / Iluminación",
                "funcion": "Fotomorfogénesis"
            },
            {
                "componente": "Drivers PWM",
                "categoria": "Interfaz de Usuario / Iluminación",
                "funcion": "Para LEDs"
            },
            {
                "componente": "DHT22",
                "categoria": "Sensor Ambiental",
                "funcion": "Por nivel"
            },
            {
                "componente": "Sensor de CO2 MH-Z19B",
                "categoria": "Sensor Ambiental",
                "funcion": "Mide variables ambientales relevantes para el sistema."
            },
            {
                "componente": "Cámara Raspberry Pi",
                "categoria": "Cámara / Sensor de Visión",
                "funcion": "Crecimiento"
            },
            {
                "componente": "Bombas peristálticas",
                "categoria": "Actuador",
                "funcion": "Ejecuta una acción física en respuesta a las decisiones del sistema."
            },
            {
                "componente": "Ventiladores DC",
                "categoria": "Actuador",
                "funcion": "Ejecuta una acción física en respuesta a las decisiones del sistema."
            },
            {
                "componente": "Humidificador ultrasónico",
                "categoria": "Actuador",
                "funcion": "Ejecuta una acción física en respuesta a las decisiones del sistema."
            }
        ],
        "software_tabla": [
            {
                "herramienta": "Python con TensorFlow",
                "tipo": "Inteligencia Artificial / Machine Learning",
                "descripcion": "Procesa datos mediante modelos de IA/ML para generar predicciones o clasificaciones."
            },
            {
                "herramienta": "Reinforcement learning",
                "tipo": "Inteligencia Artificial / Machine Learning",
                "descripcion": "Q-learning"
            },
            {
                "herramienta": "Computer vision",
                "tipo": "Librería / Herramienta de Análisis de Datos",
                "descripcion": "Para análisis de crecimiento"
            },
            {
                "herramienta": "Control PWM de iluminación",
                "tipo": "Herramienta / Tecnología de Software",
                "descripcion": "Tecnología de software empleada en el desarrollo del proyecto."
            },
            {
                "herramienta": "Node-RED",
                "tipo": "Automatización / Orquestación",
                "descripcion": "Para orquestación"
            },
            {
                "herramienta": "InfluxDB y Grafana",
                "tipo": "Base de Datos",
                "descripcion": "Almacena los datos generados por el sistema."
            },
            {
                "herramienta": "Recetas lumínicas por cultivo",
                "tipo": "Herramienta / Tecnología de Software",
                "descripcion": "Tecnología de software empleada en el desarrollo del proyecto."
            },
            {
                "herramienta": "Optimización energética",
                "tipo": "Herramienta / Tecnología de Software",
                "descripcion": "Tecnología de software empleada en el desarrollo del proyecto."
            },
            {
                "herramienta": "Análisis de imágenes time-lapse",
                "tipo": "Librería / Herramienta de Análisis de Datos",
                "descripcion": "Se utiliza para el procesamiento y análisis de los datos recolectados."
            }
        ]
    },
    {
        "id": "proj_051",
        "titulo": "🔒 Proyecto 51: Framework de Pentesting Automatizado para Dispositivos IoT",
        "descripcion": "Problema: Las empresas despliegan cientos de dispositivos IoT sin evaluar sistemáticamente sus vulnerabilidades, exponiéndose a ataques que podrían automatizarse y detectarse con herramientas de auditoría propias.\n\nDescripción: Framework en Python que combina escaneo de red, fingerprinting de dispositivos y una base de vulnerabilidades conocidas (CVE) para auditar automáticamente la postura de seguridad de una red IoT de laboratorio.",
        "area": "IoT Hacking y Ciberseguridad",
        "sector": "Ciberseguridad industrial y auditoría de dispositivos",
        "nivel": "Avanzado",
        "duracion": "Un semestre",
        "presupuesto": "Bajo costo",
        "hardware": [
            "Raspberry Pi 4 (Computadora de Placa Reducida (SBC) | Nodo de escaneo)",
            "ESP32 y dispositivos IoT de prueba (Microcontrolador | 5-6 unidades vulnerables por diseño)",
            "Switch gestionado (Otro Componente de Hardware | Para segmentar la red de laboratorio)",
            "Adaptador Wi-Fi con modo monitor (Otro Componente de Hardware | Forma parte del hardware de soporte del proyecto.)",
            "Router configurable (Otro Componente de Hardware | Para laboratorio aislado)"
        ],
        "software": [
            "Python con Scapy y Nmap: Ciberseguridad - Herramienta empleada para pruebas o protección de seguridad del sistema.",
            "Base de datos CVE/NVD vía API: Base de Datos - Almacena los datos generados por el sistema.",
            "Shodan API: Herramienta / Tecnología de Software - Solo en entorno de laboratorio propio",
            "SQLite: Base de Datos - Para almacenamiento de hallazgos",
            "Flask: Framework Web / Aplicación - Para el panel de reportes",
            "Docker: DevOps / Contenedores - Para aislar el entorno de pruebas"
        ],
        "habilidades": [
            "Metodologías de pentesting ético",
            "Automatización de auditorías de seguridad",
            "Análisis de vulnerabilidades IoT",
            "Elaboración de reportes técnicos de seguridad",
            "Ética profesional en hacking controlado"
        ],
        "objetivos": [
            "🎯 Objetivo General: Desarrollar un framework de pentesting automatizado que escanee, identifique y reporte vulnerabilidades comunes en dispositivos IoT dentro de una red controlada de laboratorio.",
            "📌 Objetivos Específicos:",
            "• Implementar un módulo de descubrimiento de dispositivos IoT en red mediante fingerprinting de protocolos y puertos abiertos.",
            "• Automatizar pruebas de vulnerabilidades conocidas (credenciales por defecto, firmware desactualizado, servicios inseguros) sobre los dispositivos detectados.",
            "• Generar reportes priorizados por severidad con recomendaciones de mitigación para cada hallazgo."
        ],
        "pasos": [
            "Análisis de requisitos",
            "Diseño de la solución",
            "Implementación y pruebas",
            "Validación y sustentación"
        ],
        "aplicaciones": [
            "Ciberseguridad industrial y auditoría de dispositivos"
        ],
        "referencias": [],
        "hardware_tabla": [
            {
                "componente": "Raspberry Pi 4",
                "categoria": "Computadora de Placa Reducida (SBC)",
                "funcion": "Nodo de escaneo"
            },
            {
                "componente": "ESP32 y dispositivos IoT de prueba",
                "categoria": "Microcontrolador",
                "funcion": "5-6 unidades vulnerables por diseño"
            },
            {
                "componente": "Switch gestionado",
                "categoria": "Otro Componente de Hardware",
                "funcion": "Para segmentar la red de laboratorio"
            },
            {
                "componente": "Adaptador Wi-Fi con modo monitor",
                "categoria": "Otro Componente de Hardware",
                "funcion": "Forma parte del hardware de soporte del proyecto."
            },
            {
                "componente": "Router configurable",
                "categoria": "Otro Componente de Hardware",
                "funcion": "Para laboratorio aislado"
            }
        ],
        "software_tabla": [
            {
                "herramienta": "Python con Scapy y Nmap",
                "tipo": "Ciberseguridad",
                "descripcion": "Herramienta empleada para pruebas o protección de seguridad del sistema."
            },
            {
                "herramienta": "Base de datos CVE/NVD vía API",
                "tipo": "Base de Datos",
                "descripcion": "Almacena los datos generados por el sistema."
            },
            {
                "herramienta": "Shodan API",
                "tipo": "Herramienta / Tecnología de Software",
                "descripcion": "Solo en entorno de laboratorio propio"
            },
            {
                "herramienta": "SQLite",
                "tipo": "Base de Datos",
                "descripcion": "Para almacenamiento de hallazgos"
            },
            {
                "herramienta": "Flask",
                "tipo": "Framework Web / Aplicación",
                "descripcion": "Para el panel de reportes"
            },
            {
                "herramienta": "Docker",
                "tipo": "DevOps / Contenedores",
                "descripcion": "Para aislar el entorno de pruebas"
            }
        ]
    },
    {
        "id": "proj_052",
        "titulo": "🛡️ Proyecto 52: Sistema de Detección de Ataques DDoS en Redes IoT con Machine Learning",
        "descripcion": "Problema: Las botnets IoT (como Mirai) han demostrado que dispositivos comprometidos pueden lanzar ataques DDoS masivos, y las redes carecen de detección temprana basada en el comportamiento del tráfico.\n\nDescripción: Sistema que analiza el tráfico de una red IoT simulada, extrae características estadísticas de los paquetes y utiliza modelos entrenados para identificar patrones característicos de ataques DDoS, activando alertas y reglas de firewall.",
        "area": "IoT Hacking y Ciberseguridad",
        "sector": "Ciberseguridad de infraestructuras IoT",
        "nivel": "Avanzado",
        "duracion": "Un semestre",
        "presupuesto": "Bajo costo",
        "hardware": [
            "Raspberry Pi 4 (Computadora de Placa Reducida (SBC) | Sensor de tráfico)",
            "ESP32 (Microcontrolador | Nodos IoT simulados, 6-8 unidades)",
            "Switch con puerto espejo (Otro Componente de Hardware | Port mirroring)",
            "Servidor mini-PC (Otro Componente de Hardware | Para entrenamiento de modelos)",
            "Router con soporte OpenWrt (Estructura / Componente Mecánico | Brinda soporte físico o estructural al prototipo.)"
        ],
        "software": [
            "Python con Scikit-learn y TensorFlow: Inteligencia Artificial / Machine Learning - Procesa datos mediante modelos de IA/ML para generar predicciones o clasificaciones.",
            "Wireshark/tshark: Ciberseguridad - Para captura de tráfico",
            "Suricata: Herramienta / Tecnología de Software - Usado como IDS complementario",
            "Pandas: Librería / Herramienta de Análisis de Datos - Para análisis de datasets de red",
            "Grafana: Visualización / Dashboard - Para visualización de tráfico",
            "iptables: Herramienta / Tecnología de Software - Para mitigación automática"
        ],
        "habilidades": [
            "Análisis de tráfico de red",
            "Machine learning aplicado a ciberseguridad",
            "Detección de anomalías",
            "Configuración de sistemas de prevención de intrusiones",
            "Respuesta a incidentes de seguridad"
        ],
        "objetivos": [
            "🎯 Objetivo General: Construir un sistema de detección de ataques DDoS originados o dirigidos a dispositivos IoT mediante análisis de tráfico de red en tiempo real con modelos de aprendizaje automático.",
            "📌 Objetivos Específicos:",
            "• Capturar y etiquetar tráfico de red normal y malicioso en un entorno de laboratorio con dispositivos IoT reales.",
            "• Entrenar modelos de clasificación que distingan patrones de tráfico DDoS de tráfico legítimo con baja tasa de falsos positivos.",
            "• Implementar un sistema de alertas y mitigación automática (bloqueo temporal) ante la detección de anomalías."
        ],
        "pasos": [
            "Análisis de requisitos",
            "Diseño de la solución",
            "Implementación y pruebas",
            "Validación y sustentación"
        ],
        "aplicaciones": [
            "Ciberseguridad de infraestructuras IoT"
        ],
        "referencias": [],
        "hardware_tabla": [
            {
                "componente": "Raspberry Pi 4",
                "categoria": "Computadora de Placa Reducida (SBC)",
                "funcion": "Sensor de tráfico"
            },
            {
                "componente": "ESP32",
                "categoria": "Microcontrolador",
                "funcion": "Nodos IoT simulados, 6-8 unidades"
            },
            {
                "componente": "Switch con puerto espejo",
                "categoria": "Otro Componente de Hardware",
                "funcion": "Port mirroring"
            },
            {
                "componente": "Servidor mini-PC",
                "categoria": "Otro Componente de Hardware",
                "funcion": "Para entrenamiento de modelos"
            },
            {
                "componente": "Router con soporte OpenWrt",
                "categoria": "Estructura / Componente Mecánico",
                "funcion": "Brinda soporte físico o estructural al prototipo."
            }
        ],
        "software_tabla": [
            {
                "herramienta": "Python con Scikit-learn y TensorFlow",
                "tipo": "Inteligencia Artificial / Machine Learning",
                "descripcion": "Procesa datos mediante modelos de IA/ML para generar predicciones o clasificaciones."
            },
            {
                "herramienta": "Wireshark/tshark",
                "tipo": "Ciberseguridad",
                "descripcion": "Para captura de tráfico"
            },
            {
                "herramienta": "Suricata",
                "tipo": "Herramienta / Tecnología de Software",
                "descripcion": "Usado como IDS complementario"
            },
            {
                "herramienta": "Pandas",
                "tipo": "Librería / Herramienta de Análisis de Datos",
                "descripcion": "Para análisis de datasets de red"
            },
            {
                "herramienta": "Grafana",
                "tipo": "Visualización / Dashboard",
                "descripcion": "Para visualización de tráfico"
            },
            {
                "herramienta": "iptables",
                "tipo": "Herramienta / Tecnología de Software",
                "descripcion": "Para mitigación automática"
            }
        ]
    },
    {
        "id": "proj_053",
        "titulo": "⛓️ Proyecto 53: Blockchain Ligero para Integridad de Datos en Sensores IoT Críticos",
        "descripcion": "Problema: Los datos de sensores críticos (salud, industria, energía) pueden ser alterados sin dejar rastro, comprometiendo decisiones basadas en información manipulada.\n\nDescripción: Red de nodos ESP32 que firman digitalmente sus lecturas y las encadenan mediante hashes, replicando un registro distribuido en varios nodos Raspberry Pi para detectar cualquier alteración posterior de los datos.",
        "area": "IoT Hacking y Ciberseguridad",
        "sector": "Ciberseguridad e integridad de datos industriales",
        "nivel": "Avanzado",
        "duracion": "Un semestre",
        "presupuesto": "Bajo costo",
        "hardware": [
            "Raspberry Pi 4 (Computadora de Placa Reducida (SBC) | Nodos validadores (3 unidades))",
            "ESP32 (Microcontrolador | Nodos sensores (5 unidades))",
            "Módulo de cifrado por hardware (Otro Componente de Hardware | ATECC608A)",
            "Sensores ambientales de prueba (Sensor Ambiental | DHT22, presión)",
            "Almacenamiento SSD/microSD de alta resistencia (Almacenamiento | Almacena datos o el sistema operativo de forma local.)"
        ],
        "software": [
            "Python con hashlib y cryptography: Lenguaje de Programación - Lenguaje utilizado para desarrollar la lógica del sistema.",
            "Hyperledger Sawtooth o implementación propia de blockchain ligero: Ciberseguridad - Herramienta empleada para pruebas o protección de seguridad del sistema.",
            "MQTT con TLS: Protocolo de Comunicación IoT - Para transporte seguro",
            "SQLite: Base de Datos - Para almacenamiento local por nodo",
            "React.js: Framework Web / Aplicación - Para el panel de auditoría"
        ],
        "habilidades": [
            "Fundamentos de blockchain y criptografía aplicada",
            "Diseño de sistemas distribuidos",
            "Seguridad en el transporte de datos IoT",
            "Integridad y no repudio de información",
            "Arquitecturas de consenso distribuido"
        ],
        "objetivos": [
            "🎯 Objetivo General: Implementar un mecanismo de registro inmutable tipo blockchain ligero que garantice la integridad y trazabilidad de las lecturas de sensores IoT críticos.",
            "📌 Objetivos Específicos:",
            "• Diseñar una estructura de bloques ligera (hash encadenado) apta para dispositivos de bajos recursos como ESP32.",
            "• Implementar validación distribuida entre varios nodos que confirme la integridad de cada bloque antes de aceptarlo.",
            "• Desarrollar un panel de auditoría que permita verificar la trazabilidad histórica de cualquier lectura registrada."
        ],
        "pasos": [
            "Análisis de requisitos",
            "Diseño de la solución",
            "Implementación y pruebas",
            "Validación y sustentación"
        ],
        "aplicaciones": [
            "Ciberseguridad e integridad de datos industriales"
        ],
        "referencias": [],
        "hardware_tabla": [
            {
                "componente": "Raspberry Pi 4",
                "categoria": "Computadora de Placa Reducida (SBC)",
                "funcion": "Nodos validadores (3 unidades)"
            },
            {
                "componente": "ESP32",
                "categoria": "Microcontrolador",
                "funcion": "Nodos sensores (5 unidades)"
            },
            {
                "componente": "Módulo de cifrado por hardware",
                "categoria": "Otro Componente de Hardware",
                "funcion": "ATECC608A"
            },
            {
                "componente": "Sensores ambientales de prueba",
                "categoria": "Sensor Ambiental",
                "funcion": "DHT22, presión"
            },
            {
                "componente": "Almacenamiento SSD/microSD de alta resistencia",
                "categoria": "Almacenamiento",
                "funcion": "Almacena datos o el sistema operativo de forma local."
            }
        ],
        "software_tabla": [
            {
                "herramienta": "Python con hashlib y cryptography",
                "tipo": "Lenguaje de Programación",
                "descripcion": "Lenguaje utilizado para desarrollar la lógica del sistema."
            },
            {
                "herramienta": "Hyperledger Sawtooth o implementación propia de blockchain ligero",
                "tipo": "Ciberseguridad",
                "descripcion": "Herramienta empleada para pruebas o protección de seguridad del sistema."
            },
            {
                "herramienta": "MQTT con TLS",
                "tipo": "Protocolo de Comunicación IoT",
                "descripcion": "Para transporte seguro"
            },
            {
                "herramienta": "SQLite",
                "tipo": "Base de Datos",
                "descripcion": "Para almacenamiento local por nodo"
            },
            {
                "herramienta": "React.js",
                "tipo": "Framework Web / Aplicación",
                "descripcion": "Para el panel de auditoría"
            }
        ]
    },
    {
        "id": "proj_054",
        "titulo": "👤 Proyecto 54: Sistema de Autenticación Biométrica Multimodal para Dispositivos IoT",
        "descripcion": "Problema: Las contraseñas y PINs en dispositivos IoT son fácilmente vulnerados, y muchos entornos críticos requieren mecanismos de autenticación más robustos y difíciles de suplantar.\n\nDescripción: Punto de control de acceso basado en Raspberry Pi que combina sensor de huella y cámara para reconocimiento facial, otorgando o denegando acceso a un gabinete de dispositivos IoT y registrando toda la actividad.",
        "area": "IoT Hacking y Ciberseguridad",
        "sector": "Control de acceso y ciberseguridad de identidad",
        "nivel": "Intermedio",
        "duracion": "Un semestre",
        "presupuesto": "Bajo costo",
        "hardware": [
            "Raspberry Pi 4 (Computadora de Placa Reducida (SBC) | Actúa como unidad de procesamiento central o gateway del sistema.)",
            "Sensor de huella dactilar óptico (Otro Componente de Hardware | R307/AS608)",
            "Cámara Raspberry Pi o USB HD (Cámara / Sensor de Visión | Captura imágenes o video para el módulo de visión artificial.)",
            "Cerradura electromagnética o solenoide (Actuador | Ejecuta una acción física en respuesta a las decisiones del sistema.)",
            "Módulo relé (Actuador | Para control de cerradura)",
            "Pantalla táctil pequeña (Interfaz de Usuario / Iluminación | Para feedback)"
        ],
        "software": [
            "Python con OpenCV y face_recognition: Inteligencia Artificial / Machine Learning - Procesa datos mediante modelos de IA/ML para generar predicciones o clasificaciones.",
            "Librería pyfingerprint: Herramienta / Tecnología de Software - Tecnología de software empleada en el desarrollo del proyecto.",
            "SQLite: Base de Datos - Para registro de accesos",
            "Node-RED: Automatización / Orquestación - Para flujos de control",
            "Telegram Bot API: Herramienta / Tecnología de Software - Para notificaciones de acceso"
        ],
        "habilidades": [
            "Biometría aplicada a control de acceso",
            "Visión artificial para reconocimiento facial",
            "Diseño de sistemas de autenticación multifactor",
            "Auditoría de accesos físicos",
            "Integración de sensores biométricos"
        ],
        "objetivos": [
            "🎯 Objetivo General: Desarrollar un sistema de autenticación biométrica multimodal (huella y reconocimiento facial) que controle el acceso físico y lógico a dispositivos y gabinetes IoT sensibles.",
            "📌 Objetivos Específicos:",
            "• Integrar sensores de huella dactilar y una cámara para reconocimiento facial en un mismo punto de control de acceso.",
            "• Implementar lógica de decisión que combine ambos factores biométricos para reducir falsos positivos y negativos.",
            "• Registrar cada intento de acceso (exitoso o fallido) en un log auditable con marca de tiempo y evidencia fotográfica."
        ],
        "pasos": [
            "Análisis de requisitos",
            "Diseño de la solución",
            "Implementación y pruebas",
            "Validación y sustentación"
        ],
        "aplicaciones": [
            "Control de acceso y ciberseguridad de identidad"
        ],
        "referencias": [],
        "hardware_tabla": [
            {
                "componente": "Raspberry Pi 4",
                "categoria": "Computadora de Placa Reducida (SBC)",
                "funcion": "Actúa como unidad de procesamiento central o gateway del sistema."
            },
            {
                "componente": "Sensor de huella dactilar óptico",
                "categoria": "Otro Componente de Hardware",
                "funcion": "R307/AS608"
            },
            {
                "componente": "Cámara Raspberry Pi o USB HD",
                "categoria": "Cámara / Sensor de Visión",
                "funcion": "Captura imágenes o video para el módulo de visión artificial."
            },
            {
                "componente": "Cerradura electromagnética o solenoide",
                "categoria": "Actuador",
                "funcion": "Ejecuta una acción física en respuesta a las decisiones del sistema."
            },
            {
                "componente": "Módulo relé",
                "categoria": "Actuador",
                "funcion": "Para control de cerradura"
            },
            {
                "componente": "Pantalla táctil pequeña",
                "categoria": "Interfaz de Usuario / Iluminación",
                "funcion": "Para feedback"
            }
        ],
        "software_tabla": [
            {
                "herramienta": "Python con OpenCV y face_recognition",
                "tipo": "Inteligencia Artificial / Machine Learning",
                "descripcion": "Procesa datos mediante modelos de IA/ML para generar predicciones o clasificaciones."
            },
            {
                "herramienta": "Librería pyfingerprint",
                "tipo": "Herramienta / Tecnología de Software",
                "descripcion": "Tecnología de software empleada en el desarrollo del proyecto."
            },
            {
                "herramienta": "SQLite",
                "tipo": "Base de Datos",
                "descripcion": "Para registro de accesos"
            },
            {
                "herramienta": "Node-RED",
                "tipo": "Automatización / Orquestación",
                "descripcion": "Para flujos de control"
            },
            {
                "herramienta": "Telegram Bot API",
                "tipo": "Herramienta / Tecnología de Software",
                "descripcion": "Para notificaciones de acceso"
            }
        ]
    },
    {
        "id": "proj_055",
        "titulo": "💻 Proyecto 55: Simulador de Ataques de Firmware para Formación en Seguridad Embebida",
        "descripcion": "Problema: La formación práctica en seguridad de firmware es escasa porque experimentar sobre dispositivos reales de producción implica riesgos legales y operativos, dejando a estudiantes sin entornos seguros de práctica.\n\nDescripción: Laboratorio físico con varios microcontroladores que ejecutan versiones de firmware con vulnerabilidades conocidas (buffer overflow, credenciales embebidas), usado para enseñar análisis y explotación ética en un entorno aislado.",
        "area": "IoT Hacking y Ciberseguridad",
        "sector": "Educación en ciberseguridad y formación técnica",
        "nivel": "Avanzado",
        "duracion": "Un semestre",
        "presupuesto": "Bajo costo",
        "hardware": [
            "ESP32 y Arduino (Microcontrolador | Controla y coordina los sensores/actuadores conectados a él (6 unidades con firmwares vulnerables).)",
            "Programador USB-TTL (Otro Componente de Hardware | Forma parte del hardware de soporte del proyecto.)",
            "Analizador lógico económico (Otro Componente de Hardware | Forma parte del hardware de soporte del proyecto.)",
            "Raspberry Pi 4 (Computadora de Placa Reducida (SBC) | Estación de análisis)",
            "Lector de EEPROM/Flash externo (Otro Componente de Hardware | Forma parte del hardware de soporte del proyecto.)"
        ],
        "software": [
            "Ghidra o radare2: Herramienta / Tecnología de Software - Para ingeniería inversa",
            "PlatformIO: IDE / Entorno de Desarrollo - Para compilación de firmwares",
            "Python: Lenguaje de Programación - Para scripts de explotación controlada",
            "Wireshark: Ciberseguridad - Para tráfico asociado",
            "Jupyter Notebook: IDE / Entorno de Desarrollo - Para documentación interactiva"
        ],
        "habilidades": [
            "Ingeniería inversa de firmware embebido",
            "Explotación ética de vulnerabilidades",
            "Análisis estático y dinámico de binarios",
            "Documentación técnica de seguridad",
            "Buenas prácticas de desarrollo seguro"
        ],
        "objetivos": [
            "🎯 Objetivo General: Crear un entorno controlado de laboratorio que permita analizar, modificar y explotar de forma segura firmwares vulnerables con fines exclusivamente educativos.",
            "📌 Objetivos Específicos:",
            "• Configurar un banco de pruebas con microcontroladores que ejecuten firmwares deliberadamente vulnerables.",
            "• Implementar herramientas de extracción y análisis estático de firmware (ingeniería inversa básica).",
            "• Documentar una guía paso a paso de cada vulnerabilidad explotada y su corrección correspondiente."
        ],
        "pasos": [
            "Análisis de requisitos",
            "Diseño de la solución",
            "Implementación y pruebas",
            "Validación y sustentación"
        ],
        "aplicaciones": [
            "Educación en ciberseguridad y formación técnica"
        ],
        "referencias": [],
        "hardware_tabla": [
            {
                "componente": "ESP32 y Arduino",
                "categoria": "Microcontrolador",
                "funcion": "Controla y coordina los sensores/actuadores conectados a él (6 unidades con firmwares vulnerables)."
            },
            {
                "componente": "Programador USB-TTL",
                "categoria": "Otro Componente de Hardware",
                "funcion": "Forma parte del hardware de soporte del proyecto."
            },
            {
                "componente": "Analizador lógico económico",
                "categoria": "Otro Componente de Hardware",
                "funcion": "Forma parte del hardware de soporte del proyecto."
            },
            {
                "componente": "Raspberry Pi 4",
                "categoria": "Computadora de Placa Reducida (SBC)",
                "funcion": "Estación de análisis"
            },
            {
                "componente": "Lector de EEPROM/Flash externo",
                "categoria": "Otro Componente de Hardware",
                "funcion": "Forma parte del hardware de soporte del proyecto."
            }
        ],
        "software_tabla": [
            {
                "herramienta": "Ghidra o radare2",
                "tipo": "Herramienta / Tecnología de Software",
                "descripcion": "Para ingeniería inversa"
            },
            {
                "herramienta": "PlatformIO",
                "tipo": "IDE / Entorno de Desarrollo",
                "descripcion": "Para compilación de firmwares"
            },
            {
                "herramienta": "Python",
                "tipo": "Lenguaje de Programación",
                "descripcion": "Para scripts de explotación controlada"
            },
            {
                "herramienta": "Wireshark",
                "tipo": "Ciberseguridad",
                "descripcion": "Para tráfico asociado"
            },
            {
                "herramienta": "Jupyter Notebook",
                "tipo": "IDE / Entorno de Desarrollo",
                "descripcion": "Para documentación interactiva"
            }
        ]
    },
    {
        "id": "proj_056",
        "titulo": "🔍 Proyecto 56: Sistema de Detección de Dispositivos IoT Falsificados (Contramedidas Anti- Spoofing)",
        "descripcion": "Problema: La proliferación de hardware IoT falsificado o clonado introduce riesgos de seguridad ocultos, y las organizaciones carecen de mecanismos simples para verificar la autenticidad de los dispositivos que despliegan.\n\nDescripción: Sistema que registra una huella física única de cada microcontrolador legítimo durante su aprovisionamiento y la compara periódicamente contra el comportamiento actual del dispositivo para detectar sustituciones o clonaciones no autorizadas.",
        "area": "IoT Hacking y Ciberseguridad",
        "sector": "Ciberseguridad de cadena de suministro tecnológico",
        "nivel": "Avanzado",
        "duracion": "Un semestre",
        "presupuesto": "Bajo costo",
        "hardware": [
            "ESP32 (Microcontrolador | Dispositivos bajo prueba, 8-10 unidades)",
            "Raspberry Pi 4 (Computadora de Placa Reducida (SBC) | Servidor de verificación)",
            "Multímetro/osciloscopio USB económico (Otro Componente de Hardware | Para caracterización)",
            "Fuente de alimentación regulada de precisión (Fuente de Alimentación / Energía | Suministra energía eléctrica a los componentes del sistema.)"
        ],
        "software": [
            "Python: Inteligencia Artificial / Machine Learning - Para algoritmos de comparación PUF",
            "PostgreSQL: Base de Datos - Para el inventario de huellas",
            "Flask/Django: Framework Web / Aplicación - Para el panel de gestión",
            "Bibliotecas de estadística: Librería / Herramienta de Análisis de Datos - SciPy; para análisis de variación"
        ],
        "habilidades": [
            "Fundamentos de seguridad de hardware",
            "Funciones físicas no clonables (PUF)",
            "Gestión de inventario y cadena de suministro segura",
            "Análisis estadístico de señales físicas",
            "Detección de falsificación de hardware"
        ],
        "objetivos": [
            "🎯 Objetivo General: Diseñar un sistema que verifique la autenticidad de dispositivos IoT mediante huellas físicas únicas (PUF) y análisis de comportamiento eléctrico, detectando hardware clonado o falsificado.",
            "📌 Objetivos Específicos:",
            "• Implementar una función física no clonable (PUF) simple basada en variaciones de tiempo de respuesta de memoria en microcontroladores.",
            "• Desarrollar un algoritmo de comparación que identifique desviaciones respecto a la huella de referencia registrada por dispositivo.",
            "• Construir un panel de gestión de inventario que marque dispositivos como auténticos, sospechosos o falsificados."
        ],
        "pasos": [
            "Análisis de requisitos",
            "Diseño de la solución",
            "Implementación y pruebas",
            "Validación y sustentación"
        ],
        "aplicaciones": [
            "Ciberseguridad de cadena de suministro tecnológico"
        ],
        "referencias": [],
        "hardware_tabla": [
            {
                "componente": "ESP32",
                "categoria": "Microcontrolador",
                "funcion": "Dispositivos bajo prueba, 8-10 unidades"
            },
            {
                "componente": "Raspberry Pi 4",
                "categoria": "Computadora de Placa Reducida (SBC)",
                "funcion": "Servidor de verificación"
            },
            {
                "componente": "Multímetro/osciloscopio USB económico",
                "categoria": "Otro Componente de Hardware",
                "funcion": "Para caracterización"
            },
            {
                "componente": "Fuente de alimentación regulada de precisión",
                "categoria": "Fuente de Alimentación / Energía",
                "funcion": "Suministra energía eléctrica a los componentes del sistema."
            }
        ],
        "software_tabla": [
            {
                "herramienta": "Python",
                "tipo": "Inteligencia Artificial / Machine Learning",
                "descripcion": "Para algoritmos de comparación PUF"
            },
            {
                "herramienta": "PostgreSQL",
                "tipo": "Base de Datos",
                "descripcion": "Para el inventario de huellas"
            },
            {
                "herramienta": "Flask/Django",
                "tipo": "Framework Web / Aplicación",
                "descripcion": "Para el panel de gestión"
            },
            {
                "herramienta": "Bibliotecas de estadística",
                "tipo": "Librería / Herramienta de Análisis de Datos",
                "descripcion": "SciPy; para análisis de variación"
            }
        ]
    },
    {
        "id": "proj_057",
        "titulo": "🌐 Proyecto 57: Plataforma de Threat Intelligence Colaborativa para Redes IoT Domésticas",
        "descripcion": "Problema: Los usuarios domésticos desconocen si sus dispositivos IoT están comprometidos o comunicándose con servidores maliciosos, careciendo de herramientas accesibles de inteligencia de amenazas.\n\nDescripción: Sensor basado en Raspberry Pi que se instala como puente en la red doméstica, analiza el tráfico saliente de cada dispositivo IoT y lo compara contra fuentes públicas de inteligencia de amenazas, generando alertas comprensibles.",
        "area": "IoT Hacking y Ciberseguridad",
        "sector": "Ciberseguridad para usuarios finales y hogares inteligentes",
        "nivel": "Intermedio",
        "duracion": "Un semestre",
        "presupuesto": "Bajo costo",
        "hardware": [
            "Raspberry Pi 4 (Computadora de Placa Reducida (SBC) | Actúa como unidad de procesamiento central o gateway del sistema (2 interfaces de red).)",
            "Switch pequeño gestionado (Otro Componente de Hardware | Forma parte del hardware de soporte del proyecto.)",
            "Router doméstico configurable (Otro Componente de Hardware | Forma parte del hardware de soporte del proyecto.)",
            "Dispositivos IoT domésticos de prueba (Cámara / Sensor de Visión | Cámaras, enchufes inteligentes, asistentes)"
        ],
        "software": [
            "Python con Scapy: Lenguaje de Programación - Lenguaje utilizado para desarrollar la lógica del sistema.",
            "Fuentes abiertas de threat intelligence: Herramienta / Tecnología de Software - AbuseIPDB, listas públicas",
            "SQLite: Base de Datos - Para históricos",
            "Node.js/Express: Framework Web / Aplicación - Para la aplicación web",
            "Docker: DevOps / Contenedores - Para despliegue simplificado"
        ],
        "habilidades": [
            "Seguridad de redes domésticas",
            "Integración de fuentes de threat intelligence",
            "Diseño de interfaces para usuarios no técnicos",
            "Análisis de tráfico saliente",
            "Concientización en ciberseguridad"
        ],
        "objetivos": [
            "🎯 Objetivo General: Desarrollar una plataforma que monitoree el tráfico de dispositivos IoT domésticos y lo contraste contra listas de amenazas conocidas para alertar a los usuarios sobre comportamientos sospechosos.",
            "📌 Objetivos Específicos:",
            "• Implementar un sensor de red doméstica que capture metadatos de tráfico de todos los dispositivos IoT conectados.",
            "• Integrar fuentes públicas de threat intelligence (listas de IPs y dominios maliciosos) actualizadas periódicamente.",
            "• Diseñar una aplicación web simple que notifique a usuarios no técnicos sobre riesgos detectados en lenguaje claro."
        ],
        "pasos": [
            "Análisis de requisitos",
            "Diseño de la solución",
            "Implementación y pruebas",
            "Validación y sustentación"
        ],
        "aplicaciones": [
            "Ciberseguridad para usuarios finales y hogares inteligentes"
        ],
        "referencias": [],
        "hardware_tabla": [
            {
                "componente": "Raspberry Pi 4",
                "categoria": "Computadora de Placa Reducida (SBC)",
                "funcion": "Actúa como unidad de procesamiento central o gateway del sistema (2 interfaces de red)."
            },
            {
                "componente": "Switch pequeño gestionado",
                "categoria": "Otro Componente de Hardware",
                "funcion": "Forma parte del hardware de soporte del proyecto."
            },
            {
                "componente": "Router doméstico configurable",
                "categoria": "Otro Componente de Hardware",
                "funcion": "Forma parte del hardware de soporte del proyecto."
            },
            {
                "componente": "Dispositivos IoT domésticos de prueba",
                "categoria": "Cámara / Sensor de Visión",
                "funcion": "Cámaras, enchufes inteligentes, asistentes"
            }
        ],
        "software_tabla": [
            {
                "herramienta": "Python con Scapy",
                "tipo": "Lenguaje de Programación",
                "descripcion": "Lenguaje utilizado para desarrollar la lógica del sistema."
            },
            {
                "herramienta": "Fuentes abiertas de threat intelligence",
                "tipo": "Herramienta / Tecnología de Software",
                "descripcion": "AbuseIPDB, listas públicas"
            },
            {
                "herramienta": "SQLite",
                "tipo": "Base de Datos",
                "descripcion": "Para históricos"
            },
            {
                "herramienta": "Node.js/Express",
                "tipo": "Framework Web / Aplicación",
                "descripcion": "Para la aplicación web"
            },
            {
                "herramienta": "Docker",
                "tipo": "DevOps / Contenedores",
                "descripcion": "Para despliegue simplificado"
            }
        ]
    },
    {
        "id": "proj_058",
        "titulo": "🎯 Proyecto 58: Sistema de Segmentación de Red Automática (Zero Trust) para Entornos IoT",
        "descripcion": "Problema: Las redes IoT tradicionales colocan todos los dispositivos en el mismo segmento de red, permitiendo que un solo dispositivo comprometido ponga en riesgo a toda la infraestructura.\n\nDescripción: Sistema que identifica cada dispositivo IoT conectado a la red, le asigna dinámicamente una VLAN según su nivel de confianza y ajusta las reglas de firewall en tiempo real, aislando automáticamente cualquier dispositivo con comportamiento anómalo.",
        "area": "IoT Hacking y Ciberseguridad",
        "sector": "Ciberseguridad empresarial e infraestructura de red",
        "nivel": "Avanzado",
        "duracion": "Un semestre",
        "presupuesto": "Bajo costo",
        "hardware": [
            "Router/switch compatible con VLANs (Otro Componente de Hardware | OpenWrt/pfSense)",
            "Raspberry Pi 4 (Computadora de Placa Reducida (SBC) | Controlador de políticas)",
            "Access point gestionable (Otro Componente de Hardware | Forma parte del hardware de soporte del proyecto.)",
            "Dispositivos IoT de prueba de distintos perfiles (Otro Componente de Hardware | Forma parte del hardware de soporte del proyecto.)"
        ],
        "software": [
            "Python: Inteligencia Artificial / Machine Learning - Para el motor de clasificación y políticas",
            "pfSense/OpenWrt: Herramienta / Tecnología de Software - Para gestión de red",
            "MQTT: Protocolo de Comunicación IoT - Para telemetría de dispositivos",
            "PostgreSQL: Base de Datos - Para perfiles de riesgo",
            "Grafana: Visualización / Dashboard - Para visualización de segmentación"
        ],
        "habilidades": [
            "Arquitecturas Zero Trust",
            "Segmentación de redes (VLAN) y microsegmentación",
            "Automatización de políticas de firewall",
            "Perfilado de dispositivos IoT",
            "Gestión de riesgo en infraestructuras de red"
        ],
        "objetivos": [
            "🎯 Objetivo General: Implementar un sistema de segmentación de red dinámica basado en principios de Zero Trust que aísle automáticamente dispositivos IoT según su perfil de riesgo y comportamiento.",
            "📌 Objetivos Específicos:",
            "• Clasificar automáticamente los dispositivos conectados según tipo, fabricante y comportamiento de tráfico habitual.",
            "• Generar y aplicar reglas de firewall/VLAN dinámicas que aíslen a cada dispositivo en microsegmentos según su perfil de riesgo.",
            "• Detectar cambios de comportamiento que ameriten una re-segmentación automática o aislamiento inmediato."
        ],
        "pasos": [
            "Análisis de requisitos",
            "Diseño de la solución",
            "Implementación y pruebas",
            "Validación y sustentación"
        ],
        "aplicaciones": [
            "Ciberseguridad empresarial e infraestructura de red"
        ],
        "referencias": [],
        "hardware_tabla": [
            {
                "componente": "Router/switch compatible con VLANs",
                "categoria": "Otro Componente de Hardware",
                "funcion": "OpenWrt/pfSense"
            },
            {
                "componente": "Raspberry Pi 4",
                "categoria": "Computadora de Placa Reducida (SBC)",
                "funcion": "Controlador de políticas"
            },
            {
                "componente": "Access point gestionable",
                "categoria": "Otro Componente de Hardware",
                "funcion": "Forma parte del hardware de soporte del proyecto."
            },
            {
                "componente": "Dispositivos IoT de prueba de distintos perfiles",
                "categoria": "Otro Componente de Hardware",
                "funcion": "Forma parte del hardware de soporte del proyecto."
            }
        ],
        "software_tabla": [
            {
                "herramienta": "Python",
                "tipo": "Inteligencia Artificial / Machine Learning",
                "descripcion": "Para el motor de clasificación y políticas"
            },
            {
                "herramienta": "pfSense/OpenWrt",
                "tipo": "Herramienta / Tecnología de Software",
                "descripcion": "Para gestión de red"
            },
            {
                "herramienta": "MQTT",
                "tipo": "Protocolo de Comunicación IoT",
                "descripcion": "Para telemetría de dispositivos"
            },
            {
                "herramienta": "PostgreSQL",
                "tipo": "Base de Datos",
                "descripcion": "Para perfiles de riesgo"
            },
            {
                "herramienta": "Grafana",
                "tipo": "Visualización / Dashboard",
                "descripcion": "Para visualización de segmentación"
            }
        ]
    },
    {
        "id": "proj_059",
        "titulo": "📦 Proyecto 59: Sandbox de Análisis Dinámico de Malware para Dispositivos IoT Basados en Linux",
        "descripcion": "Problema: El malware dirigido a dispositivos IoT basados en Linux embebido crece rápidamente, y los analistas necesitan entornos aislados para observar su comportamiento sin comprometer sistemas reales.\n\nDescripción: Entorno de análisis dinámico basado en QEMU que ejecuta binarios de malware IoT en arquitecturas emuladas (ARM/MIPS), capturando toda su actividad de red y sistema para producir un reporte de indicadores de compromiso.",
        "area": "IoT Hacking y Ciberseguridad",
        "sector": "Ciberseguridad y análisis forense digital",
        "nivel": "Avanzado",
        "duracion": "Un semestre",
        "presupuesto": "Bajo costo",
        "hardware": [
            "Servidor/mini-PC con buena capacidad de cómputo (Otro Componente de Hardware | Para virtualización)",
            "Raspberry Pi 4 (Computadora de Placa Reducida (SBC) | Referencia de arquitectura ARM real)",
            "Almacenamiento dedicado y aislado (Otro Componente de Hardware | Para muestras)",
            "Switch aislado para red de análisis (Otro Componente de Hardware | Air-gapped)"
        ],
        "software": [
            "QEMU: Herramienta / Tecnología de Software - Para emulación de arquitecturas",
            "Cuckoo Sandbox o herramienta de análisis dinámico similar: Librería / Herramienta de Análisis de Datos - Se utiliza para el procesamiento y análisis de los datos recolectados.",
            "Python: Lenguaje de Programación - Para automatización de análisis",
            "Wireshark/tshark: Ciberseguridad - Para tráfico capturado",
            "YARA: Inteligencia Artificial / Machine Learning - Para clasificación de firmas de malware"
        ],
        "habilidades": [
            "Análisis dinámico de malware",
            "Emulación de arquitecturas embebidas",
            "Manejo seguro de muestras maliciosas",
            "Generación de indicadores de compromiso (IOC)",
            "Análisis forense digital básico"
        ],
        "objetivos": [
            "🎯 Objetivo General: Construir un sandbox aislado que ejecute y monitoree muestras de malware IoT en un entorno emulado, registrando su comportamiento de red, sistema de archivos y procesos.",
            "📌 Objetivos Específicos:",
            "• Configurar máquinas virtuales/emuladores que repliquen arquitecturas comunes de dispositivos IoT (ARM, MIPS).",
            "• Implementar monitoreo de llamadas al sistema, conexiones de red y modificaciones de archivos durante la ejecución de muestras.",
            "• Generar reportes automáticos de comportamiento (IOCs) que faciliten la clasificación de nuevas muestras."
        ],
        "pasos": [
            "Análisis de requisitos",
            "Diseño de la solución",
            "Implementación y pruebas",
            "Validación y sustentación"
        ],
        "aplicaciones": [
            "Ciberseguridad y análisis forense digital"
        ],
        "referencias": [],
        "hardware_tabla": [
            {
                "componente": "Servidor/mini-PC con buena capacidad de cómputo",
                "categoria": "Otro Componente de Hardware",
                "funcion": "Para virtualización"
            },
            {
                "componente": "Raspberry Pi 4",
                "categoria": "Computadora de Placa Reducida (SBC)",
                "funcion": "Referencia de arquitectura ARM real"
            },
            {
                "componente": "Almacenamiento dedicado y aislado",
                "categoria": "Otro Componente de Hardware",
                "funcion": "Para muestras"
            },
            {
                "componente": "Switch aislado para red de análisis",
                "categoria": "Otro Componente de Hardware",
                "funcion": "Air-gapped"
            }
        ],
        "software_tabla": [
            {
                "herramienta": "QEMU",
                "tipo": "Herramienta / Tecnología de Software",
                "descripcion": "Para emulación de arquitecturas"
            },
            {
                "herramienta": "Cuckoo Sandbox o herramienta de análisis dinámico similar",
                "tipo": "Librería / Herramienta de Análisis de Datos",
                "descripcion": "Se utiliza para el procesamiento y análisis de los datos recolectados."
            },
            {
                "herramienta": "Python",
                "tipo": "Lenguaje de Programación",
                "descripcion": "Para automatización de análisis"
            },
            {
                "herramienta": "Wireshark/tshark",
                "tipo": "Ciberseguridad",
                "descripcion": "Para tráfico capturado"
            },
            {
                "herramienta": "YARA",
                "tipo": "Inteligencia Artificial / Machine Learning",
                "descripcion": "Para clasificación de firmas de malware"
            }
        ]
    },
    {
        "id": "proj_060",
        "titulo": "🔄 Proyecto 60: Sistema de Gestión de Parches y Actualizaciones Seguras OTA para Flotas IoT",
        "descripcion": "Problema: Las flotas de dispositivos IoT desplegadas rara vez reciben actualizaciones de seguridad oportunas por falta de infraestructura de gestión, dejando vulnerabilidades conocidas sin corregir durante meses o años.\n\nDescripción: Infraestructura compuesta por un servidor de gestión de firmware firmado digitalmente y un conjunto de dispositivos ESP32 que verifican la autenticidad de cada actualización antes de instalarla, con capacidad de reversión automática ante fallos.",
        "area": "IoT Hacking y Ciberseguridad",
        "sector": "Ciberseguridad del ciclo de vida de dispositivos",
        "nivel": "Intermedio",
        "duracion": "Un semestre",
        "presupuesto": "Bajo costo",
        "hardware": [
            "Raspberry Pi 4 (Computadora de Placa Reducida (SBC) | Servidor de actualizaciones)",
            "ESP32 (Microcontrolador | 8-10 unidades; flota simulada)",
            "Servidor de almacenamiento de versiones de firmware (Otro Componente de Hardware | Forma parte del hardware de soporte del proyecto.)",
            "Fuente de alimentación estable (Fuente de Alimentación / Energía | Para pruebas de fallo)"
        ],
        "software": [
            "Python/Node.js: Framework Web / Aplicación - Para el servidor OTA",
            "Firma digital con RSA/ECDSA: Herramienta / Tecnología de Software - Tecnología de software empleada en el desarrollo del proyecto.",
            "MQTT: Protocolo de Comunicación IoT - Para notificación de nuevas versiones",
            "PostgreSQL: Base de Datos - Para inventario y versionado",
            "React.js: Framework Web / Aplicación - Para el panel de administración"
        ],
        "habilidades": [
            "Gestión del ciclo de vida de firmware",
            "Actualizaciones OTA seguras",
            "Firma y verificación digital de software",
            "Administración de flotas de dispositivos",
            "Estrategias de rollback ante fallos PROYECTOS DE IoT CON BIG DATA Y ANALÍTICA AVANZADA"
        ],
        "objetivos": [
            "🎯 Objetivo General: Desarrollar un sistema de actualización de firmware Over-The-Air (OTA) seguro que permita gestionar, firmar y desplegar parches a una flota de dispositivos IoT de forma centralizada y verificable.",
            "📌 Objetivos Específicos:",
            "• Implementar un servidor central que firme digitalmente cada versión de firmware antes de su distribución.",
            "• Desarrollar el proceso de actualización OTA en los dispositivos, incluyendo verificación de firma y rollback ante fallos.",
            "• Construir un panel de administración que muestre el estado de actualización de toda la flota en tiempo real."
        ],
        "pasos": [
            "Análisis de requisitos",
            "Diseño de la solución",
            "Implementación y pruebas",
            "Validación y sustentación"
        ],
        "aplicaciones": [
            "Ciberseguridad del ciclo de vida de dispositivos"
        ],
        "referencias": [],
        "hardware_tabla": [
            {
                "componente": "Raspberry Pi 4",
                "categoria": "Computadora de Placa Reducida (SBC)",
                "funcion": "Servidor de actualizaciones"
            },
            {
                "componente": "ESP32",
                "categoria": "Microcontrolador",
                "funcion": "8-10 unidades; flota simulada"
            },
            {
                "componente": "Servidor de almacenamiento de versiones de firmware",
                "categoria": "Otro Componente de Hardware",
                "funcion": "Forma parte del hardware de soporte del proyecto."
            },
            {
                "componente": "Fuente de alimentación estable",
                "categoria": "Fuente de Alimentación / Energía",
                "funcion": "Para pruebas de fallo"
            }
        ],
        "software_tabla": [
            {
                "herramienta": "Python/Node.js",
                "tipo": "Framework Web / Aplicación",
                "descripcion": "Para el servidor OTA"
            },
            {
                "herramienta": "Firma digital con RSA/ECDSA",
                "tipo": "Herramienta / Tecnología de Software",
                "descripcion": "Tecnología de software empleada en el desarrollo del proyecto."
            },
            {
                "herramienta": "MQTT",
                "tipo": "Protocolo de Comunicación IoT",
                "descripcion": "Para notificación de nuevas versiones"
            },
            {
                "herramienta": "PostgreSQL",
                "tipo": "Base de Datos",
                "descripcion": "Para inventario y versionado"
            },
            {
                "herramienta": "React.js",
                "tipo": "Framework Web / Aplicación",
                "descripcion": "Para el panel de administración"
            }
        ]
    },
    {
        "id": "proj_061",
        "titulo": "💧 Proyecto 61: Plataforma de Analítica Predictiva de Consumo de Agua Potable Municipal",
        "descripcion": "Problema: Las empresas de acueducto carecen de visibilidad granular sobre patrones de consumo, dificultando la detección de fugas, el fraude y la planificación de infraestructura hídrica.\n\nDescripción: Sistema que recolecta lecturas de miles de medidores inteligentes de agua a través de una red LoRaWAN, las procesa mediante un pipeline distribuido de Big Data y aplica modelos predictivos para detectar fugas y proyectar demanda.",
        "area": "IoT con Big Data y Analítica",
        "sector": "Servicios públicos y gestión de recursos hídricos",
        "nivel": "Avanzado",
        "duracion": "Un semestre",
        "presupuesto": "Bajo costo",
        "hardware": [
            "Gateway LoRaWAN (Computadora de Placa Reducida (SBC) | Raspberry Pi + módulo RFM95)",
            "ESP32 con sensor de flujo de agua (Microcontrolador | 10-15 nodos simulados)",
            "Servidor/mini-cluster (Otro Componente de Hardware | Para procesamiento distribuido)",
            "Sensores de presión de línea (Otro Componente de Hardware | Forma parte del hardware de soporte del proyecto.)"
        ],
        "software": [
            "Apache Kafka: Broker / Middleware de Mensajería - Para ingesta de streaming",
            "Apache Spark: Herramienta / Tecnología de Software - Para procesamiento distribuido",
            "InfluxDB/TimescaleDB: Base de Datos - Para series temporales",
            "Prophet o modelos ARIMA: Herramienta / Tecnología de Software - Para proyección de demanda",
            "Grafana/Power BI: Visualización / Dashboard - Para dashboards",
            "LoRaWAN: Protocolo de Comunicación IoT - ChirpStack; para la red de sensores"
        ],
        "habilidades": [
            "Arquitecturas de Big Data para IoT",
            "Redes LPWAN (LoRaWAN)",
            "Detección de anomalías en series temporales",
            "Modelado predictivo de demanda",
            "Gestión de infraestructura de servicios públicos"
        ],
        "objetivos": [
            "🎯 Objetivo General: Desarrollar una plataforma de analítica de Big Data que procese lecturas masivas de medidores inteligentes de agua para detectar fugas, anomalías de consumo y proyectar demanda futura.",
            "📌 Objetivos Específicos:",
            "• Desplegar una red de medidores inteligentes que reporten consumo de agua en intervalos cortos vía LoRaWAN.",
            "• Implementar un pipeline de procesamiento distribuido que detecte anomalías de consumo (fugas, fraude) en tiempo casi real.",
            "• Desarrollar modelos de series temporales que proyecten la demanda de agua por sector para apoyar la planificación."
        ],
        "pasos": [
            "Análisis de requisitos",
            "Diseño de la solución",
            "Implementación y pruebas",
            "Validación y sustentación"
        ],
        "aplicaciones": [
            "Servicios públicos y gestión de recursos hídricos"
        ],
        "referencias": [],
        "hardware_tabla": [
            {
                "componente": "Gateway LoRaWAN",
                "categoria": "Computadora de Placa Reducida (SBC)",
                "funcion": "Raspberry Pi + módulo RFM95"
            },
            {
                "componente": "ESP32 con sensor de flujo de agua",
                "categoria": "Microcontrolador",
                "funcion": "10-15 nodos simulados"
            },
            {
                "componente": "Servidor/mini-cluster",
                "categoria": "Otro Componente de Hardware",
                "funcion": "Para procesamiento distribuido"
            },
            {
                "componente": "Sensores de presión de línea",
                "categoria": "Otro Componente de Hardware",
                "funcion": "Forma parte del hardware de soporte del proyecto."
            }
        ],
        "software_tabla": [
            {
                "herramienta": "Apache Kafka",
                "tipo": "Broker / Middleware de Mensajería",
                "descripcion": "Para ingesta de streaming"
            },
            {
                "herramienta": "Apache Spark",
                "tipo": "Herramienta / Tecnología de Software",
                "descripcion": "Para procesamiento distribuido"
            },
            {
                "herramienta": "InfluxDB/TimescaleDB",
                "tipo": "Base de Datos",
                "descripcion": "Para series temporales"
            },
            {
                "herramienta": "Prophet o modelos ARIMA",
                "tipo": "Herramienta / Tecnología de Software",
                "descripcion": "Para proyección de demanda"
            },
            {
                "herramienta": "Grafana/Power BI",
                "tipo": "Visualización / Dashboard",
                "descripcion": "Para dashboards"
            },
            {
                "herramienta": "LoRaWAN",
                "tipo": "Protocolo de Comunicación IoT",
                "descripcion": "ChirpStack; para la red de sensores"
            }
        ]
    },
    {
        "id": "proj_062",
        "titulo": "🚚 Proyecto 62: Data Lake para Optimización de Flotas de Transporte de Carga con Telemetría IoT",
        "descripcion": "Problema: Las empresas de transporte de carga generan grandes volúmenes de datos de telemetría (GPS, combustible, conducción) que no se aprovechan de forma centralizada para optimizar rutas y reducir costos operativos.\n\nDescripción: Plataforma que centraliza datos de telemetría de una flota simulada de vehículos (GPS, OBD-II, combustible) en un data lake estructurado por zonas y periodos, sobre el cual se ejecutan análisis de rutas, eficiencia y mantenimiento.",
        "area": "IoT con Big Data y Analítica",
        "sector": "Logística y transporte de carga terrestre",
        "nivel": "Avanzado",
        "duracion": "Un semestre",
        "presupuesto": "Bajo costo",
        "hardware": [
            "ESP32 con módulo GPS NEO-6M (Microcontrolador | Por vehículo simulado, 5-6 unidades)",
            "Adaptador OBD-II Bluetooth/ELM327 (Módulo de Comunicación / Conectividad | Permite la transmisión inalámbrica de datos entre dispositivos.)",
            "Raspberry Pi 4 (Computadora de Placa Reducida (SBC) | Nodo central de ingesta)",
            "Módulo GSM/GPRS SIM800L (Módulo de Comunicación / Conectividad | Para transmisión remota)"
        ],
        "software": [
            "Apache Hadoop/MinIO: Herramienta / Tecnología de Software - Usado como data lake",
            "Apache Spark: Herramienta / Tecnología de Software - Para procesamiento por lotes",
            "Python con Pandas/GeoPandas: Lenguaje de Programación - Lenguaje utilizado para desarrollar la lógica del sistema.",
            "PostgreSQL con PostGIS: Base de Datos - Para análisis geoespacial",
            "Metabase/Power BI: Visualización / Dashboard - Para reportes ejecutivos"
        ],
        "habilidades": [
            "Diseño y gestión de data lakes",
            "Telemetría vehicular y protocolos OBD-II",
            "Análisis geoespacial de rutas",
            "Optimización logística basada en datos",
            "Mantenimiento predictivo de flotas"
        ],
        "objetivos": [
            "🎯 Objetivo General: Construir un data lake que centralice la telemetría de una flota de vehículos de carga y aplique analítica avanzada para optimizar rutas, consumo de combustible y mantenimiento.",
            "📌 Objetivos Específicos:",
            "• Implementar dispositivos de telemetría vehicular que capturen ubicación, velocidad, consumo y eventos de conducción.",
            "• Diseñar un data lake que almacene y estructure estos datos heterogéneos para su análisis posterior.",
            "• Desarrollar modelos analíticos que identifiquen rutas ineficientes, patrones de conducción riesgosa y necesidades de mantenimiento predictivo."
        ],
        "pasos": [
            "Análisis de requisitos",
            "Diseño de la solución",
            "Implementación y pruebas",
            "Validación y sustentación"
        ],
        "aplicaciones": [
            "Logística y transporte de carga terrestre"
        ],
        "referencias": [],
        "hardware_tabla": [
            {
                "componente": "ESP32 con módulo GPS NEO-6M",
                "categoria": "Microcontrolador",
                "funcion": "Por vehículo simulado, 5-6 unidades"
            },
            {
                "componente": "Adaptador OBD-II Bluetooth/ELM327",
                "categoria": "Módulo de Comunicación / Conectividad",
                "funcion": "Permite la transmisión inalámbrica de datos entre dispositivos."
            },
            {
                "componente": "Raspberry Pi 4",
                "categoria": "Computadora de Placa Reducida (SBC)",
                "funcion": "Nodo central de ingesta"
            },
            {
                "componente": "Módulo GSM/GPRS SIM800L",
                "categoria": "Módulo de Comunicación / Conectividad",
                "funcion": "Para transmisión remota"
            }
        ],
        "software_tabla": [
            {
                "herramienta": "Apache Hadoop/MinIO",
                "tipo": "Herramienta / Tecnología de Software",
                "descripcion": "Usado como data lake"
            },
            {
                "herramienta": "Apache Spark",
                "tipo": "Herramienta / Tecnología de Software",
                "descripcion": "Para procesamiento por lotes"
            },
            {
                "herramienta": "Python con Pandas/GeoPandas",
                "tipo": "Lenguaje de Programación",
                "descripcion": "Lenguaje utilizado para desarrollar la lógica del sistema."
            },
            {
                "herramienta": "PostgreSQL con PostGIS",
                "tipo": "Base de Datos",
                "descripcion": "Para análisis geoespacial"
            },
            {
                "herramienta": "Metabase/Power BI",
                "tipo": "Visualización / Dashboard",
                "descripcion": "Para reportes ejecutivos"
            }
        ]
    },
    {
        "id": "proj_063",
        "titulo": "⚡ Proyecto 63: Sistema de Analítica de Big Data para Optimización de Redes Eléctricas Inteligentes (Smart Grid)",
        "descripcion": "Problema: Las redes eléctricas tradicionales no pueden anticipar picos de demanda ni detectar pérdidas técnicas y no técnicas con la granularidad que ofrecen los medidores inteligentes modernos.\n\nDescripción: Plataforma que ingiere datos de una red de medidores inteligentes de energía, calcula balances por circuito para detectar pérdidas anómalas y utiliza modelos de series temporales para prever la demanda eléctrica de corto plazo.",
        "area": "IoT con Big Data y Analítica",
        "sector": "Energía y distribución eléctrica",
        "nivel": "Avanzado",
        "duracion": "Un semestre",
        "presupuesto": "Bajo costo",
        "hardware": [
            "ESP32 con sensor de corriente SCT-013 (Microcontrolador | 10-12 nodos medidores)",
            "Raspberry Pi 4 (Computadora de Placa Reducida (SBC) | Concentrador de datos)",
            "Sensor de voltaje ZMPT101B (Otro Componente de Hardware | Forma parte del hardware de soporte del proyecto.)",
            "Gateway MQTT dedicado (Otro Componente de Hardware | Forma parte del hardware de soporte del proyecto.)"
        ],
        "software": [
            "Apache Kafka y Spark Streaming: Broker / Middleware de Mensajería - Gestiona el intercambio de mensajes entre los componentes del sistema.",
            "TimescaleDB: Base de Datos - Para series temporales de consumo",
            "Modelos LSTM/Prophet: Herramienta / Tecnología de Software - Para predicción de demanda",
            "Grafana: Visualización / Dashboard - Para monitoreo de la red",
            "Python con Scikit-learn: Inteligencia Artificial / Machine Learning - Para detección de anomalías"
        ],
        "habilidades": [
            "Smart grids y medición inteligente de energía",
            "Procesamiento de streams de datos a gran escala",
            "Detección de fraude y pérdidas técnicas",
            "Predicción de demanda energética",
            "Visualización de datos para operadores de red"
        ],
        "objetivos": [
            "🎯 Objetivo General: Desarrollar una plataforma analítica que procese datos masivos de medidores inteligentes de energía para optimizar la distribución, detectar pérdidas y prever picos de demanda.",
            "📌 Objetivos Específicos:",
            "• Recolectar datos de consumo eléctrico de una red de medidores inteligentes en intervalos de 15 minutos.",
            "• Implementar algoritmos de detección de pérdidas no técnicas (posible fraude) mediante análisis comparativo de balances de energía.",
            "• Desarrollar modelos de predicción de demanda a corto plazo que apoyen decisiones de despacho energético."
        ],
        "pasos": [
            "Análisis de requisitos",
            "Diseño de la solución",
            "Implementación y pruebas",
            "Validación y sustentación"
        ],
        "aplicaciones": [
            "Energía y distribución eléctrica"
        ],
        "referencias": [],
        "hardware_tabla": [
            {
                "componente": "ESP32 con sensor de corriente SCT-013",
                "categoria": "Microcontrolador",
                "funcion": "10-12 nodos medidores"
            },
            {
                "componente": "Raspberry Pi 4",
                "categoria": "Computadora de Placa Reducida (SBC)",
                "funcion": "Concentrador de datos"
            },
            {
                "componente": "Sensor de voltaje ZMPT101B",
                "categoria": "Otro Componente de Hardware",
                "funcion": "Forma parte del hardware de soporte del proyecto."
            },
            {
                "componente": "Gateway MQTT dedicado",
                "categoria": "Otro Componente de Hardware",
                "funcion": "Forma parte del hardware de soporte del proyecto."
            }
        ],
        "software_tabla": [
            {
                "herramienta": "Apache Kafka y Spark Streaming",
                "tipo": "Broker / Middleware de Mensajería",
                "descripcion": "Gestiona el intercambio de mensajes entre los componentes del sistema."
            },
            {
                "herramienta": "TimescaleDB",
                "tipo": "Base de Datos",
                "descripcion": "Para series temporales de consumo"
            },
            {
                "herramienta": "Modelos LSTM/Prophet",
                "tipo": "Herramienta / Tecnología de Software",
                "descripcion": "Para predicción de demanda"
            },
            {
                "herramienta": "Grafana",
                "tipo": "Visualización / Dashboard",
                "descripcion": "Para monitoreo de la red"
            },
            {
                "herramienta": "Python con Scikit-learn",
                "tipo": "Inteligencia Artificial / Machine Learning",
                "descripcion": "Para detección de anomalías"
            }
        ]
    },
    {
        "id": "proj_064",
        "titulo": "📊 Proyecto 64: Plataforma de Big Data para Monitoreo Epidemiológico Ambiental Urbano",
        "descripcion": "Problema: Las autoridades de salud pública carecen de correlación en tiempo real entre variables ambientales urbanas (calidad del aire, ruido, temperatura) y la incidencia de enfermedades respiratorias reportadas.\n\nDescripción: Red de sensores ambientales distribuidos en distintos puntos de la ciudad cuyos datos se combinan en una plataforma de Big Data con reportes epidemiológicos públicos, generando mapas de correlación entre calidad ambiental e incidencia de enfermedades.",
        "area": "IoT con Big Data y Analítica",
        "sector": "Salud pública y monitoreo ambiental urbano",
        "nivel": "Avanzado",
        "duracion": "Un semestre",
        "presupuesto": "Bajo costo",
        "hardware": [
            "ESP32 con sensor de calidad de aire MQ-135/PMS5003 (Microcontrolador | 8-10 nodos)",
            "Sensor de ruido (Otro Componente de Hardware | Micrófono con módulo de nivel de sonido)",
            "Raspberry Pi 4 (Computadora de Placa Reducida (SBC) | Nodo de agregación por zona)",
            "Módulo GPS (Módulo de Comunicación / Conectividad | Para geolocalización de nodos)"
        ],
        "software": [
            "Apache Spark: Herramienta / Tecnología de Software - Para correlación de datasets",
            "PostgreSQL con PostGIS: Base de Datos - Para análisis geoespacial",
            "Python con Pandas y Scikit-learn: Inteligencia Artificial / Machine Learning - Procesa datos mediante modelos de IA/ML para generar predicciones o clasificaciones.",
            "Kepler.gl o Grafana Geomap: Visualización / Dashboard - Para mapas de calor",
            "APIs públicas de datos de salud: Herramienta / Tecnología de Software - Tecnología de software empleada en el desarrollo del proyecto."
        ],
        "habilidades": [
            "Analítica de datos ambientales y de salud pública",
            "Correlación de datasets heterogéneos",
            "Visualización geoespacial de riesgo",
            "Diseño de redes de sensores urbanos",
            "Ética en el manejo de datos de salud"
        ],
        "objetivos": [
            "🎯 Objetivo General: Crear una plataforma de Big Data que correlacione datos ambientales urbanos recolectados por sensores IoT con reportes de salud pública para apoyar la vigilancia epidemiológica.",
            "📌 Objetivos Específicos:",
            "• Desplegar una red de sensores ambientales urbanos que midan calidad del aire, ruido y temperatura de forma distribuida.",
            "• Integrar estos datos con fuentes públicas de reportes de salud (consultas por enfermedades respiratorias) mediante un pipeline de correlación.",
            "• Desarrollar visualizaciones geoespaciales que muestren zonas de riesgo combinando exposición ambiental e incidencia de casos."
        ],
        "pasos": [
            "Análisis de requisitos",
            "Diseño de la solución",
            "Implementación y pruebas",
            "Validación y sustentación"
        ],
        "aplicaciones": [
            "Salud pública y monitoreo ambiental urbano"
        ],
        "referencias": [],
        "hardware_tabla": [
            {
                "componente": "ESP32 con sensor de calidad de aire MQ-135/PMS5003",
                "categoria": "Microcontrolador",
                "funcion": "8-10 nodos"
            },
            {
                "componente": "Sensor de ruido",
                "categoria": "Otro Componente de Hardware",
                "funcion": "Micrófono con módulo de nivel de sonido"
            },
            {
                "componente": "Raspberry Pi 4",
                "categoria": "Computadora de Placa Reducida (SBC)",
                "funcion": "Nodo de agregación por zona"
            },
            {
                "componente": "Módulo GPS",
                "categoria": "Módulo de Comunicación / Conectividad",
                "funcion": "Para geolocalización de nodos"
            }
        ],
        "software_tabla": [
            {
                "herramienta": "Apache Spark",
                "tipo": "Herramienta / Tecnología de Software",
                "descripcion": "Para correlación de datasets"
            },
            {
                "herramienta": "PostgreSQL con PostGIS",
                "tipo": "Base de Datos",
                "descripcion": "Para análisis geoespacial"
            },
            {
                "herramienta": "Python con Pandas y Scikit-learn",
                "tipo": "Inteligencia Artificial / Machine Learning",
                "descripcion": "Procesa datos mediante modelos de IA/ML para generar predicciones o clasificaciones."
            },
            {
                "herramienta": "Kepler.gl o Grafana Geomap",
                "tipo": "Visualización / Dashboard",
                "descripcion": "Para mapas de calor"
            },
            {
                "herramienta": "APIs públicas de datos de salud",
                "tipo": "Herramienta / Tecnología de Software",
                "descripcion": "Tecnología de software empleada en el desarrollo del proyecto."
            }
        ]
    },
    {
        "id": "proj_065",
        "titulo": "🐛 Proyecto 65: Sistema de Analítica de Big Data para Detección Temprana de Plagas Agrícolas Regionales",
        "descripcion": "Problema: Los brotes de plagas agrícolas suelen detectarse cuando ya han causado daño significativo porque no existe correlación de datos entre fincas de una misma región para identificar patrones tempranos.\n\nDescripción: Red de trampas inteligentes distribuidas en varias fincas de una región que reportan conteos de insectos, cuyos datos se agregan en una plataforma central que detecta patrones de propagación espacial y emite alertas tempranas por zona.",
        "area": "IoT con Big Data y Analítica",
        "sector": "Agricultura de precisión a escala regional",
        "nivel": "Avanzado",
        "duracion": "Un semestre",
        "presupuesto": "Bajo costo",
        "hardware": [
            "ESP32-CAM (Microcontrolador con Cámara Integrada | Trampas inteligentes con conteo por visión, 10-15 unidades)",
            "Raspberry Pi 4 (Computadora de Placa Reducida (SBC) | Nodo agregador regional)",
            "Panel solar y batería (Fuente de Alimentación / Energía | Para trampas remotas)",
            "Módulo LoRa (Módulo de Comunicación / Conectividad | Para comunicación de largo alcance)"
        ],
        "software": [
            "Apache Spark: Librería / Herramienta de Análisis de Datos - Para análisis distribuido",
            "PostGIS: Herramienta / Tecnología de Software - Para modelado espacial de propagación",
            "OpenCV: Inteligencia Artificial / Machine Learning - Para conteo de insectos en las trampas",
            "Python con modelos de difusión espacial: Lenguaje de Programación - Lenguaje utilizado para desarrollar la lógica del sistema.",
            "Grafana/QGIS: Visualización / Dashboard - Para mapas de riesgo regional"
        ],
        "habilidades": [
            "Agricultura de precisión a escala regional",
            "Análisis espacial de propagación de plagas",
            "Redes de sensores de largo alcance (LoRa)",
            "Visión artificial aplicada a conteo de insectos",
            "Sistemas de alerta temprana agrícola"
        ],
        "objetivos": [
            "🎯 Objetivo General: Desarrollar una plataforma regional de Big Data que integre datos de trampas y sensores de múltiples fincas para detectar patrones tempranos de brotes de plagas.",
            "📌 Objetivos Específicos:",
            "• Implementar una red de trampas inteligentes con sensores de conteo que reporten capturas de insectos por finca.",
            "• Centralizar los datos de múltiples fincas en una plataforma de Big Data que identifique patrones espaciales de propagación.",
            "• Generar alertas tempranas georreferenciadas para fincas en riesgo antes de que la plaga se extienda."
        ],
        "pasos": [
            "Análisis de requisitos",
            "Diseño de la solución",
            "Implementación y pruebas",
            "Validación y sustentación"
        ],
        "aplicaciones": [
            "Agricultura de precisión a escala regional"
        ],
        "referencias": [],
        "hardware_tabla": [
            {
                "componente": "ESP32-CAM",
                "categoria": "Microcontrolador con Cámara Integrada",
                "funcion": "Trampas inteligentes con conteo por visión, 10-15 unidades"
            },
            {
                "componente": "Raspberry Pi 4",
                "categoria": "Computadora de Placa Reducida (SBC)",
                "funcion": "Nodo agregador regional"
            },
            {
                "componente": "Panel solar y batería",
                "categoria": "Fuente de Alimentación / Energía",
                "funcion": "Para trampas remotas"
            },
            {
                "componente": "Módulo LoRa",
                "categoria": "Módulo de Comunicación / Conectividad",
                "funcion": "Para comunicación de largo alcance"
            }
        ],
        "software_tabla": [
            {
                "herramienta": "Apache Spark",
                "tipo": "Librería / Herramienta de Análisis de Datos",
                "descripcion": "Para análisis distribuido"
            },
            {
                "herramienta": "PostGIS",
                "tipo": "Herramienta / Tecnología de Software",
                "descripcion": "Para modelado espacial de propagación"
            },
            {
                "herramienta": "OpenCV",
                "tipo": "Inteligencia Artificial / Machine Learning",
                "descripcion": "Para conteo de insectos en las trampas"
            },
            {
                "herramienta": "Python con modelos de difusión espacial",
                "tipo": "Lenguaje de Programación",
                "descripcion": "Lenguaje utilizado para desarrollar la lógica del sistema."
            },
            {
                "herramienta": "Grafana/QGIS",
                "tipo": "Visualización / Dashboard",
                "descripcion": "Para mapas de riesgo regional"
            }
        ]
    },
    {
        "id": "proj_066",
        "titulo": "🏫 Proyecto 66: Plataforma de Big Data para Análisis de Comportamiento Energético en Campus Universitarios",
        "descripcion": "Problema: Los campus universitarios consumen grandes cantidades de energía sin visibilidad detallada por edificio o franja horaria, dificultando la implementación de estrategias efectivas de ahorro.\n\nDescripción: Sistema que recolecta consumo eléctrico de múltiples edificios universitarios mediante medidores inteligentes, almacena el histórico en un repositorio analítico y genera comparativas y recomendaciones de eficiencia energética por edificio y horario.",
        "area": "IoT con Big Data y Analítica",
        "sector": "Eficiencia energética institucional",
        "nivel": "Intermedio",
        "duracion": "Un semestre",
        "presupuesto": "Bajo costo",
        "hardware": [
            "ESP32 con sensor de corriente SCT-013 (Microcontrolador | Por edificio, 6-8 nodos)",
            "Raspberry Pi 4 (Computadora de Placa Reducida (SBC) | Servidor central del campus)",
            "Sensores de ocupación PIR (Sensor de Movimiento / Posición | Para correlación de uso)"
        ],
        "software": [
            "InfluxDB: Base de Datos - Para series temporales de consumo",
            "Apache Superset/Metabase: Visualización / Dashboard - Para dashboards comparativos",
            "Python: Lenguaje de Programación - Para modelos de recomendación de ahorro",
            "Node-RED: Automatización / Orquestación - Para la ingesta de datos",
            "MQTT: Protocolo de Comunicación IoT - Usado como bus de mensajería"
        ],
        "habilidades": [
            "Analítica de eficiencia energética",
            "Diseño de dashboards comparativos",
            "Gestión de infraestructura energética institucional",
            "Modelos de recomendación basados en datos",
            "Sostenibilidad y ahorro energético"
        ],
        "objetivos": [
            "🎯 Objetivo General: Implementar una plataforma que analice el consumo energético histórico y en tiempo real de múltiples edificios universitarios para identificar oportunidades de ahorro.",
            "📌 Objetivos Específicos:",
            "• Instrumentar varios edificios del campus con medidores inteligentes de energía por circuito.",
            "• Construir un repositorio analítico que permita comparar patrones de consumo entre edificios y horarios.",
            "• Desarrollar recomendaciones automatizadas de ahorro energético basadas en los patrones identificados."
        ],
        "pasos": [
            "Análisis de requisitos",
            "Diseño de la solución",
            "Implementación y pruebas",
            "Validación y sustentación"
        ],
        "aplicaciones": [
            "Eficiencia energética institucional"
        ],
        "referencias": [],
        "hardware_tabla": [
            {
                "componente": "ESP32 con sensor de corriente SCT-013",
                "categoria": "Microcontrolador",
                "funcion": "Por edificio, 6-8 nodos"
            },
            {
                "componente": "Raspberry Pi 4",
                "categoria": "Computadora de Placa Reducida (SBC)",
                "funcion": "Servidor central del campus"
            },
            {
                "componente": "Sensores de ocupación PIR",
                "categoria": "Sensor de Movimiento / Posición",
                "funcion": "Para correlación de uso"
            }
        ],
        "software_tabla": [
            {
                "herramienta": "InfluxDB",
                "tipo": "Base de Datos",
                "descripcion": "Para series temporales de consumo"
            },
            {
                "herramienta": "Apache Superset/Metabase",
                "tipo": "Visualización / Dashboard",
                "descripcion": "Para dashboards comparativos"
            },
            {
                "herramienta": "Python",
                "tipo": "Lenguaje de Programación",
                "descripcion": "Para modelos de recomendación de ahorro"
            },
            {
                "herramienta": "Node-RED",
                "tipo": "Automatización / Orquestación",
                "descripcion": "Para la ingesta de datos"
            },
            {
                "herramienta": "MQTT",
                "tipo": "Protocolo de Comunicación IoT",
                "descripcion": "Usado como bus de mensajería"
            }
        ]
    },
    {
        "id": "proj_067",
        "titulo": "📶 Proyecto 67: Sistema de Big Data para Análisis de Calidad de Servicio en Redes de Telecomunicaciones IoT",
        "descripcion": "Problema: Los operadores de redes IoT (LoRaWAN, NB-IoT) carecen de visibilidad centralizada sobre la calidad de servicio percibida por miles de dispositivos distribuidos geográficamente.\n\nDescripción: Plataforma que agrega métricas de calidad de enlace de una red LoRaWAN/NB-IoT con decenas de nodos distribuidos, procesa la información con herramientas de Big Data y genera mapas de cobertura y recomendaciones de infraestructura.",
        "area": "IoT con Big Data y Analítica",
        "sector": "Telecomunicaciones e infraestructura de conectividad",
        "nivel": "Avanzado",
        "duracion": "Un semestre",
        "presupuesto": "Bajo costo",
        "hardware": [
            "Gateway LoRaWAN (Computadora de Placa Reducida (SBC) | Raspberry Pi + RFM95, 2-3 unidades)",
            "ESP32 con módulo LoRa (Microcontrolador | 15-20 nodos distribuidos)",
            "Módulo GPS por nodo (Módulo de Comunicación / Conectividad | Para georreferenciación)"
        ],
        "software": [
            "ChirpStack: Protocolo de Comunicación IoT - Usado como servidor de red LoRaWAN",
            "Apache Spark: Herramienta / Tecnología de Software - Para procesamiento de métricas",
            "PostGIS: Herramienta / Tecnología de Software - Para mapas de cobertura",
            "Grafana: Visualización / Dashboard - Para dashboards de calidad de servicio",
            "Python: Lenguaje de Programación - Para modelos de optimización de cobertura"
        ],
        "habilidades": [
            "Análisis de calidad de servicio en redes IoT",
            "Redes LPWAN y su instrumentación",
            "Optimización de infraestructura de conectividad",
            "Procesamiento de datos geoespaciales a gran escala",
            "Planificación de redes de sensores"
        ],
        "objetivos": [
            "🎯 Objetivo General: Desarrollar una plataforma que analice masivamente métricas de calidad de servicio (latencia, pérdida de paquetes, RSSI) de una red IoT distribuida para optimizar la cobertura y el rendimiento.",
            "📌 Objetivos Específicos:",
            "• Recolectar métricas de calidad de enlace (RSSI, SNR, pérdida de paquetes) de cada dispositivo conectado a la red.",
            "• Procesar estas métricas a gran escala para identificar zonas de cobertura deficiente y horarios de congestión.",
            "• Generar recomendaciones de ubicación de nuevos gateways basadas en los patrones detectados."
        ],
        "pasos": [
            "Análisis de requisitos",
            "Diseño de la solución",
            "Implementación y pruebas",
            "Validación y sustentación"
        ],
        "aplicaciones": [
            "Telecomunicaciones e infraestructura de conectividad"
        ],
        "referencias": [],
        "hardware_tabla": [
            {
                "componente": "Gateway LoRaWAN",
                "categoria": "Computadora de Placa Reducida (SBC)",
                "funcion": "Raspberry Pi + RFM95, 2-3 unidades"
            },
            {
                "componente": "ESP32 con módulo LoRa",
                "categoria": "Microcontrolador",
                "funcion": "15-20 nodos distribuidos"
            },
            {
                "componente": "Módulo GPS por nodo",
                "categoria": "Módulo de Comunicación / Conectividad",
                "funcion": "Para georreferenciación"
            }
        ],
        "software_tabla": [
            {
                "herramienta": "ChirpStack",
                "tipo": "Protocolo de Comunicación IoT",
                "descripcion": "Usado como servidor de red LoRaWAN"
            },
            {
                "herramienta": "Apache Spark",
                "tipo": "Herramienta / Tecnología de Software",
                "descripcion": "Para procesamiento de métricas"
            },
            {
                "herramienta": "PostGIS",
                "tipo": "Herramienta / Tecnología de Software",
                "descripcion": "Para mapas de cobertura"
            },
            {
                "herramienta": "Grafana",
                "tipo": "Visualización / Dashboard",
                "descripcion": "Para dashboards de calidad de servicio"
            },
            {
                "herramienta": "Python",
                "tipo": "Lenguaje de Programación",
                "descripcion": "Para modelos de optimización de cobertura"
            }
        ]
    },
    {
        "id": "proj_068",
        "titulo": "🗺️ Proyecto 68: Plataforma de Analítica de Big Data para Turismo Sostenible basado en Flujos de Visitantes IoT",
        "descripcion": "Problema: Los destinos turísticos naturales sufren sobrecarga de visitantes sin mecanismos de monitoreo que permitan gestionar la capacidad de carga y proteger los ecosistemas.\n\nDescripción: Red de sensores de conteo instalados en accesos a un área natural protegida que alimenta una plataforma analítica capaz de estimar la ocupación en tiempo real y compararla contra umbrales de capacidad de carga sostenible.",
        "area": "IoT con Big Data y Analítica",
        "sector": "Turismo sostenible y gestión de destinos",
        "nivel": "Intermedio",
        "duracion": "Un semestre",
        "presupuesto": "Bajo costo",
        "hardware": [
            "ESP32-CAM o sensor de conteo por infrarrojo (Microcontrolador con Cámara Integrada | En cada acceso, 4-6 unidades)",
            "Raspberry Pi 4 (Computadora de Placa Reducida (SBC) | Centro de control del destino)",
            "Panel solar (Fuente de Alimentación / Energía | Para nodos remotos)",
            "Pantalla informativa (Interfaz de Usuario / Iluminación | Para visitantes)"
        ],
        "software": [
            "Python con OpenCV: Inteligencia Artificial / Machine Learning - Para conteo de personas",
            "InfluxDB: Base de Datos - Para históricos de afluencia",
            "Grafana: Visualización / Dashboard - Para monitoreo de capacidad de carga",
            "Node-RED: Automatización / Orquestación - Para automatización de alertas",
            "MQTT: Protocolo de Comunicación IoT - Para comunicación de los nodos"
        ],
        "habilidades": [
            "Gestión de capacidad de carga turística",
            "Analítica de flujos de personas",
            "Sostenibilidad en destinos naturales",
            "Diseño de sistemas de alerta ambiental",
            "Visualización de ocupación en tiempo real"
        ],
        "objetivos": [
            "🎯 Objetivo General: Construir una plataforma de analítica que procese datos de flujo de visitantes captados por sensores IoT para gestionar la capacidad de carga de destinos turísticos sensibles.",
            "📌 Objetivos Específicos:",
            "• Desplegar sensores de conteo de personas en los puntos de acceso de un destino turístico.",
            "• Centralizar y procesar los datos de flujo para calcular la ocupación en tiempo real frente a la capacidad de carga establecida.",
            "• Generar alertas y recomendaciones de gestión (cierre temporal, rutas alternas) cuando se acerque al límite sostenible."
        ],
        "pasos": [
            "Análisis de requisitos",
            "Diseño de la solución",
            "Implementación y pruebas",
            "Validación y sustentación"
        ],
        "aplicaciones": [
            "Turismo sostenible y gestión de destinos"
        ],
        "referencias": [],
        "hardware_tabla": [
            {
                "componente": "ESP32-CAM o sensor de conteo por infrarrojo",
                "categoria": "Microcontrolador con Cámara Integrada",
                "funcion": "En cada acceso, 4-6 unidades"
            },
            {
                "componente": "Raspberry Pi 4",
                "categoria": "Computadora de Placa Reducida (SBC)",
                "funcion": "Centro de control del destino"
            },
            {
                "componente": "Panel solar",
                "categoria": "Fuente de Alimentación / Energía",
                "funcion": "Para nodos remotos"
            },
            {
                "componente": "Pantalla informativa",
                "categoria": "Interfaz de Usuario / Iluminación",
                "funcion": "Para visitantes"
            }
        ],
        "software_tabla": [
            {
                "herramienta": "Python con OpenCV",
                "tipo": "Inteligencia Artificial / Machine Learning",
                "descripcion": "Para conteo de personas"
            },
            {
                "herramienta": "InfluxDB",
                "tipo": "Base de Datos",
                "descripcion": "Para históricos de afluencia"
            },
            {
                "herramienta": "Grafana",
                "tipo": "Visualización / Dashboard",
                "descripcion": "Para monitoreo de capacidad de carga"
            },
            {
                "herramienta": "Node-RED",
                "tipo": "Automatización / Orquestación",
                "descripcion": "Para automatización de alertas"
            },
            {
                "herramienta": "MQTT",
                "tipo": "Protocolo de Comunicación IoT",
                "descripcion": "Para comunicación de los nodos"
            }
        ]
    },
    {
        "id": "proj_069",
        "titulo": "🍽️ Proyecto 69: Sistema de Big Data para Predicción de Demanda en Cadenas de Restaurantes con Sensórica IoT",
        "descripcion": "Problema: Las cadenas de restaurantes desperdician insumos o enfrentan desabastecimiento porque la planificación de compras se basa en estimaciones manuales que no consideran datos en tiempo real de cada sucursal.\n\nDescripción: Plataforma que combina datos de ocupación, temperatura de neveras y ventas históricas de varias sucursales de una cadena de restaurantes, aplicando modelos de series temporales para predecir la demanda de insumos y reducir mermas.",
        "area": "IoT con Big Data y Analítica",
        "sector": "Gastronomía y gestión de cadenas de restaurantes",
        "nivel": "Intermedio",
        "duracion": "Un semestre",
        "presupuesto": "Bajo costo",
        "hardware": [
            "ESP32 con sensor de temperatura DS18B20 (Microcontrolador | Por nevera, 6-8 unidades)",
            "Sensor de ocupación PIR o cámara de conteo por sucursal (Cámara / Sensor de Visión | Captura imágenes o video para el módulo de visión artificial.)",
            "Raspberry Pi 4 (Computadora de Placa Reducida (SBC) | Nodo local por sucursal)",
            "Gateway central (Otro Componente de Hardware | Para consolidación multi-sucursal)"
        ],
        "software": [
            "Apache Spark: Herramienta / Tecnología de Software - Para consolidación multi-sucursal",
            "Prophet/ARIMA: Herramienta / Tecnología de Software - Para predicción de demanda",
            "PostgreSQL: Base de Datos - Para el dataset unificado",
            "Power BI/Metabase: Visualización / Dashboard - Para reportes gerenciales",
            "MQTT: Protocolo de Comunicación IoT - Para telemetría de sucursales"
        ],
        "habilidades": [
            "Predicción de demanda con series temporales",
            "Gestión de datos multi-sucursal",
            "Reducción de desperdicio mediante analítica",
            "Monitoreo de cadena de frío en gastronomía",
            "Reportes ejecutivos basados en datos"
        ],
        "objetivos": [
            "🎯 Objetivo General: Desarrollar una plataforma que integre datos de ocupación, temperatura de neveras y ventas de múltiples sucursales para predecir la demanda de insumos y reducir el desperdicio.",
            "📌 Objetivos Específicos:",
            "• Instrumentar cada sucursal con sensores de ocupación y monitoreo de temperatura de refrigeración.",
            "• Integrar estos datos con los históricos de ventas de cada punto para construir un dataset unificado.",
            "• Entrenar modelos de predicción de demanda que sugieran cantidades óptimas de compra por sucursal y periodo."
        ],
        "pasos": [
            "Análisis de requisitos",
            "Diseño de la solución",
            "Implementación y pruebas",
            "Validación y sustentación"
        ],
        "aplicaciones": [
            "Gastronomía y gestión de cadenas de restaurantes"
        ],
        "referencias": [],
        "hardware_tabla": [
            {
                "componente": "ESP32 con sensor de temperatura DS18B20",
                "categoria": "Microcontrolador",
                "funcion": "Por nevera, 6-8 unidades"
            },
            {
                "componente": "Sensor de ocupación PIR o cámara de conteo por sucursal",
                "categoria": "Cámara / Sensor de Visión",
                "funcion": "Captura imágenes o video para el módulo de visión artificial."
            },
            {
                "componente": "Raspberry Pi 4",
                "categoria": "Computadora de Placa Reducida (SBC)",
                "funcion": "Nodo local por sucursal"
            },
            {
                "componente": "Gateway central",
                "categoria": "Otro Componente de Hardware",
                "funcion": "Para consolidación multi-sucursal"
            }
        ],
        "software_tabla": [
            {
                "herramienta": "Apache Spark",
                "tipo": "Herramienta / Tecnología de Software",
                "descripcion": "Para consolidación multi-sucursal"
            },
            {
                "herramienta": "Prophet/ARIMA",
                "tipo": "Herramienta / Tecnología de Software",
                "descripcion": "Para predicción de demanda"
            },
            {
                "herramienta": "PostgreSQL",
                "tipo": "Base de Datos",
                "descripcion": "Para el dataset unificado"
            },
            {
                "herramienta": "Power BI/Metabase",
                "tipo": "Visualización / Dashboard",
                "descripcion": "Para reportes gerenciales"
            },
            {
                "herramienta": "MQTT",
                "tipo": "Protocolo de Comunicación IoT",
                "descripcion": "Para telemetría de sucursales"
            }
        ]
    },
    {
        "id": "proj_070",
        "titulo": "🗑️ Proyecto 70: Plataforma de Analítica de Big Data para Gestión Inteligente de Residuos Sólidos Urbanos a Escala de Ciudad",
        "descripcion": "Problema: Los sistemas de recolección de residuos urbanos operan con rutas fijas independientemente del nivel real de llenado de los contenedores, generando recorridos ineficientes y altos costos operativos.\n\nDescripción: Red de contenedores instrumentados con sensores ultrasónicos de nivel que reportan su estado a una plataforma central, la cual procesa la información a gran escala para generar rutas de recolección optimizadas y detectar tendencias de generación de residuos por zona.",
        "area": "IoT con Big Data y Analítica",
        "sector": "Gestión ambiental urbana y economía circular",
        "nivel": "Avanzado",
        "duracion": "Un semestre",
        "presupuesto": "Bajo costo",
        "hardware": [
            "ESP32 con sensor ultrasónico HC-SR04 (Microcontrolador | Por contenedor, 15-20 unidades)",
            "Módulo LoRa (Módulo de Comunicación / Conectividad | Para comunicación de largo alcance)",
            "Panel solar y batería por contenedor (Fuente de Alimentación / Energía | Suministra energía eléctrica a los componentes del sistema.)",
            "Raspberry Pi 4 (Computadora de Placa Reducida (SBC) | Centro de operaciones)"
        ],
        "software": [
            "Apache Spark: Herramienta / Tecnología de Software - Para procesamiento a escala de ciudad",
            "PostGIS y OSRM: Herramienta / Tecnología de Software - Para optimización de rutas",
            "TimescaleDB: Base de Datos - Para históricos de llenado",
            "Grafana/QGIS: Visualización / Dashboard - Para dashboards operativos",
            "ChirpStack: Protocolo de Comunicación IoT - Para la red LoRaWAN"
        ],
        "habilidades": [
            "Optimización de rutas con datos geoespaciales",
            "Gestión de infraestructura urbana a gran escala",
            "Redes de sensores de largo alcance",
            "Economía circular y sostenibilidad urbana",
            "Analítica predictiva de generación de residuos PROYECTOS DE IoT MÉDICO Y SALUD DIGITAL  (ÁREA NUEVA)"
        ],
        "objetivos": [
            "🎯 Objetivo General: Desarrollar una plataforma de Big Data que procese datos de miles de contenedores inteligentes distribuidos en una ciudad para optimizar dinámicamente las rutas de recolección de residuos.",
            "📌 Objetivos Específicos:",
            "• Desplegar sensores de nivel de llenado en una red representativa de contenedores urbanos.",
            "• Procesar los datos de llenado a gran escala para generar rutas de recolección optimizadas diariamente.",
            "• Analizar tendencias históricas de generación de residuos por zona para apoyar la planificación de infraestructura."
        ],
        "pasos": [
            "Análisis de requisitos",
            "Diseño de la solución",
            "Implementación y pruebas",
            "Validación y sustentación"
        ],
        "aplicaciones": [
            "Gestión ambiental urbana y economía circular"
        ],
        "referencias": [],
        "hardware_tabla": [
            {
                "componente": "ESP32 con sensor ultrasónico HC-SR04",
                "categoria": "Microcontrolador",
                "funcion": "Por contenedor, 15-20 unidades"
            },
            {
                "componente": "Módulo LoRa",
                "categoria": "Módulo de Comunicación / Conectividad",
                "funcion": "Para comunicación de largo alcance"
            },
            {
                "componente": "Panel solar y batería por contenedor",
                "categoria": "Fuente de Alimentación / Energía",
                "funcion": "Suministra energía eléctrica a los componentes del sistema."
            },
            {
                "componente": "Raspberry Pi 4",
                "categoria": "Computadora de Placa Reducida (SBC)",
                "funcion": "Centro de operaciones"
            }
        ],
        "software_tabla": [
            {
                "herramienta": "Apache Spark",
                "tipo": "Herramienta / Tecnología de Software",
                "descripcion": "Para procesamiento a escala de ciudad"
            },
            {
                "herramienta": "PostGIS y OSRM",
                "tipo": "Herramienta / Tecnología de Software",
                "descripcion": "Para optimización de rutas"
            },
            {
                "herramienta": "TimescaleDB",
                "tipo": "Base de Datos",
                "descripcion": "Para históricos de llenado"
            },
            {
                "herramienta": "Grafana/QGIS",
                "tipo": "Visualización / Dashboard",
                "descripcion": "Para dashboards operativos"
            },
            {
                "herramienta": "ChirpStack",
                "tipo": "Protocolo de Comunicación IoT",
                "descripcion": "Para la red LoRaWAN"
            }
        ]
    },
    {
        "id": "proj_071",
        "titulo": "🏥 Proyecto 71: Sistema de Telemonitoreo de Signos Vitales para Pacientes Crónicos en el Hogar",
        "descripcion": "Problema: Los pacientes con enfermedades crónicas requieren seguimiento continuo de signos vitales, pero las visitas médicas periódicas no capturan variaciones importantes que ocurren entre consultas.\n\nDescripción: Dispositivo portátil basado en ESP32 que integra sensores de pulso, oximetría y temperatura, transmitiendo lecturas cifradas a una plataforma web donde el personal médico puede monitorear remotamente a pacientes crónicos y recibir alertas ante valores anómalos.",
        "area": "IoT Médico y Salud Digital",
        "sector": "Medicina - Telemedicina y atención domiciliaria",
        "nivel": "Intermedio",
        "duracion": "Un semestre",
        "presupuesto": "Bajo costo",
        "hardware": [
            "ESP32 (Microcontrolador | Controla y coordina los sensores/actuadores conectados a él.)",
            "Sensor de pulso/oximetría MAX30102 (Sensor Biomédico | Registra señales fisiológicas del usuario para su monitoreo.)",
            "Sensor de temperatura corporal MLX90614 (Sensor Ambiental | Sin contacto)",
            "Pantalla OLED pequeña (Interfaz de Usuario / Iluminación | Para feedback al paciente)",
            "Batería LiPo recargable con módulo de carga (Fuente de Alimentación / Energía | Suministra energía eléctrica a los componentes del sistema.)",
            "Brazalete/estuche portátil impreso en 3D (Estructura / Componente Mecánico | Brinda soporte físico o estructural al prototipo.)"
        ],
        "software": [
            "MQTT con TLS: Protocolo de Comunicación IoT - Para transmisión cifrada",
            "Node.js/Django: Framework Web / Aplicación - Para la plataforma web médica",
            "PostgreSQL: Base de Datos - Para historiales de signos vitales",
            "Twilio/Telegram API: Herramienta / Tecnología de Software - Para alertas al personal médico",
            "React.js: Visualización / Dashboard - Para el dashboard clínico"
        ],
        "habilidades": [
            "Diseño de dispositivos médicos portátiles",
            "Transmisión segura de datos de salud",
            "Cumplimiento de principios de privacidad en salud digital",
            "Sistemas de alerta clínica",
            "Telemedicina y atención remota"
        ],
        "objetivos": [
            "🎯 Objetivo General: Desarrollar un sistema de telemonitoreo que capture signos vitales de pacientes crónicos en su hogar y los transmita de forma segura al personal médico para seguimiento remoto.",
            "📌 Objetivos Específicos:",
            "• Integrar sensores no invasivos de frecuencia cardíaca, saturación de oxígeno y temperatura corporal en un dispositivo portátil.",
            "• Transmitir de forma cifrada las lecturas a una plataforma web accesible por el equipo médico tratante.",
            "• Implementar un sistema de alertas que notifique automáticamente valores fuera de rango crítico definidos por el médico."
        ],
        "pasos": [
            "Análisis de requisitos",
            "Diseño de la solución",
            "Implementación y pruebas",
            "Validación y sustentación"
        ],
        "aplicaciones": [
            "Medicina - Telemedicina y atención domiciliaria"
        ],
        "referencias": [],
        "hardware_tabla": [
            {
                "componente": "ESP32",
                "categoria": "Microcontrolador",
                "funcion": "Controla y coordina los sensores/actuadores conectados a él."
            },
            {
                "componente": "Sensor de pulso/oximetría MAX30102",
                "categoria": "Sensor Biomédico",
                "funcion": "Registra señales fisiológicas del usuario para su monitoreo."
            },
            {
                "componente": "Sensor de temperatura corporal MLX90614",
                "categoria": "Sensor Ambiental",
                "funcion": "Sin contacto"
            },
            {
                "componente": "Pantalla OLED pequeña",
                "categoria": "Interfaz de Usuario / Iluminación",
                "funcion": "Para feedback al paciente"
            },
            {
                "componente": "Batería LiPo recargable con módulo de carga",
                "categoria": "Fuente de Alimentación / Energía",
                "funcion": "Suministra energía eléctrica a los componentes del sistema."
            },
            {
                "componente": "Brazalete/estuche portátil impreso en 3D",
                "categoria": "Estructura / Componente Mecánico",
                "funcion": "Brinda soporte físico o estructural al prototipo."
            }
        ],
        "software_tabla": [
            {
                "herramienta": "MQTT con TLS",
                "tipo": "Protocolo de Comunicación IoT",
                "descripcion": "Para transmisión cifrada"
            },
            {
                "herramienta": "Node.js/Django",
                "tipo": "Framework Web / Aplicación",
                "descripcion": "Para la plataforma web médica"
            },
            {
                "herramienta": "PostgreSQL",
                "tipo": "Base de Datos",
                "descripcion": "Para historiales de signos vitales"
            },
            {
                "herramienta": "Twilio/Telegram API",
                "tipo": "Herramienta / Tecnología de Software",
                "descripcion": "Para alertas al personal médico"
            },
            {
                "herramienta": "React.js",
                "tipo": "Visualización / Dashboard",
                "descripcion": "Para el dashboard clínico"
            }
        ]
    },
    {
        "id": "proj_072",
        "titulo": "💊 Proyecto 72: Sistema IoT de Adherencia a Tratamientos Farmacológicos con Dispensador Inteligente",
        "descripcion": "Problema: El incumplimiento en la toma de medicamentos es una causa frecuente de complicaciones en pacientes crónicos y adultos mayores, especialmente cuando viven solos y sin supervisión constante.\n\nDescripción: Dispensador automatizado con compartimentos individuales por horario que libera medicamentos según una programación médica, detecta con sensores si la dosis fue retirada y envía notificaciones a cuidadores en caso de omisión.",
        "area": "IoT Médico y Salud Digital",
        "sector": "Medicina - Farmacología y adherencia terapéutica",
        "nivel": "Intermedio",
        "duracion": "Un semestre",
        "presupuesto": "Bajo costo",
        "hardware": [
            "ESP32 (Microcontrolador | Controla y coordina los sensores/actuadores conectados a él.)",
            "Servomotores (Actuador | Uno por compartimento, 6-7 unidades)",
            "Sensores infrarrojos de detección de retiro (Sensor de Movimiento / Posición | Detecta movimiento, orientación o posición dentro del sistema.)",
            "Módulo RTC DS3231 (Otro Componente de Hardware | Para programación horaria precisa)",
            "Buzzer y LED indicadores (Interfaz de Usuario / Iluminación | Permite la interacción, iluminación o notificación visual/sonora del sistema.)",
            "Módulo Wi-Fi/GSM (Módulo de Comunicación / Conectividad | Para notificaciones)"
        ],
        "software": [
            "Arduino IDE/PlatformIO: IDE / Entorno de Desarrollo - Para el firmware",
            "Node-RED: Automatización / Orquestación - Para la lógica de programación de dosis",
            "Firebase/SQLite: Base de Datos - Para el registro de adherencia",
            "Telegram Bot API: Herramienta / Tecnología de Software - Para alertas a cuidadores"
        ],
        "habilidades": [
            "Diseño de dispositivos médicos asistivos",
            "Automatización de dosificación segura",
            "Sistemas de notificación a cuidadores",
            "Gestión de horarios y programación embebida",
            "Ética en el cuidado de adultos mayores"
        ],
        "objetivos": [
            "🎯 Objetivo General: Diseñar un dispensador inteligente de medicamentos que garantice la toma correcta y oportuna de tratamientos farmacológicos, notificando a cuidadores en caso de incumplimiento.",
            "📌 Objetivos Específicos:",
            "• Implementar compartimentos automatizados que liberen la dosis correspondiente según horarios programados.",
            "• Detectar mediante sensores si el paciente efectivamente retiró la dosis dispensada.",
            "• Notificar a cuidadores o familiares cuando una dosis no sea retirada dentro de un periodo definido."
        ],
        "pasos": [
            "Análisis de requisitos",
            "Diseño de la solución",
            "Implementación y pruebas",
            "Validación y sustentación"
        ],
        "aplicaciones": [
            "Medicina - Farmacología y adherencia terapéutica"
        ],
        "referencias": [],
        "hardware_tabla": [
            {
                "componente": "ESP32",
                "categoria": "Microcontrolador",
                "funcion": "Controla y coordina los sensores/actuadores conectados a él."
            },
            {
                "componente": "Servomotores",
                "categoria": "Actuador",
                "funcion": "Uno por compartimento, 6-7 unidades"
            },
            {
                "componente": "Sensores infrarrojos de detección de retiro",
                "categoria": "Sensor de Movimiento / Posición",
                "funcion": "Detecta movimiento, orientación o posición dentro del sistema."
            },
            {
                "componente": "Módulo RTC DS3231",
                "categoria": "Otro Componente de Hardware",
                "funcion": "Para programación horaria precisa"
            },
            {
                "componente": "Buzzer y LED indicadores",
                "categoria": "Interfaz de Usuario / Iluminación",
                "funcion": "Permite la interacción, iluminación o notificación visual/sonora del sistema."
            },
            {
                "componente": "Módulo Wi-Fi/GSM",
                "categoria": "Módulo de Comunicación / Conectividad",
                "funcion": "Para notificaciones"
            }
        ],
        "software_tabla": [
            {
                "herramienta": "Arduino IDE/PlatformIO",
                "tipo": "IDE / Entorno de Desarrollo",
                "descripcion": "Para el firmware"
            },
            {
                "herramienta": "Node-RED",
                "tipo": "Automatización / Orquestación",
                "descripcion": "Para la lógica de programación de dosis"
            },
            {
                "herramienta": "Firebase/SQLite",
                "tipo": "Base de Datos",
                "descripcion": "Para el registro de adherencia"
            },
            {
                "herramienta": "Telegram Bot API",
                "tipo": "Herramienta / Tecnología de Software",
                "descripcion": "Para alertas a cuidadores"
            }
        ]
    },
    {
        "id": "proj_073",
        "titulo": "🏃 Proyecto 73: Plataforma IoT de Rehabilitación Física Remota con Sensores Inerciales",
        "descripcion": "Problema: Muchos pacientes en proceso de rehabilitación física abandonan o realizan incorrectamente sus ejercicios en casa por falta de supervisión, prolongando su recuperación.\n\nDescripción: Sistema de sensores inerciales portátiles (IMU) colocados en brazos o piernas que capturan el movimiento del paciente durante sus ejercicios de rehabilitación, comparándolo contra rutinas de referencia y generando reportes de progreso para el fisioterapeuta.",
        "area": "IoT Médico y Salud Digital",
        "sector": "Medicina - Fisioterapia y rehabilitación",
        "nivel": "Avanzado",
        "duracion": "Un semestre",
        "presupuesto": "Bajo costo",
        "hardware": [
            "ESP32 (Microcontrolador | Controla y coordina los sensores/actuadores conectados a él.)",
            "Sensor IMU MPU6050/MPU9250 (Sensor de Movimiento / Posición | 2-4 unidades por paciente)",
            "Bandas elásticas ajustables (Otro Componente de Hardware | Para sujeción)",
            "Batería LiPo recargable (Fuente de Alimentación / Energía | Suministra energía eléctrica a los componentes del sistema.)",
            "Módulo Bluetooth BLE (Módulo de Comunicación / Conectividad | Para baja latencia)"
        ],
        "software": [
            "Python con NumPy/SciPy: Lenguaje de Programación - Para análisis de movimiento",
            "Algoritmos de fusión de sensores: Inteligencia Artificial / Machine Learning - Filtro de Kalman",
            "Firebase/MongoDB: Base de Datos - Para historiales de ejercicios",
            "React Native o app web: Framework Web / Aplicación - Para el fisioterapeuta"
        ],
        "habilidades": [
            "Análisis de movimiento con sensores inerciales",
            "Fusión de sensores y filtrado de señales",
            "Diseño de dispositivos wearables médicos",
            "Evaluación cuantitativa de rehabilitación física",
            "Comunicación de baja latencia (BLE)"
        ],
        "objetivos": [
            "🎯 Objetivo General: Desarrollar una plataforma que utilice sensores inerciales portátiles para monitorear la correcta ejecución de ejercicios de rehabilitación física en el hogar y reportar el progreso al fisioterapeuta.",
            "📌 Objetivos Específicos:",
            "• Capturar datos de movimiento mediante sensores inerciales (IMU) colocados en las extremidades del paciente durante los ejercicios.",
            "• Desarrollar algoritmos que evalúen el rango de movimiento y la calidad de ejecución respecto a la rutina prescrita.",
            "• Generar reportes de progreso accesibles por el fisioterapeuta para ajustar el plan de rehabilitación remotamente."
        ],
        "pasos": [
            "Análisis de requisitos",
            "Diseño de la solución",
            "Implementación y pruebas",
            "Validación y sustentación"
        ],
        "aplicaciones": [
            "Medicina - Fisioterapia y rehabilitación"
        ],
        "referencias": [],
        "hardware_tabla": [
            {
                "componente": "ESP32",
                "categoria": "Microcontrolador",
                "funcion": "Controla y coordina los sensores/actuadores conectados a él."
            },
            {
                "componente": "Sensor IMU MPU6050/MPU9250",
                "categoria": "Sensor de Movimiento / Posición",
                "funcion": "2-4 unidades por paciente"
            },
            {
                "componente": "Bandas elásticas ajustables",
                "categoria": "Otro Componente de Hardware",
                "funcion": "Para sujeción"
            },
            {
                "componente": "Batería LiPo recargable",
                "categoria": "Fuente de Alimentación / Energía",
                "funcion": "Suministra energía eléctrica a los componentes del sistema."
            },
            {
                "componente": "Módulo Bluetooth BLE",
                "categoria": "Módulo de Comunicación / Conectividad",
                "funcion": "Para baja latencia"
            }
        ],
        "software_tabla": [
            {
                "herramienta": "Python con NumPy/SciPy",
                "tipo": "Lenguaje de Programación",
                "descripcion": "Para análisis de movimiento"
            },
            {
                "herramienta": "Algoritmos de fusión de sensores",
                "tipo": "Inteligencia Artificial / Machine Learning",
                "descripcion": "Filtro de Kalman"
            },
            {
                "herramienta": "Firebase/MongoDB",
                "tipo": "Base de Datos",
                "descripcion": "Para historiales de ejercicios"
            },
            {
                "herramienta": "React Native o app web",
                "tipo": "Framework Web / Aplicación",
                "descripcion": "Para el fisioterapeuta"
            }
        ]
    },
    {
        "id": "proj_074",
        "titulo": "🩸 Proyecto 74: Sistema de Monitoreo Continuo de Glucosa No Invasivo Asistido por IoT",
        "descripcion": "Problema: Los pacientes diabéticos dependen de mediciones invasivas frecuentes de glucosa, lo que genera incomodidad y baja adherencia al monitoreo continuo necesario para un control adecuado.\n\nDescripción: Sistema que registra mediciones periódicas de glucosa junto con variables de contexto (actividad física, ingesta, sueño) capturadas por wearables, y aplica modelos predictivos para estimar tendencias glucémicas y anticipar eventos de riesgo entre mediciones.",
        "area": "IoT Médico y Salud Digital",
        "sector": "Medicina - Endocrinología y manejo de diabetes",
        "nivel": "Avanzado",
        "duracion": "Un semestre",
        "presupuesto": "Bajo costo",
        "hardware": [
            "ESP32 (Microcontrolador | Controla y coordina los sensores/actuadores conectados a él.)",
            "Pulsera de actividad física con acelerómetro (Sensor de Movimiento / Posición | O módulo IMU propio)",
            "Interfaz de registro manual de mediciones de glucosa (Sensor Biomédico | Registra señales fisiológicas del usuario para su monitoreo.)",
            "Pantalla OLED (Interfaz de Usuario / Iluminación | Para retroalimentación)",
            "Módulo Bluetooth BLE (Módulo de Comunicación / Conectividad | Permite la transmisión inalámbrica de datos entre dispositivos.)"
        ],
        "software": [
            "Python con TensorFlow/Scikit-learn: Inteligencia Artificial / Machine Learning - Para modelos predictivos",
            "Modelos de series temporales: Herramienta / Tecnología de Software - LSTM; para glucosa",
            "SQLite/Firebase: Base de Datos - Para historial del paciente",
            "App móvil: Framework Web / Aplicación - Flutter/React Native; para el paciente"
        ],
        "habilidades": [
            "Modelado predictivo de series fisiológicas",
            "Wearables para monitoreo de salud",
            "Sistemas de alerta temprana clínica",
            "Manejo de datos sensibles de salud",
            "Diseño centrado en el paciente"
        ],
        "objetivos": [
            "🎯 Objetivo General: Desarrollar un prototipo de monitoreo asistido de glucosa que combine mediciones periódicas del paciente con modelos predictivos para anticipar variaciones y reducir la frecuencia de mediciones invasivas.",
            "📌 Objetivos Específicos:",
            "• Integrar un dispositivo de registro de mediciones de glucosa junto con variables contextuales (actividad, comidas, sueño).",
            "• Entrenar modelos predictivos que estimen tendencias de glucosa entre mediciones reales basándose en el histórico del paciente.",
            "• Implementar alertas tempranas ante predicción de hipoglucemia o hiperglucemia antes de que ocurra el evento."
        ],
        "pasos": [
            "Análisis de requisitos",
            "Diseño de la solución",
            "Implementación y pruebas",
            "Validación y sustentación"
        ],
        "aplicaciones": [
            "Medicina - Endocrinología y manejo de diabetes"
        ],
        "referencias": [],
        "hardware_tabla": [
            {
                "componente": "ESP32",
                "categoria": "Microcontrolador",
                "funcion": "Controla y coordina los sensores/actuadores conectados a él."
            },
            {
                "componente": "Pulsera de actividad física con acelerómetro",
                "categoria": "Sensor de Movimiento / Posición",
                "funcion": "O módulo IMU propio"
            },
            {
                "componente": "Interfaz de registro manual de mediciones de glucosa",
                "categoria": "Sensor Biomédico",
                "funcion": "Registra señales fisiológicas del usuario para su monitoreo."
            },
            {
                "componente": "Pantalla OLED",
                "categoria": "Interfaz de Usuario / Iluminación",
                "funcion": "Para retroalimentación"
            },
            {
                "componente": "Módulo Bluetooth BLE",
                "categoria": "Módulo de Comunicación / Conectividad",
                "funcion": "Permite la transmisión inalámbrica de datos entre dispositivos."
            }
        ],
        "software_tabla": [
            {
                "herramienta": "Python con TensorFlow/Scikit-learn",
                "tipo": "Inteligencia Artificial / Machine Learning",
                "descripcion": "Para modelos predictivos"
            },
            {
                "herramienta": "Modelos de series temporales",
                "tipo": "Herramienta / Tecnología de Software",
                "descripcion": "LSTM; para glucosa"
            },
            {
                "herramienta": "SQLite/Firebase",
                "tipo": "Base de Datos",
                "descripcion": "Para historial del paciente"
            },
            {
                "herramienta": "App móvil",
                "tipo": "Framework Web / Aplicación",
                "descripcion": "Flutter/React Native; para el paciente"
            }
        ]
    },
    {
        "id": "proj_075",
        "titulo": "🚨 Proyecto 75: Sistema IoT de Prevención de Caídas y Emergencias para Adultos Mayores",
        "descripcion": "Problema: Las caídas son una de las principales causas de lesiones graves en adultos mayores que viven solos, y la detección tardía de estos eventos puede agravar significativamente las consecuencias.\n\nDescripción: Dispositivo wearable tipo colgante o pulsera que utiliza un sensor IMU para detectar patrones característicos de una caída, cuenta con un botón de pánico manual, y envía notificaciones con geolocalización a una lista de contactos de emergencia predefinidos.",
        "area": "IoT Médico y Salud Digital",
        "sector": "Medicina - Geriatría y seguridad del paciente",
        "nivel": "Intermedio",
        "duracion": "Un semestre",
        "presupuesto": "Bajo costo",
        "hardware": [
            "ESP32 (Microcontrolador | Controla y coordina los sensores/actuadores conectados a él.)",
            "Sensor IMU MPU6050 (Sensor de Movimiento / Posición | Detecta movimiento, orientación o posición dentro del sistema.)",
            "Módulo GPS NEO-6M (Módulo de Comunicación / Conectividad | Permite la transmisión inalámbrica de datos entre dispositivos.)",
            "Módulo GSM/GPRS SIM800L (Módulo de Comunicación / Conectividad | Para llamadas/SMS de emergencia)",
            "Botón de pánico físico (Interfaz de Usuario / Iluminación | Permite la interacción, iluminación o notificación visual/sonora del sistema.)",
            "Batería LiPo con carga inalámbrica (Fuente de Alimentación / Energía | Suministra energía eléctrica a los componentes del sistema.)"
        ],
        "software": [
            "Algoritmos de detección de caídas basados en umbrales de aceleración: Inteligencia Artificial / Machine Learning - Procesa datos mediante modelos de IA/ML para generar predicciones o clasificaciones.",
            "Python/C++: Lenguaje de Programación - Para el firmware embebido",
            "Twilio API: Herramienta / Tecnología de Software - Para notificaciones SMS/llamadas",
            "Firebase: Base de Datos - Para geolocalización en tiempo real"
        ],
        "habilidades": [
            "Detección de eventos mediante sensores inerciales",
            "Diseño de wearables de seguridad",
            "Sistemas de notificación de emergencia",
            "Geolocalización en tiempo real",
            "Diseño centrado en adultos mayores"
        ],
        "objetivos": [
            "🎯 Objetivo General: Desarrollar un dispositivo wearable que detecte caídas y otras emergencias en adultos mayores, notificando de forma inmediata a familiares o servicios de emergencia.",
            "📌 Objetivos Específicos:",
            "• Implementar detección de caídas mediante análisis de patrones de aceleración y orientación con un sensor IMU.",
            "• Integrar un botón de pánico manual para emergencias que el usuario pueda activar conscientemente.",
            "• Desarrollar un sistema de notificación en cascada que contacte a varios contactos de emergencia con la ubicación del usuario."
        ],
        "pasos": [
            "Análisis de requisitos",
            "Diseño de la solución",
            "Implementación y pruebas",
            "Validación y sustentación"
        ],
        "aplicaciones": [
            "Medicina - Geriatría y seguridad del paciente"
        ],
        "referencias": [],
        "hardware_tabla": [
            {
                "componente": "ESP32",
                "categoria": "Microcontrolador",
                "funcion": "Controla y coordina los sensores/actuadores conectados a él."
            },
            {
                "componente": "Sensor IMU MPU6050",
                "categoria": "Sensor de Movimiento / Posición",
                "funcion": "Detecta movimiento, orientación o posición dentro del sistema."
            },
            {
                "componente": "Módulo GPS NEO-6M",
                "categoria": "Módulo de Comunicación / Conectividad",
                "funcion": "Permite la transmisión inalámbrica de datos entre dispositivos."
            },
            {
                "componente": "Módulo GSM/GPRS SIM800L",
                "categoria": "Módulo de Comunicación / Conectividad",
                "funcion": "Para llamadas/SMS de emergencia"
            },
            {
                "componente": "Botón de pánico físico",
                "categoria": "Interfaz de Usuario / Iluminación",
                "funcion": "Permite la interacción, iluminación o notificación visual/sonora del sistema."
            },
            {
                "componente": "Batería LiPo con carga inalámbrica",
                "categoria": "Fuente de Alimentación / Energía",
                "funcion": "Suministra energía eléctrica a los componentes del sistema."
            }
        ],
        "software_tabla": [
            {
                "herramienta": "Algoritmos de detección de caídas basados en umbrales de aceleración",
                "tipo": "Inteligencia Artificial / Machine Learning",
                "descripcion": "Procesa datos mediante modelos de IA/ML para generar predicciones o clasificaciones."
            },
            {
                "herramienta": "Python/C++",
                "tipo": "Lenguaje de Programación",
                "descripcion": "Para el firmware embebido"
            },
            {
                "herramienta": "Twilio API",
                "tipo": "Herramienta / Tecnología de Software",
                "descripcion": "Para notificaciones SMS/llamadas"
            },
            {
                "herramienta": "Firebase",
                "tipo": "Base de Datos",
                "descripcion": "Para geolocalización en tiempo real"
            }
        ]
    },
    {
        "id": "proj_076",
        "titulo": "🧠 Proyecto 76: Plataforma IoT de Monitoreo de Salud Mental mediante Biomarcadores Fisiológicos",
        "descripcion": "Problema: El seguimiento del estado de salud mental suele depender exclusivamente de autoreportes esporádicos, sin datos fisiológicos objetivos que complementen la evaluación clínica entre sesiones.\n\nDescripción: Wearable que combina un sensor de pulso para calcular variabilidad de frecuencia cardíaca y un sensor de conductancia de la piel, correlacionando estos biomarcadores con autoreportes emocionales del paciente para generar reportes de tendencia útiles en terapia.",
        "area": "IoT Médico y Salud Digital",
        "sector": "Medicina - Salud mental y bienestar",
        "nivel": "Avanzado",
        "duracion": "Un semestre",
        "presupuesto": "Bajo costo",
        "hardware": [
            "ESP32 (Microcontrolador | Controla y coordina los sensores/actuadores conectados a él.)",
            "Sensor de pulso MAX30102 (Sensor Biomédico | Para HRV)",
            "Sensor de conductancia galvánica de la piel (Sensor Biomédico | GSR)",
            "Pantalla OLED pequeña (Interfaz de Usuario / Iluminación | Permite la interacción, iluminación o notificación visual/sonora del sistema.)",
            "Correa/brazalete cómodo (Otro Componente de Hardware | Para uso prolongado)"
        ],
        "software": [
            "Python con SciPy: Lenguaje de Programación - Para cálculo de HRV",
            "Modelos de correlación estadística: Librería / Herramienta de Análisis de Datos - Se utiliza para el procesamiento y análisis de los datos recolectados.",
            "Firebase/MongoDB: Base de Datos - Para historial longitudinal",
            "App móvil: Framework Web / Aplicación - Para autoreporte emocional",
            "Dashboard web: Visualización / Dashboard - Para el profesional de salud mental"
        ],
        "habilidades": [
            "Biomarcadores fisiológicos de estrés",
            "Procesamiento de señales biométricas",
            "Diseño ético de tecnología en salud mental",
            "Correlación de datos subjetivos y objetivos",
            "Privacidad y confidencialidad clínica"
        ],
        "objetivos": [
            "🎯 Objetivo General: Desarrollar una plataforma que registre biomarcadores fisiológicos asociados al estrés y ansiedad (variabilidad de frecuencia cardíaca, conductancia de la piel) para apoyar el seguimiento clínico de salud mental.",
            "📌 Objetivos Específicos:",
            "• Integrar sensores de variabilidad de frecuencia cardíaca (HRV) y conductancia galvánica de la piel en un dispositivo wearable.",
            "• Correlacionar los patrones fisiológicos con autoreportes periódicos del estado emocional del paciente.",
            "• Generar reportes longitudinales que el profesional de salud mental pueda revisar entre sesiones de terapia."
        ],
        "pasos": [
            "Análisis de requisitos",
            "Diseño de la solución",
            "Implementación y pruebas",
            "Validación y sustentación"
        ],
        "aplicaciones": [
            "Medicina - Salud mental y bienestar"
        ],
        "referencias": [],
        "hardware_tabla": [
            {
                "componente": "ESP32",
                "categoria": "Microcontrolador",
                "funcion": "Controla y coordina los sensores/actuadores conectados a él."
            },
            {
                "componente": "Sensor de pulso MAX30102",
                "categoria": "Sensor Biomédico",
                "funcion": "Para HRV"
            },
            {
                "componente": "Sensor de conductancia galvánica de la piel",
                "categoria": "Sensor Biomédico",
                "funcion": "GSR"
            },
            {
                "componente": "Pantalla OLED pequeña",
                "categoria": "Interfaz de Usuario / Iluminación",
                "funcion": "Permite la interacción, iluminación o notificación visual/sonora del sistema."
            },
            {
                "componente": "Correa/brazalete cómodo",
                "categoria": "Otro Componente de Hardware",
                "funcion": "Para uso prolongado"
            }
        ],
        "software_tabla": [
            {
                "herramienta": "Python con SciPy",
                "tipo": "Lenguaje de Programación",
                "descripcion": "Para cálculo de HRV"
            },
            {
                "herramienta": "Modelos de correlación estadística",
                "tipo": "Librería / Herramienta de Análisis de Datos",
                "descripcion": "Se utiliza para el procesamiento y análisis de los datos recolectados."
            },
            {
                "herramienta": "Firebase/MongoDB",
                "tipo": "Base de Datos",
                "descripcion": "Para historial longitudinal"
            },
            {
                "herramienta": "App móvil",
                "tipo": "Framework Web / Aplicación",
                "descripcion": "Para autoreporte emocional"
            },
            {
                "herramienta": "Dashboard web",
                "tipo": "Visualización / Dashboard",
                "descripcion": "Para el profesional de salud mental"
            }
        ]
    },
    {
        "id": "proj_077",
        "titulo": "🌡️ Proyecto 77: Sistema de Monitoreo Ambiental Hospitalario para Prevención de Infecciones Nosocomiales",
        "descripcion": "Problema: Los hospitales requieren mantener condiciones ambientales estrictas (temperatura, humedad, calidad del aire) en áreas críticas para reducir el riesgo de infecciones asociadas a la atención de salud.\n\nDescripción: Red de sensores instalados en quirófanos y áreas críticas que monitorean continuamente temperatura, humedad y partículas en el aire, comparando cada lectura contra los rangos normativos y generando un registro auditable de cumplimiento ambiental.",
        "area": "IoT Médico y Salud Digital",
        "sector": "Medicina - Control de infecciones hospitalarias",
        "nivel": "Intermedio",
        "duracion": "Un semestre",
        "presupuesto": "Bajo costo",
        "hardware": [
            "ESP32 (Microcontrolador | Por área monitoreada, 5-8 unidades)",
            "Sensor de temperatura/humedad SHT31 (Sensor Ambiental | Alta precisión)",
            "Sensor de partículas PMS5003 (Sensor Ambiental | Mide variables ambientales relevantes para el sistema.)",
            "Raspberry Pi 4 (Computadora de Placa Reducida (SBC) | Servidor central de cumplimiento)"
        ],
        "software": [
            "InfluxDB: Base de Datos - Para históricos ambientales",
            "Grafana: Visualización / Dashboard - Para dashboards de cumplimiento",
            "Node-RED: Automatización / Orquestación - Para lógica de alertas por desviación",
            "PostgreSQL: Base de Datos - Para registros de auditoría"
        ],
        "habilidades": [
            "Monitoreo ambiental en entornos críticos de salud",
            "Cumplimiento normativo hospitalario",
            "Trazabilidad y auditoría de condiciones ambientales",
            "Prevención de infecciones nosocomiales",
            "Diseño de sistemas de alerta por incumplimiento"
        ],
        "objetivos": [
            "🎯 Objetivo General: Implementar un sistema de monitoreo ambiental continuo en áreas críticas hospitalarias que detecte desviaciones de los parámetros exigidos y facilite la trazabilidad de cumplimiento normativo.",
            "📌 Objetivos Específicos:",
            "• Instrumentar quirófanos y áreas críticas con sensores de temperatura, humedad y calidad del aire.",
            "• Comparar continuamente las lecturas contra los rangos normativos exigidos para cada tipo de área.",
            "• Generar registros trazables de cumplimiento para auditorías de control de infecciones."
        ],
        "pasos": [
            "Análisis de requisitos",
            "Diseño de la solución",
            "Implementación y pruebas",
            "Validación y sustentación"
        ],
        "aplicaciones": [
            "Medicina - Control de infecciones hospitalarias"
        ],
        "referencias": [],
        "hardware_tabla": [
            {
                "componente": "ESP32",
                "categoria": "Microcontrolador",
                "funcion": "Por área monitoreada, 5-8 unidades"
            },
            {
                "componente": "Sensor de temperatura/humedad SHT31",
                "categoria": "Sensor Ambiental",
                "funcion": "Alta precisión"
            },
            {
                "componente": "Sensor de partículas PMS5003",
                "categoria": "Sensor Ambiental",
                "funcion": "Mide variables ambientales relevantes para el sistema."
            },
            {
                "componente": "Raspberry Pi 4",
                "categoria": "Computadora de Placa Reducida (SBC)",
                "funcion": "Servidor central de cumplimiento"
            }
        ],
        "software_tabla": [
            {
                "herramienta": "InfluxDB",
                "tipo": "Base de Datos",
                "descripcion": "Para históricos ambientales"
            },
            {
                "herramienta": "Grafana",
                "tipo": "Visualización / Dashboard",
                "descripcion": "Para dashboards de cumplimiento"
            },
            {
                "herramienta": "Node-RED",
                "tipo": "Automatización / Orquestación",
                "descripcion": "Para lógica de alertas por desviación"
            },
            {
                "herramienta": "PostgreSQL",
                "tipo": "Base de Datos",
                "descripcion": "Para registros de auditoría"
            }
        ]
    },
    {
        "id": "proj_078",
        "titulo": "❄️ Proyecto 78: Sistema IoT de Gestión y Trazabilidad de Cadena de Frío para Vacunas",
        "descripcion": "Problema: Las vacunas pierden efectividad si se exponen a temperaturas fuera de rango durante su almacenamiento o transporte, y muchos centros de salud carecen de trazabilidad confiable de la cadena de frío.\n\nDescripción: Sistema de sensores instalados en refrigeradores y contenedores de transporte de vacunas que registran continuamente la temperatura y ubicación, asociando cada lectura al lote de vacunas correspondiente y generando alertas ante cualquier ruptura de la cadena de frío.",
        "area": "IoT Médico y Salud Digital",
        "sector": "Medicina - Logística sanitaria e inmunización",
        "nivel": "Intermedio",
        "duracion": "Un semestre",
        "presupuesto": "Bajo costo",
        "hardware": [
            "ESP32 (Microcontrolador | Controla y coordina los sensores/actuadores conectados a él.)",
            "Sensor de temperatura DS18B20 (Sensor Ambiental | Sumergible, para interior de refrigeradores)",
            "Módulo GPS (Módulo de Comunicación / Conectividad | Para contenedores de transporte)",
            "Módulo GSM/LoRa según el contexto de despliegue (Módulo de Comunicación / Conectividad | Permite la transmisión inalámbrica de datos entre dispositivos.)",
            "Batería de respaldo (Fuente de Alimentación / Energía | Para continuidad ante cortes de energía)"
        ],
        "software": [
            "MQTT: Protocolo de Comunicación IoT - Para transmisión de telemetría",
            "InfluxDB: Base de Datos - Para históricos por lote",
            "Node-RED: Automatización / Orquestación - Para lógica de alertas",
            "PostgreSQL: Base de Datos - Para trazabilidad de lotes",
            "Dashboard web: Visualización / Dashboard - Para personal de salud"
        ],
        "habilidades": [
            "Gestión de cadena de frío en salud",
            "Trazabilidad de lotes e inmunobiológicos",
            "Sistemas de alerta temprana logística",
            "Diseño de sistemas críticos con respaldo energético",
            "Cumplimiento normativo en logística sanitaria"
        ],
        "objetivos": [
            "🎯 Objetivo General: Desarrollar un sistema de monitoreo y trazabilidad de la cadena de frío de vacunas que garantice y documente el cumplimiento de rangos de temperatura desde el almacenamiento hasta la aplicación.",
            "📌 Objetivos Específicos:",
            "• Instrumentar refrigeradores y contenedores de transporte de vacunas con sensores continuos de temperatura.",
            "• Registrar de forma inmutable cada evento de temperatura junto con la ubicación y el lote de vacunas correspondiente.",
            "• Generar alertas inmediatas ante rupturas de cadena de frío y reportes de trazabilidad por lote."
        ],
        "pasos": [
            "Análisis de requisitos",
            "Diseño de la solución",
            "Implementación y pruebas",
            "Validación y sustentación"
        ],
        "aplicaciones": [
            "Medicina - Logística sanitaria e inmunización"
        ],
        "referencias": [],
        "hardware_tabla": [
            {
                "componente": "ESP32",
                "categoria": "Microcontrolador",
                "funcion": "Controla y coordina los sensores/actuadores conectados a él."
            },
            {
                "componente": "Sensor de temperatura DS18B20",
                "categoria": "Sensor Ambiental",
                "funcion": "Sumergible, para interior de refrigeradores"
            },
            {
                "componente": "Módulo GPS",
                "categoria": "Módulo de Comunicación / Conectividad",
                "funcion": "Para contenedores de transporte"
            },
            {
                "componente": "Módulo GSM/LoRa según el contexto de despliegue",
                "categoria": "Módulo de Comunicación / Conectividad",
                "funcion": "Permite la transmisión inalámbrica de datos entre dispositivos."
            },
            {
                "componente": "Batería de respaldo",
                "categoria": "Fuente de Alimentación / Energía",
                "funcion": "Para continuidad ante cortes de energía"
            }
        ],
        "software_tabla": [
            {
                "herramienta": "MQTT",
                "tipo": "Protocolo de Comunicación IoT",
                "descripcion": "Para transmisión de telemetría"
            },
            {
                "herramienta": "InfluxDB",
                "tipo": "Base de Datos",
                "descripcion": "Para históricos por lote"
            },
            {
                "herramienta": "Node-RED",
                "tipo": "Automatización / Orquestación",
                "descripcion": "Para lógica de alertas"
            },
            {
                "herramienta": "PostgreSQL",
                "tipo": "Base de Datos",
                "descripcion": "Para trazabilidad de lotes"
            },
            {
                "herramienta": "Dashboard web",
                "tipo": "Visualización / Dashboard",
                "descripcion": "Para personal de salud"
            }
        ]
    },
    {
        "id": "proj_079",
        "titulo": "⌚ Proyecto 79: Sistema de Monitoreo Postoperatorio Remoto con Wearables IoT",
        "descripcion": "Problema: El periodo postoperatorio inmediato en el hogar carece de supervisión continua, dificultando la detección temprana de complicaciones como infecciones o alteraciones de signos vitales.\n\nDescripción: Dispositivo wearable tipo parche que monitorea temperatura, frecuencia cardíaca y saturación de oxígeno del paciente durante su recuperación en casa, comparando las lecturas contra umbrales definidos por el cirujano y habilitando comunicación directa con el equipo médico ante alertas.",
        "area": "IoT Médico y Salud Digital",
        "sector": "Medicina - Cirugía y seguimiento postoperatorio",
        "nivel": "Avanzado",
        "duracion": "Un semestre",
        "presupuesto": "Bajo costo",
        "hardware": [
            "ESP32 (Microcontrolador | Controla y coordina los sensores/actuadores conectados a él.)",
            "Sensor de pulso/oximetría MAX30102 (Sensor Biomédico | Registra señales fisiológicas del usuario para su monitoreo.)",
            "Sensor de temperatura corporal MLX90614 (Sensor Ambiental | Mide variables ambientales relevantes para el sistema.)",
            "Parche adhesivo médico (Otro Componente de Hardware | Para fijación)",
            "Batería LiPo de bajo perfil (Fuente de Alimentación / Energía | Suministra energía eléctrica a los componentes del sistema.)",
            "Módulo BLE (Módulo de Comunicación / Conectividad | Para transmisión a smartphone)"
        ],
        "software": [
            "App móvil: Framework Web / Aplicación - Flutter/React Native; para el paciente",
            "Node.js/Django: Framework Web / Aplicación - Para la plataforma clínica",
            "PostgreSQL: Base de Datos - Para historiales postoperatorios",
            "Twilio/WebRTC: Herramienta / Tecnología de Software - Para comunicación directa con el equipo médico"
        ],
        "habilidades": [
            "Diseño de wearables médicos de bajo perfil",
            "Definición de umbrales clínicos de alerta",
            "Telemedicina postoperatoria",
            "Comunicación paciente-médico en tiempo real",
            "Manejo seguro de información clínica sensible"
        ],
        "objetivos": [
            "🎯 Objetivo General: Desarrollar un sistema de monitoreo postoperatorio remoto que permita al equipo quirúrgico supervisar signos vitales y señales de alerta de complicaciones durante la recuperación domiciliaria.",
            "📌 Objetivos Específicos:",
            "• Integrar sensores de temperatura corporal, frecuencia cardíaca y saturación de oxígeno en un parche o dispositivo wearable postoperatorio.",
            "• Definir umbrales de alerta específicos según el tipo de cirugía para detectar posibles complicaciones tempranas.",
            "• Implementar un canal de comunicación directo entre el paciente y el equipo médico ante la activación de una alerta."
        ],
        "pasos": [
            "Análisis de requisitos",
            "Diseño de la solución",
            "Implementación y pruebas",
            "Validación y sustentación"
        ],
        "aplicaciones": [
            "Medicina - Cirugía y seguimiento postoperatorio"
        ],
        "referencias": [],
        "hardware_tabla": [
            {
                "componente": "ESP32",
                "categoria": "Microcontrolador",
                "funcion": "Controla y coordina los sensores/actuadores conectados a él."
            },
            {
                "componente": "Sensor de pulso/oximetría MAX30102",
                "categoria": "Sensor Biomédico",
                "funcion": "Registra señales fisiológicas del usuario para su monitoreo."
            },
            {
                "componente": "Sensor de temperatura corporal MLX90614",
                "categoria": "Sensor Ambiental",
                "funcion": "Mide variables ambientales relevantes para el sistema."
            },
            {
                "componente": "Parche adhesivo médico",
                "categoria": "Otro Componente de Hardware",
                "funcion": "Para fijación"
            },
            {
                "componente": "Batería LiPo de bajo perfil",
                "categoria": "Fuente de Alimentación / Energía",
                "funcion": "Suministra energía eléctrica a los componentes del sistema."
            },
            {
                "componente": "Módulo BLE",
                "categoria": "Módulo de Comunicación / Conectividad",
                "funcion": "Para transmisión a smartphone"
            }
        ],
        "software_tabla": [
            {
                "herramienta": "App móvil",
                "tipo": "Framework Web / Aplicación",
                "descripcion": "Flutter/React Native; para el paciente"
            },
            {
                "herramienta": "Node.js/Django",
                "tipo": "Framework Web / Aplicación",
                "descripcion": "Para la plataforma clínica"
            },
            {
                "herramienta": "PostgreSQL",
                "tipo": "Base de Datos",
                "descripcion": "Para historiales postoperatorios"
            },
            {
                "herramienta": "Twilio/WebRTC",
                "tipo": "Herramienta / Tecnología de Software",
                "descripcion": "Para comunicación directa con el equipo médico"
            }
        ]
    },
    {
        "id": "proj_080",
        "titulo": "🛏️ Proyecto 80: Plataforma IoT de Gestión Inteligente de Camas y Ocupación Hospitalaria",
        "descripcion": "Problema: Los hospitales enfrentan dificultades para conocer en tiempo real la disponibilidad de camas por servicio, generando demoras en la asignación de pacientes y saturación de urgencias.\n\nDescripción: Red de sensores de presión y contacto instalados en camas hospitalarias que reportan su estado de ocupación en tiempo real a un tablero de control centralizado, el cual sugiere asignaciones óptimas de pacientes según disponibilidad y especialidad.",
        "area": "IoT Médico y Salud Digital",
        "sector": "Medicina - Gestión hospitalaria y administración de salud",
        "nivel": "Intermedio",
        "duracion": "Un semestre",
        "presupuesto": "Bajo costo",
        "hardware": [
            "ESP32 (Microcontrolador | Por cama, 10-20 unidades)",
            "Sensor de presión FSR o interruptor de contacto (Otro Componente de Hardware | Forma parte del hardware de soporte del proyecto.)",
            "Raspberry Pi 4 (Computadora de Placa Reducida (SBC) | Servidor central del hospital)",
            "Pantallas informativas por sala (Interfaz de Usuario / Iluminación | Opcional)"
        ],
        "software": [
            "Node-RED: Automatización / Orquestación - Para la lógica de asignación",
            "PostgreSQL: Base de Datos - Para el estado de camas y pacientes",
            "React.js: Framework Web / Aplicación - Para el tablero de control",
            "MQTT: Protocolo de Comunicación IoT - Para telemetría de sensores en tiempo real"
        ],
        "habilidades": [
            "Gestión hospitalaria basada en datos",
            "Optimización de asignación de recursos críticos",
            "Diseño de tableros de control en tiempo real",
            "Sistemas de soporte a decisiones clínico-administrativas",
            "Instrumentación no invasiva de infraestructura hospitalaria PROYECTOS DE IoT AEROESPACIAL Y AERONÁUTICO  (ÁREA NUEVA)"
        ],
        "objetivos": [
            "🎯 Objetivo General: Desarrollar una plataforma que monitoree en tiempo real el estado y ocupación de camas hospitalarias para optimizar la asignación de pacientes y la gestión de capacidad hospitalaria.",
            "📌 Objetivos Específicos:",
            "• Instrumentar camas hospitalarias con sensores que detecten ocupación y estado (limpieza, disponibilidad).",
            "• Centralizar el estado de todas las camas del hospital en un tablero de control en tiempo real por servicio.",
            "• Implementar algoritmos de sugerencia de asignación que prioricen camas según urgencia y especialidad requerida."
        ],
        "pasos": [
            "Análisis de requisitos",
            "Diseño de la solución",
            "Implementación y pruebas",
            "Validación y sustentación"
        ],
        "aplicaciones": [
            "Medicina - Gestión hospitalaria y administración de salud"
        ],
        "referencias": [],
        "hardware_tabla": [
            {
                "componente": "ESP32",
                "categoria": "Microcontrolador",
                "funcion": "Por cama, 10-20 unidades"
            },
            {
                "componente": "Sensor de presión FSR o interruptor de contacto",
                "categoria": "Otro Componente de Hardware",
                "funcion": "Forma parte del hardware de soporte del proyecto."
            },
            {
                "componente": "Raspberry Pi 4",
                "categoria": "Computadora de Placa Reducida (SBC)",
                "funcion": "Servidor central del hospital"
            },
            {
                "componente": "Pantallas informativas por sala",
                "categoria": "Interfaz de Usuario / Iluminación",
                "funcion": "Opcional"
            }
        ],
        "software_tabla": [
            {
                "herramienta": "Node-RED",
                "tipo": "Automatización / Orquestación",
                "descripcion": "Para la lógica de asignación"
            },
            {
                "herramienta": "PostgreSQL",
                "tipo": "Base de Datos",
                "descripcion": "Para el estado de camas y pacientes"
            },
            {
                "herramienta": "React.js",
                "tipo": "Framework Web / Aplicación",
                "descripcion": "Para el tablero de control"
            },
            {
                "herramienta": "MQTT",
                "tipo": "Protocolo de Comunicación IoT",
                "descripcion": "Para telemetría de sensores en tiempo real"
            }
        ]
    },
    {
        "id": "proj_081",
        "titulo": "🚀 Proyecto 81: Estación de Telemetría IoT para Cohetes Modelo de Investigación Universitaria",
        "descripcion": "Problema: Los proyectos universitarios de cohetería experimental carecen de sistemas de telemetría accesibles que registren variables de vuelo críticas para el análisis posterior del desempeño del cohete.\n\nDescripción: Placa de vuelo compacta basada en ESP32 que integra sensores de altitud barométrica, aceleración e IMU, almacenando los datos en memoria local y transmitiéndolos por radiofrecuencia durante el vuelo para su posterior reconstrucción y análisis de trayectoria.",
        "area": "IoT Aeroespacial y Aeronáutico",
        "sector": "Aeroespacial - Cohetería experimental universitaria",
        "nivel": "Avanzado",
        "duracion": "Un semestre",
        "presupuesto": "Bajo costo",
        "hardware": [
            "ESP32 (Microcontrolador | Versión de bajo peso)",
            "Sensor barométrico BMP390 (Otro Componente de Hardware | Alta precisión de altitud)",
            "IMU de alto rango MPU9250 (Sensor de Movimiento / Posición | Detecta movimiento, orientación o posición dentro del sistema.)",
            "Módulo de radiofrecuencia LoRa de largo alcance (Módulo de Comunicación / Conectividad | Permite la transmisión inalámbrica de datos entre dispositivos.)",
            "Tarjeta microSD (Almacenamiento | Para respaldo local)",
            "Batería LiPo de alta densidad y bajo peso (Fuente de Alimentación / Energía | Suministra energía eléctrica a los componentes del sistema.)",
            "Estructura impresa en 3D resistente a vibración (Estructura / Componente Mecánico | Brinda soporte físico o estructural al prototipo.)"
        ],
        "software": [
            "Python: Lenguaje de Programación - Para el software de análisis post-vuelo",
            "Matplotlib/Plotly: Librería / Herramienta de Análisis de Datos - Para reconstrucción de trayectoria",
            "PlatformIO: IDE / Entorno de Desarrollo - Para el firmware embebido",
            "Protocolo LoRa punto a punto: Protocolo de Comunicación IoT - Para telemetría en vivo"
        ],
        "habilidades": [
            "Diseño de sistemas embebidos resistentes a vibración",
            "Telemetría de vuelo en tiempo real",
            "Análisis de trayectorias balísticas",
            "Gestión de energía en sistemas aeroespaciales de bajo peso",
            "Comunicación por radiofrecuencia de largo alcance"
        ],
        "objetivos": [
            "🎯 Objetivo General: Desarrollar una estación de telemetría embebida que registre y transmita variables de vuelo de un cohete modelo experimental para su análisis posterior a la misión.",
            "📌 Objetivos Específicos:",
            "• Integrar sensores de altitud, aceleración y orientación en una placa de vuelo compacta y resistente a vibración.",
            "• Implementar almacenamiento local redundante junto con transmisión en tiempo real durante las fases de vuelo con cobertura.",
            "• Desarrollar un software de análisis post-vuelo que reconstruya la trayectoria y las fases del vuelo a partir de los datos registrados."
        ],
        "pasos": [
            "Análisis de requisitos",
            "Diseño de la solución",
            "Implementación y pruebas",
            "Validación y sustentación"
        ],
        "aplicaciones": [
            "Aeroespacial - Cohetería experimental universitaria"
        ],
        "referencias": [],
        "hardware_tabla": [
            {
                "componente": "ESP32",
                "categoria": "Microcontrolador",
                "funcion": "Versión de bajo peso"
            },
            {
                "componente": "Sensor barométrico BMP390",
                "categoria": "Otro Componente de Hardware",
                "funcion": "Alta precisión de altitud"
            },
            {
                "componente": "IMU de alto rango MPU9250",
                "categoria": "Sensor de Movimiento / Posición",
                "funcion": "Detecta movimiento, orientación o posición dentro del sistema."
            },
            {
                "componente": "Módulo de radiofrecuencia LoRa de largo alcance",
                "categoria": "Módulo de Comunicación / Conectividad",
                "funcion": "Permite la transmisión inalámbrica de datos entre dispositivos."
            },
            {
                "componente": "Tarjeta microSD",
                "categoria": "Almacenamiento",
                "funcion": "Para respaldo local"
            },
            {
                "componente": "Batería LiPo de alta densidad y bajo peso",
                "categoria": "Fuente de Alimentación / Energía",
                "funcion": "Suministra energía eléctrica a los componentes del sistema."
            },
            {
                "componente": "Estructura impresa en 3D resistente a vibración",
                "categoria": "Estructura / Componente Mecánico",
                "funcion": "Brinda soporte físico o estructural al prototipo."
            }
        ],
        "software_tabla": [
            {
                "herramienta": "Python",
                "tipo": "Lenguaje de Programación",
                "descripcion": "Para el software de análisis post-vuelo"
            },
            {
                "herramienta": "Matplotlib/Plotly",
                "tipo": "Librería / Herramienta de Análisis de Datos",
                "descripcion": "Para reconstrucción de trayectoria"
            },
            {
                "herramienta": "PlatformIO",
                "tipo": "IDE / Entorno de Desarrollo",
                "descripcion": "Para el firmware embebido"
            },
            {
                "herramienta": "Protocolo LoRa punto a punto",
                "tipo": "Protocolo de Comunicación IoT",
                "descripcion": "Para telemetría en vivo"
            }
        ]
    },
    {
        "id": "proj_082",
        "titulo": "✈️ Proyecto 82: Sistema de Monitoreo Estructural IoT para Drones de Ala Fija de Largo Alcance",
        "descripcion": "Problema: Los drones de ala fija utilizados en misiones de largo alcance están sujetos a fatiga estructural que puede pasar desapercibida hasta provocar fallas catastróficas en vuelo.\n\nDescripción: Sistema embebido en las alas de un drone de ala fija que combina acelerómetros y galgas extensométricas para detectar vibraciones anómalas y esfuerzos estructurales durante el vuelo, generando un historial de fatiga acumulada por unidad para mantenimiento preventivo.",
        "area": "IoT Aeroespacial y Aeronáutico",
        "sector": "Aeroespacial - Vehículos aéreos no tripulados (UAV)",
        "nivel": "Avanzado",
        "duracion": "Un semestre",
        "presupuesto": "Bajo costo",
        "hardware": [
            "ESP32 de bajo peso (Microcontrolador | Controla y coordina los sensores/actuadores conectados a él.)",
            "Galgas extensométricas con amplificador HX711 (Sensor de Movimiento / Posición | 2-4 unidades)",
            "Acelerómetro/IMU MPU6050 (Sensor de Movimiento / Posición | Detecta movimiento, orientación o posición dentro del sistema.)",
            "Módulo de almacenamiento microSD (Almacenamiento | Almacena datos o el sistema operativo de forma local.)",
            "Batería LiPo compacta (Fuente de Alimentación / Energía | Suministra energía eléctrica a los componentes del sistema.)",
            "Recubrimiento resistente a vibración e intemperie (Otro Componente de Hardware | Forma parte del hardware de soporte del proyecto.)"
        ],
        "software": [
            "Python con SciPy para análisis espectral: Lenguaje de Programación - FFT",
            "Modelos de fatiga acumulada: Herramienta / Tecnología de Software - Miner's rule simplificada",
            "InfluxDB: Base de Datos - Para históricos por unidad de flota",
            "Grafana: Visualización / Dashboard - Para dashboards de mantenimiento"
        ],
        "habilidades": [
            "Análisis de fatiga estructural en vuelo",
            "Instrumentación con galgas extensométricas",
            "Procesamiento de señales vibracionales",
            "Mantenimiento predictivo de flotas aéreas no tripuladas",
            "Diseño embebido para entornos aeronáuticos"
        ],
        "objetivos": [
            "🎯 Objetivo General: Implementar un sistema de monitoreo estructural embebido que detecte vibraciones y esfuerzos anómalos en las alas de un drone de ala fija durante el vuelo.",
            "📌 Objetivos Específicos:",
            "• Instrumentar puntos críticos del ala con sensores de vibración y galgas extensométricas.",
            "• Procesar las señales en vuelo mediante análisis espectral para identificar patrones asociados a fatiga estructural.",
            "• Registrar un historial de esfuerzos por vuelo que apoye decisiones de mantenimiento preventivo de la flota."
        ],
        "pasos": [
            "Análisis de requisitos",
            "Diseño de la solución",
            "Implementación y pruebas",
            "Validación y sustentación"
        ],
        "aplicaciones": [
            "Aeroespacial - Vehículos aéreos no tripulados (UAV)"
        ],
        "referencias": [],
        "hardware_tabla": [
            {
                "componente": "ESP32 de bajo peso",
                "categoria": "Microcontrolador",
                "funcion": "Controla y coordina los sensores/actuadores conectados a él."
            },
            {
                "componente": "Galgas extensométricas con amplificador HX711",
                "categoria": "Sensor de Movimiento / Posición",
                "funcion": "2-4 unidades"
            },
            {
                "componente": "Acelerómetro/IMU MPU6050",
                "categoria": "Sensor de Movimiento / Posición",
                "funcion": "Detecta movimiento, orientación o posición dentro del sistema."
            },
            {
                "componente": "Módulo de almacenamiento microSD",
                "categoria": "Almacenamiento",
                "funcion": "Almacena datos o el sistema operativo de forma local."
            },
            {
                "componente": "Batería LiPo compacta",
                "categoria": "Fuente de Alimentación / Energía",
                "funcion": "Suministra energía eléctrica a los componentes del sistema."
            },
            {
                "componente": "Recubrimiento resistente a vibración e intemperie",
                "categoria": "Otro Componente de Hardware",
                "funcion": "Forma parte del hardware de soporte del proyecto."
            }
        ],
        "software_tabla": [
            {
                "herramienta": "Python con SciPy para análisis espectral",
                "tipo": "Lenguaje de Programación",
                "descripcion": "FFT"
            },
            {
                "herramienta": "Modelos de fatiga acumulada",
                "tipo": "Herramienta / Tecnología de Software",
                "descripcion": "Miner's rule simplificada"
            },
            {
                "herramienta": "InfluxDB",
                "tipo": "Base de Datos",
                "descripcion": "Para históricos por unidad de flota"
            },
            {
                "herramienta": "Grafana",
                "tipo": "Visualización / Dashboard",
                "descripcion": "Para dashboards de mantenimiento"
            }
        ]
    },
    {
        "id": "proj_083",
        "titulo": "🎈 Proyecto 83: Estación Terrena IoT de Seguimiento y Control de Globos Meteorológicos de Alta Altitud",
        "descripcion": "Problema: Los lanzamientos educativos de globos meteorológicos de alta altitud suelen perder la carga útil por falta de sistemas de seguimiento y recuperación confiables durante todo el trayecto de vuelo.\n\nDescripción: Cápsula de vuelo con sensores de presión, temperatura y GPS que transmite periódicamente su posición mediante un módulo de largo alcance durante todo el vuelo del globo meteorológico, permitiendo a una estación terrena visualizar la trayectoria y coordinar la recuperación.",
        "area": "IoT Aeroespacial y Aeronáutico",
        "sector": "Aeroespacial - Exploración de alta atmósfera",
        "nivel": "Avanzado",
        "duracion": "Un semestre",
        "presupuesto": "Bajo costo",
        "hardware": [
            "ESP32 de bajo consumo (Microcontrolador | Controla y coordina los sensores/actuadores conectados a él.)",
            "Módulo GPS de alta sensibilidad (Módulo de Comunicación / Conectividad | U-blox NEO-M8N)",
            "Sensor de presión/temperatura BMP390 (Sensor Ambiental | Mide variables ambientales relevantes para el sistema.)",
            "Módulo LoRa de largo alcance o APRS (Módulo de Comunicación / Conectividad | Permite la transmisión inalámbrica de datos entre dispositivos.)",
            "Batería LiPo con gestión térmica (Sensor Ambiental | Para bajas temperaturas)",
            "Cápsula aislada térmicamente (Otro Componente de Hardware | Foam/EPS)"
        ],
        "software": [
            "Python: Lenguaje de Programación - Para la estación terrena de seguimiento",
            "Mapas interactivos: Herramienta / Tecnología de Software - Leaflet/Google Maps API; para trayectoria",
            "Protocolo APRS o LoRa: Protocolo de Comunicación IoT - Para transmisión de posición",
            "Modelos de predicción de trayectoria de globos: Herramienta / Tecnología de Software - CUSF Predictor"
        ],
        "habilidades": [
            "Diseño de sistemas para condiciones extremas de alta atmósfera",
            "Seguimiento GPS de largo alcance",
            "Gestión térmica de electrónica embebida",
            "Predicción de trayectorias atmosféricas",
            "Coordinación de operaciones de recuperación de carga útil"
        ],
        "objetivos": [
            "🎯 Objetivo General: Desarrollar una estación terrena y una cápsula de vuelo IoT que permitan seguir en tiempo real y recuperar exitosamente un globo meteorológico de alta altitud.",
            "📌 Objetivos Específicos:",
            "• Diseñar una cápsula de vuelo con sensores ambientales y de posición capaz de operar en condiciones de baja temperatura y presión.",
            "• Implementar transmisión de posición GPS periódica a través de una red de largo alcance durante todo el ascenso y descenso.",
            "• Desarrollar una estación terrena que reciba y visualice la trayectoria en tiempo real para facilitar la recuperación de la cápsula."
        ],
        "pasos": [
            "Análisis de requisitos",
            "Diseño de la solución",
            "Implementación y pruebas",
            "Validación y sustentación"
        ],
        "aplicaciones": [
            "Aeroespacial - Exploración de alta atmósfera"
        ],
        "referencias": [],
        "hardware_tabla": [
            {
                "componente": "ESP32 de bajo consumo",
                "categoria": "Microcontrolador",
                "funcion": "Controla y coordina los sensores/actuadores conectados a él."
            },
            {
                "componente": "Módulo GPS de alta sensibilidad",
                "categoria": "Módulo de Comunicación / Conectividad",
                "funcion": "U-blox NEO-M8N"
            },
            {
                "componente": "Sensor de presión/temperatura BMP390",
                "categoria": "Sensor Ambiental",
                "funcion": "Mide variables ambientales relevantes para el sistema."
            },
            {
                "componente": "Módulo LoRa de largo alcance o APRS",
                "categoria": "Módulo de Comunicación / Conectividad",
                "funcion": "Permite la transmisión inalámbrica de datos entre dispositivos."
            },
            {
                "componente": "Batería LiPo con gestión térmica",
                "categoria": "Sensor Ambiental",
                "funcion": "Para bajas temperaturas"
            },
            {
                "componente": "Cápsula aislada térmicamente",
                "categoria": "Otro Componente de Hardware",
                "funcion": "Foam/EPS"
            }
        ],
        "software_tabla": [
            {
                "herramienta": "Python",
                "tipo": "Lenguaje de Programación",
                "descripcion": "Para la estación terrena de seguimiento"
            },
            {
                "herramienta": "Mapas interactivos",
                "tipo": "Herramienta / Tecnología de Software",
                "descripcion": "Leaflet/Google Maps API; para trayectoria"
            },
            {
                "herramienta": "Protocolo APRS o LoRa",
                "tipo": "Protocolo de Comunicación IoT",
                "descripcion": "Para transmisión de posición"
            },
            {
                "herramienta": "Modelos de predicción de trayectoria de globos",
                "tipo": "Herramienta / Tecnología de Software",
                "descripcion": "CUSF Predictor"
            }
        ]
    },
    {
        "id": "proj_084",
        "titulo": "⚙️ Proyecto 84: Sistema IoT de Monitoreo de Condición de Motores de Aeronaves Ligeras",
        "descripcion": "Problema: Los operadores de aeronaves ligeras dependen de inspecciones periódicas programadas que no siempre detectan a tiempo el deterioro gradual de componentes del motor entre mantenimientos.\n\nDescripción: Sistema de sensores instalados en el compartimento del motor de una aeronave ligera (en banco de pruebas o simulador) que registran temperatura, vibración y presión de aceite durante la operación, permitiendo analizar tendencias de desgaste a lo largo del tiempo para apoyar el mantenimiento basado en condición.",
        "area": "IoT Aeroespacial y Aeronáutico",
        "sector": "Aeroespacial - Mantenimiento de aviación general",
        "nivel": "Avanzado",
        "duracion": "Un semestre",
        "presupuesto": "Bajo costo",
        "hardware": [
            "ESP32 con protección (Microcontrolador | Para entorno de alta temperatura)",
            "Sensor de temperatura tipo termopar con amplificador MAX6675 (Sensor Ambiental | Mide variables ambientales relevantes para el sistema.)",
            "Acelerómetro industrial (Sensor de Movimiento / Posición | Para vibración)",
            "Sensor de presión de aceite (Otro Componente de Hardware | Forma parte del hardware de soporte del proyecto.)",
            "Registrador de datos local (Almacenamiento | MicroSD; redundante)"
        ],
        "software": [
            "Python con Pandas: Lenguaje de Programación - Para análisis de tendencias",
            "InfluxDB: Base de Datos - Para históricos por número de serie de motor",
            "Grafana: Visualización / Dashboard - Para dashboards de condición",
            "Modelos estadísticos de detección de desviación de tendencia: Herramienta / Tecnología de Software - Tecnología de software empleada en el desarrollo del proyecto."
        ],
        "habilidades": [
            "Mantenimiento basado en condición (CBM) en aviación",
            "Instrumentación en entornos de alta temperatura",
            "Análisis de tendencias de desgaste de motores",
            "Cumplimiento de prácticas de seguridad aeronáutica",
            "Gestión de historiales técnicos por componente"
        ],
        "objetivos": [
            "🎯 Objetivo General: Desarrollar un sistema de monitoreo de condición que registre parámetros clave del motor de una aeronave ligera para apoyar decisiones de mantenimiento basado en condición.",
            "📌 Objetivos Específicos:",
            "• Instrumentar el motor con sensores de temperatura, vibración y presión de aceite compatibles con el entorno aeronáutico.",
            "• Registrar y analizar tendencias de estos parámetros a lo largo de múltiples vuelos para identificar desviaciones graduales.",
            "• Generar reportes de condición que complementen el programa de mantenimiento tradicional basado en horas de vuelo."
        ],
        "pasos": [
            "Análisis de requisitos",
            "Diseño de la solución",
            "Implementación y pruebas",
            "Validación y sustentación"
        ],
        "aplicaciones": [
            "Aeroespacial - Mantenimiento de aviación general"
        ],
        "referencias": [],
        "hardware_tabla": [
            {
                "componente": "ESP32 con protección",
                "categoria": "Microcontrolador",
                "funcion": "Para entorno de alta temperatura"
            },
            {
                "componente": "Sensor de temperatura tipo termopar con amplificador MAX6675",
                "categoria": "Sensor Ambiental",
                "funcion": "Mide variables ambientales relevantes para el sistema."
            },
            {
                "componente": "Acelerómetro industrial",
                "categoria": "Sensor de Movimiento / Posición",
                "funcion": "Para vibración"
            },
            {
                "componente": "Sensor de presión de aceite",
                "categoria": "Otro Componente de Hardware",
                "funcion": "Forma parte del hardware de soporte del proyecto."
            },
            {
                "componente": "Registrador de datos local",
                "categoria": "Almacenamiento",
                "funcion": "MicroSD; redundante"
            }
        ],
        "software_tabla": [
            {
                "herramienta": "Python con Pandas",
                "tipo": "Lenguaje de Programación",
                "descripcion": "Para análisis de tendencias"
            },
            {
                "herramienta": "InfluxDB",
                "tipo": "Base de Datos",
                "descripcion": "Para históricos por número de serie de motor"
            },
            {
                "herramienta": "Grafana",
                "tipo": "Visualización / Dashboard",
                "descripcion": "Para dashboards de condición"
            },
            {
                "herramienta": "Modelos estadísticos de detección de desviación de tendencia",
                "tipo": "Herramienta / Tecnología de Software",
                "descripcion": "Tecnología de software empleada en el desarrollo del proyecto."
            }
        ]
    },
    {
        "id": "proj_085",
        "titulo": "🛸 Proyecto 85: Plataforma IoT de Gestión de Tráfico de Drones (UTM) para Espacios Aéreos de Baja Altitud",
        "descripcion": "Problema: El uso creciente de drones comerciales en espacios urbanos de baja altitud carece de sistemas accesibles de gestión de tráfico que prevengan colisiones y conflictos de espacio aéreo.\n\nDescripción: Plataforma central que recibe la posición GPS en tiempo real de múltiples drones equipados con un módulo de transmisión, calcula posibles conflictos de trayectoria entre ellos y gestiona la reserva de corredores de vuelo dentro de una zona de operación definida.",
        "area": "IoT Aeroespacial y Aeronáutico",
        "sector": "Aeroespacial - Gestión de tráfico aéreo no tripulado",
        "nivel": "Avanzado",
        "duracion": "Un semestre",
        "presupuesto": "Bajo costo",
        "hardware": [
            "ESP32 con módulo GPS (Microcontrolador | Transpondedor por drone, 3-5 unidades)",
            "Módulo de telemetría (Módulo de Comunicación / Conectividad | LoRa/Wi-Fi según alcance)",
            "Mini-drones de prueba (Estructura / Componente Mecánico | Marco + controlador de vuelo básico)",
            "Servidor/mini-PC (Otro Componente de Hardware | Para el centro de gestión UTM)"
        ],
        "software": [
            "Python: Lenguaje de Programación - Para el motor de detección de conflictos",
            "PostGIS: Herramienta / Tecnología de Software - Para gestión geoespacial de corredores aéreos",
            "WebSockets: Protocolo de Comunicación IoT - Para actualización en tiempo real del mapa de tráfico",
            "React.js con mapas interactivos: Framework Web / Aplicación - Para el centro de control"
        ],
        "habilidades": [
            "Gestión de tráfico aéreo no tripulado (UTM)",
            "Detección de conflictos geoespaciales en tiempo real",
            "Diseño de sistemas de seguridad aeroespacial",
            "Comunicación de telemetría multi-vehículo",
            "Regulación y normativa de espacio aéreo de baja altitud"
        ],
        "objetivos": [
            "🎯 Objetivo General: Desarrollar una plataforma de gestión de tráfico de drones (UTM) que rastree múltiples drones en tiempo real y prevenga conflictos de espacio aéreo en una zona de operación definida.",
            "📌 Objetivos Específicos:",
            "• Implementar transmisión de posición GPS en tiempo real desde múltiples drones hacia una plataforma central de rastreo.",
            "• Desarrollar algoritmos de detección de conflictos que identifiquen posibles colisiones entre trayectorias de drones registrados.",
            "• Diseñar un sistema de reserva de espacio aéreo que permita planificar misiones sin solaparse con otras ya autorizadas."
        ],
        "pasos": [
            "Análisis de requisitos",
            "Diseño de la solución",
            "Implementación y pruebas",
            "Validación y sustentación"
        ],
        "aplicaciones": [
            "Aeroespacial - Gestión de tráfico aéreo no tripulado"
        ],
        "referencias": [],
        "hardware_tabla": [
            {
                "componente": "ESP32 con módulo GPS",
                "categoria": "Microcontrolador",
                "funcion": "Transpondedor por drone, 3-5 unidades"
            },
            {
                "componente": "Módulo de telemetría",
                "categoria": "Módulo de Comunicación / Conectividad",
                "funcion": "LoRa/Wi-Fi según alcance"
            },
            {
                "componente": "Mini-drones de prueba",
                "categoria": "Estructura / Componente Mecánico",
                "funcion": "Marco + controlador de vuelo básico"
            },
            {
                "componente": "Servidor/mini-PC",
                "categoria": "Otro Componente de Hardware",
                "funcion": "Para el centro de gestión UTM"
            }
        ],
        "software_tabla": [
            {
                "herramienta": "Python",
                "tipo": "Lenguaje de Programación",
                "descripcion": "Para el motor de detección de conflictos"
            },
            {
                "herramienta": "PostGIS",
                "tipo": "Herramienta / Tecnología de Software",
                "descripcion": "Para gestión geoespacial de corredores aéreos"
            },
            {
                "herramienta": "WebSockets",
                "tipo": "Protocolo de Comunicación IoT",
                "descripcion": "Para actualización en tiempo real del mapa de tráfico"
            },
            {
                "herramienta": "React.js con mapas interactivos",
                "tipo": "Framework Web / Aplicación",
                "descripcion": "Para el centro de control"
            }
        ]
    },
    {
        "id": "proj_086",
        "titulo": "💨 Proyecto 86: Sistema IoT de Monitoreo de Calidad del Aire en Cabina para Aviación General",
        "descripcion": "Problema: La calidad del aire dentro de cabinas de aeronaves pequeñas rara vez se monitorea de forma continua, pese a su impacto directo en la salud y el desempeño cognitivo de la tripulación en vuelos largos.\n\nDescripción: Dispositivo compacto instalado en la cabina que mide continuamente CO2, partículas finas y compuestos orgánicos volátiles, alertando a la tripulación mediante indicadores visuales cuando los niveles superan los umbrales recomendados y registrando un historial por vuelo.",
        "area": "IoT Aeroespacial y Aeronáutico",
        "sector": "Aeroespacial - Confort y seguridad de cabina",
        "nivel": "Intermedio",
        "duracion": "Un semestre",
        "presupuesto": "Bajo costo",
        "hardware": [
            "ESP32 (Microcontrolador | Controla y coordina los sensores/actuadores conectados a él.)",
            "Sensor de CO2 SCD30 (Sensor Ambiental | NDIR de alta precisión)",
            "Sensor de partículas PMS5003 (Sensor Ambiental | Mide variables ambientales relevantes para el sistema.)",
            "Sensor de compuestos orgánicos volátiles (Otro Componente de Hardware | BME680)",
            "Pantalla OLED (Interfaz de Usuario / Iluminación | Para indicadores en cabina)",
            "Batería de respaldo (Fuente de Alimentación / Energía | Suministra energía eléctrica a los componentes del sistema.)"
        ],
        "software": [
            "Firmware en C++/Arduino: Herramienta / Tecnología de Software - Para lectura de sensores",
            "InfluxDB: Base de Datos - Para históricos por vuelo",
            "Grafana: Visualización / Dashboard - Para análisis de patrones de exposición",
            "Alertas visuales mediante LED de estado: Herramienta / Tecnología de Software - Verde/amarillo/rojo"
        ],
        "habilidades": [
            "Monitoreo de calidad de aire en espacios confinados",
            "Diseño de dispositivos para entornos de cabina",
            "Estándares de seguridad en aviación general",
            "Análisis de exposición a contaminantes",
            "Sistemas de alerta visual para tripulación"
        ],
        "objetivos": [
            "🎯 Objetivo General: Desarrollar un sistema embebido que monitoree continuamente la calidad del aire en la cabina de una aeronave ligera y alerte ante niveles inadecuados de CO2 o contaminantes.",
            "📌 Objetivos Específicos:",
            "• Integrar sensores de CO2, partículas y compuestos orgánicos volátiles en un dispositivo compacto para cabina.",
            "• Establecer umbrales de alerta basados en estándares de calidad de aire en aviación para notificar a la tripulación.",
            "• Registrar un historial de calidad de aire por vuelo para análisis posterior de patrones de exposición."
        ],
        "pasos": [
            "Análisis de requisitos",
            "Diseño de la solución",
            "Implementación y pruebas",
            "Validación y sustentación"
        ],
        "aplicaciones": [
            "Aeroespacial - Confort y seguridad de cabina"
        ],
        "referencias": [],
        "hardware_tabla": [
            {
                "componente": "ESP32",
                "categoria": "Microcontrolador",
                "funcion": "Controla y coordina los sensores/actuadores conectados a él."
            },
            {
                "componente": "Sensor de CO2 SCD30",
                "categoria": "Sensor Ambiental",
                "funcion": "NDIR de alta precisión"
            },
            {
                "componente": "Sensor de partículas PMS5003",
                "categoria": "Sensor Ambiental",
                "funcion": "Mide variables ambientales relevantes para el sistema."
            },
            {
                "componente": "Sensor de compuestos orgánicos volátiles",
                "categoria": "Otro Componente de Hardware",
                "funcion": "BME680"
            },
            {
                "componente": "Pantalla OLED",
                "categoria": "Interfaz de Usuario / Iluminación",
                "funcion": "Para indicadores en cabina"
            },
            {
                "componente": "Batería de respaldo",
                "categoria": "Fuente de Alimentación / Energía",
                "funcion": "Suministra energía eléctrica a los componentes del sistema."
            }
        ],
        "software_tabla": [
            {
                "herramienta": "Firmware en C++/Arduino",
                "tipo": "Herramienta / Tecnología de Software",
                "descripcion": "Para lectura de sensores"
            },
            {
                "herramienta": "InfluxDB",
                "tipo": "Base de Datos",
                "descripcion": "Para históricos por vuelo"
            },
            {
                "herramienta": "Grafana",
                "tipo": "Visualización / Dashboard",
                "descripcion": "Para análisis de patrones de exposición"
            },
            {
                "herramienta": "Alertas visuales mediante LED de estado",
                "tipo": "Herramienta / Tecnología de Software",
                "descripcion": "Verde/amarillo/rojo"
            }
        ]
    },
    {
        "id": "proj_087",
        "titulo": "🛰️ Proyecto 87: Simulador de Constelación de Nanosatélites (CubeSat) con Comunicación IoT Terrestre",
        "descripcion": "Problema: El acceso práctico a tecnología satelital real es limitado para estudiantes, dificultando la comprensión de los principios de comunicación y telemetría que rigen las misiones CubeSat.\n\nDescripción: Conjunto de nodos ESP32 distribuidos que simulan nanosatélites con ventanas de comunicación limitadas y trayectorias orbitales simplificadas, comunicándose con una estación terrena mediante un protocolo de almacenamiento y reenvío que replica los desafíos reales de las misiones CubeSat.",
        "area": "IoT Aeroespacial y Aeronáutico",
        "sector": "Aeroespacial - Tecnología satelital educativa",
        "nivel": "Avanzado",
        "duracion": "Un semestre",
        "presupuesto": "Bajo costo",
        "hardware": [
            "ESP32 (Microcontrolador | 4-6 unidades; nodos satelitales simulados)",
            "Módulo LoRa (Módulo de Comunicación / Conectividad | Para comunicación de largo alcance)",
            "Raspberry Pi 4 (Computadora de Placa Reducida (SBC) | Estación terrena)",
            "Antena direccional simple (Módulo de Comunicación / Conectividad | Para la estación terrena)"
        ],
        "software": [
            "Python: Lenguaje de Programación - Para el software de estación terrena",
            "Protocolo store-and-forward personalizado sobre LoRa: Protocolo de Comunicación IoT - Define el estándar de comunicación de datos entre dispositivos.",
            "Simulación orbital simplificada: Herramienta / Tecnología de Software - Modelo de paso por ventanas de tiempo",
            "Matplotlib: Librería / Herramienta de Análisis de Datos - Para visualización de pases orbitales simulados"
        ],
        "habilidades": [
            "Principios de comunicación satelital",
            "Protocolos store-and-forward",
            "Simulación de mecánica orbital básica",
            "Diseño de sistemas con conectividad intermitente",
            "Fundamentos de misiones CubeSat"
        ],
        "objetivos": [
            "🎯 Objetivo General: Desarrollar un simulador terrestre de una constelación de nanosatélites tipo CubeSat que replique los principios de comunicación, telemetría y paso orbital mediante nodos IoT distribuidos.",
            "📌 Objetivos Específicos:",
            "• Implementar nodos terrestres que simulen el comportamiento de nanosatélites, incluyendo ventanas de comunicación limitadas.",
            "• Desarrollar una estación terrena que reciba telemetría solo durante las ventanas simuladas de paso orbital.",
            "• Diseñar un protocolo de comunicación con almacenamiento y reenvío (store-and-forward) similar al usado en misiones CubeSat reales."
        ],
        "pasos": [
            "Análisis de requisitos",
            "Diseño de la solución",
            "Implementación y pruebas",
            "Validación y sustentación"
        ],
        "aplicaciones": [
            "Aeroespacial - Tecnología satelital educativa"
        ],
        "referencias": [],
        "hardware_tabla": [
            {
                "componente": "ESP32",
                "categoria": "Microcontrolador",
                "funcion": "4-6 unidades; nodos satelitales simulados"
            },
            {
                "componente": "Módulo LoRa",
                "categoria": "Módulo de Comunicación / Conectividad",
                "funcion": "Para comunicación de largo alcance"
            },
            {
                "componente": "Raspberry Pi 4",
                "categoria": "Computadora de Placa Reducida (SBC)",
                "funcion": "Estación terrena"
            },
            {
                "componente": "Antena direccional simple",
                "categoria": "Módulo de Comunicación / Conectividad",
                "funcion": "Para la estación terrena"
            }
        ],
        "software_tabla": [
            {
                "herramienta": "Python",
                "tipo": "Lenguaje de Programación",
                "descripcion": "Para el software de estación terrena"
            },
            {
                "herramienta": "Protocolo store-and-forward personalizado sobre LoRa",
                "tipo": "Protocolo de Comunicación IoT",
                "descripcion": "Define el estándar de comunicación de datos entre dispositivos."
            },
            {
                "herramienta": "Simulación orbital simplificada",
                "tipo": "Herramienta / Tecnología de Software",
                "descripcion": "Modelo de paso por ventanas de tiempo"
            },
            {
                "herramienta": "Matplotlib",
                "tipo": "Librería / Herramienta de Análisis de Datos",
                "descripcion": "Para visualización de pases orbitales simulados"
            }
        ]
    },
    {
        "id": "proj_088",
        "titulo": "❄️ Proyecto 88: Sistema IoT de Detección de Hielo y Deshielo para Superficies Alares en Tierra",
        "descripcion": "Problema: La formación de hielo en las alas de aeronaves estacionadas representa un riesgo de seguridad crítico antes del despegue, y su detección visual manual puede ser inconsistente en condiciones de baja visibilidad.\n\nDescripción: Sistema de sensores de detección de hielo instalados en puntos representativos de una superficie alar (banco de pruebas), que correlaciona sus lecturas con temperatura y humedad ambiental para confirmar la formación de hielo y notificar de inmediato al personal de tierra.",
        "area": "IoT Aeroespacial y Aeronáutico",
        "sector": "Aeroespacial - Seguridad operacional en tierra",
        "nivel": "Intermedio",
        "duracion": "Un semestre",
        "presupuesto": "Bajo costo",
        "hardware": [
            "ESP32 (Microcontrolador | Controla y coordina los sensores/actuadores conectados a él.)",
            "Sensor de detección de hielo capacitivo (Otro Componente de Hardware | Forma parte del hardware de soporte del proyecto.)",
            "Sensor de temperatura/humedad SHT31 (Sensor Ambiental | Mide variables ambientales relevantes para el sistema.)",
            "Baliza LED de alta visibilidad (Interfaz de Usuario / Iluminación | Para alerta en pista)",
            "Carcasa resistente a intemperie (Estructura / Componente Mecánico | Brinda soporte físico o estructural al prototipo.)"
        ],
        "software": [
            "Firmware en C++/Arduino: Herramienta / Tecnología de Software - Tecnología de software empleada en el desarrollo del proyecto.",
            "Node-RED: Automatización / Orquestación - Para lógica de correlación ambiental",
            "MQTT: Protocolo de Comunicación IoT - Para notificación en tiempo real",
            "App móvil simple: Framework Web / Aplicación - Para personal de tierra"
        ],
        "habilidades": [
            "Detección de condiciones ambientales críticas",
            "Seguridad operacional en tierra (ground safety)",
            "Diseño de sensores resistentes a intemperie",
            "Sistemas de alerta para personal operativo",
            "Correlación de variables ambientales para reducción de falsos positivos"
        ],
        "objetivos": [
            "🎯 Objetivo General: Desarrollar un sistema de sensores que detecte automáticamente la formación de hielo en superficies alares y notifique al personal de tierra la necesidad de deshielo.",
            "📌 Objetivos Específicos:",
            "• Integrar sensores de detección de hielo basados en capacitancia o cambio de impedancia en puntos representativos del ala.",
            "• Correlacionar las lecturas con condiciones ambientales (temperatura y humedad) para reducir falsos positivos.",
            "• Implementar un sistema de notificación inmediata al personal de tierra ante la detección de formación de hielo."
        ],
        "pasos": [
            "Análisis de requisitos",
            "Diseño de la solución",
            "Implementación y pruebas",
            "Validación y sustentación"
        ],
        "aplicaciones": [
            "Aeroespacial - Seguridad operacional en tierra"
        ],
        "referencias": [],
        "hardware_tabla": [
            {
                "componente": "ESP32",
                "categoria": "Microcontrolador",
                "funcion": "Controla y coordina los sensores/actuadores conectados a él."
            },
            {
                "componente": "Sensor de detección de hielo capacitivo",
                "categoria": "Otro Componente de Hardware",
                "funcion": "Forma parte del hardware de soporte del proyecto."
            },
            {
                "componente": "Sensor de temperatura/humedad SHT31",
                "categoria": "Sensor Ambiental",
                "funcion": "Mide variables ambientales relevantes para el sistema."
            },
            {
                "componente": "Baliza LED de alta visibilidad",
                "categoria": "Interfaz de Usuario / Iluminación",
                "funcion": "Para alerta en pista"
            },
            {
                "componente": "Carcasa resistente a intemperie",
                "categoria": "Estructura / Componente Mecánico",
                "funcion": "Brinda soporte físico o estructural al prototipo."
            }
        ],
        "software_tabla": [
            {
                "herramienta": "Firmware en C++/Arduino",
                "tipo": "Herramienta / Tecnología de Software",
                "descripcion": "Tecnología de software empleada en el desarrollo del proyecto."
            },
            {
                "herramienta": "Node-RED",
                "tipo": "Automatización / Orquestación",
                "descripcion": "Para lógica de correlación ambiental"
            },
            {
                "herramienta": "MQTT",
                "tipo": "Protocolo de Comunicación IoT",
                "descripcion": "Para notificación en tiempo real"
            },
            {
                "herramienta": "App móvil simple",
                "tipo": "Framework Web / Aplicación",
                "descripcion": "Para personal de tierra"
            }
        ]
    },
    {
        "id": "proj_089",
        "titulo": "🔄 Proyecto 89: Sistema IoT de Monitoreo de Vibración y Balanceo para Hélices y Rotores",
        "descripcion": "Problema: El desbalanceo progresivo de hélices y rotores puede pasar desapercibido en inspecciones visuales, generando vibración excesiva que acelera el desgaste de componentes críticos del sistema propulsivo.\n\nDescripción: Sistema de acelerómetros de alta frecuencia instalados en el punto de montaje de una hélice o rotor (banco de pruebas), que analiza el espectro de vibración en relación con la velocidad de rotación para detectar desbalanceo progresivo y alertar antes de una falla del sistema propulsivo.",
        "area": "IoT Aeroespacial y Aeronáutico",
        "sector": "Aeroespacial - Mantenimiento de sistemas propulsivos",
        "nivel": "Avanzado",
        "duracion": "Un semestre",
        "presupuesto": "Bajo costo",
        "hardware": [
            "ESP32 (Microcontrolador | Controla y coordina los sensores/actuadores conectados a él.)",
            "Acelerómetro de alta frecuencia de muestreo (Sensor de Movimiento / Posición | ADXL345/MPU6050)",
            "Sensor óptico/tacómetro (Otro Componente de Hardware | Para RPM)",
            "Raspberry Pi 4 (Computadora de Placa Reducida (SBC) | Procesamiento de análisis espectral)",
            "Fijación mecánica rígida (Otro Componente de Hardware | Para minimizar ruido de medición)"
        ],
        "software": [
            "Python con SciPy/NumPy: Lenguaje de Programación - Para FFT y análisis espectral",
            "InfluxDB: Base de Datos - Para históricos de vibración",
            "Grafana con umbrales dinámicos según RPM: Visualización / Dashboard - Presenta los datos del sistema en paneles visuales.",
            "Modelos de detección de desbalanceo: Herramienta / Tecnología de Software - Relación 1x RPM"
        ],
        "habilidades": [
            "Análisis de vibración en sistemas rotativos",
            "Diagnóstico de desbalanceo mecánico",
            "Instrumentación de alta frecuencia de muestreo",
            "Mantenimiento predictivo de sistemas propulsivos",
            "Correlación de vibración con velocidad de rotación"
        ],
        "objetivos": [
            "🎯 Objetivo General: Desarrollar un sistema de monitoreo de vibración que detecte desbalanceo progresivo en hélices o rotores y alerte antes de que se comprometa la integridad del sistema propulsivo.",
            "📌 Objetivos Específicos:",
            "• Instrumentar el sistema propulsivo con acelerómetros de alta frecuencia de muestreo en puntos críticos de montaje.",
            "• Aplicar análisis espectral para identificar frecuencias características de desbalanceo respecto a la velocidad de rotación.",
            "• Establecer umbrales de alerta progresivos que permitan programar el balanceo antes de una falla mayor."
        ],
        "pasos": [
            "Análisis de requisitos",
            "Diseño de la solución",
            "Implementación y pruebas",
            "Validación y sustentación"
        ],
        "aplicaciones": [
            "Aeroespacial - Mantenimiento de sistemas propulsivos"
        ],
        "referencias": [],
        "hardware_tabla": [
            {
                "componente": "ESP32",
                "categoria": "Microcontrolador",
                "funcion": "Controla y coordina los sensores/actuadores conectados a él."
            },
            {
                "componente": "Acelerómetro de alta frecuencia de muestreo",
                "categoria": "Sensor de Movimiento / Posición",
                "funcion": "ADXL345/MPU6050"
            },
            {
                "componente": "Sensor óptico/tacómetro",
                "categoria": "Otro Componente de Hardware",
                "funcion": "Para RPM"
            },
            {
                "componente": "Raspberry Pi 4",
                "categoria": "Computadora de Placa Reducida (SBC)",
                "funcion": "Procesamiento de análisis espectral"
            },
            {
                "componente": "Fijación mecánica rígida",
                "categoria": "Otro Componente de Hardware",
                "funcion": "Para minimizar ruido de medición"
            }
        ],
        "software_tabla": [
            {
                "herramienta": "Python con SciPy/NumPy",
                "tipo": "Lenguaje de Programación",
                "descripcion": "Para FFT y análisis espectral"
            },
            {
                "herramienta": "InfluxDB",
                "tipo": "Base de Datos",
                "descripcion": "Para históricos de vibración"
            },
            {
                "herramienta": "Grafana con umbrales dinámicos según RPM",
                "tipo": "Visualización / Dashboard",
                "descripcion": "Presenta los datos del sistema en paneles visuales."
            },
            {
                "herramienta": "Modelos de detección de desbalanceo",
                "tipo": "Herramienta / Tecnología de Software",
                "descripcion": "Relación 1x RPM"
            }
        ]
    },
    {
        "id": "proj_090",
        "titulo": "🎮 Proyecto 90: Plataforma IoT de Simulación y Registro de Vuelo para Formación de Pilotos (Black Box Educativa)",
        "descripcion": "Problema: Los estudiantes de aviación en simuladores de vuelo básicos carecen de un registro detallado y objetivo de sus sesiones que les permita analizar su desempeño después de cada práctica.\n\nDescripción: Sistema que captura variables de vuelo de un simulador de escritorio o una plataforma de entrenamiento básica mediante sensores IMU, las almacena por sesión y las presenta en un reproductor visual que permite a instructor y estudiante revisar y analizar el desempeño de cada práctica.",
        "area": "IoT Aeroespacial y Aeronáutico",
        "sector": "Aeroespacial - Formación aeronáutica y análisis de vuelo",
        "nivel": "Intermedio",
        "duracion": "Un semestre",
        "presupuesto": "Bajo costo",
        "hardware": [
            "ESP32 (Microcontrolador | Controla y coordina los sensores/actuadores conectados a él.)",
            "IMU MPU9250 (Sensor de Movimiento / Posición | Para plataformas físicas de entrenamiento)",
            "Interfaz de captura desde software de simulación (Otro Componente de Hardware | Opcional)",
            "Raspberry Pi 4 (Computadora de Placa Reducida (SBC) | Servidor de registro y reproducción)",
            "Pantalla o proyector (Interfaz de Usuario / Iluminación | Para revisión de sesiones)"
        ],
        "software": [
            "Python: Lenguaje de Programación - Para el reproductor de sesiones de vuelo",
            "SQLite: Base de Datos - Para almacenamiento de sesiones",
            "Matplotlib/Plotly: Librería / Herramienta de Análisis de Datos - Para visualización de variables de vuelo",
            "Node-RED: Automatización / Orquestación - Para la captura de datos en tiempo real"
        ],
        "habilidades": [
            "Registro y análisis de datos de vuelo",
            "Diseño de herramientas de formación aeronáutica",
            "Visualización de series temporales multivariable",
            "Instrumentación de plataformas de simulación",
            "Análisis de desempeño en entrenamiento PROYECTOS DE IoT INDUSTRIAL 4.0 Y MANUFACTURA INTELIGENTE  (ÁREA NUEVA)"
        ],
        "objetivos": [
            "🎯 Objetivo General: Desarrollar una caja negra educativa que registre variables de vuelo durante sesiones de simulación para su posterior análisis en la formación de pilotos.",
            "📌 Objetivos Específicos:",
            "• Capturar variables clave de vuelo (altitud, velocidad, actitud, rumbo) desde un simulador de vuelo de escritorio o una plataforma física básica.",
            "• Almacenar los datos de cada sesión de forma estructurada para permitir comparaciones entre distintas prácticas.",
            "• Desarrollar un reproductor visual que permita al instructor repasar la sesión de vuelo junto con el estudiante."
        ],
        "pasos": [
            "Análisis de requisitos",
            "Diseño de la solución",
            "Implementación y pruebas",
            "Validación y sustentación"
        ],
        "aplicaciones": [
            "Aeroespacial - Formación aeronáutica y análisis de vuelo"
        ],
        "referencias": [],
        "hardware_tabla": [
            {
                "componente": "ESP32",
                "categoria": "Microcontrolador",
                "funcion": "Controla y coordina los sensores/actuadores conectados a él."
            },
            {
                "componente": "IMU MPU9250",
                "categoria": "Sensor de Movimiento / Posición",
                "funcion": "Para plataformas físicas de entrenamiento"
            },
            {
                "componente": "Interfaz de captura desde software de simulación",
                "categoria": "Otro Componente de Hardware",
                "funcion": "Opcional"
            },
            {
                "componente": "Raspberry Pi 4",
                "categoria": "Computadora de Placa Reducida (SBC)",
                "funcion": "Servidor de registro y reproducción"
            },
            {
                "componente": "Pantalla o proyector",
                "categoria": "Interfaz de Usuario / Iluminación",
                "funcion": "Para revisión de sesiones"
            }
        ],
        "software_tabla": [
            {
                "herramienta": "Python",
                "tipo": "Lenguaje de Programación",
                "descripcion": "Para el reproductor de sesiones de vuelo"
            },
            {
                "herramienta": "SQLite",
                "tipo": "Base de Datos",
                "descripcion": "Para almacenamiento de sesiones"
            },
            {
                "herramienta": "Matplotlib/Plotly",
                "tipo": "Librería / Herramienta de Análisis de Datos",
                "descripcion": "Para visualización de variables de vuelo"
            },
            {
                "herramienta": "Node-RED",
                "tipo": "Automatización / Orquestación",
                "descripcion": "Para la captura de datos en tiempo real"
            }
        ]
    },
    {
        "id": "proj_091",
        "titulo": "👥 Proyecto 91: Sistema de Gemelo Digital IoT para Línea de Ensamble a Pequeña Escala",
        "descripcion": "Problema: Las pequeñas y medianas empresas manufactureras no pueden costear plataformas comerciales de gemelo digital, perdiendo la oportunidad de simular y optimizar sus procesos antes de modificarlos físicamente.\n\nDescripción: Línea de ensamble instrumentada con sensores por estación cuyos datos alimentan un modelo virtual 3D sincronizado en tiempo real, permitiendo visualizar el estado actual del proceso y simular modificaciones de configuración antes de aplicarlas en la línea física.",
        "area": "IoT Industrial 4.0 y Manufactura Inteligente",
        "sector": "Industria - Manufactura e Industria 4.0",
        "nivel": "Avanzado",
        "duracion": "Un semestre",
        "presupuesto": "Bajo costo",
        "hardware": [
            "ESP32 (Microcontrolador | Por estación, 5-6 unidades)",
            "Sensores de proximidad inductivos/ópticos (Sensor de Movimiento / Posición | Detecta movimiento, orientación o posición dentro del sistema.)",
            "Encoder rotativo (Sensor de Movimiento / Posición | Para medición de ciclo)",
            "Raspberry Pi 4 (Computadora de Placa Reducida (SBC) | Servidor del gemelo digital)",
            "Banda transportadora didáctica con motor DC (Actuador | Ejecuta una acción física en respuesta a las decisiones del sistema.)"
        ],
        "software": [
            "Unity o Three.js: Herramienta / Tecnología de Software - Para el modelo 3D del gemelo digital",
            "Node-RED: Automatización / Orquestación - Para la sincronización de datos en tiempo real",
            "MQTT: Protocolo de Comunicación IoT - Usado como bus de comunicación",
            "InfluxDB: Base de Datos - Para históricos de proceso",
            "Python: Lenguaje de Programación - Para el motor de simulación"
        ],
        "habilidades": [
            "Fundamentos de gemelos digitales industriales",
            "Sincronización de sistemas físico-virtuales",
            "Modelado 3D para visualización industrial",
            "Simulación de procesos de manufactura",
            "Instrumentación de líneas de producción"
        ],
        "objetivos": [
            "🎯 Objetivo General: Desarrollar un gemelo digital de bajo costo para una línea de ensamble a pequeña escala que refleje en tiempo real el estado físico del proceso y permita simular cambios antes de implementarlos.",
            "📌 Objetivos Específicos:",
            "• Instrumentar cada estación de la línea de ensamble con sensores de estado, tiempo de ciclo y presencia de pieza.",
            "• Construir un modelo virtual sincronizado en tiempo real con los datos capturados de la línea física.",
            "• Implementar un modo de simulación que permita probar cambios de configuración en el gemelo antes de aplicarlos físicamente."
        ],
        "pasos": [
            "Análisis de requisitos",
            "Diseño de la solución",
            "Implementación y pruebas",
            "Validación y sustentación"
        ],
        "aplicaciones": [
            "Industria - Manufactura e Industria 4.0"
        ],
        "referencias": [],
        "hardware_tabla": [
            {
                "componente": "ESP32",
                "categoria": "Microcontrolador",
                "funcion": "Por estación, 5-6 unidades"
            },
            {
                "componente": "Sensores de proximidad inductivos/ópticos",
                "categoria": "Sensor de Movimiento / Posición",
                "funcion": "Detecta movimiento, orientación o posición dentro del sistema."
            },
            {
                "componente": "Encoder rotativo",
                "categoria": "Sensor de Movimiento / Posición",
                "funcion": "Para medición de ciclo"
            },
            {
                "componente": "Raspberry Pi 4",
                "categoria": "Computadora de Placa Reducida (SBC)",
                "funcion": "Servidor del gemelo digital"
            },
            {
                "componente": "Banda transportadora didáctica con motor DC",
                "categoria": "Actuador",
                "funcion": "Ejecuta una acción física en respuesta a las decisiones del sistema."
            }
        ],
        "software_tabla": [
            {
                "herramienta": "Unity o Three.js",
                "tipo": "Herramienta / Tecnología de Software",
                "descripcion": "Para el modelo 3D del gemelo digital"
            },
            {
                "herramienta": "Node-RED",
                "tipo": "Automatización / Orquestación",
                "descripcion": "Para la sincronización de datos en tiempo real"
            },
            {
                "herramienta": "MQTT",
                "tipo": "Protocolo de Comunicación IoT",
                "descripcion": "Usado como bus de comunicación"
            },
            {
                "herramienta": "InfluxDB",
                "tipo": "Base de Datos",
                "descripcion": "Para históricos de proceso"
            },
            {
                "herramienta": "Python",
                "tipo": "Lenguaje de Programación",
                "descripcion": "Para el motor de simulación"
            }
        ]
    },
    {
        "id": "proj_092",
        "titulo": "🛠️ Proyecto 92: Sistema IoT de Mantenimiento Predictivo Multi-Máquina para Talleres de Manufactura",
        "descripcion": "Problema: Los talleres de manufactura pequeños aplican mantenimiento correctivo o preventivo fijo por falta de herramientas accesibles de mantenimiento predictivo que cubran varias máquinas simultáneamente.\n\nDescripción: Red de sensores distribuidos en varias máquinas de un taller que reporta vibración, temperatura y consumo eléctrico a una plataforma central, la cual estima la vida útil remanente de cada máquina y prioriza las órdenes de mantenimiento según su nivel de riesgo.",
        "area": "IoT Industrial 4.0 y Manufactura Inteligente",
        "sector": "Industria - Mantenimiento industrial",
        "nivel": "Avanzado",
        "duracion": "Un semestre",
        "presupuesto": "Bajo costo",
        "hardware": [
            "ESP32 (Microcontrolador | Por máquina, 6-10 unidades)",
            "Acelerómetro MPU6050 (Sensor de Movimiento / Posición | Detecta movimiento, orientación o posición dentro del sistema.)",
            "Sensor de corriente SCT-013 (Otro Componente de Hardware | Forma parte del hardware de soporte del proyecto.)",
            "Sensor de temperatura infrarrojo MLX90614 (Sensor Ambiental | Mide variables ambientales relevantes para el sistema.)",
            "Raspberry Pi 4 (Computadora de Placa Reducida (SBC) | Servidor central del taller)"
        ],
        "software": [
            "Python con Scikit-learn: Inteligencia Artificial / Machine Learning - Para estimación de vida útil remanente",
            "InfluxDB: Base de Datos - Para históricos multi-máquina",
            "Grafana: Visualización / Dashboard - Para el tablero de priorización",
            "Node-RED: Automatización / Orquestación - Para la lógica de generación de órdenes de trabajo"
        ],
        "habilidades": [
            "Mantenimiento predictivo multi-activo",
            "Priorización de intervenciones basada en riesgo",
            "Instrumentación de maquinaria industrial diversa",
            "Estimación de vida útil remanente (RUL)",
            "Gestión de órdenes de trabajo basada en datos"
        ],
        "objetivos": [
            "🎯 Objetivo General: Implementar un sistema de mantenimiento predictivo que monitoree simultáneamente varias máquinas de un taller y priorice las intervenciones según el riesgo de falla estimado.",
            "📌 Objetivos Específicos:",
            "• Instrumentar múltiples máquinas del taller con sensores de vibración, temperatura y consumo eléctrico.",
            "• Desarrollar modelos de estimación de vida útil remanente por máquina basados en las tendencias observadas.",
            "• Construir un tablero de priorización de mantenimiento que ordene las intervenciones según el riesgo de falla."
        ],
        "pasos": [
            "Análisis de requisitos",
            "Diseño de la solución",
            "Implementación y pruebas",
            "Validación y sustentación"
        ],
        "aplicaciones": [
            "Industria - Mantenimiento industrial"
        ],
        "referencias": [],
        "hardware_tabla": [
            {
                "componente": "ESP32",
                "categoria": "Microcontrolador",
                "funcion": "Por máquina, 6-10 unidades"
            },
            {
                "componente": "Acelerómetro MPU6050",
                "categoria": "Sensor de Movimiento / Posición",
                "funcion": "Detecta movimiento, orientación o posición dentro del sistema."
            },
            {
                "componente": "Sensor de corriente SCT-013",
                "categoria": "Otro Componente de Hardware",
                "funcion": "Forma parte del hardware de soporte del proyecto."
            },
            {
                "componente": "Sensor de temperatura infrarrojo MLX90614",
                "categoria": "Sensor Ambiental",
                "funcion": "Mide variables ambientales relevantes para el sistema."
            },
            {
                "componente": "Raspberry Pi 4",
                "categoria": "Computadora de Placa Reducida (SBC)",
                "funcion": "Servidor central del taller"
            }
        ],
        "software_tabla": [
            {
                "herramienta": "Python con Scikit-learn",
                "tipo": "Inteligencia Artificial / Machine Learning",
                "descripcion": "Para estimación de vida útil remanente"
            },
            {
                "herramienta": "InfluxDB",
                "tipo": "Base de Datos",
                "descripcion": "Para históricos multi-máquina"
            },
            {
                "herramienta": "Grafana",
                "tipo": "Visualización / Dashboard",
                "descripcion": "Para el tablero de priorización"
            },
            {
                "herramienta": "Node-RED",
                "tipo": "Automatización / Orquestación",
                "descripcion": "Para la lógica de generación de órdenes de trabajo"
            }
        ]
    },
    {
        "id": "proj_093",
        "titulo": "👁️ Proyecto 93: Sistema de Control de Calidad Automatizado con Visión Artificial e IoT para Líneas de Empaque",
        "descripcion": "Problema: Las líneas de empaque de pequeña escala dependen de inspección visual manual para detectar defectos, lo que genera inconsistencia, fatiga del operario y baja trazabilidad de los rechazos.\n\nDescripción: Estación de inspección en línea que utiliza una cámara y un modelo de visión artificial para clasificar productos en tiempo real, activando un actuador neumático o servo que retira automáticamente los productos defectuosos, mientras registra estadísticas de calidad por lote.",
        "area": "IoT Industrial 4.0 y Manufactura Inteligente",
        "sector": "Industria - Control de calidad y empaque",
        "nivel": "Avanzado",
        "duracion": "Un semestre",
        "presupuesto": "Bajo costo",
        "hardware": [
            "ESP32-CAM o Raspberry Pi con cámara (Cámara / Sensor de Visión | Captura imágenes o video para el módulo de visión artificial.)",
            "Servomotor o electroválvula (Actuador | Para mecanismo de rechazo)",
            "Banda transportadora didáctica (Estructura / Componente Mecánico | Brinda soporte físico o estructural al prototipo.)",
            "Sensor de presencia (Otro Componente de Hardware | Para disparo de captura de imagen)",
            "Iluminación LED uniforme (Interfaz de Usuario / Iluminación | Para la inspección)"
        ],
        "software": [
            "Python con OpenCV/TensorFlow Lite: Inteligencia Artificial / Machine Learning - Para clasificación",
            "Node-RED: Automatización / Orquestación - Para la lógica de control del actuador",
            "SQLite/PostgreSQL: Base de Datos - Para estadísticas de calidad",
            "Grafana: Visualización / Dashboard - Para dashboards de defectos por lote"
        ],
        "habilidades": [
            "Visión artificial aplicada a control de calidad",
            "Integración de actuadores en líneas de producción",
            "Diseño de estaciones de inspección automatizada",
            "Análisis estadístico de calidad de proceso",
            "Trazabilidad de rechazos por lote"
        ],
        "objetivos": [
            "🎯 Objetivo General: Desarrollar un sistema de inspección automatizada que combine visión artificial y actuadores IoT para detectar y retirar productos defectuosos de una línea de empaque en tiempo real.",
            "📌 Objetivos Específicos:",
            "• Implementar un módulo de visión artificial que clasifique productos como conformes o defectuosos en la línea.",
            "• Integrar un mecanismo de rechazo automatizado que retire físicamente los productos defectuosos detectados.",
            "• Registrar estadísticas de calidad por lote y turno para análisis de tendencias de defectos."
        ],
        "pasos": [
            "Análisis de requisitos",
            "Diseño de la solución",
            "Implementación y pruebas",
            "Validación y sustentación"
        ],
        "aplicaciones": [
            "Industria - Control de calidad y empaque"
        ],
        "referencias": [],
        "hardware_tabla": [
            {
                "componente": "ESP32-CAM o Raspberry Pi con cámara",
                "categoria": "Cámara / Sensor de Visión",
                "funcion": "Captura imágenes o video para el módulo de visión artificial."
            },
            {
                "componente": "Servomotor o electroválvula",
                "categoria": "Actuador",
                "funcion": "Para mecanismo de rechazo"
            },
            {
                "componente": "Banda transportadora didáctica",
                "categoria": "Estructura / Componente Mecánico",
                "funcion": "Brinda soporte físico o estructural al prototipo."
            },
            {
                "componente": "Sensor de presencia",
                "categoria": "Otro Componente de Hardware",
                "funcion": "Para disparo de captura de imagen"
            },
            {
                "componente": "Iluminación LED uniforme",
                "categoria": "Interfaz de Usuario / Iluminación",
                "funcion": "Para la inspección"
            }
        ],
        "software_tabla": [
            {
                "herramienta": "Python con OpenCV/TensorFlow Lite",
                "tipo": "Inteligencia Artificial / Machine Learning",
                "descripcion": "Para clasificación"
            },
            {
                "herramienta": "Node-RED",
                "tipo": "Automatización / Orquestación",
                "descripcion": "Para la lógica de control del actuador"
            },
            {
                "herramienta": "SQLite/PostgreSQL",
                "tipo": "Base de Datos",
                "descripcion": "Para estadísticas de calidad"
            },
            {
                "herramienta": "Grafana",
                "tipo": "Visualización / Dashboard",
                "descripcion": "Para dashboards de defectos por lote"
            }
        ]
    },
    {
        "id": "proj_094",
        "titulo": "🔋 Proyecto 94: Plataforma IoT de Gestión Energética para Plantas Manufactureras (ISO 50001 Simplificado)",
        "descripcion": "Problema: Las plantas manufactureras pequeñas y medianas carecen de sistemas de gestión energética accesibles que les permitan identificar consumos anómalos y avanzar hacia certificaciones de eficiencia energética.\n\nDescripción: Sistema de medidores de energía distribuidos por área productiva de una planta que permite establecer líneas base de consumo, detectar desviaciones significativas por turno y generar reportes de indicadores de desempeño energético alineados con buenas prácticas de gestión energética industrial.",
        "area": "IoT Industrial 4.0 y Manufactura Inteligente",
        "sector": "Industria - Eficiencia energética industrial",
        "nivel": "Intermedio",
        "duracion": "Un semestre",
        "presupuesto": "Bajo costo",
        "hardware": [
            "ESP32 con sensor de corriente SCT-013 (Microcontrolador | Por área, 6-8 unidades)",
            "Sensor de voltaje ZMPT101B (Otro Componente de Hardware | Forma parte del hardware de soporte del proyecto.)",
            "Raspberry Pi 4 (Computadora de Placa Reducida (SBC) | Servidor central de gestión energética)"
        ],
        "software": [
            "InfluxDB: Base de Datos - Para series temporales de consumo",
            "Python para cálculo de líneas base e indicadores: Lenguaje de Programación - EnPI",
            "Grafana: Visualización / Dashboard - Para dashboards de desempeño energético",
            "Node-RED: Automatización / Orquestación - Para alertas de desviación de línea base"
        ],
        "habilidades": [
            "Gestión de la energía industrial (principios ISO 50001)",
            "Establecimiento de líneas base de consumo",
            "Indicadores de desempeño energético (EnPI)",
            "Instrumentación eléctrica por área productiva",
            "Reportes de sostenibilidad industrial"
        ],
        "objetivos": [
            "🎯 Objetivo General: Desarrollar una plataforma de gestión energética que monitoree el consumo por área productiva y apoye la implementación de buenas prácticas alineadas con estándares de eficiencia energética.",
            "📌 Objetivos Específicos:",
            "• Instrumentar las principales áreas productivas de la planta con medidores de consumo eléctrico independientes.",
            "• Establecer líneas base de consumo por área y turno para detectar desviaciones significativas.",
            "• Generar reportes de indicadores de desempeño energético alineados con los principios de la norma ISO 50001."
        ],
        "pasos": [
            "Análisis de requisitos",
            "Diseño de la solución",
            "Implementación y pruebas",
            "Validación y sustentación"
        ],
        "aplicaciones": [
            "Industria - Eficiencia energética industrial"
        ],
        "referencias": [],
        "hardware_tabla": [
            {
                "componente": "ESP32 con sensor de corriente SCT-013",
                "categoria": "Microcontrolador",
                "funcion": "Por área, 6-8 unidades"
            },
            {
                "componente": "Sensor de voltaje ZMPT101B",
                "categoria": "Otro Componente de Hardware",
                "funcion": "Forma parte del hardware de soporte del proyecto."
            },
            {
                "componente": "Raspberry Pi 4",
                "categoria": "Computadora de Placa Reducida (SBC)",
                "funcion": "Servidor central de gestión energética"
            }
        ],
        "software_tabla": [
            {
                "herramienta": "InfluxDB",
                "tipo": "Base de Datos",
                "descripcion": "Para series temporales de consumo"
            },
            {
                "herramienta": "Python para cálculo de líneas base e indicadores",
                "tipo": "Lenguaje de Programación",
                "descripcion": "EnPI"
            },
            {
                "herramienta": "Grafana",
                "tipo": "Visualización / Dashboard",
                "descripcion": "Para dashboards de desempeño energético"
            },
            {
                "herramienta": "Node-RED",
                "tipo": "Automatización / Orquestación",
                "descripcion": "Para alertas de desviación de línea base"
            }
        ]
    },
    {
        "id": "proj_095",
        "titulo": "🏷️ Proyecto 95: Sistema IoT de Trazabilidad Completa de Producción con Códigos QR y RFID",
        "descripcion": "Problema: Muchas plantas de manufactura pequeñas no pueden rastrear un producto desde la materia prima hasta el despacho, dificultando la respuesta ante reclamos de calidad o retiros de producto.\n\nDescripción: Sistema que asigna etiquetas RFID/QR a los lotes de materia prima y los rastrea automáticamente a través de lectores instalados en las estaciones clave del proceso, permitiendo reconstruir el historial completo de producción de cualquier producto terminado mediante una simple consulta.",
        "area": "IoT Industrial 4.0 y Manufactura Inteligente",
        "sector": "Industria - Trazabilidad y control de producción",
        "nivel": "Intermedio",
        "duracion": "Un semestre",
        "presupuesto": "Bajo costo",
        "hardware": [
            "ESP32 con módulo lector RFID RC522 (Microcontrolador | Por estación, 4-6 unidades)",
            "Impresora de etiquetas QR/código de barras económica (Interfaz de Usuario / Iluminación | Permite la interacción, iluminación o notificación visual/sonora del sistema.)",
            "Lector de códigos QR (Cámara / Sensor de Visión | Cámara o lector láser)",
            "Raspberry Pi 4 (Computadora de Placa Reducida (SBC) | Servidor de trazabilidad)"
        ],
        "software": [
            "PostgreSQL: Base de Datos - Para el registro de trazabilidad",
            "Node-RED: Automatización / Orquestación - Para la captura en cada estación",
            "React.js: Framework Web / Aplicación - Para la consulta de historial de producto",
            "Librería de generación de QR: Lenguaje de Programación - Qrcode; en Python"
        ],
        "habilidades": [
            "Trazabilidad de extremo a extremo en manufactura",
            "Identificación automática (RFID/QR)",
            "Diseño de bases de datos de historial de producción",
            "Gestión de calidad y respuesta ante reclamos",
            "Integración de múltiples puntos de captura en planta"
        ],
        "objetivos": [
            "🎯 Objetivo General: Implementar un sistema de trazabilidad de producción de extremo a extremo que registre cada etapa del proceso mediante identificación por RFID y códigos QR.",
            "📌 Objetivos Específicos:",
            "• Asignar identificadores únicos (RFID/QR) a lotes de materia prima y darles seguimiento a lo largo del proceso productivo.",
            "• Registrar automáticamente el paso de cada lote por las estaciones clave del proceso mediante lectores fijos.",
            "• Desarrollar una consulta de trazabilidad que reconstruya el historial completo de un producto terminado a partir de su identificador."
        ],
        "pasos": [
            "Análisis de requisitos",
            "Diseño de la solución",
            "Implementación y pruebas",
            "Validación y sustentación"
        ],
        "aplicaciones": [
            "Industria - Trazabilidad y control de producción"
        ],
        "referencias": [],
        "hardware_tabla": [
            {
                "componente": "ESP32 con módulo lector RFID RC522",
                "categoria": "Microcontrolador",
                "funcion": "Por estación, 4-6 unidades"
            },
            {
                "componente": "Impresora de etiquetas QR/código de barras económica",
                "categoria": "Interfaz de Usuario / Iluminación",
                "funcion": "Permite la interacción, iluminación o notificación visual/sonora del sistema."
            },
            {
                "componente": "Lector de códigos QR",
                "categoria": "Cámara / Sensor de Visión",
                "funcion": "Cámara o lector láser"
            },
            {
                "componente": "Raspberry Pi 4",
                "categoria": "Computadora de Placa Reducida (SBC)",
                "funcion": "Servidor de trazabilidad"
            }
        ],
        "software_tabla": [
            {
                "herramienta": "PostgreSQL",
                "tipo": "Base de Datos",
                "descripcion": "Para el registro de trazabilidad"
            },
            {
                "herramienta": "Node-RED",
                "tipo": "Automatización / Orquestación",
                "descripcion": "Para la captura en cada estación"
            },
            {
                "herramienta": "React.js",
                "tipo": "Framework Web / Aplicación",
                "descripcion": "Para la consulta de historial de producto"
            },
            {
                "herramienta": "Librería de generación de QR",
                "tipo": "Lenguaje de Programación",
                "descripcion": "Qrcode; en Python"
            }
        ]
    },
    {
        "id": "proj_096",
        "titulo": "🤖 Proyecto 96: Sistema de Robótica Colaborativa Asistida por IoT para Estaciones de Ensamble Manual",
        "descripcion": "Problema: Las estaciones de ensamble manual carecen de asistencia inteligente que reduzca la carga física del operario y garantice la secuencia correcta de pasos en procesos complejos.\n\nDescripción: Estación de ensamble donde un brazo robótico de bajo costo asiste al operario en tareas repetitivas, mientras sensores de presencia y contacto verifican que cada paso de la secuencia de ensamble se complete correctamente antes de habilitar el siguiente, coordinado mediante una interfaz visual.",
        "area": "IoT Industrial 4.0 y Manufactura Inteligente",
        "sector": "Industria - Robótica colaborativa (cobots)",
        "nivel": "Avanzado",
        "duracion": "Un semestre",
        "presupuesto": "Bajo costo",
        "hardware": [
            "ESP32 (Microcontrolador | Controla y coordina los sensores/actuadores conectados a él.)",
            "Brazo robótico de bajo costo (Actuador | Tipo uArm o similar con servomotores)",
            "Sensores de presencia por punto de ensamble (Otro Componente de Hardware | 4-6 unidades)",
            "Pantalla táctil (Interfaz de Usuario / Iluminación | Para guía del operario)",
            "Semáforo LED de estado de estación (Interfaz de Usuario / Iluminación | Permite la interacción, iluminación o notificación visual/sonora del sistema.)"
        ],
        "software": [
            "Python: Lenguaje de Programación - Para el control del brazo robótico",
            "Node-RED: Automatización / Orquestación - Para la máquina de estados de la secuencia de ensamble",
            "MQTT: Protocolo de Comunicación IoT - Para coordinación entre sensores y brazo",
            "Interfaz web ligera: Herramienta / Tecnología de Software - Para la guía visual del operario"
        ],
        "habilidades": [
            "Fundamentos de robótica colaborativa (cobots)",
            "Diseño de máquinas de estados para procesos manuales",
            "Coordinación humano-robot en manufactura",
            "Verificación de secuencias de ensamble",
            "Interfaces de guía para operarios industriales"
        ],
        "objetivos": [
            "🎯 Objetivo General: Desarrollar una estación de ensamble asistida donde un brazo robótico de bajo costo colabore con un operario humano, guiado por sensores IoT que verifican la secuencia correcta del proceso.",
            "📌 Objetivos Específicos:",
            "• Integrar un brazo robótico económico que realice tareas repetitivas de sujeción o alcance dentro de la estación de ensamble.",
            "• Implementar sensores que verifiquen que el operario complete cada paso del ensamble en la secuencia correcta antes de continuar.",
            "• Desarrollar una interfaz de retroalimentación visual que guíe al operario y coordine sus acciones con el brazo robótico."
        ],
        "pasos": [
            "Análisis de requisitos",
            "Diseño de la solución",
            "Implementación y pruebas",
            "Validación y sustentación"
        ],
        "aplicaciones": [
            "Industria - Robótica colaborativa (cobots)"
        ],
        "referencias": [],
        "hardware_tabla": [
            {
                "componente": "ESP32",
                "categoria": "Microcontrolador",
                "funcion": "Controla y coordina los sensores/actuadores conectados a él."
            },
            {
                "componente": "Brazo robótico de bajo costo",
                "categoria": "Actuador",
                "funcion": "Tipo uArm o similar con servomotores"
            },
            {
                "componente": "Sensores de presencia por punto de ensamble",
                "categoria": "Otro Componente de Hardware",
                "funcion": "4-6 unidades"
            },
            {
                "componente": "Pantalla táctil",
                "categoria": "Interfaz de Usuario / Iluminación",
                "funcion": "Para guía del operario"
            },
            {
                "componente": "Semáforo LED de estado de estación",
                "categoria": "Interfaz de Usuario / Iluminación",
                "funcion": "Permite la interacción, iluminación o notificación visual/sonora del sistema."
            }
        ],
        "software_tabla": [
            {
                "herramienta": "Python",
                "tipo": "Lenguaje de Programación",
                "descripcion": "Para el control del brazo robótico"
            },
            {
                "herramienta": "Node-RED",
                "tipo": "Automatización / Orquestación",
                "descripcion": "Para la máquina de estados de la secuencia de ensamble"
            },
            {
                "herramienta": "MQTT",
                "tipo": "Protocolo de Comunicación IoT",
                "descripcion": "Para coordinación entre sensores y brazo"
            },
            {
                "herramienta": "Interfaz web ligera",
                "tipo": "Herramienta / Tecnología de Software",
                "descripcion": "Para la guía visual del operario"
            }
        ]
    },
    {
        "id": "proj_097",
        "titulo": "🏭 Proyecto 97: Plataforma IoT de Monitoreo de Emisiones y Cumplimiento Ambiental en Plantas Industriales",
        "descripcion": "Problema: Las plantas industriales deben cumplir límites regulatorios de emisiones, pero muchas pequeñas y medianas empresas no cuentan con monitoreo continuo que les permita anticipar incumplimientos.\n\nDescripción: Red de sensores de gases y partículas instalados en los puntos de emisión de una planta industrial que compara continuamente las lecturas contra los límites normativos vigentes, genera alertas ante posibles incumplimientos y automatiza la elaboración de reportes ambientales periódicos.",
        "area": "IoT Industrial 4.0 y Manufactura Inteligente",
        "sector": "Industria - Cumplimiento ambiental industrial",
        "nivel": "Avanzado",
        "duracion": "Un semestre",
        "presupuesto": "Bajo costo",
        "hardware": [
            "ESP32 (Microcontrolador | Por punto de emisión, 4-6 unidades)",
            "Sensor de gases MQ-135/MQ-7 según el proceso (Sensor Ambiental | Mide variables ambientales relevantes para el sistema.)",
            "Sensor de partículas PMS5003 (Sensor Ambiental | Mide variables ambientales relevantes para el sistema.)",
            "Raspberry Pi 4 (Computadora de Placa Reducida (SBC) | Servidor central de cumplimiento ambiental)"
        ],
        "software": [
            "InfluxDB: Base de Datos - Para históricos de emisiones",
            "Grafana: Visualización / Dashboard - Para dashboards de cumplimiento",
            "Python: Lenguaje de Programación - Para generación automatizada de reportes regulatorios",
            "Node-RED: Automatización / Orquestación - Para lógica de alertas por desviación normativa"
        ],
        "habilidades": [
            "Monitoreo continuo de emisiones industriales",
            "Cumplimiento normativo ambiental",
            "Generación automatizada de reportes regulatorios",
            "Instrumentación de procesos industriales contaminantes",
            "Gestión de riesgo ambiental corporativo"
        ],
        "objetivos": [
            "🎯 Objetivo General: Desarrollar una plataforma de monitoreo continuo de emisiones industriales que compare las lecturas contra límites regulatorios y facilite la generación de reportes de cumplimiento ambiental.",
            "📌 Objetivos Específicos:",
            "• Instrumentar los puntos de emisión de la planta con sensores de gases y partículas relevantes al proceso productivo.",
            "• Comparar continuamente las lecturas contra los límites regulatorios aplicables y generar alertas ante desviaciones.",
            "• Automatizar la generación de reportes periódicos de cumplimiento ambiental para las autoridades correspondientes."
        ],
        "pasos": [
            "Análisis de requisitos",
            "Diseño de la solución",
            "Implementación y pruebas",
            "Validación y sustentación"
        ],
        "aplicaciones": [
            "Industria - Cumplimiento ambiental industrial"
        ],
        "referencias": [],
        "hardware_tabla": [
            {
                "componente": "ESP32",
                "categoria": "Microcontrolador",
                "funcion": "Por punto de emisión, 4-6 unidades"
            },
            {
                "componente": "Sensor de gases MQ-135/MQ-7 según el proceso",
                "categoria": "Sensor Ambiental",
                "funcion": "Mide variables ambientales relevantes para el sistema."
            },
            {
                "componente": "Sensor de partículas PMS5003",
                "categoria": "Sensor Ambiental",
                "funcion": "Mide variables ambientales relevantes para el sistema."
            },
            {
                "componente": "Raspberry Pi 4",
                "categoria": "Computadora de Placa Reducida (SBC)",
                "funcion": "Servidor central de cumplimiento ambiental"
            }
        ],
        "software_tabla": [
            {
                "herramienta": "InfluxDB",
                "tipo": "Base de Datos",
                "descripcion": "Para históricos de emisiones"
            },
            {
                "herramienta": "Grafana",
                "tipo": "Visualización / Dashboard",
                "descripcion": "Para dashboards de cumplimiento"
            },
            {
                "herramienta": "Python",
                "tipo": "Lenguaje de Programación",
                "descripcion": "Para generación automatizada de reportes regulatorios"
            },
            {
                "herramienta": "Node-RED",
                "tipo": "Automatización / Orquestación",
                "descripcion": "Para lógica de alertas por desviación normativa"
            }
        ]
    },
    {
        "id": "proj_098",
        "titulo": "📦 Proyecto 98: Sistema IoT de Optimización de Almacenes con Localización en Tiempo Real (RTLS)",
        "descripcion": "Problema: Los almacenes industriales pierden tiempo significativo localizando materiales, herramientas o montacargas dentro de sus instalaciones por falta de sistemas de localización en tiempo real.\n\nDescripción: Red de anclas de posicionamiento fijas distribuidas en el almacén que triangulan la posición de etiquetas Bluetooth/UWB colocadas en montacargas, carros y herramientas, mostrando su ubicación en tiempo real sobre un mapa digital del almacén para reducir tiempos de búsqueda.",
        "area": "IoT Industrial 4.0 y Manufactura Inteligente",
        "sector": "Industria - Logística interna y gestión de almacenes",
        "nivel": "Avanzado",
        "duracion": "Un semestre",
        "presupuesto": "Bajo costo",
        "hardware": [
            "ESP32 (Microcontrolador | Anclas fijas, 6-8 unidades)",
            "Módulo Bluetooth BLE o UWB (Módulo de Comunicación / Conectividad | DWM1000; para triangulación)",
            "Etiquetas BLE/UWB para activos móviles (Módulo de Comunicación / Conectividad | 8-10 unidades)",
            "Raspberry Pi 4 (Computadora de Placa Reducida (SBC) | Servidor de posicionamiento)"
        ],
        "software": [
            "Algoritmos de trilateración/triangulación en Python: Inteligencia Artificial / Machine Learning - Procesa datos mediante modelos de IA/ML para generar predicciones o clasificaciones.",
            "MQTT: Protocolo de Comunicación IoT - Para telemetría de anclas",
            "React.js con Canvas/SVG: Framework Web / Aplicación - Para el mapa en tiempo real",
            "PostgreSQL: Base de Datos - Para históricos de movimiento de activos"
        ],
        "habilidades": [
            "Sistemas de localización en tiempo real (RTLS)",
            "Trilateración con tecnologías BLE/UWB",
            "Optimización de logística interna de almacenes",
            "Visualización de posicionamiento en tiempo real",
            "Gestión de activos móviles industriales"
        ],
        "objetivos": [
            "🎯 Objetivo General: Implementar un sistema de localización en tiempo real (RTLS) que rastree activos móviles dentro de un almacén para optimizar los tiempos de búsqueda y desplazamiento.",
            "📌 Objetivos Específicos:",
            "• Instalar una red de anclas fijas que permitan triangular la posición de etiquetas móviles dentro del almacén.",
            "• Equipar activos móviles clave (montacargas, carros, herramientas críticas) con etiquetas de localización.",
            "• Desarrollar un mapa en tiempo real del almacén que muestre la posición actual de cada activo rastreado."
        ],
        "pasos": [
            "Análisis de requisitos",
            "Diseño de la solución",
            "Implementación y pruebas",
            "Validación y sustentación"
        ],
        "aplicaciones": [
            "Industria - Logística interna y gestión de almacenes"
        ],
        "referencias": [],
        "hardware_tabla": [
            {
                "componente": "ESP32",
                "categoria": "Microcontrolador",
                "funcion": "Anclas fijas, 6-8 unidades"
            },
            {
                "componente": "Módulo Bluetooth BLE o UWB",
                "categoria": "Módulo de Comunicación / Conectividad",
                "funcion": "DWM1000; para triangulación"
            },
            {
                "componente": "Etiquetas BLE/UWB para activos móviles",
                "categoria": "Módulo de Comunicación / Conectividad",
                "funcion": "8-10 unidades"
            },
            {
                "componente": "Raspberry Pi 4",
                "categoria": "Computadora de Placa Reducida (SBC)",
                "funcion": "Servidor de posicionamiento"
            }
        ],
        "software_tabla": [
            {
                "herramienta": "Algoritmos de trilateración/triangulación en Python",
                "tipo": "Inteligencia Artificial / Machine Learning",
                "descripcion": "Procesa datos mediante modelos de IA/ML para generar predicciones o clasificaciones."
            },
            {
                "herramienta": "MQTT",
                "tipo": "Protocolo de Comunicación IoT",
                "descripcion": "Para telemetría de anclas"
            },
            {
                "herramienta": "React.js con Canvas/SVG",
                "tipo": "Framework Web / Aplicación",
                "descripcion": "Para el mapa en tiempo real"
            },
            {
                "herramienta": "PostgreSQL",
                "tipo": "Base de Datos",
                "descripcion": "Para históricos de movimiento de activos"
            }
        ]
    },
    {
        "id": "proj_099",
        "titulo": "⛑️ Proyecto 99: Sistema IoT de Seguridad Industrial con Detección de Zonas de Riesgo y EPP Mediante Visión",
        "descripcion": "Problema: Los accidentes laborales en plantas industriales frecuentemente ocurren por incumplimiento del uso de equipo de protección personal o por ingreso no autorizado a zonas de riesgo activo.\n\nDescripción: Estación de control en los accesos a zonas de riesgo que utiliza una cámara para verificar mediante visión artificial el uso correcto de equipo de protección personal, combinada con sensores de presencia que detectan ingresos no autorizados, activando alertas y registrando cada incidente.",
        "area": "IoT Industrial 4.0 y Manufactura Inteligente",
        "sector": "Industria - Seguridad y salud ocupacional",
        "nivel": "Avanzado",
        "duracion": "Un semestre",
        "presupuesto": "Bajo costo",
        "hardware": [
            "ESP32-CAM o Raspberry Pi con cámara (Cámara / Sensor de Visión | Captura imágenes o video para el módulo de visión artificial.)",
            "Sensor PIR o de barrera láser (Sensor de Movimiento / Posición | Para control de acceso)",
            "Sirena y baliza LED (Interfaz de Usuario / Iluminación | Para alertas)",
            "Torniquete o barrera física simple (Otro Componente de Hardware | Opcional)"
        ],
        "software": [
            "Python con TensorFlow/YOLO: Inteligencia Artificial / Machine Learning - Para detección de EPP",
            "Node-RED: Automatización / Orquestación - Para la lógica de control de acceso",
            "PostgreSQL: Base de Datos - Para el registro de incidentes",
            "Grafana: Visualización / Dashboard - Para dashboards de cumplimiento de seguridad"
        ],
        "habilidades": [
            "Visión artificial para seguridad ocupacional",
            "Detección de equipo de protección personal (EPP)",
            "Control de acceso a zonas de riesgo",
            "Registro y análisis de incidentes de seguridad",
            "Diseño de sistemas de alerta industrial"
        ],
        "objetivos": [
            "🎯 Objetivo General: Desarrollar un sistema que combine visión artificial y sensórica IoT para verificar el uso de equipo de protección personal y controlar el acceso a zonas de riesgo activo en tiempo real.",
            "📌 Objetivos Específicos:",
            "• Implementar un módulo de visión artificial que verifique el uso de casco, chaleco y gafas de seguridad en los accesos a zonas de riesgo.",
            "• Integrar sensores de presencia que detecten el ingreso no autorizado a zonas con maquinaria activa o riesgo elevado.",
            "• Desarrollar un sistema de alertas sonoras/visuales y registro de incidentes de incumplimiento para seguimiento del área de seguridad."
        ],
        "pasos": [
            "Análisis de requisitos",
            "Diseño de la solución",
            "Implementación y pruebas",
            "Validación y sustentación"
        ],
        "aplicaciones": [
            "Industria - Seguridad y salud ocupacional"
        ],
        "referencias": [],
        "hardware_tabla": [
            {
                "componente": "ESP32-CAM o Raspberry Pi con cámara",
                "categoria": "Cámara / Sensor de Visión",
                "funcion": "Captura imágenes o video para el módulo de visión artificial."
            },
            {
                "componente": "Sensor PIR o de barrera láser",
                "categoria": "Sensor de Movimiento / Posición",
                "funcion": "Para control de acceso"
            },
            {
                "componente": "Sirena y baliza LED",
                "categoria": "Interfaz de Usuario / Iluminación",
                "funcion": "Para alertas"
            },
            {
                "componente": "Torniquete o barrera física simple",
                "categoria": "Otro Componente de Hardware",
                "funcion": "Opcional"
            }
        ],
        "software_tabla": [
            {
                "herramienta": "Python con TensorFlow/YOLO",
                "tipo": "Inteligencia Artificial / Machine Learning",
                "descripcion": "Para detección de EPP"
            },
            {
                "herramienta": "Node-RED",
                "tipo": "Automatización / Orquestación",
                "descripcion": "Para la lógica de control de acceso"
            },
            {
                "herramienta": "PostgreSQL",
                "tipo": "Base de Datos",
                "descripcion": "Para el registro de incidentes"
            },
            {
                "herramienta": "Grafana",
                "tipo": "Visualización / Dashboard",
                "descripcion": "Para dashboards de cumplimiento de seguridad"
            }
        ]
    },
    {
        "id": "proj_100",
        "titulo": "🏭 Proyecto 100: Plataforma IoT de Simulación de Fábrica Inteligente (Smart Factory) para Formación en Industria 4.0",
        "descripcion": "Problema: Los estudiantes de ingeniería tienen acceso limitado a plantas industriales reales equipadas con tecnologías de Industria 4.0, dificultando la formación práctica integral en manufactura inteligente.\n\nDescripción: Maqueta funcional a escala de una fábrica inteligente que integra sensórica IoT, inspección por visión artificial, analítica de datos de proceso y actuadores automatizados, supervisada desde un tablero de control unificado tipo SCADA educativo, diseñada como plataforma integral de formación en Industria 4.0.",
        "area": "IoT Industrial 4.0 y Manufactura Inteligente",
        "sector": "Industria - Formación en Industria 4.0",
        "nivel": "Avanzado",
        "duracion": "Un semestre",
        "presupuesto": "Bajo costo",
        "hardware": [
            "Raspberry Pi 4 (Computadora de Placa Reducida (SBC) | Servidor SCADA educativo)",
            "ESP32 (Microcontrolador | Múltiples estaciones de la maqueta, 6-8 unidades)",
            "Banda transportadora didáctica con motor DC (Actuador | Ejecuta una acción física en respuesta a las decisiones del sistema.)",
            "Cámara (Cámara / Sensor de Visión | Para inspección por visión artificial)",
            "Brazo robótico de bajo costo (Estructura / Componente Mecánico | Brinda soporte físico o estructural al prototipo.)",
            "Sensores diversos (Sensor Ambiental | Proximidad, temperatura, presión; según estación)"
        ],
        "software": [
            "Node-RED: Automatización / Orquestación - Usado como orquestador central",
            "MQTT: Protocolo de Comunicación IoT - Usado como bus de comunicación entre subsistemas",
            "InfluxDB y Grafana: Base de Datos - Para analítica de proceso",
            "Python/OpenCV: Inteligencia Artificial / Machine Learning - Para el módulo de visión artificial",
            "Ignition Edge o SCADA educativo de código abierto: Herramienta / Tecnología de Software - Tecnología de software empleada en el desarrollo del proyecto."
        ],
        "habilidades": [
            "Integración de los pilares de Industria 4.0",
            "Diseño de plataformas educativas de manufactura inteligente",
            "Arquitecturas SCADA educativas",
            "Orquestación de subsistemas IoT heterogéneos",
            "Formación práctica integral en manufactura digital RESUMEN FINAL — 100 PROYECTOS DE IoT El documento ampliado contiene 100 proyectos prácticos de IoT distribuidos en nueve áreas tecnológicas y más de 30 sectores de aplicación, duplicando la colección original de 50 proyectos y 5 áreas. Proyectos Agregados en esta Ampliación (51-100)",
            "Proyectos 51-60: Ciberseguridad IoT avanzada (pentesting, DDoS, blockchain, biometría, Zero Trust, malware, OTA)",
            "Proyectos 61-70: Big Data y Analítica avanzada (agua, logística, energía, salud pública, agricultura regional, campus, telecomunicaciones, turismo, retail, residuos)",
            "Proyectos 71-80: Medicina y Salud Digital (telemonitoreo, adherencia, rehabilitación, glucosa, caídas, salud mental, hospitales, vacunas, postoperatorio, camas)",
            "Proyectos 81-90: Aeroespacial y Aeronáutico (cohetería, drones, globos, motores, UTM, calidad de aire, CubeSats, deshielo, vibración, formación de pilotos)",
            "Proyectos 91-100: Industria 4.0 y Manufactura Inteligente (gemelo digital, mantenimiento predictivo, visión artificial, energía, trazabilidad, cobots, emisiones, RTLS, EPP, smart factory) Distribución Total por Áreas Tecnológicas",
            "SBC-IoT: 18 proyectos",
            "AIoT: 16 proyectos",
            "IoT con Visión Artificial: 10 proyectos",
            "IoT con Big Data y Analítica: 18 proyectos",
            "IoT Hacking y Ciberseguridad: 14 proyectos",
            "IoT Médico y Salud Digital: 10 proyectos",
            "IoT Aeroespacial y Aeronáutico: 10 proyectos",
            "IoT Industrial 4.0 y Manufactura Inteligente: 10 proyectos Sectores de Aplicación Cubiertos Más de 30 sectores diferentes de aplicación industrial, comercial, agrícola, urbana, salud, educación, deportes, turismo, aeroespacial, manufactura y ciberseguridad. Todos los 100 proyectos incluyen: Sector, Área Tecnológica, Complejidad, Problemática, Objetivo General, Objetivos Específicos, Hardware detallado, Software y Tecnologías, y Habilidades Desarrolladas."
        ],
        "objetivos": [
            "🎯 Objetivo General: Desarrollar una maqueta funcional de fábrica inteligente a escala que integre los principales pilares de Industria 4.0 (IoT, Big Data, visión artificial y robótica) con fines formativos.",
            "📌 Objetivos Específicos:",
            "• Integrar en una maqueta a escala los subsistemas trabajados en los demás proyectos: sensórica IoT, visión artificial, analítica de datos y actuadores automatizados.",
            "• Desarrollar un tablero de control unificado (SCADA educativo) que permita supervisar todos los subsistemas de la fábrica desde un solo punto.",
            "• Diseñar módulos de práctica guiada que permitan a otros estudiantes experimentar con cada pilar de Industria",
            "• sobre la misma maqueta."
        ],
        "pasos": [
            "Análisis de requisitos",
            "Diseño de la solución",
            "Implementación y pruebas",
            "Validación y sustentación"
        ],
        "aplicaciones": [
            "Industria - Formación en Industria 4.0"
        ],
        "referencias": [],
        "hardware_tabla": [
            {
                "componente": "Raspberry Pi 4",
                "categoria": "Computadora de Placa Reducida (SBC)",
                "funcion": "Servidor SCADA educativo"
            },
            {
                "componente": "ESP32",
                "categoria": "Microcontrolador",
                "funcion": "Múltiples estaciones de la maqueta, 6-8 unidades"
            },
            {
                "componente": "Banda transportadora didáctica con motor DC",
                "categoria": "Actuador",
                "funcion": "Ejecuta una acción física en respuesta a las decisiones del sistema."
            },
            {
                "componente": "Cámara",
                "categoria": "Cámara / Sensor de Visión",
                "funcion": "Para inspección por visión artificial"
            },
            {
                "componente": "Brazo robótico de bajo costo",
                "categoria": "Estructura / Componente Mecánico",
                "funcion": "Brinda soporte físico o estructural al prototipo."
            },
            {
                "componente": "Sensores diversos",
                "categoria": "Sensor Ambiental",
                "funcion": "Proximidad, temperatura, presión; según estación"
            }
        ],
        "software_tabla": [
            {
                "herramienta": "Node-RED",
                "tipo": "Automatización / Orquestación",
                "descripcion": "Usado como orquestador central"
            },
            {
                "herramienta": "MQTT",
                "tipo": "Protocolo de Comunicación IoT",
                "descripcion": "Usado como bus de comunicación entre subsistemas"
            },
            {
                "herramienta": "InfluxDB y Grafana",
                "tipo": "Base de Datos",
                "descripcion": "Para analítica de proceso"
            },
            {
                "herramienta": "Python/OpenCV",
                "tipo": "Inteligencia Artificial / Machine Learning",
                "descripcion": "Para el módulo de visión artificial"
            },
            {
                "herramienta": "Ignition Edge o SCADA educativo de código abierto",
                "tipo": "Herramienta / Tecnología de Software",
                "descripcion": "Tecnología de software empleada en el desarrollo del proyecto."
            }
        ]
    }
];
