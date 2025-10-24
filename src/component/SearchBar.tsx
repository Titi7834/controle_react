import { useState } from 'react'
import './SearchBar.css'
import User from '../model/user'

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
            user.email.toLowerCase().includes(value.toLowerCase())
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
                placeholder="Recherchez ici (nom, prénom, email)" 
                onChange={handleSearch}
                className="search-input"
            />
            <select 
                value={sortOrder} 
                onChange={(e) => onSortChange(e.target.value)}
                className="sort-select"
            >
                <option value="name">Trier par nom</option>
                <option value="age">Trier par âge</option>
            </select>
        </div>
    );
}

export default Searchbar