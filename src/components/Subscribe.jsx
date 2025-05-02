import { Button } from "./ui"

const subscription = () => {
  alert("subscribed")
  console.log("subscribed")
}

export default function Subscribe() {
  return (
    <Button onClick={subscription} className="w-full mx-auto justify-center hover:border-b-2 hover:-translate-y-1 bg-red-500 hover:bg-red-700 text-center"> Subscribe </Button>
  )
}

