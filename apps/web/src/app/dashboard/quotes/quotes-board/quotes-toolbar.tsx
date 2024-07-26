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

export function QuotesToolbar() {
  return (
    <div className="flex w-full gap-2 border-b p-2">
      <Popover>
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
      </Popover>

      <div className="ml-auto flex">
        <CreateQuoteDialog>
          <Button className="ml-auto h-8">
            <Plus className="mr-1.5 size-4" />
            Adicionar cotação
          </Button>
        </CreateQuoteDialog>
      </div>
    </div>
  )
}
