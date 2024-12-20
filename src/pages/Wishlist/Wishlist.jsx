import React, { useContext, useEffect } from 'react'
import { Helmet } from 'react-helmet'
import { WishlistContext } from '../../WishlistContext/WishlistContext'
import Loading from '../../components/Loading/Loading'
import WhishlistItem from '../../components/WhislistItem/WhishlistItem'
import { Link } from 'react-router-dom'

export default function Wishlist() {
     
    let { getWishlistProducts ,wishlistInfo } = useContext(WishlistContext)
    useEffect(()=>{
       getWishlistProducts()
    },[])  
  return (
    <>
    <Helmet>
        <title>Wishlist</title>  
    </Helmet>
    {wishlistInfo === null ? <Loading/> : <section>
        <div className='flex gap-5 items-center py-5'>
            <i className='fa-solid fa-heart text-slate-600 text-xl'></i>
            <h2 className='text-xl pl-4 text-slate-600 font-semibold relative before:absolute before:w-0.5 before:h-3/4 before:bg-slate-600 before:-left-1 before:top-1/2 before:-translate-y-1/2 '>Your Wishlist </h2>
        </div>

        {wishlistInfo.count === 0 ?  (
            <div className='mt-6 bg-gray-100 rounded-md shado p-5 flex justify-center items-center flex-col gap-2'>
            <h2>
                Oops! Your wishlist is empty. Go shopping and add some products to your wishlist from the button below. 
            </h2>
            <Link to="/" className='bg-primary-700 hover:bg-primary-800 text-white py-2 px-3 rounded-md'>Back To Home</Link>
        </div>) : (
        <>
        <div className='space-y-3 mt-4'>
            {wishlistInfo.data.map((product)=> <WhishlistItem wishlistInfo={product} key={product}/>)}
        </div>
            
        </>
        )

        }
    </section>}
    </>
  )
}
