import React from 'react'
import * as Yup from 'yup';


let signemailregex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

let registervalidation = Yup.object({
    signemail: Yup.string()
      .email('Invalid email address')
      .matches(signemailregex , 'please match Email Regex example@gmail.com')
      .required('please Enter Your Email'),

    signname: Yup.string()
      .max(10, 'Must be 10 characters or less')
      .min(4, 'Minimum 4 characters')
      .required('please Enter Your FullName'),

    signpassword: Yup.string()
      .max(12, 'Must be 12 characters or less')
      .min(6 , 'Minimum 6 characters or less')
      .required('please Enter Your Password'),
    
  })

export default registervalidation
