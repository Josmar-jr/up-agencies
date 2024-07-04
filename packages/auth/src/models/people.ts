import { z } from 'zod'

export const peopleSchema = z.object({
  __typename: z.literal('People').default('People'),
  id: z.string(),
  ownerId: z.string(),
})

export type People = z.infer<typeof peopleSchema>
