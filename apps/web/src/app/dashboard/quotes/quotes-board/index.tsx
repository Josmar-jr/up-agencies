'use client'

import { useOptimistic, useState, useTransition } from 'react'
import {
  DragStart,
  DropResult,
  DragDropContext,
  Droppable,
  Draggable,
} from '@hello-pangea/dnd'
import { QuotesCard } from './quotes-card'
import { Circle, Ellipsis, Plus } from 'lucide-react'

import { Quote } from '@/http/quotes/list-quotes'
import { contrast } from '@/utils/helpers'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { QuotesToolbar } from './quotes-toolbar'
import { moveQuote } from '@/http/quotes/move-quote'
import { columns } from './columns'
import { STATUS } from './types'
import { moveQuoteAction } from '../actions'

interface QuotesBoardProps {
  quotes: Quote[]
}

export function QuotesBoard({ quotes }: QuotesBoardProps) {
  const [draggingColumn, setDraggingColumn] = useState<string | null>(null)
  const [, startTransition] = useTransition()
  const [localQuotes, setLocalQuotes] = useOptimistic(
    quotes,
    (state, { draggableId, movedQuote, destinationStatus, newOrder }) => {
      const updatedQuotes = state.filter((quote) => quote.id !== draggableId)
      // Insert the quote into the destination column at the new index
      updatedQuotes.splice(newOrder, 0, {
        ...movedQuote,
        status: destinationStatus,
      })
      return updatedQuotes
    }
  )

  const getColumnQuotes = (status: string) => {
    return localQuotes.filter((quote) => quote.status === status)
  }

  const onDragStart = (result: DragStart) => {
    const { draggableId } = result
    setDraggingColumn(draggableId)
  }

  const onDragEnd = async (result: DropResult) => {
    const { source, destination, draggableId } = result
    setDraggingColumn(null)

    if (!destination) return

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    )
      return

    const sourceStatus = source.droppableId
    const destinationStatus = destination.droppableId as STATUS
    const newOrder = destination.index + 1
    // Find the quote being moved
    const movedQuote = localQuotes.find((quote) => quote.id === draggableId)
    if (!movedQuote) return

    // Update local state
    setLocalQuotes({
      destinationStatus,
      draggableId,
      newOrder,
      movedQuote,
    })

    // Sync with backend

    startTransition(async () => {
      await moveQuoteAction({
        quoteId: draggableId,
        newStatus: destinationStatus,
        newOrder,
      })
    })
  }

  return (
    <>
      <QuotesToolbar />

      <div className="flex w-full items-start gap-2 overflow-x-auto overflow-y-hidden p-4">
        <DragDropContext onDragEnd={onDragEnd} onDragStart={onDragStart}>
          {columns.map((column, _, a) => (
            <Droppable key={column.id} droppableId={column.id}>
              {(droppableProvided, snapshot) => {
                return (
                  <div
                    ref={droppableProvided.innerRef}
                    {...droppableProvided.droppableProps}
                    style={{
                      background: column.background,
                    }}
                    className={cn(
                      'flex h-full w-[300px] flex-grow flex-col rounded-md transition',
                      draggingColumn
                        ? snapshot.isDraggingOver
                          ? 'opacity-100'
                          : 'bg-opacity-50'
                        : 'opacity-100'
                    )}
                  >
                    <div
                      className={cn(
                        'flex items-center justify-between p-1 pb-0 transition',
                        draggingColumn
                          ? snapshot.isDraggingOver
                            ? 'opacity-100'
                            : 'opacity-50'
                          : 'opacity-100'
                      )}
                    >
                      <div className="flex items-center gap-2">
                        <span
                          style={{
                            background: column.color,
                            color: contrast(column.color),
                          }}
                          className={cn(
                            'flex h-[22px] items-center justify-center gap-1 rounded-sm bg-zinc-200 px-1 text-xs font-normal'
                          )}
                        >
                          <Circle
                            style={{
                              fill: contrast(column.color),
                              borderColor: contrast(column.color),
                            }}
                            className="size-[14px] rounded-full border-[1.5px] text-transparent"
                          />
                          {column.title}
                        </span>
                        <span className="text-xs text-accents-4">
                          {getColumnQuotes(column.id).length}
                        </span>
                      </div>
                      <Button className="size-7 p-0" variant="ghost">
                        <Ellipsis className="size-3" />
                      </Button>
                    </div>
                    <div className="flex h-full flex-grow flex-col space-y-1 overflow-y-auto overflow-x-hidden p-1">
                      {getColumnQuotes(column.id).map((quote, idx) => (
                        <Draggable
                          key={quote.id}
                          draggableId={quote.id}
                          index={idx}
                        >
                          {(provided, feedback) => {
                            return (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                              >
                                <QuotesCard
                                  quote={quote}
                                  columnInfo={{
                                    status: column.title,
                                    statusColor: column.color,
                                  }}
                                />
                              </div>
                            )
                          }}
                        </Draggable>
                      ))}
                      {droppableProvided.placeholder}
                    </div>
                  </div>
                )
              }}
            </Droppable>
          ))}
        </DragDropContext>
      </div>
    </>
  )
}
