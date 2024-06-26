import React from 'react'
import * as qs from 'qs'
import {SearchPanel} from './search-panel'
import {List, Project} from './list'
import { useState,useEffect } from "react"
import { cleanObject, useDebounce, useDocumentTitle, useMount } from 'utils'
// import { useHttp } from 'utils/http'
import styled from '@emotion/styled'
import { Typography } from 'antd'
import { useAsync } from 'utils/use-async'
import { useProjects } from 'utils/project'
import { useUsers } from 'utils/user'
import { useUrlQueryParam } from 'utils/url'
import { useProjectSearchParams } from 'screens/project-list/utils'

const apiUrl = process.env.REACT_APP_URL



export const ProjectListScreen = (props:{
    projectButton: JSX.Element
}) => {
    useDocumentTitle('项目列表', false)
    // const [ users, setUsers] = useState([])
    // const [ , setParam ] = useState({
    //     name: '',
    //     personId: ''
    // })
    // const [ isLoading, setIsLoading ] = useState(false)
    // const [ error, setError ] = useState<null | Error>(null)
    // const [ list, setList ] = useState([])
    // const [param, setParam] = useUrlQueryParam(['name','personId'])
    // setParam({name:123})
    const [param, setParam] = useProjectSearchParams()
    // const debounceParam = useDebounce(param, 200)
    // console.log('debounceParam=',debounceParam)
    
    // const client = useHttp()
    const { isLoading, error, data:list, retry} = useProjects(useDebounce(param, 200)) 
    // console.log(useUrlQueryParam(['name']))
    // const {run, isLoading, error, data:list} = useAsync<Project[]>() 
    // useEffect(() => {
    //     fetch(`${apiUrl}/projests?${qs.stringify(cleanObject(param))}`).then(async response => {
    //         if(response.ok){
    //             setList(await response.json())
    //         }
    //     })
    // }, [param])
    // useEffect(() => {
        // run(client('projests',{data: cleanObject(debounceParam)}))
        // run(client('projests',{data: cleanObject(debounceParam)}))
        // setIsLoading(true)
        // client('projests',{data: cleanObject(debounceParam)}).then(setList).catch(err => {
        //     setList([])
        //     setError(err)
        // }).finally(()=>setIsLoading(false))
        // fetch(`${apiUrl}/projests?${qs.stringify(cleanObject(debounceParam))}`).then(async response => {
        //     if(response.ok){
        //         // console.log('await response.json()=',await response.json())
        //         setList(await response.json())
        //     }
        // })
    // }, [debounceParam])
    const {data:users} = useUsers()
    
    // useMount(() => {
    //     client('users').then(setUsers)
    //     // fetch(`${apiUrl}/users`).then(async response => {
    //     //     if(response.ok){
    //     //         setUsers(await response.json())
    //     //     }
    //     // })
    // })
    return <Container>
        <h1>项目列表</h1>
        {props.projectButton}
        <SearchPanel users={users || []} param={param} setParam={setParam} />
        {error? <Typography.Text type={'danger'}>{error.message}</Typography.Text>:null}
        {/* <List setProjectModalOpen={props.setProjectModalOpen} refresh={retry} loading={isLoading} users={users || []} dataSource={list || []}/> */}
        <List projectButton={props.projectButton} refresh={retry} loading={isLoading} users={users || []} dataSource={list || []}/>
    </Container>
}
const Container  = styled.div`
    padding: 3.2rem;

`