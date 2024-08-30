import { z } from 'zod'

import { peopleSchema } from '../models/people'

export const peopleSubject = z.tuple([
  z.union([
    z.literal('manage'),
    z.literal('get'),
    z.literal('create'),
    z.literal('update'),
    z.literal('delete'),
  ]),
  z.union([z.literal('People'), peopleSchema]),
])

export type PeopleSubject = z.infer<typeof peopleSubject>
