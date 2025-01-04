"use client"

import * as React from "react"
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"
import { useFormContext } from "react-hook-form"

import { cn } from "@/registry/default/lib/utils"
import { Checkbox } from "@/registry/default/ui/checkbox"
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/registry/default/ui/form"

import { ReFormFieldProps } from "./re-form"

const ReCheckbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> &
    ReFormFieldProps
>(({ className, name, label, description, ...props }, _) => {
  const form = useFormContext()

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem
          className={cn(className, "space-y-0 items-top flex space-x-2")}
        >
          <FormControl>
            <Checkbox
              {...props}
              checked={field.value}
              onCheckedChange={field.onChange}
            />
          </FormControl>
          <div className="grid gap-1.5 leading-none">
            {label && <FormLabel>{label}</FormLabel>}
            {description && <FormDescription>{description}</FormDescription>}
          </div>
          <FormMessage className="reform-message text-xs" />
        </FormItem>
      )}
    />
  )
})

ReCheckbox.displayName = "ReCheckbox"
export { ReCheckbox }
