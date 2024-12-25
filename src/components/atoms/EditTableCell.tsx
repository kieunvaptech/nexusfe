import { Form, Input, InputRef } from 'antd'
import { FormInstance } from 'antd/es/form/Form'
import React from 'react'

interface EditableCellProps {
  title: React.ReactNode
  editable: boolean
  children: React.ReactNode
  dataIndex: string
  record: any
  handleSave: (record: any) => void
  require?: boolean
  form: FormInstance<any>
}

const EditableCell: React.FC<EditableCellProps> = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  require,
  form,
  ...restProps
}) => {
  const [editing, setEditing] = React.useState(false)
  const inputRef = React.useRef<InputRef>(null)

  React.useEffect(() => {
    if (editing) {
      inputRef.current!.focus()
      form.setFieldsValue({ [dataIndex]: record[dataIndex] })
    }
  }, [dataIndex, editing, form, record])

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
    childNode = (
      <Form.Item
        style={{ margin: 0 }}
        name={dataIndex}
        rules={[
          require
            ? {
                required: true,
                message: `Không được để trống.`,
              }
            : {},
        ]}
      >
        <Input ref={inputRef} onPressEnter={save} onBlur={save} />
      </Form.Item>
    )
  }

  return (
    <td {...restProps}>
      <Form form={form}>{childNode}</Form>
    </td>
  )
}

export default EditableCell
