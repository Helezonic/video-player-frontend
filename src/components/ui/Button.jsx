import React from 'react'

function Button({className, children, type, ...props}) {
  return (
    <button type={type} className={` ${className} cursor-pointer text-white font-bold py-2 px-4 rounded`} {...props}>{children}</button>
  )
}

export default Button