"use client"

import * as React from "react"
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group"
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
import { RadioGroup, RadioGroupItem } from "@/registry/default/ui/radio-group"
import { ReFormFieldProps } from "@/registry/default/ui/reform/re-form"

const ReRadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root> &
    ReFormFieldProps & {
      options: {
        label: string | React.ReactNode
        value: string
      }[]
    }
>(({ className, name, label, description, options = [], ...props }, ref) => {
  const form = useFormContext()

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <RadioGroup
              ref={ref}
              {...props}
              onValueChange={field.onChange}
              defaultValue={field.value}
              className={cn("flex flex-col gap-2", className)}
            >
              {options.map((x) => (
                <FormItem
                  key={x.value}
                  className="flex items-center space-x-3 space-y-0"
                >
                  <FormControl>
                    <RadioGroupItem value={x.value} />
                  </FormControl>
                  <FormLabel className="font-normal">{x.label}</FormLabel>
                </FormItem>
              ))}
            </RadioGroup>
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage className="reform-message text-xs" />
        </FormItem>
      )}
    />
  )
})

ReRadioGroup.displayName = "ReRadioGroup"
export { ReRadioGroup }
