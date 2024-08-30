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
import { Input } from '@/components/ui/input'
import { useAuth } from '@/hooks/queries/use-auth-queries'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader } from 'lucide-react'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const schema = z.object({
  email: z
    .string({
      message: 'E-mail é um campo obrigatório',
    })
    .trim()
    .email({
      message: 'E-mail inválido',
    }),
})

type ForgotData = z.infer<typeof schema>

export function SendEmailForm() {
  const { forgotPasswordMutation } = useAuth()

  const form = useForm<ForgotData>({
    resolver: zodResolver(schema),
    mode: 'onBlur',
  })

  function onSubmit(data: ForgotData) {
    forgotPasswordMutation.mutate({
      email: data.email,
    })
  }

  return (
    <>
      <div className="mb-6">
        <h1 className="mb-2 mt-8 text-2xl font-medium lg:text-3xl">
          Redefina Sua Senha
        </h1>
        <h2 className="text-foreground-light text-sm">
          Digite seu e-mail e enviaremos um link para redefinir sua senha
        </h2>
      </div>
      <div className="flex flex-col gap-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} method="POST">
            <div className="flex flex-col gap-4 pt-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field, formState }) => (
                  <FormItem>
                    <FormLabel>E-mail</FormLabel>
                    <FormControl>
                      <Input
                        autoComplete="new-password"
                        error={!!formState.errors.email?.message}
                        placeholder="você@exemplo.com"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                disabled={forgotPasswordMutation.isPending}
                type="submit"
                className="mt-4"
              >
                {forgotPasswordMutation.isPending && (
                  <Loader className="mr-1 size-4 animate-spin" />
                )}
                Enviar e-mail de redefinição
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
