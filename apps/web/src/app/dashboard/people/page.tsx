'use server'

import { Info } from 'lucide-react'
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from '@/components/ui/tooltip'

import { getManyPeople } from '@/http/people/list-people'

import { ListPeopleTable } from './list-people-table'

interface PageProps {
  params: { [key: string]: string | string[] | undefined }
  searchParams?: { [key: string]: string | string[] | undefined }
}

export default async function People({
  searchParams,
}: {
  searchParams: { search?: string }
}) {
  const search = searchParams.search ?? ''

  const { people } = await getManyPeople({
    search,
  })

  return (
    <div className="min-h-screen w-full bg-white">
      <header className="flex h-[49px] w-full items-center border-b px-4">
        <div className="flex items-center gap-1.5">
          <h1 className="text-lg font-medium">Pessoas</h1>
          <Tooltip>
            <TooltipTrigger className="mt-0.5 text-muted-foreground *:size-3">
              <Info />
            </TooltipTrigger>
            <TooltipContent side="right">Pessoas</TooltipContent>
          </Tooltip>
        </div>
      </header>

      <ListPeopleTable people={people} />
    </div>
  )
}
