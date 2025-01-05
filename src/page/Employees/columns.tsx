import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import DetailIcon from 'assets/icons/detail-icon.svg'
import MoreIcon from 'components/atoms/icons/MoreIcon'
import PopoverAction from 'components/atoms/PopoverAction'
import { Employee } from 'models/Employee.model'
import { ACTION_TYPE, ROLE } from 'utils/Constants'

interface Props {
    actionXem: (record: any) => void
    actionCapNhat: (record: any) => void
    actionXoa: (record: any) => void
}

export const ProductColumns = (props: Props) => {
    const {
        actionXem,
        actionCapNhat,
        actionXoa,
    } = props

    return [
        {
            width: 50,
            fixed: 'left' as 'left',
            align: 'center' as 'center',
            title: 'STT',
            render: (value: any, row: any, index: number) => {
                return index + 1
            },
        },
        {
            width: 250,
            fixed: 'left' as 'left',
            dataIndex: 'fullName',
            title: 'Họ và tên',
            key: 'fullName',
        },
        {
            width: 250,
            fixed: 'left' as 'left',
            dataIndex: 'email',
            title: 'email',
            key: 'email',
        },
        {
            width: 150,
            dataIndex: 'phoneNumber',
            title: 'Số điện thoại',
            key: 'phoneNumber',
            align: 'center' as 'center',
        },
        {
            width: 300,
            dataIndex: 'address',
            title: 'Địa chỉ',
            key: 'address',
            align: 'center' as 'center',
        },
        {
            width: 100,
            dataIndex: 'roleId',
            title: 'Vị trí',
            key: 'roleId',
            align: 'center' as 'center',
            render: (text: any, record: Employee) => {
                return ROLE[record?.roleId || 0]
            }
        },
        {
            width: 100,
            dataIndex: 'storeId',
            title: 'Cửa hàng',
            key: 'storeId',
            align: 'center' as 'center',
            render: (text: any, record: Employee) => {
                return ROLE[record?.roleId || 0]
            }
        },
        {
            width: 150,
            dataIndex: 'username',
            title: 'username',
            key: 'username',
            align: 'center' as 'center',
        },
        // {
        //     width: 100,
        //     dataIndex: 'passwordHash',
        //     title: 'Mật khẩu',
        //     key: 'passwordHash',
        //     align: 'center' as 'center',
        // },
        {
            width: 80,
            dataIndex: 'action',
            title: 'Chức năng',
            key: 'action',
            fixed: 'right' as 'right',
            render: (text: any, record: any) => {
                return (
                    <PopoverAction
                        listAction={[
                            // {
                            //     icon: <img src={DetailIcon} alt="view-detail-icon" />,
                            //     text: ACTION_TYPE.XEM,
                            //     action: () => actionXem(record),
                            // },
                            {
                                icon: <EditOutlined className="text-xl text-gray-400" />,
                                text: ACTION_TYPE.CAP_NHAT,
                                action: () => actionCapNhat(record),
                            },
                            {
                                icon: <DeleteOutlined className="text-xl text-gray-400" />,
                                text: ACTION_TYPE.XOA,
                                action: () => actionXoa(record),
                            }
                            
                        ]}
                        placement="topRight"
                    >
                        <MoreIcon />
                    </PopoverAction>
                )
            },
        },
    ]
}
