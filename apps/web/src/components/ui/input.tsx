import * as React from 'react'

import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const inputVariants = cva(
  cn(
    'flex h-10 w-full rounded-md border bg-background px-3 py-2 text-sm ring-offset-file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none',
    'focus-visible:ring-2 focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:bg-secondary-lighter transition-all'
  ),
  {
    variants: {
      error: {
        true: 'border-destructive focus-visible:border-border focus-visible:ring-red-200 focus-visible:ring-offset-destructive',
        false:
          'border-input focus-visible:ring-violet-200 focus:ring-offset-1 focus:ring-offset-ring',
      },
    },
    defaultVariants: {
      error: false,
    },
  }
)

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, error, ...props }, ref) => {
    return (
      <input
        type={type}
        className={inputVariants({
          error,
          className,
        })}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = 'Input'

export { Input, inputVariants }
