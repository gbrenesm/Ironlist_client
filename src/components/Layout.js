import React, { useContext } from 'react'
import { Layout, Menu } from "antd";
import { Link } from "react-router-dom"
import { Context } from "../context"


const { Header, Content } = Layout;


function LayoutApp({ children }) {
  const { user } = useContext(Context)
  return (
    <Layout className="layout">
    <Header>
      <div className="logo" />
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
        <Menu.Item key="1"><Link to={"/"}>Ironlist</Link></Menu.Item>
        {user && <Menu.Item key="2">nav 2</Menu.Item>}
        {user && <Menu.Item key="2">Logout</Menu.Item>}
        {!user && <Menu.Item key="3"><Link to={"/auth"}>Login</Link></Menu.Item>}
      </Menu>
    </Header>
    <Content style={{ padding: '0 50px' }}>
      <div className="site-layout-content">{children}</div>
    </Content>
  </Layout>
  )
}

export default LayoutApp
