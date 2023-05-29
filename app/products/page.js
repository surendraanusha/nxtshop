/* eslint-disable @next/next/no-img-element */
"use client"
import { Fragment, useState,useEffect } from 'react'
import { Dialog, Disclosure, Menu, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { ChevronDownIcon,ChevronUpIcon, FunnelIcon, MinusIcon, PlusIcon, } from '@heroicons/react/20/solid'
import ProductCard from '@/components/ProductCard/page'
import {BsSearch} from 'react-icons/bs'
import Loader from '@/components/Loader/page'
import ConnectionLost from '@/components/Connection/page'

const sortOptions = [
  { name: 'PRICE_HIGH', value:1},
  { name: 'PRICE_LOW',value:2}
]

const filters = [
  {
    id: 'category',
    name: 'Category',
    options: [
      { value: 1, label: 'Clothing'},
      { value: 2, label: 'Electronics'},
      { value: 3, label: 'Appliances'},
      { value: 4, label: 'Grocery'},
      { value: 5, label: 'Toys'},
    ],
  },
  {
    id: 'Rating',
    name: 'Rating',
    options: [
      { value: 4, imageUrl: 'https://assets.ccbp.in/frontend/react-js/rating-four-stars-img.png',label:'imageUrl'},
      { value: 3, imageUrl: 'https://assets.ccbp.in/frontend/react-js/rating-three-stars-img.png',label:'imageUrl'},
      { value: 2, imageUrl: 'https://assets.ccbp.in/frontend/react-js/rating-two-stars-img.png',label:'imageUrl'},
      { value: 1, imageUrl: 'https://assets.ccbp.in/frontend/react-js/rating-one-star-img.png',label:'imageUrl'}
    ],
  },
  
]

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Products() {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
  const [ProductsArray,serProductsArray] = useState([])
  const [PrimeProduct,setPrimeProductArray] = useState([])
  const [apiStatus,setApiStatus] = useState(apiStatusConstants.initial)
  const [productName,setProductName] = useState('')
  const [titleSearch,setTitle] = useState('')
  const [activeOptionId,setActiveOptionId] = useState('')
  const [activeCategoryId,setActiveCategoryId] = useState('')
  const [activeRatingId,setActiveRatingId] = useState('')
  const [activeCategoryCss,setActiveCategoryCss] = useState(null)
  const [activeRatingCss,setActiveRatingCss] = useState(null)


  const categoryId = (categoryObj) => {
    setActiveCategoryId(categoryObj.value)
    setActiveCategoryCss(categoryObj.value)
   }
  
  const ratingFunction = (ratingObj) => {
    setActiveRatingId(ratingObj.value)
    setActiveRatingCss(ratingObj.value)
  }

  const catchProductName = (event) => {
    setProductName(event.target.value)
  }

 const getSearchResults = () => {
    setTitle(productName)
 }



  useEffect(()=>{
    getProducts();

  },[activeCategoryId,activeRatingId,titleSearch])

  useEffect(()=>{
    getPrimeDeals();
  },[])

  const getPrimeDeals = async () => {
    setApiStatus(apiStatusConstants.inProgress)
      const ApiUrl = `https://apis.ccbp.in/prime-deals`
      // const jwtToken = Cookies.get('jwtToken')
      const Token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJhaHVsIiwicm9sZSI6IlBSSU1FX1VTRVIiLCJpYXQiOjE2MjMwNjU1MzJ9.D13s5wN3Oh59aa_qtXMo3Ec4wojOx0EZh8Xr5C5sRkU`
      const options = {
        headers: {
          Authorization: `Bearer ${Token}`,
        },
        method: 'GET',
      }
      const response = await fetch(ApiUrl,options)
      if(response.ok){
        const productData = await response.json()
        // console.log(productData)
        setPrimeProductArray(productData.prime_deals)
        setApiStatus(apiStatusConstants.success)
      }
      else{
        setApiStatus(apiStatusConstants.failure)
      }
      
    }

  const getProducts = async () => {
    setApiStatus(apiStatusConstants.inProgress)
    const ApiUrl = `https://apis.ccbp.in/products?sort_by=${activeOptionId}&category=${activeCategoryId}&title_search=${titleSearch}&rating=${activeRatingId}`
    // 
    // const jwtToken = Cookies.get('jwtToken')
    const Token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJhaHVsIiwicm9sZSI6IlBSSU1FX1VTRVIiLCJpYXQiOjE2MjMwNjU1MzJ9.D13s5wN3Oh59aa_qtXMo3Ec4wojOx0EZh8Xr5C5sRkU`
    const options = {
      headers: {
        Authorization: `Bearer ${Token}`,
      },
      method: 'GET',
    }
    const response = await fetch(ApiUrl,options)
    if(response.ok){
      const productData = await response.json()
      serProductsArray(productData.products)
      setApiStatus(apiStatusConstants.success)
    }
    else{
      setApiStatus(apiStatusConstants.failure)
    }
    
  }



  function renderPrimeDealsFailureView(){
    return <img
      src="https://assets.ccbp.in/frontend/react-js/exclusive-deals-banner-img.png"
      alt="Register Prime"
      className="register-prime-image"
    />
  }

  function productsSuccessView(){
    return(
      <div className='grid grid-cols-1 md:grid-cols-3 gap-5'>
        {ProductsArray.map((product) => (
            <ProductCard product={product} key={product.id}/>
        ))}
    </div>
    )
  }

  function primeDealsSuccesView(){
    return(
      <div className='grid grid-cols-1 md:grid-cols-3 gap-5'>
          {PrimeProduct.map((product) => (
              <ProductCard product={product} key={product.id}/>
          ))}
      </div>
    )
  }

  function productsFinalView(){
    switch(apiStatus){
      case apiStatusConstants.success:
        return productsSuccessView()
      case apiStatusConstants.failure:
        return <ConnectionLost/>
      case apiStatusConstants.inProgress:
        return <Loader/>
      default:
        return null
    }
  }

  function primaryDealsView(){
    switch(apiStatus){
      case apiStatusConstants.success:
        return primeDealsSuccesView()
      case apiStatusConstants.failure:
        return renderPrimeDealsFailureView()
      case apiStatusConstants.inProgress:
        return <Loader/>
      default:
        return null
    }
  }

  function EmptyView(){
    return(
      <div className='flex flex-col items-center justify-center'>
      <img src="https://assets.ccbp.in/frontend/react-js/nxt-trendz/nxt-trendz-no-products-view.png" class="no-products-img mb-2" alt="no products"/>
      <h1 className='text-[#171F46] font-semibold text-2xl mb-2'>No Products Found</h1>
      <p className='text-[#7a879b] font-medium text-xl text-center'>We could not find any products. Try other filters.</p>
      </div>
    )
  }

  return (
    <div>
      <div>
        {/* Mobile filter dialog */}
        <Transition.Root show={mobileFiltersOpen} as={Fragment}>
          <Dialog as="div" className="relative z-40 lg:hidden" onClose={setMobileFiltersOpen}>
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>

            <div className="fixed inset-0 z-40 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
                  <div className="flex items-center justify-between px-4">
                    <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                    <button
                      type="button"
                      className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                      onClick={() => setMobileFiltersOpen(false)}
                    >
                      <span className="sr-only">Close menu</span>
                      <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>

                  {/* Filters */}
                  <div className="mt-4 border-t border-gray-200">
                    <h3 className="sr-only">Categories</h3>
                   
                    {filters.map((section) => (
                      <Disclosure as="div" key={section.id} className="border-t border-gray-200 px-4 py-6">
                        {({ open }) => (
                          <Fragment>
                            <h3 className="-mx-2 -my-3 flow-root">
                              <Disclosure.Button className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                                <span className="font-medium text-gray-900">{section.name}</span>
                                <span className="ml-6 flex items-center">
                                  {open ? (
                                    <MinusIcon className="h-5 w-5" aria-hidden="true" />
                                  ) : (
                                    <PlusIcon className="h-5 w-5" aria-hidden="true" />
                                  )}
                                </span>
                              </Disclosure.Button>
                            </h3>
                            <Disclosure.Panel className="pt-6">
                              <div className="space-y-6">
                                {section.options.map((option, optionIdx) => (
                                  <div key={option.value} className="flex items-center">
                                  {
                                    option.label === 'imageUrl' ? 
                                    <button className={`flex items-center ${activeRatingCss === option.value ? `text-[#2d83cf]` : `text-gray-600`} font-medium`} onClick={() => ratingFunction(option)}>
                                      <img src={option.imageUrl} alt='logo' className='w-[160px] h-[28px] mr-1'/>
                                      & up
                                    </button> : <button className={`${activeCategoryCss === option.value ? `text-[#2d83cf]` : `text-gray-600`} text-sm font-medium`} onClick={() => categoryId(option)}>
                                    {option.label}
                                  </button> 
                                  }
                                  </div>
                                ))}
                              </div>
                            </Disclosure.Panel>
                          </Fragment>
                        )}
                      </Disclosure>
                    ))}
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>

        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className='py-6'>
                <h1 className="text-2xl lg:text-3xl font-bold tracking-tight text-[#475569] mb-4">Exclusive Prime Deals</h1>
                {primaryDealsView()}
            </div>
            
            <div className="flex items-center  justify-between border-b border-gray-200 pb-6 pt-4">
                <h1 className="text-2xl font-bold tracking-tight text-[#475569]">All Products</h1>
                <div className="flex items-center">
                <Menu as="div" className="relative inline-block text-left">
                    <div>
                      <Menu.Button className="group inline-flex justify-center items-center text-md font-medium text-gray-700 hover:text-gray-900">
                          <ChevronDownIcon
                          className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                          aria-hidden="true"
                          />
                          Sort
                          <ChevronUpIcon
                          className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                          aria-hidden="true"
                          />
                      </Menu.Button>
                    </div>

                    <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                    >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div className="py-1">
                        {sortOptions.map((option) => (
                            <Menu.Item key={option.name}>
                            {({ active }) => (
                                <a
                                href={option.href}
                                className={classNames(
                                    option.current ? 'font-medium text-gray-900' : 'text-gray-500',
                                    active ? 'bg-gray-100' : '',
                                    'block px-4 py-2 text-sm'
                                )}
                                >
                                {option.name}
                                </a>
                            )}
                            </Menu.Item>
                        ))}
                        </div>
                    </Menu.Items>
                    </Transition>
                </Menu>

                
                <button
                    type="button"
                    className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                    onClick={() => setMobileFiltersOpen(true)}
                >
                    <span className="sr-only">Filters</span>
                    <FunnelIcon className="h-5 w-5" aria-hidden="true" />
                </button>
                </div>
            </div>

            <section aria-labelledby="products-heading" className={`pb-24 ${ProductsArray.length === 0 ? `pt-20` : `pt-6`}`}>
                
                <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
                {/* Filters */}
                <div className="hidden lg:block">
                    <h3 className="sr-only">Categories</h3>
                    <div className='w-[100%]'>
                        <div>
                            <label htmlFor="productSearch" className="block text-md font-medium leading-6 text-gray-900">
                            Search product...
                            </label>
                            <div className="mt-2 flex items-center justify-between border border-gray-400 rounded-md">
                                <input placeholder='Search Product here...' className='ml-1 !outline-none border-none text-gray-400 border-0 placeholder:text-gray-400 w-[100%]' onChange={catchProductName}/>
                                <button className='py-3 px-2 h-full bg-gray-400 rounded-r-md border-r border-gray-400' type='button' onClick={getSearchResults}>
                                  <BsSearch/>
                                </button>
                            </div>
                        </div>
                    </div>
                    {filters.map((section) => (
                    <Disclosure as="div" key={section.id} className="border-b border-gray-200 py-6">
                        {({ open }) => (
                        <Fragment>
                            <h3 className="-my-3 flow-root">
                            <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                                <span className="font-medium text-base text-[#12022F]">{section.name}</span>
                                <span className="ml-6 flex items-center">
                                {open ? (
                                    <MinusIcon className="h-5 w-5" aria-hidden="true" />
                                ) : (
                                    <PlusIcon className="h-5 w-5" aria-hidden="true" />
                                )}
                                </span>
                            </Disclosure.Button>
                            </h3>
                            <Disclosure.Panel className="pt-6">
                            <div className="space-y-4">
                                {section.options.map((option, optionIdx) => (
                                <div key={option.value} className="flex items-center">
                                {
                                  option.label === 'imageUrl' ? 
                                  <button className={`flex items-center ${activeRatingCss === option.value ? `text-[#2d83cf]` : `text-gray-600`} font-medium`} onClick={() => ratingFunction(option)}>
                                  <img src={option.imageUrl} alt='logo' className='w-[160px] h-[28px] mr-1'/>
                                  & up
                                  </button>
                                      : <button className={`${activeCategoryCss === option.value ? `text-[#2d83cf]` : `text-gray-600`} text-sm font-medium`} onClick={() => categoryId(option)}>
                                  {option.label}
                                </button> 
                                }
                                                                   
                                </div>
                                ))}
                            </div>
                            </Disclosure.Panel>
                        </Fragment>
                        )}
                    </Disclosure>
                    ))}
                </div>

                {/* Product grid */}
                <div className="lg:col-span-3">
                {/* Your content */}
                {ProductsArray.length === 0 && titleSearch !== '' ? EmptyView() : productsFinalView()}
                </div>
                </div>
            </section>
        </main>
      </div>
    </div>
  )
}
