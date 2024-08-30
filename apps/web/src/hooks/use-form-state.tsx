import { FormEvent, useState, useTransition } from 'react'

interface FormState {
  success: boolean
  message: string | null
  errors: Record<string, string[]> | null
}

interface UseFormStateParams {
  action: (data: FormData) => Promise<FormState>
  onSuccess?: () => Promise<void> | void
  onError?: () => Promise<void> | void
  initialState?: FormState
}

export function useFormState({
  action,
  onSuccess,
  onError,
  initialState,
}: UseFormStateParams) {
  const [isPending, startTransition] = useTransition()

  const [formState, setFormState] = useState(
    initialState ?? { success: false, message: null, errors: null }
  )

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const form = event.currentTarget
    const data = new FormData(form)

    startTransition(async () => {
      const state = await action(data)

      if (state.success && onSuccess) {
        await onSuccess()
      } else if (!state.success && onError) {
        await onError()
      }

      setFormState(state)
    })
  }

  return [formState, handleSubmit, isPending] as const
}
