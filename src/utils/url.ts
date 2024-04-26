import { useMemo } from "react";
import { useSearchParams } from "react-router-dom"
import { cleanObject } from "utils";

// export const useUrlQueryParam = <K extends string>(keys:K[]) => {
//     const [searchParams, setSearchParams] = useSearchParams()
//     return [
//         keys.reduce((prev: K, key: K) => {
//             return {...prev, [key]: searchParams.get(key) || ''}
//         }, {} as {[key in K]: string }),
//         setSearchParams
//     ] as const 
 
//     // console.log(searchParams.get)
// }

export const useUrlQueryParam = <K extends string>(keys: K[]) => {
    const [searchParams, setSearchParams] = useSearchParams();
    // console.log(searchParams.get('name'))
     return [
        useMemo(()=> keys.reduce((prev: K|any, key: K) => {   
            return {...prev, [key]: searchParams.get(key) || ''}
        }, {} as { [key in K]: string }),
        //eslint-disable-next-line react-hooks/exhaustive-deps
        [searchParams]),
        (params:Partial<{[key in K]:unknown }>) => {
            const o = cleanObject({...Object.fromEntries(searchParams), ...params})
            setSearchParams(o)
        }
    ] as const 
 
    // console.log(searchParams.get)
    }

// const init = ['name', 100, {gender: 'male'}]








 