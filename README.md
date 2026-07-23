# Educar el cuerpo dentro y fuera del aula

Recorrido documental e interactivo sobre educación corporal durante el primer peronismo, basado en el trabajo de Iván Orbuch.

## Estado del proyecto

El repositorio contiene una primera versión autónoma y editable del sitio. La página está construida con HTML, CSS y JavaScript sin dependencias de compilación.

Incluye:

- ocho secciones de recorrido;
- navegación y progreso de lectura;
- mural alegórico realizado como SVG incorporado al código;
- cronología y herramientas conceptuales;
- preguntas con retroalimentación inmediata;
- actividad de clasificación de evidencias;
- producción final con guardado local y descarga;
- síntesis accesible del texto académico;
- publicación automática mediante GitHub Pages.

## Flujo de trabajo

1. La rama `main` conserva la versión estable y publicada.
2. Cada grupo de cambios se realiza en una rama nueva.
3. Los cambios se presentan mediante un Pull Request.
4. La publicación se realiza después de incorporar el Pull Request a `main`.
5. El flujo de GitHub Actions publica automáticamente la nueva versión.

## Estructura

```text
educar-el-cuerpo/
├── index.html
├── css/
│   └── styles.css
├── js/
│   └── app.js
├── contenido/
│   ├── contenidos.js
│   └── orbuch-texto-accesible.txt
├── .github/workflows/
│   └── pages.yml
├── GUIA-EDICION.md
├── docs/
│   └── FLUJO-DE-TRABAJO.md
└── README.md
```

## Edición rápida

Desde la página principal del repositorio, presionar la tecla `.` abre el editor web `github.dev`.

Los cambios de contenido se concentran principalmente en `contenido/contenidos.js`. El diseño se encuentra en `css/styles.css` y las interacciones en `js/app.js`.

La guía completa está disponible en `GUIA-EDICION.md`.

## Recursos documentales

La síntesis accesible está alojada dentro del repositorio. Durante esta primera etapa, los enlaces a los cuadernillos digitalizados y al documento académico original apuntan de manera transitoria al sitio público de ChatGPT Sites. La migración de esos archivos binarios al repositorio se realizará en una etapa posterior, sin afectar la edición del código.

## Privacidad

El sitio no solicita datos personales ni envía respuestas a un servidor. El texto de la producción final se guarda únicamente en el almacenamiento local del navegador del usuario.
