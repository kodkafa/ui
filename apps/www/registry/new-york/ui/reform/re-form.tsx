"use client"

import { ReactNode, useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { DeepPartial, Resolver, useForm } from "react-hook-form"
import { TypeOf, ZodSchema, ZodType, undefined, z } from "zod"

import { errorHandler } from "@/registry/new-york/lib/error"
import { Form } from "@/registry/new-york/ui/form"

export type ReformSubmitHandler<T extends ZodSchema> = (
  data: z.infer<T>
) => Promise<boolean | void> | boolean | void

export type Props<T extends ZodSchema> = {
  schema: T
  resolver?: Resolver
  onSubmit?: ReformSubmitHandler<T>
  onChange?: ReformSubmitHandler<T>
  defaultValues?: DeepPartial<TypeOf<T>> | undefined
  className?: string
  children?: ReactNode | ReactNode[]
  autoComplete?: "on" | "off"
  novalidate?: string
  disabled?: boolean
}

export const ReForm = <T extends ZodSchema>({
  className = "flex flex-col gap-4",
  schema,
  onSubmit,
  onChange,
  defaultValues,
  // disabled = false,
  children,
}: // ...props
Props<T>) => {
  const [loading, setLoading] = useState(false)

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema as any),
    defaultValues,
    reValidateMode: "onChange",
    // disabled,
  })

  const handleSubmit = async (data: z.infer<typeof schema>) => {
    setLoading(true)
    try {
      if (onSubmit && (await onSubmit(data))) form.reset(defaultValues)
    } catch (error) {
      errorHandler(error, form.setError)
    } finally {
      setLoading(false)
    }
  }

  const handleFormChange = () => {
    if (onChange) {
      onChange(form.watch())
    }
  }
  // ${disabled ? 'reform-disabled' : ''}
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        onChange={handleFormChange}
        className={`reform-form ${
          loading ? "reform-loading" : ""
        } ${className}`}
      >
        {children}
      </form>
    </Form>
  )
}
