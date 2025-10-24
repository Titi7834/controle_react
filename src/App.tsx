import { useState } from 'react'
import ListUser from './component/UserList'
import User from './model/user'
import './App.css'

function App() {
      const [users, setUsers] = useState<User[] | null>(null)

  return (
    <>
      <ListUser users={users} setUsers={setUsers}/>
    </>
  )
}

export default App
