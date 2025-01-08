import { Button, Card, Col, Form, Input, ModalProps, Row, Select } from 'antd'
import { FormInstance } from 'antd/es/form/hooks/useForm'
import { DefaultOptionType } from 'antd/lib/select'
import React, { memo } from 'react'

interface FormProps extends ModalProps {
  form: FormInstance<any>
  onSearch: () => void
}

const ProductSearchForm: React.FC<FormProps> = ({
  form,
  onSearch
}) => {

  return (
    <Card >
      <Form form={form} className="mt-4">
        <Row className="justify-between">
          <Col span={6}>
            <span></span>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Mã kết nối"
              name="connectionName"
              wrapperCol={{
                xl: { offset: 2 },
              }}
              labelCol={{ span: 2 }}
              labelAlign="left"
            >
              <Input placeholder='Nhập mã sản phẩm' />
            </Form.Item>
          </Col>
          <Col span={6}>
            <span></span>
          </Col>
        </Row>

        <Row className="justify-between">
          <Col span={6}>
            <span></span>
          </Col>
          <Col span={6}>
            <Button onClick={onSearch}>Tìm kiếm</Button>
          </Col>
          <Col span={6}>
            <span></span>
          </Col>
        </Row>


      </Form>

    </Card>

  )
}

export default memo(ProductSearchForm)
