import { Form, Table, Typography } from 'antd'
import Content from 'layout/Content'
import { Pagination } from 'components/organisms/Pagination';
import { memo, useEffect, useState } from 'react'
import { useSupplierActions } from "../../actions/supplier.action";
import { ProductColumns } from "./columns";
import PaymentSearchForm from './component/PaymentSearchForm';
import { DefaultOptionType } from 'antd/lib/select';
import { FORM_MODE, messageType } from 'utils/Constants';
import { messageErrorDefault, messageSuccessDefault } from 'utils/CommonFc';
import { cloneDeep } from 'lodash-es'
import { usePaymentActions } from 'actions/payment.action';

const PaymentPage = () => {
  const [form] = Form.useForm()
  const paymentActions = usePaymentActions();
  const [dataSource, setDataSource] = useState();
  const [pageIndex, setPageIndex] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(10)
  const [total, setTotal] = useState(0)
  const [openInfo, setOpenInfo] = useState<boolean>(false)
  const [categorysOption, setcategorysOption] = useState<DefaultOptionType[]>([])
  const [idSelected, setIdSelected] = useState<number | null>(null)
  const [mode, setMode] = useState<number>(1)
  const [dataSearch, setDataSearch] = useState({})

  useEffect(() => {
    init()
  }, [])

  const init = () => {
    getPayments(1)
  }

  const getPayments = async (pageIndex: number, search?: any) => {
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
        const response = await paymentActions.getPayments(param);
        if (response) {
          setDataSource(response?.payments);
          setTotal(response.count)
        }
  
      } catch (error) {
        messageErrorDefault({ message: messageType.CHECK_INTERNET })
      }
    }

  const searchProducts = async () => {
    try {
      const values = form.getFieldsValue()
      setDataSearch(values)
      getPayments(1, values)

    } catch (error) {
      messageErrorDefault({ message: "Kiểm tra lại kết nối." })

    }
  }

  const resetSearch = async () => {
    try {
      form.resetFields()
      setDataSearch({})
      getPayments(1,{})

    } catch (error) {
      messageErrorDefault({ message: "Kiểm tra lại kết nối." })

    }
  }

  const deleteProduct = async (id: number) => {
    try {
      const response = await paymentActions.deletePayment(id);
      if (response) {
        getPayments(1)
        messageSuccessDefault({ message: "Xoá sản phẩm thành công" })
      }

    } catch (error) {
      console.log("error", error)
      messageErrorDefault({ message: "Kiểm tra lại kết nối." })

    }

  }

  const add = () => {
    setIdSelected(null)
    setMode(FORM_MODE.NEW)
    setOpenInfo(true)
  }

  const reloadData = () => {
    getPayments(1)
    setOpenInfo(false)
  }

  return (
    <Content loading={false}>
      <>
        <br />
        <div className="mx-1.5">
          <Typography.Title level={4} >Quản lý thanh toán</Typography.Title>
        </div>

        {/* <ProductSearchForm
          form={form}
          categorysOption={categorysOption}
          onSearch={searchProducts}
          onReset={resetSearch}
          onInfo={() => add()} /> */}
        {/* <ProductInfoForm
          id={idSelected}
          mode={mode}
          categorysOption={categorysOption}
          open={openInfo}
          reload={reloadData}
          handleCancel={() => setOpenInfo(false)}
        /> */}
        <Table
          columns={ProductColumns({
            actionXem: (record: any) => {
              setMode(FORM_MODE.VIEW)
              setOpenInfo(true)
              setIdSelected(record.id)
            },
            actionCapNhat: (record: any) => {
              setMode(FORM_MODE.UPDATE)
              setOpenInfo(true)
              setIdSelected(record.id)
            },
            actionXoa: (record: any) => {
              // deleteProduct(record.id)
            },
          })}
          dataSource={dataSource}
          pagination={false}
        />
        <div style={{ padding: 5 }}>
          {/* {dataSourceProduct && (
            <Pagination
              totalItems={total}
              pageSize={pageSize}
              setPageSize={setPageSize}
              pageIndex={pageIndex}
              setPageIndex={getProducts}
            />
          )} */}
        </div>
      </>
    </Content>
  )
}

export default PaymentPage
