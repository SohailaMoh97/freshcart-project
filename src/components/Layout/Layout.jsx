import React from 'react'
import Navbar from '../Navbar/Navbar'
import { Outlet } from 'react-router-dom'
import Footer from '../Footer/Footer'

export default function Layout() {
  return (
    <>
    <Navbar/>
      <div className="container py-12 min-h-[60vh]  pt-20">
      <Outlet></Outlet>
      </div>
      <Footer/>
    </>
  )
}