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
        <Row gutter={48} wrap={true}>
          <Col xs={24} xl={12}>
            <Form.Item
              label="Mã kết nối"
              name="connectionName"
              wrapperCol={{
                xl: { offset: 2 },
              }}
              labelCol={{ span: 6 }}
              labelAlign="left"
            >
              <Input placeholder='Nhập mã sản phẩm' />
            </Form.Item>
          </Col>
          
        </Row>

        <Row gutter={48} wrap={true}>
          <Col span={6}></Col>
          <Col span={18}>
            <div className="flex space-x-4">
              <Button onClick={onSearch}>Tìm kiếm</Button>

            </div></Col>



        </Row>

      </Form>

    </Card>

  )
}

export default memo(ProductSearchForm)
