import { createPerson } from '@/service/people'
import { PersonType } from '@/utils/constants'
import {
  validateCPForCNPJ,
  validatePassport,
  validateRG,
} from '@/utils/helpers'
import { addressSchema, fullname } from '@/utils/validations'
import { HTTPError } from 'ky'
import { isValidPhoneNumber } from 'react-phone-number-input'
import { z } from 'zod'

const optionalTextInput = (schema: z.ZodString) =>
  z
    .union([z.string(), z.undefined()])
    .refine((val) => !val || schema.safeParse(val).success, {
      message: 'E-mail inválido',
    })

const personalSchema = z.object({
  fullname,
  email: optionalTextInput(
    z.string().email({
      message: 'E-mail inválido',
    })
  ),
  phone: z
    .string()
    .refine(isValidPhoneNumber, { message: 'Número de celular inválido' })
    .optional(),
  birthday: z.date().optional(),
  gender: z.string().optional(),
  typePerson: z
    .array(
      z.object({
        label: z.string(),
        value: z.string(),
      }),
      {
        message: 'Campo obrigatório',
      }
    )
    .min(1, {
      message: 'O campo deve conter pelo menos 1 tipo(s)',
    }),
})

const documentSchema = z
  .object({
    CPForCNPJ: z
      .string()
      .refine((value) => validateCPForCNPJ(value), {
        message: 'CPF ou CNPJ inválido',
      })
      .optional(),
    RG: z
      .string()
      .refine((value) => validateRG(value), {
        message: 'RG inválido',
      })
      .optional(),
    issuingBodyRG: z.string().optional(),
    passport: z
      .string()
      .refine((value) => validatePassport(value), {
        message: 'Passaporte inválido',
      })
      .optional(),
    passportIssuedAt: z.date().optional(),
    passportExpiresAt: z.date().optional(),
    visa: z.string().optional(),
    visaValidAt: z.date().optional(),
  })
  .optional()

const annotationSchema = z
  .object({
    description: z.string().optional(),
  })
  .optional()

export const personSchema = z
  .object({
    personal: personalSchema,
    document: documentSchema,
    annotation: annotationSchema,
  })
  .merge(addressSchema)

export async function createPersonAction(data: FormData) {
  const result = personSchema.safeParse(Object.fromEntries(data))

  if (!result.success) {
    const errors = result.error.flatten().fieldErrors

    return { success: false, message: null, errors }
  }

  try {
    await createPerson({
      name: result.data.personal.fullname,
      personType: result.data.personal.typePerson.map(
        ({ value }) => value
      ) as PersonType[],
      birthday: result.data.personal.birthday,
      email: result.data.personal.email,
      gender: result.data.personal.gender,
      phone: result.data.personal.phone,
      document: result.data.document?.CPForCNPJ,
      generalRegistration:
        result.data.document?.RG && result.data.document?.issuingBodyRG
          ? {
              identify: result.data.document?.RG,
              issuingBody: result.data.document?.issuingBodyRG,
            }
          : undefined,
      passport:
        result.data.document?.passport &&
        result.data.document.passportIssuedAt &&
        result.data.document.passportExpiresAt
          ? {
              identify: result.data.document.passport,
              issuedAt: result.data.document.passportIssuedAt,
              expiresIn: result.data.document.passportExpiresAt,
            }
          : undefined,
      visa:
        result.data.document?.visa && result.data.document?.visaValidAt
          ? {
              identify: result.data.document.visa,
              expiresIn: result.data.document.visaValidAt,
            }
          : undefined,
      observation: result.data.annotation?.description,
    })
  } catch (err) {
    if (err instanceof HTTPError) {
      const { message } = await err.response.json()

      return { success: false, message, errors: null }
    }

    console.error(err)

    return {
      success: false,
      message: 'Unexpected error, try again in a few minutes.',
      errors: null,
    }
  }

  return {
    success: true,
    message: 'Successfully saved the organization.',
    errors: null,
  }
}
