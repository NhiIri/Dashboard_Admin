import {
    AppstoreOutlined,
    AlignRightOutlined,
    ShoppingCartOutlined,
    UserOutlined,
  } from "@ant-design/icons";
  import { Menu } from "antd";
  import { useEffect, useState } from "react";
  import { useLocation, useNavigate } from "react-router-dom";
  
  function SideMenuCpn() {
    const location = useLocation();
    const [selectedKeys, setSelectedKeys] = useState("/");
  
    useEffect(() => {
      const pathName = location.pathname;
      setSelectedKeys(pathName);
    }, [location.pathname]);
  
    const navigate = useNavigate();
    return (
      <div className="SideMenu">
        <Menu
          className="SideMenuVertical"
          mode="vertical"
          style={{ marginRight:'10px' }}
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
            {
              label: "USER",
              key: "/admin-user",
              icon: < UserOutlined />,
            },
            {
              label: "CATEGORY",
              key: "/admin-category",
              icon: <AlignRightOutlined />,
            },
            {
              label: "PRODUCT",
              key: "/admin-product",
              icon: <ShoppingCartOutlined />,
            },
          ]}
        ></Menu>
      </div>
    );
  }
  export default SideMenuCpn;
  