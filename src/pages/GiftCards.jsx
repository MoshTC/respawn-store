import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Breadcrumb from '../components/ui/Breadcrumb';
import ProductCard from '../components/products/ProductCard';
import { giftCardsData } from '../data/giftcards';
import { getAssetUrl } from '../utils/assets';

export default function GiftCards() {
  const [addedItems, setAddedItems] = useState({});

  const handleAdd = (id) => {
    setAddedItems((prev) => ({ ...prev, [id]: true }));
    setTimeout(() => {
      setAddedItems((prev) => ({ ...prev, [id]: false }));
    }, 2000);
  };

  const breadcrumbItems = [
    { label: 'Inicio', path: '/' },
    { label: 'Productos', path: '/productos' },
    { label: 'Gift Cards' },
  ];

  return (
    <>
      <section style={{ paddingBottom: 0 }}>
        <Breadcrumb items={breadcrumbItems} />
      </section>

      <div className="hero">
        <div className="hero-bg"></div>
        <div className="hero-content">
          <span className="hero-tag">Tarjetas digitales</span>
          <h1>
            Gift Cards y <span>Membresias</span>
          </h1>
          <p>
            Regala la experiencia de jugar con una tarjeta prepaga para gastar
            en juegos, complementos, suscripciones y mas. Entrega instantanea a
            tu correo.
          </p>
          <div className="hero-btns">
            <a href="#tarjetas">
              <button type="button" className="btn-primary">
                Ver tarjetas
              </button>
            </a>
            <Link to="/ayuda/contacto">
              <button type="button" className="btn-ghost">
                Contactanos
              </button>
            </Link>
          </div>
        </div>

        <img
          className="hero-img"
          src={getAssetUrl('imagenes/banner-top.jpg')}
          alt="Tarjetas de regalo para que la diversion no se detenga"
        />
      </div>

      <div
        style={{
          margin: '2rem 2rem 0',
          background: 'var(--bg3)',
          border: '1px solid var(--border)',
          borderRadius: '12px',
          padding: '1.5rem 2rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1.5rem',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
          <div
            style={{
              background: 'var(--cyan-dim)',
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--cyan)',
            }}
          >
            <i className="ti ti-headset" style={{ fontSize: '26px' }}></i>
          </div>
          <div>
            <h3
              style={{
                fontSize: '16px',
                color: 'var(--text)',
                fontWeight: 700,
                marginBottom: '4px',
              }}
            >
              Escucha lo que tenemos para ti
            </h3>
            <p style={{ fontSize: '13px', color: 'var(--muted)', margin: 0 }}>
              Conoce todos los beneficios de nuestras tarjetas digitales.
            </p>
          </div>
        </div>

        <audio
          controls
          style={{
            height: '44px',
            borderRadius: '30px',
            outline: 'none',
            flexGrow: 1,
            maxWidth: '350px',
          }}
        >
          <source src={getAssetUrl('media/audio-intro.mp3')} type="audio/mpeg" />
          Tu navegador no soporta el elemento de audio.
        </audio>
      </div>

      <section id="tarjetas">
        <h2 className="section-title">Gift Cards y Membresias</h2>
        <div className="section-sub">
          Recarga al instante para tus juegos favoritos
        </div>
        <div className="products">
          {giftCardsData.map((card) => (
            <ProductCard
              key={card.id}
              image={card.image}
              name={card.name}
              category={card.category}
              price={card.price}
              badge={card.badge}
              actionText={addedItems[card.id] ? '¡Añadido!' : 'Añadir'}
              onAction={() => handleAdd(card.id)}
            />
          ))}
        </div>
      </section>

      <section>
        <img
          src={getAssetUrl('imagenes/ofertas-banner.jpg')}
          className="ofertas-img"
          alt="Aprovecha todas nuestras ofertas"
        />
      </section>
    </>
  );
}

