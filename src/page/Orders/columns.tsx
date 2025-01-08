import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import DetailIcon from 'assets/icons/detail-icon.svg'
import MoreIcon from 'components/atoms/icons/MoreIcon'
import PopoverAction from 'components/atoms/PopoverAction'
import { Order } from 'models/Order.model'
import { ACTION_TYPE, STATUS } from 'utils/Constants'

interface Props {
    RoleId?: number
    actionXem: (record: any) => void
    actionCapNhat: (record: any) => void
    actionXoa: (record: any) => void
    actionPay: (record: any) => void
}

export const OrderColumns = (props: Props) => {
    const {
        RoleId,
        actionXem,
        actionCapNhat,
        actionXoa,
        actionPay
    } = props

    return [
        {
            width: 50,
            fixed: 'left' as 'left',
            align: 'center' as 'center',
            title: 'STT',
            key: 'stt',
            render: (value: any, row: any, index: number) => {
                return index + 1
            },
        },
        {
            width: 150,
            fixed: 'left' as 'left',
            title: 'Họ tên',
            key: 'customer_fullName',
            render: (value: any, row: Order, index: number) => {
                return row?.customer?.fullName
            },
        },
        {
            width: 150,
            fixed: 'left' as 'left',
            title: 'Email',
            key: 'email',
            render: (value: any, row: Order, index: number) => {
                return row?.customer?.email
            },
        },
        {
            width: 150,
            fixed: 'left' as 'left',
            title: 'Số điện thoại',
            key: 'phone_number',
            render: (value: any, row: Order, index: number) => {
                return row?.customer?.phoneNumber
            },
        },
        {
            width: 300,
            dataIndex: 'address',
            title: 'Địa chỉ',
            key: 'address',
            align: 'center' as 'center',
            render: (value: any, row: Order, index: number) => {
                return row?.customer?.address
            },
        },
        {
            width: 150,
            dataIndex: 'employee_fullName',
            title: 'Nhân viên',
            key: 'employee_fullName',
            align: 'center' as 'center',
            render: (value: any, row: Order, index: number) => {
                return row?.employee?.fullName
            },
        },
        {
            width: 100,
            dataIndex: 'totalPrice',
            title: 'Tổng tiền',
            key: 'totalPrice',
            align: 'center' as 'center',
        },
        {
            width: 150,
            dataIndex: 'status',
            title: 'Trạng thái',
            key: 'status',
            align: 'center' as 'center',
            render: (status: number, row: any, index: number) => {
                return STATUS[status]
            },
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
                            {
                                icon: <EditOutlined className="text-xl text-gray-400" />,
                                text: ACTION_TYPE.CAP_NHAT,
                                action: () => actionCapNhat(record),
                                hide: (record?.status == 1 || record?.status == 2)
                            },
                            {
                                icon: <DeleteOutlined className="text-xl text-gray-400" />,
                                text: ACTION_TYPE.XOA,
                                action: () => actionXoa(record),
                                hide: (record?.status == 1 || record?.status == 2)
                            },
                            {
                                icon: <img src={DetailIcon} alt="view-detail-icon" />,
                                text: ACTION_TYPE.PAYMENT,
                                action: () => actionPay(record),
                                hide: (record?.status == 1 || record?.status == 2 || RoleId == 2 || RoleId == 3) 
                            },
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
