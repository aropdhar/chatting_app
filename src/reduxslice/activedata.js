import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: 0,
}

export const activedata = createSlice({
  name: 'counter',
  initialState,
  reducers: {

    useractivedata: (state, action) => {
      state.value = action.payload
    },
  },
})


export const {  useractivedata } = activedata.actions

export default activedata.reducer