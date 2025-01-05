import { Form, Table, Typography } from 'antd'
import Content from 'layout/Content'
import { Pagination } from 'components/organisms/Pagination';
import { memo, useEffect, useState } from 'react'
import { CustomerColumns } from "./columns";
import CustomerSearchForm from './component/CustomerSearchForm';
import { DefaultOptionType } from 'antd/lib/select';
import { FORM_MODE } from 'utils/Constants';
import { messageErrorDefault, messageSuccessDefault, showConfirm } from 'utils/CommonFc';
import { cloneDeep } from 'lodash-es'
import { useCustomerActions } from 'actions/customer.action';
import { Customer } from 'models/Customer.model';
import CustomerInfoForm from './component/CustomerInfoForm';

const CustomerPage = () => {
  const [form] = Form.useForm()
  const customerActions = useCustomerActions();
  const [dataSourceCustomer, setDataSourceCustomer] = useState();
  const [pageIndex, setPageIndex] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(10)
  const [total, setTotal] = useState(0)
  const [openInfo, setOpenInfo] = useState<boolean>(false)
  const [categorysOption, setcategorysOption] = useState<DefaultOptionType[]>([])
  const [rowData, setRowData] = useState<Customer>()
  const [mode, setMode] = useState<number>(1)
  const [dataSearch, setDataSearch] = useState({})

  useEffect(() => {
    init()
  }, [])

  const init = () => {
    getCustomers(1);
  }

  const getCustomers = async (pageIndex: number, search?: any) => {
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
      const response = await customerActions.getCustomers(param);
      if (response) {
        setDataSourceCustomer(response?.customers);
        setTotal(response?.count)
      }

    } catch (error) {
      messageErrorDefault({ message: "Kiểm tra lại kết nối." })

    }



  }

  const searchProducts = async () => {
    try {
      const values = form.getFieldsValue()
      setDataSearch(values)
      getCustomers(1, values)

    } catch (error) {
      messageErrorDefault({ message: "Kiểm tra lại kết nối." })

    }
  }

  const resetSearch = async () => {
    try {
      form.resetFields()
      setDataSearch({})
      getCustomers(1, {})

    } catch (error) {
      messageErrorDefault({ message: "Kiểm tra lại kết nối." })

    }
  }

  const deleteCustomer = async (id: number) => {
    try {
      await customerActions.deleteCustomer(id);
      messageSuccessDefault({ message: "Xoá khách hàng thành công" })
      getCustomers(1)
    } catch (error) {
      console.log("error", error)
      messageErrorDefault({ message: "Kiểm tra lại kết nối." })

    }

  }

  const add = () => {
    setRowData(undefined)
    setMode(FORM_MODE.NEW)
    setOpenInfo(true)
  }

  const reloadData = () => {
    getCustomers(1)
    setOpenInfo(false)
  }

  return (
    <Content loading={false}>
      <>
        <br />
        <div className="mx-1.5">
          <Typography.Title level={4} >Quản lý khách hàng</Typography.Title>
        </div>

        <CustomerSearchForm
          form={form}
          categorysOption={categorysOption}
          onSearch={searchProducts}
          onReset={resetSearch}
          onInfo={() => add()} />
        <CustomerInfoForm
          data={rowData}
          mode={mode}
          categorysOption={categorysOption}
          open={openInfo}
          reload={reloadData}
          handleCancel={() => setOpenInfo(false)}
        />
        <Table
          columns={CustomerColumns({
            actionXem: (record: Customer) => {
              setMode(FORM_MODE.VIEW)
              setOpenInfo(true)
              setRowData(record)
            },
            actionCapNhat: (record: Customer) => {
              setMode(FORM_MODE.UPDATE)
              setOpenInfo(true)
              setRowData(record)
            },
            actionXoa: (record: Customer) => {
              showConfirm(() => {
                deleteCustomer(record?.customerId || 0)
              });
            },
          })}
          dataSource={dataSourceCustomer}
          pagination={false}
        />
        <div style={{ padding: 5 }}>
          {dataSourceCustomer && (
            <Pagination
              totalItems={total}
              pageSize={pageSize}
              setPageSize={setPageSize}
              pageIndex={pageIndex}
              setPageIndex={getCustomers}
            />
          )}
        </div>
      </>
    </Content>
  )
}

export default CustomerPage
