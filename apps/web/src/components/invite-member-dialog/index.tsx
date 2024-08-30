'use client'
import {
  ChangeEvent,
  FormEvent,
  KeyboardEvent,
  ReactNode,
  useCallback,
  useRef,
  useState,
} from 'react'

import {
  Dialog,
  DialogButtonClose,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog'

import { Button } from '../ui/button'
import { Loader, X } from 'lucide-react'
import { Badge } from '../ui/badge'
import { cn } from '@/lib/utils'
import { useServerActionMutation } from '@/lib/server-action-hooks'

import { z } from 'zod'

import {
  Select,
  SelectContent,
  SelectItemText,
  SelectPureItem,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from '../ui/select'
import { Label } from '../ui/label'
import { sendInviteAction } from './actions'

import { toast } from 'sonner'

interface InviteMemberDialogProps {
  children: ReactNode
}

type ROLE = 'ADMIN' | 'MEMBER' | 'BILLING'

const keyboards = ['SPACE', 'COMMA']

export function InviteMemberDialog({ children }: InviteMemberDialogProps) {
  const { isPending, mutate } = useServerActionMutation(sendInviteAction)

  const inputRef = useRef<HTMLInputElement>(null)

  const [open, setOpen] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const [emails, setEmails] = useState<string[]>([])
  const [role, setRole] = useState<ROLE>('MEMBER')

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

    if (event.code === undefined) {
      return
    }

    if (
      keyboards.includes(event.code?.toUpperCase()) &&
      emailAlreadyListed &&
      event.code?.toUpperCase() !== 'BACKSPACE'
    ) {
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

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const invalid = !(
      (validateEmail(inputValue) && emails.length === 0) ||
      (emails.every((email) => validateEmail(email)) && emails.length > 0)
    )

    if (invalid) {
      return
    }

    mutate(
      {
        emails: emails.length > 0 ? emails : [inputValue],
        role,
      },
      {
        onError() {
          toast.error(
            'Ops! Parece que houve um problema ao enviar o convite. Por favor, verifique os dados e tente novamente 😥'
          )
        },
        onSuccess({ invites }) {
          const inviteQuantity = invites.length

          if (inviteQuantity === 1) {
            const { email } = invites[0]

            toast.success(`${email} foi convidado`)
          } else {
            toast.success(`${inviteQuantity} convites enviados com sucesso`)
          }

          setInputValue('')
          setEmails([])
        },
      }
    )
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <div className="space-y-2 p-6 pb-0">
          <DialogTitle>Convidar pessoa</DialogTitle>
          <DialogDescription>
            Novos membros terão acesso a espaços públicos, documentos e painéis.
          </DialogDescription>
        </div>

        <form onSubmit={onSubmit} className="space-y-10">
          <div className="px-6">
            <Label id="emails">Convidar por email</Label>

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
                  name="emails"
                  ref={inputRef}
                  value={inputValue}
                  onChange={handleChangeValue}
                  placeholder="Espaço ou vírcula para separar"
                  className="w-full flex-1 bg-transparent px-3 py-2 outline-none placeholder:text-muted-foreground"
                />
              </div>

              <div className="relative h-full w-[calc(100%-80%)]">
                <Select
                  defaultValue="MEMBER"
                  value={role}
                  onValueChange={(value: ROLE) => setRole(value)}
                >
                  <SelectTrigger className="absolute right-1 top-1 h-[calc(40px-10px)] w-[100px] justify-center gap-1 font-normal">
                    <SelectValue />
                  </SelectTrigger>

                  <SelectContent className="max-w-[260px]">
                    <SelectPureItem value="MEMBER">
                      <div>
                        <SelectItemText>Membro</SelectItemText>
                        <p className="mt-1 block text-xs text-muted-foreground">
                          Acessar Espaços públicos, Listas e Dashboard.
                        </p>
                      </div>
                    </SelectPureItem>
                    <SelectSeparator />
                    <SelectPureItem value="ADMIN" className="flex-row-reverse">
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
            <DialogButtonClose asChild>
              <Button variant="outline">Cancelar</Button>
            </DialogButtonClose>

            <Button type="submit" disabled={isPending}>
              {isPending && <Loader className="mr-1 size-4 animate-spin" />}
              Enviar convite
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
