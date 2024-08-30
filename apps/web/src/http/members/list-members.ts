import { SearchParamsOption } from 'ky'
import { api } from '../api-client'
import { PersonType } from '@/utils/constants'

export interface GetManyMembersResponse {
  members: {
    id: string
    email: string
    name: string
    userId: string
    role: 'ADMIN' | 'MEMBER' | 'BILLING'
    avatarURL: string
  }[]
  pagination: {
    currentPage: number
    pageSize: number
    pageCount: number
    totalCount: number
  }
}

interface GetManyMembersParams {
  page: number
  pageSize: number
  search: string
}

export async function getManyMembers(
  params: SearchParamsOption = {
    page: 1,
    pageSize: 100,
    search: 'gmail',
  }
) {
  const result = await api
    .get('agency/members', {
      searchParams: params,
    })
    .json<GetManyMembersResponse>()

  return result
}
