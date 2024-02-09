import { Button, Form, Input } from "antd"
import { useAuth } from "context/auth-context"
import { FormEvent } from "react"

const apiUrl = process.env.REACT_APP_URL

export const RegisterScreen = () => {
    const {register} = useAuth()
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
    const handleSubmit = (values:{username:string, password: string}) => {
        register(values)
    }
    return <Form onFinish={handleSubmit}>
        <Form.Item>
            {/* <label htmlFor="username">用户名</label> */}
            <Input placeholder={'用户名'} type="text" id={'username'} />
        </Form.Item>
        <Form.Item>
            {/* <label htmlFor="password">密码</label> */}
            <Input placeholder={'密码'} type="password" id={'password'} />
        </Form.Item>
        <Form.Item>
        <Button htmlType={'submit'} type={'primary'}>注册</Button>
        </Form.Item>
    </Form>
}