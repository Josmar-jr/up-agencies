import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'
import { UnauthorizedError } from '../_errors/unauthorized-error'
import { prisma } from '@/lib/prisma'
import dayjs from 'dayjs'
import { env } from '@up-agencies/env'
import { hash } from 'bcryptjs'

export async function updatePassword(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/password/update-password',
    {
      schema: {
        tags: ['Auth'],
        description: 'Update password',
        body: z
          .object({
            code: z.string(),
            password: z.string(),
            confirmPassword: z.string(),
          })
          .refine((data) => data.password === data.confirmPassword, {
            message: 'Passwords do not match',
            path: ['confirmPassword'],
          }),
      },
    },
    async (request, reply) => {
      const { code, password, confirmPassword } = request.body

      const tokenRegister = await prisma.token.findUnique({
        where: {
          id: code,
        },
      })

      if (!tokenRegister) {
        throw new UnauthorizedError('Password reset code not found')
      }

      const currentDate: string = Date.now().toString()

      const passwordExpirationTime = Number(
        env.FORGOT_PASSWORD_EXPIRATION_TIME_IN_MINUTE
      )

      const codeExpired: boolean =
        dayjs(currentDate).diff(tokenRegister.createdAt, 'minute') >=
        passwordExpirationTime

      if (codeExpired) {
        throw new UnauthorizedError('Expired password reset code.')
      }

      const passwordHash = await hash(password, 6)

      await prisma.user.update({
        data: {
          passwordHash,
        },
        where: {
          id: tokenRegister.userId,
        },
      })

      await prisma.token.delete({
        where: {
          id: tokenRegister.id,
        },
      })

      return reply.status(201).send()
    }
  )
}
