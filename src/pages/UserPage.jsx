import { useEffect, useState } from 'react'
import { Header, Images, Videos, Body, Sidebar, Mainbar, Modal } from '../components/index.js'
import { useSelector } from 'react-redux'


export default function UserPage ({children, message}) {
    const token = localStorage.getItem('token') || null;
    const [sidebarActive, setSidebarActive] = useState(true)
    const isPropOpen = useSelector((state)=> state.modal.status)

 return token? (
    <>
      <div className={`w-full min-h-screen flex flex-col transition 200 ${isPropOpen? "opacity-30" : null}`}>
        <Header sidebar={setSidebarActive} isSidebarActive={sidebarActive}/>
        <Body>
          <Sidebar active={sidebarActive}/>
          <Mainbar>
            {children}
            {message && <div className='text-2xl w-fit mx-auto text-white'>{message}</div>}
          </Mainbar>
        </Body>
      </div>
      
    </>
  ) : null

}