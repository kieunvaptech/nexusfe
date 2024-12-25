import { useCategoryActions } from 'actions/category.action'
import { useProductActions } from 'actions/product.action'
import { ProductAddRequest } from 'actions/ProductAddRequest'
import {
  Button,
  Col,
  Form,
  Input,
  Modal,
  ModalProps,
  Row,
  Select
} from 'antd'
import TextArea from 'antd/lib/input/TextArea'
import { DefaultOptionType } from 'antd/lib/select'
import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { messageSuccessDefault } from 'utils/CommonFc'
import { FORM_MODE } from 'utils/Constants'

interface CategoryInfoFormProps extends ModalProps {
  handleCancel: () => void
  categorysOption: DefaultOptionType[]
  reload?: () => void
  data: any
  mode: number
}

const ProductInfoForm: React.FC<CategoryInfoFormProps> = ({
  handleCancel,
  categorysOption,
  reload,
  data,
  mode,
  ...props
}) => {
  const { t } = useTranslation()
  const [form] = Form.useForm()
  const categoryActions = useCategoryActions();

  useEffect(() => {
    form.resetFields()
    if (props.open) {
      if (data) {
        form.setFieldsValue(data)
      }else{
        resetForm()
      }
    }

    return () => {
      resetForm()
    }
  }, [props.open])

  function resetForm() {
    form.resetFields()
  }

  const categoryDetail = async (id: number) => {
    const productResponse: any = await categoryActions.detailCategory(id);
    if (productResponse) {
      form.setFieldsValue(productResponse)
    }
  }

  const handleSubmit = async () => {
    if (!form) return
    try {

      const values = await form.validateFields()
      if (values) {
        if (data) {
          const body = {
            id: data.id,
            ...values
          }
          categoryUpdate(body)
        }
        else
        categoryAdd(values)
        
      }
    } catch (errInfo) {

    }
  }

  const categoryAdd = async (body: ProductAddRequest) => {
    const productResponse: any = await categoryActions.addCategory(body);
    if (productResponse) {
      messageSuccessDefault({message: "Thêm sản phẩm thành công"})
      if(reload) reload()
    }
  }

  const categoryUpdate = async (body: ProductAddRequest) => {
    const productResponse: any = await categoryActions.updateCategory(body);
    if (productResponse) {
      messageSuccessDefault({message: "Cập nhật sản phẩm thành công"})
      if(reload) reload()
    }
  }

  return (
    <Modal
      title={ mode === FORM_MODE.NEW ? 'Thêm sản phẩm' : 'Cập nhật sản phẩm' }
      centered
      footer={[
        <div className="flex-center w-full gap-3">
          {
            mode !== FORM_MODE.VIEW && <Button
            onClick={() => {
              handleSubmit()
            }}
            className="w-[144px] min-h-[40px]"
          >
            { mode === FORM_MODE.NEW ? 'Thêm' : 'Cập nhật' }
          </Button>
          }
          <Button
            onClick={() => {
              handleCancel()
            }}
            className="w-[144px] min-h-[40px]"
          >
            Thoát
          </Button>
        </div>,
      ]}
      onCancel={handleCancel}
      className="!w-[95%]"
      {...props}
    >
      <Form className="mt-10" form={form} labelWrap disabled={mode === FORM_MODE.VIEW} labelAlign="right">
        <Row className="justify-between">
          <Col span={24}>
            <Form.Item
              label="Tên danh mục"
              name="name"
              rules={[{ required: true, message: 'Tên danh mục không được để trống' }]}
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 16 }}
            >
              <Input />
            </Form.Item>
          </Col>
          
        </Row>
        



      </Form>


    </Modal>
  )
}

export default ProductInfoForm
