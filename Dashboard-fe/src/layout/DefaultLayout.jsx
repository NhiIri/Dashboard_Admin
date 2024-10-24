import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import { Button, Layout, theme } from 'antd'
import SideMenuComponent from '../components/SideMenuComponent/SideMenuComponent'
import AccountComponent from '../components/AccountComponent/AccountComponent'

const { Header, Sider, Content } = Layout

const DefaultLayout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false)
  const {
    token: { colorBgContainer, borderRadiusLG }
  } = theme.useToken()

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <SideMenuComponent />       
      </Sider>

      <Layout>
        <Header style={{ padding: '0px 10px 0px 0px', background: colorBgContainer, display: 'flex', justifyContent: 'space-between' }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
          <AccountComponent />
        </Header>

        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          {children || <Outlet />}
        </Content>
      </Layout>
    </Layout>
  )
}

export default DefaultLayout

