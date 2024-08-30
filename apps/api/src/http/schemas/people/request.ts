import z from 'zod'

export const personQueryParamsSchema = z.object({
  search: z.string().optional(),
  page: z.coerce.number().int().min(1).optional(),
  pageSize: z.coerce.number().int().min(1).max(100).optional(),
})
