import { User } from "./search-panel";


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
    return <table>
        <thead>
            <tr>
                <td>名称</td>
                <td>负责人</td>
            </tr>
        </thead>
        <tbody>
            {
                list.map(project => <tr key={project.id}>
                    <td>{project.name}</td>
                    <td>{users.find(user => user.id === project.personId)?.name || '未知'}</td>
                </tr>)
            }
        </tbody>
    </table>
}