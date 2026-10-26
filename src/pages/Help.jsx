import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { helpQuickCategories, popularArticles } from '../data/help';

export default function Help() {
  const [searchTerm, setSearchTerm] = useState('');
  const [chatOpened, setChatOpened] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/ayuda/preguntas-frecuentes?search=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  return (
    <>
      <div className="page-hero ayuda-hero">
        <h1>Centro de Ayuda</h1>
        <p>
          ¿Tienes alguna duda o inconveniente? Encuentra la respuesta que
          necesitas.
        </p>

        <form onSubmit={handleSearch} className="search-box ayuda-search">
          <i className="ti ti-search" aria-hidden="true"></i>
          <input
            type="text"
            placeholder="Busca tu problema o pregunta..."
            aria-label="Buscar en el centro de ayuda"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type="submit" className="btn-primary">
            Buscar
          </button>
        </form>
      </div>

      <section className="ayuda-categorias">
        <h2 className="ayuda-categorias-titulo">Categorías de ayuda rápida</h2>
        <div className="ayuda-grid">
          {helpQuickCategories.map((cat, idx) => (
            <div className="ayuda-card" key={idx}>
              <i className={`ti ${cat.icon}`}></i>
              <h3 className="ayuda-card-nombre">{cat.name}</h3>
              <p className="ayuda-card-desc">{cat.desc}</p>
              <Link to={cat.link} className="ayuda-card-link">
                Ver artículos →
              </Link>
            </div>
          ))}
        </div>
      </section>

      <section className="ayuda-articulos">
        <h2 className="ayuda-categorias-titulo">Artículos Populares</h2>
        <ul className="ayuda-lista">
          {popularArticles.map((art, idx) => (
            <li key={idx}>
              <Link to={art.link}>{art.title}</Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="ayuda-contacto">
        <h2>¿No encontraste lo que buscabas?</h2>
        <p>Contáctanos por el canal que prefieras y te ayudamos.</p>
        <div className="ayuda-contacto-grid">
          <div className="ayuda-contacto-card">
            <i className="ti ti-message"></i>
            <h3 className="ayuda-contacto-nombre">Chat en vivo</h3>
            <p>Un agente disponible te responde en menos de 5 minutos.</p>
            <button
              type="button"
              className="btn-primary"
              onClick={() => {
                setChatOpened(true);
                setTimeout(() => setChatOpened(false), 3000);
              }}
            >
              {chatOpened ? 'Conectando con un agente...' : 'Iniciar chat'}
            </button>
          </div>

          <div className="ayuda-contacto-card">
            <i className="ti ti-mail"></i>
            <h3 className="ayuda-contacto-nombre">Correo electrónico</h3>
            <p>Escríbenos y te respondemos en menos de 24 horas hábiles.</p>
            <Link to="/ayuda/contacto" className="btn-primary">
              Enviar correo
            </Link>
          </div>

          <div className="ayuda-contacto-card">
            <i className="ti ti-phone"></i>
            <h3 className="ayuda-contacto-nombre">Llámanos</h3>
            <p>Lun - Vie: 9:00 AM - 6:00 PM</p>
            <p>+51 900 000 000</p>
            <a href="tel:+51900000000" className="btn-primary">
              Llamar ahora
            </a>
          </div>
        </div>
      </section>

      <div className="ayuda-banner">
        <div>
          <h2>¿Necesitas atención personalizada?</h2>
          <p>
            Completa el formulario y un asesor se comunicará contigo a la
            brevedad.
          </p>
        </div>
        <Link to="/ayuda/contacto" className="btn-primary">
          Contactar soporte
        </Link>
      </div>
    </>
  );
}

