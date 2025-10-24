import { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast'
import { FavoritesService } from '../Favorite/Favorite';
import { useTheme } from '../Theme/Theme';
import User from '../../model/user';
import './UserCard.css'

function UserCard({ user }: { user: User }) {
    const [isFavorite, setIsFavorite] = useState(() => FavoritesService.isFavorite(user.id));
    const { theme } = useTheme();

    const handleFavorite = (e: React.MouseEvent) => {
        e.preventDefault();
        const newFav = !isFavorite
        setIsFavorite(newFav);
        FavoritesService.toggleFavorite(user.id);
        if (newFav) {
            toast.success(`${user.firstname} ajouté aux favoris`);
        } else {
            toast.error(`${user.firstname} retiré des favoris`);
        }
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