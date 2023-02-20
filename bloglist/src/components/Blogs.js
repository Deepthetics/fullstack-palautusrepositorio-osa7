import { useRef } from 'react'
import { useDispatch } from 'react-redux'
import BlogForm from './BlogForm'
import Bloglist from './Bloglist'
import SuccessNotification from './SuccessNotification'
import Togglable from './Togglable'
import { appendBlog } from '../reducers/blogsReducer'
import { setSuccessMessage } from '../reducers/successMessageReducer'
import blogService from '../services/blogs'

const Blogs = ({ user }) => {
  const dispatch = useDispatch()
  const blogFormRef = useRef()

  const createBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility()
    const savedBlog = await blogService.create(blogObject)

    if (savedBlog) {
      dispatch(appendBlog(savedBlog))
      dispatch(setSuccessMessage(
        `A new blog: ${savedBlog.title} by ${savedBlog.author}, was added`
      ))
      setTimeout(() => {
        dispatch(setSuccessMessage(null))
      }, 5000)
    }
  }

  return (
    <div>
      <h2>Blogs</h2>
      <SuccessNotification />
      <br></br>
      <Togglable buttonLabel='Create new blog' ref={blogFormRef}>
        <BlogForm createBlog={createBlog} />
      </Togglable>
      <br></br>
      <Bloglist user={user}/>
    </div>
  )
}

export default Blogs
