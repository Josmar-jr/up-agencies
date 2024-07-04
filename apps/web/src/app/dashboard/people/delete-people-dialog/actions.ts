'use server'

import { HTTPError } from 'ky'

import { deletePeople } from '@/http/people/delete-people'
import { revalidatePath } from 'next/cache'

export async function deletePeoplePermanently(ids: string[]) {
  try {
    await deletePeople({ ids })

    revalidatePath('/dashboard/people')
  } catch (err) {
    if (err instanceof HTTPError) {
      const { message } = await err.response.json()

      return { success: false, message, errors: null }
    }

    console.error(err)

    return {
      success: false,
      message: 'Unexpected error, try again in a few minutes.',
      errors: null,
    }
  }

  return { success: true, message: null, errors: null }
}
