import axios from "axios"
import { axiosJWT } from "./UserService"

export const createCategory = async (data) => {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/category/create-category`, data)
    return res.data
}

export const getDetailsCategory = async (id) => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/category/get-details-category/${id}`)
    return res.data
}

export const updatedCategory = async (id, access_token, data) => {
    const res = await axiosJWT.put(`${process.env.REACT_APP_API_URL}/category/update-category/${id}`, data, {
        headers: {
            token: `Bearer ${access_token}`,
        }
    })
    return res.data
}

export const deleteCategory = async (id, access_token) => {
    const res = await axiosJWT.delete(`${process.env.REACT_APP_API_URL}/category/delete-category/${id}`, {
        headers: {
            token: `Bearer ${access_token}`,
        }
    })
    return res.data
}

export const getAllCategory = async (search, limit) => {
    let res = {}
    if (search?.length > 0) {
        res = await axios.get(`${process.env.REACT_APP_API_URL}/category/get-all-category?filter=name&filter=${search}&limit=${limit}`)
    } else {
        res = await axios.get(`${process.env.REACT_APP_API_URL}/category/get-all-category?limit=${limit}`)
    }
    return res.data
}

export const getCategoryProductCount = async() =>{
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/category/category-product-count`)
    return res.data
}