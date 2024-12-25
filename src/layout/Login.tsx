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
  const navigate = useNavigate()
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
    // navigate('/')
    try {
      const data = form.getFieldsValue()

      const body = {
        ...data,
        role_id: 2
      }
      const token = await userActions.login(data);
      console.log("loginResponse", token)
      if (token) {
        const decodedData = jwtDecode<any>(token);
        console.log("decodedData", JSON.parse(decodedData?.User).UserId)
        localStorage.setItem('token', token);
        // localStorage.setItem('phone', data.phone_number)
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
        {/* <div className="login w-screen h-screen flex-center bg-[url('assets/images/background-login.png')]">
          <div className="container w-[430px] px-[25px] py-5 min-h-[366px] bg-white rounded-2xl">
            
            <div className="body mt-[10px]">
              <p className="leading-[38px] flex-center text-[#444] text-[22px] font-[500] mb-[10px]">ĐĂNG NHẬP</p>
              <div className="form-login mt-[12px]">
                <div className="flex flex-col gap-3">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="phone_number" className="font-bold">
                      Tên đăng nhập
                    </label>
                    <input
                      {...register('phone_number')}
                      type="text"
                      id="phone_number"
                      placeholder="Tài khoản"
                      className="text-truncate"
                      onKeyDown={handleKeyDown}
                    />
                    <ErrorMessage message={errors?.phone_number?.message} />
                  </div>
                  <div className="flex flex-col gap-2 mb-[20px]">
                    <label htmlFor="password" className="font-bold">
                      Mật khẩu
                    </label>
                    <div className="relative">
                      <input
                        {...register('password')}
                        type={showPassword ? 'text' : 'password'}
                        id="password"
                        placeholder="Mật khẩu"
                        className="text-truncate"
                        onKeyDown={handleKeyDown}
                      />
                      <div
                        className="absolute top-[30%] right-[5%] cursor-pointer"
                        onClick={() => setShowPassword((prev) => !prev)}
                      >
                        {showPassword ? (
                          <EyeOutlined className="text-lg" />
                        ) : (
                          <EyeInvisibleOutlined className="text-lg" />
                        )}
                      </div>
                    </div>
                    <ErrorMessage message={errors?.password?.message} />
                  </div>
                  <Button
                    onClick={handleSubmit(handleLogin)}
                    type={BUTTON_TYPES.PRIMARY}
                    className="w-[250px] mx-auto min-h-[40px] !rounded-lg"
                  >
                    Đăng nhập
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div> */}
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
