import React, { useState, useEffect } from "react"
import { UserOutlined } from "@ant-design/icons"
import { useSelector } from "react-redux"
import { Avatar, Row } from "antd"

const Navbar = ({ isHiddenSearch = false }) => {
  const user = useSelector((state) => state.user)
  const [userName, setUserName] = useState("")
  const [userAvatar, setUserAvatar] = useState("")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    setUserName(user?.name)
    setUserAvatar(user?.avatar)
    setLoading(false)
  }, [user?.name, user?.avatar])

  return (
    <Row
      style={{
        justifyContent:
          isHiddenSearch && isHiddenSearch ? "space-between" : "unset",
      }}
    >
      <div style={{display:"flex", flexDirection:'row-reverse', alignItems:'center', gap:'10px'}}>
        {userAvatar ? (
          <img
            src={userAvatar}
            style={{
              height: "40px",
              width: "40px",
              borderRadius: "50%",
              objectFit: "cover",
            }}
          />
        ) : (
          <Avatar size="large" icon={<UserOutlined />} />
        )}

        {user?.access_token ? (
          <>
            <div
              style={{
                color: "#00000099",
                textShadow: " 0px 0px 5px #fffff",
                cursor: "pointer",
                maxWidth: "300px",
                overflow: "hidden",
                textOverflow: "ellipsis",
                fontWeight: 700,
              }}
            >
              {userName?.length ? userName : user?.email}
            </div>
          </>
        ) : null}

        </div>
    </Row>
  )
}

export default Navbar
