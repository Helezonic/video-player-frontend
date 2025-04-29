import React from 'react'
import Button from './ui/Button';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';  

function Logout() {
    const navigate = useNavigate()
    const [token, setToken] = useState(localStorage.getItem('token') || null);
    const [message, setMessage] = useState('');


    useEffect(() => {
        console.log("Logout Page")
    }, []);


    const logout = async () => {
        try {
          localStorage.removeItem('token');
          
          const response = await axios.post('https://video-player-backend-production.up.railway.app/api/user/logout', {}, {
            withCredentials: true,
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          
          setMessage(response.data.message);
          setToken(null);
          
        } catch (error) {
          setMessage(error.response?.data?.message || 'Logout failed');
        } finally {
          navigate('/login');
        }
      };

      
  return (
    <div className="text-center">
        <Button onClick={logout} className="w-full bg-red-500 hover:bg-red-700">Logout</Button>
        <p>{message}</p>
    </div>
    
  )
}

export default Logout