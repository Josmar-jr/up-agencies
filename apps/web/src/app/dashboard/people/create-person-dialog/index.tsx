'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { type FormData, schema } from './shema'

import { Form } from '@/components/ui/form'
import { PersonalData } from './personal-data'

import { DocumentData } from './document-data'
import { AddresData } from './address-data'
import {
  Dialog,
  DialogButtonClose,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import {
  ChevronDown,
  Files,
  Loader,
  MapPin,
  Plus,
  ScrollText,
  User,
} from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectPrimitiveTrigger,
  SelectSeparator,
} from '@/components/ui/select'
import { AnnotationData } from './annotation-data'
import { usePeople } from '@/hooks/queries/use-people'
import { PersonType } from '@/service/people'
import { ReactNode, useState } from 'react'

import { useQueryClient } from '@tanstack/react-query'

import { GetManyPeopleResponse } from '@/http/people/list-people'

interface CreatePersonDialogProps {
  children: ReactNode
}

export function CreatePersonDialog({ children }: CreatePersonDialogProps) {
  const queryClient = useQueryClient()

  const { createANewPersonMutation } = usePeople()

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: 'onBlur',
  })

  const [open, setOpen] = useState(false)

  function handleCreateANewPerson(data: FormData) {
    createANewPersonMutation.mutate(
      {
        name: data.personal.fullname,
        personType: data.personal.typePerson.map(
          ({ value }) => value
        ) as PersonType[],
        email: data.personal.email,
        phone: data.personal.phone,
        birthday: data.personal.birthday,
        gender: data.personal.gender,
        document: data.document?.CPForCNPJ,
        generalRegistration:
          data.document?.RG && data.document?.issuingBodyRG
            ? {
                identify: data.document?.RG,
                issuingBody: data.document?.issuingBodyRG,
              }
            : undefined,
        passport:
          data.document?.passport &&
          data.document.passportIssuedAt &&
          data.document.passportExpiresAt
            ? {
                identify: data.document.passport,
                issuedAt: data.document.passportIssuedAt,
                expiresIn: data.document.passportExpiresAt,
              }
            : undefined,
        visa:
          data.document?.visa && data.document?.visaValidAt
            ? {
                identify: data.document.visa,
                expiresIn: data.document.visaValidAt,
              }
            : undefined,
        observation: data.annotation?.description,
      },
      {
        onSuccess(_, variables) {
          queryClient.setQueryData(
            ['GET_MANY_PEOPLE'],
            (data: GetManyPeopleResponse) => {
              return {
                ...data,
                people: [variables, ...data.people],
              }
            }
          )

          form.reset()
          setOpen(false)
        },
      }
    )
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent className="top-[20%] max-w-3xl translate-y-[0] data-[state=closed]:slide-out-to-top-[20%]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleCreateANewPerson)}>
            <div>
              <Tabs defaultValue="person">
                <TabsList className="h-14 px-6 *:h-10">
                  <TabsTrigger value="person">
                    <User className="mr-1 size-4" />
                    Pessoa
                  </TabsTrigger>
                  <TabsTrigger value="document">
                    <Files className="mr-1 size-4" />
                    Documentos
                  </TabsTrigger>
                  <TabsTrigger value="address">
                    <MapPin className="mr-1 size-4" />
                    Endereço
                  </TabsTrigger>
                  <TabsTrigger value="annotation">
                    <ScrollText className="mr-1 size-4" />
                    Anotações
                  </TabsTrigger>
                </TabsList>
                <TabsContent className="px-8 py-2" value="person">
                  <PersonalData />
                </TabsContent>
                <TabsContent className="px-8 py-2" value="document">
                  <DocumentData />
                </TabsContent>
                <TabsContent className="px-8 py-2" value="address">
                  <AddresData />
                </TabsContent>
                <TabsContent className="px-8 py-2" value="annotation">
                  <AnnotationData />
                </TabsContent>
              </Tabs>
            </div>

            <DialogFooter className="mt-6 border-t px-4 py-3">
              <DialogButtonClose asChild>
                <Button
                  disabled={createANewPersonMutation.isPending}
                  variant="outline"
                >
                  Cancelar
                </Button>
              </DialogButtonClose>
              <div className="flex items-center">
                <Button
                  disabled={createANewPersonMutation.isPending}
                  className="rounded-r-none"
                >
                  {createANewPersonMutation.isPending && (
                    <Loader className="mr-1 size-4 animate-spin" />
                  )}
                  Criar pessoa
                </Button>
                <Select defaultValue="OFF_CREATOR_MODE">
                  <SelectPrimitiveTrigger className="group" asChild>
                    <Button
                      disabled={createANewPersonMutation.isPending}
                      className="rounded-l-none border-l border-secondary-light pl-2"
                    >
                      <ChevronDown className="size-4 transition-transform duration-300 group-data-[state='open']:rotate-180" />
                    </Button>
                  </SelectPrimitiveTrigger>
                  <SelectContent>
                    <span className="block p-2 pb-2 text-xs">Ações</span>
                    <SelectItem value="ON_CREATOR_MODE">
                      Salvar e adicionar mais pessoas
                    </SelectItem>
                    <SelectItem value="OFF_CREATOR_MODE">
                      Salvar e fechar
                    </SelectItem>
                    <SelectSeparator />
                    <SelectItem value="CLEAR">
                      Limpar todos os campos
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
