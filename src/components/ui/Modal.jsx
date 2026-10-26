import React, { useEffect, useRef } from 'react';

export default function Modal({ isOpen, onClose, title, children }) {
  const closeBtnRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    if (closeBtnRef.current) {
      closeBtnRef.current.focus();
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="modal-overlay activo"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-titulo"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="modal-contenido">
        <button
          ref={closeBtnRef}
          type="button"
          className="modal-cerrar"
          aria-label="Cerrar modal"
          onClick={onClose}
        >
          &times;
        </button>

        {title && <h2 id="modal-titulo">{title}</h2>}
        <div className="modal-body">{children}</div>
      </div>
    </div>
  );
}

