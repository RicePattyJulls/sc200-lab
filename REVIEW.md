# Criterios y cobertura · SC-200 Lab

La actualización vigente es la [revisión 7](REVISION-7.md): 276 preguntas originales (100 nuevas y 176 conservadas), todo el banco activo basado exclusivamente en SC-200.md. Las 500 preguntas heredadas se conservan para progreso e historial, fuera de las prácticas y simulacros nuevos. El resto de este documento mantiene el registro histórico y los recuentos de las revisiones anteriores.

Fecha de revisión: 8 de septiembre de 2026. Banco independiente de práctica, no material oficial ni garantía de cobertura exhaustiva.

Revisión 3: banco revisado contra `SC-200.md` corregido; 3 correcciones y 12 sustituciones por cobertura, conservando 500 preguntas, 50 grupos y el reparto 210/190/100.

Revisión 4: el separador de respuestas múltiples pasa de `~` a `§`, para que los operadores `KQL` `=~` e `in~` puedan aparecer en una respuesta sin partirla. Corrige `hunt-004`, `hunt-007` y `hunt-052`.

## Base

Se revisaron los capítulos de los apuntes SC-200 sobre recorridos, licencias y onboarding, permisos, protección, ingesta, almacenamiento, inteligencia, detección, correlación, investigación, hunting, respuesta, automatización y tablas/KQL, incluido su apéndice SOC. Se seleccionaron los conceptos pertinentes para la [guía oficial de SC-200, objetivos del 28 de julio de 2026](https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/sc-200).

No se utilizó la evaluación antigua como autoridad de respuestas ni como fuente de una copia de sus 50 preguntas. Los escenarios son originales. Los apuntes originales no se modificaron ni se incorporan al sitio publicado.

## Distribución del banco

| Dominio oficial | Preguntas | Peso elegido | En cada simulacro |
| --- | ---: | ---: | ---: |
| Gestión del entorno SecOps | 210 | 42% | 21 |
| Respuesta a incidentes | 190 | 38% | 19 |
| Threat hunting | 100 | 20% | 10 |

Los pesos elegidos están dentro de los intervalos 40–45%, 35–40% y 20–25% de la guía. Esta selección es una decisión de diseño del simulacro; no es un formato de examen prescrito por Microsoft.

## Mapa a objetivos

| Área de objetivos | Temas del banco | Apuntes relacionados |
| --- | --- | --- |
| Automatización y entorno Defender | Notificaciones, tuning, device groups, indicadores, ASR, disrupción, AIR, workflows | 1, 2, 3, 7, 12 |
| Configuración de Sentinel | Roles, workbooks, retención, data tiers, costos, salud y optimización | 2, 5, 10, 12 |
| Ingesta | AMA, DCR/DCRA, Windows, WEF, Syslog/CEF, Azure Policy, diagnostic settings, APIs, tablas propias, Custom Data Collection | 4, 13 |
| Detecciones | Scheduled, NRT, custom detections, acciones, entity mapping, anomalías, UEBA y MITRE | 6, 7, 8 |
| Investigación XDR y Sentinel | Triage, alertas/evidencias, correlación, casos, productos de seguridad y Copilot | 8, 9 |
| Investigación y respuesta MDE | Timeline, archivos, entidades, aislamiento, contención, Live response y paquetes | 9, 11 |
| Actividad Microsoft 365 | Audit, eDiscovery, Graph activity logs, correo y Purview | 3, 9, 11, 13 |
| Hunting Defender | Tablas, KQL, procesos, identidades, correo, threat analytics y grafos | 10, 13, apéndice SOC |
| Hunting Sentinel | Queries, bookmarks, ASIM/watchlists, jobs, summary rules, notebooks y MCP | 10, 13, apéndice SOC |

La página **Cobertura y fuentes** desglosa los 50 temas y el progreso por tema. `npm run coverage` genera el inventario exacto. El mapa agrupa objetivos; no demuestra que cada detalle de cada capítulo aparezca como pregunta individual.

