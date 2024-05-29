import { auth } from '@/http/middlewares/auth'
import { prisma } from '@/lib/prisma'
import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

export async function createOrganization(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .post(
      '/organizations',
      {
        schema: {
          type: ['Agency'],
          description: 'Create a new agency',
          security: [{ bearerAuth: [] }],
          body: z.object({
            name: z.string(),
            email: z.string().email(),
            cnpj: z.string(),
            site: z.string().optional(),
            avatarUrl: z.string().optional(),
            address: z.object({}),
          }),
        },
      },
      async (request, reply) => {
        const userId = await request.getCurrentUserId()

        const { email, cnpj, name, site, avatarUrl } = request.body

        const newAgency = await prisma.agency.create({
          data: {
            name,
            email,
            cnpj,
            site,
            avatarUrl,
            ownerId: userId,
            members: {
              create: {
                userId,
                role: 'ADMIN',
              },
            },
          },
        })

        return reply.status(201).send({
          agencyId: newAgency.id,
        })
      }
    )
}
