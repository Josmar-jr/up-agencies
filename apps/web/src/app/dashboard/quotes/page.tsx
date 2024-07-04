import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { Info } from 'lucide-react'

export default function Quotes() {
  return (
    <div className="min-h-screen w-full bg-white">
      <header className="flex h-[49px] w-full items-center border-b px-4">
        <div className="flex items-center gap-1.5">
          <h1 className="text-lg font-medium">Cotações</h1>
          <Tooltip>
            <TooltipTrigger className="mt-0.5 text-muted-foreground *:size-3">
              <Info />
            </TooltipTrigger>
            <TooltipContent side="right">Cotações</TooltipContent>
          </Tooltip>
        </div>
      </header>
    </div>
  )
}
