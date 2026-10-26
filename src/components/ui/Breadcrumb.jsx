import React from 'react';
import { Link } from 'react-router-dom';

export default function Breadcrumb({ items }) {
  if (!items || items.length === 0) return null;

  return (
    <nav className="breadcrumb" aria-label="Breadcrumb">
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <React.Fragment key={index}>
            {index > 0 && <span>/</span>}
            {isLast ? (
              <span className="breadcrumb-actual">{item.label}</span>
            ) : item.path ? (
              <Link to={item.path}>{item.label}</Link>
            ) : (
              <span>{item.label}</span>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
}

