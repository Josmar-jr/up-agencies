import { Info } from 'lucide-react'
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from '@/components/ui/tooltip'

import { Empty } from './components/empty'

export default function People() {
  return (
    <div className="min-h-screen bg-white">
      <header className="flex h-[49px] w-full items-center border-b px-4">
        <div className="flex items-center gap-1.5">
          <h1 className="text-lg font-medium">Pessoas</h1>
          <Tooltip>
            <TooltipTrigger className="mt-0.5 text-muted-foreground *:size-3">
              <Info />
            </TooltipTrigger>
            <TooltipContent side="right">Pessoas</TooltipContent>
          </Tooltip>
        </div>
      </header>

      <div className="h-[calc(100vh-49px)] p-6">
        <Empty />
      </div>
    </div>
  )
}
