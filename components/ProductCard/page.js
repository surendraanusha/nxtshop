/* eslint-disable @next/next/no-img-element */

import {BiRupee} from 'react-icons/bi'
import {AiFillStar} from 'react-icons/ai'
import Link from 'next/link'
const ProductCard = (props) => {
    const {product} = props
    const {id,image_url,price,rating,title,brand} = product
  return (
    <Link href={`/products/${id}`}>
        <div>
            <div className="min-h-80 aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
            <img
                src={image_url}
                alt='product'
                className="h-full w-full object-cover object-center lg:h-full lg:w-full rounded-md"
            />
            </div>
            <div className="mt-4">
                <h1 className="text-[#171F46] text-xl md:text-base lg:text-xl font-bold mt-6">{title}</h1>
                <p className='mt-2 text-[#594D6D] font-semibold'>{brand}</p>
                <div className='flex items-center justify-between mt-2'>
                    <div className='flex items-center'>
                        <BiRupee fill='#171F46'/>
                        <p className='text-[#171F46] font-bold'>{price}/-</p>
                    </div>
                    <div className='bg-blue-400 px-4 py-1 flex items-center rounded-md'>
                        <p className='text-white mr-2'>{rating}</p>
                        <AiFillStar className='text-white'/>
                    </div>
                </div>
            </div>
        </div>
    </Link>
  )
}

export default ProductCard
