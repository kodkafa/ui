"use client"

import * as React from "react"
import { InputHTMLAttributes, TextareaHTMLAttributes } from "react"
import { useFormContext } from "react-hook-form"

import { cn } from "@/registry/default/lib/utils"
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/registry/default/ui/form"
import { ReFormFieldProps } from "@/registry/default/ui/reform/re-form"
import { Textarea } from "@/registry/default/ui/textarea"

export type Props = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  className?: string
  name: string
  label?: string
  description?: string
}

const ReTextarea = React.forwardRef<
  HTMLTextAreaElement,
  React.ComponentProps<"textarea"> & ReFormFieldProps
>(({ className, name, label, description, ...props }, _) => {
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
            <Textarea
              className={cn("resize-none", className)}
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

ReTextarea.displayName = "ReTextarea"
export { ReTextarea }
