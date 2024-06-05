'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { type FormData, schema } from './shema'
import { cn } from '@/lib/utils'

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { PersonalData } from './personal-data'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Card, CardContent } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'

import { DocumentData } from './document-data'
import { AddresData } from './address-data'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { ChevronDown, Files, MapPin, Plus, User } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

const accordions = [
  {
    title: 'Documentos da pessoa',
    element: <DocumentData />,
  },
  {
    title: 'Endereço',
    element: <AddresData />,
  },
]

export function CreatePersonDialog() {
  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: 'onBlur',
  })

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-1 size-4" />
          Adicionar pessoa
        </Button>
      </DialogTrigger>

      <DialogContent className="top-[20%] max-w-2xl translate-y-[0] data-[state=closed]:slide-out-to-top-[0%]">
        {/* <DialogHeader>
          <DialogTitle>Criar pessoa</DialogTitle>
        </DialogHeader> */}

        <Form {...form}>
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
              </TabsList>
              <TabsContent className="px-8 py-2" value="person">
                <PersonalData />
              </TabsContent>
              <TabsContent className="px-8 py-2" value="document">
                <DocumentData />
              </TabsContent>
              <TabsContent className="px-8 py-2" value="address">
                <PersonalData />
              </TabsContent>
            </Tabs>
            {/* <PersonalData />
            <Accordion type="multiple" className="space-y-2 my-4">
              {accordions.map((accordion) => (
                <AccordionItem key={accordion.title} value={accordion.title} asChild>
                  <Card>
                    <AccordionTrigger
                      className={cn(
                        "p-3 w-full flex justify-start gap-2 text-accents-6 text-sm group peer rounded-md transition-all",
                      )}
                    >
                      {accordion.title}
                    </AccordionTrigger>

                    <AccordionContent asChild>
                      <CardContent className="p-6 pt-1 space-y-3">{accordion.element}</CardContent>
                    </AccordionContent>
                  </Card>
                </AccordionItem>
              ))}
            </Accordion>
            <FormField
              control={form.control}
              name="observation"
              render={({ field }) => (
                <FormItem className="col-span-3">
                  <FormLabel>Observação</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Insira algum observação sobre o passageiro"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>

                  <FormDescription>
                    You can <span>@mention</span> other users and organizations.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            /> */}
          </div>
        </Form>

        <DialogFooter className="border-t p-4">
          <Button variant="outline">Cancelar</Button>
          <div className="flex items-center">
            <Button className="rounded-r-none">Criar pessoa</Button>
            <Button className="border-secondary-light rounded-l-none border-l">
              <ChevronDown className="size-4" />
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
