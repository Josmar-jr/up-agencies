import {
  AbilityBuilder,
  CreateAbility,
  createMongoAbility,
  MongoAbility,
} from '@casl/ability'
import { z } from 'zod'

import { User } from './models/user'
import { permissions } from './permissions'

import { inviteSubject } from './subjects/invite'
import { agencySubject } from './subjects/agency'
import { peopleSubject } from './subjects/people'
import { userSubject } from './subjects/user'
import { quoteSubject } from './subjects/quote'

export * from './models/agency'
export * from './models/people'
export * from './models/user'
export * from './roles'

const appAbilitiesSchema = z.union([
  peopleSubject,
  userSubject,
  agencySubject,
  inviteSubject,
  quoteSubject,
  z.tuple([z.literal('manage'), z.literal('all')]),
])

type AppAbilities = z.infer<typeof appAbilitiesSchema>

export type AppAbility = MongoAbility<AppAbilities>
export const createAppAbility = createMongoAbility as CreateAbility<AppAbility>

export function defineAbilityFor(user: User) {
  const builder = new AbilityBuilder(createAppAbility)

  if (typeof permissions[user.role] !== 'function') {
    throw new Error(`Permissions for role ${user.role} not found.`)
  }

  permissions[user.role](user, builder)

  const ability = builder.build({
    detectSubjectType(subject) {
      return subject.__typename
    },
  })

  ability.can = ability.can.bind(ability)
  ability.cannot = ability.cannot.bind(ability)

  return ability
}
