import { Form, Table, Typography, Modal } from 'antd'
import Content from 'layout/Content'
import { Pagination } from 'components/organisms/Pagination';
import { memo, useEffect, useState } from 'react'
import { useSupplierActions } from "../../actions/supplier.action";
import { ProductColumns } from "./columns";
import SupplierSearchForm from './component/SupplierSearchForm';
import SupplierInfoForm from './component/SupplierInfoForm';
import { DefaultOptionType } from 'antd/lib/select';
import { FORM_MODE, messageType } from 'utils/Constants';
import { messageErrorDefault, messageSuccessDefault, showConfirm } from 'utils/CommonFc';
import { cloneDeep } from 'lodash-es'
import { Supplier } from 'models/Supplier.model';
const { confirm } = Modal;

const SupplierPage = () => {
  const [form] = Form.useForm()
  const supplierActions = useSupplierActions();
  const [dataSourceProduct, setDataSourceProduct] = useState<Supplier[]>([]);
  const [pageIndex, setPageIndex] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(10)
  const [total, setTotal] = useState(0)
  const [openInfo, setOpenInfo] = useState<boolean>(false)
  const [categorysOption, setcategorysOption] = useState<DefaultOptionType[]>([])
  const [rowData, setRowData] = useState<Supplier>()
  const [mode, setMode] = useState<number>(1)
  const [dataSearch, setDataSearch] = useState({})
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    init()
  }, [])

  const init = () => {
    getSuppliers(1)
  }


  const getSuppliers = async (pageIndex: number, search?: any) => {
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
      const response: any = await supplierActions.getSuppliers(param);
      if (response) {
        setDataSourceProduct(response?.suppliers);
        setTotal(response?.count)
      }
      setLoading(false)
    } catch (error) {
      messageErrorDefault({ message: messageType.CHECK_INTERNET })
    }
  }

  const search = async () => {
    try {
      const values = form.getFieldsValue();
      setDataSearch(values);
      getSuppliers(1, values);

    } catch (error) {
      messageErrorDefault({ message: messageType.CHECK_INTERNET })
    }
  }

  const resetSearch = async () => {
    try {
      form.resetFields()
      setDataSearch({})
      getSuppliers(1, {})

    } catch (error) {
      messageErrorDefault({ message: messageType.CHECK_INTERNET })
    }
  }

  const deleteSupplier = async (id: number) => {
    try {
      await supplierActions.deleteSupplier(id);
      messageSuccessDefault({ message: "Xoá nhà cung cấp thành công" });
      getSuppliers(1);
    } catch (error) {
      messageErrorDefault({ message: messageType.CHECK_INTERNET })
    }

  }

  const add = () => {
    setRowData(undefined)
    setMode(FORM_MODE.NEW)
    setOpenInfo(true)
  }

  const reloadData = () => {
    getSuppliers(1)
    setOpenInfo(false)
  }

  return (
    <Content loading={loading}>
      <>
        <br />
        <div className="mx-1.5">
          <Typography.Title level={4} >Quản lý nhà cung cấp</Typography.Title>
        </div>

        <SupplierSearchForm
          form={form}
          categorysOption={categorysOption}
          onSearch={search}
          onReset={resetSearch}
          onInfo={() => add()} />
        <SupplierInfoForm
          data={rowData}
          mode={mode}
          categorysOption={categorysOption}
          open={openInfo}
          reload={reloadData}
          handleCancel={() => setOpenInfo(false)}
        />
        <Table
          columns={ProductColumns({
            actionXem: (record: Supplier) => {
              setMode(FORM_MODE.VIEW)
              setOpenInfo(true)
              setRowData(record)
            },
            actionCapNhat: (record: Supplier) => {
              setMode(FORM_MODE.UPDATE)
              setOpenInfo(true)
              setRowData(record)
            },
            actionXoa: (record: Supplier) => {
              showConfirm(()=>{
                deleteSupplier(record?.supplierId || 0)
              });
            },
          })}
          dataSource={dataSourceProduct}
          pagination={false}
        />
        <div style={{ padding: 5 }}>
          {dataSourceProduct && (
            <Pagination
              totalItems={total}
              pageSize={pageSize}
              setPageSize={setPageSize}
              pageIndex={pageIndex}
              setPageIndex={getSuppliers}
            />
          )}
        </div>
      </>
    </Content>
  )
}

export default SupplierPage
