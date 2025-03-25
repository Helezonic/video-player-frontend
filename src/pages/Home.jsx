import React from 'react'
import Logout from '../components/Logout'
import Cookies from 'js-cookie'
import { useEffect, useState } from 'react';
import Button from '../components/ui/Button'; 
import { Navigate, NavLink, useNavigate } from 'react-router-dom';

function Home() {
    
    const token = localStorage.getItem('token') || null;
    const navigate = useNavigate();
    const [message, setMessage] = useState('');
    const [statusCode, setStatusCode] = useState(500);

  useEffect(() => {
    if(!token)
      navigate('/login')

    getUserDetails();
  }, [token]);

  const getUserDetails = async () => {
    try {
      console.log("Getting user details")
      const response = await axios.get('https://video-player-backend-production.up.railway.app/api/user/get-user', {withCredentials:true})
      console.log(response.data)
      console.log("User details fetched")
    } catch (error) {
      setMessage(error.response?.data?.message || 'No user found');
      setStatusCode(error.response?.status);
    }
    
  }


  return token? (
    <>
      <div className='text-xl text-center bg-amber-300 text-red-500 p-2'>
          Welcome User
      </div>
      <div className='text-center mt-3 p-2 flex flex-col items-center justify-center space-y-6'>
          {/* <h2>Cookies : </h2>
          <pre>{JSON.stringify(allCookies, null, 2)}</pre> */}
          <Logout/>
          {message && <p>{message}</p>}

      </div>
        
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