import React, { useEffect, useRef } from 'react';
import { getAssetUrl } from '../utils/assets';

export default function About() {
  const containerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.15 }
    );

    const elements = containerRef.current?.querySelectorAll('.revelar');
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div ref={containerRef}>
      <div className="hero">
        <div className="hero-bg"></div>
        <div className="hero-content">
          <span className="hero-tag">Sobre nosotros</span>
          <h1>
            Tu próxima
            <br />
            <span>aventura</span>
            <br />
            comienza aquí
          </h1>
          <p>
            En Respawn Store encontrarás las mejores consolas, accesorios y
            juegos para llevar tu experiencia gamer al siguiente nivel.
          </p>
          <div className="hero-btns">
            <button
              type="button"
              className="btn-primary"
              onClick={() => scrollToSection('historia')}
            >
              Conócenos
            </button>
          </div>
        </div>
        <div className="hero-decoration">
          <img
            src={getAssetUrl('imagenes/imagen consola.png')}
            alt="Consola principal"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              objectPosition: 'right center',
            }}
          />
        </div>
      </div>

      <div className="promo-wrap revelar" id="historia" style={{ marginTop: '2rem' }}>
        <div className="promo">
          <div>
            <div className="promo-tag">Nuestra historia</div>
            <h2>
              Nuestra <span>historia</span>
            </h2>
            <p>
              Respawn Store nació con el objetivo de ofrecer las mejores
              consolas y accesorios para los amantes de los videojuegos. Nuestro
              compromiso es brindar calidad, confianza y una gran experiencia a
              cada cliente.
            </p>
            <div className="promo-btns">
              <button
                type="button"
                className="btn-ghost"
                onClick={() => scrollToSection('descubre-tienda')}
              >
                Leer más
              </button>
            </div>
          </div>
          <div className="promo-img">
            <img
              src={getAssetUrl('imagenes/cuarto gamer.png')}
              alt="Cuarto gamer"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center center',
              }}
            />
          </div>
        </div>
      </div>

      <div
        className="promo-wrap revelar"
        id="descubre-tienda"
        style={{ marginTop: '2rem' }}
      >
        <div className="promo">
          <div>
            <div className="promo-tag">Conoce más</div>
            <h2>
              Descubre <span>Respawn Store</span>
            </h2>
            <p>
              Acompáñanos a descubrir todos los servicios que tenemos. Conoce de
              primera mano todo lo que hace única a nuestra tienda.
            </p>
          </div>
          <div className="promo-img" style={{ border: 'none' }}>
            <video
              controls
              poster={getAssetUrl('imagenes/poster-video.png')}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                borderRadius: '10px',
                outline: 'none',
                display: 'block',
              }}
            >
              <source src={getAssetUrl('media/video-intro.mp4')} type="video/mp4" />
              Tu navegador no soporta el elemento de video.
            </video>
          </div>
        </div>
      </div>

      <section id="equipo" className="revelar">
        <div className="section-title">Conoce al equipo</div>
        <div className="section-sub">
          Detrás de cada pedido y cada recomendación, hay un equipo de gamers
          como tú para ayudarte.
        </div>
        <img
          src={getAssetUrl('imagenes/equipo.png')}
          alt="Equipo de Respawn Store"
          style={{
            width: '100%',
            borderRadius: '14px',
            border: '1px solid var(--border)',
            marginBottom: '1.25rem',
          }}
        />
        <div className="hero-btns">
          <button
            type="button"
            className="btn-primary"
            onClick={() => scrollToSection('ubicacion')}
          >
            Ver equipo
          </button>
        </div>
      </section>

      <div className="promo-wrap revelar" id="ubicacion">
        <div className="promo">
          <div>
            <div className="promo-tag">Visítanos</div>
            <h2>
              Nuestra <span>ubicación</span>
            </h2>
            <p>
              Visítanos en nuestra tienda física o contáctanos en nuestras
              redes. ¡Te esperamos!
            </p>
            <div className="promo-btns">
              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <button type="button" className="btn-primary">
                  Cómo llegar
                </button>
              </a>
            </div>
          </div>
          <div className="promo-img">
            <img
              src={getAssetUrl('imagenes/ubi.webp')}
              alt="Ubicación de la tienda"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center center',
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

