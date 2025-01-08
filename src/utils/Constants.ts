export const BUTTON_TYPES = {
  NORMAL: 1,
  PRIMARY: 2,
}

export type formModeType = {
  NEW: number
  UPDATE: number
  VIEW: number
  PAY: number
}

export const FORM_MODE: formModeType = {
  NEW: 1,
  UPDATE: 2,
  VIEW: 3,
  PAY: 4,
}


export const ACTION_TYPE = {
  XEM: 'Xem',
  CAP_NHAT: 'Sửa',
  XOA: 'Xóa',
  PAYMENT: 'Thanh toán'
}

export const messageType = {
  ADD_NEW: "Thêm mới",
  UPDATE: "Cập nhật",
  EXIT: "Quay lại",
  ADD_SUCCESS: "Add new success",
  UPDATE_SUCCESS: "Update success",
  CHECK_INTERNET: "Kiểm tra kết nối"
}

export const ROLE = [
  '',
  'ADMIN',
  'Quản lý',
  'Kỹ thuật',
  'Kế toán'
]

export const STATUS = [
  'Chờ thanh toán',
  'Đã thanh toán',
  'Hủy'
]