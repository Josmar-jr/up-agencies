import { api } from '../api-client'

interface DeletePeopleRequest {
  ids: string[]
}

export async function deletePeople(body?: DeletePeopleRequest) {
  const result = await api
    .delete('people', {
      json: body,
    })
    .json()

  return result
}
