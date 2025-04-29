import React from "react"
import { useSelector } from "react-redux"
import Pills from "./ui/Pills"
import { Button } from "./ui"
import Subscribe from "./Subscribe"



export default function Images() {

  const userData= useSelector((state)=>state?.auth?.userData)
  return (
    <>
    <div className="relative h-[350px]">
      {/* Cover Image */}
      <div className=" h-full overflow-clip ">
        <div className="flex flex-col justify-center hover:opacity-80 transition-all 100 ease-in">
        {userData && <img src={userData?.coverImage} className="w-full"/>}
        </div>
      </div>
      <div className="absolute bottom-0 bg-black/60 rounded-full flex m-2 p-2 gap-2">
        <div className="w-fit flex justify-center items-center">
          
          {/* Avatar Image */}
          <div className=" h-[150px] w-[150px] overflow-clip flex items-center border-2 border-amber-50 rounded-full">
            {userData && <img src={userData?.avatar} className="scale-200 items-center"/>}
          </div>
          
        </div>

        <div className="w-1/4 gap-2  flex flex-col  ">

          <div className="px-2 w-fit mx-auto text-3xl text-white mt-4 font-extralight font-mono">{userData?.fullName}</div>
          
          <Subscribe/>
        </div>

        <div className="w-1/4 flex justify-center flex-col gap-2 p-2 m-2">
          <Pills text="Subscribed to"/>
          <Pills text="Subscribers"/>
        </div>
        
      </div>
        
    </div>
    
    </>
  )
}