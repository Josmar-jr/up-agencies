'use client'
import React, { useEffect, useRef } from 'react'

export interface ResizableTextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const ResizableTextarea = React.forwardRef<
  HTMLTextAreaElement,
  ResizableTextareaProps
>(({ ...props }, ref) => {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null)

  useEffect(() => {
    const textarea = textareaRef.current

    const handleInput = () => {
      if (textarea) {
        textarea.style.height = 'auto'
        textarea.style.height = `${textarea.scrollHeight}px`
      }
    }

    if (textarea) {
      textarea.addEventListener('input', handleInput)
    }

    // Cleanup event listener on component unmount
    return () => {
      if (textarea) {
        textarea.removeEventListener('input', handleInput)
      }
    }
  }, [])

  return (
    <textarea
      ref={textareaRef}
      rows={1} // Começa com uma linha por padrão
      onInput={(e) => {
        const target = e.target as HTMLTextAreaElement
        target.style.height = 'auto'
        target.style.height = `${target.scrollHeight}px`
      }}
      {...props}
    />
  )
})

export { ResizableTextarea }
