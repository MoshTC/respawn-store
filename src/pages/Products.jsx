import React from 'react';
import { useNavigate } from 'react-router-dom';
import ProductCard from '../components/products/ProductCard';
import { catalogProducts, brandSections } from '../data/products';
import { getAssetUrl } from '../utils/assets';

export default function Products() {
  const navigate = useNavigate();

  return (
    <>
      <div className="tienda-banner-principal-wrap">
        <div className="tienda-banner-placeholder">
          <img
            src={getAssetUrl('imagenes/VIVE EL JUEGO.jpg')}
            alt="banner principal"
          />
        </div>
      </div>

      <section className="tienda-destacados">
        <div className="products">
          {catalogProducts.map((prod) => (
            <ProductCard
              key={prod.id}
              image={prod.image}
              name={prod.name}
              category={prod.category}
              price={prod.price}
              badge={prod.badge}
              actionText="Ver detalles"
              onAction={() => {}}
            />
          ))}
        </div>
      </section>

      <div className="promo-wrap">
        <div className="promo">
          <div>
            <div className="promo-tag">Nuevos lanzamientos</div>
            <h2>
              STEAM <span>DECK</span>
            </h2>
            <div className="promo-sub">Disfruta de lo nuevo en consolas</div>
            <p>
              Experimenta un rendimiento gráfico sin precedentes, trazado de
              rayos avanzado y tasas de fotogramas más fluidas.
            </p>
            <div className="promo-btns">
              <button
                type="button"
                className="btn-primary"
                onClick={() => navigate('/productos/juegos')}
              >
                Más información
              </button>
              <button
                type="button"
                className="btn-ghost"
                onClick={() => navigate('/ayuda/contacto')}
              >
                Comprar ahora
              </button>
            </div>
          </div>
          <div className="promo-img">
            <div className="wireframe-media-box">
              <img
                src={getAssetUrl('imagenes/SteamDpublicidad.jpg')}
                alt="Steam Deck OLED (1TB)"
              />
            </div>
          </div>
        </div>
      </div>

      {brandSections.map((brand, idx) => (
        <section key={idx} className="tienda-marca">
          <h2 className="section-title">{brand.title}</h2>
          <p className="section-sub">{brand.subtitle}</p>
          <div className="games grid-mini-cards">
            {brand.items.map((item) => (
              <div key={item.id} className="game-card">
                <img src={getAssetUrl(item.image)} alt={item.name} />
              </div>
            ))}
          </div>
        </section>
      ))}

      <div className="tienda-footer-banner-wrap">
        <div className="banner-publicitario-wireframe">
          <img
            src={getAssetUrl('imagenes/JUEGA CUANDO QUIERAS.jpg')}
            alt="banner principal"
          />
        </div>
      </div>
    </>
  );
}

