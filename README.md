# SC-200 Lab

Banco de práctica renovado íntegramente desde los apuntes privados SC-200.md: **276 preguntas originales en español**, con explicaciones para todas las opciones. La revisión 7 añade 100 escenarios y conserva intactas las 176 preguntas originales anteriores. Las 500 heredadas siguen disponibles para progreso e historial, fuera del banco activo.

## Usarlo

Abre `index.html` directamente o utiliza el servidor local. No requiere cuenta, compilación ni subir los apuntes.

- Simulacro: 50 preguntas del banco renovado, 21 de entorno, 19 de respuesta y 10 de hunting; 90 minutos de práctica.
- Estudio: selección por dominio y tema, corrección inmediata y razones para cada alternativa.
- Banco: búsqueda por concepto o ID y referencia a secciones/líneas del documento privado.
- Archivo anterior: consulta de las 500 preguntas retiradas y filtro de guardadas anteriores.
- Progreso: exportación/importación JSON, marcadores, estadísticas y resultados conservados. Las sesiones antiguas muestran sus preguntas originales.

El panel calcula dominio solo del banco activo. El historial y las estadísticas anteriores no se transfieren a preguntas diferentes. El repaso de un resultado antiguo conserva su revisión. No hay sincronización entre dispositivos ni entre copia local y web pública: utiliza **Mi progreso → Exportar / Importar**.

## Cobertura y fuente

Consulta [REVISION-7.md](REVISION-7.md), con el alcance y la relación verificable de las 100 preguntas añadidas. [REVISION-6.md](REVISION-6.md) conserva la trazabilidad de las 176 anteriores. Hay 29 temas, selección única/múltiple y 13 ejercicios con código. Distribución del banco: 145 / 66 / 65; los pesos del simulacro siguen siendo 21 / 19 / 10. Las ambigüedades pendientes permanecen documentadas en [REVISION-5.md](REVISION-5.md). [REVIEW.md](REVIEW.md) conserva el historial de revisiones.

No se consultaron enlaces ni contenidos de estudio externos para la renovación. Las referencias externas anteriores solo se conservan en el archivo histórico. El objetivo del 80% y el reloj son herramientas de práctica, sin equivalencia con la escala oficial ni garantía de aprobar.

## Desarrollo y comprobación

```sh
npm test
npm run check:notes
npm run coverage
npm run test:browser
npm run serve
```

`check:notes` verifica offline el documento original y 33 rangos mediante SHA-256; admite otra ruta con `python3 tests/verify-notes.py /ruta/SC-200.md`. No copia el texto al sitio. El comprobador histórico `check:sources` consulta internet y no se utiliza en esta renovación.

Las pruebas del navegador utilizan `playwright-core` y Chromium local (`/usr/bin/chromium`, configurable con `CHROMIUM_PATH`). La suite `tests/e2e.mjs` inicia su propio servidor en un puerto libre, bloquea solicitudes externas y deja capturas en `/tmp/sc200-browser-results`. `tests/browser.py` es una entrada compatible a esa misma suite. El sitio no requiere dependencias de ejecución.

`core.js` gestiona selección, evaluación y validación. `notes.js` contiene los 63 escenarios originales previos; `renewal.js` archiva las 500 preguntas heredadas y reconstruye los grupos activos; `fresh-bank.js` incorpora los 113 escenarios de la revisión 6; `expansion.js` añade los 100 de la revisión 7 con IDs explícitos. `notes-source.js` contiene solo encabezados, líneas y huellas del origen. Los archivos originales del banco y `references.js` se mantienen para recuperar revisiones históricas.

Nunca reasignar un ID a otro significado ni insertar filas que renumeren los antiguos. Las pruebas comparan las huellas de todas las preguntas publicadas en revisiones 4, 5 y 6 y validan sus copias de progreso. El documento privado y los datos sensibles del laboratorio no se incluyen en el repositorio.
