import React from 'react'
import { Input } from 'antd'

interface NumericInputProps {
  value: string
  className?: string
  onChange: (value: string) => void
  placeholder?: string
}

const NumericInput = (props: NumericInputProps) => {
  const { value, onChange } = props

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value: inputValue } = e.target
    const reg = /^-?\d*(\.\d*)?$/
    if (inputValue.match(reg) || inputValue === '' || inputValue === '-') {
      onChange(inputValue)
    }
  }

  const handleBlur = () => {
    if(!value) return
    let valueTemp = value
    if (value.toString().charAt(value.length - 1) === '.' || value === '-') {
      valueTemp = value.slice(0, -1)
    }
    onChange(valueTemp)
  }

  return <Input {...props} onChange={handleChange} onBlur={handleBlur} className="w-full" />
}

export default NumericInput
