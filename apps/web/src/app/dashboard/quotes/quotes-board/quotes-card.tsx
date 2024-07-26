import { useState } from 'react'

import { Id, Task } from './types'
import {
  Banknote,
  CalendarDays,
  Circle,
  CircleUserRound,
  Ellipsis,
  Pencil,
  PiggyBank,
  Trash,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Checkbox } from '@/components/ui/checkbox'
import { Quote } from '@/http/quotes/list-quotes'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { formatToBRL, getInitialsFromFullName } from '@/utils/formatters'
import { columns } from './columns'
import dayjs from 'dayjs'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'

interface Props {
  task: Task
  deleteTask: (id: Id) => void
  updateTask: (id: Id, content: string) => void
}

interface QuotesCardProps {
  quote: Quote
  columnInfo: {
    status: string
    statusColor: string
  }
}

export function QuotesCard({
  quote,
  columnInfo: { status, statusColor },
}: QuotesCardProps) {
  const [mouseIsOver, setMouseIsOver] = useState(false)
  const [editMode, setEditMode] = useState(false)

  const toggleEditMode = () => {
    setEditMode((prev) => !prev)
    setMouseIsOver(false)
  }

  // if (isDragging) {
  //   return <div ref={setNodeRef} style={style} className="bg-red-300" />
  // }

  return (
    <div className="group relative">
      <div
        onClick={toggleEditMode}
        className="flex cursor-grab flex-col rounded-md border bg-white text-left hover:ring-1 hover:ring-accents-3"
        onMouseEnter={() => {
          setMouseIsOver(true)
        }}
        onMouseLeave={() => {
          setMouseIsOver(false)
        }}
      >
        <header className="cursor-pointer p-1 hover:text-primary">
          <div className="text-sm leading-snug">{quote.title}</div>
        </header>
        <div className="flex flex-col items-start justify-center space-y-1 p-1 *:min-h-6">
          <button className="flex h-7 w-full flex-grow items-center gap-1.5 rounded-sm px-1 text-xs text-zinc-600 transition-colors hover:bg-secondary-lighter">
            <PiggyBank className="size-[16px]" />
            {formatToBRL(quote.priceInCents)}
          </button>
          <button className="flex h-7 w-full flex-grow items-center gap-1.5 rounded-sm px-1 text-xs text-zinc-600 transition-colors hover:bg-secondary-lighter">
            <Circle
              style={{
                fill: statusColor,
                borderColor: statusColor,
              }}
              className="size-[14px] rounded-full border-[1.5px] text-transparent"
            />
            {status}
          </button>
          <button className="flex h-7 w-full flex-grow items-center gap-1.5 rounded-sm px-1 text-xs text-zinc-600 transition-colors hover:bg-secondary-lighter">
            <CircleUserRound className="size-[14px]" />
            <div className="flex -space-x-3 *:ring *:ring-white">
              {quote.assignees.map((assignee) => (
                <Avatar className="size-5 rounded-md">
                  <AvatarFallback name={assignee.name} className="text-[10px]">
                    {getInitialsFromFullName(assignee.name)}
                  </AvatarFallback>
                </Avatar>
              ))}
            </div>
          </button>
          <Tooltip>
            <TooltipTrigger asChild>
              <button className="flex h-7 w-full flex-grow items-center gap-1.5 rounded-sm px-1 text-xs text-zinc-600 transition-colors hover:bg-secondary-lighter">
                <CalendarDays className="size-[14px]" />{' '}
                {dayjs(quote.updatedAt).format('DD/MM/YYYY')}
              </button>
            </TooltipTrigger>
            <TooltipContent align="center" side="left" className="text-center">
              Cotação atualizada pela última vez em <br />
              {dayjs(quote.updatedAt).format('DD/MM/YYYY [às] HH:mm')}
            </TooltipContent>
          </Tooltip>
        </div>
        {/* 
      {mouseIsOver && (
        <button
        onClick={() => {
          deleteTask(task.id)
          }}
          className="bg-columnBackgroundColor absolute right-4 top-1/2 -translate-y-1/2 rounded stroke-white p-2 opacity-60 hover:opacity-100"
          >
          <Trash />
          </button>
          )} */}
      </div>

      <div className="absolute right-1 top-1 z-10 flex h-8 items-center rounded-sm border bg-white opacity-0 shadow-sm transition-opacity group-hover:opacity-100">
        <Button variant="ghost" size="icon" className="m-0.5 size-6">
          <Ellipsis className="size-4" />
        </Button>
        <Button variant="ghost" size="icon" className="m-0.5 size-6">
          <Pencil className="size-4" />
        </Button>
        <Separator orientation="vertical" />
        <span className="m-0.5 grid size-6 place-content-center">
          <Checkbox aria-label="Selecionar cotação" />
        </span>
      </div>
    </div>
  )
}
