import React from 'react'
import Heading from '../../component/Heading'
import Input from '../../component/input/Input'
import { NavLink } from 'react-router-dom'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import registervalidation from '../../validation/Registervalidation';
import { getAuth, createUserWithEmailAndPassword , sendEmailVerification , updateProfile  } from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";
import { useNavigate } from "react-router-dom";

const Registration = () => {
   
   const db = getDatabase();
   const navigate = useNavigate();
  
   let intialvalue = {

      signemail: '',
      signname: '',
      signpassword: '',

   }

   

   const formik = useFormik({
      initialValues: intialvalue,
      validationSchema: registervalidation,

      onSubmit: values => {
         const auth = getAuth();
         createUserWithEmailAndPassword(auth, values.signemail, values.signpassword)
           .then((userCredential) => {
             const user = userCredential.user;
             console.log(user);
             sendEmailVerification(auth.currentUser)
               .then(() => {
                  updateProfile(auth.currentUser, {
                     displayName: values.signname, 
                     photoURL: ""
                   }).then(() => {
                     set(ref(db, 'users/' + user.uid), {
                        DisplayName: user.displayName,
                        email: user.email,
                        profile_picture : user.photoURL
                      }).then(()=>{
                         navigate('/')
                      })
                   }).catch((error) => {
                     // An error occurred
                     // ...
                   });
                   
               }); 
           })
           .catch((error) => {
             const errorCode = error.code;
             const errorMessage = error.message;
           });
      },
    });

  return (
    <div className='flex mt-[100px] rounded-[18px] shadow-boxshadow flex-col p-[20px] bg-[#eee] w-[500px] m-auto gap-y-[20px] items-start justify-center'>
       <Heading text="Get started with easily register" textclass="w-[497px] text-[34px] text-[#11175D]"/>
       <p className='w-[319px] text-[20px]'>Free register and you can enjoy it</p>
       <form onSubmit={formik.handleSubmit}>
         <div className='flex flex-col gap-y-[20px]'>
            <div>
               <Input className='input_design'
                  id="signemail" 
                  Name="signemail"
                  type="email" 
                  placeholder="Email Address"
                  onChange={formik.handleChange}
                  value={formik.values.signemail}
               /> 
                  {formik.touched.signemail && formik.errors.signemail ? (
                     <div className='text-[red]'>{formik.errors.signemail}</div>
                  ) : null}
 
            </div>
            <div>
               <Input className='input_design'
                  id="signname"  
                  Name="signname"
                  type="text"
                  placeholder="Full Name"
                  onChange={formik.handleChange}
                  value={formik.values.signname}
               /> 

               {formik.touched.signname && formik.errors.signname ? (
                        <div>{formik.errors.signname}</div>
               ) : null}
            </div>
            <div>
               <Input className='input_design'
                  id="signpassword"
                  Name="signpassword"
                  type="password" 
                  placeholder="Password"
                  onChange={formik.handleChange}
                  value={formik.values.signpassword}
               /> 

               {formik.touched.signpassword && formik.errors.signpassword ? (
                  <div>{formik.errors.signpassword}</div>
               ) : null}
            </div>
            <div>
               <button className='regbtn' type="submit" >Sign Up</button>
            </div>
         </div>
      </form>
    
       <p className='ml-[90px] flex gap-[5px]'>Already  have an account? <NavLink to="/" className="text-[blue]">Sign In</NavLink></p>
    </div>
  )
}

export default Registration
