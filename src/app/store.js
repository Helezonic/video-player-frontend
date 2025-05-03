import { configureStore } from "@reduxjs/toolkit"
import authSliceReducer from "./authSlice.js"
import modalSliceReducer from "./modalSlice.js"
import updateSliceReducer from "./updateSlice.js"
import getAllUserSliceReducer from "./allUserSlice.js"



export const store = configureStore({
  reducer : {
    auth : authSliceReducer,
    modal : modalSliceReducer,
    update : updateSliceReducer,
    getUsers : getAllUserSliceReducer
  }
}) 