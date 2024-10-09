import { Popover } from 'antd'
import React, { useState, useEffect } from 'react'
import { WrapperContentPopup, WrapperHeader, WrapperHeaderAccout } from './style'
import { UserOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import * as UserService from '../../services/UserService'
import { resetUser } from '../../redux/slides/userSlide'
import { useNavigate } from 'react-router-dom';

const Navbar = ({ isHiddenSearch = false }) => {
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const navigate = useNavigate(); // Khởi tạo hook useNavigate
  const [userName, setUserName] = useState('')
  const [userAvatar, setUserAvatar] = useState('')
  const [isOpenPopup, setIsOpenPopup] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleLogout = async () => {
    setLoading(true)
    await UserService.logoutUser() // Thực hiện việc logout
    dispatch(resetUser()) // Reset lại thông tin người dùng trong redux store
    setLoading(false)
    navigate('/sign-in') // Điều hướng về trang login
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

  const handleClickNavigate = () => {
    handleLogout()
    setIsOpenPopup(false)
  }

  return (
      <WrapperHeader style={{ justifyContent: isHiddenSearch && isHiddenSearch ? 'space-between' : 'unset' }}>    
           <h1></h1>              
            <WrapperHeaderAccout>
              {userAvatar ? (
                <img src={userAvatar} 
                style={{
                  height: '40px',
                  width: '40px',           
                  borderRadius: '50%',
                  objectFit: 'cover'
                }} />
              ) : (
                <UserOutlined 
                style={{ 
                  fontSize: '25px',
                  color: '#708fe5', 
                  textShadow:'0px 0px 5px #fff', 
                  background:'#fff', 
                  borderRadius:'50%', 
                  padding:'5px'
                }} />
              )}
              {user?.access_token ? (
                <>
                  <Popover content={content} trigger="click" open={isOpenPopup}>
                    <div 
                    style={{ 
                      color:"#708fe5",
                      textShadow:" 0px 0px 5px #fffff", 
                      cursor: 'pointer',
                      maxWidth: '300px', 
                      overflow: 'hidden', 
                      textOverflow: 'ellipsis',
                      fontWeight:700 }} 
                    onClick={() => setIsOpenPopup((prev) => !prev)}>{userName?.length ? userName : user?.email}</div>
                  </Popover>
                </>
              ):null}
            </WrapperHeaderAccout>
      </WrapperHeader>
  )
}

export default Navbar
