"use client"

import * as React from "react"
import { useFormContext } from "react-hook-form"

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/registry/new-york/ui/form"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/registry/new-york/ui/input-otp"
import { ReFormFieldProps } from "@/registry/new-york/ui/reform/re-form"

const ReInputOTP = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & ReFormFieldProps & { pattern?: string }
>(
  (
    { className, name, label, description, pattern = "xxx-xxx", ...props },
    _
  ) => {
    const form = useFormContext()
    const groups = pattern.split("-")
    const maxLength = pattern.replace(/-/g, "").length

    return (
      <FormField
        control={form.control}
        name={name}
        render={({ field }) => (
          <FormItem className={className} {...props}>
            {label && <FormLabel>{label}</FormLabel>}
            <FormControl>
              <InputOTP maxLength={maxLength} {...field}>
                {groups.map((x, i) => (
                  <React.Fragment key={`group-${i}`}>
                    <InputOTPGroup>
                      {Array.from({ length: x.length }).map((_, j) => {
                        const index = groups.slice(0, i).join("").length + j
                        return (
                          <InputOTPSlot key={`slot-${index}`} index={index} />
                        )
                      })}
                    </InputOTPGroup>
                    {i < groups.length - 1 && <InputOTPSeparator />}
                  </React.Fragment>
                ))}
              </InputOTP>
            </FormControl>
            {description && <FormDescription>{description}</FormDescription>}
            <FormMessage className="reform-message text-xs" />
          </FormItem>
        )}
      />
    )
  }
)

ReInputOTP.displayName = "ReInputOTP"
export { ReInputOTP }
