import Link from 'next/link'

import { SignInForm } from './sign-in-form'

export default function SignUp() {
  return (
    <>
      <div className="mb-12 mt-16 max-md:mb-8 max-md:mt-12">
        <h1 className="mb-1 text-2xl font-medium lg:text-3xl">Bem vindo</h1>
        <h2 className="text-muted-foreground">Faça login em sua conta</h2>
      </div>

      <SignInForm />

      <div className="my-8 self-center text-sm">
        <span className="text-muted-foreground">Não tem uma conta? </span>
        <Link
          className="text-foreground underline transition-colors hover:text-primary"
          href="/sign-up"
        >
          Se inscreva agora
        </Link>
      </div>
    </>
  )
}
