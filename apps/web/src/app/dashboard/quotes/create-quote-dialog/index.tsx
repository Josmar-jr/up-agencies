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
import { GeneralInfo } from './general-info'

interface CreatePersonDialogProps {
  children: ReactNode
}

export function CreateQuoteDialog({ children }: CreatePersonDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-3xl">
        <Tabs defaultValue="general-info-quote">
          <TabsList className="h-14 px-6 *:h-10">
            <TabsTrigger value="general-info-quote">Cotação</TabsTrigger>
            <TabsTrigger value="fly">Voo</TabsTrigger>
          </TabsList>
          <TabsContent className="mt-0" value="general-info-quote">
            <GeneralInfo />
          </TabsContent>
          <TabsContent className="px-8 py-2" value="fly">
            <div />
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
