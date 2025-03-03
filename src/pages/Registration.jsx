import React from 'react'
import { useState } from 'react';
import { Button, Input } from '../components/ui/ui.js';
import axios from 'axios';

function Registration() {
    const [email, setEmail] = useState('');
    const [fullName, setFullName] = useState("");
    const [password, setPassword] = useState('');
    const [username, setusername] = useState("");
    const [avatar, setAvatar] = useState(null);
    const [coverImage, setCoverImage] = useState(null);
    const [message, setMessage] = useState('');
    const [statusCode, setStatusCode] = useState(0);

    const register = async (e) => {
      e.preventDefault();
      const formData = new FormData();
      formData.append('userName', username);
      formData.append('fullName', fullName);
      formData.append('email', email);
      formData.append('password', password);
      formData.append('avatar', avatar);
      formData.append('coverImage', coverImage);
      try {
        console.log(formData);
        const response = await axios.post('https://video-player-backend-production.up.railway.app/api/user/register', formData,{ headers: { 'Content-Type': 'multipart/form data'}});
        setMessage(response.data.message);
        setStatusCode(response.status);
        if (response)
          window.location.href = ('https://video-player-backend-production.up.railway.app');
      } catch (error) {
        setMessage(error.response?.data?.message || 'Registration failed');
        setStatusCode(error.response?.status);
      }
    };

  return (
    <>
      <div className="min-h-screen flex flex-col items-center justify-center space-y-6 border-4 border-red-400 p-6">
      <h1 className="text-3xl font-bold">Auth Testing App</h1>
      <form className="space-y-4" onSubmit={register}>
        <h1 className="text-2xl font-bold">Register</h1>
        <p className="text-lg">Please fill in this form to create an account.</p>
        <hr />
        <Input
          placeholder="Full Name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
        />
        <Input
          placeholder="Username"
          value={username}
          onChange={(e) => setusername(e.target.value)}
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
        <Input
          placeholder="Avatar"
          type="file"
          accept="image/png, image/jpg, image/gif"
          onChange={(e) => setAvatar(e.target.files[0])}
          required
        />
        <Input
          placeholder="Coverimage"
          type="file"
          accept="image/png, image/jpg, image/gif"
          onChange={(e) => setCoverImage(e.target.files[0])}
          required
        />
        <div className=" flex justify-center">
          <Button type="submit" className="bg-blue-500">Register</Button>
        </div>

      </form>
      {message && <p className={`text-lg text-center ${statusCode>=400? "text-red-500" : "text-green-500"}`}>{message}</p>}
    </div>
  
    </>
  )
}

export default Registration