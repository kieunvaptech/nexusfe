
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
import { FORM_MODE, messageType } from 'utils/Constants'
import { UploadOutlined } from '@ant-design/icons'
import { BASE_IMAGE } from 'connection'
import { Employee } from 'models/Employee.model'
import { useEmployeeActions } from 'actions/employee.action'
import CryptoJS from 'crypto-js';

interface ProductInfoFormProps extends ModalProps {
  handleCancel: () => void
  categorysOption: DefaultOptionType[]
  storesOption: DefaultOptionType[]
  rolesOption: DefaultOptionType[]
  reload?: () => void
  data?: Employee
  mode: number
}

const EmployeeInfoForm: React.FC<ProductInfoFormProps> = ({
  handleCancel,
  categorysOption,
  storesOption,
  rolesOption,
  reload,
  data,
  mode,
  ...props
}) => {

  const [form] = Form.useForm()
  const employeeActions = useEmployeeActions();

  useEffect(() => {
    form.resetFields();
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

      const values = await form.validateFields();
      values.phoneNumber = values.phoneNumber.toString();
      if (values) {
        if (data) {
          const body = {
            employeeId: data?.employeeId,
            ...values
          }
          updateEmployee(body)
        }
        else{
          // if(values.password) values.passwordHash = CryptoJS.SHA256(values.password).toString(CryptoJS.enc.Hex);
          addEmployee(values)
        }
          

      }
    } catch (errInfo) {

    }
  }

  const addEmployee = async (body: Employee) => {
    try {
      const response: any = await employeeActions.addEmployee(body);
      if (response) {
        messageSuccessDefault({ message: messageType.ADD_SUCCESS })
        if (reload) reload()
      }

    } catch (error) {
      console.log("error", error)
      messageErrorDefault({ message: messageType.CHECK_INTERNET })

    }

  }

  const updateEmployee = async (body: Employee) => {
    try {
      const response: any = await employeeActions.updateEmployee(body);
      if (response) {
        messageSuccessDefault({ message: messageType.UPDATE_SUCCESS })
        if (reload) reload()
      }

    } catch (error) {
      console.log("error", error)
      messageErrorDefault({ message: "Kiểm tra lại kết nối." })

    }

  }

  const getTitle = () => {
    if (mode === FORM_MODE.NEW) return 'Thêm mới nhân viên'
    if (mode === FORM_MODE.UPDATE) return 'Cập nhật thông tin nhân viên'
    if (mode === FORM_MODE.VIEW) return 'Xem chi tiết thông tin nhân viên'
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
              {mode === FORM_MODE.NEW ? messageType.ADD_NEW : messageType.UPDATE}
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
              rules={[{ required: true, message: 'Số điện thoại không được để trống' }]}
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
              labelAlign='left'
              rules={[{ required: true, message: 'Địa chỉ không được để trống' }]}
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 16 }}
            >
              <TextArea disabled={mode === FORM_MODE.VIEW} />
            </Form.Item>
          </Col>
        </Row>

        <Row className="justify-between">
          <Col span={11}>
            <Form.Item
              label="Tên đăng nhập"
              name="username"
              // rules={[{ required: true, message: 'Đơn vị quản lý không được để trống' }]}
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 16 }}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={11}>
            <Form.Item
              label="Mật khẩu"
              name="passwordHash"
              labelAlign='left'
              // rules={[{ required: true }]}
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
              label="Vai trò"
              name="roleId"
              rules={[{ required: true, message: 'Vai trò không được để trống' }]}
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 16 }}
            >
              <Select options={rolesOption} disabled={mode === FORM_MODE.VIEW} />
            </Form.Item>
          </Col>
          <Col span={11}>
            <Form.Item
              label="Cửa hàng"
              name="storeId"
              labelAlign='left'
              rules={[{ required: true, message: 'Cửa hàng không được để trống' }]}
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 16 }}
            >
              <Select options={storesOption} disabled={mode === FORM_MODE.VIEW} />
            </Form.Item>
          </Col>
        </Row>

        {/* {
          id &&
          <Row className="justify-between">
            <Col span={11}>
              <Form.Item
                label="Thêm ảnh sản phẩm"
                name="file"
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 16 }}
              >

                <Upload
                  customRequest={customRequest}
                  onChange={handleChange}
                  fileList={fileList}
                  listType="picture"
                  // showUploadList={true}
                  multiple={true}
                  maxCount={5}
                  showUploadList={{ showRemoveIcon: false }}
                >
                  <Button
                    icon={<UploadOutlined className="text-3xl cursor-pointer" />}
                    className="rounded-none border-none !min-w-10"
                  ></Button>
                </Upload>

              </Form.Item>
            </Col>
            <Col span={11}>
              <Upload
                listType="picture-card"
                fileList={fileListOld}
                showUploadList={{ showRemoveIcon: false }}
              >
              </Upload>
            </Col>
          </Row>
        } */}




      </Form>


    </Modal>
  )
}

export default EmployeeInfoForm
