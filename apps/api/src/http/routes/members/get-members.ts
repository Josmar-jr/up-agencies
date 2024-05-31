import { roleSchema } from '@up-agencies/auth'
import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { auth } from '@/http/middlewares/auth'
import { UnauthorizedError } from '@/http/routes/_errors/unauthorized-error'
import { prisma } from '@/lib/prisma'
import { getUserPermissions } from '@/utils/get-user-permissions'

export async function getMembers(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .get(
      '/agency/members',
      {
        schema: {
          tags: ['Members'],
          summary: 'Get all agency members',
          security: [{ bearerAuth: [] }],
          querystring: z.object({
            search: z.string().optional(),
            page: z.coerce.number().int().min(1).default(1),
            pageSize: z.number().int().min(1).max(100).default(10),
          }),
          response: {
            200: z.object({
              members: z.array(
                z.object({
                  id: z.string().uuid(),
                  userId: z.string().uuid(),
                  role: roleSchema,
                  name: z.string().nullable(),
                  email: z.string().email(),
                  avatarUrl: z.string().url().nullable(),
                })
              ),
              pagination: z.object({
                currentPage: z.number(),
                pageSize: z.number(),
                pageCount: z.number(),
                totalCount: z.number(),
              }),
            }),
          },
        },
      },
      async (request, reply) => {
        const userId = await request.getCurrentUserId()
        const { agency, membership } = await request.getUserMembership()

        const { search, page, pageSize } = request.query

        const { cannot } = getUserPermissions(userId, membership.role)

        if (cannot('get', 'User')) {
          throw new UnauthorizedError(
            `You're not allowed to see organization members.`
          )
        }

        const skip = (page - 1) * pageSize

        const totalCount = await prisma.member.count({
          where: {
            agencyId: agency.id,
            user: {
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
              ],
            },
          },
        })

        const totalPages = Math.ceil(totalCount / pageSize)

        const members = await prisma.member.findMany({
          select: {
            id: true,
            role: true,
            user: {
              select: {
                id: true,
                name: true,
                email: true,
                avatarUrl: true,
              },
            },
          },
          where: {
            agencyId: agency.id,
            user: {
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
              ],
            },
          },
          orderBy: {
            role: 'asc',
          },
          skip: skip,
          take: pageSize,
        })

        const membersWithRoles = members.map(
          ({ user: { id: userId, ...user }, ...member }) => {
            return {
              ...user,
              ...member,
              userId,
            }
          }
        )

        return reply.send({
          members: membersWithRoles,
          pagination: {
            currentPage: page,
            totalCount,
            pageSize,
            pageCount: totalPages,
          },
        })
      }
    )
}
