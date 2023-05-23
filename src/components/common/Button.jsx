import React from 'react'

const Button = ({ title }) => {
  return (
   <button className='text-center text-[12px] px-2 py-5 cursor-pointer whitespace-nowrap'>{title}</button>
  )
}

export default Button