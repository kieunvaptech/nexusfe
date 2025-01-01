import { Form, Table, Typography, Modal } from 'antd'
import Content from 'layout/Content'
import { Pagination } from 'components/organisms/Pagination';
import { memo, useEffect, useState } from 'react';
import { ProductColumns } from "./columns";
import ProductSearchForm from './component/ProductSearchForm';
import DeviceInfoForm from './component/DeviceInfoForm';
import { DefaultOptionType } from 'antd/lib/select';
import { FORM_MODE } from 'utils/Constants';
import { messageErrorDefault, messageSuccessDefault, showConfirm } from 'utils/CommonFc';
import { cloneDeep } from 'lodash-es'
import { useDeviceActions } from 'actions/device.action';
import { useSupplierActions } from 'actions/supplier.action';
import { Device } from 'models/Device.model';
import { Supplier } from 'models/Supplier.model';
import { useSelector } from 'react-redux';
import { RootState } from 'store';
import { useStoreActions } from 'actions/store.action';
import { Employee } from 'models/Employee.model';
import { Store } from 'models/Store.model';
// const { confirm } = Modal;

const DevicePage = () => {
  const [form] = Form.useForm()
  const deviceActions = useDeviceActions();
  const supplierActions = useSupplierActions();
  const storeActions = useStoreActions();
  const [dataSourceDevice, setDataSourceDevice] = useState();
  const [pageIndex, setPageIndex] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(10)
  const [total, setTotal] = useState(0)
  const [openInfo, setOpenInfo] = useState<boolean>(false)
  const [suppliersOption, setSuppliersOption] = useState<DefaultOptionType[]>([])
  const [rowData, setRowData] = useState<Device>()
  const [store, setStore] = useState<Store>()
  const [mode, setMode] = useState<number>(1)
  const [dataSearch, setDataSearch] = useState({})
  const userInfo = useSelector((state: RootState) => state.userReducer.userInfo);
  const [loading, setLoading] = useState<boolean>(true)


  useEffect(() => {
    console.log("userInfo", userInfo)
    init()
  }, [])

  const init = async () => {
    await getSuppliers();
    await getStore();
    await getDevices(1);
    setLoading(false);
  }


  const getSuppliers = async () => {
    try {
      const response = await supplierActions.getSuppliers();
      if (response) {
        const options: DefaultOptionType[] = response.map((supplier: Supplier) => ({
          label: supplier.supplierName,
          value: supplier.supplierId
        }))
        setSuppliersOption(options)
      }

    } catch (error) {
      messageErrorDefault({ message: "Kiểm tra lại kết nối." })

    }
  }

  const getStore = async () => {
    try {
      const response = await storeActions.detailStore(userInfo?.EmployeeId || 0);
      if (response) {
        setStore(response)
      }

    } catch (error) {
      messageErrorDefault({ message: "Kiểm tra lại kết nối." })

    }
  }

  const getDevices = async (pageIndex: number, search?: any) => {
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
      const devicesResponse = await deviceActions.getDevices(param);
      if (devicesResponse) {
        setDataSourceDevice(devicesResponse);
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
      getDevices(1, values)

    } catch (error) {
      messageErrorDefault({ message: "Kiểm tra lại kết nối." })

    }
  }

  const resetSearch = async () => {
    try {
      form.resetFields()
      setDataSearch({})
      getDevices(1, {})

    } catch (error) {
      messageErrorDefault({ message: "Kiểm tra lại kết nối." })

    }
  }
  
  const deleteDevice = async (id: number) => {
    try {
      const response = await deviceActions.deleteDevice(id);
      getDevices(1)
      messageSuccessDefault({ message: "Xoá sản phẩm thành công" })
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
    getDevices(1)
    setOpenInfo(false)
  }

  return (
    <Content loading={loading}>
      <>
        <br />
        <div className="mx-1.5">
          <Typography.Title level={4} >Quản lý thiết bị</Typography.Title>
        </div>

        <ProductSearchForm
          form={form}
          categorysOption={suppliersOption}
          onSearch={searchProducts}
          onReset={resetSearch}
          onInfo={() => add()} />
        <DeviceInfoForm
          store={store}
          device={rowData}
          mode={mode}
          suppliersOption={suppliersOption}
          open={openInfo}
          reload={reloadData}
          handleCancel={() => setOpenInfo(false)}
        />
        <Table
          columns={ProductColumns({
            actionXem: (record: Device) => {
              setMode(FORM_MODE.VIEW);
              setOpenInfo(true);
              setRowData(record);
            },
            actionCapNhat: (record: Device) => {
              setMode(FORM_MODE.UPDATE);
              setOpenInfo(true);
              setRowData(record);
            },
            actionXoa: (record: Device) => {
              showConfirm(deleteDevice(record?.deviceId || 0));
            },
          })}
          dataSource={dataSourceDevice}
          pagination={false}
        />
        <div style={{ padding: 5 }}>
          {dataSourceDevice && (
            <Pagination
              totalItems={total}
              pageSize={pageSize}
              setPageSize={setPageSize}
              pageIndex={pageIndex}
              setPageIndex={getDevices}
            />
          )}
        </div>
      </>
    </Content>
  )
}

export default DevicePage
