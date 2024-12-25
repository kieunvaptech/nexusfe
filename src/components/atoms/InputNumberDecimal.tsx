import { InputNumber } from 'antd'

interface Props {
  className?: string
  digits: number
  onClick?: (e: React.MouseEvent<HTMLInputElement>) => void
  min?: number
  max?: number
  placeholder?: string
  disabled?: boolean
}

const InputNumberDecimal = ({ className, digits, onClick, min, max, disabled, ...props }: Props) => {
  function removeDecimals(num: number, decimalPlaces: number) {
    const decimalNum = Math.pow(10, decimalPlaces)
    return Math.floor(num * decimalNum) / decimalNum
  }

  return (
    <InputNumber<number | string>
      className={className}
      precision={digits}
      onClick={onClick}
      min={min}
      max={max}
      parser={(value: any) => {
        if (!value) return ''
        const result = removeDecimals(value, digits)
        return result
      }}
      disabled={disabled}
      {...props}
    />
  )
}

export default InputNumberDecimal
