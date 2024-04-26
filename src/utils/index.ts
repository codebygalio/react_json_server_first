import { useEffect, useRef, useState } from "react";


export const isFalsy = (value: unknown) => (value === 0 ? true : !!value);
export const isVoid = (value: unknown) => value === undefined || value === null || value === ''

export const cleanObject = (object: object) => { 
  const result = { ...object };
  Object.keys(result).forEach((key) => {
    // @ts-ignore
    const value = object[key];
    if (isVoid(value)) {
      // @ts-ignore
      delete result[key];
    }
  });
  return result;
}; 
 

export const useMount = (callback: ()=>void) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => callback(), []);
};

export const useDebounce = <V>(value: V, delay?:number):V => { 
  const [ debouncedValue, setDebouncedValue ] = useState(value)
  // let timer = null
  // if (timer){ clearTimeout(timer) }
  // timer = setTimeout(() => {
  //   setDebouncedValue(value)
  // }, delay )
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)
    return () => clearTimeout(timer)
  }, [value, delay])

  return debouncedValue
}


// export const useArray = <T>(initialArray: T[]) => {
//   const [value, setValue] = useState(initialArray)
//   return {
//     value,
//     setValue,
//     add: (item: T) => setValue([...value, item]),
//     clear: () => setValue([]),
//     removeIndex: (index: number) => {
//       const copy = [...value]
//       copy.splice(index, 1)
//       setValue(copy)
//     }
//   }
// }
export const useArray = <X>(initialArray:X[]) => {
  const [value, setValue] = useState(initialArray)
  const clear = () => setValue([])
  const removeIndex = (index:number) => {
    const copy = [...value]
    copy.splice(index, 1)
    setValue(copy)
  }
  const add = (item: X) => setValue([...value,item]) 
  return {
    value,
    clear,
    removeIndex,
    add
  }
}

export const useDocumentTitle = (title:string, keepOnUnmount:boolean=true) => {

  const oldTitle = useRef(document.title).current
  // console.log('old=',oldTitle)
  useEffect(()=> {
    document.title = title
    // console.log('oldTitle上面=',oldTitle)
  }, [])
  useEffect(()=>{
    return () => {
      if(!keepOnUnmount){document.title = oldTitle}
    }
  },[])
}

export const resetRoute = () => window.location.href = window.location.origin



export const useMountedRef = () => {
  const mountedRef = useRef(false);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  });

  return mountedRef;
};