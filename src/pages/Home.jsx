import React, { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Benefits from '../components/ui/Benefits';
import ProductCard from '../components/products/ProductCard';
import GameCard from '../components/products/GameCard';
import { homeProducts } from '../data/products';
import { mostPlayedGames } from '../data/games';
import { getAssetUrl } from '../utils/assets';

const PILL_OPTIONS = [
  'Todas',
  'PlayStation',
  'Xbox',
  'Nintendo',
  'Consolas Portátiles',
];

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState('Todas');
  const [sortBy, setSortBy] = useState('default');
  const [subscribed, setSubscribed] = useState(false);
  const navigate = useNavigate();

  const filteredProducts = useMemo(() => {
    let list = [...homeProducts];
    if (selectedCategory !== 'Todas') {
      list = list.filter((p) => p.category === selectedCategory);
    }
    if (sortBy === 'price-asc') {
      list.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      list.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'popular') {
      list.sort((a, b) => (b.popularity || 0) - (a.popularity || 0));
    } else if (sortBy === 'recent') {
      list.sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0));
    }
    return list;
  }, [selectedCategory, sortBy]);

  const handleSubscribe = () => {
    setSubscribed(true);
    setTimeout(() => setSubscribed(false), 3000);
  };

  return (
    <>
      <div className="hero">
        <div className="hero-bg"></div>
        <div className="hero-content">
          <span className="hero-tag">Nueva temporada 2026</span>
          <h1>
            Juega en
            <br />
            <span>otro nivel</span>
          </h1>
          <p>
            Las mejores consolas y accesorios gaming con envío a todo el Perú.
            Garantía oficial en cada compra.
          </p>
          <div className="hero-btns">
            <button
              type="button"
              className="btn-primary"
              onClick={() => navigate('/productos')}
            >
              Ver productos
            </button>
            <button
              type="button"
              className="btn-ghost"
              onClick={() => navigate('/productos/giftcards')}
            >
              Ver ofertas
            </button>
          </div>
        </div>
        <div className="hero-decoration">
          <img
            src={getAssetUrl('imagenes/JUEGA SIN LIMITES.jpg')}
            alt="decoración hero"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center center',
            }}
          />
        </div>
      </div>

      <Benefits />

      <section>
        <div className="filter-row">
          <div className="pills">
            {PILL_OPTIONS.map((pill) => (
              <button
                key={pill}
                type="button"
                className={`pill ${selectedCategory === pill ? 'active' : ''}`}
                onClick={() => setSelectedCategory(pill)}
              >
                {pill}
              </button>
            ))}
          </div>

          <select
            className="sort-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            aria-label="Ordenar productos"
          >
            <option value="default">Ordenar por</option>
            <option value="price-asc">Precio: menor a mayor</option>
            <option value="price-desc">Precio: mayor a menor</option>
            <option value="popular">Más popular</option>
            <option value="recent">Más reciente</option>
          </select>
        </div>

        <div className="products">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              image={product.image}
              name={product.name}
              category={product.categoryLabel}
              price={product.priceFormatted}
              badge={product.badge}
              badgeClass={product.badgeClass}
              onAction={() => navigate('/productos')}
            />
          ))}
        </div>
      </section>

      <div className="promo-wrap">
        <div className="promo">
          <div>
            <div className="promo-tag">Nuevos accesorios</div>
            <h2>
              Descubre los
              <br />
              <span>nuevos</span>
              <br />
              accesorios
            </h2>
            <div className="promo-sub">disfruta de las nuevas experiencias</div>
            <p>con los ultimos accesorios de esta generación</p>
            <div className="promo-btns">
              <button
                type="button"
                className="btn-ghost"
                onClick={() => navigate('/productos')}
              >
                Más información
              </button>
              <button
                type="button"
                className="btn-primary"
                onClick={() => navigate('/productos')}
              >
                Comprar ahora
              </button>
            </div>
          </div>
          <div className="promo-img">
            <img
              src={getAssetUrl('imagenes/promos.jpg')}
              alt="Accesorios gaming"
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

      <section style={{ paddingTop: 0 }}>
        <h2 className="section-title">Lo más jugado</h2>
        <div className="section-sub">Juega sin límites</div>
        <div className="games">
          {mostPlayedGames.map((game) => (
            <GameCard
              key={game.id}
              name={game.name}
              platform={game.platform}
              image={game.image}
              onClick={() => navigate('/productos/juegos')}
            />
          ))}
        </div>

        <div
          className="banner"
          style={{
            backgroundImage: `url(${getAssetUrl('imagenes/juega a tu manera.jpg')})`,
          }}
        >
          <div className="banner-glow"></div>
          <div className="banner-content">
            <h3>¿Listo para el siguiente nivel?</h3>
            <p>Suscríbete y recibe ofertas exclusivas antes que nadie</p>
            <button
              type="button"
              className="btn-primary"
              onClick={handleSubscribe}
            >
              {subscribed ? '¡Suscrito con éxito!' : 'Suscribirme ahora'}
            </button>
          </div>
        </div>
      </section>
    </>
  );
}

