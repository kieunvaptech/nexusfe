import { Col, Form, Row, Table, Typography } from 'antd'
import Content from 'layout/Content'
import { Pagination } from 'components/organisms/Pagination';
import { memo, useEffect, useState } from 'react'
import { ProductColumns } from "./columns";
import ProductSearchForm from './component/ProductSearchForm';
import { DefaultOptionType } from 'antd/lib/select';
import { FORM_MODE } from 'utils/Constants';
import { messageErrorDefault, messageSuccessDefault } from 'utils/CommonFc';
import { cloneDeep } from 'lodash-es'
import { useConnectionActions } from 'actions/connection.action';

const ConnectionPage = () => {
  const [form] = Form.useForm()
  const connectionActions = useConnectionActions();
  const [dataSourceProduct, setDataSourceProduct] = useState();
  const [pageIndex, setPageIndex] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(10)
  const [total, setTotal] = useState(0)
  const [openInfo, setOpenInfo] = useState<boolean>(false)
  const [categorysOption, setcategorysOption] = useState<DefaultOptionType[]>([])
  const [idSelected, setIdSelected] = useState<number | null>(null)
  const [mode, setMode] = useState<number>(1)
  const [dataSearch, setDataSearch] = useState<any>()


  const getConnectionName = async (param: any) => {
    try {
      const response = await connectionActions.getConnectionName(param);
      if (response) {
        setDataSearch(response)
        console.log("connectionActions", connectionActions)
      }

    } catch (error) {
      messageErrorDefault({ message: "Kiểm tra lại kết nối." })

    }
  }



  const searchProducts = async () => {
    try {
      const values = form.getFieldsValue()
      setDataSearch(values);
      getConnectionName(values);
      console.log("values", values)

    } catch (error) {
      messageErrorDefault({ message: "Kiểm tra lại kết nối." })

    }
  }



  return (
    <Content loading={false}>
      <>
        <br />
        <ProductSearchForm
          form={form}
          onSearch={searchProducts} />

        {
          dataSearch &&
          <Col>
            <Row className="justify-between">
              <Col span={6}>
                <span></span>
              </Col>
              <Col span={6}>
                <span>Họ và tên</span>
              </Col>
              <Col span={6}>
                <span>{dataSearch?.payment?.order?.customer?.fullName}</span>
              </Col>
              <Col span={6}>
                <span></span>
              </Col>
            </Row>
            <Row className="justify-between">
              <Col span={6}>
                <span></span>
              </Col>
              <Col span={6}>
                <span>email</span>
              </Col>
              <Col span={6}>
                <span>{dataSearch?.payment?.order?.customer?.email}</span>
              </Col>
              <Col span={6}>
                <span></span>
              </Col>
            </Row>
            <Row className="justify-between">
              <Col span={6}>
                <span></span>
              </Col>
              <Col span={6}>
                <span>Số điện thoại</span>
              </Col>
              <Col span={6}>
                <span>{dataSearch?.payment?.order?.customer?.phoneNumber}</span>
              </Col>
              <Col span={6}>
                <span></span>
              </Col>
            </Row>
            <Row className="justify-between">
              <Col span={6}>
                <span></span>
              </Col>
              <Col span={6}>
                <span>Thanh toán</span>
              </Col>
              <Col span={6}>
                <span>{dataSearch?.payment?.order?.totalPrice}</span>
              </Col>
              <Col span={6}>
                <span></span>
              </Col>
            </Row>
          </Col>
        }


        {/* <ProductInfoForm
          id={idSelected}
          mode={mode}
          categorysOption={categorysOption}
          open={openInfo}
          reload={reloadData}
          handleCancel={() => setOpenInfo(false)}
        /> */}
        {/* <Table
          columns={ProductColumns({
            actionXem: (record: any) => {
              setMode(FORM_MODE.VIEW)
              setOpenInfo(true)
              setIdSelected(record.id)
            },
            actionCapNhat: (record: any) => {
              setMode(FORM_MODE.UPDATE)
              setOpenInfo(true)
              setIdSelected(record.id)
            },
            actionXoa: (record: any) => {
              deleteProduct(record.id)
            },
          })}
          dataSource={dataSourceProduct}
          pagination={false}
        />
        <div style={{ padding: 5 }}>
          {dataSourceProduct && (
            <Pagination
              totalItems={total}
              pageSize={pageSize}
              setPageSize={setPageSize}
              pageIndex={pageIndex}
              setPageIndex={getProducts}
            />
          )}
        </div> */}
      </>
    </Content>
  )
}

export default ConnectionPage
