import { prisma } from '@/lib/prisma'
import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'
import { BadRequestError } from '../_errors/bad-request-error'
import { hash } from 'bcryptjs'

export async function acceptInvite(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/invites/:inviteId',
    {
      schema: {
        tags: ['Invites'],
        summary: 'Accept an invite',
        params: z.object({
          inviteId: z.string().uuid(),
        }),
        body: z.object({
          name: z.string(),
          password: z.string().min(6),
          phone: z.string(),
        }),
        response: {
          204: z.null(),
        },
      },
    },
    async (request, reply) => {
      const { inviteId } = request.params
      const { name, password, phone } = request.body

      const invite = await prisma.invite.findUnique({
        where: {
          id: inviteId,
        },
      })

      const currentDate: string = Date.now().toString()

      if (!invite) {
        throw new BadRequestError('Invite not found or expired.')
      }

      const passwordHash = await hash(password, 6)

      await prisma.$transaction([
        prisma.user.create({
          data: {
            email: invite.email,
            name,
            passwordHash,
            phone,
            member_on: {
              create: {
                agencyId: invite.agencyId,
                role: invite.role,
              },
            },
          },
        }),

        prisma.invite.delete({
          where: {
            id: invite.id,
          },
        }),
      ])

      return reply.status(201).send()
    }
  )
}
