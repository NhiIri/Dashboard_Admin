import React from 'react';
import { Navigate } from 'react-router-dom';//Điều hướng
import { useSelector } from 'react-redux';

//Nhận vào các thành phần con children - là các component được bảo vệ bởi PrivateRoute
const PrivateRoute = ({ children }) => {
  const user = useSelector((state) => state.user); //useSelector - Hook lấy thông tin người dùng từ Redux Store
  const isAuthenticated = user?.access_token;//Kiểm tra người dùng đã được xác thực hay chưa

  if (!isAuthenticated) {
    return <Navigate to="/sign-in" />; //Chuyển hướng người dùng đến trang đăng nhập
  }

  return children; //Người dùng đã đăng nhập PrivateRoute trả về children
};

export default PrivateRoute;