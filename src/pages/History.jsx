import React, { useEffect, useState } from "react";
import axios from "axios";


function History() {
  const [history,setHistory] = useState(null)
  
  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await axios.get(
          "https://clipsave.live/api/user/history",
          {
            withCredentials: true, // Include credentials (cookies, tokens, etc.)
          }
        );
        console.log("History Response:", JSON.stringify(response.data?.data?.history, null, 2)); // Log the response
        setHistory(response.data?.data?.history[0].watchHistory)
      } catch (error) {
        console.error("Error fetching history:", error); // Log any errors
        
      }
    };

    fetchHistory();
  }, []);

  return (
    <div className="rounded-xl m-2 bg-gray-800 ">
      <hr className=" mx-auto mt-2 text-white/10" />
      <div className="w-full flex gap-2 items-center p-4">
        <div className="text-3xl text-white font-semibold">HISTORY</div>
      </div>
      <div className="flex w-full">

      
        {history && history.length>0 ? (history.map((video) => (
          <div key={video._id} className="p-4 border-b border-gray-700 w-1/5 ">
            <div className="border-2 h-48 overflow-clip">
            <img
              src={video.thumbnail}
              alt={video.title}
              className="object-cover w-full h-full  rounded-lg"
            />
            </div>
            <h3 className="text-xl text-white font-bold mt-2">{video.title}</h3>
            <p className="text-gray-400">{video.description}</p>
            <div className="flex items-center mt-2">
              <img
                src={video.owner[0]?.avatar}
                alt={video.owner[0]?.userName}
                className="w-10 h-10 rounded-full"
              />
              <div className="ml-2">
                <p className="text-white font-medium">{video.owner[0]?.fullName}</p>
                <p className="text-gray-400 text-sm">@{video.owner[0]?.userName}</p>
              </div>
            </div>
          </div>
        ))) : (
          <div className="text-gray-400 p-4">{history && history.length == 0 ? "No history available." : "Loading..."}</div>
        )}
      </div>
    </div>
  );
}

export default History;