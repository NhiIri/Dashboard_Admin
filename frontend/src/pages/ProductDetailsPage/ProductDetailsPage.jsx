import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import ProductDetailsComponent from '../../components/ProductDetailsComponent/ProductDetailsComponent'
import { WrapperProductDetails, WrapperProducts } from './style'
import { useQuery } from '@tanstack/react-query'
import * as ProductService from '../../services/ProductService'
import { useSelector } from 'react-redux'
import { useState } from 'react'
import { useDebounce } from '../../hooks/useDebounce'
import { useEffect } from 'react'
import CardComponent from '../../components/CardComponent/CardComponent'
import Footer from '../../components/Footer/Footer'




const ProductDetailsPage = () => {
  const searchProduct = useSelector((state) => state?.product?.search)
  const searchDebounce = useDebounce(searchProduct, 500)
  const [loading] = useState(false)
  const [limit, setLimit] = useState()
  const [typeProducts, setTypeProducts] = useState([])
  
  const fetchProductAll = async (context) => {
    const limit = context?.queryKey && context?.queryKey[1]
    const search = context?.queryKey && context?.queryKey[2]
    const res = await ProductService.getAllProduct(search, limit)

    return res

  }

  const fetchAllTypeProduct = async () => {
    const res = await ProductService.getAllTypeProduct()
    if(res?.status === 'OK') {
      setTypeProducts(res?.data)
    }
  }

  const { isLoading, data: products, isPreviousData } = useQuery(['products', limit, searchDebounce], fetchProductAll, { retry: 3, retryDelay: 1000, keepPreviousData: true })

  useEffect(() => {
    fetchAllTypeProduct()
  }, [])


  const {id} = useParams()
  const navigate = useNavigate()
  return (
    <div style={{width: '100%',background: '#ffffff', height: '100%'}}>
      <WrapperProductDetails style={{}}>
          <h5 style={{padding:'10px 0px'}}><span style={{cursor: 'pointer', fontWeight: 'bold', fontSize:'20px'}} onClick={() => {navigate('/')}}>Home </span > 
        <span style={{fontSize:'20px'}}>
          - Product Details
        </span>
        </h5>
        </WrapperProductDetails>
      <div style={{ width: '70%', height: '100%', margin: '20px auto'}} > 
        <ProductDetailsComponent idProduct={id} />
      </div>
{/* 
      <div style={{ height: '80%', width: '90%', margin: '0 auto' }}>
        <h2 style={{fontSize:'25px', marginTop:'50px',textDecoration:'underline', fontWeight:'600'}}>Other Products</h2>
        <WrapperProducts>
              {products?.data?.map((product) => {
              return (
                <CardComponent
                  key={product._id}
                  countInStock={product.countInStock}
                  description={product.description}
                  image={product.image}
                  name={product.name}
                  price={product.price}
                  rating={product.rating}
                  type={product.type}
                  selled={product.selled}
                  discount={product.discount}
                  id={product._id}
                />
              )
            })}
            </WrapperProducts>
            
      </div>
      <Footer/> */}
    </div>
  )
}

export default ProductDetailsPage