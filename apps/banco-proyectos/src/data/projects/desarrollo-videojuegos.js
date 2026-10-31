// Projects for this area. Each entry follows the schema checked by scripts/projects-validation.mjs.
export default [
    {
        "id": "proj_101",
        "titulo": "🎮 Proyecto 101: Videojuego Serio con Controlador Adaptado para Rehabilitación de Mano en Pacientes Post-ACV",
        "descripcion": "Problema: Los pacientes que sufren un accidente cerebrovascular deben repetir durante meses ejercicios de apertura, cierre y agarre de la mano; la terapia convencional es monótona, muchos abandonan la rutina en casa y el fisioterapeuta no tiene datos objetivos de la evolución entre sesiones.\n\nDescripción: Videojuego serio desarrollado en Godot que se controla con un guante adaptado basado en ESP32, sensores flexibles en los dedos y un sensor de fuerza de agarre. Cada mecánica del juego corresponde a un ejercicio terapéutico, la dificultad se ajusta al rango de movimiento del paciente y cada sesión queda registrada para que el fisioterapeuta revise el progreso.",
        "area": "Desarrollo de Videojuegos",
        "sector": "Salud - Rehabilitación física",
        "nivel": "Intermedio-Avanzado",
        "duracion": "Un semestre",
        "presupuesto": "Bajo costo",
        "habilidades": [
            "Diseño de videojuegos serios para salud",
            "Desarrollo de controladores personalizados con ESP32",
            "Calibración de sensores flexibles y de fuerza",
            "Programación en Godot con GDScript",
            "Evaluación de usabilidad con profesionales de la salud"
        ],
        "objetivos": [
            "🎯 Objetivo General: Desarrollar un videojuego serio controlado por un guante sensorizado que motive la ejecución de ejercicios de rehabilitación de mano y registre métricas objetivas de la evolución del paciente.",
            "📌 Objetivos Específicos:",
            "• Construir un guante con sensores flexibles y de fuerza que mida el ángulo de flexión de cada dedo con un error menor a 10 grados frente a un goniómetro.",
            "• Diseñar al menos tres minijuegos asociados a ejercicios de flexión, extensión y agarre, con dificultad calibrada al rango de movimiento individual.",
            "• Evaluar la aceptación del sistema con fisioterapeutas y voluntarios mediante la escala SUS, obteniendo un puntaje superior a 70."
        ],
        "pasos": [
            "Análisis de requisitos",
            "Diseño de la solución",
            "Implementación y pruebas",
            "Validación y sustentación"
        ],
        "aplicaciones": [
            "Salud - Rehabilitación física"
        ],
        "referencias": [],
        "hardware_tabla": [
            {
                "componente": "ESP32",
                "categoria": "Microcontrolador",
                "funcion": "Lee los sensores del guante y envía los datos al juego por Bluetooth."
            },
            {
                "componente": "Sensores flexibles (flex sensor) de 2.2 pulgadas",
                "categoria": "Sensor de Movimiento",
                "funcion": "Miden el grado de flexión de cada dedo."
            },
            {
                "componente": "Sensor de fuerza resistivo FSR 402",
                "categoria": "Sensor de Fuerza",
                "funcion": "Mide la fuerza de agarre ejercida por el paciente."
            },
            {
                "componente": "Motor de vibración tipo moneda",
                "categoria": "Actuador",
                "funcion": "Entrega retroalimentación háptica al completar un ejercicio."
            },
            {
                "componente": "Guante de tela con soportes impresos en 3D",
                "categoria": "Estructura / Componente Mecánico",
                "funcion": "Sostiene los sensores sobre la mano del paciente."
            },
            {
                "componente": "Batería LiPo con módulo de carga TP4056",
                "categoria": "Fuente de Alimentación / Energía",
                "funcion": "Permite el uso inalámbrico del guante."
            }
        ],
        "software_tabla": [
            {
                "herramienta": "Godot Engine 4",
                "tipo": "Motor de Videojuegos",
                "descripcion": "Desarrollo de los minijuegos de rehabilitación."
            },
            {
                "herramienta": "Arduino IDE / PlatformIO",
                "tipo": "Entorno de Desarrollo Embebido",
                "descripcion": "Programación del firmware del guante."
            },
            {
                "herramienta": "Bluetooth Low Energy",
                "tipo": "Protocolo de Comunicación",
                "descripcion": "Enlace inalámbrico entre el guante y el computador."
            },
            {
                "herramienta": "SQLite",
                "tipo": "Base de Datos",
                "descripcion": "Registro local de sesiones y métricas por paciente."
            },
            {
                "herramienta": "Python con Matplotlib",
                "tipo": "Análisis de Datos / Visualización",
                "descripcion": "Reportes de evolución para el fisioterapeuta."
            }
        ]
    },
    {
        "id": "proj_102",
        "titulo": "🏛️ Proyecto 102: Videojuego Narrativo sobre el Patrimonio Colonial y las Procesiones de Semana Santa de Popayán",
        "descripcion": "Problema: Las procesiones de Semana Santa de Popayán son Patrimonio Cultural Inmaterial de la Humanidad, pero los niños y jóvenes conocen poco de su historia, de los oficios asociados (cargueros, sahumadoras, artesanos) y de la arquitectura del centro histórico, y los museos locales no cuentan con recursos digitales atractivos para ese público.\n\nDescripción: Videojuego narrativo 2D de exploración desarrollado en Godot, ambientado en el centro histórico de Popayán, en el que el jugador recorre templos y calles, conversa con personajes que representan los oficios tradicionales y resuelve misiones basadas en información validada con gestores culturales. Incluye un cuestionario integrado para medir el aprendizaje.",
        "area": "Desarrollo de Videojuegos",
        "sector": "Cultura - Patrimonio y museos",
        "nivel": "Intermedio",
        "duracion": "Un semestre",
        "presupuesto": "Bajo costo",
        "habilidades": [
            "Diseño narrativo y guion interactivo",
            "Desarrollo de juegos 2D en Godot",
            "Creación de arte en pixel art",
            "Investigación con fuentes culturales e históricas",
            "Evaluación de aprendizaje mediante pre-test y post-test"
        ],
        "objetivos": [
            "🎯 Objetivo General: Desarrollar un videojuego narrativo que divulgue la historia, los oficios y la arquitectura asociados a la Semana Santa de Popayán entre estudiantes de educación básica.",
            "📌 Objetivos Específicos:",
            "• Documentar con apoyo de gestores culturales al menos seis lugares y cinco oficios tradicionales que se representen en el juego.",
            "• Implementar un sistema de diálogos ramificados y misiones con una duración de juego de 30 a 45 minutos.",
            "• Medir la ganancia de conocimiento en un grupo de al menos 25 estudiantes comparando pre-test y post-test."
        ],
        "pasos": [
            "Análisis de requisitos",
            "Diseño de la solución",
            "Implementación y pruebas",
            "Validación y sustentación"
        ],
        "aplicaciones": [
            "Cultura - Patrimonio y museos"
        ],
        "referencias": [],
        "hardware_tabla": [
            {
                "componente": "Computador de desarrollo",
                "categoria": "Equipo de Cómputo",
                "funcion": "Desarrollo, arte y compilación del videojuego."
            },
            {
                "componente": "Tableta digitalizadora de bajo costo",
                "categoria": "Periférico de Entrada",
                "funcion": "Creación de ilustraciones y sprites."
            },
            {
                "componente": "Tabletas o computadores del aula",
                "categoria": "Dispositivo de Usuario Final",
                "funcion": "Ejecución del juego durante las pruebas con estudiantes."
            }
        ],
        "software_tabla": [
            {
                "herramienta": "Godot Engine 4",
                "tipo": "Motor de Videojuegos",
                "descripcion": "Desarrollo del juego y exportación a Android y web."
            },
            {
                "herramienta": "Dialogic",
                "tipo": "Complemento de Narrativa",
                "descripcion": "Gestión de diálogos ramificados y personajes."
            },
            {
                "herramienta": "Aseprite / LibreSprite",
                "tipo": "Herramienta de Arte Digital",
                "descripcion": "Creación de sprites y animaciones en pixel art."
            },
            {
                "herramienta": "Tiled",
                "tipo": "Editor de Niveles",
                "descripcion": "Diseño de los mapas del centro histórico."
            },
            {
                "herramienta": "Google Forms",
                "tipo": "Herramienta de Evaluación",
                "descripcion": "Aplicación de pre-test, post-test y encuestas de experiencia."
            }
        ]
    },
    {
        "id": "proj_103",
        "titulo": "🧲 Proyecto 103: Videojuego de Física con Experimentos Reales como Mecánica de Juego para Educación Media",
        "descripcion": "Problema: Los estudiantes de colegios públicos del Cauca aprenden cinemática y leyes de Newton de forma teórica, con pocos laboratorios disponibles, por lo que les cuesta relacionar las ecuaciones con fenómenos reales y el interés por las ciencias disminuye.\n\nDescripción: Videojuego de puzles en el que cada nivel se resuelve realizando un experimento físico real: un carrito sobre un plano inclinado, un péndulo o un resorte instrumentados con Arduino y sensores envían sus medidas al juego, que compara el resultado con la predicción del estudiante y desbloquea el siguiente reto.",
        "area": "Desarrollo de Videojuegos",
        "sector": "Educación media - Ciencias naturales",
        "nivel": "Intermedio",
        "duracion": "Un semestre",
        "presupuesto": "Bajo costo",
        "habilidades": [
            "Gamificación de la enseñanza de las ciencias",
            "Instrumentación de experimentos con Arduino",
            "Comunicación serial entre hardware y motores de juego",
            "Diseño de niveles basados en objetivos de aprendizaje",
            "Evaluación educativa con grupos de control"
        ],
        "objetivos": [
            "🎯 Objetivo General: Desarrollar un videojuego educativo que integre experimentos físicos instrumentados como mecánica central para la enseñanza de la cinemática y la dinámica en educación media.",
            "📌 Objetivos Específicos:",
            "• Instrumentar tres montajes experimentales (plano inclinado, péndulo y resorte) con medidas de tiempo y distancia con error menor al 5 %.",
            "• Diseñar diez niveles en los que el estudiante formule una predicción y la contraste con el experimento real.",
            "• Comparar el desempeño en una prueba conceptual entre un grupo que usa el juego y un grupo con clase tradicional."
        ],
        "pasos": [
            "Análisis de requisitos",
            "Diseño de la solución",
            "Implementación y pruebas",
            "Validación y sustentación"
        ],
        "aplicaciones": [
            "Educación media - Ciencias naturales"
        ],
        "referencias": [],
        "hardware_tabla": [
            {
                "componente": "Arduino Uno",
                "categoria": "Microcontrolador",
                "funcion": "Adquiere las medidas de los experimentos y las envía al juego."
            },
            {
                "componente": "Sensor ultrasónico HC-SR04",
                "categoria": "Sensor de Distancia",
                "funcion": "Mide la posición del carrito sobre el plano inclinado."
            },
            {
                "componente": "Fotocompuertas con sensor infrarrojo",
                "categoria": "Sensor Óptico",
                "funcion": "Miden tiempos de paso y periodos del péndulo."
            },
            {
                "componente": "Acelerómetro MPU6050",
                "categoria": "Sensor de Movimiento",
                "funcion": "Registra la oscilación del sistema masa-resorte."
            },
            {
                "componente": "Montajes de madera y piezas impresas en 3D",
                "categoria": "Estructura / Componente Mecánico",
                "funcion": "Soporte de los experimentos físicos."
            },
            {
                "componente": "Computador portátil",
                "categoria": "Equipo de Cómputo",
                "funcion": "Ejecuta el videojuego y recibe los datos por USB."
            }
        ],
        "software_tabla": [
            {
                "herramienta": "Unity",
                "tipo": "Motor de Videojuegos",
                "descripcion": "Desarrollo de los niveles y la interfaz del juego."
            },
            {
                "herramienta": "Arduino IDE",
                "tipo": "Entorno de Desarrollo Embebido",
                "descripcion": "Firmware de adquisición de datos."
            },
            {
                "herramienta": "System.IO.Ports (C#)",
                "tipo": "Biblioteca de Comunicación",
                "descripcion": "Lectura de datos seriales desde Unity."
            },
            {
                "herramienta": "Tracker Video Analysis",
                "tipo": "Herramienta de Análisis Físico",
                "descripcion": "Validación de las medidas mediante videoanálisis."
            }
        ]
    },
    {
        "id": "proj_104",
        "titulo": "🦻 Proyecto 104: Videojuego de Audio Espacial y Retroalimentación Háptica para Jugadores con Discapacidad Visual",
        "descripcion": "Problema: La mayoría de los videojuegos dependen de la información visual, lo que excluye a las personas ciegas o con baja visión de una actividad de ocio, socialización y desarrollo cognitivo; en Colombia existen pocos juegos diseñados desde el inicio para esta población.\n\nDescripción: Videojuego de exploración y acción que se juega sin pantalla, usando audio binaural 3D para ubicar objetos y enemigos, y un controlador propio con ESP32 que entrega vibraciones direccionales. El diseño se realiza junto con personas con discapacidad visual y se evalúa la precisión de orientación lograda solo con sonido y vibración.",
        "area": "Desarrollo de Videojuegos",
        "sector": "Inclusión social - Discapacidad visual",
        "nivel": "Intermedio-Avanzado",
        "duracion": "Un semestre",
        "presupuesto": "Bajo costo",
        "habilidades": [
            "Diseño de videojuegos accesibles",
            "Audio espacial y sonido binaural",
            "Diseño de controladores hápticos",
            "Diseño participativo con usuarios",
            "Pruebas de usabilidad y accesibilidad"
        ],
        "objetivos": [
            "🎯 Objetivo General: Desarrollar un videojuego jugable sin información visual mediante audio espacial y un controlador háptico, diseñado con participación de personas con discapacidad visual.",
            "📌 Objetivos Específicos:",
            "• Implementar un sistema de audio binaural que permita localizar fuentes sonoras con un error angular promedio menor a 30 grados.",
            "• Construir un controlador con cuatro motores de vibración que indiquen la dirección de obstáculos y objetivos.",
            "• Evaluar el juego con al menos ocho participantes con discapacidad visual midiendo tasa de éxito por nivel y satisfacción."
        ],
        "pasos": [
            "Análisis de requisitos",
            "Diseño de la solución",
            "Implementación y pruebas",
            "Validación y sustentación"
        ],
        "aplicaciones": [
            "Inclusión social - Discapacidad visual"
        ],
        "referencias": [],
        "hardware_tabla": [
            {
                "componente": "ESP32",
                "categoria": "Microcontrolador",
                "funcion": "Gestiona botones y motores hápticos y se comunica con el juego."
            },
            {
                "componente": "Motores de vibración tipo moneda (x4)",
                "categoria": "Actuador",
                "funcion": "Indican la dirección de elementos del juego mediante vibración."
            },
            {
                "componente": "Driver de motores DRV2605L",
                "categoria": "Controlador de Potencia",
                "funcion": "Genera patrones hápticos diferenciados."
            },
            {
                "componente": "Botones arcade con relieve",
                "categoria": "Interfaz de Usuario",
                "funcion": "Entrada táctil identificable sin ver el control."
            },
            {
                "componente": "Audífonos estéreo",
                "categoria": "Periférico de Audio",
                "funcion": "Reproducción del audio binaural."
            },
            {
                "componente": "Carcasa impresa en 3D",
                "categoria": "Estructura / Componente Mecánico",
                "funcion": "Ergonomía y protección del controlador."
            }
        ],
        "software_tabla": [
            {
                "herramienta": "Unity",
                "tipo": "Motor de Videojuegos",
                "descripcion": "Lógica del juego y escenarios sin interfaz visual."
            },
            {
                "herramienta": "Steam Audio",
                "tipo": "Biblioteca de Audio Espacial",
                "descripcion": "Simulación de audio binaural y oclusión de sonido."
            },
            {
                "herramienta": "Arduino IDE / PlatformIO",
                "tipo": "Entorno de Desarrollo Embebido",
                "descripcion": "Firmware del controlador háptico."
            },
            {
                "herramienta": "NVDA",
                "tipo": "Lector de Pantalla",
                "descripcion": "Accesibilidad de los menús del juego."
            }
        ]
    },
    {
        "id": "proj_105",
        "titulo": "🧩 Proyecto 105: Generación Procedural de Niveles con Wave Function Collapse y Evaluación Automática de Jugabilidad",
        "descripcion": "Problema: Los estudios independientes y semilleros de desarrollo de videojuegos de la región tienen equipos pequeños y no pueden diseñar a mano la cantidad de niveles que exige un juego rejugable; los generadores procedurales simples producen niveles imposibles o aburridos que deben revisarse uno a uno.\n\nDescripción: Herramienta de generación procedural de niveles para Godot basada en el algoritmo Wave Function Collapse, complementada con un agente que recorre automáticamente cada nivel generado para verificar que sea completable y calcular métricas de dificultad, linealidad y variedad, permitiendo filtrar y comparar configuraciones de generación.",
        "area": "Desarrollo de Videojuegos",
        "sector": "Industria creativa - Estudios de videojuegos",
        "nivel": "Avanzado",
        "duracion": "Un semestre",
        "presupuesto": "Bajo costo",
        "habilidades": [
            "Algoritmos de generación procedural de contenido",
            "Búsqueda de caminos y agentes automáticos de prueba",
            "Desarrollo de herramientas para motores de juego",
            "Diseño de métricas de jugabilidad",
            "Análisis estadístico de contenido generado"
        ],
        "objetivos": [
            "🎯 Objetivo General: Desarrollar un generador procedural de niveles basado en Wave Function Collapse con evaluación automática de jugabilidad integrada al motor Godot.",
            "📌 Objetivos Específicos:",
            "• Implementar el algoritmo Wave Function Collapse con restricciones de adyacencia definidas a partir de niveles de ejemplo.",
            "• Desarrollar un agente de prueba que verifique la completitud de los niveles y calcule al menos cuatro métricas de jugabilidad.",
            "• Generar y analizar 1000 niveles por configuración, alcanzando una tasa de niveles completables superior al 95 %."
        ],
        "pasos": [
            "Análisis de requisitos",
            "Diseño de la solución",
            "Implementación y pruebas",
            "Validación y sustentación"
        ],
        "aplicaciones": [
            "Industria creativa - Estudios de videojuegos"
        ],
        "referencias": [],
        "hardware_tabla": [
            {
                "componente": "Computador de desarrollo",
                "categoria": "Equipo de Cómputo",
                "funcion": "Desarrollo de la herramienta y ejecución de las generaciones masivas."
            }
        ],
        "software_tabla": [
            {
                "herramienta": "Godot Engine 4",
                "tipo": "Motor de Videojuegos",
                "descripcion": "Integración del generador como complemento del editor."
            },
            {
                "herramienta": "GDScript / C#",
                "tipo": "Lenguaje de Programación",
                "descripcion": "Implementación del algoritmo y del agente de prueba."
            },
            {
                "herramienta": "Python con Pandas",
                "tipo": "Análisis de Datos",
                "descripcion": "Procesamiento estadístico de las métricas de los niveles."
            },
            {
                "herramienta": "Jupyter Notebook",
                "tipo": "Entorno de Análisis",
                "descripcion": "Visualización de distribuciones y comparación de configuraciones."
            },
            {
                "herramienta": "Git",
                "tipo": "Control de Versiones",
                "descripcion": "Gestión del código y de los conjuntos de niveles de ejemplo."
            }
        ]
    },
    {
        "id": "proj_106",
        "titulo": "🥽 Proyecto 106: Recorrido de Realidad Virtual de Bajo Costo por el Parque Nacional Natural Puracé para Promoción Ecoturística",
        "descripcion": "Problema: El Parque Nacional Natural Puracé tiene ecosistemas de páramo, volcanes y termales de alto valor, pero los operadores turísticos del Cauca carecen de herramientas inmersivas para promocionarlo en ferias y colegios, y los visitantes llegan sin conocer las normas de cuidado del páramo.\n\nDescripción: Experiencia de realidad virtual para visores tipo cardboard y celulares Android de gama media, construida con fotografías 360°, modelos 3D optimizados y narración, que recorre los principales atractivos del parque e incluye retos interactivos sobre conservación del páramo y comportamiento responsable del visitante.",
        "area": "Desarrollo de Videojuegos",
        "sector": "Turismo - Ecoturismo regional",
        "nivel": "Intermedio-Avanzado",
        "duracion": "Un semestre",
        "presupuesto": "Bajo costo",
        "habilidades": [
            "Desarrollo de experiencias de realidad virtual móvil",
            "Fotografía 360° y modelado 3D optimizado",
            "Optimización de rendimiento en dispositivos de gama media",
            "Diseño de interacción por mirada",
            "Evaluación de presencia y cibermareo"
        ],
        "objetivos": [
            "🎯 Objetivo General: Desarrollar una experiencia de realidad virtual de bajo costo que promocione el Parque Nacional Natural Puracé y eduque sobre la conservación del páramo.",
            "📌 Objetivos Específicos:",
            "• Capturar y procesar al menos ocho escenas 360° de atractivos del parque con información validada por guías locales.",
            "• Lograr un rendimiento estable de al menos 60 cuadros por segundo en un celular Android de gama media.",
            "• Evaluar la experiencia con 30 usuarios mediante los cuestionarios IPQ de presencia y SSQ de cibermareo."
        ],
        "pasos": [
            "Análisis de requisitos",
            "Diseño de la solución",
            "Implementación y pruebas",
            "Validación y sustentación"
        ],
        "aplicaciones": [
            "Turismo - Ecoturismo regional"
        ],
        "referencias": [],
        "hardware_tabla": [
            {
                "componente": "Cámara 360° de consumo",
                "categoria": "Cámara",
                "funcion": "Captura de fotografías y videos esféricos en campo."
            },
            {
                "componente": "Visor de realidad virtual tipo cardboard",
                "categoria": "Dispositivo de Realidad Virtual",
                "funcion": "Visualización inmersiva con el celular del usuario."
            },
            {
                "componente": "Celular Android de gama media",
                "categoria": "Dispositivo de Usuario Final",
                "funcion": "Ejecución de la aplicación y pruebas de rendimiento."
            },
            {
                "componente": "Control Bluetooth para celular",
                "categoria": "Periférico de Entrada",
                "funcion": "Interacción complementaria a la selección por mirada."
            },
            {
                "componente": "Computador de desarrollo",
                "categoria": "Equipo de Cómputo",
                "funcion": "Desarrollo, edición de medios y compilación."
            }
        ],
        "software_tabla": [
            {
                "herramienta": "Unity con XR Interaction Toolkit",
                "tipo": "Motor de Videojuegos",
                "descripcion": "Desarrollo de la experiencia de realidad virtual."
            },
            {
                "herramienta": "Google Cardboard XR Plugin",
                "tipo": "SDK de Realidad Virtual",
                "descripcion": "Soporte de visores de bajo costo en Android."
            },
            {
                "herramienta": "Blender",
                "tipo": "Modelado 3D",
                "descripcion": "Creación y optimización de modelos de flora y paisaje."
            },
            {
                "herramienta": "Hugin",
                "tipo": "Procesamiento de Imágenes",
                "descripcion": "Unión y corrección de panorámicas 360°."
            },
            {
                "herramienta": "Unity Profiler",
                "tipo": "Herramienta de Rendimiento",
                "descripcion": "Medición de cuadros por segundo y uso de memoria."
            }
        ]
    },
    {
        "id": "proj_107",
        "titulo": "🤝 Proyecto 107: Juego Multijugador Cooperativo en Red Local para la Enseñanza de Fracciones en Escuelas Rurales",
        "descripcion": "Problema: Las escuelas rurales del Cauca tienen computadores o tabletas pero no cuentan con internet estable, por lo que no pueden usar plataformas educativas en línea; además, los estudiantes de primaria presentan bajos resultados en fracciones y trabajan de forma aislada.\n\nDescripción: Videojuego multijugador cooperativo en el que grupos de cuatro estudiantes deben combinar fracciones para resolver retos compartidos. Funciona sin internet mediante una Raspberry Pi que actúa como punto de acceso y servidor del juego en el aula, y registra el desempeño de cada grupo para el docente.",
        "area": "Desarrollo de Videojuegos",
        "sector": "Educación básica - Escuelas rurales",
        "nivel": "Intermedio-Avanzado",
        "duracion": "Un semestre",
        "presupuesto": "Bajo costo",
        "habilidades": [
            "Programación de juegos multijugador en red",
            "Arquitectura cliente-servidor con servidor autoritativo",
            "Configuración de Raspberry Pi como punto de acceso",
            "Diseño de mecánicas de aprendizaje colaborativo",
            "Medición de latencia y sincronización de estado"
        ],
        "objetivos": [
            "🎯 Objetivo General: Desarrollar un juego multijugador cooperativo que funcione en red local sin internet para fortalecer el aprendizaje de fracciones en escuelas rurales.",
            "📌 Objetivos Específicos:",
            "• Implementar un servidor de juego en Raspberry Pi que soporte al menos 24 clientes simultáneos con latencia menor a 100 ms.",
            "• Diseñar doce retos cooperativos en los que la solución requiera el aporte de todos los integrantes del grupo.",
            "• Medir el desempeño en una prueba de fracciones antes y después de cuatro sesiones de juego en una escuela rural."
        ],
        "pasos": [
            "Análisis de requisitos",
            "Diseño de la solución",
            "Implementación y pruebas",
            "Validación y sustentación"
        ],
        "aplicaciones": [
            "Educación básica - Escuelas rurales"
        ],
        "referencias": [],
        "hardware_tabla": [
            {
                "componente": "Raspberry Pi 4 (4 GB)",
                "categoria": "Computador de Placa Única",
                "funcion": "Servidor del juego y punto de acceso Wi-Fi del aula."
            },
            {
                "componente": "Router Wi-Fi de bajo costo",
                "categoria": "Equipo de Red",
                "funcion": "Amplía la cobertura cuando el aula tiene muchos clientes."
            },
            {
                "componente": "Tabletas Android o computadores del aula",
                "categoria": "Dispositivo de Usuario Final",
                "funcion": "Clientes del juego para los estudiantes."
            },
            {
                "componente": "Batería portátil (power bank) de 20000 mAh",
                "categoria": "Fuente de Alimentación / Energía",
                "funcion": "Alimenta el servidor en sedes con cortes de energía."
            }
        ],
        "software_tabla": [
            {
                "herramienta": "Godot Engine 4 (High-level Multiplayer)",
                "tipo": "Motor de Videojuegos",
                "descripcion": "Desarrollo del juego y sincronización en red."
            },
            {
                "herramienta": "Raspberry Pi OS Lite",
                "tipo": "Sistema Operativo",
                "descripcion": "Base del servidor dedicado sin interfaz gráfica."
            },
            {
                "herramienta": "hostapd y dnsmasq",
                "tipo": "Servicios de Red",
                "descripcion": "Configuración del punto de acceso y asignación de direcciones."
            },
            {
                "herramienta": "SQLite",
                "tipo": "Base de Datos",
                "descripcion": "Registro del desempeño por grupo y sesión."
            },
            {
                "herramienta": "Wireshark",
                "tipo": "Analizador de Red",
                "descripcion": "Medición de latencia y tráfico del juego."
            }
        ]
    },
    {
        "id": "proj_108",
        "titulo": "📈 Proyecto 108: Plataforma de Telemetría y Analítica de Jugadores para Medir el Aprendizaje en Videojuegos Serios",
        "descripcion": "Problema: Los videojuegos serios desarrollados en universidades suelen evaluarse solo con encuestas al final, sin evidencia de cómo juega y aprende cada estudiante; los docentes y desarrolladores no saben en qué nivel se estancan los jugadores ni qué mecánicas generan aprendizaje real.\n\nDescripción: Plataforma de telemetría reutilizable que captura eventos de juego en formato estándar xAPI desde un SDK ligero para Godot y Unity, los almacena en un servidor de bajo costo y presenta tableros con embudos de progreso, tiempos por nivel, patrones de error e indicadores de aprendizaje asociados a las mecánicas del juego.",
        "area": "Desarrollo de Videojuegos",
        "sector": "Educación superior - Analítica de aprendizaje",
        "nivel": "Avanzado",
        "duracion": "Un semestre",
        "presupuesto": "Bajo costo",
        "habilidades": [
            "Analítica de jugadores y telemetría de videojuegos",
            "Estándares de interoperabilidad educativa xAPI",
            "Desarrollo de SDK para motores de juego",
            "Diseño de bases de datos de eventos",
            "Visualización de datos y tableros"
        ],
        "objetivos": [
            "🎯 Objetivo General: Desarrollar una plataforma de telemetría y analítica que permita medir el comportamiento y el aprendizaje de los jugadores en videojuegos serios.",
            "📌 Objetivos Específicos:",
            "• Implementar un SDK para Godot y Unity que envíe eventos xAPI con almacenamiento local cuando no haya conexión.",
            "• Construir tableros con al menos cinco indicadores de progreso, dificultad y aprendizaje por nivel.",
            "• Validar la plataforma integrándola en un videojuego serio existente y analizando las sesiones de al menos 40 jugadores."
        ],
        "pasos": [
            "Análisis de requisitos",
            "Diseño de la solución",
            "Implementación y pruebas",
            "Validación y sustentación"
        ],
        "aplicaciones": [
            "Educación superior - Analítica de aprendizaje"
        ],
        "referencias": [],
        "hardware_tabla": [
            {
                "componente": "Raspberry Pi 5 o computador reutilizado",
                "categoria": "Servidor",
                "funcion": "Aloja el receptor de eventos, la base de datos y los tableros."
            },
            {
                "componente": "Disco SSD externo de 256 GB",
                "categoria": "Almacenamiento",
                "funcion": "Almacenamiento persistente de los eventos de juego."
            },
            {
                "componente": "Computador de desarrollo",
                "categoria": "Equipo de Cómputo",
                "funcion": "Desarrollo del SDK y del videojuego de prueba."
            }
        ],
        "software_tabla": [
            {
                "herramienta": "FastAPI",
                "tipo": "Framework Web / API",
                "descripcion": "Servicio receptor de declaraciones xAPI."
            },
            {
                "herramienta": "PostgreSQL",
                "tipo": "Base de Datos",
                "descripcion": "Almacenamiento estructurado de eventos y sesiones."
            },
            {
                "herramienta": "Grafana",
                "tipo": "Visualización / Dashboard",
                "descripcion": "Tableros de progreso y dificultad por nivel."
            },
            {
                "herramienta": "Godot Engine 4 y Unity",
                "tipo": "Motor de Videojuegos",
                "descripcion": "Integración del SDK de telemetría."
            },
            {
                "herramienta": "Docker",
                "tipo": "Contenedores",
                "descripcion": "Despliegue reproducible de la plataforma."
            }
        ]
    },
    {
        "id": "proj_109",
        "titulo": "☕ Proyecto 109: Simulador Gamificado de Gestión de una Finca Cafetera Caucana ante Plagas y Variabilidad Climática",
        "descripcion": "Problema: Los jóvenes de familias caficultoras del Cauca y los estudiantes de programas técnicos agropecuarios tienen pocas oportunidades de practicar decisiones de manejo de una finca, como el control de la broca, la renovación de cafetales o la poscosecha, sin arriesgar cosechas e ingresos reales.\n\nDescripción: Simulador de gestión por turnos en el que el jugador administra una finca cafetera durante varios años, tomando decisiones de siembra, fertilización, manejo integrado de la broca y la roya, recolección y beneficio, frente a eventos climáticos y de precios basados en datos regionales, con retroalimentación sobre productividad, calidad de taza y sostenibilidad.",
        "area": "Desarrollo de Videojuegos",
        "sector": "Agro - Caficultura",
        "nivel": "Intermedio",
        "duracion": "Un semestre",
        "presupuesto": "Bajo costo",
        "habilidades": [
            "Diseño de simulaciones y juegos de gestión",
            "Modelado de sistemas productivos agrícolas",
            "Balance de economía de juego",
            "Trabajo con expertos del dominio",
            "Desarrollo multiplataforma para web y Android"
        ],
        "objetivos": [
            "🎯 Objetivo General: Desarrollar un simulador gamificado que permita practicar decisiones de manejo de una finca cafetera caucana frente a plagas, clima y mercado.",
            "📌 Objetivos Específicos:",
            "• Construir un modelo simplificado de producción de café con al menos seis variables validadas con técnicos o caficultores de la región.",
            "• Implementar diez eventos de plagas, clima y precios que exijan decisiones con consecuencias medibles en el juego.",
            "• Evaluar con 20 jóvenes del sector rural la comprensión de prácticas de manejo integrado mediante un cuestionario antes y después de jugar."
        ],
        "pasos": [
            "Análisis de requisitos",
            "Diseño de la solución",
            "Implementación y pruebas",
            "Validación y sustentación"
        ],
        "aplicaciones": [
            "Agro - Caficultura"
        ],
        "referencias": [],
        "hardware_tabla": [
            {
                "componente": "Computador de desarrollo",
                "categoria": "Equipo de Cómputo",
                "funcion": "Desarrollo del simulador y del modelo productivo."
            },
            {
                "componente": "Celular Android de gama baja",
                "categoria": "Dispositivo de Usuario Final",
                "funcion": "Pruebas de rendimiento en los dispositivos que usan los jóvenes rurales."
            }
        ],
        "software_tabla": [
            {
                "herramienta": "Godot Engine 4",
                "tipo": "Motor de Videojuegos",
                "descripcion": "Desarrollo del simulador y exportación a web y Android."
            },
            {
                "herramienta": "Python con NumPy",
                "tipo": "Lenguaje de Programación / Simulación",
                "descripcion": "Prototipado y balance del modelo de producción."
            },
            {
                "herramienta": "Machinations",
                "tipo": "Herramienta de Diseño de Juegos",
                "descripcion": "Modelado visual de la economía del juego."
            },
            {
                "herramienta": "Krita",
                "tipo": "Herramienta de Arte Digital",
                "descripcion": "Ilustración de escenarios y elementos de la finca."
            }
        ]
    },
    {
        "id": "proj_110",
        "titulo": "💓 Proyecto 110: Ajuste Dinámico de Dificultad en Videojuegos a partir de Señales Fisiológicas del Jugador",
        "descripcion": "Problema: Cuando un videojuego es demasiado fácil los jugadores se aburren y cuando es demasiado difícil se frustran y abandonan; las curvas de dificultad fijas no se adaptan a cada persona, y los ajustes basados solo en aciertos y errores reaccionan tarde al estado emocional del jugador.\n\nDescripción: Sistema de ajuste dinámico de dificultad que estima el nivel de activación del jugador a partir de la frecuencia cardíaca y la actividad electrodérmica capturadas con sensores de bajo costo conectados a un ESP32, y modifica en tiempo real parámetros del juego para mantenerlo en un estado de flujo. Se compara experimentalmente con una versión de dificultad fija.",
        "area": "Desarrollo de Videojuegos",
        "sector": "Investigación - Experiencia de usuario en videojuegos",
        "nivel": "Avanzado",
        "duracion": "Un semestre",
        "presupuesto": "Bajo costo",
        "habilidades": [
            "Computación afectiva aplicada a videojuegos",
            "Adquisición y filtrado de señales fisiológicas",
            "Diseño de algoritmos de ajuste dinámico de dificultad",
            "Diseño experimental con participantes",
            "Análisis estadístico de experiencia de juego"
        ],
        "objetivos": [
            "🎯 Objetivo General: Desarrollar y evaluar un sistema de ajuste dinámico de dificultad basado en señales fisiológicas que mejore la experiencia de juego frente a una dificultad fija.",
            "📌 Objetivos Específicos:",
            "• Adquirir frecuencia cardíaca y actividad electrodérmica con una frecuencia de muestreo mínima de 50 Hz y transmitirlas al juego con latencia menor a 200 ms.",
            "• Implementar un controlador de dificultad que ajuste al menos tres parámetros del juego según el nivel de activación estimado.",
            "• Comparar con al menos 20 participantes la versión adaptativa y la fija mediante el Game Experience Questionnaire y el tiempo de permanencia."
        ],
        "pasos": [
            "Análisis de requisitos",
            "Diseño de la solución",
            "Implementación y pruebas",
            "Validación y sustentación"
        ],
        "aplicaciones": [
            "Investigación - Experiencia de usuario en videojuegos"
        ],
        "referencias": [],
        "hardware_tabla": [
            {
                "componente": "ESP32",
                "categoria": "Microcontrolador",
                "funcion": "Adquiere las señales fisiológicas y las envía al juego por Wi-Fi."
            },
            {
                "componente": "Sensor de pulso MAX30102",
                "categoria": "Sensor Biomédico",
                "funcion": "Mide la frecuencia cardíaca del jugador."
            },
            {
                "componente": "Sensor de respuesta galvánica de la piel Grove GSR",
                "categoria": "Sensor Biomédico",
                "funcion": "Mide la actividad electrodérmica asociada a la activación emocional."
            },
            {
                "componente": "Correa de dedo y estuche impreso en 3D",
                "categoria": "Estructura / Componente Mecánico",
                "funcion": "Fija los sensores sin interferir con el uso del control."
            },
            {
                "componente": "Computador de desarrollo con control de juego",
                "categoria": "Equipo de Cómputo",
                "funcion": "Ejecuta el videojuego durante los experimentos."
            }
        ],
        "software_tabla": [
            {
                "herramienta": "Unreal Engine 5",
                "tipo": "Motor de Videojuegos",
                "descripcion": "Desarrollo del juego de prueba con parámetros de dificultad expuestos."
            },
            {
                "herramienta": "UDP / OSC",
                "tipo": "Protocolo de Comunicación",
                "descripcion": "Envío de señales del ESP32 al juego con baja latencia."
            },
            {
                "herramienta": "Python con SciPy y NeuroKit2",
                "tipo": "Procesamiento de Señales",
                "descripcion": "Filtrado y extracción de características fisiológicas."
            },
            {
                "herramienta": "R / JASP",
                "tipo": "Análisis Estadístico",
                "descripcion": "Comparación estadística entre las condiciones experimentales."
            }
        ]
    }
];
