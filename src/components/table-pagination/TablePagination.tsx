import "./table-pagination.css";
import {
  PaginationItems,
  PaginationNextTrigger,
  PaginationPrevTrigger,
  PaginationRoot,
} from "@chakra-ui/react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export type TablePaginationProps = {
  page: number;
  pageSize: number;
  totalCount: number;
  pageSizeOptions?: number[];
  onPageChange: (page: number) => void;
  onPageSizeChange: (pageSize: number) => void;
};

const defaultSizes = [10, 25, 50];

export function TablePagination({
  page,
  pageSize,
  totalCount,
  pageSizeOptions = defaultSizes,
  onPageChange,
  onPageSizeChange,
}: TablePaginationProps) {
  const count = totalCount;
  const paginationCount = Math.max(count, 1);

  const handlePageSizeChange = (nextSize: number) => {
    onPageSizeChange(nextSize);
    onPageChange(1);
  };

  return (
    <div className="table-pagination">
      <div className="table-pagination__page-size-wrap">
        <label className="table-pagination__page-size-label">
          <span className="table-pagination__sr-only">Baris per halaman</span>
          <select
            className="table-pagination__page-size"
            aria-label="Baris per halaman"
            value={String(pageSize)}
            onChange={(e) => handlePageSizeChange(Number(e.target.value))}
          >
            {pageSizeOptions.map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </label>
      </div>

      <nav className="table-pagination__nav" aria-label="Pagination">
        <PaginationRoot
          count={paginationCount}
          pageSize={pageSize}
          page={page}
          siblingCount={1}
          boundaryCount={1}
          onPageChange={(details) => onPageChange(details.page)}
          translations={{
            prevTriggerLabel: "Halaman sebelumnya",
            nextTriggerLabel: "Halaman berikutnya",
          }}
        >
          <PaginationPrevTrigger asChild>
            <button
              type="button"
              className="table-pagination__nav-btn"
              aria-label="Halaman sebelumnya"
            >
              <ChevronLeft size={18} aria-hidden strokeWidth={2} />
            </button>
          </PaginationPrevTrigger>

          <PaginationItems
            ellipsis={<span className="table-pagination__ellipsis">…</span>}
            render={(p) => (
              <button
                type="button"
                className={
                  p.value === page
                    ? "table-pagination__page-btn table-pagination__page-btn--active"
                    : "table-pagination__page-btn"
                }
              >
                {p.value}
              </button>
            )}
          />

          <PaginationNextTrigger asChild>
            <button
              type="button"
              className="table-pagination__nav-btn"
              aria-label="Halaman berikutnya"
            >
              <ChevronRight size={18} aria-hidden strokeWidth={2} />
            </button>
          </PaginationNextTrigger>
        </PaginationRoot>
      </nav>
    </div>
  );
}
