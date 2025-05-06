import React, { useEffect } from "react"
import { useSelector } from "react-redux"
import Pills from "./ui/Pills"
import { Button } from "./ui"
import Subscribe from "./Subscribe"
import { ThreeDot } from "react-loading-indicators"



export default function Images({userData, isOwner, fetchUserDetails}) {
  
  return (
    <> {userData ? (
    <div className="relative sm:h-[350px] h-[250px]">
      {/* Cover Image */}
      <div className=" h-full overflow-clip  ">
        <div className="flex flex-col justify-center hover:opacity-80 transition-all 100 ease-in">
        {userData && <img alt={userData._id} loading="lazy" src={userData?.coverImage} className=" w-full "/>}
        </div>
      </div>
      <div className="absolute bottom-0 items-center bg-black/60 rounded-full sm:w-3/4 md:w-1/2 xl:w-1/3 w-full flex m-2 p-2 gap-2">
        <div className="grid w-fit justify-center items-center">
          
          {/* Avatar Image */}
          <div className="md:h-[150px] md:w-[150px] h-[100px] w-[100px]  overflow-clip flex items-center border-2 border-amber-50 rounded-full">
            {userData && <img alt={userData._id} loading="lazy" src={userData?.avatar} className=" scale-200"/>}
          </div>
          
        </div>

        <div className="px-2  gap-2 text-white w-1/3 flex flex-col shadow-2xl  ">
          {isOwner && <p className="text-gray-300 font-extralight text-sm">Welcome Back,</p>}
          <div className=" w-full justify-center lg:text-3xl sm:text-xl font-bold   font-mono">{userData?.fullName}</div>
          
          {(!isOwner && userData) && <Subscribe isSubscribed={userData.isSubscribed} userId={userData._id} fetchUserDetails={fetchUserDetails}/>}
        </div>

        <div className=" flex justify-center flex-col grow gap-2 p-2">
          <Pills>
            <p className="border-2 rounded-l-full border-red-400 p-2  truncate  grow">Subscribed to</p>
            <p className="border-2 rounded-r-full font-bold bg-red-400 border-red-400 p-2 ">{userData.channelsSubscribedToCount}</p>
          </Pills>
          <Pills>
            <p className="border-2 rounded-l-full border-red-400 p-2 grow">Subscribers</p>
            <p className="border-2 rounded-r-full font-bold bg-red-400 border-red-400 p-2 ">{userData.subscriberCount}</p>
          </Pills>
        </div>
        
      </div>
        
    </div>
    ) : (<div className="text-gray-400 p-4 w-full h-full flex items-center justify-center">
      <ThreeDot color="#fffff" size="small"  textColor="#ffffff" />
    </div>)
  }
    
    </>
  )
}