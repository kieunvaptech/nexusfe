import { Button, Card, Col, Form, Input, ModalProps, Row, Select } from 'antd'
import { FormInstance } from 'antd/es/form/hooks/useForm'
import { DefaultOptionType } from 'antd/lib/select'
import React, { memo } from 'react'

interface FormProps extends ModalProps {
  form: FormInstance<any>
  statusOption: DefaultOptionType[]
  onSearch: () => void
  onReset: () => void
  onInfo: () => void
}

const OrderSearchForm: React.FC<FormProps> = ({
  form,
  statusOption,
  onSearch,
  onReset,
  onInfo
}) => {


  return (
    <Card >
      <Form form={form} className="mt-4">
        <Row gutter={48} wrap={true}>
          <Col span={24}>
          <Form.Item
              label="Trạng thái đơn hàng"
              name="Status"
              wrapperCol={{
                xl: { offset: 2 },
              }}
              labelCol={{ span: 3 }}
              labelAlign="left"
            >
              <Select options={statusOption} placeholder="Chọn trạng thái" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={48} wrap={true}>
          <Col span={8}></Col>
          <Col span={12}>
            <div className="flex space-x-4">
              <Button onClick={onSearch}>Tìm kiếm</Button>
              <Button onClick={onReset}>Xoá tìm kiếm</Button>

            </div></Col>
          <Col span={4}>
            <Button type="primary" onClick={onInfo}>Thêm mới đơn hàng</Button>
          </Col>



        </Row>

      </Form>

    </Card>

  )
}

export default memo(OrderSearchForm)
