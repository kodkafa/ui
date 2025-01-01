import { HTMLAttributes } from "react"
import { useFormContext } from "react-hook-form"

export type Props = HTMLAttributes<HTMLDivElement> & {
  name?: string
}

export const ReErrorArea = ({ name = "root", className, ...props }: Props) => {
  const {
    formState: { errors },
  } = useFormContext()
  const error =
    name === "root" && typeof errors[name] === "object"
      ? Object.values(errors[name] as Record<string, { message: string }>)
      : errors[name]

  return (
    <div className={`reform-errorarea ${className}`}>
      {error && (
        <div className="reform-item-error">
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
}
