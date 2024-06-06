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

export function DocumentData() {
  const form = useFormContext<FormData>()

  return (
    <div className="grid grid-cols-[2fr_1fr_1fr] gap-x-3">
      <FormField
        control={form.control}
        name="passport"
        render={({ field, formState }) => (
          <FormItem>
            <FormLabel>Passaporte</FormLabel>

            <FormControl>
              <Input
                autoComplete="new-password"
                error={!!formState.errors.passport?.message}
                placeholder="Insira o número de passaporte"
                {...field}
              />
            </FormControl>

            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="passportIssuedAt"
        render={({ field }) => (
          <FormItem className="col-span-1">
            <FormLabel>Emissão do passaporte</FormLabel>
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
        name="passportExpiresAt"
        render={({ field }) => (
          <FormItem className="col-span-1">
            <FormLabel>Vencimento do passaporte</FormLabel>
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
    </div>
  )
}
