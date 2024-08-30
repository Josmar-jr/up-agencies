import { auth } from '@/http/middlewares/auth'
import { UnauthorizedError } from '@/http/routes/_errors/unauthorized-error'
import { prisma } from '@/lib/prisma'
import { getUserPermissions } from '@/utils/get-user-permissions'
import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'
import { BadRequestError } from '../_errors/bad-request-error'
import { personResponseSchema } from '@/http/schemas/people/response'
import { personMapper } from '@/http/mappers/people-mapper'

export async function getPersonById(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .get(
      '/people/:personId',
      {
        schema: {
          tags: ['People'],
          summary: 'Get person by ID',
          security: [{ bearerAuth: [] }],
          params: z.object({
            personId: z.string(),
          }),
          response: {
            200: personResponseSchema,
          },
        },
      },
      async (request) => {
        const userId = await request.getCurrentUserId()
        const { agency, membership } = await request.getUserMembership()
        const { personId } = request.params

        const { cannot } = getUserPermissions(userId, membership.role)

        if (cannot('get', 'People')) {
          throw new UnauthorizedError(`You're not allowed to see this person.`)
        }

        const person = await prisma.person.findUnique({
          where: {
            id: personId,
            agencyId: agency.id,
          },
          select: {
            id: true,
            name: true,
            personType: true,
            birthday: true,
            gender: true,
            ticketQuoteCount: true,
            ticketQuoteApproved: true,
            document: true,
            phone: true,
            email: true,
            generalRegistration: true,
            generalRegistrationIssuingBody: true,
            passport: true,
            passportIssuedAt: true,
            passportExpiresIn: true,
            visa: true,
            visaExpiresIn: true,
            observation: true,
            rate: true,
            createdAt: true,
            updatedAt: true,
            address: true,
            author: {
              select: {
                id: true,
                email: true,
                name: true,
                avatarUrl: true,
              },
            },
          },
        })

        if (!person) {
          throw new BadRequestError('Person not found.')
        }

        return { person: personMapper(person) }
      }
    )
}
