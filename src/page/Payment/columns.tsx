import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import DetailIcon from 'assets/icons/detail-icon.svg'
import MoreIcon from 'components/atoms/icons/MoreIcon'
import PopoverAction from 'components/atoms/PopoverAction'
import { Payment } from 'models/Payment.model'
import { ACTION_TYPE } from 'utils/Constants'

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
            width: 150,
            fixed: 'left' as 'left',
            dataIndex: 'fullName',
            title: 'Họ và tên',
            key: 'fullName',
            render: (value: any, row: Payment, index: number)=> {
                return row?.order?.customer?.fullName
            },
        },
        {
            width: 250,
            fixed: 'left' as 'left',
            dataIndex: 'email',
            title: 'Email',
            key: 'email',
            render: (value: any, row: Payment, index: number)=> {
                return row?.order?.customer?.email
            },
        },
        {
            width: 150,
            dataIndex: 'phoneNumber',
            title: 'Số điện thoại',
            key: 'phoneNumber',
            align: 'center' as 'center',
            render: (value: any, row: Payment, index: number)=> {
                return row?.order?.customer?.phoneNumber
            },
        },
        {
            width: 150,
            dataIndex: 'amount',
            title: 'Tổng tiền',
            key: 'amount',
            align: 'center' as 'center'
        },
    ]
}
