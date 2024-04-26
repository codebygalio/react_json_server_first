import { Button, Form, Input } from "antd"
import { useAuth } from "context/auth-context"
import { FormEvent } from "react"
import { LongButton } from 'unauthenicated-app/index'
import { useAsync } from "utils/use-async"


const apiUrl = process.env.REACT_APP_URL

export const RegisterScreen = ({onError}:{onError:(error:Error)=>void}) => {
    const {register, user} = useAuth()
    const {run, isLoading, error } = useAsync(undefined, {throwOnError: true}) 
    // const login = (param:{username:string, password:string}) => {
    //     fetch(`${apiUrl}/login`, { method: 'POST', headers: { 'Content-Type':'application/json' }, body: JSON.stringify(param) }).then(async response => {
    //         if(response.ok){
    //             // setList(await response.json())
    //         }
    //     })
    // }

    // const handleSubmit = (event:FormEvent<HTMLFormElement>) => {
    //     event.preventDefault()
    //     const username = ( event.currentTarget.elements[0] as HTMLInputElement ).value
    //     const password = ( event.currentTarget.elements[1] as HTMLInputElement ).value
    //     register({username, password})
    // }
    const handleSubmit = async({cpassword,...values}:{username:string, password: string, cpassword:string}) => {
        if(cpassword !== values.password){
            onError(new Error('请确认两次密码的密码相同'))
            return
        }
        try {
            await run(register(values))
            
        }catch(e:any){
            onError(e)
        }
    }
    
    return <Form onFinish={handleSubmit}>
        {/* {error?.message} */}
        <Form.Item name={'username'} rules={[{ required: true, message: '请输入用户名' }]}>
            {/* <label htmlFor="username">用户名</label> */}
            <Input placeholder={'用户名'} type="text" id={'username'} />
        </Form.Item>
        <Form.Item name={'password'} rules={[{required:true, message: '请输入密码'}]}>
            {/* <label htmlFor="password">密码</label> */}
            <Input placeholder={'密码'} type="password" id={'password'} />
        </Form.Item>
        <Form.Item name={'cpassword'} rules={[{required:true, message: '请确认密码'}]}>
            <Input placeholder={'确认密码'} type="password" id={'cpassword'} />
        </Form.Item>
        <Form.Item>
        <LongButton loading={isLoading} htmlType={'submit'} type={'primary'}>注册</LongButton>
        </Form.Item>
    </Form>
}