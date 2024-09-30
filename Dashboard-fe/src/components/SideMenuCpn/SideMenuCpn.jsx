// import {
//     AppstoreOutlined,
//     AlignRightOutlined,
//     ShoppingCartOutlined,
//     UserOutlined,
//     SettingOutlined
//   } from "@ant-design/icons";
//   import { Menu } from "antd";
//   import { useEffect, useState } from "react";
//   import { useLocation, useNavigate } from "react-router-dom";
// import Navbar from "../Navbar/Navbar";
  
//   function SideMenuCpn() {
//     const location = useLocation();
//     const [selectedKeys, setSelectedKeys] = useState("/");
  
//     useEffect(() => {
//       const pathName = location.pathname;
//       setSelectedKeys(pathName);
//     }, [location.pathname]);
  
//     const navigate = useNavigate();
//     return (
//       <div className="Menu">
//         <Navbar/>
//         <div className="SideMenu">
//         <Menu
//           className="SideMenuVertical"
//           mode="vertical"
//           style={{ marginRight:'10px' }}
//           onClick={(item) => {
//             navigate(item.key);
//           }}
//           selectedKeys={[selectedKeys]}
//           items={[
//             {
//               label: "DASHBOARD",
//               icon: <AppstoreOutlined />,
//               key: "/",
//             },
//             {
//               label: "USER",
//               key: "/admin-user",
//               icon: < UserOutlined />,
//             },
//             {
//               label: "CATEGORY",
//               key: "/admin-category",
//               icon: <AlignRightOutlined />,
//             },
//             {
//               label: "PRODUCT",
//               key: "/admin-product",
//               icon: <ShoppingCartOutlined />,
//             },
//             {
//               label: "ACCOUNT",
//               key: "/admin-account",
//               icon: <SettingOutlined />,
//             },
//           ]}
//         ></Menu>
//       </div>
//       </div>

//     );
//   }
//   export default SideMenuCpn;
  


import {
  AppstoreOutlined,
  AlignRightOutlined,
  ShoppingCartOutlined,
  UserOutlined,
  SettingOutlined
} from "@ant-design/icons";
import { Menu } from "antd";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Navbar from "../Navbar/Navbar";

function SideMenuCpn() {
  const location = useLocation();
  const [selectedKeys, setSelectedKeys] = useState("/");
  const user = useSelector((state) => state.user);
  const isAdmin = user?.isAdmin;

  useEffect(() => {
      const pathName = location.pathname;
      setSelectedKeys(pathName);
  }, [location.pathname]);

  const navigate = useNavigate();

  return (
      <div className="Menu">
          <Navbar />
          <div className="SideMenu">
              <Menu
                  className="SideMenuVertical"
                  mode="vertical"
                  style={{ marginRight: '10px' }}
                  onClick={(item) => {
                      navigate(item.key);
                  }}
                  selectedKeys={[selectedKeys]}
                  items={[
                      {
                          label: "DASHBOARD",
                          icon: <AppstoreOutlined />,
                          key: "/",
                      },


                      isAdmin && {
                          label: "USER",
                          key: "/admin-user",
                          icon: <UserOutlined />,
                      },


                      {
                          label: "CATEGORY",
                          key: "/admin-category",
                          icon: <AlignRightOutlined />,
                      },

                    
                      isAdmin && {
                          label: "PRODUCT",
                          key: "/admin-product",
                          icon: <ShoppingCartOutlined />,
                      },

  
                     {
                          label: "ACCOUNT",
                          key: "/admin-account",
                          icon: <SettingOutlined />,
                      },
                  ].filter(Boolean)}
              />
          </div>
      </div>
  );
}

export default SideMenuCpn;
