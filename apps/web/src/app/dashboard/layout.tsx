import type { Metadata } from 'next'

import { Navbar } from '@/components/navbar'

export const metadata: Metadata = {
  title: 'Up Agencies | Dashboard',
  description: 'Up Agencies',
}

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="bg-background-foreground grid h-screen w-full grid-rows-[auto_1fr] lg:grid-cols-[auto_1fr]">
      <Navbar />

      {children}
    </div>
  )
}
