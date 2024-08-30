import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

import { prisma } from '@/lib/prisma'

import { BadRequestError } from '../_errors/bad-request-error'
import { auth } from '@/http/middlewares/auth'

export async function updateUserAccount(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .post(
      '/update-account',
      {
        schema: {
          tags: ['Auth'],
          description: 'Update account',
          body: z.object({
            name: z.string().optional(),
            phone: z.string().optional(),
          }),
        },
      },
      async (request, reply) => {
        const userId = await request.getCurrentUserId()
        const { name, phone } = request.body

        const user = await prisma.user.update({
          data: {
            name,
            phone,
          },
          select: {
            id: true,
            avatarUrl: true,
            name: true,
            email: true,
            phone: true,
          },
          where: {
            id: userId,
          },
        })

        if (!user) {
          throw new BadRequestError('User not found.')
        }

        return reply.status(201).send({ user })
      }
    )
}
