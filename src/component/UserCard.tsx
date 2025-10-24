import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FavoritesService } from './Favorite';
import { useTheme } from './Theme';
import User from '../model/user';
import './UserCard.css'

function UserCard({ user }: { user: User }) {
    const [isFavorite, setIsFavorite] = useState(() => FavoritesService.isFavorite(user.id));
    const { theme } = useTheme();

    const handleFavorite = (e: React.MouseEvent) => {
        e.preventDefault();
        setIsFavorite(!isFavorite);
        FavoritesService.toggleFavorite(user.id);
    };

    return (
        <div className={`cardUser ${theme}`}>
            <Link to={`/detail/${user.id}`} className="card-link">
                <div className="card-content">
                    <span 
                        className={`favorite-star ${isFavorite ? 'active' : ''}`}
                        onClick={handleFavorite}
                    >
                        {isFavorite ? '★' : '☆'}
                    </span>
                    <img src={user.photo} alt={`${user.firstname} ${user.lastname}`} />
                    <h3>{user.firstname} {user.lastname}</h3>
                    <p>{user.email}</p>
                </div>
            </Link>
        </div>
    );
}

export default UserCard;