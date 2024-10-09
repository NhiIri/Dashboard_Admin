import React, { useState, useEffect } from 'react'
import { WrapperHeader, WrapperHeaderAccout } from './style'
import { UserOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';

const Navbar = ({ isHiddenSearch = false }) => {
  const user = useSelector((state) => state.user)
  const [userName, setUserName] = useState('')
  const [userAvatar, setUserAvatar] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    setUserName(user?.name)
    setUserAvatar(user?.avatar)
    setLoading(false)
  }, [user?.name, user?.avatar])


  return (
      <WrapperHeader style={{ justifyContent: isHiddenSearch && isHiddenSearch ? 'space-between' : 'unset' }}>    
                       
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
                    <div style={{ 
                      color:"#00000099",
                      textShadow:" 0px 0px 5px #fffff", 
                      cursor: 'pointer',
                      maxWidth: '300px', 
                      overflow: 'hidden', 
                      textOverflow: 'ellipsis',
                      fontWeight:700 }}>{userName?.length ? userName : user?.email}</div>                 
                </>
              ):null}
            </WrapperHeaderAccout>
      </WrapperHeader>
  )
}

export default Navbar
