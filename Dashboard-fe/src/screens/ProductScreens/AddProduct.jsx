import { Button, Form, Select } from "antd"
import React from "react"
import { WrapperUploadFile } from "../../pages/AdminProductPage/style"
import { useState } from "react"
import InputComponent from "../../components/InputComponent/InputComponent"
import { getBase64 } from "../../utils"
import * as ProductService from "../../services/ProductService"
import * as CategoryService from "../../services/CategoryService"
import { useMutationHooks } from "../../hooks/useMutationHook"
import * as message from "../../components/Message/Message"
import { useQuery } from "@tanstack/react-query"
import ModalComponent from "../../components/ModalComponent/ModalComponent"
import { PlusOutlined } from "@ant-design/icons"

const AddProduct = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  //Khởi tạo dữ liệu ban đầu cho state sản phẩm
  const inittial = () => ({
    name: "",
    price: "",
    description: "",
    image: "",
    category: "",
    countInStock: "",
    discount: "",
  })
  const [stateProduct, setStateProduct] = useState(inittial())
  const [form] = Form.useForm()

  //Dùng useMutationHooks để tạo các hook thao tác với Api
  const mutation = useMutationHooks((data) => {
    const {
      name,
      price,
      description,
      image,
      countInStock,
      discount,
      category,
    } = data
    const res = ProductService.createProduct({
      name,
      price,
      category,
      description,
      image,
      countInStock,
      discount,
    })
    return res
  })

  // async - gọi lấy danh sách sản phẩm
  const getAllProducts = async () => {
    const res = await ProductService.getAllProduct()
    return res
  }

  const queryProduct = useQuery({
    queryKey: ["products"],
    queryFn: getAllProducts,
  })

  const { data: categories, isLoading: isLoadingCategories } = useQuery({
    queryKey: ["categories"],
    queryFn: CategoryService.getAllCategory,
  })

  const handleCancel = () => {
    setIsModalOpen(false)
    setStateProduct({
      name: "",
      price: "",
      category: "",
      description: "",
      image: "",
      countInStock: "",
      discount: "",
    })
    form.resetFields()
  }

  const onFinish = () => {
    const params = {
      name: stateProduct.name,
      price: stateProduct.price,
      category: stateProduct.category,
      description: stateProduct.description,
      image: stateProduct.image,
      countInStock: stateProduct.countInStock,
      discount: stateProduct.discount,
    }

    mutation.mutate(params, {
      onSettled: () => {
        queryProduct.refetch()
      },
      onSuccess: () => {
        message.success("Product added successfully!")
        queryProduct.refetch()
        handleCancel()
      },
      onError: () => {
        message.error("Failed to add product. Please try again.")
      },
    })
  }

  const handleOnchange = (e) => {
    setStateProduct({
      ...stateProduct,
      [e.target.name]: e.target.value,
    })
  }

  //Chuyển đổi hình ảnh thành chuỗi Base64
  const handleOnchangeAvatar = async ({ fileList }) => {
    const file = fileList[0]
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj)
    }
    setStateProduct({
      ...stateProduct,
      image: file.preview,
    })
  }

  return (
    <div>

      {/* Button Add Product */}
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
          Create new product
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

      {/* Modal Add Product */}
      <ModalComponent
        forceRender
        title="Create Product"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          name="basic"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
          onFinish={onFinish}
          autoComplete="on"
          form={form}
        >
          {/* Name */}
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please input name!" }]}
          >
            <InputComponent
              value={stateProduct["name"]}
              onChange={handleOnchange}
              name="name"
            />
          </Form.Item>

          {/* Category */}
          <Form.Item
            name="category"
            label="Category"
            rules={[{ required: true, message: "Please select an category" }]}
          >
            <Select
              placeholder="Please select a category"
              loading={isLoadingCategories}
              onChange={(value) =>
                setStateProduct({ ...stateProduct, category: value })
              }
            >
              {categories?.data?.map((category) => (
                <Select.Option key={category._id} value={category._id}>
                  {category.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          {/* Description */}
          <Form.Item
            label="Description"
            name="description"
            rules={[{ required: true, message: "Please input description!" }]}
          >
            <InputComponent
              value={stateProduct.description}
              onChange={handleOnchange}
              name="description"
            />
          </Form.Item>

          {/* Price */}
          <Form.Item
            label="Price"
            name="price"
            rules={[{ required: true, message: "Please input price!" }]}
          >
            <InputComponent
              value={stateProduct.price}
              onChange={handleOnchange}
              name="price"
            />
          </Form.Item>

          {/* Count inStock */}
          <Form.Item
            label="Count inStock"
            name="countInStock"
            rules={[{ required: true, message: "Please input count inStock!" }]}
          >
            <InputComponent
              value={stateProduct.countInStock}
              onChange={handleOnchange}
              name="countInStock"
            />
          </Form.Item>

          {/* Discount */}
          <Form.Item
            label="Discount"
            name="discount"
            rules={[
              {
                required: true,
                message: "Please input discount of product!",
              },
            ]}
          >
            <InputComponent
              value={stateProduct.discount}
              onChange={handleOnchange}
              name="discount"
            />
          </Form.Item>

          {/* Image */}
          <Form.Item
            label="Image"
            name="image"
            rules={[{ required: true, message: "Please input image!" }]}
          >
            <WrapperUploadFile onChange={handleOnchangeAvatar} maxCount={1}>
              <Button>Select File</Button>
              {stateProduct?.image && (
                <img
                  src={stateProduct?.image}
                  style={{
                    height: "60px",
                    width: "60px",
                    borderRadius: "5px",
                    objectFit: "cover",
                    marginLeft: "10px",
                  }}
                />
              )}
            </WrapperUploadFile>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 20, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </ModalComponent>
    </div>
  )
}

export default AddProduct
