import { useEffect, useRef, useState } from "react";

// type DebouncedFn<T> = (arg: T) => void;

export function useDebounce(arg: string, delay: number): string {
  const [debouncedValue, setDebouncedValue] = useState<string>("");

  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      setDebouncedValue(arg);
      // fn(debouncedValue!);
      // fn(debouncedValue!);
    }, delay);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [debouncedValue, delay, arg]);

  return debouncedValue;
  // setDebouncedValue(arg);
  // if (timeoutRef.current) {
  //   clearTimeout(timeoutRef.current);
  // }
  // timeoutRef.current = setTimeout(() => {
  //   fn(debouncedValue!);
  // }, delay);
}

// import { useState, useEffect } from "react";

// export function useDebounce(value, delay) {
//   const [debouncedValue, setDebouncedValue] = useState(value);

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setDebouncedValue(value);
//     }, delay);

//     return () => {
//       clearTimeout(timer);
//     };
//   }, [value, delay]);

//   return debouncedValue;
// }
