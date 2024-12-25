import { Button, Card, Col, Form, Input, ModalProps, Row, Select } from 'antd'
import { FormInstance } from 'antd/es/form/hooks/useForm'
import { DefaultOptionType } from 'antd/lib/select'
import React, { memo } from 'react'

interface FormProps extends ModalProps {
  form: FormInstance<any>
  onSearch: () => void
  onReset: () => void
  onInfo: () => void
  categorysOption: DefaultOptionType[]
}

const ProductSearchForm: React.FC<FormProps> = ({
  form,
  onSearch,
  onReset,
  onInfo,
  categorysOption
}) => {

  return (
    <Card >
      <Form form={form} className="mt-4">
        <Row gutter={48} wrap={true}>
          <Col xs={22} xl={12}>
            <Form.Item
              label="Tên sản phẩm"
              name="keyword"
              wrapperCol={{
                xl: { offset: 2 },
              }}
              labelCol={{ span: 6 }}
              labelAlign="left"
            >
              <Input placeholder='Nhập tên sản phẩm' />
            </Form.Item>
          </Col>
          <Col xs={22} xl={12}>
            <Form.Item
              label="Danh mục"
              name="category_id"
              wrapperCol={{
                xl: { offset: 2 },
              }}
              labelCol={{ span: 6 }}
              labelAlign="left"
            >
              <Select options={categorysOption} placeholder="Chọn danh mục" />
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

            <Button type="primary" onClick={onInfo}>Thêm mới sản phẩm</Button></Col>



        </Row>

      </Form>

    </Card>

  )
}

export default memo(ProductSearchForm)
