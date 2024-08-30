'use client'

import { type ReactNode, useState } from 'react'

import { Provider } from 'jotai'
import { QueryClientProvider } from '@tanstack/react-query'

import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { getQueryClient } from '@/lib/query-client'

export function Providers({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => getQueryClient())

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
