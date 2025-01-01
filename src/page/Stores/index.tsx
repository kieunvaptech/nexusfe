import { Form, Modal, Table, Typography } from 'antd'
import Content from 'layout/Content'
import { Pagination } from 'components/organisms/Pagination';
import { memo, useEffect, useState } from 'react'
import { CategoryColumns } from "./columns";
import CategorySearchForm from './component/CategorySearchForm';
import StoreInfoForm from './component/StoreInfoForm';
import { useStoreActions } from 'actions/store.action';
import { DefaultOptionType } from 'antd/lib/select';
import { FORM_MODE } from 'utils/Constants';
import { messageSuccessDefault } from 'utils/CommonFc';
import { Store } from 'models/Store.model';
const { confirm } = Modal;

const StorePage = () => {

  const [form] = Form.useForm()
  const storeActions = useStoreActions();
  const [dataSourceProduct, setDataSourceProduct] = useState<Store[]>([]);
  const [pageIndex, setPageIndex] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(10)
  const [total, setTotal] = useState(0)
  const [openInfo, setOpenInfo] = useState<boolean>(false)
  const [categorysOption, setcategorysOption] = useState<DefaultOptionType[]>([])
  const [rowData, setRowData] = useState<Store>()
  const [mode, setMode] = useState<number>(1)

  useEffect(() => {
    init()
  }, [])

  const init = () => {
    getStores()
  }

  const getStores = async () => {
    const response: Store[] = await storeActions.getStores();
    console.log("getStores", response);
    if (response) {
      setDataSourceProduct(response);
      // const options: DefaultOptionType[] = response.map((store: Store) => ({
      //   label: store.storeName,
      //   value: category.s
      // }))
      // setcategorysOption(options)
    }


  }


  const deleteStore = async (id: number) => {
    try{
      const response = await storeActions.deleteStore(id);
      if(response){
        getStores()
        messageSuccessDefault({ message: "Xoá danh mục thành công" })
      }
      
    }catch(error: any){

    }
    
  }

  const add = () => {
    setRowData(undefined)
    setMode(FORM_MODE.NEW)
    setOpenInfo(true)
  }

  const reloadData = () => {
    getStores()
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
          <Typography.Title level={4}>Stores Management</Typography.Title>
        </div>

        <CategorySearchForm
          form={form}
          categorysOption={categorysOption}
          onSearch={() => getStores()}
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
          dataSource={dataSourceProduct}
          pagination={false}
        />
        {/* <div style={{ padding: 5 }}>
          {dataSourceProduct && (
            <Pagination
              totalItems={total}
              pageSize={pageSize}
              setPageSize={setPageSize}
              pageIndex={pageIndex}
              setPageIndex={getCategorys}
            />
          )}
        </div> */}
      </>
    </Content>
  )
}
export default StorePage
