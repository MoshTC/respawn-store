// estas funciones son para el funcionamiento de las "pills" en la sección de promociones
// busca todo los elementos con la clase "pill" 
document.querySelectorAll('.pill').forEach(pill => {
  // cuando haces click en una de las "pills" se ejecuta esta función
  pill.addEventListener('click', function () {
    // quita la clase "active" de todas las "pills"
    document.querySelectorAll('.pill').forEach(p => p.classList.remove('active'));
    // agrega la clase "active" al elemento clicado
    this.classList.add('active');
  });
});
