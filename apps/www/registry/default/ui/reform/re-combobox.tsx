"use client"

import * as React from "react"
import { InputHTMLAttributes } from "react"
import { Check, ChevronsUpDown } from "lucide-react"
import { useFormContext } from "react-hook-form"

import { cn } from "@/lib/utils"
import { Button, ButtonProps } from "@/registry/default/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/registry/default/ui/command"
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/registry/default/ui/form"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/registry/default/ui/popover"
import { ReFormFieldProps } from "@/registry/default/ui/reform/re-form"

export type Props = InputHTMLAttributes<HTMLInputElement> & {
  className?: string
  name: string
  label?: string
  description?: string
  options: {
    label: string
    value: string
  }[]
}

const ReCombobox = React.forwardRef<
  HTMLButtonElement,
  ButtonProps &
    ReFormFieldProps & {
      placeholder?: string
      options: {
        label: string
        value: string
      }[]
      width?: string
      icon?: React.ReactNode
      notFoundMessage?: string
    }
>(
  (
    {
      className,
      name,
      label,
      description,
      options,
      placeholder = "Search ...",
      variant = "outline",
      width = "w-[200px]",
      icon,
      notFoundMessage = "No items found.",
      ...props
    },
    ref
  ) => {
    const form = useFormContext()
    if (!form)
      return (
        <div className="text-destructive text-sm">Form context not found</div>
      )

    return (
      <FormField
        control={form.control}
        name={name}
        render={({ field }) => (
          <FormItem className={cn("flex flex-col", className)}>
            {label && <FormLabel>{label}</FormLabel>}
            <Popover>
              <PopoverTrigger asChild>
                <FormControl>
                  <Button
                    ref={ref}
                    {...props}
                    variant={variant}
                    role="combobox"
                    className={cn(
                      "w-[200px] justify-between",
                      width,
                      !field.value && "text-muted-foreground"
                    )}
                  >
                    {field.value
                      ? options.find((options) => options.value === field.value)
                          ?.label
                      : "Select language"}
                    {icon || (
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    )}
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent className={cn("w-[200px] p-0", width)}>
                <Command>
                  <CommandInput placeholder={placeholder} />
                  <CommandList>
                    <CommandEmpty>{notFoundMessage}</CommandEmpty>
                    <CommandGroup>
                      {options.map((options) => (
                        <CommandItem
                          value={options.label}
                          key={options.value}
                          onSelect={() => {
                            form.setValue(name, options.value)
                          }}
                        >
                          {options.label}
                          <Check
                            className={cn(
                              "ml-auto",
                              options.value === field.value
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
            {description && <FormDescription>{description}</FormDescription>}
            <FormMessage className="reform-message text-xs" />
          </FormItem>
        )}
      />
    )
  }
)

ReCombobox.displayName = "ReCombobox"
export { ReCombobox }
