import React from 'react'

const Paragraph = ({ paratext , className }) => {
  return (
    <>
      <p className={className}>{paratext}</p>
    </>
  )
}

export default Paragraph