## Decisiones de precisión

- Se distingue el indicador de archivo de MDE de las listas de permiso/bloqueo de correo de MDO.
- Roles de ejecución manual, edición de Logic Apps y ejecución por la identidad de Sentinel se tratan por separado. Editar un recurso no concede por sí solo autoridad para asignar RBAC.
- No se presenta «todo indicador inactivo carece de target» como regla universal documentada.
- `Mark user as compromised` requiere identificadores de objeto admitidos para la acción. No se confunde con tener un UPN visible en el resultado.
- Las recomendaciones actuales sobre columnas de custom detections no se convierten en una obligación universal heredada de exámenes antiguos.
- El cambio de AIR de MDE documentado para el 1/9/2026 se identifica explícitamente y no se extrapola a MDO. La página oficial contiene aún párrafos históricos: el banco no prescribe iniciar manualmente la experiencia retirada.
- La DCR genérica de Windows Event Logs puede escribir en `Event`; el conector de seguridad usa `SecurityEvent` y Windows Forwarded Events usa `WindowsEvent`. No se aplica a una ruta lo que corresponde a otra.
- Se separan ingesta, almacenamiento, retención y superficie de consulta. La aparición de una tabla en el esquema no prueba que esté poblada.
- El soporte de transformaciones se expresa condicionado a la ruta y la tabla; no se infiere simplemente de `API-based`.
- Para el grafo clásico, las entidades importan. Esto no se generaliza a «solo dos tipos de incidentes pueden investigarse» en todas las experiencias actuales.
- `AirInvestigation` no representa toda la auditoría posible de Defender. La tabla de servicios compatibles de Purview respalda el ámbito del tipo.
- La cabecera MCP de tenant y el ID del workspace resuelven ámbitos distintos. El valor `default` no se usa como solución universal para cualquier workspace.

## Qué no se promete

El banco mezcla fundamentos y decisiones operativas; no se presenta como una réplica de dificultad, número, duración ni formato de la prueba real. No cubre todas las variaciones de licencia, todas las regiones, cada preview, cada columna del apéndice SOC ni todas las APIs posibles. Los límites y pantallas del producto pueden cambiar: cada pregunta ofrece referencias para su consulta.

No es un laboratorio conectado a un tenant: los ejercicios KQL son de lectura y razonamiento; no se han ejecutado contra datos de producción del usuario. Las pruebas automáticas validan estructura, selección, persistencia, puntuación y funcionamiento del sitio, no certifican la corrección de Microsoft ni sustituyen una revisión editorial de cada actualización.

## Verificación técnica

### Revisión del feedback — 8 de septiembre de 2026

Conclusión: se aceptan los ajustes de precisión y equilibrio, no la exclusión automática de temas que no aparecen literalmente en un objetivo. La guía permite temas relacionados. La distribución por subtema es una decisión editorial, no un peso publicado por Microsoft.

