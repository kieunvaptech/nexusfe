import { usePackageActions } from 'actions/package.action'
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
import { Package } from 'models/Package.model'
import React, { memo, useEffect } from 'react'
import { messageErrorDefault, messageSuccessDefault } from 'utils/CommonFc'
import { FORM_MODE } from 'utils/Constants'

interface FormProps extends ModalProps {
  handleCancel: () => void;
  categorysOption: DefaultOptionType[];
  reload?: () => void;
  data?: Package;
  mode: number;
}

const PackageInfoForm: React.FC<FormProps> = ({
  handleCancel,
  categorysOption,
  reload,
  data,
  mode,
  ...props
}) => {

  const [form] = Form.useForm()
  const packageActions = usePackageActions();

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
    form.resetFields();
  }

  const handleSubmit = async () => {
    if (!form) return
    try {

      const values = await form.validateFields()
      if (values) {
        if (data) {
          const body = {
            packageId: data?.packageId,
            ...values
          }
          updatePackage(body)
        }
        else
        addPackage(values)

      }
    } catch (errInfo) {

    }
  }

  const addPackage = async (body: Package) => {
    try {
      const response: any = await packageActions.addPackage(body);
      if (response) {
        messageSuccessDefault({ message: "Thêm sản phẩm thành công" })
        if (reload) reload()
      }

    } catch (error) {
      console.log("error", error)
      messageErrorDefault({ message: "Kiểm tra lại kết nối." })

    }

  }

  const updatePackage = async (body: Package) => {
    try {
      const productResponse: any = await packageActions.updatePackage(body);
      if (productResponse) {
        messageSuccessDefault({ message: "Cập nhật sản phẩm thành công" })
        if (reload) reload()
      }

    } catch (error) {
      console.log("error", error)
      messageErrorDefault({ message: "Kiểm tra lại kết nối." })

    }

  }

  const getTitle = () => {
    if (mode === FORM_MODE.NEW) return 'Thêm mới gói cước'
    if (mode === FORM_MODE.UPDATE) return 'Cập nhật thông tin gói cước'
    if (mode === FORM_MODE.VIEW) return 'Chi tiết thông tin gói cước'
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
              label="Tên gói cước"
              name="packageName"
              rules={[{ required: true, message: 'Tên gói cước không được để trống' }]}
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 16 }}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={11}>
            <Form.Item
              label="Giá tiền"
              name="price"
              rules={[{ required: true, message: 'Giá tiền không được để trống' }]}
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 16 }}
            >
              <InputNumber style={{ width: '100%' }} />
            </Form.Item>
          </Col>
        </Row>
        <Row className="justify-between">
          <Col span={11}>
            <Form.Item
              label="Tiền đặt cọc"
              name="securityDeposit"
              rules={[{ required: true, message: 'Tiền đặt cọc không được để trống' }]}
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 16 }}
            >
              <InputNumber style={{ width: '100%' }} />
            </Form.Item>
          </Col>
          <Col span={11}>
            <Form.Item
              label="Mô tả"
              name="description"
              labelAlign='left'
              rules={[{ required: true, message: 'Mô tả không được để trống' }]}
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

export default memo(PackageInfoForm)
