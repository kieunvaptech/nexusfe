
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
import { Employee } from 'models/Employee.model'
import { useEmployeeActions } from 'actions/employee.action'

interface ProductInfoFormProps extends ModalProps {
  handleCancel: () => void
  categorysOption: DefaultOptionType[]
  reload?: () => void
  data?: Employee
  mode: number
}

const EmployeeInfoForm: React.FC<ProductInfoFormProps> = ({
  handleCancel,
  categorysOption,
  reload,
  data,
  mode,
  ...props
}) => {

  const { t } = useTranslation()
  const [form] = Form.useForm()
  const employeeActions = useEmployeeActions();

  const [fileListOld, setFileListOld] = useState<any[]>([]);
  const [fileList, setFileList] = useState<any[]>([]);

  const handleChange = ({ fileList }: any) => {
    setFileList(fileList);
  };

  // const customRequest = async ({ file, onSuccess, onError }: any) => {
  //   const formData = new FormData();
  //   formData.append('files', file);

  //   try {
  //     if (data) {
  //       const imageResponse: any = await employeeActions.addProductImage(id, formData);
  //       if (imageResponse) {
  //         onSuccess(imageResponse);
  //         console.log("imageResponse", imageResponse)
  //       }
  //     }


  //   } catch (error) {
  //     console.log("error", error)
  //     onError(error);
  //   }
  // };

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

  // const productDetail = async (id: number) => {
  //   try {
  //     const productResponse: any = await employeeActions.detailProduct(id);
  //     if (productResponse) {
  //       form.setFieldsValue(productResponse)
  //       const files = productResponse.product_images.map((file: any) => ({
  //         ...file,
  //         url: `${BASE_IMAGE}${file.image_url}`
  //       }))
  //       setFileListOld(files)
  //     }
  //   } catch (error) {
  //     console.log("error", error)
  //     messageErrorDefault({ message: "Kiểm tra lại kết nối." })

  //   }

  // }

  const handleSubmit = async () => {
    if (!form) return
    try {

      const values = await form.validateFields()
      if (values) {
        if (data) {
          const body = {
            employeeId: data?.employeeId,
            ...values
          }
          productUpdate(body)
        }
        else
          productAdd(values)

      }
    } catch (errInfo) {

    }
  }

  const productAdd = async (body: Employee) => {
    try {
      const response: any = await employeeActions.addEmployee(body);
      if (response) {
        messageSuccessDefault({ message: messageType.ADD_SUCCESS })
        if (reload) reload()
      }

    } catch (error) {
      console.log("error", error)
      messageErrorDefault({ message:  messageType.CHECK_INTERNET })

    }

  }

  const productUpdate = async (body: Employee) => {
    try {
      const response: any = await employeeActions.updateEmployee(body);
      if (response) {
        messageSuccessDefault({ message: messageType.UPDATE_SUCCESS })
        if (reload) reload()
      }

    } catch (error) {
      console.log("error", error)
      messageErrorDefault({ message: "Kiểm tra lại kết nối." })

    }

  }

  const getTitle = () => {
    if (mode === FORM_MODE.NEW) return 'Add Employee'
    if (mode === FORM_MODE.UPDATE) return 'Update Employee'
    if (mode === FORM_MODE.VIEW) return 'Employee Detail'
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
              {mode === FORM_MODE.NEW ? 'Add' : 'Update'}
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
          <Col span={11}>
            <Form.Item
              label="Tên sản phẩm"
              name="name"
              rules={[{ required: true, message: 'Đơn vị quản lý không được để trống' }]}
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 16 }}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={11}>
            <Form.Item
              label="Giá tiền"
              name="price"
              rules={[{ required: true, message: 'Mã TCTGBHTG không được để trống' }]}
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
              label="Danh mục sản phẩm"
              name="category_id"
              rules={[{ required: true, message: 'Đơn vị quản lý không được để trống' }]}
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 16 }}
            >
              <Select options={categorysOption} disabled={mode === FORM_MODE.VIEW} />
            </Form.Item>
          </Col>
          <Col span={11}>
            <Form.Item
              label="Thông tin chi tiết"
              name="description"
              labelAlign='left'
              rules={[{ required: true }]}
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 16 }}
            >
              <TextArea disabled={mode === FORM_MODE.VIEW} />
            </Form.Item>
          </Col>
        </Row>

        {/* {
          id &&
          <Row className="justify-between">
            <Col span={11}>
              <Form.Item
                label="Thêm ảnh sản phẩm"
                name="file"
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 16 }}
              >

                <Upload
                  customRequest={customRequest}
                  onChange={handleChange}
                  fileList={fileList}
                  listType="picture"
                  // showUploadList={true}
                  multiple={true}
                  maxCount={5}
                  showUploadList={{ showRemoveIcon: false }}
                >
                  <Button
                    icon={<UploadOutlined className="text-3xl cursor-pointer" />}
                    className="rounded-none border-none !min-w-10"
                  ></Button>
                </Upload>

              </Form.Item>
            </Col>
            <Col span={11}>
              <Upload
                listType="picture-card"
                fileList={fileListOld}
                showUploadList={{ showRemoveIcon: false }}
              >
              </Upload>
            </Col>
          </Row>
        } */}




      </Form>


    </Modal>
  )
}

export default EmployeeInfoForm