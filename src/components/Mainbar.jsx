export default function Mainbar({children}) {
  return (
    <>
      <div className="flex flex-col bg-gray-900 flex-auto">
        {children}
      </div>
    </>
  )
}