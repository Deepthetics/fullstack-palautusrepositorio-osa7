import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import UsersRow from './UsersRow'
import { initializeUsers } from '../reducers/usersReducer'

const Users = () => {
  const dispatch = useDispatch()
  const users = useSelector(state => state.users)
  useEffect(() => {
    dispatch(initializeUsers())
  }, [])

  const columnStyle = {
    float: 'left',
    width: '20%',
  }

  return (
    <div>
      <h2>Users</h2>
      <div className='row'>
        <div className='column' style={columnStyle}>
          <p></p>
        </div>
        <div className='column' style={columnStyle}>
          <b>blogs created</b>
        </div>
        <br></br>
      </div>
      {users.map((user) => (
        <UsersRow
          key={user.id}
          user={user}
        />
      ))}
    </div>
  )
}

export default Users
