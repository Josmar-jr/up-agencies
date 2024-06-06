import { isValidPhoneNumber } from 'react-phone-number-input'
import { z } from 'zod'
import { validateCEP } from './helpers'
import { formatterCEP } from './formatters'

// export const cnpjSchema = z.object({
//   cnpj: z
//     .string()
//     .trim()
//     .nonempty()
//     .refine((doc) => isValidCnpj(doc), {
//       message: "CNPJ inválido",
//     })
//     .transform((doc) => formatterCNPJ(doc)),
// });
// //

export const fullname = z
  .string({
    message: 'Campo obrigatório',
  })
  .refine(
    (value) => {
      return value.trim().split(/\s+/u).length >= 2
    },
    { message: 'Insira o nome completo' }
  )

export const phone = z
  .string({
    message: 'Celular é um campo obrigatório',
  })
  .refine(isValidPhoneNumber, { message: 'Número de celular inválido' })

export const zipCodeSchema = z.object({
  zipCode: z
    .string()
    .refine((value) => validateCEP(value), { message: 'CEP inválido' })
    .transform((value) => formatterCEP(value)),
  zipCodeHash: z.string().optional(),
})

export const addressSchema = z.object({
  address: z
    .object({
      streetName: z.string(),
      neighbourhood: z.string(),
      number: z.string(),
      complement: z.string().optional(),
      state: z.string().optional(),
      city: z.string().optional(),
    })
    .merge(zipCodeSchema)
    .refine((value) => Boolean(value.zipCodeHash), {
      message: 'CEP inválido',
      path: ['zipCode'],
    }),
})
