import React, { useContext } from 'react'

import { QuestionMarkCircleIcon, XMarkIcon as XMarkIconMini } from '@heroicons/react/20/solid'
import {BiRupee} from 'react-icons/bi'
import { userContext } from '@/app/layout'

const CartSummary = () => {
    const context = useContext(userContext)

    const numberToWords = (number) => {
        const singleDigits = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];
        
        const teenDigits = ['Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
        
        const tensDigits = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
        
        const getWords = (num) => {
            let words = '';
        
            if (num >= 1000000) {
            words += getWords(Math.floor(num / 1000000)) + ' Million ';
            num %= 1000000;
            }
        
            if (num >= 1000) {
            words += getWords(Math.floor(num / 1000)) + ' Thousand ';
            num %= 1000;
            }
        
            if (num >= 100) {
            words += getWords(Math.floor(num / 100)) + ' Hundred ';
            num %= 100;
            }
        
            if (num >= 20) {
            words += tensDigits[Math.floor(num / 10)] + ' ';
            num %= 10;
            }
        
            if (num >= 10) {
            words += teenDigits[num - 10] + ' ';
            num = 0;
            }
        
            if (num > 0) {
            words += singleDigits[num] + ' ';
            }
        
            return words.trim();
        };
        
        const formattedNumber = getWords(number);
        return formattedNumber ? formattedNumber : 'zero';
    };
        
    
    const orderTotal = context.Amount + context.shippingCharges + context.taxEstimation
    const amountInWords = numberToWords(orderTotal);
  return (
    <section
    aria-labelledby="summary-heading"
    className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8"
  >
    <h2 id="summary-heading" className="text-lg font-medium text-gray-900">
      Order summary
    </h2>

    <dl className="mt-6 space-y-4">
      <div className="flex items-center justify-between">
        <dt className="text-sm text-gray-600">Subtotal</dt>
        <dd className="text-sm font-bold text-gray-900 flex items-center"><BiRupee className='font-bold'/>{context.Amount}</dd>
      </div>
      <div className="flex items-center justify-between border-t border-gray-200 pt-4">
        <dt className="flex items-center text-sm text-gray-600">
          <span>Shipping Charges</span>
          <QuestionMarkCircleIcon className="h-5 w-5 ml-2 flex-shrink-0 text-gray-400 hover:text-gray-500" aria-hidden="true" />
        </dt>
        <dd className="text-sm font-bold text-gray-900 flex items-center"><BiRupee className='font-bold'/>{context.shippingCharges}</dd>
      </div>
      <div className="flex items-center justify-between border-t border-gray-200 pt-4">
        <dt className="flex text-sm text-gray-600">
          <span>Tax estimate</span>
          <a href="#" className="ml-2 flex-shrink-0 text-gray-400 hover:text-gray-500">
            <span className="sr-only">Learn more about how tax is calculated</span>
            <QuestionMarkCircleIcon className="h-5 w-5" aria-hidden="true" />
          </a>
        </dt>
        <dd className="text-sm font-bold text-gray-900 flex items-center"><BiRupee className='font-bold'/>{context.taxEstimation}</dd>
      </div>
      <div className="flex items-center justify-between border-t border-gray-200 pt-4">
        <dt className="text-base font-medium text-gray-900">Order total</dt>
        <dd className="text-base font-bold text-gray-900 flex items-center"><BiRupee className='font-bold'/>{orderTotal}</dd>
      </div>
      {amountInWords !== 'zero' ? <div className="flex items-center border-t border-gray-200 pt-4">
      <dt className="text-sm font-medium text-gray-900">**Amount In words:</dt>
      <dd className="text-sm font-medium text-gray-900 flex items-center ml-1">{amountInWords}</dd>
    </div> : ''}
      
    </dl>

    <div className="mt-6">
      <button
        type="button"
        className="w-full rounded-md border border-transparent bg-indigo-600 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
      >
        Checkout
      </button>
    </div>
  </section>
  )
}

export default CartSummary
