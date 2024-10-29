// import { Button, Form } from "antd"
// import { PlusOutlined } from "@ant-design/icons"
// import React from "react"
// import TableComponent from "../../components/TableComponent/TableComponent"
// import { useState } from "react"
// import InputComponent from "../../components/InputComponent/InputComponent"
// import * as CategoryService from "../../services/CategoryService"
// import { useMutationHooks } from "../../hooks/useMutationHook"
// import Loading from "../../components/LoadingComponent/Loading"
// import { useEffect } from "react"
// import * as message from "../../components/Message/Message"
// import { useQuery } from "@tanstack/react-query"
// import DrawerComponent from "../../components/DrawerComponent/DrawerComponent"
// import { useSelector } from "react-redux"
// import ModalComponent from "../../components/ModalComponent/ModalComponent"

// const AdminCategoryPage = () => {
//   const [isModalOpen, setIsModalOpen] = useState(false)
//   const [rowSelected, setRowSelected] = useState("")
//   const [isOpenDrawer, setIsOpenDrawer] = useState(false)
//   const [isLoadingUpdate, setIsLoadingUpdate] = useState(false)
//   const [isModalOpenDelete, setIsModalOpenDelete] = useState(false)
//   const user = useSelector((state) => state?.user)
//   const inittial = () => ({
//     name: "",
//   })
//   const [stateCategory, setStateCategory] = useState(inittial())
//   const [stateCategoryDetails, setStateCategoryDetails] = useState(inittial())

//   const [form] = Form.useForm()

//   const mutation = useMutationHooks((data) => {
//     const { name } = data
//     const res = CategoryService.createCategory({
//       name,
//     })
//     return res
//   })
//   const mutationUpdate = useMutationHooks((data) => {
//     const { id, token, ...rests } = data
//     const res = CategoryService.updatedCategory(id, token, { ...rests })
//     return res
//   })

//   const mutationDeleted = useMutationHooks((data) => {
//     const { id, token } = data
//     const res = CategoryService.deleteCategory(id, token)
//     return res
//   })

//   const getAllCategories = async () => {
//     const res = await CategoryService.getAllCategory()
//     return res
//   }

//   const fetchGetDetailsCategory = async (rowSelected) => {
//     const res = await CategoryService.getDetailsCategory(rowSelected)
//     if (res?.data) {
//       setStateCategoryDetails({
//         name: res?.data?.name,
//       })
//     }
//     setIsLoadingUpdate(false)
//   }

//   useEffect(() => {
//     if (!isModalOpen) {
//       form.setFieldsValue(stateCategoryDetails)
//     } else {
//       form.setFieldsValue(inittial())
//     }
//   }, [form, stateCategoryDetails, isModalOpen])

//   useEffect(() => {
//     if (rowSelected && isOpenDrawer) {
//       setIsLoadingUpdate(true)
//       fetchGetDetailsCategory(rowSelected)
//     }
//   }, [rowSelected, isOpenDrawer])

//   const handleDetailsCategory = () => {
//     setIsOpenDrawer(true)
//   }

//   const { data, isLoading, isSuccess, isError } = mutation
//   const {
//     data: dataUpdated,
//     isLoading: isLoadingUpdated,
//     isSuccess: isSuccessUpdated,
//     isError: isErrorUpdated,
//   } = mutationUpdate
//   const {
//     data: dataDeleted,
//     isLoading: isLoadingDeleted,
//     isSuccess: isSuccessDelected,
//     isError: isErrorDeleted,
//   } = mutationDeleted

//   const queryCategory = useQuery({
//     queryKey: ["categories"],
//     queryFn: getAllCategories,
//   })
//   const { isLoading: isLoadingCategories, data: categories } = queryCategory
//   const renderAction = () => {
//     return (
//       <div>
//         <Button
//           type="text"
//           style={{ backgroundColor: "#f7e7ff", color: "#aa00ff" }}
//           onClick={handleDetailsCategory}
//         >
//           Update
//         </Button>

//         <Button
//           type="text"
//           style={{
//             backgroundColor: "#ff547f",
//             color: "#faeded",
//             marginLeft: "10px",
//           }}
//           onClick={() => setIsModalOpenDelete(true)}
//         >
//           Delete
//         </Button>
//       </div>
//     )
//   }

//   const columns = [
//     {
//       title: "Name",
//       dataIndex: "name",
//     },
//     {
//       title: "Action",
//       dataIndex: "action",
//       render: renderAction,
//     },
//   ]
//   const dataTable =
//     categories?.data?.length &&
//     categories?.data?.map((category) => {
//       return { ...category, key: category._id }
//     })

//   useEffect(() => {
//     if (isSuccess && data?.status === "OK") {
//       message.success()
//       handleCancel()
//     } else if (isError) {
//       message.error()
//     }
//   }, [isSuccess])

//   useEffect(() => {
//     if (isSuccessDelected && dataDeleted?.status === "OK") {
//       message.success()
//       handleCancelDelete()
//     } else if (isErrorDeleted) {
//       message.error()
//     }
//   }, [isSuccessDelected])

//   const handleCloseDrawer = () => {
//     setIsOpenDrawer(false)
//     setStateCategoryDetails({
//       name: "",
//     })
//     form.resetFields()
//   }

