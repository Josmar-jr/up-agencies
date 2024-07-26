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

import { useState } from 'react'
import { contrast } from '@/utils/helpers'
import { useQuery } from '@tanstack/react-query'
import { getManyMembers } from '@/http/members/list-members'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { getInitialsFromFullName } from '@/utils/formatters'
import { Check, CircleX } from 'lucide-react'
import { cn } from '@/lib/utils'

interface SelectAssigne {
  label: string
  value: string
  avatarUrl?: string
}

export function AssigneQuote() {
  const [open, setOpen] = useState(false)

  const [selectedAssignes, setSelectedAssignes] = useState<SelectAssigne[]>([])

  const { data } = useQuery({
    queryKey: ['TEST'],
    queryFn: () => getManyMembers(),
  })

  const handleSelect = (value: string) => {
    const newValue = data?.members.find((member) => member.id === value)
    if (newValue) {
      setSelectedAssignes((prev) => {
        const isAlreadySelected = prev.some(
          (assigne) => assigne.value === newValue.id
        )

        if (isAlreadySelected) {
          return prev.filter((assigne) => assigne.value !== newValue.id)
        }

        return [
          ...prev,
          {
            value: newValue.id,
            label: newValue.name,
            avatarUrl: newValue.avatarURL,
          },
        ]
      })
    }
    setOpen(false)
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          size="sm"
          variant="outline"
          className="h-7 justify-start px-2 text-xs text-zinc-600"
        >
          {selectedAssignes?.map((selectedAssigne) => (
            <>
              <Avatar className="mr-1 size-5">
                <AvatarImage
                  src={selectedAssigne?.avatarUrl ?? undefined}
                  alt={selectedAssigne?.label ?? ''}
                />
                <AvatarFallback
                  className="text-[10px]"
                  name={selectedAssigne.label}
                >
                  {selectedAssigne?.label &&
                    getInitialsFromFullName(selectedAssigne?.label)}
                </AvatarFallback>
              </Avatar>
            </>
          ))}

          {selectedAssignes.length === 0 && 'Responsável'}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0" align="start">
        <Command>
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup>
              {data?.members.map((member) => {
                const isSelected = selectedAssignes.some(
                  (assigne) => assigne.value === member.id
                )

                return (
                  <CommandItem
                    className="group flex items-center text-sm"
                    key={member.id}
                    value={member.id}
                    onSelect={() => handleSelect(member.id)}
                  >
                    <div className="relative">
                      <Avatar
                        className={cn(
                          'mr-3 size-7',
                          isSelected && 'ring-2 ring-primary ring-offset-1'
                        )}
                      >
                        <AvatarImage
                          src={member?.avatarURL ?? undefined}
                          alt={member?.name ?? ''}
                        />
                        <AvatarFallback name={member.name}>
                          {member?.name &&
                            getInitialsFromFullName(member?.name)}
                        </AvatarFallback>
                      </Avatar>

                      {isSelected && (
                        <CircleX className="absolute right-1 top-4 size-4 fill-red-500 text-white opacity-0 transition-opacity group-hover:opacity-100" />
                      )}
                    </div>

                    <span>{member.name}</span>
                  </CommandItem>
                )
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
