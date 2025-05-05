import React, { useEffect } from "react"
import { useSelector } from "react-redux"
import Pills from "./ui/Pills"
import { Button } from "./ui"
import Subscribe from "./Subscribe"
import { ThreeDot } from "react-loading-indicators"



export default function Images({userData, isOwner}) {

  return (
    <> {userData ? (
    <div className="relative h-[350px]">
      {/* Cover Image */}
      <div className=" h-full overflow-clip  ">
        <div className="flex flex-col justify-center hover:opacity-80 transition-all 100 ease-in">
        {userData && <img alt={userData._id} loading="lazy" src={userData?.coverImage} className=" w-full "/>}
        </div>
      </div>
      <div className="absolute bottom-0 items-center bg-black/60 rounded-full sm:w-3/4 lg:w-1/3 flex m-2 p-2 gap-2">
        <div className="grid w-fit justify-center items-center">
          
          {/* Avatar Image */}
          <div className=" h-[150px] w-[150px] overflow-clip flex items-center border-2 border-amber-50 rounded-full">
            {userData && <img alt={userData._id} loading="lazy" src={userData?.avatar} className="scale-200"/>}
          </div>
          
        </div>

        <div className=" gap-2 w-1/3 flex flex-col  ">

          <div className="px-2 w-full justify-center text-3xl text-white shadow-2xl font-extralight font-mono">{userData?.fullName}</div>
          
          {(!isOwner && userData) && <Subscribe userId={userData._id}/>}
        </div>

        <div className=" flex justify-center flex-col grow gap-2 p-2">
          <Pills text="Subscribed to : 12"/>
          <Pills text="Subscribers : 14"/>
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