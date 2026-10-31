// Projects for this area. Each entry follows the schema checked by scripts/projects-validation.mjs.
export default [
    {
        "id": "proj_191",
        "titulo": "🎓 Proyecto 191: Predicción Temprana de Deserción Estudiantil con Modelos Supervisados Interpretables",
        "descripcion": "Problema: En las instituciones de educación superior del Cauca una parte importante de los estudiantes abandona sus estudios durante los primeros semestres, y bienestar universitario suele detectar el riesgo cuando el estudiante ya dejó de asistir, perdiendo la oportunidad de ofrecer tutorías, apoyo económico o acompañamiento psicosocial a tiempo.\n\nDescripción: Modelo de clasificación supervisada entrenado con datos académicos y socioeconómicos anonimizados (notas parciales, asistencia, créditos matriculados, estrato, distancia al campus) que estima la probabilidad de deserción al cierre de la semana 8 del semestre. Se comparan regresión logística, árboles de decisión y gradient boosting, priorizando modelos interpretables, y los resultados se presentan en un tablero para el equipo de bienestar con los factores que más influyen en cada caso.",
        "area": "Machine Learning",
        "sector": "Educación superior",
        "nivel": "Intermedio",
        "duracion": "Un semestre",
        "presupuesto": "Bajo costo",
        "habilidades": [
            "Preparación y anonimización de datos académicos",
            "Clasificación supervisada con datos desbalanceados",
            "Evaluación de modelos con recall, F1 y curva PR",
            "Interpretación de modelos y comunicación de resultados",
            "Construcción de tableros de seguimiento"
        ],
        "objetivos": [
            "🎯 Objetivo General: Desarrollar un modelo supervisado interpretable que identifique a mitad de semestre a los estudiantes en riesgo de deserción para apoyar la intervención temprana de bienestar universitario.",
            "📌 Objetivos Específicos:",
            "• Construir un conjunto de datos anonimizado de al menos cuatro cohortes con variables académicas y socioeconómicas, documentando su diccionario de datos.",
            "• Comparar al menos tres algoritmos de clasificación con validación cruzada estratificada, alcanzando un recall igual o superior al 75 % en la clase de deserción.",
            "• Implementar un tablero que liste a los estudiantes en riesgo con los tres factores de mayor peso en su predicción y validarlo con el equipo de bienestar."
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
                "componente": "Computador de desarrollo (16 GB RAM)",
                "categoria": "Equipo de Cómputo",
                "funcion": "Preparación de datos, entrenamiento y evaluación de los modelos."
            },
            {
                "componente": "Raspberry Pi 5 (8 GB)",
                "categoria": "Servidor Local",
                "funcion": "Aloja el tablero de seguimiento dentro de la red institucional."
            }
        ],
        "software_tabla": [
            {
                "herramienta": "Python con pandas",
                "tipo": "Lenguaje / Procesamiento de Datos",
                "descripcion": "Limpieza, integración y anonimización de los registros académicos."
            },
            {
                "herramienta": "scikit-learn",
                "tipo": "Librería de Machine Learning",
                "descripcion": "Regresión logística, árboles de decisión y validación cruzada estratificada."
            },
            {
                "herramienta": "XGBoost",
                "tipo": "Librería de Machine Learning",
                "descripcion": "Modelo de gradient boosting de referencia."
            },
            {
                "herramienta": "imbalanced-learn",
                "tipo": "Librería de Machine Learning",
                "descripcion": "Técnicas de remuestreo para la clase minoritaria."
            },
            {
                "herramienta": "Streamlit",
                "tipo": "Visualización / Dashboard",
                "descripcion": "Tablero de estudiantes en riesgo para bienestar universitario."
            }
        ]
    },
    {
        "id": "proj_192",
        "titulo": "☕ Proyecto 192: Pronóstico de Rendimiento de Cosecha de Café en Fincas del Cauca con Variables Climáticas",
        "descripcion": "Problema: Los pequeños caficultores y las asociaciones del Cauca planifican la recolección, la contratación de recolectores y la venta anticipada de café sin una estimación confiable de la cosecha, lo que genera pérdidas por falta de mano de obra en los picos de producción o compromisos de entrega que no se pueden cumplir.\n\nDescripción: Modelo de regresión que pronostica el rendimiento por hectárea de cada finca a partir de registros históricos de producción de una asociación cafetera, variables agronómicas (variedad, edad del cafetal, densidad de siembra, altitud) y series climáticas de precipitación y temperatura obtenidas del IDEAM y de NASA POWER. Se comparan modelos lineales, Random Forest y LightGBM, y se entrega una herramienta web sencilla para que la asociación consulte el pronóstico antes de cada cosecha.",
        "area": "Machine Learning",
        "sector": "Agricultura - Caficultura",
        "nivel": "Intermedio-Avanzado",
        "duracion": "Un semestre",
        "presupuesto": "Bajo costo",
        "habilidades": [
            "Integración de datos agronómicos y climáticos",
            "Ingeniería de características temporales",
            "Modelos de regresión con ensambles de árboles",
            "Validación temporal de modelos predictivos",
            "Trabajo con comunidades y asociaciones rurales"
        ],
        "objetivos": [
            "🎯 Objetivo General: Construir un modelo de pronóstico de rendimiento de café por finca que apoye la planificación de cosecha de una asociación de caficultores del Cauca.",
            "📌 Objetivos Específicos:",
            "• Integrar los registros de producción de al menos 50 fincas con series climáticas diarias de un mínimo de cinco años.",
            "• Comparar tres modelos de regresión mediante validación temporal y obtener un error porcentual absoluto medio (MAPE) inferior al 20 % en la cosecha de prueba.",
            "• Desarrollar una herramienta web que muestre el pronóstico por finca y su intervalo de incertidumbre, y evaluarla con al menos cinco productores."
        ],
        "pasos": [
            "Análisis de requisitos",
            "Diseño de la solución",
            "Implementación y pruebas",
            "Validación y sustentación"
        ],
        "aplicaciones": [
            "Agricultura - Caficultura"
        ],
        "referencias": [],
        "hardware_tabla": [
            {
                "componente": "Computador de desarrollo (16 GB RAM)",
                "categoria": "Equipo de Cómputo",
                "funcion": "Integración de datos y entrenamiento de los modelos de regresión."
            },
            {
                "componente": "Teléfono inteligente Android",
                "categoria": "Dispositivo de Captura de Datos",
                "funcion": "Registro en campo de datos agronómicos de las fincas mediante formularios."
            }
        ],
        "software_tabla": [
            {
                "herramienta": "Python con pandas y NumPy",
                "tipo": "Lenguaje / Procesamiento de Datos",
                "descripcion": "Integración de producción, variables agronómicas y clima."
            },
            {
                "herramienta": "LightGBM",
                "tipo": "Librería de Machine Learning",
                "descripcion": "Modelo de gradient boosting para regresión del rendimiento."
            },
            {
                "herramienta": "scikit-learn",
                "tipo": "Librería de Machine Learning",
                "descripcion": "Modelos lineales, Random Forest y validación temporal."
            },
            {
                "herramienta": "API de NASA POWER y datos abiertos del IDEAM",
                "tipo": "Fuente de Datos Abiertos",
                "descripcion": "Series históricas de precipitación, temperatura y radiación."
            },
            {
                "herramienta": "KoboToolbox",
                "tipo": "Herramienta de Recolección de Datos",
                "descripcion": "Formularios móviles para el levantamiento en campo."
            },
            {
                "herramienta": "Gradio",
                "tipo": "Visualización / Aplicación Web",
                "descripcion": "Interfaz de consulta del pronóstico por finca."
            }
        ]
    },
    {
        "id": "proj_193",
        "titulo": "⚡ Proyecto 193: Pronóstico Horario de Demanda Eléctrica con Comparación de Modelos Estadísticos y de Aprendizaje Profundo",
        "descripcion": "Problema: Los operadores de red y los grandes consumidores de la región necesitan anticipar la demanda eléctrica hora a hora para programar compras de energía y evitar sobrecostos, pero los pronósticos basados en promedios históricos fallan en festivos, temporadas escolares y eventos climáticos, y no existe una comparación rigurosa de qué modelo funciona mejor con datos colombianos.\n\nDescripción: Estudio comparativo de modelos de series de tiempo para pronosticar la demanda eléctrica horaria a 24 y 168 horas usando datos abiertos del operador del mercado (XM) y variables exógenas como calendario de festivos colombianos y temperatura. Se evalúan SARIMAX, Prophet, LightGBM con rezagos y una red LSTM bajo un mismo protocolo de validación con ventanas deslizantes, reportando precisión, costo computacional y desempeño en días atípicos.",
        "area": "Machine Learning",
        "sector": "Energía - Mercado eléctrico",
        "nivel": "Intermedio-Avanzado",
        "duracion": "Un semestre",
        "presupuesto": "Bajo costo",
        "habilidades": [
            "Análisis y descomposición de series de tiempo",
            "Modelos estadísticos SARIMAX y Prophet",
            "Redes neuronales recurrentes para pronóstico",
            "Validación con ventanas deslizantes (backtesting)",
            "Diseño de experimentos comparativos reproducibles"
        ],
        "objetivos": [
            "🎯 Objetivo General: Comparar modelos estadísticos, de ensambles y de aprendizaje profundo para el pronóstico horario de la demanda eléctrica en Colombia, identificando el más adecuado según precisión y costo computacional.",
            "📌 Objetivos Específicos:",
            "• Construir un conjunto de datos de al menos tres años de demanda horaria con variables de calendario, festivos y temperatura.",
            "• Evaluar cuatro modelos con backtesting de ventana deslizante reportando MAPE y RMSE a horizontes de 24 y 168 horas.",
            "• Analizar el error en festivos y días atípicos y documentar el tiempo de entrenamiento e inferencia de cada modelo en un informe reproducible."
        ],
        "pasos": [
            "Análisis de requisitos",
            "Diseño de la solución",
            "Implementación y pruebas",
            "Validación y sustentación"
        ],
        "aplicaciones": [
            "Energía - Mercado eléctrico"
        ],
        "referencias": [],
        "hardware_tabla": [
            {
                "componente": "Computador de desarrollo con GPU NVIDIA (o Google Colab)",
                "categoria": "Equipo de Cómputo",
                "funcion": "Entrenamiento de la red LSTM y ejecución de los experimentos de backtesting."
            }
        ],
        "software_tabla": [
            {
                "herramienta": "statsmodels",
                "tipo": "Librería Estadística",
                "descripcion": "Modelos SARIMAX y análisis de autocorrelación."
            },
            {
                "herramienta": "Prophet",
                "tipo": "Librería de Pronóstico",
                "descripcion": "Modelo aditivo con estacionalidades y festivos colombianos."
            },
            {
                "herramienta": "LightGBM",
                "tipo": "Librería de Machine Learning",
                "descripcion": "Modelo de ensambles con variables de rezago y calendario."
            },
            {
                "herramienta": "PyTorch",
                "tipo": "Framework de Deep Learning",
                "descripcion": "Implementación y entrenamiento de la red LSTM."
            },
            {
                "herramienta": "Portal de datos abiertos de XM (Sinergox)",
                "tipo": "Fuente de Datos Abiertos",
                "descripcion": "Demanda eléctrica horaria del sistema interconectado nacional."
            },
            {
                "herramienta": "Jupyter Notebook",
                "tipo": "Entorno de Desarrollo",
                "descripcion": "Documentación reproducible de los experimentos."
            }
        ]
    },
    {
        "id": "proj_194",
        "titulo": "💳 Proyecto 194: Detección de Anomalías en Transacciones de Cooperativas de Ahorro y Crédito con Aprendizaje No Supervisado",
        "descripcion": "Problema: Las cooperativas de ahorro y crédito de la región no cuentan con sistemas antifraude comerciales y revisan manualmente las transacciones sospechosas, por lo que operaciones fraudulentas o inusuales (retiros atípicos, suplantación de asociados, fraccionamiento de montos) se detectan tarde, con pérdidas económicas y riesgo frente a la normativa de prevención de lavado de activos.\n\nDescripción: Sistema de detección de anomalías que aprende el comportamiento transaccional normal de cada asociado a partir de datos históricos anonimizados o sintéticos realistas, y asigna un puntaje de anomalía a cada nueva transacción. Se comparan Isolation Forest, Local Outlier Factor y un autoencoder, se incorporan características de comportamiento por cliente y se entrega una cola priorizada de alertas para el analista de riesgo, midiendo cuánto reduce la revisión manual.",
        "area": "Machine Learning",
        "sector": "Finanzas - Economía solidaria",
        "nivel": "Avanzado",
        "duracion": "Un semestre",
        "presupuesto": "Bajo costo",
        "habilidades": [
            "Detección de anomalías no supervisada",
            "Ingeniería de características de comportamiento transaccional",
            "Autoencoders para reconstrucción de patrones",
            "Generación de datos sintéticos y anonimización",
            "Evaluación de sistemas de alertas con precisión en el top-k"
        ],
        "objetivos": [
            "🎯 Objetivo General: Desarrollar un sistema de detección de anomalías no supervisado que priorice transacciones sospechosas para el área de riesgo de una cooperativa de ahorro y crédito.",
            "📌 Objetivos Específicos:",
            "• Construir un conjunto de al menos 200 000 transacciones anonimizadas o sintéticas con anomalías etiquetadas para evaluación.",
            "• Comparar tres algoritmos de detección de anomalías y alcanzar una precisión mínima del 60 % en las 100 alertas de mayor puntaje.",
            "• Implementar una cola de alertas con explicación de las variables que originan cada alerta y medir la reducción del volumen de revisión manual."
        ],
        "pasos": [
            "Análisis de requisitos",
            "Diseño de la solución",
            "Implementación y pruebas",
            "Validación y sustentación"
        ],
        "aplicaciones": [
            "Finanzas - Economía solidaria"
        ],
        "referencias": [],
        "hardware_tabla": [
            {
                "componente": "Computador de desarrollo (16 GB RAM)",
                "categoria": "Equipo de Cómputo",
                "funcion": "Generación de datos, entrenamiento de los detectores y análisis de resultados."
            },
            {
                "componente": "Raspberry Pi 5 (8 GB) con SSD",
                "categoria": "Servidor Local",
                "funcion": "Servicio de puntuación de transacciones y cola de alertas en la red interna."
            }
        ],
        "software_tabla": [
            {
                "herramienta": "scikit-learn",
                "tipo": "Librería de Machine Learning",
                "descripcion": "Isolation Forest y Local Outlier Factor."
            },
            {
                "herramienta": "PyTorch",
                "tipo": "Framework de Deep Learning",
                "descripcion": "Autoencoder para detección por error de reconstrucción."
            },
            {
                "herramienta": "SDV (Synthetic Data Vault)",
                "tipo": "Librería de Datos Sintéticos",
                "descripcion": "Generación de transacciones sintéticas que preservan la estructura estadística."
            },
            {
                "herramienta": "FastAPI",
                "tipo": "Framework Web / API",
                "descripcion": "Servicio de puntuación de transacciones nuevas."
            },
            {
                "herramienta": "PostgreSQL",
                "tipo": "Base de Datos",
                "descripcion": "Almacenamiento de transacciones, puntajes y decisiones del analista."
            }
        ]
    },
    {
        "id": "proj_195",
        "titulo": "📚 Proyecto 195: Sistema de Recomendación de Recursos Bibliográficos para Bibliotecas Universitarias",
        "descripcion": "Problema: Los estudiantes de la universidad no encuentran fácilmente libros, bases de datos y recursos digitales relevantes para sus asignaturas, por lo que gran parte de las colecciones adquiridas por la biblioteca permanece subutilizada mientras los estudiantes recurren a fuentes de baja calidad.\n\nDescripción: Sistema de recomendación que combina filtrado colaborativo sobre el historial anonimizado de préstamos con filtrado basado en contenido (títulos, resúmenes y materias de los recursos y contenidos de los microcurrículos). Se comparan enfoques de factorización de matrices, vecinos más cercanos y un modelo híbrido, y se integra un prototipo web en el que cada estudiante recibe sugerencias según su programa y las asignaturas que cursa.",
        "area": "Machine Learning",
        "sector": "Educación superior - Bibliotecas",
        "nivel": "Intermedio",
        "duracion": "Un semestre",
        "presupuesto": "Bajo costo",
        "habilidades": [
            "Sistemas de recomendación colaborativos y de contenido",
            "Representación de texto con TF-IDF",
            "Factorización de matrices",
            "Métricas de ranking (precision@k, NDCG)",
            "Desarrollo de prototipos web"
        ],
        "objetivos": [
            "🎯 Objetivo General: Desarrollar un sistema de recomendación híbrido que sugiera recursos bibliográficos pertinentes a los estudiantes según su programa académico y su historial de préstamos.",
            "📌 Objetivos Específicos:",
            "• Preparar un conjunto de datos anonimizado de préstamos de al menos dos años y un catálogo con metadatos de los recursos.",
            "• Comparar tres enfoques de recomendación mediante precision@10 y NDCG@10 sobre un conjunto de prueba temporal.",
            "• Implementar un prototipo web y medir con al menos 30 estudiantes la tasa de recomendaciones consideradas útiles."
        ],
        "pasos": [
            "Análisis de requisitos",
            "Diseño de la solución",
            "Implementación y pruebas",
            "Validación y sustentación"
        ],
        "aplicaciones": [
            "Educación superior - Bibliotecas"
        ],
        "referencias": [],
        "hardware_tabla": [
            {
                "componente": "Computador de desarrollo (16 GB RAM)",
                "categoria": "Equipo de Cómputo",
                "funcion": "Preparación de datos y entrenamiento de los modelos de recomendación."
            },
            {
                "componente": "Raspberry Pi 5 (8 GB)",
                "categoria": "Servidor Local",
                "funcion": "Aloja el prototipo web de recomendaciones para las pruebas con estudiantes."
            }
        ],
        "software_tabla": [
            {
                "herramienta": "Python con pandas",
                "tipo": "Lenguaje / Procesamiento de Datos",
                "descripcion": "Preparación del historial de préstamos y del catálogo."
            },
            {
                "herramienta": "Surprise",
                "tipo": "Librería de Sistemas de Recomendación",
                "descripcion": "Factorización de matrices y filtrado colaborativo por vecinos."
            },
            {
                "herramienta": "scikit-learn",
                "tipo": "Librería de Machine Learning",
                "descripcion": "Vectorización TF-IDF y similitud de contenido."
            },
            {
                "herramienta": "Flask",
                "tipo": "Framework Web / Aplicación",
                "descripcion": "Prototipo web de recomendaciones."
            },
            {
                "herramienta": "SQLite",
                "tipo": "Base de Datos",
                "descripcion": "Registro de recomendaciones y valoraciones de los estudiantes."
            }
        ]
    },
    {
        "id": "proj_196",
        "titulo": "🔁 Proyecto 196: Pipeline MLOps Reproducible con MLflow y DVC para Grupos de Investigación Universitarios",
        "descripcion": "Problema: En los grupos de investigación universitarios los modelos de machine learning se entrenan en cuadernos aislados sin versionar datos ni parámetros, por lo que los resultados publicados no se pueden reproducir, los modelos se pierden cuando un estudiante se gradúa y no existe forma de saber qué versión está desplegada.\n\nDescripción: Pipeline MLOps de bajo costo que versiona datos con DVC, registra experimentos y modelos con MLflow, automatiza entrenamiento y pruebas con GitHub Actions y despliega el modelo aprobado como servicio en contenedores sobre un servidor del laboratorio. El pipeline se valida migrando un proyecto de ML existente del laboratorio y midiendo reproducibilidad, tiempo de despliegue y detección de deriva de datos.",
        "area": "Machine Learning",
        "sector": "Educación superior - Investigación",
        "nivel": "Intermedio-Avanzado",
        "duracion": "Un semestre",
        "presupuesto": "Bajo costo",
        "habilidades": [
            "Versionamiento de datos y modelos",
            "Seguimiento de experimentos y registro de modelos",
            "Integración y despliegue continuo para ML",
            "Contenedores y despliegue de servicios",
            "Monitoreo de deriva de datos"
        ],
        "objetivos": [
            "🎯 Objetivo General: Implementar un pipeline MLOps reproducible y de bajo costo que permita a los grupos de investigación versionar, entrenar, desplegar y monitorear sus modelos de machine learning.",
            "📌 Objetivos Específicos:",
            "• Configurar el versionamiento de datos y el registro de experimentos de modo que cualquier resultado pueda reproducirse con un solo comando a partir de su commit.",
            "• Automatizar el entrenamiento, las pruebas y el despliegue, reduciendo el tiempo de puesta en producción de un modelo a menos de 15 minutos.",
            "• Implementar un reporte periódico de deriva de datos y validar el pipeline migrando al menos un proyecto real del laboratorio."
        ],
        "pasos": [
            "Análisis de requisitos",
            "Diseño de la solución",
            "Implementación y pruebas",
            "Validación y sustentación"
        ],
        "aplicaciones": [
            "Educación superior - Investigación"
        ],
        "referencias": [],
        "hardware_tabla": [
            {
                "componente": "Computador de desarrollo (16 GB RAM)",
                "categoria": "Equipo de Cómputo",
                "funcion": "Desarrollo del pipeline y ejecución local de experimentos."
            },
            {
                "componente": "Mini PC o servidor del laboratorio con Linux",
                "categoria": "Servidor Local",
                "funcion": "Ejecuta el servidor de MLflow, el almacenamiento remoto de DVC y el servicio del modelo."
            },
            {
                "componente": "Disco SSD externo de 1 TB",
                "categoria": "Almacenamiento",
                "funcion": "Almacenamiento de versiones de datos y artefactos de modelos."
            }
        ],
        "software_tabla": [
            {
                "herramienta": "DVC",
                "tipo": "Herramienta de Versionamiento de Datos",
                "descripcion": "Versionamiento de conjuntos de datos y definición de etapas del pipeline."
            },
            {
                "herramienta": "MLflow",
                "tipo": "Plataforma MLOps",
                "descripcion": "Seguimiento de experimentos y registro de modelos."
            },
            {
                "herramienta": "GitHub Actions",
                "tipo": "Integración y Despliegue Continuo",
                "descripcion": "Automatización de entrenamiento, pruebas y despliegue."
            },
            {
                "herramienta": "Docker",
                "tipo": "Contenedores",
                "descripcion": "Empaquetado del servicio de inferencia."
            },
            {
                "herramienta": "Evidently",
                "tipo": "Monitoreo de Modelos",
                "descripcion": "Reportes de deriva de datos y de desempeño del modelo."
            },
            {
                "herramienta": "MinIO",
                "tipo": "Almacenamiento de Objetos",
                "descripcion": "Almacenamiento remoto compatible con S3 para DVC y MLflow."
            }
        ]
    },
    {
        "id": "proj_197",
        "titulo": "⚖️ Proyecto 197: Auditoría de Equidad y Explicabilidad con SHAP para un Modelo de Predicción de Inasistencia a Citas Médicas",
        "descripcion": "Problema: Las IPS de Popayán pierden una proporción considerable de sus citas por inasistencia de los pacientes, y aunque un modelo predictivo permitiría reprogramar o recordar citas de forma focalizada, un modelo no auditado puede penalizar sistemáticamente a pacientes rurales, de menores ingresos o de ciertos grupos étnicos, reduciendo su acceso a la atención.\n\nDescripción: Desarrollo de un modelo de predicción de inasistencia sobre datos anonimizados o públicos de citas médicas, acompañado de una auditoría de equidad que mide brechas de desempeño entre grupos (zona urbana o rural, régimen de afiliación, sexo, edad) y de un análisis de explicabilidad con SHAP. Se aplican y comparan técnicas de mitigación de sesgo (reponderación, umbrales por grupo, entrenamiento con restricciones) y se cuantifica el costo en precisión de cada una.",
        "area": "Machine Learning",
        "sector": "Salud - Gestión de servicios de salud",
        "nivel": "Avanzado",
        "duracion": "Un semestre",
        "presupuesto": "Bajo costo",
        "habilidades": [
            "Métricas de equidad algorítmica",
            "Explicabilidad local y global con SHAP",
            "Técnicas de mitigación de sesgo",
            "Clasificación supervisada en datos de salud",
            "Ética y gobernanza de modelos de machine learning"
        ],
        "objetivos": [
            "🎯 Objetivo General: Desarrollar y auditar un modelo de predicción de inasistencia a citas médicas que sea explicable y cuyas brechas de desempeño entre grupos poblacionales estén medidas y mitigadas.",
            "📌 Objetivos Específicos:",
            "• Entrenar un modelo de clasificación de inasistencia con un AUC mínimo de 0,75 sobre un conjunto de prueba independiente.",
            "• Medir paridad demográfica e igualdad de oportunidades entre al menos cuatro atributos sensibles y explicar las predicciones mediante valores SHAP.",
            "• Comparar tres técnicas de mitigación de sesgo, reduciendo la brecha de igualdad de oportunidades por debajo de 0,05 y reportando la pérdida de AUC asociada."
        ],
        "pasos": [
            "Análisis de requisitos",
            "Diseño de la solución",
            "Implementación y pruebas",
            "Validación y sustentación"
        ],
        "aplicaciones": [
            "Salud - Gestión de servicios de salud"
        ],
        "referencias": [],
        "hardware_tabla": [
            {
                "componente": "Computador de desarrollo (16 GB RAM)",
                "categoria": "Equipo de Cómputo",
                "funcion": "Entrenamiento del modelo, cálculo de valores SHAP y experimentos de mitigación."
            }
        ],
        "software_tabla": [
            {
                "herramienta": "SHAP",
                "tipo": "Librería de Explicabilidad",
                "descripcion": "Explicaciones locales y globales de las predicciones."
            },
            {
                "herramienta": "Fairlearn",
                "tipo": "Librería de Equidad Algorítmica",
                "descripcion": "Métricas de equidad por grupo y algoritmos de mitigación."
            },
            {
                "herramienta": "XGBoost",
                "tipo": "Librería de Machine Learning",
                "descripcion": "Modelo de clasificación de inasistencia."
            },
            {
                "herramienta": "scikit-learn",
                "tipo": "Librería de Machine Learning",
                "descripcion": "Preprocesamiento, calibración y evaluación."
            },
            {
                "herramienta": "Jupyter Notebook",
                "tipo": "Entorno de Desarrollo",
                "descripcion": "Informe reproducible de la auditoría de equidad."
            }
        ]
    },
    {
        "id": "proj_198",
        "titulo": "🗺️ Proyecto 198: Agrupamiento de Municipios del Cauca según Indicadores Socioeconómicos para la Focalización de Inversión Pública",
        "descripcion": "Problema: Las entidades de planeación departamental del Cauca comparan municipios con indicadores aislados (pobreza multidimensional, cobertura educativa, acceso a servicios), lo que dificulta identificar grupos de municipios con necesidades similares y diseñar programas de inversión diferenciados para cada perfil territorial.\n\nDescripción: Análisis no supervisado de los 42 municipios del Cauca a partir de indicadores abiertos del DANE, TerriData del DNP y datos.gov.co. Se aplican reducción de dimensionalidad (PCA, UMAP) y se comparan K-means, clustering jerárquico y Gaussian Mixture Models, validando la estabilidad de los grupos. Los perfiles resultantes se presentan en un mapa interactivo con la caracterización de cada grupo para apoyar la priorización de inversión.",
        "area": "Machine Learning",
        "sector": "Gobierno - Planeación territorial",
        "nivel": "Intermedio",
        "duracion": "Un semestre",
        "presupuesto": "Bajo costo",
        "habilidades": [
            "Aprendizaje no supervisado y clustering",
            "Reducción de dimensionalidad",
            "Integración de datos abiertos gubernamentales",
            "Visualización geoespacial",
            "Interpretación de resultados para la toma de decisiones públicas"
        ],
        "objetivos": [
            "🎯 Objetivo General: Identificar perfiles territoriales de los municipios del Cauca mediante técnicas de agrupamiento sobre indicadores socioeconómicos abiertos para apoyar la focalización de la inversión pública.",
            "📌 Objetivos Específicos:",
            "• Consolidar una base de al menos 20 indicadores socioeconómicos actualizados para los 42 municipios del departamento.",
            "• Comparar tres algoritmos de clustering con índice de silueta y análisis de estabilidad por remuestreo, seleccionando una partición justificada.",
            "• Publicar un mapa interactivo con la caracterización de cada grupo y validarlo con al menos dos funcionarios o expertos en planeación territorial."
        ],
        "pasos": [
            "Análisis de requisitos",
            "Diseño de la solución",
            "Implementación y pruebas",
            "Validación y sustentación"
        ],
        "aplicaciones": [
            "Gobierno - Planeación territorial"
        ],
        "referencias": [],
        "hardware_tabla": [
            {
                "componente": "Computador de desarrollo (8 GB RAM o superior)",
                "categoria": "Equipo de Cómputo",
                "funcion": "Integración de indicadores, clustering y generación del mapa interactivo."
            }
        ],
        "software_tabla": [
            {
                "herramienta": "scikit-learn",
                "tipo": "Librería de Machine Learning",
                "descripcion": "PCA, K-means, clustering jerárquico y Gaussian Mixture Models."
            },
            {
                "herramienta": "umap-learn",
                "tipo": "Librería de Reducción de Dimensionalidad",
                "descripcion": "Proyección no lineal para visualizar la estructura de los datos."
            },
            {
                "herramienta": "GeoPandas",
                "tipo": "Librería Geoespacial",
                "descripcion": "Unión de indicadores con los límites municipales del DANE."
            },
            {
                "herramienta": "Folium",
                "tipo": "Visualización / Mapas",
                "descripcion": "Mapa interactivo de los perfiles territoriales."
            },
            {
                "herramienta": "datos.gov.co y TerriData (DNP)",
                "tipo": "Fuente de Datos Abiertos",
                "descripcion": "Indicadores socioeconómicos municipales."
            }
        ]
    },
    {
        "id": "proj_199",
        "titulo": "🛰️ Proyecto 199: Clasificación de Cobertura del Suelo en el Cauca con Imágenes Sentinel-2 y Aprendizaje Supervisado",
        "descripcion": "Problema: Las autoridades ambientales y los investigadores del Cauca no disponen de mapas de cobertura del suelo actualizados con frecuencia, por lo que la expansión de la frontera agrícola, la pérdida de bosque y el avance de cultivos sobre páramos y zonas de protección se detectan con años de retraso.\n\nDescripción: Pipeline de clasificación supervisada de cobertura del suelo para una subregión del Cauca (por ejemplo, la meseta de Popayán o el Macizo Colombiano) con imágenes multiespectrales Sentinel-2 e índices espectrales como NDVI y NDWI. Las muestras de entrenamiento se etiquetan con fotointerpretación y verificación en campo, se comparan Random Forest, SVM y gradient boosting, y se generan mapas de cobertura de dos años para cuantificar cambios.",
        "area": "Machine Learning",
        "sector": "Medio ambiente - Ordenamiento territorial",
        "nivel": "Intermedio-Avanzado",
        "duracion": "Un semestre",
        "presupuesto": "Bajo costo",
        "habilidades": [
            "Procesamiento de imágenes satelitales multiespectrales",
            "Índices espectrales de vegetación y agua",
            "Clasificación supervisada de píxeles",
            "Evaluación de exactitud con matriz de confusión e índice kappa",
            "Análisis de cambio de cobertura"
        ],
        "objetivos": [
            "🎯 Objetivo General: Desarrollar un pipeline de clasificación supervisada de cobertura del suelo con imágenes Sentinel-2 para una subregión del Cauca que permita cuantificar cambios entre dos años.",
            "📌 Objetivos Específicos:",
            "• Construir un conjunto de al menos 1 000 muestras etiquetadas en seis clases de cobertura, incluyendo al menos 50 puntos verificados en campo.",
            "• Comparar tres clasificadores y alcanzar una exactitud global igual o superior al 85 % con un índice kappa mayor a 0,8.",
            "• Generar mapas de cobertura para dos años y cuantificar en hectáreas los cambios de bosque, pastos y cultivos en la zona de estudio."
        ],
        "pasos": [
            "Análisis de requisitos",
            "Diseño de la solución",
            "Implementación y pruebas",
            "Validación y sustentación"
        ],
        "aplicaciones": [
            "Medio ambiente - Ordenamiento territorial"
        ],
        "referencias": [],
        "hardware_tabla": [
            {
                "componente": "Computador de desarrollo (16 GB RAM)",
                "categoria": "Equipo de Cómputo",
                "funcion": "Preprocesamiento de imágenes, entrenamiento de clasificadores y elaboración de mapas."
            },
            {
                "componente": "Receptor GPS de mano o teléfono inteligente con GNSS",
                "categoria": "Dispositivo de Posicionamiento",
                "funcion": "Georreferenciación de los puntos de verificación en campo."
            }
        ],
        "software_tabla": [
            {
                "herramienta": "Google Earth Engine",
                "tipo": "Plataforma de Análisis Geoespacial",
                "descripcion": "Acceso a imágenes Sentinel-2, filtrado de nubes y composición de mosaicos."
            },
            {
                "herramienta": "QGIS",
                "tipo": "Sistema de Información Geográfica",
                "descripcion": "Fotointerpretación, etiquetado de muestras y edición de mapas."
            },
            {
                "herramienta": "rasterio y GeoPandas",
                "tipo": "Librería Geoespacial",
                "descripcion": "Lectura de bandas espectrales y manejo de muestras vectoriales."
            },
            {
                "herramienta": "scikit-learn",
                "tipo": "Librería de Machine Learning",
                "descripcion": "Random Forest, SVM y métricas de exactitud."
            },
            {
                "herramienta": "LightGBM",
                "tipo": "Librería de Machine Learning",
                "descripcion": "Clasificador de gradient boosting para comparación."
            }
        ]
    },
    {
        "id": "proj_200",
        "titulo": "🧪 Proyecto 200: Estudio Comparativo de Herramientas AutoML sobre Conjuntos de Datos Tabulares Regionales",
        "descripcion": "Problema: Los grupos de investigación y las pequeñas empresas de la región que quieren aplicar machine learning a sus datos tabulares no cuentan con científicos de datos, y aunque las herramientas AutoML prometen automatizar la construcción de modelos, no existe evidencia sobre cuál ofrece mejores resultados, tiempos y facilidad de uso con conjuntos de datos pequeños y heterogéneos como los locales.\n\nDescripción: Estudio experimental que compara herramientas AutoML de código abierto (AutoGluon, FLAML, H2O AutoML y TPOT) frente a una línea base manual en scikit-learn, sobre al menos seis conjuntos de datos tabulares de clasificación y regresión de origen colombiano y regional. Se fija un protocolo común de presupuesto de tiempo, particiones y métricas, y se reportan desempeño, tiempo de cómputo, consumo de memoria e interpretabilidad del modelo final, publicando los scripts para que el estudio sea reproducible.",
        "area": "Machine Learning",
        "sector": "Tecnología - Ciencia de datos",
        "nivel": "Intermedio",
        "duracion": "Un semestre",
        "presupuesto": "Bajo costo",
        "habilidades": [
            "Aprendizaje automático automatizado (AutoML)",
            "Diseño de protocolos experimentales de benchmarking",
            "Clasificación y regresión sobre datos tabulares",
            "Análisis estadístico de resultados comparativos",
            "Documentación de experimentos reproducibles"
        ],
        "objetivos": [
            "🎯 Objetivo General: Comparar el desempeño, el costo computacional y la facilidad de uso de herramientas AutoML de código abierto sobre conjuntos de datos tabulares regionales.",
            "📌 Objetivos Específicos:",
            "• Seleccionar y preparar al menos seis conjuntos de datos tabulares de clasificación y regresión provenientes de fuentes abiertas colombianas.",
            "• Ejecutar cuatro herramientas AutoML y una línea base manual con presupuestos de tiempo de 5, 15 y 60 minutos, registrando métricas, tiempo y memoria.",
            "• Determinar mediante pruebas estadísticas de Friedman y Nemenyi si existen diferencias significativas entre herramientas y publicar un repositorio reproducible."
        ],
        "pasos": [
            "Análisis de requisitos",
            "Diseño de la solución",
            "Implementación y pruebas",
            "Validación y sustentación"
        ],
        "aplicaciones": [
            "Tecnología - Ciencia de datos"
        ],
        "referencias": [],
        "hardware_tabla": [
            {
                "componente": "Computador de desarrollo (16 GB RAM, 8 núcleos)",
                "categoria": "Equipo de Cómputo",
                "funcion": "Ejecución controlada de los experimentos con el mismo hardware para todas las herramientas."
            }
        ],
        "software_tabla": [
            {
                "herramienta": "AutoGluon",
                "tipo": "Herramienta AutoML",
                "descripcion": "AutoML basado en ensambles apilados de múltiples modelos."
            },
            {
                "herramienta": "FLAML",
                "tipo": "Herramienta AutoML",
                "descripcion": "AutoML ligero orientado a bajo costo computacional."
            },
            {
                "herramienta": "H2O AutoML",
                "tipo": "Herramienta AutoML",
                "descripcion": "Entrenamiento automático y tabla de clasificación de modelos."
            },
            {
                "herramienta": "TPOT",
                "tipo": "Herramienta AutoML",
                "descripcion": "Búsqueda de pipelines mediante programación genética."
            },
            {
                "herramienta": "scikit-learn",
                "tipo": "Librería de Machine Learning",
                "descripcion": "Línea base manual y métricas de evaluación."
            },
            {
                "herramienta": "SciPy",
                "tipo": "Librería Estadística",
                "descripcion": "Pruebas estadísticas para comparar las herramientas."
            }
        ]
    }
];
