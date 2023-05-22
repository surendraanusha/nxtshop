/* eslint-disable @next/next/no-img-element */
import { useContext ,useState} from 'react'
import { ShieldCheckIcon } from '@heroicons/react/24/outline'
import {AiOutlineMinusSquare,AiOutlineHeart,AiOutlinePlusSquare,AiFillHeart} from 'react-icons/ai'
import {RiDeleteBin5Line} from 'react-icons/ri'
import {BiRupee} from 'react-icons/bi'
import { userContext } from '@/app/layout'

const CartItem = (props) => {
    const {product} = props
    const {id,title,imageUrl,price,quantity,availability,brand,favouriteValue} = product
    const context = useContext(userContext)
    const [favourite,setFavourite] = useState(favouriteValue)
    const [quan,setQuan] = useState(quantity)

    const deleteItem = () => {
        context.removeItem(id)
    }

    const addFavourite = ()=>{
      setFavourite(!favourite)
    }

    let itemQuantity = quantity

    const decreaseQuan = () =>{
        itemQuantity -= 1
        context.decrementCartItemQuantity(id)
    }

    const increaseQuan = () => {
      itemQuantity += 1
        context.incrementCartItemQuantity(id)
    }

  return (
    <div>
    <li key={product.id} className="flex py-6 sm:py-10">
    <div className="flex-shrink-0">
      <img
        src={imageUrl}
        alt={id}
        className="h-24 w-24 rounded-md object-cover object-center sm:h-48 sm:w-48"
      />
    </div>

    <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
      <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
        <div>
          <div className="flex justify-between">
            <h3 className="text-lg font-bold text-[#171F46]">
              {title}
            </h3>
          </div>

          <div className="mt-1 flex items-center">
            <p className='text-[#171F46] font-semibold text-lg'>By:</p>
            <p className="ml-2 text-base font-semibold text-gray-500">{brand}</p>
          </div>
          
          <div className="flex items-center">
            <p className='text-[#171F46] font-semibold text-lg'>Quantity:</p>
            <p className="text-[#171F46] font-semibold ml-1"> {itemQuantity}</p>
          </div>

          <div className='mt-1 flex items-center'>
              <BiRupee fill='#171F46'/>
              <p className='text-[#171F46] font-semibold'>{price}/-</p>
          </div>
        </div>

        <div className="mt-4 sm:mt-0 sm:pr-9">
            <div className='flex items-center'>
              <button className='mr-5' onClick={decreaseQuan}><AiOutlineMinusSquare className='h-7 w-7' fill='#88929C'/></button>
              <p className='text-[#404142] font-bold text-2xl'>{quantity}</p>
              <button className='ml-5' onClick={increaseQuan}><AiOutlinePlusSquare className='h-7 w-7' fill='#88929C'/></button>
            </div>
          
          <div className="absolute right-0 top-0 ">
            <button type="button" className="-m-2 mt-1 mr-[3px] inline-flex text-gray-400 hover:text-gray-500" onClick={deleteItem}>
              <RiDeleteBin5Line className="h-6 w-6" fill='#7E7281' />
            </button>
          </div>
        </div>
      </div>
      <div className="mt-4 flex items-center">
        <p className="flex items-center space-x-2 text-sm text-gray-700">
        <ShieldCheckIcon
            className="mr-1 h-6 w-6 flex-shrink-0 text-green-300 group-hover:text-green-700"
            aria-hidden="true"
          />
          <span className='text-sm text-gray-700'>{availability}</span>

        </p>
        <button className='px-3 py-3 ml-3 hover:bg-gray-100 cursor-pointer rounded-md' onClick={addFavourite}>
          {favourite ?  <AiFillHeart className='h-7 w-7' fill='#f030a3'/> :  <AiOutlineHeart className='h-7 w-7' fill='#f030a3'/>}
        </button>
      </div>
    </div>
  </li>
    </div>
  )
}

export default CartItem
