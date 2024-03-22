import React from 'react'
import SliderComponent from '../../components/Slider/Slide'
import Footer from '../../components/Footer/Footer'
import TypeProduct from '../../components/TypeProduct/TypeProduct'
import { WrapperButtonMore, WrapperProducts, WrapperTypeProduct } from './style'
import CardComponent from '../../components/CardComponent/CardComponent'
import { useQuery } from '@tanstack/react-query'
import * as ProductService from '../../services/ProductService'
import { useSelector } from 'react-redux'
import { useState } from 'react'
import Loading from '../../components/LoadingComponent/Loading'
import { useDebounce } from '../../hooks/useDebounce'
import { useEffect } from 'react'
import Information from '../../components/information/Information'
import Gallery from '../../components/Gallery/Gallery'
import Flower from '../../components/Flower/Flower'
import slide_image from '../../assets/images/home123.jpg'

const HomePage = () => {
  const searchProduct = useSelector((state) => state?.product?.search)
  const searchDebounce = useDebounce(searchProduct, 500)
  const [loading] = useState(false)
  const [limit, setLimit] = useState(4)
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

  return (
    <Loading isLoading={isLoading || loading}>
      {/* <div style={{ width: '1270px', margin: '0 auto' }}>
        <WrapperTypeProduct>
          {typeProducts.map((item) => {
            return (
              <TypeProduct name={item} key={item}/>
            )
          })}
        </WrapperTypeProduct>
      </div> */}
      <div className='body' style={{ width: '100%', backgroundColor: '#ffffff', }}>
        <div id="container" style={{ height: '80%', width: '90%', margin: '0 auto' }}>   

          <div style={{marginTop:'20px'}}>
            <div style={{display:'flex'}}>
              <SliderComponent/>
              <img src={slide_image} style={{height:'auto', width:'25%', marginLeft:'15px',objectFit:'cover', opacity:'0.7',}} alt="" />
            </div>
            
          </div>
          <div>
            <Information/> 
          </div>
          <div>
            <Flower/>
          </div>

            <div style={{display:'flex', justifyContent:'center'}}>  
            <div>
              <div style={{textAlign:'center'}}><h1>Shop's Products</h1></div>
              <p style={{textAlign:'center',fontSize:'19px',fontFamily:'Times New Roman',fontWeight:'500'}}>Our products are very various</p>
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
            
            </div>
          
          <div style={{ width: '100%', display: 'flex', justifyContent: 'center', margin: '10px 0 20px' }}>
            <WrapperButtonMore
              textbutton={isPreviousData ? 'Load more' : "Xem thêm"} type="outline" styleButton={{
                border: `1px solid ${products?.total === products?.data?.length ? '#f5f5f5' : '#E57098'}`, color: `${products?.total === products?.data?.length ? '#f5f5f5' : '#E57098'}`,
                width: '240px', height: '38px', borderRadius: '4px'
              }}
              disabled={products?.total === products?.data?.length || products?.totalPage === 1}
              styleTextButton={{ fontWeight: 500, color: products?.total === products?.data?.length && '#fff' }}
              onClick={() => setLimit((prev) => prev + 6)}
            />
          </div>   
          <Gallery/>
        </div> 
      </div>
      <div>
      </div>      
      <div>
        <Footer/>       
      </div>
    </Loading>
  )
}

export default HomePage 