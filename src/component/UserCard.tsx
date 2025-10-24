import { Link } from 'react-router-dom'
import User from '../model/user'

function UserCard({ users }: { users: User[] }) {
    return (
        <>
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

export default UserCard