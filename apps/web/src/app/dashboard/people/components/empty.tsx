import { Users } from 'lucide-react'
import { CreatePersonDialog } from './create-person-dialog'

export function Empty() {
  return (
    <div className="mx-auto grid h-full max-w-lg place-content-center gap-2">
      <div className="mx-auto grid size-14 place-content-center rounded-full border">
        <Users />
      </div>
      <h3 className="text-center">Adicione a primeira pessoa</h3>
      <p className="text-center text-sm text-muted-foreground">
        Parece que ainda não temos pessoas cadastradas. Quando alguém for
        adicionado, você verá as informações aqui.
      </p>
      <div className="mx-auto mt-4">
        <CreatePersonDialog />
      </div>
    </div>
  )
}
