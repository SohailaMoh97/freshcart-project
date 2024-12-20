import { createBrowserRouter, RouterProvider  } from 'react-router-dom'
import Signup from './pages/Signup/Signup'
import Login from './pages/Login/Login'
import Home from './pages/Home/Home'
import Layout from './components/Layout/Layout'
import { Toaster } from 'react-hot-toast'
import './App.css'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'
import GuestRoute from './components/GuestRoute/GuestRoute'
import UserProvider from './context/User.Context'
import CartProvider from './Cart.context/Cart.context'
import Cart from './pages/Cart/Cart'
import ProductDetails from './pages/ProductDetails/ProductDetails'
import Checkout from './pages/Checkout/Checkout'
import Orders from './pages/Orders/Orders'
// import Online from './components/Online/Online'
import Offline from './components/Offline/Offline'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Products from './pages/Products/Products'
import Categories from './pages/Categories/Categories'
import Wishlist from './pages/Wishlist/Wishlist'
import {  WishlistProvider } from './WishlistContext/WishlistContext'
import Brands from './pages/Brands/Brands'
function App() {


  const router = createBrowserRouter([
    {path: "/", element: 
         (
          <ProtectedRoute>
            <Layout/>
          </ProtectedRoute>
         ),      
       children: [
      {path: "/category/:id", element: <h2>Categories</h2>},  
      {index: true, element:<Home/>},
      {path: "/cart" , element: <Cart/>},
      {path: "/product/:id" , element: <ProductDetails/>},
      {path: '/checkout', element: <Checkout/>},
      {path: '/allorders', element: <Orders/>},
      {path: "/products" , element: <Products/>},
      {path: "/categories" , element: <Categories/>},
      {path: '/whishlist' , element: <Wishlist/> },
      {path: '/brands' , element: <Brands/>}
      
    ]},

    {path: "/" , element :(
        <GuestRoute>
          <Layout/>
        </GuestRoute>
        )
       , children: [
      {path: "/login", element: <Login/>},
      {path: "/signup" , element: <Signup/>}
    ]}
      
    
  ])

  const myClient = new QueryClient()
  return (
    <>
    
      
      <QueryClientProvider  client={myClient}>
        
        <UserProvider>
          <CartProvider>
          <WishlistProvider>
            <RouterProvider router={router}/>
          </WishlistProvider>   
          </CartProvider>  
        </UserProvider>
        
        <Toaster />
      </QueryClientProvider>



    <Offline>
      <div className='text-2xl font-bold text-center fixed right-8 bottom-8 z-50 my-5 p-4 rounded-lg shadow bg-gray-200 text-gray-600'>
        <i className="fa-solid fa-wifi mr-2"></i>
        <span>Check Your Internet Connection </span>
      </div>
    </Offline>
    </>
  )
}

export default App
