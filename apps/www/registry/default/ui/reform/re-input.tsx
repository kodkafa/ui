import { InputHTMLAttributes } from "react"
import { useFormContext } from "react-hook-form"

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/registry/default/ui/form"
import { Input } from "@/registry/default/ui/input"

export type Props = InputHTMLAttributes<HTMLInputElement> & {
  className?: string
  name: string
  label?: string
  description?: string
}

export const ReInput = ({
  className,
  name,
  label,
  description,
  type = "text",
  value,
  ...props
}: Props) => {
  const form = useFormContext()

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <Input
              type={type}
              className="reform-element"
              {...props}
              {...field}
            />
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage className="text-xs" />
        </FormItem>
      )}
    />
  )
}
