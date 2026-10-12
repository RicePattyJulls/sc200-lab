# Revisión 5 · 12 de octubre de 2026

Actualización local con **63 preguntas nuevas y 7 aclaraciones**: el banco pasa de 500 a **563**, y de 50 a **66 temas**. Se leyó completo el documento privado `SC-200.md` (2810 líneas), se comparó con las 500 preguntas activas y se revisaron selección, puntuación, almacenamiento, importación, versiones históricas y presentación antes de editar.

La única fuente de los cambios de contenido fue ese documento. No se navegó por internet ni se consultaron sus enlaces. Las referencias externas del banco anterior se conservan como registro histórico, sin una nueva verificación externa. Esta revisión no certifica vigencia oficial del contenido ni convierte automáticamente todas las preguntas históricas en preguntas trazadas a esta versión del documento.

## Comparación y lagunas cubiertas

Los temas generales ya estaban representados. La ampliación cubre dependencias, límites y combinaciones que faltaban o se trataban de forma demasiado aislada. Se mantienen temas cercanos cuando cambia la decisión que debe tomar el analista; no se añadieron paráfrasis para alcanzar una cuota.

| Área | Base existente y ampliación | IDs nuevos | Cantidad |
| --- | --- | --- | ---: |
| Licencias y arquitectura | De licencias/onboarding generales a offboarding independiente, dependencia del lake, mezcla Business/P2 y residencia regional | env-211–214 | 4 |
| Permisos y scopes | De roles aislados a permisos acumulados, scope no retroactivo, Live response específico y token de reglas cross-tenant | env-215–218 | 4 |
| Endpoint | Distinguir grupos Entra/MDE, exclusiones de AIR/AV, descubrimiento pasivo, evidencias ASR y tareas frente a correcciones efectivas | env-219–223 | 5 |
| Correo | Aplicar precedencia de presets, excepción de reescritura, Dynamic Delivery/ZAP y configuración de simulaciones externas | env-224–227 | 4 |
| Ingesta | Resolver Sysmon/WEF, duplicación CEF, DCR/DCE con Private Link y pérdida por transformación | env-228–231 | 4 |
| Retención y costes | Distinguir analytics/total retention, alcance futuro del lake, retención Entra no retroactiva y daily cap | env-232–235 | 4 |
| TI y detecciones | Ingestion rules frente a API, TI map/MDTI, demora scheduled, restricciones Continuous, tuning y claves de acciones de correo | env-236–241 | 6 |
| Automatización | Usar Enhanced alert, límites de clusters, nivel requerido de disrupción y alcance de ZAP | env-242–245 | 4 |
| Correlación y cases | Estado del incident case, etiquetas no retroactivas y límites del workspace secundario | response-191–193 | 3 |
| Evidencia y permisos | Administrative Units en Audit, Preview/Export y requisitos de integración IRM/DLP | response-194–196 | 3 |
| Verificación de respuesta | Estado de riesgo frente a contención, timeout de cuarentena, cancelación de Live response y autorización de Fix | response-197–200 | 4 |
| Copilot | Acceso OBO al destino y report de gestión frente a summary del ataque | response-201–202 | 2 |
| Semántica KQL | innerunique/inner, orden de arg_max y filtro, asociación sin causalidad, mv-apply, union y ASR auditado | hunt-101–106 | 6 |
| Búsquedas históricas | Async frente a job, materialización _SRCH, vista _RST y salud de summary rules | hunt-107–110 | 4 |
| Grafos y hunting | GQL frente a LMP, Link to incident frente a bookmark y N/A frente a cero | hunt-111–113 | 3 |
| Tablas y evidencias | AlertIds/SystemAlertId, familia Message de Teams y estado histórico de HuntingBookmark | hunt-114–116 | 3 |

Distribución final: **245 entorno, 202 respuesta, 116 hunting**. El simulacro mantiene 50 preguntas, **21/19/10**, y 90 minutos de práctica. Su reparto es independiente de la distribución del banco; las nuevas preguntas participan en la selección y reciben la prioridad de preguntas aún no vistas que ya utiliza el motor. Hay 24 ejercicios con código visible, cuatro nuevos. Las 63 incorporaciones explican las cuatro opciones individualmente; la presentación respeta el orden aleatorio de opciones y oculta explicaciones durante el simulacro.

## Siete aclaraciones

