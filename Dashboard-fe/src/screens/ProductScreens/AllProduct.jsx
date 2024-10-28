import { Button } from "antd"
import React, { useState, useEffect } from "react"
import TableComponent from "../../components/TableComponent/TableComponent"
import * as ProductService from "../../services/ProductService"
import * as message from "../../components/Message/Message"
import { useMutationHooks } from "../../hooks/useMutationHook"
import { useQuery } from "@tanstack/react-query"
import ModalComponent from "../../components/ModalComponent/ModalComponent"
import { useSelector } from "react-redux"
import UpdateProduct from "./UpdateProduct"

const AllProduct = () => {
  const [rowSelected, setRowSelected] = useState("")
  const [selectedProduct, setSelectedProduct] = useState(null) // State to store selected product details
  const [isModalOpenDelete, setIsModalOpenDelete] = useState(false)
  const [isModalOpenDetail, setIsModalOpenDetail] = useState(false) // State for detail modal
  const user = useSelector((state) => state?.user)

  // API calls and data fetching
  const getAllProducts = async () => {
    const res = await ProductService.getAllProduct()
    return res
  }

  const queryProduct = useQuery({
    queryKey: ["products"],
    queryFn: getAllProducts,
  })

  const { isLoading: isLoadingProducts, data: products } = queryProduct

  // Delete product mutation
  const mutationDeleted = useMutationHooks((data) => {
    const { id, token } = data
    const res = ProductService.deleteProduct(id, token)
    return res
  })

  const {
    data: dataDeleted,
    isSuccess: isSuccessDelected,
    isError: isErrorDeleted,
  } = mutationDeleted

  // Handle delete product confirmation
  const handleDeleteProduct = () => {
    mutationDeleted.mutate(
      { id: rowSelected, token: user?.access_token },
      {
        onSettled: () => {
          queryProduct.refetch()
        },
      }
    )
  }

  const handleCancelDelete = () => {
    setIsModalOpenDelete(false)
  }

  // Handle showing product detail modal
  const handleShowDetail = (product) => {
    setSelectedProduct(product)
    setIsModalOpenDetail(true)
  }

  const handleCancelDetail = () => {
    setIsModalOpenDetail(false)
  }

  // Effect for handling delete success or failure messages
  useEffect(() => {
    if (isSuccessDelected && dataDeleted?.status === "OK") {
      message.success("Product deleted successfully.")
      handleCancelDelete()
    } else if (isErrorDeleted) {
      message.error("Failed to delete product.")
    }
  }, [isSuccessDelected])

  // Action
  const renderAction = (product) => (
    <div style={{ display: "flex" }}>
      {/* <Button
        type="text"
        style={{ backgroundColor: "#f7e7ff", color: "#aa00ff" }}
        onClick={(e) => {
          e.stopPropagation(); // Prevent row click event
          // Thêm logic cập nhật sản phẩm ở đây
        }}
      >
        
      </Button> */}
      <div onClick={(e) =>{e.stopPropagation()}}>
        <UpdateProduct/>
      </div>
      
      

      <Button
        type="text"
        style={{
          backgroundColor: "#ff547f",
          color: "#faeded",
          marginLeft: "10px",
        }}
        onClick={(e) => {
          e.stopPropagation();
          setIsModalOpenDelete(true)
        }}
      >
        Delete
      </Button>
    </div>
  )

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Image",
      dataIndex: "image",
      render: (image) => (
        <img
          src={image}
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
      title: "Category",
      dataIndex: "category",
      render: (category) => category?.name || "No category",
    },
    {
      title: "Description",
      dataIndex: "description",
    },
    {
      title: "Price",
      dataIndex: "price",
    },
    {
      title: "CountInStock",
      dataIndex: "countInStock",
    },
    {
      title: "Discount",
      dataIndex: "discount",
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (_, product) => renderAction(product),
    },
  ]

  const dataTable = products?.data?.length && products?.data?.map((product) => {
      return { ...product, key: product._id }
  })

  return (
    <div>
      {/* Table AllProduct */}
      <div style={{ marginTop: "20px" }}>
        <TableComponent
          columns={columns}
          isLoading={isLoadingProducts}
          dataSource={dataTable}
          scrollHeight={460}
          onRow={(record) => ({
            onClick: () => handleShowDetail(record), // Show detail modal on row click
          })}
        />
      </div>

      {/* Delete Product Modal */}
      <ModalComponent
        title="Delete Product"
        open={isModalOpenDelete}
        onCancel={handleCancelDelete}
        onOk={handleDeleteProduct}
      >
        <div>Do you want to delete this product?</div>
      </ModalComponent>

      {/* Product Detail Modal */}
      <ModalComponent
        title="Product Details"
        open={isModalOpenDetail}
        onCancel={handleCancelDetail}
        footer={null}
      >
        {selectedProduct ? (
          <div>
            <p><strong>Name:</strong> {selectedProduct.name}</p>
            <p><strong>Description:</strong> {selectedProduct.description}</p>
            <p><strong>Category:</strong> {selectedProduct.category?.name || "No category"}</p>
            <p><strong>Price:</strong> ${selectedProduct.price}</p>
            <p><strong>Count in Stock:</strong> {selectedProduct.countInStock}</p>
            <p><strong>Discount:</strong> {selectedProduct.discount}%</p>
            <img
              src={selectedProduct.image}
              alt={selectedProduct.name}
              style={{ width: "100%", borderRadius: "5px" }}
            />
          </div>
        ) : (
          <p>No product selected</p>
        )}
      </ModalComponent>
    </div>
  )
}

export default AllProduct
