import React, { useEffect, useState } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { routes } from "./routes"
import { isJsonString } from "./utils"
import jwt_decode from "jwt-decode"
import * as UserService from "./services/UserService"
import { useDispatch, useSelector } from "react-redux"
import { resetUser, updateUser } from "./redux/slides/userSlide"
import PrivateRoute from "./routes/PrivateRoute"
import SignInPage from "./pages/SignInPage/SignInPage"
import DefaultLayout from "./layout/DefaultLayout"

function App() {
  const dispatch = useDispatch() 
  const [isLoading, setIsLoading] = useState(false) 
  const user = useSelector((state) => state.user)


//Kiểm tra người dùng đăng nhập
  useEffect(() => {
    setIsLoading(true)
    const { storageData, decoded } = handleDecoded() 
    if (decoded?.id) {
      handleGetDetailsUser(decoded?.id, storageData)
    }
    setIsLoading(false)
  }, [])

  const handleDecoded = () => {
    let storageData = user?.access_token || localStorage.getItem("access_token")
    let decoded = {}
    if (storageData && isJsonString(storageData) && !user?.access_token) {
      storageData = JSON.parse(storageData)
      decoded = jwt_decode(storageData)
    }
    return { decoded, storageData }
  }


//Cấu hình interceptors để refresh khi token hết hạn
  UserService.axiosJWT.interceptors.request.use(
    async (config) => {
      const currentTime = new Date()
      const { decoded } = handleDecoded()
      let storageRefreshToken = localStorage.getItem("refresh_token")
      const refreshToken = JSON.parse(storageRefreshToken)
      const decodedRefreshToken = jwt_decode(refreshToken)
      if (decoded?.exp < currentTime.getTime() / 1000) {
        if (decodedRefreshToken?.exp > currentTime.getTime() / 1000) {
          const data = await UserService.refreshToken(refreshToken)
          config.headers["token"] = `Bearer ${data?.access_token}`
        } else {
          dispatch(resetUser())
        }
      }
      return config
    },
    (err) => {
      return Promise.reject(err)
    }
  )

  //Lấy chi tiết người dùng
  const handleGetDetailsUser = async (id, token) => {
    let storageRefreshToken = localStorage.getItem("refresh_token")
    const refreshToken = JSON.parse(storageRefreshToken)
    const res = await UserService.getDetailsUser(id, token)
    dispatch(
      updateUser({
        ...res?.data,
        access_token: token,
        refreshToken: refreshToken,
      })
    )
  }

  return (
    <div style={{ height: "100%", width: "100%" }}>
      <BrowserRouter>
        <Routes>
          <Route path="sign-in" element={<SignInPage />} />
          <Route
            path="*"
            element={
              <DefaultLayout>
                <Routes>
                  {routes.map((route) => {
                    const Page = route.page
                    return (
                      <Route
                        key={route.path}
                        path={route.path}
                        element={
                          <PrivateRoute>
                            <Page />
                          </PrivateRoute>
                        }
                      />
                    )
                  })}
                </Routes>
              </DefaultLayout>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
