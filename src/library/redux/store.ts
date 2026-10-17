import {configureStore} from '@reduxjs/toolkit'
import apiSlice from '@/redux/slices/apiSlice'
import userSliceReducer from '@/redux/slices/userSlice'
const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    user: userSliceReducer
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: process.env.NODE_ENV === 'development'
})
export default store