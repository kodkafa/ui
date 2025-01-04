"use client"

import * as React from "react"
import { useFormContext } from "react-hook-form"

import { cn } from "@/registry/new-york/lib/utils"
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/registry/new-york/ui/form"
import { Input } from "@/registry/new-york/ui/input"
import { ReFormFieldProps } from "@/registry/new-york/ui/reform/re-form"

const ReInput = React.forwardRef<
  HTMLInputElement,
  React.ComponentProps<"input"> & ReFormFieldProps
>(({ className, type = "text", name, label, description, ...props }, _) => {
  const form = useFormContext()

  return (
    <FormField
      defaultValue={""}
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <Input
              type={type}
              className={cn("reform-element", className)}
              {...props}
              {...field}
            />
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage className="reform-message text-xs" />
        </FormItem>
      )}
    />
  )
})

ReInput.displayName = "ReInput"
export { ReInput }
