import { useParams, useNavigate } from 'react-router-dom'
import User from '../model/user'
import './UserDetail.css'

function DetailUser({ users }: { users: User[] | null }) {
    const { id } = useParams<{ id: string }>()
    const navigate = useNavigate()

    if (!users) return <div>Chargement...</div>
    const user = users.find(p => p.id === Number(id))
    if (!user) return <div>Utilisateur introuvable</div>

    return (
        <div className="user-detail">
            <h2>{user.firstname} {user.lastname}</h2>
            <button onClick={() => navigate(-1)} className="back-button">← Retour</button>
            <div className="user-content">
                <div className="user-image">
                    <img src={user.photo} alt={user.firstname} />
                </div>
                <div className="user-info">
                    <p className="company_name">Entreprise : {user.company_name}</p>
                    <p className="company_job">Poste : {user.company_job}</p>
                    <p className="age">Âge : {user.age} ans</p>
                    <p className="address">Ville de résidence : {user.city}</p>
                    <p className="bloodgroup">Groupe Sanguin : {user.bloodgroup}</p>
                    <p className="taille">Taille : {user.height} cm</p>
                </div>
            </div>
        </div>
    )
}

export default DetailUser