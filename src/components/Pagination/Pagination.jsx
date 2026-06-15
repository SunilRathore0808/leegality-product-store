// src/components/Pagination/Pagination.jsx
import React from "react";
import "./Pagination.css";

const Pagination = ({ currentPage, totalPages, setCurrentPage }) => {
  if (totalPages <= 1) return null;

  const renderPageNumbers = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => setCurrentPage(i)}
          className={`page-num-btn ${currentPage === i ? "active" : ""}`}
        >
          {i}
        </button>
      );
    }
    return pages;
  };

  return (
    <div className="pagination-wrapper">
      <button
        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
        disabled={currentPage === 1}
        className="arrow-btn"
      >
        ← Previous
      </button>

      <div className="numeric-pages-container">{renderPageNumbers()}</div>

      <button
        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
        disabled={currentPage === totalPages}
        className="arrow-btn"
      >
        Next →
      </button>
    </div>
  );
};

export default Pagination;
