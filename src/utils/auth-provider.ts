import { User } from "screens/projests/search-panel"

const localStorageKey = '_auth_provider_token__'
const apiUrl = process.env.REACT_APP_URL

export const getToken = () => window.localStorage.getItem(localStorageKey)

export const handleUserResponse = ({user}:{user:User}) => {
    window.localStorage.setItem(localStorageKey, user.token || '')
    return user
}

export const login = (data:{username:string, password:string}) => {
    return fetch(`${apiUrl}/login`, { method: 'POST', headers: { 'Content-Type':'application/json' }, body: JSON.stringify(data) }).then(async (response:Response) => {
        if(response.ok){
            // setList(await response.json())
            return handleUserResponse(await response.json())
        }else{
            return Promise.reject(await response.json())
        }
    })
}

export const register = (data:{username:string, password:string}) => {
   return fetch(`${apiUrl}/register`, { method: 'POST', headers: { 'Content-Type':'application/json' }, body: JSON.stringify(data) }).then(async response => {
        if(response.ok){
            // setList(await response.json())
            return handleUserResponse(await response.json())
        }else{
            return Promise.reject(await response.json())
        }
    })
}

export const logout = async() => window.localStorage.removeItem(localStorageKey)