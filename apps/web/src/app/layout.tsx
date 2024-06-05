import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import '@/styles/globals.css'
import { Providers } from './providers'
import { Toaster } from 'sonner'
import relativeTime from 'dayjs/plugin/relativeTime'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import dayjs from 'dayjs'

// Carregue o plugin relativeTime
dayjs.extend(relativeTime)
dayjs.extend(customParseFormat)

export const metadata: Metadata = {
  title: 'Up Agencies | Home',
  description: 'Up Agencies',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={GeistSans.className}>
        <Providers>
          {children}

          <Toaster richColors />

          {process.env.NODE_ENV !== 'production' && (
            <div className="pointer-events-none fixed bottom-0 right-0 m-8 flex h-6 w-6 items-center justify-center rounded-lg bg-black p-3 font-mono text-xs text-white ">
              <div className="block sm:hidden md:hidden lg:hidden xl:hidden 2xl:hidden">
                al
              </div>
              <div className="hidden sm:block md:hidden lg:hidden xl:hidden 2xl:hidden">
                sm
              </div>
              <div className="hidden sm:hidden md:block lg:hidden xl:hidden 2xl:hidden">
                md
              </div>
              <div className="hidden sm:hidden md:hidden lg:block xl:hidden 2xl:hidden">
                lg
              </div>
              <div className="hidden sm:hidden md:hidden lg:hidden xl:block 2xl:hidden">
                xl
              </div>
              <div className="hidden sm:hidden md:hidden lg:hidden xl:hidden 2xl:block">
                2xl
              </div>
            </div>
          )}
        </Providers>
      </body>
    </html>
  )
}
