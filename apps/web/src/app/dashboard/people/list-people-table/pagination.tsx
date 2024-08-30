'use client'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
import { ChevronsLeft } from 'lucide-react'
import { useMemo } from 'react'

interface PaginationProps {
  totalCountOfRegisters: number
  registersPerPage?: number
  currentPage?: number
  onPageChange?(page: number): void
}

const siblingsCount = 1

function generatePagesArray(from: number, to: number) {
  return [...new Array(to - from)]
    .map((_, index) => {
      return from + index + 1
    })
    .filter((page) => page > 0)
}

export function PaginationDemo({
  totalCountOfRegisters,
  registersPerPage = 10,
  currentPage = 1,
  onPageChange,
}: PaginationProps) {
  const lastPage = useMemo(() => {
    return Math.ceil(totalCountOfRegisters / registersPerPage)
  }, [totalCountOfRegisters, registersPerPage])

  const previousPages =
    currentPage > 1
      ? generatePagesArray(currentPage - 1 - siblingsCount, currentPage - 1)
      : []

  const nextPages =
    currentPage < lastPage
      ? generatePagesArray(
          currentPage,
          Math.min(currentPage + siblingsCount, lastPage)
        )
      : []

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            disabled={currentPage <= 1}
            href={`http://localhost:3000/dashboard/people?page=${currentPage - 1}`}
          />
        </PaginationItem>

        {currentPage > 1 + siblingsCount && (
          <>
            <PaginationItem>
              <PaginationLink
                href={`http://localhost:3000/dashboard/people?page=1`}
              >
                1
              </PaginationLink>
            </PaginationItem>
            {currentPage > 2 + siblingsCount && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}
          </>
        )}

        {previousPages.length > 0 &&
          previousPages.map((page) => {
            return (
              <PaginationItem key={page}>
                <PaginationLink
                  href={`http://localhost:3000/dashboard/people?page=${page}`}
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            )
          })}

        <PaginationItem key={currentPage}>
          <PaginationLink
            isActive
            href={`http://localhost:3000/dashboard/people?page=${currentPage}`}
          >
            {currentPage}
          </PaginationLink>
        </PaginationItem>

        {nextPages.length > 0 &&
          nextPages.map((page) => {
            return (
              <PaginationItem>
                <PaginationLink
                  isActive={currentPage === page}
                  href={`http://localhost:3000/dashboard/people?page=${page}`}
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            )
          })}

        {currentPage + siblingsCount < lastPage && (
          <>
            {currentPage + 1 + siblingsCount < lastPage && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}
            <PaginationItem>
              <PaginationLink
                href={`http://localhost:3000/dashboard/people?page=${lastPage}`}
              >
                {lastPage}
              </PaginationLink>
            </PaginationItem>
          </>
        )}

        <PaginationItem>
          <PaginationNext
            disabled={currentPage >= lastPage}
            href={`http://localhost:3000/dashboard/people?page=${currentPage + 1}`}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}
