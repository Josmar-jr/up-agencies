import type { Metadata } from 'next'

import { Navbar } from '@/components/navbar'
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable'

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
    <div className="h-screen w-screen bg-background-foreground lg:grid-cols-[auto_1fr]">
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel
          maxSize={24}
          defaultSize={18}
          minSize={14}
          className="h-screen bg-secondary-lighter lg:flex"
        >
          <Navbar />
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={82} className="w-full">
          {children}
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  )
}
