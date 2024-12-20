import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Helmet } from 'react-helmet';
import Loading from '../../components/Loading/Loading';

export default function Categories() {
    let [categories, setCategories] = useState(null);
    let [subCategory, setSubCategory] = useState(null);
    let [subName, setSubName] = useState(null);

    async function getCategories() {
    try {
        const options = {
        url: 'https://ecommerce.routemisr.com/api/v1/categories',
        method: 'GET',
        };
        let { data } = await axios.request(options);
        setCategories(data.data);
    } catch (error) {
        console.log(error);
    }
}

    async function getSubCategories(id, name) {
    try {
        const options = {
        url: `https://ecommerce.routemisr.com/api/v1/categories/${id}/subcategories`,
        method: 'GET',
        };
        let { data } = await axios.request(options);
        setSubName(name);
        setSubCategory(data.data);
    } catch (error) {
        console.log(error);
    }
  }

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <>
        <Helmet>
            <title>Categories</title>
        </Helmet>

        {categories ? (
        <>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => (
            <div
                onClick={() => {
                getSubCategories(category._id, category.name);
                }}
                key={category._id}
                className="transition-shadow duration-300 border-2 hover:shadow-md hover:shadow-primary-600 rounded-md overflow-hidden">
                <img
                    src={category.image}
                    alt=""
                    className="w-full object-cover h-80"
                />
                <div className="py-5 px-4 text-center">
                    <h2 className="text-primary-900 font-semibold text-2xl">
                        {category.name}
                    </h2>
                </div>
            </div>
            ))}
        </div>

            {subCategory ? (
            <>
                <h2 className="my-6 text-center text-2xl text-primary-800 font-semibold">
                {subName} Subcategories
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {subCategory.map((e) => (
                    <div
                    key={e._id}
                    className="py-5 px-4 text-center border-2 hover:shadow-md hover:shadow-primary-600 rounded-md">
                    <h3 className="font-semibold text-xl">{e.name}</h3>
                    </div>
                ))}
                </div>
            </>
            ) : null}
        </>
        ) : (
        <Loading />
        )}
    </>
  );
}

