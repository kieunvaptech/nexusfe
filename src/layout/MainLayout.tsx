import { Outlet } from 'react-router-dom'
import HeaderMain from './Header'
import Sidebar from './Sidebar'
import { Layout } from 'antd';
import React from 'react';

const { Header, Footer, Sider, Content } = Layout;

const MainLayout = () => {
  if (!localStorage.getItem('token')) {
    window.location.href = '/login'
  }

  return (
    <Layout style={{backgroundColor: 'white'}}>
      <Header>
        <HeaderMain />
      </Header>
      <Layout>
        <Sider>
          <Sidebar />
        </Sider>
        <Content>
          <Outlet />
        </Content>
      </Layout>
      {/* <Footer>Footer</Footer> */}
    </Layout>
  )
}

export default MainLayout
