# Renovación completa del banco activo · Revisión 6

La revisión 5 amplió el banco anterior; esta revisión corrige ese alcance. **Todo el banco de práctica está creado exclusivamente desde los apuntes privados SC-200.md.** Las 500 preguntas heredadas se retiran de la selección de prácticas y simulacros nuevos, pero siguen disponibles para el historial, las sesiones en curso, las estadísticas y las guardadas anteriores.

El banco activo contiene **176 preguntas originales**: las 63 escritas desde los apuntes en la revisión 5 y **113 escenarios adicionales** de esta renovación. No se ha fijado una cuota para reproducir el número anterior; el número responde a las decisiones y distinciones cubiertas, evitando rellenar el banco con variantes triviales. Ninguna de las 500 preguntas heredadas forma parte del banco activo.

## Contenido

Cada pregunta tiene cuatro opciones, explicación individual de por qué cada una es correcta o incorrecta y referencias verificables al documento original. Hay selección única y múltiple, y nueve preguntas con consultas visibles. Las opciones se permutan al comenzar una sesión y sus explicaciones se presentan tras responder o al revisar el banco.

| Área | Decisiones y escenarios cubiertos |
| --- | --- |
| Licencias y onboarding | Licencia frente a incorporación técnica, suites P1/P2, cobertura de servidores, sensores MDI, señales de Purview y requisitos del lake |
| Permisos | Unified/Azure RBAC, assignments y scopes, invitados, lectura frente a acción, permisos de playbooks y de correo, privilegios iniciales y operación posterior |
| Protección | AV Passive/Active, EDR postbrecha, indicadores y matching, device groups, ASR, políticas de correo, MDI y controles SaaS en sesión o fuera de banda |
| Postura y riesgo | CSPM/CWPP, scores, DLP/IRM, triggering events, umbrales y riesgo de cuenta frente a autenticación |
| Ingesta | Arc/AMA/DCR, WEF y esquemas, Syslog/CEF, diagnostic settings y remediación de existentes, Connect events, tablas custom y transformaciones |
| Retención y costes | Almacenes independientes, Audit Premium, policies futuras, ventana caliente frente a vida total, lake, exenciones y dependencia de detecciones |
| TI y detección | Objetos STIX y transporte TAXII, validez y retención, tablas TI, matching, reglas scheduled/NRT/Continuous, latencia, columnas de entidad y acciones |
| Correlación y cases | Primario/secundarios, tags futuros, tipos de case, merge y redirección, propietarios, cierre y clasificación |
| Investigación | Pivotes por entidad, paquetes de evidencia, timeline de acciones, veredicto frente a remediación, permisos de Audit/eDiscovery y Copilot |
| Respuesta | Contain/isolate, verificación de recuperación, cuarentena y bloqueo futuro, movimientos/eliminación de correo, Submissions, compartición SaaS, identidad y cloud |
| Orquestación | Triggers, orden y bucles, dependencias de playbooks largos, ARM ID, stateful/Standard, playbooks generados, CI/CD, aprobación y notificación |
| Hunting y KQL | Joins y cardinalidad, agrupación y ventanas, arrays/JSON, texto y regex, tablas y claves de evidencia, ASIM y funciones, grafos, queries reutilizables y búsquedas históricas |

Distribución: **93 entorno, 42 respuesta, 41 hunting**, repartidas en 21 temas. El simulacro conserva **50 preguntas, 21/19/10**, con reloj de práctica de 90 minutos. La distribución del banco no obliga a cambiar los pesos de selección del simulacro.

## Progreso y preguntas anteriores

- Se conservan todos los IDs existentes. Los 113 escenarios adicionales reciben IDs nuevos: `env-246` a `env-303`, `response-203` a `response-232` y `hunt-117` a `hunt-141`.
- `renewal.js` separa las 500 preguntas heredadas del banco activo. No se reasigna un ID antiguo a una pregunta distinta.
- Las sesiones de revisiones 1–5 siguen mostrando sus preguntas correspondientes y calculando sus resultados originales. Se conservan las migraciones históricas previas.
- El progreso JSON mantiene estadísticas y marcadores de preguntas retiradas. El panel de entrenamiento calcula avance solo sobre el banco activo; no atribuye esos aciertos a preguntas diferentes.
- **Archivo del banco anterior** permite consultar las preguntas retiradas y filtrar sus guardadas. **Mi progreso** muestra los recuentos conservados y las incluye en exportación/importación.
- Una sesión antigua en curso se identifica como tal. Repasar fallos de un resultado antiguo conserva la revisión de esa sesión. Los simulacros nuevos solo seleccionan preguntas del banco activo.

