import { roleSchema } from '@up-agencies/auth'
import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { auth } from '@/http/middlewares/auth'

import dayjs from 'dayjs'
import { prisma } from '@/lib/prisma'
import { BadRequestError } from '../_errors/bad-request-error'

export async function createPerson(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .post(
      '/people',
      {
        schema: {
          tags: ['People'],
          summary: 'Create a new person',
          security: [{ bearerAuth: [] }],
          body: z.object({
            name: z.string(),
            email: z.string().email().optional(),
            phone: z.string().optional(),
            birthday: z
              .string()
              .optional()
              .refine((val) => dayjs(val).isValid(), {
                message: 'Invalid date format for birthday',
              }),
            gender: z
              .union([z.literal('MALE'), z.literal('FEMALE')])
              .optional(),
            document: z.string().optional(),
            generalRegistration: z
              .object({
                identify: z.string(),
                issuingBody: z.string(),
              })
              .optional(),
            passport: z
              .object({
                identify: z.string(),
                issuedAt: z.string().refine((val) => dayjs(val).isValid(), {
                  message: 'Invalid date format for passport issuedAt',
                }),
                expiresIn: z.string().refine((val) => dayjs(val).isValid(), {
                  message: 'Invalid date format for passport expiresIn',
                }),
              })
              .optional()
              .superRefine((data, ctx) => {
                if (data?.issuedAt && data?.expiresIn) {
                  const issuedAt = dayjs(data.issuedAt)
                  const expiresIn = dayjs(data.expiresIn)
                  if (!expiresIn.isAfter(issuedAt)) {
                    ctx.addIssue({
                      code: z.ZodIssueCode.custom,
                      message:
                        'passport expiresIn must be after passport issuedAt',
                      path: ['passportExpiresIn'],
                    })
                  }
                }
              }),
            visa: z
              .object({
                identify: z.string(),
                expiresIn: z.string().refine((val) => dayjs(val).isValid(), {
                  message: 'Invalid date format for visa expiresIn',
                }),
              })
              .optional(),
            observation: z.string().optional(),
            rate: z.number().int().optional(),
          }),
          response: {
            201: z.object({
              person: z.object({
                id: z.string(),
                name: z.string(),
                email: z.string().nullable(),
                phone: z.string().nullable(),
                birthday: z.date().nullable(),
                gender: z
                  .union([z.literal('MALE'), z.literal('FEMALE')])
                  .nullable(),
                document: z.string().nullable(),
                generalRegistration: z.string().nullable(),
                generalRegistrationIssuingBody: z.string().nullable(),
                passport: z.string().nullable(),
                passportIssuedAt: z.date().nullable(),
                passportExpiresIn: z.date().nullable(),
                visa: z.string().nullable(),
                visaExpiresIn: z.date().nullable(),
                observation: z.string().nullable(),
                rate: z.number().nullable(),
                authorId: z.string(),
                createdAt: z.date(),
                updatedAt: z.date(),
              }),
            }),
          },
        },
      },
      async (request, reply) => {
        const userId = await request.getCurrentUserId()
        const { agency } = await request.getUserMembership()
        const {
          name,
          email,
          birthday,
          document,
          gender,
          generalRegistration,
          observation,
          passport,
          phone,
          rate,
          visa,
        } = request.body

        if (email) {
          const personWithSameEmail = await prisma.person.findUnique({
            where: {
              email_agencyId: {
                email,
                agencyId: agency.id,
              },
            },
          })

          if (personWithSameEmail) {
            throw new BadRequestError(
              'Person with this email already exists in the agency.'
            )
          }
        }

        const newPerson = await prisma.person.create({
          data: {
            name,
            email,
            birthday,
            document,
            gender,
            ...(generalRegistration && {
              generalRegistration: generalRegistration.identify,
              generalRegistrationIssuingBody: generalRegistration.issuingBody,
            }),
            observation,
            ...(passport && {
              passport: passport.identify,
              passportIssuedAt: passport.issuedAt,
              passportExpiresIn: passport.expiresIn,
            }),
            phone,
            rate,
            ...(visa && {
              visa: visa.identify,
              visaExpiresIn: visa.expiresIn,
            }),
            agencyId: agency.id,
            authorId: userId,
          },
        })

        const person = {
          ...newPerson,
          authorId: userId,
        }

        return reply.status(201).send({
          person,
        })
      }
    )
}
