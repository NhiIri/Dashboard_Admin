import React, { Fragment, useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import DefaultComponent from './components/DefaultComponent/DefaultComponent'
import { routes } from './routes'
import { isJsonString } from './utils'
import jwt_decode from "jwt-decode";
import * as UserService from './services/UserService'
import { useDispatch, useSelector } from 'react-redux'
import { resetUser, updateUser } from './redux/slides/userSlide'
import Loading from './components/LoadingComponent/Loading'
import "./App.css";
import PrivateRoute from './routes/PrivateRoute'
import SignInPage from './pages/SignInPage/SignInPage'


function App() {
  const dispatch = useDispatch();//Gửi các action đến Redux store
  const [isLoading, setIsLoading] = useState(false)//Trạng thái Loading
  const user = useSelector((state) => state.user)//Sử dụng useSelector lấy thông tin người dùng từ Redux store

  useEffect(() => {
    setIsLoading(true)
    const { storageData, decoded } = handleDecoded()//Kiểm tra và giải mã token lưu trữ trên trình duyệt
    if (decoded?.id) {//Kiểm tra id người dùng
      handleGetDetailsUser(decoded?.id, storageData)//Id hợp lệ thì lấy thông tin người dùng
    }
    setIsLoading(false)
  }, [])

  const handleDecoded = () => {//Lấy và giải mã token từ LocalStorage
    let storageData = user?.access_token || localStorage.getItem('access_token')
    let decoded = {}
    if (storageData && isJsonString(storageData) && !user?.access_token) {
      storageData = JSON.parse(storageData)
      decoded = jwt_decode(storageData)
    }
    return { decoded, storageData }
  }

  UserService.axiosJWT.interceptors.request.use(async (config) => {
    const currentTime = new Date()
    const { decoded } = handleDecoded()
    let storageRefreshToken = localStorage.getItem('refresh_token')
    const refreshToken = JSON.parse(storageRefreshToken)
    const decodedRefreshToken =  jwt_decode(refreshToken)
    if (decoded?.exp < currentTime.getTime() / 1000) {
      if(decodedRefreshToken?.exp > currentTime.getTime() / 1000) {
        const data = await UserService.refreshToken(refreshToken)
        config.headers['token'] = `Bearer ${data?.access_token}`
      }else {
        dispatch(resetUser())
      }
    }
    return config;
  }, (err) => {
    return Promise.reject(err)
  })

  const handleGetDetailsUser = async (id, token) => {
    let storageRefreshToken = localStorage.getItem('refresh_token')
    const refreshToken = JSON.parse(storageRefreshToken)
    const res = await UserService.getDetailsUser(id, token)
    dispatch(updateUser({ ...res?.data, access_token: token, refreshToken: refreshToken}))
  }

  return (
    <div style={{height: '100%', width: '100%'}}>
      <Loading isLoading={isLoading}>
        <Router>
             <Routes>
              <Route path='sign-in' element = {<SignInPage/>}/>
              {routes.map((route) => {
                const Page = route.page
                const Layout = route.isShowSideMenu ? DefaultComponent : Fragment
                return (
                  <Route key={route.path} path={route.path} element={
                    <PrivateRoute>
                      <Layout>
                      <Page />
                    </Layout>
                    </PrivateRoute>                    
                } />
                )
              })}
            </Routes>     
        </Router>
      </Loading>
    </div>
  )
}

export default App

// import React, { Fragment, useEffect, useState } from 'react'
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
// import DefaultComponent from './components/DefaultComponent/DefaultComponent'
// import { routes } from './routes'
// import { isJsonString } from './utils'
// import jwt_decode from "jwt-decode";
// import * as UserService from './services/UserService'
// import { useDispatch, useSelector } from 'react-redux'
// import { resetUser, updateUser } from './redux/slides/userSlide'
// import Loading from './components/LoadingComponent/Loading'
// import "./App.css";
// import PrivateRoute from './routes/PrivateRoute'
// import SignInPage from './pages/SignInPage/SignInPage'


// function App() {
//   const dispatch = useDispatch();//Gửi các action đến Redux store
//   const [isLoading, setIsLoading] = useState(false)//Trạng thái Loading
//   const user = useSelector((state) => state.user)//Sử dụng useSelector lấy thông tin người dùng từ Redux store

//   useEffect(() => {
//     setIsLoading(true)
//     const { storageData, decoded } = handleDecoded()//Kiểm tra và giải mã token lưu trữ trên trình duyệt
//     if (decoded?.id) {//Kiểm tra id người dùng
//       handleGetDetailsUser(decoded?.id, storageData)//Id hợp lệ thì lấy thông tin người dùng
//     }
//     setIsLoading(false)
//   }, [])

//   const handleDecoded = () => {//Lấy và giải mã token từ LocalStorage
//     let storageData = user?.access_token || localStorage.getItem('access_token')
//     let decoded = {}
//     if (storageData && isJsonString(storageData) && !user?.access_token) {
//       storageData = JSON.parse(storageData)
//       decoded = jwt_decode(storageData)
//     }
//     return { decoded, storageData }
//   }

//   UserService.axiosJWT.interceptors.request.use(async (config) => {
//     const currentTime = new Date()
//     const { decoded } = handleDecoded()
//     let storageRefreshToken = localStorage.getItem('refresh_token')
//     const refreshToken = JSON.parse(storageRefreshToken)
//     const decodedRefreshToken =  jwt_decode(refreshToken)
//     if (decoded?.exp < currentTime.getTime() / 1000) {
//       if(decodedRefreshToken?.exp > currentTime.getTime() / 1000) {
//         const data = await UserService.refreshToken(refreshToken)
//         config.headers['token'] = `Bearer ${data?.access_token}`
//       }else {
//         dispatch(resetUser())
//       }
//     }
//     return config;
//   }, (err) => {
//     return Promise.reject(err)
//   })

//   const handleGetDetailsUser = async (id, token) => {
//     let storageRefreshToken = localStorage.getItem('refresh_token')
//     const refreshToken = JSON.parse(storageRefreshToken)
//     const res = await UserService.getDetailsUser(id, token)
//     dispatch(updateUser({ ...res?.data, access_token: token, refreshToken: refreshToken}))
//   }

//   return (
//     <div style={{height: '100%', width: '100%'}}>
//       <Loading isLoading={isLoading}>
//         <Router>
//              <Routes>
//               {routes.map((route) => {
//                 const Page = route.page
//                 const Layout = route.isShowSideMenu ? DefaultComponent : Fragment
//                 return (
//                   <Route key={route.path} path={route.path} element={
                   
//                       <Layout>
//                       <Page />
//                     </Layout>
                                       
//                 } />
//                 )
//               })}
//             </Routes>     
//         </Router>
//       </Loading>
//     </div>
//   )
// }

// export default App

