// import {
//   AppstoreOutlined,
//   AlignRightOutlined,
//   ShoppingCartOutlined,
//   UserOutlined,
//   SettingOutlined,
// } from "@ant-design/icons";
// import { Menu } from "antd";
// import { useEffect, useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";

// function SideMenuCpn() {
//   const location = useLocation(); //Đại diện cho URL hiện tại
//   const [selectedKeys, setSelectedKeys] = useState("/"); //Chọn mặc định trang chính
//   const user = useSelector((state) => state.user); //Lấy thông tin người dùng từ Redux
//   const isAdmin = user?.isAdmin; //Kiểm tra người dùng có là admin không

//   useEffect(() => {
//     const pathName = location.pathname; //Khi pathname thay đổi
//     setSelectedKeys(pathName); //setSelectedKeys được gọi để cập nhật lại menu hiện tại
//   }, [location.pathname]);

//   const navigate = useNavigate(); //Chuyển hướng người dùng

//   return (
//     <div className="Menu">
//       {/* <Navbar /> */}
//       <div className="SideMenu">
//         <Menu
//           className="SideMenuVertical"
//           // theme="dark"
//           mode="vertical"
//           style={{
//             position: "fixed",
//             height: "100vh",
//             minWidth: "200px",
//             marginTop: "90px",
//             fontWeight: "500",
//           }}
//           onClick={(item) => {
//             navigate(item.key);
//           }}
//           selectedKeys={[selectedKeys]}
//           items={[
//             {
//               label: "DASHBOARD",
//               key: "/",
//               icon: <AppstoreOutlined />,             
//             },

//             isAdmin && {
//               label: "USER",
//               key: "/admin-user",
//               icon: <UserOutlined />,
//             },

//             {
//               label: "CATEGORY",
//               key: "/admin-category",
//               icon: <AlignRightOutlined />,
//             },

//             isAdmin && {
//               label: "PRODUCT",
//               key: "/admin-product",
//               icon: <ShoppingCartOutlined />,
//             },

//             {
//               label: "ACCOUNT",
//               key: "/admin-account",
//               icon: <SettingOutlined />,
//             },
//           ].filter(Boolean)}
//         />
//       </div>
//     </div>
//   );
// }

// export default SideMenuCpn;


import { Menu } from 'antd'
import {SettingOutlined, UserOutlined, ShoppingCartOutlined, AlignRightOutlined, AppstoreOutlined } from '@ant-design/icons';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const MenuComponent = () => {
    const location = useLocation()
    const [selectedKeys, setSelectedKeys] = useState('/')

    useEffect(()=>{
        const pathName = location.pathname;
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
            {
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