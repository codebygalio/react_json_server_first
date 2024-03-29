import { Input, Select } from "antd";

export interface User {
    id: number;
    name: string;
    organization: string;
    token: string;
}

interface SearchPanelProps {
    users: User[];
    param: {
        name: string;
        personId: string;
    },
    setParam: (param:SearchPanelProps['param']) => void
}

export const SearchPanel = ({users,param, setParam}:SearchPanelProps) => {
    
    
    // const state = useState({
    //     name: '',
    //     personId: ''
    // })
    // console.log('typeOf=', state )
    return <form>
        <div>
            <Input type="text" value={param.name} onChange={evt => setParam({
                ...param,
                name: evt.target.value
            })} />
            <Select value={param.personId} onChange={value => setParam({
                ...param,
                personId: value
            })}>
                <Select.Option value="">负责人</Select.Option>
                {
                    users.map(user => <Select.Option value={user.id} key={user.id}>{user.name}</Select.Option>)
                }
            </Select>
        </div>
    </form>
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