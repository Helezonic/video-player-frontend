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
    <div className="min-h-screen flex flex-col bg-gray-900 text-white">
      <Header />
      <div className="sm:flex grow p-4">
        {/* Left Section: Video and Details */}
        <div className="flex flex-col sm:w-3/4 pr-4">
          {/* Video Player */}
          <div className="w-full aspect-video bg-black rounded-lg overflow-hidden shadow-lg">
            <video
              className="w-full h-full"
              controls
              autoPlay
              src={videoDetails.videoFile}
            >
              Your browser does not support the video tag.
            </video>
          </div>
  
          {/* Video Details */}
          <div className="mt-4">
            <h2 className="text-2xl font-bold">{videoDetails.title}</h2>
            <div className="flex justify-between">
              <p className="text-gray-400 mt-2">{videoDetails.description}</p>
              <p className="text-gray-400 mt-2 px-4">{videoDetails.views} views</p>
            </div>
            
            <div className="flex items-center gap-4 mt-4">
              <img
                src={videoDetails.owner.avatar}
                alt={videoDetails.owner.userName}
                className="w-12 h-12 rounded-full"
              />
              <div>
                <p className="font-medium">{videoDetails.owner.fullName}</p>
                <p className="text-gray-400 text-sm">@{videoDetails.owner.userName}</p>
              </div>
            </div>
            
          </div>
        </div>
  
        {/* Right Section: Related Videos */}
        <div className="flex flex-col sm:w-1/4 mt-5 sm:mt-0 bg-gray-800 rounded-lg p-4">
          <h3 className="text-lg font-bold mb-4">Related Videos</h3>
          <div className="flex flex-col gap-4">
            {/* {relatedVideos.map((video) => (
              <div
                key={video._id}
                className="flex items-center gap-4 cursor-pointer hover:bg-gray-700 p-2 rounded-lg"
              >
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-24 h-16 object-cover rounded-lg"
                />
                <div>
                  <h4 className="text-sm font-medium">{video.title}</h4>
                  <p className="text-gray-400 text-xs">{video.views} views</p>
                  <p className="text-gray-500 text-xs">{video.owner.fullName}</p>
                </div>
              </div>
            ))} */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default VideoPlay;