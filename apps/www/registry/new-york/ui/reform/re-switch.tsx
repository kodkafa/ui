"use client"

import * as React from "react"
import * as SwitchPrimitives from "@radix-ui/react-switch"
import { useFormContext } from "react-hook-form"

import { cn } from "@/lib/utils"
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/registry/new-york/ui/form"
import { ReFormFieldProps } from "@/registry/new-york/ui/reform/re-form"
import { Switch } from "@/registry/new-york/ui/switch"

const ReSwitch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root> &
    ReFormFieldProps
>(({ className, name, label, description, ...props }, ref) => {
  const form = useFormContext()

  return (
    <FormField
      control={form.control}
      name={name}
      defaultValue={false}
      render={({ field }) => (
        <FormItem>
          <div
            className={cn(
              "rounded-md border border-input bg-background px-3 py-2 text-base ",
              "border-input space-y-0 items-center flex gap-2",
              className
            )}
          >
            <FormControl>
              <Switch
                ref={ref}
                {...props}
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </FormControl>
            <div className="grow grid gap-1.5 leading-none">
              {label && <FormLabel>{label}</FormLabel>}
              {description && <FormDescription>{description}</FormDescription>}
            </div>
          </div>
          <FormMessage className="reform-message text-xs" />
        </FormItem>
      )}
    />
  )
})

ReSwitch.displayName = "ReSwitch"
export { ReSwitch }
