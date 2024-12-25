import { Form, Modal, Table, Typography } from 'antd'
import Content from 'layout/Content'
import { Pagination } from 'components/organisms/Pagination';
import { memo, useEffect, useState } from 'react'
import { useProductActions } from "../../actions/product.action";
import { CategoryColumns } from "./columns";
import CategorySearchForm from './component/CategorySearchForm';
import CategoryInfoForm from './component/CategoryInfoForm';
import { useCategoryActions } from 'actions/category.action';
import { DefaultOptionType } from 'antd/lib/select';
import { Category } from 'models/Category.model';
import { FORM_MODE } from 'utils/Constants';
import { messageSuccessDefault } from 'utils/CommonFc';
const { confirm } = Modal;

const StorePage = () => {

  const [form] = Form.useForm()
  const categoryActions = useCategoryActions();
  const [dataSourceProduct, setDataSourceProduct] = useState();
  const [pageIndex, setPageIndex] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(10)
  const [total, setTotal] = useState(0)
  const [openInfo, setOpenInfo] = useState<boolean>(false)
  const [categorysOption, setcategorysOption] = useState<DefaultOptionType[]>([])
  const [rowData, setRowData] = useState<any>(null)
  const [mode, setMode] = useState<number>(1)

  useEffect(() => {
    init()
  }, [])

  const init = () => {
    getCategorys()
    // getProducts(1)
  }

  const getCategorys = async () => {
    const categorysResponse: any = await categoryActions.getCategories();
    console.log("categorysResponse", categorysResponse);
    if (categorysResponse) {
      setDataSourceProduct(categorysResponse);
      const options: DefaultOptionType[] = categorysResponse.map((category: Category) => ({
        label: category.name,
        value: category.id
      }))
      setcategorysOption(options)
    }


  }


  const deleteCategory = async (id: number) => {
    try{
      const response = await categoryActions.deleteCategory(id);
      if(response){
        getCategorys()
        messageSuccessDefault({ message: "Xoá danh mục thành công" })
      }
      
    }catch(error: any){

    }
    
  }

  const add = () => {
    setMode(FORM_MODE.NEW)
    setOpenInfo(true)
  }

  const reloadData = () => {
    getCategorys()
    setOpenInfo(false)
  }

  const showConfirm = (record: any) => {
    confirm({
      title: 'Xác nhận.',
      content: 'Bạn chắc chắn muốn xoá danh mục',
      okText: 'Đồng ý',
      cancelText: 'Huỷ',
      onOk() {
        deleteCategory(record.id)
      }
    });
  };

  return (
    <Content>
      <>
        <br />
        <div className="mx-1.5">
          <Typography.Title level={4}>Stores Management</Typography.Title>
        </div>

        <CategorySearchForm
          form={form}
          categorysOption={categorysOption}
          onSearch={() => getCategorys()}
          onInfo={() => add()} />
        <CategoryInfoForm
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
