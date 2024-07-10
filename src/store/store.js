import { configureStore } from '@reduxjs/toolkit'
import authslice from '../reduxslice/authslice'

export const store = configureStore({
  reducer: {
     userstorage: authslice,
  },
})