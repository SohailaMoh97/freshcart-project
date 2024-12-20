import React, { useContext, useEffect } from 'react'
import { CartContext } from '../../Cart.context/Cart.context'
import Loading from '../../components/Loading/Loading'
import CartItem from '../../components/CartItem/CartItem'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'

export default function Cart() {

    let {getProductFromCart , cartInfo , clearCart} = useContext(CartContext)
  useEffect(()=>{
    getProductFromCart()
  },[])
  
    return (
    <>
    <Helmet>
        <title>Cart </title>
        
    </Helmet>

    {cartInfo === null ? <Loading/> : 
    <section>
        <div className='flex gap-5 items-center py-5'>
            <i className='fa-brands fa-opencart text-slate-600 text-xl'></i>
            <h2 className='text-xl pl-4 text-slate-600 font-semibold relative before:absolute before:w-0.5 before:h-3/4 before:bg-slate-600 before:-left-1 before:top-1/2 before:-translate-y-1/2 '>Your Shopping Cart </h2>
        </div>

        {cartInfo.numOfCartItems === 0 ?( 
        <div className='mt-6 bg-gray-100 rounded-md shado p-5 flex justify-center items-center flex-col gap-2'>
            <h2>
                Oops! Your cart is empty. Start shopping now by clicking the button below. 
            </h2>
            <Link to="/" className='bg-primary-700 hover:bg-primary-800 text-white py-2 px-3 rounded-md'>Back To Home</Link>
        </div>
        ) : 
        ( 
        <>
        <div className='space-y-3 mt-4'>
            {cartInfo.data.products.map((product)=> <CartItem key={product._id} productInfo={product} />)}
            
        </div>
        <div className='mt-5 flex justify-between items-center'>
            <p className='text-xl'>
                <i className="fa-solid fa-dollar-sign text-xl mr-2 text-primary-600"></i>
                Your Total Cart Price <span className='text-primary-600 font-bold'>{cartInfo.data.totalCartPrice}</span> 
            </p>
            <button onClick={clearCart} className='bg-red-500 hover:bg-red-600 text-white py-2 px-3 rounded-md'>
                <i className="fa-solid fa-trash pr-1"></i>
                Clear Cart
            </button>
        </div>

        <Link to={'/checkout'} className='inline-block text-center w-full mt-8 font-semibold bg-primary-700 hover:bg-primary-800 text-white py-2 px-3 rounded-md'> 
           Payment
        </Link>
        </>
        
        ) }    
    </section>}
    </>
  )
}
