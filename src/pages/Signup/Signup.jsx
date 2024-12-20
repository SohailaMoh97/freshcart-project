
import axios from 'axios';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { object, string, ref } from 'yup';

export default function Signup() {

  const navigate = useNavigate()

  const [accountExist, setAccountExist] =useState()


  const validationSchema = object({
    name: string().required('Name is required').min(3, 'More than 3 letters').max(25, 'Less than 25 letters'),
    email: string().required('Email is required').email('Email is not valid'),
    password: string()
      .required('Password is required')
      .matches(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,
        'Minimum eight characters, at least one upper case English letter, one lower case English letter, one number and one special character'
      ),
    rePassword: string()
      .required('Re-enter your password')
      .oneOf([ref('password')], "Does not match the password"),
    phone: string()
      .required('Phone is required')
      .matches(/^(02)?01[0125][0-9]{8}$/, 'Sorry, we only accept Egyptian numbers'),
  });
  
  async function sendDataTORegister(values) {

    const loadToastId = toast.loading("Wait a sec !!")

    try {
      const options = {
        url: "https://ecommerce.routemisr.com/api/v1/auth/signup",
        method: "POST",
        data: values,
      }

    let {data} =  await axios.request(options)
    if (data.message=== "success") {
      toast.dismiss(loadToastId)
      toast.success("Registered successfully")
      setTimeout(()=>{
        navigate("/login")
      },2000)
    } 
    console.log(data)
    } 
    catch(error) {
      toast.dismiss(loadToastId)
      setAccountExist(error.response.data.message) 
    }
    finally {
      toast.dismiss(loadToastId)
    }

    
    
  }
  
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      rePassword: '',
      phone: '',
    },
    validationSchema,
    onSubmit: sendDataTORegister,
    
  });

  return (
    <>
      <Helmet>
        <title>Signup</title>
      </Helmet>
      
      <h1 className="text-xl text-slate-700 font-semibold">
        <i className="fa-regular fa-circle-user mr-2"></i>Register now
      </h1>
      <form onSubmit={formik.handleSubmit} className="flex flex-col text-primary-900 font-semibold items-center justify-center py-11">
        


        <div className="name flex flex-col w-1/2 py-2">
          <label className="pb-2" htmlFor="name">
            Name:
          </label>
          <input
            className="py-2 px-3 border rounded-md  border-gray-500"
            type="text"
            name="name"
            id="name"
            placeholder="Type your name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}

          />
          {formik.touched.name && formik.errors.name ? (
            <div className="text-red-500 text-sm">*{formik.errors.name}</div>
          ) : null}
        </div>

        
        <div className="name flex flex-col w-1/2 py-2">
          <label className="pb-2" htmlFor="email">
            Email:
          </label>
          <input
            className="py-2 px-3 border rounded-md border-gray-500"
            type="email"
            name="email"
            id="email"
            placeholder="Type your email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.email && formik.errors.email ? (
            <div className="text-red-500 text-sm">*{formik.errors.email}</div>
          ) : null}


          {accountExist && (
            <div className="text-red-500 text-sm">*{accountExist}</div>
          )}
        </div>

        
        <div className="name flex flex-col w-1/2 py-2">
          <label className="pb-2" htmlFor="password">
            Password:
          </label>
          <input
            className="py-2 px-3 border rounded-md border-gray-500"
            type="password"
            name="password"
            id="password"
            placeholder="Your password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.password && formik.errors.password ? (
            <div className="text-red-500 text-sm">*{formik.errors.password}</div>
          ) : null}
        </div>

        <div className="name flex flex-col w-1/2 py-2">
          <label className="pb-2" htmlFor="rePassword">
            Repassword:
          </label>
          <input
            className="py-2 px-3 border rounded-md border-gray-500"
            type="password"
            name="rePassword"
            id="rePassword"
            placeholder="Re-enter password"
            value={formik.values.rePassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.rePassword && formik.errors.rePassword ? (
            <div className="text-red-500 text-sm">*{formik.errors.rePassword}</div>
          ) : null}
        </div>

        <div className="name flex flex-col w-1/2 py-2">
          <label className="pb-2" htmlFor="phone">
            Phone:
          </label>
          <input
            className="py-2 px-3 border rounded-md border-gray-500"
            type="text"
            name="phone"
            id="phone"
            placeholder="Type your phone"
            value={formik.values.phone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.phone && formik.errors.phone ? (
            <div className="text-red-500 text-sm">*{formik.errors.phone}</div>
          ) : null}
        </div>

        <button className="bg-primary-700 hover:bg-primary-800 text-white py-2 px-3 rounded-md" type="submit">
          Sign Up
        </button>
      </form>
    </>
  );
}

