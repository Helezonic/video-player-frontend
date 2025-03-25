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
    const [statusCode, setStatusCode] = useState(500);
    const [token, setToken] = useState(localStorage.getItem('token') || null);

    const navigate = useNavigate();

    useEffect(() => {
      console.log("Login Page")
      console.log(token? "Token from localStorage" : "No Token from localStorage")
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
          console.log("Logged in")
          setToken(response.data.data.accessToken);
          setMessage(response.data.message);
          setStatusCode(response.status);

        } catch (error) {
          setMessage(error.response?.data?.message || 'Login failed');
          setStatusCode(error.response?.status);
        }
      };

  return (
    
    <div className="min-h-screen flex flex-col items-center justify-center space-y-6 border-4 border-red-400 p-6 bg-gray-600">
      <div className="h-50% bg-gray-200 rounded-xl p-5 flex flex-col items-center justify-center space-y-6">
        <div className="flex space-x-4 ">
          <NavLink key='Home' to='/home'>
            <Button className='bg-gray-700 hover:bg-black '>Home</Button>
          </NavLink>
          <NavLink key='Reg' to='/registration'>
            <Button className='bg-gray-700 hover:bg-black'>Registration</Button>
          </NavLink>
        </div>
        
        <h1 className="text-2xl font-bold ">Login</h1>
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
        {message && <p className={`text-lg text-center ${statusCode!==200? "text-red-500" : "text-green-500"}`}>{message}</p>}
      </div>
      <div>
        <p className="text-sm text-gray-200">SAMPLE DATASET</p>
        <ol className='text-sm text-gray-200'>
          <li>Username:abcd</li>
          <li>Email : abcd@gmail.com</li>
          <li>Password : password12</li>
        </ol>
          
      </div>
    </div>
  )
}

export default Login