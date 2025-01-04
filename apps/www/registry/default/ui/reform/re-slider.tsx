"use client"

import * as React from "react"
import * as SliderPrimitive from "@radix-ui/react-slider"
import { useFormContext } from "react-hook-form"

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/registry/default/ui/form"
import { Slider } from "@/registry/default/ui/slider"

import { ReFormFieldProps } from "./re-form"

export type Props = {
  className?: string
  name: string
  label?: string
  description?: string
}

const ReSlider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root> &
    ReFormFieldProps & {
      step?: number
      min?: number
      max?: number
      defaultValue?: number[]
    }
>(
  (
    {
      className,
      name,
      label,
      description,
      step = 1,
      min = 0,
      max = 100,
      defaultValue = [0],
      ...props
    },
    _
  ) => {
    const form = useFormContext()

    return (
      <FormField
        control={form.control}
        name={name}
        render={({ field }) => (
          <FormItem className={className}>
            {label && (
              <FormLabel>
                {label} ({field.value})
              </FormLabel>
            )}
            <FormControl>
              <Slider
                {...props}
                step={step}
                min={min}
                max={max}
                defaultValue={defaultValue}
                onValueChange={field.onChange}
              />
            </FormControl>
            {description && <FormDescription>{description}</FormDescription>}
            <FormMessage className="reform-message text-xs" />
          </FormItem>
        )}
      />
    )
  }
)

ReSlider.displayName = "ReSlider"
export { ReSlider }
