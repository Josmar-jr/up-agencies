import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { useFormState } from '@/hooks/use-form-state'

import { ReactNode, useState } from 'react'
import { deletePeoplePermanently } from './actions'
import { toast } from 'sonner'

import { Loader } from 'lucide-react'

interface DeletePeopleDialogProps {
  children: ReactNode
  listIds: string[]
  onResetSelect(): void
}

export function DeletePeopleDialog({
  children,
  listIds,
  onResetSelect,
}: DeletePeopleDialogProps) {
  const [open, setOpen] = useState(false)

  const [{ message }, handleSubmit, isPending] = useFormState({
    action: () => deletePeoplePermanently(listIds),
    onSuccess() {
      toast.success(
        listIds.length > 1
          ? 'Pessoas deletadas com sucesso'
          : 'Pessoa deletada com sucesso'
      )

      onResetSelect()
      setOpen(false)
    },
    onError() {
      toast.error(message)
    },
  })

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader className="p-6">
          <AlertDialogTitle>Você tem certeza absoluta?</AlertDialogTitle>
          <AlertDialogDescription>
            Essa ação não pode ser desfeita. Isso excluirá essa(s) pessoa(s) e
            removerá os dados de nossos servidores.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="border-t px-4 py-3">
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <form onSubmit={handleSubmit}>
            <AlertDialogAction disabled={isPending} type="submit">
              {isPending && <Loader className="mr-1 size-4 animate-spin" />}
              Continue
            </AlertDialogAction>
          </form>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
