import { useState } from 'react'
import { Button, Input }  from '../ui/index.js'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { updImage } from '../../app/updateSlice.js'
import { ThreeDot } from 'react-loading-indicators'


export default function UpdateImages(){

const {handleSubmit, register} = useForm()
const [message,setMessage] = useState("")
const dispatch = useDispatch()
const [loading, setLoading] = useState(false)

const updateImages = async(data) => {
  const formData = new FormData();

  // Append the cover image if it exists
  if (data.coverImage && data.coverImage[0]) {
    formData.append('coverImage', data.coverImage[0]); // 'coverImage' is the field name the backend expects
  }

  // Append the avatar image if it exists
  if (data.avatarImage && data.avatarImage[0]) {
    formData.append('avatar', data.avatarImage[0]); // 'avatarImage' is the field name the backend expects
  }

  try {
    setLoading(true)
    const response = await axios.post(
      'https://clipsave.live/api/user/update-img',
      formData, // Send the FormData object as the request body
      {
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data', // Important for file uploads
        },
      }
    );
    console.log('Images updated successfully:', response.data);
    
    setMessage("Successful")
    await new Promise(resolve => setTimeout(resolve, 1500))
    dispatch(updImage())
  
    return response.data;
  } catch (error) {
    console.error('Error updating images:', error);
    throw error;
  } finally{
    setLoading(false)
  }
}



return (
  <>
  <form className="flex flex-col sm:gap-2 gap-1 align-middle p-2" onSubmit={handleSubmit(updateImages)}>
    <Input
    label="Cover Image"
    type= "file"
    accept="image/png, image/jpg, image/gif"
    placeholder="Cover Image"
    
    {...register("coverImage", {required: false})}
    />
    
    <Input
    label="Avatar Image"
    type="file"
    accept="image/png, image/jpg, image/gif"
    placeholder="Avatar"
    
    {...register(
      "avatarImage",
      {required : false} 
    )}
    />
    
    <Button type="submit" className={`${loading? null : "bg-green-600"} justify-center w-1/4 mx-auto flex gap-2`}>
       {loading? <ThreeDot color="#fffff" size="small" text="Updating" textColor="#ffffff" /> : <span>Update</span> }
    </Button>

    {message && <div className='font-semibold text-center text-white'>{message}</div>}
  </form>
  </>

)

}