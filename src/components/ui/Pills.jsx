export default function Pills({text}) {
  return (
    <>
      <div className="w-[150px] h-[50px] rounded-2xl bg-gray-900 mx-2 p-2 shadow-inner  justify-center items-center flex">
        <span className="text-amber-50 font-extralight">{text}</span>
      </div>
    </>
  )
}
