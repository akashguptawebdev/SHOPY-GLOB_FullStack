import React from 'react'
import { useParams } from 'react-router-dom'
import FilteredProduct from '../Components/FilteredProduct'
import { useSelector } from 'react-redux'
import Loading from '../Components/Loading'

const CategoryProductPage = () => {
    const products = useSelector((store) => store.Product.products);
    const {catName} = useParams()
    if (!products) {
      return <div className="flex justify-center items-center h-screen w-full"><Loading /></div>;
    }
  return (
    <div className=''>
        <FilteredProduct products={products} params={catName}/>
    </div>
  )
}

export default CategoryProductPage