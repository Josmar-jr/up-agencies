import type { Metadata } from 'next'
import { AccountNavbar } from './components/account-navbar'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

import { getInitialsFromFullName } from '@/utils/formatters'

import { cn } from '@/lib/utils'
import { getProfile } from '@/http/auth/get-profile'

export const metadata: Metadata = {
  title: 'Up Agencies | Dashboard',
  description: 'Up Agencies',
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const { user } = await getProfile()

  return (
    <div
      className={cn(
        'mt-4 grid grid-rows-[auto_1fr] items-start gap-x-12',
        'grid-cols-[1fr] gap-y-6',
        'lg:ml-8 lg:grid-cols-[180px_1fr] lg:gap-y-10'
      )}
    >
      <div className="flex gap-2 lg:col-span-2">
        <Avatar className="size-12">
          <AvatarImage
            src={user?.avatarUrl ?? undefined}
            alt={user?.name ?? ''}
          />
          <AvatarFallback>
            {user?.name && getInitialsFromFullName(user.name)}
          </AvatarFallback>
        </Avatar>

        <span>
          <h1 className="text-2xl font-medium">Minha conta</h1>
          <p className="text-sm text-muted-foreground">
            Gerencie as informações de conta, dados pessoais e assinaturas
          </p>
        </span>
      </div>
      <AccountNavbar />
      {children}
    </div>
  )
}
