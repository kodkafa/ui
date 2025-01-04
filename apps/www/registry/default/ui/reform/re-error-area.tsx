"use client"

import * as React from "react"
import { HTMLAttributes } from "react"
import { useFormContext } from "react-hook-form"

export type Props = HTMLAttributes<HTMLDivElement> & {
  name?: string
}

const ReErrorArea = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & {
    name?: string
  }
>(({ className, name = "root", ...props }, ref) => {
  const {
    formState: { errors },
  } = useFormContext()
  const error =
    name === "root" && typeof errors[name] === "object"
      ? Object.values(errors[name] as Record<string, { message: string }>)
      : errors[name]

  return (
    <div ref={ref} className={`reform-errorarea ${className}`} {...props}>
      {error && (
        <div className="text-destructive text-sm" aria-live="assertive">
          {Array.isArray(error) ? (
            <ul>
              {error.map((i, k) => (
                <li key={k}>{String(i?.message)}</li>
              ))}
            </ul>
          ) : (
            <>{String(error.message)}</>
          )}
        </div>
      )}
    </div>
  )
})

export { ReErrorArea }
