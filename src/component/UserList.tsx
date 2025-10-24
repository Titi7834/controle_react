import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import 'react-toastify/dist/ReactToastify.css'
import { getUsers } from '../data/data'
import User from '../model/user'
import UserCard from './UserCard/UserCard'
import './UserList.css'
import Searchbar from './Search/SearchBar'
import LoadingSpinner from './Load/Loading'
import { FavoritesService } from './Favorite/Favorite'
import { ThemeProvider } from './Theme/Theme'
import ThemeToggle from './Theme/ThemeToggle'

function UserList({ users, setUsers }: { users: User[] | null, setUsers: (ps: User[]) => void }) {
    const [error, setError] = useState<string | null>(null)
    const [filteredUsers, setFilteredUsers] = useState<User[] | null>(null);
    const [sortOrder, setSortOrder] = useState('name:asc');
    const [currentPage, setCurrentPage] = useState(1);
    const usersPerPage = 10;
    const [loading, setLoading] = useState(false);

    // util: tri selon ordre
    const sortUsers = (arr: User[], order: string): User[] => {
        if (!arr) return arr;
        if (order === 'fav:first') {
            const favs = FavoritesService.getFavorites();
            return [...arr].sort((a, b) => {
                const ai = favs.includes(a.id) ? 0 : 1;
                const bi = favs.includes(b.id) ? 0 : 1;
                if (ai !== bi) return ai - bi;
                return `${a.firstname} ${a.lastname}`.localeCompare(`${b.firstname} ${b.lastname}`);
            });
        }
        const [key, dir] = order.split(':');
        const multiplier = dir === 'desc' ? -1 : 1;
        return [...arr].sort((a: any, b: any) => {
            if (key === 'name') {
                return `${a.firstname} ${a.lastname}`.localeCompare(`${b.firstname} ${b.lastname}`) * multiplier;
            }
            if (key === 'age') {
                return (a.age - b.age) * multiplier;
            }
            return 0;
        });
    }

    useEffect(() => {
        let mounted = true;
        if (!users) {
            setLoading(true);
            getUsers()
                .then(ps => {
                    if (!mounted) return;
                    setUsers(ps);
                    setFilteredUsers(sortUsers(ps, sortOrder));
                })
                .catch(err => setError(String(err)))
                .finally(() => { if (mounted) setLoading(false) });
        } else {
            setFilteredUsers(sortUsers(users, sortOrder));
        }
        return () => { mounted = false; }
    }, [users, setUsers]) // eslint-disable-line

    // gestion recherche depuis Searchbar
    const handleSearch = (results: User[]) => {
        const sorted = sortUsers(results, sortOrder);
        setFilteredUsers(sorted);
        setCurrentPage(1);
    };

    // changement de tri
    const handleSort = (order: string) => {
        setSortOrder(order);
        if (!filteredUsers) return;
        const sorted = sortUsers(filteredUsers, order);
        setFilteredUsers(sorted);
        setCurrentPage(1);
    };

    // Pagination
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = filteredUsers ? filteredUsers.slice(indexOfFirstUser, indexOfLastUser) : [];
    const totalPages = filteredUsers ? Math.ceil(filteredUsers.length / usersPerPage) : 0;
    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    if (error) return <div>Erreur : {error}<br /><br /><Link to={'/'}><button >RAFRAICHIR</button></Link></div>
    if (loading) return <LoadingSpinner />
    if (!users || !filteredUsers) return <div>Chargement...</div>

    return (
        <>
            <ThemeProvider>
                <h1>Users List</h1>
                <ThemeToggle />
                <Searchbar
                    users={users}
                    onSearch={handleSearch}
                    sortOrder={sortOrder}
                    onSortChange={handleSort}
                />

                <div className="users-container">
                    {currentUsers.map(user => (
                        <UserCard user={user} key={user.id} />
                    ))}
                    <Toaster
                        position="top-center"
                        reverseOrder={false}
                        gutter={8}
                        containerClassName=""
                        containerStyle={{}}
                        toasterId="default"
                        toastOptions={{
                            // Define default options
                            className: '',
                            duration: 5000,
                            removeDelay: 1000,
                            style: {
                                background: '#363636',
                                color: '#fff',
                            },

                            // Default options for specific types
                            success: {
                                duration: 3000,
                                iconTheme: {
                                    primary: 'green',
                                    secondary: 'black',
                                },
                            },
                        }}
                    />
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
            </ThemeProvider>
        </>
    )
}

export default UserList