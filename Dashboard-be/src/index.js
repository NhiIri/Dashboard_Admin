// const express = require("express");
// const dotenv = require('dotenv');
// const mongoose = require("mongoose");
// const routes = require('./routes')
// const cors = require('cors');
// const bodyParser = require('body-parser')
// const cookieParser = require('cookie-parser')
// mongoose.set('strictQuery', true);

// dotenv.config()

// const app = express()
// const port = process.env.PORT || 8000

// app.use(cors())
// app.use(express.json({ limit: '50mb' }));
// app.use(express.urlencoded({ limit: '50mb' }));
// app.use(bodyParser.json({extended: true}))
// app.use(cookieParser())

// routes(app);

// mongoose.connect(`${process.env.MONGO_DB}`)
//     .then(() => {
//      console.log('Connect Db success...')
//     })
//     .catch((err) => {
//     console.log(err)
//     })
// app.listen(port, () => {
//     console.log('Server is running in port ', + port)
// })

//------------------------------------------------------------------------------


const express = require("express");
const dotenv = require('dotenv');
const mongoose = require("mongoose");
const routes = require('./routes')
const cors = require('cors');
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
mongoose.set('strictQuery', true);

dotenv.config()

const app = express()
const port = process.env.PORT || 8000

app.use(cors())
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb' }));
app.use(bodyParser.json({extended: true}))
app.use(cookieParser())

routes(app);

mongoose.connect(`${process.env.MONGO_DB}`)
    .then(() => {
     console.log('Connect Db success...')
    })
    .catch((err) => {
    console.log(err)
    })
app.listen(port, () => {
    console.log('Server is running in port ', + port)
})


/**
 *Tạo một Express.js server phục vụ cho việc xác thực OAuth login với Google.
 */

const axios = require('axios')
const jwt = require('jsonwebtoken')


/**
 * Hàm này thực hiện gửi yêu cầu lấy Google OAuth token dựa trên authorization code nhận được từ client-side.
 * @param {string} code - Authorization code được gửi từ client-side.
 * @returns {Object} - Đối tượng chứa Google OAuth token.
 */
const getOauthGooleToken = async (code) => {
  const body = {
    code,
    client_id: process.env.GOOGLE_CLIENT_ID,
    client_secret: process.env.GOOGLE_CLIENT_SECRET,
    redirect_uri: process.env.GOOGLE_AUTHORIZED_REDIRECT_URI,
    grant_type: 'authorization_code'
  }
  const { data } = await axios.post(
    'https://oauth2.googleapis.com/token',
    body,
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }
  )
  return data
}

/**
 * Hàm này thực hiện gửi yêu cầu lấy thông tin người dùng từ Google dựa trên Google OAuth token.
 * @param {Object} tokens - Đối tượng chứa Google OAuth token.
 * @param {string} tokens.id_token - ID token được lấy từ Google OAuth.
 * @param {string} tokens.access_token - Access token được lấy từ Google OAuth.
 * @returns {Object} - Đối tượng chứa thông tin người dùng từ Google.
 */
const getGoogleUser = async ({ id_token, access_token }) => {
  const { data } = await axios.get(
    'https://www.googleapis.com/oauth2/v1/userinfo',
    {
      params: {
        access_token,
        alt: 'json'
      },
      headers: {
        Authorization: `Bearer ${id_token}`
      }
    }
  )
  return data
}

/**
 * Định nghĩa endpoint '/api/oauth/google' để xử lý quá trình xác thực OAuth với Google.
 * Endpoint này sẽ được gọi từ client-side sau khi người dùng đăng nhập thành công với Google và nhận được authorization code.
 */
app.get('/api/oauth/google', async (req, res, next) => {
  try {
    const { code } = req.query
    const data = await getOauthGooleToken(code) // Gửi authorization code để lấy Google OAuth token
    const { id_token, access_token } = data // Lấy ID token và access token từ kết quả trả về
    const googleUser = await getGoogleUser({ id_token, access_token }) // Gửi Google OAuth token để lấy thông tin người dùng từ Google

    // Kiểm tra email đã được xác minh từ Google
    if (!googleUser.verified_email) {
      return res.status(403).json({
        message: 'Google email not verified'
      })
    }

    // Tạo manual_access_token và manual_refresh_token sử dụng JWT (JSON Web Token)
    const manual_access_token = jwt.sign(
      { email: googleUser.email, type: 'access_token' },
      process.env.ACCESS_TOKEN,
      { expiresIn: '15m' }
    )
    const manual_refresh_token = jwt.sign(
      { email: googleUser.email, type: 'refresh_token' },
      process.env.REFRESH_TOKEN,
      { expiresIn: '100d' }
    )

    // Redirect người dùng về trang login với access token và refresh token
    return res.redirect(
      `http://localhost:3000/login/oauth?access_token=${manual_access_token}&refresh_token=${manual_refresh_token}`
    )
  } catch (error) {
    next(error)
  }
})
