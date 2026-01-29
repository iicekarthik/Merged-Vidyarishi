import React from "react";

const Pagination = ({ totalPages, pageNumber, handleClick }) => {
  const maxVisiblePages = 10; // Display 6 pages at a time

  const getVisiblePages = () => {
    if (totalPages <= maxVisiblePages) return [...Array(totalPages).keys()].map((i) => i + 1);

    let start = Math.max(1, pageNumber - Math.floor(maxVisiblePages / 2));
    let end = start + maxVisiblePages - 1;

    if (end > totalPages) {
      end = totalPages;
      start = end - maxVisiblePages + 1;
    }

    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  const visiblePages = getVisiblePages();

  const handlePreviousClick = () => {
    if (pageNumber > 1) handleClick(pageNumber - 1);
  };

  const handleNextClick = () => {
    if (pageNumber < totalPages) handleClick(pageNumber + 1);
  };

  return (
    <nav style={{ marginTop: "30px" }}>
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        <ul
          style={{
            display: "flex",
            gap: "10px",
            alignItems: "center",
            listStyle: "none",
            padding: 0,
            margin: 0,
            flexWrap: "nowrap",
          }}
        >
          {/* Previous Button */}
          <li>
            <button
              onClick={handlePreviousClick}
              disabled={pageNumber === 1}
              style={{
                padding: "8px 14px",
                border: "none",
                backgroundColor: "#fff",
                boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                borderRadius: "6px",
                cursor: pageNumber === 1 ? "not-allowed" : "pointer",
                color: pageNumber === 1 ? "#ccc" : "#0070f3",
                fontWeight: 600,
                transition: "all 0.2s",
              }}
              aria-label="Previous Page"
            >
              &#x276E; {/* Left arrow */}
            </button>
          </li>

          {/* Page Numbers */}
          {visiblePages.map((num) => (
            <li key={num}>
              <button
                onClick={() => handleClick(num)}
                className={pageNumber === num ? "active-page" : ""}
                style={{
                  minWidth: "40px",
                  padding: "8px 12px",
                  border: "none",
                  borderRadius: "6px",
                  textAlign: "center",
                  backgroundColor: pageNumber === num ? "#0070f3" : "#fff",
                  color: pageNumber === num ? "#fff" : "#000",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                  fontWeight: pageNumber === num ? "600" : "400",
                  cursor: "pointer",
                  transition: "all 0.2s",
                }}
              >
                {num}
              </button>
            </li>
          ))}

          {/* Next Button */}
          <li>
            <button
              onClick={handleNextClick}
              disabled={pageNumber === totalPages}
              style={{
                padding: "8px 14px",
                border: "none",
                backgroundColor: "#fff",
                boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                borderRadius: "6px",
                cursor: pageNumber === totalPages ? "not-allowed" : "pointer",
                color: pageNumber === totalPages ? "#ccc" : "#0070f3",
                fontWeight: 600,
                transition: "all 0.2s",
              }}
              aria-label="Next Page"
            >
              &#x276F; {/* Right arrow */}
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Pagination;