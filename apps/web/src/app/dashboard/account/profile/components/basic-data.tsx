'use client'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { isValidPhoneNumber } from 'react-phone-number-input'
import { toast } from 'sonner'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import type { User } from '@/service/schema/user'
import { PhoneInput } from '@/components/ui/phone-input'
import { Button } from '@/components/ui/button'
import { revalidateTag } from 'next/cache'
// import { formatDate } from "@/utils/formatters";
// import dayjs from "dayjs";
// import "dayjs/locale/pt-br";

const schema = z.object({
  fullname: z
    .string({
      message: 'Nome completo é um campo obrigatório',
    })
    .refine(
      (value) => {
        return value.trim().split(/\s+/u).length >= 2
      },
      { message: 'Escreva o nome completo' }
    ),
  phone: z
    .string({
      message: 'Celular é um campo obrigatório',
    })
    .refine(isValidPhoneNumber, { message: 'Número de celular inválido' }),
  // birthday: z
  //   .string({
  //     message: "Data é um campo obrigatório",
  //   })
  //   .refine((data) => {
  //     const [day, month, year] = data.split("/");

  //     return dayjs(`${month}/${day}/${year}`).isValid();
  //   }, "Data inválida")
  //   .refine((data) => {
  //     const [day, month, year] = data.split("/");
  //     const date = dayjs(`${month}/${day}/${year}`);
  //     const inputDateIsMoreThanCurrentDate = dayjs().isAfter(date);

  //     return inputDateIsMoreThanCurrentDate;
  //   }, "Data de entrada é maior que a data atual"),
})

export type PersonalDataForm = z.infer<typeof schema>

interface BasicDataProps {
  user: User
}

export default function BasicData({ user }: BasicDataProps) {
  const form = useForm<PersonalDataForm>({
    resolver: zodResolver(schema),
    defaultValues: {
      fullname: user.name,
      phone: user.phone,
    },
  })

  function onSubmit(_: PersonalDataForm) {
    // edit endpoint
    toast.info('Funcionalidade em desenvolvimento 🚧')
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        action="POST"
        className="flex flex-col gap-5"
      >
        <section className="grid w-full gap-3 lg:grid-cols-[1fr_1fr]">
          <FormField
            control={form.control}
            name="fullname"
            render={({ field, formState }) => (
              <FormItem>
                <FormLabel>Nome</FormLabel>
                <FormControl>
                  <Input
                    autoComplete="new-password"
                    error={!!formState.errors.fullname?.message}
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field, formState }) => (
              <FormItem>
                <FormLabel>Telefone</FormLabel>
                <FormControl>
                  <FormControl>
                    <PhoneInput
                      error={!!formState.errors.phone?.message}
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
          {/* <FormField
            control={form.control}
            name="date"
            render={({ field: { onChange, ...rest }, formState }) => (
              <FormItem>
                <FormLabel>Data de nascimento</FormLabel>
                <FormControl>
                  <Input
                    autoComplete="new-password"
                    error={!!formState.errors.date?.message}
                    onChange={(e) => {
                      const { value } = e.target;
                      e.target.value = formatDate(value);

                      if (value.length > 18) {
                        return;
                      }

                      onChange(e);
                    }}
                    {...rest}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          /> */}
        </section>

        <div>
          <Button type="submit" disabled={!form.formState.isDirty}>
            Salvar
          </Button>
        </div>
      </form>
    </Form>
  )
}
