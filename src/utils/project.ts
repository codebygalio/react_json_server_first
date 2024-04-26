import { useAsync } from "./use-async"
import { Project } from "screens/projests/list"
import { useEffect } from "react"
import { cleanObject } from "utils"
import { useHttp } from "./http"

export const useProjects = (params?: Partial<Project>) => { 
    const {run, ...result} = useAsync<Project[]>() 
    const client = useHttp()
    const fetchProjects = () => client('projests',{data: cleanObject(params|| {})}) 
    useEffect(() => {
        run(fetchProjects(), {retry: fetchProjects})
    }, [params])
    return result
}

export const useEditProject = () => {
    const { run, ...asyncRsult } = useAsync()
    const client = useHttp()
    const mutate = (params: Partial<Project>) => {
        return run(client(`projests/${params.id}`,{data: params, method: 'PATCH'}))
    }
    return {mutate, ...asyncRsult}
}

export const useAddProject = () => {
    const { run, ...asyncRsult } = useAsync()
    const client = useHttp()
    const mutate = (params: Partial<Project>) => {
        return run(client(`projests/${params.id}`,{data: params, method: 'POST'}))
    }
    return {mutate, ...asyncRsult}
}

// export const useProjects = <Project>(params?: Project) => {
//     const {run, ...result} = useAsync<Project[]>() 
//     const client = useHttp()
//     useEffect(() => {

//         run(client('projests',{data: cleanObject(params|| {})}))
        
//     }, [params])
//     return result
// }