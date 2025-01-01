import { InputHTMLAttributes } from "react"
import { useFormContext } from "react-hook-form"

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/registry/new-york/ui/form"
import { Input } from "@/registry/new-york/ui/input"

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
