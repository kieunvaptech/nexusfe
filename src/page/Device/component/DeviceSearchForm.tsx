import { Button, Card, Col, Form, Input, ModalProps, Row, Select } from 'antd'
import { FormInstance } from 'antd/es/form/hooks/useForm'
import { DefaultOptionType } from 'antd/lib/select'
import React, { memo } from 'react'

interface FormProps extends ModalProps {
  form: FormInstance<any>
  onSearch: () => void
  onReset: () => void
  onInfo: () => void
  suppliersOption: DefaultOptionType[]
}

const DeviceSearchForm: React.FC<FormProps> = ({
  form,
  onSearch,
  onReset,
  onInfo,
  suppliersOption
}) => {

  return (
    <Card >
      <Form form={form} className="mt-4">
        <Row gutter={48} wrap={true}>
          <Col xs={22} xl={12}>
            <Form.Item
              label="Tên thiết bị"
              name="DeviceName"
              wrapperCol={{
                xl: { offset: 2 },
              }}
              labelCol={{ span: 6 }}
              labelAlign="left"
            >
              <Input placeholder='Nhập tên thiết bị' />
            </Form.Item>
          </Col>
          <Col xs={22} xl={12}>
            <Form.Item
              label="Nhà cung cấp"
              name="SupplierId"
              wrapperCol={{
                xl: { offset: 2 },
              }}
              labelCol={{ span: 6 }}
              labelAlign="left"
            >
              <Select options={suppliersOption} placeholder="Chọn nhà cung cấp" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={48} wrap={true}>
          <Col span={8}></Col>
          <Col span={10}>
            <div className="flex space-x-4">
              <Button onClick={onSearch}>Tìm kiếm</Button>
              <Button onClick={onReset}>Xoá</Button>

            </div></Col>
          <Col span={6}>

            <Button type="primary" onClick={onInfo}>Thêm mới thiết bị</Button></Col>



        </Row>

      </Form>

    </Card>

  )
}

export default memo(DeviceSearchForm)
