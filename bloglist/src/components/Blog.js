import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

const Blog = ({ user, updateBlog, removeBlog }) => {
  const blogs = useSelector(state => state.blogs)
  const id = useParams().id
  const blog = blogs.find(blog => blog.id === id)

  const handleLike = async () => {
    const updatedBlog = {
      url: blog.url,
      title: blog.title,
      author: blog.author,
      user: blog.user.id,
      likes: blog.likes + 1,
    }

    await updateBlog(blog.id, updatedBlog)
  }

  const handleRemove = async () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      await removeBlog(blog.id)
    }
  }

  if (blog.user.username === user.username) {
    return (
      <div>
        <h2>
          {blog.title} {blog.author}
        </h2>
        <a href={blog.url}>{blog.url}</a>
        <br></br>
        <span id='likes'>{blog.likes}</span>
        <button id='like-button' onClick={handleLike}>
          like
        </button>
        <br></br>
        <span>added by {blog.user.name}</span>
        <br></br>
        <button id='remove-button' onClick={handleRemove}>
          remove
        </button>
      </div>
    )
  }

  return (
    <div>
      <h2>
        {blog.title} {blog.author}
      </h2>
      <a href={blog.url}>{blog.url}</a>
      <br></br>
      <span id='likes'>{blog.likes}</span>
      <button id='like-button' onClick={handleLike}>
          like
      </button>
      <br></br>
      <span>added by {blog.user.name}</span>
    </div>
  )
}

export default Blog
