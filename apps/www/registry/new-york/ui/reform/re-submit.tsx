import { Button, ButtonProps } from "@/registry/new-york/ui/button"

export const ReSubmit = ({
  children,
  className = "block w-full",
  type = "submit",
  ...props
}: ButtonProps) => {
  return (
    <Button type={type} className={className} {...props}>
      {children}
    </Button>
  )
}
