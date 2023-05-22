"use client"
/* eslint-disable @next/next/no-img-element */
import { useContext, useState } from 'react'
import { CheckIcon, ClockIcon, QuestionMarkCircleIcon, XMarkIcon as XMarkIconMini } from '@heroicons/react/20/solid'
import {BiRupee} from 'react-icons/bi'
import { userContext } from '@/app/layout'
import Link from 'next/link'
import CartItem from '@/components/CartItem/page'
import CartSummary from '@/components/CartSummary/page'
const navigation = {
  categories: [
    {
      id: 'women',
      name: 'Women',
      featured: [
        {
          name: 'New Arrivals',
          href: '#',
          imageSrc: 'https://tailwindui.com/img/ecommerce-images/mega-menu-category-01.jpg',
          imageAlt: 'Models sitting back to back, wearing Basic Tee in black and bone.',
        },
        {
          name: 'Basic Tees',
          href: '#',
          imageSrc: 'https://tailwindui.com/img/ecommerce-images/mega-menu-category-02.jpg',
          imageAlt: 'Close up of Basic Tee fall bundle with off-white, ochre, olive, and black tees.',
        },
      ],
      sections: [
        {
          id: 'clothing',
          name: 'Clothing',
          items: [
            { name: 'Tops', href: '#' },
            { name: 'Dresses', href: '#' },
            { name: 'Pants', href: '#' },
            { name: 'Denim', href: '#' },
            { name: 'Sweaters', href: '#' },
            { name: 'T-Shirts', href: '#' },
            { name: 'Jackets', href: '#' },
            { name: 'Activewear', href: '#' },
            { name: 'Browse All', href: '#' },
          ],
        },
        {
          id: 'accessories',
          name: 'Accessories',
          items: [
            { name: 'Watches', href: '#' },
            { name: 'Wallets', href: '#' },
            { name: 'Bags', href: '#' },
            { name: 'Sunglasses', href: '#' },
            { name: 'Hats', href: '#' },
            { name: 'Belts', href: '#' },
          ],
        },
        {
          id: 'brands',
          name: 'Brands',
          items: [
            { name: 'Full Nelson', href: '#' },
            { name: 'My Way', href: '#' },
            { name: 'Re-Arranged', href: '#' },
            { name: 'Counterfeit', href: '#' },
            { name: 'Significant Other', href: '#' },
          ],
        },
      ],
    },
    {
      id: 'men',
      name: 'Men',
      featured: [
        {
          name: 'New Arrivals',
          href: '#',
          imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-04-detail-product-shot-01.jpg',
          imageAlt: 'Drawstring top with elastic loop closure and textured interior padding.',
        },
        {
          name: 'Artwork Tees',
          href: '#',
          imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-02-image-card-06.jpg',
          imageAlt:
            'Three shirts in gray, white, and blue arranged on table with same line drawing of hands and shapes overlapping on front of shirt.',
        },
      ],
      sections: [
        {
          id: 'clothing',
          name: 'Clothing',
          items: [
            { name: 'Tops', href: '#' },
            { name: 'Pants', href: '#' },
            { name: 'Sweaters', href: '#' },
            { name: 'T-Shirts', href: '#' },
            { name: 'Jackets', href: '#' },
            { name: 'Activewear', href: '#' },
            { name: 'Browse All', href: '#' },
          ],
        },
        {
          id: 'accessories',
          name: 'Accessories',
          items: [
            { name: 'Watches', href: '#' },
            { name: 'Wallets', href: '#' },
            { name: 'Bags', href: '#' },
            { name: 'Sunglasses', href: '#' },
            { name: 'Hats', href: '#' },
            { name: 'Belts', href: '#' },
          ],
        },
        {
          id: 'brands',
          name: 'Brands',
          items: [
            { name: 'Re-Arranged', href: '#' },
            { name: 'Counterfeit', href: '#' },
            { name: 'Full Nelson', href: '#' },
            { name: 'My Way', href: '#' },
          ],
        },
      ],
    },
  ],
  pages: [
    { name: 'Company', href: '#' },
    { name: 'Stores', href: '#' },
  ],
}
const products = [
  {
    id: 1,
    name: 'Basic Tee',
    href: '#',
    price: '$32.00',
    color: 'Sienna',
    inStock: true,
    size: 'Large',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/shopping-cart-page-01-product-01.jpg',
    imageAlt: "Front of men's Basic Tee in sienna.",
  },
  {
    id: 2,
    name: 'Basic Tee',
    href: '#',
    price: '$32.00',
    color: 'Black',
    inStock: false,
    leadTime: '3–4 weeks',
    size: 'Large',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/shopping-cart-page-01-product-02.jpg',
    imageAlt: "Front of men's Basic Tee in black.",
  },
  {
    id: 3,
    name: 'Nomad Tumbler',
    href: '#',
    price: '$35.00',
    color: 'White',
    inStock: true,
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/shopping-cart-page-01-product-03.jpg',
    imageAlt: 'Insulated bottle with white base and black snap lid.',
  },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}
const Cart = () => {
  const cart = useContext(userContext);
  const cartItemsArray = cart.productCart
  const [quantity,setQuantity] = useState(null)

  function emptyView(){
    return(
      <div className='flex flex-col items-center justify-center mt-4 md:mt-8'>
        <img src='https://assets.ccbp.in/frontend/react-js/nxt-trendz-empty-cart-img.png' alt='logo' className='w-[360px]  mb-4'/>
        <h1 className='text-[#1E293B] font-bold text-2xl mb-4'>Your Cart Is Empty</h1>
        <Link href={'/products'}>
          <button className='px-6 py-2 bg-blue-500 text-white font-semibold text-base rounded-md'>Shop Now</button>
        </Link>
      </div>
    )
  }

  const decreaseQuan = () => {
    console.log('hellow')
  }

  function itemsView(){
    return(
      <ul role="list" className="divide-y divide-gray-200 border-b-2 border-gray-200">
          {cartItemsArray.map((product, productIdx) => (
            <CartItem product={product} key={productIdx}/>
          ))}
        </ul>
    )
  }

  return (
    <div>
    <main className="mx-auto max-w-2xl px-4 pb-24 pt-16 sm:px-6 lg:max-w-7xl lg:px-8">
    <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-4">Shopping Cart</h1>
    <hr className='border-b border-gray-200'/>
    {
      cart.productCart.length === 0 ? emptyView() : <div className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
      <section aria-labelledby="cart-heading" className="lg:col-span-7">
        {itemsView()}
      </section>

      {/* Order summary */}
      <CartSummary/>
    </div>
    }
    
  </main>
    </div>
  )
}

export default Cart

// {product.size ? (
//   <p className="ml-4 border-l border-gray-200 pl-4 text-gray-500">{product.size}</p>
// ) : null}

// {product.inStock ? (
//   <CheckIcon className="h-5 w-5 flex-shrink-0 text-green-500" aria-hidden="true" />
// ) : (
//   <ClockIcon className="h-5 w-5 flex-shrink-0 text-gray-300" aria-hidden="true" />
// )}