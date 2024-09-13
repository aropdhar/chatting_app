import React from 'react'
import Friends from './friends/Friends'
import Msgbox from './friends/Msgbox'

const Message = () => {
  return (
    <div className='flex gap-x-[150px] mt-[100px]'>
      <Friends/>
      <Msgbox/>
    </div>
  )
}

export default Message
