import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'

import { auth } from '@/http/middlewares/auth'
import { prisma } from '@/lib/prisma'
import { createQuoteParamsSchema } from '@/http/schemas/quotes/request'
import { UnauthorizedError } from '../_errors/unauthorized-error'
import { getUserPermissions } from '@/utils/get-user-permissions'

export async function createQuote(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .post(
      '/quote',
      {
        schema: {
          tags: ['Quotes'],
          summary: 'Create a new quote',
          security: [{ bearerAuth: [] }],
          body: createQuoteParamsSchema,
        },
      },
      async (request, reply) => {
        const userId = await request.getCurrentUserId()
        const { agency, membership } = await request.getUserMembership()
        const { title, content, assignees, clientId, status } = request.body

        const userIsAMemberOfAgency = await prisma.member.findFirst({
          where: {
            userId,
            agencyId: agency.id,
          },
        })

        if (!userIsAMemberOfAgency) {
          throw new UnauthorizedError('Youre not a member of the agency')
        }

        const { cannot } = getUserPermissions(userId, membership.role)

        if (cannot('create', 'Quote')) {
          throw new UnauthorizedError("You're not allowed to create.")
        }

        const validAssignees = await prisma.member.findMany({
          where: {
            id: {
              in: assignees,
            },
          },
        })

        if (validAssignees.length !== assignees?.length) {
          return reply.status(400).send({
            message: 'Some assignees are invalid.',
          })
        }

        // Iniciar uma transação para garantir consistência
        await prisma.$transaction(async (tx) => {
          // Buscar a posição correta para o novo quote
          const lastQuoteWithStatus = await tx.quote.findFirst({
            where: {
              status,
              agencyId: agency.id,
            },
            orderBy: {
              order: 'desc',
            },
          })

          // Definir o novo valor de `order`
          const newOrder = lastQuoteWithStatus
            ? lastQuoteWithStatus.order + 1
            : 1

          // Incrementar a ordem dos quotes subsequentes, se necessário
          await tx.quote.updateMany({
            where: {
              agencyId: agency.id,
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

          // Criar o novo quote
          const createdQuote = await tx.quote.create({
            data: {
              title,
              content,
              clientId,
              authorId: userId,
              agencyId: agency.id,
              status,
              order: newOrder,
              assignees: {
                connect: assignees.map((assigneeId) => ({
                  id: assigneeId,
                })),
              },
            },
          })

          return reply.status(201).send(createdQuote)
        })
      }
    )
}
