import { useEffect, useState } from "react"

const useDebounce = <T>(value: T, delay: number): T => {
    const [debouncedValue, setDebouncedValue] = useState<T>(value)
    useEffect(() => {
        const interval = setTimeout(() => {
           setDebouncedValue(value)
        }, delay)

        return () => {
            clearInterval(interval)
        }
    },[value, delay])

    return debouncedValue
} 

export default useDebounce