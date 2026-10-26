import React, { useState } from 'react';
import {
  communityFeatured,
  communityAside,
  communityRecentArticles,
} from '../data/community';
import Modal from '../components/ui/Modal';
import { getAssetUrl } from '../utils/assets';

export default function Community() {
  const [previewImage, setPreviewImage] = useState(null);

  return (
    <>
      <div>
        <img
          className="comunidad-banner"
          src={getAssetUrl('imagenes/comunidad banner.png')}
          alt="banner principal de comunidad"
        />
      </div>

      <h1 className="titulo-comunidad">
        Destacados <span style={{ color: 'var(--cyan)' }}>Hoy</span>
      </h1>

      <section className="cards-destacados">
        <div className="Destacado">
          <img src={getAssetUrl(communityFeatured.image)} alt={communityFeatured.title} />
          <h2>{communityFeatured.title}</h2>
          <a
            href={communityFeatured.link}
            target="_blank"
            rel="noopener noreferrer"
          >
            leer más..
          </a>
        </div>

        <aside>
          {communityAside.map((item) => (
            <div className="cards-aside" key={item.id}>
              <img src={getAssetUrl(item.image)} alt={item.title} />
              <div className="info">
                <h5>{item.tag}</h5>
                <h4>{item.title}</h4>
                <a href={item.link} target="_blank" rel="noopener noreferrer">
                  leer más..
                </a>
              </div>
            </div>
          ))}
        </aside>
      </section>

      <h1 className="titulo-comunidad">
        Articulos más{' '}
        <span style={{ color: 'var(--cyan)' }}>recientes del blog</span>
      </h1>

      <section className="contenedor-articulos">
        {communityRecentArticles.map((article) => (
          <div className="article" key={article.id}>
            <button
              type="button"
              style={{
                background: 'none',
                border: 'none',
                padding: 0,
                cursor: 'pointer',
                display: 'block',
                width: '100%',
              }}
              onClick={() => setPreviewImage(getAssetUrl(article.fullImg))}
              aria-label={`Ver imagen ampliada de ${article.title}`}
            >
              <img
                className="img-articulos"
                src={getAssetUrl(article.thumb)}
                alt={article.title}
              />
            </button>
            <h2>{article.title}</h2>
            <a href={article.link} target="_blank" rel="noopener noreferrer">
              leer más..
            </a>
          </div>
        ))}
      </section>

      <Modal
        isOpen={Boolean(previewImage)}
        onClose={() => setPreviewImage(null)}
        title="Vista previa"
      >
        {previewImage && (
          <img
            src={previewImage}
            alt="Vista previa"
            style={{ width: '100%', borderRadius: '8px', maxHeight: '75vh', objectFit: 'contain' }}
          />
        )}
      </Modal>
    </>
  );
}

