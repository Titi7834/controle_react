import { useState, useEffect } from 'react'
import { getUsers } from '../data/data'
import User from '../model/user'
import UserCard from './UserCard'
import './UserList.css'
import Searchbar from './SearchBar'

function ListUser({ users, setUsers }: { users: User[] | null, setUsers: (ps: User[]) => void }) {
    const [error, setError] = useState<string | null>(null)
    const [filteredUsers, setFilteredUsers] = useState<User[] | null>(null);
    const [sortOrder, setSortOrder] = useState('name');
    const [currentPage, setCurrentPage] = useState(1);
    const usersPerPage = 10;

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
        setCurrentPage(1); // Reset to first page when searching
    };

    const handleSort = (order: string) => {
        setSortOrder(order);
        if (!filteredUsers) return;

        const sorted = [...filteredUsers].sort((a, b) => {
            if (order === 'name') {
                return `${a.firstname} ${a.lastname}`.localeCompare(`${b.firstname} ${b.lastname}`);
            } else {
                return a.age - b.age;
            }
        });
        setFilteredUsers(sorted);
    };

    // Pagination logic
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = filteredUsers ? filteredUsers.slice(indexOfFirstUser, indexOfLastUser) : [];
    const totalPages = filteredUsers ? Math.ceil(filteredUsers.length / usersPerPage) : 0;

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    if (error) return <div>Erreur : {error}</div>
    if (!users || !filteredUsers) return <div>Chargement...</div>

    return (
        <>
            <h1>Users List</h1>
            <Searchbar 
                users={users} 
                onSearch={handleSearch}
                sortOrder={sortOrder}
                onSortChange={handleSort}
            />
            <div className="users-container">
                <UserCard users={currentUsers} />
            </div>
            <div className="pagination">
                {Array.from({ length: totalPages }, (_, i) => (
                    <button
                        key={i + 1}
                        onClick={() => paginate(i + 1)}
                        className={`page-button ${currentPage === i + 1 ? 'active' : ''}`}
                    >
                        {i + 1}
                    </button>
                ))}
            </div>
        </>
    )
}

export default ListUser