'use client'

import { cn } from '@/lib/utils'
import Link, { type LinkProps } from 'next/link'
import { usePathname } from 'next/navigation'

interface ActiveLinkProps extends LinkProps {
  className?: string
  children: React.ReactNode
  shouldMatchExactHref?: boolean
}

export function ActiveLink({
  className,
  shouldMatchExactHref = false,
  ...props
}: ActiveLinkProps) {
  const pathname = usePathname()

  let isActive = false

  if (shouldMatchExactHref && pathname === props.href) {
    isActive = true
  }

  if (!shouldMatchExactHref && pathname.startsWith(String(props.href))) {
    isActive = true
  }

  return (
    <Link
      data-state={isActive ? 'active' : 'inactive'}
      className={cn(
        'flex items-center gap-2 rounded-md border border-transparent p-1.5 text-sm transition-colors duration-500',
        'data-[state=active]:cursor-default data-[state=active]:border-border data-[state=active]:bg-gradient-to-r data-[state=active]:from-violet-200 data-[state=active]:to-violet-100/20 data-[state=active]:text-foreground',
        'data-[state=inactive]:hover:bg-violet-100/60 data-[state=inactive]:hover:text-foreground',
        className
      )}
      {...props}
    />
  )
}
