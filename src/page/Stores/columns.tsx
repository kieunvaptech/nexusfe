import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import DetailIcon from 'assets/icons/detail-icon.svg'
import MoreIcon from 'components/atoms/icons/MoreIcon'
import PopoverAction from 'components/atoms/PopoverAction'
import { ACTION_TYPE } from 'utils/Constants'

interface Props {
    // actionXem: (record: any) => void
    actionCapNhat: (record: any) => void
    actionXoa: (record: any) => void
}

export const CategoryColumns = (props: Props) => {
    const {
        // actionXem,
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
            dataIndex: 'storeName',
            title: 'Store Name',
            key: 'storeName',
        },
        {
            width: 150,
            fixed: 'left' as 'left',
            dataIndex: 'address',
            title: 'Address',
            key: 'address',
        },
        {
            width: 150,
            fixed: 'left' as 'left',
            dataIndex: 'phoneNumber',
            title: 'Phone',
            key: 'phoneNumber',
        },
        {
            width: 80,
            dataIndex: 'action',
            title: 'Action',
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
