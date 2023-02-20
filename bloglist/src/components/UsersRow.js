import { Link } from 'react-router-dom'

const UsersRow = ({ user }) => {

  const columnStyle = {
    float: 'left',
    width: '20%',
  }

  return (
    <div>
      <div className='row'>
        <div className='column' style={columnStyle}>
          <Link to={`/users/${user.id}`}>{user.name}</Link>
        </div>
        <div className='column' style={columnStyle}>
          {user.blogs.length}
        </div>
        <br></br>
      </div>
    </div>
  )
}

export default UsersRow
