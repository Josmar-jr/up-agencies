import {
  validateCPForCNPJ,
  validatePassport,
  validateRG,
} from '@/utils/helpers'
import { addressSchema, fullname } from '@/utils/validations'
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

export const schema = z
  .object({
    personal: personalSchema,
    document: documentSchema,
    annotation: annotationSchema,
  })
  .merge(addressSchema)

export type FormData = z.infer<typeof schema>
