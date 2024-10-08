import { Card, CardContent } from '@/components/ui/card'
import { useFormContext } from 'react-hook-form'
import type { FormData } from './shema'
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
import { Calendar } from '@/components/ui/calendar'
import { Button } from '@/components/ui/button'
import dayjs from 'dayjs'
import { CalendarDays } from 'lucide-react'
import { cn } from '@/lib/utils'
import { formatCNPJ, formatCPF, formatRG } from '@/utils/formatters'

export function DocumentData() {
  const form = useFormContext<FormData>()

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-3 gap-x-3">
        <FormField
          control={form.control}
          name="document.CPForCNPJ"
          render={({ field: { onChange, ...rest }, formState }) => (
            <FormItem>
              <FormLabel>CPF/CNPJ</FormLabel>

              <FormControl>
                <Input
                  autoComplete="new-password"
                  error={!!formState.errors.document?.CPForCNPJ?.message}
                  placeholder="Insira o CPF ou o CNPJ"
                  onChange={(e) => {
                    const { value } = e.target

                    if (value.length <= 14) {
                      e.target.value = formatCPF(value)
                    } else if (value.length <= 18) {
                      e.target.value = formatCNPJ(value)
                    } else if (value.length > 18) {
                      return
                    }

                    onChange(e)
                  }}
                  {...rest}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="document.RG"
          render={({ field: { onChange, ...rest }, formState }) => (
            <FormItem>
              <FormLabel>RG</FormLabel>

              <FormControl>
                <Input
                  autoComplete="new-password"
                  error={!!formState.errors.document?.RG?.message}
                  placeholder="Insira o RG"
                  onChange={(e) => {
                    const { value } = e.target
                    e.target.value = formatRG(value)

                    if (value.length > 12) {
                      return
                    }

                    onChange(e)
                  }}
                  {...rest}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="document.issuingBodyRG"
          render={({ field, formState }) => (
            <FormItem>
              <FormLabel>Órgão Emissor RG</FormLabel>

              <FormControl>
                <Input
                  autoComplete="new-password"
                  error={!!formState.errors.document?.issuingBodyRG?.message}
                  placeholder="Insira o órgão emissor RG"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <div className="grid grid-cols-[2fr_1fr_1fr] gap-x-3">
        <FormField
          control={form.control}
          name="document.passport"
          render={({ field, formState }) => (
            <FormItem>
              <FormLabel>Passaporte</FormLabel>

              <FormControl>
                <Input
                  autoComplete="new-password"
                  error={!!formState.errors.document?.passport?.message}
                  placeholder="Insira o número de passaporte"
                  maxLength={9}
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="document.passportIssuedAt"
          render={({ field, formState }) => (
            <FormItem className="col-span-1">
              <FormLabel>Emissão do passaporte</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      size="default"
                      variant="outline"
                      error={
                        !!formState.errors.document?.passportIssuedAt?.message
                      }
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
          name="document.passportExpiresAt"
          render={({ field, formState }) => (
            <FormItem className="col-span-1">
              <FormLabel>Vencimento do passaporte</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      error={
                        !!formState.errors.document?.passportExpiresAt?.message
                      }
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
      </div>
      <div className="grid grid-cols-[2fr_1fr_1fr] gap-x-3">
        <FormField
          control={form.control}
          name="document.visa"
          render={({ field, formState }) => (
            <FormItem>
              <FormLabel>Visto</FormLabel>

              <FormControl>
                <Input
                  autoComplete="new-password"
                  error={!!formState.errors.document?.visa?.message}
                  placeholder="Insira o número de visto"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="document.visaValidAt"
          render={({ field, formState }) => (
            <FormItem className="col-span-1">
              <FormLabel>Validade do visto</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      size="default"
                      variant="outline"
                      error={!!formState.errors.document?.visaValidAt?.message}
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
      </div>
    </div>
  )
}
