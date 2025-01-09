import { Menu, MenuProps } from 'antd'
import React, { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { DashboardOutlined, PicLeftOutlined, ProductOutlined } from '@ant-design/icons'
import { useSelector } from 'react-redux';
import { RootState } from 'store';

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group',
  hide?: boolean
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

const itemsAll: MenuProps['items'] = [
  getItem('Dashboard', '', <DashboardOutlined />),
  getItem('Kết nối', 'ket-noi', <ProductOutlined />),
  getItem('Thanh toán', 'thanh-toan', <ProductOutlined />),
  getItem('Đơn hàng', 'don-hang', <ProductOutlined />),
  getItem('Khách hàng', 'khach-hang', <ProductOutlined />),
  getItem('Nhân viên', 'nhan-vien', <ProductOutlined />),
  getItem('Gói cước', 'goi-cuoc', <ProductOutlined />),
  getItem('Thiết bị', 'thiet-bi', <ProductOutlined />),
  getItem('Nhà cung cấp', 'nha-cung-cap', <ProductOutlined />),
  getItem('Cửa hàng', 'cua-hang', <ProductOutlined />),
];

const itemsKyThuat: MenuProps['items'] = [
  getItem('Dashboard', '', <DashboardOutlined />),
  getItem('Kết nối', 'ket-noi', <ProductOutlined />),
  getItem('Thanh toán', 'thanh-toan', <ProductOutlined />),
  getItem('Đơn hàng', 'don-hang', <ProductOutlined />),
  getItem('Khách hàng', 'khach-hang', <ProductOutlined />),
  getItem('Gói cước', 'goi-cuoc', <ProductOutlined />),
  getItem('Thiết bị', 'thiet-bi', <ProductOutlined />),
];

const itemsKeToan: MenuProps['items'] = [
  getItem('Dashboard', '', <DashboardOutlined />),
  getItem('Kết nối', 'ket-noi', <ProductOutlined />),
  getItem('Thanh toán', 'thanh-toan', <ProductOutlined />),
  getItem('Đơn hàng', 'don-hang', <ProductOutlined />),
  getItem('Khách hàng', 'khach-hang', <ProductOutlined />),
];



const Sidebar = () => {
  const navigate = useNavigate()
  const userInfo = useSelector((state: RootState) => state.userReducer.userInfo);
  const items: MenuProps['items'] = useMemo(() => {
    if (userInfo?.RoleId == 3) return itemsKyThuat
    if (userInfo?.RoleId == 4) return itemsKeToan
    return itemsAll
  }, [userInfo?.RoleId])

  const onClick: MenuProps['onClick'] = e => {
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
