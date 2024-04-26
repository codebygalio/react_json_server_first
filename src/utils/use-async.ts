import { useCallback, useReducer, useRef, useState } from "react";
import { useMountedRef } from "utils";


interface State<D> {
    error: Error | null;
    data: D | null;
    stat: 'idle' | 'loading' | 'error' | 'success'
}
// interface State<D> {
//     error: Error | null;
//     data: D | null;
//     stat: 'idle' | 'loading' | 'error' | 'success'
// }
const defaultInitialState:State<null> = {
    stat: 'idle',
    data: null,
    error: null
}
const defaultConfig = {
    throwOnError: false
}

const useSafeDispatch = <T>(dispatch: (args:T)=>void) => {
    const mountedRef = useMountedRef()
    return useCallback((args:T)=>{
        return dispatch(args)
    }, [dispatch, mountedRef])
}

// const useSafeDispatch = <T>(dispatch: (args:T)=>void) => {
//     const mountedRef = useMountedRef()
//     return useCallback((args:T)=>{
//         return (mountedRef.current ? dispatch(args): void 0)
//     }, [dispatch, mountedRef])
// }
// const useSafeDispatch = <T>(dispatch: (...args:T[])=>void) => {
//     const mountedRef = useMountedRef()
//     return useCallback((...args:T[])=>{
//         return (mountedRef.current ? dispatch(...args): void 0)
//     }, [dispatch, mountedRef])
// }

export const useAsync = <D>(initialState?:State<D>, initialConfig?:typeof defaultConfig) => {
    const config = {...defaultConfig, ...initialConfig}

    const [state, dispatch] = useReducer((state:State<D>, action:Partial<State<D>>)=>({...state, ...action}),{
        ...defaultInitialState,
        ...initialState
    })
    // const safeDispatch = useSafeDispatch(dispatch)
    const retry = useRef(() =>{})
    const setData = (data: D) => dispatch({
        data,
        stat: 'success',
        error: null
    })
    const setError = (error: Error) => dispatch({
        error,
        stat: 'error',
        data: null
    })
    const run = (promise: Promise<D>, runConfig?:{retry: () => Promise<D>}) => {
        if(!promise || !promise.then){
            throw new Error('请传入 Promise 类型数据')
        }
            retry.current = () => {
                if(runConfig?.retry){
                    run(runConfig?.retry(), runConfig)
                }
            }
            dispatch({stat: 'loading'})
        // dispatch({...state, stat: 'loading'})
         return promise.then(data => {
            setData(data)
            return data
        }).catch(error => {
            setError(error)
            // console.log('config.throwOnError=',config.throwOnError)
            if(config.throwOnError)return Promise.reject(error)
            return error
            
        })
    }
    // const retry = () => {
    //     run()
    // }
    return {
        isIdle: state.stat === 'idle',
        isLoading: state.stat === 'loading',
        isError: state.stat === 'error',
        isSuccess: state.stat === 'success',
        run,
        setData,
        setError,
        retry:retry.current,
        ...state
    }
}