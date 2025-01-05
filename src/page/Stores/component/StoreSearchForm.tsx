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

const StoreSearchForm: React.FC<FormProps> = ({
  form,
  onSearch,
  onReset,
  onInfo,
}) => {
  
  return (
    <Card >
          <Form form={form} className="mt-4">
            <Row gutter={48} wrap={true}>
              <Col xs={22} xl={12}>
                <Form.Item
                  label="Tên cửa hàng"
                  name="StoreName"
                  wrapperCol={{
                    xl: { offset: 2 },
                  }}
                  labelCol={{ span: 6 }}
                  labelAlign="left"
                >
                  <Input placeholder='Nhập tên cửa hàng' />
                </Form.Item>
              </Col>
              <Col xs={22} xl={12}>
                <Form.Item
                  label="Số điện thoại"
                  name="PhoneNumber"
                  wrapperCol={{
                    xl: { offset: 2 },
                  }}
                  labelCol={{ span: 6 }}
                  labelAlign="left"
                >
                  <Input placeholder='Nhập số điện thoại' />
                </Form.Item>
              </Col>
            </Row>
    
            <Row gutter={48} wrap={true}>
              <Col span={8}></Col>
              <Col span={10}>
                <div className="flex space-x-4">
                  <Button onClick={onSearch}>Tìm kiếm</Button>
                  <Button onClick={onReset}>Xóa</Button>
    
                </div></Col>
              <Col span={6}>
    
                <Button type="primary" onClick={onInfo}>Thêm mới cửa hàng</Button></Col>
    
    
    
            </Row>
    
          </Form>
    
        </Card>

  )
}

export default memo(StoreSearchForm)
