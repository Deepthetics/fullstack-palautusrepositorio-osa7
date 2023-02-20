import { useEffect } from 'react'
import { Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { initializeBlogs } from '../reducers/blogsReducer'

const Bloglist = () => {
  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)
  useEffect(() => {
    dispatch(initializeBlogs())
  }, [])

  const sortedBlogs = () => {
    return [].concat(blogs).sort((a, b) => b.likes - a.likes)
  }

  return (
    <div>
      <Table striped variant='dark'>
        <tbody>
          {sortedBlogs().map((blog) => (
            <tr key={blog.id}>
              <td>
                <Link to={`/blogs/${blog.id}`}>
                  {blog.title}
                </Link>
              </td>
              <td style={{ 'textAlign':'right' }}>
                {blog.author}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  )
}

export default Bloglist
