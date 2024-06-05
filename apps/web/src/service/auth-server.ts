'use server'

import { cache } from 'react'
import { fetchApi } from './api-server'
import type { User } from './schema/user'

export const getMe = cache(async () => {
  return await fetchApi<User>('/me', {
    cache: 'force-cache',
  })
})
