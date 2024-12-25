import { encode } from 'utf8'
import { Input, InputProps } from 'antd'
import { truncateString } from '../../utils/CommonFc'

interface CustomInputProps extends Omit<InputProps, 'onChange'> {
  onChange?: (e: string) => void
}

const CustomInput: React.FC<CustomInputProps> = ({
  onChange,
  maxLength = 4000,
  showCount,
  value = '',
  ...restProps
}) => {
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const text = e.target.value
    const encodedString = encode(text || '')
    if (encodedString.length <= +maxLength) {
      value = text
      onChange && onChange(text)
    } else {
      const newText = truncateString(text, +maxLength)
      value = text
      onChange && onChange(newText)
    }
  }
  const suffix = showCount && `${encode(String(value || '')).length}/${maxLength}`
  return <Input style={{ padding: '0' }} onChange={(e) => handleChange(e)} suffix={suffix} {...restProps} />
}

export default CustomInput
