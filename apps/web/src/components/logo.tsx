import { cn } from '@/lib/utils'
import { Plane } from 'lucide-react'
import Link from 'next/link'

interface LogoProps {
  className?: string
  size?: 'md' | 'lg'
}

export function Logo({ className }: LogoProps) {
  return (
    <Link
      href="/sign-in"
      className={cn(
        'flex flex-shrink-0 flex-grow items-center gap-2 lg:flex-grow-0',
        className
      )}
      tabIndex={1}
    >
      <span className="grid size-9 place-content-center rounded-sm bg-primary">
        <Plane className="size-4 fill-white text-white" />
      </span>

      <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text font-mono text-lg font-medium text-transparent">
        Up Agencies
      </span>
    </Link>
  )
}
