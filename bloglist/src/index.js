import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import App from './App'
import errorMessageReducer from './reducers/errorMessageReducer'
import successMessageReducer from './reducers/successMessageReducer'
import blogsReducer from './reducers/blogsReducer'
import userReducer from './reducers/userReducer'
import usersReducer from './reducers/usersReducer'
import './index.css'

const store = configureStore({
  reducer: {
    errorMessage: errorMessageReducer,
    successMessage: successMessageReducer,
    blogs: blogsReducer,
    user: userReducer,
    users: usersReducer
  }
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
