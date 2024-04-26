import { useEffect, useState } from "react"
import { useHttp } from "./http"
import { User } from "screens/projests/search-panel"


export const useUsers = () => {
    const [data,setData] = useState<User[]|[]>([])
    const client = useHttp()
    useEffect( () => {
        client('users').then(setData)
        // eslint-disable-next-line
    },[])
    return {data}
}