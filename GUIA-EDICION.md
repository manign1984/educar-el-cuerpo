# Guía de edición autónoma

## Edición rápida desde el navegador

1. Abrir el repositorio en GitHub.
2. Presionar la tecla `.` para iniciar el editor web `github.dev`.
3. Modificar los textos en `contenido/contenidos.js`.
4. Guardar los cambios desde la pestaña **Source Control**.
5. Crear una rama nueva y un Pull Request.
6. Incorporar el Pull Request a `main` cuando la revisión sea satisfactoria.

## Archivos principales

- `index.html`: estructura semántica de las ocho secciones.
- `contenido/contenidos.js`: cronología, conceptos, preguntas, fuentes y evidencias.
- `css/styles.css`: colores, tipografías, diseño responsivo y composición visual.
- `js/app.js`: navegación, actividades, retroalimentación y guardado local.
- `.github/workflows/pages.yml`: publicación automática en GitHub Pages.

## Cambios frecuentes

### Cambiar un texto

Buscar la frase en `contenido/contenidos.js` o `index.html` y reemplazarla sin borrar las comillas, comas o llaves que organizan el archivo.

### Cambiar un color

Modificar las variables que aparecen al comienzo de `css/styles.css`, por ejemplo:

```css
--navy: #071b35;
--gold: #f3c552;
--red: #cf3d2c;
```

### Incorporar una imagen

Crear la carpeta `assets/`, subir la imagen y referenciarla con una ruta relativa como `assets/nombre.jpg`.

### Recuperar una versión anterior

Abrir la pestaña **Commits**, elegir la versión y revisar o revertir el cambio. No es necesario conservar copias numeradas de toda la carpeta.
