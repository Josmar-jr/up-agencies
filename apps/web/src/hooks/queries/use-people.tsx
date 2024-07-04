import { createPerson } from '@/http/people/create-person'
import { listPeople } from '@/service/people'
import { useMutation, useQuery } from '@tanstack/react-query'
import { toast } from 'sonner'

export function usePeople() {
  const peopleListQuery = useQuery({
    queryKey: ['GET_MANY_PEOPLE'],
    queryFn: listPeople,
  })

  const createANewPersonMutation = useMutation({
    mutationKey: ['CREATE_A_NEW_PERSON_MUTATION'],
    mutationFn: createPerson,
    onSuccess(data) {
      toast.success('Pessoa criada com sucesso')
    },
    onError() {
      toast.error('Erro ao criar a pessoa')
    },
  })

  return {
    createANewPersonMutation,
    peopleListQuery,
  }
}
