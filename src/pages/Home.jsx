import React from 'react'
import Logout from '../components/Logout'
import Cookies from 'js-cookie'
import { useEffect, useState } from 'react';
import Button from '../components/ui/Button'; 
import { Navigate, NavLink, useNavigate } from 'react-router-dom';

function Home() {
    
    const token = localStorage.getItem('token') || null;
    const navigate = useNavigate();

  useEffect(() => {
    if(!token)
      navigate('/login')

    getUserDetails();
  }, [token]);

  const getUserDetails = async () => {
    try {
      const response = await axios.get('https://video-player-backend-production.up.railway.app/api/user/get-user', {}, {withCredentials:true})
      console.log(response.data)
    } catch (error) {
      
    }
    
  }


  return token? (
    <>
        <div className='text-xl text-center bg-amber-300 text-red-500'>
            Welcome User
        </div>
        <div className='text-center'>
            {/* <h2>Cookies : </h2>
            <pre>{JSON.stringify(allCookies, null, 2)}</pre> */}
      </div>
        <Logout/>   
    </>
  ) : null
    
    {/* <div className='flex flex-col items-center justify-center space-y-6 h-dvh bg-gray-800'>
      <NavLink key='Login' to='/login'>
        <Button className="hover:text-amber-200">Login</Button>
      </NavLink>
      <NavLink key='Reg' to='/registration'>
        <Button className="hover:text-amber-200">Registration</Button>
      </NavLink>
    </ div> */}
    
  
}

export default Home