// Projects for the area "Robótica" (proj_201–proj_210). Each entry follows the schema checked by scripts/projects-validation.mjs.
export default [
    {
        "id": "proj_201",
        "titulo": "🦾 Proyecto 201: Brazo Robótico de Seis Grados de Libertad con Visión Artificial para Clasificación de Frutos por Madurez",
        "descripcion": "Problema: Las pequeñas asociaciones de productores de lulo y tomate de árbol del Cauca clasifican la fruta a mano antes de venderla; la clasificación es lenta, inconsistente entre operarios y provoca rechazos y menores precios cuando los lotes llegan mezclados a los centros de acopio.\n\nDescripción: Brazo robótico de seis grados de libertad impreso en 3D y accionado por servomotores, guiado por una cámara cenital y un modelo de detección que identifica la posición y el estado de madurez de cada fruto. El sistema calcula la cinemática inversa, planifica la trayectoria de agarre y deposita cada fruto en la canasta correspondiente, registrando tiempos y aciertos para evaluar su desempeño frente a la clasificación manual.",
        "area": "Robótica",
        "sector": "Agroindustria - Poscosecha de frutas",
        "nivel": "Avanzado",
        "duracion": "Un semestre",
        "presupuesto": "Bajo costo",
        "habilidades": [
            "Cinemática directa e inversa de manipuladores",
            "Planificación de trayectorias de agarre",
            "Detección de objetos con redes neuronales",
            "Calibración cámara-robot (mano-ojo)",
            "Diseño mecánico para impresión 3D"
        ],
        "objetivos": [
            "🎯 Objetivo General: Desarrollar un brazo robótico de seis grados de libertad guiado por visión artificial que clasifique frutos según su estado de madurez en un puesto de poscosecha a pequeña escala.",
            "📌 Objetivos Específicos:",
            "• Entrenar un modelo de detección que identifique al menos tres estados de madurez con una precisión mayor al 85 % en imágenes tomadas en el laboratorio.",
            "• Implementar la cinemática inversa y la calibración cámara-robot para alcanzar un error de posicionamiento menor a 10 mm sobre la mesa de trabajo.",
            "• Comparar la tasa de aciertos y el tiempo por fruto del brazo frente a la clasificación manual en una prueba con al menos 100 frutos."
        ],
        "pasos": [
            "Análisis de requisitos",
            "Diseño de la solución",
            "Implementación y pruebas",
            "Validación y sustentación"
        ],
        "aplicaciones": [
            "Agroindustria - Poscosecha de frutas"
        ],
        "referencias": [],
        "hardware_tabla": [
            {
                "componente": "Raspberry Pi 5 (8 GB)",
                "categoria": "Computador de Placa Única (SBC)",
                "funcion": "Ejecuta el modelo de visión, la cinemática inversa y la lógica de clasificación."
            },
            {
                "componente": "Cámara Raspberry Pi Camera Module 3",
                "categoria": "Sensor de Visión",
                "funcion": "Captura la vista cenital de la mesa de trabajo para localizar y clasificar los frutos."
            },
            {
                "componente": "Servomotores de alto torque DS3218 y MG996R",
                "categoria": "Actuador",
                "funcion": "Mueven las seis articulaciones del brazo y la pinza."
            },
            {
                "componente": "Controlador PWM PCA9685 de 16 canales",
                "categoria": "Controlador de Actuadores",
                "funcion": "Genera las señales PWM de los servomotores a partir de comandos I2C."
            },
            {
                "componente": "Fuente conmutada de 6 V y 10 A",
                "categoria": "Fuente de Alimentación / Energía",
                "funcion": "Suministra la corriente de pico que demandan los servomotores."
            },
            {
                "componente": "Estructura del brazo y pinza impresas en 3D (PETG)",
                "categoria": "Estructura / Componente Mecánico",
                "funcion": "Conforma los eslabones, la base giratoria y el efector final con dedos blandos."
            }
        ],
        "software_tabla": [
            {
                "herramienta": "Ultralytics YOLOv8",
                "tipo": "Visión Artificial / Deep Learning",
                "descripcion": "Para detectar frutos y clasificar su estado de madurez."
            },
            {
                "herramienta": "OpenCV",
                "tipo": "Visión Artificial",
                "descripcion": "Para la calibración de la cámara y la transformación a coordenadas del robot."
            },
            {
                "herramienta": "ikpy",
                "tipo": "Librería de Robótica",
                "descripcion": "Para resolver la cinemática inversa a partir del modelo URDF del brazo."
            },
            {
                "herramienta": "Python",
                "tipo": "Lenguaje de Programación",
                "descripcion": "Para integrar visión, planificación y control de los servomotores."
            },
            {
                "herramienta": "FreeCAD",
                "tipo": "Diseño Asistido por Computador (CAD)",
                "descripcion": "Para modelar los eslabones y exportar las piezas a impresión 3D."
            }
        ]
    },
    {
        "id": "proj_202",
        "titulo": "🤖 Proyecto 202: Robot Móvil Autónomo con ROS 2 y SLAM para Mapeo e Inventario de Laboratorios",
        "descripcion": "Problema: Los laboratorios universitarios cambian con frecuencia la disposición de mesas y equipos, y los inventarios se hacen a mano una o dos veces al año; los planos quedan desactualizados y los equipos extraviados o fuera de lugar se detectan tarde.\n\nDescripción: Robot móvil diferencial basado en ROS 2 que construye mapas 2D de los laboratorios mediante SLAM con un LiDAR de bajo costo, navega de forma autónoma entre puntos de interés y lee etiquetas QR pegadas en los equipos para generar un inventario georreferenciado sobre el mapa, comparable entre recorridos sucesivos.",
        "area": "Robótica",
        "sector": "Educación superior - Gestión de laboratorios",
        "nivel": "Intermedio-Avanzado",
        "duracion": "Un semestre",
        "presupuesto": "Bajo costo",
        "habilidades": [
            "Arquitectura de software robótico con ROS 2",
            "Localización y mapeo simultáneos (SLAM)",
            "Navegación autónoma con Nav2",
            "Odometría con encoders e IMU",
            "Integración de microcontroladores con micro-ROS"
        ],
        "objetivos": [
            "🎯 Objetivo General: Construir un robot móvil autónomo con ROS 2 que mapee los laboratorios mediante SLAM y genere un inventario de equipos ubicado sobre el mapa.",
            "📌 Objetivos Específicos:",
            "• Generar mapas 2D de al menos dos laboratorios con un error de dimensiones menor al 5 % respecto a las medidas tomadas con cinta métrica.",
            "• Lograr que el robot alcance de forma autónoma al menos el 90 % de los puntos de interés definidos sin colisiones.",
            "• Registrar la posición de los equipos etiquetados con QR y medir el porcentaje de equipos detectados por recorrido frente al inventario manual."
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
                "componente": "Raspberry Pi 4 (4 GB)",
                "categoria": "Computador de Placa Única (SBC)",
                "funcion": "Ejecuta ROS 2, el SLAM y la pila de navegación."
            },
            {
                "componente": "LiDAR 2D RPLIDAR A1",
                "categoria": "Sensor de Distancia",
                "funcion": "Escanea el entorno en 360° para construir el mapa y evitar obstáculos."
            },
            {
                "componente": "ESP32 DevKit",
                "categoria": "Microcontrolador",
                "funcion": "Lee los encoders, controla los motores y publica la odometría mediante micro-ROS."
            },
            {
                "componente": "Motorreductores JGB37-520 con encoder y driver TB6612FNG",
                "categoria": "Actuador",
                "funcion": "Proporcionan la tracción diferencial y la medición de giro de las ruedas."
            },
            {
                "componente": "IMU BNO055",
                "categoria": "Sensor Inercial",
                "funcion": "Corrige la orientación estimada por la odometría de ruedas."
            },
            {
                "componente": "Cámara USB 1080p",
                "categoria": "Sensor de Visión",
                "funcion": "Lee las etiquetas QR de los equipos durante el recorrido."
            },
            {
                "componente": "Batería LiPo 3S 5000 mAh con regulador reductor",
                "categoria": "Fuente de Alimentación / Energía",
                "funcion": "Alimenta motores y electrónica durante recorridos de al menos una hora."
            }
        ],
        "software_tabla": [
            {
                "herramienta": "ROS 2 Humble",
                "tipo": "Framework de Robótica",
                "descripcion": "Para la comunicación entre nodos de sensores, control y navegación."
            },
            {
                "herramienta": "slam_toolbox",
                "tipo": "Librería de Robótica",
                "descripcion": "Para construir y guardar los mapas de los laboratorios."
            },
            {
                "herramienta": "Nav2",
                "tipo": "Librería de Robótica",
                "descripcion": "Para la planificación de rutas y la evasión de obstáculos."
            },
            {
                "herramienta": "micro-ROS",
                "tipo": "Firmware / Sistema Embebido",
                "descripcion": "Para integrar el ESP32 como nodo de ROS 2."
            },
            {
                "herramienta": "RViz2 y Gazebo",
                "tipo": "Simulación / Visualización",
                "descripcion": "Para probar la navegación en simulación y visualizar mapas y trayectorias."
            }
        ]
    },
    {
        "id": "proj_203",
        "titulo": "🌱 Proyecto 203: Robot Terrestre Seguidor de Hileras para Monitoreo Fitosanitario de Cultivos de Fresa bajo Invernadero",
        "descripcion": "Problema: Los productores de fresa bajo invernadero de la meseta de Popayán revisan las plantas a pie para detectar hongos como la botritis; la inspección es irregular, depende de la experiencia del trabajador y los focos de enfermedad se descubren cuando ya han afectado varias camas.\n\nDescripción: Robot terrestre de cuatro ruedas que recorre los pasillos del invernadero siguiendo las hileras mediante visión artificial y sensores de distancia, toma fotografías georreferenciadas de las plantas a intervalos fijos y registra temperatura y humedad relativa, generando un mapa por cama que permite priorizar la inspección del agrónomo.",
        "area": "Robótica",
        "sector": "Agricultura - Cultivos bajo invernadero",
        "nivel": "Intermedio-Avanzado",
        "duracion": "Un semestre",
        "presupuesto": "Bajo costo",
        "habilidades": [
            "Seguimiento de hileras con visión artificial",
            "Control PID de robots móviles",
            "Fusión de sensores de distancia y visión",
            "Diseño de robots para entornos agrícolas",
            "Georreferenciación de datos de campo"
        ],
        "objetivos": [
            "🎯 Objetivo General: Desarrollar un robot terrestre que recorra de forma autónoma las hileras de un cultivo de fresa bajo invernadero y registre imágenes y variables ambientales para el monitoreo fitosanitario.",
            "📌 Objetivos Específicos:",
            "• Implementar un controlador de seguimiento de hileras que mantenga una desviación lateral menor a 5 cm en pasillos de al menos 20 m.",
            "• Capturar imágenes y datos de temperatura y humedad asociados a la posición de cada planta con una cobertura mayor al 95 % de la cama recorrida.",
            "• Evaluar en un invernadero real el tiempo de inspección por cama del robot frente a la inspección manual."
        ],
        "pasos": [
            "Análisis de requisitos",
            "Diseño de la solución",
            "Implementación y pruebas",
            "Validación y sustentación"
        ],
        "aplicaciones": [
            "Agricultura - Cultivos bajo invernadero"
        ],
        "referencias": [],
        "hardware_tabla": [
            {
                "componente": "Raspberry Pi 4 (4 GB)",
                "categoria": "Computador de Placa Única (SBC)",
                "funcion": "Procesa las imágenes, calcula la desviación respecto a la hilera y guarda los registros."
            },
            {
                "componente": "Cámara USB gran angular",
                "categoria": "Sensor de Visión",
                "funcion": "Observa el pasillo y las camas para el seguimiento y el registro fotográfico."
            },
            {
                "componente": "Sensores de distancia ToF VL53L1X",
                "categoria": "Sensor de Distancia",
                "funcion": "Miden la separación lateral respecto a las camas de cultivo."
            },
            {
                "componente": "Chasis 4WD con motores DC de 12 V y driver BTS7960",
                "categoria": "Actuador",
                "funcion": "Proporcionan la tracción en suelo de tierra y el control de velocidad."
            },
            {
                "componente": "Sensor de temperatura y humedad SHT31",
                "categoria": "Sensor Ambiental",
                "funcion": "Registra el microclima de cada cama durante el recorrido."
            },
            {
                "componente": "Batería LiPo 3S con módulo de protección",
                "categoria": "Fuente de Alimentación / Energía",
                "funcion": "Suministra energía al robot durante el recorrido completo del invernadero."
            }
        ],
        "software_tabla": [
            {
                "herramienta": "OpenCV",
                "tipo": "Visión Artificial",
                "descripcion": "Para segmentar el pasillo y estimar la línea central de la hilera."
            },
            {
                "herramienta": "Python",
                "tipo": "Lenguaje de Programación",
                "descripcion": "Para el control PID, la lectura de sensores y el registro de datos."
            },
            {
                "herramienta": "SQLite",
                "tipo": "Base de Datos",
                "descripcion": "Para almacenar imágenes y mediciones asociadas a cada posición."
            },
            {
                "herramienta": "Grafana",
                "tipo": "Visualización / Dashboard",
                "descripcion": "Para el mapa por cama y las series de temperatura y humedad."
            }
        ]
    },
    {
        "id": "proj_204",
        "titulo": "✋ Proyecto 204: Mano Robótica Antropomórfica Teleoperada mediante Guante con Sensores de Flexión",
        "descripcion": "Problema: En los laboratorios de química y biología, la manipulación de reactivos corrosivos o muestras contaminadas expone a estudiantes y auxiliares a salpicaduras y contacto directo, y las pinzas convencionales no permiten movimientos finos como girar una tapa o sostener un tubo de ensayo.\n\nDescripción: Mano robótica de cinco dedos accionada por tendones y servomotores, que replica en tiempo real los movimientos de la mano del operador capturados por un guante con sensores de flexión y una unidad inercial. La comunicación inalámbrica entre guante y mano permite operar detrás de una barrera de protección y medir la latencia y la precisión de la réplica de gestos.",
        "area": "Robótica",
        "sector": "Seguridad laboral - Manipulación remota de sustancias peligrosas",
        "nivel": "Intermedio",
        "duracion": "Un semestre",
        "presupuesto": "Bajo costo",
        "habilidades": [
            "Diseño de manos robóticas accionadas por tendones",
            "Instrumentación con sensores de flexión e IMU",
            "Teleoperación inalámbrica de baja latencia",
            "Calibración y mapeo de gestos",
            "Impresión 3D de mecanismos"
        ],
        "objetivos": [
            "🎯 Objetivo General: Desarrollar una mano robótica antropomórfica teleoperada por un guante sensorizado que permita manipular objetos de laboratorio a distancia.",
            "📌 Objetivos Específicos:",
            "• Calibrar el guante para que el ángulo de cada dedo replicado tenga un error medio menor a 10° respecto al del operador.",
            "• Mantener una latencia extremo a extremo menor a 100 ms en la comunicación inalámbrica entre guante y mano.",
            "• Evaluar con al menos 10 usuarios la tasa de éxito en tareas de agarre de tubos de ensayo, frascos y pipetas plásticas."
        ],
        "pasos": [
            "Análisis de requisitos",
            "Diseño de la solución",
            "Implementación y pruebas",
            "Validación y sustentación"
        ],
        "aplicaciones": [
            "Seguridad laboral - Manipulación remota de sustancias peligrosas"
        ],
        "referencias": [],
        "hardware_tabla": [
            {
                "componente": "ESP32 DevKit (dos unidades)",
                "categoria": "Microcontrolador",
                "funcion": "Uno lee el guante y otro controla los servomotores de la mano."
            },
            {
                "componente": "Sensores de flexión de 2,2 pulgadas",
                "categoria": "Sensor de Posición",
                "funcion": "Miden la flexión de cada dedo del operador."
            },
            {
                "componente": "IMU MPU6050",
                "categoria": "Sensor Inercial",
                "funcion": "Registra la rotación de la muñeca del operador."
            },
            {
                "componente": "Servomotores MG90S de engranaje metálico",
                "categoria": "Actuador",
                "funcion": "Tensan los tendones que flexionan cada dedo y giran la muñeca."
            },
            {
                "componente": "Mano impresa en 3D en PLA con tendones de nylon",
                "categoria": "Estructura / Componente Mecánico",
                "funcion": "Reproduce la anatomía de los dedos y transmite el movimiento de los servos."
            },
            {
                "componente": "Batería LiPo 1S con módulo de carga TP4056",
                "categoria": "Fuente de Alimentación / Energía",
                "funcion": "Alimenta el guante de forma inalámbrica."
            }
        ],
        "software_tabla": [
            {
                "herramienta": "PlatformIO",
                "tipo": "Entorno de Desarrollo",
                "descripcion": "Para programar y depurar el firmware del guante y de la mano."
            },
            {
                "herramienta": "ESP-NOW",
                "tipo": "Protocolo de Comunicación",
                "descripcion": "Para la transmisión inalámbrica de baja latencia entre ambos ESP32."
            },
            {
                "herramienta": "Python con Matplotlib",
                "tipo": "Análisis de Datos",
                "descripcion": "Para analizar latencias y errores angulares registrados en las pruebas."
            },
            {
                "herramienta": "FreeCAD",
                "tipo": "Diseño Asistido por Computador (CAD)",
                "descripcion": "Para adaptar el diseño de los dedos y la palma a los servos utilizados."
            }
        ]
    },
    {
        "id": "proj_205",
        "titulo": "🐝 Proyecto 205: Enjambre de Microrobots de Bajo Costo para la Enseñanza de Algoritmos Distribuidos",
        "descripcion": "Problema: Los colegios y programas de ingeniería de la región enseñan algoritmos distribuidos y comportamiento colectivo solo en simulación, porque las plataformas comerciales de robótica de enjambre cuestan varios millones de pesos por unidad; los estudiantes no experimentan los efectos reales del ruido, las fallas y la comunicación limitada.\n\nDescripción: Enjambre de al menos ocho microrobots diferenciales basados en ESP32-C3, localizados por una cámara cenital mediante marcadores ArUco y coordinados por comunicación inalámbrica. La plataforma incluye una librería sencilla y guías de práctica para implementar agregación, formación, dispersión y búsqueda colectiva, y mide el desempeño de cada algoritmo en el escenario físico.",
        "area": "Robótica",
        "sector": "Educación - Formación STEM en colegios",
        "nivel": "Intermedio",
        "duracion": "Un semestre",
        "presupuesto": "Bajo costo",
        "habilidades": [
            "Robótica de enjambre y comportamiento colectivo",
            "Algoritmos distribuidos de consenso y formación",
            "Localización con marcadores fiduciales",
            "Diseño de microrobots de bajo costo",
            "Diseño de prácticas de laboratorio"
        ],
        "objetivos": [
            "🎯 Objetivo General: Construir un enjambre de microrobots de bajo costo y su material didáctico para que estudiantes experimenten algoritmos distribuidos en un escenario físico.",
            "📌 Objetivos Específicos:",
            "• Fabricar al menos ocho microrobots con un costo unitario menor a 150 000 pesos colombianos.",
            "• Implementar los comportamientos de agregación, formación en línea y dispersión, midiendo el tiempo de convergencia de cada uno en 10 ensayos.",
            "• Aplicar tres guías de práctica con un grupo de estudiantes y evaluar la comprensión de los conceptos mediante pruebas antes y después."
        ],
        "pasos": [
            "Análisis de requisitos",
            "Diseño de la solución",
            "Implementación y pruebas",
            "Validación y sustentación"
        ],
        "aplicaciones": [
            "Educación - Formación STEM en colegios"
        ],
        "referencias": [],
        "hardware_tabla": [
            {
                "componente": "ESP32-C3 Super Mini",
                "categoria": "Microcontrolador",
                "funcion": "Controla los motores y la comunicación de cada microrobot."
            },
            {
                "componente": "Micromotores N20 con encoder y driver DRV8833",
                "categoria": "Actuador",
                "funcion": "Proporcionan la locomoción diferencial de cada robot."
            },
            {
                "componente": "Sensores infrarrojos de proximidad TCRT5000",
                "categoria": "Sensor de Distancia",
                "funcion": "Detectan vecinos y bordes de la arena a corta distancia."
            },
            {
                "componente": "Batería LiPo 1S de 500 mAh",
                "categoria": "Fuente de Alimentación / Energía",
                "funcion": "Alimenta cada microrobot durante una sesión de práctica."
            },
            {
                "componente": "Cámara web cenital 1080p",
                "categoria": "Sensor de Visión",
                "funcion": "Localiza los robots en la arena mediante marcadores ArUco."
            },
            {
                "componente": "Computador de desarrollo",
                "categoria": "Computador / Estación de Trabajo",
                "funcion": "Ejecuta el servidor de localización y la interfaz de las prácticas."
            }
        ],
        "software_tabla": [
            {
                "herramienta": "MicroPython",
                "tipo": "Firmware / Sistema Embebido",
                "descripcion": "Para que los estudiantes programen comportamientos con una sintaxis sencilla."
            },
            {
                "herramienta": "OpenCV (módulo ArUco)",
                "tipo": "Visión Artificial",
                "descripcion": "Para estimar posición y orientación de cada robot."
            },
            {
                "herramienta": "ESP-NOW",
                "tipo": "Protocolo de Comunicación",
                "descripcion": "Para el intercambio de mensajes entre robots vecinos."
            },
            {
                "herramienta": "Python",
                "tipo": "Lenguaje de Programación",
                "descripcion": "Para el servidor de localización, la librería del enjambre y el análisis de resultados."
            }
        ]
    },
    {
        "id": "proj_206",
        "titulo": "🐕 Proyecto 206: Robot Cuadrúpedo de Bajo Costo con Control de Marcha Adaptativa para Terrenos Irregulares",
        "descripcion": "Problema: Las labores de inspección tras deslizamientos y crecientes en zonas rurales del Cauca se realizan en terrenos con escombros, piedras y pendientes donde los robots con ruedas se atascan, mientras que los robots con patas comerciales son inaccesibles para grupos de investigación regionales por su costo.\n\nDescripción: Robot cuadrúpedo de doce grados de libertad construido con servomotores e impresión 3D, que estima su inclinación con una unidad inercial y detecta el contacto de cada pata para ajustar la altura del paso y la postura del cuerpo. Los patrones de marcha se diseñan y ajustan primero en simulación y luego se comparan en una pista de obstáculos física.",
        "area": "Robótica",
        "sector": "Gestión del riesgo - Inspección en terrenos irregulares",
        "nivel": "Avanzado",
        "duracion": "Un semestre",
        "presupuesto": "Bajo costo",
        "habilidades": [
            "Cinemática de robots con patas",
            "Generación de patrones de marcha",
            "Control de estabilidad con realimentación inercial",
            "Simulación física de robots",
            "Diseño mecánico de articulaciones"
        ],
        "objetivos": [
            "🎯 Objetivo General: Desarrollar un robot cuadrúpedo de bajo costo con control de marcha adaptativa que se desplace de forma estable sobre terrenos irregulares.",
            "📌 Objetivos Específicos:",
            "• Implementar la cinemática inversa de las patas y una marcha de trote validada primero en simulación.",
            "• Incorporar realimentación de la IMU y de los sensores de contacto para mantener la inclinación del cuerpo por debajo de 10° en pendientes de hasta 15°.",
            "• Comparar la tasa de éxito y la velocidad de la marcha adaptativa frente a la marcha fija en una pista con al menos tres tipos de obstáculo."
        ],
        "pasos": [
            "Análisis de requisitos",
            "Diseño de la solución",
            "Implementación y pruebas",
            "Validación y sustentación"
        ],
        "aplicaciones": [
            "Gestión del riesgo - Inspección en terrenos irregulares"
        ],
        "referencias": [],
        "hardware_tabla": [
            {
                "componente": "Raspberry Pi 4 (4 GB)",
                "categoria": "Computador de Placa Única (SBC)",
                "funcion": "Ejecuta el generador de marcha, la cinemática y el control de postura."
            },
            {
                "componente": "Servomotores digitales DS3218 (12 unidades)",
                "categoria": "Actuador",
                "funcion": "Mueven las tres articulaciones de cada pata."
            },
            {
                "componente": "Controlador PWM PCA9685 de 16 canales",
                "categoria": "Controlador de Actuadores",
                "funcion": "Genera las señales de control de los doce servomotores."
            },
            {
                "componente": "IMU BNO055",
                "categoria": "Sensor Inercial",
                "funcion": "Mide la inclinación y la orientación del cuerpo del robot."
            },
            {
                "componente": "Microinterruptores de contacto en las patas",
                "categoria": "Sensor de Contacto",
                "funcion": "Detectan el apoyo de cada pata sobre el terreno."
            },
            {
                "componente": "Batería LiPo 2S con UBEC de 6 V y 10 A",
                "categoria": "Fuente de Alimentación / Energía",
                "funcion": "Alimenta los servomotores con corriente de pico estable."
            },
            {
                "componente": "Cuerpo y patas impresos en 3D (PETG)",
                "categoria": "Estructura / Componente Mecánico",
                "funcion": "Soportan los servos y transmiten las cargas durante la marcha."
            }
        ],
        "software_tabla": [
            {
                "herramienta": "PyBullet",
                "tipo": "Simulación / Visualización",
                "descripcion": "Para simular la dinámica del cuadrúpedo y ajustar los patrones de marcha."
            },
            {
                "herramienta": "Python con NumPy",
                "tipo": "Lenguaje de Programación",
                "descripcion": "Para la cinemática inversa y el generador de trayectorias de las patas."
            },
            {
                "herramienta": "ROS 2 Humble",
                "tipo": "Framework de Robótica",
                "descripcion": "Para organizar los nodos de sensores, marcha y teleoperación."
            },
            {
                "herramienta": "Onshape",
                "tipo": "Diseño Asistido por Computador (CAD)",
                "descripcion": "Para diseñar las patas y exportar el modelo URDF del robot."
            }
        ]
    },
    {
        "id": "proj_207",
        "titulo": "🌊 Proyecto 207: Vehículo Submarino Operado Remotamente (ROV) para Monitoreo de Calidad de Agua en Lagunas Andinas",
        "descripcion": "Problema: Las lagunas de alta montaña del Macizo Colombiano, como las del Parque Nacional Natural Puracé, abastecen ríos que surten acueductos del Cauca, pero su calidad de agua se mide solo en la superficie y de forma esporádica porque los equipos de muestreo en profundidad y las embarcaciones son costosos y difíciles de transportar a más de 3000 metros de altitud.\n\nDescripción: ROV compacto y transportable a pie, construido con tubo acrílico y propulsores de bajo costo, operado desde la orilla mediante un cable de datos. Transmite video en vivo y registra a distintas profundidades la temperatura, la turbidez y la presión, generando perfiles verticales de calidad de agua que complementan los muestreos de las autoridades ambientales.",
        "area": "Robótica",
        "sector": "Medio ambiente - Monitoreo de ecosistemas acuáticos",
        "nivel": "Avanzado",
        "duracion": "Un semestre",
        "presupuesto": "Bajo costo",
        "habilidades": [
            "Diseño de vehículos submarinos y estanqueidad",
            "Control de profundidad y rumbo",
            "Transmisión de video y telemetría por cable",
            "Instrumentación para calidad de agua",
            "Pruebas de campo en ecosistemas de alta montaña"
        ],
        "objetivos": [
            "🎯 Objetivo General: Construir un ROV de bajo costo que registre perfiles verticales de calidad de agua y video en lagunas andinas.",
            "📌 Objetivos Específicos:",
            "• Diseñar un casco estanco que opere sin filtraciones hasta 10 m de profundidad, verificado en pruebas de presión en piscina.",
            "• Implementar control automático de profundidad con un error menor a 20 cm durante la toma de muestras.",
            "• Obtener perfiles de temperatura y turbidez en al menos una laguna y comparar las lecturas con un instrumento de referencia."
        ],
        "pasos": [
            "Análisis de requisitos",
            "Diseño de la solución",
            "Implementación y pruebas",
            "Validación y sustentación"
        ],
        "aplicaciones": [
            "Medio ambiente - Monitoreo de ecosistemas acuáticos"
        ],
        "referencias": [],
        "hardware_tabla": [
            {
                "componente": "Raspberry Pi 4 con Camera Module 3",
                "categoria": "Computador de Placa Única (SBC)",
                "funcion": "Transmite el video y coordina la telemetría a bordo del ROV."
            },
            {
                "componente": "Arduino Nano",
                "categoria": "Microcontrolador",
                "funcion": "Controla los variadores de los propulsores y lee los sensores analógicos."
            },
            {
                "componente": "Motores sin escobillas con hélices y ESC bidireccionales",
                "categoria": "Actuador",
                "funcion": "Proporcionan el empuje vertical y horizontal del vehículo."
            },
            {
                "componente": "Sensor de presión MS5837-30BA",
                "categoria": "Sensor de Presión",
                "funcion": "Mide la profundidad para el control y el perfil vertical."
            },
            {
                "componente": "Sonda de temperatura DS18B20 sumergible y sensor de turbidez analógico",
                "categoria": "Sensor Ambiental",
                "funcion": "Registran la temperatura y la turbidez del agua en cada profundidad."
            },
            {
                "componente": "Tubo acrílico con tapas de aluminio y prensaestopas",
                "categoria": "Estructura / Componente Mecánico",
                "funcion": "Forma el casco estanco que protege la electrónica."
            },
            {
                "componente": "Cable de datos Cat5e de 30 m con adaptadores de línea",
                "categoria": "Comunicación",
                "funcion": "Comunica el ROV con el computador de superficie en la orilla."
            }
        ],
        "software_tabla": [
            {
                "herramienta": "Python",
                "tipo": "Lenguaje de Programación",
                "descripcion": "Para el control de profundidad, la telemetría y el registro de perfiles."
            },
            {
                "herramienta": "GStreamer",
                "tipo": "Transmisión de Video",
                "descripcion": "Para el video de baja latencia hacia la estación de superficie."
            },
            {
                "herramienta": "Flask",
                "tipo": "Framework Web / Aplicación",
                "descripcion": "Para la interfaz de pilotaje y visualización de datos en el computador de superficie."
            },
            {
                "herramienta": "Arduino IDE",
                "tipo": "Entorno de Desarrollo",
                "descripcion": "Para el firmware de control de propulsores y lectura de sensores."
            }
        ]
    },
    {
        "id": "proj_208",
        "titulo": "📦 Proyecto 208: Robot de Entrega Autónoma de Documentos y Materiales entre Edificios del Campus",
        "descripcion": "Problema: En el campus, el traslado de documentos firmados, préstamos de equipos y materiales de laboratorio entre oficinas y edificios ocupa varias horas semanales del personal administrativo y de los monitores, y los envíos no tienen trazabilidad sobre quién los recibió y cuándo.\n\nDescripción: Robot de reparto con compartimento de cierre electrónico que se desplaza por los andenes del campus siguiendo rutas por puntos GPS, evita peatones y obstáculos con un LiDAR y entrega el envío solo al destinatario que presenta un código de acceso. Una aplicación web permite solicitar envíos, seguir el robot en un mapa y registrar la entrega.",
        "area": "Robótica",
        "sector": "Logística - Entregas de última milla",
        "nivel": "Intermedio-Avanzado",
        "duracion": "Un semestre",
        "presupuesto": "Bajo costo",
        "habilidades": [
            "Navegación exterior por puntos GPS",
            "Fusión de odometría, IMU y GPS",
            "Detección y evasión de peatones",
            "Desarrollo de aplicaciones web para servicios robóticos",
            "Reutilización de motores de patinetas eléctricas"
        ],
        "objetivos": [
            "🎯 Objetivo General: Desarrollar un robot de entrega autónoma que transporte documentos y materiales entre edificios del campus con trazabilidad de cada envío.",
            "📌 Objetivos Específicos:",
            "• Lograr que el robot complete de forma autónoma al menos el 85 % de los trayectos de prueba entre tres edificios sin intervención del operador.",
            "• Implementar la detención o el desvío ante peatones con una distancia mínima de seguridad de 1 m.",
            "• Medir el tiempo de entrega y la satisfacción de los usuarios en un piloto de dos semanas frente al traslado manual."
        ],
        "pasos": [
            "Análisis de requisitos",
            "Diseño de la solución",
            "Implementación y pruebas",
            "Validación y sustentación"
        ],
        "aplicaciones": [
            "Logística - Entregas de última milla"
        ],
        "referencias": [],
        "hardware_tabla": [
            {
                "componente": "Raspberry Pi 5 (8 GB)",
                "categoria": "Computador de Placa Única (SBC)",
                "funcion": "Ejecuta la localización, la navegación y la comunicación con la aplicación web."
            },
            {
                "componente": "Motores de rueda de patineta eléctrica (hoverboard) reutilizados con su placa controladora",
                "categoria": "Actuador",
                "funcion": "Proporcionan tracción en andenes con un costo bajo."
            },
            {
                "componente": "Receptor GPS u-blox NEO-M8N",
                "categoria": "Sensor de Posición",
                "funcion": "Ubica al robot en las rutas exteriores del campus."
            },
            {
                "componente": "LiDAR 2D LD19",
                "categoria": "Sensor de Distancia",
                "funcion": "Detecta peatones y obstáculos alrededor del robot."
            },
            {
                "componente": "ESP32 con cerradura solenoide de 12 V",
                "categoria": "Microcontrolador",
                "funcion": "Controla la apertura del compartimento al validar el código del destinatario."
            },
            {
                "componente": "Batería de patineta eléctrica 36 V con conversor reductor",
                "categoria": "Fuente de Alimentación / Energía",
                "funcion": "Alimenta motores y electrónica durante la jornada de entregas."
            }
        ],
        "software_tabla": [
            {
                "herramienta": "ROS 2 Humble con Nav2",
                "tipo": "Framework de Robótica",
                "descripcion": "Para la navegación por puntos y la evasión de obstáculos."
            },
            {
                "herramienta": "robot_localization",
                "tipo": "Librería de Robótica",
                "descripcion": "Para fusionar GPS, IMU y odometría con un filtro de Kalman extendido."
            },
            {
                "herramienta": "FastAPI",
                "tipo": "Framework Web / Aplicación",
                "descripcion": "Para el servicio de solicitudes, seguimiento y registro de entregas."
            },
            {
                "herramienta": "Leaflet",
                "tipo": "Visualización / Dashboard",
                "descripcion": "Para mostrar en un mapa la posición del robot y el estado de los envíos."
            },
            {
                "herramienta": "PostgreSQL",
                "tipo": "Base de Datos",
                "descripcion": "Para el historial de envíos y destinatarios."
            }
        ]
    },
    {
        "id": "proj_209",
        "titulo": "🧸 Proyecto 209: Robot Social de Apoyo a Terapias de Interacción para Niños con Trastorno del Espectro Autista",
        "descripcion": "Problema: Los niños con trastorno del espectro autista en Popayán acceden a pocas sesiones de terapia ocupacional y de lenguaje, y muchos evitan el contacto visual y la interacción con el terapeuta; los avances se registran de forma subjetiva y es difícil medir la evolución entre sesiones.\n\nDescripción: Robot social de mesa con rostro expresivo en pantalla, cabeza móvil, voz en español y sensores táctiles, que ejecuta juegos de turnos, imitación y reconocimiento de emociones diseñados con el terapeuta. El robot registra automáticamente el tiempo de atención hacia su rostro, los turnos completados y las respuestas, y el terapeuta controla cada sesión desde una tableta.",
        "area": "Robótica",
        "sector": "Salud - Terapia ocupacional infantil",
        "nivel": "Intermedio-Avanzado",
        "duracion": "Un semestre",
        "presupuesto": "Bajo costo",
        "habilidades": [
            "Interacción humano-robot",
            "Diseño de comportamientos y expresiones robóticas",
            "Síntesis de voz en español",
            "Estimación de atención visual con visión artificial",
            "Diseño de protocolos de evaluación con terapeutas"
        ],
        "objetivos": [
            "🎯 Objetivo General: Desarrollar un robot social que apoye las terapias de interacción de niños con trastorno del espectro autista y registre de forma objetiva su participación.",
            "📌 Objetivos Específicos:",
            "• Implementar al menos tres actividades de turnos, imitación y reconocimiento de emociones definidas junto con un terapeuta ocupacional.",
            "• Estimar el tiempo de atención del niño hacia el robot con una concordancia mayor al 80 % frente a la anotación manual de video.",
            "• Evaluar con terapeutas, mediante un cuestionario de usabilidad SUS, la utilidad del robot y del panel de control en sesiones piloto supervisadas."
        ],
        "pasos": [
            "Análisis de requisitos",
            "Diseño de la solución",
            "Implementación y pruebas",
            "Validación y sustentación"
        ],
        "aplicaciones": [
            "Salud - Terapia ocupacional infantil"
        ],
        "referencias": [],
        "hardware_tabla": [
            {
                "componente": "Raspberry Pi 5 (4 GB)",
                "categoria": "Computador de Placa Única (SBC)",
                "funcion": "Ejecuta las actividades, la síntesis de voz y el análisis de atención."
            },
            {
                "componente": "Pantalla táctil de 5 pulgadas",
                "categoria": "Interfaz de Usuario / Iluminación",
                "funcion": "Muestra los ojos y las expresiones faciales del robot."
            },
            {
                "componente": "Cámara Raspberry Pi Camera Module 3",
                "categoria": "Sensor de Visión",
                "funcion": "Detecta el rostro del niño y la orientación de su mirada."
            },
            {
                "componente": "Servomotores SG90 para giro e inclinación de la cabeza",
                "categoria": "Actuador",
                "funcion": "Orientan la cabeza del robot hacia el niño durante la interacción."
            },
            {
                "componente": "Sensores táctiles capacitivos TTP223 y anillo LED WS2812",
                "categoria": "Interfaz de Usuario / Iluminación",
                "funcion": "Registran caricias o toques y dan retroalimentación luminosa."
            },
            {
                "componente": "Altavoz con amplificador MAX98357A y micrófono USB",
                "categoria": "Audio",
                "funcion": "Reproducen la voz del robot y capturan las respuestas del niño."
            },
            {
                "componente": "Carcasa de formas redondeadas impresa en 3D",
                "categoria": "Estructura / Componente Mecánico",
                "funcion": "Da al robot una apariencia amigable y segura para niños."
            }
        ],
        "software_tabla": [
            {
                "herramienta": "MediaPipe Face Mesh",
                "tipo": "Visión Artificial",
                "descripcion": "Para detectar el rostro del niño y estimar la dirección de la cabeza."
            },
            {
                "herramienta": "Piper TTS",
                "tipo": "Síntesis de Voz",
                "descripcion": "Para generar la voz del robot en español sin conexión a internet."
            },
            {
                "herramienta": "Python",
                "tipo": "Lenguaje de Programación",
                "descripcion": "Para la máquina de estados de las actividades y el registro de eventos."
            },
            {
                "herramienta": "Flask",
                "tipo": "Framework Web / Aplicación",
                "descripcion": "Para el panel del terapeuta accesible desde una tableta."
            },
            {
                "herramienta": "SQLite",
                "tipo": "Base de Datos",
                "descripcion": "Para guardar las métricas de cada sesión de forma anonimizada."
            }
        ]
    },
    {
        "id": "proj_210",
        "titulo": "🏁 Proyecto 210: Plataforma Didáctica de Robots Seguidor de Línea y Minisumo para Cursos de Control Automático",
        "descripcion": "Problema: Los estudiantes de ingeniería aprenden control PID y sintonización de lazos casi siempre con ecuaciones y simulaciones, y los robots de competencia que construyen los semilleros se programan por ensayo y error sin registrar datos; el conocimiento no se transfiere a los cursos ni entre generaciones de estudiantes.\n\nDescripción: Plataforma modular con una base común que se configura como robot seguidor de línea o como minisumo, con telemetría inalámbrica que transmite en tiempo real el error, las acciones de control y las lecturas de sensores. Se acompaña de guías de laboratorio para identificar el modelo de los motores, sintonizar controladores y comparar estrategias usando datos reales de pista y de combate.",
        "area": "Robótica",
        "sector": "Educación superior - Formación en ingeniería",
        "nivel": "Intermedio",
        "duracion": "Un semestre",
        "presupuesto": "Bajo costo",
        "habilidades": [
            "Control PID aplicado a robots móviles",
            "Identificación de modelos de motores",
            "Diseño de circuitos impresos",
            "Telemetría inalámbrica en tiempo real",
            "Diseño de prácticas de laboratorio"
        ],
        "objetivos": [
            "🎯 Objetivo General: Desarrollar una plataforma didáctica de robots de competencia con telemetría que permita enseñar control automático con datos experimentales.",
            "📌 Objetivos Específicos:",
            "• Diseñar una placa electrónica común configurable como seguidor de línea o minisumo, con un costo por robot menor a 250 000 pesos colombianos.",
            "• Implementar la telemetría inalámbrica del error y la acción de control a una frecuencia de al menos 100 Hz.",
            "• Aplicar tres guías de laboratorio en un curso de control y comparar los tiempos de vuelta obtenidos con sintonización empírica y con sintonización basada en el modelo identificado."
        ],
        "pasos": [
            "Análisis de requisitos",
            "Diseño de la solución",
            "Implementación y pruebas",
            "Validación y sustentación"
        ],
        "aplicaciones": [
            "Educación superior - Formación en ingeniería"
        ],
        "referencias": [],
        "hardware_tabla": [
            {
                "componente": "ESP32-S3 DevKit",
                "categoria": "Microcontrolador",
                "funcion": "Ejecuta el lazo de control y envía la telemetría por Bluetooth o Wi-Fi."
            },
            {
                "componente": "Arreglo de sensores infrarrojos QTR-8RC",
                "categoria": "Sensor de Posición",
                "funcion": "Mide la posición de la línea en la configuración de seguidor."
            },
            {
                "componente": "Sensores de distancia ToF VL53L0X",
                "categoria": "Sensor de Distancia",
                "funcion": "Detectan al oponente en la configuración de minisumo."
            },
            {
                "componente": "Micromotores N20 de 1000 rpm con encoder y driver TB6612FNG",
                "categoria": "Actuador",
                "funcion": "Proporcionan la tracción y la medición de velocidad de las ruedas."
            },
            {
                "componente": "Batería LiPo 2S de 450 mAh",
                "categoria": "Fuente de Alimentación / Energía",
                "funcion": "Alimenta el robot con baja masa para pruebas de pista y combate."
            },
            {
                "componente": "Placa de circuito impreso propia y chasis impreso en 3D",
                "categoria": "Estructura / Componente Mecánico",
                "funcion": "Integran la electrónica y permiten intercambiar los módulos de cada configuración."
            }
        ],
        "software_tabla": [
            {
                "herramienta": "PlatformIO",
                "tipo": "Entorno de Desarrollo",
                "descripcion": "Para el firmware de control y telemetría de ambas configuraciones."
            },
            {
                "herramienta": "KiCad",
                "tipo": "Diseño Electrónico (EDA)",
                "descripcion": "Para diseñar la placa de circuito impreso común."
            },
            {
                "herramienta": "Python con Matplotlib y SciPy",
                "tipo": "Análisis de Datos",
                "descripcion": "Para graficar la telemetría e identificar el modelo de los motores."
            },
            {
                "herramienta": "MATLAB Control System Toolbox / python-control",
                "tipo": "Herramienta de Control",
                "descripcion": "Para diseñar y simular los controladores antes de cargarlos al robot."
            }
        ]
    }
];
