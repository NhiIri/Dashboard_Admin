import { Button, Form, Select } from "antd";
import React from "react";
import { WrapperUploadFile } from "./style";
import TableComponent from "../../components/TableComponent/TableComponent";
import { useState } from "react";
import InputComponent from "../../components/InputComponent/InputComponent";
import { getBase64 } from "../../utils";
import * as ProductService from "../../services/ProductService";
import * as CategoryService from "../../services/CategoryService";
import { useMutationHooks } from "../../hooks/useMutationHook";
import Loading from "../../components/LoadingComponent/Loading";
import { useEffect } from "react";
import * as message from "../../components/Message/Message";
import { useQuery } from "@tanstack/react-query";
import DrawerComponent from "../../components/DrawerComponent/DrawerComponent";
import { useSelector } from "react-redux";
import ModalComponent from "../../components/ModalComponent/ModalComponent";

const AllProduct = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rowSelected, setRowSelected] = useState("");
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);
  const [isLoadingUpdate, setIsLoadingUpdate] = useState(false);
  const [isModalOpenDelete, setIsModalOpenDelete] = useState(false);
  const user = useSelector((state) => state?.user);
  const [isModalOpenDetails, setIsModalOpenDetails] = useState(false);

  //Khởi tạo dữ liệu ban đầu cho state sản phẩm
  const inittial = () => ({
    name: "",
    price: "",
    description: "",
    image: "",
    category: "",
    countInStock: "",
    discount: "",
  });
  const [stateProduct, setStateProduct] = useState(inittial());
  const [stateProductDetails, setStateProductDetails] = useState(inittial());

  const [form] = Form.useForm();

  //Dùng useMutationHooks để tạo các hook thao tác với Api
  //Gọi Api để cập nhật sản phẩm
  const mutation = useMutationHooks((data) => {
    const {
      name,
      price,
      description,
      image,
      countInStock,
      discount,
      category,
    } = data;
    const res = ProductService.createProduct({
      name,
      price,
      category,
      description,
      image,
      countInStock,
      discount,
    });
    return res;
  });

  //Gọi Api để cập nhật sản phẩm
  const mutationUpdate = useMutationHooks((data) => {
    const { id, token, ...rests } = data;
    const res = ProductService.updateProduct(id, token, { ...rests });
    return res;
  });

  // debugger

  //Xóa sản phẩm
  const mutationDeleted = useMutationHooks((data) => {
    const { id, token } = data;
    const res = ProductService.deleteProduct(id, token);
    return res;
  });

  // async - gọi lấy danh sách sản phẩm
  const getAllProducts = async () => {
    const res = await ProductService.getAllProduct();
    return res;
  };

  const fetchGetDetailsProduct = async (rowSelected) => {
    //Cập nhật thông tin sản phẩm
    const res = await ProductService.getDetailsProduct(rowSelected);
    if (res?.data) {
      setStateProductDetails({
        name: res?.data?.name,
        price: res?.data?.price,
        category: res?.data?.category,
        description: res?.data?.description,
        image: res?.data?.image,
        countInStock: res?.data?.countInStock,
        discount: res?.data?.discount,
      });
    }
    setIsLoadingUpdate(false);
  };

  useEffect(() => {
    if (!isModalOpen) {
      //Khi Modal đóng
      form.setFieldsValue(stateProductDetails); //Giá trị trong form sẽ được cập nhật bằng giá trị stateProductDetails
    } else {
      form.setFieldsValue(inittial()); //Modal mở giá trị được thiết lập lại với giá trị từ hàm inittial
    }
  }, [form, stateProductDetails, isModalOpen]);

  useEffect(() => {
    if (rowSelected && isOpenDrawer) {
      setIsLoadingUpdate(true);
      fetchGetDetailsProduct(rowSelected);
    }
  }, [rowSelected, isOpenDrawer]);

  const handleDetailsProduct = () => {
    setIsOpenDrawer(true);
  };

  const { data, isLoading, isSuccess, isError } = mutation;
  const {
    data: dataUpdated,
    isLoading: isLoadingUpdated,
    isSuccess: isSuccessUpdated,
    isError: isErrorUpdated,
  } = mutationUpdate;
  const {
    data: dataDeleted,
    isLoading: isLoadingDeleted,
    isSuccess: isSuccessDelected,
    isError: isErrorDeleted,
  } = mutationDeleted;

  const queryProduct = useQuery({
    queryKey: ["products"],
    queryFn: getAllProducts,
  });

  const { data: categories, isLoading: isLoadingCategories } = useQuery({
    queryKey: ["categories"],
    queryFn: CategoryService.getAllCategory,
  });

  const { isLoading: isLoadingProducts, data: products } = queryProduct;

  // Acction
  const renderAction = () => {
    return (
      <div style={{ display: "flex" }}>
        <Button
          type="text"
          style={{ backgroundColor: "#f7e7ff", color: "#aa00ff" }}
          onClick={handleDetailsProduct}
        >
          Update
        </Button>

        <Button
          type="text"
          style={{
            backgroundColor: "#ff547f",
            color: "#faeded",
            marginLeft: "10px",
          }}
          onClick={() => {
            setIsModalOpenDelete(true);
          }} // Mở modal xóa
        >
          Delete
        </Button>
      </div>
    );
  };

  const columns = [
    {
      title: "Product Name",
      dataIndex: "name",
      key: "name",
      render: (text, record) => (
        <span
          style={{ color: "#1677ff", cursor: "pointer" }}
          onClick={(e) => {
            e.stopPropagation();
            setRowSelected(record._id);
            setIsModalOpenDetails(true);
            fetchGetDetailsProduct(record._id);
          }}
        >
          {text}
        </span>
      ),
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
      render: renderAction,
    },
  ];

  const dataTable =
    products?.data?.length &&
    products?.data?.map((product) => {
      return { ...product, key: product._id };
    });

  useEffect(() => {
    if (isSuccess && data?.status === "OK") {
      message.success();
      handleCancel();
    } else if (isError) {
      message.error();
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isSuccessDelected && dataDeleted?.status === "OK") {
      message.success();
      handleCancelDelete();
    } else if (isErrorDeleted) {
      message.error();
    }
  }, [isSuccessDelected]);

  const handleCloseDrawer = () => {
    setIsOpenDrawer(false);
    setStateProductDetails({
      name: "",
      price: "",
      category: "",
      description: "",
      rating: "",
      image: "",
      countInStock: "",
    });
    form.resetFields();
  };

  useEffect(() => {
    if (isSuccessUpdated && dataUpdated?.status === "OK") {
      message.success();
      handleCloseDrawer();
    } else if (isErrorUpdated) {
      message.error();
    }
  }, [isSuccessUpdated]);

  const handleCancelDelete = () => {
    setIsModalOpenDelete(false);
  };

  const handleDeleteProduct = () => {
    mutationDeleted.mutate(
      { id: rowSelected, token: user?.access_token },
      {
        onSettled: () => {
          queryProduct.refetch();
        },
      }
    );
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setStateProduct({
      name: "",
      price: "",
      category: "",
      description: "",
      image: "",
      countInStock: "",
      discount: "",
    });
    form.resetFields();
  };

  const onFinish = () => {
    const params = {
      name: stateProduct.name,
      price: stateProduct.price,
      category: stateProduct.category,
      description: stateProduct.description,
      image: stateProduct.image,
      countInStock: stateProduct.countInStock,
      discount: stateProduct.discount,
    };

    mutation.mutate(params, {
      onSettled: () => {
        queryProduct.refetch();
      },
    });
  };

  const handleOnchangeDetails = (e) => {
    setStateProductDetails({
      ...stateProductDetails,
      [e.target.name]: e.target.value,
    });
  };

  //Chuyển đổi hình ảnh thành chuỗi Base64
  const handleOnchangeAvatarDetails = async ({ fileList }) => {
    const file = fileList[0];
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    setStateProductDetails({
      ...stateProductDetails,
      image: file.preview,
    });
  };
  const onUpdateProduct = () => {
    mutationUpdate.mutate(
      { id: rowSelected, token: user?.access_token, ...stateProductDetails },
      {
        onSettled: () => {
          queryProduct.refetch();
        },
      }
    );
  };

  return (
    <div>
      {/* Table AllProduct */}
      <div style={{ marginTop: "20px" }}>
        <TableComponent
          columns={columns}
          isLoading={isLoadingProducts}
          dataSource={dataTable}
          scrollHeight={460}
          onRow={(record, rowIndex) => {
            return {
              onClick: (event) => {
                setRowSelected(record._id);
                // setIsModalOpenDetails(true)
                // fetchGetDetailsProduct(record._id)
              },
            };
          }}
        />
      </div>

      {/* ProductDetails */}
      <ModalComponent
        title="Product Details"
        open={isModalOpenDetails}
        onCancel={() => setIsModalOpenDetails(false)}
        footer={null} // Ẩn nút footer để chỉ hiển thị thông tin chi tiết
      >
        <Loading isLoading={isLoadingUpdate}>
          <div>
            <p>
              <strong>Name:</strong> {stateProductDetails.name}
            </p>
            <p>
              <strong>Category:</strong>{" "}
              {stateProductDetails.category?.name || "No category"}
            </p>
            <p>
              <strong>Description:</strong> {stateProductDetails.description}
            </p>
            <p>
              <strong>Price:</strong> {stateProductDetails.price}
            </p>
            <p>
              <strong>Count In Stock:</strong>{" "}
              {stateProductDetails.countInStock}
            </p>
            <p>
              <strong>Discount:</strong> {stateProductDetails.discount}
            </p>
            <div>
              <strong>Image:</strong>
              {stateProductDetails.image && (
                <img
                  src={stateProductDetails.image}
                  alt="Product"
                  style={{
                    height: "60px",
                    width: "60px",
                    borderRadius: "5px",
                    objectFit: "cover",
                  }}
                />
              )}
            </div>
          </div>
        </Loading>
      </ModalComponent>

      {/* Update Product */}
      <DrawerComponent
        title="Update Product"
        isOpen={isOpenDrawer}
        onClose={() => setIsOpenDrawer(false)}
        width="60%"
      >
        <Loading isLoading={isLoadingUpdate || isLoadingUpdated}>
          <Form
            name="basic"
            labelCol={{ span: 2 }}
            wrapperCol={{ span: 22 }}
            onFinish={onUpdateProduct}
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
                value={stateProductDetails["name"]}
                onChange={handleOnchangeDetails}
                name="name"
              />
            </Form.Item>

            {/* Category */}
            <Form.Item
              name="category"
              label="Category"
              rules={[{ required: true, message: "Please select a category" }]}
            >
              <Select
                placeholder="Please select a category"
                loading={isLoadingCategories}
                initialValue={stateProductDetails.category?.name || "No category"}
                // value={stateProductDetails.category} // Hiển thị thể loại đã chọn
                onChange={(value) =>
                  setStateProductDetails({
                    ...stateProductDetails,
                    category: value,
                  })
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
                value={stateProductDetails.description}
                onChange={handleOnchangeDetails}
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
                value={stateProductDetails.price}
                onChange={handleOnchangeDetails}
                name="price"
              />
            </Form.Item>

            {/* Count inStock */}
            <Form.Item
              label="Count inStock"
              name="countInStock"
              rules={[
                { required: true, message: "Please input count inStock!" },
              ]}
            >
              <InputComponent
                value={stateProductDetails.countInStock}
                onChange={handleOnchangeDetails}
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
                value={stateProductDetails.discount}
                onChange={handleOnchangeDetails}
                name="discount"
              />
            </Form.Item>

            {/* Image */}
            <Form.Item
              label="Image"
              name="image"
              rules={[{ required: true, message: "Please input image!" }]}
            >
              <WrapperUploadFile
                onChange={handleOnchangeAvatarDetails}
                maxCount={1}
              >
                <Button>Select File</Button>
                {stateProductDetails?.image && (
                  <img
                    src={stateProductDetails?.image}
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
                Apply
              </Button>
            </Form.Item>
          </Form>
        </Loading>
      </DrawerComponent>

      {/* Delete Product */}
      <ModalComponent
        title="Delete Product"
        open={isModalOpenDelete}
        onCancel={handleCancelDelete}
        onOk={handleDeleteProduct}
      >
        <Loading isLoading={isLoadingDeleted}>
          <div>Do you want to delete product?</div>
        </Loading>
      </ModalComponent>
    </div>
  );
};

export default AllProduct;
