import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { navLinks, socialLinks } from '../../data/navigation';
import { getAssetUrl } from '../../utils/assets';

export default function Navbar() {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearchSubmit = (e) => {
    if (e.key === 'Enter' && searchQuery.trim()) {
      navigate(`/productos?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <nav>
      <Link to="/" className="logo" aria-label="Respawn Store">
        <img
          src={getAssetUrl('imagenes/logoresblue.png')}
          alt="Respawn Store"
          height="40"
        />
      </Link>

      <ul className="nav-links">
        {navLinks.map((item, index) => {
          if (item.dropdown) {
            return (
              <li className="nav-item-dropdown" key={index}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) => (isActive ? 'active' : '')}
                >
                  {item.label}{' '}
                  <i className="ti ti-chevron-down nav-arrow" aria-hidden="true"></i>
                </NavLink>
                <div className="nav-dropdown">
                  {item.dropdown.map((sub, sIdx) => (
                    <Link to={sub.path} key={sIdx}>
                      <i className={`ti ${sub.icon}`} aria-hidden="true"></i>{' '}
                      {sub.label}
                    </Link>
                  ))}
                </div>
              </li>
            );
          }

          return (
            <li key={index}>
              <NavLink
                to={item.path}
                className={({ isActive }) => (isActive ? 'active' : '')}
              >
                {item.label}
              </NavLink>
            </li>
          );
        })}
      </ul>

      <div className="search-box">
        <i className="ti ti-search" aria-hidden="true"></i>
        <input
          type="text"
          placeholder="Buscar consolas accesorios..."
          aria-label="Buscar productos"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={handleSearchSubmit}
        />
      </div>

      <div className="socials">
        {socialLinks.map((s, idx) => (
          <a
            key={idx}
            href={s.href}
            aria-label={s.name}
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className={`ti ${s.icon}`}></i>
          </a>
        ))}
      </div>
    </nav>
  );
}

