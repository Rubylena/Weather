import { useEffect, useRef, useState } from "react";

export function useDebounce(arg: string, delay: number): string {
  const [debouncedValue, setDebouncedValue] = useState<string>("");

  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      setDebouncedValue(arg);
    }, delay);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [debouncedValue, delay, arg]);

  return debouncedValue;
}
