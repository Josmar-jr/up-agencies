import { auth } from '@/http/middlewares/auth'
import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'
import { roleSchema } from '@up-agencies/auth'

export async function getMembership(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .get(
      '/agency/membership',
      {
        schema: {
          tags: ['Organizations'],
          summary: 'Get user membership on organization',
          security: [{ bearerAuth: [] }],
          response: {
            200: z.object({
              membership: z.object({
                id: z.string().uuid(),
                role: roleSchema,
                agencyId: z.string().uuid(),
              }),
            }),
          },
        },
      },
      async (request) => {
        const { membership } = await request.getUserMembership()

        return {
          membership: {
            id: membership.id,
            role: membership.role,
            agencyId: membership.agencyId,
          },
        }
      }
    )
}
