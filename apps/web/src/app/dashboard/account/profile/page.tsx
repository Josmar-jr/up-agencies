'use client'
import { Card, CardContent } from '@/components/ui/card'

import BasicData from './components/basic-data'
import { getProfile } from '@/http/auth/get-profile'

export default async function Account() {
  const { user } = await getProfile()

  return (
    <Card className="max-w-[760px]">
      <CardContent className="p-6">
        <BasicData user={user} />
      </CardContent>
    </Card>
  )
}
