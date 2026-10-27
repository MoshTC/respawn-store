(function() {
  'use strict';

  // Determinar la ruta base según la ubicación del archivo
  const isPagesDir = window.location.pathname.includes('/pages/') || window.location.pathname.includes('/paginas/');
  const basePath = isPagesDir ? '../' : './';
  const pagesPath = isPagesDir ? './' : 'pages/';

  // 1. Inyectar Favicon dinámicamente si no existe
  if (!document.querySelector("link[rel*='icon']")) {
    const favicon = document.createElement('link');
    favicon.rel = 'icon';
    favicon.type = 'image/png';
    favicon.href = `${basePath}imagenes/logoresblue.png`;
    document.head.appendChild(favicon);
  }

  // 2. Definición de Navegación
  const NAV_LINKS = [
    { label: "Inicio", href: `${basePath}index.html`, id: "nav-home" },
    {
      label: "Productos",
      href: `${pagesPath}productos.html`,
      dropdown: [
        { label: "Ver Todo el Catálogo", icon: "ti-layout-grid", href: `${pagesPath}productos.html` },
        { label: "Videojuegos", icon: "ti-device-gamepad-2", href: `${pagesPath}juegos.html` },
        { label: "Gift Cards Digitales", icon: "ti-gift", href: `${pagesPath}giftcards.html` }
      ]
    },
    {
      label: "Comunidad",
      href: `${pagesPath}comunidad.html`,
      dropdown: [
        { label: "Zona Gamer", icon: "ti-users", href: `${pagesPath}comunidad.html` },
        { label: "Blog y Noticias", icon: "ti-news", href: `${pagesPath}blog.html` },
        { label: "Consejos y Guías", icon: "ti-device-laptop", href: `${pagesPath}guias.html` }
      ]
    },
    {
      label: "Ayuda",
      href: `${pagesPath}ayuda.html`,
      dropdown: [
        { label: "Centro de Ayuda", icon: "ti-help-circle", href: `${pagesPath}ayuda.html` },
        { label: "Preguntas Frecuentes", icon: "ti-message-circle-question", href: `${pagesPath}faq.html` },
        { label: "Contacto y Soporte", icon: "ti-mail", href: `${pagesPath}contacto.html` }
      ]
    },
    { label: "Nosotros", href: `${pagesPath}nosotros.html`, id: "nav-about" }
  ];

  // 3. Renderizar Navbar
  function renderNavbar() {
    const navPlaceholder = document.getElementById('navbar');
    if (!navPlaceholder) return;

    const currentPath = window.location.pathname.toLowerCase();

    const navHTML = `
      <header class="site-header">
        <div class="top-announcement-bar">
          <div class="announcement-content">
            <span><i class="ti ti-flame"></i> Ofertas Especiales de Temporada 2026</span>
            <span><i class="ti ti-truck-delivery"></i> Envíos gratis a todo el Perú por compras mayores a S/. 299</span>
            <span><i class="ti ti-tag"></i> Usa el cupón <b>RESPAWN10</b> para 10% de descuento</span>
          </div>
        </div>

        <nav class="navbar-main">
          <div class="nav-container">
            <!-- Botón menú móvil -->
            <button class="mobile-menu-toggle" id="mobile-menu-btn" aria-label="Abrir menú de navegación">
              <i class="ti ti-menu-2"></i>
            </button>

            <!-- Logo -->
            <a href="${basePath}index.html" class="logo">
              <img src="${basePath}imagenes/logoresblue.png" alt="Respawn Store Logo" class="logo-img">
              RESPAWN<span>STORE</span>
            </a>

            <!-- Enlaces del menú -->
            <ul class="nav-links" id="main-nav-links">
              ${NAV_LINKS.map(link => {
                if (link.dropdown) {
                  return `
                    <li class="nav-item dropdown">
                      <a href="${link.href}" class="nav-link dropdown-toggle">
                        ${link.label} <i class="ti ti-chevron-down"></i>
                      </a>
                      <div class="dropdown-menu">
                        ${link.dropdown.map(d => `
                          <a href="${d.href}" class="dropdown-item">
                            <i class="ti ${d.icon}"></i> ${d.label}
                          </a>
                        `).join('')}
                      </div>
                    </li>
                  `;
                }
                const isActive = (link.href.includes('index.html') && (currentPath.endsWith('/') || currentPath.endsWith('index.html'))) ||
                                 (currentPath.includes(link.href.replace('./', '').replace('../', '')));
                return `
                  <li class="nav-item">
                    <a href="${link.href}" class="nav-link ${isActive ? 'active' : ''}">${link.label}</a>
                  </li>
                `;
              }).join('')}
            </ul>

            <!-- Barra de búsqueda en vivo -->
            <div class="search-box">
              <i class="ti ti-search search-icon"></i>
              <input type="text" class="nav-search-input" placeholder="Buscar consolas, juegos, accesorios..." aria-label="Buscar en la tienda">
            </div>

            <!-- Acciones del Header -->
            <div class="nav-actions">
              <button class="nav-action-btn" id="btn-open-wishlist" onclick="Wishlist.open()" title="Lista de Deseos" aria-label="Lista de Deseos">
                <i class="ti ti-heart"></i>
                <span class="wishlist-badge-count action-badge" style="display: none;">0</span>
              </button>

              <button class="nav-action-btn cart-btn-highlight" id="btn-open-cart" onclick="Cart.open()" title="Carrito de Compras" aria-label="Carrito de Compras">
                <i class="ti ti-shopping-cart"></i>
                <span class="cart-badge-count action-badge" style="display: none;">0</span>
              </button>
            </div>
          </div>
        </nav>
      </header>
    `;

    navPlaceholder.innerHTML = navHTML;

    // Mobile menu toggle
    const mobileBtn = document.getElementById('mobile-menu-btn');
    const navLinks = document.getElementById('main-nav-links');
    if (mobileBtn && navLinks) {
      mobileBtn.addEventListener('click', () => {
        navLinks.classList.toggle('mobile-open');
        const icon = mobileBtn.querySelector('i');
        if (icon) {
          icon.className = navLinks.classList.contains('mobile-open') ? 'ti ti-x' : 'ti ti-menu-2';
        }
      });
    }
  }

  // 4. Renderizar Footer
  function renderFooter() {
    const footerPlaceholder = document.getElementById('site-footer');
    if (!footerPlaceholder) return;

    footerPlaceholder.innerHTML = `
      <footer class="site-footer">
        <div class="footer-top">
          <div class="footer-container">
            <div class="footer-col brand-col">
              <a href="${basePath}index.html" class="footer-logo">
                <img src="${basePath}imagenes/logoresblue.png" alt="Respawn Store" class="logo-img">
                RESPAWN<span>STORE</span>
              </a>
              <p class="brand-desc">
                Tu tienda gaming de confianza con garantía oficial, catálogo de nueva generación y envíos seguros a nivel nacional en todo el Perú.
              </p>
              <div class="footer-socials">
                <a href="https://discord.com" target="_blank" rel="noopener noreferrer" aria-label="Discord"><i class="ti ti-brand-discord"></i></a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><i class="ti ti-brand-instagram"></i></a>
                <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube"><i class="ti ti-brand-youtube"></i></a>
                <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" aria-label="TikTok"><i class="ti ti-brand-tiktok"></i></a>
              </div>
            </div>

            <div class="footer-col">
              <h4>Catálogo</h4>
              <ul class="footer-links">
                <li><a href="${pagesPath}productos.html?cat=playstation">PlayStation 5</a></li>
                <li><a href="${pagesPath}productos.html?cat=xbox">Xbox Series X|S</a></li>
                <li><a href="${pagesPath}productos.html?cat=nintendo">Nintendo Switch</a></li>
                <li><a href="${pagesPath}productos.html?cat=portatil">Consolas Portátiles</a></li>
                <li><a href="${pagesPath}juegos.html">Lanzamientos en Juegos</a></li>
                <li><a href="${pagesPath}giftcards.html">Tarjetas de Regalo</a></li>
              </ul>
            </div>

            <div class="footer-col">
              <h4>Soporte & Ayuda</h4>
              <ul class="footer-links">
                <li><a href="${pagesPath}ayuda.html">Centro de Ayuda</a></li>
                <li><a href="${pagesPath}faq.html">Preguntas Frecuentes</a></li>
                <li><a href="${pagesPath}contacto.html">Contacto Directo</a></li>
                <li><a href="${pagesPath}guias.html">Guías Técnicas</a></li>
                <li><a href="${pagesPath}nosotros.html">Términos de Garantía</a></li>
              </ul>
            </div>

            <div class="footer-col newsletter-col">
              <h4>Comunidad VIP</h4>
              <p>Suscríbete para recibir códigos de descuento, preventas exclusivas y avisos de stock.</p>
              <form class="footer-newsletter-form" onsubmit="event.preventDefault(); Toast.show('¡Suscripción exitosa! Usa el código <b>RESPAWN10</b>', 'success', 'ti-mail-check'); this.reset();">
                <div class="newsletter-input-group">
                  <input type="email" placeholder="tu-correo@ejemplo.com" required aria-label="Correo para suscripción">
                  <button type="submit" class="btn-primary"><i class="ti ti-send"></i></button>
                </div>
              </form>
              <div class="payment-badges-row">
                <span class="pay-badge"><i class="ti ti-shield-check"></i> Pago 100% Seguro</span>
                <span class="pay-badge"><i class="ti ti-truck"></i> Envío Express</span>
              </div>
            </div>
          </div>
        </div>

        <div class="footer-bottom">
          <div class="footer-container bottom-flex">
            <p>© 2026 Respawn Store Perú. Todos los derechos reservados.</p>
            <div class="legal-links">
              <span>Políticas de Privacidad</span> · 
              <span>Términos y Condiciones</span> · 
              <span>Libro de Reclamaciones</span>
            </div>
          </div>
        </div>
      </footer>
    `;
  }

  // 5. Inyectar Cajón del Carrito en el DOM
  function injectCartDrawer() {
    if (document.getElementById('cart-drawer')) return;

    const overlay = document.createElement('div');
    overlay.id = 'cart-overlay';
    overlay.className = 'cart-backdrop-overlay';
    overlay.onclick = () => Cart.close();
    document.body.appendChild(overlay);

    const drawer = document.createElement('div');
    drawer.id = 'cart-drawer';
    drawer.className = 'cart-drawer-panel';
    drawer.innerHTML = `
      <div class="cart-drawer-header">
        <div class="header-left">
          <i class="ti ti-shopping-cart"></i>
          <h3>Carrito de Compras</h3>
        </div>
        <button class="cart-close-btn" onclick="Cart.close()" aria-label="Cerrar Carrito">
          <i class="ti ti-x"></i>
        </button>
      </div>

      <div id="cart-shipping-bar" class="cart-shipping-banner"></div>

      <div class="cart-drawer-body">
        <div id="cart-items-container" class="cart-items-list"></div>
      </div>

      <div id="cart-drawer-footer" class="cart-drawer-footer"></div>
    `;

    document.body.appendChild(drawer);
  }

  // 6. Inyectar Botón de Scroll Superior
  function injectScrollTop() {
    const btn = document.createElement('button');
    btn.id = 'btn-scroll-top';
    btn.className = 'btn-scroll-top';
    btn.innerHTML = '<i class="ti ti-arrow-up"></i>';
    btn.setAttribute('aria-label', 'Subir al inicio');
    btn.onclick = () => window.scrollTo({ top: 0, behavior: 'smooth' });
    document.body.appendChild(btn);

    window.addEventListener('scroll', () => {
      if (window.scrollY > 400) {
        btn.classList.add('visible');
      } else {
        btn.classList.remove('visible');
      }
    });
  }

  // 7. Inicialización al cargar el DOM
  document.addEventListener('DOMContentLoaded', () => {
    renderNavbar();
    renderFooter();
    injectCartDrawer();
    injectScrollTop();

    // Inicializar subsistemas
    if (typeof Toast !== 'undefined') Toast.init();
    if (typeof Cart !== 'undefined') {
      Cart.updateBadges();
      Cart.renderDrawer();
    }
    if (typeof Wishlist !== 'undefined') {
      Wishlist.updateBadges();
      Wishlist.updateButtons();
    }
    if (typeof Search !== 'undefined') Search.init();

    // Cerrar modales con tecla Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        if (typeof Cart !== 'undefined') Cart.close();
        if (typeof Wishlist !== 'undefined') Wishlist.close();
        if (typeof QuickView !== 'undefined') QuickView.close();
        const chk = document.getElementById('checkout-modal');
        if (chk) chk.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  });

})();

