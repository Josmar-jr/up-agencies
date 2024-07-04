import z from 'zod'

export const personSchema = z.object({
  id: z.string().uuid(),
  author: z.object({
    id: z.string().uuid(),
    name: z.string(),
    email: z.string(),
    avatarUrl: z.string().nullable(),
  }),
  name: z.string(),
  personType: z.array(z.string()),
  birthday: z.date().nullable(),
  gender: z.enum(['MALE', 'FEMALE']).nullable(),
  ticketQuoteCount: z.number().int(),
  ticketQuoteApproved: z.number().int(),
  document: z.string().nullable(),
  phone: z.string().nullable(),
  email: z.string().email().nullable(),
  generalRegistration: z
    .object({
      identify: z.string(),
      issuingBody: z.string(),
    })
    .nullable(),
  passport: z
    .object({
      identify: z.string(),
      issuedAt: z.date(),
      expiresIn: z.date(),
    })
    .nullable(),
  visa: z
    .object({
      identify: z.string(),
      expiresIn: z.date(),
    })
    .nullable(),
  observation: z.string().nullable(),
  rate: z.number().nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export const personResponseSchema = z.object({
  person: personSchema,
})

export const peopleResponseSchema = z.object({
  people: z.array(personSchema),
  meta: z.object({
    currentPage: z.number().int().positive().nullable(),
    pages: z.number().int().positive().nullable(),
    totalCount: z.number().int().positive(),
  }),
})
