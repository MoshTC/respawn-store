import React from 'react';
import { allGames } from '../data/games';
import { getAssetUrl } from '../utils/assets';

export default function Games() {
  return (
    <>
      <div className="juegos-banner">
        <img
          src={getAssetUrl('imagenes/juegos_banner.png')}
          alt="banner principal de juegos"
        />
        <div className="textoBanner">
          <h2>Respawn Store</h2>
          <p>Explora y compra juegos para tus consolas favoritas.</p>
          <p>Encuentra títulos exclusivos, novedades y clásicos.</p>
        </div>
      </div>

      <section className="juegos">
        {allGames.map((game) => (
          <figure key={game.id}>
            <img src={getAssetUrl(game.image)} alt={game.name} loading="lazy" />
            <figcaption title={game.name}>
              {game.displayName ? (
                game.displayName.split('\n').map((line, i) => (
                  <React.Fragment key={i}>
                    {i > 0 && <br />}
                    {line}
                  </React.Fragment>
                ))
              ) : (
                game.name
              )}
            </figcaption>
          </figure>
        ))}
      </section>
    </>
  );
}

