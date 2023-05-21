import React from 'react'
import ScaleLoader from "react-spinners/ScaleLoader";

const Loader = () => {
  return (
    <div className='flex items-center justify-center flex-col h-[60vh]'>
        <ScaleLoader size={400} height={60} color='#fa7500'/>
        <p className={`text-[#fa7500] font-sans font-bold text-2xl`}>Loading...</p>
    </div>
  )
}

export default Loader
