import { Link,useNavigate } from "react-router-dom"
import Button from "./ui/Button"

import { useSelector } from "react-redux"


export default function Sidebar({active}) {
// Select all users from the Redux state
const users = useSelector((state) => state.getUsers?.users);

  return (
    <>
      <div className={` bg-gray-800 ${active? "sm:w-1/4 p-2 xl:w-1/8" : "w-0"} transition-all 200 flex flex-col gap-2`}>
        <Link to={"/feed"}>
          <Button className="w-full">Feed</Button>
        </Link>
        <Link to={"/home"}>
          <Button className="w-full">Home</Button>
        </Link>
        <Link to={"/history"}>
          <Button className="w-full">History</Button>
        </Link>
        <div className="mt-3 font-extrabold text-blue-200 text-xl ">Channels</div>
        <hr/>
        
        {users &&
         users.map((user)=> (
          <Link to={`/user/${user._id}`} key={user._id}>
            < Button  className='w-full'>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full border-2 overflow-clip">
                  <img loading='lazy' alt={user.id} src={user.avatar} className="h-full "/>
                </div>
                <div>{user.fullName}</div>
              </div>
            </Button>
          </Link>
         ))
        }

      </div>
    </>
  )
}