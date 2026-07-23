# Flujo de trabajo del proyecto

## Principio general

La rama `main` representa siempre la versión estable del sitio. No se realizan cambios experimentales directamente allí.

## Cómo se incorporan modificaciones

1. Se crea una rama de trabajo con un nombre descriptivo.
2. Se modifican allí los archivos necesarios.
3. Se abre un Pull Request con una explicación clara de los cambios.
4. Se revisa el resultado.
5. Una vez aprobado, se fusiona el Pull Request con `main`.
6. GitHub Pages publica la nueva versión.

## Tipos de ramas recomendados

- `contenido/...` para cambios de textos, fechas, citas o referencias.
- `diseno/...` para cambios visuales y responsivos.
- `funcionalidad/...` para interacciones o comportamiento.
- `correccion/...` para errores puntuales.
- `configuracion/...` para tareas técnicas del repositorio.

Ejemplos:

```text
contenido/perfil-ivan-orbuch
diseno/portada-amanecer-alegorico
funcionalidad/navegacion-seccion-activa
correccion/titulos-movil
```

## Publicación segura

La publicación no debe depender de cambios manuales sobre la versión pública. El objetivo es que toda actualización quede registrada en GitHub y pueda revertirse.

Antes de aprobar un cambio deben verificarse, como mínimo:

- funcionamiento en escritorio;
- funcionamiento en celular;
- ausencia de palabras cortadas;
- navegación hacia abajo y hacia arriba;
- apertura de documentos y audios;
- enlaces;
- créditos y procedencias;
- ausencia de desplazamiento horizontal.

## Relación con ChatGPT

ChatGPT puede trabajar directamente sobre ramas del repositorio, crear o modificar archivos y preparar Pull Requests. La aprobación final y la publicación de cambios importantes quedarán visibles y controlables desde GitHub.

## Relación futura con Google Apps Script

Los proyectos basados en Apps Script, como JIDE, utilizarán un repositorio separado y sincronización mediante `clasp`. La lógica será equivalente:

```text
Apps Script ↔ clasp ↔ GitHub ↔ edición y revisión
```

Las credenciales privadas nunca deben guardarse en archivos públicos del repositorio. Se utilizarán secretos de GitHub o autenticación local cuando se configure esa integración.
