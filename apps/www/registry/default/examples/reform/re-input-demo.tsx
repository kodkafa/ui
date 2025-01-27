"use client"

import { z } from "zod"

import { ReForm } from "@/registry/default/ui/reform/re-form"
import { ReInput } from "@/registry/default/ui/reform/re-input"

export default function ReInputDemo() {
  const formSchema = z.object({
    email: z.string().email().min(8, {
      message: "Email must be at least 8 characters.",
    }),
  })
  return (
    <ReForm schema={formSchema}>
      <ReInput
        type="email"
        name="email"
        label="Email"
        placeholder="Email"
        description="Descriptive text here..."
      />
    </ReForm>
  )
}
