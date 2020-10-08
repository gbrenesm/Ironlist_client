import React, { useContext } from 'react'
import { Layout, Menu } from "antd";
import { Link } from "react-router-dom"
import { Context } from "../context"


const { Header, Content } = Layout;


function LayoutApp({ children }) {
  const { user, clearctxUser } = useContext(Context)

  function logout(){
    clearctxUser()
  }

  return (
    <Layout className="layout">
    <Header style={{backgroundColor: "rgb(45, 197, 250)"}}>
      <div className="logo" />
      <Menu style={{backgroundColor: "rgb(45, 197, 250)"}} mode="horizontal" defaultSelectedKeys={['2']}>
        <Menu.Item key="1"><Link style={{color:"white"}} to={"/"}>Ironlist</Link></Menu.Item>
        {user && <Menu.Item key="2"><Link style={{color:"white"}} to={"/user"}>Your tasks</Link></Menu.Item>}
        {user && <Menu.Item key="2"><Link style={{color:"white"}} onClick={logout}>Logout</Link></Menu.Item>}
        {!user && <Menu.Item key="3"><Link style={{color:"white"}} to={"/auth"}>Login</Link></Menu.Item>}
      </Menu>
    </Header>
    <Content style={{ padding: '0 50px' }}>
      <div className="site-layout-content">{children}</div>
    </Content>
  </Layout>
  )
}

export default LayoutApp
