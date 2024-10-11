import { Link } from 'react-router-dom'

/**
 * Hàm này tạo URL để yêu cầu người dùng đăng nhập thông qua Google OAuth
 * @returns {string} URL OAuth Google
 */
const getOauthGoogleUrl = () => {
  // Sử dụng process.env để lấy các biến môi trường
  const { REACT_APP_GG_CLIENT_ID, REACT_APP_GG_AUTHORIZED_REDIRECT_URI } = process.env
  const rootUrl = 'https://accounts.google.com/o/oauth2/v2/auth'
  const options = {
    redirect_uri: REACT_APP_GG_AUTHORIZED_REDIRECT_URI,
    client_id: REACT_APP_GG_CLIENT_ID,
    access_type: 'offline',
    response_type: 'code',
    prompt: 'consent',
    scope: [
      'https://www.googleapis.com/auth/userinfo.profile',
      'https://www.googleapis.com/auth/userinfo.email'
    ].join(' ')
  }
  const qs = new URLSearchParams(options)
  return `${rootUrl}?${qs.toString()}`
}

function Home() {
  // Kiểm tra xem người dùng đã xác thực hay chưa
  const isAuthenticated = Boolean(localStorage.getItem('access_token'))
  // Lấy URL để thực hiện OAuth với Google
  const oauthURL = getOauthGoogleUrl()

  // Hàm logout xóa các token từ localStorage
  const logout = () => {
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
    window.location.reload()
  }

  return (
    <div>
      {/* {isAuthenticated ? (
        <div>
          <button onClick={logout}>Click để logout</button>
        </div>
      ) : ( */}
        <Link to={oauthURL}>Login with Google</Link>
      {/* )} */}
    </div>
  )
}

export default Home
