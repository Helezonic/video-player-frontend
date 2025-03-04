import React, { useEffect } from 'react'
import { useState } from 'react';
import { Button, Input } from '../components/ui/ui.js';
import axios from 'axios';  
import { NavLink, useNavigate } from 'react-router-dom';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userName, setuserName] = useState("");
    const [message, setMessage] = useState('');
    const [statusCode, setStatusCode] = useState(0);
    const [token, setToken] = useState(localStorage.getItem('token') || null);

    const navigate = useNavigate();

    useEffect(() => {
      console.log("Login")
      console.log(token? "Token" : "No Token")
      if(token)
      {
        localStorage.setItem('token', token) //setItem Stores null as "null", making it truthy
        navigate('/home')
      }
    }, [token]);

    const login = async (e) => {
        e.preventDefault();
        try {
          const response = await axios.post('https://video-player-backend-production.up.railway.app/api/user/login', { userName, email, password }, {withCredentials:true});
          setToken(response.data.data.accessToken);
          setMessage(response.data.message);
          setStatusCode(response.status);

        } catch (error) {
          setMessage(error.response?.data?.message || 'Login failed');
          setStatusCode(error.response?.status);
        }
      };

  return (
    
    <div className="min-h-screen flex flex-col items-center justify-center space-y-6 border-4 border-red-400 p-6">
      <div className="flex space-x-4">
        <NavLink key='Home' to='/home'>
          <Button className='bg-gray-600 hover:bg-black '>Home</Button>
        </NavLink>
        <NavLink key='Reg' to='/registration'>
          <Button className='bg-gray-600 hover:bg-black'>Registration</Button>
        </NavLink>
      </div>
      <h1 className="text-3xl font-bold">Auth Testing App</h1>
      <h1 className="text-2xl font-bold">Login</h1>
      <form className="space-y-4" onSubmit={login}>
        
        <Input
          placeholder="Username"
          value={userName}
          onChange={(e) => setuserName(e.target.value)}
          required
        />
        <Input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      
        <div className=" flex justify-center">
          <Button type="submit" className="bg-blue-500 hover:bg-blue-700">Login</Button>
        </div> 
        
      </form>
      {message && <p className={`text-lg text-center ${statusCode>=400? "text-red-500" : "text-green-500"}`}>{message}</p>}
    
    </div>
  )
}

export default Login