
import React, { useState } from "react";
import { Helmet } from "react-helmet";
import Card from "../../components/Cards/Card"; 
import axios from "axios";
import Loading from "../../components/Loading/Loading";
import { useQuery } from "@tanstack/react-query";

export default function Products() {
  const [searchQuery, setSearchQuery] = useState(""); 

  const getProducts = async () => {
    try {
      const response = await axios.get("https://ecommerce.routemisr.com/api/v1/products");
      return response.data; 
    } catch (error) {
      console.error("Error fetching products:", error);
      return []; 
    }
  

  };
  

  const searchProducts = async (query) => {
    if (query == "") {
      return getProducts(); 
    }

    try {
      const options = {
        URL: `https://ecommerce.routemisr.com/api/v1/products${query}`,
        method: "Get",
        params: {
            
              title 
            
        }
      } 
      let {data} = await axios.request(options) 
      return response.data;
    } catch (error) {
      console.error("Error searching for products:", error);
      return []; 
    }
  };

  const { data,  isError, error } = useQuery({
    queryKey: ['products', searchQuery], 
    queryFn: () => searchProducts(searchQuery), 
    keepPreviousData: true,
  });

  if (isError) return <div className="text-red-500">Error: {error.message}</div>; 

  return (
    <>
      <Helmet>
        <title>Products</title>
      </Helmet>

      <div className="flex flex-col w-9/12 py-2 mx-auto my-8">
        <label htmlFor="search" className="text-primary-900 font-semibold text-xl mb-3">
          Search for products
        </label>
        <input
          id="search"
          type="text"
          placeholder="search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)} 
          className="py-2 px-3 border focus:outline-primary-400 rounded-md border-gray-600"
        />
      </div>

      <div className="grid grid-cols-12 gap-4">
        {data?.data?.length? (
          data.data.map((product) => (
            <Card productInfo={product} key={product._id} />
          ))
        ) : (
          <div className="col-span-12 text-center text-gray-500">
            No products found.
          </div>
        )}
      </div>
    </>
  );}





























