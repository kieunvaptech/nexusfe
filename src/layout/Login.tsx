import React, { useState } from 'react'
import { Form, Input, Spin, Button } from 'antd'
import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons'
import Logo from 'assets/images/logo-ksdb2.png'
// import { Button } from 'components/atoms/Button'
import { BUTTON_TYPES } from 'utils/Constants'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { ErrorMessage } from 'components/atoms/ErrorMessage'
import { messageErrorDefault } from 'utils/CommonFc'
import { useNavigate } from 'react-router-dom'
import { useUserActions } from "../actions/user.action";
import { LoginRequest } from "../actions/LoginRequest";
import { jwtDecode } from "jwt-decode";
import { setUserInfo } from 'Slice/userSlice'
import { useDispatch } from 'react-redux'

interface DecodedToken {
  username: string;
  email: string;
  exp: number;
  iat: number;
}
const Login = () => {
  const [form] = Form.useForm()
  const userActions = useUserActions();
  const [loading, setLoading] = React.useState(false)
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = React.useState(false)

  const [loginRequest, setLoginRequest] = useState<LoginRequest>({
    username: "",
    password: ""
  })

  const schema = yup.object().shape({
    username: yup.string().required('Nhập tài khoản'),
    password: yup.string().required('Nhập mật khẩu'),
  })
  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema),
  })

  const handleLogin = async () => {
    try {
      const data = form.getFieldsValue()
      setLoading(true)
      const token = await userActions.login(data);
      if (token) {
        const decoded = jwtDecode<any>(token);
        const decodedData = JSON.parse(decoded?.Employee);
        dispatch(setUserInfo(decodedData));
        localStorage.setItem('token', token);
        navigate('/')
      }
    } catch (error: any) {
      messageErrorDefault({
        message: "Bạn kiểm tra lạị thông tin đăng nhập",
      })
    }

  }

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const handleKeyDown = (event: any) => {
    if (event.key === 'Enter') {
      handleSubmit(handleLogin)()
    }
  }

  React.useEffect(() => {
    if (localStorage.getItem('token')) {
      navigate('/')
    }
  }, [])

  return (
    <>
      <Spin
        spinning={loading}
        size="default"
        style={{
          verticalAlign: 'middle',
        }}
      >
        <div
          className="flex-center h-screen w-full bg-cover bg-center bg-[url('assets/images/background-login.png')]"
        >
          <div className="bg-white p-8 rounded shadow-md w-96">
            <h2 className="text-2xl font-bold text-center mb-4">NEXUS</h2>
            <Form
              form={form}
              name="login"
              layout="vertical"
              onFinish={handleLogin}
              onFinishFailed={onFinishFailed}
            >
              <Form.Item
                label="Username"
                name="username"
                rules={[{ required: true, message: "Please input your username!" }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Password"
                name="password"
                rules={[{ required: true, message: "Please input your password!" }]}
              >
                <Input.Password />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit" className="w-full">
                  Login
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </Spin>
    </>
  )
}

export default Login
