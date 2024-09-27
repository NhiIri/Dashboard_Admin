import { Badge,Popover } from 'antd'
import React from 'react'
import { WrapperContentPopup, WrapperHeader, WrapperHeaderAccout, WrapperTextHeaderSmall } from './style'
import {
  UserOutlined,
  CaretDownOutlined,

} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as UserService from '../../services/UserService'
import { resetUser } from '../../redux/slides/userSlide'
import { useState } from 'react';
import { useEffect } from 'react';


const Navbar = ({ isHiddenSearch = false }) => {
  const navigate = useNavigate()
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const [userName, setUserName] = useState('')
  const [userAvatar, setUserAvatar] = useState('')
  const [isOpenPopup, setIsOpenPopup] = useState(false)
  const order = useSelector((state) => state.order)
  const [loading, setLoading] = useState(false)
  const handleNavigateLogin = () => {
    navigate('/sign-in')
  }

  const handleLogout = async () => {
    setLoading(true)
    await UserService.logoutUser()
    dispatch(resetUser())
    setLoading(false)
  }

  useEffect(() => {
    setLoading(true)
    setUserName(user?.name)
    setUserAvatar(user?.avatar)
    setLoading(false)
  }, [user?.name, user?.avatar])

  const content = (
    <div >
      <WrapperContentPopup onClick={() => handleClickNavigate()}>Logout</WrapperContentPopup>
    </div>
  );

  const handleClickNavigate = (type) => {
    
      handleLogout()
    
    setIsOpenPopup(false)
  }



  return (
    
      <WrapperHeader style={{ justifyContent: isHiddenSearch && isHiddenSearch ? 'space-between' : 'unset' }}>          
        <div span={6} style={{ display: 'flex', gap: '54px', alignItems: 'center' }}>
        
            <WrapperHeaderAccout>
              {userAvatar ? (
                <img src={userAvatar} alt="avatar" style={{
                  height: '35px',
                  width: '35px',           
                  borderRadius: '50%',
                  objectFit: 'cover'
                }} />
              ) : (
                <UserOutlined style={{ fontSize: '25px',color: '#708fe5', textShadow:'0px 0px 5px #fff', background:'#fff', borderRadius:'50%', padding:'5px'}} />
              )}
              {user?.access_token ? (
                <>
                  <Popover content={content} trigger="click" open={isOpenPopup}>
                    <div style={{ color:"#708fe5",textShadow:" 0px 0px 5px #ffffff0", cursor: 'pointer',maxWidth: 100, overflow: 'hidden', textOverflow: 'ellipsis',fontWeight:700 }} onClick={() => setIsOpenPopup((prev) => !prev)}>{userName?.length ? userName : user?.email}</div>
                  </Popover>
                </>
              ) : (
                <div onClick={handleNavigateLogin} style={{ cursor: 'pointer' }}>
                  <WrapperTextHeaderSmall>Login</WrapperTextHeaderSmall>
                </div>
              )}
            </WrapperHeaderAccout>
   

        </div>
      </WrapperHeader>
    
  )
}

export default Navbar