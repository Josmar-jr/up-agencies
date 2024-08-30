import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { auth } from '@/http/middlewares/auth'
import { prisma } from '@/lib/prisma'
import { UnauthorizedError } from '../_errors/unauthorized-error'

const moveQuoteParamsSchema = z.object({
  quoteId: z.string(),
  newStatus: z.enum([
    'AWAITING',
    'QUOTING',
    'AWAITING_CLIENT',
    'APPROVED',
    'REJECTED',
  ]),
  newOrder: z.number(),
})

export async function moveQuote(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .put(
      '/quote/move',
      {
        schema: {
          tags: ['Quotes'],
          summary: 'Move a quote to a new status and order',
          security: [{ bearerAuth: [] }],
          body: moveQuoteParamsSchema,
        },
      },
      async (request, reply) => {
        const userId = await request.getCurrentUserId()
        const { agency } = await request.getUserMembership()
        const { quoteId, newStatus, newOrder } = request.body

        const quote = await prisma.quote.findUnique({
          where: { id: quoteId },
          include: { agency: true },
        })

        if (!quote || quote.agencyId !== agency.id) {
          throw new UnauthorizedError(
            'Quote not found or you do not have access to this quote'
          )
        }

        await prisma.$transaction(async (tx) => {
          if (quote.status === newStatus) {
            // Movendo dentro do mesmo status
            if (quote.order < newOrder) {
              // Movendo para baixo
              await tx.quote.updateMany({
                where: {
                  agencyId: agency.id,
                  status: quote.status,
                  order: {
                    gt: quote.order,
                    lte: newOrder,
                  },
                },
                data: {
                  order: {
                    decrement: 1,
                  },
                },
              })
            } else if (quote.order > newOrder) {
              // Movendo para cima
              await tx.quote.updateMany({
                where: {
                  agencyId: agency.id,
                  status: quote.status,
                  order: {
                    lt: quote.order,
                    gte: newOrder,
                  },
                },
                data: {
                  order: {
                    increment: 1,
                  },
                },
              })
            }
          } else {
            // Movendo para um status diferente
            await tx.quote.updateMany({
              where: {
                agencyId: agency.id,
                status: quote.status,
                order: {
                  gt: quote.order,
                },
              },
              data: {
                order: {
                  decrement: 1,
                },
              },
            })

            await tx.quote.updateMany({
              where: {
                agencyId: agency.id,
                status: newStatus,
                order: {
                  gte: newOrder,
                },
              },
              data: {
                order: {
                  increment: 1,
                },
              },
            })
          }

          // Atualizar a citação com o novo status e nova ordem
          await tx.quote.update({
            where: { id: quoteId },
            data: {
              status: newStatus,
              order: newOrder,
            },
          })
        })

        return reply.status(200).send()
      }
    )
}
