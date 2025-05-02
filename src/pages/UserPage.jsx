import { useEffect, useState } from 'react'
import { Header, Images, Videos, Body, Sidebar, Mainbar, Modal } from '../components/index.js'
import { useSelector } from 'react-redux'


export default function UserPage ({userData, isOwner, message}) {
    const token = localStorage.getItem('token') || null;
    const [sidebarActive, setSidebarActive] = useState(true)
    const isPropOpen = useSelector((state)=> state.modal.status)

    //Get user details
    useEffect(() => {
      console.log("Owner", isOwner)
    }, [])


 return token? (
    <>
      <div className={`w-full min-h-screen flex flex-col transition 200 ${isPropOpen? "opacity-30" : null}`}>
        <Header sidebar={setSidebarActive} isSidebarActive={sidebarActive}/>
        <Body>
          <Sidebar active={sidebarActive}/>
          <Mainbar>
            <Images userData={userData} isOwner={true}/>
            
            <Videos/>
            {message && <div className='text-2xl w-fit mx-auto text-white'>{message}</div>}
          </Mainbar>
        </Body>
      </div>
      
    </>
  ) : null

}