import { hash } from 'bcryptjs'
import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { prisma } from '@/lib/prisma'
import { BadRequestError } from '@/http/routes/_errors/bad-request-error'

export async function createAccount(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/auth/sign-up',
    {
      schema: {
        tags: ['Auth'],
        summary: 'Create a new account',
        body: z.object({
          name: z.string(),
          email: z.string().email(),
          password: z.string().min(6),
          phone: z.string(),
          agency: z.object({
            name: z.string(),
            email: z.string().email(),
            cnpj: z.string(),
            site: z.string().optional(),
            avatarUrl: z.string(),
          }),
        }),
      },
    },
    async (request, reply) => {
      const { name, email, password, phone, agency } = request.body

      const userWithSameEmail = await prisma.user.findUnique({
        where: {
          email,
        },
      })

      if (userWithSameEmail) {
        throw new BadRequestError('User with same e-mail already exists.')
      }

      const passwordHash = await hash(password, 6)

      const user = await prisma.user.create({
        data: {
          name,
          email,
          passwordHash,
          phone,
        },
      })

      await prisma.agency.create({
        data: {
          name: agency.name,
          email: agency.email,
          cnpj: agency.cnpj,
          site: agency.site,
          avatarUrl: agency.avatarUrl,
          ownerId: user.id,
          members: {
            create: {
              userId: user.id,
              role: 'ADMIN',
            },
          },
        },
      })

      return reply.status(201).send()
    }
  )
}
