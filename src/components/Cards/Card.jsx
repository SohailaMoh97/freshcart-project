import React, { useContext } from 'react'
import { CartContext } from '../../Cart.context/Cart.context'
import { NavLink } from 'react-router-dom'
import { WishlistContext } from '../../WishlistContext/WishlistContext'



export default function Card( {productInfo}) {
    const {images , title , price , category , ratingsAverage , id} = productInfo
    let {addProductToCart } = useContext(CartContext)
    let {addToWishlist} = useContext(WishlistContext)
  return (
    <>
        <div className='col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3 xl:col-span-2  shadow-md rounded-md overflow-hidden'>
            <div className='relative'>
                <img className='w-full' src={images[0]} alt="" />
                <div className="layer opacity-0 hover:opacity-100 transition-opacity duration-300 absolute flex items-center justify-center gap-2  w-full h-full left-0 top-0 bg-gray-800 bg-opacity-35">
                  
                    {/* heart icon */}
                    <div onClick={()=>{
                        addToWishlist({productId: id})
                    }}
                    className="icon hover:scale-110 transition-transform duration-300 hover:rotate-6 w-8 h-8 rounded-full cursor-pointer text-sm bg-primary-800 text-white flex items-center justify-center">
                        <i className="fa-solid fa-heart"></i>
                    </div>

                    {/* cart icon */}
                    <div onClick={()=> {
                        addProductToCart({productId: id })
                    }} className="icon hover:scale-110 transition-transform duration-300 hover:rotate-6 w-8 h-8 rounded-full cursor-pointer text-sm bg-primary-800 text-white flex items-center justify-center">
                        <i className="fa-solid fa-cart-shopping"></i>
                    </div>

                    {/* eye icon */}
                    <NavLink to={`/product/${id}`} className="icon hover:scale-110 transition-transform duration-300 hover:rotate-6 w-8 h-8 rounded-full cursor-pointer text-sm bg-primary-800 text-white flex items-center justify-center">
                        <i className="fa-solid fa-eye"></i>
                    </NavLink>
                </div>
            </div>
            <div className='p-3 '>
                <h3 className='text-primary-600  '>{category.name}</h3>
                <h2 className='text-lg font-semibold line-clamp-2 '>{title}</h2>
                <div className='flex justify-between items-center mt-2 '>
                    <span>{price} L.E</span>
                    <div className='flex gap-1 items-center '>
                        <i className="fa-solid fa-star text-yellow-500"></i>
                        <span>{ratingsAverage}</span>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}
