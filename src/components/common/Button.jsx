import React from 'react'

const Button = ({ title, onClick }) => {
  return (
   <button className='text-center text-[14px] m-2 cursor-pointer whitespace-nowrap border-2 border-slate-800 rounded-full font-bold w-[13rem] py-2 hover:bg-gray-200'  onClick={onClick}>{title}</button>
  )
} 

export default Button 