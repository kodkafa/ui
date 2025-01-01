import { ReactElement, ReactNode } from "react"
import { useFormContext } from "react-hook-form"

import { Button, ButtonProps } from "@/registry/default/ui/button"

export const ReSubmit = ({
  children,
  className = "block w-full",
  type = "submit",
  ...props
}: Omit<ButtonProps, "children"> & {
  children: ReactNode | ((isSubmitting: boolean) => ReactElement)
}) => {
  const {
    formState: { isSubmitting },
  } = useFormContext()

  console.log({ isSubmitting })
  return (
    <Button
      type={type}
      className={className}
      disabled={isSubmitting}
      {...props}
    >
      {typeof children === "function" ? children(isSubmitting) : children}
    </Button>
  )
}
