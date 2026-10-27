const Cart = {
  STORAGE_KEY: 'respawn_cart_items',
  COUPON_KEY: 'respawn_active_coupon',
  FREE_SHIPPING_MIN: 299,
  SHIPPING_FLAT_RATE: 15,

  getItems() {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (e) {
      return [];
    }
  },

  saveItems(items) {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(items));
    this.updateBadges();
    this.renderDrawer();
  },

  getCoupon() {
    try {
      const coupon = localStorage.getItem(this.COUPON_KEY);
      return coupon ? JSON.parse(coupon) : null;
    } catch (e) {
      return null;
    }
  },

  addItem(product, quantity = 1) {
    const items = this.getItems();
    const existingIndex = items.findIndex(item => item.id === product.id);

    if (existingIndex > -1) {
      items[existingIndex].quantity += quantity;
    } else {
      items.push({
        id: product.id,
        name: product.name,
        price: Number(product.price),
        image: product.image,
        category: product.category || 'Gaming',
        brand: product.brand || 'Respawn',
        quantity: Math.max(1, quantity)
      });
    }

    this.saveItems(items);
    Toast.show(`<b>${product.name}</b> añadido al carrito`, 'success', 'ti-shopping-cart-plus');
    this.open();
  },

  removeItem(id) {
    let items = this.getItems();
    const removed = items.find(i => i.id === id);
    items = items.filter(item => item.id !== id);
    this.saveItems(items);
    if (removed) {
      Toast.show(`<b>${removed.name}</b> eliminado del carrito`, 'info', 'ti-trash');
    }
  },

  updateQuantity(id, newQty) {
    const items = this.getItems();
    const item = items.find(i => i.id === id);
    if (item) {
      if (newQty <= 0) {
        this.removeItem(id);
      } else {
        item.quantity = newQty;
        this.saveItems(items);
      }
    }
  },

  clear() {
    localStorage.removeItem(this.STORAGE_KEY);
    localStorage.removeItem(this.COUPON_KEY);
    this.updateBadges();
    this.renderDrawer();
  },

  applyCoupon(code) {
    const cleanCode = (code || '').trim().toUpperCase();
    if (!cleanCode) {
      Toast.show('Ingresa un código de cupón válido', 'error', 'ti-alert-circle');
      return false;
    }

    if (cleanCode === 'RESPAWN10') {
      localStorage.setItem(this.COUPON_KEY, JSON.stringify({ code: 'RESPAWN10', discountPercent: 10 }));
      Toast.show('¡Cupón <b>RESPAWN10</b> aplicado! 10% de descuento', 'success', 'ti-discount-check');
      this.renderDrawer();
      return true;
    } else if (cleanCode === 'GAMER20') {
      localStorage.setItem(this.COUPON_KEY, JSON.stringify({ code: 'GAMER20', discountPercent: 20 }));
      Toast.show('¡Cupón <b>GAMER20</b> aplicado! 20% de descuento', 'success', 'ti-discount-check');
      this.renderDrawer();
      return true;
    } else {
      Toast.show('Código de cupón inválido o expirado', 'error', 'ti-tag-off');
      return false;
    }
  },

  removeCoupon() {
    localStorage.removeItem(this.COUPON_KEY);
    Toast.show('Cupón removido', 'info');
    this.renderDrawer();
  },

  getTotals() {
    const items = this.getItems();
    const count = items.reduce((sum, item) => sum + item.quantity, 0);
    const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const coupon = this.getCoupon();

    let discount = 0;
    if (coupon && subtotal > 0) {
      discount = (subtotal * coupon.discountPercent) / 100;
    }

    const freeShipping = subtotal >= this.FREE_SHIPPING_MIN;
    const shipping = subtotal === 0 || freeShipping ? 0 : this.SHIPPING_FLAT_RATE;
    const total = Math.max(0, subtotal - discount + shipping);
    const remainingForFree = Math.max(0, this.FREE_SHIPPING_MIN - subtotal);
    const shippingPercent = Math.min(100, Math.round((subtotal / this.FREE_SHIPPING_MIN) * 100));

    return {
      count,
      subtotal,
      discount,
      coupon,
      shipping,
      freeShipping,
      remainingForFree,
      shippingPercent,
      total
    };
  },

  updateBadges() {
    const totals = this.getTotals();
    const badges = document.querySelectorAll('.cart-badge-count');
    badges.forEach(badge => {
      badge.textContent = totals.count;
      badge.style.display = totals.count > 0 ? 'inline-flex' : 'none';
    });
  },

  open() {
    const drawer = document.getElementById('cart-drawer');
    const overlay = document.getElementById('cart-overlay');
    if (drawer && overlay) {
      this.renderDrawer();
      drawer.classList.add('open');
      overlay.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
  },

  close() {
    const drawer = document.getElementById('cart-drawer');
    const overlay = document.getElementById('cart-overlay');
    if (drawer && overlay) {
      drawer.classList.remove('open');
      overlay.classList.remove('open');
      document.body.style.overflow = '';
    }
  },

  formatMoney(num) {
    return 'S/. ' + Number(num).toLocaleString('es-PE', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  },

  resolveImagePath(path) {
    if (!path) return '';
    const isPagesDir = window.location.pathname.includes('/pages/') || window.location.pathname.includes('/paginas/');
    if (isPagesDir && !path.startsWith('../') && !path.startsWith('http')) {
      return '../' + path;
    }
    return path;
  },

  renderDrawer() {
    const container = document.getElementById('cart-items-container');
    const footer = document.getElementById('cart-drawer-footer');
    const shippingBar = document.getElementById('cart-shipping-bar');
    if (!container || !footer) return;

    const items = this.getItems();
    const totals = this.getTotals();

    // Barra de envío gratis
    if (shippingBar) {
      if (totals.count === 0) {
        shippingBar.style.display = 'none';
      } else {
        shippingBar.style.display = 'block';
        if (totals.freeShipping) {
          shippingBar.innerHTML = `
            <div class="shipping-info success">
              <i class="ti ti-truck-delivery"></i> ¡Felicidades! Tienes <b>Envío Gratis</b> asegurado.
            </div>
            <div class="shipping-progress"><div class="bar" style="width: 100%"></div></div>
          `;
        } else {
          shippingBar.innerHTML = `
            <div class="shipping-info">
              <i class="ti ti-truck"></i> Agrega <b>${this.formatMoney(totals.remainingForFree)}</b> más para <b>Envío Gratis</b>
            </div>
            <div class="shipping-progress"><div class="bar" style="width: ${totals.shippingPercent}%"></div></div>
          `;
        }
      }
    }

    if (items.length === 0) {
      container.innerHTML = `
        <div class="cart-empty">
          <div class="empty-icon"><i class="ti ti-shopping-cart-x"></i></div>
          <h3>Tu carrito está vacío</h3>
          <p>Explora nuestras consolas, videojuegos y accesorios para comenzar a jugar.</p>
          <button class="btn-primary" onclick="Cart.close();">Explorar Catálogo</button>
        </div>
      `;
      footer.style.display = 'none';
      return;
    }

    footer.style.display = 'block';

    container.innerHTML = items.map(item => `
      <div class="cart-item" data-id="${item.id}">
        <img class="cart-item-img" src="${this.resolveImagePath(item.image)}" alt="${item.name}">
        <div class="cart-item-details">
          <div class="cart-item-title">${item.name}</div>
          <div class="cart-item-cat">${item.brand}</div>
          <div class="cart-item-price">${this.formatMoney(item.price)}</div>
          <div class="cart-item-controls">
            <div class="qty-selector">
              <button class="qty-btn" onclick="Cart.updateQuantity('${item.id}', ${item.quantity - 1})" aria-label="Disminuir"><i class="ti ti-minus"></i></button>
              <span class="qty-value">${item.quantity}</span>
              <button class="qty-btn" onclick="Cart.updateQuantity('${item.id}', ${item.quantity + 1})" aria-label="Aumentar"><i class="ti ti-plus"></i></button>
            </div>
            <button class="cart-item-remove" onclick="Cart.removeItem('${item.id}')" aria-label="Eliminar producto">
              <i class="ti ti-trash"></i> Eliminar
            </button>
          </div>
        </div>
      </div>
    `).join('');

    // Actualizar Resumen
    footer.innerHTML = `
      <div class="cart-coupon-box">
        <input type="text" id="cart-coupon-input" placeholder="¿Tienes un cupón? (ej: RESPAWN10)" value="${totals.coupon ? totals.coupon.code : ''}" ${totals.coupon ? 'readonly' : ''}>
        ${totals.coupon 
          ? `<button class="btn-coupon-remove" onclick="Cart.removeCoupon()"><i class="ti ti-x"></i> Quitar</button>`
          : `<button class="btn-coupon-apply" onclick="Cart.applyCoupon(document.getElementById('cart-coupon-input').value)">Aplicar</button>`
        }
      </div>

      <div class="cart-summary-breakdown">
        <div class="summary-line">
          <span>Subtotal (${totals.count} items)</span>
          <span>${this.formatMoney(totals.subtotal)}</span>
        </div>
        ${totals.coupon ? `
          <div class="summary-line discount">
            <span>Descuento cupón (${totals.coupon.discountPercent}%)</span>
            <span>-${this.formatMoney(totals.discount)}</span>
          </div>
        ` : ''}
        <div class="summary-line">
          <span>Envío</span>
          <span>${totals.freeShipping ? '<b class="free-badge">GRATIS</b>' : this.formatMoney(totals.shipping)}</span>
        </div>
        <div class="summary-line total">
          <span>Total a pagar</span>
          <span class="total-amount">${this.formatMoney(totals.total)}</span>
        </div>
      </div>

      <div class="cart-actions">
        <button class="btn-checkout" onclick="Cart.openCheckout()">
          <i class="ti ti-lock"></i> Proceder al Pago Seguro
        </button>
        <button class="btn-clear-cart" onclick="Cart.clear()">Vaciar carrito</button>
      </div>
    `;
  },

  openCheckout() {
    this.close();
    const totals = this.getTotals();
    const items = this.getItems();
    if (items.length === 0) return;

    let checkoutModal = document.getElementById('checkout-modal');
    if (!checkoutModal) {
      checkoutModal = document.createElement('div');
      checkoutModal.id = 'checkout-modal';
      checkoutModal.className = 'modal-backdrop';
      document.body.appendChild(checkoutModal);
    }

    checkoutModal.innerHTML = `
      <div class="modal-dialog checkout-dialog">
        <div class="modal-header">
          <h3><i class="ti ti-shield-check"></i> Finalizar Compra Segura</h3>
          <button class="modal-close-btn" onclick="document.getElementById('checkout-modal').classList.remove('open')"><i class="ti ti-x"></i></button>
        </div>
        <div class="modal-body checkout-grid">
          <form id="checkout-form" onsubmit="Cart.processOrder(event)">
            <h4>1. Información de Envío</h4>
            <div class="form-row">
              <div class="form-group">
                <label>Nombre y Apellidos *</label>
                <input type="text" id="chk-name" required placeholder="Ej: Carlos Mendoza">
              </div>
              <div class="form-group">
                <label>Correo Electrónico *</label>
                <input type="email" id="chk-email" required placeholder="carlos@ejemplo.com">
              </div>
            </div>
            <div class="form-row">
              <div class="form-group">
                <label>Teléfono / WhatsApp *</label>
                <input type="tel" id="chk-phone" required placeholder="987 654 321">
              </div>
              <div class="form-group">
                <label>Ciudad / Departamento *</label>
                <select id="chk-city" required>
                  <option value="Lima">Lima Metropolitana</option>
                  <option value="Arequipa">Arequipa</option>
                  <option value="Cusco">Cusco</option>
                  <option value="Trujillo">Trujillo</option>
                  <option value="Piura">Piura</option>
                  <option value="Otras Provincias">Otras Provincias (Envío Olva)</option>
                </select>
              </div>
            </div>
            <div class="form-group">
              <label>Dirección de Entrega *</label>
              <input type="text" id="chk-address" required placeholder="Av. Principal 123, Dpto 402">
            </div>

            <h4 style="margin-top: 20px;">2. Método de Pago</h4>
            <div class="payment-methods">
              <label class="payment-method active">
                <input type="radio" name="payment-method" value="yape" checked>
                <div class="pay-info">
                  <div class="pay-title"><i class="ti ti-device-mobile"></i> Yape / Plin</div>
                  <small>Pago inmediato sin comisiones</small>
                </div>
              </label>
              <label class="payment-method">
                <input type="radio" name="payment-method" value="tarjeta">
                <div class="pay-info">
                  <div class="pay-title"><i class="ti ti-credit-card"></i> Tarjeta de Crédito / Débito</div>
                  <small>Visa, Mastercard, Amex</small>
                </div>
              </label>
              <label class="payment-method">
                <input type="radio" name="payment-method" value="bcp">
                <div class="pay-info">
                  <div class="pay-title"><i class="ti ti-building-bank"></i> Transferencia BCP / Interbank</div>
                  <small>Cuenta corriente oficial</small>
                </div>
              </label>
            </div>

            <button type="submit" class="btn-confirm-order">
              <i class="ti ti-check"></i> Confirmar Pedido (${this.formatMoney(totals.total)})
            </button>
          </form>

          <div class="checkout-order-summary">
            <h4>Resumen del Pedido (${totals.count} items)</h4>
            <div class="summary-items-list">
              ${items.map(it => `
                <div class="summary-mini-item">
                  <img src="${this.resolveImagePath(it.image)}" alt="${it.name}">
                  <div class="mini-info">
                    <span class="mini-title">${it.name}</span>
                    <span class="mini-qty">Cant: ${it.quantity} × ${this.formatMoney(it.price)}</span>
                  </div>
                  <span class="mini-subtotal">${this.formatMoney(it.price * it.quantity)}</span>
                </div>
              `).join('')}
            </div>
            <div class="summary-totals-box">
              <div class="s-line"><span>Subtotal:</span> <span>${this.formatMoney(totals.subtotal)}</span></div>
              ${totals.coupon ? `<div class="s-line discount"><span>Cupón (${totals.coupon.code}):</span> <span>-${this.formatMoney(totals.discount)}</span></div>` : ''}
              <div class="s-line"><span>Envío:</span> <span>${totals.freeShipping ? 'GRATIS' : this.formatMoney(totals.shipping)}</span></div>
              <div class="s-line total"><span>Total:</span> <span>${this.formatMoney(totals.total)}</span></div>
            </div>
            <div class="checkout-guarantee">
              <i class="ti ti-shield-lock"></i> Compra protegida con garantía oficial Respawn de 12 meses.
            </div>
          </div>
        </div>
      </div>
    `;

    checkoutModal.classList.add('open');
  },

  processOrder(e) {
    e.preventDefault();
    const name = document.getElementById('chk-name').value;
    const email = document.getElementById('chk-email').value;
    const totals = this.getTotals();
    const orderId = 'RSP-' + Math.floor(100000 + Math.random() * 900000);

    const checkoutModal = document.getElementById('checkout-modal');
    if (checkoutModal) {
      checkoutModal.innerHTML = `
        <div class="modal-dialog order-success-dialog">
          <div class="order-success-icon"><i class="ti ti-circle-check"></i></div>
          <h2>¡Gracias por tu compra, ${name}!</h2>
          <p class="order-id-badge">Número de Pedido: <b>#${orderId}</b></p>
          <p>Hemos enviado la confirmación y el comprobante detallado a tu correo: <b>${email}</b>.</p>
          
          <div class="order-details-box">
            <div class="box-line"><span>Total pagado:</span> <b>${this.formatMoney(totals.total)}</b></div>
            <div class="box-line"><span>Estado del pedido:</span> <span class="status-badge">En preparación para despacho</span></div>
            <div class="box-line"><span>Tiempo estimado:</span> <span>24 a 48 horas hábiles</span></div>
          </div>

          <div class="order-success-actions">
            <button class="btn-primary" onclick="Cart.clear(); document.getElementById('checkout-modal').classList.remove('open');">
              <i class="ti ti-arrow-left"></i> Continuar Explorando
            </button>
            <button class="btn-ghost" onclick="window.print()">
              <i class="ti ti-printer"></i> Imprimir Recibo
            </button>
          </div>
        </div>
      `;
    }

    this.clear();
    Toast.show(`¡Pedido #${orderId} generado exitosamente!`, 'success', 'ti-circle-check');
  }
};

