'use client'

import { Button } from '@/components/ui/button'
import { Dialog, DialogClose, DialogContent } from '@/components/ui/dialog'
import { Star, Trash } from 'lucide-react'

import { DeletePeopleDialog } from '../delete-people-dialog'
import { Table } from '@tanstack/react-table'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'

interface ActionBarProps<TData> {
  open: boolean
  onOpenChange(open: boolean): void
  table: Table<TData>
}

export function ActionBar<TData>({
  open,
  onOpenChange,
  table,
}: ActionBarProps<TData>) {
  const peopleSelected: string[] = table
    .getSelectedRowModel()
    // @ts-ignore
    .rows.map((row) => row.original.id)

  function handleResetSelect() {
    table.resetRowSelection()
  }

  return (
    <Dialog
      defaultOpen={open}
      open={open}
      modal={false}
      onOpenChange={(value) => {
        if (!value) handleResetSelect()
        onOpenChange(value)
      }}
    >
      <DialogContent
        showOverlay={false}
        onFocusOutside={(e) => e.preventDefault()}
        onPointerDownOutside={(e) => e.preventDefault()}
        withX={false}
        className="top-[94%] flex w-auto items-center gap-3 px-3 py-2 shadow-zinc-600/30"
      >
        <span className="flex items-center gap-1.5 text-xs">
          <Badge className="grid h-6 w-min min-w-6 max-w-10 place-content-center rounded-full p-0.5 font-normal">
            {peopleSelected.length}
          </Badge>
          Selecionado(s)
        </span>

        <Button variant="outline" size="sm" className="font-normal">
          <Star className="mr-1.5 size-4" />
          Favoritar
        </Button>

        <DeletePeopleDialog
          listIds={peopleSelected}
          onResetSelect={handleResetSelect}
        >
          <Button variant="outline" className="size-9 p-0">
            <Trash className="size-4 text-destructive" />
          </Button>
        </DeletePeopleDialog>

        <DialogClose />
      </DialogContent>
    </Dialog>
  )
}
