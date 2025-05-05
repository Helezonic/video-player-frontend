import { useEffect, useState } from 'react'
import { Header, Images, Videos, Body, Sidebar, Mainbar, Modal } from '../components/index.js'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios';
import { getUsers } from '../app/allUserSlice.js';
import { Outlet } from 'react-router-dom';


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
            {/* {children}
            {message && <div className='text-2xl w-fit mx-auto text-white'>{message}</div>} */}
          </Mainbar>
        </Body>
      </div>
      
    </>
  ) : null

}