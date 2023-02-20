import { createSlice } from '@reduxjs/toolkit'

const errorMessageSlice = createSlice({
  name: 'errorMessage',
  initialState: null,
  reducers: {
    setErrorMessage(state, action) {
      const content = action.payload
      return content
    }
  }
})

export const { setErrorMessage } = errorMessageSlice.actions
export default errorMessageSlice.reducer
