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
  Upload
} from 'antd'
import TextArea from 'antd/lib/input/TextArea'
import { DefaultOptionType } from 'antd/lib/select'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { messageErrorDefault, messageSuccessDefault } from 'utils/CommonFc'
import { FORM_MODE } from 'utils/Constants'
import { UploadOutlined } from '@ant-design/icons'
import { BASE_IMAGE } from 'connection'
import { Customer } from 'models/Customer.model'
import { useCustomerActions } from 'actions/customer.action'

interface FormProps extends ModalProps {
  handleCancel: () => void
  categorysOption: DefaultOptionType[]
  reload?: () => void
  data?: Customer;
  mode: number
}

const CustomerInfoForm: React.FC<FormProps> = ({
  handleCancel,
  categorysOption,
  reload,
  data,
  mode,
  ...props
}) => {

  const [form] = Form.useForm()
  const customerActions = useCustomerActions();

  useEffect(() => {
    form.resetFields()
    if (props.open) {
      if (data) {
        form.setFieldsValue(data);
      } else {
        resetForm()
      }
    }

    return () => {

      resetForm()
    }
  }, [props.open])

  function resetForm() {
    form.resetFields();
  }

  const handleSubmit = async () => {
    if (!form) return
    try {

      const values = await form.validateFields();
      values.phoneNumber = values.phoneNumber.toString();
      if (values) {
        if (data) {
          const body = {
            customerId: data?.customerId,
            ...values
          }
          updateCustomer(body)
        }
        else
          addCustomer(values)

      }
    } catch (errInfo) {

    }
  }

  const addCustomer = async (body: Customer) => {
    try {
      const response: any = await customerActions.addCustomer(body);
      if (response) {
        messageSuccessDefault({ message: "Thêm sản phẩm thành công" })
        if (reload) reload()
      }

    } catch (error) {
      console.log("error", error)
      messageErrorDefault({ message: "Kiểm tra lại kết nối." })

    }

  }

  const updateCustomer = async (body: Customer) => {
    try {
      const response: any = await customerActions.updateCustomer(body);
      if (response) {
        messageSuccessDefault({ message: "Cập nhật khách hàng thành công" })
        if (reload) reload()
      }

    } catch (error) {
      console.log("error", error)
      messageErrorDefault({ message: "Kiểm tra lại kết nối." })

    }

  }

  const getTitle = () => {
    if (mode === FORM_MODE.NEW) return 'Thêm mới khách hàng'
    if (mode === FORM_MODE.UPDATE) return 'Cập nhật thông tin khách hàng'
    if (mode === FORM_MODE.VIEW) return 'Chi tiết thông tin khách hàng'
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
              label="Họ và tên"
              name="fullName"
              rules={[{ required: true, message: 'Họ và tên không được để trống' }]}
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 16 }}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={11}>
            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, message: 'Email không được để trống' }]}
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 16 }}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row className="justify-between">
          <Col span={11}>
            <Form.Item
              label="Số điện thoại"
              name="phoneNumber"
              rules={[{ required: true, message: 'Đơn vị quản lý không được để trống' }]}
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 16 }}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={11}>
            <Form.Item
              label="Địa chỉ"
              name="address"
              rules={[{ required: true, message: 'Địa chỉ không được để trống' }]}
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 16 }}
            >
              <TextArea disabled={mode === FORM_MODE.VIEW} />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  )
}

export default CustomerInfoForm
