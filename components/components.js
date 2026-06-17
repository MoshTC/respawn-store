/* =============================================
   FAVICON
   Se inyecta dinámicamente para que todas las páginas
   que carguen components.js lo hereden automáticamente.
   ============================================= */
const favicon = document.createElement("link");
favicon.rel = "icon";
favicon.type = "image/png";
favicon.href = "../imagenes/logoresblue.png";
document.head.appendChild(favicon);

/* =============================================
   ARRAY DE PÁGINAS
   Define la estructura del navbar.
   Cada objeto es un link del menú:
     - label: texto visible
     - href: ruta de la página (usando ../ porque todas las páginas están un nivel adentro)
     - dropdown: (opcional) array de sub-links que aparecen al hacer hover
   Para agregar una página nueva, añade un objeto a este array.
   ============================================= */
const paginas = [
  {
    label: "Inicio",
    href: "../paginas/Inicio.html",
  },
  {
    label: "Productos",
    href: "../paginas/productos.html",
    dropdown: [
      /* cada item del dropdown: label, icono Tabler y href */
      {
        label: "Gift Cards",
        icon: "ti-gift",
        href: "../paginas/giftcards.html",
      },
      {
        label: "Juegos",
        icon: "ti-device-gamepad-2",
        href: "../paginas/Juegos.html",
      },
    ],
  },
  {
    label: "Comunidad",
    href: "../paginas/comunidad.html",
    dropdown: [
      {
        label: "Blog",
        icon: "ti ti-file-description",
        href: "../paginas/Blog.html",
      },
      {
        label: "Consejos y guias",
        icon: "ti ti-dual-screen",
        href: "../paginas/consejosYguias.html",
      },
    ],
  },
  {
    label: "Ayuda",
    href: "../paginas/ayuda.html",
    dropdown: [
      /* cada item del dropdown: label, icono Tabler y href */
      {
        label: "Preguntas frecuentes",
        icon: "ti-help-circle",
        href: "../paginas/preguntas-frecuentes.html",
      },
      {
        label: "Formulario de contacto",
        icon: "ti-mail",
        href: "../paginas/formulario-contacto.html",
      },
    ],
  },
];

/* =============================================
   buildNav()
   Lee el array paginas y construye el HTML del navbar dinámicamente.
   Si una página tiene dropdown, genera el li con el menú desplegable.
   Si no tiene dropdown, genera un li simple.
   Inyecta el HTML en <div id="navbar">.
   ============================================= */
function buildNav() {
  const links = paginas
    .map((p) => {
      if (p.dropdown) {
        /* construye los links internos del dropdown */
        const items = p.dropdown
          .map(
            (d) => `
        <a href="${d.href}"><i class="ti ${d.icon}"></i> ${d.label}</a>
      `,
          )
          .join("");
        /* li con clase nav-item-dropdown activa el CSS del menú desplegable */
        return `
        <li class="nav-item-dropdown">
          <a href="${p.href}">${p.label} <i class="ti ti-chevron-down nav-arrow"></i></a>
          <div class="nav-dropdown">${items}</div>
        </li>`;
      }
      /* li simple sin dropdown */
      return `<li><a href="${p.href}">${p.label}</a></li>`;
    })
    .join("");

  document.getElementById("navbar").innerHTML = `
    <nav>
      <!-- logo: link a la página principal -->
      <a href="../index/index.html">
        <img src="../imagenes/logoresblue.png" alt="Respawn Store" height="40">
      </a>
      <!-- links generados desde el array paginas -->
      <ul class="nav-links">${links}</ul>
      <div class="search-box">
        <i class="ti ti-search" aria-hidden="true"></i>
        <input type="text" placeholder="Buscar consolas accesorios..." aria-label="Buscar productos">
      </div>
      <!-- íconos de redes sociales con aria-label para accesibilidad -->
      <div class="socials">
        <a href="#" aria-label="YouTube"><i class="ti ti-brand-youtube"></i></a>
        <a href="#" aria-label="Discord"><i class="ti ti-brand-discord"></i></a>
        <a href="#" aria-label="Twitter"><i class="ti ti-brand-twitter"></i></a>
        <a href="#" aria-label="Instagram"><i class="ti ti-brand-instagram"></i></a>
      </div>
    </nav>
  `;
}

/* =============================================
   buildFooter()
   Construye el HTML del footer y lo inyecta en <div id="site-footer">.
   Los links de Soporte apuntan a las páginas de ayuda.
   A diferencia del navbar, el footer es estático (no se genera desde un array).
   ============================================= */
function buildFooter() {
  document.getElementById("site-footer").innerHTML = `
    <footer>
      <!-- columna marca: logo + descripción -->
      <div class="footer-brand">
        <a href="../index/index.html" class="logo" style="font-size:20px">RESPAWN<span> STORE</span></a>
        <p>Tu tienda gaming de confianza en Perú. Consolas, juegos y accesorios al mejor precio con garantía oficial.</p>
      </div>
      <!-- columna productos -->
      <div>
        <div class="footer-title">Productos</div>
        <a href="#">PlayStation</a>
        <a href="#">Xbox</a>
        <a href="#">Nintendo</a>
        <a href="#">Accesorios</a>
        <a href="#">Juegos</a>
      </div>
      <!-- columna comunidad -->
      <div>
        <div class="footer-title">Comunidad</div>
        <a href="#">Discord</a>
        <a href="#">YouTube</a>
        <a href="#">Torneos</a>
        <a href="#">Blog</a>
      </div>
      <!-- columna soporte: links a las páginas de ayuda -->
      <div>
        <div class="footer-title">Soporte</div>
        <a href="../paginas/ayuda.html">Centro de ayuda</a>
        <a href="../paginas/preguntas-frecuentes.html">Preguntas frecuentes</a>
        <a href="../paginas/formulario-contacto.html">Contacto</a>
      </div>
    </footer>
    <div class="footer-copy">© 2026 Respawn Store · Todos los derechos reservados · Lima, Perú</div>
  `;
}

/* ejecuta las dos funciones al cargar el script */
buildNav();
buildFooter();
