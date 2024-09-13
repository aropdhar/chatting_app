import React, { useEffect, useState } from 'react'
import Heading from '../../component/Heading'
import { IoIosNotificationsOutline, IoMdClose } from 'react-icons/io'
import Image from '../../component/image/Image'
import { useSelector, useDispatch } from 'react-redux'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import Paragraph from '../../component/paragraph/Paragraph'
import { decrement } from '../../reduxslice/counterSlice'
import moment from 'moment/moment';
import { getDatabase, ref, onValue } from "firebase/database";
import { FaPlus, FaUserFriends } from 'react-icons/fa'

const Navbar = () => {

  const data = useSelector((state) => state.userstorage.value);
  const [notishow , setNotishow] = useState(false);
  const counter = useSelector((state) => state.counterstore.value)
  const dispatch = useDispatch()
  const [allnotification , setAllnotification] = useState([]);
  const db = getDatabase();


  let notification = () =>{
    
    dispatch(decrement(counter - counter))
    setNotishow(true)

  }

  useEffect(()=>{

    const notiCountRef = ref(db, 'notification');
    onValue(notiCountRef, (snapshot) => {

      let arr = [];

        snapshot.forEach((item)=>{
          if(data.uid == item.val().notireceiveid){
            arr.push({...item.val() , id: item.key})
          }
        })

        setAllnotification(arr);
    });

  },[])

  

  return (
    <>
      <div className='bg-[#23252f] absolute top-[2%] right-[5%] left-[16%] w-[82%] h-[10%] py-[10px] px-[20px] rounded-[10px]'>
         <div className='flex items-center relative justify-between'>
             <Heading text="Chats" textclass="text-[#fff] text-[32px]"/>
             <div className='flex items-center gap-[30px]'>
               <div className='relative'>
                 <IoIosNotificationsOutline onClick={notification} className='text-[#fff] hover:bg-notibg hover:rounded-[50%] text-[40px] cursor-pointer'/>
              {counter > 0 &&
                 <p className='text-[#fff] absolute top-0 left-[18px] bg-[red] p-[10px] w-[25px] h-[25px] rounded-[50%] flex justify-center items-center text-[18px]'>{counter}</p>
            
              }
               </div>
                <div className='flex items-center gap-[10px]'>
                    <div className='bg-[#fff] w-[45px] h-[45px] overflow-hidden	rounded-[50%]'>
                      <Image src={data.photoURL} alt="Not Found" className="w-[100%] h-[100%] object-cover"/>
                    </div>
                    <p className='text-[#fff]'>{data.displayName}</p>
                </div>
             </div>
         </div>
      </div>

      {/* notification site */}
       {notishow &&

        <div className='notification_main'>
          <Heading text="Notification" textclass="text-[#fff] text-[20px] font-bold"/> 
          <IoMdClose onClick={()=>setNotishow(false)} className='notification_close'/>
          <div className='notification_bg'>
            {allnotification.map((item , index)=>(
                <div className='flex relative gap-x-[10px]'>
                  <div className='w-[60px]  h-[60px] bg-[black] rounded-[50%] flex justify-center items-center overflow-hidden'>
                    <Image alt="Not Found" className="w-[100%] h-[100%] object-cover	"/>
                   
                  </div>
                  <div className='flex flex-col gap-y-[5px]'>
                      <div className='flex gap-x-[10px] items-center'>
                          <Heading text={data.uid == item.notireceiveid ?
                            
                            item.notisendname

                            :

                            item.notireceivename
                            
                            } textclass="text-[16px] text-[white] font-semibold "/>
                          <Paragraph paratext={item.info} className="text-[16px] text-[white] font-semibold "/>
                        
                      </div>
                      <span className='date text-[#fff]'>
                          {moment(item.date, "YYYYMMDD hh:mm").fromNow()}
                      </span>
                  </div>
                  <FaUserFriends className='absolute top-[35px] left-[30px] text-[30px] text-[blue]'/>
                  <FaPlus className='absolute top-[52px] left-[48px] text-[10px] text-[white]' />
                </div>
            ))

            }
            
              
          </div>
        </div>
       }
    </>
  )
}

export default Navbar
