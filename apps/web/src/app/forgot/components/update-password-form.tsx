'use client'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { PasswordInput } from '@/components/ui/password-input'
import { useAuth } from '@/hooks/queries/use-auth-queries'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader } from 'lucide-react'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const schema = z
  .object({
    password: z
      .string({
        message: 'Senha é um campo obrigatório',
      })
      .min(7, {
        message: 'Senha deve ter ao menos 7 caracteres',
      }),
    confirmPassword: z.string({
      message: 'Senha é um campo obrigatório',
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'As senhas não coincidem',
    path: ['confirmPassword'],
  })

type UpdatePasswordData = z.infer<typeof schema>

interface UpdatePasswordFormProps {
  code: string
}

export function UpdatePasswordForm({ code }: UpdatePasswordFormProps) {
  const { updatePasswordMutation } = useAuth()

  const form = useForm<UpdatePasswordData>({
    resolver: zodResolver(schema),
    mode: 'onBlur',
  })

  function onSubmit(data: UpdatePasswordData) {
    updatePasswordMutation.mutate({
      code,
      password: data.password,
      confirmPassword: data.confirmPassword,
    })
  }

  return (
    <>
      <div className="mb-6">
        <h1 className="mb-2 mt-8 text-2xl font-medium lg:text-3xl">
          Redefina Sua Senha
        </h1>
        <h2 className="text-foreground-light text-sm">
          Insira uma nova senha usada para efetuar o login da sua conta
        </h2>
      </div>
      <div className="flex flex-col gap-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} method="PATCH">
            <div className="flex flex-col gap-4 pt-4">
              <FormField
                control={form.control}
                name="password"
                render={({ field, formState }) => (
                  <FormItem>
                    <FormLabel>Senha</FormLabel>
                    <FormControl>
                      <PasswordInput
                        autoComplete="new-password"
                        error={!!formState.errors.password?.message}
                        placeholder="••••••••"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field, formState }) => (
                  <FormItem>
                    <FormLabel>Confirmação da senha</FormLabel>
                    <FormControl>
                      <PasswordInput
                        autoComplete="new-password"
                        error={!!formState.errors.confirmPassword?.message}
                        placeholder="••••••••"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                disabled={updatePasswordMutation.isPending}
                type="submit"
                className="mt-4"
              >
                {updatePasswordMutation.isPending && (
                  <Loader className="mr-1 size-4 animate-spin" />
                )}
                Redefinir senha
              </Button>
            </div>
          </form>
        </Form>

        <div className="my-4 self-center text-sm">
          <span className="text-muted-foreground">Já tenho uma conta? </span>
          <Link
            className="text-foreground underline transition-colors hover:text-primary"
            href="/sign-in"
          >
            Entrar agora
          </Link>
        </div>
      </div>
    </>
  )
}
