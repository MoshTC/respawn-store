import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Breadcrumb from '../components/ui/Breadcrumb';
import { faqCategories, faqSections } from '../data/faqs';

export default function Faq() {
  const [activeTab, setActiveTab] = useState('todo');
  const [openItemId, setOpenItemId] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const searchParam = params.get('search');
    const hash = location.hash.replace('#', '');

    if (hash) {
      if (hash.startsWith('faq-')) {
        setOpenItemId(hash);
        for (const sec of faqSections) {
          if (sec.items.some((i) => i.id === hash)) {
            setActiveTab(sec.category);
            break;
          }
        }
        setTimeout(() => {
          const el = document.getElementById(hash);
          if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 100);
      } else {
        const matchingCat = faqCategories.find((c) => c.id === hash);
        if (matchingCat) {
          setActiveTab(hash);
          setTimeout(() => {
            const el = document.getElementById(hash);
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }, 100);
        }
      }
    } else if (searchParam) {
      const term = searchParam.toLowerCase();
      for (const sec of faqSections) {
        const found = sec.items.find(
          (i) =>
            i.question.toLowerCase().includes(term) ||
            i.answer.toLowerCase().includes(term)
        );
        if (found) {
          setOpenItemId(found.id);
          setActiveTab(sec.category);
          break;
        }
      }
    }
  }, [location.hash, location.search]);

  const toggleItem = (id) => {
    setOpenItemId((prev) => (prev === id ? null : id));
  };

  const breadcrumbItems = [
    { label: 'Inicio', path: '/' },
    { label: 'Centro de Ayuda', path: '/ayuda' },
    { label: 'Preguntas Frecuentes' },
  ];

  const visibleSections =
    activeTab === 'todo'
      ? faqSections
      : faqSections.filter((sec) => sec.category === activeTab);

  return (
    <>
      <div className="page-hero">
        <Breadcrumb items={breadcrumbItems} />
        <h1>Preguntas Frecuentes</h1>
        <p>
          Encuentra respuestas rápidas a las consultas más comunes de nuestra
          comunidad
        </p>
      </div>

      <div className="faq-tabs">
        {faqCategories.map((cat) => (
          <button
            key={cat.id}
            type="button"
            className={`faq-tab ${activeTab === cat.id ? 'active' : ''}`}
            onClick={() => setActiveTab(cat.id)}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {visibleSections.map((sec) => (
        <div
          className="faq-seccion"
          id={sec.id}
          key={sec.id}
          data-categoria={sec.category}
        >
          <h2 className="faq-categoria-header">{sec.title}</h2>

          {sec.items.map((item) => {
            const isOpen = openItemId === item.id;
            return (
              <div
                key={item.id}
                id={item.id}
                className={`faq-item ${isOpen ? 'open' : ''}`}
              >
                <button
                  type="button"
                  className="faq-pregunta"
                  onClick={() => toggleItem(item.id)}
                  aria-expanded={isOpen}
                >
                  {item.question}
                  <i className="ti ti-chevron-down" aria-hidden="true"></i>
                </button>
                <div className="faq-respuesta">
                  <p>
                    {item.routeHighlight ? (
                      item.answer
                        .split(item.routeHighlight)
                        .map((part, pIdx, arr) => (
                          <React.Fragment key={pIdx}>
                            {part}
                            {pIdx < arr.length - 1 && (
                              <span className="faq-ruta">
                                {item.routeHighlight}
                              </span>
                            )}
                          </React.Fragment>
                        ))
                    ) : (
                      item.answer
                    )}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      ))}

      <div className="ayuda-banner">
        <div>
          <h2>¿Necesitas ayuda personalizada?</h2>
          <p>Nuestro equipo de soporte está listo para ayudarte.</p>
        </div>
        <Link to="/ayuda/contacto" className="btn-primary">
          Contactar soporte
        </Link>
      </div>
    </>
  );
}

