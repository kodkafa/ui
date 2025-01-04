"use client"

import * as React from "react"
import * as SelectPrimitive from "@radix-ui/react-select"
import { useFormContext } from "react-hook-form"

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/registry/new-york/ui/form"
import { ReFormFieldProps } from "@/registry/new-york/ui/reform/re-form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/registry/new-york/ui/select"

const ReSelect = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger> &
    ReFormFieldProps & {
      placeholder?: string
      options: {
        label: string | React.ReactNode
        value: string
      }[]
    }
>(
  (
    { name, label, description, placeholder = "Select", options, ...props },
    ref
  ) => {
    const form = useFormContext()
    if (!form)
      return (
        <div className="text-destructive text-sm">Form context not found</div>
      )

    return (
      <FormField
        control={form.control}
        name={name}
        render={({ field }) => (
          <FormItem>
            {label && <FormLabel>{label}</FormLabel>}
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger ref={ref} {...props}>
                  <SelectValue placeholder={field.value || placeholder} />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {options.map((x) => (
                  <SelectItem key={x.value} value={x.value}>
                    {x.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {description && <FormDescription>{description}</FormDescription>}
            <FormMessage className="reform-message text-xs" />
          </FormItem>
        )}
      />
    )
  }
)

ReSelect.displayName = "ReSelect"
export { ReSelect }
