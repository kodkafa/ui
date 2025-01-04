"use client"

import { z } from "zod"

import { toast } from "@/registry/new-york/hooks/use-toast"
import { ReForm } from "@/registry/new-york/ui/reform/re-form"
import { ReSlider } from "@/registry/new-york/ui/reform/re-slider"
import { ReSubmit } from "@/registry/new-york/ui/reform/re-submit"

const formSchema = z.object({
  input: z.array(
    z.number().min(0, {
      message: "Slider must be at least 0.",
    })
  ),
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
      defaultValues={{ input: [50] }}
      className="w-2/3 space-y-4 gap-0"
    >
      <ReSlider
        label="Slider"
        name="input"
        min={0}
        max={100}
        step={10}
        defaultValue={[50]}
        description="Slide it"
      />
      <ReSubmit>Send</ReSubmit>
    </ReForm>
  )
}