//   useEffect(() => {
//     if (isSuccessUpdated && dataUpdated?.status === "OK") {
//       message.success()
//       handleCloseDrawer()
//     } else if (isErrorUpdated) {
//       message.error()
//     }
//   }, [isSuccessUpdated])

//   const handleCancelDelete = () => {
//     setIsModalOpenDelete(false)
//   }

//   const handleDeleteCategory = () => {
//     mutationDeleted.mutate(
//       { id: rowSelected, token: user?.access_token },
//       {
//         onSettled: () => {
//           queryCategory.refetch()
//           setRowSelected("")
//         },
//       }
//     )
//   }

//   const handleCancel = () => {
//     setIsModalOpen(false)
//     setStateCategory({
//       name: "",
//     })
//     form.resetFields()
//   }

//   const onFinish = () => {
//     const params = {
//       name: stateCategory.name,
//     }
//     mutation.mutate(params, {
//       onSettled: () => {
//         queryCategory.refetch()
//       },
//     })
//   }

//   const handleOnchange = (e) => {
//     setStateCategory({
//       ...stateCategory,
//       [e.target.name]: e.target.value,
//     })
//   }

//   const handleOnchangeDetails = (e) => {
//     setStateCategoryDetails({
//       ...stateCategoryDetails,
//       [e.target.name]: e.target.value,
//     })
//   }

//   const onUpdateCategory = () => {
//     mutationUpdate.mutate(
//       { id: rowSelected, token: user?.access_token, ...stateCategoryDetails },
//       {
//         onSettled: () => {
//           queryCategory.refetch()
//         },
//       }
//     )
//   }

//   return (
//     <div>
//         <div
//           style={{
//             marginTop: "80px",
//             display: "flex",
//             justifyContent: "flex-end",
//             alignItems: "center",
//             gap: "10px",
//             flexDirection: "row",
//           }}
//         >
//           <div style={{ fontSize: "16px", fontWeight: "500" }}>
//             Create new category{" "}
//           </div>
//           <Button
//             style={{
//               height: "50px",
//               width: "50px",
//               borderRadius: "6px",
//               borderStyle: "dashed",
//             }}
//             onClick={() => setIsModalOpen(true)}
//           >
//             <PlusOutlined style={{ fontSize: "20px" }} />
//           </Button>
//         </div>
//         <div style={{ marginTop: "20px" }}>
//           <TableComponent
//             columns={columns}
//             isLoading={isLoadingCategories}
//             dataSource={dataTable}
//             onRow={(record, rowIndex) => {
//               return {
//                 onClick: (event) => {
//                   setRowSelected(record._id)
//                 },
//               }
//             }}
//           />
//         </div>
//         <ModalComponent
//           forceRender
//           title="Create Category"
//           open={isModalOpen}
//           onCancel={handleCancel}
//           footer={null}
//         >
//           <Loading isLoading={isLoading}>
//             <Form
//               name="basic"
//               labelCol={{ span: 6 }}
//               wrapperCol={{ span: 18 }}
//               onFinish={onFinish}
//               autoComplete="on"
//               form={form}
//             >
//               <Form.Item
//                 label="Name"
//                 name="name"
//                 rules={[{ required: true, message: "Please input name!" }]}
//               >
//                 <InputComponent
//                   value={stateCategory["name"]}
//                   onChange={handleOnchange}
//                   name="name"
//                 />
//               </Form.Item>
//               <Form.Item wrapperCol={{ offset: 20, span: 16 }}>
//                 <Button type="primary" htmlType="submit">
//                   Apply
//                 </Button>
//               </Form.Item>
//             </Form>
//           </Loading>
//         </ModalComponent>
//         <DrawerComponent
//           title="Category Details"
//           isOpen={isOpenDrawer}
//           onClose={() => setIsOpenDrawer(false)}
//           width="90%"
//         >
//           <Loading isLoading={isLoadingUpdate || isLoadingUpdated}>
//             <Form
//               name="basic"
//               labelCol={{ span: 2 }}
//               wrapperCol={{ span: 22 }}
//               onFinish={onUpdateCategory}
//               autoComplete="on"
//               form={form}
//             >
//               <Form.Item
//                 label="Name"
//                 name="name"
//                 rules={[{ required: true, message: "Please input name!" }]}
//               >
//                 <InputComponent
//                   value={stateCategoryDetails["name"]}
//                   onChange={handleOnchangeDetails}
//                   name="name"
//                 />
//               </Form.Item>
//               <Form.Item wrapperCol={{ offset: 20, span: 16 }}>
//                 <Button type="primary" htmlType="submit">
//                   Apply
//                 </Button>
//               </Form.Item>
//             </Form>
//           </Loading>
//         </DrawerComponent>
//         <ModalComponent
//           title="Delete Category"
//           open={isModalOpenDelete}
//           onCancel={handleCancelDelete}
//           onOk={handleDeleteCategory}
//         >
//           <Loading isLoading={isLoadingDeleted}>
//             <div>Do you want to delete category?</div>
//           </Loading>
//         </ModalComponent>
//       </div>
//   )
// }

// export default AdminCategoryPage


import React from 'react'
import AddCategory from '../../screens/CategoryScreens/AddCategory'
import AllCategory from '../../screens/CategoryScreens/AllCategory'

const AdminCategoryPage = () => {
  return (
    <div>
      <AddCategory/>
      <AllCategory/>
    </div>
  )
}

export default AdminCategoryPage