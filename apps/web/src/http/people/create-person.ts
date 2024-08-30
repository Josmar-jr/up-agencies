import { PersonType } from '@/utils/constants'
import { api } from '../api-client'

interface CreatePersonRequest {
  name: string
  personType: PersonType[]
  birthday?: Date
  gender?: string
  ticketQuoteCount?: number
  ticketQuoteApproved?: number
  document?: string
  phone?: string
  email?: string
  generalRegistration?: {
    identify: string
    issuingBody: string
  }
  passport?: {
    identify: string
    issuedAt: Date
    expiresIn: Date
  }
  visa?: {
    identify: string
    expiresIn: Date
  }
  observation?: string
  rate?: number
}

export type CreatePersonResponse = {
  people: {
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
  }
}

export async function createPerson(
  body: CreatePersonRequest
): Promise<CreatePersonResponse> {
  return await api
    .post('people', {
      json: body,
    })
    .json<CreatePersonResponse>()
}
