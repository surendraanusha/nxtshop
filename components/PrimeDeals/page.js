/* eslint-disable @next/next/no-img-element */


import { useState ,useEffect,Fragment } from "react"
import ProductCard from "../ProductCard/page"
import Loader from "../Loader/page"
import Cookies from 'js-cookie'
const apiStatusConstants = {
    initial: 'INITIAL',
    success: 'SUCCESS',
    failure: 'FAILURE',
    inProgress: 'IN_PROGRESS',
}

const PrimeDeals = () => {
  const [PrimeProduct,setPrimeProductArray] = useState([])
  const [apiStatus,setApiStatus] = useState(apiStatusConstants.initial)

  useEffect(()=>{
      getPrimeDeals();
  },[])

  const getPrimeDeals = async () => {
    setApiStatus(apiStatusConstants.inProgress)
      const ApiUrl = `https://apis.ccbp.in/prime-deals`
      const jwtToken = Cookies.get('jwtToken')
      // const Token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJhaHVsIiwicm9sZSI6IlBSSU1FX1VTRVIiLCJpYXQiOjE2MjMwNjU1MzJ9.D13s5wN3Oh59aa_qtXMo3Ec4wojOx0EZh8Xr5C5sRkU`
      const options = {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
        method: 'GET',
      }
      const response = await fetch(ApiUrl,options)
      if(response.ok){
        const productData = await response.json()
        setPrimeProductArray(productData.prime_deals)
        setApiStatus(apiStatusConstants.success)
      }
      else{
        setApiStatus(apiStatusConstants.failure)
      }
      
  }

  

function primeDealsSuccesView(){
    return(
        <div className='grid grid-cols-1 md:grid-cols-3 gap-5'>
            {PrimeProduct.map((product) => (
                <ProductCard product={product} key={product.id}/>
            ))}
        </div>
    )
    
}

function renderPrimeDealsFailureView(){
    return <img
      src="https://assets.ccbp.in/frontend/react-js/exclusive-deals-banner-img.png"
      alt="Register Prime"
      className="register-prime-image"
    />
  }

 function primaryDealsFinalView(){
    switch(apiStatus){
      case apiStatusConstants.success:
        return primeDealsSuccesView()
      case apiStatusConstants.failure:
        return renderPrimeDealsFailureView()
      case apiStatusConstants.inProgress:
        return <Loader/>
      default:
        return null
    }
  }


  return (
    <Fragment>
        {primaryDealsFinalView()}
    </Fragment>
  )
}

export default PrimeDeals
