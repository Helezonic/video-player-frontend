import React, { useCallback } from 'react'
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector} from "react-redux"
import { login,logout,videos } from "../app/authSlice.js"
import { modalOff } from '../app/modalSlice.js';
import { getUsers } from '../app/allUserSlice.js';
import UserPage from './UserPage.jsx';
import History from './History.jsx';
import {Images, Videos } from '../components/index.js'



function Home() {
  const token = localStorage.getItem('token') || null;
  const [user, setUser] = useState(null)
  const [ownerVideos, setOwnerVideos] = useState(null)
  const updateImage = useSelector((state)=> state.update?.imageUpdate)
  const updatePassword = useSelector((state)=> state.update?.passwordUpdate)
  const updateUser = useSelector((state)=> state.update?.userUpdate)
  const addVideo = useSelector((state)=> state.auth?.videoAdded)
  const isHistory = useSelector((state)=> state.auth?.history)
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const dispatch = useDispatch()

  
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
      localStorage.removeItem('token')
    } 
  }

  
  
  const getOwnerVideos = useCallback(async () => {
    try {
      console.log("Fetching videos uploaded by the user");
      const response = await axios.get(
        'https://video-player-backend-production.up.railway.app/api/video/get-owner-videos',
        { withCredentials: true }
      );
      console.log(response?.data?.data?.videos);
      setOwnerVideos(response?.data?.data?.videos); // Local state
      dispatch(videos(response?.data?.data?.users.length))
      setMessage("");
      console.log("Videos fetched successfully");
    } catch (error) {
      setMessage(error.response?.data?.message);
    }
  },[token,addVideo])
 



  useEffect(() => {
    getUserDetails();
    if(!token)
      {
        dispatch(logout());
        navigate('/auth')
      }
    dispatch(modalOff())
  }, [token, updateImage, updatePassword, updateUser ]);
  


  useEffect(() => {
    if (token) {
      getOwnerVideos()
    }
  }, [getOwnerVideos]);

  return token? (
    <>
      
      <div>
        <Images userData={user} isOwner={true}/>
                    
        {isHistory ? <History/> : <Videos allVideos={ownerVideos} isOwner={true}/>}
      </div>
      
    </>
  ) : null
    
 
  
}

export default Home