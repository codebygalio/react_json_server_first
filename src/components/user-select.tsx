import React from 'react'
import { useUsers } from "utils/user"
import { IdSelect } from "./IdSelect"

export const UserSelect = (props: React.ComponentProps<typeof IdSelect>) => {
    const { data: users } = useUsers()
    return <IdSelect options={users || []} {...props} />
}