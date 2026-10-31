// Projects for this area. Each entry follows the schema checked by scripts/projects-validation.mjs.
export default [
    {
        "id": "proj_151",
        "titulo": "🫀 Proyecto 151: Clasificador de Arritmias Cardíacas en ECG de Una Derivación con TinyML sobre ESP32-S3",
        "descripcion": "Problema: En los municipios rurales del Cauca la mayoría de puestos de salud no cuentan con cardiólogo ni con equipos Holter, por lo que arritmias como la fibrilación auricular o las extrasístoles ventriculares se detectan tarde, cuando el paciente ya presenta complicaciones como accidentes cerebrovasculares.\n\nDescripción: Monitor portátil de ECG de una derivación basado en el módulo AD8232 y un ESP32-S3 que ejecuta localmente una red neuronal convolucional cuantizada (TinyML) para clasificar cada latido en las clases AAMI (normal, supraventricular, ventricular, fusión y desconocido). El dispositivo genera un resumen de eventos sin necesidad de conexión permanente a internet y lo sincroniza con un tablero web cuando hay red disponible.",
        "area": "Medicina con AIoT",
        "sector": "Medicina - Cardiología",
        "nivel": "Intermedio-Avanzado",
        "duracion": "Un semestre",
        "presupuesto": "Bajo costo",
        "habilidades": [
            "Adquisición y filtrado de señales electrocardiográficas",
            "Detección de complejos QRS y segmentación de latidos",
            "Entrenamiento y cuantización de redes neuronales para microcontroladores",
            "Despliegue de modelos con TensorFlow Lite for Microcontrollers",
            "Evaluación de clasificadores con métricas clínicas"
        ],
        "objetivos": [
            "🎯 Objetivo General: Desarrollar un monitor portátil de ECG que clasifique arritmias cardíacas directamente en el microcontrolador mediante un modelo TinyML, como apoyo al tamizaje en puestos de salud sin cardiólogo.",
            "📌 Objetivos Específicos:",
            "• Entrenar un modelo convolucional con la base MIT-BIH Arrhythmia que alcance una sensibilidad mayor al 85 % para latidos ventriculares bajo validación entre pacientes.",
            "• Desplegar el modelo cuantizado a 8 bits en el ESP32-S3 con un tiempo de inferencia inferior a 50 ms por latido y un consumo de memoria menor a 300 KB.",
            "• Comparar las clasificaciones del dispositivo con las de registros de referencia reproducidos por un simulador de ECG y reportar la concordancia obtenida."
        ],
        "pasos": [
            "Análisis de requisitos",
            "Diseño de la solución",
            "Implementación y pruebas",
            "Validación y sustentación"
        ],
        "aplicaciones": [
            "Medicina - Cardiología"
        ],
        "referencias": [],
        "hardware_tabla": [
            {
                "componente": "ESP32-S3 con 8 MB de PSRAM",
                "categoria": "Microcontrolador",
                "funcion": "Ejecuta el filtrado de la señal y la inferencia del modelo de clasificación de latidos."
            },
            {
                "componente": "Módulo de ECG AD8232 con electrodos desechables",
                "categoria": "Sensor Biomédico",
                "funcion": "Adquiere la señal electrocardiográfica de una derivación."
            },
            {
                "componente": "Pantalla OLED SSD1306",
                "categoria": "Interfaz de Usuario / Iluminación",
                "funcion": "Muestra la frecuencia cardíaca y los eventos detectados."
            },
            {
                "componente": "Batería LiPo con módulo de carga TP4056",
                "categoria": "Fuente de Alimentación / Energía",
                "funcion": "Alimenta el dispositivo y aísla al paciente de la red eléctrica."
            },
            {
                "componente": "Computador de desarrollo",
                "categoria": "Equipo de Cómputo",
                "funcion": "Entrena y cuantiza el modelo antes de desplegarlo en el microcontrolador."
            }
        ],
        "software_tabla": [
            {
                "herramienta": "TensorFlow / Keras",
                "tipo": "Framework de Aprendizaje Automático",
                "descripcion": "Entrenamiento del clasificador convolucional de latidos."
            },
            {
                "herramienta": "TensorFlow Lite for Microcontrollers",
                "tipo": "Motor de Inferencia Embebida",
                "descripcion": "Ejecución del modelo cuantizado en el ESP32-S3."
            },
            {
                "herramienta": "WFDB para Python",
                "tipo": "Librería de Procesamiento de Señales",
                "descripcion": "Lectura de los registros y anotaciones de la base MIT-BIH de PhysioNet."
            },
            {
                "herramienta": "ESP-IDF",
                "tipo": "Entorno de Desarrollo Embebido",
                "descripcion": "Programación del firmware de adquisición e inferencia."
            },
            {
                "herramienta": "Grafana",
                "tipo": "Visualización / Dashboard",
                "descripcion": "Tablero de eventos sincronizados para revisión médica."
            }
        ]
    },
    {
        "id": "proj_152",
        "titulo": "🩺 Proyecto 152: Estetoscopio Digital con Clasificación de Soplos Cardíacos mediante Inteligencia Artificial en el Borde",
        "descripcion": "Problema: Las cardiopatías congénitas y valvulares en niños se sospechan principalmente por la auscultación de soplos, pero en la atención primaria del Cauca los médicos generales tienen poca experiencia en distinguir soplos patológicos de inocentes, lo que produce remisiones tardías o innecesarias a especialistas ubicados en Popayán o Cali.\n\nDescripción: Estetoscopio digital construido con una campana acústica convencional, un micrófono MEMS I2S y una Raspberry Pi que extrae espectrogramas log-Mel de los sonidos cardíacos y ejecuta un modelo de aprendizaje profundo para clasificar la presencia, ausencia o indeterminación de soplos. El sistema guarda la grabación etiquetada para que un especialista pueda revisarla a distancia.",
        "area": "Medicina con AIoT",
        "sector": "Medicina - Pediatría y atención primaria",
        "nivel": "Avanzado",
        "duracion": "Un semestre",
        "presupuesto": "Bajo costo",
        "habilidades": [
            "Instrumentación acústica para auscultación",
            "Procesamiento digital de audio y espectrogramas",
            "Aprendizaje profundo para clasificación de sonidos biomédicos",
            "Optimización de modelos para ejecución en el borde",
            "Manejo ético de datos clínicos"
        ],
        "objetivos": [
            "🎯 Objetivo General: Construir un estetoscopio digital de bajo costo que clasifique automáticamente la presencia de soplos cardíacos para apoyar la decisión de remisión en atención primaria pediátrica.",
            "📌 Objetivos Específicos:",
            "• Diseñar el acople acústico entre la campana del estetoscopio y el micrófono MEMS, caracterizando su respuesta en la banda de 20 a 800 Hz.",
            "• Entrenar un clasificador con la base CirCor DigiScope de PhysioNet que supere una exactitud ponderada del 70 % en la clasificación de soplos presentes, ausentes y desconocidos.",
            "• Ejecutar la inferencia completa en la Raspberry Pi en menos de 2 segundos por grabación y evaluar la usabilidad del dispositivo con al menos 5 profesionales de la salud."
        ],
        "pasos": [
            "Análisis de requisitos",
            "Diseño de la solución",
            "Implementación y pruebas",
            "Validación y sustentación"
        ],
        "aplicaciones": [
            "Medicina - Pediatría y atención primaria"
        ],
        "referencias": [],
        "hardware_tabla": [
            {
                "componente": "Raspberry Pi 4 Model B de 4 GB",
                "categoria": "Computador de Placa Única",
                "funcion": "Procesa el audio y ejecuta el modelo de clasificación de soplos."
            },
            {
                "componente": "Micrófono MEMS I2S INMP441",
                "categoria": "Sensor Acústico",
                "funcion": "Captura los sonidos cardíacos transmitidos por la campana."
            },
            {
                "componente": "Campana de estetoscopio convencional con acople impreso en 3D",
                "categoria": "Estructura / Componente Mecánico",
                "funcion": "Concentra el sonido cardíaco y lo conduce hacia el micrófono."
            },
            {
                "componente": "Pantalla táctil de 3,5 pulgadas",
                "categoria": "Interfaz de Usuario / Iluminación",
                "funcion": "Muestra el fonocardiograma y el resultado de la clasificación."
            },
            {
                "componente": "Audífonos de monitoreo",
                "categoria": "Interfaz de Usuario / Iluminación",
                "funcion": "Permiten al profesional escuchar la señal amplificada durante la grabación."
            }
        ],
        "software_tabla": [
            {
                "herramienta": "PyTorch",
                "tipo": "Framework de Aprendizaje Automático",
                "descripcion": "Entrenamiento de la red convolucional sobre espectrogramas."
            },
            {
                "herramienta": "Librosa",
                "tipo": "Librería de Procesamiento de Audio",
                "descripcion": "Filtrado, segmentación y cálculo de espectrogramas log-Mel."
            },
            {
                "herramienta": "ONNX Runtime",
                "tipo": "Motor de Inferencia Embebida",
                "descripcion": "Ejecución optimizada del modelo exportado en la Raspberry Pi."
            },
            {
                "herramienta": "Flask",
                "tipo": "Framework Web / Aplicación",
                "descripcion": "Interfaz local para revisar y exportar grabaciones etiquetadas."
            }
        ]
    },
    {
        "id": "proj_153",
        "titulo": "🫁 Proyecto 153: Detección de Neumonía en Radiografías de Tórax con Modelo Cuantizado en Raspberry Pi para Hospitales de Baja Complejidad",
        "descripcion": "Problema: Los hospitales de primer nivel del Cauca disponen de equipos de rayos X, pero no de radiólogo permanente; las radiografías de tórax de niños y adultos con sospecha de neumonía se leen horas o días después, lo que retrasa el inicio del tratamiento y aumenta las remisiones.\n\nDescripción: Estación de apoyo diagnóstico basada en Raspberry Pi 5 que recibe radiografías digitales o fotografías del negatoscopio tomadas con una cámara, ejecuta localmente una red convolucional ligera y cuantizada para estimar la probabilidad de neumonía y genera un mapa de calor Grad-CAM que señala las regiones que motivan la predicción, sin enviar imágenes de pacientes a servicios externos.",
        "area": "Medicina con AIoT",
        "sector": "Medicina - Radiología en hospitales de primer nivel",
        "nivel": "Intermedio-Avanzado",
        "duracion": "Un semestre",
        "presupuesto": "Bajo costo",
        "habilidades": [
            "Preprocesamiento de imágenes médicas",
            "Aprendizaje por transferencia con redes convolucionales",
            "Cuantización y despliegue de modelos en computadores de placa única",
            "Explicabilidad de modelos con Grad-CAM",
            "Protección de datos personales en salud"
        ],
        "objetivos": [
            "🎯 Objetivo General: Implementar una estación de inferencia local que detecte neumonía en radiografías de tórax y explique visualmente su predicción, como apoyo al médico general en hospitales sin radiólogo.",
            "📌 Objetivos Específicos:",
            "• Entrenar por aprendizaje por transferencia un modelo MobileNetV3 con el conjunto público de radiografías pediátricas de Kermany y alcanzar un AUC mayor a 0,90 en el conjunto de prueba.",
            "• Cuantizar el modelo a 8 bits y medir en la Raspberry Pi 5 una latencia menor a 1 segundo por imagen con una pérdida de AUC inferior a 0,02.",
            "• Evaluar la robustez del modelo frente a fotografías del negatoscopio tomadas con la cámara de la estación y documentar la caída de desempeño respecto a imágenes digitales."
        ],
        "pasos": [
            "Análisis de requisitos",
            "Diseño de la solución",
            "Implementación y pruebas",
            "Validación y sustentación"
        ],
        "aplicaciones": [
            "Medicina - Radiología en hospitales de primer nivel"
        ],
        "referencias": [],
        "hardware_tabla": [
            {
                "componente": "Raspberry Pi 5 de 8 GB",
                "categoria": "Computador de Placa Única",
                "funcion": "Ejecuta el modelo de detección y la interfaz de la estación."
            },
            {
                "componente": "Raspberry Pi Camera Module 3",
                "categoria": "Sensor de Imagen",
                "funcion": "Fotografía radiografías impresas ubicadas sobre el negatoscopio."
            },
            {
                "componente": "Soporte de cámara impreso en 3D",
                "categoria": "Estructura / Componente Mecánico",
                "funcion": "Mantiene una distancia y un ángulo constantes durante la captura."
            },
            {
                "componente": "Monitor HDMI",
                "categoria": "Interfaz de Usuario / Iluminación",
                "funcion": "Presenta la radiografía, la probabilidad estimada y el mapa de calor."
            }
        ],
        "software_tabla": [
            {
                "herramienta": "TensorFlow / Keras",
                "tipo": "Framework de Aprendizaje Automático",
                "descripcion": "Aprendizaje por transferencia del modelo MobileNetV3."
            },
            {
                "herramienta": "TensorFlow Lite (LiteRT)",
                "tipo": "Motor de Inferencia Embebida",
                "descripcion": "Inferencia del modelo cuantizado en la Raspberry Pi."
            },
            {
                "herramienta": "pydicom",
                "tipo": "Librería de Imágenes Médicas",
                "descripcion": "Lectura de radiografías en formato DICOM."
            },
            {
                "herramienta": "OpenCV",
                "tipo": "Librería de Visión Artificial",
                "descripcion": "Corrección de perspectiva y normalización de las fotografías."
            },
            {
                "herramienta": "Streamlit",
                "tipo": "Framework Web / Aplicación",
                "descripcion": "Interfaz local de carga de imágenes y visualización de resultados."
            }
        ]
    },
    {
        "id": "proj_154",
        "titulo": "📱 Proyecto 154: Tamizaje de Retinopatía Diabética con Imágenes de Fondo de Ojo Capturadas por Teléfono Inteligente",
        "descripcion": "Problema: La retinopatía diabética es una de las principales causas de ceguera prevenible en adultos, pero en el Cauca los pacientes diabéticos de zonas rurales rara vez acceden a un examen anual de fondo de ojo porque los retinógrafos y los oftalmólogos se concentran en Popayán.\n\nDescripción: Sistema de tamizaje compuesto por un adaptador impreso en 3D que acopla una lente condensadora de 20 dioptrías a un teléfono inteligente y una aplicación Android que evalúa la calidad de la imagen capturada y ejecuta en el propio teléfono un modelo de aprendizaje profundo para clasificar el grado de retinopatía, priorizando a los pacientes que deben ser remitidos a oftalmología.",
        "area": "Medicina con AIoT",
        "sector": "Medicina - Oftalmología y control de diabetes",
        "nivel": "Avanzado",
        "duracion": "Un semestre",
        "presupuesto": "Bajo costo",
        "habilidades": [
            "Diseño óptico básico para captura de fondo de ojo",
            "Clasificación de imágenes médicas con aprendizaje profundo",
            "Desarrollo de aplicaciones móviles con inferencia local",
            "Evaluación de calidad de imagen",
            "Análisis de sensibilidad y especificidad para tamizaje"
        ],
        "objetivos": [
            "🎯 Objetivo General: Desarrollar un sistema de tamizaje de retinopatía diabética que capture imágenes de fondo de ojo con un teléfono inteligente y las clasifique localmente para priorizar la remisión a oftalmología.",
            "📌 Objetivos Específicos:",
            "• Diseñar e imprimir un adaptador ajustable para lente de 20 dioptrías que permita capturar al menos un 60 % de imágenes con calidad gradable en un modelo ocular de práctica.",
            "• Entrenar un clasificador de retinopatía referible con los conjuntos APTOS 2019 y EyePACS que alcance una sensibilidad mayor al 85 % con una especificidad mayor al 75 %.",
            "• Integrar el modelo en una aplicación Android que entregue el resultado en menos de 3 segundos sin conexión a internet y medir su desempeño frente a imágenes tomadas con el adaptador."
        ],
        "pasos": [
            "Análisis de requisitos",
            "Diseño de la solución",
            "Implementación y pruebas",
            "Validación y sustentación"
        ],
        "aplicaciones": [
            "Medicina - Oftalmología y control de diabetes"
        ],
        "referencias": [],
        "hardware_tabla": [
            {
                "componente": "Teléfono inteligente Android de gama media",
                "categoria": "Dispositivo Móvil",
                "funcion": "Captura las imágenes de fondo de ojo y ejecuta el modelo de clasificación."
            },
            {
                "componente": "Lente condensadora de 20 dioptrías",
                "categoria": "Componente Óptico",
                "funcion": "Forma la imagen de la retina para la cámara del teléfono."
            },
            {
                "componente": "Adaptador de lente impreso en 3D",
                "categoria": "Estructura / Componente Mecánico",
                "funcion": "Alinea la lente con la cámara y la linterna del teléfono."
            },
            {
                "componente": "Modelo ocular de práctica para oftalmoscopia",
                "categoria": "Equipo de Pruebas",
                "funcion": "Permite ensayar la captura sin exponer a pacientes durante el desarrollo."
            },
            {
                "componente": "Computador de desarrollo con GPU",
                "categoria": "Equipo de Cómputo",
                "funcion": "Entrena el modelo de clasificación de retinopatía."
            }
        ],
        "software_tabla": [
            {
                "herramienta": "PyTorch",
                "tipo": "Framework de Aprendizaje Automático",
                "descripcion": "Entrenamiento del clasificador de retinopatía referible."
            },
            {
                "herramienta": "TensorFlow Lite (LiteRT) para Android",
                "tipo": "Motor de Inferencia Embebida",
                "descripcion": "Ejecución del modelo en el teléfono sin conexión."
            },
            {
                "herramienta": "Android Studio con Kotlin",
                "tipo": "Entorno de Desarrollo Móvil",
                "descripcion": "Desarrollo de la aplicación de captura y tamizaje."
            },
            {
                "herramienta": "OpenCV",
                "tipo": "Librería de Visión Artificial",
                "descripcion": "Detección del disco de la retina y evaluación de nitidez e iluminación."
            },
            {
                "herramienta": "FreeCAD",
                "tipo": "Software de Diseño CAD",
                "descripcion": "Diseño paramétrico del adaptador óptico."
            }
        ]
    },
    {
        "id": "proj_155",
        "titulo": "😴 Proyecto 155: Tamizaje Domiciliario de Apnea Obstructiva del Sueño con Oximetría Nocturna y Aprendizaje Automático",
        "descripcion": "Problema: La apnea obstructiva del sueño aumenta el riesgo de hipertensión, accidentes de tránsito y eventos cardiovasculares, pero la mayoría de personas que la padecen no está diagnosticada porque la polisomnografía es costosa, tiene listas de espera de meses y en Popayán solo se realiza en pocas clínicas.\n\nDescripción: Oxímetro de dedo nocturno basado en ESP32 y sensor MAX30102 que registra la saturación de oxígeno y la frecuencia de pulso durante la noche y, mediante un modelo de aprendizaje automático entrenado con características de desaturación, estima el índice de apnea-hipopnea y clasifica la severidad del caso para orientar la remisión a un estudio de sueño completo.",
        "area": "Medicina con AIoT",
        "sector": "Medicina - Medicina del sueño",
        "nivel": "Intermedio",
        "duracion": "Un semestre",
        "presupuesto": "Bajo costo",
        "habilidades": [
            "Fotopletismografía y oximetría de pulso",
            "Registro de datos fisiológicos de larga duración",
            "Extracción de características de series de tiempo",
            "Modelos de aprendizaje automático supervisado",
            "Diseño de dispositivos cómodos para uso nocturno"
        ],
        "objetivos": [
            "🎯 Objetivo General: Desarrollar un oxímetro nocturno de bajo costo que estime la severidad de la apnea obstructiva del sueño mediante aprendizaje automático, como herramienta de tamizaje domiciliario.",
            "📌 Objetivos Específicos:",
            "• Construir un oxímetro que registre SpO2 y pulso a 1 Hz durante al menos 8 horas continuas en una tarjeta microSD con pérdidas de datos menores al 1 %.",
            "• Entrenar un modelo con registros de oximetría de bases públicas de PhysioNet y del NSRR que clasifique la severidad de apnea en cuatro categorías con exactitud mayor al 70 %.",
            "• Comparar las lecturas del prototipo con un oxímetro comercial certificado en al menos 10 voluntarios despiertos y reportar el error medio absoluto de SpO2."
        ],
        "pasos": [
            "Análisis de requisitos",
            "Diseño de la solución",
            "Implementación y pruebas",
            "Validación y sustentación"
        ],
        "aplicaciones": [
            "Medicina - Medicina del sueño"
        ],
        "referencias": [],
        "hardware_tabla": [
            {
                "componente": "ESP32-C3 Super Mini",
                "categoria": "Microcontrolador",
                "funcion": "Controla la adquisición nocturna y el almacenamiento de los datos."
            },
            {
                "componente": "Sensor de pulso y oximetría MAX30102",
                "categoria": "Sensor Biomédico",
                "funcion": "Mide la señal fotopletismográfica para calcular SpO2 y pulso."
            },
            {
                "componente": "Módulo lector de tarjeta microSD",
                "categoria": "Almacenamiento",
                "funcion": "Guarda el registro completo de la noche."
            },
            {
                "componente": "Batería LiPo de 1000 mAh con módulo TP4056",
                "categoria": "Fuente de Alimentación / Energía",
                "funcion": "Garantiza la autonomía durante toda la noche."
            },
            {
                "componente": "Pinza de dedo de silicona y carcasa impresa en 3D",
                "categoria": "Estructura / Componente Mecánico",
                "funcion": "Fija el sensor al dedo con comodidad y bloquea la luz ambiental."
            }
        ],
        "software_tabla": [
            {
                "herramienta": "Arduino IDE",
                "tipo": "Entorno de Desarrollo Embebido",
                "descripcion": "Programación del firmware de adquisición."
            },
            {
                "herramienta": "scikit-learn",
                "tipo": "Framework de Aprendizaje Automático",
                "descripcion": "Entrenamiento y validación del clasificador de severidad."
            },
            {
                "herramienta": "pandas y NumPy",
                "tipo": "Librería de Análisis de Datos",
                "descripcion": "Cálculo de índices de desaturación y características de la señal."
            },
            {
                "herramienta": "Jupyter Notebook",
                "tipo": "Entorno de Análisis",
                "descripcion": "Documentación reproducible de los experimentos."
            }
        ]
    },
    {
        "id": "proj_156",
        "titulo": "🤧 Proyecto 156: Clasificación de Sonidos de Tos con Micrófono Embebido para el Tamizaje de Enfermedades Respiratorias",
        "descripcion": "Problema: En comunidades indígenas y rurales del Cauca, enfermedades como la tuberculosis, la neumonía y el asma se consultan tarde porque la tos se considera un síntoma menor; los promotores de salud no cuentan con herramientas objetivas para decidir qué personas deben remitirse a una valoración médica.\n\nDescripción: Dispositivo de bolsillo basado en Arduino Nano 33 BLE Sense Rev2 que graba episodios de tos y ejecuta localmente un modelo TinyML que distingue tos seca, tos productiva y sonidos que no son tos, entregando a una aplicación móvil por Bluetooth un registro de frecuencia y tipo de tos que el promotor de salud usa como criterio de remisión.",
        "area": "Medicina con AIoT",
        "sector": "Salud pública - Enfermedades respiratorias",
        "nivel": "Intermedio",
        "duracion": "Un semestre",
        "presupuesto": "Bajo costo",
        "habilidades": [
            "Captura y etiquetado de datos de audio",
            "Extracción de coeficientes MFCC",
            "Entrenamiento de modelos TinyML con Edge Impulse",
            "Comunicación Bluetooth Low Energy",
            "Diseño de herramientas para promotores de salud"
        ],
        "objetivos": [
            "🎯 Objetivo General: Desarrollar un dispositivo de bolsillo que detecte y clasifique sonidos de tos mediante un modelo ejecutado en el microcontrolador, como apoyo al tamizaje de enfermedades respiratorias en comunidades rurales.",
            "📌 Objetivos Específicos:",
            "• Construir un conjunto de entrenamiento combinando los datos públicos de COUGHVID y Coswara con grabaciones de ruido ambiental típico de viviendas rurales.",
            "• Entrenar y desplegar un modelo que detecte episodios de tos con una exactitud mayor al 85 % y una tasa de falsos positivos menor al 10 % frente a habla y ruido doméstico.",
            "• Medir el consumo energético del dispositivo y demostrar una autonomía de al menos 24 horas en modo de escucha continua."
        ],
        "pasos": [
            "Análisis de requisitos",
            "Diseño de la solución",
            "Implementación y pruebas",
            "Validación y sustentación"
        ],
        "aplicaciones": [
            "Salud pública - Enfermedades respiratorias"
        ],
        "referencias": [],
        "hardware_tabla": [
            {
                "componente": "Arduino Nano 33 BLE Sense Rev2",
                "categoria": "Microcontrolador",
                "funcion": "Captura el audio con su micrófono integrado y ejecuta el modelo de clasificación."
            },
            {
                "componente": "Batería LiPo de 500 mAh con cargador",
                "categoria": "Fuente de Alimentación / Energía",
                "funcion": "Alimenta el dispositivo de bolsillo."
            },
            {
                "componente": "Carcasa portátil impresa en 3D",
                "categoria": "Estructura / Componente Mecánico",
                "funcion": "Protege la electrónica y deja expuesto el micrófono."
            },
            {
                "componente": "Teléfono inteligente Android",
                "categoria": "Dispositivo Móvil",
                "funcion": "Recibe por Bluetooth el registro de episodios de tos."
            }
        ],
        "software_tabla": [
            {
                "herramienta": "Edge Impulse",
                "tipo": "Plataforma de TinyML",
                "descripcion": "Extracción de MFCC, entrenamiento y exportación del modelo."
            },
            {
                "herramienta": "Arduino IDE",
                "tipo": "Entorno de Desarrollo Embebido",
                "descripcion": "Programación del firmware y del servicio Bluetooth."
            },
            {
                "herramienta": "Audacity",
                "tipo": "Editor de Audio",
                "descripcion": "Revisión y etiquetado manual de grabaciones."
            },
            {
                "herramienta": "MIT App Inventor",
                "tipo": "Entorno de Desarrollo Móvil",
                "descripcion": "Aplicación sencilla para visualizar el registro de tos."
            }
        ]
    },
    {
        "id": "proj_157",
        "titulo": "👶 Proyecto 157: Estimación de Ictericia Neonatal mediante Cámara con Carta de Color Calibrada y Regresión con Aprendizaje Automático",
        "descripcion": "Problema: La ictericia neonatal afecta a la mayoría de los recién nacidos y, si la bilirrubina alcanza niveles altos sin tratamiento, puede causar daño neurológico permanente; tras el alta temprana, las familias de zonas rurales del Cauca deben viajar horas para una prueba de sangre, y la valoración visual de la coloración de la piel es poco confiable.\n\nDescripción: Sistema basado en Raspberry Pi y cámara que fotografía la piel del esternón del recién nacido junto a una carta de color impresa, corrige la iluminación con la carta como referencia y estima mediante un modelo de regresión el nivel de bilirrubina, clasificando el riesgo según el nomograma de Bhutani para orientar si se requiere una prueba de laboratorio.",
        "area": "Medicina con AIoT",
        "sector": "Medicina - Neonatología",
        "nivel": "Intermedio-Avanzado",
        "duracion": "Un semestre",
        "presupuesto": "Bajo costo",
        "habilidades": [
            "Calibración colorimétrica de imágenes",
            "Segmentación de regiones de interés en piel",
            "Modelos de regresión con aprendizaje automático",
            "Diseño de protocolos de captura reproducibles",
            "Ética de la investigación con población neonatal"
        ],
        "objetivos": [
            "🎯 Objetivo General: Desarrollar un sistema de estimación no invasiva de bilirrubina en recién nacidos a partir de imágenes de la piel calibradas en color, como herramienta de tamizaje para familias con difícil acceso a laboratorio.",
            "📌 Objetivos Específicos:",
            "• Diseñar una carta de color de referencia y un algoritmo de corrección que reduzca la diferencia de color ΔE entre capturas bajo tres iluminaciones distintas a menos de 5 unidades.",
            "• Entrenar un modelo de regresión con un conjunto de imágenes de bilirrubina neonatal de acceso público que obtenga una correlación mayor a 0,75 con la bilirrubina sérica de referencia.",
            "• Validar el comportamiento del sistema con muestras sintéticas de piel pigmentada en tonos ictéricos y documentar un protocolo de estudio clínico para presentar a un comité de ética."
        ],
        "pasos": [
            "Análisis de requisitos",
            "Diseño de la solución",
            "Implementación y pruebas",
            "Validación y sustentación"
        ],
        "aplicaciones": [
            "Medicina - Neonatología"
        ],
        "referencias": [],
        "hardware_tabla": [
            {
                "componente": "Raspberry Pi 4 Model B de 4 GB",
                "categoria": "Computador de Placa Única",
                "funcion": "Corrige el color de la imagen y ejecuta el modelo de estimación."
            },
            {
                "componente": "Raspberry Pi Camera Module 3",
                "categoria": "Sensor de Imagen",
                "funcion": "Captura la imagen de la piel junto a la carta de color."
            },
            {
                "componente": "Anillo de LED de luz blanca neutra",
                "categoria": "Interfaz de Usuario / Iluminación",
                "funcion": "Proporciona una iluminación uniforme durante la captura."
            },
            {
                "componente": "Carta de color impresa y laminada",
                "categoria": "Elemento de Calibración",
                "funcion": "Sirve de referencia para corregir el balance de color."
            },
            {
                "componente": "Visor de captura impreso en 3D",
                "categoria": "Estructura / Componente Mecánico",
                "funcion": "Fija la distancia de la cámara y bloquea la luz ambiental."
            }
        ],
        "software_tabla": [
            {
                "herramienta": "OpenCV",
                "tipo": "Librería de Visión Artificial",
                "descripcion": "Detección de la carta de color y segmentación de la piel."
            },
            {
                "herramienta": "colour-science",
                "tipo": "Librería de Colorimetría",
                "descripcion": "Corrección de color y cálculo de diferencias ΔE."
            },
            {
                "herramienta": "scikit-learn",
                "tipo": "Framework de Aprendizaje Automático",
                "descripcion": "Entrenamiento del modelo de regresión de bilirrubina."
            },
            {
                "herramienta": "Streamlit",
                "tipo": "Framework Web / Aplicación",
                "descripcion": "Interfaz de captura y reporte de riesgo."
            }
        ]
    },
    {
        "id": "proj_158",
        "titulo": "🔍 Proyecto 158: Triaje de Lesiones Cutáneas con Dermatoscopio de Bajo Costo y Clasificador en Dispositivo Móvil",
        "descripcion": "Problema: El cáncer de piel, incluido el melanoma, se diagnostica con frecuencia en etapas avanzadas en zonas rurales de Colombia porque los dermatólogos son escasos fuera de las capitales y los médicos generales no cuentan con dermatoscopio ni entrenamiento para diferenciar lesiones sospechosas de lesiones benignas.\n\nDescripción: Dermatoscopio de bajo costo acoplable a un teléfono inteligente, construido con una lente macro, iluminación LED polarizada y una carcasa impresa en 3D, junto con una aplicación que ejecuta en el teléfono un modelo de aprendizaje profundo que clasifica la lesión en categorías de prioridad de remisión y envía la imagen al dermatólogo solo cuando el profesional lo autoriza.",
        "area": "Medicina con AIoT",
        "sector": "Medicina - Dermatología y teledermatología",
        "nivel": "Intermedio-Avanzado",
        "duracion": "Un semestre",
        "presupuesto": "Bajo costo",
        "habilidades": [
            "Diseño de iluminación polarizada para dermatoscopia",
            "Clasificación de imágenes con conjuntos de datos desbalanceados",
            "Despliegue de modelos en aplicaciones móviles",
            "Evaluación de sesgos por tipo de piel",
            "Teledermatología y flujos de remisión"
        ],
        "objetivos": [
            "🎯 Objetivo General: Desarrollar un dermatoscopio de bajo costo acoplado a un teléfono inteligente que clasifique localmente lesiones cutáneas por prioridad de remisión para apoyar a médicos generales en zonas rurales.",
            "📌 Objetivos Específicos:",
            "• Construir el dermatoscopio con iluminación polarizada cruzada y verificar una resolución mínima de 10 pares de líneas por milímetro con una carta de resolución impresa.",
            "• Entrenar un clasificador con los conjuntos HAM10000 e ISIC 2019 que alcance una sensibilidad mayor al 85 % para lesiones malignas en la categoría de remisión prioritaria.",
            "• Analizar el desempeño del modelo por grupos de fototipo disponibles en los datos públicos y reportar las diferencias como limitación para la población colombiana."
        ],
        "pasos": [
            "Análisis de requisitos",
            "Diseño de la solución",
            "Implementación y pruebas",
            "Validación y sustentación"
        ],
        "aplicaciones": [
            "Medicina - Dermatología y teledermatología"
        ],
        "referencias": [],
        "hardware_tabla": [
            {
                "componente": "Teléfono inteligente Android de gama media",
                "categoria": "Dispositivo Móvil",
                "funcion": "Captura la imagen dermatoscópica y ejecuta el clasificador."
            },
            {
                "componente": "Lente macro de 10x con clip para teléfono",
                "categoria": "Componente Óptico",
                "funcion": "Amplía la lesión para observar sus estructuras."
            },
            {
                "componente": "Anillo de LED con láminas polarizadoras",
                "categoria": "Interfaz de Usuario / Iluminación",
                "funcion": "Elimina reflejos superficiales de la piel mediante polarización cruzada."
            },
            {
                "componente": "Carcasa espaciadora impresa en 3D",
                "categoria": "Estructura / Componente Mecánico",
                "funcion": "Mantiene la distancia focal fija sobre la piel."
            },
            {
                "componente": "Computador de desarrollo con GPU",
                "categoria": "Equipo de Cómputo",
                "funcion": "Entrena el modelo de clasificación de lesiones."
            }
        ],
        "software_tabla": [
            {
                "herramienta": "PyTorch",
                "tipo": "Framework de Aprendizaje Automático",
                "descripcion": "Entrenamiento del clasificador con balanceo de clases."
            },
            {
                "herramienta": "TensorFlow Lite (LiteRT) para Android",
                "tipo": "Motor de Inferencia Embebida",
                "descripcion": "Inferencia del modelo en el teléfono."
            },
            {
                "herramienta": "Flutter",
                "tipo": "Framework de Desarrollo Móvil",
                "descripcion": "Aplicación de captura, triaje y envío autorizado de imágenes."
            },
            {
                "herramienta": "Albumentations",
                "tipo": "Librería de Aumento de Datos",
                "descripcion": "Simulación de variaciones de iluminación, enfoque y tono de piel."
            }
        ]
    },
    {
        "id": "proj_159",
        "titulo": "🚶 Proyecto 159: Prueba Timed Up and Go Instrumentada con Sensores Inerciales y TinyML para Valorar el Riesgo de Caída",
        "descripcion": "Problema: En los centros de día y hogares geriátricos de Popayán el riesgo de caída de los adultos mayores se valora con la prueba Timed Up and Go medida con cronómetro, que solo entrega el tiempo total y no detecta alteraciones de la marcha como la asimetría del paso o los giros inestables, por lo que muchas personas con riesgo alto no reciben intervención preventiva.\n\nDescripción: Sensor inercial portátil basado en una placa XIAO nRF52840 Sense que se fija a la cintura durante la prueba Timed Up and Go, segmenta automáticamente sus fases (levantarse, caminar, girar, sentarse) y ejecuta un modelo TinyML que estima el nivel de riesgo de caída a partir de las características de cada fase, entregando un informe al fisioterapeuta en una aplicación móvil.",
        "area": "Medicina con AIoT",
        "sector": "Medicina - Geriatría y fisioterapia",
        "nivel": "Intermedio",
        "duracion": "Un semestre",
        "presupuesto": "Bajo costo",
        "habilidades": [
            "Adquisición de datos con unidades de medición inercial",
            "Segmentación de actividades humanas",
            "Extracción de parámetros espaciotemporales de la marcha",
            "Entrenamiento y despliegue de modelos TinyML",
            "Trabajo interdisciplinario con fisioterapeutas"
        ],
        "objetivos": [
            "🎯 Objetivo General: Desarrollar un sistema portátil que instrumente la prueba Timed Up and Go y estime el riesgo de caída mediante un modelo ejecutado en el dispositivo, como apoyo a la valoración geriátrica.",
            "📌 Objetivos Específicos:",
            "• Segmentar automáticamente las cuatro fases de la prueba con un error de duración menor a 0,3 segundos frente a la anotación sobre video.",
            "• Calcular al menos 8 parámetros de marcha y giro, y entrenar un modelo que clasifique el riesgo de caída con exactitud mayor al 75 % usando la escala de Tinetti aplicada por un fisioterapeuta como referencia.",
            "• Evaluar el sistema con al menos 15 adultos mayores voluntarios bajo consentimiento informado y medir su repetibilidad mediante el coeficiente de correlación intraclase."
        ],
        "pasos": [
            "Análisis de requisitos",
            "Diseño de la solución",
            "Implementación y pruebas",
            "Validación y sustentación"
        ],
        "aplicaciones": [
            "Medicina - Geriatría y fisioterapia"
        ],
        "referencias": [],
        "hardware_tabla": [
            {
                "componente": "Seeed Studio XIAO nRF52840 Sense",
                "categoria": "Microcontrolador",
                "funcion": "Lee la unidad inercial integrada y ejecuta el modelo de riesgo de caída."
            },
            {
                "componente": "Cinturón elástico con estuche impreso en 3D",
                "categoria": "Estructura / Componente Mecánico",
                "funcion": "Fija el sensor a la altura de la vértebra L5."
            },
            {
                "componente": "Batería LiPo de 300 mAh",
                "categoria": "Fuente de Alimentación / Energía",
                "funcion": "Alimenta el sensor durante las sesiones de evaluación."
            },
            {
                "componente": "Teléfono inteligente Android",
                "categoria": "Dispositivo Móvil",
                "funcion": "Recibe los resultados por Bluetooth y graba el video de referencia."
            }
        ],
        "software_tabla": [
            {
                "herramienta": "Edge Impulse",
                "tipo": "Plataforma de TinyML",
                "descripcion": "Entrenamiento y exportación del modelo de riesgo de caída."
            },
            {
                "herramienta": "PlatformIO",
                "tipo": "Entorno de Desarrollo Embebido",
                "descripcion": "Programación del firmware de adquisición y segmentación."
            },
            {
                "herramienta": "SciPy",
                "tipo": "Librería de Procesamiento de Señales",
                "descripcion": "Filtrado de la señal inercial y detección de pasos."
            },
            {
                "herramienta": "Flutter",
                "tipo": "Framework de Desarrollo Móvil",
                "descripcion": "Aplicación de reporte para el fisioterapeuta."
            }
        ]
    },
    {
        "id": "proj_160",
        "titulo": "🦟 Proyecto 160: Detección de Parásitos de Malaria en Frotis Sanguíneos con Microscopio Digital y Visión Artificial en el Borde",
        "descripcion": "Problema: En los municipios de la costa pacífica caucana, como Guapi, Timbiquí y López de Micay, la malaria es endémica y su diagnóstico depende de microscopistas que revisan manualmente frotis de gota gruesa; la escasez de personal capacitado y la fatiga en temporadas de brote generan demoras y errores en el diagnóstico.\n\nDescripción: Estación de apoyo diagnóstico que acopla una cámara a un microscopio óptico de laboratorio y usa una Raspberry Pi 5 para detectar y contar automáticamente glóbulos rojos parasitados en frotis teñidos con Giemsa mediante un modelo de detección de objetos ligero, calculando la parasitemia y priorizando las láminas que el microscopista debe confirmar, sin depender de conexión a internet.",
        "area": "Medicina con AIoT",
        "sector": "Salud pública - Enfermedades tropicales",
        "nivel": "Avanzado",
        "duracion": "Un semestre",
        "presupuesto": "Bajo costo",
        "habilidades": [
            "Microscopía digital y captura de imágenes de laboratorio",
            "Detección de objetos con aprendizaje profundo",
            "Despliegue de modelos de visión en computadores de placa única",
            "Cuantificación automática de parasitemia",
            "Diseño de herramientas para laboratorios con conectividad limitada"
        ],
        "objetivos": [
            "🎯 Objetivo General: Implementar una estación de microscopía digital que detecte y cuantifique parásitos de malaria en frotis sanguíneos mediante visión artificial ejecutada localmente, como apoyo a los microscopistas de zonas endémicas.",
            "📌 Objetivos Específicos:",
            "• Diseñar el acople de la cámara al ocular del microscopio y obtener imágenes enfocadas con objetivo de 100x en al menos el 90 % de los campos capturados.",
            "• Entrenar un detector YOLO con el conjunto de imágenes de malaria del NIH y conjuntos públicos de frotis anotados que alcance un mAP@0,5 mayor a 0,80 para células parasitadas.",
            "• Ejecutar la detección en la Raspberry Pi 5 a una velocidad de al menos 1 campo por segundo y comparar la parasitemia calculada con el conteo manual de un microscopista en láminas de práctica."
        ],
        "pasos": [
            "Análisis de requisitos",
            "Diseño de la solución",
            "Implementación y pruebas",
            "Validación y sustentación"
        ],
        "aplicaciones": [
            "Salud pública - Enfermedades tropicales"
        ],
        "referencias": [],
        "hardware_tabla": [
            {
                "componente": "Raspberry Pi 5 de 8 GB",
                "categoria": "Computador de Placa Única",
                "funcion": "Ejecuta el detector de parásitos y calcula la parasitemia."
            },
            {
                "componente": "Raspberry Pi High Quality Camera con adaptador para ocular",
                "categoria": "Sensor de Imagen",
                "funcion": "Captura los campos del frotis a través del microscopio."
            },
            {
                "componente": "Microscopio óptico binocular del laboratorio con objetivo 100x",
                "categoria": "Equipo de Laboratorio",
                "funcion": "Amplía el frotis sanguíneo para su observación."
            },
            {
                "componente": "Láminas de práctica de frotis teñidos con Giemsa",
                "categoria": "Material de Pruebas",
                "funcion": "Permiten validar el sistema frente al conteo manual."
            },
            {
                "componente": "Pantalla táctil de 7 pulgadas",
                "categoria": "Interfaz de Usuario / Iluminación",
                "funcion": "Muestra las detecciones y el resultado de parasitemia."
            }
        ],
        "software_tabla": [
            {
                "herramienta": "Ultralytics YOLO",
                "tipo": "Framework de Detección de Objetos",
                "descripcion": "Entrenamiento del detector de células parasitadas."
            },
            {
                "herramienta": "NCNN",
                "tipo": "Motor de Inferencia Embebida",
                "descripcion": "Inferencia optimizada del detector en la CPU de la Raspberry Pi."
            },
            {
                "herramienta": "Label Studio",
                "tipo": "Herramienta de Anotación de Datos",
                "descripcion": "Anotación de imágenes capturadas en el laboratorio."
            },
            {
                "herramienta": "OpenCV",
                "tipo": "Librería de Visión Artificial",
                "descripcion": "Captura, evaluación de enfoque y unión de campos."
            },
            {
                "herramienta": "SQLite",
                "tipo": "Base de Datos",
                "descripcion": "Registro local de láminas analizadas y resultados."
            }
        ]
    }
];
