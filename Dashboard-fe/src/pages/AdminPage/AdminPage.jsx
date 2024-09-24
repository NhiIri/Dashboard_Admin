import { Menu } from 'antd'
import React, { useState } from 'react'
import { getItem } from '../../utils';
import { UserOutlined, AppstoreOutlined, AlignRightOutlined } from '@ant-design/icons'
import Navbar from '../../components/Navbar/Navbar';
import AdminUser from '../../components/AdminUser/AdminUser';
import AdminProduct from '../../components/AdminProduct/AdminProduct';
import * as ProductService from '../../services/ProductService'
import * as UserService from '../../services/UserService'
import * as CategoryService from '../../services/CategoryService'
import CustomizedContent from './components/CustomizedContent';
import { useSelector } from 'react-redux';
import { useQueries } from '@tanstack/react-query';
import { useMemo } from 'react';
import AdminCategory from '../../components/AdminCategory/AdminCategory';

const AdminPage = () => {
  const user = useSelector((state) => state?.user)

  const items = [
    getItem('Người dùng', 'users', <UserOutlined />),
    getItem('Sản phẩm', 'products', <AppstoreOutlined />),
    getItem('Thể loại', 'categories', <AlignRightOutlined />),
    
  ];

  const [keySelected, setKeySelected] = useState('');

  const getAllProducts = async () => {
    const res = await ProductService.getAllProduct()
    console.log('res1', res)
    return {data: res?.data, key: 'products'}
  }

  const getAllUsers = async () => {
    const res = await UserService.getAllUser(user?.access_token)
    console.log('res', res)
    return {data: res?.data, key: 'users'}
  }

  const getAllCategories = async () => {
    const res = await CategoryService.getAllCategory()
    console.log('res2', res)
    return {data: res?.data, key: 'categories'}
  }

  const queries = useQueries({
    queries: [
      {queryKey: ['products'], queryFn: getAllProducts, staleTime: 1000 * 60},
      {queryKey: ['users'], queryFn: getAllUsers, staleTime: 1000 * 60},
      {queryKey: ['categories'], queryFn: getAllCategories, staleTime: 1000 * 60},
    ]
  })
  const memoCount = useMemo(() => {
    const result = {}
    try {
      if(queries) {
        queries.forEach((query) => {
          result[query?.data?.key] = query?.data?.data?.length
        })
      }
    return result
    } catch (error) {
      return result
    }
  },[queries])
  const COLORS = {
   users: ['#e66465', '#9198e5'],
   products: ['#a8c0ff', '#3f2b96'],
   categories:['#b446b4', '#195aa4'],
  };

  const renderPage = (key) => {
    switch (key) {
      case 'users':
        return (
          <AdminUser />
        )
        case 'categories':
        return (
          <AdminCategory />
        )
      case 'products':
        return (
          <AdminProduct />
        )

      default:
        return <></>
    }
  }

  const handleOnCLick = ({ key }) => {
    setKeySelected(key)
  }
  console.log('memoCount', memoCount)
  return (
    <>
      <Navbar isHiddenSearch isHiddenCart />
      <div style={{ display: 'flex',overflowX: 'hidden' }}>
        <Menu
          mode="inline"
          style={{
            width: 256,
            boxShadow: '1px 1px 2px #ccc',
            height: '100vh'
          }}
          items={items}
          onClick={handleOnCLick}
        />
        <div style={{ flex: 1, padding: '15px 0 15px 15px' }}>          
            {!keySelected && (
              <CustomizedContent data={memoCount} colors={COLORS} setKeySelected={setKeySelected} />
            )}       
          {renderPage(keySelected)}
        </div>
      </div>
    </>
  )
}

export default AdminPage