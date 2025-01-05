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
  getItem('Thanh toán', 'thanh-toan', <ProductOutlined />),
  getItem('Đơn hàng', 'don-hang', <ProductOutlined />),
  getItem('Khách hàng', 'khach-hang', <ProductOutlined />),
  getItem('Cửa hàng', 'cua-hang', <ProductOutlined />),
  getItem('Gói cước', 'goi-cuoc', <ProductOutlined />),
  getItem('Thiết bị', 'thiet-bi', <ProductOutlined />),
  getItem('Nhân viên', 'nhan-vien', <ProductOutlined />),
  getItem('Nhà cung cấp', 'nha-cung-cap', <ProductOutlined />)
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
