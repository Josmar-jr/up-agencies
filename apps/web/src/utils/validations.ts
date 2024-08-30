import { isValidPhoneNumber } from 'react-phone-number-input'
import { z } from 'zod'
import { validateCEP } from './helpers'

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
    .optional()
    .refine(
      (value) => {
        if (value) {
          return validateCEP(value)
        }
        return true
      },
      { message: 'CEP inválido' }
    ),
  zipCodeHash: z.string().optional(),
})

export const addressSchema = z.object({
  address: z
    .object({
      streetName: z.string().optional(),
      neighbourhood: z.string().optional(),
      number: z.string().optional(),
      complement: z.string().optional(),
      state: z.string().optional(),
      city: z.string().optional(),
    })
    .merge(zipCodeSchema)
    .refine(
      (value) => {
        // Verifica se o zipCode está preenchido

        if (value.zipCode) {
          // Se o zipCode está preenchido, verifica se os campos de endereço estão preenchidos
          return (
            Boolean(value.streetName) &&
            Boolean(value.neighbourhood) &&
            Boolean(value.number) &&
            Boolean(value.state) &&
            Boolean(value.city)
          )
        }
        // Se o zipCode não está preenchido, o endereço é considerado válido
        return true
      },
      {
        message: 'Campos de endereço obrigatórios se o CEP estiver preenchido',
      }
    )
    .optional(),
})

// export const addressOptionalSchema = z.object({
//   address: z
//     .object({
//       streetName: z.string(),
//       neighbourhood: z.string(),
//       number: z.string(),
//       complement: z.string().optional(),
//       state: z.string().optional(),
//       city: z.string().optional(),
//     })
//     .merge(zipCodeSchema)
//     .refine(
//       (value) => {
//         if (value.zipCode?.length < 9) {
//           return true
//         }

//         return Boolean(value.zipCodeHash)
//       },
//       {
//         message: 'CEP inválido',
//         path: ['zipCode'],
//       }
//     )
//     .optional(),
// })
