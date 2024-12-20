import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { WishlistContext } from '../../WishlistContext/WishlistContext'
import jk from '../../assets/images/JK.jpg'


export default function WhishlistItem({wishlistInfo}) {
  const {imageCover , price , title , category , id} = wishlistInfo
  let {removeWishlistItem} =  useContext(WishlistContext)
  return (
    <>
    <div className='flex gap-2'>
        <div className="card-item grow bg-gray-100 py-4 px-6 rounded-lg flex justify-between items-center">
            <img src={imageCover} alt={title} className='w-24 h-24 object-cover rounded-full border-4 border-white' />
            <h3 className='text-lg text-gray-700 font-semibold cursor-pointer'>
                <NavLink >
                {title}
                </NavLink>
            </h3>
            <h4  className=' text-gray-700 font-semibold'>{category.name}</h4>
            <span>{price} L.E</span>
        </div>
        <button onClick={()=>{
            removeWishlistItem({productId : id})
        }}
         className='rounded-md p-3 bg-gray-100 hover:bg-gray-200 transition-colors duration-300'>
        <i className='fa-solid fa-xmark'></i>
      </button>
    </div>
    </>
  )
}
