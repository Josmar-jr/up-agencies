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
import { Circle } from 'lucide-react'

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
          className="w-full items-center justify-start gap-2 border-transparent px-2 text-xs text-zinc-600"
        >
          <div
            style={{
              background: selectedStatus.color,
              color: contrast(selectedStatus.color),
            }}
            className="flex h-7 items-center justify-center gap-1 rounded-md border border-input px-2"
          >
            {/* <Circle
              style={{
                fill: selectedStatus.color,
                borderColor: selectedStatus.color,
              }}
              className="size-[14px] rounded-full border-[1.5px] text-transparent"
            /> */}
            {selectedStatus.label}
          </div>
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
                  <Circle
                    style={{
                      fill: status.color,
                      borderColor: status.color,
                    }}
                    className="mr-2 size-[14px] rounded-full border-[1.5px] text-transparent"
                  />
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
