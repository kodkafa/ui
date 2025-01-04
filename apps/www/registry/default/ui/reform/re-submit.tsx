import * as React from "react"
import { ReactElement, ReactNode } from "react"
import { useFormContext } from "react-hook-form"

import { cn } from "@/registry/default/lib/utils"
import { Button, ButtonProps } from "@/registry/default/ui/button"

type Props = Omit<ButtonProps, "children">

const ReSubmit = React.forwardRef<
  HTMLButtonElement,
  Props & {
    children: ReactNode | ((isSubmitting: boolean) => ReactElement)
  }
>(({ className, children, ...props }, ref) => {
  const {
    formState: { isSubmitting },
  } = useFormContext()
  return (
    <Button
      ref={ref}
      type="submit"
      className={cn("block w-full", className)}
      disabled={isSubmitting}
      {...props}
    >
      {typeof children === "function" ? children(isSubmitting) : children}
    </Button>
  )
})

ReSubmit.displayName = "ReSubmit"
export { ReSubmit }
