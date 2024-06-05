'use client'

import {
  ChangeEvent,
  KeyboardEvent,
  ReactNode,
  useCallback,
  useRef,
  useState,
} from 'react'

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog'

import { Button } from './ui/button'
import { ChevronDown, X } from 'lucide-react'
import { Badge } from './ui/badge'
import { cn } from '@/lib/utils'

import { z } from 'zod'

import {
  Select,
  SelectContent,
  SelectItemText,
  SelectPureItem,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from './ui/select'
import { Label } from './ui/label'

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
      <DialogContent>
        <div className="space-y-2 p-6 pb-0">
          <DialogTitle>Convidar pessoa</DialogTitle>
          <DialogDescription>
            Novos membros terão acesso a espaços públicos, documentos e painéis.
          </DialogDescription>
        </div>

        <form className="space-y-10">
          <div className="px-6">
            <Label>Convidar por email</Label>

            <div
              className={cn(
                'flex min-h-10 rounded-md border border-input text-sm ring-offset-background focus-within:ring-2 focus-within:ring-offset-1',
                'mt-1 border-input focus-within:ring-violet-200 focus-within:ring-offset-1 focus-within:ring-offset-ring'
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
                        validateEmail(item)
                          ? 'outline-teal'
                          : 'outline-destructive'
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
                  placeholder="Espaço, vírcula ou enter para separar"
                  className="w-full flex-1 bg-transparent px-3 py-2 outline-none placeholder:text-muted-foreground"
                />
              </div>

              <div className="relative h-full w-[calc(100%-80%)]">
                <Select defaultValue="member">
                  <SelectTrigger className="absolute right-1 top-1 h-[calc(40px-10px)] w-[100px] justify-center gap-1 font-normal">
                    <SelectValue />
                  </SelectTrigger>

                  <SelectContent className="max-w-[260px]">
                    <SelectPureItem value="member">
                      <div>
                        <SelectItemText>Membro</SelectItemText>
                        <p className="mt-1 block text-xs text-muted-foreground">
                          Acessar Espaços públicos, Listas e Dashboard.
                        </p>
                      </div>
                    </SelectPureItem>
                    <SelectSeparator />
                    <SelectPureItem value="admin" className="flex-row-reverse">
                      <div>
                        <SelectItemText>Admin</SelectItemText>
                        <p className="mt-1 block text-xs text-muted-foreground">
                          Gerenciar Espaços, Pessoas, Faturamento e outras
                          configurações
                        </p>
                      </div>
                    </SelectPureItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <DialogFooter className="border-t px-4 py-3">
            <DialogClose asChild>
              <Button variant="outline">Cancelar</Button>
            </DialogClose>

            <Button>Enviar convite</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
