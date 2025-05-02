import React from 'react'
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector} from "react-redux"
import { login,logout } from "../app/authSlice.js"
import UserPage from './UserPage.jsx';
import { modalOff } from '../app/modalSlice.js';





function Home() {
  const token = localStorage.getItem('token') || null;
  const [user, setUser] = useState(null)
  const updateImage = useSelector((state)=> state.update.imageUpdate)
  const updatePassword = useSelector((state)=> state.update.passwordUpdate)
  const updateUser = useSelector((state)=> state.update.userUpdate)
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const dispatch = useDispatch()

  useEffect(() => {
    if(!token)
      {
        dispatch(logout());
        navigate('/auth')
      }
    dispatch(modalOff())
    getUserDetails();
  }, [token, updateImage, updatePassword, updateUser ]);
  
  const getUserDetails = async () => {
    try {
      console.log("Getting owner user details")
      const response = await axios.get(
        'https://video-player-backend-production.up.railway.app/api/user/get-user', 
        {withCredentials:true}
      )
      console.log(response?.data?.data?.user)
      dispatch(login(response?.data?.data?.user))
      setUser(response?.data?.data?.user)
      setMessage("")
      console.log("User details fetched")
    } catch (error) {
      setMessage(error.response?.data?.message);
    } 
  }
  

  

  return token? (
    <>
      
      <UserPage userData={user} isOwner={true} message={message}/>
      
    </>
  ) : null
    
 
  
}

export default Home