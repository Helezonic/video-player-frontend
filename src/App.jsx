import { useEffect, useState } from 'react';
import Registration from './pages/Registration.jsx';
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';

export default function AuthApp() { 
  const [token, setToken] = useState(localStorage.getItem('token') || null);


  return !token ? <Login/> : <Home/>
    
  
}
