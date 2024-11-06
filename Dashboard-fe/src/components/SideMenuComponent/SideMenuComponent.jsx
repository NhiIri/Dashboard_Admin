import { Menu } from 'antd'
import {SettingOutlined, UserOutlined, ShoppingCartOutlined, AlignRightOutlined, AppstoreOutlined } from '@ant-design/icons'
import { useLocation, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

const MenuComponent = () => {
    const location = useLocation()
    const [selectedKeys, setSelectedKeys] = useState('/')
    const user = useSelector((state) => state.user)
    const isAdmin = user?.isAdmin

    useEffect(()=>{
        const pathName = location.pathname
        setSelectedKeys(pathName)
    }, [location.pathname])

    const navigate = useNavigate()
    
  return (
    <div>
        <Menu
          theme="dark"
          mode="inline"
          onClick={(items) =>{
            navigate(items.key)
          }}
          selectedKeys={[selectedKeys]}
          items={[
            {
              label: "Dashboard",
              key: "/",
              icon: <AppstoreOutlined />,             
            },
            isAdmin && {
              label: "User",
              key: "/admin-user",
              icon: <UserOutlined />,
            },
            {
              label: "Category",
              key: "/admin-category",
              icon: <AlignRightOutlined />,
            },
            {
              label: "Product",
              key: "/admin-product",
              icon: <ShoppingCartOutlined />,
            },
            {
              label: "Account",
              key: "/admin-account",
              icon: <SettingOutlined />,
            },
          ].filter(Boolean)}
        />
    </div>
  )
}

export default MenuComponent