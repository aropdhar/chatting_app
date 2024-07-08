import React from 'react'

const Heading = ({text , textclass}) => {
  return (
    <>
      <h1 className={textclass}>{text}</h1>
    </>
  )
}

export default Heading
