// Projects for this area. Each entry follows the schema checked by scripts/projects-validation.mjs.
export default [
    {
        "id": "proj_217",
        "titulo": "🧠 Proyecto 217: Deletreador Cerebro-Computadora por Potenciales P300 con EEG de Bajo Costo para la Comunicación de Personas con Parálisis Severa",
        "descripcion": "Problema: Las personas con esclerosis lateral amiotrófica, lesiones medulares altas o secuelas graves de accidentes cerebrovasculares pueden perder por completo el habla y el control manual; en el Cauca los sistemas comerciales de comunicación por interfaz cerebro-computadora son inaccesibles por su costo y por la falta de soporte técnico local.\n\nDescripción: Interfaz cerebro-computadora no invasiva basada en el paradigma P300 que permite seleccionar letras y frases frecuentes en una matriz de estímulos visuales. Un front end de EEG de 8 canales basado en el ADS1299 (tipo OpenBCI) transmite las señales por Bluetooth de baja energía a una Raspberry Pi 5, donde un clasificador de análisis discriminante lineal regularizado detecta la respuesta P300 y compone el mensaje, que se lee en voz alta mediante síntesis de voz y puede enviarse por MQTT al teléfono del cuidador. El proyecto incluye protocolo de consentimiento informado, tratamiento de datos conforme a la Ley 1581 de 2012 y se presenta como prototipo de apoyo, no dispositivo médico certificado.",
        "area": "Neurociencia con AIoT",
        "sector": "Neurotecnología - Comunicación Aumentativa",
        "nivel": "Avanzado",
        "duracion": "Un semestre",
        "presupuesto": "Bajo costo",
        "habilidades": [
            "Adquisición de EEG multicanal y montaje de electrodos según el sistema 10-20",
            "Diseño de paradigmas de estimulación visual sincronizados con la señal",
            "Extracción de potenciales relacionados con eventos y promediado de épocas",
            "Clasificación con análisis discriminante lineal regularizado",
            "Comunicación inalámbrica con BLE y MQTT",
            "Ética de la investigación con datos neurofisiológicos"
        ],
        "objetivos": [
            "🎯 Objetivo General: Desarrollar un deletreador P300 de bajo costo con adquisición inalámbrica de EEG y clasificación en el borde que permita a personas con parálisis severa componer mensajes de texto y voz.",
            "📌 Objetivos Específicos:",
            "• Implementar la adquisición de 8 canales de EEG con el ADS1299 y su transmisión por BLE con marcas de tiempo sincronizadas con los estímulos visuales.",
            "• Entrenar un clasificador P300 por usuario con una sesión de calibración menor a 10 minutos y alcanzar una exactitud de selección superior al 80 % en voluntarios sanos.",
            "• Medir la tasa de transferencia de información en bits por minuto y compararla con la obtenida en el conjunto público de la BCI Competition III.",
            "• Integrar la síntesis de voz y el envío de mensajes al cuidador por MQTT con un retardo de extremo a extremo inferior a 2 segundos."
        ],
        "pasos": [
            "Análisis de requisitos",
            "Diseño de la solución",
            "Implementación y pruebas",
            "Validación y sustentación"
        ],
        "aplicaciones": [
            "Neurotecnología - Comunicación Aumentativa"
        ],
        "referencias": [
            "Farwell, L. A., & Donchin, E. (1988). Talking off the top of your head: toward a mental prosthesis utilizing event-related brain potentials. Electroencephalography and Clinical Neurophysiology, 70(6), 510–523.",
            "Congreso de Colombia. (2012). Ley Estatutaria 1581 de 2012, por la cual se dictan disposiciones generales para la protección de datos personales."
        ],
        "hardware_tabla": [
            {
                "componente": "Tarjeta de EEG de 8 canales basada en ADS1299 (tipo OpenBCI Cyton)",
                "categoria": "Sensor Biomédico",
                "funcion": "Adquiere la actividad eléctrica cerebral con resolución de 24 bits."
            },
            {
                "componente": "Gorro de EEG con electrodos secos o de gel en posiciones Fz, Cz, Pz, P3, P4, PO7, PO8 y Oz",
                "categoria": "Sensor Biomédico",
                "funcion": "Ubica los electrodos sobre las regiones donde se registra la respuesta P300."
            },
            {
                "componente": "Raspberry Pi 5 con 8 GB de RAM",
                "categoria": "Computador de Placa Única",
                "funcion": "Presenta los estímulos, ejecuta el clasificador y publica los mensajes por MQTT."
            },
            {
                "componente": "Monitor de 15 pulgadas y altavoz USB",
                "categoria": "Interfaz de Usuario / Iluminación",
                "funcion": "Muestra la matriz de estímulos y reproduce el mensaje sintetizado."
            },
            {
                "componente": "Batería portátil con aislamiento respecto a la red eléctrica",
                "categoria": "Fuente de Alimentación / Energía",
                "funcion": "Alimenta la tarjeta de EEG garantizando la seguridad eléctrica del usuario."
            }
        ],
        "software_tabla": [
            {
                "herramienta": "BrainFlow",
                "tipo": "Librería de Adquisición de Bioseñales",
                "descripcion": "Lectura de datos de la tarjeta de EEG desde Python."
            },
            {
                "herramienta": "MNE-Python",
                "tipo": "Librería de Procesamiento de Señales",
                "descripcion": "Filtrado, segmentación en épocas y visualización de potenciales evocados."
            },
            {
                "herramienta": "scikit-learn",
                "tipo": "Framework de Aprendizaje Automático",
                "descripcion": "Entrenamiento del clasificador LDA regularizado por usuario."
            },
            {
                "herramienta": "PsychoPy",
                "tipo": "Software de Estimulación Experimental",
                "descripcion": "Presentación temporizada de la matriz de estímulos visuales."
            },
            {
                "herramienta": "Mosquitto",
                "tipo": "Broker MQTT",
                "descripcion": "Entrega de los mensajes compuestos al teléfono del cuidador."
            }
        ]
    },
    {
        "id": "proj_218",
        "titulo": "⚡ Proyecto 218: Pulsera de Detección de Crisis Epilépticas Tónico-Clónicas Nocturnas con Acelerometría, Actividad Electrodérmica y TinyML",
        "descripcion": "Problema: Las crisis epilépticas tónico-clónicas que ocurren durante la noche pasan inadvertidas para las familias y se asocian con lesiones y con muerte súbita inesperada en epilepsia; en zonas rurales del Cauca las familias no tienen acceso a monitoreo por video-EEG ni a dispositivos comerciales de alerta.\n\nDescripción: Pulsera basada en un ESP32-S3 con unidad de medición inercial de 6 ejes y sensor de actividad electrodérmica que ejecuta un modelo TinyML para reconocer el patrón rítmico de las crisis tónico-clónicas generalizadas y diferenciarlo de movimientos normales del sueño. Ante una detección, la pulsera vibra, envía una alerta por Wi-Fi o BLE a un concentrador doméstico y este notifica al cuidador mediante MQTT y mensajería. Los eventos quedan en un diario de crisis que el neurólogo puede revisar. Se trata de un prototipo de apoyo, no dispositivo médico certificado, validado con simulaciones de movimiento y voluntarios bajo consentimiento informado.",
        "area": "Neurociencia con AIoT",
        "sector": "Neurología - Epilepsia",
        "nivel": "Intermedio-Avanzado",
        "duracion": "Un semestre",
        "presupuesto": "Bajo costo",
        "habilidades": [
            "Procesamiento de señales inerciales y electrodérmicas",
            "Extracción de características en ventanas deslizantes",
            "Entrenamiento y cuantización de modelos para microcontroladores",
            "Diseño de firmware de bajo consumo",
            "Mensajería IoT con MQTT y notificaciones push"
        ],
        "objetivos": [
            "🎯 Objetivo General: Desarrollar una pulsera conectada que detecte en el dispositivo crisis epilépticas tónico-clónicas nocturnas y alerte oportunamente a los cuidadores.",
            "📌 Objetivos Específicos:",
            "• Construir un conjunto de datos con movimientos nocturnos normales y simulaciones protocolizadas de crisis tónico-clónicas registradas con la pulsera.",
            "• Entrenar un clasificador TinyML que combine acelerometría y actividad electrodérmica con sensibilidad superior al 90 % y menos de una falsa alarma por noche en las pruebas.",
            "• Implementar la cadena de alerta pulsera–concentrador–teléfono con una latencia inferior a 30 segundos desde el inicio del patrón rítmico.",
            "• Lograr una autonomía de batería de al menos 24 horas con muestreo continuo."
        ],
        "pasos": [
            "Análisis de requisitos",
            "Diseño de la solución",
            "Implementación y pruebas",
            "Validación y sustentación"
        ],
        "aplicaciones": [
            "Neurología - Epilepsia"
        ],
        "referencias": [
            "Beniczky, S., Wiebe, S., Jeppesen, J., Tatum, W. O., Brazdil, M., Wang, Y., Herman, S. T., & Ryvlin, P. (2021). Automated seizure detection using wearable devices: A clinical practice guideline of the International League Against Epilepsy and the International Federation of Clinical Neurophysiology. Epilepsia, 62(3), 632–646."
        ],
        "hardware_tabla": [
            {
                "componente": "ESP32-S3 en formato compacto (tipo XIAO ESP32S3)",
                "categoria": "Microcontrolador",
                "funcion": "Ejecuta la inferencia TinyML y gestiona la comunicación inalámbrica."
            },
            {
                "componente": "Unidad de medición inercial LSM6DSOX",
                "categoria": "Sensor Inercial",
                "funcion": "Mide la aceleración y la velocidad angular de la muñeca."
            },
            {
                "componente": "Sensor de respuesta galvánica de la piel (Grove GSR)",
                "categoria": "Sensor Biomédico",
                "funcion": "Registra la actividad electrodérmica asociada a la activación autonómica durante la crisis."
            },
            {
                "componente": "Motor de vibración y batería LiPo de 400 mAh",
                "categoria": "Actuador",
                "funcion": "Avisa al usuario y alimenta la pulsera durante la noche."
            },
            {
                "componente": "Raspberry Pi 4 como concentrador doméstico",
                "categoria": "Computador de Placa Única",
                "funcion": "Recibe las alertas, guarda el diario de crisis y notifica al cuidador."
            }
        ],
        "software_tabla": [
            {
                "herramienta": "Edge Impulse",
                "tipo": "Plataforma TinyML",
                "descripcion": "Captura de datos, diseño de características y entrenamiento del modelo."
            },
            {
                "herramienta": "TensorFlow Lite for Microcontrollers",
                "tipo": "Motor de Inferencia Embebida",
                "descripcion": "Ejecución del clasificador cuantizado en el ESP32-S3."
            },
            {
                "herramienta": "Arduino IDE / ESP-IDF",
                "tipo": "Entorno de Desarrollo Embebido",
                "descripcion": "Firmware de muestreo, inferencia y modos de bajo consumo."
            },
            {
                "herramienta": "Node-RED",
                "tipo": "Plataforma de Integración IoT",
                "descripcion": "Flujo de alertas MQTT hacia notificaciones en el teléfono del cuidador."
            }
        ]
    },
    {
        "id": "proj_219",
        "titulo": "🤲 Proyecto 219: Guante Inercial para Cuantificar el Temblor y la Bradicinesia en la Enfermedad de Parkinson durante Tareas Motoras Guiadas",
        "descripcion": "Problema: El seguimiento de la enfermedad de Parkinson depende de valoraciones clínicas subjetivas que se realizan pocas veces al año; en el suroccidente colombiano muchos pacientes viven lejos de un neurólogo y las fluctuaciones del temblor y de la lentitud de movimiento entre consultas no quedan registradas.\n\nDescripción: Guante con sensores inerciales en el dorso de la mano y en los dedos índice y pulgar, conectado a un ESP32 que guía al paciente por tareas motoras inspiradas en la escala MDS-UPDRS (temblor en reposo, temblor postural, golpeteo de dedos y apertura y cierre de la mano). El dispositivo calcula la frecuencia y amplitud del temblor y la velocidad y decremento del golpeteo, y un modelo de aprendizaje automático estima un nivel de severidad que se envía por Wi-Fi a un tablero para el equipo de salud. Incluye consentimiento informado y la advertencia de que es un prototipo de apoyo, no dispositivo médico certificado.",
        "area": "Neurociencia con AIoT",
        "sector": "Neurología - Trastornos del Movimiento",
        "nivel": "Intermedio",
        "duracion": "Un semestre",
        "presupuesto": "Bajo costo",
        "habilidades": [
            "Integración de múltiples sensores inerciales por bus I2C",
            "Análisis espectral de señales de temblor",
            "Extracción de características cinemáticas del movimiento",
            "Clasificación supervisada con modelos de árboles de decisión",
            "Desarrollo de tableros web para seguimiento longitudinal"
        ],
        "objetivos": [
            "🎯 Objetivo General: Construir un guante inercial conectado que cuantifique el temblor y la bradicinesia durante tareas motoras guiadas y estime su severidad como apoyo al seguimiento de pacientes con Parkinson.",
            "📌 Objetivos Específicos:",
            "• Medir la frecuencia dominante del temblor con un error inferior a 0,2 Hz frente a un generador de vibración de referencia.",
            "• Calcular métricas de golpeteo de dedos (frecuencia, amplitud y decremento) y verificarlas con video a 60 cuadros por segundo.",
            "• Entrenar un clasificador de severidad en tres niveles con registros de voluntarios que simulan los patrones descritos en la escala y reportar su matriz de confusión.",
            "• Publicar los resultados de cada sesión en un tablero que muestre la evolución del paciente en el tiempo."
        ],
        "pasos": [
            "Análisis de requisitos",
            "Diseño de la solución",
            "Implementación y pruebas",
            "Validación y sustentación"
        ],
        "aplicaciones": [
            "Neurología - Trastornos del Movimiento"
        ],
        "referencias": [
            "Goetz, C. G., Tilley, B. C., Shaftman, S. R., Stebbins, G. T., Fahn, S., Martinez-Martin, P., et al. (2008). Movement Disorder Society-sponsored revision of the Unified Parkinson's Disease Rating Scale (MDS-UPDRS): Scale presentation and clinimetric testing results. Movement Disorders, 23(15), 2129–2170."
        ],
        "hardware_tabla": [
            {
                "componente": "ESP32-WROOM-32",
                "categoria": "Microcontrolador",
                "funcion": "Lee los sensores, guía las tareas y envía los resultados por Wi-Fi."
            },
            {
                "componente": "Tres unidades de medición inercial MPU-6050 con multiplexor TCA9548A",
                "categoria": "Sensor Inercial",
                "funcion": "Registran el movimiento del dorso de la mano, el índice y el pulgar."
            },
            {
                "componente": "Guante de tela con soportes impresos en 3D",
                "categoria": "Estructura / Componente Mecánico",
                "funcion": "Fija los sensores en posiciones repetibles entre sesiones."
            },
            {
                "componente": "Pantalla OLED SSD1306 y zumbador",
                "categoria": "Interfaz de Usuario / Iluminación",
                "funcion": "Indica al paciente la tarea a realizar y su duración."
            },
            {
                "componente": "Batería LiPo con módulo de carga TP4056",
                "categoria": "Fuente de Alimentación / Energía",
                "funcion": "Alimenta el guante de forma portátil."
            }
        ],
        "software_tabla": [
            {
                "herramienta": "Arduino IDE",
                "tipo": "Entorno de Desarrollo Embebido",
                "descripcion": "Firmware de adquisición sincronizada y protocolo de tareas."
            },
            {
                "herramienta": "SciPy",
                "tipo": "Librería de Procesamiento de Señales",
                "descripcion": "Filtrado y análisis espectral de las señales de temblor."
            },
            {
                "herramienta": "scikit-learn",
                "tipo": "Framework de Aprendizaje Automático",
                "descripcion": "Entrenamiento del clasificador de severidad."
            },
            {
                "herramienta": "InfluxDB y Grafana",
                "tipo": "Base de Datos de Series de Tiempo / Dashboard",
                "descripcion": "Almacenamiento y visualización longitudinal de las sesiones."
            }
        ]
    },
    {
        "id": "proj_220",
        "titulo": "💪 Proyecto 220: Rehabilitación del Miembro Superior tras Accidente Cerebrovascular con Detección de Intención Motora por EMG y Videojuego Serio",
        "descripcion": "Problema: La rehabilitación del brazo después de un accidente cerebrovascular requiere cientos de repeticiones diarias, pero en el Cauca los pacientes acceden a pocas sesiones de fisioterapia y abandonan los ejercicios en casa por monotonía y falta de retroalimentación.\n\nDescripción: Sistema de rehabilitación domiciliaria que registra la actividad muscular del antebrazo y del brazo parético con front ends de EMG de bajo costo (tipo BioAmp EXG Pill) conectados a un ESP32. Un clasificador ligero detecta en el dispositivo la intención de movimiento (apertura y cierre de la mano, flexión y extensión del codo) incluso cuando el movimiento visible es débil, y la envía por BLE a un videojuego serio que convierte cada intento en una acción del juego. Las repeticiones, la amplitud de activación y la adherencia se sincronizan por Wi-Fi con un tablero para el fisioterapeuta. Es un prototipo de apoyo, no dispositivo médico certificado; las pruebas con pacientes requieren aval ético y consentimiento informado.",
        "area": "Neurociencia con AIoT",
        "sector": "Neurorrehabilitación - Accidente Cerebrovascular",
        "nivel": "Intermedio-Avanzado",
        "duracion": "Un semestre",
        "presupuesto": "Bajo costo",
        "habilidades": [
            "Adquisición y acondicionamiento de señales electromiográficas de superficie",
            "Extracción de características EMG en el dominio del tiempo",
            "Clasificación de intención motora en microcontroladores",
            "Desarrollo de videojuegos serios con Godot",
            "Comunicación BLE entre dispositivos embebidos y aplicaciones"
        ],
        "objetivos": [
            "🎯 Objetivo General: Desarrollar un sistema de rehabilitación del miembro superior que detecte la intención motora mediante EMG y la traduzca en interacción con un videojuego serio para aumentar la adherencia a la terapia en casa.",
            "📌 Objetivos Específicos:",
            "• Adquirir EMG de dos a cuatro grupos musculares con calidad suficiente para identificar contracciones de baja amplitud.",
            "• Entrenar un clasificador de cuatro gestos más reposo con exactitud superior al 85 % en voluntarios sanos y ajustable por usuario con una calibración corta.",
            "• Diseñar un videojuego serio con niveles de dificultad que se adapten al umbral de activación de cada usuario.",
            "• Reportar repeticiones, tiempo de práctica y evolución de la activación muscular en un tablero accesible para el fisioterapeuta."
        ],
        "pasos": [
            "Análisis de requisitos",
            "Diseño de la solución",
            "Implementación y pruebas",
            "Validación y sustentación"
        ],
        "aplicaciones": [
            "Neurorrehabilitación - Accidente Cerebrovascular"
        ],
        "referencias": [],
        "hardware_tabla": [
            {
                "componente": "Cuatro módulos de EMG BioAmp EXG Pill con electrodos de gel",
                "categoria": "Sensor Biomédico",
                "funcion": "Amplifican y filtran la actividad muscular de superficie."
            },
            {
                "componente": "ESP32-S3",
                "categoria": "Microcontrolador",
                "funcion": "Digitaliza las señales, clasifica la intención y transmite por BLE y Wi-Fi."
            },
            {
                "componente": "Brazalete elástico con soportes impresos en 3D",
                "categoria": "Estructura / Componente Mecánico",
                "funcion": "Mantiene los electrodos en posiciones repetibles."
            },
            {
                "componente": "Tableta o computador portátil",
                "categoria": "Dispositivo Móvil",
                "funcion": "Ejecuta el videojuego serio y muestra la retroalimentación."
            },
            {
                "componente": "Batería LiPo aislada",
                "categoria": "Fuente de Alimentación / Energía",
                "funcion": "Alimenta la adquisición sin conexión a la red eléctrica."
            }
        ],
        "software_tabla": [
            {
                "herramienta": "Godot Engine",
                "tipo": "Motor de Videojuegos",
                "descripcion": "Desarrollo del videojuego serio de rehabilitación."
            },
            {
                "herramienta": "TensorFlow Lite for Microcontrollers",
                "tipo": "Motor de Inferencia Embebida",
                "descripcion": "Ejecución del clasificador de intención motora en el ESP32-S3."
            },
            {
                "herramienta": "Python con NumPy y scikit-learn",
                "tipo": "Entorno de Análisis de Datos",
                "descripcion": "Análisis de las señales y comparación de clasificadores."
            },
            {
                "herramienta": "Supabase",
                "tipo": "Backend como Servicio",
                "descripcion": "Almacenamiento de sesiones y tablero del fisioterapeuta."
            }
        ]
    },
    {
        "id": "proj_221",
        "titulo": "😴 Proyecto 221: Clasificación Automática de Etapas del Sueño con Diadema EEG de Canal Frontal y Aprendizaje Profundo en el Borde",
        "descripcion": "Problema: La polisomnografía, prueba de referencia para estudiar el sueño, solo está disponible en pocos centros del país y tiene largas listas de espera; los trastornos del sueño asociados a insomnio, epilepsia o enfermedades neurodegenerativas quedan sin caracterizar en la población del Cauca.\n\nDescripción: Diadema textil con electrodos frontales y un front end de biopotenciales ADS1292R conectado a un ESP32 que registra EEG y EOG durante la noche y los transmite por Wi-Fi a una Raspberry Pi en la habitación. Un modelo de aprendizaje profundo entrenado con la base pública Sleep-EDF y ajustado con registros propios clasifica cada época de 30 segundos en vigilia, N1, N2, N3 y sueño REM, y genera un hipnograma y métricas de calidad del sueño en un reporte web. El trabajo compara la arquitectura completa con una versión reducida para ejecución en el borde y se presenta como prototipo de apoyo, no dispositivo médico certificado.",
        "area": "Neurociencia con AIoT",
        "sector": "Neurociencia - Medicina del Sueño",
        "nivel": "Avanzado",
        "duracion": "Un semestre",
        "presupuesto": "Bajo costo",
        "habilidades": [
            "Adquisición de EEG y EOG de bajo ruido para registros prolongados",
            "Manejo de bases de datos fisiológicas en formato EDF",
            "Redes neuronales convolucionales y recurrentes para series de tiempo",
            "Compresión y cuantización de modelos para ejecución en el borde",
            "Evaluación con métricas de concordancia como kappa de Cohen"
        ],
        "objetivos": [
            "🎯 Objetivo General: Desarrollar una diadema EEG conectada y un modelo de aprendizaje profundo en el borde que clasifique las etapas del sueño y genere hipnogramas como apoyo al estudio domiciliario del sueño.",
            "📌 Objetivos Específicos:",
            "• Diseñar la diadema y su firmware para registrar ocho horas continuas de EEG frontal con pérdida de datos inferior al 1 %.",
            "• Entrenar un clasificador de cinco etapas con Sleep-EDF y alcanzar un kappa de Cohen superior a 0,70 en validación entre sujetos.",
            "• Cuantizar el modelo para ejecutarlo en la Raspberry Pi y comparar su desempeño y tiempo de inferencia frente al modelo completo.",
            "• Generar un reporte web con hipnograma, eficiencia del sueño y latencia de sueño REM para cada noche registrada."
        ],
        "pasos": [
            "Análisis de requisitos",
            "Diseño de la solución",
            "Implementación y pruebas",
            "Validación y sustentación"
        ],
        "aplicaciones": [
            "Neurociencia - Medicina del Sueño"
        ],
        "referencias": [
            "Kemp, B., Zwinderman, A. H., Tuk, B., Kamphuisen, H. A. C., & Oberyé, J. J. L. (2000). Analysis of a sleep-dependent neuronal feedback loop: the slow-wave microcontinuity of the EEG. IEEE Transactions on Biomedical Engineering, 47(9), 1185–1194.",
            "Supratak, A., Dong, H., Wu, C., & Guo, Y. (2017). DeepSleepNet: A model for automatic sleep stage scoring based on raw single-channel EEG. IEEE Transactions on Neural Systems and Rehabilitation Engineering, 25(11), 1998–2008."
        ],
        "hardware_tabla": [
            {
                "componente": "Front end de biopotenciales ADS1292R",
                "categoria": "Sensor Biomédico",
                "funcion": "Adquiere dos canales de EEG y EOG con alta resolución."
            },
            {
                "componente": "Diadema textil con electrodos de plata/cloruro de plata",
                "categoria": "Sensor Biomédico",
                "funcion": "Mantiene los electrodos frontales en contacto durante la noche."
            },
            {
                "componente": "ESP32-S3",
                "categoria": "Microcontrolador",
                "funcion": "Controla la adquisición y transmite los datos por Wi-Fi."
            },
            {
                "componente": "Raspberry Pi 5",
                "categoria": "Computador de Placa Única",
                "funcion": "Almacena los registros, ejecuta el modelo cuantizado y sirve el reporte web."
            },
            {
                "componente": "Computador con GPU del laboratorio",
                "categoria": "Estación de Trabajo",
                "funcion": "Entrena el modelo de aprendizaje profundo con la base pública."
            }
        ],
        "software_tabla": [
            {
                "herramienta": "PyTorch",
                "tipo": "Framework de Aprendizaje Profundo",
                "descripcion": "Entrenamiento del clasificador de etapas del sueño."
            },
            {
                "herramienta": "MNE-Python",
                "tipo": "Librería de Procesamiento de Señales",
                "descripcion": "Lectura de archivos EDF, filtrado y segmentación en épocas."
            },
            {
                "herramienta": "ONNX Runtime",
                "tipo": "Motor de Inferencia",
                "descripcion": "Ejecución del modelo cuantizado en la Raspberry Pi."
            },
            {
                "herramienta": "FastAPI",
                "tipo": "Framework Web",
                "descripcion": "Servicio del reporte nocturno con hipnograma y métricas."
            }
        ]
    },
    {
        "id": "proj_222",
        "titulo": "📝 Proyecto 222: Estimación de Carga Cognitiva en Estudiantes durante Tareas de Programación con EEG Frontal y Variabilidad de la Frecuencia Cardíaca",
        "descripcion": "Problema: Los docentes de programación no tienen una forma objetiva de saber cuándo un ejercicio sobrecarga cognitivamente a sus estudiantes; la sobrecarga sostenida se relaciona con frustración, errores y deserción en los primeros semestres de ingeniería.\n\nDescripción: Plataforma experimental que combina una diadema de EEG frontal de dos canales y una banda de pulso (fotopletismografía) conectadas por BLE a un ESP32 que actúa como pasarela MQTT hacia un servidor del laboratorio. Mientras el estudiante resuelve ejercicios de programación de dificultad creciente y tareas de referencia n-back, se extraen la potencia en bandas theta y alfa y la variabilidad de la frecuencia cardíaca, y un modelo de aprendizaje automático estima la carga cognitiva en tres niveles, contrastada con el cuestionario NASA-TLX. Los resultados se presentan de forma agregada y anónima al docente. El estudio requiere consentimiento informado, participación voluntaria y tratamiento de datos conforme a la Ley 1581 de 2012; no se usa para calificar ni vigilar a los estudiantes.",
        "area": "Neurociencia con AIoT",
        "sector": "Neurociencia Cognitiva - Educación",
        "nivel": "Intermedio-Avanzado",
        "duracion": "Un semestre",
        "presupuesto": "Bajo costo",
        "habilidades": [
            "Diseño de experimentos con tareas cognitivas controladas",
            "Análisis de potencia espectral en bandas de EEG",
            "Cálculo de variabilidad de la frecuencia cardíaca",
            "Fusión de características multimodales y clasificación supervisada",
            "Protección de datos personales y anonimización"
        ],
        "objetivos": [
            "🎯 Objetivo General: Desarrollar una plataforma conectada que estime la carga cognitiva de estudiantes durante tareas de programación a partir de EEG frontal y variabilidad de la frecuencia cardíaca.",
            "📌 Objetivos Específicos:",
            "• Diseñar un protocolo experimental con tareas n-back y ejercicios de programación de tres niveles de dificultad, con aval ético y consentimiento informado.",
            "• Implementar la adquisición sincronizada de EEG y pulso con pasarela ESP32 y almacenamiento seguro en el servidor del laboratorio.",
            "• Entrenar y comparar al menos dos modelos de clasificación de carga cognitiva y reportar su desempeño en validación entre sujetos.",
            "• Analizar la correlación entre la carga estimada y las puntuaciones del NASA-TLX."
        ],
        "pasos": [
            "Análisis de requisitos",
            "Diseño de la solución",
            "Implementación y pruebas",
            "Validación y sustentación"
        ],
        "aplicaciones": [
            "Neurociencia Cognitiva - Educación"
        ],
        "referencias": [
            "Hart, S. G., & Staveland, L. E. (1988). Development of NASA-TLX (Task Load Index): Results of empirical and theoretical research. Advances in Psychology, 52, 139–183.",
            "Congreso de Colombia. (2012). Ley Estatutaria 1581 de 2012, por la cual se dictan disposiciones generales para la protección de datos personales."
        ],
        "hardware_tabla": [
            {
                "componente": "Diadema de EEG de dos canales frontales con front end BioAmp EXG Pill",
                "categoria": "Sensor Biomédico",
                "funcion": "Registra la actividad cerebral frontal durante las tareas."
            },
            {
                "componente": "Banda de pulso con sensor MAX30102",
                "categoria": "Sensor Biomédico",
                "funcion": "Mide la señal de pulso para calcular la variabilidad cardíaca."
            },
            {
                "componente": "ESP32-WROOM-32",
                "categoria": "Microcontrolador",
                "funcion": "Sincroniza las señales y las publica por MQTT."
            },
            {
                "componente": "Servidor del laboratorio",
                "categoria": "Servidor Local",
                "funcion": "Almacena los registros anonimizados y ejecuta el modelo de estimación."
            },
            {
                "componente": "Computador de la sala de prácticas",
                "categoria": "Equipo de Cómputo",
                "funcion": "Presenta las tareas cognitivas y los ejercicios de programación."
            }
        ],
        "software_tabla": [
            {
                "herramienta": "PsychoPy",
                "tipo": "Software de Estimulación Experimental",
                "descripcion": "Presentación de las tareas n-back con marcas de tiempo."
            },
            {
                "herramienta": "Lab Streaming Layer (LSL)",
                "tipo": "Middleware de Sincronización",
                "descripcion": "Sincronización de eventos de las tareas con las señales fisiológicas."
            },
            {
                "herramienta": "NeuroKit2",
                "tipo": "Librería de Procesamiento de Señales",
                "descripcion": "Cálculo de variabilidad cardíaca y potencia en bandas de EEG."
            },
            {
                "herramienta": "scikit-learn",
                "tipo": "Framework de Aprendizaje Automático",
                "descripcion": "Entrenamiento y comparación de clasificadores de carga cognitiva."
            },
            {
                "herramienta": "Mosquitto",
                "tipo": "Broker MQTT",
                "descripcion": "Transporte de las señales desde la pasarela al servidor."
            }
        ]
    },
    {
        "id": "proj_223",
        "titulo": "🧩 Proyecto 223: Registro de Conductas Motoras Repetitivas en Niños con Trastorno del Espectro Autista mediante Pulseras Inerciales y Reconocimiento de Actividad",
        "descripcion": "Problema: Las conductas motoras repetitivas, como el aleteo de manos o el balanceo del cuerpo, son parte del perfil de muchos niños con trastorno del espectro autista; terapeutas y familias las registran a mano, lo que resulta impreciso y dificulta relacionarlas con situaciones de sobrecarga sensorial en casa o en la escuela.\n\nDescripción: Par de pulseras con unidad de medición inercial y ESP32-C3 que ejecutan un modelo TinyML de reconocimiento de actividad para identificar episodios de aleteo, balanceo y golpeteo, y registran su duración e intensidad. Los eventos se envían por BLE a una aplicación móvil para la familia y el terapeuta, que pueden anotar el contexto (ruido, cambios de rutina, transiciones) y consultar patrones semanales en un tablero. El enfoque respeta la neurodiversidad: el objetivo es comprender al niño y apoyar las terapias, no suprimir conductas. Requiere asentimiento del niño, consentimiento de los acudientes y es un prototipo de apoyo, no dispositivo médico certificado.",
        "area": "Neurociencia con AIoT",
        "sector": "Neurodesarrollo - Trastorno del Espectro Autista",
        "nivel": "Intermedio",
        "duracion": "Un semestre",
        "presupuesto": "Bajo costo",
        "habilidades": [
            "Reconocimiento de actividad humana con sensores inerciales",
            "Etiquetado de datos a partir de video sincronizado",
            "Despliegue de modelos TinyML en microcontroladores",
            "Desarrollo de aplicaciones móviles con BLE",
            "Diseño centrado en familias y terapeutas"
        ],
        "objetivos": [
            "🎯 Objetivo General: Desarrollar pulseras inerciales conectadas que reconozcan y registren conductas motoras repetitivas en niños con trastorno del espectro autista como apoyo al trabajo terapéutico.",
            "📌 Objetivos Específicos:",
            "• Construir un conjunto de datos etiquetado de aleteo, balanceo, golpeteo y actividades cotidianas con voluntarios adultos que imitan los movimientos.",
            "• Entrenar un modelo TinyML con exactitud superior al 85 % en la identificación de los tres tipos de conducta frente a las actividades cotidianas.",
            "• Desarrollar una aplicación móvil que reciba los eventos por BLE y permita anotar el contexto en el que ocurren.",
            "• Validar la usabilidad de la aplicación con terapeutas ocupacionales mediante la escala SUS."
        ],
        "pasos": [
            "Análisis de requisitos",
            "Diseño de la solución",
            "Implementación y pruebas",
            "Validación y sustentación"
        ],
        "aplicaciones": [
            "Neurodesarrollo - Trastorno del Espectro Autista"
        ],
        "referencias": [],
        "hardware_tabla": [
            {
                "componente": "Dos ESP32-C3 en formato compacto",
                "categoria": "Microcontrolador",
                "funcion": "Ejecutan el reconocimiento de actividad y transmiten los eventos por BLE."
            },
            {
                "componente": "Unidades de medición inercial BMI270",
                "categoria": "Sensor Inercial",
                "funcion": "Miden la aceleración y la rotación de cada muñeca."
            },
            {
                "componente": "Carcasas suaves de silicona impresas en 3D",
                "categoria": "Estructura / Componente Mecánico",
                "funcion": "Hacen las pulseras cómodas y tolerables para niños con sensibilidad táctil."
            },
            {
                "componente": "Baterías LiPo de 150 mAh",
                "categoria": "Fuente de Alimentación / Energía",
                "funcion": "Alimentan cada pulsera durante una jornada escolar."
            },
            {
                "componente": "Teléfono inteligente Android",
                "categoria": "Dispositivo Móvil",
                "funcion": "Recibe los eventos y ejecuta la aplicación de registro."
            }
        ],
        "software_tabla": [
            {
                "herramienta": "Edge Impulse",
                "tipo": "Plataforma TinyML",
                "descripcion": "Entrenamiento y exportación del modelo de reconocimiento de actividad."
            },
            {
                "herramienta": "Flutter",
                "tipo": "Framework de Aplicaciones Móviles",
                "descripcion": "Aplicación para familias y terapeutas con conexión BLE."
            },
            {
                "herramienta": "Firebase",
                "tipo": "Backend como Servicio",
                "descripcion": "Sincronización de eventos y tablero de patrones semanales."
            },
            {
                "herramienta": "Label Studio",
                "tipo": "Herramienta de Etiquetado de Datos",
                "descripcion": "Etiquetado de los registros a partir de video sincronizado."
            }
        ]
    },
    {
        "id": "proj_224",
        "titulo": "🚶 Proyecto 224: Tamizaje Temprano de Deterioro Neurocognitivo mediante Marcha en Doble Tarea y Análisis Acústico de la Voz",
        "descripcion": "Problema: Enfermedades neurodegenerativas como el Alzheimer y el Parkinson se diagnostican cuando el deterioro ya es evidente; en los centros de atención al adulto mayor del Cauca no existen herramientas objetivas y económicas para detectar señales tempranas que justifiquen una remisión a neurología.\n\nDescripción: Estación de tamizaje compuesta por dos sensores inerciales en los tobillos y un micrófono conectados a una Raspberry Pi, que aplica una prueba de marcha simple y en doble tarea (caminar mientras se cuenta hacia atrás o se nombran animales) y una tarea de lectura y habla espontánea. Se extraen el costo de doble tarea en la velocidad y variabilidad de la marcha y características acústicas y de fluidez de la voz, y un modelo de aprendizaje automático estima un índice de riesgo que se envía a un registro en la nube para el profesional de salud. El modelo de voz se prepara con conjuntos públicos de investigación. Es un prototipo de apoyo al tamizaje, no dispositivo médico certificado, y su uso con personas requiere consentimiento informado.",
        "area": "Neurociencia con AIoT",
        "sector": "Neurología - Enfermedades Neurodegenerativas",
        "nivel": "Avanzado",
        "duracion": "Un semestre",
        "presupuesto": "Bajo costo",
        "habilidades": [
            "Análisis de la marcha con sensores inerciales",
            "Extracción de características acústicas y prosódicas de la voz",
            "Fusión multimodal de características y aprendizaje supervisado",
            "Evaluación de modelos con conjuntos pequeños y validación cruzada",
            "Diseño de protocolos de tamizaje con adultos mayores"
        ],
        "objetivos": [
            "🎯 Objetivo General: Desarrollar una estación conectada de tamizaje que combine marcha en doble tarea y análisis de voz para estimar el riesgo de deterioro neurocognitivo en adultos mayores.",
            "📌 Objetivos Específicos:",
            "• Calcular velocidad, longitud de paso y variabilidad de la marcha con sensores inerciales y validarlas frente a un pasillo cronometrado y medido.",
            "• Extraer características acústicas y de fluidez verbal con eGeMAPS y evaluar su capacidad discriminativa en un conjunto público de investigación.",
            "• Entrenar un modelo multimodal que combine el costo de doble tarea y las características de voz y comparar su desempeño con cada modalidad por separado.",
            "• Implementar el envío seguro de resultados a un registro en la nube con control de acceso para el profesional de salud."
        ],
        "pasos": [
            "Análisis de requisitos",
            "Diseño de la solución",
            "Implementación y pruebas",
            "Validación y sustentación"
        ],
        "aplicaciones": [
            "Neurología - Enfermedades Neurodegenerativas"
        ],
        "referencias": [
            "Montero-Odasso, M. M., Sarquis-Adamson, Y., Speechley, M., Borrie, M. J., Hachinski, V. C., Wells, J., et al. (2017). Association of dual-task gait with incident dementia in mild cognitive impairment: Results from the Gait and Brain Study. JAMA Neurology, 74(7), 857–865."
        ],
        "hardware_tabla": [
            {
                "componente": "Dos unidades de medición inercial con ESP32 y BLE (tipo M5StickC Plus)",
                "categoria": "Sensor Inercial",
                "funcion": "Registran el movimiento de los tobillos durante la marcha."
            },
            {
                "componente": "Micrófono USB de condensador",
                "categoria": "Sensor de Audio",
                "funcion": "Graba las tareas de lectura, habla espontánea y fluidez verbal."
            },
            {
                "componente": "Raspberry Pi 5",
                "categoria": "Computador de Placa Única",
                "funcion": "Guía las pruebas, extrae características y ejecuta el modelo de riesgo."
            },
            {
                "componente": "Pantalla táctil de 7 pulgadas",
                "categoria": "Interfaz de Usuario / Iluminación",
                "funcion": "Presenta las instrucciones al evaluador y al participante."
            }
        ],
        "software_tabla": [
            {
                "herramienta": "openSMILE",
                "tipo": "Librería de Análisis de Audio",
                "descripcion": "Extracción del conjunto de características acústicas eGeMAPS."
            },
            {
                "herramienta": "Whisper",
                "tipo": "Modelo de Reconocimiento de Voz",
                "descripcion": "Transcripción local de las tareas verbales para medir fluidez."
            },
            {
                "herramienta": "scikit-learn",
                "tipo": "Framework de Aprendizaje Automático",
                "descripcion": "Entrenamiento del modelo multimodal de riesgo."
            },
            {
                "herramienta": "PostgreSQL",
                "tipo": "Base de Datos",
                "descripcion": "Registro de resultados con control de acceso por rol."
            }
        ]
    },
    {
        "id": "proj_225",
        "titulo": "🌩️ Proyecto 225: Diario Conectado de Migraña con Sensores Ambientales y Modelo Personalizado de Predicción de Crisis",
        "descripcion": "Problema: Las personas con migraña identifican sus desencadenantes por ensayo y error y suelen llevar diarios en papel incompletos; factores como los cambios de presión atmosférica, la luz intensa, el ruido o la falta de sueño son difíciles de registrar de manera objetiva, lo que limita la prevención de las crisis.\n\nDescripción: Sistema compuesto por una estación ambiental portátil con ESP32 que mide presión barométrica, temperatura, humedad, iluminación y nivel de ruido, y una aplicación móvil donde el usuario registra el inicio, la intensidad y los síntomas de cada crisis, además de horas de sueño y consumo de cafeína. Los datos se envían por MQTT a un servidor donde un modelo personalizado de aprendizaje automático estima el riesgo de crisis para las siguientes horas y muestra qué factores pesan más en cada persona. El sistema no diagnostica ni sustituye la consulta neurológica: es un prototipo de apoyo para el autocuidado, con consentimiento informado y protección de datos según la Ley 1581 de 2012.",
        "area": "Neurociencia con AIoT",
        "sector": "Neurología - Cefaleas",
        "nivel": "Intermedio",
        "duracion": "Un semestre",
        "presupuesto": "Bajo costo",
        "habilidades": [
            "Integración de sensores ambientales en microcontroladores",
            "Modelado de series de tiempo con datos de eventos",
            "Modelos personalizados y explicables de aprendizaje automático",
            "Desarrollo de aplicaciones móviles para registro de síntomas",
            "Protección de datos de salud"
        ],
        "objetivos": [
            "🎯 Objetivo General: Desarrollar un diario conectado de migraña que relacione variables ambientales y hábitos con la aparición de crisis mediante un modelo personalizado de predicción de riesgo.",
            "📌 Objetivos Específicos:",
            "• Construir una estación ambiental portátil que registre cinco variables cada cinco minutos y las sincronice por Wi-Fi.",
            "• Diseñar una aplicación móvil de registro de crisis basada en los criterios de la Clasificación Internacional de Cefaleas que el usuario complete en menos de un minuto.",
            "• Entrenar modelos personalizados de riesgo de crisis y explicar la importancia de cada factor con valores SHAP.",
            "• Evaluar el sistema con voluntarios durante al menos cuatro semanas y reportar la utilidad percibida."
        ],
        "pasos": [
            "Análisis de requisitos",
            "Diseño de la solución",
            "Implementación y pruebas",
            "Validación y sustentación"
        ],
        "aplicaciones": [
            "Neurología - Cefaleas"
        ],
        "referencias": [
            "Headache Classification Committee of the International Headache Society (IHS). (2018). The International Classification of Headache Disorders, 3rd edition. Cephalalgia, 38(1), 1–211."
        ],
        "hardware_tabla": [
            {
                "componente": "ESP32-C3",
                "categoria": "Microcontrolador",
                "funcion": "Lee los sensores ambientales y publica las mediciones por MQTT."
            },
            {
                "componente": "Sensor BME280",
                "categoria": "Sensor Ambiental",
                "funcion": "Mide presión barométrica, temperatura y humedad."
            },
            {
                "componente": "Sensor de iluminación BH1750 y micrófono MEMS INMP441",
                "categoria": "Sensor Ambiental",
                "funcion": "Miden la intensidad de luz y el nivel de ruido del entorno."
            },
            {
                "componente": "Batería LiPo con módulo de carga TP4056",
                "categoria": "Fuente de Alimentación / Energía",
                "funcion": "Permite llevar la estación en el bolso o el puesto de trabajo."
            },
            {
                "componente": "Teléfono inteligente del usuario",
                "categoria": "Dispositivo Móvil",
                "funcion": "Ejecuta la aplicación de registro de crisis y hábitos."
            }
        ],
        "software_tabla": [
            {
                "herramienta": "MicroPython",
                "tipo": "Entorno de Desarrollo Embebido",
                "descripcion": "Firmware de lectura de sensores y publicación MQTT."
            },
            {
                "herramienta": "Flutter",
                "tipo": "Framework de Aplicaciones Móviles",
                "descripcion": "Aplicación del diario de migraña."
            },
            {
                "herramienta": "LightGBM y SHAP",
                "tipo": "Framework de Aprendizaje Automático",
                "descripcion": "Modelo de riesgo personalizado y explicación de factores."
            },
            {
                "herramienta": "EMQX",
                "tipo": "Broker MQTT",
                "descripcion": "Recepción de las mediciones ambientales en el servidor."
            }
        ]
    },
    {
        "id": "proj_226",
        "titulo": "🧘 Proyecto 226: Neurofeedback de Ritmo Alfa con Biorretroalimentación Respiratoria para el Manejo de la Ansiedad en Estudiantes Universitarios",
        "descripcion": "Problema: La ansiedad es una de las principales causas de consulta en los servicios de bienestar universitario, que cuentan con pocos profesionales; las técnicas de relajación sin retroalimentación objetiva son difíciles de aprender y muchos estudiantes las abandonan antes de notar beneficios.\n\nDescripción: Sistema de neurofeedback que registra EEG en regiones parieto-occipitales con un front end de bajo costo y la respiración con una banda torácica de estiramiento, conectados a un ESP32 que transmite por BLE a una aplicación. Un modelo adaptativo estima en tiempo real el estado de relajación a partir de la potencia alfa relativa y de la regularidad respiratoria, y lo convierte en un paisaje sonoro y visual que se calma a medida que el usuario se relaja. Las sesiones se sincronizan con un tablero para el psicólogo de bienestar, que define el plan de entrenamiento. Es un complemento a la atención psicológica, no un tratamiento ni un dispositivo médico certificado, y su evaluación requiere aval ético y consentimiento informado.",
        "area": "Neurociencia con AIoT",
        "sector": "Neurociencia Aplicada - Salud Mental",
        "nivel": "Intermedio-Avanzado",
        "duracion": "Un semestre",
        "presupuesto": "Bajo costo",
        "habilidades": [
            "Procesamiento de EEG en tiempo real con ventanas deslizantes",
            "Medición de la respiración con sensores de estiramiento",
            "Modelos adaptativos de estimación de estados fisiológicos",
            "Diseño de retroalimentación audiovisual",
            "Ética en intervenciones con estudiantes"
        ],
        "objetivos": [
            "🎯 Objetivo General: Desarrollar un sistema conectado de neurofeedback que combine ritmo alfa y respiración para apoyar el entrenamiento en autorregulación de estudiantes con ansiedad.",
            "📌 Objetivos Específicos:",
            "• Implementar la adquisición de EEG y respiración con una latencia de retroalimentación inferior a 500 ms.",
            "• Diseñar un estimador adaptativo del estado de relajación que se calibre con una línea base de dos minutos por sesión.",
            "• Desarrollar la retroalimentación audiovisual y el tablero de sesiones para el psicólogo de bienestar universitario.",
            "• Realizar un piloto de cinco sesiones con voluntarios y comparar las puntuaciones de ansiedad autorreportada antes y después."
        ],
        "pasos": [
            "Análisis de requisitos",
            "Diseño de la solución",
            "Implementación y pruebas",
            "Validación y sustentación"
        ],
        "aplicaciones": [
            "Neurociencia Aplicada - Salud Mental"
        ],
        "referencias": [],
        "hardware_tabla": [
            {
                "componente": "Front end de EEG BioAmp EXG Pill con electrodos en Pz y Oz",
                "categoria": "Sensor Biomédico",
                "funcion": "Registra el ritmo alfa parieto-occipital."
            },
            {
                "componente": "Banda torácica con sensor de estiramiento conductivo",
                "categoria": "Sensor Biomédico",
                "funcion": "Mide la frecuencia y la regularidad respiratoria."
            },
            {
                "componente": "ESP32-S3",
                "categoria": "Microcontrolador",
                "funcion": "Digitaliza las señales y las transmite por BLE."
            },
            {
                "componente": "Audífonos y tableta",
                "categoria": "Dispositivo Móvil",
                "funcion": "Presentan la retroalimentación audiovisual al estudiante."
            },
            {
                "componente": "Batería LiPo aislada",
                "categoria": "Fuente de Alimentación / Energía",
                "funcion": "Alimenta la adquisición sin conexión a la red eléctrica."
            }
        ],
        "software_tabla": [
            {
                "herramienta": "BrainFlow",
                "tipo": "Librería de Adquisición de Bioseñales",
                "descripcion": "Recepción y filtrado en tiempo real de las señales."
            },
            {
                "herramienta": "Godot Engine",
                "tipo": "Motor de Videojuegos",
                "descripcion": "Paisaje sonoro y visual que responde al estado de relajación."
            },
            {
                "herramienta": "NumPy y SciPy",
                "tipo": "Librería de Procesamiento de Señales",
                "descripcion": "Cálculo de la potencia alfa relativa y de la regularidad respiratoria."
            },
            {
                "herramienta": "Grafana",
                "tipo": "Visualización / Dashboard",
                "descripcion": "Tablero de sesiones para el psicólogo de bienestar."
            }
        ]
    },
    {
        "id": "proj_237",
        "titulo": "🩻 Proyecto 237: Apoyo al Triaje de Hemorragia Intracraneal en TAC de Cráneo con Redes Convolucionales Entrenadas en Colab, Mapas Grad-CAM e Inferencia en Jetson",
        "descripcion": "Problema: En clínicas y hospitales del Cauca un TAC de cráneo con sospecha de hemorragia puede esperar horas hasta ser informado, porque en muchos municipios no hay radiólogo en sitio ni lectura remota continua; en la hemorragia intracraneal cada hora perdida aumenta el riesgo de secuelas graves o de muerte.\n\nDescripción: Sistema de apoyo a la decisión clínica que prioriza estudios de TAC de cráneo sin contraste. En Google Colab se entrena una red convolucional EfficientNet-B0 con transferencia de aprendizaje sobre un subconjunto anonimizado del conjunto público RSNA Intracranial Hemorrhage Detection, usando tres ventanas de Hounsfield (cerebro, subdural y hueso) como canales, y se valida de forma externa con CQ500. El modelo se exporta a ONNX y se optimiza con TensorRT en un Jetson Orin Nano que recibe los cortes DICOM desde un servidor Orthanc, calcula la probabilidad de hemorragia por estudio, genera mapas Grad-CAM y publica por MQTT una alerta de prioridad al médico. Se trata de un prototipo de apoyo, no dispositivo médico certificado, validado solo con conjuntos públicos anonimizados.",
        "area": "Neurociencia con AIoT",
        "sector": "Neurorradiología - Hemorragia Intracraneal en TAC",
        "nivel": "Intermedio-Avanzado",
        "duracion": "Un semestre",
        "presupuesto": "Bajo costo",
        "habilidades": [
            "Lectura y anonimización de estudios DICOM con ventanas de Hounsfield",
            "Entrenamiento de redes convolucionales con transferencia de aprendizaje",
            "Evaluación con curvas ROC y validación externa por conjunto",
            "Explicabilidad con mapas de activación Grad-CAM",
            "Optimización de modelos con ONNX y TensorRT",
            "Integración de servidores DICOM y alertas con MQTT"
        ],
        "objetivos": [
            "🎯 Objetivo General: Desarrollar y evaluar un prototipo de apoyo al triaje que estime la probabilidad de hemorragia intracraneal en TAC de cráneo anonimizados con una red neuronal entrenada y la ejecute en un dispositivo de borde con explicación visual.",
            "📌 Objetivos Específicos:",
            "• Preparar un subconjunto balanceado de al menos 20 000 cortes del conjunto RSNA con ventanas de Hounsfield, partición por paciente y verificación de la anonimización de los metadatos.",
            "• Entrenar la red en Colab y alcanzar un área bajo la curva ROC superior a 0,90 por estudio en la validación externa con el conjunto CQ500.",
            "• Cuantizar el modelo con TensorRT en un Jetson Orin Nano y lograr una inferencia inferior a 10 segundos por estudio, con una pérdida de AUC menor a 0,02 respecto al modelo original.",
            "• Generar mapas Grad-CAM y medir su coincidencia con las máscaras expertas de sangrado del conjunto CT-ICH de PhysioNet en los casos positivos disponibles.",
            "• Integrar el servidor Orthanc y la alerta por MQTT con un retardo menor a 1 minuto desde la recepción del último corte hasta el aviso al médico."
        ],
        "pasos": [
            "Análisis de requisitos",
            "Diseño de la solución",
            "Implementación y pruebas",
            "Validación y sustentación"
        ],
        "aplicaciones": [
            "Neurorradiología - Hemorragia Intracraneal en TAC"
        ],
        "referencias": [
            "Flanders, A. E., Prevedello, L. M., Shih, G., Halabi, S. S., Kalpathy-Cramer, J., Ball, R., … Kitamura, F. C. (2020). Construction of a machine learning dataset through collaboration: The RSNA 2019 Brain CT Hemorrhage Challenge. Radiology: Artificial Intelligence, 2(3), e190211.",
            "Selvaraju, R. R., Cogswell, M., Das, A., Vedantam, R., Parikh, D., & Batra, D. (2017). Grad-CAM: Visual explanations from deep networks via gradient-based localization. En Proceedings of the IEEE International Conference on Computer Vision (pp. 618–626)."
        ],
        "hardware_tabla": [
            {
                "componente": "Jetson Orin Nano Developer Kit de 8 GB",
                "categoria": "Computador de Placa Única",
                "funcion": "Ejecuta la inferencia optimizada y genera los mapas Grad-CAM en la clínica."
            },
            {
                "componente": "Estación de trabajo del laboratorio con GPU NVIDIA y 32 GB de RAM",
                "categoria": "Equipo de Cómputo",
                "funcion": "Preprocesa los DICOM y respalda el entrenamiento cuando Colab se agota."
            },
            {
                "componente": "Disco SSD NVMe de 500 GB",
                "categoria": "Almacenamiento",
                "funcion": "Guarda los estudios anonimizados y los puntos de control del entrenamiento."
            },
            {
                "componente": "Monitor de 24 pulgadas",
                "categoria": "Interfaz de Usuario / Iluminación",
                "funcion": "Muestra el visor con el corte, la probabilidad y el mapa de calor."
            },
            {
                "componente": "Red local aislada con router",
                "categoria": "Equipo de Red",
                "funcion": "Simula el enlace entre el tomógrafo y el nodo de borde de la clínica rural."
            }
        ],
        "software_tabla": [
            {
                "herramienta": "PyTorch y timm",
                "tipo": "Framework de Aprendizaje Automático",
                "descripcion": "Entrenamiento de EfficientNet-B0 con transferencia de aprendizaje."
            },
            {
                "herramienta": "TensorRT y ONNX Runtime",
                "tipo": "Motor de Inferencia Embebida",
                "descripcion": "Cuantización y ejecución del modelo en el Jetson Orin Nano."
            },
            {
                "herramienta": "Orthanc",
                "tipo": "Servidor DICOM",
                "descripcion": "Recepción y almacenamiento de los cortes enviados por el tomógrafo simulado."
            },
            {
                "herramienta": "pydicom",
                "tipo": "Librería de Imágenes Médicas",
                "descripcion": "Lectura de DICOM, anonimización y conversión a ventanas de Hounsfield."
            },
            {
                "herramienta": "Mosquitto",
                "tipo": "Broker MQTT",
                "descripcion": "Publicación de la alerta de prioridad al teléfono del médico."
            }
        ]
    },
    {
        "id": "proj_238",
        "titulo": "🔍 Proyecto 238: Segmentación Automática de Tumores Cerebrales en Resonancia Magnética Multimodal con Red 3D en MONAI y Cálculo del Volumen Tumoral en un Nodo de Borde",
        "descripcion": "Problema: El seguimiento de un glioma exige medir el volumen tumoral en resonancias de varias secuencias, una tarea manual de decenas de minutos que depende del observador; los pacientes del Cauca viajan lejos para una valoración neuroquirúrgica y con frecuencia llegan con estudios sin cuantificar ni comparar.\n\nDescripción: Se entrena en Colab una red SegResNet 3D con el marco MONAI sobre las cuatro secuencias (T1, T1 con gadolinio, T2 y FLAIR) de la tarea BrainTumour de Medical Segmentation Decathlon, derivada de BraTS, con aumento de datos, pérdida Dice-Focal y validación cruzada de cinco particiones. El modelo exportado a ONNX en FP16 corre en un Jetson Orin Nano que expone una API con FastAPI: recibe volúmenes NIfTI anonimizados y devuelve la máscara de edema, tumor no realzado y tumor realzado, el volumen en mililitros y un mapa de incertidumbre por aumento en la inferencia; además avisa por MQTT al especialista. El resultado se revisa en 3D Slicer. Se trata de un prototipo de apoyo, no dispositivo médico certificado, validado con datos públicos anonimizados.",
        "area": "Neurociencia con AIoT",
        "sector": "Neurooncología - Segmentación de Tumores Cerebrales",
        "nivel": "Avanzado",
        "duracion": "Un semestre",
        "presupuesto": "Bajo costo",
        "habilidades": [
            "Preprocesamiento de resonancias multimodales en formato NIfTI",
            "Entrenamiento de redes de segmentación 3D con MONAI",
            "Métricas de segmentación: Dice y distancia de Hausdorff",
            "Estimación de incertidumbre con aumento en la inferencia",
            "Exportación a ONNX y ejecución en FP16 en el borde",
            "Desarrollo de servicios de inferencia con FastAPI"
        ],
        "objetivos": [
            "🎯 Objetivo General: Desarrollar un prototipo de apoyo que segmente tumores cerebrales en resonancias magnéticas multimodales anonimizadas con una red 3D entrenada y calcule su volumen en un nodo de borde con mapas de incertidumbre.",
            "📌 Objetivos Específicos:",
            "• Preparar los 484 volúmenes de la tarea BrainTumour con normalización por secuencia, particiones por paciente y verificación visual de una muestra en 3D Slicer.",
            "• Entrenar la red SegResNet en Colab y alcanzar un Dice medio superior a 0,85 en tumor completo, 0,75 en núcleo tumoral y 0,65 en tumor realzado en la validación cruzada.",
            "• Exportar el modelo a ONNX en FP16 y segmentar un estudio completo en el Jetson Orin Nano en menos de 3 minutos con una diferencia de Dice menor a 0,01 respecto al original.",
            "• Calcular el volumen tumoral y comprobar que su error relativo frente a las máscaras expertas sea inferior al 15 % en el 80 % de los casos de prueba.",
            "• Generar mapas de incertidumbre y verificar que las regiones de mayor incertidumbre concentren los errores de segmentación del modelo."
        ],
        "pasos": [
            "Análisis de requisitos",
            "Diseño de la solución",
            "Implementación y pruebas",
            "Validación y sustentación"
        ],
        "aplicaciones": [
            "Neurooncología - Segmentación de Tumores Cerebrales"
        ],
        "referencias": [
            "Menze, B. H., Jakab, A., Bauer, S., Kalpathy-Cramer, J., Farahani, K., Kirby, J., … Van Leemput, K. (2015). The multimodal brain tumor image segmentation benchmark (BRATS). IEEE Transactions on Medical Imaging, 34(10), 1993–2024.",
            "Antonelli, M., Reinke, A., Bakas, S., Farahani, K., Kopp-Schneider, A., Landman, B. A., … Cardoso, M. J. (2022). The Medical Segmentation Decathlon. Nature Communications, 13, 4128."
        ],
        "hardware_tabla": [
            {
                "componente": "Jetson Orin Nano Developer Kit de 8 GB",
                "categoria": "Computador de Placa Única",
                "funcion": "Segmenta los volúmenes y calcula el volumen tumoral en el sitio de atención."
            },
            {
                "componente": "Estación de trabajo con GPU NVIDIA de 12 GB de memoria",
                "categoria": "Equipo de Cómputo",
                "funcion": "Entrena variantes de la red y ejecuta la validación cruzada completa."
            },
            {
                "componente": "Disco SSD externo de 1 TB",
                "categoria": "Almacenamiento",
                "funcion": "Aloja los volúmenes NIfTI, los puntos de control y los resultados."
            },
            {
                "componente": "Pantalla de 27 pulgadas con perfil de color calibrado",
                "categoria": "Interfaz de Usuario / Iluminación",
                "funcion": "Permite la revisión de las máscaras superpuestas en tres planos."
            }
        ],
        "software_tabla": [
            {
                "herramienta": "MONAI y PyTorch",
                "tipo": "Framework de Aprendizaje Automático",
                "descripcion": "Transformaciones, pérdida Dice-Focal y entrenamiento de SegResNet 3D."
            },
            {
                "herramienta": "ONNX Runtime con TensorRT",
                "tipo": "Motor de Inferencia Embebida",
                "descripcion": "Inferencia en FP16 por ventana deslizante en el Jetson Orin Nano."
            },
            {
                "herramienta": "3D Slicer",
                "tipo": "Visualización de Imágenes Médicas",
                "descripcion": "Revisión de máscaras, edición manual y cálculo de volúmenes de referencia."
            },
            {
                "herramienta": "FastAPI",
                "tipo": "Servicio Web de Inferencia",
                "descripcion": "Recibe los volúmenes NIfTI y devuelve la máscara y el reporte de volumen."
            },
            {
                "herramienta": "Mosquitto",
                "tipo": "Broker MQTT",
                "descripcion": "Aviso al especialista cuando termina cada segmentación."
            }
        ]
    },
    {
        "id": "proj_239",
        "titulo": "🌐 Proyecto 239: Aprendizaje Federado entre Nodos Hospitalarios Simulados para Estadificar el Alzheimer en Resonancia Magnética Estructural sin Compartir las Imágenes",
        "descripcion": "Problema: El Alzheimer suele diagnosticarse tarde en el Cauca, donde hay pocos neurólogos y ninguna base propia de resonancias; entrenar un buen modelo exigiría reunir imágenes de varias instituciones, pero la protección de datos y la desconfianza institucional impiden sacarlas de cada hospital.\n\nDescripción: Se entrena una red MobileNetV3 sobre cortes axiales de resonancias estructurales T1 del conjunto OASIS-1 (sujetos de 60 años o más, con escala CDR de 0, 0,5 y 1 o más) mediante aprendizaje federado: tres nodos que simulan hospitales, con particiones por sujeto y distinto balance de clases, entrenan localmente con Flower y envían solo los pesos a un servidor que los promedia con FedAvg y FedProx. Participan la estación con GPU, un Jetson Orin Nano y una Raspberry Pi 5 con un subconjunto reducido. Se compara el modelo federado con el centralizado y con los modelos aislados, y las predicciones se explican con Grad-CAM. Se trata de un prototipo de apoyo, no dispositivo médico certificado, validado con datos públicos anonimizados.",
        "area": "Neurociencia con AIoT",
        "sector": "Neurología - Alzheimer y Aprendizaje Federado",
        "nivel": "Avanzado",
        "duracion": "Un semestre",
        "presupuesto": "Bajo costo",
        "habilidades": [
            "Preprocesamiento de resonancias T1 y selección de cortes axiales",
            "Entrenamiento distribuido con aprendizaje federado en Flower",
            "Simulación de nodos con datos no idénticos entre instituciones",
            "Evaluación con exactitud balanceada y AUC macro por sujeto",
            "Privacidad diferencial y medición del costo de comunicación",
            "Explicabilidad con Grad-CAM en neuroimagen"
        ],
        "objetivos": [
            "🎯 Objetivo General: Evaluar con un prototipo de aprendizaje federado si tres nodos hospitalarios simulados pueden entrenar un modelo de estadificación de Alzheimer en resonancia estructural comparable al centralizado sin intercambiar imágenes.",
            "📌 Objetivos Específicos:",
            "• Construir tres particiones por sujeto del conjunto OASIS-1 con distintos balances de clase y diferencias de intensidad que imiten distintos equipos de resonancia.",
            "• Entrenar con Flower los modelos federados FedAvg y FedProx en cinco rondas como mínimo y alcanzar una AUC macro superior a 0,80 en un conjunto de prueba separado por sujeto.",
            "• Comparar la exactitud balanceada del modelo federado con la del centralizado y la de los modelos aislados, y lograr una diferencia menor a 5 puntos frente al centralizado.",
            "• Medir el volumen de datos transmitido por ronda y el tiempo de entrenamiento local en el Jetson Orin Nano y la Raspberry Pi 5.",
            "• Aplicar privacidad diferencial con Opacus y cuantificar la pérdida de AUC, y revisar los mapas Grad-CAM con un especialista en neuroimagen."
        ],
        "pasos": [
            "Análisis de requisitos",
            "Diseño de la solución",
            "Implementación y pruebas",
            "Validación y sustentación"
        ],
        "aplicaciones": [
            "Neurología - Alzheimer y Aprendizaje Federado"
        ],
        "referencias": [
            "Marcus, D. S., Wang, T. H., Parker, J., Csernansky, J. G., Morris, J. C., & Buckner, R. L. (2007). Open Access Series of Imaging Studies (OASIS): Cross-sectional MRI data in young, middle aged, nondemented, and demented older adults. Journal of Cognitive Neuroscience, 19(9), 1498–1507.",
            "McMahan, B., Moore, E., Ramage, D., Hampson, S., & Agüera y Arcas, B. (2017). Communication-efficient learning of deep networks from decentralized data. Proceedings of Machine Learning Research, 54, 1273–1282."
        ],
        "hardware_tabla": [
            {
                "componente": "Estación de trabajo con GPU NVIDIA y 32 GB de RAM",
                "categoria": "Equipo de Cómputo",
                "funcion": "Hace de servidor de agregación y de nodo hospitalario con entrenamiento local."
            },
            {
                "componente": "Jetson Orin Nano Developer Kit de 8 GB",
                "categoria": "Computador de Placa Única",
                "funcion": "Actúa como segundo nodo hospitalario con entrenamiento acelerado."
            },
            {
                "componente": "Raspberry Pi 5 con 8 GB de RAM y enfriador activo",
                "categoria": "Computador de Placa Única",
                "funcion": "Actúa como nodo de recursos limitados con un subconjunto reducido."
            },
            {
                "componente": "Switch Ethernet gigabit y router",
                "categoria": "Equipo de Red",
                "funcion": "Conecta los nodos y permite medir el tráfico de cada ronda federada."
            }
        ],
        "software_tabla": [
            {
                "herramienta": "Flower",
                "tipo": "Framework de Aprendizaje Federado",
                "descripcion": "Coordinación de rondas, estrategias FedAvg y FedProx y clientes."
            },
            {
                "herramienta": "PyTorch y torchvision",
                "tipo": "Framework de Aprendizaje Automático",
                "descripcion": "Entrenamiento de MobileNetV3 sobre cortes de resonancia."
            },
            {
                "herramienta": "Opacus",
                "tipo": "Librería de Privacidad Diferencial",
                "descripcion": "Entrenamiento local con ruido y recorte de gradientes."
            },
            {
                "herramienta": "nibabel y scikit-learn",
                "tipo": "Análisis de Datos",
                "descripcion": "Lectura de volúmenes, selección de cortes y cálculo de métricas por sujeto."
            },
            {
                "herramienta": "TensorBoard",
                "tipo": "Visualización / Dashboard",
                "descripcion": "Seguimiento de la pérdida, la exactitud y el tráfico de cada ronda."
            }
        ]
    },
    {
        "id": "proj_240",
        "titulo": "🚨 Proyecto 240: Detección de Crisis Epilépticas en EEG de Montaje Reducido con Red Convolucional Cuantizada para Microcontrolador y Validación en la Base CHB-MIT",
        "descripcion": "Problema: Las personas con epilepsia refractaria en zonas rurales del Cauca esperan meses por un video-EEG y entre consultas nadie registra cuántas crisis tienen ni cuándo; un detector de EEG de pocos canales que funcione junto al paciente permitiría documentar las crisis y avisar al cuidador sin enviar todo el registro a un servidor.\n\nDescripción: Se entrena en la estación del laboratorio una red convolucional compacta tipo EEGNet con cuatro canales bipolares temporales de la base pública CHB-MIT de PhysioNet, ventanas de 4 segundos, partición por paciente y suavizado de decisiones consecutivas. El modelo se cuantiza a enteros de 8 bits con TensorFlow Lite para Microcontroladores y se ejecuta en un ESP32-S3 conectado a un front end ADS1299 de cuatro canales. La validación reproduce grabaciones de CHB-MIT por el puerto serie y mide las falsas alarmas por artefactos con voluntarios sanos; la alerta viaja por BLE y MQTT al teléfono del cuidador. Se trata de un prototipo de apoyo, no dispositivo médico certificado, validado con datos públicos anonimizados y voluntarios sanos bajo consentimiento informado.",
        "area": "Neurociencia con AIoT",
        "sector": "Neurofisiología - Detección de Crisis por EEG en el Borde",
        "nivel": "Avanzado",
        "duracion": "Un semestre",
        "presupuesto": "Bajo costo",
        "habilidades": [
            "Lectura de registros EDF y anotaciones de crisis con MNE-Python",
            "Filtrado y segmentación de EEG en ventanas con partición por paciente",
            "Entrenamiento de redes compactas para series temporales",
            "Cuantización a 8 bits y despliegue en microcontroladores",
            "Evaluación por evento: sensibilidad y falsas alarmas por hora",
            "Pruebas de hardware en el lazo con puerto serie"
        ],
        "objetivos": [
            "🎯 Objetivo General: Desarrollar y validar un detector de crisis epilépticas en EEG de cuatro canales con una red cuantizada que se ejecute íntegramente en un microcontrolador y avise a un cuidador en pocos segundos.",
            "📌 Objetivos Específicos:",
            "• Procesar la base CHB-MIT con un montaje de cuatro canales temporales, ventanas de 4 segundos y particiones de entrenamiento y prueba separadas por paciente.",
            "• Entrenar la red y lograr una sensibilidad por evento superior al 80 % con menos de 2 falsas alarmas por hora en los pacientes de prueba.",
            "• Cuantizar el modelo a 8 bits para que ocupe menos de 150 KB y se ejecute en menos de 100 ms por ventana en el ESP32-S3, y documentar la diferencia de métricas frente al modelo en el PC.",
            "• Implementar la cadena de alerta ESP32-S3, BLE, teléfono y MQTT con una latencia media de detección inferior a 15 segundos desde el inicio anotado de la crisis.",
            "• Medir en registros de voluntarios sanos con parpadeos, masticación y movimiento la tasa de falsas alarmas por artefactos del dispositivo."
        ],
        "pasos": [
            "Análisis de requisitos",
            "Diseño de la solución",
            "Implementación y pruebas",
            "Validación y sustentación"
        ],
        "aplicaciones": [
            "Neurofisiología - Detección de Crisis por EEG en el Borde"
        ],
        "referencias": [
            "Goldberger, A. L., Amaral, L. A. N., Glass, L., Hausdorff, J. M., Ivanov, P. C., Mark, R. G., … Stanley, H. E. (2000). PhysioBank, PhysioToolkit, and PhysioNet: Components of a new research resource for complex physiologic signals. Circulation, 101(23), e215–e220.",
            "Shoeb, A. H. (2009). Application of machine learning to epileptic seizure onset detection and treatment [Tesis doctoral, Massachusetts Institute of Technology]."
        ],
        "hardware_tabla": [
            {
                "componente": "Tarjeta de EEG de 4 canales basada en ADS1299",
                "categoria": "Sensor Biomédico",
                "funcion": "Adquiere el EEG temporal con resolución de 24 bits y bajo ruido."
            },
            {
                "componente": "ESP32-S3 con 8 MB de PSRAM",
                "categoria": "Microcontrolador",
                "funcion": "Ejecuta el modelo cuantizado y envía las alertas por BLE y Wi-Fi."
            },
            {
                "componente": "Diadema con electrodos secos en F7, T7, F8 y T8",
                "categoria": "Sensor Biomédico",
                "funcion": "Ubica los electrodos sobre las regiones temporales frecuentes en las crisis."
            },
            {
                "componente": "Batería LiPo de 1000 mAh con aislamiento galvánico",
                "categoria": "Fuente de Alimentación / Energía",
                "funcion": "Alimenta el sistema sin conexión a la red eléctrica por seguridad del usuario."
            },
            {
                "componente": "Estación de trabajo con GPU NVIDIA",
                "categoria": "Equipo de Cómputo",
                "funcion": "Entrena los modelos y reproduce los registros CHB-MIT por el puerto serie."
            }
        ],
        "software_tabla": [
            {
                "herramienta": "MNE-Python",
                "tipo": "Librería de Procesamiento de Señales",
                "descripcion": "Lectura de EDF, montajes bipolares, filtrado y ventanas de EEG."
            },
            {
                "herramienta": "TensorFlow y Keras",
                "tipo": "Framework de Aprendizaje Automático",
                "descripcion": "Entrenamiento de la red tipo EEGNet con validación por paciente."
            },
            {
                "herramienta": "TensorFlow Lite para Microcontroladores",
                "tipo": "Motor de Inferencia Embebida",
                "descripcion": "Ejecución de la red cuantizada en el ESP32-S3."
            },
            {
                "herramienta": "ESP-IDF",
                "tipo": "Entorno de Desarrollo Embebido",
                "descripcion": "Firmware de adquisición, inferencia, BLE y comunicación con el broker."
            },
            {
                "herramienta": "Mosquitto",
                "tipo": "Broker MQTT",
                "descripcion": "Entrega de la alerta al teléfono del cuidador."
            }
        ]
    },
    {
        "id": "proj_241",
        "titulo": "🦾 Proyecto 241: Interfaz Cerebro-Máquina de Imaginación Motora con EEGNet Preentrenada para Controlar una Mano Robótica Asistiva Impresa en 3D de Bajo Costo",
        "descripcion": "Problema: Tras un accidente cerebrovascular o una lesión medular, muchas personas conservan la intención de mover la mano pero no la ejecución, y los sistemas de asistencia controlados por actividad cerebral cuestan miles de dólares y no tienen soporte técnico en el Cauca; los estudiantes tampoco disponen de plataformas abiertas para investigar.\n\nDescripción: Interfaz cerebro-máquina no invasiva que decodifica la imaginación del movimiento de la mano derecha frente al reposo a partir de EEG sobre la corteza sensoriomotora. Se preentrena una EEGNet en Colab con el conjunto público PhysioNet EEG Motor Movement/Imagery, que incluye 109 voluntarios, y se ajusta con una sesión de calibración de 15 minutos por usuario. Un OpenBCI Cyton de 8 canales transmite a una Raspberry Pi 5 que clasifica ventanas de 2 segundos y envía órdenes por Wi-Fi a un ESP32 que cierra o abre una mano robótica impresa en 3D con cinco servomotores; el estado se publica por MQTT para el terapeuta. Se trata de un prototipo de apoyo, no dispositivo médico certificado, validado con voluntarios sanos bajo consentimiento informado.",
        "area": "Neurociencia con AIoT",
        "sector": "Neurotecnología - Control de Dispositivos Asistivos",
        "nivel": "Intermedio-Avanzado",
        "duracion": "Un semestre",
        "presupuesto": "Bajo costo",
        "habilidades": [
            "Registro de EEG sensoriomotor y análisis de ritmos mu y beta",
            "Transferencia de aprendizaje con redes compactas para EEG",
            "Calibración y evaluación en línea de interfaces cerebro-máquina",
            "Diseño y control de una mano robótica con servomotores",
            "Comunicación Wi-Fi y MQTT entre nodos",
            "Seguridad eléctrica y ética con voluntarios"
        ],
        "objetivos": [
            "🎯 Objetivo General: Desarrollar una interfaz cerebro-máquina de imaginación motora con una red preentrenada y ajustada por usuario que controle en tiempo casi real una mano robótica asistiva de bajo costo.",
            "📌 Objetivos Específicos:",
            "• Preentrenar la EEGNet en Colab con los canales equivalentes al montaje de 8 canales y alcanzar una exactitud superior al 75 % para mano derecha frente a reposo en sujetos no vistos tras el ajuste.",
            "• Implementar la adquisición con el OpenBCI Cyton y el clasificador en la Raspberry Pi 5 con un retardo entre la ventana de EEG y el movimiento del servomotor inferior a 1 segundo.",
            "• Construir la mano robótica impresa en 3D con cinco servomotores, límites de fuerza y parada de emergencia verificados.",
            "• Evaluar en línea con al menos cinco voluntarios sanos una exactitud superior al 70 % y menos del 10 % de activaciones falsas durante el reposo."
        ],
        "pasos": [
            "Análisis de requisitos",
            "Diseño de la solución",
            "Implementación y pruebas",
            "Validación y sustentación"
        ],
        "aplicaciones": [
            "Neurotecnología - Control de Dispositivos Asistivos"
        ],
        "referencias": [
            "Lawhern, V. J., Solon, A. J., Waytowich, N. R., Gordon, S. M., Hung, C. P., & Lance, B. J. (2018). EEGNet: A compact convolutional neural network for EEG-based brain–computer interfaces. Journal of Neural Engineering, 15(5), 056013.",
            "Schalk, G., McFarland, D. J., Hinterberger, T., Birbaumer, N., & Wolpaw, J. R. (2004). BCI2000: A general-purpose brain-computer interface (BCI) system. IEEE Transactions on Biomedical Engineering, 51(6), 1034–1043."
        ],
        "hardware_tabla": [
            {
                "componente": "Tarjeta de EEG de 8 canales basada en ADS1299 (tipo OpenBCI Cyton)",
                "categoria": "Sensor Biomédico",
                "funcion": "Registra la actividad sensoriomotora con resolución de 24 bits."
            },
            {
                "componente": "Gorro con electrodos en C3, Cz, C4, FC1, FC2, CP1, CP2 y Pz",
                "categoria": "Sensor Biomédico",
                "funcion": "Cubre la corteza motora donde cambian los ritmos mu y beta."
            },
            {
                "componente": "Raspberry Pi 5 con 8 GB de RAM",
                "categoria": "Computador de Placa Única",
                "funcion": "Ejecuta el preprocesamiento y la red ajustada, y envía las órdenes."
            },
            {
                "componente": "ESP32 con driver PCA9685",
                "categoria": "Microcontrolador",
                "funcion": "Genera las señales de los cinco servomotores de la mano robótica."
            },
            {
                "componente": "Mano robótica impresa en 3D con servomotores MG90S",
                "categoria": "Actuador",
                "funcion": "Cierra y abre los dedos según la orden decodificada."
            },
            {
                "componente": "Batería portátil aislada y pulsador de parada de emergencia",
                "categoria": "Fuente de Alimentación / Energía",
                "funcion": "Aísla al usuario de la red eléctrica y detiene los servomotores."
            }
        ],
        "software_tabla": [
            {
                "herramienta": "BrainFlow",
                "tipo": "Librería de Adquisición de Bioseñales",
                "descripcion": "Lectura de los datos del OpenBCI Cyton en tiempo real."
            },
            {
                "herramienta": "PyTorch y braindecode",
                "tipo": "Framework de Aprendizaje Automático",
                "descripcion": "Preentrenamiento y ajuste fino de EEGNet con el conjunto público."
            },
            {
                "herramienta": "MNE-Python",
                "tipo": "Librería de Procesamiento de Señales",
                "descripcion": "Filtrado, referencia, épocas y análisis de la desincronización mu."
            },
            {
                "herramienta": "PsychoPy",
                "tipo": "Software de Estimulación Experimental",
                "descripcion": "Presentación de las instrucciones de imaginación y reposo."
            },
            {
                "herramienta": "Mosquitto",
                "tipo": "Broker MQTT",
                "descripcion": "Publicación de órdenes y del estado de la mano para el terapeuta."
            }
        ]
    },
    {
        "id": "proj_242",
        "titulo": "🚌 Proyecto 242: Detección de Somnolencia en Conductores de Transporte Público con EEG de Cuatro Canales, Cámara Infrarroja y Alarma en Cabina mediante Aprendizaje Automático",
        "descripcion": "Problema: Los conductores de buses intermunicipales y mototaxis del Cauca cumplen jornadas largas por carreteras de montaña, y la somnolencia es una causa reconocida de siniestros viales evitables; las empresas controlan las horas de conducción pero no el estado real de alerta, y los sistemas comerciales de monitoreo de fatiga son costosos.\n\nDescripción: Sistema de dos modalidades que estima la somnolencia. Una diadema OpenBCI Ganglion de cuatro canales registra EEG frontal y occipital, y una cámara infrarroja con una Raspberry Pi 5 mide el cierre ocular (PERCLOS) con MediaPipe Face Mesh. Con las potencias theta y alfa y la tasa de parpadeo, un bosque aleatorio, comparado con una red ligera, clasifica alerta y somnolencia tomando como referencia los lapsos de la tarea de vigilancia psicomotora y la Escala de Somnolencia de Karolinska. Se prueba en un simulador de conducción del laboratorio; ante somnolencia suena una alarma en cabina y el evento se registra por MQTT. Se trata de un prototipo de apoyo, no un dispositivo certificado de seguridad vial, validado con voluntarios bajo consentimiento informado.",
        "area": "Neurociencia con AIoT",
        "sector": "Seguridad Vial - Fatiga del Conductor",
        "nivel": "Intermedio",
        "duracion": "Un semestre",
        "presupuesto": "Bajo costo",
        "habilidades": [
            "Extracción de potencias espectrales de EEG en bandas theta y alfa",
            "Detección de parpadeo y cálculo de PERCLOS con visión artificial",
            "Diseño de protocolos de vigilancia psicomotora con voluntarios",
            "Fusión de características de EEG y video con aprendizaje automático",
            "Validación dejando un sujeto fuera",
            "Diseño de alertas en cabina y registro de eventos con MQTT"
        ],
        "objetivos": [
            "🎯 Objetivo General: Desarrollar un sistema que combine EEG de cuatro canales y video infrarrojo para clasificar la somnolencia de un conductor en un simulador y activar una alarma en cabina con baja tasa de falsas alertas.",
            "📌 Objetivos Específicos:",
            "• Registrar sesiones de al menos 10 voluntarios en un simulador de conducción monótona con EEG, video infrarrojo, lapsos de la tarea de vigilancia y escala de Karolinska.",
            "• Entrenar el clasificador de alerta y somnolencia con EEG, PERCLOS y parpadeo, y alcanzar una exactitud superior al 80 % en validación dejando un sujeto fuera.",
            "• Comparar el desempeño de EEG solo, video solo y fusión de ambos, e identificar cuál modalidad aporta más y cuál es más robusta a artefactos.",
            "• Implementar la alarma en cabina y el registro por MQTT con una latencia inferior a 3 segundos y menos de una falsa alarma cada 10 minutos en estado de alerta."
        ],
        "pasos": [
            "Análisis de requisitos",
            "Diseño de la solución",
            "Implementación y pruebas",
            "Validación y sustentación"
        ],
        "aplicaciones": [
            "Seguridad Vial - Fatiga del Conductor"
        ],
        "referencias": [
            "Åkerstedt, T., & Gillberg, M. (1990). Subjective and objective sleepiness in the active individual. International Journal of Neuroscience, 52(1–2), 29–37."
        ],
        "hardware_tabla": [
            {
                "componente": "Diadema de EEG de 4 canales tipo OpenBCI Ganglion",
                "categoria": "Sensor Biomédico",
                "funcion": "Registra EEG frontal y occipital y lo transmite por BLE."
            },
            {
                "componente": "Raspberry Pi 5 con 8 GB de RAM",
                "categoria": "Computador de Placa Única",
                "funcion": "Procesa EEG y video, ejecuta el clasificador y activa la alarma."
            },
            {
                "componente": "Cámara Raspberry Pi Camera Module 3 NoIR con LED infrarrojos de 850 nm",
                "categoria": "Sensor de Imagen",
                "funcion": "Captura los ojos del conductor con poca luz y de noche."
            },
            {
                "componente": "Zumbador y luz LED en cabina",
                "categoria": "Interfaz de Usuario / Iluminación",
                "funcion": "Emiten la alarma al detectar somnolencia."
            },
            {
                "componente": "Simulador de conducción con volante y pedales USB",
                "categoria": "Equipo de Cómputo",
                "funcion": "Reproduce una ruta monótona para provocar y medir la somnolencia."
            }
        ],
        "software_tabla": [
            {
                "herramienta": "BrainFlow",
                "tipo": "Librería de Adquisición de Bioseñales",
                "descripcion": "Lectura del EEG de la diadema y cálculo de potencias por banda."
            },
            {
                "herramienta": "MediaPipe Face Mesh y OpenCV",
                "tipo": "Visión por Computador",
                "descripcion": "Detección de puntos del rostro, parpadeo y porcentaje de cierre ocular."
            },
            {
                "herramienta": "scikit-learn",
                "tipo": "Framework de Aprendizaje Automático",
                "descripcion": "Entrenamiento y validación del bosque aleatorio con un sujeto fuera."
            },
            {
                "herramienta": "PsychoPy",
                "tipo": "Software de Estimulación Experimental",
                "descripcion": "Tarea de vigilancia psicomotora y registro de lapsos."
            },
            {
                "herramienta": "Mosquitto y Grafana",
                "tipo": "Broker MQTT",
                "descripcion": "Registro de eventos y tablero de alertas para el despachador."
            }
        ]
    },
    {
        "id": "proj_243",
        "titulo": "👁️ Proyecto 243: Pupilometría Infrarroja de Bajo Costo con Segmentación Pupilar por Red Neuronal Ligera para el Tamizaje del Reflejo Fotomotor en Deportistas Universitarios",
        "descripcion": "Problema: Tras un golpe en la cabeza durante un partido o un entrenamiento, los deportistas universitarios suelen seguir jugando porque nadie valora la conmoción cerebral en la cancha; los pupilómetros portátiles miden el reflejo fotomotor de forma objetiva, pero su costo los deja fuera de las ligas y colegios del Cauca.\n\nDescripción: Pupilómetro portátil con una cámara infrarroja NoIR de 90 cuadros por segundo dentro de un visor impreso en 3D con LED infrarrojos y un LED blanco de estímulo. Una U-Net ligera, entrenada en Colab con cuadros públicos de pupilas (por ejemplo, LPW) y 500 cuadros propios etiquetados, segmenta la pupila en una Raspberry Pi 5; de la curva de diámetro se calculan latencia, velocidad de constricción, amplitud y recuperación. Cada medición se compara con la línea base individual del deportista y un detector de anomalías marca desviaciones y las envía por MQTT al cuerpo médico. Es un prototipo de apoyo, no dispositivo médico certificado, no diagnostica conmoción y se valida con ojos artificiales y voluntarios sanos bajo consentimiento informado.",
        "area": "Neurociencia con AIoT",
        "sector": "Neurotrauma - Conmoción Cerebral en el Deporte",
        "nivel": "Intermedio-Avanzado",
        "duracion": "Un semestre",
        "presupuesto": "Bajo costo",
        "habilidades": [
            "Imagen infrarroja de pupila y diseño de estímulos luminosos controlados",
            "Segmentación con redes U-Net ligeras y etiquetado con CVAT",
            "Extracción de parámetros de la curva del reflejo fotomotor",
            "Detección de anomalías respecto a una línea base individual",
            "Calibración con ojos artificiales de diámetro conocido",
            "Ética en el uso de datos de salud de deportistas"
        ],
        "objetivos": [
            "🎯 Objetivo General: Desarrollar un pupilómetro infrarrojo de bajo costo que mida con una red de segmentación ligera los parámetros del reflejo fotomotor y los compare con la línea base de cada deportista como apoyo al tamizaje.",
            "📌 Objetivos Específicos:",
            "• Construir el visor con cámara infrarroja, LED de estímulo y control de temporización, y registrar videos a 90 cuadros por segundo con iluminación reproducible.",
            "• Entrenar la red de segmentación y lograr una intersección sobre la unión superior a 0,90 en el conjunto de prueba y un error medio del diámetro inferior a 0,3 mm con ojos artificiales de 2 a 8 mm.",
            "• Medir en 10 voluntarios sanos tres veces el reflejo y obtener un coeficiente de variación inferior al 10 % en la latencia y la velocidad de constricción.",
            "• Implementar el detector de anomalías por línea base y estimar su tasa de alertas falsas en sesiones de voluntarios sanos en días distintos, con un objetivo menor al 10 %."
        ],
        "pasos": [
            "Análisis de requisitos",
            "Diseño de la solución",
            "Implementación y pruebas",
            "Validación y sustentación"
        ],
        "aplicaciones": [
            "Neurotrauma - Conmoción Cerebral en el Deporte"
        ],
        "referencias": [],
        "hardware_tabla": [
            {
                "componente": "Raspberry Pi Camera Module 3 NoIR con objetivo macro",
                "categoria": "Sensor de Imagen",
                "funcion": "Graba la pupila a 90 cuadros por segundo con luz infrarroja."
            },
            {
                "componente": "Raspberry Pi 5 con 8 GB de RAM",
                "categoria": "Computador de Placa Única",
                "funcion": "Segmenta la pupila, calcula los parámetros y sincroniza los resultados."
            },
            {
                "componente": "LED infrarrojos de 850 nm y LED blanco de estímulo con control de intensidad",
                "categoria": "Interfaz de Usuario / Iluminación",
                "funcion": "Iluminan el ojo sin molestia y provocan el reflejo con un pulso calibrado."
            },
            {
                "componente": "Visor impreso en 3D con copa ocular y sensor de luz BH1750",
                "categoria": "Estructura / Componente Mecánico",
                "funcion": "Aísla la luz ambiente y registra la intensidad real del estímulo."
            },
            {
                "componente": "Ojos artificiales impresos con pupilas de 2 a 8 mm",
                "categoria": "Instrumento de Referencia",
                "funcion": "Permiten calibrar la medición del diámetro en milímetros."
            }
        ],
        "software_tabla": [
            {
                "herramienta": "PyTorch",
                "tipo": "Framework de Aprendizaje Automático",
                "descripcion": "Entrenamiento de la U-Net ligera para segmentar la pupila."
            },
            {
                "herramienta": "OpenCV",
                "tipo": "Visión por Computador",
                "descripcion": "Preprocesamiento, ajuste de elipse y seguimiento del diámetro pupilar."
            },
            {
                "herramienta": "CVAT",
                "tipo": "Herramienta de Etiquetado",
                "descripcion": "Etiquetado de los 500 cuadros propios para el ajuste fino."
            },
            {
                "herramienta": "SciPy y scikit-learn",
                "tipo": "Análisis de Datos",
                "descripcion": "Parámetros de la curva y detector de anomalías por línea base."
            },
            {
                "herramienta": "Mosquitto y Grafana",
                "tipo": "Broker MQTT",
                "descripcion": "Sincronización de mediciones y tablero de seguimiento por deportista."
            }
        ]
    },
    {
        "id": "proj_244",
        "titulo": "🎙️ Proyecto 244: Tamizaje Acústico de la Enfermedad de Parkinson a partir de la Vocal Sostenida con Aprendizaje Automático y Estación de Grabación para Puestos de Salud",
        "descripcion": "Problema: El Parkinson se detecta tarde en el Cauca porque la consulta de neurología queda lejos y sus primeros signos, como la voz baja, monótona y temblorosa, suelen atribuirse a la edad; una grabación de pocos segundos podría ayudar al personal de atención primaria a decidir a quién remitir, pero no existe una herramienta local de tamizaje.\n\nDescripción: Estación de grabación con una Raspberry Pi 5, micrófono de condensador USB y pantalla táctil que guía al paciente para sostener la vocal /a/ durante cinco segundos. Con Parselmouth se extraen jitter, shimmer, relación armónico-ruido y coeficientes MFCC. En el laboratorio se entrenan máquinas de vectores de soporte y XGBoost sobre el conjunto público UCI Parkinsons, con validación cruzada por sujeto, y se comparan con una red 1D sobre MFCC. El modelo corre en el borde, muestra un nivel de riesgo bajo, medio o alto con una recomendación de remisión y guarda solo las características, no el audio, en un tablero para el médico. Se trata de un prototipo de apoyo, no dispositivo médico certificado, validado con datos públicos y voluntarios sanos bajo consentimiento informado.",
        "area": "Neurociencia con AIoT",
        "sector": "Neurología - Biomarcadores Acústicos del Parkinson",
        "nivel": "Intermedio",
        "duracion": "Un semestre",
        "presupuesto": "Bajo costo",
        "habilidades": [
            "Grabación de voz con protocolo de vocal sostenida",
            "Extracción de jitter, shimmer y relación armónico-ruido con Parselmouth",
            "Validación cruzada agrupada por sujeto para evitar fuga de datos",
            "Comparación de modelos clásicos y redes 1D sobre MFCC",
            "Robustez al ruido ambiental y calibración de umbrales de riesgo",
            "Protección de datos de voz según la Ley 1581 de 2012"
        ],
        "objetivos": [
            "🎯 Objetivo General: Desarrollar una estación de bajo costo que, a partir de la vocal sostenida, estime el riesgo acústico de Parkinson con un modelo entrenado en datos públicos y ayude al personal de salud a decidir una remisión.",
            "📌 Objetivos Específicos:",
            "• Extraer las características acústicas del conjunto UCI Parkinsons y entrenar tres modelos con validación cruzada agrupada por sujeto, reportando el AUC con su intervalo de confianza.",
            "• Alcanzar un AUC superior a 0,85 con el mejor modelo y una caída menor a 5 puntos cuando se añade ruido con una relación señal a ruido de 20 dB.",
            "• Implementar la estación en la Raspberry Pi 5 para que una grabación produzca el nivel de riesgo en menos de 3 segundos sin almacenar el audio.",
            "• Evaluar con al menos 20 voluntarios sanos de 50 años o más la especificidad del sistema y la usabilidad, con una puntuación media superior a 4 sobre 5 en una encuesta breve."
        ],
        "pasos": [
            "Análisis de requisitos",
            "Diseño de la solución",
            "Implementación y pruebas",
            "Validación y sustentación"
        ],
        "aplicaciones": [
            "Neurología - Biomarcadores Acústicos del Parkinson"
        ],
        "referencias": [
            "Little, M. A., McSharry, P. E., Roberts, S. J., Costello, D. A. E., & Moroz, I. M. (2007). Exploiting nonlinear recurrence and fractal scaling properties for voice disorder detection. BioMedical Engineering OnLine, 6, 23."
        ],
        "hardware_tabla": [
            {
                "componente": "Raspberry Pi 5 con 8 GB de RAM",
                "categoria": "Computador de Placa Única",
                "funcion": "Extrae las características de voz y ejecuta el modelo en el sitio."
            },
            {
                "componente": "Micrófono de condensador USB con filtro antipop",
                "categoria": "Sensor de Audio",
                "funcion": "Captura la vocal sostenida con calidad uniforme entre grabaciones."
            },
            {
                "componente": "Pantalla táctil de 7 pulgadas",
                "categoria": "Interfaz de Usuario / Iluminación",
                "funcion": "Guía al paciente y muestra el nivel de riesgo y la recomendación."
            },
            {
                "componente": "Sonómetro de referencia o aplicación calibrada",
                "categoria": "Instrumento de Referencia",
                "funcion": "Verifica el nivel de ruido ambiental antes de cada grabación."
            }
        ],
        "software_tabla": [
            {
                "herramienta": "Parselmouth (Praat)",
                "tipo": "Librería de Procesamiento de Señales",
                "descripcion": "Cálculo de jitter, shimmer, relación armónico-ruido y MFCC."
            },
            {
                "herramienta": "scikit-learn y XGBoost",
                "tipo": "Framework de Aprendizaje Automático",
                "descripcion": "Entrenamiento de SVM y modelos de árboles con validación por sujeto."
            },
            {
                "herramienta": "PyTorch",
                "tipo": "Framework de Aprendizaje Automático",
                "descripcion": "Red 1D sobre MFCC para comparar con los modelos clásicos."
            },
            {
                "herramienta": "Streamlit",
                "tipo": "Visualización / Dashboard",
                "descripcion": "Interfaz de la estación y tablero de riesgo para el médico."
            },
            {
                "herramienta": "SQLite",
                "tipo": "Base de Datos",
                "descripcion": "Almacena solo las características y el resultado de cada grabación."
            }
        ]
    },
    {
        "id": "proj_245",
        "titulo": "🤸 Proyecto 245: Teleejercicio para Neurorrehabilitación de Equilibrio y Levantarse de la Silla con Estimación de Pose por Video Procesada en el Borde",
        "descripcion": "Problema: Después de un accidente cerebrovascular o con enfermedad de Parkinson, los ejercicios de equilibrio y de levantarse de la silla deben repetirse a diario en casa, pero los pacientes del Cauca viven lejos de los fisioterapeutas, los hacen sin corrección y el terapeuta no sabe cuántos realizaron ni con qué calidad.\n\nDescripción: Una Raspberry Pi 5 con Camera Module 3 y un televisor guía al paciente en tres ejercicios: levantarse de la silla cinco veces, apoyo en tándem y transferencia de peso. La estimación de pose con MediaPipe BlazePose o MoveNet se ejecuta en el borde; con los puntos clave se calculan repeticiones, tiempo total, inclinación del tronco y simetría de rodillas, y un clasificador sencillo etiqueta la calidad como adecuada, con compensación o con riesgo de caída. Solo se guardan los puntos clave, nunca el video, y se envían por MQTT a un tablero del fisioterapeuta, que ajusta la rutina. Se trata de un prototipo de apoyo, no dispositivo médico certificado, validado con goniómetro y sensor inercial en voluntarios sanos y, con aval ético, con pacientes bajo consentimiento informado.",
        "area": "Neurociencia con AIoT",
        "sector": "Neurorrehabilitación - Teleejercicio con Visión Artificial",
        "nivel": "Intermedio",
        "duracion": "Un semestre",
        "presupuesto": "Bajo costo",
        "habilidades": [
            "Estimación de pose humana con modelos ligeros en el borde",
            "Cálculo de ángulos articulares y detección de repeticiones",
            "Clasificación de la calidad del movimiento con características cinemáticas",
            "Diseño de interfaces de guía para adultos mayores",
            "Privacidad por diseño: almacenar puntos clave y no video",
            "Validación con goniómetro y sensores inerciales"
        ],
        "objetivos": [
            "🎯 Objetivo General: Desarrollar un sistema de teleejercicio que mida con estimación de pose en el borde la cantidad y la calidad de ejercicios de equilibrio y levantarse de la silla y las reporte al fisioterapeuta sin enviar video.",
            "📌 Objetivos Específicos:",
            "• Implementar la guía de los tres ejercicios y el cálculo de repeticiones, tiempo, inclinación del tronco y simetría con un procesamiento de al menos 15 cuadros por segundo en la Raspberry Pi 5.",
            "• Validar el ángulo de rodilla frente al goniómetro con un error medio inferior a 8 grados y el conteo de repeticiones con una concordancia superior al 95 %.",
            "• Entrenar el clasificador de calidad con ejemplos simulados por voluntarios y etiquetados por un fisioterapeuta, y alcanzar una puntuación F1 macro superior a 0,80.",
            "• Desarrollar el tablero del fisioterapeuta con la evolución semanal y verificar que solo se transmitan puntos clave por MQTT."
        ],
        "pasos": [
            "Análisis de requisitos",
            "Diseño de la solución",
            "Implementación y pruebas",
            "Validación y sustentación"
        ],
        "aplicaciones": [
            "Neurorrehabilitación - Teleejercicio con Visión Artificial"
        ],
        "referencias": [
            "Bazarevsky, V., Grishchenko, I., Raveendran, K., Zhu, T., Zhang, F., & Grundmann, M. (2020). BlazePose: On-device real-time body pose tracking. arXiv:2006.10204."
        ],
        "hardware_tabla": [
            {
                "componente": "Raspberry Pi 5 con 8 GB de RAM",
                "categoria": "Computador de Placa Única",
                "funcion": "Ejecuta la estimación de pose y el clasificador de calidad en la casa."
            },
            {
                "componente": "Cámara Raspberry Pi Camera Module 3 de gran angular",
                "categoria": "Sensor de Imagen",
                "funcion": "Captura el cuerpo completo del paciente a corta distancia."
            },
            {
                "componente": "Televisor o monitor de 32 pulgadas",
                "categoria": "Interfaz de Usuario / Iluminación",
                "funcion": "Muestra las instrucciones, el conteo y la retroalimentación al paciente."
            },
            {
                "componente": "Goniómetro digital y sensor inercial MPU-6050",
                "categoria": "Instrumento de Referencia",
                "funcion": "Dan la medida de referencia para validar los ángulos de la pose."
            },
            {
                "componente": "Silla firme sin ruedas y marcas de piso",
                "categoria": "Estructura / Componente Mecánico",
                "funcion": "Estandarizan la posición y la altura del ejercicio en cada hogar."
            }
        ],
        "software_tabla": [
            {
                "herramienta": "MediaPipe y MoveNet",
                "tipo": "Visión por Computador",
                "descripcion": "Estimación de puntos clave del cuerpo en tiempo real."
            },
            {
                "herramienta": "OpenCV",
                "tipo": "Visión por Computador",
                "descripcion": "Captura de video, dibujo de la guía y suavizado de las trayectorias."
            },
            {
                "herramienta": "scikit-learn",
                "tipo": "Framework de Aprendizaje Automático",
                "descripcion": "Clasificación de la calidad del movimiento con características cinemáticas."
            },
            {
                "herramienta": "Mosquitto",
                "tipo": "Broker MQTT",
                "descripcion": "Envío de puntos clave y resultados al tablero del fisioterapeuta."
            },
            {
                "herramienta": "Grafana",
                "tipo": "Visualización / Dashboard",
                "descripcion": "Evolución semanal de repeticiones, simetría y riesgo de caída."
            }
        ]
    },
    {
        "id": "proj_246",
        "titulo": "🌀 Proyecto 246: Videonistagmografía de Bajo Costo con Seguimiento Pupilar por Aprendizaje Profundo para Apoyar la Valoración Inicial del Paciente con Vértigo Agudo",
        "descripcion": "Problema: El vértigo agudo es un motivo frecuente de consulta en urgencias y distinguir un origen periférico benigno de uno central, como un accidente cerebrovascular de fosa posterior, depende de examinar los movimientos oculares, una destreza escasa fuera de las ciudades; los videonistagmógrafos comerciales son costosos para la red pública del Cauca.\n\nDescripción: Gafas impresas en 3D con una microcámara infrarroja de 90 cuadros por segundo y LED de 850 nm registran un ojo con poca luz y se conectan por USB a una Raspberry Pi 5. Un modelo de segmentación pupilar tipo DeepVOG, ajustado en Colab con cuadros etiquetados, obtiene las trazas horizontal y vertical; con SciPy se detectan las fases rápidas y se calculan frecuencia, velocidad de la fase lenta y dirección del nistagmo, y un clasificador indica si hay nistagmo y hacia dónde. Sin pacientes, la validación usa el nistagmo optocinético fisiológico, provocado en voluntarios sanos con franjas en movimiento en un monitor. Los resultados se muestran en pantalla y se envían por MQTT. Se trata de un prototipo de apoyo, no dispositivo médico certificado ni sustituto del examen clínico.",
        "area": "Neurociencia con AIoT",
        "sector": "Neuro-otología - Vértigo y Nistagmo",
        "nivel": "Intermedio-Avanzado",
        "duracion": "Un semestre",
        "presupuesto": "Bajo costo",
        "habilidades": [
            "Diseño de gafas con cámara infrarroja y control de iluminación",
            "Seguimiento pupilar con redes de segmentación ligeras",
            "Detección de fases rápidas y lentas en señales oculomotoras",
            "Estimulación optocinética con franjas en movimiento",
            "Calibración angular de la mirada con puntos de fijación",
            "Seguridad fotobiológica y ética con voluntarios"
        ],
        "objetivos": [
            "🎯 Objetivo General: Desarrollar unas gafas de videonistagmografía de bajo costo que registren el movimiento ocular, detecten el nistagmo y su dirección con un modelo de seguimiento pupilar y lo informen en el borde como apoyo a la valoración inicial.",
            "📌 Objetivos Específicos:",
            "• Construir las gafas con microcámara infrarroja a 90 cuadros por segundo y LED de 850 nm dentro de los límites de irradiancia seguros, y grabar al menos 20 sesiones de voluntarios.",
            "• Ajustar el modelo de seguimiento pupilar con cuadros etiquetados y lograr un error medio inferior a 3 píxeles de la posición del centro pupilar en el conjunto de prueba.",
            "• Detectar el nistagmo optocinético con sensibilidad y especificidad superiores al 90 % y determinar su dirección correcta en más del 95 % de los registros.",
            "• Estimar la frecuencia del nistagmo con un error menor a 0,5 Hz frente a la anotación manual de dos revisores y mostrar el resultado en menos de 2 segundos tras cada registro."
        ],
        "pasos": [
            "Análisis de requisitos",
            "Diseño de la solución",
            "Implementación y pruebas",
            "Validación y sustentación"
        ],
        "aplicaciones": [
            "Neuro-otología - Vértigo y Nistagmo"
        ],
        "referencias": [
            "Yiu, Y.-H., Aboulatta, M., Raiser, T., Ophey, L., Flanagin, V. L., zu Eulenburg, P., & Ahmadi, S.-A. (2019). DeepVOG: Open-source pupil segmentation and gaze estimation in neuroscience using deep learning. Journal of Neuroscience Methods, 324, 108307."
        ],
        "hardware_tabla": [
            {
                "componente": "Microcámara infrarroja USB de 90 cuadros por segundo",
                "categoria": "Sensor de Imagen",
                "funcion": "Registra el ojo con resolución temporal suficiente para ver las fases rápidas."
            },
            {
                "componente": "Gafas impresas en 3D con LED infrarrojos de 850 nm",
                "categoria": "Estructura / Componente Mecánico",
                "funcion": "Sostienen la cámara y aíslan la luz ambiente del ojo registrado."
            },
            {
                "componente": "Raspberry Pi 5 con 8 GB de RAM",
                "categoria": "Computador de Placa Única",
                "funcion": "Ejecuta el seguimiento pupilar y el análisis del nistagmo en el borde."
            },
            {
                "componente": "Monitor de 27 pulgadas para franjas optocinéticas",
                "categoria": "Interfaz de Usuario / Iluminación",
                "funcion": "Provoca nistagmo fisiológico en voluntarios sanos de forma reproducible."
            },
            {
                "componente": "Radiómetro o referencia de irradiancia infrarroja",
                "categoria": "Instrumento de Referencia",
                "funcion": "Comprueba que la iluminación infrarroja se mantenga en niveles seguros."
            }
        ],
        "software_tabla": [
            {
                "herramienta": "PyTorch",
                "tipo": "Framework de Aprendizaje Automático",
                "descripcion": "Ajuste fino del modelo de segmentación y seguimiento de la pupila."
            },
            {
                "herramienta": "DeepVOG",
                "tipo": "Seguimiento Ocular",
                "descripcion": "Base de código abierto para estimar la posición pupilar en video."
            },
            {
                "herramienta": "SciPy",
                "tipo": "Librería de Procesamiento de Señales",
                "descripcion": "Detección de fases rápidas y cálculo de frecuencia y velocidad lenta."
            },
            {
                "herramienta": "PsychoPy",
                "tipo": "Software de Estimulación Experimental",
                "descripcion": "Presentación de franjas optocinéticas y puntos de calibración."
            },
            {
                "herramienta": "Mosquitto",
                "tipo": "Broker MQTT",
                "descripcion": "Envío del resultado de cada registro al tablero del médico."
            }
        ]
    }
];
