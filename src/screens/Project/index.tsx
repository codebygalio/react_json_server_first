import React from 'react'
import { Link, Navigate, Route, Routes } from 'react-router-dom'
import { EpicScreen } from 'screens/Epic'
import { KanbanScreen } from 'screens/Kanban'

export const ProjectScreen = () => {
    return <div>
        <h1>ProjectScreen</h1>
        <Link to={'kanban'}>看板</Link>
        <Link to={'epic'}>任务组</Link>
        <Routes>
            <Route path={'kanban'} element={<KanbanScreen />} />
            <Route path={'epic'} element={<EpicScreen />} />
            <Route path={'/'} element={<Navigate to={'kanban'}/>} />
            {/* <Route index element={<KanbanScreen />} /> */}
        </Routes> 
    </div>
}