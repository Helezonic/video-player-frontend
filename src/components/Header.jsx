import React from "react"
import Dropdown from "./ui/Dropdown"
import { Bars3Icon, ArrowLeftIcon, ArrowUpRightIcon } from "@heroicons/react/16/solid"
import { Link, useLocation, useNavigate } from "react-router-dom"


export default function Header({ sidebar, isSidebarActive }) {
  const location = useLocation(); // Get the current URL
  const navigate = useNavigate()

  return (
    
    <div className="w-full flex px-2 h-20 justify-between items-center border-b-2 border-b-cyan-500 bord bg-gray-900">
      <div className="flex gap-2 items-center">

        {/* Conditionally render the back button if the URL is /video */}
        {location.pathname.startsWith("/video") ? (
          <button
            onClick={() => navigate(-1)} // Navigate to the previous page
            className="group overflow-clip cursor-pointer hover:scale-110 transition-all duration-200 hover:bg-white/5 w-[50px] h-[50px] p-4 bg-white/10 ease-in-out"
          >
            <span className="group w-full transition-all duration-200 text-center text-white/30 shadow-2xl font-bold">
              <ArrowLeftIcon className="group-hover:scale-150 group-hover:fill-white transition-all duration-200 fill-white/50 ease-in-out z-10" />
            </span>
          </button>
        ) : (
          <button
            onClick={() => sidebar(!isSidebarActive)}
            className="group overflow-clip hover:scale-110 transition-all duration-200 hover:bg-white/5 w-[50px] h-[50px] p-4 bg-white/10 ease-in-out"
          >
            <span className="group w-full cursor-pointer transition-all duration-200 text-center text-white/30 shadow-2xl font-bold">
              <Bars3Icon className="group-hover:scale-150 group-hover:fill-white transition-all duration-200 fill-white/50 ease-in-out z-10" />
            </span>
          </button>
        )}
        
        <Link to="/home" className=" font-extrabold text-3xl hover:font-extralight hover:scale-105 justify-center p-2 mx-2 flex items-center">
          <img src="/icon.png" alt="icon" className="h-12"/>
          <p className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-shadow-lg shadow-black outline-2 outline-offset-2  transition-all duration-100">
            CLIP SAVE
          </p>
        </Link>

        <h1 className=" text-white font-sans font-medium"> By <a href="https://github.com/Helezonic" target="_blank" className="hover:bg-black transition-all hover:p-2 rounded-md hover:italic hover:text-indigo-300 hover:font-semibold"><u>Helezon</u> </a></h1>
      </div>
      <Dropdown />
    </div>
  );
}
