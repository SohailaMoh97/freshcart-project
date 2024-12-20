import React, { useContext, useEffect, useState } from 'react'
import jk from '../../assets/images/JK.jpg'
import axios from 'axios'
import { UserContext } from '../../context/User.Context'
import  {jwtDecode}  from 'jwt-decode'
import Loading from '../../components/Loading/Loading'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'
export default function Orders() {
    const [orders , setOrders] = useState(null)
     
    const {token }= useContext(UserContext)
    let {id} = jwtDecode(token)

    async function getUserOrder(){
        try {
            const options = {
                url: `https://ecommerce.routemisr.com/api/v1/orders/user/${id}`,
                method: 'GET'
            }
            let {data} = await axios.request(options)
            setOrders(data)
        } catch (error) {
            console.log(error);
            
        }
        
    }

    useEffect(()=> {
        getUserOrder()
    },[])
    

    return (
    <>
        <Helmet>
            <title>Orders</title>
        </Helmet>
        {orders ? <section className='space-y-4'>
            {orders.map((order)=> <div key={order.id} className='order p-4 border-2 border-gray-500 border-opacity-25 rounded-lg'>
                <header className='flex justify-between items-center'>
                    <div>
                        <h2 className='text-gray-500' >Order ID </h2>
                        <span className='font-semibold text-gray-700 text-xl'>#{order.id}</span>
                    </div>
                    <div>
                        {order.isPaid ? <span className='inline-block font-cairo px-3 py-2 mr-2 rounded-3xl cursor-pointer hover:bg-lime-600 bg-lime-500 transition-colors duration-300 text-white'>تم الدفع</span> 
                        : <span className='inline-block font-cairo px-3 py-2 mr-2 rounded-3xl cursor-pointer hover:bg-blue-600 bg-blue-500 transition-colors duration-300 text-white'>غير مدفوع</span> }
                        
                        {order.isDeliverd ? <span className='inline-block font-cairo px-3 py-2 rounded-3xl cursor-pointer hover:bg-primary-600 bg-primary-500 transition-colors duration-300 text-white'>تم التوصيل</span> 
                        : <span className='inline-block font-cairo px-3 py-2 rounded-3xl cursor-pointer hover:bg-red-600 bg-red-500 transition-colors duration-300 text-white'>قيد التوصيل </span>}
                    </div>
                </header>
                <div  className='grid overflow-hidden gap-4 md:grid-cols-3 my-4 lg:grid-cols-4 xl:grid-cols-6'>
                    {order.cartItems.map((product)=>  <div key={product.id} className="space-y-2,4 product-item border-2 border-gray-400 border-opacity-25 rounded-lg ">
                        <img src={product.product.imageCover}  alt=""  className='shadow-md'/>
                        <div className='p-4'>
                            <h3 className='mt-2 text-lg font-semibold line-clamp-2 cursor-pointer '>
                                <Link to={`/product/${product.product.id}`} >{product.product.title}</Link>
                            </h3>
                            <div className='flex justify-between items-center mt-2'>
                                <p className=''>
                                    <span className='font-bold underline'>Count:  </span> {product.count}
                                </p>
                                <span>{product.price} L.E </span>
                            </div>
                        </div>
                    </div>) }
                </div> 

                <p className='text-lg mt-4' >Total Price : <span className='mx-1 font-bold text-primary-600 '>{order.totalOrderPrice} </span> L.E</p>
            </div> )}
        </section> : <Loading/>}
    </>
)
}
