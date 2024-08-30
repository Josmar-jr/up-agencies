'use client'

import { GetManyPeopleResponse } from '@/http/people/list-people'
import { Loader2 } from 'lucide-react'
import { Suspense } from 'react'
import { DataTable } from './data-table'
import { Empty } from './empty'
import { columns } from './columns'
import { useSearchParams } from 'next/navigation'

export function ListPeopleTable({ people }: { people: any }) {
  const searchParams = useSearchParams()
  const search = searchParams.get('search')

  if (people.length === 0 && search === '') {
    return (
      <div className="h-[calc(100vh-49px)] p-6">
        <Empty />
      </div>
    )
  }

  return (
    <Suspense
      fallback={
        <div className="flex h-[300px] w-full items-center justify-center">
          <Loader2 className="animate-spin" />
        </div>
      }
    >
      <DataTable data={people} columns={columns} />
    </Suspense>
  )
}
