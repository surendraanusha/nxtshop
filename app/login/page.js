/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
"use client"
import  { useState } from 'react'
import Cookies from 'js-cookie';

const Login = () => {
    const [userName,setUserName] = useState();
    const [password,serPassword] = useState();
    const [seePassword,setStaus] = useState(null);
    const [error_msg,setMsg] = useState(null)

    const getUserInformation = async (event) => {
        event.preventDefault()
        const userObj = {username:userName,password:password}
        const url = 'https://apis.ccbp.in/login'
       
        const options = {
            method: 'POST',
            body: JSON.stringify(userObj),
        }
        const res = await fetch(url,options)
        const data = await res.json()

        if (res.ok === true) {
            Cookies.set('jwtToken', data.jwt_token, {expires: 30});
          } 
        else {
        setMsg(data.error_msg)
        }
    }

    const getUsername = (event) => {
        setUserName(event.target.value)
    }
    const getPassword = (event) => {
        serPassword(event.target.value)
    }

    const getStatus = (event) =>{
        setStaus(event.target.checked)
    }

    const changeInputType = seePassword ? 'text' : 'password'

  return (
    <div className='h-[100vh] flex items-center justify-center lg:gap-10 p-4'>
        <img src='https://assets.ccbp.in/frontend/react-js/nxt-trendz-login-img.png' alt='shopping-logo' className='hidden lg:block lg:max-w-[33rem] xl:max-w-[40rem]'/> 
        <div className="flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
        <div className="bg-white px-6 py-12 shadow-lg rounded-md sm:px-12">
            <form className="space-y-6" onSubmit={getUserInformation}>
            <img src='https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png' alt='logo' className='mb-2 h-18 md:h-20 w-[100%]'/>
            <img src='https://assets.ccbp.in/frontend/react-js/nxt-trendz-login-img.png' alt='shopping-logo' className='block lg:hidden lg:max-w-[33rem] xl:max-w-[40rem]'/> 

            <div>
                <label htmlFor="userName" className="block text-sm font-medium leading-6 text-gray-900">
                Username
                </label>
                <div className="mt-2">
                <input
                    id="userName"
                    name="userName"
                    type="text"
                    onChange={getUsername}
                    className="block w-full rounded-md border-0 py-2 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                </div>
            </div>

            <div>
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                Password
                </label>
                <div className="mt-2">
                <input
                    id="password"
                    name="password"
                    type={`${changeInputType}`}
                    onChange={getPassword}
                    className="block w-full rounded-md border-0 py-2 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                </div>
            </div>

            <div className="flex items-center justify-between">
                <div className="flex items-center">
                <input
                    id="showPassword"
                    name="showPassword"
                    type="checkbox"
                    onChange={getStatus}
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                />
                <label htmlFor="showPassword" className="ml-3 block text-sm leading-6 text-gray-900">
                    Show Password
                </label>
                </div>
            </div>

            <div>
                <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-4 py-3 text-md font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                Log in
                </button>
            </div>
            {error_msg !== null ? <p className="text-red-600 font-sans text-base mt-2 font-semibold">*{error_msg}</p> : ''}

            </form>
        </div>
        </div>
        </div>
    </div>
    
  )
}

export default Login
