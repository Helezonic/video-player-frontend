export default function Pills({text}) {
  return (
    <>
      <div className="w-full rounded-2xl bg-gray-900 p-2 shadow-inner items-center flex">
        <span className="text-amber-50 font-extralight text-sm">{text}</span>
      </div>
    </>
  )
}
