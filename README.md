# Respawn Store

Tienda gaming online de consolas, videojuegos y accesorios.
Proyecto web desarrollado para el curso de Aplicaciones Web.


## Estructura del proyecto

respawn-store/
├── components/   → navbar y footer compartidos
├── css/          → estilos del sitio
├── docs/         → contenido de texto de cada página
├── imagenes/     → imágenes del sitio
├── index/        → página principal
├── paginas/      → páginas internas
└── script/       → archivos JavaScript

## Arquitectura

### Componentes compartidos
El navbar y el footer son iguales en todas las páginas. En lugar de copiarlos
en cada archivo, se generan desde `components/components.js`, que se carga en
cada página. Si se modifica el navbar o el footer, el cambio se aplica a todo
el sitio automáticamente.

### Estilos
- `css/base.css` → estilos globales: colores, navbar, footer, botones y breadcrumb
- Cada página cuenta con su propio archivo CSS para sus estilos particulares

### Scripts
Cada página carga únicamente el JavaScript que necesita, evitando código
innecesario.

## Secciones del sitio

- **Inicio** – 
- **Productos** – 
- **Comunidad** – 
- **Ayuda** – soporte al cliente, dividido en:
  - Centro de Ayuda
  - Preguntas Frecuentes
  - Formulario de Contacto

## Cómo ver el proyecto

Abre el archivo `index/index.html` en tu navegador.
