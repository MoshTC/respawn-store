import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <>
      <footer>
        <div className="footer-brand">
          <Link to="/" className="logo" style={{ fontSize: '20px' }}>
            RESPAWN<span> STORE</span>
          </Link>
          <p>
            Tu tienda gaming de confianza en Perú. Consolas, juegos y accesorios
            al mejor precio con garantía oficial.
          </p>
        </div>

        <div>
          <div className="footer-title">Productos</div>
          <Link to="/productos">PlayStation</Link>
          <Link to="/productos">Xbox</Link>
          <Link to="/productos">Nintendo</Link>
          <Link to="/productos">Accesorios</Link>
          <Link to="/productos/juegos">Juegos</Link>
        </div>

        <div>
          <div className="footer-title">Comunidad</div>
          <a href="#" target="_blank" rel="noopener noreferrer">Discord</a>
          <a href="#" target="_blank" rel="noopener noreferrer">YouTube</a>
          <a href="#" target="_blank" rel="noopener noreferrer">Torneos</a>
          <Link to="/comunidad/blog">Blog</Link>
        </div>

        <div>
          <div className="footer-title">Soporte</div>
          <Link to="/ayuda">Centro de ayuda</Link>
          <Link to="/ayuda/preguntas-frecuentes">Preguntas frecuentes</Link>
          <Link to="/ayuda/contacto">Contacto</Link>
        </div>
      </footer>
      <div className="footer-copy">
        © 2026 Respawn Store · Todos los derechos reservados · Lima, Perú
      </div>
    </>
  );
}

