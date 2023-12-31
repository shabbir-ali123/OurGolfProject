// Pagination.jsx
import React, { useEffect, useState } from "react";
interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (pageNumber: number) => void;
  pageSize: number;
  isPreviousDisabled: boolean;
  isNextDisabled: boolean;
}
const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  pageSize,
  isPreviousDisabled,
  isNextDisabled,
}) => {
  const pageNumbers = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  );
  const [liveevents, setLiveEvents] = useState<Event[]>([]);
  return (
    <div className=" flex items-center justify-center border-t border-gray-200 bg-transparent px-4 py-3 sm:px-6">
      <div className=" hidden sm:flex sm:flex-1 sm:items-center sm:justify-center ">
        <div >
          <nav
            className="z-[-1] isolate inline-flex -space-x-px rounded-md shadow-sm"
            aria-label="Pagination"
          >
            <button
              onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
              className={`relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 ${
                currentPage === 1
                  ? "cursor-not-allowed bg-gray-300"
                  : "hover:bg-blue-500"
              }`}
              disabled={currentPage === 1}
            >
              <span className="sr-only">Previous</span>
              <svg
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
                  clipRule="evenodd"
                />
              </svg>
            </button>

            {pageNumbers.map((page) => (
              <button
                key={page}
                onClick={() => onPageChange(page)}
                className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 ${
                  page === currentPage
                    ? "bg-indigo-600 text-white"
                    : "hover:bg-blue-500"
                }`}
              >
                {page}
              </button>
            ))}

            <button
              onClick={() =>
                onPageChange(Math.min(currentPage + 1, totalPages))
              }
              className={`relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 ${
                currentPage === totalPages
                  ? "cursor-not-allowed bg-gray-300"
                  : "hover:bg-blue-500"
              }`}
              disabled={currentPage === totalPages}
            >
              <span className="sr-only">Next</span>
              <svg
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
};
export default Pagination;
