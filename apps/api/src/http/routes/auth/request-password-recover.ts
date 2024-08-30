import { prisma } from '@/lib/prisma'
import { resend } from '@/mail/client'
import { env } from '@up-agencies/env'
import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

export async function requestPasswordRecover(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/password/recover',
    {
      schema: {
        tags: ['Auth'],
        summary: 'Reset password lost by user',
        body: z.object({
          email: z.string().email(),
        }),
        response: {
          201: z.null(),
        },
      },
    },
    async (request, reply) => {
      const { email } = request.body

      const userFromEmail = await prisma.user.findUnique({
        where: {
          email,
        },
      })

      if (!userFromEmail) {
        // We don't want to people to know if the user really exists
        return reply.status(201).send()
      }

      const { id: code } = await prisma.token.create({
        data: {
          type: 'PASSWORD_RECOVER',
          userId: userFromEmail.id,
        },
      })

      const authLink: URL = new URL('/forgot', env.BASE_FRONT_URL)
      authLink.searchParams.set('code', code)
      authLink.searchParams.set('redirect', JSON.stringify(true))

      resend.emails.send({
        from: 'onboarding@resend.dev',
        to: email,
        subject: 'Redefinição de senha.',
        html: `<a href="${authLink}">Clique aqui para redefinir sua senha.</a>`,
      })

      // Send e-mail with password recover link
      return reply.status(201).send()
    }
  )
}
