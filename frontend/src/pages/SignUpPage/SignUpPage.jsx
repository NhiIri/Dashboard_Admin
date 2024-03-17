import React from 'react'
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent'
import InputForm from '../../components/InputForm/InputForm'
import { WrapperContainerLeft, WrapperContainerRight, WrapperTextLight } from './style'
import imageLogo from '../../assets/images/signup.jpg'
import { Image } from 'antd'
import { useState } from 'react'
import { EyeFilled, EyeInvisibleFilled } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import * as UserService from '../../services/UserService'
import { useMutationHooks } from '../../hooks/useMutationHook'
import Loading from '../../components/LoadingComponent/Loading'
import * as message from '../../components/Message/Message'
import { useEffect } from 'react'

const SignUpPage = () => {
  const navigate = useNavigate()

  const [isShowPassword, setIsShowPassword] = useState(false)
  const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(false)
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleOnchangeEmail = (value) => {
    setEmail(value)
  }

  const mutation = useMutationHooks(
    data => UserService.signupUser(data)
  )

  const { data, isLoading, isSuccess, isError } = mutation

  useEffect(() => {
    if (isSuccess) {
      message.success()
      handleNavigateSignIn()
    } else if (isError) {
      message.error()
    }
  }, [isSuccess, isError])

  const handleOnchangePassword = (value) => {
    setPassword(value)
  }

  const handleOnchangeConfirmPassword = (value) => {
    setConfirmPassword(value)
  }

  const handleNavigateSignIn = () => {
    navigate('/sign-in')
  }

  const handleSignUp = () => {
    mutation.mutate({ email, password, confirmPassword })
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center',  background:'#5a5a5a95', height: '100vh' }}>
      <div style={{ width: '70%', height: '80%' ,border: '4px solid #E57098',boxShadow:'0px 0px 10px 6px #0000005d',borderRadius: '6px', background:'#fff', display: 'flex' }}>
        <WrapperContainerLeft>
          <h1 style={{fontFamily:'Garamond', fontSize:'40px', fontWeight:'700', borderBottom:'3px dashed #E57098',textAlign:'center'}}>Welcome to WindyIris!!!</h1>
          <p style={{fontFamily:'Garamond', fontSize:'30px', fontWeight:'600', textAlign:'center', color:'#E57098'}}>Signup</p>
          <InputForm style={{ marginBottom: '10px',fontSize:'17px' }} placeholder="abc@gmail.com" value={email} onChange={handleOnchangeEmail} />
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
            <InputForm placeholder="password" style={{ marginBottom: '10px',fontSize:'17px' }} type={isShowPassword ? "text" : "password"}
              value={password} onChange={handleOnchangePassword} />
          </div>
          <div style={{ position: 'relative' }}>
            <span
              onClick={() => setIsShowConfirmPassword(!isShowConfirmPassword)}
              style={{
                zIndex: 10,
                position: 'absolute',
                top: '4px',
                right: '8px'
              }}
            >{
                isShowConfirmPassword ? (
                  <EyeFilled />
                ) : (
                  <EyeInvisibleFilled />
                )
              }
            </span>
            <InputForm status={{fontSize:'17px'}} placeholder="comfirm password" type={isShowConfirmPassword ? "text" : "password"}
              value={confirmPassword} onChange={handleOnchangeConfirmPassword}
            />
          </div>
          {data?.status === 'ERR' && <span style={{ color: 'red' }}>{data?.message}</span>}
          <Loading isLoading={isLoading}>
            <ButtonComponent
              disabled={!email.length || !password.length || !confirmPassword.length}
              onClick={handleSignUp}
              size={40}
              styleButton={{
                background: '#E57098',
                height: '48px',
                width: '100%',
                border: 'none',
                borderRadius: '4px',
                margin: '26px 0 10px'
              }}
              textbutton={'Signup'}
              styleTextButton={{ color: '#fff', fontSize: '17px', fontWeight: '700' }}
            ></ButtonComponent>
          </Loading>
          <p>Already have an account? <WrapperTextLight onClick={handleNavigateSignIn}>Login</WrapperTextLight></p>
        </WrapperContainerLeft>
        <WrapperContainerRight>
          <Image src={imageLogo} preview={false} alt="iamge-logo" height="98%" width="98%" />
        </WrapperContainerRight>
      </div>
    </div >
  )
}

export default SignUpPage