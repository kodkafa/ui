"use client"

import { z } from "zod"

import { toast } from "@/registry/default/hooks/use-toast"
import { Label } from "@/registry/default/ui/label"
import { ReCheckbox } from "@/registry/default/ui/reform/re-checkbox"
import { ReForm } from "@/registry/default/ui/reform/re-form"
import { ReInput } from "@/registry/default/ui/reform/re-input"
import { ReInputGroup } from "@/registry/default/ui/reform/re-input-group"
import { RePassword } from "@/registry/default/ui/reform/re-password"
import { ReSubmit } from "@/registry/default/ui/reform/re-submit"
import { ReSwitch } from "@/registry/default/ui/reform/re-switch"

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
      <div>
        <Label>Full Name</Label>
        <div className="grid grid-cols-2 gap-4">
          <ReInput name="firstName" placeholder="First Name" />
          <ReInput name="lastName" placeholder="Last Name" />
        </div>
      </div>
      <ReInput
        label="Email"
        name="email"
        placeholder="joe@gmail.com"
        type="email"
      />
      <ReInputGroup label="Username">
        <span className="p-3 bg-accent text-muted-foreground border-r">@</span>
        <ReInput name="username" placeholder="joe" />
      </ReInputGroup>
      <RePassword label="Password" name="password" placeholder="password" />
      <ReCheckbox
        // label="Remember me"
        name="approve"
        description={
          <span className="block -m-0.5">
            By creating an account, you agree to our <u>Terms of Service</u> and{" "}
            <u>Privacy Policy</u>.
          </span>
        }
      />
      <ReSwitch
        label="Newsletter Allowance"
        name="allowance"
        description="While confirming, we will send you newsletter to your email."
      />
      <ReSubmit>Create my account</ReSubmit>
    </ReForm>
  )
}
