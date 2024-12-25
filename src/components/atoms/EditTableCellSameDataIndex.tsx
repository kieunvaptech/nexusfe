import { Form, Input, InputRef, Tooltip } from 'antd'
import React from 'react'

interface EditableCellProps {
  title: React.ReactNode
  editable: boolean
  children: React.ReactNode
  dataIndex: string
  record: any
  handleSave: (record: any) => void
  require?: boolean
}

const EditTableCellSameDataIndex: React.FC<EditableCellProps> = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  require,
  ...restProps
}) => {
  const [editing, setEditing] = React.useState(false)
  const inputRef = React.useRef<InputRef>(null)
  const [form] = Form.useForm()

  React.useEffect(() => {
    if (editing) {
      inputRef.current!.focus()
    }
  }, [editing])

  const toggleEdit = () => {
    setEditing(!editing)
    form.setFieldsValue({ [dataIndex]: record[dataIndex] })
  }

  const save = async () => {
    if (!form) return
    try {
      const values = await form.validateFields()
      toggleEdit()
      handleSave({ ...record, ...values })
    } catch (errInfo) {}
  }

  let childNode = children

  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{ margin: 0 }}
        name={dataIndex}
        rules={[
          require
            ? {
                required: true,
                message: `${title} is required.`,
              }
            : {},
        ]}
      >
        <Input ref={inputRef} onPressEnter={save} onBlur={save} />
      </Form.Item>
    ) : (
      <Tooltip title="Click để chỉnh sửa">
        <div className="editable-cell-value-wrap !pr-6 h-5" onClick={toggleEdit}>
          {children}
        </div>
      </Tooltip>
    )
  }

  return (
    <td {...restProps}>
      <Form form={form}>{childNode}</Form>
    </td>
  )
}

export default EditTableCellSameDataIndex
