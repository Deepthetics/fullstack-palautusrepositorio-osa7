import { createSlice } from '@reduxjs/toolkit'

const successMessageSlice = createSlice({
  name: 'successMessage',
  initialState: null,
  reducers: {
    setSuccessMessage(state, action) {
      const content = action.payload
      return content
    }
  }
})

export const { setSuccessMessage } = successMessageSlice.actions
export default successMessageSlice.reducer
