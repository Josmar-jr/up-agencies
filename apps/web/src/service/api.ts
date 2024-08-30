import { parseCookies } from 'nookies'
import axios from 'axios'
import { env } from '@up-agencies/env'

export const api = axios.create({
  baseURL: env.NEXT_PUBLIC_BASE_URL,
})

const { 'up-agencies.token': token } = parseCookies()

export const apiProtected = axios.create({
  baseURL: env.NEXT_PUBLIC_BASE_URL,
  headers: {
    Authorization: `Bearer ${token}`,
  },
})

export async function fetchApiClient<T>(url: string, options?: RequestInit) {
  const response = await fetch(`${env.NEXT_PUBLIC_BASE_URL}${url}`, {
    headers: {
      ...(token && { Authorization: `Bearer ${token}` }),
      'Content-Type': 'application/json',
    },
    ...options,
  })

  const data: T = await response.json()

  return data
}
