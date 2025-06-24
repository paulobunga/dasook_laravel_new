import { useForm as useInertiaForm } from "@inertiajs/react"
import type { FormEventHandler } from "react"

export function useForm<TForm = Record<string, unknown>>(initialValues: TForm) {
  const form = useInertiaForm(initialValues)

  const submit: FormEventHandler = (e) => {
    e.preventDefault()
    // Custom submit logic can be added here
  }

  return {
    ...form,
    submit,
  }
}
