export default function Mainbar({children}) {
  return (
    <>
      <div className="flex flex-col grow bg-gray-900 sm:w-3/4  p-2 xl:w-7/8">
        {children}
      </div>
    </>
  )
}