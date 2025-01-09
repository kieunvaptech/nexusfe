import { Form, Table, Typography, Modal } from 'antd'
import Content from 'layout/Content'
import { Pagination } from 'components/organisms/Pagination';
import { memo, useEffect, useState } from 'react'
import { useSupplierActions } from "../../actions/supplier.action";
import { ProductColumns } from "./columns";
import ConnectsSearchForm from './component/ConnectsSearchForm';
import { DefaultOptionType } from 'antd/lib/select';
import { FORM_MODE, messageType } from 'utils/Constants';
import { messageErrorDefault, messageSuccessDefault } from 'utils/CommonFc';
import { cloneDeep } from 'lodash-es'
import { usePaymentActions } from 'actions/payment.action';
import { Payment } from 'models/Payment.model';
import { useSelector } from 'react-redux';
import { RootState } from 'store';
import { useConnectionActions } from 'actions/connection.action';
const { confirm } = Modal;

const ConnectionsPage = () => {
  const [form] = Form.useForm();
  const connectionActions = useConnectionActions();
  const userInfo = useSelector((state: RootState) => state.userReducer.userInfo);
  const [dataSource, setDataSource] = useState();
  const [pageIndex, setPageIndex] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [total, setTotal] = useState(0);
  const [openInfo, setOpenInfo] = useState<boolean>(false);
  const [categorysOption, setcategorysOption] = useState<DefaultOptionType[]>([]);
  const [idSelected, setIdSelected] = useState<number | null>(null);
  const [mode, setMode] = useState<number>(1);
  const [dataSearch, setDataSearch] = useState({});
  const [loading,setloading] = useState(true);

  useEffect(() => {
    init()
  }, [])

  const init = async () => {
    await getConnections(1);
    setloading(false);
  }

  const getConnections = async (pageIndex: number, search?: any) => {
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
        const response = await connectionActions.getConnections(param);
        if (response) {
          setloading(false)
          setDataSource(response?.connections);
          setTotal(response.count)
        }
  
      } catch (error) {
        messageErrorDefault({ message: messageType.CHECK_INTERNET })
      }
    }

  const searchProducts = async () => {
    try {
      setloading(true)
      const values = form.getFieldsValue()
      setDataSearch(values)
      getConnections(1, values)

    } catch (error) {
      messageErrorDefault({ message: "Kiểm tra lại kết nối." })

    }
  }

  const resetSearch = async () => {
    try {
      form.resetFields()
      setDataSearch({})
      getConnections(1,{})

    } catch (error) {
      messageErrorDefault({ message: "Kiểm tra lại kết nối." })

    }
  }

  
  const reloadData = () => {
    getConnections(1)
    setOpenInfo(false)
  }

  return (
    <Content loading={loading}>
      <>
        <br />
        <div className="mx-1.5">
          <Typography.Title level={4} >Quản lý kết nối</Typography.Title>
        </div>

        <ConnectsSearchForm
          form={form}
          onSearch={searchProducts}
          onReset={resetSearch}
           />
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
            RoleId: userInfo?.RoleId,
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
            actionXoa: (record: Payment) => {
              
            },
          })}
          dataSource={dataSource}
          pagination={false}
        />
        <div style={{ padding: 5 }}>
          {dataSource && (
            <Pagination
              totalItems={total}
              pageSize={pageSize}
              setPageSize={setPageSize}
              pageIndex={pageIndex}
              setPageIndex={getConnections}
            />
          )}
        </div>
      </>
    </Content>
  )
}

export default ConnectionsPage
