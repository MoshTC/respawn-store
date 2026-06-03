/* =============================================
   CONTADOR DE CARACTERES
   Actualiza el número que aparece debajo del textarea
   (ej: "142 / 500") cada vez que el usuario escribe.
   El máximo está definido en el HTML con maxlength="500".
   ============================================= */
const mensaje = document.getElementById("mensaje");
const contador = document.getElementById("contador");

/* verifica que ambos elementos existan antes de agregar el evento */
if (mensaje && contador) {
  mensaje.addEventListener("input", function () {
    contador.textContent = this.value.length; /* actualiza el número en pantalla */
  });
}

/* =============================================
   MODAL POLÍTICA DE PRIVACIDAD
   Abre con el link, cierra con el botón X,
   el botón "Entendido", clic fuera del modal o tecla Escape.
   aria-hidden controla la visibilidad para lectores de pantalla.
   ============================================= */
const modal        = document.getElementById("modal-privacidad");
const linkPriv     = document.getElementById("link-privacidad");
const btnCerrar    = modal ? modal.querySelector(".modal-cerrar")  : null;
const btnAceptar   = modal ? modal.querySelector(".modal-aceptar") : null;

function abrirModal() {
  modal.classList.add("activo");
  modal.setAttribute("aria-hidden", "false");
  /* mueve el foco al botón de cerrar al abrir */
  if (btnCerrar) btnCerrar.focus();
}

function cerrarModal() {
  modal.classList.remove("activo");
  modal.setAttribute("aria-hidden", "true");
  /* devuelve el foco al link que abrió el modal */
  if (linkPriv) linkPriv.focus();
}

if (linkPriv) {
  linkPriv.addEventListener("click", function (e) {
    e.preventDefault(); /* evita que el href="#" suba al tope de la página */
    abrirModal();
  });
}

if (btnCerrar)  btnCerrar.addEventListener("click",  cerrarModal);
if (btnAceptar) btnAceptar.addEventListener("click", cerrarModal);

/* cierra al hacer clic en el overlay (fuera del modal-contenido) */
if (modal) {
  modal.addEventListener("click", function (e) {
    if (e.target === modal) cerrarModal();
  });
}

/* cierra con la tecla Escape */
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && modal && modal.classList.contains("activo")) {
    cerrarModal();
  }
});
