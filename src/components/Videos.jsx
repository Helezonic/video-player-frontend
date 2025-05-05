import { PlusIcon, PlayIcon, EyeIcon } from "@heroicons/react/16/solid";
import Modal from "./Modal";
import UpdateImages from "./forms/UpdateImages";
import VideoForm from "./forms/VideoForm";
import { Link } from "react-router-dom";


export default function Videos({allVideos, isOwner}) {
  
  return (
    <>
    <div className="rounded-xl m-2 bg-gray-800 ">
      <hr className=" mx-auto mt-2 text-white/10"/>
      <div className="  w-full flex gap-2 items-center p-4">
        <p className="text-3xl text-white font-semibold">
          VIDEOS 
        </p>

        {isOwner && <Modal
        className="group  overflow-clip  hover:scale-110 transition-all 200 hover:bg-white/5 w-[50px] h-[50px] hover:border-2 border-bg-white/10 p-4  bg-white/10 ease-in-out"
        buttonChildren={
          <span className="group w-full  transition-all 200 text-center   text-white/30 shadow-2xl font-bold">
            <PlusIcon className="group-hover:scale-150 group-hover:fill-white transition-all 200 fill-white/50 ease-in-out z-10"/>
          </span>
        }
        title="Add Video"
        >
          <VideoForm/>
        </Modal>
        }
      </div>
      
      {allVideos && allVideos.length>0 ? ( allVideos.map((video)=>(
          <Link 
          to={`/video/${video._id}`}
          state={{ videoDetails: video }}
          key={video._id} 
          className="group cursor-pointer relative inline-grid w-1/4 p-1 shadow-inner shadow-black rounded-2xl  overflow-clip hover:bg-white/10 hover:opacity-85 group-hover:opacity-100">
            <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <PlayIcon className="h-12 w-12 text-white" />
            </div>
            <img src={video.thumbnail} alt={video.title} className="h-[200px] w-full object-cover overflow-auto" />
            <p className="text-white text-center text-2xl font-bold bg-black p-2">{video.title}</p>
            <div className="flex justify-between bg-gray-900 text-white p-2">
              <p>{video.description}</p>
              <div className="flex gap-2 justify-center text-sm items-center">
                <EyeIcon className="h-5  text-white" />
                <p>{video.views}</p>
              </div>
            </div>
          </Link>
        ))
      ) : (
        <div className="text-gray-400 p-4">{!allVideos || allVideos.length == 0 ? "No videos available." : "Loading..."}</div>
      )}
      
    </div>
    
    </>
  )
}