| ID | Problema anterior | Cambio |
| --- | --- | --- |
| env-004 | Los dos roles Sentinel podían parecer suficientes por sí solos para todo el flujo de ejecución | El escenario concede de antemano los permisos de Logic Apps y distingue autorización del usuario y del servicio |
| env-033 | Warn no reflejaba la condición administrativa de la versión indicada en los apuntes | Se concreta plataforma, aprobación y omisión de 24 horas |
| env-055 | La recomendación de tuning podía extenderse a detecciones que no lo admiten | Se delimita a alerta nativa MDE, excluyendo custom detections y Custom TI |
| env-176 | Fusion podía interpretarse como motor aplicable también tras la integración XDR | Se explicita workspace independiente, sin integración XDR ni incorporación a Defender |
| response-022 | Case se usaba sin distinguir sus dos tipos | Se pregunta por generic case y se explica el incident case 1:1 |
| hunt-071 | Bookmark sin indicar la superficie de creación | Se concreta Logs en Sentinel Azure y se distingue Advanced Hunting |
| hunt-081 | La antigüedad parecía justificar por sí sola un KQL job | Se exige salida materializada y se diferencia de interactivo/async |

Se conservan sus opciones, índices correctos e IDs. Las sesiones antiguas muestran su redacción anterior mediante snapshots; sus notas, marcadores y estadísticas siguen siendo válidos. Las migraciones de sustituciones de revisiones 1–3 conservan su comportamiento previo.

## Ambigüedades de los apuntes y decisiones de exclusión

Se registran como cuestiones del documento, sin resolverlas mediante conocimientos o fuentes externas:

- **Línea 103, Entra Workload ID Premium:** una frase sobre SP y Conditional Access parece tener una negación omitida. No se añadió una pregunta que dependa de inferirla.
- **Líneas 639–651 y 751–758, exclusiones AV/ASR:** el recorrido secuencial y las afirmaciones sobre exclusiones de proceso y de regla no permiten deducir una precedencia universal inequívoca. Se evitan preguntas que den esa matriz por resuelta. Las nuevas de ASR usan modos y eventos explícitos.
- **Líneas 138 y 479, APIs de MDE y planes:** la formulación general y la tabla de permisos/licencias no delimitan igual las API. No se pregunta por una exclusividad absoluta de plan.
- **Líneas 1142, 1473 y 2199, Auxiliary:** hay formulaciones distintas sobre archivo/consulta directa. No se añade una regla universal de archivo; las preguntas de Restore y summary usan capacidades expresamente delimitadas en su sección.
- **Línea 1399 frente al capítulo 13:** la abreviatura que une telemetría y AlertInfo/AlertEvidence puede confundirse con equivalencia entre raw data y alertas. No se usa como equivalencia.
- **Líneas 1859 y 1960, custom details:** el texto sobre correlación y el de agrupación pueden parecer contradictorios si se omite la superficie. No se añade una afirmación general sobre su capacidad para correlacionar.

AIR se trata según el contexto que los propios apuntes distinguen: la automatización nativa no implica que siga disponible todo flujo manual histórico. No se reintrodujeron preguntas sobre iniciar manualmente investigaciones retiradas del recorrido descrito.

## Trazabilidad y privacidad

`notes-source.js` contiene nombre de archivo, fecha, encabezados, rangos de líneas y SHA-256 del documento y de 29 secciones. `notes.js` referencia esos identificadores por pregunta. Las líneas corresponden al documento original, no a una versión reformateada. La huella permite detectar cambios posteriores; verifica la identidad del origen, no demuestra automáticamente la validez pedagógica de una pregunta.

No se copia el documento privado, ni capturas, credenciales, identificadores de tenant, suscripción, cuentas o máquinas del laboratorio. Los escenarios usan sujetos genéricos. El documento sigue fuera del proyecto y se añadieron exclusiones en `.gitignore` para evitar incorporarlo accidentalmente. Las referencias mostradas no enlazan al archivo privado ni intentan descargarlo.

## Comprobaciones

- `npm test`: 16 pruebas del motor y banco, incluidas 100 selecciones equilibradas, 500 huellas de preguntas de revisión 4, continuidad de historial/progreso y selección de las nuevas preguntas.
- `npm run check:notes`: documento original intacto y 29 rangos de sección verificados offline.
- `npm run coverage`: 563 preguntas, 66 temas, 63 nuevas y 7 aclaradas; grupos y reparto comprobados.
- `npm run test:browser`: suite local de Chromium para escritorio y móvil, banco completo de nuevas preguntas, feedback por opción, referencias, práctica y simulacro, temporizador, recarga, exportación/importación, copia de revisión 4, almacenamiento bloqueado y apertura `file://`. Bloquea solicitudes externas y comprueba errores JavaScript.

Las consultas KQL se revisaron contra los apuntes y se comprobó su representación; no se ejecutaron contra un tenant ni contra un motor Kusto. El verificador histórico de enlaces no se ejecutó. No se hizo push ni se publicó la actualización.

