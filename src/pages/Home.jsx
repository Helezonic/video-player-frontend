import React from 'react'
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector} from "react-redux"
import { login,logout } from "../app/authSlice.js"
import { Header, Images, Videos, Body, Sidebar, Mainbar, Modal } from '../components/index.js'

import UpdatePassword from '../components/forms/UpdatePassword.jsx';
import { modalOff } from '../app/modalSlice.js';




function Home() {
    const token = localStorage.getItem('token') || null;
    const navigate = useNavigate();
    const [message, setMessage] = useState('');
    const dispatch = useDispatch()
    const isPropOpen = useSelector((state)=> state.modal.status)
    const updateImage = useSelector((state)=> state.update.imageUpdate)
    const updatePassword = useSelector((state)=> state.update.passwordUpdate)
    const updateUser = useSelector((state)=> state.update.userUpdate)
    const [sidebarActive, setSidebarActive] = useState(false)

  useEffect(() => {
    if(!token)
      {
        dispatch(logout());
        navigate('/login')
      }
    dispatch(modalOff())
    getUserDetails();
  }, [token, updateImage, updatePassword, updateUser ]);

  const getUserDetails = async () => {
    try {
      console.log("Getting user details")
      const response = await axios.get(
        'https://video-player-backend-production.up.railway.app/api/user/get-user', 
        {withCredentials:true}
      )
      console.log(response?.data?.data?.user)
      dispatch(login(response?.data?.data?.user))
      console.log("User details fetched")
    } catch (error) {
      setMessage(error.response?.data?.message);
    } 
  }

  return token? (
    <>
      <div className={`w-full min-h-screen flex flex-col transition 200 ${isPropOpen? "opacity-30" : null}`}>
        <Header sidebar={setSidebarActive} isSidebarActive={sidebarActive}/>
        <Body>
          <Sidebar active={sidebarActive}/>
          <Mainbar>
            <Images/>
            
            <Videos/>
          </Mainbar>
        </Body>
      </div>
      
    </>
  ) : null
    
 
  
}

export default Home