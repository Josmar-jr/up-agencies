'use server'

import { createServerAction } from 'zsa'
import z from 'zod'
import { fetchAPI, fetchApi } from '@/service/api-server'

interface Invate {
  inviteId: string
  email: string
}

interface SenInviteActionResponse {
  invites: Invate[]
}

export const sendInviteAction = createServerAction()
  .input(
    z.object({
      emails: z.array(z.string().email()),
      role: z.union([
        z.literal('ADMIN'),
        z.literal('MEMBER'),
        z.literal('BILLING'),
      ]),
    })
  )
  .handler(async ({ input }) => {
    const { emails, role } = input

    const body = JSON.stringify({
      emails,
      role,
    })

    const response = await fetchAPI('/invites', {
      body,
      method: 'POST',
    })

    if (!response.ok) {
      const error = await response.text()

      const { message } = JSON.parse(error)

      throw new Error(message || `HTTP error! status: ${response.status}`)
    }

    const data: SenInviteActionResponse = await response.json()

    return data
  })
