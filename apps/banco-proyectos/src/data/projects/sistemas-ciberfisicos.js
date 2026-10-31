// Projects for this area. Each entry follows the schema checked by scripts/projects-validation.mjs.
export default [
    {
        "id": "proj_181",
        "titulo": "🌊 Proyecto 181: Estación Didáctica de Control de Nivel en Tanques Acoplados con Gemelo Digital Sincronizado",
        "descripcion": "Problema: Los estudiantes de ingeniería de la región aprenden control de procesos casi exclusivamente con simulaciones, porque las estaciones didácticas comerciales de nivel y caudal cuestan decenas de millones de pesos; como resultado, llegan a la industria sin haber enfrentado ruido de sensores, saturación de bombas ni diferencias entre el modelo y la planta real.\n\nDescripción: Estación de bajo costo con dos tanques acrílicos acoplados, una bomba sumergible controlada por PWM y sensores de nivel ultrasónicos, gobernada por un ESP32 que ejecuta un PID configurable. En paralelo, un gemelo digital en Python resuelve el modelo no lineal de los tanques en tiempo real, recibe las mismas entradas que la planta física y calibra sus parámetros en línea para que el estudiante compare el comportamiento simulado y el medido en un mismo tablero.",
        "area": "Sistemas Ciberfísicos",
        "sector": "Educación superior - Laboratorios de control de procesos",
        "nivel": "Intermedio",
        "duracion": "Un semestre",
        "presupuesto": "Bajo costo",
        "habilidades": [
            "Modelado de procesos hidráulicos no lineales",
            "Sintonización de controladores PID",
            "Construcción de gemelos digitales sincronizados",
            "Identificación de parámetros a partir de datos experimentales",
            "Diseño de prácticas de laboratorio de control"
        ],
        "objetivos": [
            "🎯 Objetivo General: Construir una estación didáctica de control de nivel en tanques acoplados con un gemelo digital que reproduzca el comportamiento de la planta física en tiempo real.",
            "📌 Objetivos Específicos:",
            "• Ensamblar una planta de dos tanques acoplados con medición de nivel cuyo error frente a una regla graduada sea inferior a 5 mm.",
            "• Implementar un gemelo digital que estime el nivel de ambos tanques con un error cuadrático medio inferior al 5 % del rango frente a la planta real ante escalones de referencia.",
            "• Diseñar y aplicar tres guías de laboratorio con al menos 15 estudiantes, evaluando la comprensión de conceptos de control mediante pruebas antes y después de la práctica."
        ],
        "pasos": [
            "Análisis de requisitos",
            "Diseño de la solución",
            "Implementación y pruebas",
            "Validación y sustentación"
        ],
        "aplicaciones": [
            "Educación superior - Laboratorios de control de procesos"
        ],
        "referencias": [],
        "hardware_tabla": [
            {
                "componente": "ESP32 DevKit",
                "categoria": "Microcontrolador",
                "funcion": "Ejecuta el lazo PID, lee los sensores de nivel y publica los datos de la planta."
            },
            {
                "componente": "Sensores ultrasónicos impermeables JSN-SR04T",
                "categoria": "Sensor de Nivel",
                "funcion": "Miden la altura de agua en cada uno de los tanques."
            },
            {
                "componente": "Bomba sumergible de 12 V con driver MOSFET",
                "categoria": "Actuador",
                "funcion": "Impulsa el caudal de entrada según la señal PWM del controlador."
            },
            {
                "componente": "Tanques en acrílico con válvulas de bola manuales",
                "categoria": "Estructura / Componente Mecánico",
                "funcion": "Forman la planta hidráulica acoplada y permiten introducir perturbaciones."
            },
            {
                "componente": "Fuente conmutada de 12 V 5 A",
                "categoria": "Fuente de Alimentación / Energía",
                "funcion": "Alimenta la bomba y la electrónica de control."
            },
            {
                "componente": "Computador de desarrollo",
                "categoria": "Equipo de Cómputo",
                "funcion": "Ejecuta el gemelo digital y el tablero de comparación."
            }
        ],
        "software_tabla": [
            {
                "herramienta": "Arduino IDE / PlatformIO",
                "tipo": "Entorno de Desarrollo Embebido",
                "descripcion": "Programación del firmware de control en el ESP32."
            },
            {
                "herramienta": "Python con SciPy",
                "tipo": "Lenguaje / Librería Científica",
                "descripcion": "Integración numérica del modelo de tanques y ajuste de parámetros."
            },
            {
                "herramienta": "MQTT (Mosquitto)",
                "tipo": "Protocolo de Comunicación IoT",
                "descripcion": "Sincronización de entradas y mediciones entre la planta y el gemelo."
            },
            {
                "herramienta": "Grafana",
                "tipo": "Visualización / Dashboard",
                "descripcion": "Tablero comparativo de la respuesta real y simulada."
            },
            {
                "herramienta": "InfluxDB",
                "tipo": "Base de Datos de Series de Tiempo",
                "descripcion": "Almacenamiento de los ensayos para su análisis posterior."
            }
        ]
    },
    {
        "id": "proj_182",
        "titulo": "🏭 Proyecto 182: Sistema SCADA con OPC UA para la Automatización de una Planta Compacta de Potabilización Veredal",
        "descripcion": "Problema: Los acueductos veredales del Cauca operan plantas compactas de potabilización de forma manual; el operador dosifica coagulante y cloro a ojo y registra los datos en cuadernos, lo que provoca agua con turbiedad o cloro residual fuera de norma y deja a las juntas administradoras sin evidencias para los reportes exigidos por la autoridad sanitaria.\n\nDescripción: Maqueta funcional a escala de una planta de potabilización (captación, floculación, filtración y tanque de almacenamiento) controlada por un PLC de bajo costo que regula bombas dosificadoras y niveles. Un servidor OPC UA en Raspberry Pi expone las variables del proceso con un modelo de información estructurado, y un SCADA de código abierto ofrece mímicos, alarmas, históricos y reportes de cumplimiento para el operador.",
        "area": "Sistemas Ciberfísicos",
        "sector": "Servicios públicos - Agua potable rural",
        "nivel": "Intermedio-Avanzado",
        "duracion": "Un semestre",
        "presupuesto": "Bajo costo",
        "habilidades": [
            "Programación de PLC en lenguajes IEC 61131-3",
            "Modelado de información con OPC UA",
            "Configuración de sistemas SCADA y gestión de alarmas",
            "Control de dosificación en procesos de tratamiento de agua",
            "Integración de sistemas de automatización industrial"
        ],
        "objetivos": [
            "🎯 Objetivo General: Automatizar una maqueta de planta compacta de potabilización mediante un PLC y un sistema SCADA comunicados por OPC UA, orientada a acueductos veredales.",
            "📌 Objetivos Específicos:",
            "• Programar el control de niveles y de las bombas dosificadoras en el PLC, manteniendo el nivel del tanque de almacenamiento dentro de ±5 % del valor de referencia.",
            "• Publicar al menos 30 variables del proceso en un servidor OPC UA con un modelo de información jerárquico y medir la latencia entre el PLC y el SCADA.",
            "• Generar automáticamente un reporte diario de turbiedad, pH y cloro residual validado por un operador de un acueducto veredal mediante una encuesta de usabilidad SUS."
        ],
        "pasos": [
            "Análisis de requisitos",
            "Diseño de la solución",
            "Implementación y pruebas",
            "Validación y sustentación"
        ],
        "aplicaciones": [
            "Servicios públicos - Agua potable rural"
        ],
        "referencias": [],
        "hardware_tabla": [
            {
                "componente": "PLC OpenPLC sobre Arduino Opta o PLC compacto Siemens LOGO! 8",
                "categoria": "Controlador Lógico Programable",
                "funcion": "Ejecuta la lógica de control de niveles, bombas y dosificación."
            },
            {
                "componente": "Raspberry Pi 4",
                "categoria": "Computador de Placa Única",
                "funcion": "Aloja el servidor OPC UA y el SCADA de la planta."
            },
            {
                "componente": "Bombas peristálticas dosificadoras de 12 V",
                "categoria": "Actuador",
                "funcion": "Dosifican coagulante y cloro en proporción al caudal tratado."
            },
            {
                "componente": "Sensores de turbiedad, pH y ORP para agua",
                "categoria": "Sensor de Calidad de Agua",
                "funcion": "Miden los parámetros de calidad del agua tratada."
            },
            {
                "componente": "Sensores de nivel tipo flotador y caudalímetro YF-S201",
                "categoria": "Sensor de Proceso",
                "funcion": "Registran niveles de tanques y caudal de entrada."
            },
            {
                "componente": "Maqueta de planta en acrílico y tubería PVC",
                "categoria": "Estructura / Componente Mecánico",
                "funcion": "Reproduce a escala las etapas del proceso de potabilización."
            }
        ],
        "software_tabla": [
            {
                "herramienta": "OpenPLC Editor / LOGO! Soft Comfort",
                "tipo": "Entorno de Programación de PLC",
                "descripcion": "Desarrollo de la lógica en diagrama de escalera y texto estructurado."
            },
            {
                "herramienta": "open62541 / asyncua",
                "tipo": "Librería OPC UA",
                "descripcion": "Implementación del servidor OPC UA con el modelo de información de la planta."
            },
            {
                "herramienta": "FUXA",
                "tipo": "SCADA / HMI Web",
                "descripcion": "Mímicos, alarmas y tendencias para el operador."
            },
            {
                "herramienta": "PostgreSQL",
                "tipo": "Base de Datos",
                "descripcion": "Históricos de proceso y generación de reportes de cumplimiento."
            },
            {
                "herramienta": "UaExpert",
                "tipo": "Herramienta de Diagnóstico",
                "descripcion": "Verificación del espacio de direcciones y pruebas de suscripción OPC UA."
            }
        ]
    },
    {
        "id": "proj_183",
        "titulo": "⚡ Proyecto 183: Controlador Jerárquico para una Microrred Solar con Almacenamiento en Escuelas Rurales",
        "descripcion": "Problema: Muchas escuelas rurales del Cauca dependen de redes eléctricas débiles con cortes frecuentes; los sistemas solares donados suelen operar sin una estrategia de gestión, por lo que las baterías se descargan en exceso, se degradan en pocos años y las aulas quedan sin energía justo cuando más se necesita.\n\nDescripción: Prototipo a escala de laboratorio de una microrred de corriente continua con panel solar, banco de baterías LiFePO4, conexión emulada a la red y cargas priorizadas. Un controlador jerárquico de dos niveles combina un control primario local en el convertidor y un control secundario en Raspberry Pi que decide, según el estado de carga y el pronóstico solar, cuándo aislarse, qué cargas desconectar y cómo proteger la vida útil de las baterías.",
        "area": "Sistemas Ciberfísicos",
        "sector": "Energía - Microrredes rurales",
        "nivel": "Avanzado",
        "duracion": "Un semestre",
        "presupuesto": "Bajo costo",
        "habilidades": [
            "Control jerárquico de microrredes",
            "Electrónica de potencia para convertidores DC-DC",
            "Gestión de baterías y estimación del estado de carga",
            "Pronóstico de generación solar de corto plazo",
            "Gestión de cargas prioritarias"
        ],
        "objetivos": [
            "🎯 Objetivo General: Diseñar y validar un controlador jerárquico para una microrred solar con almacenamiento que garantice el suministro de cargas críticas en escuelas rurales y prolongue la vida útil de las baterías.",
            "📌 Objetivos Específicos:",
            "• Implementar el control primario de un convertidor DC-DC que regule el bus de 24 V con una desviación inferior al 3 % ante escalones de carga.",
            "• Desarrollar un control secundario que mantenga el estado de carga de las baterías entre 20 % y 90 % durante ensayos de 72 horas con perfiles de consumo escolares.",
            "• Comparar la estrategia propuesta frente a un control por umbrales fijos en términos de energía no suministrada a cargas críticas y ciclos equivalentes de batería."
        ],
        "pasos": [
            "Análisis de requisitos",
            "Diseño de la solución",
            "Implementación y pruebas",
            "Validación y sustentación"
        ],
        "aplicaciones": [
            "Energía - Microrredes rurales"
        ],
        "referencias": [],
        "hardware_tabla": [
            {
                "componente": "Panel solar de 100 W",
                "categoria": "Fuente de Generación",
                "funcion": "Provee la generación renovable de la microrred."
            },
            {
                "componente": "Batería LiFePO4 de 24 V 20 Ah con BMS",
                "categoria": "Almacenamiento de Energía",
                "funcion": "Almacena energía y protege las celdas contra sobrecarga y descarga profunda."
            },
            {
                "componente": "Convertidor buck-boost bidireccional con STM32 Nucleo-G474RE",
                "categoria": "Electrónica de Potencia / Microcontrolador",
                "funcion": "Ejecuta el control primario de tensión y corriente del bus DC."
            },
            {
                "componente": "Sensores de corriente INA226",
                "categoria": "Sensor Eléctrico",
                "funcion": "Miden tensión, corriente y potencia en cada rama de la microrred."
            },
            {
                "componente": "Módulo de relés de estado sólido",
                "categoria": "Actuador",
                "funcion": "Conecta y desconecta cargas según su prioridad."
            },
            {
                "componente": "Raspberry Pi 4",
                "categoria": "Computador de Placa Única",
                "funcion": "Ejecuta el control secundario, el pronóstico solar y el registro de datos."
            }
        ],
        "software_tabla": [
            {
                "herramienta": "STM32CubeIDE",
                "tipo": "Entorno de Desarrollo Embebido",
                "descripcion": "Firmware del lazo de control primario del convertidor."
            },
            {
                "herramienta": "Python con pandas y scikit-learn",
                "tipo": "Lenguaje / Librería de Análisis",
                "descripcion": "Pronóstico de irradiancia y lógica del control secundario."
            },
            {
                "herramienta": "Open-Meteo API",
                "tipo": "Servicio de Datos Meteorológicos",
                "descripcion": "Pronóstico de nubosidad e irradiancia para la ubicación de la escuela."
            },
            {
                "herramienta": "Modbus RTU",
                "tipo": "Protocolo de Comunicación Industrial",
                "descripcion": "Intercambio de consignas y mediciones entre los dos niveles de control."
            },
            {
                "herramienta": "Grafana con InfluxDB",
                "tipo": "Visualización / Dashboard",
                "descripcion": "Seguimiento de flujos de energía y estado de carga."
            }
        ]
    },
    {
        "id": "proj_184",
        "titulo": "🔁 Proyecto 184: Banco Hardware-in-the-Loop para la Validación de Controladores Embebidos de Motores DC",
        "descripcion": "Problema: En los proyectos de grado y en las pequeñas empresas de automatización de la región, los controladores de motores se prueban directamente sobre el equipo real; un error de firmware puede quemar el motor o el driver, y las pruebas de casos extremos (bloqueo del eje, sobrecarga, pérdida del encoder) casi nunca se realizan por el riesgo y el costo que implican.\n\nDescripción: Banco de pruebas hardware-in-the-loop en el que una tarjeta Teensy 4.1 emula en tiempo real el modelo eléctrico y mecánico de un motor DC con encoder, recibe la señal PWM del controlador bajo prueba y le devuelve pulsos de encoder y corriente simulados. Un computador orquesta casos de prueba automáticos con fallas inyectadas y compara las respuestas con las obtenidas sobre el motor físico para cuantificar la fidelidad del banco.",
        "area": "Sistemas Ciberfísicos",
        "sector": "Industria - Automatización y pruebas de sistemas embebidos",
        "nivel": "Intermedio-Avanzado",
        "duracion": "Un semestre",
        "presupuesto": "Bajo costo",
        "habilidades": [
            "Simulación en tiempo real de plantas electromecánicas",
            "Pruebas hardware-in-the-loop",
            "Inyección de fallas y pruebas automatizadas",
            "Control de velocidad y posición de motores DC",
            "Análisis de fidelidad entre modelo y planta"
        ],
        "objetivos": [
            "🎯 Objetivo General: Desarrollar un banco hardware-in-the-loop que permita validar de forma segura y automatizada controladores embebidos de motores DC antes de conectarlos a la planta real.",
            "📌 Objetivos Específicos:",
            "• Implementar un emulador del motor DC que se ejecute con un paso de integración de 50 µs o menor y genere señales de encoder compatibles con el controlador bajo prueba.",
            "• Automatizar una batería de al menos 20 casos de prueba que incluya bloqueo del eje, sobrecarga y pérdida de señal del encoder.",
            "• Cuantificar la fidelidad del banco comparando tiempo de establecimiento, sobreimpulso y error en estado estacionario entre el emulador y el motor físico, con diferencias inferiores al 10 %."
        ],
        "pasos": [
            "Análisis de requisitos",
            "Diseño de la solución",
            "Implementación y pruebas",
            "Validación y sustentación"
        ],
        "aplicaciones": [
            "Industria - Automatización y pruebas de sistemas embebidos"
        ],
        "referencias": [],
        "hardware_tabla": [
            {
                "componente": "Teensy 4.1",
                "categoria": "Microcontrolador de Alto Desempeño",
                "funcion": "Emula en tiempo real el modelo del motor DC y genera señales de encoder."
            },
            {
                "componente": "STM32 Blue Pill o ESP32",
                "categoria": "Microcontrolador",
                "funcion": "Actúa como controlador embebido bajo prueba."
            },
            {
                "componente": "Motor DC con encoder JGB37-520 y driver TB6612FNG",
                "categoria": "Actuador",
                "funcion": "Sirve como planta física de referencia para validar el emulador."
            },
            {
                "componente": "Conversor DAC MCP4725 y acondicionamiento con amplificadores operacionales",
                "categoria": "Interfaz Analógica",
                "funcion": "Entrega al controlador la señal de corriente simulada."
            },
            {
                "componente": "Analizador lógico USB de 8 canales",
                "categoria": "Instrumentación",
                "funcion": "Verifica la temporización de las señales PWM y de encoder."
            }
        ],
        "software_tabla": [
            {
                "herramienta": "PlatformIO",
                "tipo": "Entorno de Desarrollo Embebido",
                "descripcion": "Firmware del emulador y del controlador bajo prueba."
            },
            {
                "herramienta": "Python con pytest",
                "tipo": "Framework de Pruebas",
                "descripcion": "Orquestación de los casos de prueba y verificación de criterios de aceptación."
            },
            {
                "herramienta": "Octave / Python Control Systems Library",
                "tipo": "Herramienta de Modelado",
                "descripcion": "Identificación del modelo del motor y diseño de referencia del controlador."
            },
            {
                "herramienta": "PulseView (sigrok)",
                "tipo": "Software de Instrumentación",
                "descripcion": "Captura y análisis de las señales digitales del banco."
            }
        ]
    },
    {
        "id": "proj_185",
        "titulo": "💧 Proyecto 185: Control de Presión en una Red de Distribución de Agua a Escala con Verificación Formal en UPPAAL",
        "descripcion": "Problema: En barrios altos de Popayán y en municipios de ladera, las variaciones de presión en la red de acueducto causan fugas, rotura de tuberías y desabastecimiento en las horas pico; los controladores automáticos de válvulas y bombas pueden mitigarlo, pero los operadores desconfían de ellos porque no existe evidencia de que nunca provoquen estados peligrosos como golpes de ariete o vaciado de tanques.\n\nDescripción: Maqueta de un sector hidráulico con tanque elevado, bomba de velocidad variable, válvulas solenoides y sensores de presión en tres nodos, controlada en lazo cerrado por un microcontrolador. La lógica de supervisión se modela como autómatas temporizados en UPPAAL para demostrar formalmente propiedades de seguridad y vivacidad, y el código embebido se deriva del modelo verificado para contrastar las garantías formales con los ensayos en la maqueta.",
        "area": "Sistemas Ciberfísicos",
        "sector": "Servicios públicos - Distribución de agua",
        "nivel": "Avanzado",
        "duracion": "Un semestre",
        "presupuesto": "Bajo costo",
        "habilidades": [
            "Verificación formal con autómatas temporizados",
            "Especificación de propiedades en lógica temporal",
            "Control de presión en redes hidráulicas",
            "Derivación de código embebido a partir de modelos",
            "Diseño de sistemas críticos de seguridad"
        ],
        "objetivos": [
            "🎯 Objetivo General: Diseñar un controlador de presión para una red de distribución de agua a escala cuya lógica de supervisión esté verificada formalmente frente a propiedades de seguridad.",
            "📌 Objetivos Específicos:",
            "• Modelar la planta y el supervisor como una red de autómatas temporizados y verificar en UPPAAL al menos 8 propiedades de seguridad y vivacidad, como la ausencia de cierre simultáneo de válvulas con la bomba encendida.",
            "• Implementar el controlador derivado del modelo y mantener la presión de los tres nodos dentro de una banda de ±10 % ante cambios de demanda.",
            "• Inyectar 30 escenarios de falla en la maqueta y comparar los estados alcanzados con los predichos por el modelo formal."
        ],
        "pasos": [
            "Análisis de requisitos",
            "Diseño de la solución",
            "Implementación y pruebas",
            "Validación y sustentación"
        ],
        "aplicaciones": [
            "Servicios públicos - Distribución de agua"
        ],
        "referencias": [],
        "hardware_tabla": [
            {
                "componente": "STM32 Nucleo-F446RE",
                "categoria": "Microcontrolador",
                "funcion": "Ejecuta el controlador de presión y la lógica de supervisión verificada."
            },
            {
                "componente": "Transductores de presión de 0 a 1,2 MPa con salida analógica",
                "categoria": "Sensor de Presión",
                "funcion": "Miden la presión en tres nodos de la red a escala."
            },
            {
                "componente": "Bomba de 12 V con controlador de velocidad PWM",
                "categoria": "Actuador",
                "funcion": "Regula la presión de suministro al sector hidráulico."
            },
            {
                "componente": "Electroválvulas solenoides de 1/2 pulgada",
                "categoria": "Actuador",
                "funcion": "Simulan maniobras de apertura y cierre en la red."
            },
            {
                "componente": "Tubería PVC, tanque elevado y soporte en madera",
                "categoria": "Estructura / Componente Mecánico",
                "funcion": "Conforman la maqueta del sector de distribución."
            }
        ],
        "software_tabla": [
            {
                "herramienta": "UPPAAL",
                "tipo": "Herramienta de Verificación Formal",
                "descripcion": "Modelado con autómatas temporizados y verificación de propiedades."
            },
            {
                "herramienta": "EPANET",
                "tipo": "Simulador Hidráulico",
                "descripcion": "Simulación de la red para dimensionar la maqueta y definir escenarios."
            },
            {
                "herramienta": "STM32CubeIDE",
                "tipo": "Entorno de Desarrollo Embebido",
                "descripcion": "Implementación del controlador derivado del modelo verificado."
            },
            {
                "herramienta": "Python con Matplotlib",
                "tipo": "Lenguaje / Librería de Análisis",
                "descripcion": "Análisis de los ensayos y comparación con las predicciones del modelo."
            }
        ]
    },
    {
        "id": "proj_186",
        "titulo": "🌡️ Proyecto 186: Control Predictivo Basado en Modelo para la Climatización Eficiente de Aulas Universitarias",
        "descripcion": "Problema: Las aulas y laboratorios con equipos de climatización o ventilación forzada se operan con termostatos de encendido y apagado que no anticipan la ocupación ni el clima exterior; el resultado es un consumo eléctrico innecesario, concentraciones de CO2 que afectan la atención de los estudiantes y quejas de confort térmico.\n\nDescripción: Sistema de control predictivo basado en modelo (MPC) para un aula a escala o una cámara térmica de laboratorio con ventilador, resistencia calefactora y compuerta de aire exterior. A partir de un modelo térmico identificado con datos reales, del horario de clases y del pronóstico de temperatura, el controlador calcula cada pocos minutos la secuencia óptima de actuación que minimiza la energía respetando límites de temperatura y CO2.",
        "area": "Sistemas Ciberfísicos",
        "sector": "Edificaciones - Eficiencia energética",
        "nivel": "Avanzado",
        "duracion": "Un semestre",
        "presupuesto": "Bajo costo",
        "habilidades": [
            "Control predictivo basado en modelo",
            "Identificación de modelos térmicos de edificaciones",
            "Optimización con restricciones",
            "Medición de calidad del aire interior",
            "Evaluación energética de estrategias de control"
        ],
        "objetivos": [
            "🎯 Objetivo General: Implementar un controlador predictivo basado en modelo que reduzca el consumo energético de la climatización de un aula manteniendo el confort térmico y la calidad del aire.",
            "📌 Objetivos Específicos:",
            "• Identificar un modelo térmico de resistencias y capacitancias del espacio con un error de predicción inferior a 0,5 °C en un horizonte de una hora.",
            "• Implementar un MPC que resuelva el problema de optimización en menos de 10 segundos en una Raspberry Pi y mantenga el CO2 por debajo de 1000 ppm durante la ocupación.",
            "• Comparar durante al menos dos semanas el consumo energético y el tiempo fuera de la banda de confort del MPC frente a un control de termostato convencional."
        ],
        "pasos": [
            "Análisis de requisitos",
            "Diseño de la solución",
            "Implementación y pruebas",
            "Validación y sustentación"
        ],
        "aplicaciones": [
            "Edificaciones - Eficiencia energética"
        ],
        "referencias": [],
        "hardware_tabla": [
            {
                "componente": "Raspberry Pi 4",
                "categoria": "Computador de Placa Única",
                "funcion": "Resuelve el problema de optimización del MPC y registra los datos."
            },
            {
                "componente": "ESP32 con relés de estado sólido y driver PWM",
                "categoria": "Microcontrolador / Actuación",
                "funcion": "Aplica las consignas al ventilador, la resistencia y la compuerta."
            },
            {
                "componente": "Sensor de CO2 SCD41 y sensores de temperatura DS18B20",
                "categoria": "Sensor Ambiental",
                "funcion": "Miden CO2, temperatura y humedad interior y exterior."
            },
            {
                "componente": "Medidor de energía PZEM-004T",
                "categoria": "Sensor Eléctrico",
                "funcion": "Cuantifica el consumo de los equipos de climatización."
            },
            {
                "componente": "Servomotor MG996R para compuerta de aire",
                "categoria": "Actuador",
                "funcion": "Regula la entrada de aire exterior."
            }
        ],
        "software_tabla": [
            {
                "herramienta": "Python con do-mpc y CasADi",
                "tipo": "Librería de Control Óptimo",
                "descripcion": "Formulación y solución del problema de control predictivo."
            },
            {
                "herramienta": "SIPPY / SysIdentPy",
                "tipo": "Librería de Identificación de Sistemas",
                "descripcion": "Estimación del modelo térmico a partir de datos experimentales."
            },
            {
                "herramienta": "Home Assistant",
                "tipo": "Plataforma de Automatización",
                "descripcion": "Integración de sensores, actuadores y horario de ocupación."
            },
            {
                "herramienta": "Grafana con InfluxDB",
                "tipo": "Visualización / Dashboard",
                "descripcion": "Seguimiento del confort, el CO2 y la energía consumida."
            }
        ]
    },
    {
        "id": "proj_187",
        "titulo": "🚗 Proyecto 187: Pelotón Cooperativo de Vehículos a Escala con Comunicación V2V y Análisis de Estabilidad de Cadena",
        "descripcion": "Problema: Los pelotones de vehículos que circulan a corta distancia prometen reducir consumo y congestión en corredores de carga como la vía Panamericana, pero su seguridad depende de que las perturbaciones no se amplifiquen hacia atrás en la fila; investigar este fenómeno con vehículos reales es costoso y riesgoso, y el retardo y la pérdida de paquetes en la comunicación rara vez se estudian experimentalmente.\n\nDescripción: Plataforma de cuatro a cinco vehículos a escala con tracción diferencial, sensor de distancia frontal y comunicación inalámbrica ESP-NOW entre ellos, que implementan control adaptativo de crucero cooperativo (CACC). El líder sigue perfiles de velocidad programados y los seguidores combinan la medición de distancia con la aceleración transmitida por el vehículo anterior, permitiendo medir experimentalmente la estabilidad de cadena bajo distintos retardos y tasas de pérdida inducidos.",
        "area": "Sistemas Ciberfísicos",
        "sector": "Transporte - Movilidad cooperativa",
        "nivel": "Intermedio-Avanzado",
        "duracion": "Un semestre",
        "presupuesto": "Bajo costo",
        "habilidades": [
            "Control cooperativo de sistemas multiagente",
            "Comunicación inalámbrica de baja latencia entre vehículos",
            "Análisis de estabilidad de cadena",
            "Fusión de mediciones locales y comunicadas",
            "Diseño experimental con perturbaciones de red"
        ],
        "objetivos": [
            "🎯 Objetivo General: Construir una plataforma de vehículos a escala que permita evaluar experimentalmente la estabilidad de cadena de un pelotón cooperativo frente a retardos y pérdidas en la comunicación V2V.",
            "📌 Objetivos Específicos:",
            "• Implementar los controladores ACC y CACC en al menos cuatro vehículos que mantengan una distancia de seguimiento con error medio inferior a 3 cm.",
            "• Medir la latencia y la tasa de pérdida de ESP-NOW e inducir de forma controlada retardos de 0 a 200 ms y pérdidas de 0 a 30 %.",
            "• Determinar experimentalmente el retardo máximo con el que el pelotón conserva la estabilidad de cadena y contrastarlo con la predicción teórica."
        ],
        "pasos": [
            "Análisis de requisitos",
            "Diseño de la solución",
            "Implementación y pruebas",
            "Validación y sustentación"
        ],
        "aplicaciones": [
            "Transporte - Movilidad cooperativa"
        ],
        "referencias": [],
        "hardware_tabla": [
            {
                "componente": "ESP32 DevKit (uno por vehículo)",
                "categoria": "Microcontrolador",
                "funcion": "Ejecuta el control longitudinal y la comunicación ESP-NOW."
            },
            {
                "componente": "Chasis 2WD con motores DC con encoder y driver TB6612FNG",
                "categoria": "Plataforma Móvil / Actuador",
                "funcion": "Proporciona la tracción y la medición de velocidad de cada vehículo."
            },
            {
                "componente": "Sensor de distancia láser VL53L1X",
                "categoria": "Sensor de Distancia",
                "funcion": "Mide la separación con el vehículo precedente."
            },
            {
                "componente": "Unidad inercial MPU-6050",
                "categoria": "Sensor Inercial",
                "funcion": "Estima la aceleración longitudinal que se comparte con el seguidor."
            },
            {
                "componente": "Baterías 18650 con portapilas y regulador",
                "categoria": "Fuente de Alimentación / Energía",
                "funcion": "Alimentan cada vehículo de forma autónoma."
            },
            {
                "componente": "Cámara cenital USB",
                "categoria": "Instrumentación",
                "funcion": "Registra las trayectorias como referencia externa de medición."
            }
        ],
        "software_tabla": [
            {
                "herramienta": "ESP-IDF",
                "tipo": "Framework de Desarrollo Embebido",
                "descripcion": "Firmware de control y comunicación ESP-NOW de cada vehículo."
            },
            {
                "herramienta": "Python con OpenCV",
                "tipo": "Librería de Visión por Computador",
                "descripcion": "Seguimiento de marcadores ArUco para obtener la posición real de los vehículos."
            },
            {
                "herramienta": "Python Control Systems Library",
                "tipo": "Herramienta de Modelado",
                "descripcion": "Análisis teórico de estabilidad de cadena y diseño de ganancias."
            },
            {
                "herramienta": "Jupyter Notebook",
                "tipo": "Entorno de Análisis",
                "descripcion": "Procesamiento y visualización de los ensayos experimentales."
            }
        ]
    },
    {
        "id": "proj_188",
        "titulo": "⏱️ Proyecto 188: Análisis Experimental del Impacto de la Planificación en FreeRTOS sobre el Desempeño de Lazos de Control",
        "descripcion": "Problema: En los sistemas embebidos de control, varias tareas comparten un mismo procesador; cuando la planificación se diseña sin análisis, los lazos de control sufren retardos y variaciones de periodo (jitter) que degradan su desempeño o los vuelven inestables, y los equipos de desarrollo regionales carecen de guías prácticas para dimensionar prioridades y periodos.\n\nDescripción: Plataforma experimental con un péndulo de varilla sobre motor (o un sistema bola-viga) controlado por un microcontrolador con FreeRTOS, en el que el lazo de control convive con tareas de comunicación, registro y cómputo intensivo. Se instrumenta el sistema para medir tiempos de respuesta y jitter, se aplica análisis de planificabilidad de prioridades fijas y se relaciona cuantitativamente la configuración del planificador con el desempeño del control.",
        "area": "Sistemas Ciberfísicos",
        "sector": "Industria - Sistemas embebidos de tiempo real",
        "nivel": "Intermedio",
        "duracion": "Un semestre",
        "presupuesto": "Bajo costo",
        "habilidades": [
            "Programación con sistemas operativos de tiempo real",
            "Análisis de planificabilidad de tareas",
            "Medición de latencias y jitter",
            "Codiseño de control y planificación",
            "Instrumentación de firmware"
        ],
        "objetivos": [
            "🎯 Objetivo General: Cuantificar experimentalmente cómo la configuración de la planificación en FreeRTOS afecta el desempeño de un lazo de control embebido y proponer pautas de diseño.",
            "📌 Objetivos Específicos:",
            "• Implementar un sistema con al menos cuatro tareas concurrentes, incluido un lazo de control a 200 Hz, e instrumentar sus tiempos de ejecución y de respuesta con resolución de microsegundos.",
            "• Comparar los tiempos de respuesta medidos con los calculados por análisis de tiempo de respuesta para al menos cinco configuraciones de prioridad y periodo.",
            "• Relacionar el jitter del lazo con el error integral absoluto del control y documentar una guía de configuración validada en la plataforma."
        ],
        "pasos": [
            "Análisis de requisitos",
            "Diseño de la solución",
            "Implementación y pruebas",
            "Validación y sustentación"
        ],
        "aplicaciones": [
            "Industria - Sistemas embebidos de tiempo real"
        ],
        "referencias": [],
        "hardware_tabla": [
            {
                "componente": "STM32 Nucleo-F401RE",
                "categoria": "Microcontrolador",
                "funcion": "Ejecuta FreeRTOS con el lazo de control y las tareas concurrentes."
            },
            {
                "componente": "Sistema bola-viga con servomotor y sensor de distancia VL53L0X",
                "categoria": "Planta Didáctica",
                "funcion": "Proporciona una planta inestable sensible al retardo del control."
            },
            {
                "componente": "Analizador lógico USB de 8 canales",
                "categoria": "Instrumentación",
                "funcion": "Mide los instantes de activación y finalización de cada tarea."
            },
            {
                "componente": "Módulo de tarjeta microSD",
                "categoria": "Almacenamiento",
                "funcion": "Genera carga de entrada y salida para la tarea de registro."
            }
        ],
        "software_tabla": [
            {
                "herramienta": "FreeRTOS",
                "tipo": "Sistema Operativo de Tiempo Real",
                "descripcion": "Planificación de tareas con prioridades fijas y expropiación."
            },
            {
                "herramienta": "SEGGER SystemView",
                "tipo": "Herramienta de Trazado",
                "descripcion": "Visualización de la ejecución de tareas e interrupciones."
            },
            {
                "herramienta": "STM32CubeIDE",
                "tipo": "Entorno de Desarrollo Embebido",
                "descripcion": "Desarrollo y depuración del firmware."
            },
            {
                "herramienta": "Python con NumPy",
                "tipo": "Lenguaje / Librería Científica",
                "descripcion": "Análisis de tiempo de respuesta y procesamiento de las trazas."
            }
        ]
    },
    {
        "id": "proj_189",
        "titulo": "🛡️ Proyecto 189: Detección y Mitigación de Ataques de Falsificación de Sensores en Lazos de Control Ciberfísicos",
        "descripcion": "Problema: En plantas de tratamiento, estaciones de bombeo y procesos industriales, un atacante que manipule las lecturas de un sensor puede llevar el proceso a un estado peligroso mientras el operador ve valores normales; las herramientas de seguridad de red tradicionales no detectan este tipo de ataque porque los paquetes son válidos y solo la física del proceso revela la inconsistencia.\n\nDescripción: Banco de pruebas con un proceso térmico o hidráulico controlado por un PLC de código abierto, sobre el que se inyectan ataques de falsificación de sensores, repetición y sesgo gradual. Un monitor basado en un observador de estados y en pruebas de residuos (CUSUM y marca de agua física) detecta las inconsistencias entre lo medido y lo físicamente esperado, y un mecanismo de mitigación conmuta a un estimador para mantener el proceso dentro de límites seguros.",
        "area": "Sistemas Ciberfísicos",
        "sector": "Industria - Resiliencia de sistemas de control",
        "nivel": "Avanzado",
        "duracion": "Un semestre",
        "presupuesto": "Bajo costo",
        "habilidades": [
            "Observadores de estado y filtrado de Kalman",
            "Detección de anomalías basada en residuos",
            "Modelado de ataques a sistemas ciberfísicos",
            "Control tolerante a fallas",
            "Evaluación de detectores con métricas estadísticas"
        ],
        "objetivos": [
            "🎯 Objetivo General: Desarrollar y evaluar un mecanismo de detección y mitigación de ataques de falsificación de sensores basado en la física del proceso para lazos de control ciberfísicos.",
            "📌 Objetivos Específicos:",
            "• Implementar en el banco al menos tres tipos de ataque (repetición, sesgo constante y sesgo gradual) con parámetros configurables.",
            "• Diseñar un detector basado en filtro de Kalman y CUSUM que alcance una tasa de detección superior al 90 % con menos de 2 % de falsas alarmas en 100 ensayos.",
            "• Medir el tiempo de detección y demostrar que la mitigación mantiene la variable controlada dentro de los límites de seguridad en al menos el 95 % de los ataques detectados."
        ],
        "pasos": [
            "Análisis de requisitos",
            "Diseño de la solución",
            "Implementación y pruebas",
            "Validación y sustentación"
        ],
        "aplicaciones": [
            "Industria - Resiliencia de sistemas de control"
        ],
        "referencias": [],
        "hardware_tabla": [
            {
                "componente": "Raspberry Pi 4 con OpenPLC Runtime",
                "categoria": "Controlador Lógico Programable",
                "funcion": "Ejecuta el lazo de control del proceso bajo prueba."
            },
            {
                "componente": "ESP32 como nodo de campo Modbus TCP",
                "categoria": "Microcontrolador",
                "funcion": "Lee los sensores y acciona los actuadores del proceso."
            },
            {
                "componente": "Proceso térmico con resistencia, ventilador y sensores DS18B20",
                "categoria": "Planta Didáctica",
                "funcion": "Proporciona la dinámica física que se protege del ataque."
            },
            {
                "componente": "Segunda Raspberry Pi como nodo atacante",
                "categoria": "Computador de Placa Única",
                "funcion": "Inyecta ataques de intermediario sobre el tráfico Modbus en una red aislada."
            },
            {
                "componente": "Switch Ethernet gestionable",
                "categoria": "Equipo de Red",
                "funcion": "Conforma la red de control aislada del banco de pruebas."
            }
        ],
        "software_tabla": [
            {
                "herramienta": "OpenPLC Runtime",
                "tipo": "Controlador de Software",
                "descripcion": "Ejecución de la lógica de control con Modbus TCP."
            },
            {
                "herramienta": "Python con pymodbus y Scapy",
                "tipo": "Librería de Comunicaciones",
                "descripcion": "Implementación controlada de los ataques en la red aislada del laboratorio."
            },
            {
                "herramienta": "Python con FilterPy",
                "tipo": "Librería de Estimación",
                "descripcion": "Filtro de Kalman y pruebas de residuos del detector."
            },
            {
                "herramienta": "Grafana con InfluxDB",
                "tipo": "Visualización / Dashboard",
                "descripcion": "Seguimiento de variables reales, falsificadas y alarmas de detección."
            }
        ]
    },
    {
        "id": "proj_190",
        "titulo": "☕ Proyecto 190: Secador de Café Pergamino con Control en Lazo Cerrado y Estimación en Línea de la Humedad del Grano",
        "descripcion": "Problema: Los pequeños caficultores del Cauca secan el café en marquesinas o en secadores mecánicos operados sin control; la temperatura del aire varía con el clima y el combustible, el grano termina sobresecado o con humedad superior al 12 %, y esto genera pérdidas de calidad en taza, rechazos en la cooperativa y castigos en el precio de compra.\n\nDescripción: Prototipo de secador de bandeja a escala con quemador sustituido por resistencias eléctricas, ventilador de velocidad variable y sensores de temperatura y humedad del aire. Un controlador en lazo cerrado mantiene la temperatura del aire de secado por debajo del límite recomendado para café, y un estimador en línea calcula la humedad del grano a partir del balance de masa del aire y del pesaje continuo de la bandeja, deteniendo el proceso al alcanzar la humedad objetivo.",
        "area": "Sistemas Ciberfísicos",
        "sector": "Agroindustria - Poscosecha de café",
        "nivel": "Intermedio",
        "duracion": "Un semestre",
        "presupuesto": "Bajo costo",
        "habilidades": [
            "Control de temperatura en procesos térmicos",
            "Estimación de variables no medibles directamente",
            "Pesaje continuo con celdas de carga",
            "Modelado de procesos de secado",
            "Trabajo con productores agrícolas"
        ],
        "objetivos": [
            "🎯 Objetivo General: Desarrollar un secador de café pergamino a escala con control de temperatura en lazo cerrado y estimación en línea de la humedad del grano para mejorar la uniformidad del secado.",
            "📌 Objetivos Específicos:",
            "• Mantener la temperatura del aire de secado en 50 °C con una desviación inferior a ±2 °C ante cambios de la temperatura ambiente.",
            "• Estimar la humedad del grano a partir del pesaje continuo con un error inferior a 1 punto porcentual frente a un medidor de humedad de referencia.",
            "• Comparar con lotes de un caficultor de la región el tiempo de secado y la dispersión de humedad final frente al secado tradicional."
        ],
        "pasos": [
            "Análisis de requisitos",
            "Diseño de la solución",
            "Implementación y pruebas",
            "Validación y sustentación"
        ],
        "aplicaciones": [
            "Agroindustria - Poscosecha de café"
        ],
        "referencias": [],
        "hardware_tabla": [
            {
                "componente": "ESP32 DevKit",
                "categoria": "Microcontrolador",
                "funcion": "Ejecuta el control de temperatura y el estimador de humedad."
            },
            {
                "componente": "Celdas de carga de 20 kg con amplificador HX711",
                "categoria": "Sensor de Peso",
                "funcion": "Registran la pérdida de masa del café durante el secado."
            },
            {
                "componente": "Sensores SHT31 y termopar tipo K con MAX31855",
                "categoria": "Sensor Ambiental",
                "funcion": "Miden temperatura y humedad del aire de entrada y de salida."
            },
            {
                "componente": "Resistencias calefactoras con relé de estado sólido",
                "categoria": "Actuador",
                "funcion": "Calientan el aire de secado según la acción de control."
            },
            {
                "componente": "Ventilador centrífugo de 12 V con control PWM",
                "categoria": "Actuador",
                "funcion": "Regula el caudal de aire a través de la bandeja."
            },
            {
                "componente": "Cámara de secado en lámina galvanizada con bandeja perforada",
                "categoria": "Estructura / Componente Mecánico",
                "funcion": "Contiene el grano y dirige el flujo de aire caliente."
            }
        ],
        "software_tabla": [
            {
                "herramienta": "Arduino IDE / PlatformIO",
                "tipo": "Entorno de Desarrollo Embebido",
                "descripcion": "Firmware de control PID y del estimador de humedad."
            },
            {
                "herramienta": "Node-RED",
                "tipo": "Plataforma de Integración",
                "descripcion": "Panel local para el caficultor con estado del lote y alertas."
            },
            {
                "herramienta": "MQTT (Mosquitto)",
                "tipo": "Protocolo de Comunicación IoT",
                "descripcion": "Envío de mediciones y consignas entre el secador y el panel."
            },
            {
                "herramienta": "Python con pandas",
                "tipo": "Lenguaje / Librería de Análisis",
                "descripcion": "Ajuste de curvas de secado y comparación de lotes."
            }
        ]
    }
];
