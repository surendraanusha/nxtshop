"use client"

import './globals.css'
import { Inter } from 'next/font/google'
const inter = Inter({ subsets: ['latin'] })
// import Header from '../components/Header'
import Header from '../components/Header/page'
import { useState,createContext } from 'react'
export const userContext = createContext()
export default function RootLayout({ children }) {
  const [productCart,setCartItems] = useState([])

  const receiveProduct = (cartItemObj) =>{
    const productObj = productCart.find(eachCartItem => eachCartItem.id === cartItemObj.id )
    if(productObj){
      console.log('yes product is availble')
      // setCartItems(prevState =>([
      //   prevState.productCart.map(eachCartItem =>{
      //     if(productObj.id === eachCartItem.id){
      //       const updatedQuantity = eachCartItem.quantity + cartItemObj.quantity
      //       return {...eachCartItem,quantity:updatedQuantity}
      //     }
      //     return eachCartItem
      //   })
      // ]))
    }
    else{
      setCartItems(prevStatue =>[
        ...prevStatue,cartItemObj
      ])
    }
    
  }
 
  let Amount = 0
  let shippingCharges = 5.00
  let taxEstimation = 10.00
  productCart.forEach(eachCartItem => {
    Amount += eachCartItem.price 
  })

  const removeItem = (id) =>{
    const updatedCartList = productCart.filter(
      eachCartItem => eachCartItem.id !== id,
    )
    setCartItems(updatedCartList)
  }

  const decrementCartItemQuantity = (id) =>{
    console.log('received product id',id)

  }

  const incrementCartItemQuantity = (id) =>{
    console.log('received product id',id)
  }

  const ContextObj = {
    receiveProduct,productCart,removeItem,Amount,shippingCharges,taxEstimation,decrementCartItemQuantity,incrementCartItemQuantity
  }

  return (
    <html lang="en">
      <body className={inter.className}>
      <userContext.Provider value={ContextObj} >
        <Header/>  
        {children}
      </userContext.Provider>
    </body>
    </html>
  )
}
