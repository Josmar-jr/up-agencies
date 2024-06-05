import { fullname } from "@/utils/validations";
import { isValidPhoneNumber } from "react-phone-number-input";
import { z } from "zod";

const optionalTextInput = (schema: z.ZodString) =>
  z
    .union([z.string(), z.undefined()])
    .refine((val) => !val || schema.safeParse(val).success, {
      message: "E-mail inválido",
    });

const personalSchema = z.object({
  fullname,
  email: optionalTextInput(
    z.string().email({
      message: "E-mail inválido",
    })
  ),
  phone: z
    .string()
    .refine(isValidPhoneNumber, { message: "Número de celular inválido" })
    .optional(),
  birthday: z.date(),
  gender: z.string(),
  category: z.string(),
  address: z.string(),
  observation: z.string().optional(),
});

const documentSchema = z.object({
  passport: z.string().optional(),
  passportIssuedAt: z.date(),
  passportExpiresAt: z.date(),
});

export const schema = personalSchema.merge(documentSchema);

export type FormData = z.infer<typeof schema>;
