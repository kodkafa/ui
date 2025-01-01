"use client"

import { wait } from "next/dist/lib/wait"
import { z } from "zod"

import { ReErrorArea } from "@/registry/default/ui/reform/re-error-area"
import { ReForm } from "@/registry/default/ui/reform/re-form"
import { ReInput } from "@/registry/default/ui/reform/re-input"
import { ReSubmit } from "@/registry/default/ui/reform/re-submit"

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
})

export default function ReFormError() {
  const handleSubmit = async () => {
    await wait(500)
    throw {
      message: "Validation failed",
      validations: [
        {
          property: "username",
          constraints: {
            minLength: "Username must be longer than or equal to 4 characters",
          },
        },
      ],
    }
  }

  return (
    <ReForm
      schema={formSchema}
      onSubmit={handleSubmit}
      defaultValues={{ username: "kod" }}
      className="w-2/3 space-y-6"
    >
      <ReInput
        label="Username"
        name="username"
        placeholder="username, email or phone number"
        description="This is your public display name."
      />
      <ReErrorArea />
      <ReSubmit>Submit</ReSubmit>
    </ReForm>
  )
}
