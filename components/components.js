// Archivo de compatibilidad heredada: redirige la lógica hacia el módulo unificado js/main.js
(function() {
  const isPages = window.location.pathname.includes('/pages/') || window.location.pathname.includes('/paginas/');
  const prefix = isPages ? '../' : './';
  
  const script = document.createElement('script');
  script.src = prefix + 'js/main.js';
  document.body.appendChild(script);
})();
