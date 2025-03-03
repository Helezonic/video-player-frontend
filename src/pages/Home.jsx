import React from 'react'
import Logout from '../components/Logout'
import Cookies from 'js-cookie'
import { useEffect, useState } from 'react';

function Home() {
    const [allCookies, setAllCookies] = useState({});

  useEffect(() => {
    const cookies = Cookies.get();
    setAllCookies(cookies);
  }, []);
  return (
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
  )
}

export default Home