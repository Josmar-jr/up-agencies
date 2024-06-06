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
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { ChevronDown, Files, MapPin, Plus, User } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectPrimitiveTrigger,
  SelectTrigger,
} from '@/components/ui/select'

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

      <DialogContent className="top-[20%] max-w-3xl translate-y-[0] data-[state=closed]:slide-out-to-top-[20%]">
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
                <AddresData />
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

        <DialogFooter className="mt-6 border-t px-4 py-3">
          <Button variant="outline">Cancelar</Button>
          <div className="flex items-center">
            <Button className="rounded-r-none">Criar pessoa</Button>
            <Select defaultValue="OFF_CREATOR_MODE">
              <SelectPrimitiveTrigger asChild>
                <Button className="rounded-l-none border-l border-secondary-light pl-2">
                  <ChevronDown className="size-4" />
                </Button>
              </SelectPrimitiveTrigger>
              <SelectContent>
                <SelectItem value="ON_CREATOR_MODE">
                  Salvar e adicionar mais pessoas
                </SelectItem>
                <SelectItem value="OFF_CREATOR_MODE">
                  Salvar e fechar
                </SelectItem>
                <SelectItem value="CLEAR">Limpar todos os campos</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
