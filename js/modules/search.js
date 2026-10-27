const Search = {
  init() {
    const inputs = document.querySelectorAll('.nav-search-input');
    inputs.forEach(input => {
      let dropdown = input.parentNode.querySelector('.search-results-dropdown');
      if (!dropdown) {
        dropdown = document.createElement('div');
        dropdown.className = 'search-results-dropdown';
        input.parentNode.appendChild(dropdown);
      }

      input.addEventListener('input', (e) => this.handleInput(e.target.value, dropdown));
      input.addEventListener('focus', (e) => {
        if (e.target.value.trim().length > 1) this.handleInput(e.target.value, dropdown);
      });

      input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          const query = input.value.trim();
          if (query) {
            const isPages = window.location.pathname.includes('/pages/') || window.location.pathname.includes('/paginas/');
            const target = isPages ? 'productos.html?q=' + encodeURIComponent(query) : 'pages/productos.html?q=' + encodeURIComponent(query);
            window.location.href = target;
          }
        }
      });
    });

    document.addEventListener('click', (e) => {
      if (!e.target.closest('.search-box')) {
        document.querySelectorAll('.search-results-dropdown').forEach(d => d.classList.remove('open'));
      }
    });
  },

  handleInput(query, dropdown) {
    const q = (query || '').trim().toLowerCase();
    if (q.length < 2) {
      dropdown.classList.remove('open');
      dropdown.innerHTML = '';
      return;
    }

    const allProducts = typeof PRODUCTS_DATA !== 'undefined' ? PRODUCTS_DATA : [];
    const allGames = typeof GAMES_DATA !== 'undefined' ? GAMES_DATA : [];
    const allItems = [...allProducts, ...allGames];

    const matches = allItems.filter(item => 
      item.name.toLowerCase().includes(q) || 
      (item.brand && item.brand.toLowerCase().includes(q)) ||
      (item.category && item.category.toLowerCase().includes(q)) ||
      (item.platform && item.platform.toLowerCase().includes(q))
    ).slice(0, 5);

    if (matches.length === 0) {
      dropdown.innerHTML = `
        <div class="search-no-results">
          <i class="ti ti-search-off"></i> No se encontraron resultados para "<b>${query}</b>"
        </div>
      `;
      dropdown.classList.add('open');
      return;
    }

    const isPages = window.location.pathname.includes('/pages/') || window.location.pathname.includes('/paginas/');
    dropdown.innerHTML = `
      <div class="search-results-header">Resultados coincidentes (${matches.length})</div>
      ${matches.map(item => {
        let img = item.image;
        if (isPages && !img.startsWith('../') && !img.startsWith('http')) img = '../' + img;
        return `
          <div class="search-result-item" onclick="QuickView.open('${item.id}'); document.querySelectorAll('.search-results-dropdown').forEach(d => d.classList.remove('open'));">
            <img src="${img}" alt="${item.name}">
            <div class="result-details">
              <span class="result-name">${item.name}</span>
              <span class="result-cat">${item.brand || item.platform} · S/. ${Number(item.price).toFixed(2)}</span>
            </div>
            <button class="btn-quick-add" onclick="event.stopPropagation(); Cart.addItem(${JSON.stringify(item).replace(/"/g, '&quot;')}, 1);">
              <i class="ti ti-plus"></i>
            </button>
          </div>
        `;
      }).join('')}
    `;
    dropdown.classList.add('open');
  }
};

