import React, { useEffect } from 'react'
import { useState } from 'react'; 
import { LoginForm } from '../components/forms/LoginForm.jsx'
import { TabGroup, TabList, Tab, TabPanel, TabPanels } from '@headlessui/react';
import RegistrationForm from '../components/forms/Registration.jsx';
import { useNavigate } from 'react-router-dom';
import { sampleUsers } from './sampleUser.js';
import { ArrowUpRightIcon } from '@heroicons/react/16/solid';

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
    <div className="flex h-screen w-full justify-center items-start px-4 py-24 ">
      <div className='m-2 w-1/2 flex flex-col items-center justify-center h-full'>
        <div  className=" font-extrabold text-6xl justify-center p-2 mx-2 flex items-center">
          <img src="icon.png" alt="icon"/>
          <p className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-shadow-lg shadow-black outline-2 outline-offset-2  transition-all duration-100">
            CLIP SAVE
          </p>
        </div>
        <p className='text-xl font-extralight tracking-widest italic text-slate-100'>SAVE YOUR CLIPS</p>
      </div>
      <div className='m-2 w-1/2 h-full flex justify-center items-start'>
        <div className="w-1/2 max-w-md mb-2 ">
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
        <div className='flex flex-col justify-between h-full gap-2 mb-2 mx-2 w-fit '>
          <div className='w-fit h-fit bg-white/5  p-2 rounded-2xl '> <p className='font-bold text-center text-gray-200'>SAMPLE DATASET</p>
            {sampleUsers.map((user) => (
              <div key={user.Set} className='p-2 text-gray-400 text-sm text-left font-mono'>
                <p className=''>Full Name : {user.FullName}</p>
                <p>Username : {user.Username}</p>
                <p>Email : {user.Email}</p>
                <p>Password : {user.Password}</p>
              </div>
            ))}
            
          </div>
          <div className='w-full h-fit bg-black/40 p-4 rounded-2xl font-bold'>
            <a href="https://github.com/Helezonic/video-player-frontend" target="_blank">
              <p className="hover:text-white text-gray-300  text-left ">
                Frontend Github Link 
                <ArrowUpRightIcon className="h-4 inline-flex"/>
              </p>
            </a>
            <a href="https://github.com/Helezonic/video-player-backend" target="_blank">
              <p className="hover:text-white text-gray-300 ">
                Backend Github Link 
                <ArrowUpRightIcon className="h-4 inline-flex"/>
              </p>
            </a>
          </div>
        </div>
      </div>
      
      
    </div>

  )
}