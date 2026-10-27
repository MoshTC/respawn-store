const Toast = {
  container: null,

  init() {
    if (!this.container) {
      this.container = document.createElement('div');
      this.container.id = 'toast-container';
      this.container.className = 'toast-container';
      document.body.appendChild(this.container);
    }
  },

  show(message, type = 'success', icon = 'ti-check') {
    this.init();
    const toast = document.createElement('div');
    toast.className = `toast-item toast-${type}`;
    
    let defaultIcon = 'ti-circle-check';
    if (type === 'error') defaultIcon = 'ti-alert-circle';
    if (type === 'info') defaultIcon = 'ti-info-circle';
    if (icon) defaultIcon = icon;

    toast.innerHTML = `
      <div class="toast-icon"><i class="ti ${defaultIcon}"></i></div>
      <div class="toast-message">${message}</div>
      <button class="toast-close" aria-label="Cerrar"><i class="ti ti-x"></i></button>
    `;

    this.container.appendChild(toast);

    const closeBtn = toast.querySelector('.toast-close');
    const dismiss = () => {
      toast.classList.add('toast-hide');
      setTimeout(() => {
        if (toast.parentNode) toast.parentNode.removeChild(toast);
      }, 300);
    };

    closeBtn.addEventListener('click', dismiss);
    setTimeout(dismiss, 3500);
  }
};

