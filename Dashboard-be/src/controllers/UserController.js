// const UserService = require('../services/UserService')
// const JwtService = require('../services/JwtService')

// const createUser = async (req, res) => {
//     try {
//         const { name, email, password, confirmPassword, phone, address } = req.body
//         const reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
//         const isCheckEmail = reg.test(email)
//         if (!email || !password || !confirmPassword) {
//             return res.status(200).json({
//                 status: 'ERR',
//                 message: 'The input is required'
//             })
//         } else if (!isCheckEmail) {
//             return res.status(200).json({
//                 status: 'ERR',
//                 message: 'The input is email'
//             })
//         } else if (password !== confirmPassword) {
//             return res.status(200).json({
//                 status: 'ERR',
//                 message: 'The password is equal confirmPassword'
//             })
//         }
//         const response = await UserService.createUser(req.body)
//         return res.status(200).json(response)
//     } catch (e) {
//         return res.status(404).json({
//             message: e
//         })
//     }
// }

// // const loginUser = async (req, res) => {
// //     try {
// //         const { email, password } = req.body
// //         const reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
// //         const isCheckEmail = reg.test(email)
// //         if (!email || !password) {
// //             return res.status(200).json({
// //                 status: 'ERR',
// //                 message: 'The input is required'
// //             })
// //         } else if (!isCheckEmail) {
// //             return res.status(200).json({
// //                 status: 'ERR',
// //                 message: 'The input is email'
// //             })
// //         }
// //         const response = await UserService.loginUser(req.body)
// //         const { refresh_token, ...newReponse } = response
// //         res.cookie('refresh_token', refresh_token, {
// //             httpOnly: true,
// //             secure: false,
// //             sameSite: 'strict',
// //             path: '/',//Phạm vi của cookie
// //         })
// //         return res.status(200).json({...newReponse, refresh_token})
// //     } catch (e) {
// //         return res.status(404).json({
// //             message: e
// //         })
// //     }
// // }
// const loginUser = async (req, res) => {
//     try {
//         const { email, password } = req.body;
//         const emailRegex = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;

//         // Kiểm tra xem các trường nhập có tồn tại không
//         if (!email || !password) {
//             return res.status(400).json({
//                 status: 'ERR',
//                 message: 'Email and password are required'
//             });
//         }

//         // Kiểm tra định dạng email
//         if (!emailRegex.test(email)) {
//             return res.status(400).json({
//                 status: 'ERR',
//                 message: 'Invalid email format'
//             });
//         }

//         // Thực hiện đăng nhập với UserService
//         const response = await UserService.loginUser(req.body);
//         const { refresh_token, ...newResponse } = response;

//         // Đặt refresh_token trong cookie
//         res.cookie('refresh_token', refresh_token, {
//             httpOnly: true,
//             secure: process.env.NODE_ENV === 'production', // Sử dụng HTTPS trong môi trường production
//             sameSite: 'strict',
//             path: '/', // Phạm vi của cookie
//         });

//         return res.status(200).json({ ...newResponse, refresh_token });
//     } catch (error) {
//         return res.status(500).json({
//             status: 'ERR',
//             message: error.message || 'Internal server error',
//         });
//     }
// }


// const deleteUser = async (req, res) => {
//     try {
//         const userId = req.params.id
//         if (!userId) {
//             return res.status(200).json({
//                 status: 'ERR',
//                 message: 'The userId is required'
//             })
//         }
//         const response = await UserService.deleteUser(userId)
//         return res.status(200).json(response)
//     } catch (e) {
//         return res.status(404).json({
//             message: e
//         })
//     }
// }

// const getAllUser = async (req, res) => {
//     try {
//         const response = await UserService.getAllUser()
//         return res.status(200).json(response)
//     } catch (e) {
//         return res.status(404).json({
//             message: e
//         })
//     }
// }

// const getDetailsUser = async (req, res) => {
//     try {
//         const userId = req.params.id
//         if (!userId) {
//             return res.status(200).json({
//                 status: 'ERR',
//                 message: 'The userId is required'
//             })
//         }
//         const response = await UserService.getDetailsUser(userId)
//         return res.status(200).json(response)
//     } catch (e) {
//         return res.status(404).json({
//             message: e
//         })
//     }
// }

