import { useAuth } from "context/auth-context"
import { FormEvent } from "react"
import { Button, Form, Input } from 'antd';
import { LongButton } from 'unauthenicated-app/index'
import { useAsync } from "utils/use-async";

const apiUrl = process.env.REACT_APP_URL

export const LoginScreen = ({onError}:{onError:(error:Error)=>void}) => {
    const {login, user} = useAuth()
    const {run, isLoading, error } = useAsync(undefined, {throwOnError: true})  
    // const login = (param:{username:string, password:string}) => {
    //     fetch(`${apiUrl}/login`, { method: 'POST', headers: { 'Content-Type':'application/json' }, body: JSON.stringify(param) }).then(async response => {
    //         if(response.ok){
    //             // setList(await response.json())
    //         }
    //     })
    // }


    const handleSubmit = async (values:{username:string, password: string}) => {
        console.log('values=',values)
        // event.preventDefault()
        // const username = ( event.currentTarget.elements[0] as HTMLInputElement ).value
        // const password = ( event.currentTarget.elements[1] as HTMLInputElement ).value
        // login({username, password})
        try{
          await run(login(values))
        }catch(e:any){
            console.log(123)
            onError(e)
        }
    }
    return <Form onFinish={handleSubmit}>
               {/* {error?.message} */}

        {
            user? <div> 登录成功，用户名：{user?.name} {user.token}</div>
            : null
        }
       
        <Form.Item name={'username'} rules={[{ required: true, message: '请输入用户名' }]}>
            <Input placeholder={'用户名'} type="text"/>
            {/* <label htmlFor="username">用户名</label> */}
            {/* <Input placeholder={'用户名'} type="text" id={'username'} /> */}
        </Form.Item>
        <Form.Item name={'password'} rules={[{required:true, message: '请输入密码'}]}>
            <Input placeholder={'密码'} type="password" />
        </Form.Item>
        <Form.Item>
        <LongButton loading={isLoading} htmlType={'submit'} type={'primary'}>登录</LongButton>
        </Form.Item>
        
    </Form>
}