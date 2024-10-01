import React, { useEffect } from 'react'
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent'
import InputForm from '../../components/InputForm/InputForm'
import { WrapperContainer} from './style'
import { EyeFilled, EyeInvisibleFilled } from '@ant-design/icons'
import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import * as UserService from '../../services/UserService'
import { useMutationHooks } from '../../hooks/useMutationHook'
import Loading from '../../components/LoadingComponent/Loading'
import jwt_decode from "jwt-decode";
import { useDispatch, useSelector } from 'react-redux'
import { updateUser } from '../../redux/slides/userSlide'
import { GoogleLogin } from '@react-oauth/google'

const SignInPage = () => {
  const [isShowPassword, setIsShowPassword] = useState(false)
  const location = useLocation()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const user  = useSelector((state) => state.user)

  const navigate = useNavigate()

  const mutation = useMutationHooks(
    data => UserService.loginUser(data)
  )
  const { data, isLoading, isSuccess } = mutation

  // Sử dụng useEffect để theo dõi trạng thái của mutation sau khi đăng nhập thành công
  useEffect(() => {
    if (isSuccess) {
      // Điều hướng sau khi đăng nhập thành công
      if (location?.state) {
        navigate(location?.state)
      } else {
        navigate('/')
      }

      // Lưu token vào localStorage
      localStorage.setItem('access_token', JSON.stringify(data?.access_token))
      localStorage.setItem('refresh_token', JSON.stringify(data?.refresh_token))

      // Giải mã token và lấy thông tin người dùng
      if (data?.access_token) {
        const decoded = jwt_decode(data?.access_token)
        if (decoded?.id) {
          handleGetDetailsUser(decoded?.id, data?.access_token)
        }
      }
    }
  }, [isSuccess, data, navigate, location])

  // Hàm lấy chi tiết người dùng
  const handleGetDetailsUser = async (id, token) => {
    const storage = localStorage.getItem('refresh_token')
    const refreshToken = JSON.parse(storage)
    const res = await UserService.getDetailsUser(id, token)
    dispatch(updateUser({ ...res?.data, access_token: token, refreshToken }))
  }

  const handleOnchangeEmail = (value) => {
    setEmail(value)
  }

  const handleOnchangePassword = (value) => {
    setPassword(value)
  }

  const handleSignIn = () => {
    // Kiểm tra nếu email và mật khẩu hợp lệ thì mới thực hiện đăng nhập
    if (email && password) {
      mutation.mutate({
        email,
        password
      })
    }
  }

  // const responseMessage = (response) => {
  //   console.log(response);
  // };

  // const errorMessage = (error) => {
  //   console.log(error);
  // };

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center',  background:'#5a5a5a95', height: '100vh' }}>
      <div style={{ width: '70%', height: '80%' ,boxShadow:'0px 0px 10px 6px #0000005d',borderRadius: '6px', background:'#fff', display: 'flex' }}>
        <WrapperContainer>
          <p style={{fontFamily:'Garamond', fontSize:'30px', fontWeight:'600', textAlign:'center',color:'#708fe5'}}>Login</p>
          <InputForm style={{ marginBottom: '15px', fontSize:'17px'}} placeholder="abc@gmail.com" value={email} onChange={handleOnchangeEmail} />
          <div style={{ position: 'relative' }}>
            <span
              onClick={() => setIsShowPassword(!isShowPassword)}
              style={{
                zIndex: 10,
                position: 'absolute',
                top: '4px',
                right: '8px'
              }}
            >
              {isShowPassword ? <EyeFilled /> : <EyeInvisibleFilled />}
            </span>
            <InputForm
              style={{fontSize:'17px'}}
              placeholder="password"
              type={isShowPassword ? "text" : "password"}
              value={password}
              onChange={handleOnchangePassword}
            />
          </div>
          {data?.status === 'ERR' && <span style={{ color: 'red' }}>{data?.message}</span>}
          <Loading isLoading={isLoading}>
            <ButtonComponent
              disabled={!email.length || !password.length}
              onClick={handleSignIn}  // Gọi hàm đăng nhập khi nhấn nút
              size={40}
              styleButton={{
                background: '#708fe5',
                height: '48px',
                width: '100%',
                border: 'none',
                borderRadius: '4px',
                margin: '26px 0 10px'
              }}
              textbutton={'Login'}
              styleTextButton={{ color: '#fff', fontSize: '17px', fontWeight: '700' }}
            />
          </Loading>
        </WrapperContainer>
      </div>
    </div>
  )
}

export default SignInPage