// const updateUser = async (req, res) => {
//     try {
//         const userId = req.params.id
//         const data = req.body
//         if (!userId) {
//             return res.status(200).json({
//                 status: 'ERR',
//                 message: 'The userId is required'
//             })
//         }
//         const response = await UserService.updateUser(userId, data)
//         return res.status(200).json(response)
//     } catch (e) {
//         return res.status(404).json({
//             message: e
//         })
//     }
// }



// //Làm mới Access Token từ Refresh Token mà người dùng gửi lên
// //Token hết hạn
// const refreshToken = async (req, res) => { 
//     try {
//         let token = req.headers.token.split(' ')[1]
//         if (!token) {
//             return res.status(200).json({
//                 status: 'ERR',
//                 message: 'The token is required'
//             })
//         }
//         const response = await JwtService.refreshTokenJwtService(token)
//         return res.status(200).json(response)
//     } catch (e) {
//         return res.status(404).json({
//             message: e
//         })
//     }
// }

// // const refreshToken = async (req, res) => {
// //     try {
// //       const token = req.cookies.refresh_token; // Lấy token từ cookie
// //       if (!token) {
// //         return res.status(200).json({
// //           status: 'ERR',
// //           message: 'The token is required'
// //         });
// //       }
// //       const response = await JwtService.refreshTokenJwtService(token); // Xử lý làm mới token
// //       return res.status(200).json(response); // Trả về token mới
// //     } catch (e) {
// //       return res.status(404).json({
// //         message: e.message
// //       });
// //     }
// //   };
  


// const logoutUser = async (req, res) => {
//     try {
//         res.clearCookie('refresh_token')
//         return res.status(200).json({
//             status: 'OK',
//             message: 'Logout successfully'
//         })
//     } catch (e) {
//         return res.status(404).json({
//             message: e
//         })
//     }
// }
// module.exports = {
//     createUser,
//     loginUser,
//     deleteUser,
//     getAllUser,
//     getDetailsUser,
//     refreshToken,
//     logoutUser,
//     updateUser
// }


const UserService = require('../services/UserService')
const JwtService = require('../services/JwtService')

const createUser = async (req, res) => {
    try {
        const { name, email, password, confirmPassword, phone } = req.body
        const reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
        const isCheckEmail = reg.test(email)
        if (!email || !password || !confirmPassword) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The input is required'
            })
        } else if (!isCheckEmail) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The input is email'
            })
        } 
        else if (password !== confirmPassword) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The password is equal confirmPassword'
            })
        }
        const response = await UserService.createUser(req.body)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body
        const reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
        const isCheckEmail = reg.test(email)
        if (!email || !password) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The input is required'
            })
        } else if (!isCheckEmail) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The input is email'
            })
        }
        const response = await UserService.loginUser(req.body)
        const { refresh_token, ...newReponse } = response
        res.cookie('refresh_token', refresh_token, {
            httpOnly: true,
            secure: false,
            sameSite: 'strict',
            path: '/',
        })
        return res.status(200).json({...newReponse, refresh_token})
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const updateUser = async (req, res) => {
    try {
        const userId = req.params.id
        const data = req.body
        if (!userId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The userId is required'
            })
        }
        const response = await UserService.updateUser(userId, data)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const deleteUser = async (req, res) => {
    try {
        const userId = req.params.id
        if (!userId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The userId is required'
            })
        }
        const response = await UserService.deleteUser(userId)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const getAllUser = async (req, res) => {
    try {
        const response = await UserService.getAllUser()
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const getDetailsUser = async (req, res) => {
    try {
        const userId = req.params.id
        if (!userId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The userId is required'
            })
        }
        const response = await UserService.getDetailsUser(userId)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const refreshToken = async (req, res) => {
    try {
        let token = req.headers.token.split(' ')[1]
        if (!token) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The token is required'
            })
        }
        const response = await JwtService.refreshTokenJwtService(token)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}


const logoutUser = async (req, res) => {
    try {
        res.clearCookie('refresh_token')
        return res.status(200).json({
            status: 'OK',
            message: 'Logout successfully'
        })
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}
module.exports = {
    createUser,
    loginUser,
    updateUser,
    deleteUser,
    getAllUser,
    getDetailsUser,
    refreshToken,
    logoutUser
}
