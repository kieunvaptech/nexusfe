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
import { usePackageActions } from 'actions/package.action';

const PackagePage = () => {
  const [form] = Form.useForm()
  const packageActions = usePackageActions();
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
    getPackages(1)
  }

  const getPackages = async (pageIndex: number, search?: any) => {
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
      const packagesResponse = await packageActions.getPackages(param);
      if (packagesResponse) {
        setDataSourceProduct(packagesResponse);
        // setTotal(productsResponse.totalPages * pageSize)
      }

    } catch (error) {
      messageErrorDefault({ message: "Kiểm tra lại kết nối." })

    }



  }

  const searchProducts = async () => {
    try {
      const values = form.getFieldsValue()
      setDataSearch(values)
      getPackages(1, values)

    } catch (error) {
      messageErrorDefault({ message: "Kiểm tra lại kết nối." })

    }
  }

  const resetSearch = async () => {
    try {
      form.resetFields()
      setDataSearch({})
      getPackages(1,{})

    } catch (error) {
      messageErrorDefault({ message: "Kiểm tra lại kết nối." })

    }
  }

  const deleteProduct = async (id: number) => {
    try {
      const response = await packageActions.deletePackage(id);
      if (response) {
        getPackages(1)
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
    getPackages(1)
    setOpenInfo(false)
  }

  return (
    <Content loading={false}>
      <>
        <br />
        <div className="mx-1.5">
          <Typography.Title level={4} >Plans Management</Typography.Title>
        </div>

        <ProductSearchForm
          form={form}
          categorysOption={categorysOption}
          onSearch={searchProducts}
          onReset={resetSearch}
          onInfo={() => add()} />
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
              setPageIndex={getPackages}
            />
          )}
        </div>
      </>
    </Content>
  )
}

export default PackagePage
