import { z } from 'zod'

export const quoteSchema = z.object({
  __typename: z.literal('Quote').default('Quote'),
  id: z.string(),
  ownerId: z.string(),
})

export type Quote = z.infer<typeof quoteSchema>
