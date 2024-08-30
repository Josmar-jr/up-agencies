import {
  type SignInReturn,
  signIn,
  signUp,
  forgotPassword,
  updatePassword,
} from '@/service/auth'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { destroyCookie, setCookie } from 'nookies'
import type { AxiosError } from 'axios'

import { toast } from 'sonner'
import { useSignUpStep } from '../useAuth'

export function useAuth() {
  const router = useRouter()
  const { onChangeCurrentStep } = useSignUpStep()

  const signInMutation = useMutation({
    mutationFn: signIn,
    onSuccess({ token }: SignInReturn) {
      toast.success('Login realizado', {
        description: 'Bem-vindo de volta! Você entrou com sucesso 🎉',
      })

      setCookie(undefined, 'up-agencies.token', token, {
        maxAge: 60 * 60 * 24 * 365 * 1, // 1 year
        path: '/',
      })

      router.push('/dashboard')
    },
    onError(error: AxiosError) {
      if (error.response?.status === 401) {
        toast.error('Credenciais incorretas', {
          description:
            'Por favor, verifique suas credenciais e tente novamente 😥',
        })

        return
      }

      toast.error('Erro na autenticação', {
        description:
          'Ocorreu um problema ao tentar autenticar. Por favor, tente novamente mais tarde 😥',
      })
    },
  })

  const signUpMutation = useMutation({
    mutationFn: signUp,
    onSuccess() {
      toast.success('Conta criada', {
        description:
          'A conta foi criada com sucesso, faça login com suas credenciais 🎉',
      })

      router.push('/sign-in')

      onChangeCurrentStep('personal')
    },
    onError(_: AxiosError) {
      toast.error(
        'Ops! Parece que houve um problema ao criar sua conta. Por favor, verifique seus dados e tente novamente 😥'
      )
    },
  })

  const forgotPasswordMutation = useMutation({
    mutationFn: forgotPassword,
    onSuccess() {
      toast.success(
        'Você receberá um e-mail de redefinição de senha. O link de redefinição de senha expira em 10 minutos.'
      )
    },
    onError(error: AxiosError) {
      if (error.response?.status === 401) {
        toast.error(
          'E-mail não encontrado.Por favor, verifique o e-mail e tente novamente 😥'
        )
      }
    },
  })

  const updatePasswordMutation = useMutation({
    mutationFn: updatePassword,
    onSuccess() {
      toast.success('Senha redefinida com sucesso')

      router.push('/sign-in')
    },
    onError(error: AxiosError) {
      if (error.response?.status === 401) {
        toast.error('Error ao definir a senha 😥')
      }
    },
  })

  function signOut() {
    destroyCookie(undefined, 'up-agencies.token')

    router.push('/sign-in')
    router.refresh()
  }

  return {
    signInMutation,
    signUpMutation,
    forgotPasswordMutation,
    updatePasswordMutation,
    signOut,
  }
}
