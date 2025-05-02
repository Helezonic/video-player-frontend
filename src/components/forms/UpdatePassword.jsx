import { useState } from 'react'
import { Button, Input }  from '../ui/index.js'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { updPass } from '../../app/updateSlice.js'
import axios from 'axios'
import { ThreeDot } from 'react-loading-indicators'


export default function UpdatePassword(){
  const {handleSubmit, register} = useForm()
  const [message,setMessage] = useState("")
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  
  const updatePassword = async(data) => {
   
    try {
      setLoading(true)
      
      const response = await axios.post(
        'https://video-player-backend-production.up.railway.app/api/user/update-pass',
        {oldPassword: data?.oldPassword || "", newPassword: data?.newPassword || ""}, // Send the FormData object as the request body
        {
          withCredentials: true,
        }
      );
      console.log('Passwords updated successfully:', response.data);
      setMessage("Successful")
      await new Promise(resolve => setTimeout(resolve, 1500))
      dispatch(updPass())
      return response.data;

    } catch (error) {
      console.error('Error updating passwords:',error.response.data.message);
      setMessage("Unsuccessful")
      throw error
    } finally{
      setLoading(false)
    }
  }
  
  
  
  return (
    <>
    <form className="flex flex-col sm:gap-2 gap-1 align-middle p-2" onSubmit={handleSubmit(updatePassword)}>
      <Input
      label="Old Password"
      type= "password"
      placeholder="Old Password"
      
      {...register(
        "oldPassword",
        {required: true})}
      />
      
      <Input
      label="New Password"
      type="password"      
      placeholder="New Password"
      
      {...register(
        "newPassword",
        {required : true} 
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