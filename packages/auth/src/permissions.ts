import { AbilityBuilder } from '@casl/ability'

import { AppAbility } from '.'
import { User } from './models/user'
import { Role } from './roles'

type PermissionsByRole = (
  user: User,
  builder: AbilityBuilder<AppAbility>,
) => void

export const permissions: Record<Role, PermissionsByRole> = {
  ADMIN(user, { can, cannot }) {
    can('manage', 'all')

    cannot(['transfer_ownership', 'update'], 'Agency')
    can(['transfer_ownership', 'update'], 'Agency', {
      ownerId: { $eq: user.id },
    })
  },
  MEMBER(_, { can }) {
    can('get', 'User')
  }
}