"use client"

import * as React from "react"
import { InputHTMLAttributes } from "react"

import { cn } from "@/registry/new-york/lib/utils"
import { Button } from "@/registry/new-york/ui/button"
import { ReFormFieldProps } from "@/registry/new-york/ui/reform/re-form"
import { ReInput } from "@/registry/new-york/ui/reform/re-input"
import { ReInputGroup } from "@/registry/new-york/ui/reform/re-input-group"

export type Props = Omit<
  InputHTMLAttributes<HTMLInputElement> & {
    name: string
    label?: string
    description?: string
  },
  "type"
> & {
  show?: React.ReactNode
  hide?: React.ReactNode
}

const RePassword = React.forwardRef<
  HTMLInputElement,
  React.ComponentProps<"input"> &
    ReFormFieldProps & {
      show?: React.ReactNode
      hide?: React.ReactNode
    }
>(
  (
    {
      label,
      description,
      show = <i className="after:content-['🔒'] after:not-italic" />,
      hide = <i className="after:content-['🔓'] after:not-italic" />,
      className,
      ...props
    },
    ref
  ) => {
    const [type, setType] = React.useState("password")
    const toggleType = React.useCallback(() => {
      setType(type === "password" ? "text" : "password")
    }, [type])

    return (
      <ReInputGroup
        label={label}
        description={description}
        className={cn("", "", className)}
        disabled={props.disabled}
      >
        <ReInput ref={ref} {...props} className="w-full" type={type} />
        <Button
          type="button"
          variant="ghost"
          className="w-10 h-10"
          onClick={toggleType}
        >
          {type === "password" ? show : hide}
        </Button>
      </ReInputGroup>
    )
  }
)

RePassword.displayName = "RePassword"
export { RePassword }
