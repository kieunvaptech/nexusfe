import { Dropdown, MenuProps, Modal, Space } from 'antd'
import { DeleteOutlined, DownOutlined, EditOutlined } from '@ant-design/icons'
import Avatar from 'assets/icons/Avatar.svg'
import { memo, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'store'
import { jwtDecode } from 'jwt-decode'
import { setUserInfo } from 'Slice/userSlice'
import PopoverAction from 'components/atoms/PopoverAction'
import { ROLE } from 'utils/Constants'
import ChangePassword from './ChangePassword'
const { confirm } = Modal;

const HeaderMain = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const userInfo = useSelector((state: RootState) => state.userReducer.userInfo);
  const [openChange, setOpenChange] = useState(false);

  const showConfirm = () => {
    confirm({
      title: 'Xác nhận',
      content: 'Bạn muốn đăng xuất khỏi hệ thống?',
      okText: 'Đăng xuất',
      cancelText: 'Hủy',
      onOk() {
        handleClickLogout()
      }
    });
  };

  const handleClickLogout = async () => {
    localStorage.removeItem('token')
    navigate('/login')
  }

  useEffect(() => {
    console.log("userInfo", userInfo)
    getUserDetail()
  }, [])

  const getUserDetail = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded = jwtDecode<any>(token);
      const decodedData = JSON.parse(decoded?.Employee);
      dispatch(setUserInfo(decodedData));
    } else {
      handleClickLogout()
    }
  }

  const items: MenuProps['items'] = [
    {
      label: (
        <a onClick={()=> setOpenChange(true)}>
          Đổi mật khẩu
        </a>
      ),
      key: '0',
    },
    {
      type: 'divider',
    },
    {
      label: (
        <a onClick={showConfirm}>
          Đăng xuất
        </a>
      ),
      key: '1',
    }
  ];

  return (
    <header
      className={`'pl-[340px]' main-header fixed w-full top-[0] left-[0] flex justify-between pt-[14px] flex-col`}
    >
      <div className="flex justify-between h-11">
        <div className={`ml-[-12px] mb-6 mr-2 flex items-center pt-3`}>
          <div className="m-1 cursor-pointer bg-white">
          </div>
          <div className="pl-3 flex">
            <div className="flex space-x-[10px] h-[20px] pr-3">
            </div>
            <a className="text-white text-base flex items-center" href="/">
              NEXUS SYSTEM
            </a>
          </div>
        </div>
        <div className="flex relative space-x-[10px] pr-10" >
          <div className="flex space-x-[10px]">
            <img src={Avatar} alt="Avatar" />
          </div>
          <div className="profile flex h-[40px] cursor-pointer">
            <div className="flex-col text-[14px] text-white hidden lg:flex flex justify-center">
              <div className="font-bold" style={{ color: '#ffffff' }}>
                <Dropdown menu={{ items }}>
                  <a>
                    <Space>
                      {userInfo?.Username} {ROLE[userInfo?.RoleId]}
                      <DownOutlined />
                    </Space>
                  </a>
                </Dropdown>

              </div>
            </div>
          </div>
          <div className="flex space-x-[10px] cursor-pointer" >
          </div>
        </div>
        <ChangePassword
          open={openChange}
          username={userInfo?.Username}
          handleCancel={() => setOpenChange(false)} />
      </div>
    </header>
  )
}

export default memo(HeaderMain)
