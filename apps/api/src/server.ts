import { defineAbilityFor } from '@up-agencies/auth'

const ability = defineAbilityFor({ role: 'MEMBER', id: 'user-id' })

const userCanInviteSomeoneElese = ability.can('invite', 'User')
const userCanDeleteOtherUsers = ability.can('delete', 'User')

console.log(ability.can('get', 'Invite'))
console.log(ability.can('create', 'Invite'))
console.log(ability.can('delete', 'Agency'))