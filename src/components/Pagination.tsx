import React from "react";
import "../styles/pagination.css"; // import your CSS file

export default function Pagination({ page, totalPages, setPage }: { page: number; totalPages: number; setPage: (page: number) => void }) {
    const handlePrev = () => setPage(Math.max(page - 1, 1));
    const handleNext = () => setPage(Math.min(page + 1, totalPages));

    return (
        <div className="pagination-container">
            <button
                onClick={handlePrev}
                disabled={page === 1}
                className="pagination-button prev-next"
            >
                Prev
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1)
                .filter((p) => {
                    return (
                        p === 1 ||
                        p === 2 ||
                        p === totalPages ||
                        p === totalPages - 1 ||
                        (p >= page - 1 && p <= page + 1)
                    );
                })
                .map((p, idx, arr) => {
                    const prev = arr[idx - 1];
                    const showDots = prev && p - prev > 1;
                    return (
                        <span key={p} className="pagination-item">
                            {showDots && <span className="dots">...</span>}
                            <button
                                onClick={() => setPage(p)}
                                className={`pagination-button ${p === page ? "active" : ""
                                    }`}
                            >
                                {p}
                            </button>
                        </span>
                    );
                })}

            <button
                onClick={handleNext}
                disabled={page === totalPages}
                className="pagination-button prev-next"
            >
                Next
            </button>
        </div>
    );
}
