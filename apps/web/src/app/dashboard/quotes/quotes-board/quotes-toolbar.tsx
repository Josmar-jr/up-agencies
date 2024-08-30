'use client'
import { Button } from '@/components/ui/button'
import { CalendarDays, Plus } from 'lucide-react'
import { CreateQuoteDialog } from '../create-quote-dialog'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import { Calendar } from '@/components/ui/calendar'
import dayjs from 'dayjs'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { startTransition, useCallback, useEffect, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { QuotesOrderBy } from '@/http/quotes/list-quotes'

export function QuotesToolbar() {
  const router = useRouter()
  const pathname = usePathname()
  const [orderBy, setOrderBy] = useState<QuotesOrderBy>('status')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')

  const handleSortChange = useCallback(
    (orderBy: QuotesOrderBy) => {
      let params = new URLSearchParams(window.location.search)

      params.set('orderBy', orderBy)
      params.set('sortOrder', sortOrder)
      startTransition(() => {
        router.replace(`${pathname}?${params.toString()}`)
      })
    },
    [router, pathname]
  )

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)

    const initialOrderBy = (params.get('orderBy') as QuotesOrderBy) ?? 'status'
    const initialSortOrder =
      (params.get('sortOrder') as 'asc' | 'desc') ?? 'asc'

    setOrderBy(initialOrderBy)
    setSortOrder(initialSortOrder)
  }, [])

  return (
    <div className="flex w-full gap-2 border-b p-2">
      {/* <Popover>
        <PopoverTrigger asChild>
          <Button
            size="default"
            variant="outline"
            className={cn(
              'w-full pl-3 text-left font-normal',
              'text-muted-foreground'
            )}
          >
            <span>Selecione a data</span>

            <CalendarDays className="ml-auto h-4 w-4 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            captionLayout="dropdown-buttons"
            mode="single"
            fromYear={Number(dayjs().get('y')) - 100}
            toYear={Number(dayjs().get('y'))}
            disabled={(date) =>
              date > new Date() || date < new Date('1900-01-01')
            }
            initialFocus
          />
        </PopoverContent>
      </Popover> */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button size="sm">Classificar</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuItem onSelect={() => handleSortChange('assignees')}>
            Responsável
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={() => handleSortChange('title')}>
            Título
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={() => handleSortChange('createdAt')}>
            Data criada
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <div className="ml-auto flex">
        <CreateQuoteDialog>
          <Button className="ml-auto">
            <Plus className="mr-1.5 size-4" />
            Adicionar cotação
          </Button>
        </CreateQuoteDialog>
      </div>
    </div>
  )
}
