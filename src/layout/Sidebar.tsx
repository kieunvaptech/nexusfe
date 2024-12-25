import { Menu, MenuProps } from 'antd'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { DashboardOutlined, PicLeftOutlined, ProductOutlined } from '@ant-design/icons'

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group',
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

const items: MenuProps['items'] = [
  getItem('Dashboard', '', <DashboardOutlined />),
  getItem('Billings', 'billings', <ProductOutlined />),
  getItem('Orders', 'orders', <ProductOutlined />),
  // getItem('Order Detail', 'order-detail', <ProductOutlined />),
  getItem('Customers', 'customers', <ProductOutlined />),
  getItem('Stores', 'stores', <ProductOutlined />),
  getItem('Plans', 'plans', <ProductOutlined />),
  getItem('Equipments', 'equipments', <ProductOutlined />),
  getItem('Employees', 'employees', <ProductOutlined />),
  getItem('Vendors', 'vendors', <ProductOutlined />),
  // getItem('Quản lý sản phẩm', 'sale', <PicLeftOutlined />, [
  //   getItem('Danh mục', 'category'),
  //   getItem('Sản phẩm', 'product'),
  // ])
];

const Sidebar = () => {
  const navigate = useNavigate()
  

  const onClick: MenuProps['onClick'] = e => {
    console.log('click ', e);
    navigate(`/${e.key}`)
  };

  return (
    <Menu
      onClick={onClick}
      style={{ width: 200 }}
      defaultSelectedKeys={['1']}
      defaultOpenKeys={['sub1']}
      mode="inline"
      items={items}
    />
  )
}

export default Sidebar
