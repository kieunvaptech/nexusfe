import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import DetailIcon from 'assets/icons/detail-icon.svg'
import MoreIcon from 'components/atoms/icons/MoreIcon'
import PopoverAction from 'components/atoms/PopoverAction'
import { ACTION_TYPE } from 'utils/Constants'

interface Props {
    actionXem: (record: any) => void
    actionCapNhat: (record: any) => void
    actionXoa: (record: any) => void
}

export const OrderColumns = (props: Props) => {
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
            width: 150,
            fixed: 'left' as 'left',
            dataIndex: 'fullname',
            title: 'Họ tên',
            key: 'fullname',
        },
        {
            width: 250,
            fixed: 'left' as 'left',
            dataIndex: 'email',
            title: 'Email',
            key: 'email',
        },
        {
            width: 250,
            fixed: 'left' as 'left',
            dataIndex: 'phone_number',
            title: 'Số điện thoại',
            key: 'phone_number',
        },
        {
            width: 150,
            dataIndex: 'address',
            title: 'Địa chỉ',
            key: 'address',
            align: 'center' as 'center',
        },
        {
            width: 150,
            dataIndex: 'note',
            title: 'Ghi chú',
            key: 'note',
            align: 'center' as 'center',
        },
        {
            width: 150,
            dataIndex: 'total_money',
            title: 'Tổng tiền',
            key: 'total_money',
            align: 'center' as 'center',
        },
        {
            width: 150,
            dataIndex: 'status',
            title: 'Trạng thái',
            key: 'status',
            align: 'center' as 'center',
        },
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
                            {
                                icon: <img src={DetailIcon} alt="view-detail-icon" />,
                                text: ACTION_TYPE.XEM,
                                action: () => actionXem(record),
                            },
                            // {
                            //     icon: <EditOutlined className="text-xl text-gray-400" />,
                            //     text: ACTION_TYPE.CAP_NHAT,
                            //     action: () => actionCapNhat(record),
                            // },
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
