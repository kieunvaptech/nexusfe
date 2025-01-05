import { Form, Table, Typography } from 'antd'
import Content from 'layout/Content'
import { Pagination } from 'components/organisms/Pagination';
import { memo, useEffect, useState } from 'react'
import { ProductColumns } from "./columns";
import ProductSearchForm from './component/ProductSearchForm';
import { DefaultOptionType } from 'antd/lib/select';
import { FORM_MODE } from 'utils/Constants';
import { messageErrorDefault, messageSuccessDefault } from 'utils/CommonFc';
import { cloneDeep } from 'lodash-es'

const ConnectionPage = () => {
  const [form] = Form.useForm()
//   const productActions = useProductActions();
//   const categoryActions = useCategoryActions();
  const [dataSourceProduct, setDataSourceProduct] = useState();
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
    getCategorys()
    getProducts(1)
  }

  const getCategorys = async () => {
    try {
      const categorysResponse = await categoryActions.getCategories();
      if (categorysResponse) {
        const options: DefaultOptionType[] = categorysResponse.map((category: Category) => ({
          label: category.name,
          value: category.id
        }))
        setcategorysOption(options)
      }

    } catch (error) {
      messageErrorDefault({ message: "Kiểm tra lại kết nối." })

    }
  }



  const getProducts = async (pageIndex: number, search?: any) => {
    try {
      if (!search) {
        search = cloneDeep(dataSearch)
      }
      setPageIndex(pageIndex)
      const param = {
        page: pageIndex,
        limit: pageSize,
        ...search
      }
      const productsResponse = await productActions.getAllProduct(param);
      if (productsResponse) {
        setDataSourceProduct(productsResponse.products);
        setTotal(productsResponse.totalPages * pageSize)
      }

    } catch (error) {
      messageErrorDefault({ message: "Kiểm tra lại kết nối." })

    }



  }

  const searchProducts = async () => {
    try {
      const values = form.getFieldsValue()
      setDataSearch(values)
      getProducts(1, values)

    } catch (error) {
      messageErrorDefault({ message: "Kiểm tra lại kết nối." })

    }
  }

  const resetSearch = async () => {
    try {
      form.resetFields()
      setDataSearch({})
      getProducts(1,{})

    } catch (error) {
      messageErrorDefault({ message: "Kiểm tra lại kết nối." })

    }
  }

  const deleteProduct = async (id: number) => {
    try {
      const response = await productActions.deleteProduct(id);
      if (response) {
        getProducts(1)
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
    getProducts(1)
    setOpenInfo(false)
  }

  return (
    <Content>
      <>
        <br />
        <div className="mx-1.5">
          <Typography.Title level={4} >Equipments Management</Typography.Title>
        </div>

        {/* <ProductSearchForm
          form={form}
          categorysOption={categorysOption}
          onSearch={searchProducts}
          onReset={resetSearch}
          onInfo={() => add()} />
        <ProductInfoForm
          id={idSelected}
          mode={mode}
          categorysOption={categorysOption}
          open={openInfo}
          reload={reloadData}
          handleCancel={() => setOpenInfo(false)}
        />
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
              deleteProduct(record.id)
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
              setPageIndex={getProducts}
            />
          )}
        </div> */}
      </>
    </Content>
  )
}

export default ConnectionPage
