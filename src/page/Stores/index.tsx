import { Form, Modal, Table, Typography } from 'antd'
import Content from 'layout/Content'
import { Pagination } from 'components/organisms/Pagination';
import { memo, useEffect, useState } from 'react'
import { CategoryColumns } from "./columns";
import StoreSearchForm from './component/StoreSearchForm';
import StoreInfoForm from './component/StoreInfoForm';
import { useStoreActions } from 'actions/store.action';
import { DefaultOptionType } from 'antd/lib/select';
import { FORM_MODE, messageType } from 'utils/Constants';
import { messageErrorDefault, messageSuccessDefault } from 'utils/CommonFc';
import { Store } from 'models/Store.model';
import { cloneDeep } from 'lodash-es';
const { confirm } = Modal;

const StorePage = () => {

  const [form] = Form.useForm()
  const storeActions = useStoreActions();
  const [dataSourceStore, setDataSourceStore] = useState<Store[]>([]);
  const [pageIndex, setPageIndex] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(10)
  const [total, setTotal] = useState(0)
  const [openInfo, setOpenInfo] = useState<boolean>(false)
  const [categorysOption, setcategorysOption] = useState<DefaultOptionType[]>([])
  const [rowData, setRowData] = useState<Store>()
  const [mode, setMode] = useState<number>(1)
  const [dataSearch, setDataSearch] = useState({})

  useEffect(() => {
    init()
  }, [])

  const init = () => {
    getStores(1)
  }

  const getStores = async (pageIndex: number, search?: any) => {
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
      const response = await storeActions.getStores(param);
      if (response) {
        setDataSourceStore(response?.stores);
        setTotal(response.count)
      }

    } catch (error) {
      messageErrorDefault({ message: messageType.CHECK_INTERNET })
    }
  }


  const deleteStore = async (id: number) => {
    try{
      await storeActions.deleteStore(id);
      getStores(1)
      messageSuccessDefault({ message: "Xoá danh mục thành công" })
      
    }catch(error: any){

    }
    
  }

  const add = () => {
    setRowData(undefined)
    setMode(FORM_MODE.NEW)
    setOpenInfo(true)
  }

  const search = async () => {
    try {
      const values = form.getFieldsValue();
      setDataSearch(values);
      getStores(1, values);

    } catch (error) {
      messageErrorDefault({ message: messageType.CHECK_INTERNET })
    }
  }

  const resetSearch = async () => {
    try {
      form.resetFields()
      setDataSearch({})
      getStores(1, {})

    } catch (error) {
      messageErrorDefault({ message: messageType.CHECK_INTERNET })
    }
  }

  const reloadData = () => {
    getStores(1)
    setOpenInfo(false)
  }

  const showConfirm = (record: any) => {
    confirm({
      title: 'Xác nhận.',
      content: 'Bạn chắc chắn muốn xoá danh mục',
      okText: 'Đồng ý',
      cancelText: 'Huỷ',
      onOk() {
        deleteStore(record.storeId)
      }
    });
  };

  return (
    <Content loading={false}>
      <>
        <br />
        <div className="mx-1.5">
          <Typography.Title level={4}>Quản lý cửa hàng</Typography.Title>
        </div>

        <StoreSearchForm
          form={form}
          categorysOption={categorysOption}
          onSearch={search}
          onReset={resetSearch}
          onInfo={() => add()} />
        <StoreInfoForm
          data={rowData}
          mode={mode}
          categorysOption={categorysOption}
          open={openInfo}
          reload={reloadData}
          handleCancel={() => setOpenInfo(false)}
        />
        <Table
          columns={CategoryColumns({
            // actionXem: (record: any) => {
            //   setMode(FORM_MODE.VIEW)
            //   setOpenInfo(true)
            //   setIdSelected(record.id)
            // },
            actionCapNhat: (record: any) => {
              setMode(FORM_MODE.UPDATE)
              setOpenInfo(true)
              setRowData(record)
            },
            actionXoa: (record: any) => {
              showConfirm(record)
            },
          })}
          dataSource={dataSourceStore}
          pagination={false}
        />
        <div style={{ padding: 5 }}>
          {dataSourceStore && (
            <Pagination
              totalItems={total}
              pageSize={pageSize}
              setPageSize={setPageSize}
              pageIndex={pageIndex}
              setPageIndex={getStores}
            />
          )}
        </div>
      </>
    </Content>
  )
}
export default StorePage
