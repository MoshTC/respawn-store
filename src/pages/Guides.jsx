import React, { useState } from 'react';
import { opinionsPages, guidesPages } from '../data/community';
import Pagination from '../components/ui/Pagination';
import { getAssetUrl } from '../utils/assets';

export default function Guides() {
  const [opinionsPage, setOpinionsPage] = useState(0);
  const [guidesPage, setGuidesPage] = useState(0);

  const currentOpinions = opinionsPages[opinionsPage] || [];
  const currentGuides = guidesPages[guidesPage] || [];

  return (
    <>
      <div>
        <img
          className="comunidad-banner"
          src={getAssetUrl('imagenes/comunidadbanner3.png')}
          alt="banner de consejos y guias"
        />
      </div>

      <h1 className="titulo-video">
        PS5 vs PS5 Slim vs PS5 Pro:{' '}
        <span style={{ color: 'var(--cyan)' }}>¿Cuál PS5 deberías comprar?</span>
      </h1>

      <div className="video">
        <video src={getAssetUrl('video/videoComunidad.mp4')} controls></video>
      </div>

      <h1 className="subtitulos">
        Opiniones <span style={{ color: 'var(--cyan)' }}>Recientes</span>
      </h1>

      <section className="articulos-blog">
        <div className="pagina activa">
          {currentOpinions.map((op, idx) => (
            <div className="articulos-recientes" key={idx}>
              <img src={getAssetUrl(op.image)} alt={op.title} />
              <a href={op.link} target="_blank" rel="noopener noreferrer">
                {op.title}
              </a>
              <h5>{op.date}</h5>
            </div>
          ))}
        </div>

        <Pagination
          currentPage={opinionsPage}
          totalPages={opinionsPages.length}
          onPageChange={setOpinionsPage}
          className="pag1"
        />
      </section>

      <h1 className="subtitulos">
        Guias<span style={{ color: 'var(--cyan)' }}> Recientes</span>
      </h1>

      <section className="articulos-blog blog2">
        <div className="pagina activa">
          {currentGuides.map((guide, idx) => (
            <div className="articulos-recientes" key={idx}>
              <img src={getAssetUrl(guide.image)} alt={guide.title} />
              <a href={guide.link} target="_blank" rel="noopener noreferrer">
                {guide.title}
              </a>
              <h5>{guide.date}</h5>
            </div>
          ))}
        </div>

        <Pagination
          currentPage={guidesPage}
          totalPages={guidesPages.length}
          onPageChange={setGuidesPage}
          className="pag2"
        />
      </section>
    </>
  );
}

