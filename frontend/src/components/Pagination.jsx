import React from "react";

const Pagination = ({ previous, next, onPageChange }) => {
  return (
    <div className="flex justify-center items-center space-x-4 ">
      <button
        onClick={() => onPageChange(previous)}
        disabled={!previous}
        className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50  cursor-pointer"
      >
        Previous
      </button>
      <button
        onClick={() => onPageChange(next)}
        disabled={!next}
        className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50  cursor-pointer"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
