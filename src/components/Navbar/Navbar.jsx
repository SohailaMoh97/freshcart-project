import React, { useContext, useEffect } from 'react'
import freshcartLogo from "../../assets/images/freshcart-logo.svg"
import { NavLink } from 'react-router-dom'
import { UserContext } from '../../context/User.Context'
import { CartContext } from '../../Cart.context/Cart.context'

export default function Navbar() {
const {token , logOut} = useContext(UserContext)
const {cartInfo , getProductFromCart} = useContext(CartContext)

    useEffect(()=>{ 
        getProductFromCart()
    } ,[] )

  return (
    <>
    <nav className='fixed top-0 left-0 right-0 z-50 shadow'>
        <div className="   shadow-sm bg-slate-100 py-3">
            <div className="container flex items-center gap-12 ">
            <NavLink to="">
                <img src={freshcartLogo} alt="freshCart logo " />
            </NavLink>


            { token && <>
             {/* nav headings */}
             <ul className='flex gap-5 items-center cursor-pointer '>
                <li>
                    <NavLink className={({isActive})=>{
                        return `relative before:absolute before:w-0 before:h-0.5 before:bg-primary-800 hover:before:w-full before:transition-[width] before:duration-300 before:left-0 before:-bottom-1 ${isActive ? "before:!w-full font-semibold": ""}`
                    }} to="/">Home</NavLink>
                </li>
                <li>
                    <NavLink className={({isActive})=>{
                        return `relative before:absolute before:w-0 before:h-0.5 before:bg-primary-800 hover:before:w-full before:transition-[width] before:duration-300 before:left-0 before:-bottom-1 ${isActive ? "before:!w-full font-semibold": ""}`
                    }} to="/products">Products</NavLink>
                </li>
                <li>
                    <NavLink className={({isActive})=>{
                        return `relative before:absolute before:w-0 before:h-0.5 before:bg-primary-800 hover:before:w-full before:transition-[width] before:duration-300 before:left-0 before:-bottom-1 ${isActive ? "before:!w-full font-semibold": ""}`
                    }} to="/whishlist">Wishlist</NavLink>
                </li>
                <li>
                    <NavLink className={({isActive})=>{
                        return `relative before:absolute before:w-0 before:h-0.5 before:bg-primary-800 hover:before:w-full before:transition-[width] before:duration-300 before:left-0 before:-bottom-1 ${isActive ? "before:!w-full font-semibold": ""}`
                    }} to="/categories">Categories</NavLink>
                </li>
                <li>
                    <NavLink className={({isActive})=>{
                        return `relative before:absolute before:w-0 before:h-0.5 before:bg-primary-800 hover:before:w-full before:transition-[width] before:duration-300 before:left-0 before:-bottom-1 ${isActive ? "before:!w-full font-semibold": ""}`
                    }} to="/brands">Brands</NavLink>
                </li>
                <li>
                    <NavLink className={({isActive})=>{
                        return `relative before:absolute before:w-0 before:h-0.5 before:bg-primary-800 hover:before:w-full before:transition-[width] before:duration-300 before:left-0 before:-bottom-1 ${isActive ? "before:!w-full font-semibold": ""}`
                    }} to="/allorders">Orders</NavLink>
                </li>
            </ul>
              
              {/* cart icon */}
            <NavLink to="/cart" className="cart cursor-pointer relative  ml-auto">
                <i className="fa-solid fa-cart-shopping"></i>
                <div className="cart-counter flex justify-center items-center right-0 top-0  absolute h-5 w-5 translate-x-1/2 -translate-y-1/2 rounded-full bg-primary-800 text-white" >
                  {cartInfo === null ? (<i className='fa-solid fa-spinner fa-spin text-sm '></i>) : 
                  (<span className='text-sm font-semibold'>{cartInfo.numOfCartItems}</span>)
                  }
                </div>
            </NavLink>
            
            </>}

            <ul className= {`flex gap-5 items-center cursor-pointer ${!token && 'ms-auto'}`} >
                <li>
                    <NavLink className={({isActive})=>{
                        return `relative before:absolute before:w-0 before:h-0.5 before:bg-primary-800 hover:before:w-full before:transition-[width] before:duration-300 before:left-0 before:-bottom-1 ${isActive ? "before:!w-full font-semibold": ""}`
                    }}  to="https://instagram.com" target='_blank'>
                        <i className="fa-brands fa-instagram"></i>
                    </NavLink>
                </li>
                <li>
                    <NavLink className={({isActive})=>{
                        return `relative before:absolute before:w-0 before:h-0.5 before:bg-primary-800 hover:before:w-full before:transition-[width] before:duration-300 before:left-0 before:-bottom-1 ${isActive ? "before:!w-full font-semibold": ""}`
                    }} to="https://facebook.com" target='_blank'>
                        <i className="fa-brands fa-facebook"></i>
                    </NavLink>
                </li>
                <li>
                    <NavLink className={({isActive})=>{
                        return `relative before:absolute before:w-0 before:h-0.5 before:bg-primary-800 hover:before:w-full before:transition-[width] before:duration-300 before:left-0 before:-bottom-1 ${isActive ? "before:!w-full font-semibold": ""}`
                    }} to="https://tiktok.com" target='_blank'>
                        <i className="fa-brands fa-tiktok"></i>
                    </NavLink>
                </li>
                <li>
                    <NavLink className={({isActive})=>{
                        return `relative before:absolute before:w-0 before:h-0.5 before:bg-primary-800 hover:before:w-full before:transition-[width] before:duration-300 before:left-0 before:-bottom-1 ${isActive ? "before:!w-full font-semibold": ""}`
                    }} to="https://twitter.com" target='_blank'>
                        <i className="fa-brands fa-twitter"></i>
                    </NavLink>
                </li>
                <li>
                    <NavLink className={({isActive})=>{
                        return `relative before:absolute before:w-0 before:h-0.5 before:bg-primary-800 hover:before:w-full before:transition-[width] before:duration-300 before:left-0 before:-bottom-1 ${isActive ? "before:!w-full font-semibold": ""}`
                    }} to="https://linkedin.com" target='_blank'>
                        <i className="fa-brands fa-linkedin"></i>
                    </NavLink>
                </li>
                <li>
                    <NavLink className={({isActive})=>{
                        return `relative before:absolute before:w-0 before:h-0.5 before:bg-primary-800 hover:before:w-full before:transition-[width] before:duration-300 before:left-0 before:-bottom-1 ${isActive ? "before:!w-full font-semibold": ""}`
                    }} to="https://youtube.com" target='_blank'>
                        <i className="fa-brands fa-youtube"></i>
                    </NavLink>
                </li>
            </ul>

            <ul className='flex gap-5 items-center cursor-pointer'>

                {!token && <>
                    <li>
                        <NavLink className={({isActive})=>{
                            return `relative before:absolute before:w-0 before:h-0.5 before:bg-primary-800 hover:before:w-full before:transition-[width] before:duration-300 before:left-0 before:-bottom-1 ${isActive ? "before:!w-full font-semibold": ""}`
                        }} to="/signup">Signup </NavLink>
                    </li>
                    <li>
                        <NavLink className={({isActive})=>{
                            return `relative before:absolute before:w-0 before:h-0.5 before:bg-primary-800 hover:before:w-full before:transition-[width] before:duration-300 before:left-0 before:-bottom-1 ${isActive ? "before:!w-full font-semibold": ""}`
                        }} to="/login">Login </NavLink>
                    </li>
                </> }


                {token && <>
                    <li onClick={logOut}>
                        <NavLink to=""> 
                            <i className="fa-solid fa-right-from-bracket text-lg"></i>
                        </NavLink>
                    </li>
                </>}
            </ul>
            </div>
        </div>
    </nav>
    
    </>
  )
}
