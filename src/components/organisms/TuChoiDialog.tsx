import { Modal, Button, ModalProps, Form, Row, Col, Input, FormInstance } from 'antd'
import React, { memo, useEffect, useState } from 'react'

interface Props extends ModalProps {
  handleSumbit: () => void
  handleCancel: () => void
  loading: boolean
  formLyDo: FormInstance<any>
}

const TuChoiDialog: React.FC<Props> = ({ open, handleSumbit, handleCancel, loading, title, formLyDo, ...props }) => {
  const valuesLyDoTuChoi = Form.useWatch(['lyDoTuChoi'], formLyDo)
  const [submittable, setSubmittable] = useState(false)

  useEffect(() => {
    formLyDo
      .validateFields({ validateOnly: true })
      .then(() => setSubmittable(true))
      .catch(() => setSubmittable(false))
  }, [formLyDo, valuesLyDoTuChoi])

  return (
    <>
      <Modal
        open={open}
        onOk={handleSumbit}
        onCancel={handleCancel}
        title="Từ chối phê duyệt"
        centered
        footer={[
          <Button
            type="primary"
            loading={loading}
            onClick={handleSumbit}
            className=" w-[144px] min-h-[40px]"
            disabled={!submittable}
          >
            Đồng ý
          </Button>,
          <Button onClick={handleCancel} className=" w-[144px] min-h-[40px]">
            Hủy
          </Button>,
        ]}
        className="!w-3/5"
      >
        <Form form={formLyDo} className="mt-4">
          <Row gutter={48}>
            <Col xs={24}>
              <Form.Item
                label="Lý do"
                name="lyDoTuChoi"
                rules={[
                  {
                    required: true,
                    message: 'Lý do không thể để trống',
                  },
                ]}
                labelCol={{ span: 2 }}
                wrapperCol={{ offset: 2 }}
              >
                <Input.TextArea placeholder="Nhập lý do từ chối" className="!min-h-[120px]" />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </>
  )
}

export default memo(TuChoiDialog)
