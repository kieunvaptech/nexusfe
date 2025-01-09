import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { useCustomerActions } from 'actions/customer.action'
import { useOrderActions } from 'actions/order.action'
import {
  Button,
  Col,
  Form,
  Input,
  Modal,
  ModalProps,
  Row,
  Table,
  Tooltip,
  Typography
} from 'antd'
import TextArea from 'antd/lib/input/TextArea'
import { Customer } from 'models/Customer.model'
import { Employee } from 'models/Employee.model'
import React, { memo, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { RootState } from 'store'
import { messageErrorDefault, messageSuccessDefault, messageWarningDefault } from 'utils/CommonFc'
import { FORM_MODE, STATUS } from 'utils/Constants'
import OrderDetailForm from './OrderDetailForm'
import { usePaymentActions } from 'actions/payment.action'
import { useConnectionActions } from 'actions/connection.action'
const { confirm } = Modal;

interface OrderInfoFormProps extends ModalProps {
  handleCancel: () => void
  // data: any;
  reload: () => void
  id: number | undefined
  mode: number
}

const OrderInfoForm: React.FC<OrderInfoFormProps> = ({
  handleCancel,
  id,
  reload,
  mode,
  ...props
}) => {
  const [form] = Form.useForm();
  const userInfo = useSelector((state: RootState) => state.userReducer.userInfo);

  const orderActions = useOrderActions();
  const customerActions = useCustomerActions();
  const paymentActions = usePaymentActions();
  const connectionActions = useConnectionActions();
  const [customerData, setCustomerData] = useState<Customer>()

  const [openOrderDetail, setOpenOrderDetail] = useState<boolean>(false)
  const [orderData, setOrderData] = useState<any>()
  const [orderDetailData, setOrderDetailData] = useState<any>();
  const [dataSource, setDataSource] = useState<any[]>([]);
  const [modeOrderDetail, setModeOrderDetail] = useState<number>(1)

  useEffect(() => {
    form.resetFields()
    if (props.open) {
      if (id) {
        detailOrder(id)
      } else {
        form.setFieldsValue({
          statusName: 'Tạo mới'
        })
      }
    }else{
      resetForm()
    }

    return () => {
      resetForm()
    }
  }, [props.open])

  function resetForm() {
    form.resetFields()
  }

  const detailOrder = async (id: number) => {
    try {
      const response: any = await orderActions.detailOrder(id);
      if (response) {
        setOrderData(response);
        setCustomerData(response?.customer);
        form.setFieldsValue({
          customerId: response?.customer?.customerId,
          customerFullName: response?.customer?.fullName,
          phoneNumber: response?.customer?.phoneNumber,
          email: response?.customer?.email,
          address: response?.customer?.address,
          employeeFullName: response?.employee?.fullName || userInfo?.FullName,
          statusName: STATUS[response?.status]
        });
        const orderDetails = response?.orderDetails.map((item: any) => ({
          ...item,
          securityDeposit: item?.package?.securityDeposit,
          deviceName: item?.device?.deviceName
        }))
        setDataSource(orderDetails)
      }

    } catch (error) {
      messageErrorDefault({ message: "Kiểm tra lại kết nối." })
    }

  }

  const handleSubmit = async () => {
    if (!form) return
    try {
      const values = await form.validateFields();
      const body: any = {
        customerId: customerData?.customerId,
        employeeId: userInfo?.EmployeeId,
        totalPrice: dataSource.reduce((sum, item) => sum + ((item.price * item.packageQuantity) + item.securityDeposit), 0),
        status: id ? orderData?.status : 0,
        orderDetails: dataSource.map((item: any) => ({
          orderDetailId: id ? item.orderDetailId : undefined,
          packageId: item.packageId,
          packageName: item.packageName,
          packageQuantity: item.packageQuantity,
          price: item.price,
          deviceId: item.deviceId,
          deviceQuantity: item.deviceQuantity
        }))
      }
      console.log("body", body, dataSource);
      if (values) {
        if (id) {
          body.orderId = id
          orderUpdate(body)
        } else {
          addOrder(body)
        }

      }
    } catch (errInfo) {

    }
  }

  const orderUpdate = async (body: any) => {
    try {
      const orderResponse: any = await orderActions.updateOrder(body);
      if (orderResponse) {
        messageSuccessDefault({ message: "Cập nhật đơn hàng thành công" })
        if (reload) reload()
      }

    } catch (error) {
      console.log("error", error)
      messageErrorDefault({ message: "Kiểm tra lại kết nối." })
    }

  }

  const addOrder = async (body: any) => {
    try {

      const orderResponse: any = await orderActions.addOrder(body);
      if (orderResponse) {
        messageSuccessDefault({ message: "Thêm mới đơn hàng thành công" })
        if (reload) reload()
      }

    } catch (error) {
      console.log("error", error)
      messageErrorDefault({ message: "Kiểm tra lại kết nối." })
    }
  }

  const handlePayment = async () => {
    try {
      confirm({
        title: 'Xác nhận',
        content: 'Bạn chắc chắn muốn thanh toán?',
        okText: 'Thanh toán',
        cancelText: 'Quay lại',
        onOk() {
          addPayment()
        },
      });
    } catch (errInfo) {

    }
  }

  const addPayment = async () => {
    try {
      const values = await form.validateFields();

      const body = {
        orderId: orderData?.orderId,
        amount: orderData?.totalPrice,
        description: values?.description
      };
      const response: any = await paymentActions.addPayment(body);
      if (response) {

        await Promise.all(
          orderData?.orderDetails.map((item: any) => (
            addConnection({
              paymentId: response?.paymentId,
              connectionName: item?.packageName + Date.now()
            })
          ))
        )
        messageSuccessDefault({ message: "Thanh toán thành công" })
        if (reload) reload()
      }

    } catch (error) {
      console.log("error", error)
      messageErrorDefault({ message: "Kiểm tra lại kết nối." })
    }

  }

  const addConnection = async (body: any) => {
    try {
      await connectionActions.addConnection(body);
    } catch (error) {
      console.log("error", error)
      messageErrorDefault({ message: "Kiểm tra lại kết nối." })
    }

  }


  const regex = /^(0)([0-9]{9})$/
  const onChangePhone = (e: any) => {
    const value = e?.target?.value;
    if (value && value.length == 10 && regex.test(value)) {
      getCustomers(value);
    }
  }

  const getCustomers = async (PhoneNumber: string) => {
    try {
      const search = { PhoneNumber }
      const param = {
        page: 1,
        size: 10,
        query: JSON.stringify(search)
      }
      const response = await customerActions.getCustomers(param);
      if (response) {
        const customers = response?.customers
        if (customers.length > 0) {
          const customer: Customer = customers[0];
          setCustomerData(customer);
          form.setFieldsValue({
            customerId: customer?.customerId,
            customerFullName: customer?.fullName,
            email: customer?.email,
            address: customer?.address,
            employeeFullName: userInfo?.FullName
          })

        }

      }

    } catch (error) {
      messageErrorDefault({ message: "Kiểm tra lại kết nối." })

    }
  }

  const handleAdd = (data: any) => {
    if (modeOrderDetail == FORM_MODE.UPDATE) {
      const newList = dataSource.map((item) => {
        return item.packageId == data.packageId ? { ...data, orderDetailId: id ? item.orderDetailId : undefined, } : item
      });
      setDataSource(newList);
      setOpenOrderDetail(false);
    } else {
      const row = dataSource.find((item) => item.packageId == data.packageId);
      if (row) {
        messageWarningDefault({ message: "Gói cước này đã được thêm." })
      } else {
        setDataSource([...dataSource, data]);
        setOpenOrderDetail(false);
      }

    }

  }

  const onEditOrderDetail = (data: any) => {
    console.log('onEditOrderDetail', data, { ...data, description: data?.package?.description })
    setModeOrderDetail(FORM_MODE.UPDATE);
    setOpenOrderDetail(true);
    setOrderDetailData({ ...data, description: data?.package?.description });
  }

  const onDeleteOrderDetail = (data: any) => {
    const newList = dataSource.filter((item) => item.packageId !== data.packageId);
    setDataSource(newList);
  }

  const columns = [
    {
      title: 'STT',
      dataIndex: 'stt',
      key: 'stt',
      render: (value: any, row: any, index: number) => {
        return index + 1
      },
    },
    {
      title: 'Tên gói cước',
      dataIndex: 'packageName',
      key: 'packageName',
    },
    {
      title: 'Giá tiền',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Tiền cọc',
      dataIndex: 'securityDeposit',
      key: 'securityDeposit',
    },
    {
      title: 'Số lượng',
      dataIndex: 'packageQuantity',
      key: 'packageQuantity',
    },
    {
      title: 'Tên thiết bị',
      dataIndex: 'deviceName',
      key: 'deviceName',
    },
    {
      title: 'Số lượng',
      dataIndex: 'deviceQuantity',
      key: 'deviceQuantity',
    },
    {
      width: 150,
      title: 'Hành động',
      key: 'action',
      fixed: 'right' as 'right',
      render: (text: any, record: any) => {
        return (
          <>
            {
              mode !== FORM_MODE.VIEW && mode !== FORM_MODE.PAY && <Row>
                <div className="mr-5">
                  <EditOutlined className="text-xl text-gray-400" onClick={() => onEditOrderDetail(record)} />
                </div>
                <DeleteOutlined className="text-xl text-gray-400" onClick={() => onDeleteOrderDetail(record)} />
              </Row>
            }</>

        )
      },
    },
  ];

  const getTitle = () => {
    if (mode === FORM_MODE.NEW) return 'Thêm mới đơn hàng'
    if (mode === FORM_MODE.UPDATE) return 'Cập nhật đơn hàng'
    if (mode === FORM_MODE.VIEW) return 'Chi tiết đơn hàng'
  }

  return (
    <Modal
      title={getTitle()}
      centered
      footer={[
        <div className="flex-center w-full gap-3">
          {
            mode !== FORM_MODE.VIEW && mode !== FORM_MODE.PAY && <Button
              onClick={() => {
                handleSubmit()
              }}
              className="w-[144px] min-h-[40px]"
            >
              {mode === FORM_MODE.NEW ? 'Thêm' : 'Cập nhật'}
            </Button>
          }
          {
            mode === FORM_MODE.PAY && <Button
              onClick={() => {
                handlePayment()
              }}
              className="w-[144px] min-h-[40px]"
            >
              Thanh toán
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
      <Typography.Title level={4} >Thông tin khách hàng</Typography.Title>
      <Form className="mt-10" form={form} labelWrap disabled={mode === FORM_MODE.VIEW} labelAlign="right">
        <Row className="justify-between">
          <Col span={11}>
            <Form.Item
              label="Họ tên"
              name="customerFullName"
              // rules={[{ required: true, message: 'Không được để trống' }]}
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 16 }}
            >
              <Input disabled />
            </Form.Item>
          </Col>
          <Col span={11}>
            <Form.Item
              label="Số điện thoại"
              name="phoneNumber"
              rules={[
                {
                  required: true,
                  message: 'Số điện thoại không được để trống.',
                },
                {
                  pattern: new RegExp(regex),
                  message: 'Số điện thoại không hợp lệ!',
                }
              ]}
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 16 }}
            >
              <Input maxLength={10} placeholder='Nhập số điện thoại khách hàng' onChange={onChangePhone} />
            </Form.Item>
          </Col>
        </Row>
        <Row className="justify-between">
          <Col span={11}>
            <Form.Item
              label="Email"
              name="email"
              // rules={[{ required: true, message: 'Không được để trống' }]}
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 16 }}
            >
              <Input disabled />
            </Form.Item>
          </Col>
          <Col span={11}>
            <Form.Item
              label="Địa chỉ"
              name="address"
              // rules={[{ required: true, message: 'Không được để trống' }]}
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 16 }}
            >
              <TextArea disabled />
            </Form.Item>
          </Col>
        </Row>
        <Row className="justify-between">
          <Col span={11}>
            <Form.Item
              label="Nhân viên"
              name="employeeFullName"
              // rules={[{ required: true, message: 'Không được để trống' }]}
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 16 }}
            >
              <Input disabled />
            </Form.Item>
          </Col>
          <Col span={11}>
            <Form.Item
              label="Trạng thái"
              name="statusName"
              // rules={[{ required: true, message: 'Không được để trống' }]}
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 16 }}
            >
              <Input disabled />
            </Form.Item>
          </Col>
        </Row>
        {
          mode === FORM_MODE.PAY && <Row className="justify-between">
            <Col span={11}>
              <Form.Item
                label="Ghi chú"
                name="description"
                // rules={[{ required: true, message: 'Không được để trống' }]}
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 16 }}
              >
                <TextArea />
              </Form.Item>
            </Col>
          </Row>
        }
      </Form>
      <Row>
        <Col span={20}>
          <Typography.Title level={4} >Thông tin gói cước</Typography.Title>
        </Col>
        <Col span={2}>
          {
            mode !== FORM_MODE.VIEW && mode !== FORM_MODE.PAY &&
            <Button
              onClick={() => {
                setOrderDetailData(null);
                setModeOrderDetail(FORM_MODE.NEW);
                setOpenOrderDetail(true);
              }}
              className="w-[40px] min-h-[20px]"
            >
              Thêm gói cước
            </Button>
          }

        </Col>


      </Row>

      <Table
        columns={columns}
        dataSource={dataSource}
        pagination={false}
      />
      <OrderDetailForm
        mode={mode}
        open={openOrderDetail}
        data={orderDetailData}
        handleAdd={handleAdd}
        handleCancel={() => setOpenOrderDetail(false)}
      />
    </Modal>
  )
}

export default memo(OrderInfoForm)
