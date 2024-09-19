import React from 'react'

const InputField = (props) => {
    const {label,type,name,placeholder,onChange,value}=props
  return (
    <div className="mb-6 w-full">
    <label  className="block mb-2 text-md font-semibold text-gray-900 ">{label}</label>
    <input type={type} name={name} onChange={onChange} value={value} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-none focus:border-2 focus:ring-blue-500 focus:border-blue-500 block w-3/4 p-2.5 " placeholder={placeholder} required/>
  </div>
  )
}

export default InputField