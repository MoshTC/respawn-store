const Wishlist = {
  STORAGE_KEY: 'respawn_wishlist_items',

  getItems() {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (e) {
      return [];
    }
  },

  has(id) {
    return this.getItems().some(item => item.id === id);
  },

  toggle(product) {
    let items = this.getItems();
    const index = items.findIndex(it => it.id === product.id);

    if (index > -1) {
      items.splice(index, 1);
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(items));
      Toast.show(`<b>${product.name}</b> eliminado de favoritos`, 'info', 'ti-heart-broken');
    } else {
      items.push({
        id: product.id,
        name: product.name,
        price: Number(product.price),
        image: product.image,
        category: product.category || 'Gaming',
        brand: product.brand || 'Respawn'
      });
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(items));
      Toast.show(`<b>${product.name}</b> guardado en tus favoritos`, 'success', 'ti-heart-filled');
    }

    this.updateBadges();
    this.updateButtons();
    this.renderModal();
  },

  remove(id) {
    let items = this.getItems().filter(it => it.id !== id);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(items));
    this.updateBadges();
    this.updateButtons();
    this.renderModal();
  },

  moveToCart(id) {
    const items = this.getItems();
    const item = items.find(it => it.id === id);
    if (item) {
      Cart.addItem(item, 1);
      this.remove(id);
    }
  },

  updateBadges() {
    const items = this.getItems();
    const count = items.length;
    const badges = document.querySelectorAll('.wishlist-badge-count');
    badges.forEach(b => {
      b.textContent = count;
      b.style.display = count > 0 ? 'inline-flex' : 'none';
    });
  },

  updateButtons() {
    const items = this.getItems();
    const ids = new Set(items.map(it => it.id));
    document.querySelectorAll('.btn-wishlist-toggle').forEach(btn => {
      const id = btn.getAttribute('data-id');
      if (ids.has(id)) {
        btn.classList.add('active');
        btn.innerHTML = '<i class="ti ti-heart-filled"></i>';
      } else {
        btn.classList.remove('active');
        btn.innerHTML = '<i class="ti ti-heart"></i>';
      }
    });
  },

  open() {
    let modal = document.getElementById('wishlist-modal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'wishlist-modal';
      modal.className = 'modal-backdrop';
      document.body.appendChild(modal);
    }
    this.renderModal();
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  },

  close() {
    const modal = document.getElementById('wishlist-modal');
    if (modal) {
      modal.classList.remove('open');
      document.body.style.overflow = '';
    }
  },

  resolveImagePath(path) {
    if (!path) return '';
    const isPagesDir = window.location.pathname.includes('/pages/') || window.location.pathname.includes('/paginas/');
    if (isPagesDir && !path.startsWith('../') && !path.startsWith('http')) {
      return '../' + path;
    }
    return path;
  },

  renderModal() {
    const modal = document.getElementById('wishlist-modal');
    if (!modal) return;
    const items = this.getItems();

    modal.innerHTML = `
      <div class="modal-dialog wishlist-dialog">
        <div class="modal-header">
          <h3><i class="ti ti-heart-filled" style="color: #ef4444;"></i> Mi Lista de Deseos (${items.length})</h3>
          <button class="modal-close-btn" onclick="Wishlist.close()"><i class="ti ti-x"></i></button>
        </div>
        <div class="modal-body">
          ${items.length === 0 ? `
            <div class="wishlist-empty">
              <i class="ti ti-heart-off" style="font-size: 3rem; color: #4b5563; margin-bottom: 12px; display: block;"></i>
              <h4>No tienes productos en favoritos</h4>
              <p>Haz clic en el icono del corazón en cualquier producto para guardarlo aquí.</p>
            </div>
          ` : `
            <div class="wishlist-grid">
              ${items.map(it => `
                <div class="wishlist-item">
                  <img src="${this.resolveImagePath(it.image)}" alt="${it.name}">
                  <div class="wishlist-item-info">
                    <h5>${it.name}</h5>
                    <span class="wishlist-price">S/. ${Number(it.price).toFixed(2)}</span>
                  </div>
                  <div class="wishlist-item-actions">
                    <button class="btn-primary btn-sm" onclick="Wishlist.moveToCart('${it.id}')">
                      <i class="ti ti-shopping-cart-plus"></i> Mover al carrito
                    </button>
                    <button class="btn-remove-icon" onclick="Wishlist.remove('${it.id}')" title="Eliminar">
                      <i class="ti ti-trash"></i>
                    </button>
                  </div>
                </div>
              `).join('')}
            </div>
          `}
        </div>
      </div>
    `;
  }
};

