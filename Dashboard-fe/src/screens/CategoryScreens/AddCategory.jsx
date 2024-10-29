import { Button, Form } from "antd"
import { PlusOutlined } from "@ant-design/icons"
import React from "react"
import { useState } from "react"
import InputComponent from "../../components/InputComponent/InputComponent"
import * as CategoryService from "../../services/CategoryService"
import { useMutationHooks } from "../../hooks/useMutationHook"
import Loading from "../../components/LoadingComponent/Loading"
import { useEffect } from "react"
import * as message from "../../components/Message/Message"
import { useQuery } from "@tanstack/react-query"
import { useSelector } from "react-redux"
import ModalComponent from "../../components/ModalComponent/ModalComponent"

const AddCategory = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isModalOpenDelete, setIsModalOpenDelete] = useState(false)
  const user = useSelector((state) => state?.user)
  const inittial = () => ({
    name: "",
  })
  const [stateCategory, setStateCategory] = useState(inittial())

  const [form] = Form.useForm()

  const mutation = useMutationHooks((data) => {
    const { name } = data
    const res = CategoryService.createCategory({
      name,
    })
    return res
  })

  const mutationDeleted = useMutationHooks((data) => {
    const { id, token } = data
    const res = CategoryService.deleteCategory(id, token)
    return res
  })

  const getAllCategories = async () => {
    const res = await CategoryService.getAllCategory()
    return res
  }

  const { data, isLoading, isSuccess, isError } = mutation

  const {
    data: dataDeleted,
    isLoading: isLoadingDeleted,
    isSuccess: isSuccessDelected,
    isError: isErrorDeleted,
  } = mutationDeleted

  const queryCategory = useQuery({
    queryKey: ["categories"],
    queryFn: getAllCategories,
  })

  useEffect(() => {
    if (isSuccess && data?.status === "OK") {
      message.success()
      handleCancel()
    } else if (isError) {
      message.error()
    }
  }, [isSuccess])

  useEffect(() => {
    if (isSuccessDelected && dataDeleted?.status === "OK") {
      message.success()
      handleCancelDelete()
    } else if (isErrorDeleted) {
      message.error()
    }
  }, [isSuccessDelected])

  const handleCancelDelete = () => {
    setIsModalOpenDelete(false)
  }
  const handleCancel = () => {
    setIsModalOpen(false)
    setStateCategory({
      name: "",
    })
    form.resetFields()
  }

  const onFinish = () => {
    const params = {
      name: stateCategory.name,
    }
    mutation.mutate(params, {
      onSettled: () => {
        queryCategory.refetch()
      },
    })
  }

  const handleOnchange = (e) => {
    setStateCategory({
      ...stateCategory,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <div>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            gap: "10px",
            flexDirection: "row",
          }}
        >
          <div style={{ fontSize: "16px", fontWeight: "500" }}>
            Create new category{" "}
          </div>
          <Button
            style={{
              height: "50px",
              width: "50px",
              borderRadius: "6px",
              borderStyle: "dashed",
            }}
            onClick={() => setIsModalOpen(true)}
          >
            <PlusOutlined style={{ fontSize: "20px" }} />
          </Button>
        </div>

        <ModalComponent
          forceRender
          title="Create Category"
          open={isModalOpen}
          onCancel={handleCancel}
          footer={null}
        >
          <Loading isLoading={isLoading}>
            <Form
              name="basic"
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 18 }}
              onFinish={onFinish}
              autoComplete="on"
              form={form}
            >
              <Form.Item
                label="Name"
                name="name"
                rules={[{ required: true, message: "Please input name!" }]}
              >
                <InputComponent
                  value={stateCategory["name"]}
                  onChange={handleOnchange}
                  name="name"
                />
              </Form.Item>
              <Form.Item wrapperCol={{ offset: 20, span: 16 }}>
                <Button type="primary" htmlType="submit">
                  Apply
                </Button>
              </Form.Item>
            </Form>
          </Loading>
        </ModalComponent>

      </div>
  )
}

export default AddCategory
