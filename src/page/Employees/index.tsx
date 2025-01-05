import { Form, Table, Typography, Modal } from 'antd';
import Content from 'layout/Content';
import { Pagination } from 'components/organisms/Pagination';
import { memo, useEffect, useState } from 'react';
import { ProductColumns } from "./columns";
import EmployeeSearchForm from './component/EmployeeSearchForm';
import { DefaultOptionType } from 'antd/lib/select';
import { FORM_MODE, ROLE } from 'utils/Constants';
import { messageErrorDefault, messageSuccessDefault, showConfirm } from 'utils/CommonFc';
import { cloneDeep } from 'lodash-es';
import { useEmployeeActions } from 'actions/employee.action';
import { Employee } from 'models/Employee.model';
import EmployeeInfoForm from './component/EmployeeInfoForm';
import { useStoreActions } from 'actions/store.action';
import { Store } from 'models/Store.model';
const { confirm } = Modal;

const EmployeePage = () => {
  const [form] = Form.useForm()
  const employeeActions = useEmployeeActions();
  const storeActions = useStoreActions();
  const [dataSource, setDataSource] = useState();
  const [pageIndex, setPageIndex] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(10)
  const [total, setTotal] = useState(0)
  const [openInfo, setOpenInfo] = useState<boolean>(false)
  const [categorysOption, setcategorysOption] = useState<DefaultOptionType[]>([])
  const [storesOption, setStoresOption] = useState<DefaultOptionType[]>([])
  const [rolesOption, setRolesOption] = useState<DefaultOptionType[]>([])
  const [rowData, setRowData] = useState<Employee>()
  const [mode, setMode] = useState<number>(1)
  const [dataSearch, setDataSearch] = useState({})
  const [loading,setLoading] = useState<boolean>(true)

  useEffect(() => {
    init()
  }, [])

  const init = () => {
    const options: DefaultOptionType[] = ROLE.filter((_: string, i: number) => i > 1).map((role: string, index: number) => {
      return {
        label: role,
        value: index+2
      }
    })
    console.log('options', options)
    setRolesOption(options);
    getEmployees(1);
    getStores();
  }

  const getEmployees = async (pageIndex: number, search?: any) => {
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
      const employeesResponse = await employeeActions.getEmployees(param);
      if (employeesResponse) {
        setDataSource(employeesResponse?.users);
        setTotal(employeesResponse?.count);
      }
      setLoading(false);
    } catch (error) {
      messageErrorDefault({ message: "Kiểm tra lại kết nối." })

    }
  }

  const getStores = async () => {
    try {
      const param = {
        page: 0,
        size: pageSize,
      }
      const response = await storeActions.getStores(param);
      if (response) {
        const options: DefaultOptionType[] = response.map((store: Store) => ({
          label: store.storeName,
          value: store.storeId
        }))
        setStoresOption(options)
      }

    } catch (error) {
      messageErrorDefault({ message: "Kiểm tra lại kết nối." })
    }
  }

  const search = async () => {
    try {
      const values: any = form.getFieldsValue();
      if(values.PhoneNumber){
        values.PhoneNumber = values.PhoneNumber.toString();
      }
      setDataSearch(values)
      getEmployees(1, values)

    } catch (error) {
      messageErrorDefault({ message: "Kiểm tra lại kết nối." })

    }
  }

  const resetSearch = async () => {
    try {
      form.resetFields()
      setDataSearch({})
      getEmployees(1, {})

    } catch (error) {
      messageErrorDefault({ message: "Kiểm tra lại kết nối." })

    }
  }

  const deleteEmployee = async (id: number) => {
    try {
      const response = await employeeActions.deleteEmployee(id);
      if (response) {
        getEmployees(1)
        messageSuccessDefault({ message: "Xoá sản phẩm thành công" })
      }

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
    getEmployees(1)
    setOpenInfo(false)
  }

  return (
    <Content loading={loading}>
      <>
        <br />
        <div className="mx-1.5">
          <Typography.Title level={4} >Quản lý nhân viên</Typography.Title>
        </div>

        <EmployeeSearchForm
          form={form}
          categorysOption={categorysOption}
          onSearch={search}
          onReset={resetSearch}
          onInfo={() => add()} />
        <EmployeeInfoForm
          data={rowData}
          mode={mode}
          categorysOption={categorysOption}
          storesOption={storesOption}
          rolesOption={rolesOption}
          open={openInfo}
          reload={reloadData}
          handleCancel={() => setOpenInfo(false)}
        />
        <Table
          columns={ProductColumns({
            actionXem: (record: Employee) => {
              setMode(FORM_MODE.VIEW)
              setOpenInfo(true)
              setRowData(record)
            },
            actionCapNhat: (record: Employee) => {
              setMode(FORM_MODE.UPDATE)
              setOpenInfo(true)
              setRowData(record)
            },
            actionXoa: (record: Employee) => {
              showConfirm(()=>{
                deleteEmployee(record?.employeeId || 0)
              })
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
              setPageIndex={getEmployees}
            />
          )}
        </div>
      </>
    </Content>
  )
}

export default EmployeePage
