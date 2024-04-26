import { useAuth } from 'context/auth-context';
import qs from 'qs'
import * as auth from 'utils/auth-provider'

const apiUrl = process.env.REACT_APP_URL

interface Config extends RequestInit{
    token?: string;
    data?: object;
}

export const http = async (endpoint: string, {data, token, headers, ...customConfig}:Config = {}) => {
    const config = {
        method: 'get',
        headers: {
            Authorization: token? `'Bearer ${token}` : '',
            'Content-Type': data? 'application/json' : '',           
        },
        ...customConfig
    }
    if(config.method.toLocaleUpperCase() === 'GET'){
        endpoint += `?${qs.stringify(data)}`
    }else{
        config.body = JSON.stringify(data || {})
    }
return window.fetch(`${apiUrl}/${endpoint}`, config).then(async (Response:Response) => {
    if(Response.status === 401){
        await auth.logout()
        window.location.reload()
        return Promise.reject({message: '请重新登录'})
    }
    const data = await Response.json()
    if(Response.ok){
        return data
    }else{
        return Promise.reject(data)
    }
})
}

export const useHttp = () => {
    const {user} = useAuth()
    return (...[endpoint, config]: Parameters<typeof http>) => http(endpoint, {...config, token: user?.token})
}
// export const useHttp = async(...[endpoint, config]: Parameters<typeof http>) => {
//     const {user} = useAuth()
//     return http(endpoint, {...config, token: user?.token})
// }

