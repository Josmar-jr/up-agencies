import * as CheckboxPrimitive from '@radix-ui/react-checkbox'
import React from 'react'

import { VariantProps, cva } from 'class-variance-authority'
import { Check } from 'lucide-react'
import { cn } from '@/lib/utils'

export const boxItemTv = cva(
  `flex items-center justify-center border-[1.5px] border-border bg-white transition-all 
    focus:ring-2 focus:ring-blue-200 focus:ring-offset-1 focus:ring-offset-primary focus-visible:outline-none
    data-[state=checked]:border-primary
  `,
  {
    variants: {
      variant: {
        squared: 'rounded data-[state=checked]:bg-primary',
        rounded: 'rounded-full data-[state=checked]:bg-white',
      },
      size: {
        sm: 'h-3 w-3',
        md: 'h-[18px] w-[18px]',
        lg: 'h-5 w-5',
      },
      disabled: {
        true: 'border-border bg-slate-100 cursor-not-allowed data-[state=checked]:border-slate-400 data-[state=checked]:bg-white',
      },
    },
    defaultVariants: {
      variant: 'squared',
      size: 'md',
    },
  }
)

export const boxIndicator = cva(
  'grid place-items-center data-[state=checked]:animate-slide-in radix-state-unchecked:animate-slide-out',
  {
    variants: {
      variant: {
        squared: '',
        rounded: '',
      },
      size: {
        sm: 'h-3 w-3',
        md: 'h-[18px] w-[18px]',
        lg: 'h-5 w-5',
      },
      disabled: {
        true: '',
      },
    },
    defaultVariants: {
      variant: 'squared',
      size: 'sm',
    },
  }
)

export const boxIndicatorMark = cva('', {
  variants: {
    variant: {
      squared: 'text-bold self-center font-bold text-white',
      rounded: 'h-full w-full rounded-full bg-primary',
    },
    size: {
      sm: 'h-[10px] w-[10px]',
      md: 'h-3 w-3',
      lg: 'h-[14px] w-[14px]',
    },
    disabled: {
      true: 'bg-opacity-50',
    },
  },
  compoundVariants: [
    {
      variant: 'rounded',
      size: 'sm',
      class: 'h-2 w-2',
    },
  ],
  defaultVariants: {
    variant: 'squared',
    size: 'sm',
  },
})

export type CheckboxPrimitiveProps = React.ComponentPropsWithoutRef<
  typeof CheckboxPrimitive.Root
> &
  VariantProps<typeof boxItemTv>

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  CheckboxPrimitiveProps
>(({ className, variant, size, disabled, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(boxItemTv({ variant, size, disabled }), className)}
    disabled={disabled}
    {...props}
  >
    <CheckboxPrimitive.Indicator
      className={boxIndicator({ variant, size, disabled })}
    >
      {variant === 'rounded' ? (
        <div className={boxIndicatorMark({ variant, size, disabled })} />
      ) : (
        <Check
          name="confirm-checkbox"
          strokeWidth={3}
          className={boxIndicatorMark({ variant, size })}
        />
      )}
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
))

Checkbox.displayName = 'Checkbox'

export { Checkbox }
