import { env } from '@up-agencies/env'
import { cookies } from 'next/headers'

export async function fetchApi<T = unknown>(
  url: string,
  options?: RequestInit
) {
  const token = cookies().get('up-agencies.token')?.value

  try {
    const response = await fetch(`${env.NEXT_PUBLIC_BASE_URL}${url}`, {
      headers: {
        ...(token && { Authorization: `Bearer ${token}` }),
        'Content-Type': 'application/json',
      },
      ...options,
    })

    if (!response.ok) {
      const error = await response.text()

      const { message } = JSON.parse(error)

      throw new Error(message || `HTTP error! status: ${response.status}`)
    }

    const data: T = await response.json()

    return data
  } catch (err) {
    console.log(err)
    throw new Error(`err`)
  }
}

export async function fetchAPI(url: string, options?: RequestInit) {
  const token = cookies().get('up-agencies.token')?.value

  return fetch(`${env.NEXT_PUBLIC_BASE_URL}${url}`, {
    headers: {
      ...(token && { Authorization: `Bearer ${token}` }),
      'Content-Type': 'application/json',
    },
    ...options,
  })
}
