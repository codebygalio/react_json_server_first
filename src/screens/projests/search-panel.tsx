import { Form, Input, Select } from "antd";
import { Project } from "./list";
import { UserSelect } from "components/user-select";

export interface User {
    id: number;
    name: string;
    organization: string;
    token: string;
}

interface SearchPanelProps {
    users: User[];
    param: Partial<Pick<Project, 'name' | 'personId'>>;
    // param: {
    //     name: string;
    //     personId: string;
    // },
    setParam: (param:SearchPanelProps['param']) => void
}

export const SearchPanel = ({users,param, setParam}:SearchPanelProps) => {
    
    // const state = useState({
    //     name: '',
    //     personId: ''
    // })
    // console.log('typeOf=', state )
    return <Form layout={"inline"} style={{marginBottom:'2rem'}}>
        <Form.Item>
            <Input placeholder="项目名" type="text" value={param.name} onChange={evt => setParam({
                ...param,
                name: evt.target.value
            })} />
            </Form.Item>
            <Form.Item>
                <UserSelect 
                defaultOptionName={'负责人'}
                value={param.personId}
                onChange={value => setParam({
                ...param,
                personId: value
            })}/>
            {/* <Select value={param.personId} >
                <Select.Option value="">负责人</Select.Option>
                {
                    users.map(user => <Select.Option value={String(user.id)} key={user.id}>{user.name}</Select.Option>)
                }
            </Select> */}
            </Form.Item>
    </Form>
    // return <form>
    //     <div>
    //         <input type="text" value={param.name} onChange={evt => setParam({
    //             ...param,
    //             name: evt.target.value
    //         })} />
    //         <select value={param.personId} onChange={evt => setParam({
    //             ...param,
    //             personId: evt.target.value
    //         })}>
    //             <option value="">负责人</option>
    //             {
    //                 users.map(user => <option value={user.id} key={user.id}>{user.name}</option>)
    //             }
    //         </select>
    //     </div>
    // </form>
}