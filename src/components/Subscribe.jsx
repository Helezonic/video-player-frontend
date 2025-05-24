import axios from "axios"
import { Button } from "./ui"
import { useCallback, useState } from "react"



export default function Subscribe({isSubscribed, userId, fetchUserDetails}) {

  const [loading, setLoading] = useState(false)
  // Memoized function to handle subscription
  const subscribe = useCallback(async () => {
    try {
      setLoading(true)
      const response = await axios.post(
        `https://clipsave.live/api/user/subscribe/${userId}`,
        {},
        { withCredentials: true }
      );
      console.log("Subscribed to", userId, "Response:", response.data?.data);
      fetchUserDetails()
    } catch (error) {
      setLoading(false)
      console.error("Error subscribing to channel:", error);
    }
  }, [userId]);

  // Memoized function to handle unsubscription
  const unsubscribe = useCallback(async () => {
    try {
      setLoading(true)
      const response = await axios.post(
        `https://clipsave.live/api/user/unsubscribe/${userId}`,
        {},
        { withCredentials: true }
      );
      fetchUserDetails()
      console.log("Unsubscribed from", userId, "Response:", response.data?.data);
    } catch (error) {
      setLoading(false)
      console.error("Error unsubscribing from channel:", error);
    }
  }, [userId]);

  // Handle button click
  const handleClick = () => {
    if (isSubscribed) {
      unsubscribe();
    } else {
      subscribe();
    }
  };


  return (
    <Button onClick={handleClick} className={`w-full mx-auto justify-center hover:border-b-2 hover:-translate-y-1 ${!isSubscribed ? "bg-red-500 hover:bg-red-700" : "bg-gray-600"} text-center`}> 
    {!loading ? ((!isSubscribed) ? "Subscribe" : "Unsubscribe") : <p>Wait..</p>} 
    </Button>
  )
}

