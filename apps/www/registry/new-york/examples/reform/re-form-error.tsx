"use client"

import { wait } from "next/dist/lib/wait"
import { z } from "zod"

import { ReErrorArea } from "@/registry/new-york/ui/reform/re-error-area"
import { ReForm } from "@/registry/new-york/ui/reform/re-form"
import { ReInput } from "@/registry/new-york/ui/reform/re-input"
import { ReSubmit } from "@/registry/new-york/ui/reform/re-submit"

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
})

export default function ReFormError() {
  const handleSubmit = async () => {
    await wait(500)
    throw new Error("This is an unstructured backend error sample!")
  }

  return (
    <ReForm
      schema={formSchema}
      onSubmit={handleSubmit}
      defaultValues={{ username: "kodkafa" }}
      className="w-2/3"
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
