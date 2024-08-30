import Link from 'next/link'
import { DotBackground } from './components/dot-background'
import { PlaneTakeoff } from 'lucide-react'
import { Logo } from '@/components/logo'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="flex min-h-screen flex-1 items-stretch">
      <div className="flex flex-1">
        <aside className="hidden flex-1 flex-shrink basis-1/4 flex-col items-center justify-center bg-primary lg:flex">
          <DotBackground />
        </aside>

        <main className="bg-studio border-default flex flex-1 flex-shrink-0 flex-col items-center border-r px-5 pb-8 pt-16 shadow-lg lg:h-[100dvh]">
          <Logo />

          <div className="relative m-auto flex w-[338px] flex-1 flex-col justify-center sm:w-[384px]">
            {children}
          </div>

          <div className="mt-6 sm:mt-0 sm:text-center">
            <p className="text-xs text-muted-foreground sm:mx-auto sm:max-w-sm">
              Ao continuar, você concorda com os{' '}
              <Link className="hover:text-foreground-light underline" href="/">
                Termos de serviço
              </Link>{' '}
              e{' '}
              <Link className="hover:text-foreground-light underline" href="/">
                Política de Privacidade
              </Link>{' '}
              da Up Agencies.
            </p>
          </div>
        </main>
      </div>
    </div>
  )
}
