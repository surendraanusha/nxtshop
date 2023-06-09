"use client"

import './globals.css'
import { Inter } from 'next/font/google'
const inter = Inter({ subsets: ['latin'] })
import Header from '../components/Header/page'
import { useState,createContext,useEffect } from 'react'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'js-cookie'
import { useRouter,usePathname } from 'next/navigation';

export const userContext = createContext()

export default function RootLayout({ children }) {
  const loginPathName = usePathname();
  const token = Cookies.get('jwtToken')
  const router = useRouter(); 
  const [productCart,setCartItems] = useState([])

  const receiveProduct = (cartItemObj) =>{
    const existingItem = productCart.find((item) => item.id === cartItemObj.id);
    if(existingItem){
      const updatedItems = productCart.map((item) => {
        if (item.id === cartItemObj.id) {
          return { ...item, quantity: item.quantity + cartItemObj.quantity };
        }
        return item;
      });
      setCartItems(updatedItems);
      toast.success("Item updated successfully!!");
    }
    else{
      setCartItems(prevStatue =>[
        ...prevStatue,cartItemObj
      ])
      toast.success("Item added successfully!!");
    }
    
  }

  let Amount = 0
  let shippingCharges = 5.00
  let taxEstimation = 10.00

  productCart.forEach(eachCartItem => {
    Amount += eachCartItem.price * eachCartItem.quantity
  })

  const removeItem = (id) =>{
    const updatedCartList = productCart.filter(
      eachCartItem => eachCartItem.id !== id,
      )
      setCartItems(updatedCartList)
      toast.warning("Item remove successfully!!");
  }

  const decrementCartItemQuantity = (id) =>{
    const updatedItems = productCart.map((cartItem) => {
      if (cartItem.id === id && cartItem.quantity > 1) {
        return { ...cartItem, quantity: cartItem.quantity - 1 };
      }
      return cartItem;
    });
    setCartItems(updatedItems);
  }

  const incrementCartItemQuantity = (id) =>{
    const updatedItems = productCart.map((cartItem) => {
      if (cartItem.id === id) {
        return { ...cartItem, quantity: cartItem.quantity + 1 };
      }
      return cartItem;
    });
    setCartItems(updatedItems);
  }

  const ContextObj = {
    receiveProduct,
    productCart,
    removeItem,
    Amount,
    shippingCharges,
    taxEstimation,
    decrementCartItemQuantity,
    incrementCartItemQuantity
  }

  useEffect(() => {
    if (token === undefined) {
      router.push('/login');
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);


  return (
    <html lang="en">
      <body className={inter.className}>
        <userContext.Provider value={ContextObj} >
        {loginPathName === '/login' ? null : <Header/>}
          <div className={`${loginPathName === '/login' ? '':'pt-20'}`}>
            {children}
          </div>
        </userContext.Provider>
      </body>
    </html>
  )
    
  
}
