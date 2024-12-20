import React, { useState, useEffect } from "react";
import jk from '../../assets/images/JK.jpg'
import { Helmet } from 'react-helmet'
import axios from 'axios'
import Loading from '../../components/Loading/Loading'


export default function Brands() {
    let [brands , setBrands] = useState(null)

    async function getBrands(){
        try {
            const options = {
                url: "https://ecommerce.routemisr.com/api/v1/brands",
                method: "GET",
                params: {
                    limit : 10,
                } 
            }
            let {data} = await axios.request(options) 
            console.log(data)
            setBrands(data.data)
        } catch (error){
            console.log(error)
        }

    }

useEffect(() => {
    getBrands();
  }, []);


  return (
    <>
    <Helmet>
        <title>Brands</title>
    </Helmet>
    <h2 className="my-6 text-center text-4xl text-primary-700 font-bold">All Brands</h2>
    
        
     {brands ? <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"> 
      {brands.map((brand)=> 
        <div key={brand._id} className="transition-shadow duration-300 border-2 hover:shadow-md hover:shadow-primary-600 rounded-md overflow-hidden">
        <img
            src={brand.image}
            alt={brand.name}
            className="w-full "/>  
            <h3 className="text-center font-semibold p-5">{brand.name}</h3>       
        </div> ) }    
    </div>    : <Loading/>}
    
    </>
  )
}

