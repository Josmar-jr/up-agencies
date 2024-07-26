import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogButtonClose,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from '@/components/ui/dialog'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ReactNode } from 'react'

import { ChevronDown, Text } from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectPrimitiveTrigger,
  SelectSeparator,
} from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { StatusQuote } from '../status-quote'
import { AssigneQuote } from '../assignee-quote'

interface CreatePersonDialogProps {
  children: ReactNode
}

export function CreateQuoteDialog({ children }: CreatePersonDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="top-[20%] translate-y-[0] data-[state=closed]:slide-out-to-top-[20%]">
        <Tabs defaultValue="person">
          <TabsList className="h-14 px-6 *:h-10">
            <TabsTrigger value="person">Cotação</TabsTrigger>
          </TabsList>
          <TabsContent className="px-8 py-2" value="person">
            <Label>Nome</Label>
            <Input className="mb-3" />

            <div className="flex items-center gap-2">
              <Text className="size-5" />
              <Label className="text-base font-semibold">Descrição</Label>
            </div>
            <button className="mt-2 w-full rounded-sm bg-accents-3 p-2 pb-8 text-left text-sm">
              Adicione um descrição mais detalhada...
            </button>

            <div className="space-x-1">
              <StatusQuote />
              <AssigneQuote />
            </div>
          </TabsContent>
        </Tabs>

        <DialogFooter className="mt-6 border-t px-4 py-3">
          <DialogButtonClose asChild>
            <Button
              // disabled={createANewPersonMutation.isPending}
              variant="outline"
            >
              Cancelar
            </Button>
          </DialogButtonClose>
          <div className="flex items-center">
            <Button
              // disabled={createANewPersonMutation.isPending}
              className="rounded-r-none"
            >
              {/* {createANewPersonMutation.isPending && (
                    <Loader className="mr-1 size-4 animate-spin" />
                  )} */}
              Criar cotação
            </Button>
            <Select defaultValue="OFF_CREATOR_MODE">
              <SelectPrimitiveTrigger className="group" asChild>
                <Button
                  // disabled={createANewPersonMutation.isPending}
                  className="rounded-l-none border-l border-secondary-light pl-2"
                >
                  <ChevronDown className="size-4 transition-transform duration-300 group-data-[state='open']:rotate-180" />
                </Button>
              </SelectPrimitiveTrigger>
              <SelectContent>
                <span className="block p-2 pb-2 text-xs">Ações</span>
                <SelectItem value="ON_CREATOR_MODE">Salvar e abrir</SelectItem>
                <SelectItem value="OFF_CREATOR_MODE">
                  Criar e iniciar outro
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
