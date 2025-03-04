import React from 'react'
import Logout from '../components/Logout'
import Cookies from 'js-cookie'
import { useEffect, useState } from 'react';
import Button from '../components/ui/Button';
import { NavLink } from 'react-router-dom';

function Home() {
    const [allCookies, setAllCookies] = useState({});
    const token = localStorage.getItem('token') || null;

  useEffect(() => {
    const cookies = Cookies.get();
    setAllCookies(cookies);
  }, []);


  return token? (
    <>
        <div className='text-xl text-center bg-amber-300 text-red-500'>
            Welcome User
        </div>
        <div className='text-center'>
            <h2>Cookies : </h2>
            <pre>{JSON.stringify(allCookies, null, 2)}</pre>
      </div>
        <Logout/>   
    </>
  ) : (
    <div className='flex flex-col items-center justify-center space-y-6 h-dvh bg-gray-600'>
      <NavLink key='Login' to='/login'>
        <Button className="hover:text-black">Login</Button>
      </NavLink>
      <NavLink key='Reg' to='/registration'>
        <Button className="hover:text-black">Registration</Button>
      </NavLink>
    </ div>
  )
}

export default Home