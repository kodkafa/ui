"use client"

import { z } from "zod"

import { toast } from "@/registry/default/hooks/use-toast"
import { ReForm } from "@/registry/default/ui/reform/re-form"
import { ReRadioGroup } from "@/registry/default/ui/reform/re-radio-group"
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
      <ReRadioGroup
        label="Radio Group"
        name="input"
        options={options}
        description="Description text here."
      />
      <ReSubmit>Send</ReSubmit>
    </ReForm>
  )
}
