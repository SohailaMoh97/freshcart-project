import axios from 'axios'
import React from 'react'
import Loading from '../Loading/Loading'
import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'


export default function CategorySlider() {
    

    async function getCategories() {
        const options = {
            url: 'https://ecommerce.routemisr.com/api/v1/categories',
            method: 'GET' 
            }
            return  axios.request(options)
            }  
        
    let {data , isLoading  } =  useQuery({
            queryKey: [`categories`],
            queryFn: getCategories,
            refetchOnMount: false,
            staleTime: 60 * 60 * 1000
        })

        if(isLoading) return <Loading/>
  return (
    <>
      <section className='pb-8'>
        <h2 className='font-semibold pb-2 text-lg'>Shop Popular Categories</h2>
        <swiper-container loop={true} slides-per-view={6}>
            {data.data.data.map((category)=>
            <swiper-slide key={category._id}>
                <Link  >
                    <img src={category.image} className='w-full h-72 object-cover cursor-pointer' alt="" />
                    <h3>{category.name}</h3>
                </Link>
            </swiper-slide> )}
        </swiper-container>
    </section>

    </>
  )
}
