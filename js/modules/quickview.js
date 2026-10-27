const QuickView = {
  open(productId) {
    let product = PRODUCTS_DATA.find(p => p.id === productId);
    if (!product && typeof GAMES_DATA !== 'undefined') {
      product = GAMES_DATA.find(g => g.id === productId);
    }
    if (!product) return;

    let modal = document.getElementById('quickview-modal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'quickview-modal';
      modal.className = 'modal-backdrop';
      document.body.appendChild(modal);
    }

    const isPagesDir = window.location.pathname.includes('/pages/') || window.location.pathname.includes('/paginas/');
    let imgSrc = product.image;
    if (isPagesDir && !imgSrc.startsWith('../') && !imgSrc.startsWith('http')) {
      imgSrc = '../' + imgSrc;
    }

    const inWishlist = Wishlist.has(product.id);

    modal.innerHTML = `
      <div class="modal-dialog quickview-dialog">
        <button class="modal-close-btn" onclick="QuickView.close()"><i class="ti ti-x"></i></button>
        <div class="quickview-grid">
          <div class="quickview-media">
            ${product.badge ? `<span class="product-badge">${product.badge}</span>` : ''}
            <img src="${imgSrc}" alt="${product.name}" class="quickview-img">
          </div>
          <div class="quickview-info">
            <span class="quickview-cat">${product.brand || product.platform || 'Respawn Gaming'}</span>
            <h2 class="quickview-title">${product.name}</h2>
            
            <div class="quickview-rating">
              <div class="stars">
                <i class="ti ti-star-filled"></i>
                <i class="ti ti-star-filled"></i>
                <i class="ti ti-star-filled"></i>
                <i class="ti ti-star-filled"></i>
                <i class="ti ti-star-filled"></i>
              </div>
              <span class="rating-num">${product.rating || '4.9'}</span>
              <span class="rating-count">(${product.reviews || '85'} reseñas)</span>
            </div>

            <div class="quickview-pricing">
              <span class="quickview-price">S/. ${Number(product.price).toFixed(2)}</span>
              ${product.oldPrice ? `<span class="quickview-old-price">S/. ${Number(product.oldPrice).toFixed(2)}</span>` : ''}
              ${product.oldPrice ? `<span class="quickview-savings">Ahorras S/. ${(product.oldPrice - product.price).toFixed(2)}</span>` : ''}
            </div>

            <p class="quickview-desc">${product.description || 'Producto gaming oficial con garantía de fábrica y despacho express.'}</p>

            ${product.specs ? `
              <div class="quickview-specs">
                <h4>Especificaciones principales:</h4>
                <ul>
                  ${product.specs.map(s => `<li><i class="ti ti-check"></i> ${s}</li>`).join('')}
                </ul>
              </div>
            ` : ''}

            <div class="stock-status in-stock">
              <i class="ti ti-circle-check"></i> En stock para entrega inmediata (${product.stock || 8} unidades disponibles)
            </div>

            <div class="quickview-actions">
              <div class="qty-selector">
                <button class="qty-btn" onclick="QuickView.changeQty(-1)"><i class="ti ti-minus"></i></button>
                <span class="qty-value" id="qv-qty">1</span>
                <button class="qty-btn" onclick="QuickView.changeQty(1)"><i class="ti ti-plus"></i></button>
              </div>

              <button class="btn-primary" onclick="QuickView.addToCart('${product.id}')">
                <i class="ti ti-shopping-cart-plus"></i> Añadir al Carrito
              </button>

              <button class="btn-ghost btn-wishlist-toggle ${inWishlist ? 'active' : ''}" data-id="${product.id}" onclick="Wishlist.toggle(${JSON.stringify(product).replace(/"/g, '&quot;')})">
                <i class="ti ${inWishlist ? 'ti-heart-filled' : 'ti-heart'}"></i>
              </button>
            </div>

            <div class="quickview-perks">
              <div class="perk"><i class="ti ti-truck"></i> Envío gratis en compras mayores a S/. 299</div>
              <div class="perk"><i class="ti ti-shield-check"></i> Garantía oficial de 12 meses</div>
              <div class="perk"><i class="ti ti-lock"></i> Compra 100% segura y encriptada</div>
            </div>
          </div>
        </div>
      </div>
    `;

    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  },

  changeQty(delta) {
    const el = document.getElementById('qv-qty');
    if (!el) return;
    let val = parseInt(el.textContent, 10) || 1;
    val = Math.max(1, Math.min(10, val + delta));
    el.textContent = val;
  },

  addToCart(productId) {
    let product = PRODUCTS_DATA.find(p => p.id === productId);
    if (!product && typeof GAMES_DATA !== 'undefined') {
      product = GAMES_DATA.find(g => g.id === productId);
    }
    if (!product) return;
    const qtyEl = document.getElementById('qv-qty');
    const qty = qtyEl ? (parseInt(qtyEl.textContent, 10) || 1) : 1;
    Cart.addItem(product, qty);
    this.close();
  },

  close() {
    const modal = document.getElementById('quickview-modal');
    if (modal) {
      modal.classList.remove('open');
      document.body.style.overflow = '';
    }
  }
};

