import React from 'react'
import * as Yup from 'yup';

let signemailregex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

let loginvaliodation =  Yup.object({
      signinpassword: Yup.string()
      .max(12, 'Must be 12 characters or less')
      .min(6 , 'Minimum 6 characters')
      .required('Please Enter Your password'),
      signinemail: Yup.string()
      .email('Invalid email address')
      .matches(signemailregex , 'please match Email Regex example@gmail.com')
      .required('Please Enter Your Email'),
  })

export default loginvaliodation
