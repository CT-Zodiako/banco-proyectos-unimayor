// Projects for this area. Each entry follows the schema checked by scripts/projects-validation.mjs.
export default [
    {
        "id": "proj_227",
        "titulo": "🦯 Proyecto 227: Bastón Inteligente con Detección de Obstáculos Aéreos y Retroalimentación Háptica para Personas Ciegas",
        "descripcion": "Problema: El bastón blanco tradicional detecta obstáculos a nivel del suelo, pero no advierte ramas, avisos, toldos o espejos de vehículos que están a la altura del pecho o de la cabeza. En las calles de Popayán, con andenes estrechos y ventas ambulantes, las personas ciegas o con baja visión sufren golpes frecuentes que reducen su autonomía y su confianza para desplazarse solas.\n\nDescripción: Módulo acoplable a un bastón blanco convencional que combina un sensor de distancia ToF y un sensor ultrasónico orientado hacia arriba con una cámara pequeña y un ESP32-S3. Un modelo ligero de detección de objetos ejecutado en el borde clasifica el tipo de obstáculo (poste, persona, vehículo, escalón) y el sistema traduce la distancia en patrones de vibración diferenciados y en mensajes de voz cortos por un audífono de conducción ósea. Una aplicación móvil accesible con lector de pantalla permite ajustar la sensibilidad y registrar zonas problemáticas que pueden compartirse con la comunidad. El diseño se realiza en co-creación con usuarios de una asociación local de personas con discapacidad visual y se presenta como prototipo de apoyo, no como dispositivo médico certificado.",
        "area": "AIoT para Discapacidad y Enfermedad",
        "sector": "Discapacidad visual - Movilidad urbana",
        "nivel": "Intermedio-Avanzado",
        "duracion": "Un semestre",
        "presupuesto": "Bajo costo",
        "habilidades": [
            "Integración de sensores de distancia ToF y ultrasónicos",
            "Detección de objetos con modelos ligeros en el borde",
            "Diseño de patrones hápticos y mensajes de voz accesibles",
            "Desarrollo móvil compatible con lectores de pantalla",
            "Diseño centrado en el usuario y co-creación con personas ciegas"
        ],
        "objetivos": [
            "🎯 Objetivo General: Desarrollar un módulo acoplable al bastón blanco que detecte obstáculos a nivel del suelo y aéreos, identifique su tipo y los comunique mediante vibración y voz a personas ciegas o con baja visión.",
            "📌 Objetivos Específicos:",
            "• Detectar obstáculos entre 0,3 m y 2 m de distancia, incluidos los ubicados a la altura de la cabeza, con una tasa de detección superior al 90 % en un recorrido de prueba controlado.",
            "• Entrenar y cuantizar un modelo de detección de objetos para al menos cuatro clases de obstáculos urbanos con un tiempo de respuesta inferior a 300 ms en el ESP32-S3.",
            "• Diseñar con al menos cinco usuarios ciegos un vocabulario de patrones de vibración y mensajes de voz, y evaluar su comprensión y comodidad con una encuesta de usabilidad SUS.",
            "• Implementar una aplicación móvil accesible con TalkBack para configurar el dispositivo y registrar zonas con obstáculos frecuentes, aplicando consentimiento informado y protección de datos según la Ley 1581 de 2012."
        ],
        "pasos": [
            "Análisis de requisitos",
            "Diseño de la solución",
            "Implementación y pruebas",
            "Validación y sustentación"
        ],
        "aplicaciones": [
            "Discapacidad visual - Movilidad urbana"
        ],
        "referencias": [
            "Congreso de Colombia. Ley Estatutaria 1618 de 2013, por medio de la cual se establecen las disposiciones para garantizar el pleno ejercicio de los derechos de las personas con discapacidad."
        ],
        "hardware_tabla": [
            {
                "componente": "ESP32-S3 con cámara OV2640",
                "categoria": "Microcontrolador",
                "funcion": "Captura imágenes, ejecuta el modelo de detección y coordina sensores y actuadores."
            },
            {
                "componente": "Sensor de distancia ToF VL53L1X",
                "categoria": "Sensor de Distancia",
                "funcion": "Mide la distancia a obstáculos frontales con precisión centimétrica."
            },
            {
                "componente": "Sensor ultrasónico HC-SR04 orientado hacia arriba",
                "categoria": "Sensor de Distancia",
                "funcion": "Detecta obstáculos aéreos a la altura del pecho y de la cabeza."
            },
            {
                "componente": "Motor vibrador tipo moneda con driver DRV2605L",
                "categoria": "Actuador Háptico",
                "funcion": "Genera patrones de vibración diferenciados según la distancia y el tipo de obstáculo."
            },
            {
                "componente": "Audífono de conducción ósea Bluetooth",
                "categoria": "Interfaz de Usuario / Audio",
                "funcion": "Entrega mensajes de voz sin bloquear los sonidos del entorno."
            },
            {
                "componente": "Batería LiPo con módulo de carga TP4056",
                "categoria": "Fuente de Alimentación / Energía",
                "funcion": "Alimenta el módulo durante una jornada de uso."
            }
        ],
        "software_tabla": [
            {
                "herramienta": "Edge Impulse",
                "tipo": "Plataforma de TinyML",
                "descripcion": "Entrenamiento y cuantización del modelo de detección de obstáculos."
            },
            {
                "herramienta": "ESP-IDF",
                "tipo": "Entorno de Desarrollo Embebido",
                "descripcion": "Firmware de adquisición, inferencia y control háptico."
            },
            {
                "herramienta": "Flutter",
                "tipo": "Framework de Desarrollo Móvil",
                "descripcion": "Aplicación de configuración compatible con TalkBack y VoiceOver."
            },
            {
                "herramienta": "Firebase",
                "tipo": "Base de Datos en la Nube",
                "descripcion": "Registro anónimo de zonas con obstáculos frecuentes."
            }
        ]
    },
    {
        "id": "proj_228",
        "titulo": "🤟 Proyecto 228: Reconocimiento en Tiempo Real de la Lengua de Señas Colombiana con Visión por Computador en el Borde",
        "descripcion": "Problema: Las personas sordas que se comunican en Lengua de Señas Colombiana (LSC) encuentran barreras para hacer trámites en ventanillas de atención, bibliotecas o consultorios, porque casi ningún funcionario conoce la lengua y los intérpretes son escasos, especialmente fuera de las grandes ciudades.\n\nDescripción: Terminal de atención compuesto por una Raspberry Pi 5 con cámara y pantalla que extrae los puntos clave de manos, rostro y postura con MediaPipe y los clasifica con un modelo secuencial (LSTM o Transformer ligero) para reconocer un vocabulario inicial de señas aisladas propias de trámites (saludo, nombre, cita, pago, ayuda, números). La traducción se muestra en texto de alto contraste y se reproduce en voz para el funcionario, quien puede responder con frases predefinidas que se presentan en texto y en video de señas pregrabado. El conjunto de datos se graba con personas sordas de la comunidad, con consentimiento informado, y el sistema se valida con ellas como herramienta de apoyo que no reemplaza al intérprete.",
        "area": "AIoT para Discapacidad y Enfermedad",
        "sector": "Discapacidad auditiva - Comunicación accesible",
        "nivel": "Avanzado",
        "duracion": "Un semestre",
        "presupuesto": "Bajo costo",
        "habilidades": [
            "Estimación de puntos clave de manos y cuerpo con MediaPipe",
            "Modelos secuenciales para clasificación de gestos",
            "Construcción ética de conjuntos de datos con la comunidad sorda",
            "Despliegue de modelos en Raspberry Pi",
            "Diseño de interfaces bilingües LSC y español con alto contraste"
        ],
        "objetivos": [
            "🎯 Objetivo General: Construir un terminal de atención que reconozca en tiempo real un vocabulario básico de la Lengua de Señas Colombiana y lo traduzca a texto y voz para facilitar la comunicación entre personas sordas y funcionarios oyentes.",
            "📌 Objetivos Específicos:",
            "• Grabar, con consentimiento informado y en co-creación con personas sordas usuarias de LSC, un conjunto de datos de al menos 30 señas aisladas con varias personas señantes.",
            "• Entrenar un clasificador secuencial sobre puntos clave de MediaPipe que alcance una exactitud superior al 85 % en señantes no vistos durante el entrenamiento.",
            "• Ejecutar el reconocimiento en una Raspberry Pi 5 a más de 15 cuadros por segundo con una latencia de traducción menor a un segundo por seña.",
            "• Evaluar con usuarios sordos y funcionarios la utilidad del terminal en un trámite simulado y documentar las limitaciones del vocabulario reconocido."
        ],
        "pasos": [
            "Análisis de requisitos",
            "Diseño de la solución",
            "Implementación y pruebas",
            "Validación y sustentación"
        ],
        "aplicaciones": [
            "Discapacidad auditiva - Comunicación accesible"
        ],
        "referencias": [
            "Congreso de Colombia. Ley 324 de 1996, por la cual se crean algunas normas a favor de la población sorda.",
            "Congreso de Colombia. Ley Estatutaria 1618 de 2013, por medio de la cual se establecen las disposiciones para garantizar el pleno ejercicio de los derechos de las personas con discapacidad."
        ],
        "hardware_tabla": [
            {
                "componente": "Raspberry Pi 5 de 8 GB",
                "categoria": "Computador de Placa Única",
                "funcion": "Ejecuta la extracción de puntos clave y el clasificador de señas."
            },
            {
                "componente": "Cámara USB 1080p de gran angular",
                "categoria": "Sensor de Imagen",
                "funcion": "Captura las manos, el rostro y el torso de la persona señante."
            },
            {
                "componente": "Pantalla táctil de 10 pulgadas",
                "categoria": "Interfaz de Usuario / Iluminación",
                "funcion": "Muestra la traducción en texto de alto contraste y los videos de respuesta en señas."
            },
            {
                "componente": "Altavoz USB",
                "categoria": "Interfaz de Usuario / Audio",
                "funcion": "Reproduce en voz la traducción para el funcionario oyente."
            },
            {
                "componente": "Computador con GPU del laboratorio",
                "categoria": "Equipo de Cómputo",
                "funcion": "Entrena los modelos secuenciales antes de desplegarlos."
            }
        ],
        "software_tabla": [
            {
                "herramienta": "MediaPipe Holistic",
                "tipo": "Librería de Visión por Computador",
                "descripcion": "Extracción de puntos clave de manos, rostro y postura."
            },
            {
                "herramienta": "PyTorch",
                "tipo": "Framework de Aprendizaje Automático",
                "descripcion": "Entrenamiento del clasificador secuencial de señas."
            },
            {
                "herramienta": "ONNX Runtime",
                "tipo": "Motor de Inferencia Embebida",
                "descripcion": "Ejecución optimizada del modelo en la Raspberry Pi."
            },
            {
                "herramienta": "Piper TTS",
                "tipo": "Síntesis de Voz",
                "descripcion": "Conversión local del texto traducido a voz en español."
            },
            {
                "herramienta": "Label Studio",
                "tipo": "Herramienta de Etiquetado",
                "descripcion": "Segmentación y etiquetado de los videos de señas grabados."
            }
        ]
    },
    {
        "id": "proj_229",
        "titulo": "💬 Proyecto 229: Subtitulado Automático en Vivo de Clases Universitarias para Estudiantes Sordos e Hipoacúsicos",
        "descripcion": "Problema: Los estudiantes sordos o con hipoacusia que no usan lengua de señas, o que no cuentan con intérprete en todas sus asignaturas, pierden buena parte de las explicaciones orales en clase. Las grabaciones posteriores no resuelven la participación en tiempo real y los servicios comerciales de subtitulado requieren conexión estable y licencias costosas.\n\nDescripción: Sistema instalado en el aula con un micrófono de solapa inalámbrico para el docente y una Raspberry Pi o un portátil que ejecuta reconocimiento automático de voz local con un modelo Whisper optimizado. La transcripción se publica por MQTT y se muestra en tiempo real en el celular o la tableta del estudiante a través de una aplicación web con tamaño de letra ajustable, alto contraste y cumplimiento de pautas WCAG 2.1. Un diccionario de términos técnicos por asignatura mejora el reconocimiento del vocabulario especializado, y al final de la clase el estudiante recibe la transcripción completa con marcas de tiempo. El proyecto se valida con estudiantes de la institución que tengan discapacidad auditiva, con su consentimiento.",
        "area": "AIoT para Discapacidad y Enfermedad",
        "sector": "Educación inclusiva - Discapacidad auditiva",
        "nivel": "Intermedio-Avanzado",
        "duracion": "Un semestre",
        "presupuesto": "Bajo costo",
        "habilidades": [
            "Reconocimiento automático de voz con modelos Whisper",
            "Mensajería en tiempo real con MQTT y WebSockets",
            "Desarrollo web accesible según WCAG 2.1",
            "Optimización de modelos de voz para hardware limitado",
            "Evaluación de sistemas con estudiantes con discapacidad"
        ],
        "objetivos": [
            "🎯 Objetivo General: Implementar un sistema local de subtitulado en vivo que permita a estudiantes sordos e hipoacúsicos seguir las explicaciones orales del docente en tiempo real desde su propio dispositivo.",
            "📌 Objetivos Específicos:",
            "• Configurar un modelo de reconocimiento de voz en español que funcione sin conexión a internet con un retardo inferior a tres segundos entre el habla y el subtítulo.",
            "• Medir la tasa de error por palabra en clases reales de ingeniería y reducirla mediante un vocabulario de términos técnicos por asignatura.",
            "• Desarrollar una aplicación web progresiva con tamaño de letra ajustable, modo de alto contraste y navegación por teclado, verificada con una herramienta de auditoría de accesibilidad.",
            "• Evaluar la comprensión y satisfacción de estudiantes con discapacidad auditiva durante al menos cuatro sesiones de clase, con consentimiento informado."
        ],
        "pasos": [
            "Análisis de requisitos",
            "Diseño de la solución",
            "Implementación y pruebas",
            "Validación y sustentación"
        ],
        "aplicaciones": [
            "Educación inclusiva - Discapacidad auditiva"
        ],
        "referencias": [
            "W3C. Web Content Accessibility Guidelines (WCAG) 2.1. W3C Recommendation, 2018."
        ],
        "hardware_tabla": [
            {
                "componente": "Micrófono de solapa inalámbrico",
                "categoria": "Sensor de Audio",
                "funcion": "Capta la voz del docente con poco ruido del aula."
            },
            {
                "componente": "Raspberry Pi 5 de 8 GB o portátil del laboratorio",
                "categoria": "Computador de Placa Única",
                "funcion": "Ejecuta el reconocimiento de voz y el servidor de subtítulos."
            },
            {
                "componente": "Interfaz de audio USB",
                "categoria": "Módulo de Adquisición",
                "funcion": "Digitaliza la señal del micrófono con buena calidad."
            },
            {
                "componente": "Punto de acceso Wi-Fi",
                "categoria": "Módulo de Comunicación",
                "funcion": "Crea una red local del aula para distribuir los subtítulos a los dispositivos."
            }
        ],
        "software_tabla": [
            {
                "herramienta": "faster-whisper",
                "tipo": "Reconocimiento Automático de Voz",
                "descripcion": "Transcripción local en español con un modelo Whisper optimizado."
            },
            {
                "herramienta": "Eclipse Mosquitto",
                "tipo": "Broker MQTT",
                "descripcion": "Distribución de los fragmentos de subtítulo en tiempo real."
            },
            {
                "herramienta": "React",
                "tipo": "Framework Frontend",
                "descripcion": "Aplicación web progresiva accesible para visualizar los subtítulos."
            },
            {
                "herramienta": "axe DevTools",
                "tipo": "Herramienta de Auditoría de Accesibilidad",
                "descripcion": "Verificación de criterios WCAG en la interfaz del estudiante."
            }
        ]
    },
    {
        "id": "proj_230",
        "titulo": "🏠 Proyecto 230: Hogar Accesible Controlado por Voz en Español para Personas con Movilidad Reducida",
        "descripcion": "Problema: Las personas con lesión medular, distrofia muscular u otras condiciones que reducen su movilidad dependen de un cuidador para tareas simples como encender la luz, abrir la puerta o activar un ventilador. Los asistentes de voz comerciales exigen conexión permanente, envían el audio a servidores externos y no siempre reconocen bien el habla de personas con voz débil o con disartria leve.\n\nDescripción: Sistema domótico de bajo costo basado en Home Assistant y nodos ESP32 con relés y sensores, controlado por un asistente de voz que funciona completamente dentro de la vivienda. Una palabra de activación personalizada, un reconocedor de voz local y un intérprete de intenciones entrenado con frases del propio usuario permiten controlar luces, cerradura, ventilador, televisor y un botón de llamada al cuidador. El sistema ofrece también un pulsador grande y un tablero táctil de alto contraste como vías alternativas, y se adapta a la voz del usuario con unas pocas grabaciones. Se diseña junto con usuarios en silla de ruedas y sus familias, priorizando la privacidad del audio.",
        "area": "AIoT para Discapacidad y Enfermedad",
        "sector": "Discapacidad física - Vivienda accesible",
        "nivel": "Intermedio",
        "duracion": "Un semestre",
        "presupuesto": "Bajo costo",
        "habilidades": [
            "Domótica con Home Assistant y ESPHome",
            "Reconocimiento de voz y detección de palabra de activación locales",
            "Clasificación de intenciones con procesamiento de lenguaje natural",
            "Instalación segura de relés y cargas eléctricas",
            "Diseño de interfaces alternativas accesibles"
        ],
        "objetivos": [
            "🎯 Objetivo General: Implementar un sistema domótico controlado por voz que funcione sin conexión a internet y permita a personas con movilidad reducida operar de forma autónoma los elementos básicos de su vivienda.",
            "📌 Objetivos Específicos:",
            "• Integrar al menos cinco dispositivos del hogar (luces, cerradura, ventilador, televisor y llamada al cuidador) mediante nodos ESP32 administrados por Home Assistant.",
            "• Configurar un asistente de voz local en español con palabra de activación personalizada que alcance una tasa de acierto de comandos superior al 90 % con la voz del usuario.",
            "• Ofrecer vías de control alternativas mediante un pulsador adaptado y un tablero táctil de alto contraste con iconos grandes y lenguaje sencillo.",
            "• Validar el sistema durante una semana con al menos dos personas con movilidad reducida y medir la reducción de solicitudes de ayuda al cuidador."
        ],
        "pasos": [
            "Análisis de requisitos",
            "Diseño de la solución",
            "Implementación y pruebas",
            "Validación y sustentación"
        ],
        "aplicaciones": [
            "Discapacidad física - Vivienda accesible"
        ],
        "referencias": [
            "Congreso de Colombia. Ley Estatutaria 1618 de 2013, por medio de la cual se establecen las disposiciones para garantizar el pleno ejercicio de los derechos de las personas con discapacidad."
        ],
        "hardware_tabla": [
            {
                "componente": "Raspberry Pi 4 de 4 GB",
                "categoria": "Computador de Placa Única",
                "funcion": "Aloja Home Assistant y el asistente de voz local."
            },
            {
                "componente": "Micrófono de arreglo ReSpeaker USB",
                "categoria": "Sensor de Audio",
                "funcion": "Capta los comandos de voz a distancia dentro de la habitación."
            },
            {
                "componente": "Nodos ESP32 con módulos de relé",
                "categoria": "Microcontrolador",
                "funcion": "Accionan luces, ventilador y otras cargas del hogar."
            },
            {
                "componente": "Cerradura electromagnética de 12 V",
                "categoria": "Actuador",
                "funcion": "Permite abrir la puerta principal por voz o desde el tablero."
            },
            {
                "componente": "Emisor infrarrojo",
                "categoria": "Módulo de Comunicación",
                "funcion": "Controla el televisor y otros equipos con control remoto."
            },
            {
                "componente": "Pulsador grande adaptado",
                "categoria": "Interfaz de Usuario / Iluminación",
                "funcion": "Ofrece una vía de control alternativa cuando la voz no es suficiente."
            }
        ],
        "software_tabla": [
            {
                "herramienta": "Home Assistant",
                "tipo": "Plataforma de Domótica",
                "descripcion": "Orquestación de dispositivos, automatizaciones y tablero táctil."
            },
            {
                "herramienta": "ESPHome",
                "tipo": "Firmware para Dispositivos IoT",
                "descripcion": "Configuración de los nodos ESP32 de relés y sensores."
            },
            {
                "herramienta": "openWakeWord",
                "tipo": "Detección de Palabra de Activación",
                "descripcion": "Entrenamiento de una palabra de activación personalizada."
            },
            {
                "herramienta": "Vosk",
                "tipo": "Reconocimiento Automático de Voz",
                "descripcion": "Reconocimiento local de comandos en español sin conexión."
            },
            {
                "herramienta": "Rasa NLU",
                "tipo": "Procesamiento de Lenguaje Natural",
                "descripcion": "Clasificación de intenciones y extracción de entidades de los comandos."
            }
        ]
    },
    {
        "id": "proj_231",
        "titulo": "👵 Proyecto 231: Detección de Anomalías en la Rutina Diaria de Adultos Mayores que Viven Solos con Sensores Ambientales",
        "descripcion": "Problema: Muchos adultos mayores en el Cauca viven solos mientras sus hijos trabajan en otras ciudades. Una caída, una descompensación o un cambio brusco en el comportamiento (no levantarse, no comer, levantarse muchas veces en la noche) puede pasar inadvertido durante horas. Las cámaras dentro del hogar son rechazadas por invasivas y los botones de pánico fallan cuando la persona no puede presionarlos.\n\nDescripción: Red de sensores ambientales no intrusivos (movimiento PIR, apertura de puertas y nevera, consumo eléctrico, presión en la cama) conectados por Zigbee a una Raspberry Pi que aprende el patrón habitual de actividad de la persona durante las primeras semanas. Un modelo de detección de anomalías compara cada día con ese patrón y genera alertas graduadas al familiar o cuidador por Telegram cuando detecta inactividad prolongada, ausencia de comidas o alteraciones del sueño. El adulto mayor interactúa con un altavoz que le habla con frases sencillas para confirmar que está bien antes de escalar la alerta. El sistema no usa cámaras ni micrófonos permanentes y se instala con consentimiento informado de la persona.",
        "area": "AIoT para Discapacidad y Enfermedad",
        "sector": "Adulto mayor - Vida independiente",
        "nivel": "Intermedio-Avanzado",
        "duracion": "Un semestre",
        "presupuesto": "Bajo costo",
        "habilidades": [
            "Redes de sensores Zigbee y Zigbee2MQTT",
            "Detección de anomalías en series de tiempo de actividad",
            "Diseño de alertas graduadas y confirmación por voz",
            "Bases de datos de series de tiempo",
            "Privacidad y ética en el monitoreo de personas mayores"
        ],
        "objetivos": [
            "🎯 Objetivo General: Desarrollar un sistema no intrusivo que aprenda la rutina diaria de un adulto mayor que vive solo y avise a su familia o cuidador cuando detecte desviaciones que puedan indicar un problema.",
            "📌 Objetivos Específicos:",
            "• Instalar una red de al menos ocho sensores ambientales Zigbee sin cámaras y almacenar los eventos de actividad en una base de datos de series de tiempo.",
            "• Comparar al menos dos métodos de detección de anomalías (Isolation Forest y un modelo estadístico por franjas horarias) usando escenarios simulados de inactividad, omisión de comidas y alteración del sueño.",
            "• Implementar un flujo de alerta graduada que primero confirme por voz con la persona y luego notifique al cuidador, con una tasa de falsas alarmas inferior a una por semana.",
            "• Validar el sistema durante dos semanas en la vivienda de un adulto mayor voluntario, con consentimiento informado y tratamiento de datos conforme a la Ley 1581 de 2012."
        ],
        "pasos": [
            "Análisis de requisitos",
            "Diseño de la solución",
            "Implementación y pruebas",
            "Validación y sustentación"
        ],
        "aplicaciones": [
            "Adulto mayor - Vida independiente"
        ],
        "referencias": [
            "Congreso de Colombia. Ley 1251 de 2008, por la cual se dictan normas tendientes a procurar la protección, promoción y defensa de los derechos de los adultos mayores.",
            "Congreso de Colombia. Ley Estatutaria 1581 de 2012, por la cual se dictan disposiciones generales para la protección de datos personales."
        ],
        "hardware_tabla": [
            {
                "componente": "Raspberry Pi 4 con adaptador Zigbee USB",
                "categoria": "Computador de Placa Única",
                "funcion": "Recibe los eventos de los sensores y ejecuta el modelo de anomalías."
            },
            {
                "componente": "Sensores de movimiento PIR Zigbee",
                "categoria": "Sensor de Presencia",
                "funcion": "Registran la actividad en cada habitación."
            },
            {
                "componente": "Sensores de apertura de puerta Zigbee",
                "categoria": "Sensor de Contacto",
                "funcion": "Detectan el uso de la puerta principal, el baño y la nevera."
            },
            {
                "componente": "Enchufe inteligente con medición de consumo",
                "categoria": "Sensor de Energía",
                "funcion": "Identifica el uso de la estufa eléctrica o el hervidor."
            },
            {
                "componente": "Sensor de presión bajo el colchón con ESP32",
                "categoria": "Sensor de Presión",
                "funcion": "Detecta la ocupación de la cama y los despertares nocturnos."
            },
            {
                "componente": "Altavoz con micrófono activable por botón",
                "categoria": "Interfaz de Usuario / Audio",
                "funcion": "Pregunta a la persona si está bien y recibe su confirmación."
            }
        ],
        "software_tabla": [
            {
                "herramienta": "Zigbee2MQTT",
                "tipo": "Puente de Comunicación IoT",
                "descripcion": "Integración de los sensores Zigbee mediante MQTT."
            },
            {
                "herramienta": "InfluxDB",
                "tipo": "Base de Datos de Series de Tiempo",
                "descripcion": "Almacenamiento de los eventos de actividad."
            },
            {
                "herramienta": "scikit-learn",
                "tipo": "Librería de Aprendizaje Automático",
                "descripcion": "Modelos de detección de anomalías sobre la rutina diaria."
            },
            {
                "herramienta": "Node-RED",
                "tipo": "Orquestación de Flujos",
                "descripcion": "Lógica de alerta graduada y envío de mensajes por Telegram."
            },
            {
                "herramienta": "Grafana",
                "tipo": "Visualización / Dashboard",
                "descripcion": "Tablero de rutina diaria para el cuidador."
            }
        ]
    },
    {
        "id": "proj_232",
        "titulo": "🩸 Proyecto 232: Asistente Conectado para Personas con Diabetes Tipo 2 con Registro de Glucosa por Voz y Estimación de Carbohidratos por Foto",
        "descripcion": "Problema: Las personas con diabetes tipo 2, muchas de ellas adultos mayores o con baja visión por retinopatía, tienen dificultad para llevar el registro diario de glucometrías, calcular los carbohidratos de sus comidas y recordar sus medicamentos. Los cuadernos de papel se pierden y las aplicaciones existentes tienen letra pequeña, menús complejos y alimentos que no corresponden a la dieta colombiana.\n\nDescripción: Aplicación móvil accesible conectada a un pequeño hub con ESP32 y pantalla de alto contraste en la cocina. La persona dicta el valor del glucómetro por voz, toma una foto de su plato y un modelo de visión por computador entrenado con platos típicos colombianos (arepa, fríjoles, arroz, papa, plátano) estima la porción y los carbohidratos aproximados. El sistema envía recordatorios de medicamentos con voz y vibración, muestra tendencias semanales con lenguaje sencillo y genera un reporte en PDF para llevar a la consulta. Todas las recomendaciones son orientativas, se aclara que es un prototipo de apoyo y no un dispositivo médico certificado, y no sustituye las indicaciones del equipo de salud.",
        "area": "AIoT para Discapacidad y Enfermedad",
        "sector": "Enfermedades crónicas - Diabetes",
        "nivel": "Intermedio-Avanzado",
        "duracion": "Un semestre",
        "presupuesto": "Bajo costo",
        "habilidades": [
            "Clasificación de imágenes de alimentos con aprendizaje por transferencia",
            "Reconocimiento de voz para entrada de datos numéricos",
            "Desarrollo móvil accesible para adultos mayores y baja visión",
            "Comunicación entre aplicación móvil y dispositivos ESP32",
            "Manejo responsable de datos de salud"
        ],
        "objetivos": [
            "🎯 Objetivo General: Desarrollar un asistente conectado que facilite a personas con diabetes tipo 2 el registro de glucosa, la estimación de carbohidratos de sus comidas y la adherencia a sus medicamentos mediante una interfaz accesible.",
            "📌 Objetivos Específicos:",
            "• Construir un conjunto de imágenes de al menos 15 preparaciones típicas colombianas y entrenar un clasificador por transferencia con exactitud superior al 80 %, asociado a una tabla de carbohidratos por porción.",
            "• Implementar el registro de glucometrías y comidas por voz con confirmación hablada, evitando la necesidad de escribir en el teléfono.",
            "• Diseñar la aplicación y el hub de cocina con texto grande, alto contraste y lenguaje sencillo, y evaluarlos con personas con diabetes mediante la escala SUS.",
            "• Generar reportes semanales de glucosa y adherencia que la persona pueda compartir con su equipo de salud, almacenando los datos con cifrado y consentimiento informado."
        ],
        "pasos": [
            "Análisis de requisitos",
            "Diseño de la solución",
            "Implementación y pruebas",
            "Validación y sustentación"
        ],
        "aplicaciones": [
            "Enfermedades crónicas - Diabetes"
        ],
        "referencias": [],
        "hardware_tabla": [
            {
                "componente": "ESP32 con pantalla TFT de 3,5 pulgadas",
                "categoria": "Microcontrolador",
                "funcion": "Hub de cocina que muestra recordatorios y valores en alto contraste."
            },
            {
                "componente": "Zumbador y motor vibrador",
                "categoria": "Actuador Háptico",
                "funcion": "Refuerzan los recordatorios de medicamentos."
            },
            {
                "componente": "Glucómetro convencional del paciente",
                "categoria": "Sensor Biomédico",
                "funcion": "Proporciona el valor de glucosa que la persona registra por voz."
            },
            {
                "componente": "Teléfono inteligente del usuario",
                "categoria": "Equipo de Cómputo",
                "funcion": "Toma las fotos de los platos y ejecuta la aplicación accesible."
            }
        ],
        "software_tabla": [
            {
                "herramienta": "TensorFlow Lite",
                "tipo": "Motor de Inferencia Móvil",
                "descripcion": "Clasificación de alimentos directamente en el teléfono."
            },
            {
                "herramienta": "Flutter",
                "tipo": "Framework de Desarrollo Móvil",
                "descripcion": "Aplicación con texto escalable, alto contraste y soporte de lector de pantalla."
            },
            {
                "herramienta": "Speech-to-Text de Android",
                "tipo": "Reconocimiento Automático de Voz",
                "descripcion": "Registro por voz de glucometrías y comidas."
            },
            {
                "herramienta": "Supabase",
                "tipo": "Base de Datos en la Nube",
                "descripcion": "Almacenamiento cifrado de registros y generación de reportes."
            }
        ]
    },
    {
        "id": "proj_233",
        "titulo": "🫁 Proyecto 233: Monitoreo Domiciliario de Pacientes con EPOC y Asma con Calidad del Aire y Predicción de Exacerbaciones",
        "descripcion": "Problema: Los pacientes con enfermedad pulmonar obstructiva crónica (EPOC) y asma empeoran cuando se exponen a humo de leña, polvo o cambios de humedad, condiciones frecuentes en las viviendas rurales del Cauca donde todavía se cocina con fogón. Las exacerbaciones suelen detectarse tarde, cuando el paciente ya necesita urgencias.\n\nDescripción: Estación domiciliaria con ESP32 que mide material particulado PM2.5, CO2, temperatura y humedad, junto con un oxímetro de pulso de muñeca y un cuestionario diario de síntomas por voz con preguntas cortas. Un modelo de aprendizaje automático combina la exposición ambiental, la saturación de oxígeno y los síntomas reportados para estimar el riesgo de empeoramiento en los próximos días y avisar al paciente y a su cuidador con recomendaciones sencillas (ventilar, alejarse del fogón, contactar al centro de salud). La interfaz usa colores de semáforo con iconos y mensajes hablados para personas con baja escolaridad. El sistema es un prototipo de apoyo, no un dispositivo médico certificado.",
        "area": "AIoT para Discapacidad y Enfermedad",
        "sector": "Enfermedades crónicas - Salud respiratoria",
        "nivel": "Avanzado",
        "duracion": "Un semestre",
        "presupuesto": "Bajo costo",
        "habilidades": [
            "Instrumentación de calidad del aire con sensores de bajo costo",
            "Adquisición de saturación de oxígeno y frecuencia cardíaca",
            "Modelos de riesgo con series de tiempo multivariadas",
            "Diseño de interfaces para baja escolaridad con voz e iconos",
            "Ética en el monitoreo de pacientes crónicos"
        ],
        "objetivos": [
            "🎯 Objetivo General: Construir una estación domiciliaria que integre calidad del aire, saturación de oxígeno y síntomas reportados para alertar tempranamente a pacientes con EPOC o asma sobre el riesgo de empeoramiento.",
            "📌 Objetivos Específicos:",
            "• Calibrar los sensores de PM2.5 y CO2 frente a un equipo de referencia del laboratorio y documentar su error en condiciones de humo de leña.",
            "• Implementar un cuestionario diario de síntomas por voz de menos de un minuto que pueda responder una persona con baja escolaridad.",
            "• Entrenar y comparar modelos de riesgo (regresión logística y gradient boosting) con datos recolectados y escenarios simulados, reportando sensibilidad y tasa de falsas alarmas.",
            "• Validar la usabilidad de la estación y sus alertas en semáforo con al menos tres pacientes y sus cuidadores, con consentimiento informado y acompañamiento de un profesional de salud."
        ],
        "pasos": [
            "Análisis de requisitos",
            "Diseño de la solución",
            "Implementación y pruebas",
            "Validación y sustentación"
        ],
        "aplicaciones": [
            "Enfermedades crónicas - Salud respiratoria"
        ],
        "referencias": [],
        "hardware_tabla": [
            {
                "componente": "ESP32-WROOM-32",
                "categoria": "Microcontrolador",
                "funcion": "Lee los sensores ambientales y envía los datos por MQTT."
            },
            {
                "componente": "Sensor de material particulado PMS5003",
                "categoria": "Sensor Ambiental",
                "funcion": "Mide PM2.5 y PM10 asociados al humo de leña y al polvo."
            },
            {
                "componente": "Sensor de CO2, temperatura y humedad SCD40",
                "categoria": "Sensor Ambiental",
                "funcion": "Mide la ventilación y las condiciones del ambiente interior."
            },
            {
                "componente": "Oxímetro de pulso con módulo MAX30102",
                "categoria": "Sensor Biomédico",
                "funcion": "Estima la saturación de oxígeno y la frecuencia cardíaca del paciente."
            },
            {
                "componente": "Anillo LED RGB y altavoz",
                "categoria": "Interfaz de Usuario / Iluminación",
                "funcion": "Muestran el nivel de riesgo en semáforo y reproducen mensajes hablados."
            }
        ],
        "software_tabla": [
            {
                "herramienta": "Arduino IDE",
                "tipo": "Entorno de Desarrollo Embebido",
                "descripcion": "Firmware de adquisición de sensores y comunicación MQTT."
            },
            {
                "herramienta": "Eclipse Mosquitto",
                "tipo": "Broker MQTT",
                "descripcion": "Recepción de las mediciones de la estación."
            },
            {
                "herramienta": "scikit-learn",
                "tipo": "Librería de Aprendizaje Automático",
                "descripcion": "Entrenamiento de los modelos de riesgo de exacerbación."
            },
            {
                "herramienta": "FastAPI",
                "tipo": "Framework Backend",
                "descripcion": "Servicio de predicción y gestión de alertas al cuidador."
            },
            {
                "herramienta": "Grafana",
                "tipo": "Visualización / Dashboard",
                "descripcion": "Seguimiento de exposición ambiental y saturación para el equipo de salud."
            }
        ]
    },
    {
        "id": "proj_234",
        "titulo": "💊 Proyecto 234: Dispensador Inteligente de Medicamentos con Predicción de Riesgo de Omisión de Dosis",
        "descripcion": "Problema: Las personas con enfermedades crónicas como hipertensión, insuficiencia cardíaca o VIH toman varios medicamentos al día y la falta de adherencia es una causa frecuente de hospitalizaciones. Los pastilleros semanales no avisan cuando se olvida una dosis y no permiten que la familia o el programa de salud identifiquen a tiempo a quien está dejando el tratamiento.\n\nDescripción: Dispensador con carrusel de compartimentos accionado por un motor paso a paso, controlado por un ESP32 que libera la dosis a la hora programada y confirma la toma mediante un sensor de presencia en la bandeja. Los eventos de toma se envían a un servidor donde un modelo de aprendizaje automático, entrenado con el historial de horarios, días de la semana y retrasos previos, estima la probabilidad de que la persona omita las siguientes dosis y adelanta recordatorios o avisa al cuidador. La interfaz combina voz, luces y botones grandes con braille para personas con baja visión o adultos mayores. Se aclara que es un prototipo de apoyo, no un dispositivo médico certificado, y que la carga de medicamentos la supervisa un familiar o profesional.",
        "area": "AIoT para Discapacidad y Enfermedad",
        "sector": "Enfermedades crónicas - Adherencia terapéutica",
        "nivel": "Intermedio",
        "duracion": "Un semestre",
        "presupuesto": "Bajo costo",
        "habilidades": [
            "Diseño mecánico y control de motores paso a paso",
            "Firmware IoT con sincronización horaria y reintentos",
            "Modelos de clasificación para predicción de comportamiento",
            "Diseño de interfaces multimodales con voz, luz y braille",
            "Fabricación digital con impresión 3D"
        ],
        "objetivos": [
            "🎯 Objetivo General: Construir un dispensador conectado de medicamentos que libere las dosis a tiempo, confirme su toma y prediga el riesgo de omisión para reforzar la adherencia de personas con enfermedades crónicas.",
            "📌 Objetivos Específicos:",
            "• Diseñar e imprimir en 3D un carrusel de al menos 14 compartimentos accionado por motor paso a paso con detección de la toma en la bandeja.",
            "• Implementar el envío de eventos de toma por MQTT con almacenamiento local cuando no haya conexión y sincronización posterior.",
            "• Entrenar un modelo de predicción de omisión con datos de uso simulados y reales, y comparar su desempeño con una regla fija de recordatorio.",
            "• Evaluar con adultos mayores y personas con baja visión la comprensión de los avisos por voz, luz y botones en braille, con consentimiento informado."
        ],
        "pasos": [
            "Análisis de requisitos",
            "Diseño de la solución",
            "Implementación y pruebas",
            "Validación y sustentación"
        ],
        "aplicaciones": [
            "Enfermedades crónicas - Adherencia terapéutica"
        ],
        "referencias": [],
        "hardware_tabla": [
            {
                "componente": "ESP32-WROOM-32 con reloj de tiempo real DS3231",
                "categoria": "Microcontrolador",
                "funcion": "Programa las dosis, controla el motor y envía los eventos de toma."
            },
            {
                "componente": "Motor paso a paso 28BYJ-48 con driver ULN2003",
                "categoria": "Actuador",
                "funcion": "Gira el carrusel para liberar el compartimento correspondiente."
            },
            {
                "componente": "Sensor infrarrojo de presencia",
                "categoria": "Sensor de Presencia",
                "funcion": "Confirma que la persona retiró la dosis de la bandeja."
            },
            {
                "componente": "Módulo reproductor DFPlayer Mini con altavoz",
                "categoria": "Interfaz de Usuario / Audio",
                "funcion": "Reproduce recordatorios hablados en lenguaje sencillo."
            },
            {
                "componente": "Botones grandes con rotulación en braille y LED",
                "categoria": "Interfaz de Usuario / Iluminación",
                "funcion": "Permiten confirmar o posponer la toma y señalan el estado del dispensador."
            },
            {
                "componente": "Carcasa y carrusel impresos en PLA",
                "categoria": "Estructura Mecánica",
                "funcion": "Contienen los compartimentos de medicamentos y los componentes electrónicos."
            }
        ],
        "software_tabla": [
            {
                "herramienta": "PlatformIO",
                "tipo": "Entorno de Desarrollo Embebido",
                "descripcion": "Firmware del dispensador con manejo de horarios y reintentos."
            },
            {
                "herramienta": "FreeCAD",
                "tipo": "Software de Diseño CAD",
                "descripcion": "Diseño del carrusel y la carcasa para impresión 3D."
            },
            {
                "herramienta": "Node-RED",
                "tipo": "Orquestación de Flujos",
                "descripcion": "Recepción de eventos y avisos al cuidador."
            },
            {
                "herramienta": "scikit-learn",
                "tipo": "Librería de Aprendizaje Automático",
                "descripcion": "Modelo de predicción del riesgo de omisión de dosis."
            }
        ]
    },
    {
        "id": "proj_235",
        "titulo": "♿ Proyecto 235: Silla de Ruedas Conectada con Mapa de Presión para la Prevención de Úlceras por Presión",
        "descripcion": "Problema: Las personas con lesión medular que usan silla de ruedas durante muchas horas tienen alto riesgo de desarrollar úlceras por presión, porque no perciben la molestia que normalmente obliga a cambiar de postura. Estas lesiones son dolorosas, costosas de tratar y pueden requerir hospitalización prolongada.\n\nDescripción: Cojín instrumentado con una matriz de sensores resistivos de presión de bajo costo conectado a un ESP32 que construye un mapa de presión del asiento cada pocos segundos. Un modelo de aprendizaje automático clasifica la postura (centrada, inclinada a un lado, deslizada hacia adelante) y estima el tiempo acumulado de carga en las zonas de riesgo, como los isquiones y el sacro. Cuando se supera un umbral, el sistema recuerda al usuario realizar un alivio de presión mediante vibración y un mensaje en una aplicación móvil accesible, y registra el cumplimiento para revisarlo con el fisioterapeuta. El cojín se co-diseña con usuarios de silla de ruedas y se presenta como prototipo de apoyo, no como dispositivo médico certificado.",
        "area": "AIoT para Discapacidad y Enfermedad",
        "sector": "Discapacidad física - Usuarios de silla de ruedas",
        "nivel": "Avanzado",
        "duracion": "Un semestre",
        "presupuesto": "Bajo costo",
        "habilidades": [
            "Fabricación de matrices de sensores de presión con Velostat",
            "Multiplexación y lectura analógica de matrices de sensores",
            "Clasificación de posturas a partir de mapas de presión",
            "Desarrollo de aplicaciones móviles accesibles con Bluetooth Low Energy",
            "Trabajo colaborativo con fisioterapeutas y usuarios"
        ],
        "objetivos": [
            "🎯 Objetivo General: Desarrollar un cojín instrumentado que monitoree la distribución de presión en el asiento de una silla de ruedas y recuerde al usuario los alivios de presión necesarios para prevenir úlceras.",
            "📌 Objetivos Específicos:",
            "• Fabricar y caracterizar una matriz de al menos 16 x 16 puntos de presión con Velostat, documentando su respuesta frente a pesos de referencia.",
            "• Entrenar un clasificador de al menos cuatro posturas sentadas con exactitud superior al 85 % usando datos de varios voluntarios.",
            "• Implementar recordatorios de alivio de presión por vibración y por una aplicación móvil compatible con lector de pantalla y control por voz.",
            "• Validar el sistema durante jornadas reales con al menos dos usuarios de silla de ruedas, con consentimiento informado y acompañamiento de un fisioterapeuta."
        ],
        "pasos": [
            "Análisis de requisitos",
            "Diseño de la solución",
            "Implementación y pruebas",
            "Validación y sustentación"
        ],
        "aplicaciones": [
            "Discapacidad física - Usuarios de silla de ruedas"
        ],
        "referencias": [],
        "hardware_tabla": [
            {
                "componente": "ESP32-S3",
                "categoria": "Microcontrolador",
                "funcion": "Lee la matriz de presión, clasifica la postura y se comunica por Bluetooth Low Energy."
            },
            {
                "componente": "Matriz de Velostat con electrodos de cinta de cobre",
                "categoria": "Sensor de Presión",
                "funcion": "Mide la distribución de presión sobre el asiento."
            },
            {
                "componente": "Multiplexores analógicos CD74HC4067",
                "categoria": "Módulo de Adquisición",
                "funcion": "Permiten leer filas y columnas de la matriz con pocos pines."
            },
            {
                "componente": "Motor vibrador tipo moneda",
                "categoria": "Actuador Háptico",
                "funcion": "Avisa al usuario que debe realizar un alivio de presión."
            },
            {
                "componente": "Batería LiPo con módulo de carga TP4056",
                "categoria": "Fuente de Alimentación / Energía",
                "funcion": "Alimenta el cojín durante la jornada."
            },
            {
                "componente": "Cojín de espuma con funda lavable",
                "categoria": "Estructura Mecánica",
                "funcion": "Aloja la matriz de sensores y protege la piel del usuario."
            }
        ],
        "software_tabla": [
            {
                "herramienta": "Arduino IDE",
                "tipo": "Entorno de Desarrollo Embebido",
                "descripcion": "Firmware de lectura de la matriz y comunicación BLE."
            },
            {
                "herramienta": "TensorFlow Lite for Microcontrollers",
                "tipo": "Motor de Inferencia Embebida",
                "descripcion": "Clasificación de la postura dentro del ESP32-S3."
            },
            {
                "herramienta": "Python con NumPy y Matplotlib",
                "tipo": "Lenguaje de Análisis de Datos",
                "descripcion": "Caracterización de los sensores y visualización de mapas de presión."
            },
            {
                "herramienta": "Flutter",
                "tipo": "Framework de Desarrollo Móvil",
                "descripcion": "Aplicación accesible de recordatorios y registro para el fisioterapeuta."
            }
        ]
    },
    {
        "id": "proj_236",
        "titulo": "🧭 Proyecto 236: Navegación Accesible en el Campus Universitario con Balizas BLE para Personas con Baja Visión y Usuarios de Silla de Ruedas",
        "descripcion": "Problema: Las personas con baja visión y los usuarios de silla de ruedas tienen dificultad para orientarse dentro de los edificios universitarios: los avisos son pequeños, no existen indicaciones táctiles y las rutas más cortas a menudo incluyen escaleras o desniveles. Como resultado dependen de compañeros para llegar a salones, laboratorios o baños accesibles, lo que limita su autonomía e inclusión.\n\nDescripción: Sistema de navegación en interiores para la sede de la institución en Popayán basado en balizas Bluetooth Low Energy instaladas en pasillos, puertas y ascensores. La aplicación móvil estima la posición del usuario con un modelo de huella de señal (k vecinos más cercanos) y calcula rutas sobre un grafo del campus que distingue tramos con escaleras, rampas y ascensores según el perfil del usuario. Las indicaciones se entregan por voz, vibración y una interfaz de alto contraste compatible con lectores de pantalla, y la comunidad puede reportar obstáculos temporales como ascensores fuera de servicio. El mapa y las rutas se validan con estudiantes con discapacidad de la institución.",
        "area": "AIoT para Discapacidad y Enfermedad",
        "sector": "Educación inclusiva - Accesibilidad del campus",
        "nivel": "Intermedio",
        "duracion": "Un semestre",
        "presupuesto": "Bajo costo",
        "habilidades": [
            "Localización en interiores con balizas BLE y huella de señal",
            "Algoritmos de rutas sobre grafos con restricciones de accesibilidad",
            "Desarrollo móvil accesible con voz, vibración y lector de pantalla",
            "Levantamiento de información de accesibilidad física",
            "Evaluación de usabilidad con personas con discapacidad"
        ],
        "objetivos": [
            "🎯 Objetivo General: Implementar un sistema de navegación en interiores que guíe a personas con baja visión y usuarios de silla de ruedas por rutas accesibles dentro del campus universitario.",
            "📌 Objetivos Específicos:",
            "• Instalar y caracterizar al menos 20 balizas BLE en un edificio del campus y construir un mapa de huellas de señal para estimar la posición con un error medio inferior a 3 m.",
            "• Modelar el edificio como un grafo con atributos de accesibilidad y calcular rutas diferenciadas para personas con baja visión y para usuarios de silla de ruedas.",
            "• Desarrollar una aplicación móvil que entregue indicaciones por voz y vibración y cumpla criterios WCAG 2.1 de contraste, tamaño de texto y compatibilidad con lectores de pantalla.",
            "• Validar el sistema con al menos cinco estudiantes con discapacidad visual o física, midiendo tiempo de llegada, errores de orientación y satisfacción."
        ],
        "pasos": [
            "Análisis de requisitos",
            "Diseño de la solución",
            "Implementación y pruebas",
            "Validación y sustentación"
        ],
        "aplicaciones": [
            "Educación inclusiva - Accesibilidad del campus"
        ],
        "referencias": [
            "W3C. Web Content Accessibility Guidelines (WCAG) 2.1. W3C Recommendation, 2018.",
            "Congreso de Colombia. Ley Estatutaria 1618 de 2013, por medio de la cual se establecen las disposiciones para garantizar el pleno ejercicio de los derechos de las personas con discapacidad."
        ],
        "hardware_tabla": [
            {
                "componente": "Balizas BLE basadas en nRF52832",
                "categoria": "Módulo de Comunicación",
                "funcion": "Emiten identificadores en pasillos, puertas y ascensores para la localización."
            },
            {
                "componente": "ESP32 como pasarela de monitoreo",
                "categoria": "Microcontrolador",
                "funcion": "Verifica el estado y la batería de las balizas y reporta fallas al servidor."
            },
            {
                "componente": "Teléfonos inteligentes Android y iOS",
                "categoria": "Equipo de Cómputo",
                "funcion": "Escanean las balizas, estiman la posición y guían al usuario."
            }
        ],
        "software_tabla": [
            {
                "herramienta": "Flutter",
                "tipo": "Framework de Desarrollo Móvil",
                "descripcion": "Aplicación de navegación accesible con voz, vibración y lector de pantalla."
            },
            {
                "herramienta": "scikit-learn",
                "tipo": "Librería de Aprendizaje Automático",
                "descripcion": "Modelo de k vecinos más cercanos para la localización por huella de señal."
            },
            {
                "herramienta": "NetworkX",
                "tipo": "Librería de Grafos",
                "descripcion": "Modelado del campus y cálculo de rutas con restricciones de accesibilidad."
            },
            {
                "herramienta": "FastAPI",
                "tipo": "Framework Backend",
                "descripcion": "Servicio de mapas, rutas y reportes de obstáculos temporales."
            }
        ]
    }
];
