const btnDestacado = document.getElementById("btn-destacado");

if (btnDestacado) {
  btnDestacado.addEventListener("click", () => {
    window.open(
      "https://hardzone.es/noticias/juegos/filtrado-precio-gta-6-consola-pc/",
      "_blank",
    );
  });
}

document.addEventListener("DOMContentLoaded", () => {
  function crearPaginacion(seccionClase, pagClase) {
    const seccion = document.querySelector(seccionClase);
    const paginas = seccion.querySelectorAll(".pagina");
    const botones = document.querySelectorAll(`${pagClase} .num`);
    const prev = document.querySelector(`${pagClase} .prev`);
    const next = document.querySelector(`${pagClase} .next`);

    let paginaActual = 0;

    function mostrarPagina(index) {
      paginas.forEach((p) => p.classList.remove("activa"));
      paginas[index].classList.add("activa");

      botones.forEach((b) => b.classList.remove("activo"));
      botones[index].classList.add("activo");
    }

    botones.forEach((btn, i) => {
      btn.addEventListener("click", () => {
        paginaActual = i;
        mostrarPagina(paginaActual);
      });
    });

    prev.addEventListener("click", () => {
      if (paginaActual > 0) {
        paginaActual--;
        mostrarPagina(paginaActual);
      }
    });

    next.addEventListener("click", () => {
      if (paginaActual < paginas.length - 1) {
        paginaActual++;
        mostrarPagina(paginaActual);
      }
    });
  }

  crearPaginacion(".articulos-blog:nth-of-type(1)", ".pag1"); // opiniones
  crearPaginacion(".articulos-blog:nth-of-type(2)", ".pag2"); // guias
});

document.addEventListener("DOMContentLoaded", () => {
  function crearPaginacion(seccionClase, pagClase) {
    const seccion = document.querySelector(seccionClase);
    if (!seccion) return;

    const paginas = seccion.querySelectorAll(".pagina");
    const botones = document.querySelectorAll(`${pagClase} .num`);
    const prev = document.querySelector(`${pagClase} .prev`);
    const next = document.querySelector(`${pagClase} .next`);

    if (!paginas.length || !botones.length || !prev || !next) return;

    let paginaActual = 0;

    function mostrarPagina(index) {
      paginas.forEach((p) => p.classList.remove("activa"));
      paginas[index].classList.add("activa");

      botones.forEach((b) => b.classList.remove("activo"));
      botones[index].classList.add("activo");
    }

    botones.forEach((btn, i) => {
      btn.addEventListener("click", () => {
        paginaActual = i;
        mostrarPagina(paginaActual);
      });
    });

    prev.addEventListener("click", () => {
      if (paginaActual > 0) {
        paginaActual--;
        mostrarPagina(paginaActual);
      }
    });

    next.addEventListener("click", () => {
      if (paginaActual < paginas.length - 1) {
        paginaActual++;
        mostrarPagina(paginaActual);
      }
    });
  }

  crearPaginacion(".articulos-blog", ".pag3"); //Blog
});
