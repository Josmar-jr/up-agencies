import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { ReactNode } from 'react'

interface DetailsPersonDialogProps {
  children: ReactNode
}

export function DetailsPersonDialog({ children }: DetailsPersonDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>OI</DialogContent>
    </Dialog>
  )
}
