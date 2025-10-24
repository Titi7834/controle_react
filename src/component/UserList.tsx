import { useState, useEffect } from 'react'
import { getUsers } from '../data/data'
import User from '../model/user'
import UserCard from './UserCard'
import './UserList.css'
import Searchbar from './SearchBar'

function ListUser({ users, setUsers }: { users: User[] | null, setUsers: (ps: User[]) => void }) {
    const [error, setError] = useState<string | null>(null)
    const [filteredUsers, setFilteredUsers] = useState<User[] | null>(null);

    useEffect(() => {
        if (!users) {
            getUsers()
                .then(ps => {
                    setUsers(ps);
                    setFilteredUsers(ps);
                })
                .catch(err => setError(String(err)))
        } else {
            setFilteredUsers(users);
        }
    }, [users, setUsers])

    const handleSearch = (results: User[]) => {
        setFilteredUsers(results);
    };

    if (error) return <div>Erreur : {error}</div>
    if (!users || !filteredUsers) return <div>Chargement...</div>

    return (
        <>
            <h1>Users List</h1>
            <Searchbar users={users} onSearch={handleSearch}/>
            <div className="users-container">
                <UserCard users={filteredUsers} />
            </div>
        </>
    )
}

export default ListUser