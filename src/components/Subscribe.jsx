import axios from "axios"
import { Button } from "./ui"
import { useCallback, useState } from "react"



export default function Subscribe({userId}) {
  const [isSubscribed, setIsSubscribed] = useState(false)

   
 
  // Memoized function to handle subscription
  const subscribe = useCallback(async () => {
    try {
      const response = await axios.post(
        `https://video-player-backend-production.up.railway.app/api/user/subscribe/${userId}`,
        {},
        { withCredentials: true }
      );
      console.log("Subscribed to", userId, "Response:", response.data?.data);
      setIsSubscribed(true); // Update state to reflect subscription
    } catch (error) {
      console.error("Error subscribing to channel:", error);
    }
  }, [userId]);

  // Memoized function to handle unsubscription
  const unsubscribe = useCallback(async () => {
    try {
      const response = await axios.post(
        `https://video-player-backend-production.up.railway.app/api/user/unsubscribe/${userId}`,
        {},
        { withCredentials: true }
      );
      console.log("Unsubscribed from", userId, "Response:", response.data?.data);
      setIsSubscribed(false); // Update state to reflect unsubscription
    } catch (error) {
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
    <Button onClick={handleClick} className={`w-full mx-auto justify-center hover:border-b-2 hover:-translate-y-1 ${!isSubscribed ? "bg-red-500 hover:bg-red-700" : "bg-gray-600"} text-center`}> {!isSubscribed? "Subscribe" : "Unsubscribe"} </Button>
  )
}

