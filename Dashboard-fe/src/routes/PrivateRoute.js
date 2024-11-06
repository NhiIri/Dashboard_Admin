import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const PrivateRoute = ({ children }) => { //Nhận vào các thành phần con children
  const user = useSelector((state) => state.user)
  const accessToken = user?.access_token || localStorage.getItem('access_token')//Kiểm tra xác thực người dùng
  
  //Kiểm tra token
  // Nếu không có token, điều hướng tới trang đăng nhập
  if (!accessToken) {
    return <Navigate to="/sign-in" />
  }

  return children
}

export default PrivateRoute