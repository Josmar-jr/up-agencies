'use client'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import { CalendarDays } from 'lucide-react'
import { useFormContext } from 'react-hook-form'
import type { FormData } from './shema'
import dayjs from 'dayjs'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { generatesSelectable } from '@/utils/helpers'
import { SEXO } from '@/utils/constants'
import { PhoneInput } from '@/components/ui/phone-input'
import MultipleSelector, { Option } from '@/components/ui/multi-selector'

const OPTIONS: Option[] = [
  { label: 'Passageiro', value: 'PASSENGER' },
  { label: 'Client', value: 'CLIENT' },
  { label: 'Fornecedor', value: 'SUPPLIER' },
  { label: 'Representante', value: 'REPRESENTATIVE' },
]

export function PersonalData() {
  const form = useFormContext<FormData>()

  return (
    <div className="grid grid-cols-2 gap-3">
      <FormField
        control={form.control}
        name="personal.fullname"
        render={({ field, formState }) => (
          <FormItem>
            <FormLabel required>Nome completo</FormLabel>

            <FormControl>
              <Input
                autoComplete="new-password"
                error={!!formState.errors.personal?.fullname?.message}
                placeholder="Insira o nome e sobrenome"
                {...field}
              />
            </FormControl>

            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="personal.typePerson"
        render={({ field, formState }) => (
          <FormItem>
            <FormLabel required>Tipo de Pessoa</FormLabel>
            <FormControl>
              <MultipleSelector
                error={!!formState.errors.personal?.typePerson?.message}
                defaultOptions={OPTIONS}
                placeholder="Selecione o tipo de pessoa..."
                emptyIndicator={
                  <p className="text-center text-sm leading-10 text-secondary-light">
                    Nenhum resultado
                  </p>
                }
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="personal.phone"
        render={({ field, formState }) => (
          <FormItem>
            <FormLabel>Telefone</FormLabel>
            <FormControl>
              <FormControl>
                <PhoneInput
                  error={!!formState.errors.personal?.phone?.message}
                  defaultCountry="BR"
                  placeholder="Entre com um número"
                  {...field}
                />
              </FormControl>
            </FormControl>

            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="personal.email"
        render={({ field, formState }) => (
          <FormItem>
            <FormLabel>Email</FormLabel>

            <FormControl>
              <Input
                autoComplete="new-password"
                error={!!formState.errors.personal?.email?.message}
                placeholder="Insira o email"
                {...field}
              />
            </FormControl>

            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="personal.birthday"
        render={({ field }) => (
          <FormItem className="col-span-1">
            <FormLabel>Data de nascimento</FormLabel>
            <Popover>
              <PopoverTrigger asChild>
                <FormControl>
                  <Button
                    size="default"
                    variant="outline"
                    className={cn(
                      'w-full pl-3 text-left font-normal',
                      !field.value && 'text-muted-foreground'
                    )}
                  >
                    {field.value ? (
                      dayjs(field.value).format('DD/MM/YYYY')
                    ) : (
                      <span>Selecione a data</span>
                    )}
                    <CalendarDays className="ml-auto h-4 w-4 opacity-50" />
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  captionLayout="dropdown-buttons"
                  mode="single"
                  fromYear={Number(dayjs().get('y')) - 100}
                  toYear={Number(dayjs().get('y'))}
                  selected={field.value}
                  onSelect={field.onChange}
                  disabled={(date) =>
                    date > new Date() || date < new Date('1900-01-01')
                  }
                  initialFocus
                />
              </PopoverContent>
            </Popover>

            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="personal.gender"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Sexo</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger
                  data-filled={!!field.value}
                  className="data-[filled=false]:text-muted-foreground data-[placeholder=true]:text-muted-foreground"
                >
                  <SelectValue placeholder="Selecione o sexo" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {generatesSelectable(SEXO).map((sexo) => (
                  <SelectItem key={sexo.value} value={sexo.value}>
                    {sexo.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  )
}
