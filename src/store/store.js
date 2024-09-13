import { configureStore } from '@reduxjs/toolkit'
import authslice from '../reduxslice/authslice'
import counterSlice from '../reduxslice/counterSlice'
import activedata from '../reduxslice/activedata'

export const store = configureStore({
  reducer: {
     userstorage: authslice,
     counterstore: counterSlice,
     activedatamessage: activedata
  },
})