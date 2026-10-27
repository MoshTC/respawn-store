const Catalog = {
  currentCategory: 'all',
  currentSort: 'popular',
  searchQuery: '',

  init(containerId = 'products-grid') {
    const container = document.getElementById(containerId);
    if (!container) return;

    // Check URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('q')) {
      this.searchQuery = urlParams.get('q');
    }
    if (urlParams.has('cat')) {
      this.currentCategory = urlParams.get('cat');
    }

    this.bindEvents(containerId);
    this.render(containerId);
  },

  bindEvents(containerId) {
    // Pills
    const pills = document.querySelectorAll('.pill');
    pills.forEach(pill => {
      pill.addEventListener('click', () => {
        pills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        
        const cat = pill.getAttribute('data-cat') || pill.textContent.trim().toLowerCase();
        if (cat.includes('todas')) this.currentCategory = 'all';
        else if (cat.includes('playstation')) this.currentCategory = 'playstation';
        else if (cat.includes('xbox')) this.currentCategory = 'xbox';
        else if (cat.includes('nintendo')) this.currentCategory = 'nintendo';
        else if (cat.includes('portátil') || cat.includes('portatiles')) this.currentCategory = 'portatil';
        else this.currentCategory = cat;

        this.render(containerId);
      });
    });

    // Sort select
    const sortSelect = document.querySelector('.sort-select');
    if (sortSelect) {
      sortSelect.addEventListener('change', (e) => {
        this.currentSort = e.target.value;
        this.render(containerId);
      });
    }

    // Live search input if present
    const searchFilter = document.getElementById('catalog-search-filter');
    if (searchFilter) {
      searchFilter.addEventListener('input', (e) => {
        this.searchQuery = e.target.value;
        this.render(containerId);
      });
    }
  },

  getFilteredProducts() {
    let list = typeof PRODUCTS_DATA !== 'undefined' ? [...PRODUCTS_DATA] : [];

    // Filter by Category
    if (this.currentCategory !== 'all') {
      list = list.filter(p => p.category === this.currentCategory);
    }

    // Filter by Search
    if (this.searchQuery && this.searchQuery.trim()) {
      const q = this.searchQuery.trim().toLowerCase();
      list = list.filter(p => 
        p.name.toLowerCase().includes(q) || 
        p.brand.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
      );
    }

    // Sort
    if (this.currentSort === 'price-asc') {
      list.sort((a, b) => a.price - b.price);
    } else if (this.currentSort === 'price-desc') {
      list.sort((a, b) => b.price - a.price);
    } else if (this.currentSort === 'name-asc') {
      list.sort((a, b) => a.name.localeCompare(b.name));
    } else {
      // Default: Popularity / Rating
      list.sort((a, b) => (b.reviews || 0) - (a.reviews || 0));
    }

    return list;
  },

  resolveImagePath(path) {
    if (!path) return '';
    const isPagesDir = window.location.pathname.includes('/pages/') || window.location.pathname.includes('/paginas/');
    if (isPagesDir && !path.startsWith('../') && !path.startsWith('http')) {
      return '../' + path;
    }
    return path;
  },

  render(containerId = 'products-grid') {
    const container = document.getElementById(containerId);
    if (!container) return;

    const products = this.getFilteredProducts();

    if (products.length === 0) {
      container.innerHTML = `
        <div class="catalog-empty-state">
          <i class="ti ti-search-off"></i>
          <h3>No se encontraron productos</h3>
          <p>Intenta cambiar de categoría o usar un término de búsqueda diferente.</p>
          <button class="btn-primary" onclick="Catalog.resetFilters('${containerId}')">Restablecer Filtros</button>
        </div>
      `;
      return;
    }

    container.innerHTML = products.map(prod => {
      const inWishlist = Wishlist.has(prod.id);
      return `
        <div class="product-card" data-id="${prod.id}">
          <div class="card-img-wrapper">
            ${prod.badge ? `<span class="card-badge ${prod.badge === 'OFERTA' ? 'sale' : ''}">${prod.badge}</span>` : ''}
            <button class="btn-wishlist-toggle ${inWishlist ? 'active' : ''}" data-id="${prod.id}" onclick="Wishlist.toggle(${JSON.stringify(prod).replace(/"/g, '&quot;')})" title="Guardar en favoritos">
              <i class="ti ${inWishlist ? 'ti-heart-filled' : 'ti-heart'}"></i>
            </button>
            <img src="${this.resolveImagePath(prod.image)}" alt="${prod.name}" class="product-img" loading="lazy" onclick="QuickView.open('${prod.id}')">
          </div>
          
          <div class="card-body">
            <div class="card-meta">
              <span class="card-cat">${prod.brand} · ${prod.category.toUpperCase()}</span>
              <div class="card-rating">
                <i class="ti ti-star-filled"></i> <span>${prod.rating}</span>
              </div>
            </div>

            <h3 class="card-name" onclick="QuickView.open('${prod.id}')">${prod.name}</h3>

            <div class="card-price-row">
              <div class="price-container">
                <span class="price">S/. ${Number(prod.price).toLocaleString('es-PE', { minimumFractionDigits: 2 })}</span>
                ${prod.oldPrice ? `<span class="old-price">S/. ${Number(prod.oldPrice).toLocaleString('es-PE', { minimumFractionDigits: 2 })}</span>` : ''}
              </div>
            </div>

            <div class="card-actions-grid">
              <button class="btn-detail" onclick="QuickView.open('${prod.id}')">
                <i class="ti ti-eye"></i> Detalles
              </button>
              <button class="btn-add-cart" onclick="Cart.addItem(${JSON.stringify(prod).replace(/"/g, '&quot;')}, 1)">
                <i class="ti ti-shopping-cart-plus"></i> Añadir
              </button>
            </div>
          </div>
        </div>
      `;
    }).join('');

    Wishlist.updateButtons();
  },

  resetFilters(containerId) {
    this.currentCategory = 'all';
    this.searchQuery = '';
    this.currentSort = 'popular';
    
    document.querySelectorAll('.pill').forEach((p, idx) => {
      if (idx === 0) p.classList.add('active');
      else p.classList.remove('active');
    });

    const sortSelect = document.querySelector('.sort-select');
    if (sortSelect) sortSelect.value = 'popular';

    const searchInput = document.getElementById('catalog-search-filter');
    if (searchInput) searchInput.value = '';

    this.render(containerId);
  }
};

