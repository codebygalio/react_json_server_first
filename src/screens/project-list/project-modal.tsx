import { Button, Drawer } from 'antd'
import React from 'react'

interface ProjectModalProps {
    projectModalOpen: boolean,
    onClose: () => void
}

export const ProjectModal = ({projectModalOpen,onClose}:ProjectModalProps) => {
    return <Drawer onClose={onClose} open={projectModalOpen} width={'100%'}>
        <h1>Project Modal</h1>
        <Button onClick={onClose}>关闭</Button>
    </Drawer>
}