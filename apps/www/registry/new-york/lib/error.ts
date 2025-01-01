import { FieldValues, UseFormSetError } from "react-hook-form"

type ValidationError = {
  constraints: object
  property: string
  children?: ValidationError[]
}

export function errorHandler<
  T extends {
    message: string
    validations: ValidationError[]
  }
>(error: unknown, setError: UseFormSetError<FieldValues>): boolean {
  if (error !== null) {
    if (typeof error === "object") {
      const errorResponse = error as T
      if (
        "validations" in errorResponse &&
        errorResponse.validations.length > 0
      ) {
        errorResponse?.validations.map((i) => {
          const messages = Object.values(i.constraints)
          setError(i.property, {
            message: String(messages[0]),
          })
        })
      } else {
        setError("root.generic", { message: errorResponse?.message })
      }
    } else setError("root.generic", { message: String(error) })
    return true
  } else return false
}
