import { Card, CardContent } from '@/components/ui/card'

import BasicData from './components/basic-data'
import { cache } from 'react'
import { fetchApi } from '@/service/api-server'
import type { User } from '@/service/schema/user'

const getMe = cache(async () => {
  return await fetchApi<User>('/me', {
    cache: 'force-cache',
  })
})

export default async function Account() {
  const user = await getMe()

  return (
    <Card className="max-w-[760px]">
      <CardContent className="p-6">
        <BasicData user={user} />
      </CardContent>
    </Card>
  )
}
