import { configureStore } from '@reduxjs/toolkit'
import authslice from '../reduxslice/authslice'
import counterSlice from '../reduxslice/counterSlice'

export const store = configureStore({
  reducer: {
     userstorage: authslice,
     counterstore: counterSlice,
  },
})