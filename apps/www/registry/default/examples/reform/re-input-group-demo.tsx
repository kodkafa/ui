"use client"

import { z } from "zod"

import { toast } from "@/registry/default/hooks/use-toast"
import { ReForm } from "@/registry/default/ui/reform/re-form"
import { ReInput } from "@/registry/default/ui/reform/re-input"
import { ReInputGroup } from "@/registry/default/ui/reform/re-input-group"
import { ReSubmit } from "@/registry/default/ui/reform/re-submit"

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
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
      defaultValues={{ username: "" }}
      className="w-2/3 space-y-6"
    >
      <ReInputGroup label="Username">
        <span className="p-2 bg-accent text-muted-foreground border-r">@</span>
        <ReInput name="username" placeholder="joe" />
      </ReInputGroup>
      <ReSubmit>Submit</ReSubmit>
    </ReForm>
  )
}
