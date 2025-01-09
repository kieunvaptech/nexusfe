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
import Content from 'layout/Content'
import { Store } from 'models/Store.model'
import React, { useEffect, useState } from 'react'
import { messageSuccessDefault } from 'utils/CommonFc'
import { messageType, FORM_MODE } from 'utils/Constants'

interface CategoryInfoFormProps extends ModalProps {
  handleCancel: () => void
  categorysOption: DefaultOptionType[]
  reload?: () => void
  data?: Store
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
  const [loadingInfo,setLoadingInfo] = useState<boolean>(false)

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
        setLoadingInfo(true)
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
    setLoadingInfo(false)
    if (response) {
      messageSuccessDefault({ message: messageType.ADD_SUCCESS })
      if (reload) reload()
    }
  }

  const updateStore = async (body: Store) => {
    const response: Store = await storeActions.updateStore(body);
    setLoadingInfo(false)
    if (response) {
      messageSuccessDefault({ message: messageType.UPDATE_SUCCESS })
      if (reload) reload()
    }
  }

  const regex = /^(0)([0-9]{9})$/

  return (
    <Content loading={loadingInfo}>
      <Modal
        title={mode === FORM_MODE.NEW ? 'Thêm mới cửa hàng' : 'Cập nhật thông tin cửa hàng'}
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
                {mode === FORM_MODE.NEW ? 'Thêm mới' : 'Cập nhật'}
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
            <Col span={12}>
              <Form.Item
                label="Tên cửa hàng"
                name="storeName"
                rules={[{ required: true, message: 'Không được để trống' }]}
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 16 }}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Địa chỉ"
                name="address"
                rules={[{ required: true, message: 'Không được để trống' }]}
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
                label="Số điện thoại"
                name="phoneNumber"
                rules={[
                  { required: true, message: 'Không được để trống' },
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
        </Form>
      </Modal>
    </Content>

  )
}

export default StoreInfoForm
