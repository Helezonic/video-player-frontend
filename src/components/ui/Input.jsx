import React, {useId} from 'react'

function Input({label, placeholder, value, onChange, required, type}) {

  const id = useId()
  return (
    <div>
        <label
        htmlFor={id}
        >{label}</label>
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          id={id}
          onChange={onChange}
          required={required}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"/>
    </div>
  )
}

export default Input