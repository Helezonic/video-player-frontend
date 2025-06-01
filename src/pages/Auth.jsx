import React, { useEffect } from 'react'
import { useState } from 'react'; 
import { LoginForm } from '../components/forms/LoginForm.jsx'
import { TabGroup, TabList, Tab, TabPanel, TabPanels } from '@headlessui/react';
import RegistrationForm from '../components/forms/Registration.jsx';
import { useNavigate } from 'react-router-dom';
import { sampleUsers } from './sampleUser.js';
import { ArrowUpRightIcon } from '@heroicons/react/16/solid';
import '../index.css'

const imageUrls = [
  'https://images.unsplash.com/photo-1508138221679-760a23a2285b?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://plus.unsplash.com/premium_photo-1663936756850-5288c3ad1593?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://plus.unsplash.com/premium_photo-1664391886020-cf87952aa1f1?q=80&w=1936&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  
  'https://images.unsplash.com/photo-1473172707857-f9e276582ab6?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
];

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
    <div className="sm:flex  min-h-screen w-full justify-center items-start px-4 sm:py-24 ">
      {/* LOGO */}
      <div className='sm:m-2 sm:w-1/2 flex  flex-col items-center justify-center h-full '>
        <div  className=" justify-center font-extrabold sm:text-6xl text-4xl p-2 mx-2 flex w-full items-center">
          <img src="icon.png" alt="icon"/>
          <p className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-shadow-lg shadow-black outline-2 outline-offset-2  transition-all duration-100">
            CLIPSAVE
          </p>
        </div>
        <p className='text-xl font-extralight tracking-widest italic text-slate-100'>VIDEO MANAGEMENT SYSTEM</p>
        <div className="image-container">
          {imageUrls.map((url, index) => (
            <img key={index} src={url} alt={`Floating ${index}`} className={`floating-img float-${index % 3}`} />
          ))}
        </div>
      </div>
      <div className='sm:m-2 mt-10 sm:mt-0 md:w-1/2 w-full h-full md:flex justify-center items-start'>
        {/* AUTH */}
        <div className="md:w-1/2  mb-2 ">
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
        <div className='flex flex-col justify-between h-full gap-2 mb-2 sm:mx-2 md:w-fit w-full '>
          {/* DATASET */}
          <div className='md:w-fit h-fit bg-white/5  p-2 rounded-2xl '> <p className='font-bold text-center text-gray-200'>SAMPLE DATASET</p>
            {sampleUsers.map((user) => (
              <div key={user.Set} className='p-2 text-gray-400 text-sm text-left font-mono'>
                <p className=''>Full Name : {user.FullName}</p>
                <p>Username : {user.Username}</p>
                <p>Email : {user.Email}</p>
                <p>Password : {user.Password}</p>
              </div>
            ))}
            
          </div>
          
        </div>
        
      </div>
      {/* LINKS */}
      <div className='fixed bottom-0 flex w-full h-fit bg-black/70 p-4 justify-center'>
          <p className=" text-gray-300 px-2">Check Source Code : </p>
          <a href="https://github.com/Helezonic/video-player-frontend" target="_blank">
            <p className="hover:text-white text-amber-100  font-bold ">
              Frontend Github Link 
              <ArrowUpRightIcon className="h-4 inline-flex pr-2"/>
              |
            </p>
          </a>
          <p className=" text-gray-300 px-2">Read Documentation : </p>
          <a href="https://github.com/Helezonic/video-player-backend" target="_blank">
            <p className="hover:text-white text-amber-100 font-bold">
              Backend Github Link 
              <ArrowUpRightIcon className="h-4 inline-flex"/>
            </p>
          </a>
        </div>
      
    </div>

  )
}