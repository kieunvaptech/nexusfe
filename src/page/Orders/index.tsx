import { Form, Table, Typography } from 'antd'
import Content from 'layout/Content'
import { Pagination } from 'components/organisms/Pagination';
import { memo, useEffect, useState } from 'react'
import { useProductActions } from "../../actions/supplier.action";
import { OrderColumns } from "./columns";
import ProductSearchForm from './component/OrderSearchForm';
import { useCategoryActions } from 'actions/category.action';
import { DefaultOptionType } from 'antd/lib/select';
import { Category } from 'models/Supplier.model';
import { FORM_MODE } from 'utils/Constants';
import { messageErrorDefault, messageSuccessDefault } from 'utils/CommonFc';
import { useOrderActions } from 'actions/order.action';
import OrderInfoForm from './component/OrderInfoForm';
import { cloneDeep } from 'lodash-es';

const OrderPage = () => {
  const [form] = Form.useForm()
  const orderActions = useOrderActions();
  const categoryActions = useCategoryActions();
  const [dataSourceOrder, setDataSourceOrder] = useState();
  const [pageIndex, setPageIndex] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(10)
  const [total, setTotal] = useState(0)
  const [openInfo, setOpenInfo] = useState<boolean>(false)
  const [categorysOption, setcategorysOption] = useState<DefaultOptionType[]>([])
  const [selected, setSelected] = useState<number | null>(null)
  const [mode, setMode] = useState<number>(1)
  const [dataSearch, setDataSearch] = useState({})

  useEffect(() => {
    init()
  }, [])

  const init = () => {
    getOrders(1)
  }

  const getOrders = async (pageIndex: number, search?: any) => {
    try{
      if (!search) {
        search = cloneDeep(dataSearch)
      }
      setPageIndex(pageIndex)
      const param = {
        page: pageIndex,
        limit: pageSize,
        ...search
      }
      const ordersResponse: any = await orderActions.getOrders(param);
      if (ordersResponse) {
        setDataSourceOrder(ordersResponse.orders);
        setTotal(ordersResponse.totalPages * pageSize)
      }
    }catch(error){

    }

  }

  const deleteOrder = async (id: number) => {
    try {
      const response = await orderActions.deleteOrder(id);
      if (response) {
        getOrders(1)
        messageSuccessDefault({ message: "Xoá đơn hàng thành công" })
      }

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
      getOrders(1,{})

    } catch (error) {
      messageErrorDefault({ message: "Kiểm tra lại kết nối." })

    }
  }



  return (
    <Content>
      <>
      <br />
        <div className="mx-1.5">
          <Typography.Title level={4} >Orders Management</Typography.Title>
        </div>

        <ProductSearchForm
          form={form}
          categorysOption={categorysOption}
          onSearch={onSearch}
          onReset={resetSearch} />
        <OrderInfoForm
          mode={mode}
          open={openInfo}
          data={selected}
          reload={reloadData}
          handleCancel={() => setOpenInfo(false)}
        />
        <Table
          columns={OrderColumns({
            actionXem: (record: any) => {
              setMode(FORM_MODE.VIEW)
              setOpenInfo(true)
              setSelected(record)
            },
            actionCapNhat: (record: any) => {
              setMode(FORM_MODE.UPDATE)
              setOpenInfo(true)
              setSelected(record)
            },
            actionXoa: (record: any) => {
              deleteOrder(record.id)
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
