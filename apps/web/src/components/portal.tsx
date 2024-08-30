import type { ReactNode } from 'react'
import { createPortal } from 'react-dom'

interface SpaceActionPortalProps extends React.HTMLAttributes<HTMLDivElement> {
  id: string
}

export function SpaceActionPortal({ id, ...props }: SpaceActionPortalProps) {
  return <div id={id} {...props} />
}

interface ButtonActionPortalProps {
  id: string
  children?: ReactNode
}

export function TriggerActionPortal({ id, children }: ButtonActionPortalProps) {
  const rootElement = document.getElementById(id)

  if (!children || !rootElement) {
    return null
  }

  return createPortal(children, rootElement)
}
