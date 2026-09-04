import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from './pagination';

interface ServerPaginationProps {
  currentPage: number;
  totalPages: number;
  /** Function to generate href for a given page number */
  createPageUrl: (page: number) => string;
  className?: string;
}

/**
 * Server-friendly pagination component that uses Links instead of callbacks.
 * Works with Server Components by navigating via URL changes.
 */
export function ServerPagination({
  currentPage,
  totalPages,
  createPageUrl,
  className,
}: ServerPaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <Pagination className={className}>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href={currentPage > 1 ? createPageUrl(currentPage - 1) : '#'}
            className={currentPage <= 1 ? 'pointer-events-none opacity-50' : ''}
          />
        </PaginationItem>

        {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => {
          if (p === 1 || p === totalPages || (p >= currentPage - 1 && p <= currentPage + 1)) {
            return (
              <PaginationItem key={p}>
                <PaginationLink href={createPageUrl(p)} isActive={currentPage === p}>
                  {p}
                </PaginationLink>
              </PaginationItem>
            );
          }

          if (
            (p === currentPage - 2 && currentPage > 3) ||
            (p === currentPage + 2 && currentPage < totalPages - 2)
          ) {
            return (
              <PaginationItem key={`ellipsis-${p}`}>
                <PaginationEllipsis />
              </PaginationItem>
            );
          }

          return null;
        })}

        <PaginationItem>
          <PaginationNext
            href={currentPage < totalPages ? createPageUrl(currentPage + 1) : '#'}
            className={currentPage >= totalPages ? 'pointer-events-none opacity-50' : ''}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
