import { Table } from "antd";
import { User } from "./search-panel";
import { title } from "process";


interface Project {
    id: number;
    name: string;
    personId: number;
}

interface ListProps {
    users: User[];
    list: Project[]
}
export const List = ({list, users}:ListProps) => {
    // console.log('list=', list)
    // console.log('users=', users)
    return <Table pagination={false} columns={[
        {title:'名称',dataIndex:'name',sorter:(a,b)=>a.name.localeCompare(b.name)},
        {title:'负责人',render(value, project){
            return <span>
                {users.find(user => user.id === project.personId)?.name || '未知'}
            </span>
        }}
    ]} dataSource={list} >

    </Table>
    // return <table>
    //     <thead>
    //         <tr>
    //             <td>名称</td>
    //             <td>负责人</td>
    //         </tr>
    //     </thead>
    //     <tbody>
    //         {
    //             list.map(project => <tr key={project.id}>
    //                 <td>{project.name}</td>
    //                 <td>{users.find(user => user.id === project.personId)?.name || '未知'}</td>
    //             </tr>)
    //         }
    //     </tbody>
    // </table>
}