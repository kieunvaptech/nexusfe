// import { useOrderActions } from 'actions/package.action'
import {
  Button,
  Col,
  Form,
  Input,
  Modal,
  ModalProps,
  Row,
  Table
} from 'antd'
import TextArea from 'antd/lib/input/TextArea'
import React, { memo, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { messageErrorDefault, messageSuccessDefault } from 'utils/CommonFc'
import { FORM_MODE } from 'utils/Constants'

interface OrderInfoFormProps extends ModalProps {
  handleCancel: () => void
  data: any;
  reload?: () => void
  // id: number | null
  mode: number
}

const OrderInfoForm: React.FC<OrderInfoFormProps> = ({
  handleCancel,
  data,
  reload,
  mode,
  ...props
}) => {
  const { t } = useTranslation()
  const [form] = Form.useForm()
  // const orderActions = useOrderActions();
  const [dataSource, setDataSource] = useState()

  useEffect(() => {
    form.resetFields()
    if (props.open) {
      form.setFieldsValue(data)
      if (data.order_details) {
        const products = data.order_details.map((product: any, index: number) => ({
          stt: index + 1,
          ...product.product,
          numberOfProducts: product.numberOfProducts
        }))
        setDataSource(products)
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
        if (data.id) {
          const body = {
            ...data,
            cart_items: data.order_details,
            ...values
          }
          orderUpdate(body)
        }

      }
    } catch (errInfo) {

    }
  }

  const orderUpdate = async (body: any) => {
    // try {
    //   const orderResponse: any = await orderActions.updateOrder(body);
    //   if (orderResponse) {
    //     messageSuccessDefault({ message: "Cập nhật sản phẩm thành công" })
    //     if (reload) reload()
    //   }

    // } catch (error) {
    //   console.log("error", error)
    //   messageErrorDefault({ message: "Kiểm tra lại kết nối." })
    // }

  }

  const columns = [
    {
      title: 'STT',
      dataIndex: 'stt',
      key: 'stt',
    },
    {
      title: 'Sản phẩm',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Giá tiền',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Số lượng',
      dataIndex: 'numberOfProducts',
      key: 'numberOfProducts',
    },
  ];

  const getTitle = () => {
    if (mode === FORM_MODE.UPDATE) return 'Cập nhật order'
    if (mode === FORM_MODE.VIEW) return 'Chi tiết order'
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
              label="Họ tên"
              name="fullname"
              rules={[{ required: true, message: 'Không được để trống' }]}
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 16 }}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={11}>
            <Form.Item
              label="Số điện thoại"
              name="phone_number"
              rules={[{ required: true, message: 'Không được để trống' }]}
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
              label="Email"
              name="email"
              rules={[{ required: true, message: 'Không được để trống' }]}
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 16 }}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={11}>
            <Form.Item
              label="Địa chỉ"
              name="phone_number"
              rules={[{ required: true, message: 'Không được để trống' }]}
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
              label="Ghi chú"
              name="note"
              rules={[{ required: true, message: 'Không được để trống' }]}
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 16 }}
            >
              <TextArea disabled={mode === FORM_MODE.VIEW} />
            </Form.Item>
          </Col>
          <Col span={11}>
            <Form.Item
              label="Tổng tiền"
              name="total_money"
              rules={[{ required: true, message: 'Không được để trống' }]}
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
              label="Họ tên"
              name="fullname"
              rules={[{ required: true, message: 'Không được để trống' }]}
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 16 }}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={11}>
            <Form.Item
              label="Số điện thoại"
              name="phone_number"
              rules={[{ required: true, message: 'Không được để trống' }]}
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 16 }}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>


      </Form>
      <Table
        columns={columns}
        dataSource={dataSource}
        pagination={false}
      />

    </Modal>
  )
}

export default memo(OrderInfoForm)
