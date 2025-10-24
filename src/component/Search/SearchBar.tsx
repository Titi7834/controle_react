import { useState } from 'react'
import User from '../../model/user'
import './SearchBar.css'

interface SearchBarProps {
    users: User[] | null;
    onSearch: (filteredUsers: User[]) => void;
    sortOrder: string;
    onSortChange: (sortOrder: string) => void;
}

function Searchbar({ users, onSearch, sortOrder, onSortChange }: SearchBarProps) {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchTerm(value);

        if (!users) return;

        const filteredUsers = users.filter((user) =>
            user.firstname.toLowerCase().includes(value.toLowerCase()) ||
            user.lastname.toLowerCase().includes(value.toLowerCase()) ||
            (user.email && user.email.toLowerCase().includes(value.toLowerCase()))
        );

        onSearch(filteredUsers);
    };

    return (
        <div className="search-container">
            <input
                type="text"
                name="searchbar"
                id="searchbar"
                value={searchTerm}
                placeholder="Recherchez (nom, prénom, email)"
                onChange={handleSearch}
                className="search-input"
                aria-label="Recherche utilisateur"
            />

            <label htmlFor="sortSelect" className="sr-only">Trier</label>
            <select
                id="sortSelect"
                value={sortOrder}
                onChange={(e) => onSortChange(e.target.value)}
                className="sort-select"
            >
                <option value="name:asc">Nom (A → Z)</option>
                <option value="name:desc">Nom (Z → A)</option>
                <option value="age:asc">Âge (↑)</option>
                <option value="age:desc">Âge (↓)</option>
                <option value="fav:first">Favoris d'abord</option>
            </select>
        </div>
    );
}

export default Searchbar