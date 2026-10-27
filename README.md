# Respawn Store — Plataforma E-Commerce Gaming Profesional

Plataforma de comercio electrónico de consolas de videojuegos, títulos aclamados, gift cards digitales y periféricos gaming. Diseñada bajo una arquitectura web modular, escalable y de cero dependencias externas de compilación, lista para ejecutarse directamente en cualquier navegador o servidor de producción (cPanel, Apache, Nginx, Hostinger, GitHub Pages) sin necesidad de Node.js ni herramientas de empaquetado en el servidor.

---

## Características Principales

### 1. Carrito de Compras Completo & Reactivo (`js/modules/cart.js`)
- **Drawer Lateral Deslizante**: Apertura suave desde cualquier página mediante el icono en la barra de navegación.
- **Barra de Envío Gratis Dinámica**: Calcula en tiempo real cuánto saldo falta para alcanzar el envío gratuito (a partir de S/. 299.00).
- **Control de Cantidades**: Aumentar, reducir o eliminar productos directamente en el cajón con recálculo automático de subtotales.
- **Sistema de Cupones de Descuento**: Soporta cupones promocionales interactivos (ej. `RESPAWN10` para un 10% de descuento) con retroalimentación visual inmediata.
- **Persistencia en LocalStorage**: Mantiene los productos y cupones guardados entre sesiones y recargas de página.
- **Finalización de Compra (Checkout)**: Modal interactivo con formulario de datos de entrega, selector de método de pago (Yape/Plin, Tarjetas, BCP) y generación de recibo de compra con código de pedido (`#RSP-XXXXXX`).

### 2. Catálogo Reactivo en Tiempo Real (`js/modules/catalog.js`)
- **Filtrado por Píldoras de Categoría**: Alterna instantáneamente entre *Todas*, *PlayStation*, *Xbox*, *Nintendo* y *Consolas Portátiles* sin recargar la página.
- **Ordenación Multidimensional**: Ordena productos por mayor/menor precio, popularidad o alfabéticamente.
- **Buscador Predictivo en Barra de Navegación**: Autocompletado y resultados instantáneos con vista previa de imagen, precio y categoría.
- **Modal de Vista Rápida (QuickView)**: Inspección de especificaciones técnicas, fotos, disponibilidad de stock, selector de cantidad y botón directo de compra.

### 3. Lista de Deseos / Favoritos (`js/modules/wishlist.js`)
- Alternador interactivo con icono de corazón en cada producto.
- Modal dedicado con listado de artículos guardados y opción de *"Mover al carrito"*.
- Contador numérico sincronizado en el header.

### 4. Sistema de Notificaciones Toast (`js/modules/toast.js`)
- Notificaciones emergentes animadas no intrusivas para acciones clave: producto añadido, cupón aplicado, elementos eliminados y formularios enviados.

### 5. Rendimiento y Optimización de Medios
- **Reducción del 55% en peso de imágenes**: Archivos JPEG optimizados a 80% de calidad sin pérdida visual, bajando el peso total de 122 MB a ~57 MB.
- **Eliminación de recursos obsoletos**: Retirada de videos y audios pesados innecesarios.
- **Carga diferida (`loading="lazy"`)**: Aplicada en todas las imágenes secundarias para optimizar el First Contentful Paint (FCP).

---

## Estructura del Proyecto

```text
respawn-store/
├── index.html                 # Página de inicio con Hero, Catálogo, Lo más jugado y Promociones
├── pages/                     # Todas las vistas secundarias del sistema
│   ├── productos.html         # Catálogo completo con filtros avanzados y ordenamiento
│   ├── juegos.html            # Catálogo de videojuegos con filtro por plataforma
│   ├── giftcards.html         # Tarjetas de regalo digitales con selector de saldo interactivo
│   ├── comunidad.html         # Reseñas verificadas, beneficios gamer y actividades
│   ├── blog.html              # Artículos técnicos y novedades de la industria
│   ├── guias.html             # Tutoriales paso a paso de optimización y mantenimiento
│   ├── contacto.html          # Formulario con validación interactiva y horarios de atención
│   ├── faq.html               # Acordeón dinámico de preguntas frecuentes
│   ├── ayuda.html             # Centro de ayuda integral con buscador temático
│   └── nosotros.html          # Filosofía, garantías oficiales y equipo Respawn
├── css/
│   ├── base.css               # Reset, tipografía, paleta de colores gaming y estructura base
│   ├── components.css         # Navbar sticky, dropdowns, tarjetas de producto, modales y toasts
│   └── cart.css               # Cajón lateral del carrito, checkout, cupones y recibos
├── js/
│   ├── data/
│   │   ├── products.js        # Base de datos estructurada de hardware, consolas y accesorios
│   │   └── games.js           # Base de datos de videojuegos y tarjetas de regalo
│   ├── modules/
│   │   ├── cart.js            # Lógica reactiva del carrito, checkout y persistencia
│   │   ├── wishlist.js        # Lógica de lista de deseos y favoritos
│   │   ├── catalog.js         # Filtrado, ordenamiento y renderizado del catálogo
│   │   ├── quickview.js       # Modal de detalles rápidos de producto
│   │   ├── search.js          # Buscador inteligente en tiempo real
│   │   └── toast.js           # Notificaciones animadas del sistema
│   └── main.js                # Inicialización común, navbar unificado y pie de página
├── imagenes/                  # Catálogo de imágenes optimizadas
└── README.md                  # Documentación técnica del proyecto
```

---

## Despliegue en Servidores Web (Producción)

> [!NOTE]
> **No se requiere instalar Node.js, Vite ni dependencias en el servidor.**

Para publicar esta tienda en cualquier servidor web (cPanel, Hostinger, GoDaddy, Apache, Nginx o GitHub Pages):

1. **Subida directa**: Sube todos los archivos y carpetas del repositorio (`index.html`, `pages/`, `css/`, `js/`, `imagenes/`) directamente al directorio raíz de tu servidor web (habitualmente `public_html/` o `www/`).
2. **Compatibilidad universal**: Todas las rutas relativas (`./`, `../`) están resueltas dinámicamente, por lo que el sitio funcionará inmediatamente tanto en un dominio principal como dentro de un subdominio o subcarpeta.
3. **Prueba local**: Puedes abrir `index.html` directamente haciendo doble clic o mediante extensiones como *Live Server* en VS Code.

---

## Cupones de Prueba Disponibles

- **`RESPAWN10`**: Otorga un 10% de descuento directo en el subtotal.
- **`GAMER20`**: Otorga un 20% de descuento directo en el subtotal.

---

## Licencia

Desarrollado para portafolio de Ingeniería de Sistemas. Todos los derechos reservados © 2026 Respawn Store Perú.
