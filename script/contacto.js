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

/* =============================================
   DROPZONE DE ARCHIVO
   ============================================= */
const inputArchivo  = document.querySelector('.form-dropzone input[type="file"]');
const dropzoneTexto = document.querySelector(".dropzone-texto");
const TEXTO_DROPZONE = "Arrastra archivos aquí";

function restaurarDropzone() {
  if (dropzoneTexto) dropzoneTexto.textContent = TEXTO_DROPZONE;
}

if (inputArchivo && dropzoneTexto) {
  inputArchivo.addEventListener("change", function () {
    const archivo = this.files[0];
    if (!archivo) {
      restaurarDropzone(); /* canceló el selector sin elegir nada */
      return;
    }
    if (archivo.size > 10 * 1024 * 1024) { /* 10 MB en bytes */
      alert("El archivo supera el máximo de 10 MB.");
      this.value = ""; /* descarta el archivo */
      restaurarDropzone();
      return;
    }
    dropzoneTexto.textContent = archivo.name; /* confirma qué se adjuntó */
  });
}

/* =============================================
   ENVÍO DEL FORMULARIO
   Con esto se evita la recarga de la página
   (comportamiento por defecto de un form sin action), se limpia
   el formulario y se confirma el envío en el propio botón.
   La validación (required, type="email") la hace el navegador
   ANTES de que este evento llegue a ejecutarse.
   ============================================= */
const form = document.querySelector(".contacto-form");

if (form) {
  form.addEventListener("submit", function (e) {
    e.preventDefault(); /* evita que la página se recargue y borre todo */
    form.reset();
    if (contador) contador.textContent = "0";
    restaurarDropzone();

    const btn = form.querySelector(".contacto-btn");
    if (btn) {
      btn.textContent = "¡Mensaje enviado!";
      btn.disabled = true; /* evita doble envío mientras se muestra la confirmación */
      setTimeout(function () {
        btn.textContent = "Enviar mensaje";
        btn.disabled = false;
      }, 3000);
    }
  });
}

/* =============================================
   COPIAR CORREO 
   ============================================= */
const copiarCorreo = document.getElementById("copiar-correo");

if (copiarCorreo) {
  copiarCorreo.addEventListener("click", function (e) {
    e.preventDefault(); /* evita que el href="#" suba al tope de la página */
    navigator.clipboard.writeText("soporte@respawnstore.com");
    this.textContent = "¡Copiado!";
    setTimeout(() => (this.textContent = "Copiar correo →"), 2000);
  });
}
