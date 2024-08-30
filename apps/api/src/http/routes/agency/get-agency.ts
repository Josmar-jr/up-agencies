import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { auth } from '@/http/middlewares/auth'

export async function getAgency(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .get(
      '/agency',
      {
        schema: {
          tags: ['Agencies'],
          summary: 'Get details from agency',
          security: [{ bearerAuth: [] }],
          response: {
            200: z.object({
              agency: z.object({
                id: z.string().uuid(),
                name: z.string(),
                ownerId: z.string().uuid(),
                avatarUrl: z.string().url().nullable(),
                createdAt: z.date(),
                updatedAt: z.date(),
              }),
            }),
          },
        },
      },
      async (request) => {
        const { agency } = await request.getUserMembership()

        return { agency }
      }
    )
}
