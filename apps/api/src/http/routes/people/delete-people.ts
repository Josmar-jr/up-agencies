import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { auth } from '@/http/middlewares/auth'
import { UnauthorizedError } from '@/http/routes/_errors/unauthorized-error'
import { prisma } from '@/lib/prisma'
import { getUserPermissions } from '@/utils/get-user-permissions'
import { BadRequestError } from '../_errors/bad-request-error'

export async function deletePeople(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .delete(
      '/people',
      {
        schema: {
          tags: ['People'],
          summary: 'Delete people',
          security: [{ bearerAuth: [] }],
          body: z.object({
            ids: z.array(z.string().uuid()),
          }),
          response: {
            204: z.null(),
          },
        },
      },
      async (request, reply) => {
        const { ids } = request.body

        const userId = await request.getCurrentUserId()

        const { agency, membership } = await request.getUserMembership()
        const { cannot } = getUserPermissions(userId, membership.role)

        if (cannot('delete', 'People')) {
          throw new UnauthorizedError(`You're not allowed to delete people`)
        }

        const people = await prisma.person.findMany({
          where: {
            id: { in: ids },
            agencyId: agency.id,
          },
        })

        if (people.length !== ids.length) {
          throw new BadRequestError('Some people not found.')
        }

        await prisma.person.deleteMany({
          where: {
            id: {
              in: ids,
            },
          },
        })

        return reply.status(204).send()
      }
    )
}
