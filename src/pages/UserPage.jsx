import { useEffect, useState } from 'react'
import { Header, Images, Videos, Body, Sidebar, Mainbar, Modal } from '../components/index.js'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios';
import { getUsers } from '../app/allUserSlice.js';
import { Outlet } from 'react-router-dom';
import { ArrowUpRightIcon } from '@heroicons/react/16/solid';


export default function UserPage ({children, message}) {
    const token = localStorage.getItem('token') || null;
    const [sidebarActive, setSidebarActive] = useState(true)
    const isPropOpen = useSelector((state)=> state.modal.status)
    const dispatch = useDispatch()
    
    
    const getAllUsers = async () => {
      try {
        console.log("Getting all users")
        const response = await axios.get(
          'https://video-player-backend-production.up.railway.app/api/user/all-users', 
          {withCredentials:true}
        )
        console.log(response?.data?.data?.users)
        dispatch(getUsers(response?.data?.data?.users))
  
        
        console.log("User list fetched")
      } catch (error) {
        console.log(error);
      } 
    }
  
    useEffect(() => {
      if (token) {
        getAllUsers();
      }
    }, []);


 return token? (
    <>
      <div className={`w-full min-h-screen flex flex-col transition 200 ${isPropOpen? "opacity-30" : null}`}>
        <Header sidebar={setSidebarActive} isSidebarActive={sidebarActive}/>
        <Body>
          <Sidebar active={sidebarActive}/>
          <Mainbar>
            <Outlet/>
            
          </Mainbar>
        </Body>
      </div>
      <div className=" fixed bottom-0 my-6 mx-4 w-fit p-2 font-semibold transition-all duration-200 bg-black rounded-xl z-20 text-sm sm:text-[16px] ">
          <a href="https://github.com/Helezonic/video-player-frontend" target="_blank">
            <p className="hover:text-white text-slate-400">
              Frontend Github Link 
              <ArrowUpRightIcon className="h-6 inline-flex"/>
            </p>
          </a>
          <a href="https://github.com/Helezonic/video-player-backend" target="_blank">
            <p className="hover:text-white text-slate-400">
              Backend Github Link 
              <ArrowUpRightIcon className="h-6 inline-flex"/>
            </p>
          </a>
          
        </div>
      
    </>
  ) : null

}