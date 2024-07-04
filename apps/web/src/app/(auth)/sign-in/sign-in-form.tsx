'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useFormState } from '@/hooks/use-form-state'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { signInWithEmailAndPassword } from './actions'
import { Loader } from 'lucide-react'
import { ErrorMessage } from '@/components/ui/form'
import { toast } from 'sonner'

export function SignInForm() {
  const router = useRouter()

  const [{ errors, message }, handleSubmit, isPending] = useFormState({
    action: signInWithEmailAndPassword,
    onSuccess() {
      toast.success('Bem vindo, você entrou com sucesso')

      router.push('/')
    },
    onError() {
      toast.error(message)
    },
  })

  return (
    <form
      onSubmit={handleSubmit}
      className="flex max-h-[1000px] flex-col gap-4 overflow-y-hidden p-1"
    >
      <div className="space-y-1">
        <Label htmlFor="email">E-mail</Label>
        <Input
          id="email"
          type="email"
          name="email"
          error={!!errors?.email?.[0]}
          autoComplete="new-password"
          placeholder="você@exemplo.com"
          tabIndex={2}
        />
        <ErrorMessage error={errors?.email?.[0]} />
      </div>

      <div className="space-y-1">
        <span className="flex items-center justify-between">
          <Label htmlFor="password">Senha</Label>
          <Link
            href="/forgot"
            className="text-xs text-muted-foreground transition-colors hover:text-foreground"
          >
            Esqueceu a senha?
          </Link>
        </span>
        <Input
          id="password"
          type="password"
          name="password"
          autoComplete="new-password"
          error={!!errors?.password?.[0]}
          placeholder="••••••••"
          tabIndex={3}
        />
        <ErrorMessage error={errors?.password?.[0]} />
      </div>

      <Button tabIndex={4} className="mt-4" type="submit" disabled={isPending}>
        {isPending && <Loader className="mr-1 size-4 animate-spin" />}
        Entrar
      </Button>
    </form>
  )
}
