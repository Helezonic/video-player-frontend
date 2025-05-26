import { useState } from 'react'
import { Button, Input }  from '../ui/index.js'
import { useForm } from 'react-hook-form'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
import { ThreeDot } from 'react-loading-indicators'
import { updUser } from '../../app/updateSlice.js'


export default function UpdateUserDetails(){
  const userData= useSelector((state)=>state?.auth?.userData)
  const [message,setMessage] = useState("")
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()
  const {handleSubmit, register} = useForm({
    defaultValues: {
      userName: userData?.userName,
      email: userData?.email,
      fullName: userData?.fullName
    }
  })

  const updateUser = async(data) => {
    try {
      setLoading(true)
      const response = await axios.post(
        'https://backend.clipsave.live/api/user/update-details',
        {fullName: data?.fullName}, // Send the FormData object as the request body
        {
          withCredentials: true,
        }
      );
      console.log('User Details updated successfully:', response.data);
      setMessage("Successful")
      await new Promise(resolve => setTimeout(resolve, 1500))
      dispatch(updUser())

      return response.data;

    } catch (error) {
      console.error('Error updating user details:',error.response?.data.message);
      setMessage("Unsuccessful")
      throw error
    } finally{
      setLoading(false)
    }
  }
return (
  <>
  <form className="flex flex-col sm:gap-2 gap-1 align-middle p-2" onSubmit={handleSubmit(updateUser)}>
      <Input
      label="Username"
      type= "text"
      placeholder="Old Password"
      disabled
      {...register(
        "userName",
        {required: true})}
      />
      
      <Input
      label="Email"
      type="email"      
      placeholder="New Password"
      disabled
      className="bg-gray-900"
      {...register(
        "email",
        {required : true} 
      )}
      />

      <Input
      label="Full Name"
      type="text"      
      placeholder="New Password"
      
      {...register(
        "fullName",
        {required : true} 
      )}
      />
      
      <Button type="submit" className={`${loading? null : "bg-green-600"} justify-center w-1/4 mx-auto flex gap-2`}>
         {loading? <ThreeDot color="#fffff" size="small" text="Updating" textColor="#ffffff" /> : <span>Update</span> }
      </Button>
      {message && <div className='text-2xl text-center text-white'>{message}</div>}
    </form>
  </>

)

}