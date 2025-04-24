import React from 'react';

function Pagination({ Pageno, nex, prev }) {
  return (
    <div className="mt-8 flex justify-center items-center gap-6 sm:gap-8 text-base sm:text-lg">
      <button
        onClick={prev}
        className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded transition duration-200"
        aria-label="Previous Page"
      >
        ←
      </button>

      <span className="font-semibold text-gray-700">{Pageno}</span>

      <button
        onClick={nex}
        className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded transition duration-200"
        aria-label="Next Page"
      >
        →
      </button>
    </div>
  );
}

export default Pagination;
