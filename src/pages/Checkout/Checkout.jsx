import axios from 'axios'
import { useFormik } from 'formik'
import React, { useContext, useState } from 'react'
import { CartContext } from '../../Cart.context/Cart.context'
import { UserContext } from '../../context/User.Context'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { string , object } from 'yup'

export default function Checkout() {
  
  const {cartInfo} = useContext(CartContext)
  const {token} = useContext(UserContext)
  const navigate = useNavigate()
  const [paymentMethod, setPaymentMethod] = useState(null)

  async function cashOrder(values){
    const toastId = toast.loading("Creating your order...")
    try {
      const options = {
        url: `https://ecommerce.routemisr.com/api/v1/orders/${cartInfo.cartId}`,
        method: "POST",
        headers: {
          token
        },
        data : values
      }
  
      let {data} = await axios.request(options)
      console.log(data);
      if(data.status === 'success'){
        toast.success("Order is completed")
        setTimeout(()=>{
          navigate("/allorders")
        },2000)
      }
    } catch(error){
      console.log(error);
      
    } finally{
      toast.dismiss(toastId)
    }
    
  }  

  async function onlineOrder(values){
    let toastId = toast.loading("Creating your order...")
    try {
      const options = {
        url: `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartInfo.cartId}?url=${location.origin}`,
        method: "POST",
        headers: {
          token
        },
        data: values
      }
      let {data} = await axios.request(options)
      console.log(data);
      if(data.status === 'success'){
        toast.success("Order is completed")
        setTimeout(()=>{
          location.href = data.session.url
        },2000)
      }
      
    } catch (error) {
      console.log(error);

    } finally{
      toast.dismiss(toastId)
    }
    
  }

  const validationSchema = object({
    details: string().required("Enter your address details"), 
    phone: string()
          .required('Phone is required')
          .matches(/^(02)?01[0125][0-9]{8}$/, 'Sorry, we only accept Egyptian numbers'),
    city: string().required("Enter your city")
    .matches(/^(Cairo|Alexandria|Giza|Shubra El Kheima|Port Said|Suez|Luxor|Asyut|Ismailia|Faiyum|Zagazig|Damietta|Aswan|Mansoura|Tanta|Minya|Beni Suef|Hurghada|Qena|Sohag|Shibin El Kom|Banha|Arish|Mallawi|10th of Ramadan City|6th of October City|Sadat City|New Cairo|El Mahalla El Kubra|Kafr El Sheikh|Beni Mazar)$/
      ,"Sorry we only ship in Egypt")    
  })
  
const formik = useFormik({
  initialValues: {
    shippingAddress:{
      details: "",
      phone: "",
      city: "",
      },
      validationSchema,
      
  },
  onSubmit: (values)=> {
    if(paymentMethod === 'cash'){
      cashOrder(values)
    } else {
      onlineOrder(values)
    }
  }
})
  
  return (
    <>
      <section>
        <h2 className='text-xl text-gray-600 font-semibold'>Shipping Address</h2>
        <form action="" className='m-8 space-y-5' onSubmit={formik.handleSubmit}>
          <div className='city'>
            <input type="text" placeholder='Enter Your City' 
              className='py-2 px-3 border-2  w-full rounded-md border-slate-600'
              value={formik.values.shippingAddress.city}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name="shippingAddress.city"
              />
          </div>

          <div className='phone'>
            <input type="tel" placeholder='Phone' 
              className='py-2 px-3 border-2  w-full rounded-md border-gray-600 '
              value={formik.values.shippingAddress.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name="shippingAddress.phone"
              />
          </div>

          <div className='details'>
            <textarea  placeholder='Details' 
              className='py-2 px-3 border-2  w-full rounded-md border-gray-600 '
              value={formik.values.shippingAddress.details}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name="shippingAddress.details"
              />
          </div>

          <button type='submit' onClick={()=> {
            setPaymentMethod('cash')
          }} 
           className='font-semibold mr-2 bg-blue-700 hover:bg-blue-800  text-white py-2 px-3 rounded-md'>Cash Order</button>

          <button type='submit'  onClick={()=> {
            setPaymentMethod('online')
          }} 
          className='font-semibold bg-primary-700 hover:bg-primary-800  text-white py-2 px-3 rounded-md'>Online Payment</button>
        </form>
      </section>
    </>
  )
}
