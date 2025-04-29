import React from "react"
import Dropdown from "./ui/Dropdown"
import { PlusIcon } from "@heroicons/react/16/solid"



export default function Header({sidebar, isSidebarActive}) {
  return (
  <div className=' w-full flex px-2 justify-between items-center bg-gray-900'>
    <div className="flex gap-2 items-center">
      <button onClick={()=> sidebar(!isSidebarActive)} className="group overflow-clip  hover:scale-110 transition-all 200 hover:bg-white/5 w-[50px] h-[50px] p-4 bg-white/10 ease-in-out">
        <span className="group w-full  transition-all 200 text-center   text-white/30 shadow-2xl font-bold">
          <PlusIcon className="group-hover:scale-150 group-hover:fill-white transition-all 200 fill-white/50 ease-in-out z-10"/>
        </span>
      </button>
      <div className="font-extrabold text-3xl font-mono p-2 mx-2 text-white">VIDEO PLAYER</div>
    </div>
    <Dropdown />
    </div>
  )
}