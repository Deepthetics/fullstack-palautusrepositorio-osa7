import PropTypes from 'prop-types'
import { useState } from 'react'
import { Form } from 'react-bootstrap'

const BlogForm = ({ createBlog }) => {
  const [blogUrl, setBlogUrl] = useState('')
  const [blogTitle, setBlogTitle] = useState('')
  const [blogAuthor, setBlogAuthor] = useState('')

  const handleCreate = async (event) => {
    event.preventDefault()

    const newBlog = {
      url: blogUrl,
      title: blogTitle,
      author: blogAuthor,
    }

    await createBlog(newBlog)
    setBlogUrl('')
    setBlogTitle('')
    setBlogAuthor('')
  }

  return (
    <div>
      <h2>Create new</h2>
      <Form onSubmit={handleCreate}>
        <Form.Group className='mb-3'>
          <Form.Label>URL:</Form.Label>
          <Form.Control
            id='url'
            type='text'
            value={blogUrl}
            name='url'
            onChange={({ target }) => setBlogUrl(target.value)}
            placeholder='write blog URL here'
          />
        </Form.Group>
        <Form.Group className='mb-3'>
          <Form.Label>Title:</Form.Label>
          <Form.Control
            id='title'
            type='text'
            value={blogTitle}
            name='title'
            onChange={({ target }) => setBlogTitle(target.value)}
            placeholder='write blog title here'
          />
        </Form.Group>
        <Form.Group className='mb-3'>
          <Form.Label>Author:</Form.Label>
          <Form.Control
            id="author"
            type="text"
            value={blogAuthor}
            name="author"
            onChange={({ target }) => setBlogAuthor(target.value)}
            placeholder='write blog author here'
          />
        </Form.Group>
        <button id='create-button' type='submit'>
          Create
        </button>
      </Form>
      <br></br>
    </div>
  )
}

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired,
}

export default BlogForm
