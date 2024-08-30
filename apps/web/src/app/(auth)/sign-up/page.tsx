'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import Link from 'next/link'

import { type Step, useSignUpStep } from '@/hooks/useAuth'
import { type FormSignUpData, schema } from './schema'
import { Form } from '@/components/ui/form'
import { MultiStep } from './components/multi-step'

import { AgencyData } from './components/agency-data'
import { PersonalData } from './components/personal-data'

import { useAuth } from '@/hooks/queries/use-auth-queries'

export default function SignUp() {
  const { currentStep } = useSignUpStep()
  const { signUpMutation } = useAuth()

  const form = useForm<FormSignUpData>({
    resolver: zodResolver(schema),
    mode: 'onBlur',
  })

  async function onSubmit(data: FormSignUpData) {
    signUpMutation.mutate({
      name: data.fullname,
      email: data.email,
      password: data.password,
      phone: data.phone,
      agency: {
        name: data.agencyName,
        email: data.agencyEmail,
        cnpj: data.document,
      },
    })
  }

  const steps = {
    personal: <PersonalData />,
    agency: <AgencyData isPending={signUpMutation.isPending} />,
  } as Record<Step, React.ReactNode>

  return (
    <>
      <div className="mb-12 mt-16 max-md:mb-8 max-md:mt-12">
        <h1 className="mb-1 text-2xl font-medium lg:text-3xl">Iniciar</h1>
        <h2 className="text-muted-foreground">Crie sua conta</h2>
        <MultiStep currentStep={currentStep === 'agency' ? 2 : 1} />
      </div>

      <Form {...form}>
        <form
          className="flex max-h-[1000px] flex-col gap-4 overflow-y-hidden p-1"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          {steps[currentStep]}
        </form>
      </Form>

      <div className="my-8 self-center text-sm">
        <span className="text-muted-foreground">Já tenho uma conta? </span>
        <Link
          className="text-foreground underline transition-colors hover:text-primary"
          href="/sign-in"
        >
          Entrar agora
        </Link>
      </div>
    </>
  )
}
