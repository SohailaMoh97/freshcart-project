import { createContext, useContext, useState } from "react"
import { UserContext } from "../context/User.Context"
import toast from "react-hot-toast"
import axios from "axios"

export const WishlistContext = createContext(null) 

export  function WishlistProvider({children}) {
    let {token} = useContext(UserContext)

    const [wishlistInfo, setWishlistInfo]  = useState(null)


    async function addToWishlist({productId}){
        try{
        const options = {
            url: "https://ecommerce.routemisr.com/api/v1/wishlist",
            method: 'POST',
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
            console.log(data);
            

        }
        } catch(error) {
            console.log(error);
        }
        finally {
            toast.dismiss(toastId)
        }
    }

    async function getWishlistProducts(){
        try {
            const options = {
                url: "https://ecommerce.routemisr.com/api/v1/wishlist",
                method: "GET",
                headers: {
                    token
                }
            }
            let {data} = await axios.request(options)
            console.log(data);
            setWishlistInfo(data)
        } catch(error) {
            console.log(error)
        }
        
    }

    async function removeWishlistItem({productId}){
        let toastId = toast.loading("Deleting... ")

        try{
            const options = {
                url: `https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,
                method: "DELETE",
                headers: {
                    token
                }
            };
            let {data} = await axios.request(options)
            if(data.status === 'success') {
                setWishlistInfo(data)
                toast.success("Product Deleted")
            }
        } catch(error){
            console.log(error);
            
        } finally {
            toast.dismiss(toastId)
        }
    }

    return <WishlistContext.Provider value={{addToWishlist, removeWishlistItem, getWishlistProducts  , wishlistInfo}}>
        {children}
    </WishlistContext.Provider>
}
