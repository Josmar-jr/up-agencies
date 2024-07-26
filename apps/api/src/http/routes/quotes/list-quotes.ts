import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'

import { auth } from '@/http/middlewares/auth'
import { prisma } from '@/lib/prisma'
import { quotesResponseSchema } from '@/http/schemas/quotes/response'

export async function listQuotes(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .get(
      '/quotes',
      {
        schema: {
          tags: ['Quotes'],
          summary: 'Get all quotes',
          security: [{ bearerAuth: [] }],
          response: {
            200: quotesResponseSchema,
          },
        },
      },
      async (request) => {
        const { agency } = await request.getUserMembership()

        const quotes = await prisma.quote.findMany({
          where: {
            agencyId: agency.id,
          },
          select: {
            id: true,
            title: true,
            content: true,
            status: true,
            totalValue: true,
            salesChannel: true,
            priceInCents: true,
            client: {
              select: {
                id: true,
                name: true,
              },
            },
            author: {
              select: {
                id: true,
                avatarUrl: true,
                name: true,
                email: true,
              },
            },
            assignees: {
              select: {
                id: true,
                user: {
                  select: {
                    avatarUrl: true,
                    email: true,
                    name: true,
                  },
                },
              },
            },
            createdAt: true,
            updatedAt: true,
          },
          orderBy: [
            {
              status: 'asc', // Ordena os status alfabeticamente por padrão
            },
            {
              order: 'asc', // Ordena pelo campo 'order' dentro de cada status
            },
          ],
        })

        const statusOrder = {
          AWAITING: 1,
          QUOTING: 2,
          AWAITING_CLIENT: 3,
          APPROVED: 4,
          REJECTED: 5,
        }

        const formattedQuotes = quotes
          .map((quote) => ({
            ...quote,
            assignees: quote.assignees.map((assignee) => ({
              id: assignee.id,
              name: assignee.user.name,
              email: assignee.user.email,
              avatarUrl: assignee.user.avatarUrl,
            })),
          }))
          .sort((a, b) => statusOrder[a.status] - statusOrder[b.status])

        return { quotes: formattedQuotes }
      }
    )
}