- `MDI`: se delimita v3.x con `LocalSystem` y v2.x con una gMSA opcional. [Action accounts](https://learn.microsoft.com/en-us/defender-for-identity/deploy/manage-action-accounts).
- Hunting: cinco preguntas de operación pasan a gestión del entorno; se conservan auditoría KQL, un bookmark, una watchlist y una pregunta ASIM. Se refuerzan escenarios y requisitos de [hunting graph](https://learn.microsoft.com/en-us/defender-xdr/advanced-hunting-graph), alcance potencial de [blast radius](https://learn.microsoft.com/en-us/defender-xdr/investigate-incidents#blast-radius) y [Sentinel graph](https://learn.microsoft.com/en-us/azure/sentinel/datalake/sentinel-graph-overview).
- Indicadores: siete preguntas MDE/excepciones permanecen en el grupo; tres se sustituyen por rutas TI de Sentinel. El grupo dedicado de diez preguntas TI permanece intacto. No se declara que los indicadores MDE estén fuera del examen.
- Configuración de workloads: ocho preguntas se sustituyen por operación, identificadores de acciones y requisitos de recopilación; los escenarios de investigación/remediación de MDO, MDCA y Purview permanecen en respuesta.
- APIs: se sustituyen paginación y DCE por requisitos de custom tables; se conservan CCF, Logs Ingestion API y DCR.
- `AIR`: el aviso sobre retirada del inicio manual no demuestra que también desaparezca la acción automática de una custom detection. No se plantea esa supuesta contradicción como hecho ni se retira AIR del temario. [Aviso de MDE](https://learn.microsoft.com/en-us/defender-endpoint/automated-investigations), [acciones de custom detections](https://learn.microsoft.com/en-us/defender-xdr/custom-detection-rules).
- `Blast radius`: no se introduce una pregunta de «siete saltos»; la página también enumera límites por entorno. Se evalúan los límites del modelo, la frescura y el alcance RBAC.

### Registro puntual de cambios

26 preguntas revisadas o sustituidas; total del banco sin cambios:

- `env-042`: sensores MDI v3.x y LocalSystem.
- `response-084`: error de permisos con sensores v2.x y gMSA explícita.
- `env-025`: ingesta TI mediante TAXII.
- `env-026`: Threat Intelligence Upload API.
- `env-028`: ingesta TI no equivale a bloqueo en endpoints.
- `env-112`: sufijo `_CL` al crear custom tables.
- `env-116`: columna `TimeGenerated` y transformación.
- `env-201`: LAQueryLogs, trasladada desde `hunt-065`.
- `env-202`: SentinelAudit, trasladada desde `hunt-066`.
- `env-203`: Usage, trasladada desde `hunt-067`.
- `env-204`: Heartbeat, trasladada desde `hunt-068`.
- `env-205`: _BilledSize, trasladada desde `hunt-069`.
- `env-206`: SID para Disable user de AD local.
- `env-207`: AccountObjectId para acciones sobre identidades Entra.
- `env-208`: dynamic tags y ejecución previa de Asset Rule Management.
- `hunt-065`: Attack paths to critical asset.
- `hunt-066`: Entity relationship map.
- `hunt-067`: Paths between two entities.
- `hunt-068`: requisitos de acceso a hunting graph.
- `hunt-069`: escenario, filtros y Run scenario.
- `hunt-073`: Access to key vaults.
- `hunt-075`: blast radius como propagación potencial, no confirmada.
- `hunt-076`: alcance RBAC del blast radius.
- `hunt-077`: límites de visibilidad y del modelo.
- `hunt-091`: concepto y utilidad de Microsoft Sentinel graph.
- `hunt-093`: Explore connected assets en custom graphs (preview).

Además: `hunt-094` enlaza ahora la documentación de blast radius; `env-077` conserva la corrección terminológica a `temporary automation rule`.

Compatibilidad: las sesiones anteriores conservan el texto y la puntuación originales de las preguntas cambiadas. Su dominio y marcadores no se transfieren a preguntas sustituidas; los resultados históricos se conservan. Las nuevas prácticas usan la revisión actual.

### Pruebas

- 500 IDs y enunciados distintos; reparto 210/190/100; 50 temas.
- Generación de 100 simulacros de prueba: 50 preguntas sin repetición interna y reparto 21/19/10.
- Puntuación exacta en selección múltiple; prevención del doble conteo; validación de copias JSON.
- Recorridos en Chromium de escritorio y móvil: estudio, examen, feedback, reanudación, reloj vencido, exportación/importación, búsqueda y apertura local `file://`.
- Referencias consultadas desde Microsoft Learn y comprobación automática de disponibilidad de URLs. Una respuesta HTTP correcta solo verifica disponibilidad; los cambios semánticos requieren revisión.

Para reportar un posible error, conserva el ID visible de pregunta y el enlace de Learn relevante. Las respuestas no se aprenden por posición: las opciones se barajan en cada sesión.
