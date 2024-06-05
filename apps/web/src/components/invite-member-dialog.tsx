'use client'

import {
  ChangeEvent,
  KeyboardEvent,
  KeyboardEventHandler,
  ReactNode,
  useCallback,
  useRef,
  useState,
} from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { ChevronDown, X } from 'lucide-react'
import { Badge } from './ui/badge'
import { cn } from '@/lib/utils'
import MultiTextInput from './ui/multi-text-input'
import { z } from 'zod'
import { DropdownMenu } from './ui/dropdown-menu'

interface InviteMemberDialogProps {
  children: ReactNode
}

const keyboards = ['SPACE', 'ENTER', 'COMMA']

export function InviteMemberDialog({ children }: InviteMemberDialogProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  const [inputValue, setInputValue] = useState('')
  const [emails, setEmails] = useState<string[]>([])

  const handleUnselect = useCallback(
    (option: string) => {
      const newOptions = emails.filter((v) => v !== option)
      setEmails(newOptions)
    },
    [emails]
  )

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    const inputValueCleans = inputValue.trim()
    const emailAlreadyListed = emails.includes(inputValueCleans)

    if (emailAlreadyListed && event.code.toUpperCase() !== 'BACKSPACE') {
      setInputValue('')

      return
    }

    if (
      keyboards.includes(event.code.toUpperCase()) &&
      inputValueCleans !== ''
    ) {
      setEmails((prevState) => [...prevState, inputValueCleans])

      setInputValue('')
    }

    if (event.code.toUpperCase() === 'BACKSPACE' && inputValueCleans === '') {
      setEmails((prevState) => {
        if (prevState.length === 0) return prevState

        return prevState.slice(0, prevState.length - 1)
      })
    }

    return
  }

  function handleChangeValue(event: ChangeEvent<HTMLInputElement>) {
    const { value } = event.target

    if (value.trim() === ',') {
      setInputValue('')
      return
    }

    setInputValue(value.trim())
  }

  function validateEmail(email: string): boolean {
    try {
      z.string().email().parse(email)
      return true
    } catch (e) {
      return false
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="p-6">
        <DialogTitle>Convidar pessoa</DialogTitle>
        <DialogDescription>
          Novos membros terão acesso a espaços públicos, documentos e painéis.
        </DialogDescription>

        <div
          className={cn(
            'flex min-h-10 rounded-md border border-input text-sm ring-offset-background focus-within:ring-2 focus-within:ring-offset-1',
            'border-input focus-within:ring-violet-200 focus-within:ring-offset-1 focus-within:ring-offset-ring'
          )}
          onKeyDown={handleKeyDown}
          onClick={() => {
            inputRef.current?.focus()
          }}
        >
          <div className="w-[calc(100%-20%)]">
            <div
              className={cn(
                'flex flex-wrap gap-1 px-3 pt-2',
                emails.length === 0 && 'px-0 pt-0'
              )}
            >
              {emails.map((item) => (
                <Badge
                  variant={
                    validateEmail(item) ? 'outline-teal' : 'outline-destructive'
                  }
                  className="rounded-sm pr-1.5 font-normal"
                  key={item}
                >
                  {item}
                  <button
                    onClick={() => handleUnselect(item)}
                    className="ml-1 rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2"
                  >
                    <X className="size-4" />
                  </button>
                </Badge>
              ))}
            </div>

            <input
              ref={inputRef}
              value={inputValue}
              onChange={handleChangeValue}
              className="w-full flex-1 bg-transparent px-3 py-2 outline-none placeholder:text-muted-foreground"
            />
          </div>

          <div className="relative h-full w-[calc(100%-80%)]">
            {/* <DropdownMenu></DropdownMenu> */}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
