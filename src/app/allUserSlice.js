import {createSlice} from "@reduxjs/toolkit"

const initialState = {
  users : []
}

const allUserSlice = createSlice({
  name : "get all Users",
  initialState,
  reducers : {
    getUsers : (state,action) => {
      state.users = action.payload
      },
    
  }
})


export default allUserSlice.reducer
export const {getUsers} = allUserSlice.actions