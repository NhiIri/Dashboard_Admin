import React from "react"
import TableComponent from "../../components/TableComponent/TableComponent"
import { useState } from "react"
import { useQueryClient } from "@tanstack/react-query"

const AdminUserPage = () => {
  const [rowSelected, setRowSelected] = useState("") //Lưu trữ ID người dùng

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

  // const dataTable = users?.data?.length > 0 && users?.data?.map((user) => {
  //     return {
  //       ...user,
  //       key: user._id,
  //       isAdmin: user.isAdmin? "TRUE" : "FALSE",
  //     }
  //   })

  const dataTable = users?.data?.length > 0 && users?.data
  .filter((user) => user.isAdmin === false)
  .map((user) => {
    return {
      ...user,
      key: user._id,
      isAdmin: "FALSE",
    }
  })


  return (
    <div>
        <div>
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