import { defineAbilityFor } from '@up-agencies/auth'

const ability = defineAbilityFor({ role: 'MEMBER' })

const userCanInviteSomeoneElese = ability.can('invite', 'User')
const userCanDeleteOtherUsers = ability.can('delete', 'User')

console.log(userCanInviteSomeoneElese)