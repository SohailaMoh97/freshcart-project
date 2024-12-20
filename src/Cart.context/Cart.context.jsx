import { createContext, useContext, useState } from "react";
import { UserContext } from "../context/User.Context";
import axios from "axios";
import toast from "react-hot-toast";

export const CartContext = createContext(null);

export default function CartProvider({children}) {
    const {token } = useContext(UserContext)
    const [cartInfo, setCartInfo]  = useState(null)

    async function addProductToCart({productId}) {
        let toastId = toast.loading("Adding a new product")

        try {
            const options = {
                url: "https://ecommerce.routemisr.com/api/v1/cart",
                method: "POST" ,
                headers: {
                    token
                }, 
                data: {
                    productId
                }               
            }
            let {data}  = await axios.request (options)
            if(data.status === "success") {
                toast.success(data.message)
                getProductFromCart()
            }
            
        } catch(error) {
            console.log(error);
            
        }
        finally {
            toast.dismiss(toastId)
        }
        
    }

    async function getProductFromCart() {
        try {
            const options = {
                url: "https://ecommerce.routemisr.com/api/v1/cart",
                method: "GET",
                headers: {
                    token
                }
            }
    
            let {data} = await axios.request(options)
            setCartInfo(data)
            
        } catch(error) {
            console.log(error);
            
        }
    }
    
    async function removeCartItem({productId}) {
        let toastId = toast.loading("Deleting... ")

        try{
            const options = {
                url: `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
                method: "DELETE",
                headers: {
                    token
                }
            };
            let {data} = await axios.request(options)
            if(data.status === 'success') {
                setCartInfo(data)
                toast.success("Product Deleted")
            }
        } catch(error){
            console.log(error);
            
        } finally {
            toast.dismiss(toastId)
        }

    }

    async function clearCart() {
        let toastId = toast.loading("Clearing the cart")
        try {
            const options = {
                url: "https://ecommerce.routemisr.com/api/v1/cart",
                method: "DELETE",
                headers: {
                    token
                }
            }
            let {data} = await axios.request(options)
            if(data.message === 'success') {
                setCartInfo({
                    numOfCartItems: 0
                })
            }
            toast.success("Cart Cleared")

        } catch(error) {
            console.log(error);
            
        } finally {
            toast.dismiss(toastId)
        }
    }
    
    async function updateCount({productId , count}) {
        try {
            const options = {
            url: `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
            method: "PUT",
            headers: {
                token
            }, 
            data: {
                count
            }
        }
        let {data} = await axios.request(options)
        if(data.status === 'success'){
            setCartInfo(data)
        }
        
        } catch(error){
        console.log(error);
        
        }
    }
    
    return <CartContext.Provider value={{addProductToCart , getProductFromCart , cartInfo , removeCartItem , clearCart , updateCount}}>
        {children} 
    </CartContext.Provider>
}