import React, {useEffect, useState} from 'react'
import Card from '../../components/Cards/Card'
import axios from 'axios'
import Loading from '../../components/Loading/Loading'
import HomeSlider from '../../components/HomeSlider/HomeSlider'
import CategorySlider from '../../components/CategorySlider/CategorySlider'
import { Helmet } from 'react-helmet'
import { useQuery } from '@tanstack/react-query'

export default function Home() {

  

  function getProducts() {
    const options = {
      url:"https://ecommerce.routemisr.com/api/v1/products",
      method: "GET"
    }

    return  axios.request(options)
    
  }

  let {data, isLoading } =  useQuery({
      queryKey: [`products`],
      queryFn: getProducts, 
      refetchOnMount: false,
      gcTime: 10000
  })
  
  if(isLoading ) return<Loading/>

 
  

  return (
    <>
      <Helmet>
        <title>Home Page</title>
        <meta name='description' content='FreshCart | Home page' ></meta>
        <meta name='keywords' content='E-commerce , FreshCart'></meta>
      </Helmet>
      <HomeSlider/>
      <CategorySlider/>

      
        
        <div className="grid grid-cols-12 gap-4">
        { data.data.data.map((products)=> 
        <Card productInfo= {products} key={products._id}/>)} 
        </div> 
        
        
      
          
      
    </>
  )
}
