export default function Pills({children}) {
  return (
    <>
      <div className="w-full rounded-full bg-gray-900 shadow-inner items-center flex outline-1 outline-amber-50">
        <div className="text-amber-50 w-full font-extralight text-sm flex justify-around overflow-hidden">
          {children}
        </div>
      </div>
    </>
  )
}