## Referencias por pregunta

Los identificadores de sección de la tabla siguiente se resuelven en `notes-source.js`, con su encabezado y huella. Una pregunta puede combinar varias secciones.

| Pregunta | Sección y líneas del original |
| --- | --- |
| env-004 (aclarada) | permisos: 403–538 |
| env-033 (aclarada) | asr: 714–810 |
| env-055 (aclarada) | tuning: 1829–1878 |
| env-176 (aclarada) | tuning: 1829–1878 |
| response-022 (aclarada) | correlacion: 1880–1986 |
| hunt-071 (aclarada) | hunting: 2105–2190 |
| hunt-081 (aclarada) | busquedas: 2191–2215 |
| env-211 | sentinel-onboarding: 161–202 |
| env-212 | sentinel-onboarding: 161–202 |
| env-213 | licencias: 56–125 |
| env-214 | sentinel-onboarding: 161–202 |
| env-215 | rbac: 214–379 |
| env-216 | rbac: 214–379; custom: 1737–1828 |
| env-217 | rbac: 214–379; permisos: 403–538 |
| env-218 | rbac: 214–379; permisos: 403–538 |
| env-219 | endpoint: 545–711 |
| env-220 | endpoint: 545–711; respuesta: 2236–2388 |
| env-221 | endpoint: 545–711 |
| env-222 | asr: 714–810; tablas: 2517–2654 |
| env-223 | postura: 811–824 |
| env-224 | correo: 826–940 |
| env-225 | correo: 826–940 |
| env-226 | correo: 826–940; automatizacion: 2390–2516 |
| env-227 | correo: 826–940 |
| env-228 | ingesta: 1125–1367; tablas: 2517–2654 |
| env-229 | ingesta: 1125–1367 |
| env-230 | ingesta: 1125–1367 |
| env-231 | ingesta: 1125–1367; retencion-sentinel: 1463–1546 |
| env-232 | retencion-sentinel: 1463–1546 |
| env-233 | retencion-sentinel: 1463–1546; busquedas: 2191–2215 |
| env-234 | retencion-nativa: 1369–1461 |
| env-235 | retencion-sentinel: 1463–1546 |
| env-236 | ti: 1547–1599 |
| env-237 | ti: 1547–1599 |
| env-238 | scheduled: 1667–1735 |
| env-239 | scheduled: 1667–1735; custom: 1737–1828 |
| env-240 | custom: 1737–1828; tuning: 1829–1878 |
| env-241 | custom: 1737–1828; respuesta: 2236–2388 |
| env-242 | automatizacion: 2390–2516 |
| env-243 | automatizacion: 2390–2516 |
| env-244 | automatizacion: 2390–2516; endpoint: 545–711 |
| env-245 | automatizacion: 2390–2516; correo: 826–940 |
| response-191 | correlacion: 1880–1986 |
| response-192 | correlacion: 1880–1986 |
| response-193 | sentinel-onboarding: 161–202; correlacion: 1880–1986 |
| response-194 | permisos: 403–538; investigacion: 1987–2104 |
| response-195 | permisos: 403–538 |
| response-196 | investigacion: 1987–2104; tablas: 2517–2654 |
| response-197 | respuesta: 2236–2388 |
| response-198 | respuesta: 2236–2388 |
| response-199 | respuesta: 2236–2388 |
| response-200 | permisos: 403–538; cloud: 1045–1073; respuesta: 2236–2388 |
| response-201 | permisos: 403–538; investigacion: 1987–2104 |
| response-202 | investigacion: 1987–2104 |
| hunt-101 | kql: 2656–2732 |
| hunt-102 | kql: 2656–2732 |
| hunt-103 | patrones: 2734–2810; kql: 2656–2732 |
| hunt-104 | kql: 2656–2732 |
| hunt-105 | kql: 2656–2732 |
| hunt-106 | patrones: 2734–2810; tablas: 2517–2654; asr: 714–810 |
| hunt-107 | busquedas: 2191–2215 |
| hunt-108 | busquedas: 2191–2215 |
| hunt-109 | busquedas: 2191–2215 |
| hunt-110 | busquedas: 2191–2215; retencion-sentinel: 1463–1546 |
| hunt-111 | grafos: 2217–2235; identidad: 942–1013 |
| hunt-112 | hunting: 2105–2190; grafos: 2217–2235 |
| hunt-113 | hunting: 2105–2190 |
| hunt-114 | tablas: 2517–2654; kql: 2656–2732 |
| hunt-115 | tablas: 2517–2654 |
| hunt-116 | tablas: 2517–2654; kql: 2656–2732 |
