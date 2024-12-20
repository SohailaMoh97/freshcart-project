import React from 'react'
import amazon from '../../assets/images/amazon-pay.png'
import american from '../../assets/images/American-Express-Color.png'
import mastercard from '../../assets/images/mastercard.webp'
import paypal from '../../assets/images/paypal.png'

import appleStore from '../../assets/images/get-apple-store.png'
import googlePlay from '../../assets/images/get-google-play.png'  
export default function Footer() {
  return (
  <>
      <footer className='bg-slate-100 py-8 aboslute bottom-0'>
        <div className="container space-y-4">
          <header>
            <h2 className='capitalize text-xl font-semibold text-slate-800'>get the freshCart app</h2>
            <p className='capitalize text-slate-400'>we will send you a link , open it on your phone to download the app</p>
          </header>
          <div className='flex gap-2 '>
            <input className='form-control grow' type="email" placeholder='enter your email' name="email" />
            <button className='btn bg-primary-800 hover:bg-primary-900 text-white font-semibold text-sm'>Share App Link</button>
          </div>

          <div className='flex justify-between items-center py-4 border-y-2 border-slate-300 border-opacity-50'>
            <div className="payments flex gap-3 items-center">
              <h3>Payment Partners</h3>
              <img className='w-24' src={amazon} alt="" />
              <img className='w-24' src={american} alt="" />
              <img className='w-20' src={mastercard} alt="" />
              <img className='w-24' src={paypal} alt="" />
            </div>
            <div className="download flex gap-3 items-center">
              <h3 className='capitalize'>get deliveries with freshCart</h3>
              <img className='w-24' src={appleStore} alt="" />
              <img className='w-[110px]' src={googlePlay} alt="" />
            </div>
          </div>
        </div> 
      </footer>
  </>
  )
}
