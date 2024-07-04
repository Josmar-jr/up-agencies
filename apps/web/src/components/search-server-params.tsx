'use client'

import { useCallback, useEffect, useState, useTransition } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { Input } from './ui/input'
import { Loader2 } from 'lucide-react'

export const SearchServerParams = () => {
  const [inputValue, setInputValue] = useState<string>('')
  const [debouncedValue, setDebouncedValue] = useState<string>('')
  const [mounted, setMounted] = useState<boolean>(false)
  const router = useRouter()
  const pathname = usePathname()
  const [isPending, startTransition] = useTransition()

  const handleSearchParams = useCallback(
    (debouncedValue: string) => {
      let params = new URLSearchParams(window.location.search)
      if (debouncedValue.length > 0) {
        params.set('search', debouncedValue)
      } else {
        params.set('search', '')
      }
      startTransition(() => {
        router.replace(`${pathname}?${params.toString()}`)
      })
    },
    [pathname, router]
  )

  // EFFECT: Set Initial Params
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const searchQuery = params.get('search') ?? ''
    setInputValue(searchQuery)
  }, [])

  // EFFECT: Set Mounted
  useEffect(() => {
    if (debouncedValue.length > 0 && !mounted) {
      setMounted(true)
    }
  }, [debouncedValue, mounted])

  // EFFECT: Debounce Input Value
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(inputValue)
    }, 500)

    return () => {
      clearTimeout(timer)
    }
  }, [inputValue])

  // EFFECT: Search Params
  useEffect(() => {
    if (mounted) handleSearchParams(debouncedValue)
  }, [debouncedValue, handleSearchParams, mounted, inputValue])

  return (
    <div className="relative">
      <Input
        value={inputValue}
        onChange={(e) => {
          setInputValue(e.target.value)
        }}
        className="h-8 max-w-64 pr-8"
        placeholder="Pesquisar pessoas"
      />

      {isPending && (
        <div className="absolute right-2 top-1/2 -translate-y-1/2">
          <Loader2 className="size-5 animate-spin text-secondary-dark" />
        </div>
      )}
    </div>
  )
}
