import React, { useEffect, useState } from 'react'
import { EyeFilled, EyeInvisibleFilled } from '@ant-design/icons'
import { useLocation, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import jwt_decode from 'jwt-decode'
import { GoogleLogin } from '@react-oauth/google'
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent'
import InputForm from '../../components/InputForm/InputForm'
import Loading from '../../components/LoadingComponent/Loading'
import { WrapperContainer } from './style'
import * as UserService from '../../services/UserService'
import { useMutationHooks } from '../../hooks/useMutationHook'
import { updateUser } from '../../redux/slides/userSlide'
import Home from '../../components/GoogleLoginComponent/Home'


const SignInPage = () => {


  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [loadingPage, setLoadingPage] = useState(true); // Thêm state để quản lý trạng thái load trang

  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const mutation = useMutationHooks(data => UserService.loginUser(data));
  const { data, isLoading, isSuccess } = mutation;

  // Kiểm tra access token khi load trang
  useEffect(() => {
    const accessToken = localStorage.getItem('access_token');
    
  //   if (accessToken) {
  //     const token = JSON.parse(accessToken);
  //     const decoded = jwt_decode(token);

  //     // Kiểm tra token có hết hạn hay không
  //     if (decoded?.exp * 1000 > Date.now()) {
  //       // Token còn hiệu lực, lấy thông tin người dùng
  //       handleGetDetailsUser(decoded.id, token);
  //     } else {
  //       // Token hết hạn, cần login lại
  //       localStorage.removeItem('access_token');
  //       localStorage.removeItem('refresh_token');
  //     }
  //   }

  //   setLoadingPage(false); // Đã kiểm tra xong, kết thúc trạng thái loading
  // }, []);
  if (accessToken) {
    try {
      // const token = JSON.parse(accessToken);
      const decoded = jwt_decode(accessToken);

      // Kiểm tra token có hết hạn hay không
      if (decoded?.exp * 1000 > Date.now()) {
        handleGetDetailsUser(decoded.id, accessToken);
      } else {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
      }
    } catch (error) {
      console.error("Lỗi khi parse accessToken:", error);
    }
  }

  setLoadingPage(false);
}, []);

  

  useEffect(() => {
    if (isSuccess) {
      navigate(location?.state || '/');

      // Lưu token vào localStorage
      localStorage.setItem('access_token', JSON.stringify(data?.access_token));
      localStorage.setItem('refresh_token', JSON.stringify(data?.refresh_token));

      if (data?.access_token) {
        const decoded = jwt_decode(data.access_token);
        if (decoded?.id) {
          handleGetDetailsUser(decoded.id, data.access_token);
        }
      }
    }
  }, [isSuccess, data, navigate, location]);

  // Lấy chi tiết người dùng
  const handleGetDetailsUser = async (id, token) => {
    const refreshToken = JSON.parse(localStorage.getItem('refresh_token'));
    const res = await UserService.getDetailsUser(id, token);
    dispatch(updateUser({ ...res?.data, access_token: token, refreshToken }));
  }

  const handleOnChangeEmail = (value) => setEmail(value);
  const handleOnChangePassword = (value) => setPassword(value);

  const handleSignIn = () => {
    if (email && password) {
      mutation.mutate({ email, password });
    }
  }

  // Xử lý khi đăng nhập với Google
  // const handleGoogleLogin = (googleData) => {
  //   const userData = jwt_decode(googleData);
  //   console.log(userData);
  // }

  // const handleError = () => {
  //   alert('Login failed');
  // }

  if (loadingPage) {
    // Hiển thị màn hình loading khi đang kiểm tra trạng thái đăng nhập
    return <Loading isLoading={true} />;
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#5a5a5a95', height: '100vh' }}>
      <div style={{ width: '500px', height: '400px', boxShadow: '0px 0px 10px 6px #0000005d', borderRadius: '6px', background: '#fff', display: 'flex' }}>
        <WrapperContainer>
          <p style={{ fontFamily: 'Garamond', fontSize: '30px', fontWeight: '600', textAlign: 'center', color: '#708fe5' }}>Login</p>
          
          <InputForm 
            style={{ marginBottom: '15px', fontSize: '17px' }} 
            placeholder="abc@gmail.com" 
            value={email} 
            onChange={handleOnChangeEmail} 
          />
          
          <div style={{ position: 'relative' }}>
            <span
              onClick={() => setIsShowPassword(!isShowPassword)}
              style={{
                zIndex: 10,
                position: 'absolute',
                top: '4px',
                right: '8px',
              }}
            >
              {isShowPassword ? <EyeFilled /> : <EyeInvisibleFilled />}
            </span>
            <InputForm
              style={{ fontSize: '17px' }}
              placeholder="password"
              type={isShowPassword ? 'text' : 'password'}
              value={password}
              onChange={handleOnChangePassword}
            />
          </div>
          
          {data?.status === 'ERR' && <span style={{ color: 'red' }}>{data?.message}</span>}
          
          <Loading isLoading={isLoading}>
            <ButtonComponent
              disabled={!email.length || !password.length}
              onClick={handleSignIn}
              size={40}
              styleButton={{
                background: '#708fe5',
                height: '48px',
                width: '100%',
                border: 'none',
                borderRadius: '4px',
                margin: '26px 0 10px',
              }}
              textbutton={'Login'}
              styleTextButton={{ color: '#fff', fontSize: '17px', fontWeight: '700' }}
            />
          </Loading>

          {/* <GoogleLogin
            onSuccess={(credentialResponse) => handleGoogleLogin(credentialResponse.credential)}
            onError={handleError}
          /> */}
          <Home/>
          

          
        </WrapperContainer>
      </div>
    </div>
  )
}

export default SignInPage;



