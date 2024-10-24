import React from "react"
import { useEffect } from "react"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent"
import InputForm from "../../components/InputForm/InputForm"
import {
  WrapperContentProfile,
  WrapperContentProfile1,
  WrapperHeader,
  WrapperInput,
  WrapperInput1,
  WrapperLabel,
  WrapperUploadFile,
} from "./style"
import * as UserService from "../../services/UserService"
import { useMutationHooks } from "../../hooks/useMutationHook"
import Loading from "../../components/LoadingComponent/Loading"
import * as message from "../../components/Message/Message"
import { updateUser, resetUser } from "../../redux/slides/userSlide"
import { Button } from "antd"
import { UploadOutlined } from "@ant-design/icons"
import { getBase64 } from "../../utils"
import { useNavigate } from "react-router-dom"

const AdminAccountPage = () => {
  const user = useSelector((state) => state.user)
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [address, setAddress] = useState("")
  const [avatar, setAvatar] = useState("")
  const mutation = useMutationHooks((data) => {
    const { id, access_token, ...rests } = data
    UserService.updateUser(id, rests, access_token)
  })

  const dispatch = useDispatch()
  const { data, isLoading, isSuccess, isError } = mutation

  useEffect(() => {
    setEmail(user?.email)
    setName(user?.name)
    setPhone(user?.phone)
    setAddress(user?.address)
    setAvatar(user?.avatar)
  }, [user])

  useEffect(() => {
    if (isSuccess) {
      message.success()
      handleGetDetailsUser(user?.id, user?.access_token)
    } else if (isError) {
      message.error()
    }
  }, [isSuccess, isError])

  const handleGetDetailsUser = async (id, token) => {
    const res = await UserService.getDetailsUser(id, token)
    dispatch(updateUser({ ...res?.data, access_token: token }))
  }

  const handleOnchangeEmail = (value) => {
    setEmail(value)
  }
  const handleOnchangeName = (value) => {
    setName(value)
  }
  const handleOnchangePhone = (value) => {
    setPhone(value)
  }
  const handleOnchangeAddress = (value) => {
    setAddress(value)
  }

  const handleOnchangeAvatar = async ({ fileList }) => {
    const file = fileList[0]
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj)
    }
    setAvatar(file.preview)
  }

  const handleUpdate = () => {
    mutation.mutate({
      id: user?.id,
      email,
      name,
      phone,
      address,
      avatar,
      access_token: user?.access_token,
    })
  }

  const handleLogout = async () => {
    await UserService.logoutUser()
    dispatch(resetUser())
    navigate("/sign-in")
  }

  const handleClickNavigate = () => {
    handleLogout()
  }

  return (
    <div>
          <Loading isLoading={isLoading}>
            <WrapperContentProfile>
              <WrapperInput1>
                {avatar && (
                  <img
                    src={avatar}
                    style={{
                      height: "250px",
                      width: "250px",
                      objectFit: "cover",
                    }}
                    alt="avatar"
                  />
                )}

                <div style={{ display: "flex", justifyContent: "center" }}>
                  <WrapperUploadFile
                    onChange={handleOnchangeAvatar}
                    maxCount={1}
                  >
                    <Button
                      style={{
                        color: "#0044ff",
                        marginRight: "20px",
                        backgroundColor: "#ffff",
                      }}
                      icon={<UploadOutlined />}
                      type="text"
                      ghost
                    >
                      Select File
                    </Button>
                  </WrapperUploadFile>
                  <ButtonComponent
                    onClick={handleUpdate}
                    size={40}
                    styleButton={{
                      height: "30px",
                      width: "fit-content",
                      borderRadius: "4px",
                      padding: "2px 6px 6px",
                      backgroundColor: "#ecf0fd",
                    }}
                    textbutton={"Update"}
                    styleTextButton={{
                      color: "#0044ff",
                      fontSize: "15px",
                      fontWeight: "500",
                    }}
                  ></ButtonComponent>
                </div>
              </WrapperInput1>

              <WrapperContentProfile1>
                <WrapperInput>
                  <WrapperLabel htmlFor="name">Name:</WrapperLabel>
                  <InputForm
                    style={{ width: "320px", fontSize: "16px" }}
                    id="name"
                    value={name}
                    onChange={handleOnchangeName}
                  />
                  <ButtonComponent
                    onClick={handleUpdate}
                    size={40}
                    styleButton={{
                      height: "30px",
                      width: "fit-content",
                      borderRadius: "4px",
                      padding: "2px 6px 6px",
                      backgroundColor: "#ecf0fd",
                    }}
                    textbutton={"Update"}
                    styleTextButton={{
                      color: "#0044ff",
                      fontSize: "15px",
                      fontWeight: "600",
                    }}
                  ></ButtonComponent>
                </WrapperInput>
                <WrapperInput>
                  <WrapperLabel htmlFor="email">Email:</WrapperLabel>
                  <InputForm
                    style={{ width: "320px", fontSize: "16px" }}
                    id="email"
                    value={email}
                    onChange={handleOnchangeEmail}
                  />
                  <ButtonComponent
                    onClick={handleUpdate}
                    size={40}
                    styleButton={{
                      height: "30px",
                      width: "fit-content",
                      borderRadius: "4px",
                      padding: "2px 6px 6px",
                      backgroundColor: "#ecf0fd",
                    }}
                    textbutton={"Update"}
                    styleTextButton={{
                      color: "#0044ff",
                      fontSize: "15px",
                      fontWeight: "600",
                    }}
                  ></ButtonComponent>
                </WrapperInput>
                <WrapperInput>
                  <WrapperLabel htmlFor="phone">Phone:</WrapperLabel>
                  <InputForm
                    style={{ width: "320px", fontSize: "16px" }}
                    id="email"
                    value={phone}
                    onChange={handleOnchangePhone}
                  />
                  <ButtonComponent
                    onClick={handleUpdate}
                    size={40}
                    styleButton={{
                      height: "30px",
                      width: "fit-content",
                      borderRadius: "4px",
                      padding: "2px 6px 6px",
                      backgroundColor: "#ecf0fd",
                    }}
                    textbutton={"Update"}
                    styleTextButton={{
                      color: "#0044ff",
                      fontSize: "15px",
                      fontWeight: "600",
                    }}
                  ></ButtonComponent>
                </WrapperInput>

                <WrapperInput>
                  <WrapperLabel htmlFor="address">Address:</WrapperLabel>
                  <InputForm
                    style={{ width: "320px", fontSize: "16px" }}
                    id="address"
                    value={address}
                    onChange={handleOnchangeAddress}
                  />
                  <ButtonComponent
                    onClick={handleUpdate}
                    size={40}
                    styleButton={{
                      height: "30px",
                      width: "fit-content",
                      borderRadius: "4px",
                      padding: "2px 6px 6px",
                      backgroundColor: "#ecf0fd",
                    }}
                    textbutton={"Update"}
                    styleTextButton={{
                      color: "#0044ff",
                      fontSize: "15px",
                      fontWeight: "600",
                    }}
                  ></ButtonComponent>
                </WrapperInput>
              </WrapperContentProfile1>
            </WrapperContentProfile>
          </Loading>
          <div
            style={{
              display: "flex",
              flexDirection: "row-reverse",
              paddingTop: "15px",
            }}
          >
            <Button
              onClick={handleClickNavigate}
              type="text"
              style={{
                backgroundColor: "#ff547f",
                color: "#faeded",
                fontSize: "16px",
                fontWeight: "500",
                height: "40px",
                width: "150px",
              }}
            >
              Logout
            </Button>
          </div>
        </div>
  )
}

export default AdminAccountPage
