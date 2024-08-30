import 'fastify'

import type { Member, Agency } from '@prisma/client'

declare module 'fastify' {
  export interface FastifyRequest {
    getCurrentUserId(): Promise<string>
    getUserMembership(
      slug?: string
    ): Promise<{ agency: Agency; membership: Member }>
  }
}
