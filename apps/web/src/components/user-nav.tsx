import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'

import { getInitialsFromFullName } from '@/utils/formatters'

import Link from 'next/link'

import { Skeleton } from './ui/skeleton'

import { LogoutButton } from './logout-button'
import { UserCog } from 'lucide-react'

import { cache } from 'react'
import { fetchApi } from '@/service/api-server'
import type { User } from '@/service/schema/user'

const getMe = cache(async () => {
  return await fetchApi<User>('/me', {
    cache: 'force-cache',
  })
})

export async function UserNav() {
  const user = await getMe()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="relative size-9 select-none rounded-full"
        >
          <Avatar className="size-9">
            <AvatarImage src={user?.avatarUrl} alt={user?.name ?? ''} />
            <AvatarFallback>
              {user?.name && getInitialsFromFullName(user.name)}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-2">
            <p className="text-sm font-medium leading-none">{user?.name}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {user?.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup className="*:flex *:justify-between *:text-muted-foreground">
          <DropdownMenuItem asChild>
            <Link href="/dashboard/account/profile">
              Configurações da conta
              <UserCog className="size-5" />
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/#">Cobrança</Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/dashboard/account/preferences">Preferências</Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <LogoutButton />
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export function UserNavSkeleton() {
  return <Skeleton className="size-9 rounded-full" />
}
