import { useDeviceActions } from 'actions/device.action'
import { useUserActions } from 'actions/user.action'
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

interface FormProps extends ModalProps {
  handleCancel: () => void
  username?: string
}

const ChangePassword: React.FC<FormProps> = ({
  handleCancel,
  username,
  ...props
}) => {

  const [form] = Form.useForm()
  const userActions = useUserActions();

  useEffect(() => {
    form.resetFields()
    if (props.open) {

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

      let values = await form.validateFields();
      if(values.passwordNew !== values.repasswordNew){
        messageErrorDefault({ message: "Mật khẩu mới không giống nhau." })
        return
      }
      values.username = username
      const response = await userActions.changePassword(values);
      if(response){
        messageSuccessDefault({ message: "Đổi mật khẩu thành công" });
        handleCancel();
      }

    } catch (errInfo: any) {
      console.log(errInfo)
      if(errInfo?.code === "ERR_BAD_REQUEST") messageErrorDefault({ message: "Mật khẩu cũ không đúng." });
    }
  }


  return (
    <Modal
      title='Đổi mật khẩu'
      centered
      footer={[
        <div className="flex-center w-full gap-3">
          <Button
            onClick={() => {
              handleSubmit()
            }}
            className="w-[144px] min-h-[40px]"
          >
            Đổi mật khẩu
          </Button>
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
      className="!w-[45%]"
      {...props}
    >
      <Form className="mt-10" form={form} labelWrap labelAlign="right">
        <Row className="justify-between">
          <Col span={22}>
            <Form.Item
              label="Mật khẩu cũ"
              name="passwordOld"
              rules={[{ required: true, message: 'Không được để trống' }]}
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 16 }}
            >
              <Input.Password />
            </Form.Item>
          </Col>
        </Row>
        <Row className="justify-between">
          <Col span={22}>
            <Form.Item
              label="Mật khẩu mới"
              name="passwordNew"
              rules={[{ required: true, message: 'Không được để trống' }]}
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 16 }}
            >
              <Input.Password minLength={6} />
            </Form.Item>
          </Col>
        </Row>
        <Row className="justify-between">
          <Col span={22}>
            <Form.Item
              label="Nhập lại mật khẩu"
              name="repasswordNew"
              rules={[{ required: true, message: 'Không được để trống' }]}
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 16 }}
            >
              <Input.Password minLength={6} />
            </Form.Item>
          </Col>
        </Row>

      </Form>


    </Modal>
  )
}

export default ChangePassword
