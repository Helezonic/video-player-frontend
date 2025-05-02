import React, { useEffect } from 'react'
import { useState } from 'react'; 
import { LoginForm } from '../components/forms/LoginForm.jsx'
import { TabGroup, TabList, Tab, TabPanel, TabPanels } from '@headlessui/react';
import RegistrationForm from '../components/forms/Registration.jsx';
import { useNavigate } from 'react-router-dom';

export default function Auth() {
  const navigate = useNavigate()
  const [token, setToken] = useState(localStorage.getItem('token') || null);

  useEffect(() => {
    console.log("Auth Page")
    console.log(token? "Token from localStorage" : "No Token from localStorage")
    if(token)
    {
      localStorage.setItem('token', token) //Get accesstoken from response, store it in localstorage. setItem Stores null as "null", making it truthy
      navigate('/home')
    }
  }, [token]);


  return (
    <div className="flex h-screen w-full justify-center px-4 pt-24">
      <div className="w-full max-w-md">
      <TabGroup>
      <TabList className="flex gap-4">
        <Tab className="rounded-full px-3 py-1 text-sm/6 font-semibold text-white focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white data-hover:bg-white/5 data-selected:bg-white/10 data-selected:data-hover:bg-white/10">Login</Tab>
        <Tab className="rounded-full px-3 py-1 text-sm/6 font-semibold text-white focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white data-hover:bg-white/5 data-selected:bg-white/10 data-selected:data-hover:bg-white/10">Registration</Tab>
        
      </TabList>
      <TabPanels className="mt-3">
        <TabPanel className="rounded-xl bg-white/5 p-3">
        <LoginForm tokenChange={setToken}/>
        </TabPanel>
        <TabPanel className="rounded-xl bg-white/5 p-3">
        <RegistrationForm/>
        </TabPanel>
      </TabPanels>
    </TabGroup>
      </div>
    </div>
  )
}