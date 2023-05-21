/* eslint-disable @next/next/no-img-element */
import React from 'react'

const ConnectionLost = () => {
    const imageUrl = `https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png`

  return (
    <div className='h-full flex flex-col justify-center items-center'>
        <div className='h-full flex flex-col justify-center items-center p-3 md:p-0'> 
            <img src={imageUrl} alt='connection-lost' className='h-80 mb-4 w-auto'/>
            <h1 className={`text-[#1C293A] font-sans text-lg md:text-3xl font-bold mb-2`}>Oops! Something Went Wrong</h1>
            <p className={`text-[#406AA3] font-sans text-xl md:text-2xl font-semibold text-center mb-2`}>We are having some trouble to complete your request.please try again.</p>
            <button className='px-10 mt-2 py-2 bg-blue-700 text-white font-sans font-bold rounded-md'>Retry</button>
        </div>
    </div>
  )
}

export default ConnectionLost
