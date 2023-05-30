"use client"
/* eslint-disable @next/next/no-img-element */

import { Fragment,useContext, useRef, useState } from 'react'
import { Disclosure, Menu, Transition, Dialog } from '@headlessui/react'
import { Bars3Icon, XMarkIcon,ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import {FaUserCircle} from 'react-icons/fa'
import {AiOutlineShoppingCart} from 'react-icons/ai'
import { userContext } from '@/app/layout'
import {useRouter, usePathname } from 'next/navigation';
import Cookies from 'js-cookie'
function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Header() {

  const contextValue = useContext(userContext)
  const pathName = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(true)
  const [profileOpen,setProfileStatus] = useState(true)
  const cancelButtonRef = useRef(null)
  const [show,setShow] = useState(false)
  const [userInfo,setUserInfo] = useState(false)
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  const mobileActiveClass = `border-l-4 border-indigo-500 bg-indigo-50 text-indigo-700`
  const mobileInActiveClass = `border-l-4 border-transparent text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700`
  const active = `border-b-2 border-cyan-600 text-cyan-700 font-bold`
  const inActive = `border-b-2 border-transparent text-gray-800 hover:text-gray-900`

  const logoutFun = () => {
    Cookies.remove('jwtToken')
    router.push('/login')
  }

  const cancelLogout = () =>{
    setShow(false)
  }
  const showModal = () => {
    setShow(!show)
  }

  const showProfileInfo = () => {
    if(!profileOpen){
      setProfileStatus(true)
    }
    setUserInfo(true)
  }


  
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);
    // previewImageFile(file);
    handleImageUpload(file)
  };
  const handleImageUpload = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewImage(reader.result);
    };
  };

  // {previewImage && (
  //   <img src={previewImage} alt="Preview" style={{ width: '300px', height: '300px' }} />
  // )}
