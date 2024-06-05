'use client'

import { useAuth } from '@/hooks/queries/use-auth-queries'
import { DropdownMenuItem } from './ui/dropdown-menu'
import { LogOut } from 'lucide-react'

export function LogoutButton() {
  const { signOut } = useAuth()

  return (
    <DropdownMenuItem onSelect={signOut}>
      <LogOut className="size-4" />
      Sair da conta
    </DropdownMenuItem>
  )
}
