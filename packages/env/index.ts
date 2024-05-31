import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

export const env = createEnv({
  server: {
    SERVER_PORT: z.coerce.number().default(3333),
    DATABASE_URL: z.string().url(),
    JWT_SECRET: z.string(),
    BASE_FRONT_URL: z.string().url(),
    RESEND_API_KEY: z.string(),
    FORGOT_PASSWORD_EXPIRATION_TIME_IN_MINUTE: z.string(),
  },
  client: {},
  shared: {},
  runtimeEnv: {
    SERVER_PORT: process.env.SERVER_PORT,
    DATABASE_URL: process.env.DATABASE_URL,
    JWT_SECRET: process.env.JWT_SECRET,
    BASE_FRONT_URL: process.env.BASE_FRONT_URL,
    RESEND_API_KEY: process.env.RESEND_API_KEY,
    FORGOT_PASSWORD_EXPIRATION_TIME_IN_MINUTE:
      process.env.FORGOT_PASSWORD_EXPIRATION_TIME_IN_MINUTE,
  },
  emptyStringAsUndefined: true,
})
