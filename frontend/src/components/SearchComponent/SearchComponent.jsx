import { Col} from 'antd'
import React, { useState } from 'react'
import { WrapperHeader,WrapperTextHeader } from './style'
import ButttonInputSearch from '../ButtonInputSearch/ButttonInputSearch';
import { searchProduct } from '../../redux/slides/productSlide';
import { useDispatch } from 'react-redux';

const SearchComponent = ({ isHiddenSearch = false}) => {
  const dispatch = useDispatch()
  const [search,setSearch] = useState('')

  const onSearch = (e) => {
    setSearch(e.target.value)
    dispatch(searchProduct(e.target.value))
  }

  return (
    <div style={{  heiht: '100%', width: '100%', display: 'flex', justifyContent: 'center' }}>
      <WrapperHeader style={{ justifyContent: isHiddenSearch && isHiddenSearch ? 'space-between' : 'unset' }}>
        <Col span={6}>
          <WrapperTextHeader to='/'></WrapperTextHeader>
        </Col>
        {!isHiddenSearch && (
          <Col span={10}>
            <ButttonInputSearch
              size="large"
              bordered={false}
              textbutton="Tìm kiếm"
              placeholder="Nhập tên sản phẩm"
              onChange={onSearch}
              backgroundColorButton="#E57098"
            />
          </Col>
        )}
        <Col span={6} style={{ display: 'flex', gap: '54px', alignItems: 'center' }}></Col>
      </WrapperHeader>
    </div>
  )
}

export default SearchComponent