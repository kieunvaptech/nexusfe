// import { useOrderActions } from 'actions/package.action'
import { useCustomerActions } from 'actions/customer.action'
import { useDeviceActions } from 'actions/device.action'
import { useOrderActions } from 'actions/order.action'
import { usePackageActions } from 'actions/package.action'
import {
  Button,
  Col,
  Form,
  Input,
  InputNumber,
  Modal,
  ModalProps,
  Row,
  Select,
  Table,
  Typography
} from 'antd'
import TextArea from 'antd/lib/input/TextArea'
import { DefaultOptionType } from 'antd/lib/select'
import { Customer } from 'models/Customer.model'
import { Device } from 'models/Device.model'
import { Employee } from 'models/Employee.model'
import { Package } from 'models/Package.model'
import React, { memo, useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { RootState } from 'store'
import { messageErrorDefault, messageSuccessDefault } from 'utils/CommonFc'
import { FORM_MODE } from 'utils/Constants'

interface FormProps extends ModalProps {
  handleCancel: () => void
  data?: any;
  handleAdd: (data: any) => void
  mode: number
}

const OrderDetailForm: React.FC<FormProps> = ({
  handleCancel,
  data,
  handleAdd,
  mode,
  ...props
}) => {
  const [form] = Form.useForm();
  const userInfo = useSelector((state: RootState) => state.userReducer.userInfo);

  const packageActions = usePackageActions();
  const deviceActions = useDeviceActions();
  const [packages, setPackages] = useState<Package[]>([]);
  const [packageData, setPackageData] = useState<Package>();
  const [packagesOption, setPackagesOption] = useState<DefaultOptionType[]>([]);
  const [devices, setDevices] = useState<Device[]>([]);
  const [deviceData, setDeviceData] = useState<Device>();
  const [devicesOption, setDevicesOption] = useState<DefaultOptionType[]>([]);

  useEffect(() => {
    form.resetFields();
    if (props.open) {
      init()
    }
    return () => {
      form.resetFields();
    }
  }, [props.open])

  const init = async () => {
    console.log("userInfo", userInfo, data)
    await getPackages();
    await getDevices();
    if (data) {
      form.setFieldsValue(data);
      setPackageData(data?.package);
      setDeviceData(data?.device);
    }
  }

  const getPackages = async () => {
    try {
      const param = {
        page: 0,
        size: 10,
      }
      const packagesResponse = await packageActions.getPackages(param);
      if (packagesResponse) {
        setPackages(packagesResponse);
        const options: DefaultOptionType[] = packagesResponse.map((pk: Package) => ({
          label: pk.packageName,
          value: pk.packageId
        }));
        setPackagesOption(options);
      }

    } catch (error) {
      messageErrorDefault({ message: "Kiểm tra lại kết nối." })

    }



  }

  const onChangePackage = (value: number) => {
    const packageSelected = packages.find((pk: Package) => pk?.packageId == value);
    if (packageSelected) {
      setPackageData(packageSelected);
      form.setFieldsValue({
        price: packageSelected?.price,
        securityDeposit: packageSelected?.securityDeposit,
        description: packageSelected?.description
      });
    }
  }

  const getDevices = async () => {
    try {
      const search = {
        StoreId: userInfo?.StoreId
      }
      const param = {
        page: 0,
        size: 10,
        query: JSON.stringify(search)
      }
      const devicesResponse = await deviceActions.getDevices(param);
      if (devicesResponse) {
        setDevices(devicesResponse)
        const options: DefaultOptionType[] = devicesResponse.map((device: Device) => ({
          label: device.deviceName,
          value: device.deviceId
        }));
        setDevicesOption(options);
      }

    } catch (error) {
      messageErrorDefault({ message: "Kiểm tra lại kết nối." })

    }
  }

  const onChangeDevice = (value: number) => {
    const deviceSelected = devices.find((device: Device) => device?.deviceId == value);
    if (deviceSelected) {
      setDeviceData(deviceSelected);
      form.setFieldsValue({
        deviceId: deviceSelected?.deviceId,
        deviceName: deviceSelected?.deviceName
      });
    }
  }

  const handleSubmit = async () => {
    if (!form) return
    try {

      const values = await form.validateFields()
      if (values) {
        const data = {
          ...packageData,
          ...deviceData,
          ...values
        }
        console.log("handleSubmit", values, packageData, deviceData);
        handleAdd(data);
      }
    } catch (errInfo) {

    }
  }

  const getTitle = () => {
    if (mode === FORM_MODE.NEW) return 'Thêm mới gói cước'
    if (mode === FORM_MODE.UPDATE) return 'Cập nhật đơn hàng'
    if (mode === FORM_MODE.VIEW) return 'Chi tiết đơn hàng'
  }

  return (
    <Modal
      title={getTitle()}
      centered
      footer={[
        <div className="flex-center w-full gap-3">
          {
            mode !== FORM_MODE.VIEW && <Button
              onClick={() => {
                handleSubmit()
              }}
              className="w-[144px] min-h-[40px]"
            >
              {mode === FORM_MODE.NEW ? 'Thêm' : 'Cập nhật'}
            </Button>
          }
          <Button
            onClick={() => {
              handleCancel()
            }}
            className="w-[144px] min-h-[40px]"
          >
            Thoát
          </Button>
        </div>,
      ]}
      onCancel={handleCancel}
      className="!w-[95%]"
      {...props}
    >
      <Form form={form} labelWrap disabled={mode === FORM_MODE.VIEW} labelAlign="right">
        <Typography.Title level={4} >Gói cước</Typography.Title>
        <Row className="justify-between">
          <Col span={11}>
            <Form.Item
              label="Gói cước"
              name="packageId"
              rules={[{ required: true, message: 'Không được để trống' }]}
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 16 }}
            >
              <Select options={packagesOption} disabled={mode === FORM_MODE.VIEW} onChange={onChangePackage} />
            </Form.Item>
          </Col>
          <Col span={11}>
            <Form.Item
              label="Giá"
              name="price"
              // rules={[
              //   {
              //     required: true,
              //     message: 'Số điện thoại không được để trống.',
              //   }
              // ]}
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 16 }}
            >
              <Input disabled />
            </Form.Item>
          </Col>
        </Row>
        <Row className="justify-between">
          <Col span={11}>
            <Form.Item
              label="Tiền cọc"
              name="securityDeposit"
              // rules={[{ required: true, message: 'Không được để trống' }]}
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 16 }}
            >
              <Input disabled />
            </Form.Item>
          </Col>
          <Col span={11}>
            <Form.Item
              label="Mô tả"
              name="description"
              // rules={[{ required: true, message: 'Không được để trống' }]}
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 16 }}
            >
              <TextArea disabled />
            </Form.Item>
          </Col>
        </Row>
        <Row className="justify-between">
          <Col span={11}>
            <Form.Item
              label="Số lượng"
              name="packageQuantity"
              rules={[{ required: true, message: 'Không được để trống' }]}
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 16 }}
            >
              <InputNumber style={{ width: '100%' }} />
            </Form.Item>
          </Col>
        </Row>
        <Typography.Title level={4} >Thiết bị</Typography.Title>
        <Row className="justify-between">
          <Col span={11}>
            <Form.Item
              label="Thiết bị"
              name="deviceName"
              rules={[{ required: true, message: 'Không được để trống' }]}
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 16 }}
            >
              <Select options={devicesOption} disabled={mode === FORM_MODE.VIEW} onChange={onChangeDevice} />
            </Form.Item>
          </Col>
          <Col span={11}>
            <Form.Item
              label="Số lượng lượng bị"
              name="deviceQuantity"
              rules={[{ required: true, message: 'Không được để trống' }]}
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 16 }}
            >
              <InputNumber style={{ width: '100%' }} />
            </Form.Item>
          </Col>
        </Row>

      </Form>

    </Modal>
  )
}

export default memo(OrderDetailForm)
