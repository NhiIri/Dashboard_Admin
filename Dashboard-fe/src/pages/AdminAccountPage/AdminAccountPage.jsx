// import { Badge, Popover } from 'antd';
// import React, { useEffect, useState } from 'react';
// import { WrapperContentPopup, WrapperHeader, WrapperHeaderAccout, WrapperTextHeaderSmall } from './style';
// import { UserOutlined, CaretDownOutlined } from '@ant-design/icons';
// import { useNavigate } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import * as UserService from '../../services/UserService';
// import { resetUser } from '../../redux/slides/userSlide';

// const Navbar = ({ isHiddenSearch = false, isHiddenCart = false }) => {
//   const navigate = useNavigate();
//   const user = useSelector((state) => state.user);
//   const dispatch = useDispatch();
//   const [userName, setUserName] = useState('');
//   const [userAvatar, setUserAvatar] = useState('');
//   const [isOpenPopup, setIsOpenPopup] = useState(false);
//   const order = useSelector((state) => state.order);
//   const [loading, setLoading] = useState(false);
  
//   // Debugging user state
//   console.log('User state:', user);

//   const handleNavigateLogin = () => {
//     console.log('Navigating to login');
//     navigate('/sign-in');
//   };

//   const handleLogout = async () => {
//     setLoading(true);
//     console.log('Logging out...');
//     await UserService.logoutUser();
//     dispatch(resetUser());
//     setLoading(false);
//   };

//   const handleClickNavigate = (type) => {
//     console.log('User clicked logout');
//     handleLogout();
//     setIsOpenPopup(false);
//   };

//   useEffect(() => {
//     console.log('Updating user name and avatar');
//     setLoading(true);
//     setUserName(user?.name);
//     setUserAvatar(user?.avatar);
//     setLoading(false);
//   }, [user?.name, user?.avatar]);

//   const content = (
//     <div>
//       <WrapperContentPopup onClick={handleClickNavigate}>Đăng xuất</WrapperContentPopup>
//     </div>
//   );

//   return (
//     <WrapperHeader style={{ justifyContent: isHiddenSearch && isHiddenSearch ? 'space-between' : 'unset' }}>
//       <div span={6} style={{ display: 'flex', gap: '54px', alignItems: 'center' }}>
//         <WrapperHeaderAccout>
//           {userAvatar ? (
//             <img src={userAvatar} alt="avatar" style={{
//               height: '35px',
//               width: '35px',
//               borderRadius: '50%',
//               objectFit: 'cover'
//             }} />
//           ) : (
//             <UserOutlined style={{ fontSize: '25px', color: '#fb6f92', textShadow: '0px 0px 5px #fff', background: '#fff', borderRadius: '50%', padding: '5px' }} />
//           )}
//           {user?.access_token ? (
//             <>
//               <Popover content={content} trigger="click" open={isOpenPopup}>
//                 <div 
//                   style={{ color: "#000000", textShadow: "0px 0px 5px #ffffff0", cursor: 'pointer', maxWidth: 100, overflow: 'hidden', textOverflow: 'ellipsis', fontWeight: 700 }} 
//                   onClick={() => {
//                     console.log('Toggling popup');
//                     setIsOpenPopup((prev) => !prev);
//                   }}
//                 >
//                   {userName?.length ? userName : user?.email}
//                 </div>
//               </Popover>
//             </>
//           ) : (
//             <div onClick={handleNavigateLogin} style={{ cursor: 'pointer' }}>
//               <WrapperTextHeaderSmall>Đăng nhập/Đăng ký</WrapperTextHeaderSmall>
//               <div>
//                 <WrapperTextHeaderSmall>Tài khoản</WrapperTextHeaderSmall>
//                 <CaretDownOutlined />
//               </div>
//             </div>
//           )}
//         </WrapperHeaderAccout>
//       </div>
//     </WrapperHeader>
//   );
// };

// export default Navbar;
import React from 'react'

const AdminAccountPage = () => {
  return (
    <div>AdminAccountPage</div>
  )
}

export default AdminAccountPage