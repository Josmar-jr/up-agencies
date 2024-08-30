import { SearchParamsOption } from 'ky'
import { api } from '../api-client'
import { PersonType } from '@/utils/constants'

export interface GetManyPeopleResponse {
  people: {
    id: string
    name: string
    personType: PersonType[]
    birthday: Date | null
    gender: string | null
    ticketQuoteCount: number | null
    ticketQuoteApproved: number | null
    document: string | null
    phone: string | null
    email: string | null
    generalRegistration: {
      identify: string
      issuingBody: string
    } | null
    passport: {
      identify: string
      issuedAt: Date
      expiresIn: Date
    } | null
    visa: {
      identify: string
      expiresIn: Date
    } | null
    observation: string | null
    rate: number | null
  }[]
  meta: {
    currentPage: number
    pages: number
    totalCount: number
  }
}

interface GetManyPeopleParams {
  page: number
  pageSize: number
  search: string
}

export async function getManyPeople(
  params: SearchParamsOption = {
    page: 1,
    pageSize: 100,
    search: '',
  }
) {
  const result = await api
    .get('people', {
      searchParams: params,
      next: {
        tags: ['GET_MANY_PEOPLE'],
      },
    })
    .json<GetManyPeopleResponse>()

  return result
}
