import { Divider, Dropdown, Table, TableProps } from "antd";
import { User } from "./search-panel";
import { title } from "process";
import dayjs, { extend } from "dayjs";
import { Link } from "react-router-dom";
import { Pin } from "components/pin";
import { useEditProject } from "utils/project";
import { ButtonNoPadding } from "components/lib";


export interface Project {
    id: string;
    name: string;
    personId: number;
    organization: string;
    created: string;
    pin: boolean;
}

// interface ListProps {
//     users: User[];
//     list: Project[]
// }
interface ListProps extends TableProps<Project> {
    users: User[];
    refresh?: () => void;
    projectButton: JSX.Element;
    // setProjectModalOpen: (isOpen:boolean) => void;
}
export const List = ({ users, ...props }:ListProps,refresh?:()=>void) => {
    // console.log('list=', list)
    // console.log('users=', users)
    const {mutate} = useEditProject()
    const pinProject = (id: string) => (pin: boolean) => mutate({id, pin}).then(props.refresh)
    // const items = [{label: <ButtonNoPadding type={'link'} onClick={()=> props.setProjectModalOpen(true)}>编辑</ButtonNoPadding>, key: 'edit'}]
    const items = [{label: props.projectButton, key: 'edit'}]
    return <Table pagination={false} columns={[
        {title: <Pin checked={true} disabled={true} />,
        render(value, project){
            return <Pin checked={project.pin} onCheckedChange={pinProject(project.id)}  />
        } },
        {title:'名称',sorter:(a,b)=>a.name.localeCompare(b.name), render(value, project){
            // return <div>测试</div>
            return <Link to={project.id}>{project.name}</Link>
        }},
        {title:'部门',dataIndex:'organization'},
        {title:'负责人',render(value, project){
            return <span>
                {users.find(user => user.id === project.personId)?.name || '未知'}
            </span>
        }},
        {title:'创建时间', render(value, project){
            return <span>{project.created ? dayjs(project.created).format('YYYY-MM-DD'): '无'}</span>
        }},
        {
            render(value, project){
                return <Dropdown menu={{items}}><ButtonNoPadding type={'link'}>...</ButtonNoPadding></Dropdown>
            }
        }
    ]}  {...props} rowKey={'created'} >

    </Table>
    // return <Table pagination={false} columns={[
    //     {title:'名称',dataIndex:'name',sorter:(a,b)=>a.name.localeCompare(b.name)},
    //     {title:'部门',dataIndex:'organization'},
    //     {title:'负责人',render(value, project){
    //         return <span>
    //             {users.find(user => user.id === project.personId)?.name || '未知'}
    //         </span>
    //     }},
    //     {title:'创建时间', render(value, project){
    //         return <span>{project.created ? dayjs(project.created).format('YYYY-MM-DD'): '无'}</span>
    //     }}
    // ]} dataSource={list} rowKey={'created'} >

    // </Table>
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