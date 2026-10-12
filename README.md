# SC-200 Lab

Simulacro independiente con 563 preguntas en español. La revisión 5 añade 63 escenarios basados exclusivamente en los apuntes privados actualizados y aclara 7 preguntas anteriores. No contiene preguntas oficiales ni reproduce un examen real.

## Usarlo

Abre `index.html` en un navegador moderno. No necesitas instalar dependencias, iniciar sesión ni subir apuntes. También funciona publicado como sitio estático.

- Simulacro: 50 preguntas aleatorias; 21 de entorno, 19 de respuesta y 10 de hunting. Cronómetro de práctica de 90 minutos.
- Estudio: sesiones de hasta 10, 25 o 50 preguntas, filtradas por dominio y tema; corrección inmediata al confirmar.
- Repaso: última respuesta incorrecta, preguntas guardadas y resultados de las últimas 50 sesiones.
- Banco: búsqueda de conceptos y respuestas explicadas. Las preguntas nuevas explican cada opción e indican la sección y las líneas de los apuntes que las sustentan; las anteriores conservan sus referencias históricas.
- Progreso: guardado local, exportación e importación JSON validadas. El reloj de examen sigue corriendo al cerrar la página.

El progreso no se sincroniza entre dispositivos ni entre la copia local y el sitio publicado. Usa **Mi progreso → Exportar / Importar** para trasladarlo. No se envían respuestas a un servidor. Abrir referencias de Learn sí contacta con Microsoft; usar el sitio publicado contacta con su proveedor de alojamiento.

## Alcance y revisión

Consulta [REVISION-5.md](REVISION-5.md) para el análisis de lagunas, las ambigüedades y la trazabilidad por pregunta; [REVIEW.md](REVIEW.md) conserva el historial. La distribución del banco es 245 / 202 / 116, con 66 temas y 24 ejercicios con consultas KQL visibles. El reparto del simulacro sigue siendo 21 / 19 / 10, independiente del tamaño de cada dominio. El 80% es un objetivo de entrenamiento, no una conversión de la puntuación oficial ni una garantía de aprobar.

## Desarrollo y pruebas

Sin compilación. HTML, CSS y JavaScript sin dependencias de ejecución.

```sh
npm test
npm run coverage
npm run check:notes
npm run test:browser
npm run serve
```

`tests/e2e.mjs` utiliza `playwright-core` y Chromium instalado localmente (`/usr/bin/chromium`, configurable con `CHROMIUM_PATH`). Arranca su propio servidor local en un puerto libre, bloquea solicitudes externas y guarda capturas en `/tmp/sc200-browser-results`. El sitio funciona sin estas dependencias de desarrollo. La suite alternativa `tests/browser.py` requiere Python Playwright y un servidor en el puerto `4173`.

`check:notes` verifica offline el SHA-256 del documento privado y sus 29 secciones; admite otra ubicación mediante `python3 tests/verify-notes.py /ruta/SC-200.md`. Si se actualizan los apuntes, fallará hasta revisar el contenido y regenerar conscientemente las referencias. No incorpora el documento al proyecto. El comprobador histórico `check:sources` sí consulta internet y **no se ejecutó** en esta revisión.

`core.js` implementa selección, puntuación y validación. El banco original está en `environment.js`, `response.js` y `hunting.js`; `references.js` mantiene revisiones históricas. `notes.js` incorpora la ampliación con IDs explícitos y archiva las siete redacciones anteriores para sesiones e historiales existentes. `notes-source.js` contiene solo encabezados, líneas y huellas del origen privado; `sources.js` conserva las referencias externas anteriores.

No insertar filas que renumeren IDs antiguos. Una modificación del significado o de los índices correctos requiere una migración; las siete aclaraciones de esta revisión mantienen ambos. Se conservan IDs, marcadores, estadísticas y sesiones de revisión 4. Las pruebas comparan las 500 preguntas anteriores con sus huellas y reimportan una copia sintética de progreso.

No se publica el archivo privado `SC-200.md` ni `practiceSC200.txt`.
