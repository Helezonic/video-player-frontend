import { Link,useNavigate } from "react-router-dom"
import Button from "./ui/Button"

import { useDispatch, useSelector } from "react-redux"
import { historyOn } from "../app/authSlice";
import { ArrowUpRightIcon } from "@heroicons/react/16/solid"


export default function Sidebar({active}) {
// Select all users from the Redux state
const users = useSelector((state) => state.getUsers?.users);
const dispatch = useDispatch()
const navigate = useNavigate()
const isHistory = useSelector((state)=> state.auth?.history)

const enableHistory = () => {
    navigate("/home")
    dispatch(historyOn())
    console.log("History Toggle")
}

  return (
    <>
      <div className={` bg-gray-800 ${active? "sm:w-1/4  p-2 xl:w-1/8" : "w-0"} transition-all 200 flex flex-col gap-2 relative`}>

        <Link to={"/home"}>
          <Button className="w-full justify-center hover:font-bold">HOME</Button>
        </Link>
        
        <Button onClick={enableHistory} className="w-full justify-center hover:font-bold">{!isHistory? "HISTORY" : "VIDEOS"}</Button>
        
        <div className="mt-3 font-extrabold text-blue-200 text-xl ">Channels</div>
        <hr/>
        
        {users &&
         users.map((user)=> (
          <Link to={`/user/${user._id}`} key={user._id}>
            < Button  className='w-full'>
              <div className="flex items-center gap-2 truncate">
                <div className="h-8 w-8 rounded-full border-2 truncate">
                  <img loading='lazy' alt={user.id} src={user.avatar} className="h-full w-full object-cover "/>
                </div>
                <p className="truncate">{user.fullName}</p>
              </div>
            </Button>
          </Link>
         ))
        }

        <div className=" absolute bottom-0 my-6 w-full p-2 font-semibold transition-all duration-200 ">
          <a href="https://github.com/Helezonic/video-player-frontend" target="_blank">
            <p className="hover:text-white text-slate-500">
              Frontend Github Link 
              <ArrowUpRightIcon className="h-6 inline-flex"/>
            </p>
          </a>
          <a href="https://github.com/Helezonic/video-player-backend" target="_blank">
            <p className="hover:text-white text-slate-500">
              Backend Github Link 
              <ArrowUpRightIcon className="h-6 inline-flex"/>
            </p>
          </a>
          
        </div>

      </div>
    </>
  )
}