import { Form } from "antd"
import React from "react"
import TableComponent from "../../components/TableComponent/TableComponent"
import { useEffect } from "react"
import { useState } from "react"
import * as UserService from "../../services/UserService"
import { useQueryClient } from "@tanstack/react-query"

const AdminUserPage = () => {
  const [rowSelected, setRowSelected] = useState("") //Lưu trữ ID người dùng
  const [isOpenDrawer, setIsOpenDrawer] = useState(false) //Mở đóng Drawer

  const [stateUserDetails, setStateUserDetails] = useState({
    //Lưu trữ thông tin người dùng
    name: "",
    email: "",
    phone: "",
    isAdmin: false,
    avatar: "",
    address: "",
  })

  const [form] = Form.useForm()

  const fetchGetDetailsUser = async (rowSelected) => {
    const res = await UserService.getDetailsUser(rowSelected)

    if (res?.data) {
      setStateUserDetails({
        name: res?.data?.name,
        avatar: res?.data?.avatar,
        email: res?.data?.email,
        phone: res?.data?.phone,
        isAdmin: res?.data?.isAdmin,
        address: res?.data?.address,
        avatar: res.data?.avatar,
      })
    }
  }

  useEffect(() => {
    form.setFieldsValue(stateUserDetails)
  }, [form, stateUserDetails])

  useEffect(() => {
    if (rowSelected && isOpenDrawer) {
      fetchGetDetailsUser(rowSelected)
    }
  }, [rowSelected, isOpenDrawer])

  const queryClient = useQueryClient()
  const users = queryClient.getQueryData(["users"])

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Avatar",
      dataIndex: "avatar",
      render: (avatar) => (
        <img
          src={avatar}
          style={{
            height: "60px",
            width: "60px",
            borderRadius: "5px",
            objectFit: "cover",
          }}
        />
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Phone",
      dataIndex: "phone",
    },
    {
      title: "Address",
      dataIndex: "address",
    },
  ]

  const dataTable =
    users?.data?.length > 0 &&
    users?.data?.map((user) => {
      return {
        ...user,
        key: user._id,
        isAdmin: user.isAdmin ? "TRUE" : "FALSE",
      }
    })

  return (
    <div>
        <div style={{ marginTop: "80px" }}>
          <TableComponent
            columns={columns}
            dataSource={dataTable}
            onRow={(record) => {
              return {
                onClick: (event) => {
                  setRowSelected(record._id)
                },
              }
            }}
          />
        </div>
      </div>
  )
}

export default AdminUserPage
