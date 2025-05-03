import React from 'react'
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector} from "react-redux"
import { login,logout,videos } from "../app/authSlice.js"
import { modalOff } from '../app/modalSlice.js';
import { getUsers } from '../app/allUserSlice.js';
import UserPage from './UserPage.jsx';

import {Images, Videos } from '../components/index.js'
import History from './History.jsx';






function Home({isHistory}) {
  const token = localStorage.getItem('token') || null;
  const [user, setUser] = useState(null)
  const [ownerVideos, setOwnerVideos] = useState([])
  const updateImage = useSelector((state)=> state.update?.imageUpdate)
  const updatePassword = useSelector((state)=> state.update?.passwordUpdate)
  const updateUser = useSelector((state)=> state.update?.userUpdate)
  const addVideo = useSelector((state)=> state.auth?.videoAdded)
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
  
  useEffect(() => {
    if (token) {
      getAllUsers();
    }
  }, [token]);

  useEffect(() => {
    if (token) {
      getOwnerVideos()
    }
  }, [token,addVideo]);

  
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

  const getAllUsers = async () => {
    try {
      console.log("Getting all users")
      const response = await axios.get(
        'https://video-player-backend-production.up.railway.app/api/user/all-users', 
        {withCredentials:true}
      )
      console.log(response?.data?.data?.users.length)
      dispatch(getUsers(response?.data?.data?.users))

      setMessage("")
      console.log("User details fetched")
    } catch (error) {
      setMessage(error.response?.data?.message);
    } 
  }
  

  const getOwnerVideos = async () => {
    try {
      console.log("Fetching videos uploaded by the user");
      const response = await axios.get(
        'https://video-player-backend-production.up.railway.app/api/videos/get-owner-videos',
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
  };
  

  return token? (
    <>
      
      <UserPage message={message}>
        <Images userData={user} isOwner={true}/>
                    
        {isHistory ? <History/> : <Videos allVideos={ownerVideos}/>}
      </UserPage>
      
    </>
  ) : null
    
 
  
}

export default Home