## Fuente y límites

La única fuente de contenido es el documento privado previamente leído completo, sin modificarlo. No se consultaron enlaces ni fuentes de estudio externas. Para publicar se usa GitHub y se comprueba la propia web; esas operaciones no aportan contenido a las preguntas.

`notes-source.js` registra encabezados, líneas y huellas SHA-256 de **31 secciones**. `notes.js` y `fresh-bank.js` guardan las referencias de cada pregunta. No contienen una copia del documento ni datos sensibles de los laboratorios.

Siguen excluidas las afirmaciones que dependen de resolver las seis ambigüedades registradas en [REVISION-5.md](REVISION-5.md): Workload ID Premium, exclusiones AV/ASR, alcance de API por plan, archivo de Auxiliary, raw data frente a alertas y custom details frente a correlación. Las preguntas usan los límites expresamente delimitados en los apuntes.

No se afirma que el banco represente cada detalle de los apuntes ni que reproduzca el examen. Las consultas se revisan como ejercicios y no se ejecutan contra un tenant Kusto.

## Verificación

- **19 pruebas del motor y contenido:** selección, corrección, exportación/importación, preguntas originales y exclusión de las retiradas del simulacro.
- Huellas de **500 preguntas de revisión 4 y 563 de revisión 5** verificadas para recuperación de sesiones antiguas, más copias sintéticas de progreso de ambas revisiones.
- SHA-256 del documento original y sus **31 rangos de sección** verificados offline.
- Pruebas Chromium de escritorio/móvil, representación de **las 176 preguntas activas**, referencias y razones por opción, sesión antigua, archivo y guardadas, repaso histórico, reloj y funcionamiento sin almacenamiento y mediante `file://`.
- No se ejecuta el comprobador histórico de enlaces externos. La revisión de navegador local bloquea solicitudes externas y comprueba errores JavaScript.

## Trazabilidad del banco activo

Cada identificador de sección siguiente se resuelve en `notes-source.js` mediante encabezado, líneas y huella. Las líneas corresponden al documento original; una pregunta puede combinar varias secciones.

