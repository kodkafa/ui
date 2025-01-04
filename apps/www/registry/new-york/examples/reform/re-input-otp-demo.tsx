"use client"

import { z } from "zod"

import { toast } from "@/registry/new-york/hooks/use-toast"
import { ReForm } from "@/registry/new-york/ui/reform/re-form"
import { ReInputOTP } from "@/registry/new-york/ui/reform/re-input-otp"
import { ReSubmit } from "@/registry/new-york/ui/reform/re-submit"

const formSchema = z.object({
  input: z
    .string()
    .regex(/^\d{4}$/, {
      message:
        "Invalid pattern. Must be in the format xxxx(where x is a digit).",
    })
    .optional(),
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
      <ReInputOTP
        pattern="xxxx"
        label="One Time Password"
        name="input"
        description="Enter your one time password."
      />
      <ReSubmit>Send</ReSubmit>
    </ReForm>
  )
}
