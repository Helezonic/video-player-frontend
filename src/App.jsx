
import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import {logout} from "./app/authSlice.js"
import { useDispatch } from 'react-redux';


export default function App() { 
  const token = localStorage.getItem('token') || null;
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    console.log(token)
    if (!token)
    {
      dispatch(logout());
      navigate("/auth")
    } else
    navigate("/home")
    }, [token]);

  return (
    <div className='bg-gray-900 h-dvh'>
      <Outlet/>
    </div>
    
  )
  
}