| Pregunta | Secciones y líneas del original |
| --- | --- |
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
| env-246 | licencias: 56–125 |
| env-247 | licencias: 56–125; retencion-nativa: 1369–1461 |
| env-248 | licencias: 56–125 |
| env-249 | licencias: 56–125; identidad: 942–1013 |
| env-250 | licencias: 56–125 |
| env-251 | licencias: 56–125 |
| env-252 | endpoint: 545–711 |
| env-253 | endpoint: 545–711 |
| env-254 | endpoint: 545–711 |
| env-255 | endpoint: 545–711 |
| env-256 | endpoint: 545–711 |
| env-257 | endpoint: 545–711 |
| env-258 | endpoint: 545–711 |
| env-259 | endpoint: 545–711 |
| env-260 | endpoint: 545–711; automatizacion: 2390–2516 |
| env-261 | identidad: 942–1013 |
| env-262 | identidad: 942–1013; grafos: 2217–2235 |
| env-263 | mdca: 1015–1043 |
| env-264 | mdca: 1015–1043 |
| env-265 | mdca: 1015–1043 |
| env-266 | mdca: 1015–1043 |
| env-267 | cloud: 1045–1073 |
| env-268 | cloud: 1045–1073 |
| env-269 | purview-controles: 1075–1093 |
| env-270 | purview-controles: 1075–1093 |
| env-271 | riesgo: 1094–1110 |
| env-272 | riesgo: 1094–1110 |
| env-273 | secure-score: 1112–1124 |
| env-274 | rbac: 214–379; permisos: 403–538; automatizacion: 2390–2516 |
| env-275 | rbac: 214–379 |
| env-276 | rbac: 214–379 |
| env-277 | permisos: 403–538 |
| env-278 | permisos: 403–538 |
| env-279 | rbac: 214–379; permisos: 403–538 |
| env-280 | ingesta: 1125–1367 |
| env-281 | ingesta: 1125–1367 |
| env-282 | ingesta: 1125–1367 |
| env-283 | ingesta: 1125–1367 |
| env-284 | ingesta: 1125–1367; permisos: 403–538 |
| env-285 | ingesta: 1125–1367 |
| env-286 | ingesta: 1125–1367 |
| env-287 | ingesta: 1125–1367 |
| env-288 | retencion-nativa: 1369–1461 |
| env-289 | retencion-nativa: 1369–1461 |
| env-290 | retencion-nativa: 1369–1461 |
| env-291 | retencion-sentinel: 1463–1546 |
| env-292 | retencion-sentinel: 1463–1546 |
| env-293 | retencion-sentinel: 1463–1546 |
| env-294 | retencion-sentinel: 1463–1546 |
| env-295 | ti: 1547–1599 |
| env-296 | ti: 1547–1599 |
| env-297 | ti: 1547–1599 |
| env-298 | scheduled: 1667–1735 |
| env-299 | custom: 1737–1828 |
| env-300 | custom: 1737–1828 |
| env-301 | custom: 1737–1828 |
| env-302 | scheduled: 1667–1735; custom: 1737–1828 |
| env-303 | scheduled: 1667–1735 |
| response-203 | correlacion: 1880–1986 |
| response-204 | correlacion: 1880–1986 |
| response-205 | correlacion: 1880–1986 |
| response-206 | correlacion: 1880–1986 |
| response-207 | investigacion: 1987–2104 |
| response-208 | investigacion: 1987–2104; respuesta: 2236–2388 |
| response-209 | investigacion: 1987–2104 |
| response-210 | investigacion: 1987–2104; tuning: 1829–1878 |
| response-211 | respuesta: 2236–2388 |
| response-212 | respuesta: 2236–2388 |
| response-213 | respuesta: 2236–2388; endpoint: 545–711 |
| response-214 | respuesta: 2236–2388 |
| response-215 | respuesta: 2236–2388 |
| response-216 | respuesta: 2236–2388 |
| response-217 | respuesta: 2236–2388 |
| response-218 | mdca: 1015–1043; respuesta: 2236–2388 |
| response-219 | respuesta: 2236–2388 |
| response-220 | respuesta: 2236–2388; cloud: 1045–1073 |
| response-221 | respuesta: 2236–2388 |
| response-222 | respuesta: 2236–2388 |
| response-223 | retencion-nativa: 1369–1461; respuesta: 2236–2388 |
| response-224 | automatizacion: 2390–2516 |
| response-225 | automatizacion: 2390–2516 |
| response-226 | automatizacion: 2390–2516 |
| response-227 | automatizacion: 2390–2516 |
| response-228 | automatizacion: 2390–2516 |
| response-229 | automatizacion: 2390–2516 |
| response-230 | automatizacion: 2390–2516 |
| response-231 | automatizacion: 2390–2516; respuesta: 2236–2388 |
| response-232 | automatizacion: 2390–2516; respuesta: 2236–2388 |
| hunt-117 | kql: 2656–2732 |
| hunt-118 | kql: 2656–2732 |
| hunt-119 | kql: 2656–2732 |
| hunt-120 | kql: 2656–2732 |
| hunt-121 | kql: 2656–2732 |
| hunt-122 | kql: 2656–2732 |
| hunt-123 | kql: 2656–2732 |
| hunt-124 | kql: 2656–2732 |
| hunt-125 | kql: 2656–2732 |
| hunt-126 | kql: 2656–2732 |
| hunt-127 | kql: 2656–2732 |
| hunt-128 | kql: 2656–2732 |
| hunt-129 | kql: 2656–2732 |
| hunt-130 | kql: 2656–2732 |
| hunt-131 | tablas: 2517–2654; kql: 2656–2732 |
| hunt-132 | tablas: 2517–2654 |
| hunt-133 | tablas: 2517–2654 |
| hunt-134 | tablas: 2517–2654 |
| hunt-135 | tablas: 2517–2654; kql: 2656–2732 |
| hunt-136 | kql: 2656–2732 |
| hunt-137 | kql: 2656–2732 |
| hunt-138 | hunting: 2105–2190 |
| hunt-139 | hunting: 2105–2190 |
| hunt-140 | hunting: 2105–2190; busquedas: 2191–2215 |
| hunt-141 | busquedas: 2191–2215 |
