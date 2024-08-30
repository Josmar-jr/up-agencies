import { DollarSign, KeyRound, Palette, User } from 'lucide-react'
import { ActiveLink } from './active-link'
import { Badge } from '@/components/ui/badge'

export function AccountNavbar() {
  return (
    <>
      <aside className="hidden flex-col border-l border-border lg:flex">
        <ActiveLink href="/dashboard/account/profile">
          Dados pessoais
        </ActiveLink>
        <ActiveLink href="#">
          Segurança
          <Badge variant="destructive" className="absolute right-0 scale-75">
            New 🚧
          </Badge>
        </ActiveLink>
        <ActiveLink href="#">
          Assinatura{' '}
          <Badge variant="destructive" className="absolute right-0 scale-75">
            New 🚧
          </Badge>
        </ActiveLink>
        <ActiveLink href="/dashboard/account/preferences">
          Preferências
        </ActiveLink>
      </aside>
      <aside className="grid w-full flex-1 grid-flow-col border-b-2 border-border lg:hidden">
        <ActiveLink href="/dashboard/account/profile">
          <User />
        </ActiveLink>
        <ActiveLink href="#">
          <KeyRound />
        </ActiveLink>
        <ActiveLink href="#">
          <DollarSign />
        </ActiveLink>
        <ActiveLink href="/dashboard/account/preferences">
          <Palette />
        </ActiveLink>
      </aside>
    </>
  )
}
