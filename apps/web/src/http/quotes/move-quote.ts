import { revalidatePath } from 'next/cache'
import { api } from '../api-client'

interface MoveQuoteRequest {
  quoteId: string
  newStatus: string
  newOrder: number
}

export async function moveQuote(body: MoveQuoteRequest) {
  console.log({ body })
  const result = await api
    .put('quote/move', {
      json: body,
    })
    .json()

  return result
}
