/* =============================================
   ACORDEÓN FAQ
   Abre y cierra las respuestas al hacer clic en una pregunta.
   Solo una pregunta puede estar abierta a la vez:
   primero cierra todas, luego abre la que se clickeó
   (a menos que ya estuviera abierta, en ese caso queda cerrada).
   ============================================= */
/* =============================================
   CARGA CON ANCLA (#)
   Si la página carga con un hash (ej: #pedidos), activa el tab
   correspondiente, oculta las demás secciones y hace scroll a la sección.
   Esto permite que los links de ayuda.html abran directamente su categoría.
   ============================================= */
const hash = window.location.hash.replace("#", "");
/* el test valida que el hash solo tenga letras/números/guiones:
   un hash con caracteres raros rompería los querySelector de abajo */
if (hash && /^[\w-]+$/.test(hash)) {
  const esItem = hash.startsWith("faq-");

  if (esItem) {
    /* el hash apunta a un faq-item específico: ábrelo y muestra su sección */
    const item = document.getElementById(hash);
    if (item) {
      const seccion = item.closest(".faq-seccion");
      const categoria = seccion ? seccion.dataset.categoria : null;

      /* oculta todas las secciones y muestra solo la que contiene el item */
      document
        .querySelectorAll(".faq-seccion")
        .forEach((s) => (s.style.display = "none"));
      if (seccion) seccion.style.display = "block";

      /* activa el tab correspondiente */
      document
        .querySelectorAll(".faq-tab")
        .forEach((t) => t.classList.remove("active"));
      const tabActivo = document.querySelector(
        `.faq-tab[data-filter="${categoria}"]`,
      );
      if (tabActivo) tabActivo.classList.add("active");

      /* abre el acordeón del item */
      item.classList.add("open");

      /* hace scroll al item */
      item.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  } else {
    /* el hash apunta a una sección entera */
    const tabActivo = document.querySelector(`.faq-tab[data-filter="${hash}"]`);

    if (tabActivo) {
      document
        .querySelectorAll(".faq-tab")
        .forEach((t) => t.classList.remove("active"));
      tabActivo.classList.add("active");
      document.querySelectorAll(".faq-seccion").forEach((sec) => {
        sec.style.display = sec.dataset.categoria === hash ? "block" : "none";
      });
      const seccion = document.getElementById(hash);
      if (seccion) seccion.scrollIntoView({ behavior: "smooth" });
    }
  }
}

document.querySelectorAll(".faq-pregunta").forEach((btn) => {
  btn.addEventListener("click", function () {
    const item = this.closest(".faq-item"); /* tarjeta padre del botón */
    const isOpen = item.classList.contains("open"); /* ¿ya estaba abierta? */

    /* cierra todas las preguntas */
    document
      .querySelectorAll(".faq-item")
      .forEach((i) => i.classList.remove("open"));

    /* si no estaba abierta, la abre */
    if (!isOpen) item.classList.add("open");
  });
});

/* =============================================
   TABS DE FILTRO
   Filtra las secciones del FAQ según la categoría del tab.
   Compara el data-filter del tab con el data-categoria de cada sección.
   Si el filtro es "todo" muestra todas las secciones.
   ============================================= */
document.querySelectorAll(".faq-tab").forEach((tab) => {
  tab.addEventListener("click", function () {
    /* quita "active" de todos los tabs */
    document
      .querySelectorAll(".faq-tab")
      .forEach((t) => t.classList.remove("active"));

    /* marca el tab clickeado como activo */
    this.classList.add("active");

    const filtro = this.dataset.filter; /* valor del atributo data-filter */

    /* muestra u oculta cada sección según si coincide con el filtro */
    document.querySelectorAll(".faq-seccion").forEach((sec) => {
      sec.style.display =
        filtro === "todo" || sec.dataset.categoria === filtro
          ? "block"
          : "none";
    });
  });
});
