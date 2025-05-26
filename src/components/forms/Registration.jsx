import React from 'react'
import { useState } from 'react';
import { Button, Input } from '../ui';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';

function RegistrationForm() {
  const [token, setToken] = useState(localStorage.getItem('token') || null);

  const {handleSubmit, register} = useForm()
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('');
  const [statusCode, setStatusCode] = useState(500);

    const registration = async (data) => {
    
      const formData = new FormData(); //FormData because images are used - multipart
      formData.append('userName', data?.username);
      formData.append('fullName', data?.fullname);
      formData.append('email', data?.email);
      formData.append('password', data?.password);
      formData.append('avatar', data?.avatarImage[0]);
      formData.append('coverImage', data?.coverImage[0]);

      try {
        console.log(formData);
        const response = await axios.post(
          'https://backend.clipsave.live/api/user/register', 
          formData,
          { headers: { 'Content-Type': 'multipart/form data'}}
        );
        setMessage(response.data.message);
        setStatusCode(response.status);
        
        
      } catch (error) {
        setMessage(error.response?.data?.message || 'Registration failed');
        setStatusCode(error.response?.status);
      }
    };

  return (
    <>
      
        <div>
          <div className=" text-xl font-medium text-white text-center">
            Register
          </div>

          <form className="flex flex-col sm:gap-2 gap-1 align-middle p-2" onSubmit={handleSubmit(registration)}>
            
            <Input
            label="Fullname"
            type= "text"
            placeholder="Fullname"
            
            {...register("fullname", {required: true})}
            />

            <Input
            label="Username"
            type= "text"
            placeholder="Username"
            
            {...register("username", {required: true})}
            />

            <Input
            label="Email"
            type= "email"
            placeholder="Email"
            
            {...register("email", {required: true})}
            />
            
            <Input
            label="Password"
            type="password"
            placeholder="password"
            
            {...register(
              "password",
              {required : true} 
            )}
            />

            <Input
            label="Avatar Image"
            type="file"
            accept="image/png, image/jpg, image/gif"
            placeholder="Avatar"
            
            {...register(
              "avatarImage",
              {required : true} 
            )}
            />

            <Input
            label="Cover Image"
            type= "file"
            accept="image/png, image/jpg, image/gif"
            placeholder="Cover Image"
            
            {...register(
              "coverImage",
              {required: true})}
            />
            
            

            <Button type="submit" className={`${loading? null : "bg-blue-500 hover:bg-blue-700"} justify-center w-1/4 mx-auto flex gap-2`}>
              {loading? <ThreeDot color="#fffff" size="small"  textColor="#ffffff" /> : <span>Register</span> }
            </Button>
          
          </form>
        {message && <p className={`text-lg text-center ${statusCode>=400? "text-red-500" : "text-green-500"}`}>{message}</p>}
      </div>
    
  
    </>
  )
}

export default RegistrationForm