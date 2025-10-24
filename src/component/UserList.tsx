import { useState, useEffect } from 'react'
import { getUsers } from '../data/data'
import User from '../model/user'
import UserCard from './UserCard'
import './UserList.css'

function ListUser({ users, setUsers }: { users: User[] | null, setUsers: (ps: User[]) => void }) {
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        if (!users) {
            getUsers()
                .then(ps => setUsers(ps))
                .catch(err => setError(String(err)))
        }
    }, [users, setUsers])

    if (error) return <div>Erreur : {error}</div>
    if (!users) return <div>Chargement...</div>

    return (
        <>
            <h1>Users List</h1>
            <UserCard users={users} />
        </>
    )
}

export default ListUser