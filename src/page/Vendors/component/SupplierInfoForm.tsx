import { useSupplierActions } from 'actions/supplier.action'
import {
  Button,
  Col,
  Form,
  Input,
  Modal,
  ModalProps,
  Row,
  Select,
  Upload
} from 'antd'
import TextArea from 'antd/lib/input/TextArea'
import { DefaultOptionType } from 'antd/lib/select'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { messageErrorDefault, messageSuccessDefault } from 'utils/CommonFc'
import { FORM_MODE, messageType } from 'utils/Constants'
import { UploadOutlined } from '@ant-design/icons'
import { BASE_IMAGE } from 'connection'
import { Supplier } from 'models/Supplier.model'

interface SupplierInfoFormProps extends ModalProps {
  handleCancel: () => void
  categorysOption: DefaultOptionType[]
  reload?: () => void
  data: Supplier
  mode: number
}

const SupplierInfoForm: React.FC<SupplierInfoFormProps> = ({
  handleCancel,
  categorysOption,
  reload,
  data,
  mode,
  ...props
}) => {

  const { t } = useTranslation()
  const [form] = Form.useForm()
  const supplierActions = useSupplierActions();

  const [fileListOld, setFileListOld] = useState<any[]>([]);
  const [fileList, setFileList] = useState<any[]>([]);

  const handleChange = ({ fileList }: any) => {
    setFileList(fileList);
  };

  const customRequest = async ({ file, onSuccess, onError }: any) => {
    const formData = new FormData();
    formData.append('files', file);

    try {
      if (id) {
        const imageResponse: any = await supplierActions.addProductImage(id, formData);
        if (imageResponse) {
          onSuccess(imageResponse);
          console.log("imageResponse", imageResponse)
        }
      }


    } catch (error) {
      console.log("error", error)
      onError(error);
    }
  };

  useEffect(() => {
    form.resetFields()
    if (props.open) {
      if (data) {
        form.setFieldsValue(data)
      } else {
        resetForm()
      }
    }

    return () => {

      resetForm()
    }
  }, [props.open])

  function resetForm() {
    form.resetFields()
    setFileList([])
  }

  const productDetail = async (id: number) => {
    try {
      const productResponse: any = await supplierActions.detailSupplier(id);
      if (productResponse) {
        form.setFieldsValue(productResponse)
        const files = productResponse.product_images.map((file: any) => ({
          ...file,
          url: `${BASE_IMAGE}${file.image_url}`
        }))
        setFileListOld(files)
      }
    } catch (error) {
      messageErrorDefault({ message: messageType.CHECK_INTERNET })
    }

  }

  const handleSubmit = async () => {
    if (!form) return
    try {

      const values = await form.validateFields()
      if (values) {
        if (data) {
          const body = {
            supplierId: data.supplierId,
            ...values
          }
          updateSupplier(body)
        }
        else
          addSupplier(values)

      }
    } catch (errInfo) {

    }
  }

  const addSupplier = async (body: Supplier) => {
    try {
      const response: Supplier = await supplierActions.addSupplier(body);
      if (response) {
        messageSuccessDefault({ message: messageType.ADD_SUCCESS })
        if (reload) reload()
      }

    } catch (error) {
      messageErrorDefault({ message: messageType.CHECK_INTERNET })
    }

  }

  const updateSupplier = async (body: Supplier) => {
    try {
      const response: Supplier = await supplierActions.updateSupplier(body);
      if (response) {
        messageSuccessDefault({ message: messageType.UPDATE_SUCCESS })
        if (reload) reload()
      }

    } catch (error) {
      messageErrorDefault({ message: messageType.CHECK_INTERNET })
    }

  }

  const getTitle = () => {
    if (mode === FORM_MODE.NEW) return 'Add new Supplier'
    if (mode === FORM_MODE.UPDATE) return 'Update Supplier'
    if (mode === FORM_MODE.VIEW) return 'Supplier Detail'
  }

  return (
    <Modal
      title={getTitle()}
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
              {mode === FORM_MODE.NEW ? messageType.ADD_NEW : messageType.UPDATE}
            </Button>
          }
          <Button
            onClick={() => {
              handleCancel()
            }}
            className="w-[144px] min-h-[40px]"
          >
            {messageType.EXIT}
          </Button>
        </div>,
      ]}
      onCancel={handleCancel}
      className="!w-[95%]"
      {...props}
    >
      <Form className="mt-10" form={form} labelWrap disabled={mode === FORM_MODE.VIEW} labelAlign="right">
        <Row className="justify-between">
          <Col span={11}>
            <Form.Item
              label="supplierName"
              name="supplierName"
              rules={[{ required: true, message: 'supplierName is require' }]}
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 16 }}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={11}>
            <Form.Item
              label="contactName"
              name="contactName"
              rules={[{ required: true, message: 'contactName is require' }]}
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 16 }}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row className="justify-between">
          <Col span={11}>
            <Form.Item
              label="phoneNumber"
              name="phoneNumber"
              rules={[{ required: true, message: 'phoneNumber is require' }]}
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 16 }}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={11}>
            <Form.Item
              label="email"
              name="email"
              rules={[{ required: true, message: 'email is require' }]}
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 16 }}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row className="justify-between">
          <Col span={11}>
            <Form.Item
              label="address"
              name="address"
              // labelAlign='left'
              rules={[{ required: true, message: 'address is require' }]}
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 16 }}
            >
              <TextArea disabled={mode === FORM_MODE.VIEW} />
            </Form.Item>
          </Col>
        </Row>


      </Form>


    </Modal>
  )
}

export default SupplierInfoForm
