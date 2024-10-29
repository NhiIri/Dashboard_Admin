import React, { useState, useEffect } from "react"
import { UserOutlined } from "@ant-design/icons"
import { useSelector, useDispatch } from "react-redux"
import { Avatar, Row, Popover, Button } from "antd"
import * as UserService from "../../services/UserService"
import { resetUser } from "../../redux/slides/userSlide"
import { useNavigate } from "react-router-dom"

const Navbar = ({ isHiddenSearch = false }) => {
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const [userName, setUserName] = useState("")
  const [userAvatar, setUserAvatar] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    setLoading(true)
    setUserName(user?.name)
    setUserAvatar(user?.avatar)
    setLoading(false)
  }, [user?.name, user?.avatar])

  const handleLogout = async () => {
    await UserService.logoutUser()
    dispatch(resetUser())
    navigate("/sign-in")
  }

  const handleClickNavigate = () => {
    handleLogout()
  }

  const content = (
    <Button style={{color:'red', fontWeight:'500'}} type="link" onClick={handleClickNavigate}>
      Logout
    </Button>
  )

  return (
    <Row
      style={{
        justifyContent: isHiddenSearch ? "space-between" : "unset",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row-reverse",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <Popover content={content} trigger="click">
          {userAvatar ? (
            <img
              src={userAvatar}
              style={{
                height: "40px",
                width: "40px",
                borderRadius: "50%",
                objectFit: "cover",
                cursor: "pointer",
              }}
              alt="User Avatar"
            />
          ) : (
            <Avatar size="large" icon={<UserOutlined />} />
          )}
        </Popover>

        {user?.access_token ? (
          <div
            style={{
              color: "#00000099",
              textShadow: "0px 0px 5px #ffffff",
              cursor: "pointer",
              maxWidth: "300px",
              overflow: "hidden",
              textOverflow: "ellipsis",
              fontWeight: 700,
            }}
          >
            {userName?.length ? userName : user?.email}
          </div>
        ) : null}
      </div>
    </Row>
  )
}

export default Navbar
