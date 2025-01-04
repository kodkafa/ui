"use client"

import { z } from "zod"

import { toast } from "@/registry/default/hooks/use-toast"
import { ReForm } from "@/registry/default/ui/reform/re-form"
import { ReSubmit } from "@/registry/default/ui/reform/re-submit"
import { ReSwitch } from "@/registry/default/ui/reform/re-switch"

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
      <ReSwitch
        className="flex-row-reverse"
        label="Newsletter Allowance"
        name="allowance"
        description="While confirming, we will send you newsletter to your email."
      />
      <ReSubmit>Create my account</ReSubmit>
    </ReForm>
  )
}
