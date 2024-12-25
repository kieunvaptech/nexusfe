import { Modal, Button, ModalProps } from 'antd'
import React from 'react'

interface Props extends ModalProps {
  handleSumbit: () => void
  handleCancel: () => void
  loading: boolean
  description: string
  textButtonSubmit?: string
  textButtonCancel?: string
}

const MessageDialog: React.FC<Props> = ({
  open,
  handleSumbit,
  handleCancel,
  loading,
  title,
  description,
  ...props
}) => {
  return (
    <>
      <Modal
        open={open}
        onOk={handleSumbit}
        onCancel={handleCancel}
        title={title}
        centered
        footer={[
          <Button type="primary" loading={loading} onClick={handleSumbit} className=" w-[144px] min-h-[40px]">
            {props.textButtonSubmit || 'Có'}
          </Button>,
          <Button onClick={handleCancel} className=" w-[144px] min-h-[40px]">
            {props.textButtonCancel || 'Không'}
          </Button>,
        ]}
        {...props}
      >
        <div>
          <p className="text-[#585858] text-[14px] font-bold">{description}</p>
        </div>
      </Modal>
    </>
  )
}

export default MessageDialog
