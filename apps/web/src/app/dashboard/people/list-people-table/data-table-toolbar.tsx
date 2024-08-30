'use client'

import { Table } from '@tanstack/react-table'

import { Plus, PlusCircle, SearchIcon } from 'lucide-react'
import { CreatePersonDialog } from '../create-person-dialog'
import { Button } from '@/components/ui/button'
import { DataTableViewOptions } from './data-table-view-options'
import { Separator } from '@/components/ui/separator'
import { Input } from '@/components/ui/input'
import { SearchServerParams } from '@/components/search-server-params'
import { DataTableFacetedFilter } from './data-table-faceted-filter'
import { categories } from './data'

interface DataTableToolbarProps<TData> {
  table: Table<TData>
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0

  return (
    <div className="flex w-full gap-2 border-b p-2">
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-2">
          <SearchIcon className="size-4 text-gray-400" />
        </div>

        <SearchServerParams />
      </div>
      {table.getColumn('category') && (
        <DataTableFacetedFilter
          column={table.getColumn('category')}
          title="Categoria"
          options={categories}
        />
      )}
      <div className="ml-auto flex">
        <DataTableViewOptions table={table} />
        <Separator orientation="vertical" className="mx-2" />
        <CreatePersonDialog>
          <Button className="ml-auto">
            <Plus className="mr-1.5 size-4" />
            Adicionar pessoa
          </Button>
        </CreatePersonDialog>
      </div>
    </div>
  )
}
