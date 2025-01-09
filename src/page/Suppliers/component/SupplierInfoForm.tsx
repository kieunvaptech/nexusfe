import { useSupplierActions } from 'actions/supplier.action'
import {
  Button,
  Col,
  Form,
  Input,
  InputNumber,
  Modal,
  ModalProps,
  Row
} from 'antd'
import TextArea from 'antd/lib/input/TextArea'
import { DefaultOptionType } from 'antd/lib/select'
import { Supplier } from 'models/Supplier.model'
import React, { useEffect } from 'react'
import { messageErrorDefault, messageSuccessDefault } from 'utils/CommonFc'
import { FORM_MODE, messageType } from 'utils/Constants'

interface SupplierInfoFormProps extends ModalProps {
  handleCancel: () => void
  categorysOption: DefaultOptionType[]
  reload?: () => void
  data?: Supplier
  mode: number
}

const SupplierInfoForm: React.FC<SupplierInfoFormProps> = ({
  handleCancel,
  categorysOption,
  reload,
  data,
  mode,
  ...props
}) => {

  const [form] = Form.useForm()
  const supplierActions = useSupplierActions();

  useEffect(() => {
    form.resetFields()
    if (props.open) {
      if (data) {
        form.setFieldsValue(data);
      } else {
        resetForm();
      }
    }

    return () => {
      resetForm();
    }
  }, [props.open])

  function resetForm() {
    form.resetFields();
  }

  const handleSubmit = async () => {
    if (!form) return
    try {

      const values = await form.validateFields()
      values.phoneNumber = values.phoneNumber.toString();
      if (values) {
        if (data) {
          const body = {
            supplierId: data.supplierId,
            ...values
          }
          updateSupplier(body)
        }
        else
          addSupplier(values)

      }
    } catch (errInfo) {

    }
  }

  const addSupplier = async (body: Supplier) => {
    try {
      const response: Supplier = await supplierActions.addSupplier(body);
      if (response) {
        messageSuccessDefault({ message: messageType.ADD_SUCCESS })
        if (reload) reload()
      }

    } catch (error) {
      messageErrorDefault({ message: messageType.CHECK_INTERNET })
    }

  }

  const updateSupplier = async (body: Supplier) => {
    try {
      const response: Supplier = await supplierActions.updateSupplier(body);
      if (response) {
        messageSuccessDefault({ message: messageType.UPDATE_SUCCESS })
        if (reload) reload()
      }

    } catch (error) {
      messageErrorDefault({ message: messageType.CHECK_INTERNET })
    }

  }

  const getTitle = () => {
    if (mode === FORM_MODE.NEW) return 'Thêm mới nhà cung cấp'
    if (mode === FORM_MODE.UPDATE) return 'Cập nhật thông tin nhà cung cấp'
    if (mode === FORM_MODE.VIEW) return 'Xem chi tiết nhà cung cấp'
  }
  
  const regex = /^(0)([0-9]{9})$/

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
              {mode === FORM_MODE.NEW ? messageType.ADD_NEW : messageType.UPDATE}
            </Button>
          }
          <Button
            onClick={() => {
              handleCancel()
            }}
            className="w-[144px] min-h-[40px]"
          >
            {messageType.EXIT}
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
              label="Tên nhà cung cấp"
              name="supplierName"
              rules={[{ required: true, message: 'Tên nhà cung cấp không được để trống' }]}
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 16 }}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={11}>
            <Form.Item
              label="Số điện thoại"
              name="phoneNumber"
              rules={[{ required: true, message: 'Số điện thoại không được để trống' },
                {
                  pattern: new RegExp(regex),
                  message: 'Số điện thoại không hợp lệ!',
                }
              ]}
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
              label="email"
              name="email"
              rules={[
                {
                  type: 'email',
                  message: 'Email không hợp lệ',
                },
                { required: true, message: 'Email không được để trống' }]}
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

export default SupplierInfoForm
