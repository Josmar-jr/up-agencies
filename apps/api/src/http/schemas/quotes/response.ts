import z from 'zod'

export const quotesResponseSchema = z.object({
  quotes: z.array(
    z.object({
      id: z.string().uuid(),
      title: z.string(),
      content: z.string().nullable(),
      status: z.enum([
        'AWAITING',
        'QUOTING',
        'AWAITING_CLIENT',
        'APPROVED',
        'REJECTED',
      ]),
      salesChannel: z.string().nullable(),
      priceInCents: z.number(),
      totalValue: z.number(),
      author: z.object({
        id: z.string().uuid(),
        name: z.string(),
        avatarUrl: z.string().nullable(),
        email: z.string(),
      }),
      client: z
        .object({
          id: z.string(),
          name: z.string(),
        })
        .nullable(),
      assignees: z.array(
        z.object({
          id: z.string().uuid(),
          name: z.string(),
          avatarUrl: z.string().nullable(),
          email: z.string(),
        })
      ),
      createdAt: z.date(),
      updatedAt: z.date(),
    })
  ),
})
