import React from 'react';
import { getAssetUrl } from '../../utils/assets';

export default function GameCard({ name, platform, image, onClick }) {
  return (
    <div className="game-card" onClick={onClick}>
      <div className="game-img">
        <img
          src={getAssetUrl(image)}
          alt={name}
          loading="lazy"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center center',
          }}
        />
      </div>
      <div className="game-name">{name}</div>
      {platform && <div className="game-plat">{platform}</div>}
    </div>
  );
}

