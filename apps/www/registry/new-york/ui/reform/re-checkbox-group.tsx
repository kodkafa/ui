"use client"

import * as React from "react"
import { ReactNode } from "react"
import { useFormContext } from "react-hook-form"

import { cn } from "@/registry/new-york/lib/utils"
import { Checkbox } from "@/registry/new-york/ui/checkbox"
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/registry/new-york/ui/form"
import { ReFormFieldProps } from "@/registry/new-york/ui/reform/re-form"

const ReCheckboxGroup = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> &
    ReFormFieldProps & {
      options: {
        label: string | ReactNode
        value: string
      }[]
    }
>(({ className, name, label, description, options, ...props }, _) => {
  const form = useFormContext()

  return (
    <FormField
      control={form.control}
      name={name}
      render={() => (
        <FormItem {...props}>
          {label && <FormLabel>{label}</FormLabel>}
          <div className={cn("flex flex-col gap-2", className)}>
            {options.map((x: { label: string | ReactNode; value: string }) => (
              <FormField
                key={x.value}
                control={form.control}
                name={name}
                render={({ field }) => {
                  return (
                    <FormItem
                      key={x.value}
                      className="flex flex-row items-start space-x-3 space-y-0"
                    >
                      <FormControl>
                        <Checkbox
                          checked={field.value?.includes(x.value)}
                          onCheckedChange={(checked) => {
                            return checked
                              ? field.onChange([
                                  ...(field.value || []),
                                  x.value,
                                ])
                              : field.onChange(
                                  field.value?.filter(
                                    (value: string) => value !== x.value
                                  )
                                )
                          }}
                        />
                      </FormControl>
                      <FormLabel className="font-normal">{x.label}</FormLabel>
                    </FormItem>
                  )
                }}
              />
            ))}
          </div>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage className="reform-message text-xs" />
        </FormItem>
      )}
    />
  )
})

ReCheckboxGroup.displayName = "ReCheckboxGroup"
export { ReCheckboxGroup }
