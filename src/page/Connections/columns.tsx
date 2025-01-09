import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import DetailIcon from 'assets/icons/detail-icon.svg'
import MoreIcon from 'components/atoms/icons/MoreIcon'
import PopoverAction from 'components/atoms/PopoverAction'
import { Payment } from 'models/Payment.model'
import { ACTION_TYPE } from 'utils/Constants'

interface Props {
    RoleId?: number
    actionXem: (record: any) => void
    actionCapNhat: (record: any) => void
    actionXoa: (record: any) => void
}

export const ProductColumns = (props: Props) => {
    const {
        RoleId,
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
            dataIndex: 'fullName',
            title: 'Họ và tên',
            key: 'fullName',
            render: (value: any, row: any, index: number)=> {
                return row?.payment?.order?.customer?.fullName
            },
        },
        {
            width: 150,
            fixed: 'left' as 'left',
            dataIndex: 'email',
            title: 'Email',
            key: 'email',
            render: (value: any, row: any, index: number)=> {
                return row?.payment?.order?.customer?.email
            },
        },
        {
            width: 150,
            dataIndex: 'phoneNumber',
            title: 'Số điện thoại',
            key: 'phoneNumber',
            align: 'center' as 'center',
            render: (value: any, row: any, index: number)=> {
                return row?.payment?.order?.customer?.phoneNumber
            },
        },
        {
            width: 150,
            dataIndex: 'amount',
            title: 'Tổng tiền',
            key: 'amount',
            align: 'center' as 'center',
            render: (value: any, row: any, index: number)=> {
                return row?.payment?.order?.totalPrice
            },
        },
        {
            width:250,
            dataIndex: 'connectionName',
            title: 'Mã kết nối',
            key: 'connectionName',
            align: 'center' as 'center',
        },
        // {
        //     width: 80,
        //     dataIndex: 'action',
        //     title: 'Chức năng',
        //     key: 'action',
        //     fixed: 'right' as 'right',
        //     render: (text: any, record: any) => {
        //         return (
        //             <PopoverAction
        //                 listAction={[
        //                     {
        //                         icon: <DeleteOutlined className="text-xl text-gray-400" />,
        //                         text: 'Hủy',
        //                         action: () => actionXoa(record),
        //                         hide: RoleId !== 4
        //                     },
        //                 ]}
        //                 placement="topRight"
        //             >
        //                 {RoleId === 4 && <MoreIcon />}
        //             </PopoverAction>
        //         )
        //     },
        // },
        
    ]
}
