import React, { useState } from 'react'
import Heading from '../../component/Heading'
import google from '../../assets/image 4.png'
import Image from '../../component/image/Image'
import Paragraph from '../../component/paragraph/Paragraph'
import Input from '../../component/input/Input'
import { NavLink } from 'react-router-dom'
import { useFormik } from 'formik';
import loginvaliodation from '../../validation/Loginvalidation'
import { getAuth, signInWithEmailAndPassword , sendPasswordResetEmail , GoogleAuthProvider  , signInWithPopup } from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import { ThreeDots } from 'react-loader-spinner'
import { useSelector, useDispatch } from 'react-redux'
import { loginstorage } from '../../reduxslice/authslice'
import { IoClose } from 'react-icons/io5'

const Login = () => {
   
   const auth = getAuth();
   const navigate = useNavigate();
   const [logloader , setlogLoader] = useState(false);
   const dispatch = useDispatch()
   const data = useSelector((state) => state.userstorage.value)
   const [resetvalue , setResetvalue] = useState("")
   const [forgotshow , setForgotshow] = useState(false)
   const provider = new GoogleAuthProvider();
   const db = getDatabase();

   let handlegoogle = () =>{

      signInWithPopup(auth, provider)
         .then((result) => {

            const user = result.user;
            console.log(user);
            if(user.emailVerified){
               navigate("/home");
               localStorage.setItem('localstorage', JSON.stringify(user));
               dispatch(loginstorage(user))
               setlogLoader(false);
               
               set(ref(db, 'users/' + user.uid), {
                  displayName: user.displayName,
                  email: user.email,
                  photourl: user.photoURL,
                });

            }
            
            else{
               toast("Please Verified Your Email");
               setlogLoader(false);
            }
            
         }).catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.customData.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            // ...
         });
         
   }
   

   let handlereset = () =>{
    
      sendPasswordResetEmail(auth, resetvalue)
         .then(() => {
            toast('Please Check Your Email Address');
            setResetvalue(" ");
         })
         .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // ..
         });
   }

   let intialvalue = {
       signinemail: '',
       signinpassword: ''
   }

   const formik = useFormik({
      initialValues: intialvalue,
      validationSchema: loginvaliodation,

      onSubmit: (values  , actions) => {
         actions.resetForm()
         setlogLoader(true);

    signInWithEmailAndPassword(auth, values.signinemail , values.signinpassword)
         .then((userCredential) => {
            const user = userCredential.user;

            if(user.emailVerified){
               navigate("/home");
               localStorage.setItem('localstorage', JSON.stringify(user));
               dispatch(loginstorage(user));
               setlogLoader(false);
            }
            
            else{
               toast("Please Verified Your Email");
               setlogLoader(false);
            }
         })
         .catch((error) => {
            setlogLoader(false);
            toast("Invalid Credential email or password");
            const errorCode = error.code;
            const errorMessage = error.message;
         });        
      },
    });

  return (
    <>
    {/* toastify section start here */}
    <ToastContainer
      position="top-right"
      autoClose={2000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="dark"
    />
    {/* toastify section end here */}
      <div>
         <div className='flex flex-col shadow-boxshadow gap-[20px] items-center justify-center w-[500px] rounded-[12px] m-auto mt-[80px] bg-[#eee] p-[20px]'>

            <div className='flex flex-col items-center gap-y-[20px]'>
               <Heading text="Login in or create an account to collaborate!" textclass="w-[371.79px] text-center m-auto text-[33.34px] font-bold"/>
               <div onClick={handlegoogle} className='flex gap-[10px] items-center border-2 border-[#000] p-[15px] cursor-pointer rounded-[10px]'>
                  <Image src={google} alt="Not Found" className=""/>
                  <Paragraph paratext="Continue With Google"/>
               </div>
               <p>Or</p>
            </div>
            <form onSubmit={formik.handleSubmit}>
               <div className='flex flex-col gap-[20px] '>
                  <div>
                     <Input className="login_input_design"
                        id="signinemail"
                        type="email" 
                        placeholder="Enter Your Email"
                        onChange={formik.handleChange}
                        value={formik.values.signinemail}
                     />
                     {formik.touched.signinemail && formik.errors.signinemail ? (
                        <div className='text-[red]'>{formik.errors.signinemail}</div>
                     ) : null}
                  </div>
                  <div>
                     <Input className="login_input_design"
                        id="signinpassword"
                        type="password" 
                        placeholder="Enter Your Password"
                        onChange={formik.handleChange}
                        value={formik.values.signinpassword}
                     />
                     {formik.touched.signinpassword && formik.errors.signinpassword ? (
                        <div className='text-[red]'>{formik.errors.signinpassword}</div>
                     ) : null}
                  </div>
                  <button type="submit" className='login_btn'>
                     {logloader ?

                       <ThreeDots
                           visible={true}
                           height="40"
                           width="40"
                           color="#4fa94d"
                           radius="9"
                           ariaLabel="three-dots-loading"
                           wrapperStyle={{}}
                           wrapperClass="ml-[130px]"
                       />

                       :

                       "Log In"

                     }
                     </button>
               </div>
            </form>
            <div>
               <a href="#" onClick={()=>setForgotshow(true)} className='inline-block ml-[220px] underline'>Forget Password?</a>
            </div>
             <p className='w-[220px] text-[16px]'>No Account?<NavLink to="/registration" className="ml-[10px] text-[blue] underline">Create Account</NavLink></p>
         </div>
      </div>
      
      {forgotshow &&    

        <div className='rounded-[20px] shadow-boxshadow bg-[#fff] p-[40px] absolute left-[36%] top-[35%] '>
         <div className='flex flex-col relative gap-y-[16px]'>
            <Heading text="Reset Your Password" 
            textclass="text-[30px] text-center"/>
            <Input onChange={(e)=>setResetvalue(e.target.value)} className="login_input_design" type="email" placeholder="Enter Your Email"/>
            <button type="submit" onClick={handlereset} className='login_btn'>Reset Password</button>
            <IoClose onClick={()=>setForgotshow(false)} className='absolute text-[30px] cursor-pointer right-[-18px] top-[-30px]'/>
         </div>
        </div>
      }

    </>
  )
}

export default Login
