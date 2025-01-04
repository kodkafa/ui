"use client"

import { z } from "zod"

import { toast } from "@/registry/new-york/hooks/use-toast"
import { ReCheckbox } from "@/registry/new-york/ui/reform/re-checkbox"
import { ReForm } from "@/registry/new-york/ui/reform/re-form"
import { ReSubmit } from "@/registry/new-york/ui/reform/re-submit"

const formSchema = z.object({
  allowance: z.boolean(),
})
type FormData = z.infer<typeof formSchema>

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
      defaultValues={{ allowance: false }}
      className="w-2/3 space-y-4 gap-0"
    >
      <ReCheckbox
        label="Newsletter Allowance"
        name="allowance"
        description="While confirming, we will send you newsletter to your email."
      />
      <ReSubmit>Create my account</ReSubmit>
    </ReForm>
  )
}
