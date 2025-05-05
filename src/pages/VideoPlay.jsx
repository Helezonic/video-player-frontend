import React, { useCallback, useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import Header from '../components/Header';
import axios from 'axios';

const VideoPlay = () => {
  const { id } = useParams(); // Get video ID from URL
  const location = useLocation();
  const [videoDetails, setVideoDetails] = useState(location.state?.videoDetails || null);
  

  const fetchVideoDetails = useCallback( async () => {
    try {
      const response = await axios.get(
        `https://video-player-backend-production.up.railway.app/api/video/${id}`
      );
      setVideoDetails(response.data?.data);
    } catch (error) {
      console.error('Failed to fetch video details:', error);
    }
  },[id])

  //Fetch the Video Details when page is not accessed with Link tag
  useEffect(() => {
    if (!videoDetails) {
      fetchVideoDetails(); 
    }
  }, [fetchVideoDetails]);



  //Add to Owner History, Add a view
  useEffect(() => {
    const addToHistory = async () => {
      try {
        await axios.post(
          `https://video-player-backend-production.up.railway.app/api/video/add-to-history/${id}`,
          {},
          { withCredentials: true }
        );
        console.log("Video added to watch history");
      } catch (error) {
        console.error("Failed to add video to watch history:", error);
      }
    };

    addToHistory();
  }, [id]); // Run this effect whenever the video ID changes



  return (
    <div className="min-h-screen border-2">
      <Header />
      <div className="w-full h-screen border-2 border-white flex">
        <div className='flex flex-col p-4 h-full w-4/5'>
          <div className='h-[600px] w-full'>
            <video
              className='w-full h-full'
              controls
              autoPlay
              src={videoDetails.videoFile}
            >
              Your browser does not support the video tag.
            </video>
          </div>
          <div className="w-full">
            <h2 className="text-white font-bold p-3 text-3xl">{videoDetails.title}</h2>
            <p className="text-white p-3">{videoDetails.description}</p>
          </div>
        </div>
        <div className="flex flex-col h-full p-2 w-1/5 bg-black rounded-2xl">
        </div>
      </div>
    </div>
  );
};

export default VideoPlay;