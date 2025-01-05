import { Button, Card, Col, Form, Input, ModalProps, Row, Select } from 'antd'
import { FormInstance } from 'antd/es/form/hooks/useForm'
import { DefaultOptionType } from 'antd/lib/select'
import React, { memo } from 'react'

interface FormProps extends ModalProps {
  form: FormInstance<any>
  onSearch: () => void
  onReset: () => void
  onInfo: () => void
}

const OrderSearchForm: React.FC<FormProps> = ({
  form,
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
              label="Nhập từ khoá tìm kiếm"
              name="keyword"
              wrapperCol={{
                xl: { offset: 3 },
              }}
              labelCol={{ span: 3 }}
              labelAlign="left"
            >
              <Input placeholder='Nhập ...' />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={48} wrap={true}>
          <Col span={8}></Col>
          <Col span={13}>
            <div className="flex space-x-4">
              <Button onClick={onSearch}>Tìm kiếm</Button>
              <Button onClick={onReset}>Xoá tìm kiếm</Button>

            </div></Col>
          <Col span={3}>
            <Button type="primary" onClick={onInfo}>Thêm mới đơn hàng</Button>
          </Col>



        </Row>

      </Form>

    </Card>

  )
}

export default memo(OrderSearchForm)
