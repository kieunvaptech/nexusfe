import { Button, Card, Col, Form, Input, ModalProps, Row, Select } from 'antd'
import { FormInstance } from 'antd/es/form/hooks/useForm'
import { DefaultOptionType } from 'antd/lib/select'
import React, { memo } from 'react'

interface FormProps extends ModalProps {
  form: FormInstance<any>
  onSearch: () => void
  onReset: () => void
}

const ConnectsSearchForm: React.FC<FormProps> = ({
  form,
  onSearch,
  onReset,
}) => {

  return (
    <Card >
      <Form form={form} className="mt-4">
        <Row gutter={48} wrap={true}>
          <Col xs={22} xl={22}>
            <Form.Item
              label="Mã kết nối"
              name="ConnectionName"
              wrapperCol={{
                xl: { offset: 2 },
              }}
              labelCol={{ span: 2 }}
              labelAlign="left"
            >
              <Input placeholder='Nhập mã kết nôi' />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={48} wrap={true}>
          <Col span={8}></Col>
          <Col span={10}>
            <div className="flex space-x-4">
              <Button onClick={onSearch}>Tìm kiếm </Button>
              <Button onClick={onReset}>Xoá tìm kiếm</Button>

            </div></Col>
          <Col span={6}>

           </Col>



        </Row>

      </Form>

    </Card>

  )
}

export default memo(ConnectsSearchForm)
