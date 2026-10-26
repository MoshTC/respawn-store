import React from 'react';

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  className = '',
}) {
  if (totalPages <= 1) return null;

  const handlePrev = () => {
    if (currentPage > 0) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages - 1) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className={`paginacion ${className}`.trim()}>
      <button
        type="button"
        className="prev"
        onClick={handlePrev}
        disabled={currentPage === 0}
        aria-label="Página anterior"
      >
        «
      </button>

      {Array.from({ length: totalPages }).map((_, index) => (
        <button
          key={index}
          type="button"
          className={`num ${currentPage === index ? 'activo' : ''}`}
          onClick={() => onPageChange(index)}
          aria-label={`Página ${index + 1}`}
          aria-current={currentPage === index ? 'page' : undefined}
        >
          {index + 1}
        </button>
      ))}

      <button
        type="button"
        className="next"
        onClick={handleNext}
        disabled={currentPage === totalPages - 1}
        aria-label="Página siguiente"
      >
        »
      </button>
    </div>
  );
}

