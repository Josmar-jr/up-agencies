import { z } from 'zod'

import { agencySchema } from '../models/agency'

export const agencySubject = z.tuple([
  z.union([
    z.literal('manage'),
    z.literal('update'),
    z.literal('delete'),
    z.literal('transfer_ownership'),
  ]),
  z.union([z.literal('Agency'), agencySchema]),
])

export type AgencySubject = z.infer<typeof agencySubject>
