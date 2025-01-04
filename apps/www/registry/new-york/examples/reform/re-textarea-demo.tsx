"use client"

import { z } from "zod"

import { toast } from "@/registry/new-york/hooks/use-toast"
import { ReForm } from "@/registry/new-york/ui/reform/re-form"
import { ReSubmit } from "@/registry/new-york/ui/reform/re-submit"
import { ReTextarea } from "@/registry/new-york/ui/reform/re-textarea"

const formSchema = z.object({
  input: z.string().optional(),
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
      className="w-2/3 space-y-4 gap-0"
    >
      <ReTextarea label="Textarea" name="input" description="Write something" />
      <ReSubmit>Send</ReSubmit>
    </ReForm>
  )
}
