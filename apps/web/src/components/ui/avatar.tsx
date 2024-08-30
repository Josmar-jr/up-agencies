'use client'

import * as React from 'react'
import * as AvatarPrimitive from '@radix-ui/react-avatar'

import { cn } from '@/lib/utils'

const Avatar = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Root
    ref={ref}
    className={cn(
      'relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full',
      className
    )}
    {...props}
  />
))
Avatar.displayName = AvatarPrimitive.Root.displayName

const AvatarImage = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Image>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Image
    ref={ref}
    className={cn('aspect-square h-full w-full', className)}
    {...props}
  />
))
AvatarImage.displayName = AvatarPrimitive.Image.displayName

const letterToGradientMap: { [key: string]: string } = {
  A: 'bg-gradient-to-r from-red-400 via-red-500 to-red-600',
  B: 'bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600',
  C: 'bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600',
  D: 'bg-gradient-to-r from-green-400 via-green-500 to-green-600',
  E: 'bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600',
  F: 'bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600',
  G: 'bg-gradient-to-r from-indigo-400 via-indigo-500 to-indigo-600',
  H: 'bg-gradient-to-r from-purple-400 via-purple-500 to-purple-600',
  I: 'bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600',
  J: 'bg-gradient-to-r from-red-300 via-red-400 to-red-500',
  K: 'bg-gradient-to-r from-orange-300 via-orange-400 to-orange-500',
  L: 'bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-500',
  M: 'bg-gradient-to-r from-green-300 via-green-400 to-green-500',
  N: 'bg-gradient-to-r from-teal-300 via-teal-400 to-teal-500',
  O: 'bg-gradient-to-r from-blue-300 via-blue-400 to-blue-500',
  P: 'bg-gradient-to-r from-indigo-300 via-indigo-400 to-indigo-500',
  Q: 'bg-gradient-to-r from-purple-300 via-purple-400 to-purple-500',
  R: 'bg-gradient-to-r from-pink-300 via-pink-400 to-pink-500',
  S: 'bg-gradient-to-r from-red-600 via-red-700 to-red-800',
  T: 'bg-gradient-to-r from-orange-600 via-orange-700 to-orange-800',
  U: 'bg-gradient-to-r from-yellow-600 via-yellow-700 to-yellow-800',
  V: 'bg-gradient-to-r from-green-600 via-green-700 to-green-800',
  W: 'bg-gradient-to-r from-teal-600 via-teal-700 to-teal-800',
  X: 'bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800',
  Y: 'bg-gradient-to-r from-indigo-600 via-indigo-700 to-indigo-800',
  Z: 'bg-gradient-to-r from-purple-600 via-purple-700 to-purple-800',
}

const getGradientForLetter = (letter: string) => {
  const upperCaseLetter = letter.toUpperCase()
  return (
    letterToGradientMap[upperCaseLetter] ||
    'bg-gradient-to-r from-gray-400 via-gray-500 to-gray-600'
  )
}

const AvatarFallback = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Fallback>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback> & {
    name?: string
  }
>(({ className, name, ...props }, ref) => {
  const initial = name ? name.charAt(0) : ''
  const backgroundGradient = getGradientForLetter(initial)

  return (
    <AvatarPrimitive.Fallback
      ref={ref}
      className={cn(
        `flex h-full w-full items-center justify-center rounded-full ${backgroundGradient} text-white`,
        className
      )}
      {...props}
    />
  )
})
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName

export { Avatar, AvatarImage, AvatarFallback }
