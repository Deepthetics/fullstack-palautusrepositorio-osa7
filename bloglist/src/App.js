import { useState, useEffect } from 'react'
import { Nav } from 'react-bootstrap'
import { Navbar } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter as Router, Link, Routes, Route } from 'react-router-dom'
import Blog from './components/Blog'
import Blogs from './components/Blogs'
import Home from './components/Home'
import LoginForm from './components/LoginForm'
import Users from './components/Users'
import User from './components/User'
import { setBlogs } from './reducers/blogsReducer'
import { setErrorMessage } from './reducers/errorMessageReducer'
import { setUser } from './reducers/userReducer'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.user)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username,
        password,
      })

      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      dispatch(setUser(user))
      blogService.setToken(user.token)
      setUsername('')
      setPassword('')
    } catch (exception) {
      dispatch(setErrorMessage('Wrong username or password'))
      setTimeout(() => {
        dispatch(setErrorMessage(null))
      }, 5000)
    }
  }

  const handleLogout = (event) => {
    event.preventDefault()

    window.localStorage.removeItem('loggedBlogappUser')
    dispatch(setUser(null))
    blogService.setToken(null)
  }

  const updateBlog = async (blogId, blogObject) => {
    const updatedBlog = await blogService.update(blogId, blogObject)
    const updatedBlogs = blogs.map((blog) =>
      blog.id === updatedBlog.id ? updatedBlog : blog
    )

    dispatch(setBlogs(updatedBlogs))
  }

  const removeBlog = async (blogId) => {
    await blogService.remove(blogId)

    dispatch(setBlogs(blogs.filter((blog) => blog.id !== blogId)))
  }

  if (user === null) {
    return (
      <div className='container'>
        <LoginForm
          username={username}
          password={password}
          setUsername={setUsername}
          setPassword={setPassword}
          handleLogin={handleLogin}
        />
      </div>
    )
  }

  //const paddingHome = {
  //  paddingTop: 5,
  //  paddingBottom: 5,
  //  paddingRight: 5
  //}

  const toggleMargin = {
    marginLeft: 7
  }

  const padding = {
    padding: 7
  }

  return (
    <div className='container'>
      <Router>
        <Navbar bg='dark' expand='lg' variant='dark'>
          <Navbar.Toggle aria-controls='responsive-navbar-nav' style={toggleMargin} />
          <Navbar.Collapse className='justify-content-end' id='responsive-navbar-nav'>
            <Nav className='me-auto'>
              <Nav.Link href='#' as='span' style={padding}>
                <Link to='/'>home</Link>
              </Nav.Link>
              <Nav.Link href='#' as='span' style={padding}>
                <Link to='/blogs'>blogs</Link>
              </Nav.Link>
              <Nav.Link href='#' as='span' style={padding}>
                <Link to='/users'>users</Link>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <form onSubmit={handleLogout}>
          {user.name} logged in
          <br></br>
          <button id='logout-button' type='submit'>
                      Logout
          </button>
        </form>
        <br></br>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/blogs' element={<Blogs user={user} />} />
          <Route path='/blogs/:id' element={<Blog user={user} updateBlog={updateBlog} removeBlog={removeBlog} />} />
          <Route path='/users' element={<Users />} />
          <Route path='/users/:id' element={<User />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
