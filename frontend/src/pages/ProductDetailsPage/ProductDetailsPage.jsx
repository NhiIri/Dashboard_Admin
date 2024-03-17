import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import ProductDetailsComponent from '../../components/ProductDetailsComponent/ProductDetailsComponent'

const ProductDetailsPage = () => {
  const {id} = useParams()
  const navigate = useNavigate()
  return (
    <div style={{width: '100%',background: '#efefef', height: '100%'}}>
      <div style={{ width: '70%', height: '100%', margin: '0 auto'}} >
        <h5 style={{padding:'10px 0px'}}><span style={{cursor: 'pointer', fontWeight: 'bold', fontSize:'20px'}} onClick={() => {navigate('/')}}>Home </span > 
        <span style={{fontSize:'20px'}}>
          - Product Details
        </span>
        </h5>
        <ProductDetailsComponent idProduct={id} />
      </div>
    </div>
  )
}

export default ProductDetailsPage