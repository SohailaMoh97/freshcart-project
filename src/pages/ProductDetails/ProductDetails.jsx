import React, { useContext, useEffect, useState } from 'react'
import jk from '../../assets/images/JK.jpg'
import axios from 'axios'
import Loading from '../../components/Loading/Loading';
import { useParams } from 'react-router-dom';
import { CartContext } from '../../Cart.context/Cart.context';
import ReactImageGallery from 'react-image-gallery';
import Card from '../../components/Cards/Card';
import {Swiper , SwiperSlide} from 'swiper/react'
import "swiper/css" 
import useOnline from '../../hooks/useOnline';
import { Helmet } from 'react-helmet';

export default function ProductDetails() {
  const [relatedProducts , setRelatedProducts] = useState(null)
  const [productDetails , setProductDetails] = useState(null);
  const {addProductToCart } = useContext(CartContext)
  const {id} = useParams()

  async function getProductDetails(){
      try {
      const options = {
        url: `https://ecommerce.routemisr.com/api/v1/products/${id}`,
        method: "GET", 
      }
        let {data} = await axios.request(options)
        setProductDetails(data.data)  
        console.log(data.data)   
      }
      catch(error){
        console.log(error)
      }
  }

  async function getRelatedProducts() {
    try {
      const options = {
        url: `https://ecommerce.routemisr.com/api/v1/products?category[in]=${productDetails.category._id}`,
        method: "GET",
      }
      let {data} = await axios(options)
      setRelatedProducts(data.data)
      console.log(data.data);
      
    } catch(error){
      console.log(error);
      
    }
    
  }

  useEffect(()=> {
    getProductDetails()
  
  }, [id])

  useEffect(()=> {
    if(productDetails === null) return; 
    getRelatedProducts()
  }, [productDetails])

  let isOnline = useOnline()
  
  return (
    <>
      <Helmet>
          <title>Product Details</title>
      </Helmet>

      { productDetails ? 
      <>
      <Helmet>
        <title>{productDetails.title}</title>
      </Helmet>
      <section className='grid grid-cols-12 gap-12'>
        <div className='col-span-3'>
          
          <ReactImageGallery showPlayButton={false} 
            showFullscreenButton={false}
            showNav={false}
            items={productDetails.images.map((image)=> {
            return {original: image, thumbnail: image}
          } )}/>

        </div>
        <div className='col-span-9 space-y-4'>
        <div>
          <h2 className='text-2xl font-semibold text-gray-600'>{productDetails.title}</h2>
          <h3 className='text-primary-800 font-semibold '>{productDetails.category.name}</h3>
        </div>
          <p className='text-gray-400 py-3'> {productDetails.description} </p>
          <div className='flex justify-between items-center '>
            <span>{productDetails.price} L.E </span>
            <div className=''>
              <i className="fa-solid mr-2  fa-star text-yellow-500"></i>
              <span>{productDetails.ratingsAverage}</span>
            </div>
          </div>

         {isOnline &&  <button onClick={()=> {
            addProductToCart({ productId: id })
          }}
            className='bg-primary-700 w-full font-semibold hover:bg-primary-800 text-white py-2 px-3 rounded-md'>Add to cart
          </button> }

        </div>
      </section> 
      <section className='my-6'>
        <h2 className='text-2xl text-gray-600 my-10'>Related Products</h2>
        <Swiper slidesPerView={6} spaceBetween={15} >
        {relatedProducts && relatedProducts.length > 0 ? (
            relatedProducts.map((product) => (
            <SwiperSlide>
              <Card key={product.id} productInfo={product} />
            </SwiperSlide>
            ))
            ) : (
            <Loading />
            )}
        </Swiper>
      </section> 
      </>
      : 
      <Loading/> 
      }
    </>
  )
}
