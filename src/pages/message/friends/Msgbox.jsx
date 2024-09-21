import React, { useEffect, useState } from 'react'
import Image from '../../../component/image/Image'
import Heading from '../../../component/Heading'
import Paragraph from '../../../component/paragraph/Paragraph'
import { MdOutlineEmojiEmotions, MdOutlineKeyboardVoice, MdOutlineVideocam } from 'react-icons/md'
import { FaPhoneAlt } from 'react-icons/fa'
import { IoIosSend, IoMdClose } from 'react-icons/io'
import Input from '../../../component/input/Input'
import { IoImage } from 'react-icons/io5'
import { AiFillLike } from 'react-icons/ai'
import { useSelector, useDispatch } from 'react-redux'
import { getDatabase, push, ref, set , onValue } from "firebase/database";
import moment from 'moment/moment';
import ScrollToBottom from 'react-scroll-to-bottom';
import EmojiPicker from 'emoji-picker-react'



const Msgbox = () => {
   
  const db = getDatabase();
  const activedata = useSelector((state) => state.activedatamessage.value)
  const data = useSelector((state) => state.userstorage.value)
  const [handleinput , setHandleinput] = useState("")
  const [allmsg , setAllmsg] = useState([])
  const [emojishow , setEmojishow] = useState(false)
  
  

  let handlemsg = () =>{
    set(push(ref(db, 'message')), {
      senderid: data.uid,
      sendername: data.displayName,
      senderemail: data.email,
      receiverid: activedata.senderid == data.uid ? activedata.receiveid : activedata.senderid,
      receivername: activedata.senderid == data.uid ? activedata.receivename : activedata.sendername,
      receiveremail: activedata.senderid == data.uid ? activedata.receiveemail : activedata.senderemail,
      message: handleinput,
      date: `${new Date().getFullYear()}-${new Date().getMonth()+1}-${new Date().getDate()} ${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getMilliseconds()}`,
    }).then(()=>{
      setHandleinput(" ");
    })
     
  }
  
  
  // all message 

  useEffect(()=>{
    
    const allmsgCountRef = ref(db, 'message');
      onValue(allmsgCountRef, (snapshot) => {
        
        let arr = []

        let activeid = data.uid == activedata?.senderid ? activedata?.receiveid : activedata?.senderid;
        

        snapshot.forEach((item)=>{
          if((item.val().senderid == data.uid && item.val().receiverid == activeid || item.val().senderid == activeid && item.val().receiverid == data.uid))
            
            arr.push({...item.val() , id: item.key });

        })

        setAllmsg(arr)

      });

  },[activedata])

  console.log(allmsg);
  

  let handleemoji = (e) =>{
    setHandleinput(handleinput + e.emoji);
  }

  let handlelike = () =>{
    console.log("&#128515");
  }

  return (
    <>
    {!activedata ?

      
      <div className='flex justify-center items-center ml-[190px] text-[30px]'>Please Select Your User</div>

      :

      <div className='bg-[#23252f] relative h-[84vh] w-[650px] p-[15px] rounded-[10px]'>
    
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-x-[15px]'>
                <div className='bg-[#fff] w-[50px] h-[50px] rounded-[50%] overflow-hidden'>
                  <Image src="" className="w-[100%] h-[100%] object-cover"/>
                </div>
                <div className='flex flex-col gap-y-[2px]'>
                    <Heading text={
                      activedata.receiveid == data.uid ?

                       activedata.sendername
                      :

                      activedata.receivename

                    } textclass="text-[white]"/>
                    <Paragraph paratext="Active Now" className="text-[white]"/>
                </div>
            </div>
            <div className='flex gap-x-[30px]'>
               <MdOutlineVideocam className='text-[#fff] p-[5px] bg-[#42413f] text-[32px] cursor-pointer rounded-[10px]'/>
               <FaPhoneAlt className='text-[#fff] p-[7px] bg-[#42413f] text-[32px] cursor-pointer rounded-[10px]'/>
               <IoMdClose className='text-[#fff] p-[5px] bg-[#42413f] text-[32px] cursor-pointer rounded-[10px]'/>
            </div>
          </div>
           <ScrollToBottom className=' bg-[#3b3e46] overflow-y-scroll rounded-t-[10px] relative mt-[10px] h-[62vh]'>
              {allmsg.map((item , index)=>(
                
                 item.senderid == data.uid ?

                  <div className="sender_main">
                    <h1 className='sender_msg'>{item.message}</h1>
                     <span className='date text-[#fff]'>
                        {moment(item.date, "YYYYMMDD hh:mm").fromNow()}
                     </span>
                  </div>

                  :
                  
                  <div  className="receive_main">
                    <p className='receive_msg'>{item.message}</p>
                    <span className='date text-[#fff]'>
                        {moment(item.date, "YYYYMMDD hh:mm").fromNow()}
                    </span>
                 </div>
                           
              ))


            }


            </ScrollToBottom>

            <div className="flex z-[1000] border-t-2 border-slate-800 bg-[#3b3e46]  items-center gap-x-[40px] p-[10px] rounded-b-[10px] absolute bottom-[4%] left-[15px] right-[15px] ">
               <Input value={handleinput} onChange={(e)=>setHandleinput(e.target.value)} type="text" placeholder="Write Message" className="w-[350px] py-[10px] pl-[10px] relative pr-[10px] rounded-[10px] bg-[#23252f] text-[#fff]"/>
                
               <MdOutlineEmojiEmotions onClick={()=>setEmojishow(!emojishow)}  className='absolute left-[320px] text-[#3b3e46] bottom-[15px] cursor-pointer text-[32px]'/>
              

               <IoImage className='bg-[#23262f] cursor-pointer text-[#fff] text-[35px] rounded-[10px] p-[5px]'/>
               <MdOutlineKeyboardVoice className='bg-[#23262f] cursor-pointer text-[#fff] text-[35px] rounded-[10px] p-[5px]'/>
               
               {handleinput.length > 0 ?

                <IoIosSend onClick={handlemsg} className='bg-[#5597f0] cursor-pointer text-[#fff] text-[40px] rounded-[10px] p-[5px]'/>

                :

                 <AiFillLike onClick={handlelike} className='cursor-pointer text-[#5597f0] text-[40px]'/>
               }
               
            </div>
            <EmojiPicker className='absolute bg-[#000] z-[1100] top-[-460px] left-[20px]' onEmojiClick={handleemoji} open={emojishow}/>
      </div>
      
    }
    </>
  )
}

export default Msgbox
