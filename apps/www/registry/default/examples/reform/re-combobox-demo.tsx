"use client"

import { z } from "zod"

import { toast } from "@/registry/default/hooks/use-toast"
import { ReCombobox } from "@/registry/default/ui/reform/re-combobox"
import { ReForm } from "@/registry/default/ui/reform/re-form"
import { ReSubmit } from "@/registry/default/ui/reform/re-submit"

const formSchema = z.object({
  input: z.string({
    required_error: "You have to select at least one item.",
  }),
})
type FormData = z.infer<typeof formSchema>

const options = [
  { label: "Option 1", value: "option1" },
  { label: "Option 2", value: "option2" },
  { label: "Option 3", value: "option3" },
  { label: "Option 4", value: "option4" },
  { label: "Option 5", value: "option5" },
  { label: "Option 6", value: "option6" },
  { label: "Option 7", value: "option7" },
  { label: "Option 8", value: "option8" },
  { label: "Option 9", value: "option9" },
  { label: "Option 10", value: "option10" },
]

export default function FormComponent() {
  const handleSubmit = (data: FormData) => {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    })
  }

  return (
    <ReForm
      schema={formSchema}
      onSubmit={handleSubmit}
      defaultValues={{ input: "option2" }}
      className="w-2/3 space-y-4 gap-0"
    >
      <ReCombobox
        width="w-full"
        label="Combobox"
        name="input"
        options={options}
        description="You have to select one item."
      />
      <ReSubmit>Send</ReSubmit>
    </ReForm>
  )
}
