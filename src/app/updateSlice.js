import {createSlice} from "@reduxjs/toolkit"

const initialState = {
  imageUpdate : 0,
  userUpdate : 0,
  passwordUpdate : 0
}

const updateSlice = createSlice({
  name : "update",
  initialState,
  reducers : {
    updImage : (state) => {
      state.imageUpdate++
    },
    updUser : (state) => {
      state.userUpdate++
    },
    updPass : (state) => {
      state.passwordUpdate++
    } 
  }
})


export default updateSlice.reducer
export const {updImage, updPass, updUser} = updateSlice.actions