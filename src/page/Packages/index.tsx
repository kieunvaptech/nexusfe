import { Form, Table, Typography } from 'antd'
import Content from 'layout/Content'
import { Pagination } from 'components/organisms/Pagination';
import { memo, useEffect, useState } from 'react'
import { ProductColumns } from "./columns";
import PackageSearchForm from './component/PackageSearchForm';
import { DefaultOptionType } from 'antd/lib/select';
import { FORM_MODE } from 'utils/Constants';
import { messageErrorDefault, messageSuccessDefault, showConfirm } from 'utils/CommonFc';
import { cloneDeep } from 'lodash-es'
import { usePackageActions } from 'actions/package.action';
import PackageInfoForm from './component/PackageInfoForm';
import { Package } from 'models/Package.model';

const PackagePage = () => {
  const [form] = Form.useForm()
  const packageActions = usePackageActions();
  const [dataSource, setDataSource] = useState();
  const [pageIndex, setPageIndex] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(10)
  const [total, setTotal] = useState(0)
  const [openInfo, setOpenInfo] = useState<boolean>(false)
  const [categorysOption, setcategorysOption] = useState<DefaultOptionType[]>([])
  const [rowData, setRowData] = useState<Package>()
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
        size: pageSize,
        query: JSON.stringify(search)
      }
      const packagesResponse = await packageActions.getPackages(param);
      if (packagesResponse) {
        setDataSource(packagesResponse?.packages);
        setTotal(packagesResponse?.count)
      }

    } catch (error) {
      messageErrorDefault({ message: "Kiểm tra lại kết nối." })

    }



  }

  const search = async () => {
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
      getPackages(1, {})

    } catch (error) {
      messageErrorDefault({ message: "Kiểm tra lại kết nối." })

    }
  }

  const deletePackage = async (id: number) => {
    try {
      await packageActions.deletePackage(id);
      messageSuccessDefault({ message: "Xoá gói cước thành công" });
      getPackages(1);      
    } catch (error) {
      console.log("error", error)
      messageErrorDefault({ message: "Kiểm tra lại kết nối." });
    }

  }

  const add = () => {
    setRowData(undefined);
    setMode(FORM_MODE.NEW);
    setOpenInfo(true);
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
          <Typography.Title level={4} >Quản lý gói cước</Typography.Title>
        </div>

        <PackageSearchForm
          form={form}
          categorysOption={categorysOption}
          onSearch={search}
          onReset={resetSearch}
          onInfo={() => add()} />
        <PackageInfoForm
          data={rowData}
          mode={mode}
          categorysOption={categorysOption}
          open={openInfo}
          reload={reloadData}
          handleCancel={() => setOpenInfo(false)}
        />
        <Table
          columns={ProductColumns({
            actionXem: (record: Package) => {
              setMode(FORM_MODE.VIEW)
              setOpenInfo(true)
              setRowData(record)
            },
            actionCapNhat: (record: Package) => {
              setMode(FORM_MODE.UPDATE)
              setOpenInfo(true)
              setRowData(record)
            },
            actionXoa: (record: Package) => {
              showConfirm(()=>{
                deletePackage(record?.packageId || 0)
              });
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
              setPageIndex={getPackages}
            />
          )}
        </div>
      </>
    </Content>
  )
}

export default PackagePage
