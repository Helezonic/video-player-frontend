import Button from "./ui/Button"



export default function Sidebar({active}) {

  return (
    <>
      <div className={` bg-gray-800 ${active? "sm:w-1/4 p-2 xl:w-1/8" : "w-0"} transition-all 200 flex flex-col gap-2`}>
        <Button>History</Button>
        <div className="mt-3 font-extrabold text-white text-xl ">Channels</div>
        <hr/>
        <Button>
          <div>Image</div>
          <div>Name</div>
        </Button>
        <Button>
          <div>Image</div>
          <div>Name</div>
        </Button>
        <Button>
          <div>Image</div>
          <div>Name</div>
        </Button>
        <Button>
          <div>Image</div>
          <div>Name</div>
        </Button>
      </div>
    </>
  )
}