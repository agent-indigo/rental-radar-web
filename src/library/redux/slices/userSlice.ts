import {createSlice} from '@reduxjs/toolkit'
const userSlice = createSlice({
  name: 'user',
  initialState: {
    details: undefined
  },
  reducers: {
    setDetails: (
      state,
      action
    ) => state.details = action.payload,
    clearDetails: state => state.details = undefined
  }
})
export const {
  setDetails,
  clearDetails
} = userSlice.actions
export default userSlice.reducer