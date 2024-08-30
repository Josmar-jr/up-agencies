import { z } from 'zod'

import { quoteSchema } from '../models/quote'

export const quoteSubject = z.tuple([
  z.union([
    z.literal('manage'),
    z.literal('get'),
    z.literal('create'),
    z.literal('update'),
    z.literal('delete'),
  ]),
  z.union([z.literal('Quote'), quoteSchema]),
])

export type QuoteSubject = z.infer<typeof quoteSubject>
