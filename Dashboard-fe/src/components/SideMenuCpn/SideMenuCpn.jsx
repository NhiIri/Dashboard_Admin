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
  const location = useLocation();//Đại diện cho URL hiện tại
  const [selectedKeys, setSelectedKeys] = useState("/");//Chọn mặc định trang chính
  const user = useSelector((state) => state.user);//Lấy thông tin người dùng từ Redux
  const isAdmin = user?.isAdmin;//Kiểm tra người dùng có là admin không

  useEffect(() => {
      const pathName = location.pathname;//Khi pathname thay đổi
      setSelectedKeys(pathName);//setSelectedKeys được gọi để cập nhật lại menu hiện tại
  }, [location.pathname]);

  const navigate = useNavigate();//Chuyển hướng người dùng

  return (
      <div className="Menu">
          {/* <Navbar /> */}
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
