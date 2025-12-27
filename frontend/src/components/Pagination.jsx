import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Pagination = ({ previous, next, onPageChange }) => {
  return (
    <div className="flex justify-center items-center gap-3">
      <button
        onClick={() => onPageChange(previous)}
        disabled={!previous}
        className="flex items-center gap-1 px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg shadow-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50 hover:text-blue-600 transition-all font-medium text-sm"
      >
        <ChevronLeft className="w-4 h-4" />
        Previous
      </button>
      
      <button
        onClick={() => onPageChange(next)}
        disabled={!next}
        className="flex items-center gap-1 px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg shadow-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50 hover:text-blue-600 transition-all font-medium text-sm"
      >
        Next
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
};

export default Pagination;
