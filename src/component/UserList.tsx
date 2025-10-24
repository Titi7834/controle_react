import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getUsers } from '../data/data'
import User from '../model/user'
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
            <div className="card">
                {users.map(user => (
                    <Link
                        to={`/detail/${user.id}`}
                        key={user.id}
                        style={{ textDecoration: 'none', color: 'inherit' }}
                    >
                        <div className="cardUser" style={{ cursor: 'pointer' }}>
                            <span className="name">{user.firstname} {user.lastname}</span>
                            <img src={user.photo} alt="image produit" />
                            <span className="email">E-mail : {user.email}</span>
                        </div>
                    </Link>
                ))}
            </div>
        </>
    )
}

export default ListUser