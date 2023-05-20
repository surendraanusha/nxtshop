/* eslint-disable @next/next/no-img-element */
"use client"
import { useState,useEffect, Fragment } from 'react'
import { CheckIcon, QuestionMarkCircleIcon, StarIcon } from '@heroicons/react/20/solid'
import { ShieldCheckIcon } from '@heroicons/react/24/outline'
import {BiRupee} from 'react-icons/bi'
import {AiFillStar} from 'react-icons/ai'
import {BsCheckCircle} from 'react-icons/bs'
import {AiOutlineMinusSquare,AiOutlineHeart,AiOutlinePlusSquare,AiFillHeart} from 'react-icons/ai'


const product = {
  name: 'Everyday Ruck Snack',
  href: '#',
  price: '$220',
  description:
    "Don't compromise on snack-carrying capacity with this lightweight and spacious bag. The drawstring top keeps all your favorite chips, crisps, fries, biscuits, crackers, and cookies secure.",
  imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-04-featured-product-shot.jpg',
  imageAlt: 'Model wearing light green backpack with black canvas straps and front zipper pouch.',
  breadcrumbs: [
    { id: 1, name: 'Travel', href: '#' },
    { id: 2, name: 'Bags', href: '#' },
  ],
  sizes: [
    { name: '18L', description: 'Perfect for a reasonable amount of snacks.' },
    { name: '20L', description: 'Enough room for a serious amount of snacks.' },
  ],
}
const reviews = { average: 4, totalCount: 1624 }

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}
const ProductDetails = (data) => {
    const [productObj,setProductObj] = useState({})
    const [favourite,setFavourite] = useState(false)
    const productId = data.params.id

  useEffect(()=>{

    const getProductDetils = async() =>{
      const Token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJhaHVsIiwicm9sZSI6IlBSSU1FX1VTRVIiLCJpYXQiOjE2MjMwNjU1MzJ9.D13s5wN3Oh59aa_qtXMo3Ec4wojOx0EZh8Xr5C5sRkU`
      const options = {
          headers: {
            Authorization: `Bearer ${Token}`,
          },
          method: 'GET',
        }
      const res = await fetch(`https://apis.ccbp.in/products/${productId}`,options);
      
      if(res.ok){
        const data = await res.json()
        console.log("hello product information==============>",data)
        setProductObj(data)
      }
    }

    getProductDetils();

  },[productId])
  
  const addFavourite = ()=>{
    setFavourite(!favourite)
  }

  return (
    <div>
      <div className="mx-auto max-w-2xl px-4 py-4 sm:px-6 sm:py-24 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
        <div className="lg:max-w-lg lg:self-start">
          <h1 className="text-3xl font-bold tracking-tight text-[#3E4C59] sm:text-4xl">{productObj.title}</h1>
          <section aria-labelledby="information-heading" className="mt-4">
            <h2 id="information-heading" className="sr-only">
              Product information
            </h2>

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
                <button className='mr-5'><AiOutlineMinusSquare className='h-7 w-7' fill='#88929C'/></button>
                <p className='text-[#404142] font-bold text-2xl'>1</p>
                <button className='ml-5'><AiOutlinePlusSquare className='h-7 w-7' fill='#88929C'/></button>
              </div>
              <div className="mt-10 flex items-center">
                <button
                  type="button"
                  className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
                >
                  Add To Cart
                </button>
                <button className='px-3 py-3 ml-3 hover:bg-gray-100 cursor-pointer rounded-md' onClick={addFavourite}>
                  {favourite ?  <AiFillHeart className='h-7 w-7' fill='#f030a3'/> :  <AiOutlineHeart className='h-7 w-7' fill='#f030a3'/>}
                </button>
                
              </div>
              <div className="mt-6 text-center">
                <a href="#" className="group inline-flex text-base font-medium">
                  <ShieldCheckIcon
                    className="mr-2 h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                    aria-hidden="true"
                  />
                  <span className="text-gray-500 hover:text-gray-700">Lifetime Guarantee</span>
                </a>
              </div>
            </div>
          </section>
        </div>
      </div>
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