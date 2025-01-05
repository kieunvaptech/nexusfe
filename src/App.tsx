import React, { ReactNode } from 'react'
import Login from './layout/Login'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import MainLayout from 'layout/MainLayout'
import { NotFound } from 'page/404_Page'
import Forbidden from 'page/403_Page'
import { ErrorPage } from 'page/500_Page'
import Dashboard from 'page/Dashboard'
import PaymentPage from 'page/Payment/index'
import OrderPage from 'page/Orders/index'
import CustomerPage from 'page/Customers/index'
import StorePage from 'page/Stores/index'
import PackagePage from 'page/Packages/index'
// import EquipmentPage from 'page/Equipments/index'
import EmployeePage from 'page/Employees/index'
import SupplierPage from 'page/Suppliers/index'
import DevicePage from 'page/Device'

interface PrivateRouteProps {
  children: ReactNode
}

function App() {
  const location = useLocation()
  const [accessToken, setAccessToken] = React.useState(localStorage.getItem('token'))

  React.useEffect(() => {
    setAccessToken(localStorage.getItem('token'))
  }, [location])

  const PrivateRoute = React.useMemo(() => {
    return function ({ children }: PrivateRouteProps) {
      return accessToken ? <>{children}</> : <Navigate to="/login" />
    }
  }, [accessToken])

  return (
    <Routes>
      <Route
        path="/"
        element={
          <PrivateRoute>
            <MainLayout />
          </PrivateRoute>
        }
      >
        <Route index element={<Dashboard />} />

        <Route path="/thanh-toan" element={<PaymentPage />} />
        <Route path="/don-hang" element={<OrderPage />} />
        <Route path="/khach-hang" element={<CustomerPage />} />
        <Route path="/cua-hang" element={<StorePage />} />
        <Route path="/goi-cuoc" element={<PackagePage />} />
        <Route path="/thiet-bi" element={<DevicePage />} />
        <Route path="/nhan-vien" element={<EmployeePage />} /> 
        <Route path="/nha-cung-cap" element={<SupplierPage />} />

      </Route>
      <Route path="/login" element={<Login />} />

      <Route path="*" element={<NotFound />} />
      <Route path="/403" element={<Forbidden />} />
      <Route path="/error-500" element={<ErrorPage />} />
    </Routes>
  )
}

export default App
