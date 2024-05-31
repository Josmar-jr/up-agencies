import { roleSchema } from '@up-agencies/auth'
import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { auth } from '@/http/middlewares/auth'
import { BadRequestError } from '@/http/routes/_errors/bad-request-error'
import { UnauthorizedError } from '@/http/routes/_errors/unauthorized-error'
import { prisma } from '@/lib/prisma'
import { getUserPermissions } from '@/utils/get-user-permissions'
import { env } from '@up-agencies/env'
import { resend } from '@/mail/client'

export async function sendInvites(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .post(
      '/agencies/invites',
      {
        schema: {
          tags: ['Invites'],
          summary: 'Create new invites',
          security: [{ bearerAuth: [] }],
          body: z.object({
            emails: z.array(z.string().email()),
            role: roleSchema,
          }),
          response: {
            201: z.object({
              invites: z.array(
                z.object({
                  inviteId: z.string().uuid(),
                  email: z.string().email(),
                })
              ),
            }),
          },
        },
      },
      async (request, reply) => {
        const userId = await request.getCurrentUserId()
        const { agency, membership } = await request.getUserMembership()

        const { cannot } = getUserPermissions(userId, membership.role)

        if (cannot('create', 'Invite')) {
          throw new UnauthorizedError(
            `You're not allowed to create new invites.`
          )
        }

        const { emails, role } = request.body

        const invites = []

        for (const email of emails) {
          const inviteWithSameEmail = await prisma.invite.findUnique({
            where: {
              email_agencyId: {
                email,
                agencyId: agency.id,
              },
            },
          })

          if (inviteWithSameEmail) {
            throw new BadRequestError(
              `Another invite with e-mail ${email} already exists.`
            )
          }

          const memberWithSameEmail = await prisma.member.findFirst({
            where: {
              agencyId: agency.id,
              user: {
                email,
              },
            },
          })

          if (memberWithSameEmail) {
            throw new BadRequestError(
              `A member with e-mail ${email} already belongs to your agency.`
            )
          }

          const invite = await prisma.invite.create({
            data: {
              agencyId: agency.id,
              email,
              role,
              authorId: userId,
            },
          })

          const inviteLink: URL = new URL('/sign-up', env.BASE_FRONT_URL)
          inviteLink.searchParams.set('email', invite.email)
          inviteLink.searchParams.set('invite', invite.id)
          inviteLink.searchParams.set('redirect', JSON.stringify(true))

          resend.emails.send({
            from: 'onboarding@resend.dev',
            to: email,
            subject: 'Seu convite',
            html: `<a href="${inviteLink}">Aceitar convite</a>`,
          })

          invites.push({ inviteId: invite.id, email })
        }

        return reply.status(201).send({ invites })
      }
    )
}
