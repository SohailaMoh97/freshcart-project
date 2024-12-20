import React, { useContext } from 'react'
import jk from "../../assets/images/JK.jpg"
import { CartContext } from '../../Cart.context/Cart.context'
import { NavLink } from 'react-router-dom'

export default function CartItem({productInfo}) {
    const {count , product , price  } = productInfo
    const {title , imageCover , category , id} = product
    let {removeCartItem , updateCount} = useContext(CartContext)

  return (
    <>
    <div className='flex gap-2'>
      <div className="card-item grow bg-gray-100 py-4 px-6 rounded-lg flex justify-between items-center">
        <img src={imageCover} alt={title} className='w-24 h-24 object-cover rounded-full border-4 border-white' />

        <h3 className='text-lg text-gray-700 font-semibold cursor-pointer'>
          <NavLink to={`/product/${id}`}>
            {title}
          </NavLink>
        </h3>
        <h4  className=' text-gray-700 font-semibold'>{category.name}</h4>

        <div className="counter flex gap-5 items-center">
            <span className='text-lg font-bold text-gray-700'>{count}</span>
            <div className="icons space-y-2">

                <div onClick={()=> { updateCount({productId: id , count: count + 1})}} 
                    className="plus w-6 h-6 bg-gray-600 text-white rounded-full text-center cursor-pointer">
                    <i className='fa-solid fa-plus'></i>
                </div>

                <div onClick={()=> {
                    updateCount({productId: id , count: count - 1})}} 
                    className="minus w-6 h-6 bg-gray-600 text-white rounded-full text-center cursor-pointer">
                    <i className='fa-solid fa-minus'></i>
                </div>

            </div>
        </div>

        <span>{price} L.E</span>
      </div>

      <button onClick={()=> {
        removeCartItem({productId: id})
      }} className='rounded-md p-3 bg-gray-100 hover:bg-gray-200 transition-colors duration-300'>
        <i className='fa-solid fa-xmark'></i>
      </button>
     </div>
    </>
  )
}
