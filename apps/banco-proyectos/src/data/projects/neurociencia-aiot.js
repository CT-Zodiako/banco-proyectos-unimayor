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
    }
];
