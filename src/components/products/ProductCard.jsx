import React from 'react';
import { getAssetUrl } from '../../utils/assets';

export default function ProductCard({
  image,
  name,
  category,
  price,
  badge,
  badgeClass = '',
  actionText = 'Ver detalles',
  onAction,
}) {
  return (
    <div className="product-card">
      <div className="card-img">
        {badge && (
          <span className={`card-badge ${badgeClass}`.trim()}>{badge}</span>
        )}
        <img
          src={getAssetUrl(image)}
          alt={name}
          loading="lazy"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            objectPosition: 'center center',
          }}
        />
      </div>
      <div className="card-body">
        <div className="card-name">{name}</div>
        <div className="card-cat">{category}</div>
        <div className="card-footer">
          <span className="price">{price}</span>
          <button
            type="button"
            className="btn-detail"
            onClick={onAction}
          >
            {actionText}
          </button>
        </div>
      </div>
    </div>
  );
}

