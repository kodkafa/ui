"use client"

import * as React from "react"
import { useEffect, useRef, useState } from "react"
import { useFormContext } from "react-hook-form"

import { cn } from "@/registry/new-york/lib/utils"
import { FormDescription, FormItem } from "@/registry/new-york/ui/form"
import { Label } from "@/registry/new-york/ui/label"
import { ReFormFieldProps } from "@/registry/new-york/ui/reform/re-form"

const ReInputGroup = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> &
    Omit<ReFormFieldProps, "name"> & {
      children: React.ReactNode
    }
>(({ children, className, label, description, disabled, ...props }, _) => {
  const ref = useRef<HTMLDivElement>(null)
  const { formState } = useFormContext()
  const [errors, setErrors] = useState<string[]>([])

  useEffect(() => {
    if (ref.current && Object.keys(formState.errors).length) {
      setErrors(
        Array.from(ref.current?.querySelectorAll(".reform-message")).map(
          (i) => i.innerHTML
        )
      )
    }
  }, [formState])

  return (
    <FormItem className={className}>
      {label && (
        <Label className={cn(errors?.length ? "text-destructive" : "")}>
          {label}
        </Label>
      )}

      <div
        ref={ref}
        {...props}
        // className={`reform-input-group group ${className} ${
        //   disabled ? "disabled" : ""
        // }`}
        // className="[&_input]:border-0 [&_button]:max-w-xs"
        className={cn(
          "group reform-input-group overflow-hidden flex items-center h-9 w-full rounded-md border border-input bg-transparent shadow-sm transition-colors disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          "[&_input]:border-0 [&_input]:rounded-none [&_button]:border-0 [&_button]:rounded-none",
          "focus:[&_input]:ring-0 focus:[&_input]:ring-offset-0 focus:[&_button]:ring-0 focus:[&_button]:ring-offset-0",
          "ring-offset-2 has-[:focus]:ring-2 has-[:focus]:ring-ring",
          "[&_.reform-message]:hidden",
          className
        )}
      >
        {children}
      </div>
      {description && <FormDescription>{description}</FormDescription>}

      {errors?.map((i, k) => (
        <p key={k} className="font-medium text-destructive text-xs">
          {i}
        </p>
      ))}
    </FormItem>
  )
})

ReInputGroup.displayName = "ReInputGroup"
export { ReInputGroup }
