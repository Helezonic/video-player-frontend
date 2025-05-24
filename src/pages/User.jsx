import UserPage from './UserPage.jsx';
import {Images, Videos } from '../components/index.js'
import { useLocation, useParams } from 'react-router-dom';
import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { ThreeDot } from 'react-loading-indicators'


export default function User() {
  const token = localStorage.getItem('token') || null;
  const [userVideos, setUserVideos] = useState(null)
  const { id } = useParams(); // Get user ID from URL
  const [userDetails, setUserDetails] = useState(null);
  const [message, setMessage] = useState('');
  
  
  //Fetch User Details
  const fetchUserDetails = useCallback(async () => {
    try {
      setUserDetails(null);
      console.log("Fetching details of the user");
      const response = await axios.get(
        `https://clipsave.live/api/user/${id}`,
        { withCredentials: true }
      );
      console.log(response?.data?.data?.aggregate[0])
      setUserDetails(response?.data?.data?.aggregate[0]);
    } catch (error) {
      console.error('Failed to fetch video details:', error);
    }
  })

  useEffect(() => {
    
    //Fetch the Video Details when page is not accessed with Link tag
    const getUserVideos = async () => {
      try {
        setUserVideos(null)
        console.log("Fetching videos uploaded by the user");
        const response = await axios.get(
          `https://clipsave.live/api/video/get-user-videos/${id}`,
          { withCredentials: true }
        );
        console.log(response?.data?.data?.videos);
        setUserVideos(response?.data?.data?.videos); // Local state
        setMessage("");
        console.log("Videos fetched successfully");
      } catch (error) {
        setMessage(error.response?.data?.message);
      }
    }

    getUserVideos()
    fetchUserDetails();
    
  }, [id]);



return (token && userDetails)? (
  <>
    
    <div>
      <Images userData={userDetails} isOwner={false} fetchUserDetails={fetchUserDetails}/>
                  
      <Videos allVideos={userVideos} isOwner={false}/>
    </div>
    
  </>
) : (<div className="text-gray-400 p-4 w-full h-full flex items-center justify-center">
  <ThreeDot color="#fffff" size="small"  textColor="#ffffff" />
</div>)

}