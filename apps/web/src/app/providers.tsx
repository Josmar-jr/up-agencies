'use client'

import { type ReactNode, useState } from 'react'

import { Provider } from 'jotai'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { ThemeProvider as NextThemesProvider } from 'next-themes'

export function Providers({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient())

  return (
    <QueryClientProvider client={queryClient}>
      <Provider>
        <NextThemesProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </NextThemesProvider>
      </Provider>
    </QueryClientProvider>
  )
}
