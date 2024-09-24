import React from 'react'
import {WrapperProducts} from './style'
import { useQuery } from '@tanstack/react-query'
import * as CategoryService from '../../services/CategoryService'
import { useState } from 'react'
import Loading from '../../components/LoadingComponent/Loading'
import { useNavigate } from 'react-router-dom'


const CategoryComponent = () => {
  const [loading] = useState(false)


    const navigate = useNavigate()
    const handleDetailsProduct = (id) => {
        navigate(`/category/${id}`)
    }
  
  const fetchcategoryAll = async (context) => {
    const limit = context?.queryKey && context?.queryKey[1]
    const search = context?.queryKey && context?.queryKey[2]
    const res = await CategoryService.getAllCategory(search, limit)
    return res
  }
  const { isLoading, data: categories} = useQuery(['categories'], fetchcategoryAll)

  return (
    <Loading isLoading={isLoading || loading}>     
          <WrapperProducts>
            {categories?.data?.map((category) => {
              return (
                <div>
                  <img src={category.image} alt="" />
                  <h1>{category.name}</h1>
                </div>
              )
            })}
          </WrapperProducts>
    </Loading>
  )
}

export default CategoryComponent 


// import React from 'react'
// import { StyleNameProduct, WrapperCardStyle, WrapperDiscountText, WrapperPriceText, WrapperReportText, WrapperStyleTextSell } from './style'
// import { useNavigate } from 'react-router-dom'


// const CategoryComponent = (props) => {
//     const {image, name,id } = props
//     const navigate = useNavigate()
//     const handleDetailsCategory = (id) => {
//         navigate(`/category/${id}`)
//     }
//     return (
//         <WrapperCardStyle
//             hoverable
//             headStyle={{ width: '200px', height: '200px' }}
//             style={{ width: 200 }}
//             bodyStyle={{ padding: '10px' }}
//             cover={<img alt="example" src={image} />}
//             onClick={() =>  handleDetailsCategory(id)}
//         >
            
//             <StyleNameProduct>{name}</StyleNameProduct>           
//         </WrapperCardStyle>
//     )
// }

// export default CategoryComponent