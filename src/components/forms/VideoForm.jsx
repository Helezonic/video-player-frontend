import { useState } from 'react'
import { Button, Input }  from '../ui/index.js'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { useDispatch } from 'react-redux'

import { ThreeDot } from 'react-loading-indicators'


export default function VideoForm(){

const {handleSubmit, register} = useForm()
const dispatch = useDispatch()
const [loading, setLoading] = useState(false)
const [message, setMessage] = useState('');
const [statusCode, setStatusCode] = useState(500);

const uploadVideo = async (data) => {
  
  const formData = new FormData(); //FormData because images are used - multipart
  formData.append('thumbnail', data?.thumbnail[0]);
  formData.append('video', data?.video[0]);
  formData.append('description', data?.description);


  try {
    setLoading(true)
    console.log(formData);
    const response = await axios.post(
      'https://video-player-backend-production.up.railway.app/api/user/register', 
      formData,
      { headers: { 'Content-Type': 'multipart/form data'}}
    );
    setMessage(response.data.message);
    setStatusCode(response.status);
    setLoading(false)
    await new Promise(resolve => setTimeout(resolve, 1500))
    

  } catch (error) {
    setLoading(false)
    setMessage(error.response?.data?.message || 'Registration failed');
    setStatusCode(error.response?.status);
  }
};



return (
  <>
  <form className="flex flex-col sm:gap-2 gap-1 align-middle p-2" onSubmit={handleSubmit(uploadVideo)}>
    <Input
    label="Thumbnail"
    type= "file"
    accept="image/png, image/jpg, image/gif"
    placeholder="Thumbnail"
    
    {...register("thumbnail", {required: true})}
    />
    
    <Input
    label="Video"
    type="file"
    accept="image/png, image/jpg, image/gif"
    placeholder="Avatar"
    
    {...register(
      "video",
      {required : true} 
    )}
    />

    <Input
    label="Description"
    type="text"
    accept="image/png, image/jpg, image/gif"
    placeholder="Description"
    
    {...register(
      "description",
      {required : true} 
    )}
    />
    
    <Button type="submit" className={`${loading? null : "bg-green-600"} justify-center w-1/4 mx-auto flex gap-2`}>
       {loading? <ThreeDot color="#fffff" size="small" text="Uploading" textColor="#ffffff" /> : <span>Upload</span> }
    </Button>

    {message && <p className={`text-lg text-center ${statusCode>200? "text-red-500" : "text-green-500"}`}>{message}</p>}
  </form>
  </>

)

}