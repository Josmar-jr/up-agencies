'use client'

import { Button } from '@/components/ui/button'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useFormContext } from 'react-hook-form'
import type { FormSignUpData } from '../schema'
import { formatCNPJ } from '@/utils/formatters'
import { useSignUpStep } from '@/hooks/useAuth'
import { Loader } from 'lucide-react'

interface AgencyDataProps {
  isPending: boolean
}

export function AgencyData({ isPending }: AgencyDataProps) {
  const { onChangeCurrentStep } = useSignUpStep()

  const form = useFormContext<FormSignUpData>()

  return (
    <>
      <FormField
        control={form.control}
        name="agencyName"
        render={({ field, formState }) => (
          <FormItem>
            <FormLabel>Nome da agência</FormLabel>
            <FormControl>
              <Input
                autoComplete="new-password"
                error={!!formState.errors.agencyName?.message}
                placeholder="nome da agência"
                {...field}
              />
            </FormControl>

            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="document"
        render={({ field: { onChange, ...rest }, formState }) => (
          <FormItem>
            <FormLabel>CNPJ</FormLabel>
            <FormControl>
              <Input
                autoComplete="new-password"
                error={!!formState.errors.document?.message}
                placeholder="00.000.000/0000-00"
                onChange={(e) => {
                  const { value } = e.target
                  e.target.value = formatCNPJ(value)

                  if (value.length > 18) {
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
        name="agencyEmail"
        render={({ field, formState }) => (
          <FormItem>
            <FormLabel>E-mail da agência</FormLabel>
            <FormControl>
              <Input
                type="email"
                autoComplete="new-password"
                error={!!formState.errors.agencyEmail?.message}
                placeholder="email-da-agência@exemplo.com"
                {...field}
              />
            </FormControl>

            <FormMessage />
          </FormItem>
        )}
      />

      <div className="flex flex-col gap-3">
        <Button
          onClick={() => onChangeCurrentStep('personal')}
          variant="ghost"
          type="button"
          className="mt-4"
          disabled={isPending}
        >
          Voltar
        </Button>

        <Button disabled={isPending} type="submit">
          {isPending && <Loader className="mr-1 size-4 animate-spin" />}
          Criar conta
        </Button>
      </div>
    </>
  )
}
