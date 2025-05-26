import { useState } from 'react'
import { Button, Input }  from '../ui/index.js'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { updImage } from '../../app/updateSlice.js'
import { ThreeDot } from 'react-loading-indicators'


export function LoginForm({tokenChange}){

const {handleSubmit, register} = useForm()
const [loading, setLoading] = useState(false)
const [message, setMessage] = useState('');
const [statusCode, setStatusCode] = useState(500);

const login = async(data) => {

  try {
    setLoading(true)
    const response = await axios.post(
      'https://backend.clipsave.live/api/user/login', 
      {userName: data?.username, email : data?.email, password : data?.password },
      {
        withCredentials: true,
      }
    );
    console.log('Logged in successfully:', response.data);
    setMessage(response.data.message);
    setStatusCode(response.status);
    setLoading(false)
    await new Promise(resolve => setTimeout(resolve, 1500))
    tokenChange(response.data.data.accessToken)
    return response.data;
  } catch (error) {
    setMessage(error.response?.data?.message || 'Login failed');
    setStatusCode(error.response?.status)
    
    console.error('Error logging:', error);
    throw error;
  } finally{
    setLoading(false)
  }
}


return (
  <>
  <div className=" text-xl font-medium text-white text-center">
    Login
  </div>
  <form className="flex flex-col sm:gap-2 gap-1 align-middle p-2" onSubmit={handleSubmit(login)}>

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
    
    <Button type="submit" className={`${loading? "hidden" : "bg-blue-500 hover:bg-blue-700"} justify-center w-1/4 mx-auto flex gap-2`}>
       {loading? <ThreeDot color="#fffff" size="small"  textColor="#ffffff" /> : <span>Login</span> }
    </Button>

    {message && <p className={`text-lg text-center ${statusCode>200? "text-red-500" : "text-green-500"}`}>{message}</p>}

  </form>
  </>

)

}