import React, {useId} from 'react'
import clsx from 'clsx'

function Input({label, placeholder, value, onChange, required, type, ...props}) {

  const id = useId()
  return (
    <div>
        <label
        htmlFor={id}
        className="text-gray-200 mb-2"
        >{label}</label>
        
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          id={id}
          onChange={onChange}
          required={required}
          {...props}
          className={clsx(
            'mt-1 mb-3  block w-full rounded-lg border-none bg-white/5 px-3 py-1.5 text-sm/6 text-white',
            'focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-white/25')}></input>
    </div>
  )
}

export default Input