//   <button type='button' disabled={!selectedImage} className={`${selectedImage !== null ? 'cursor-pointer hover:bg-sky-400 hover:text-white' :  'cursor-not-allowed' } mt-4 border border-cyan-500 rounded-md text-cyan-500 py-2 px-2 `} onClick={handleImageUpload}>
//   Upload Image
// </button>
  function imageUploadFun(){
    return(
      <div>
      <input type="file" onChange={handleImageChange} />
    </div>
    )
  }

  function ModalView(){
    return(
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-[60]" initialFocus={cancelButtonRef} onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center sm:items-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                  <div className="sm:flex sm:items-start">
                    <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                      <ExclamationTriangleIcon className="h-6 w-6 text-red-600" aria-hidden="true" />
                    </div>
                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                      <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                        Deactivate account
                      </Dialog.Title>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">
                          Are you sure you want to deactivate your account? All of your data will be permanently removed
                          from our servers forever. This action cannot be undone.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                    <button
                      type="button"
                      className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                      onClick={() => logoutFun()}
                    >
                      Yes
                    </button>
                    <button
                      type="button"
                      className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                      onClick={() => cancelLogout()}
                      ref={cancelButtonRef}
                    >
                      Cancel
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    )
  }

  function userInformation(){
    return(
    <Transition.Root show={profileOpen} as={Fragment}>
      <Dialog as="div" className="relative z-[55]" onClose={setProfileStatus}>
        <div className="fixed inset-0" />

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                  <div className="flex h-full flex-col bg-white shadow-xl">
                    <div className="px-4 py-6 sm:px-6">
                      <div className="flex items-start justify-between">
                        <h2 id="slide-over-heading" className="text-base font-semibold leading-6 text-gray-900">
                          Profile
                        </h2>
                        <div className="ml-3 flex h-7 items-center">
                          <button
                            type="button"
                            className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:ring-2 focus:ring-indigo-500"
                            onClick={() => setProfileStatus(false)}
                          >
                            <span className="sr-only">Close panel</span>
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                      </div>
                    </div>
                    {/* Main */}
                    <div>
                      <div className="pb-1 sm:pb-6">
                        <div>
                          <div className="relative h-40 sm:h-56 mb-2">
                             <img
                              className="absolute h-full w-full object-cover"
                              src="https://t3.ftcdn.net/jpg/02/00/90/24/360_F_200902415_G4eZ9Ok3Ypd4SZZKjc8nqJyFVp1eOD6V.jpg"
                              alt=""
                              />
                          </div>
                          <div className="mt-6 px-4 sm:mt-8 sm:flex sm:items-end sm:px-6">
                            <div className="sm:flex-1">
                              <div>
                                <div className="flex items-center">
                                  <h3 className="text-xl font-bold text-gray-900 sm:text-2xl">Ashley Porter</h3>
                                  <span className="ml-2.5 inline-block h-2 w-2 flex-shrink-0 rounded-full bg-green-400">
                                    <span className="sr-only">Online</span>
                                  </span>
                                </div>
                                <p className="text-sm text-gray-500">@ashleyporter</p>
                              </div>
                            </div>
                          </div>
                          <div className="mt-6 px-4 sm:mt-8 sm:flex sm:items-end sm:px-6">
                            <div className="sm:flex-1">
                              <div>
                                <div className="flex items-center">
                                  <h3 className="text-xl font-bold text-gray-900 sm:text-2xl">Delivery Address:</h3>
                                </div>
                                <p className="text-sm text-gray-500">1-12A Vijayanagar Colony,Bengalure,Karnataka</p>
                                <p className="text-sm text-gray-500">Pin:517504</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
    )
  }

  return (
    <Disclosure as="nav" className="fixed top-0 left-0 w-full bg-white shadow-md z-40">
      {({ open }) => (
        <Fragment>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button */}
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                <Link href={'/'}>
                  <img
                    className="block h-8 w-auto lg:hidden"
                    src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png"
                    alt="Your Company"
                  />
                  </Link>
                  <Link href={'/'}>
                    <img
                    className="hidden h-8 w-auto lg:block"
                    src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png"
                    alt="Your Company"
                  />
                  </Link>
                </div>
                <div className="hidden sm:ml-14 sm:flex sm:space-x-8 items-center">
                  {/* Current: "border-indigo-500 text-gray-900", Default: "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700" */}
                  <Link href={'/'} className={`h-full text-center flex flex-col justify-center items-center ${pathName === '/' ? active : inActive}`}>
                    <li
                        className="inline-flex items-center px-1 pt-1 text-sm font-medium"
                    >
                        Home
                    </li>
                  </Link>
                  <Link href={'/products'} className={`h-full text-center flex flex-col justify-center items-center ${pathName === '/products' ? active : inActive}`}>
                    <li
                        className="inline-flex items-center px-1 pt-1 text-sm font-medium"
                    >
                        Products
                    </li>
                  </Link>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                {/* Profile dropdown */}
                <Link href={'/cart'}>
                  <div className='mr-2 flex items-center relative '>
                    <AiOutlineShoppingCart fill='#8d8f8f' className='hidden md:block h-8 w-8 font-bold'/>
                    {contextValue.productCart.length !== 0 ? <p className='text-[#5c8fbf] font-bold text-sm relative -top-3 hidden md:block'>{contextValue.productCart.length}</p> : ''}                    
                  </div>
                </Link>
                <Menu as="div" className="relative ml-3">
                  <div>
                    <Menu.Button className="flex rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                    <FaUserCircle className='h-8 w-8' fill='#5c8fbf'/>
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-200"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <Menu.Item>
                        {({ active }) => (
                          <li
                            className={`${classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')} cursor-pointer`}
                            onClick={showProfileInfo}
                          >
                            Your Profile
                          </li>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                       
                        {({ active }) => (
                          <li
                            className={`${classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')} cursor-pointer`}
                            onClick={showModal}
                          >
                            Log out
                          </li>
                        )}
                        
                        
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
                
              </div>
              {show ? ModalView() : null}
              {userInfo ? userInformation() : null}
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 pb-4 pt-2">
              {/* Current: "bg-indigo-50 border-indigo-500 text-indigo-700", Default: "border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700" */}
              <Disclosure.Button
                className={`block py-2 w-full text-left pl-3 pr-4 text-base font-medium ${pathName === '/' ? mobileActiveClass : mobileInActiveClass}`}
              >
                <Link href={'/'}>
                    Home
                </Link>
              </Disclosure.Button>
              <Disclosure.Button
                className={`block py-2 w-full text-left pl-3 pr-4 text-base font-medium ${pathName === '/products' ? mobileActiveClass : mobileInActiveClass}`}
              >
                <Link href={'/products'}>
                    Products
                </Link>
              </Disclosure.Button>
              <Disclosure.Button
                className={`block py-2 w-full text-left pl-3 pr-4 text-base font-medium ${pathName === '/cart' ? mobileActiveClass : mobileInActiveClass}`}
              >
              <Link href={'/cart'}>
                Cart
              </Link>
              </Disclosure.Button>
            </div>
          </Disclosure.Panel>
        </Fragment>
      )}
    </Disclosure>
  )
}