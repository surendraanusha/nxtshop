"use client"

import Link from "next/link"

/* eslint-disable @next/next/no-img-element */

export default function Home() {
  return (
    <div className="mx-auto max-w-7xl px-6 sm:py-20 lg:flex lg:items-center lg:gap-x-14 lg:px-8">
          <div className="mx-auto  lg:mx-0 lg:flex-auto flex items-center md:items-start flex-col">
            <h1 className="text-3xl text-center md:text-left font-bold tracking-tight text-[#1E293B] sm:text-6xl md:mb-6 leading-10">
              Clothes That Get YOU Noticed
            </h1>
            <div className="mt-10 sm:mt-24 lg:mt-0 lg:flex-shrink-0 lg:flex-grow block md:hidden">
              <img src='https://assets.ccbp.in/frontend/react-js/nxt-trendz-home-img.png' alt="logo"/>
            </div>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Fashion is part of the daily air and it does not quite help that it changes all the time. Clothes have always been a marker of the era and we are in a revolution. Your fashion makes you been seen and heard that way you are. So, celebrate the seasons new and exciting fashion in your own way.
            </p>
            <div className="mt-6 flex items-center gap-x-6">
            <Link href={'/products'}>
                <button
                  className="rounded-md bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Shop now
                </button>
            </Link>
            </div>
          </div>
          <div className="mt-16 sm:mt-24 lg:mt-0 lg:flex-shrink-0 lg:flex-grow hidden md:block">
            <img src='https://assets.ccbp.in/frontend/react-js/nxt-trendz-home-img.png' alt="logo" className="lg:max-w-[500px]"/>
          </div>
    </div>
  )
}
