import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'

import { auth } from '@/http/middlewares/auth'
import { UnauthorizedError } from '@/http/routes/_errors/unauthorized-error'
import { prisma } from '@/lib/prisma'
import { getUserPermissions } from '@/utils/get-user-permissions'
import { peopleResponseSchema } from '@/http/schemas/people/response'
import { peopleMapper } from '@/http/mappers/people-mapper'
import { personQueryParamsSchema } from '@/http/schemas/people/request'

export async function listPeople(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .get(
      '/people',
      {
        schema: {
          tags: ['Invites'],
          summary: 'Get list people',
          security: [{ bearerAuth: [] }],
          querystring: personQueryParamsSchema,
          response: {
            200: peopleResponseSchema,
          },
        },
      },
      async (request) => {
        const { page, pageSize, search } = request.query

        const userId = await request.getCurrentUserId()
        const { agency, membership } = await request.getUserMembership()

        const { cannot } = getUserPermissions(userId, membership.role)

        if (cannot('get', 'People')) {
          throw new UnauthorizedError(`You're not allowed to get list people.`)
        }

        const totalCount = await prisma.person.count({
          where: {
            agencyId: agency.id,
          },
        })

        let skip = undefined
        let totalPages = undefined

        if (page && pageSize) {
          skip = (page - 1) * pageSize
          totalPages = Math.ceil(totalCount / pageSize)
        }

        const people = await prisma.person.findMany({
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
          ...(pageSize && { take: pageSize }),
          ...(page && { skip }),
          ...(search && {
            where: {
              OR: [
                {
                  name: {
                    contains: search,
                    mode: 'insensitive',
                  },
                },
                {
                  email: {
                    contains: search,
                    mode: 'insensitive',
                  },
                },
                {
                  phone: {
                    contains: search,
                    mode: 'insensitive',
                  },
                },
              ],
            },
          }),
          orderBy: {
            createdAt: 'desc',
          },
        })

        const meta = {
          currentPage: page ?? null,
          pages: totalPages ?? null,
          totalCount,
        }

        return { people: peopleMapper(people), meta }
      }
    )
}
