'use client'

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { useFormContext } from 'react-hook-form'
import { FormData } from './shema'
import { Input } from '@/components/ui/input'
import { formatCEP } from '@/utils/formatters'
import { useMutation } from '@tanstack/react-query'
import { AddressResultMutation } from '@/service/schema/address'
import { getStateByUF } from '@/utils/helpers'

export function AddresData() {
  const form = useFormContext<FormData>()

  const addressMutation = useMutation<AddressResultMutation>({
    mutationKey: ['ADDRESS_MUTATION', form.watch('address.zipCode')],
    mutationFn: async () => {
      const zipCodeFormat = form.watch('address.zipCode')?.replace(/\D/g, '')

      const response = await fetch(
        `https://viacep.com.br/ws/${zipCodeFormat}/json`
      )

      const data = await response.json()

      return data
    },
    onSuccess(data) {
      form.setValue('address.streetName', data.logradouro)
      form.setValue('address.city', data.localidade)
      form.setValue('address.neighbourhood', data.bairro)
      form.setValue('address.state', getStateByUF(data.uf))
      form.setValue('address.streetName', data.logradouro)
    },
  })

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-[1fr_2fr_1fr] gap-x-3">
        <FormField
          control={form.control}
          name="address.zipCode"
          render={({ field: { onChange, onBlur, ...rest }, formState }) => (
            <FormItem>
              <FormLabel>CEP</FormLabel>
              <FormControl>
                <Input
                  autoComplete="new-password"
                  error={!!formState.errors.address?.zipCode?.message}
                  placeholder="00000-000"
                  onChange={(e) => {
                    const { value } = e.target
                    e.target.value = formatCEP(value)

                    if (value.length > 9) {
                      return
                    }

                    onChange(e)
                  }}
                  onBlur={() => {
                    const zipCodeLength = form.watch('address.zipCode')?.length

                    if (zipCodeLength === 9) {
                      addressMutation.mutate()

                      return
                    }

                    form.setValue('address.city', '')
                    form.setValue('address.neighbourhood', '')
                    form.setValue('address.state', '')
                    form.setValue('address.streetName', '')
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
          name="address.streetName"
          render={({ field, formState }) => (
            <FormItem>
              <FormLabel>Logradouro</FormLabel>
              <FormControl>
                <Input
                  disabled
                  autoComplete="new-password"
                  error={!!formState.errors.address?.streetName?.message}
                  placeholder="Insira o logradouro"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="address.number"
          render={({ field, formState }) => (
            <FormItem>
              <FormLabel required>Número</FormLabel>
              <FormControl>
                <Input
                  autoComplete="new-password"
                  error={!!formState.errors.address?.number?.message}
                  placeholder="Insira o número"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <div className="grid grid-cols-2 gap-x-3">
        <FormField
          control={form.control}
          name="address.complement"
          render={({ field, formState }) => (
            <FormItem>
              <FormLabel>Complemento</FormLabel>
              <FormControl>
                <Input
                  autoComplete="new-password"
                  error={!!formState.errors.address?.complement?.message}
                  placeholder="Insira o complemento"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="address.neighbourhood"
          render={({ field, formState }) => (
            <FormItem>
              <FormLabel>Bairro</FormLabel>
              <FormControl>
                <Input
                  disabled
                  autoComplete="new-password"
                  error={!!formState.errors.address?.neighbourhood?.message}
                  placeholder="Insira o bairro"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <div className="grid grid-cols-2 gap-x-3">
        <FormField
          control={form.control}
          name="address.city"
          render={({ field, formState }) => (
            <FormItem>
              <FormLabel>Cidade</FormLabel>
              <FormControl>
                <Input
                  disabled
                  autoComplete="new-password"
                  error={!!formState.errors.address?.city?.message}
                  placeholder="Insira a cidade"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="address.state"
          render={({ field, formState }) => (
            <FormItem>
              <FormLabel>Estado</FormLabel>
              <FormControl>
                <Input
                  disabled
                  autoComplete="new-password"
                  error={!!formState.errors.address?.state?.message}
                  placeholder="Insira o estado"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <p className="text-sm font-medium text-destructive">
        {form.formState.errors.address?.root?.message}
      </p>
    </div>
  )
}
