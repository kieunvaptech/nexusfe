export const BUTTON_TYPES = {
  NORMAL: 1,
  PRIMARY: 2,
}

export type formModeType = {
  NEW: number
  UPDATE: number
  VIEW: number
  SEARCH_MODAL: number
  DIEU_CHINH: number
  THAY_THE_CAN_BO: number
  RUT_CAN_BO: number
  VIEW_DIEU_CHINH: number
}

export const FORM_MODE: formModeType = {
  NEW: 1,
  UPDATE: 2,
  VIEW: 3,
  SEARCH_MODAL: 4,
  DIEU_CHINH: 5,
  THAY_THE_CAN_BO: 6,
  RUT_CAN_BO: 7,
  VIEW_DIEU_CHINH: 8,
}

// export const actionMessPopup = {
//   DELETE: "DELETE",
//   GUIDUYET: "GUI_DUYET",
//   GUITSC: "GUI_TSC",
//   YC_MO_KHOA: "YC_MO_KHOA",
//   MO_KHOA: "MO_KHOA"
// }

// export const MA_DON_VI_TRU_SO_CHINH = '01'

// export const TRANG_THAI_HOAT_DONG = {
//   HOAT_DONG: '01',
//   NGUNG_HOAT_DONG: '02',
// }

// export const LIST_PERMISSIONS = {
//   //DANH SÁCH TỔ CHỨC THAM GIA BẢO HIỂM TIỀN GỬI ĐƯỢC KIỂM SOÁT ĐẶC BIỆT
//   TCTGBHTG_KHAI_BAO: 'QTHT2901',
//   TCTGBHTG_XEM_CHI_TIET: 'QTHT2902',
//   TCTGBHTG_SUA: 'QTHT2903',
//   TCTGBHTG_DIEU_CHINH: 'QTHT2904',
//   TCTGBHTG_TRA_CUU: 'QTHT2905',
//   //DANH SÁCH NHÓM QUYỀN THÔNG TIN TÀI CHÍNH KINH DOANH
//   TCKD_THEM_MOI: 'KSDB3501',
//   TCKD_XEM_CHI_TIET: 'KSDB3502',
//   TCKD_SUA: 'KSDB3503',
//   TCKD_XOA: 'KSDB3504',
//   TCKD_TRA_CUU: 'KSDB3505',
//   //DANH SÁCH NHÓM QUYỀN QUẢN LÝ DANH SÁCH KHÁCH HÀNG GỬI TIỀN
//   DSKHGT_THEM_MOI: 'KSDB2101',
//   DSKHGT_SUA: 'KSDB2102',
//   DSKHGT_XOA: 'KSDB2103',
//   DSKHGT_IMPORT: 'KSDB2104',
//   DSKHGT_TRA_CUU: 'KSDB2105',
//   DSKHGT_HET_HIEU_LUC: 'KSDB2106',
//   //DANH SÁCH NHÓM QUYỀN SỐ DƯ TIỀN GỬI CỦA KHÁCH HÀNG
//   SDTG_THEM_MOI: 'KSDB2201',
//   SDTG_SUA: 'KSDB2202',
//   SDTG_XOA: 'KSDB2203',
//   SDTG_IMPORT: 'KSDB2204',
//   SDTG_TRA_CUU: 'KSDB2205',
//   //DANH SÁCH NHÓM QUYỀN TÌNH HÌNH THỰC TẾ CHI TRẢ TẠI TỔ CHỨC
//   THTTCT_THEM_MOI: 'KSDB2401',
//   THTTCT_SUA: 'KSDB2402',
//   THTTCT_XOA: 'KSDB2403',
//   THTTCT_IMPORT: 'KSDB2404',
//   THTTCT_TRA_CUU: 'KSDB2405',
//   //DANH SÁCH NHÓM QUYỀN THÔNG TIN KHÁC
//   TTK_THEM_MOI: 'KSDB2501',
//   TTK_SUA: 'KSDB2502',
//   TTK_XOA: 'KSDB2503',
//   TTK_IMPORT: 'KSDB2504',
//   TTK_TRA_CUU: 'KSDB2505',
//   //DANH SÁCH NHÓM QUYỀN QUẢN LÝ VĂN BẢN, QUYẾT ĐỊNH CỦA TCTD
//   VBQD_THEM_MOI: 'KSDB301',
//   VBQD_SUA: 'KSDB302',
//   VBQD_XOA: 'KSDB303',
//   VBQD_TRA_CUU: 'KSDB304',
//   //DANH SÁCH NHÓM QUYỀN DANH SÁCH QUẢN LÝ CÁN BỘ
//   QLCBTGKSDB_THEM_MOI: 'KSDB401',
//   QLCBTGKSDB_SUA: 'KSDB402',
//   QLCBTGKSDB_XOA: 'KSDB403',
//   QLCBTGKSDB_TRA_CUU: 'KSDB404',
// }

export const ACTION_TYPE = {
  XEM: 'Xem',
  CAP_NHAT: 'Sửa',
  XOA: 'Xóa',
  GUI_DUYET: 'Gửi duyệt',
  PHE_DUYET: 'Phê duyệt',
  GUI_TSC: 'Gửi TSC',
  TU_CHOI: 'Từ chối',
  YC_MO_KHOA: 'Yêu cầu mở khóa',
  MO_KHOA: 'Mở khóa',
  XUAT_BAO_CAO: 'Xuất báo cáo',
}

// export const stylesTextColumn: { [key: number]: string } = {
//   1: 'font-bold',
//   2: 'italic',
//   3: 'underline',
// }

// export const listTypeNumberWithCommas = ['Triệu đồng', 'Đồng']


export const messageType = {
  ADD_NEW: "Add new",
  UPDATE: "Update",
  EXIT: "Exit",
  ADD_SUCCESS: "Add new success",
  UPDATE_SUCCESS: "Update success",
  CHECK_INTERNET: "Kiểm tra kết nối"
}