import { useState } from 'react'
import ListUser from './component/UserList'
import User from './model/user'
import DetailUser from './component/UserDetail'
import './App.css'
import { Routes, Route } from 'react-router-dom'

function App() {
      const [users, setUsers] = useState<User[] | null>(null)

  return (
    <>
      <Routes>
        <Route path="/" element={<ListUser users={users} setUsers={setUsers} />} />
        <Route path="/detail/:id" element={<DetailUser users={users} />} />
      </Routes>
    </>
  )
}

export default App
