/* eslint-disable @next/next/no-img-element */
"use client"
import { useState,useEffect, Fragment,useContext,useRef } from 'react'
import { QuestionMarkCircleIcon } from '@heroicons/react/20/solid'
import { ShieldCheckIcon } from '@heroicons/react/24/outline'
import {BiRupee} from 'react-icons/bi'
import {AiFillStar} from 'react-icons/ai'
import {BsCheckCircle} from 'react-icons/bs'
import {AiOutlineMinusSquare,AiOutlineHeart,AiOutlinePlusSquare,AiFillHeart} from 'react-icons/ai'
import ConnectionLost from '@/components/Connection/page'
import Loader from '@/components/Loader/page'
import ProductCard from '@/components/ProductCard/page'
import { userContext } from '@/app/layout'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'js-cookie'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}
function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}
const ProductDetails = (data) => {
    const [productObj,setProductObj] = useState({})
    const [favourite,setFavourite] = useState(false)
    const [defaultQuantity,setQuantity] = useState(1)
    const productId = data.params.id
    const [apiStatus,setApiStatus] = useState(apiStatusConstants.initial)
    const contextFun = useContext(userContext)

  useEffect(()=>{

    const getProductDetils = async() =>{
      setApiStatus(apiStatusConstants.inProgress)
      const jwtToken = Cookies.get('jwtToken')
      // const Token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJhaHVsIiwicm9sZSI6IlBSSU1FX1VTRVIiLCJpYXQiOjE2MjMwNjU1MzJ9.D13s5wN3Oh59aa_qtXMo3Ec4wojOx0EZh8Xr5C5sRkU`
      const options = {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
          method: 'GET',
        }
      const res = await fetch(`https://apis.ccbp.in/products/${productId}`,options);
      
      if(res.ok){
        const data = await res.json()
        setProductObj(data)
        setApiStatus(apiStatusConstants.success)
      }
      else{
        setApiStatus(apiStatusConstants.failure)
      }
    }

    getProductDetils();

  },[productId])
  
  const addFavourite = ()=>{
    setFavourite(!favourite)
  }

  const addToCartItem = () =>{
    const payLoad = {
      id:productObj.id,
      imageUrl: productObj.image_url,
      title: productObj.title,
      brand: productObj.brand,
      price: productObj.price,
      availability:productObj.availability,
      quantity:defaultQuantity,
      favouriteValue:favourite
    }
    contextFun.receiveProduct(payLoad)
  }

  const decreaseQuantity = () => {
    setQuantity(defaultQuantity - 1)
  }


  const increaseQuantity = () =>{
    setQuantity(defaultQuantity + 1)
  }

  function SuccessView(){
    return(
      <div>
      <div className="mx-auto max-w-2xl px-4 py-4 sm:px-6 sm:py-24 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
        <div className="lg:max-w-lg lg:self-start">
          <h1 className="text-3xl font-bold tracking-tight text-[#3E4C59] sm:text-4xl">{productObj.title}</h1>
          <section aria-labelledby="information-heading" className="mt-4">
            
            <div className="flex items-center">
              <div className='flex items-center'>
                <BiRupee fill='#171F46' className='text-[#171F46] font-bold'/>
                <p className='text-[#171F46] font-bold'>{productObj.price}/-</p>
              </div>
              <div className="ml-4 border-l border-gray-300 pl-4 flex items-center">
                <div className='bg-blue-400 px-4 py-1 flex items-center rounded-md'>
                  <p className='text-white mr-2'>{productObj.rating}</p>
                  <AiFillStar className='text-white'/>
                </div>
                <p className='ml-3 text-[#25032F] font-semibold text-base'>{productObj.total_reviews} Reviews</p>
              </div>
            </div>

            <div className="mt-4 space-y-6">
              <p className="text-base text-gray-500">{productObj.description}</p>
            </div>

            <div className="mt-6 flex items-center">
              <p className='text-[#171F46] font-bold text-lg'>Brand:</p>
              <p className="ml-2 text-base font-semibold text-gray-500">{productObj.brand}</p>
            </div>

            <div className="mt-4 flex items-center">
              <BsCheckCircle className="h-5 w-5 flex-shrink-0 text-green-500" aria-hidden="true" />
              <p className="ml-2 text-sm text-gray-500">{productObj.availability} and ready to ship</p>
            </div>
          </section>
        </div>
        
        {/* Product image */}
        <div className="mt-10 lg:col-start-2 lg:row-span-2 lg:mt-0 lg:self-center">
          <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg">
            <img src={productObj.image_url} alt='logo' className="h-full w-full object-cover object-center" />
          </div>
        </div>

        {/* Product form */}
        <div className="lg:col-start-1 lg:row-start-2 lg:max-w-lg lg:self-start">
          <section aria-labelledby="options-heading">
            <div>
              <div className="mt-4">
                <a href="#" className="group inline-flex text-sm text-gray-500 hover:text-gray-700">
                  <span>What size should I buy?</span>
                  <QuestionMarkCircleIcon
                    className="ml-2 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                    aria-hidden="true"
                  />
                </a>
              </div>
              <div className='flex items-center mt-3'>
                <button className='mr-5' onClick={decreaseQuantity}><AiOutlineMinusSquare className='h-7 w-7' fill='#88929C'/></button>
                <p className='text-[#404142] font-bold text-2xl'>{defaultQuantity}</p>
                <button className='ml-5' onClick={increaseQuantity}><AiOutlinePlusSquare className='h-7 w-7' fill='#88929C'/></button>
              </div>
              
              <div className="mt-10 flex items-center justify-center">
                <button
                  onClick={addToCartItem}
                  type="button"
                  className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
                >
                  Add To Cart
                </button>
                <ToastContainer />
                <button className='px-3 py-3 ml-3 hover:bg-gray-100 cursor-pointer rounded-md' onClick={addFavourite}>
                  {favourite ?  <AiFillHeart className='h-7 w-7' fill='#f030a3'/> :  <AiOutlineHeart className='h-7 w-7' fill='#f030a3'/>}
                </button>
                
              </div>
              <div className="mt-6">
                <a href="#" className="group inline-flex text-base font-medium">
                  <ShieldCheckIcon
                    className="mr-2 h-6 w-6 flex-shrink-0 text-green-300 group-hover:text-green-700"
                    aria-hidden="true"
                  />
                  <span className="text-gray-500 hover:text-gray-700">Lifetime Guarantee</span>
                </a>
              </div>
            </div>
          </section>
        </div>
        <div className='mt-6'>
        <h1 className='text-gray-500 font-bold text-2xl mb-3'>Similar Products</h1>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
            {productObj.similar_products.map((product) => (
                <ProductCard product={product} key={product.id}/>
            ))}
          </div>
        </div>
      </div>
      </div>
    )
  }

  function productInfoFinalView(){
    switch(apiStatus){
      case apiStatusConstants.success:
        return SuccessView()
      case apiStatusConstants.failure:
        return <ConnectionLost/>
      case apiStatusConstants.inProgress:
        return <Loader/>
      default:
        return null
    }
  }

  return (
    <div>
      {productInfoFinalView()}
    </div>
  )
}



export default ProductDetails;

export async function getServerSideProps(context) {
    const {params} = context
    const id = params.id
    // Fetch data from external API
    // const Token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJhaHVsIiwicm9sZSI6IlBSSU1FX1VTRVIiLCJpYXQiOjE2MjMwNjU1MzJ9.D13s5wN3Oh59aa_qtXMo3Ec4wojOx0EZh8Xr5C5sRkU`
    // const options = {
    //     headers: {
    //       Authorization: `Bearer ${Token}`,
    //     },
    //     method: 'GET',
    //   }
    // const res = await fetch(`https://apis.ccbp.in/products/${2}`,options);
    // const data = await res.json();
    // console.log("product details===========>",data)
    // Pass data to the page via props
    return { props: { data } };
  }