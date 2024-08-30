import { User } from '@/service/schema/user'
import { api } from '../api-client'

interface GetProfileResponse {
  user: User
}

export async function getProfile() {
  const result = await api.get('me').json<GetProfileResponse>()

  return result
}
