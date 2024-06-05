import { env } from '@up-agencies/env'
import { cookies } from 'next/headers'

export async function fetchApi<T = unknown>(
  url: string,
  options?: RequestInit
) {
  const token = cookies().get('up-agencies.token')?.value

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
