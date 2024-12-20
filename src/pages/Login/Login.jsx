
import axios from 'axios';
import { useFormik } from 'formik';
import React, { useContext, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { object, string } from 'yup';
import { UserContext } from '../../context/User.Context';
import { Helmet } from 'react-helmet';


export default function Login() {
  
  let {setToken} = useContext(UserContext)
  
  const [inCorrect , setInCorrect] = useState(null) 
  const navigate = useNavigate()



  const validationSchema = object({
    email: string().required('Email is required').email('Email is not valid'),
    password: string()
      .required('Password is required')
      .matches(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,
        'Minimum eight characters, at least one upper case English letter, one lower case English letter, one number and one special character'
      ),
  });
  
  async function sendDataTOLogin(values) {

    const loadToastId = toast.loading("Wait a sec !!")

    try {
      const options = {
        url: "https://ecommerce.routemisr.com/api/v1/auth/signin",
        method: "POST",
        data: values,
      }

    let {data} =  await axios.request(options)
    
    if(data.message === "success") {
      localStorage.setItem("token" , data.token)
      setToken(data.token)
      toast.success("Welcome Back")     
      setTimeout(()=>{
        navigate("/")
      },2000)
    }
    
    console.log(data)
    } 
    catch(error) {
      // toast.dismiss(loadToastId)
    console.log(error)
    setInCorrect(error.response.data.message)
    }
    finally {
      toast.dismiss(loadToastId)
    }

    
    
  }
  
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      
    },
    validationSchema,
    onSubmit: sendDataTOLogin,
    
  });

  return (
    <>
      <Helmet>
        <title>Login</title>
      </Helmet>
      
      <h1 className="text-xl text-slate-700 font-semibold">
        <i className="fa-regular fa-circle-user mr-2"></i>Login
      </h1>
      <form onSubmit={formik.handleSubmit} className="flex flex-col text-primary-900 font-semibold items-center justify-center py-11">
        

        {/* email */}
        <div className="name flex flex-col w-1/2 py-2">
          <label className="pb-2" htmlFor="email">
            Email:
          </label>
          <input
            className="py-2 px-3 border  rounded-md border-gray-600"
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


          
        </div>

        {/* password */}
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

            
            {inCorrect && <div className="text-red-500 text-sm">*{inCorrect}</div> }
        </div>

        

        <button className="bg-primary-700 hover:bg-primary-800 text-white py-2 px-3 rounded-md" type="submit">
          Sign In
        </button>
      </form>
    </>
  );
}



