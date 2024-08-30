import { z } from 'zod'

export const agencySchema = z.object({
  __typename: z.literal('Agency').default('Agency'),
  id: z.string(),
  ownerId: z.string(),
})

export type Agency = z.infer<typeof agencySchema>
