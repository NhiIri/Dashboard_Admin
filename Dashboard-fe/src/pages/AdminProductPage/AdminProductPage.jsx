import { Button, Form, Select } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import React from "react";
import { WrapperHeader, WrapperUploadFile } from "./style";
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
import { Option } from "antd/lib/mentions";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import { calc } from "antd/es/theme/internal";

const AdminProductPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rowSelected, setRowSelected] = useState("");
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);
  const [isLoadingUpdate, setIsLoadingUpdate] = useState(false);
  const [isModalOpenDelete, setIsModalOpenDelete] = useState(false);
  const user = useSelector((state) => state?.user);

  const inittial = () => ({
    //Khởi tạo dữ liệu ban đầu cho state sản phẩm
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
  const mutation = useMutationHooks((data) => {
    const { name, price, description, image, countInStock, discount, category } = data;
    const res = ProductService.createProduct({
      //Gọi Api để tạo sản phẩm
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
  const mutationUpdate = useMutationHooks((data) => {
    const { id, token, ...rests } = data;
    const res = ProductService.updateProduct(
      //Gọi Api để cập nhật sản phẩm
      id,
      token,
      { ...rests }
    );
    return res;
  });

  // debugger

  const mutationDeleted = useMutationHooks((data) => {
    const { id, token } = data;
    const res = ProductService.deleteProduct(
      //Xóa sản phẩm
      id,
      token
    );
    return res;
  });

  const getAllProducts = async () => {
    // async - gọi lấy danh sách sản phẩm
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
        category:res?.data?.category,
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
          onClick={() => setIsModalOpenDelete(true)}
        >
          Delete
        </Button>
      </div>
    );
  };

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
      category:"",
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
      category:"",
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

  const handleOnchange = (e) => {
    setStateProduct({
      ...stateProduct,
      [e.target.name]: e.target.value,
    });
  };

  const handleOnchangeDetails = (e) => {
    setStateProductDetails({
      ...stateProductDetails,
      [e.target.name]: e.target.value,
    });
  };

  //Chuyển đổi hình ảnh thành chuỗi Base64
  const handleOnchangeAvatar = async ({ fileList }) => {
    const file = fileList[0];
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setStateProduct({
      ...stateProduct,
      image: file.preview,
    });
  };

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
      <ButtonComponent
        onClick={() => setIsModalOpen(true)}
        size={40}
        styleButton={{
          backgroundColor: "#1677ff",
        }}
        textbutton={"Add Product"}
        styleTextButton={{
          color: "#000000",
        }}
      ></ButtonComponent>
      <Button
        style={{
          borderRadius: "6px",
          borderStyle: "primary",
        }}
        onClick={() => setIsModalOpen(true)}
      >
        Add Product
        <PlusOutlined style={{ fontSize: "20px" }} />
      </Button>

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
              },
            };
          }}
        />
      </div>

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
            {/* <Select placeholder="Please select an category">
              <Option value="xiao">Xiaoxiao Fu</Option>
              <Option value="mao">Maomao Zhou</Option>
            </Select> */}
          </Form.Item>

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

      <DrawerComponent
        title="Product Details"
        isOpen={isOpenDrawer}
        onClose={() => setIsOpenDrawer(false)}
        width="90%"
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

export default AdminProductPage;
