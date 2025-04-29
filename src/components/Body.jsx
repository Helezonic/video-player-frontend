

export default function Body({children}) {
  return (
    <>
      <div className="flex h-full border-t-2 border-amber-50 grow">
        {children}
      </div>
    </>
  )
}