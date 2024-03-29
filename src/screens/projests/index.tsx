import React from 'react'
import * as qs from 'qs'
import {SearchPanel} from './search-panel'
import {List} from './list'
import { useState,useEffect } from "react"
import { cleanObject, useDebounce, useMount } from 'utils'
import { useHttp } from 'utils/http'

const apiUrl = process.env.REACT_APP_URL

export const ProjectListScreen = () => {
    const [ users, setUsers] = useState([])
    const [ param, setParam ] = useState({
        name: '',
        personId: ''
    })
    const debounceParam = useDebounce(param, 200)
    // console.log('debounceParam=',debounceParam)
    const [ list, setList ] = useState([])
    const client = useHttp()
    // useEffect(() => {
    //     fetch(`${apiUrl}/projests?${qs.stringify(cleanObject(param))}`).then(async response => {
    //         if(response.ok){
    //             setList(await response.json())
    //         }
    //     })
    // }, [param])
    useEffect(() => {
        client('projests',{data: cleanObject(debounceParam)}).then(setList)
        // fetch(`${apiUrl}/projests?${qs.stringify(cleanObject(debounceParam))}`).then(async response => {
        //     if(response.ok){
        //         // console.log('await response.json()=',await response.json())
        //         setList(await response.json())
        //     }
        // })
    }, [debounceParam])

    useMount(() => {
        client('users').then(setUsers)
        // fetch(`${apiUrl}/users`).then(async response => {
        //     if(response.ok){
        //         setUsers(await response.json())
        //     }
        // })
    })
    return <div>
        <SearchPanel users={users} param={param} setParam={setParam} />
        <List users={users} list={list}/>
    </div>
}