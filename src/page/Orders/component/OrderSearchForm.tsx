import { Button, Card, Col, Form, Input, ModalProps, Row, Select } from 'antd'
import { FormInstance } from 'antd/es/form/hooks/useForm'
import { DefaultOptionType } from 'antd/lib/select'
import React, { memo } from 'react'

interface FormProps extends ModalProps {
  form: FormInstance<any>
  onSearch: () => void
  onReset: () => void
  categorysOption: DefaultOptionType[]
}

const OrderSearchForm: React.FC<FormProps> = ({
  form,
  onSearch,
  onReset,
  categorysOption
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
          <Col span={10}>
            <div className="flex space-x-4">
              <Button onClick={onSearch}>Tìm kiếm sản phẩm</Button>
              <Button onClick={onReset}>Xoá tìm kiếm</Button>

            </div></Col>
          <Col span={6}>
          </Col>



        </Row>

      </Form>

    </Card>

  )
}

export default memo(OrderSearchForm)
