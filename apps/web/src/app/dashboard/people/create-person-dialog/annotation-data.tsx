import { useFormContext } from 'react-hook-form'
import { FormData } from './shema'
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Textarea } from '@/components/ui/textarea'

export function AnnotationData() {
  const form = useFormContext<FormData>()

  return (
    <div>
      <FormField
        control={form.control}
        name="annotation.description"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Observação</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Insira uma observação"
                className="min-h-[100px] resize-none"
                {...field}
              />
            </FormControl>
            <FormDescription>
              Você pode descrever algum informação a mais sobre a pessoa.
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  )
}
