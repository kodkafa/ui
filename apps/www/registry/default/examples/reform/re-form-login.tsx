"use client"

import { z } from "zod"

import { toast } from "@/registry/default/hooks/use-toast"
import { ReCheckbox } from "@/registry/default/ui/reform/re-checkbox"
import { ReForm } from "@/registry/default/ui/reform/re-form"
import { ReInput } from "@/registry/default/ui/reform/re-input"
import { RePassword } from "@/registry/default/ui/reform/re-password"
import { ReSubmit } from "@/registry/default/ui/reform/re-submit"

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
  rememberMe: z.boolean(),
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
      defaultValues={{ username: "", password: "", rememberMe: false }}
      className="w-2/3 space-y-4 gap-0"
    >
      <ReInput
        label="Username"
        name="username"
        placeholder="username, email or phone number"
      />
      <RePassword label="Password" name="password" placeholder="password" />
      <ReCheckbox
        label="Remember me"
        name="rememberMe"
        description="Only if you trust this device, confirm."
      />
      <ReSubmit>Submit</ReSubmit>
    </ReForm>
  )
}
