import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: localStorage.getItem("localstorage") ? JSON.parse(localStorage.getItem("localstorage")) : null,
}

export const authslice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    loginstorage: (state, action) => {
      state.value += action.payload
    },
  },
})


export const { loginstorage } = authslice.actions

export default authslice.reducer