import React from 'react'

const Input = ({ type , placeholder , className , id , Name , value , onChange }) => {
  return (
    <>
      <input type={type} id={id} name={Name} placeholder={placeholder} value={value} onChange={onChange} className={className}/>
    </>
  )
}

export default Input
