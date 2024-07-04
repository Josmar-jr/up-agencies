'use client'

import {
  ColumnDef,
  ColumnFiltersState,
  RowSelectionState,
  SortingState,
  Updater,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'

import { DataTableToolbar } from './data-table-toolbar'
import { cn } from '@/lib/utils'
import { ActionBar } from './action-bar'
import { useCallback, useState } from 'react'

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: any[]
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [rowSelection, setRowSelection] = useState({})
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [sorting, setSorting] = useState<SortingState>([])
  const [isActionBarOpen, setIsActionBarOpen] = useState(false)

  const handleRowSelectionChange = useCallback(
    (newRowSelection: Updater<RowSelectionState>) => {
      setRowSelection((prev) => {
        const updatedSelection =
          typeof newRowSelection === 'function'
            ? newRowSelection(prev)
            : newRowSelection

        if (Object.keys(updatedSelection).length > 0 && !isActionBarOpen) {
          setIsActionBarOpen(true)
        }

        if (Object.keys(updatedSelection).length === 0) {
          setIsActionBarOpen(false)
        }

        return updatedSelection
      })
    },
    [isActionBarOpen]
  )

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
    },
    getRowId: (originalRow) => originalRow.uuid,
    enableRowSelection: true,
    columnResizeMode: 'onChange',
    onRowSelectionChange: handleRowSelectionChange,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  })

  return (
    <>
      <DataTableToolbar table={table} />

      <ScrollArea className="w-auto whitespace-nowrap rounded-md">
        <ScrollArea className="relative h-[calc(100vh-98px)] pr-2">
          <Table className="border-none">
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id} className="hover:bg-none">
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead
                        className={cn(
                          `relative h-9 border-t-0 p-0 first:!p-2 w-[${header.getSize()}px]`
                        )}
                        key={header.id}
                        colSpan={header.colSpan}
                        style={{
                          position: 'relative',
                          width: header.getSize(),
                        }}
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                        {header.column.getCanResize() && (
                          <div
                            onDoubleClick={() => header.column.resetSize()}
                            onMouseDown={header.getResizeHandler()}
                            onTouchStart={header.getResizeHandler()}
                            className="absolute right-0 top-0 h-full w-1 cursor-col-resize touch-none select-none rounded-lg transition-colors hover:bg-violet-300"
                          />
                        )}
                      </TableHead>
                    )
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody className="overflow-scroll">
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    className="group"
                    data-state={row.getIsSelected() && 'selected'}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell className="first:!p-1" key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </ScrollArea>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>

      <ActionBar
        open={isActionBarOpen}
        onOpenChange={setIsActionBarOpen}
        table={table}
      />
    </>
  )
}
