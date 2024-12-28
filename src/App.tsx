import React, { ReactNode } from 'react'
import Login from './layout/Login'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import MainLayout from 'layout/MainLayout'
import { NotFound } from 'page/404_Page'
import Forbidden from 'page/403_Page'
import { ErrorPage } from 'page/500_Page'
import Dashboard from 'page/Dashboard'
// import BillingPage from 'page/Billings/index'
import OrderPage from 'page/Orders/index'
// import CustomerPage from 'page/Customers/index'
import StorePage from 'page/Stores/index'
// import PlanPage from 'page/Plans/index'
// import EquipmentPage from 'page/Equipments/index'
// import EmployeePage from 'page/Employees/index'
import VendorPage from 'page/Vendors/index'

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

        {/* <Route path="/billings" element={<BillingPage />} /> */}
        <Route path="/orders" element={<OrderPage />} />
        {/* <Route path="/customers" element={<CustomerPage />} /> */}
        <Route path="/stores" element={<StorePage />} />
        {/* <Route path="/plans" element={<PlanPage />} />
        <Route path="/equipments" element={<EquipmentPage />} />
        <Route path="/employees" element={<EmployeePage />} /> */}
        <Route path="/vendors" element={<VendorPage />} />

      </Route>
      <Route path="/login" element={<Login />} />

      <Route path="*" element={<NotFound />} />
      <Route path="/403" element={<Forbidden />} />
      <Route path="/error-500" element={<ErrorPage />} />
    </Routes>
  )
}

export default App
