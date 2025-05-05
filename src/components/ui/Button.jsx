import React from 'react'
import { useNavigate } from 'react-router-dom'

function Button({userId, className, children, ...props}) {
  
  return (
    <button  className={` ${className} cursor-pointer text-white inline-flex  items-center rounded-full  px-3 py-1.5 text-sm/6 font-semibold  shadow-inner shadow-white/10  data-focus:outline-white hover:bg-gray-600 overflow-ellipsis`} {...props}>{children}</button>
  )
}

export default Button