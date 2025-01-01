import { useDeviceActions } from 'actions/device.action'
import {
  Button,
  Col,
  Form,
  Input,
  InputNumber,
  Modal,
  ModalProps,
  Row,
  Select
} from 'antd'
import { DefaultOptionType } from 'antd/lib/select'
import { Device } from 'models/Device.model'
import { Store } from 'models/Store.model'
import React, { useEffect, useState } from 'react'
import { messageErrorDefault, messageSuccessDefault } from 'utils/CommonFc'
import { FORM_MODE } from 'utils/Constants'

interface DeviceInfoFormProps extends ModalProps {
  handleCancel: () => void;
  suppliersOption: DefaultOptionType[];
  reload?: () => void;
  store?: Store;
  device?: Device;
  mode: number;
}

const DeviceInfoForm: React.FC<DeviceInfoFormProps> = ({
  handleCancel,
  suppliersOption,
  reload,
  store,
  device,
  mode,
  ...props
}) => {

  const [form] = Form.useForm()
  const deviceActions = useDeviceActions();

  useEffect(() => {
    form.resetFields()
    if (props.open) {
      if (device) {
        form.setFieldsValue(device)
      } else {
        resetForm()
      }

      if (store) {
        form.setFieldsValue({ storeId: store?.storeId, storeName: store?.storeName })
      }
    }

    return () => {
      resetForm()
    }
  }, [props.open])

  function resetForm() {
    form.resetFields()
  }

  const handleSubmit = async () => {
    if (!form) return
    try {

      const values = await form.validateFields()
      if (values) {
        if (device) {
          const body = {
            deviceId: device?.deviceId,
            ...values
          }
          updateDevice(body)
        }
        else
          addDevice(values)

      }
    } catch (errInfo) {

    }
  }

  const addDevice = async (body: Device) => {
    try {
      const response: any = await deviceActions.addDevice(body);
      if (response) {
        messageSuccessDefault({ message: "Thêm thiết bị thành công" })
        if (reload) reload()
      }

    } catch (error) {
      console.log("error", error)
      messageErrorDefault({ message: "Kiểm tra lại kết nối." })

    }

  }

  const updateDevice = async (body: Device) => {
    try {
      const response: any = await deviceActions.updateDevice(body);
      if (response) {
        messageSuccessDefault({ message: "Cập nhật thiết bị thành công" })
        if (reload) reload()
      }

    } catch (error) {
      console.log("error", error)
      messageErrorDefault({ message: "Kiểm tra lại kết nối." })

    }

  }

  const getTitle = () => {
    if (mode === FORM_MODE.NEW) return 'Thêm mới thiết bị'
    if (mode === FORM_MODE.UPDATE) return 'Cập nhật thông tin thiết bị'
    if (mode === FORM_MODE.VIEW) return 'Chi tiết thông tin thiết bị'
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
      <Form className="mt-10" form={form} labelWrap disabled={mode === FORM_MODE.VIEW} labelAlign="right">
        <Row className="justify-between">
          <Col span={11}>
            <Form.Item
              label="Tên thiết bị"
              name="deviceName"
              rules={[{ required: true, message: 'Tên thiết bị không được để trống' }]}
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 16 }}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={11}>
            <Form.Item
              label="Cửa hàng"
              name="storeName"
              rules={[{ required: true, message: 'Cửa hàng không được để trống' }]}
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
              label="Nhà cung cấp"
              name="supplierId"
              rules={[{ required: true, message: 'Nhà cung cấp không được để trống' }]}
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 16 }}
            >
              <Select options={suppliersOption} disabled={mode === FORM_MODE.VIEW} />
            </Form.Item>
          </Col>
          <Col span={11}>
            <Form.Item
              label="Số lượng"
              name="quantity"
              rules={[{ required: true, message: 'Số lượng không được để trống' }]}
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 16 }}
            >
              <InputNumber />
            </Form.Item>
          </Col>
        </Row>


      </Form>


    </Modal>
  )
}

export default DeviceInfoForm
