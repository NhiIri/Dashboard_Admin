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

  const dataTable = users?.data?.length > 0 && users?.data?.map((user) => {
      return {
        ...user,
        key: user._id,
        isAdmin: user.isAdmin ? "TRUE" : "FALSE",
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

// import React, { useState } from "react"
// import TableComponent from "../../components/TableComponent/TableComponent"
// import { useQuery } from "@tanstack/react-query"
// import * as UserService from "../../services/UserService"

// const AdminUserPage = () => {
//   const [rowSelected, setRowSelected] = useState("") // Lưu trữ ID người dùng

//   const getAllUsers = async () => {
//     const res = await UserService.getAllUser()
//     return res
//   }

//   const { data: users = [], isLoading, error } = useQuery({
//     queryKey: ["users"],
//     queryFn: getAllUsers,
//   })

//   const columns = [
//     {
//       title: "Name",
//       dataIndex: "name",
//     },
//     {
//       title: "Avatar",
//       dataIndex: "avatar",
//       render: (avatar) => (
//         <img
//           src={avatar}
//           alt="Avatar"
//           style={{
//             height: "60px",
//             width: "60px",
//             borderRadius: "5px",
//             objectFit: "cover",
//           }}
//         />
//       ),
//     },
//     {
//       title: "Email",
//       dataIndex: "email",
//     },
//     {
//       title: "Phone",
//       dataIndex: "phone",
//     },
//     {
//       title: "Address",
//       dataIndex: "address",
//     },
//     {
//       title: "Is Admin",
//       dataIndex: "isAdmin",
//       render: (isAdmin) => (isAdmin ? "TRUE" : "FALSE"),
//     },
//   ]

//   // Tạo dữ liệu cho bảng
//   const dataTable =
//     users.length > 0
//       ? users.map((user) => ({
//           ...user,
//           key: user._id,
//         }))
//       : []

//   if (isLoading) return <p>Loading...</p>
//   if (error) return <p>Error loading users</p>

//   return (
//     <div>
//       <TableComponent
//         columns={columns}
//         dataSource={dataTable}
//         onRow={(record) => ({
//           onClick: () => {
//             setRowSelected(record._id)
//           },
//         })}
//       />
//     </div>
//   )
// }

// export default AdminUserPage