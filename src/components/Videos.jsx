import { PlusIcon } from "@heroicons/react/16/solid";
import Modal from "./Modal";
import UpdateImages from "./forms/UpdateImages";
import VideoForm from "./forms/VideoForm";

export default function Videos() {
  return (
    <>
    <div className="rounded-xl m-2 bg-gray-800 ">
      <hr className=" mx-auto mt-2 text-white/10"/>
      <div className="  w-full flex gap-2 items-center p-4">
        <div className="text-3xl text-white font-semibold">
          VIDEOS
        </div>
        <Modal
        className="group  overflow-clip  hover:scale-110 transition-all 200 hover:bg-white/5 w-[50px] h-[50px] hover:border-2 border-bg-white/10 p-4  bg-white/10 ease-in-out"
        buttonChildren={<span className="group w-full  transition-all 200 text-center   text-white/30 shadow-2xl font-bold">
          <PlusIcon className="group-hover:scale-150 group-hover:fill-white transition-all 200 fill-white/50 ease-in-out z-10"/>
          
        </span>
        }
        title="Add Video"
        >
          <VideoForm/>
        </Modal>
        
      </div>
      
      
      
    </div>
    
    </>
  )
}