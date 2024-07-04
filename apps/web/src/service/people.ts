import { apiProtected } from './api'

export enum PersonType {
  CLIENT = 'CLIENT',
  PASSENGER = 'PASSENGER',
  SUPPLIER = 'SUPPLIER',
  REPRESENTATIVE = 'REPRESENTATIVE',
}

interface Person {
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

export async function createPerson(body: Person) {
  const response = await apiProtected.post('/people', body)
  const data = await response.data

  return data
}

export async function listPeople() {
  const response = await apiProtected.get('/people')
  const data = await response.data

  return data
}
