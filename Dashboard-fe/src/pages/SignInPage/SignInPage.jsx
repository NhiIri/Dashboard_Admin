import React, { useEffect } from 'react'
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent'
import InputForm from '../../components/InputForm/InputForm'
import { WrapperContainerLeft, WrapperContainerRight, WrapperTextLight } from './style'
import imageLogo from '../../assets/images/signin.jpg'
import { Image } from 'antd'
import { EyeFilled, EyeInvisibleFilled } from '@ant-design/icons'
import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import * as UserService from '../../services/UserService'
import { useMutationHooks } from '../../hooks/useMutationHook'
import Loading from '../../components/LoadingComponent/Loading'
import jwt_decode from "jwt-decode";
import { useDispatch, useSelector } from 'react-redux'
import { updateUser } from '../../redux/slides/userSlide'

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

  useEffect(() => {
    if (isSuccess) {
      if(location?.state) {
        navigate(location?.state)
      }else {
        navigate('/')
      }
      localStorage.setItem('access_token', JSON.stringify(data?.access_token))
      localStorage.setItem('refresh_token', JSON.stringify(data?.refresh_token))
      if (data?.access_token) {
        const decoded = jwt_decode(data?.access_token)
        if (decoded?.id) {
          handleGetDetailsUser(decoded?.id, data?.access_token)
        }
      }
    }
  }, [isSuccess])

  const handleGetDetailsUser = async (id, token) => {
    const storage = localStorage.getItem('refresh_token')
    const refreshToken = JSON.parse(storage)
    const res = await UserService.getDetailsUser(id, token)
    dispatch(updateUser({ ...res?.data, access_token: token,refreshToken }))
  }


  const handleNavigateSignUp = () => {
    navigate('/sign-up')
  }

  const handleOnchangeEmail = (value) => {
    setEmail(value)
  }

  const handleOnchangePassword = (value) => {
    setPassword(value)
  }

  const handleSignIn = () => {
    console.log('logingloin')
    mutation.mutate({
      email,
      password
    })
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center',  background:'#5a5a5a95', height: '100vh' }}>
      <div style={{ width: '70%', height: '80%' ,border: '4px solid #E57098',boxShadow:'0px 0px 10px 6px #0000005d',borderRadius: '6px', background:'#fff', display: 'flex' }}>
        <WrapperContainerLeft>
          <h1 style={{fontFamily:'Garamond', fontSize:'40px', fontWeight:'700', borderBottom:'3px dashed #E57098',textAlign:'center'}}>Welcome to WindyIris!!!</h1>
          <p style={{fontFamily:'Garamond', fontSize:'30px', fontWeight:'600', textAlign:'center',color:'#E57098'}}>Login</p>
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
            >{
                isShowPassword ? (
                  <EyeFilled />
                ) : (
                  <EyeInvisibleFilled />
                )
              }
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
              onClick={handleSignIn}
              size={40}
              styleButton={{
                background: '#E57098',
                height: '48px',
                width: '100%',
                border: 'none',
                borderRadius: '4px',
                margin: '26px 0 10px'
              }}
              textbutton={'Login'}
              styleTextButton={{ color: '#fff', fontSize: '17px', fontWeight: '700' }}
            ></ButtonComponent>
          </Loading>
          <p><WrapperTextLight>Forgot password?</WrapperTextLight></p>
          <p>Don't have an account? <WrapperTextLight onClick={handleNavigateSignUp}> Signup</WrapperTextLight></p>
        </WrapperContainerLeft>
        <WrapperContainerRight>
          <Image src={imageLogo} preview={false} alt="iamge-logo" height="98%" width="98%" />        
        </WrapperContainerRight>
      </div>
    </div >
  )
}

export default SignInPage