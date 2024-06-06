import {
  FileBadge,
  FileClock,
  HandHelping,
  LayoutDashboard,
  MessageCircle,
  Plane,
  Ticket,
  UserPlus,
  Users,
} from 'lucide-react'

import { ActiveLink } from './active-link'

import { TeamNav } from './team-nav'
import { InviteMemberDialog } from './invite-member-dialog'

export function Navbar() {
  return (
    <aside className="inset-y z-20 hidden h-screen w-full shrink-0 flex-col gap-3 bg-secondary-lighter lg:flex">
      <TeamNav />

      <nav className="flex h-full w-full flex-col justify-between overflow-y-auto p-4">
        <div className="flex flex-col gap-6">
          <div>
            <h3 className="mb-2 select-none whitespace-nowrap text-xs tracking-wider text-muted-foreground">
              GERAL
            </h3>
            <ul className="flex flex-col gap-1">
              <li>
                <ActiveLink shouldMatchExactHref href="/dashboard">
                  <LayoutDashboard className="size-5" />
                  Dashboard
                </ActiveLink>
              </li>
              <li>
                <ActiveLink href="#">
                  <FileBadge className="size-5" />
                  Cotações
                </ActiveLink>
              </li>
              <li>
                <ActiveLink href="#">
                  <Plane className="size-5" />
                  Voos
                </ActiveLink>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-2 select-none whitespace-nowrap text-xs tracking-wider text-muted-foreground">
              LISTAS
            </h3>
            <ul className="flex flex-col gap-1">
              <li>
                <ActiveLink shouldMatchExactHref href="/dashboard/people">
                  <Users className="size-5" />
                  Pessoas
                </ActiveLink>
              </li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col gap-6">
          <div>
            <h3 className="mb-2 select-none whitespace-nowrap text-xs tracking-wider text-muted-foreground">
              RECURSOS
            </h3>
            <ul>
              <li>
                <InviteMemberDialog>
                  <button className="flex w-full items-center gap-2 rounded-md border border-transparent p-1.5 text-sm transition-colors duration-500 hover:bg-violet-100/60 hover:text-foreground">
                    <UserPlus className="size-5" />
                    Convidar
                  </button>
                </InviteMemberDialog>
              </li>
              <li>
                <ActiveLink shouldMatchExactHref href="#">
                  <MessageCircle className="size-5" />
                  Feedback
                </ActiveLink>
              </li>
              <li>
                <ActiveLink href="#">
                  <HandHelping className="size-5" />
                  Suporte
                </ActiveLink>
              </li>
              <li>
                <ActiveLink href="#">
                  <FileClock className="size-5" />
                  Novidades
                </ActiveLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </aside>
  )
}
