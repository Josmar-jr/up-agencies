import { STATUS } from '@/app/dashboard/quotes/quotes-board/types'
import { api } from '../api-client'

export interface Quote {
  id: string
  title: string
  content: string | null
  status: STATUS
  salesChannel: string | null
  order: number
  priceInCents: number
  totalValue: number
  author: {
    id: string
    name: string
    avatarUrl: string | null
    email: string
  }
  client: {
    id: string
    name: string
  } | null
  assignees: {
    id: string
    name: string
    avatarUrl: string | null
    email: string
  }[]
  createdAt: Date
  updatedAt: Date
}

export interface QuotesResponse {
  quotes: Quote[]
}

export type QuotesOrderBy = 'status' | 'createdAt' | 'assignees' | 'title'

export interface GetManyQuotesParams {
  orderBy?: QuotesOrderBy
  sortOrder?: 'asc' | 'desc'
}

export async function getManyQuotes({
  orderBy,
  sortOrder,
}: GetManyQuotesParams) {
  const result = await api
    .get('quotes', {
      ...(orderBy &&
        sortOrder && {
          searchParams: {
            orderBy,
            sortOrder,
          },
        }),
      next: {
        tags: [`${orderBy}/quotes`],
      },
    })
    .json<QuotesResponse>()

  return result
}
