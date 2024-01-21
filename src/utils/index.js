import { useEffect, useState } from "react";


export const isFalsy = (value) => (value === 0 ? true : !!value);
export const cleanObject = (object) => {
  const result = { ...object };
  Object.keys(result).forEach((key) => {
    const value = object[key];
    if (!isFalsy(value)) {
      delete result[key];
    }
  });
  return result;
}; 
 
 

export const useMount = (callback) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => callback(), []);
};

export const useDebounce = (value, delay) => {
  const [ debouncedValue, setDebouncedValue ] = useState(value)

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)
    return () => clearTimeout(timer)
  }, [value, delay])

  return debouncedValue
}
