import React, { useState } from 'react';
import { blogFeatured, blogPages } from '../data/community';
import Pagination from '../components/ui/Pagination';
import { getAssetUrl } from '../utils/assets';

export default function Blog() {
  const [currentPage, setCurrentPage] = useState(0);

  const currentArticles = blogPages[currentPage] || [];

  return (
    <>
      <div>
        <img
          className="comunidad-banner"
          src={getAssetUrl('imagenes/comunidadbanner2.png')}
          alt="banner de blog"
        />
      </div>

      <h1 className="titulo-Destacado">
        Articulo<span style={{ color: 'var(--cyan)' }}> Destacado</span>
      </h1>

      <section>
        <div className="contenedor-destacado">
          <img
            className="img-destacado"
            src={getAssetUrl(blogFeatured.image)}
            alt={blogFeatured.title}
          />
          <h1>{blogFeatured.title}</h1>
          <p>{blogFeatured.snippet}</p>
          <h5>
            por {blogFeatured.author} . {blogFeatured.date}
          </h5>
          <br />
          <a
            href={blogFeatured.link}
            target="_blank"
            rel="noopener noreferrer"
          >
            <button className="btn-primary" type="button">
              Leer más..
            </button>
          </a>
        </div>
      </section>

      <h1 className="titulo-Destacado">
        Articulos <span style={{ color: 'var(--cyan)' }}>más recientes</span>
      </h1>

      <section className="articulos-blog">
        <div className="pagina activa">
          {currentArticles.map((article, idx) => (
            <div className="articulos-recientes" key={idx}>
              <img src={getAssetUrl(article.image)} alt={article.title} />
              <a
                href={article.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                {article.title}
              </a>
            </div>
          ))}
        </div>

        <Pagination
          currentPage={currentPage}
          totalPages={blogPages.length}
          onPageChange={setCurrentPage}
          className="pag3"
        />
      </section>
    </>
  );
}

