import { ArrowDownIcon, ArrowUpIcon, PersonStanding, User } from 'lucide-react'
import { Column } from '@tanstack/react-table'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

interface DataTableColumnHeaderProps<TData, TValue>
  extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>
  title: string
  icon: React.ElementType
}

export function DataTableColumnHeader<TData, TValue>({
  column,
  title,
  className,
  icon: Icon,
}: DataTableColumnHeaderProps<TData, TValue>) {
  if (!column.getCanSort()) {
    return (
      <div
        className={cn(
          'flex h-full w-full items-center space-x-1 px-2 pl-2 pr-[5px] text-left outline-none *:stroke-[2.5] data-[state=open]:bg-accent',
          className
        )}
      >
        <Icon className="size-4 text-secondary-light" />
        <span className="text-secondary-dark">{title}</span>
      </div>
    )
  }

  return (
    <div className={cn('flex w-full items-center space-x-2', className)}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="flex h-9 w-full items-center space-x-1 px-2 pl-2 pr-[5px] text-left outline-none *:stroke-[2.5] hover:bg-zinc-200/80 data-[state=open]:bg-accent">
            <Icon className="size-4 text-secondary-light" />
            <span className="text-secondary-dark">{title}</span>
            {column.getIsSorted() === 'desc' ? (
              <ArrowDownIcon className="ml-2 size-3" />
            ) : column.getIsSorted() === 'asc' ? (
              <ArrowUpIcon className="ml-2 size-3" />
            ) : (
              <div className="ml-2 size-3" />
            )}
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="!w-full">
          <DropdownMenuItem
            className="flex flex-row"
            onClick={() => column.toggleSorting(false)}
          >
            <ArrowUpIcon className="mr-1 h-3.5 w-3.5 text-muted-foreground/70" />
            Asc
          </DropdownMenuItem>
          <DropdownMenuItem
            className="flex flex-row"
            onClick={() => column.toggleSorting(true)}
          >
            <ArrowDownIcon className="mr-1 h-3.5 w-3.5 text-muted-foreground/70" />
            Desc
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="flex flex-row"
            onClick={() => column.toggleVisibility(false)}
          >
            <div className="mr-1 h-3.5 w-3.5 text-muted-foreground/70" />
            Hide
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
