import { useStoreActions } from 'actions/store.action'
import {
  Button,
  Col,
  Form,
  Input,
  Modal,
  ModalProps,
  Row,
  Select
} from 'antd'
import TextArea from 'antd/lib/input/TextArea'
import { DefaultOptionType } from 'antd/lib/select'
import { Store } from 'models/Store.model'
import React, { useEffect } from 'react'
import { messageSuccessDefault } from 'utils/CommonFc'
import { messageType, FORM_MODE } from 'utils/Constants'

interface CategoryInfoFormProps extends ModalProps {
  handleCancel: () => void
  categorysOption: DefaultOptionType[]
  reload?: () => void
  data: Store
  mode: number
}

const StoreInfoForm: React.FC<CategoryInfoFormProps> = ({
  handleCancel,
  categorysOption,
  reload,
  data,
  mode,
  ...props
}) => {
  const [form] = Form.useForm();
  const storeActions = useStoreActions();

  useEffect(() => {
    form.resetFields()
    if (props.open) {
      if (data) {
        form.setFieldsValue(data)
      } else {
        resetForm()
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
        if (data) {
          const body = {
            storeId: data.storeId,
            ...values
          }
          updateStore(body)
        }
        else
          addStore(values)

      }
    } catch (errInfo) {

    }
  }

  const addStore = async (body: Store) => {
    const response: Store = await storeActions.addStore(body);
    if (response) {
      messageSuccessDefault({ message: messageType.ADD_SUCCESS })
      if (reload) reload()
    }
  }

  const updateStore = async (body: Store) => {
    const response: Store = await storeActions.updateStore(body);
    if (response) {
      messageSuccessDefault({ message: messageType.UPDATE_SUCCESS })
      if (reload) reload()
    }
  }

  return (
    <Modal
      title={mode === FORM_MODE.NEW ? 'Add new Store' : 'Update Store'}
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
              {mode === FORM_MODE.NEW ? 'Add new' : 'Update'}
            </Button>
          }
          <Button
            onClick={() => {
              handleCancel()
            }}
            className="w-[144px] min-h-[40px]"
          >
            Exit
          </Button>
        </div>,
      ]}
      onCancel={handleCancel}
      className="!w-[95%]"
      {...props}
    >
      <Form className="mt-10" form={form} labelWrap disabled={mode === FORM_MODE.VIEW} labelAlign="right">
        <Row className="justify-between">
          <Col span={12}>
            <Form.Item
              label="Store Name"
              name="storeName"
              rules={[{ required: true, message: 'Store name is require' }]}
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 16 }}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Address"
              name="address"
              rules={[{ required: true, message: 'Address is require' }]}
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 16 }}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row className="justify-between">
          <Col span={12}>
            <Form.Item
              label="Phone"
              name="phoneNumber"
              rules={[{ required: true, message: 'Phone is require' }]}
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 16 }}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  )
}

export default StoreInfoForm
