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

export function AddresData() {
  const form = useFormContext<FormData>()

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-[1fr_2fr_1fr] gap-x-3">
        <FormField
          control={form.control}
          name="address.zipCode"
          render={({ field: { onChange, ...rest }, formState }) => (
            <FormItem>
              <FormLabel required>CEP</FormLabel>
              <FormControl>
                <Input
                  autoComplete="new-password"
                  error={!!formState.errors.address?.zipCode?.message}
                  placeholder="00000-000"
                  onChange={(e) => {
                    const { value } = e.target
                    // e.target.value = formatCNPJ(value)

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
                  type="number"
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
    </div>
  )
}
