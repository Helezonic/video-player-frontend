import {createSlice} from "@reduxjs/toolkit"

const initialState = {
  status : false,
  userData : null,
  totalVideos : 0,
  videoAdded : 0,
  history : false
}

const authSlice = createSlice({
  name : "authentication",
  initialState,
  reducers : {
    login : (state,action) => {
      state.status = true
      state.userData = action.payload
      },
    logout : (state) => {
      state.status = false
      state.userData = null
    },
    videos : (state,action) => {
      state.totalVideos = action.payload
    },
    addVideo : (state) => {
      state.videoAdded ++
    },
    historyOn : (state) => {
      state.history = !state.history
    }
  }
})


export default authSlice.reducer
export const {login, logout, videos, addVideo, historyOn} = authSlice.actions