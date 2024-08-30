import { Person as PersonPrisma } from '@prisma/client'
import { personSchema } from '../schemas/people/response'
import z from 'zod'

export type PersonRaw = Omit<
  PersonPrisma,
  'addressId' | 'authorId' | 'agencyId' | 'agency'
> & {
  author: {
    id: string
    name: string
    email: string
    avatarUrl: string | null
  }
}

type PersonMapper = z.infer<typeof personSchema>

export function personMapper(raw: PersonRaw): PersonMapper {
  return {
    id: raw.id,
    author: raw.author,
    name: raw.name,
    personType: raw.personType?.split(',')!,
    birthday: raw.birthday,
    gender: raw.gender,
    ticketQuoteCount: raw.ticketQuoteCount,
    ticketQuoteApproved: raw.ticketQuoteApproved,
    document: raw.document,
    email: raw.email,
    phone: raw.phone,
    generalRegistration:
      raw.generalRegistration && raw.generalRegistrationIssuingBody
        ? {
            identify: raw.generalRegistration,
            issuingBody: raw.generalRegistrationIssuingBody,
          }
        : null,
    passport:
      raw.passportIssuedAt && raw.passport && raw.passportExpiresIn
        ? {
            identify: raw.passport,
            issuedAt: raw.passportIssuedAt,
            expiresIn: raw.passportExpiresIn,
          }
        : null,
    visa:
      raw.visa && raw.visaExpiresIn
        ? {
            identify: raw.visa,
            expiresIn: raw.visaExpiresIn,
          }
        : null,
    observation: raw.observation,
    rate: raw.rate,
    createdAt: raw.createdAt,
    updatedAt: raw.updatedAt,
  }
}

export function peopleMapper(raw: PersonRaw[]) {
  return raw.map((person) => ({
    id: person.id,
    author: {
      id: person.author.id,
      name: person.author.name,
      email: person.author.email,
      avatarUrl: person.author?.avatarUrl,
    },
    name: person.name,
    personType: person.personType?.split(',')!,
    birthday: person.birthday,
    gender: person.gender,
    ticketQuoteCount: person.ticketQuoteCount,
    ticketQuoteApproved: person.ticketQuoteApproved,
    document: person.document,
    email: person.email,
    phone: person.phone,
    generalRegistration:
      person.generalRegistration && person.generalRegistrationIssuingBody
        ? {
            identify: person.generalRegistration,
            issuingBody: person.generalRegistrationIssuingBody,
          }
        : null,
    passport:
      person.passportIssuedAt && person.passport && person.passportExpiresIn
        ? {
            identify: person.passport,
            issuedAt: person.passportIssuedAt,
            expiresIn: person.passportExpiresIn,
          }
        : null,
    visa:
      person.visa && person.visaExpiresIn
        ? {
            identify: person.visa,
            expiresIn: person.visaExpiresIn,
          }
        : null,
    observation: person.observation,
    rate: person.rate,
    createdAt: person.createdAt,
    updatedAt: person.updatedAt,
  }))
}
