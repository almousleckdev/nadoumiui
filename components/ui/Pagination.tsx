"use client";
import Button from "./Button";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems?: number;
  itemsPerPage?: number;
  onPageChange: (page: number) => void;
  onItemsPerPageChange?: (limit: number) => void;
  className?: string;
}

export default function Pagination({
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage = 10,
  onPageChange,
  onItemsPerPageChange,
  className = "",
}: PaginationProps) {
  if (totalPages <= 1 && totalItems === undefined) return null;

  const startItem = totalItems === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1;
  const endItem = totalItems
    ? Math.min(currentPage * itemsPerPage, totalItems)
    : currentPage * itemsPerPage;

  return (
    <div
      className={`flex flex-col sm:flex-row items-center justify-between px-6 py-4 border-t border-gray-200 dark:border-slate-800 gap-4 sm:gap-0 ${className}`}
    >
      {/* Total Items Info & Items Per Page Selector */}
      <div className="flex items-center gap-4 text-xs font-medium text-gray-500 dark:text-slate-400">
        {totalItems !== undefined && (
          <p>
            Showing{" "}
            <span className="font-semibold text-gray-900 dark:text-slate-200">
              {startItem}
            </span>{" "}
            to{" "}
            <span className="font-semibold text-gray-900 dark:text-slate-200">
              {endItem}
            </span>{" "}
            of{" "}
            <span className="font-semibold text-gray-900 dark:text-slate-200">
              {totalItems}
            </span>{" "}
            results
          </p>
        )}

        {onItemsPerPageChange && (
          <div className="flex items-center gap-2">
            <span>Rows per page:</span>
            <select
              value={itemsPerPage}
              onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
              className="bg-transparent border border-gray-200 dark:border-slate-700 text-gray-700 dark:text-slate-300 rounded px-2 py-1 text-xs focus:ring-orange-500 focus:border-orange-500"
            >
              {[5, 10, 25, 50, 100].map((val) => (
                <option key={val} value={val} className="dark:bg-slate-800">
                  {val}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Page Navigation */}
      {totalPages > 1 && (
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            disabled={currentPage <= 1}
            onClick={() => onPageChange(currentPage - 1)}
          >
            Previous
          </Button>

          <div className="hidden md:flex items-center gap-1">
            {/* Show page numbers dynamically */}
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
              // Show current, first, last, and pages adjacent to current
              if (
                page === 1 ||
                page === totalPages ||
                (page >= currentPage - 1 && page <= currentPage + 1)
              ) {
                return (
                  <button
                    key={page}
                    onClick={() => onPageChange(page)}
                    className={`w-8 h-8 flex items-center justify-center rounded text-sm font-medium transition-colors ${
                      currentPage === page
                        ? "bg-orange-600 text-white"
                        : "text-gray-600 hover:bg-gray-100 dark:text-slate-400 dark:hover:bg-slate-800"
                    }`}
                  >
                    {page}
                  </button>
                );
              } else if (page === currentPage - 2 || page === currentPage + 2) {
                return (
                  <span
                    key={page}
                    className="text-gray-400 dark:text-slate-600 px-1"
                  >
                    ...
                  </span>
                );
              }
              return null;
            })}
          </div>

          <p className="text-xs font-medium text-gray-500 dark:text-slate-400 md:hidden">
            Page {currentPage} of {totalPages}
          </p>

          <Button
            variant="outline"
            size="sm"
            disabled={currentPage >= totalPages}
            onClick={() => onPageChange(currentPage + 1)}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
}
