import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { listStatus, SelectStatus } from './data'
import { useState } from 'react'
import { contrast } from '@/utils/helpers'

export function StatusQuote() {
  const [open, setOpen] = useState(false)

  const [selectedStatus, setSelectedStatus] = useState<SelectStatus>(
    listStatus[0]
  )

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          size="sm"
          variant="outline"
          style={{
            background: selectedStatus.color,
            color: contrast(selectedStatus.color),
          }}
          className="h-7 justify-start px-2 text-xs text-zinc-600"
        >
          {selectedStatus.label}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0" align="start">
        <Command>
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup>
              {listStatus.map((status) => (
                <CommandItem
                  className="text-xs"
                  key={status.value}
                  value={status.value}
                  onSelect={(value) => {
                    const newValue = listStatus.find(
                      (col) => col.value === value
                    ) as SelectStatus

                    setSelectedStatus(newValue)
                    setOpen(false)
                  }}
                >
                  {status.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
