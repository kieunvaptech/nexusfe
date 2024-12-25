import React from 'react'
import { Button, Result } from 'antd'
import { useNavigate } from 'react-router-dom'
export const NotFound = () => {
  const navigate = useNavigate()

  const handleBackToHome = () => {
    if (!localStorage.getItem('token')) {
      navigate('/login')
      return
    }

    navigate('/')
  }

  return (
    <Result
      status="404"
      title="404"
      subTitle="Xin lỗi, hiện tại chức năng chưa thể sử dụng, vui lòng truy cập lại sau!"
      extra={
        <Button type="primary" onClick={handleBackToHome}>
          Home
        </Button>
      }
    />
  )
}
