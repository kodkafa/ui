"use client"

import * as React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { DeepPartial, Resolver, useForm } from "react-hook-form"
import { TypeOf, ZodSchema, z } from "zod"

import { errorHandler } from "@/registry/new-york/lib/error"
import { cn } from "@/registry/new-york/lib/utils"
import { Form } from "@/registry/new-york/ui/form"

type ReFormFieldProps = {
  name: string
  label?: string
  description?: string | React.ReactNode
  disabled?: boolean
}

type ReFormSubmitHandler<T extends ZodSchema> = (
  data: z.infer<T>
) => Promise<boolean | void> | boolean | void

type Props<T extends ZodSchema> = {
  schema: T
  resolver?: Resolver
  onSubmit?: ReFormSubmitHandler<T>
  onChange?: ReFormSubmitHandler<T>
  defaultValues?: DeepPartial<TypeOf<T>> | undefined
  className?: string
  children?: React.ReactNode | React.ReactNode[]
  autoComplete?: "on" | "off"
  novalidate?: string
  disabled?: boolean
}

const ReForm = <T extends ZodSchema>({
  className,
  schema,
  onSubmit,
  onChange,
  defaultValues,
  // disabled = false,
  children,
}: Props<T>) => {
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema as any),
    defaultValues,
    reValidateMode: "onChange",
    // disabled,
  })

  const handleSubmit = async (data: z.infer<typeof schema>) => {
    try {
      if (onSubmit && (await onSubmit(data))) form.reset(defaultValues)
    } catch (error) {
      errorHandler(error, form.setError)
    }
  }

  const handleFormChange = () => {
    if (onChange) {
      onChange(form.watch())
    }
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        onChange={handleFormChange}
        className={cn("reform-form flex flex-col gap-4", className)}
      >
        {children}
      </form>
    </Form>
  )
}

export { ReForm }
export type { ReFormSubmitHandler, ReFormFieldProps }
