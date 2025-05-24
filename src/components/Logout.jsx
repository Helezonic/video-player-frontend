import React from 'react'
import Button from './ui/Button';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';  
import { ThreeDot } from 'react-loading-indicators';


function Logout() {
    const navigate = useNavigate()
    const [token, setToken] = useState(localStorage.getItem('token') || null);
    const [loading,setLoading] = useState(false)
    const [message, setMessage] = useState('');


    useEffect(() => {
        console.log("Logout Page")
    }, []);


    const logout = async () => {
        try {
          
          setLoading(true)
          const response = await axios.post('/api/user/logout',
            {}, 
            {
            withCredentials: true,
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          localStorage.removeItem('token')
          setMessage(response.data.message);
          
          setToken(null);
          setLoading(false)
          await new Promise(resolve => setTimeout(resolve, 1500))
          navigate('/auth')
        } catch (error) {
          setMessage(error.response?.data?.message || 'Logout failed');
        }
      };

      
  return (
    <>
        <Button onClick={logout} className={`${loading? "hidden" : "w-full bg-red-500 hover:bg-blue-700"} justify-center w-1/4 mx-auto flex gap-2`}>
          {loading? <ThreeDot color="#ffffff" size="small"  textColor="#ffffff" /> : <span>Logout</span> }
        </Button>
        {message && <p className=' w-fit mx-auto text-white'>{message}</p>}
    </>
    
  )
}

export default Logout