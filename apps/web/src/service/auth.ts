import { api } from './api'
import type { Agency } from './schema/agency'
import type { User } from './schema/user'

interface SignUpParam extends User {
  agency: Agency
}

export async function signUp(body: SignUpParam) {
  const response = await api.post('/auth/sign-up', body)
  const data = await response.data

  return data
}

interface SignInParam {
  email: string
  password: string
}

export interface SignInReturn {
  token: string
}

export async function signIn(body: SignInParam) {
  const response = await api.post('/auth/sign-in', body)
  const data = await response.data

  return data
}

interface ForgotPasswordParam {
  email: string
}

export async function forgotPassword(body: ForgotPasswordParam) {
  const response = await api.post('/auth/forgot-password', body)
  const data = await response.data

  return data
}

interface UpdatePasswordParam {
  code: string
  password: string
  confirmPassword: string
}

export async function updatePassword(body: UpdatePasswordParam) {
  const response = await api.patch('/auth/update-password', body)
  const data = await response.data

  return data
}
