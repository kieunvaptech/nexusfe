import { Form, Table, Typography } from 'antd'
import Content from 'layout/Content'
import { Pagination } from 'components/organisms/Pagination';
import { memo, useEffect, useState } from 'react'
import { OrderColumns } from "./columns";
import OrderSearchForm from './component/OrderSearchForm';
import { DefaultOptionType } from 'antd/lib/select';
import { FORM_MODE, STATUS } from 'utils/Constants';
import { messageErrorDefault, messageSuccessDefault, showConfirm } from 'utils/CommonFc';
import OrderInfoForm from './component/OrderInfoForm';
import { cloneDeep } from 'lodash-es';
import { useOrderActions } from 'actions/order.action';
import { Order } from 'models/Order.model';
import { useSelector } from 'react-redux';
import { RootState } from 'store';

const OrderPage = () => {
  const [form] = Form.useForm()
  const orderActions = useOrderActions();
  const [dataSourceOrder, setDataSourceOrder] = useState();
  const userInfo = useSelector((state: RootState) => state.userReducer.userInfo);
  
  const [pageIndex, setPageIndex] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(10)
  const [total, setTotal] = useState(0)
  const [openInfo, setOpenInfo] = useState<boolean>(false)
  const [statusOption, setStatusOption] = useState<DefaultOptionType[]>([])
  const [selected, setSelected] = useState<number | undefined>(undefined)
  const [mode, setMode] = useState<number>(1)
  const [dataSearch, setDataSearch] = useState({})
  const [loading,setLoading] = useState<boolean>(true)

  useEffect(() => {
    const options: DefaultOptionType[] = STATUS.map((item: string, index: number) => ({
      label: item,
      value: index
    }))
    setStatusOption(options)
    init()
  }, [])

  const init = async () => {
    await getOrders(1);
    setLoading(false);
  }

  const getOrders = async (pageIndex: number, search?: any) => {
    try {
      if (!search) {
        search = cloneDeep(dataSearch)
      }
      setPageIndex(pageIndex)
      const param = {
        page: pageIndex,
        size: pageSize,
        query: JSON.stringify(search)
      }
      const ordersResponse: any = await orderActions.getOrders(param);
      if (ordersResponse) {
        setDataSourceOrder(ordersResponse.orders);
        setTotal(ordersResponse.count)
      }
    } catch (error) {

    }

  }

  const deleteOrder = async (id: number) => {
    try {
      await orderActions.deleteOrder(id);
      getOrders(1);
      messageSuccessDefault({ message: "Xoá đơn hàng thành công" });
    } catch (error) {
      console.log("error", error)
      messageErrorDefault({ message: "Kiểm tra lại kết nối." })
    }
  }

  const add = () => {
    setMode(FORM_MODE.NEW)
    setOpenInfo(true)
  }

  const reloadData = () => {
    setOpenInfo(false)
    getOrders(1)
  }

  const onSearch = () => {
    try {
      const values = form.getFieldsValue()
      setDataSearch(values)
      getOrders(1, values)

    } catch (error) {
      messageErrorDefault({ message: "Kiểm tra lại kết nối." })

    }
  }

  const resetSearch = async () => {
    try {
      form.resetFields()
      setDataSearch({})
      getOrders(1, {})

    } catch (error) {
      messageErrorDefault({ message: "Kiểm tra lại kết nối." })

    }
  }



  return (
    <Content loading={loading}>
      <>
        <br />
        <div className="mx-1.5">
          <Typography.Title level={4} >Quản lý đơn hàng</Typography.Title>
        </div>

        <OrderSearchForm
          form={form}
          statusOption={statusOption}
          onSearch={onSearch}
          onReset={resetSearch}
          onInfo={() => add()} />
        <OrderInfoForm
          mode={mode}
          open={openInfo}
          id={selected}
          reload={reloadData}
          handleCancel={() => setOpenInfo(false)}
        />
        <Table
          columns={OrderColumns({
            RoleId: userInfo?.RoleId,
            actionXem: (record: Order) => {
              setMode(FORM_MODE.VIEW)
              setOpenInfo(true)
              setSelected(record?.orderId)
            },
            actionCapNhat: (record: Order) => {
              setMode(FORM_MODE.UPDATE)
              setOpenInfo(true)
              setSelected(record?.orderId)
            },
            actionXoa: (record: Order) => {
              showConfirm(() => {
                deleteOrder(record.orderId || 0)
              });
            },
            actionPay: (record: Order) => {
              setMode(FORM_MODE.PAY)
              setOpenInfo(true)
              setSelected(record?.orderId)
            },
          })}
          dataSource={dataSourceOrder}
          pagination={false}
        />
        <div style={{ padding: 5 }}>
          {dataSourceOrder && (
            <Pagination
              totalItems={total}
              pageSize={pageSize}
              setPageSize={setPageSize}
              pageIndex={pageIndex}
              setPageIndex={getOrders}
            />
          )}
        </div>
      </>
    </Content>
  )
}

export default memo(OrderPage)
