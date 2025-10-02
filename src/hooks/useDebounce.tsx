import { useEffect, useState } from "react"

interface DebouncePropsInterface {
  value: string
  delay?: number
}

const useDebounce = ({
  value,
  delay = 500,
}: DebouncePropsInterface): string => {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const debounce = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => clearTimeout(debounce)
  }, [value, delay])

  return debouncedValue?.trim()
}

export default useDebounce
