import { configureStore } from "@reduxjs/toolkit"
import authSliceReducer from "./authSlice.js"
import modalSliceReducer from "./modalSlice.js"
import updateSliceReducer from "./updateSlice.js"



export const store = configureStore({
  reducer : {
    auth : authSliceReducer,
    modal : modalSliceReducer,
    update : updateSliceReducer
  }
}) 