import { Form, Table, Typography, Modal } from 'antd';
import Content from 'layout/Content';
import { Pagination } from 'components/organisms/Pagination';
import { memo, useEffect, useState } from 'react';
import { ProductColumns } from "./columns";
import EmployeeSearchForm from './component/EmployeeSearchForm';
import { DefaultOptionType } from 'antd/lib/select';
import { FORM_MODE } from 'utils/Constants';
import { messageErrorDefault, messageSuccessDefault } from 'utils/CommonFc';
import { cloneDeep } from 'lodash-es';
import { useEmployeeActions } from 'actions/employee.action';
import { Employee } from 'models/Employee.model';
import EmployeeInfoForm from './component/EmployeeInfoForm';
const { confirm } = Modal;

const EmployeePage = () => {
  const [form] = Form.useForm()
  const employeeActions = useEmployeeActions();
  const [dataSourceProduct, setDataSourceProduct] = useState();
  const [pageIndex, setPageIndex] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(10)
  const [total, setTotal] = useState(0)
  const [openInfo, setOpenInfo] = useState<boolean>(false)
  const [categorysOption, setcategorysOption] = useState<DefaultOptionType[]>([])
  const [rowData, setRowData] = useState<Employee>()
  const [mode, setMode] = useState<number>(1)
  const [dataSearch, setDataSearch] = useState({})

  useEffect(() => {
    init()
  }, [])

  const init = () => {
    getEmployees(1)
  }

  const getEmployees = async (pageIndex: number, search?: any) => {
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
      const employeesResponse = await employeeActions.getEmployees(param);
      if (employeesResponse) {
        setDataSourceProduct(employeesResponse);
        // setTotal(employeesResponse.totalPages * pageSize)
      }

    } catch (error) {
      messageErrorDefault({ message: "Kiểm tra lại kết nối." })

    }



  }

  const searchProducts = async () => {
    try {
      const values = form.getFieldsValue()
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
      getEmployees(1,{})

    } catch (error) {
      messageErrorDefault({ message: "Kiểm tra lại kết nối." })

    }
  }

  const showConfirm = (record: Employee) => {
    confirm({
      title: 'Confirm',
      content: 'Do you want to delete?',
      okText: 'Yes',
      cancelText: 'No',
      onOk() {
        deleteEmployee(record?.employeeId || 0)
      }
    });
  };

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
    <Content loading={false}>
      <>
        <br />
        <div className="mx-1.5">
          <Typography.Title level={4} >Quản lý nhân viên</Typography.Title>
        </div>

        <EmployeeSearchForm
          form={form}
          categorysOption={categorysOption}
          onSearch={searchProducts}
          onReset={resetSearch}
          onInfo={() => add()} />
        <EmployeeInfoForm
          data={rowData}
          mode={mode}
          categorysOption={categorysOption}
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
              showConfirm(record)
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
              setPageIndex={getEmployees}
            />
          )}
        </div>
      </>
    </Content>
  )
}

export default EmployeePage
