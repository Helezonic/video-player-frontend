import { useState } from 'react';
import { Button, Input } from './components/ui/ui.js';
import axios from 'axios';

export default function AuthApp() {
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState('');
  const [username, setusername] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [coverImage, setCoverImage] = useState(null);
  const [token, setToken] = useState(null);
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

  const login = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://backend-url/api/auth/login', { email, password });
      setToken(response.data.token);
      setMessage('Login successful');
    } catch (error) {
      setMessage(error.response?.data?.message || 'Login failed');
    }
  };

  const logout = async () => {
    try {
      const response = await axios.post('https://backend-url/api/auth/logout', {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setToken(null);
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response?.data?.message || 'Logout failed');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center space-y-6 border-4 border-red-400 p-6">
      <h1 className="text-3xl font-bold border-2 border-amber-300">Auth Testing App</h1>
      <form className="space-y-4" onSubmit={token ? logout : login}>
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
          
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Input
          
          type="file"
          placeholder="Avatar"
          accept="image/png, image/jpg, image/gif"
          onChange={(e) => setAvatar(e.target.files[0])}
          required
        />
        <Input
          
          type="file"
          placeholder="Coverimage"
          accept="image/png, image/jpg, image/gif"
          onChange={(e) => setCoverImage(e.target.files[0])}
          required
        />
        {!token ? (
          <div className=" flex justify-between">
            <Button onClick={register} type="button" className="bg-blue-500">Register</Button>
            <Button type="submit" className="bg-blue-500">Login</Button>
          </div>
        ) : (
          <Button type="submit" className="bg-blue-500">Logout</Button>
        )}
      </form>
      {message && <p className={`text-lg text-center ${statusCode>=400? "text-red-500" : "text-green-500"}`}>{message}</p>}
    </div>
  );
}
