'use server'

import { moveQuote } from '@/http/quotes/move-quote'
import { revalidateTag } from 'next/cache'

interface MoveQuoteRequest {
  quoteId: string
  newStatus: string
  newOrder: number
}

export async function moveQuoteAction({
  newOrder,
  newStatus,
  quoteId,
}: MoveQuoteRequest) {
  try {
    await moveQuote({
      newOrder,
      newStatus,
      quoteId,
    })

    revalidateTag('quotes')
  } catch (err) {}
}
