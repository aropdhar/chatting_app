import React from 'react'
import Userlist from './userlist/Userlist'
import Friendreq from './friendrequestlist/Friendreq'

const Home = () => {
  return (
    <div className='mt-[100px] flex gap-x-[40px]'>
      <Userlist/>
      <Friendreq/>
    </div>
  )
}

export default Home
