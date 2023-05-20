"use client"
import { useState,useEffect } from 'react'
// import { useRouter } from 'next/router'

const ProductDetails = (data) => {
    const [productObj,setProductObj] = useState({})
    // const router = useRouter();
    console.log("hello", data)

  return (
    <div>
      <p>hello poroduct details view</p>
    </div>
  )
}



export default ProductDetails;

export async function getServerSideProps(context) {
    const {params} = context
    const id = params.id
    // Fetch data from external API
    const Token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJhaHVsIiwicm9sZSI6IlBSSU1FX1VTRVIiLCJpYXQiOjE2MjMwNjU1MzJ9.D13s5wN3Oh59aa_qtXMo3Ec4wojOx0EZh8Xr5C5sRkU`
    const options = {
        headers: {
          Authorization: `Bearer ${Token}`,
        },
        method: 'GET',
      }
    const res = await fetch(`https://apis.ccbp.in/products/${id}`,options);
    const data = await res.json();
    console.log(data)
    // Pass data to the page via props
    return { props: { data } };
  }