"use client"

import { z } from "zod"

import { toast } from "@/registry/default/hooks/use-toast"
import { ReForm } from "@/registry/default/ui/reform/re-form"
import { RePassword } from "@/registry/default/ui/reform/re-password"
import { ReSubmit } from "@/registry/default/ui/reform/re-submit"

const formSchema = z.object({
  password: z
    .string()
    .regex(/.{8,}/, {
      message: "Password must be at least 8 characters.",
    })
    .regex(/[A-Z]/, {
      message: "Password must contain at least one uppercase letter.",
    })
    .regex(/[a-z]/, {
      message: "Password must contain at least one lowercase letter.",
    })
    .regex(/[0-9]/, {
      message: "Password must contain at least one number.",
    })
    .regex(/[\W_]/, {
      // You can use /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/ for specific special characters if needed
      message: "Password must contain at least one special character.",
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
      className="w-2/3 space-y-4 gap-0"
    >
      <RePassword
        label="Password"
        name="password"
        placeholder="your secure password"
        description="It should be securee"
        // show={<span className="text-[10px]">SHOW</span>}
        // hide={<span className="text-[10px]">HIDE</span>}
      />
      <ReSubmit>Submit</ReSubmit>
    </ReForm>
  )
}
