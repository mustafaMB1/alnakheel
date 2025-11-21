import React from 'react'
import CategoriesSlider from '../component/catSlider'
import ProductListing from '../component/productListine'

export default function Products() {
  return (
    <div className='mt-[103px] md:mt-[163px]'>
        <CategoriesSlider/>
        <ProductListing/>
    </div>
  )
}
