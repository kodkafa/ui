"use client"

import { wait } from "next/dist/lib/wait"
import { z } from "zod"

import { toast } from "@/registry/default/hooks/use-toast"
import { ReForm } from "@/registry/default/ui/reform/re-form"
import { ReInput } from "@/registry/default/ui/reform/re-input"
import { ReSubmit } from "@/registry/default/ui/reform/re-submit"

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
})
type FormData = z.infer<typeof formSchema>

export default function ReSubmitDisabled() {
  const handleSubmit = async (data: FormData) => {
    await wait(2000) // Wait for 2 seconds
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
      defaultValues={{ username: "kodkafa" }}
      className="w-2/3 space-y-6"
    >
      <ReInput
        label="Username"
        name="username"
        placeholder="username, email or phone number"
        description="This is your public display name."
      />
      <ReSubmit disabled>Submit</ReSubmit>
    </ReForm>
  )
}
