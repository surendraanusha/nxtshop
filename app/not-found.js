"use client"
/* eslint-disable @next/next/no-img-element */


const NotFound = () => {
  return (
    <div className=" h-[80vh] flex flex-col justify-center items-center">
      <img src='https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-light-theme-img.png'alt="notfound" className="h-80 w-auto mb-4"/>
      <h3 className="text-[#1C293A] font-bold text-2xl">Page not Found</h3>
      <p className="text-[#445366] font-semibold text-xl">We are sorry, the page you requested could not be found.</p>
    </div>
  )
}

export default NotFound
