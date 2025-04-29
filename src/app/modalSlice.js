import {createSlice} from "@reduxjs/toolkit"

const initialState = {
  status : false,
}

const modalSlice = createSlice({
  name : "modal",
  initialState,
  reducers : {
    modalOn : (state) => {
      state.status = true
      },
    modalOff : (state) => {
      state.status = false
    } 
  }
})


export default modalSlice.reducer
export const {modalOn, modalOff} = modalSlice.actions