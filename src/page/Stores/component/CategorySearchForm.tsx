import { Button, Card, Col, Form, Input, ModalProps, Row, Select } from 'antd'
import { FormInstance } from 'antd/es/form/hooks/useForm'
import { DefaultOptionType } from 'antd/lib/select'
import React, { memo } from 'react'

interface FormProps extends ModalProps {
  form: FormInstance<any>
  onSearch: () => void
  onInfo: () => void
  categorysOption: DefaultOptionType[]
}

const CategorySearchForm: React.FC<FormProps> = ({
  form,
  onSearch,
  onInfo,
  categorysOption
}) => {
  

  const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY']

  return (
    // <Card >
      <Form form={form} className="mt-4">
        {/* <Row gutter={48} wrap={true}>
          <Col xs={22} xl={12}>
            <Form.Item
              label="Tên sản phẩm"
              name="tenBc"
              wrapperCol={{
                xl: { offset: 2 },
              }}
              labelCol={{ span: 6 }}
              labelAlign="left"
            // rules={[
            //   {
            //     required: true,
            //     message: 'Tên báo cáo không được để trống',
            //   },
            // ]}
            >
              <Input placeholder='Nhập tên danh mục' />
            </Form.Item>
          </Col>
          
        </Row> */}

        <Row gutter={48} wrap={true}>
          <Col span={8}></Col>
          <Col span={8}>
            {/* <Button onClick={onSearch}>Tìm kiếm danh mục</Button> */}
          </Col>
          <Col span={8}>
            <Button type="primary" onClick={onInfo}>Add new Store</Button>
          </Col>

        </Row>

      </Form>

    // </Card>

  )
}

export default memo(CategorySearchForm)
