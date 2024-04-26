import { useCallback, useReducer, useState } from "react"

const UNDO = 'UNDO'
const REDO = 'REDO'
const SET = 'SET'
const RESET = 'RESET'

type State<T> = {
    past: T[],
    present: T,
    future: T[]
}

type Action<T> = { 
    newPresent?: T,
    type: typeof UNDO | typeof REDO | typeof SET | typeof RESET
}

const undoReducer = <T>(state: State<T>, action: Action<T>) => {
    const {past, present, future} = state
    const {newPresent} = action

    switch(action.type) {
        case UNDO: {
                if(past.length === 0) return state
                // if(!canUndo) return;
            const previous = past[past.length - 1]
            const newPast = past.slice(0, past.length - 1)
            return {
                past: newPast,
                present: previous,
                future: [present, ...future]
            }
           
        }
        case REDO: {
            if(future.length === 0 ) return state
            // if(!canRedo) return 
        const next = future[0]
        const newFuture = future.slice(1)
        return {
            past: [...past, present],
            present: next,
            future: newFuture
        }
        }
        case SET: {
            if(newPresent === present) {
                return state
            }
            return {
                past: [...past, present],
                present: newPresent,
                future: []
            }
        }
        case RESET: {
            return {
                past: [],
                present: newPresent,
                future: []
            }
        }
    }
    return state
}
 
export const useUndo = <T>(initialPresent: T) => {
    const [state, dispatch] = useReducer(undoReducer, {
        past: [],
        present: initialPresent,
        future: [],
    } as State<T> )
    // const [past, setPast] = useState<T[]>([])
    // const [present, setPresent] = useState(initialPresent)
    // const [future, setFuture] = useState<T[]>([])

   
    // const [state, setState] = useState<{
    //     past: T[],
    //     present: T,
    //     future: T[]
    // }>({
    //     past: [],
    //     present: initialPresent,
    //     future: []
    // })
    // const [state, setState] = useState({
    //     past: [] as T[],
    //     present: initialPresent,
    //     future: []
    // })

    const canUndo = state.past.length !== 0
    const canRedo = state.future.length !== 0

    const undo = useCallback(() => dispatch({type: UNDO}),[])
    const redo = useCallback(() => dispatch({type: REDO}),[])
    const set = useCallback((newPresent:T) => dispatch({type: SET, newPresent}),[])
    const reset = useCallback((newPresent:T) => dispatch({type: RESET, newPresent}),[])
    // const canUndo = past.length !== 0
    // const canRedo = future.length !== 0


    // const undo = useCallback(() => {
    //     if(!canUndo) return 
    //     const previous = past[past.length - 1]
    //     const newPast = past.slice(0, past.length - 1)
    //     setPast(newPast)
    //     setPresent(previous)
    //     setFuture([present, ...future])
    // }, [])
    // const undo = () => {
    //     if(!canUndo) return 
    //     const previous = past[past.length - 1]
    //     const newPast = past.slice(0, past.length - 1)
    //     setPast(newPast)
    //     setPresent(previous)
    //     setFuture([present, ...future])
    // }


    /*
    const redo = () => {
        if(!canRedo) return 
        const next = future[0]
        const newFuture = future.slice(1)
        setPast([...past, present])
        setPresent(next)
        setFuture(newFuture)
    }
    */

    /*
    const set = (newPresent: T) => {
        if(newPresent === present) {
            return
        }
        // if(newPresent !== present)
        setPast([...past, present])
        setPresent(newPresent)
        setFuture([])
    }
    */

    
    // if(newPresent !== present)
    // setPast([...past, present])
    // setPresent(newPresent)
    // setFuture([])
 
   /*
    const reset = (newPresent: T) => {
        setPast([])
        setPresent(newPresent)
        setFuture([])
    }
    */
    return [
        state,
        {set, reset, undo, redo, canUndo, canRedo}
    ] as const;
    // return [
    //     {past, present, future},
    //     {set, reset, undo, redo, canUndo, canRedo}
    // ] as const;
}