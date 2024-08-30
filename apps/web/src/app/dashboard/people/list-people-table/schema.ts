import { z } from 'zod'

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const peopleSchema = z.object({
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

export type People = z.infer<typeof peopleSchema>
