import React, { useCallback } from 'react'
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector} from "react-redux"
import { login,logout,videos } from "../app/authSlice.js"
import { modalOff } from '../app/modalSlice.js';
import History from './History.jsx';
import {Images, Videos } from '../components/index.js'



function Home() {
  const token = localStorage.getItem('token') || null;
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState("")
  const [ownerVideos, setOwnerVideos] = useState(null)
  const updateImage = useSelector((state)=> state.update?.imageUpdate)
  const updatePassword = useSelector((state)=> state.update?.passwordUpdate)
  const updateUser = useSelector((state)=> state.update?.userUpdate)
  const addVideo = useSelector((state)=> state.auth?.videoAdded)
  const isHistory = useSelector((state)=> state.auth?.history)
  const dispatch = useDispatch()

  
  

  const getChannelDetails = async (id) => {
    try {
      console.log("Getting owner user details")
      const response = await axios.get(
        `https://video-player-backend-production.up.railway.app/api/user/${id}`, 
        {withCredentials:true}
      ) 
      console.log(response?.data?.data?.aggregate[0])
      dispatch(login(response?.data?.data?.aggregate[0]))
      setUser(response?.data?.data?.aggregate[0])
    } catch (error) {
      setMessage(error.response?.data?.message);
    }
  }
  
  //GET THE USER ID AND INVOKE GET CHANNEL DETAILS
  useEffect(() => {
    const getUserDetails = async () => {
      try {
        console.log("Getting owner user details")
        const response = await axios.get(
          'https://video-player-backend-production.up.railway.app/api/user/get-user', 
          {withCredentials:true}
        )
        setMessage("")
        console.log("User details fetched")
        return response.data.data.user
      } catch (error) {
        setMessage(error.response?.data?.message);
        localStorage.removeItem('token')
      } 
    }

    const fetchData = async () => {
      try {
        const user = await getUserDetails(); // Wait for the Promise to resolve
        if(user)
          getChannelDetails(user._id)
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    if(token)
      fetchData()
      
    dispatch(modalOff())
  }, [token, updateImage, updatePassword, updateUser ]);


  

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