import { isValidPhoneNumber } from "react-phone-number-input";
import { z } from "zod";

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
    message: "Campo obrigatório",
  })
  .refine(
    (value) => {
      return value.trim().split(/\s+/u).length >= 2;
    },
    { message: "Insira o nome completo" },
  );

export const phone = z
  .string({
    message: "Celular é um campo obrigatório",
  })
  .refine(isValidPhoneNumber, { message: "Número de celular inválido" });
