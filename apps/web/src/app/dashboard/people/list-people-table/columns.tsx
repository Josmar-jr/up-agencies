'use client'

import { ColumnDef } from '@tanstack/react-table'

import { categories, labels } from './data'
import { People } from './schema'
import { DataTableColumnHeader } from './data-table-column-header'

import { Checkbox } from '@/components/ui/checkbox'
import { formatPhoneNumber } from 'react-phone-number-input'

import { Mail, Phone, Plus, User } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { PersonType } from '@/utils/constants'
import { DetailsPersonDialog } from '../details-person-dialog'

export const columns: ColumnDef<People>[] = [
  {
    id: 'select',
    minSize: 30,
    maxSize: 30,
    accessorKey: 'select',
    header: ({ table }) => (
      <div className="relative flex items-center justify-center">
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && 'indeterminate')
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Seleciona todos"
        />
      </div>
    ),
    cell: ({ row }) => {
      const order = Number(row.id) + 1

      return (
        <div className="relative flex items-center justify-center">
          <span className="text-center opacity-100 transition-opacity group-hover:opacity-0">
            {order}
          </span>

          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Selecione linha"
            className={cn(
              'absolute opacity-0 transition-opacity group-hover:opacity-100',
              row.getIsSelected() && 'opacity-100'
            )}
          />
        </div>
      )
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <div className="flex items-center">
        <DataTableColumnHeader
          icon={User}
          className="w-full"
          column={column}
          title="Nome"
        />
      </div>
    ),
    cell: ({ row }) => {
      return (
        <button className="w-full underline-offset-2 transition-all hover:underline">
          <span className="flex w-[150px] space-x-2">
            <span className="truncate font-medium">{row.getValue('name')}</span>
          </span>
        </button>
      )
    },
  },
  {
    accessorKey: 'email',
    header: ({ column }) => (
      <DataTableColumnHeader icon={Mail} column={column} title="Email" />
    ),
    cell: ({ row }) => {
      return (
        <div>
          <span>{row.getValue('email') ?? '-'}</span>
        </div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: 'phone',
    header: ({ column }) => (
      <DataTableColumnHeader icon={Phone} column={column} title="Celular" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex w-[120px]">
          {row.getValue('phone')
            ? formatPhoneNumber(row.getValue('phone'))
            : '-'}
        </div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: 'category',
    id: 'category',
    header: ({ column }) => (
      <DataTableColumnHeader icon={User} column={column} title="Categorias" />
    ),
    minSize: 240,
    cell: ({ row }) => {
      const personTypes = row.original.personType as PersonType[]

      return (
        <div className="flex flex-wrap gap-1">
          {personTypes.map((type, index) => (
            <Badge
              key={index}
              size="sm"
              className={cn({
                'bg-emerald-100 text-emerald-700': type === 'CLIENT',
                'bg-sky-100 text-sky-700': type === 'PASSENGER',
                'bg-amber-100 text-amber-700': type === 'REPRESENTATIVE',
                'bg-orange-100 text-orange-700': type === 'SUPPLIER',
              })}
            >
              {labels[type]}
            </Badge>
          ))}
        </div>
      )
    },
  },
]
