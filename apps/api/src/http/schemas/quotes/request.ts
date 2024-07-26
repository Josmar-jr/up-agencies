import z from 'zod'

export const createQuoteParamsSchema = z.object({
  title: z.string(),
  content: z.string().optional(),
  order: z.number().optional(),
  status: z
    .union([
      z.literal('AWAITING'),
      z.literal('QUOTING'),
      z.literal('AWAITING_CLIENT'),
      z.literal('APPROVED'),
      z.literal('REJECTED'),
    ])
    .default('AWAITING')
    .optional(),
  salesChannel: z.string().optional(),
  totalValue: z.number().min(0).optional(),
  clientId: z.string().uuid().optional(),
  assignees: z.array(z.string().uuid()).optional(),
})

export const moveQuoteParamsSchema = z.object({
  sourceQuoteId: z.string(),
  destinationQuoteId: z.string(),
  newStatus: z.enum([
    'AWAITING',
    'QUOTING',
    'AWAITING_CLIENT',
    'APPROVED',
    'REJECTED',
  ]),
})
