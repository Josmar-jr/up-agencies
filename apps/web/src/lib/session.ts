import 'server-only'
import { jwtVerify } from 'jose'
import { env } from '@up-agencies/env'

const secretKey = env.JWT_SECRET
const encodedKey = new TextEncoder().encode(secretKey)

export async function decrypt(session: string | undefined = '') {
  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ['HS256'],
    })
    return payload
  } catch (_: any) {
    console.error('Failed to verify session')
  }
}
